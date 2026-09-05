/* ==========================================================================
   Pyodide Dedicated Web Worker Management (Safe & Infinite-Loop Protected)
   FIXED v2 - robust aliases, proper normalize, enriched results
   ========================================================================== */

let pyWorker = null;
let currentRequestId = 0;
const pendingWorkerRequests = new Map();
const EXECUTION_TIMEOUT_MS = 7000;   // 7s per spec - prevents infinite loop tab freeze
const INIT_TIMEOUT_MS = 120000;       // 120s for Pyodide download + compile

let pyodideReadyResolve = null;
let pyodideReadyReject = null;
let pyodideReady = null;
let pyodideInitState = 'idle'; // 'idle' | 'loading' | 'ready' | 'error'

function createPyWorker() {
  if (pyWorker) return;

  pyodideInitState = 'loading';
  pyodideReady = new Promise((resolve, reject) => {
    pyodideReadyResolve = resolve;
    pyodideReadyReject = reject;
  });

  try {
    pyWorker = new Worker('js/pyodide-worker.js');
  } catch (e) {
    console.warn('Worker instantiation failed:', e);
    pyodideInitState = 'error';
    if (pyodideReadyReject) pyodideReadyReject(new Error('Could not start Python execution worker.'));
    return;
  }

  const initTimer = setTimeout(() => {
    if (pyodideInitState === 'loading') {
      pyodideInitState = 'error';
      if (pyodideReadyReject) pyodideReadyReject(new Error('Pyodide initialization timed out. Check your internet connection and reload.'));
      resetPyWorker();
    }
  }, INIT_TIMEOUT_MS);

  pyWorker.onmessage = (event) => {
    const data = event.data || {};
    const { id, type, stdout, stderr, elapsed, results, error, text } = data;

    if (type === 'stdout') {
      appendTerminal(text, 'stdout');
      return;
    }

    if (type === 'init-ready') {
      clearTimeout(initTimer);
      pyodideInitState = 'ready';
      if (pyodideReadyResolve) pyodideReadyResolve(true);
      updatePyodideStatus('ready');
      console.log('Pyodide initialized and ready.');
      return;
    }
    if (type === 'init-error') {
      clearTimeout(initTimer);
      pyodideInitState = 'error';
      if (pyodideReadyReject) pyodideReadyReject(new Error(error || 'Pyodide failed to initialize'));
      updatePyodideStatus('error');
      return;
    }

    const req = pendingWorkerRequests.get(id);
    if (!req) return;
    pendingWorkerRequests.delete(id);
    clearTimeout(req.timer);

    if (type === 'run-result') {
      // Enrich single result with normalized comparison if passed not provided
      let passed = data.passed;
      if (typeof passed === 'undefined') {
        const actual = stdout ?? data.actual ?? '';
        const expected = data.expected ?? data.output ?? '';
        passed = normalizeOutput(actual) === normalizeOutput(expected) && !stderr;
      }
      req.resolve({ stdout, stderr, elapsed, actual: data.actual ?? stdout, expected: data.expected ?? '', passed });
    } else if (type === 'batch-result') {
      // Defensive enrichment: ensure each result has passed/actual/expected
      const enriched = (results || []).map(r => {
        if (typeof r.passed !== 'undefined') return r;
        const actual = r.actual ?? r.stdout ?? '';
        const expected = r.expected ?? r.output ?? '';
        const actNorm = normalizeOutput(actual);
        const expNorm = normalizeOutput(expected);
        const hasError = !!(r.stderr && String(r.stderr).trim());
        const passed = actNorm === expNorm && !hasError;
        return { ...r, actual, expected, passed, normalizedActual: actNorm, normalizedExpected: expNorm };
      });
      req.resolve({ results: enriched });
    } else if (type === 'run-error') {
      req.reject(new Error(error || 'Execution error'));
    } else {
      // Unknown type - treat as error
      req.reject(new Error(error || `Unknown worker response type: ${type}`));
    }
  };

  pyWorker.onerror = (err) => {
    console.error('Worker error:', err);
    clearTimeout(initTimer);

    if (pyodideInitState === 'loading') {
      pyodideInitState = 'error';
      if (pyodideReadyReject) pyodideReadyReject(new Error('Worker error: ' + (err.message || 'Failed to load')));
    }

    for (const [id, req] of pendingWorkerRequests.entries()) {
      clearTimeout(req.timer);
      req.reject(new Error('Worker error: ' + (err.message || 'Execution error')));
    }
    pendingWorkerRequests.clear();
    resetPyWorker();
  };

  pyWorker.postMessage({ id: 0, type: 'init' });
  updatePyodideStatus('loading');
}

function updatePyodideStatus(status) {
  // Lifecycle notifications are toasts now — the toolbar only shows the
  // file label, so no status text can get stuck in a stale state.
  if (status === 'loading') {
    if (typeof toast === 'function') toast('Python loading…');
  } else if (status === 'ready') {
    if (typeof toast === 'function') toast('Python ready');
  } else if (status === 'error') {
    if (typeof toast === 'function') toast('Python error');
    appendTerminal('Failed to load Python environment. Check connection and reload.', 'stderr');
  }
}

function resetPyWorker() {
  if (pyWorker) {
    try { pyWorker.terminate(); } catch (e) {}
    pyWorker = null;
  }
  pyodideInitState = 'idle';
  pyodideReady = null;
  pyodideReadyResolve = null;
  pyodideReadyReject = null;
}

async function executePythonAsync(payload, timeoutMs = EXECUTION_TIMEOUT_MS) {
  if (!pyodideReady) {
    createPyWorker();
  }

  try {
    await pyodideReady;
  } catch (err) {
    throw new Error('Python environment failed to load: ' + err.message);
  }

  // Normalize payload to canonical form for worker
  const normalizedPayload = { ...payload };
  // Alias: cases -> testCases, batch-test -> run-batch
  if (normalizedPayload.cases && !normalizedPayload.testCases) {
    normalizedPayload.testCases = normalizedPayload.cases;
    delete normalizedPayload.cases;
  }
  if (normalizedPayload.type === 'batch-test' || normalizedPayload.type === 'batch_test') {
    normalizedPayload.type = 'run-batch';
  }

  return new Promise((resolve, reject) => {
    const id = ++currentRequestId;

    const timer = setTimeout(() => {
      pendingWorkerRequests.delete(id);
      resetPyWorker();
      reject(new Error('Time Limit Exceeded: Execution took longer than 7s (possible infinite loop).'));
    }, timeoutMs);

    pendingWorkerRequests.set(id, { resolve, reject, timer });

    try {
      pyWorker.postMessage({
        id,
        ...normalizedPayload
      });
    } catch (e) {
      clearTimeout(timer);
      pendingWorkerRequests.delete(id);
      reject(new Error('Failed to send to worker: ' + e.message));
    }
  });
}

function normalizeOutput(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/\r\n/g, '\n').replace(/\n+$/, '').trimEnd();
}

function compareOutputs(actual, expected) {
  return normalizeOutput(actual) === normalizeOutput(expected);
}

/* ==========================================================================
   Terminal / Console Output Management (Minimal & Professional)
   ========================================================================== */

let terminalLogs = [];

function appendTerminal(text, type = 'info') {
  const terminalEl = document.getElementById('terminalLogs');
  if (!terminalEl) return;

  let formatted = '';
  if (type === 'cmd') {
    formatted = `<div class="text-white/40 mt-1 text-[11px] font-mono">&gt; <span class="text-white/85">${escapeHtml(text)}</span></div>`;
  } else if (type === 'stdout') {
    formatted = `<div class="text-emerald-300/90 whitespace-pre-wrap font-mono text-[12px] leading-relaxed">${escapeHtml(text)}</div>`;
  } else if (type === 'stderr') {
    formatted = `<div class="text-red-400/90 whitespace-pre-wrap font-mono text-[12px] leading-relaxed">${escapeHtml(text)}</div>`;
  } else if (type === 'system') {
    formatted = `<div class="text-white/30 text-[10px] font-mono">${escapeHtml(text)}</div>`;
  } else {
    formatted = `<div class="text-white/60 whitespace-pre-wrap font-mono text-[12px] leading-relaxed">${escapeHtml(text)}</div>`;
  }

  terminalLogs.push(formatted);
  terminalEl.innerHTML = terminalLogs.join('');
  const container = terminalEl.closest('.overflow-y-auto');
  if (container) container.scrollTop = container.scrollHeight;
}

function initTerminal() {
  const terminalEl = document.getElementById('terminalLogs');
  if (!terminalEl) return;
  terminalLogs = [];
  terminalEl.innerHTML = '<div class="text-white/30 text-[11px] font-mono">Terminal ready. Click "Run" or "Submit" to execute.</div>';
}

// Export for Node tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeOutput, compareOutputs, EXECUTION_TIMEOUT_MS, INIT_TIMEOUT_MS };
}
