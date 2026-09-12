/* PyPractice - Dedicated Pyodide Web Worker - FIXED v2 */
let pyodide = null;
let pyodideLoadingPromise = null;

function normalizeOutput(v) {
  if (v === null || v === undefined) return '';
  return String(v).replace(/\r\n/g, '\n').replace(/\n+$/, '').trimEnd();
}

async function initPyodide() {
  if (pyodide) return pyodide;
  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    if (typeof loadPyodide === 'undefined') {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js');
    }
    const py = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/'
    });
    pyodide = py;
    setupMockFS(py);
    return py;
  })();

  return pyodideLoadingPromise;
}

function baseMockFiles() {
  return {
    'hello.txt': 'Hello\nWorld\nPython file handling',
    'notes.txt': 'Learning Python\nPractice makes perfect\nLine 3 notes',
    'source.txt': 'Sample source content for copying and processing.',
    'data.csv': 'name,score\nNina,95\nAman,88\nRiya,92',
    // Shared defaults so file questions never hit FileNotFound.
    // Questions with their own needs override these via per-case mockFiles.
    'nums.txt': '5\n5\n5',
    'data.txt': '11\n11\n11',
    'a.txt': 'dog barks\ncat naps\ndog runs\nline one\nline two\nline three',
    'b.txt': 'x\ny\nz',
    'x.txt': 'hello from x',
    'y.txt': 'hello from y',
    'config.txt': 'host localhost\nport 8080',
    'counter.txt': '41'
  };
}

function setupMockFS(py) {
  try {
    const base = baseMockFiles();
    for (const [name, content] of Object.entries(base)) {
      try { py.FS.writeFile(name, content); } catch (e) {}
    }
  } catch (err) {
    // ignore - FS may not be ready on some pyodide builds
  }
}

function resetMockFS(py, mockFiles) {
  // Re-create base files before every case so deletions/appends from a
  // previous case never leak into the next one (the classic
  // "case 1 passes but case 2 fails" file-state bug).
  setupMockFS(py);
  if (mockFiles && typeof mockFiles === 'object') {
    for (const [filename, content] of Object.entries(mockFiles)) {
      try {
        py.FS.writeFile(filename, content);
      } catch (e) {}
    }
  }
}

async function runTestCase(py, code, inputValue, mockFiles, interactive, requestId) {
  resetMockFS(py, mockFiles);

  const escapedInput = JSON.stringify(String(inputValue || ''));
  const escapedCode = JSON.stringify(String(code || ''));
  const isInteractive = interactive ? 'True' : 'False';
  const escapedId = JSON.stringify(String(requestId || ''));

  // Unified stdin: input() and sys.stdin.read/readline share one buffer,
  // so solutions using either style (or a mix) see the same bytes.
  // input() strips exactly one trailing \r?\n, preserving other spaces.
  const harness = `
import sys, io, builtins

_input_data = ${escapedInput}
_stdin_buf = io.StringIO(_input_data)
_interactive = ${isInteractive}
_req_id = ${escapedId}
_pending_tokens = []
_orig_int = builtins.int
_orig_float = builtins.float

def _smart_int(x, base=10):
    if isinstance(x, str):
        s = x.strip()
        if s and (' ' in s or '\t' in s):
            parts = s.split()
            if len(parts) > 1:
                try:
                    _orig_int(parts[0], base) if base != 10 else _orig_int(parts[0])
                except Exception:
                    return _orig_int(x, base) if base != 10 else _orig_int(x)
                _pending_tokens.extend(parts[1:])
                return _orig_int(parts[0], base) if base != 10 else _orig_int(parts[0])
    return _orig_int(x, base) if base != 10 else _orig_int(x)

def _smart_float(x):
    if isinstance(x, str):
        s = x.strip()
        if s and (' ' in s or '\t' in s):
            parts = s.split()
            if len(parts) > 1:
                try:
                    _orig_float(parts[0])
                except Exception:
                    return _orig_float(x)
                _pending_tokens.extend(parts[1:])
                return _orig_float(parts[0])
    return _orig_float(x)

builtins.int = _smart_int
builtins.float = _smart_float
# copy attributes to keep int.from_bytes etc working
for _attr in dir(_orig_int):
    if not hasattr(_smart_int, _attr):
        try:
            setattr(_smart_int, _attr, getattr(_orig_int, _attr))
        except Exception:
            pass
for _attr in dir(_orig_float):
    if not hasattr(_smart_float, _attr):
        try:
            setattr(_smart_float, _attr, getattr(_orig_float, _attr))
        except Exception:
            pass

class _SmartStr(str):
    def __int__(self):
        global _pending_tokens
        parts = self.strip().split()
        if len(parts) > 1:
            try:
                _orig_int(parts[0])
            except Exception:
                return _orig_int(str(self))
            _pending_tokens.extend(parts[1:])
            return _orig_int(parts[0])
        return _orig_int(str(self))
    def __float__(self):
        global _pending_tokens
        parts = self.strip().split()
        if len(parts) > 1:
            try:
                _orig_float(parts[0])
            except Exception:
                return _orig_float(str(self))
            _pending_tokens.extend(parts[1:])
            return _orig_float(parts[0])
        return _orig_float(str(self))
    def split(self, sep=None, maxsplit=-1):
        if sep is None:
            try:
                remaining = _stdin_buf.getvalue()[_stdin_buf.tell():]
            except Exception:
                remaining = ""
            pending_extra = list(_pending_tokens) if _pending_tokens else []
            has_extra = (remaining and remaining.strip()) or pending_extra
            if has_extra:
                base = super().split(sep, maxsplit) if maxsplit != -1 else super().split()
                remaining_tokens = remaining.split() if remaining and remaining.strip() else []
                # Merge policy: pending tokens always visible; remaining buffer only
                # merged when base is a single token (e.g. "7" with remaining "5").
                # This lets a,b=map(int,input().split()) work on multiline "7\\n5"
                # or "10\\n20\\n30" without breaking structured inputs like
                # "1 5\\n3 8" where each line is a distinct record and must stay separate.
                if pending_extra:
                    # pending was queued via _smart_int/_smart_float from a prior line
                    # that contained multiple space-separated values; always expose it
                    if len(base) == 1 and remaining_tokens:
                        rem = pending_extra + remaining_tokens
                        if maxsplit == -1:
                            _pending_tokens.clear()
                            return base + rem
                        else:
                            combined = str(self) + "\\n" + "\\n".join(pending_extra) + "\\n" + remaining
                            _pending_tokens.clear()
                            return combined.split(sep, maxsplit)
                    else:
                        # base already has multiple tokens (structured line) — only expose pending
                        if maxsplit == -1:
                            _pending_tokens.clear()
                            return base + pending_extra
                        else:
                            combined = str(self) + "\\n" + "\\n".join(pending_extra)
                            _pending_tokens.clear()
                            return combined.split(sep, maxsplit)
                else:
                    # No pending — only merge remaining when base is single-token
                    # (single number per line case). For multi-token lines, keep
                    # the line boundary intact so "1 5\\n3 8" stays as two separate
                    # reads: first split -> ["1","5"], second -> ["3","8"]
                    if len(base) == 1 and remaining_tokens:
                        if maxsplit == -1:
                            return base + remaining_tokens
                        else:
                            combined = str(self) + "\\n" + remaining
                            return combined.split(sep, maxsplit)
                    else:
                        if maxsplit == -1:
                            return base
                        else:
                            return super().split(sep, maxsplit)
            if maxsplit == -1:
                return super().split()
            else:
                return super().split(sep, maxsplit)
        else:
            if maxsplit == -1:
                return super().split(sep)
            else:
                return super().split(sep, maxsplit)

def _input(prompt=''):
    global _stdin_buf, _pending_tokens
    if prompt:
        print(prompt, end='')
    if _pending_tokens:
        return _SmartStr(_pending_tokens.pop(0))
    if _interactive:
        from js import XMLHttpRequest, self
        from pyodide.ffi import to_js
        if prompt:
            msg = {'type': 'stdout', 'id': _req_id, 'text': prompt}
            self.postMessage(to_js(msg, dict_converter=lambda x: x))
        xhr = XMLHttpRequest.new()
        xhr.open('GET', f'/api/get-input?id={_req_id}', False)
        xhr.send(None)
        if xhr.status == 200:
            val = xhr.responseText.rstrip('\\n')
            return _SmartStr(val)
        else:
            raise EOFError('Input cancelled or failed')
    else:
        line = _stdin_buf.readline()
        if line == '':
            raise EOFError('No more input values.')
        if line.endswith('\\r\\n'):
            stripped = line[:-2]
        elif line.endswith('\\n') or line.endswith('\\r'):
            stripped = line[:-1]
        else:
            stripped = line
        return _SmartStr(stripped)

_out = io.StringIO()
_err = io.StringIO()
_original_input = builtins.input
_original_stdout = sys.stdout
_original_stderr = sys.stderr
_original_stdin = sys.stdin

try:
    builtins.input = _input
    sys.stdout = _out
    sys.stderr = _err
    sys.stdin = _stdin_buf
    exec(${escapedCode}, {})
except Exception as _exc:
    import traceback
    _err.write(type(_exc).__name__ + ': ' + str(_exc))
finally:
    builtins.input = _original_input
    builtins.int = _orig_int
    builtins.float = _orig_float
    sys.stdout = _original_stdout
    sys.stderr = _original_stderr
    try:
        sys.stdin = _original_stdin
    except Exception:
        pass

(_out.getvalue(), _err.getvalue())
`;

  const startTime = performance.now();
  const result = await py.runPythonAsync(harness);
  const jsResult = result.toJs ? result.toJs() : result;
  const stdout = String(jsResult[0] || '');
  const stderr = String(jsResult[1] || '');
  if (result.destroy) result.destroy();
  const elapsed = Math.round(performance.now() - startTime);

  return {
    stdout,
    stderr,
    elapsed
  };
}

if (typeof self !== 'undefined') {
self.onmessage = async (event) => {
  const data = event.data || {};
  const { id, type, code, input, mockFiles } = data;
  // Support alias field names: testCases / cases / testcases
  const rawCases = data.testCases || data.cases || data.testcases || data.test_cases || null;

  if (type === 'init') {
    try {
      await initPyodide();
      self.postMessage({ id, type: 'init-ready' });
    } catch (err) {
      self.postMessage({ id, type: 'init-error', error: err.message || String(err) });
    }
    return;
  }

  // Single test execution (legacy)
  if (type === 'run-single') {
    try {
      const py = await initPyodide();
      const res = await runTestCase(py, code, input, mockFiles, data.interactive, id);
      const passed = normalizeOutput(res.stdout) === normalizeOutput(data.expected || data.output || '') && !res.stderr;
      self.postMessage({
        id,
        type: 'run-result',
        stdout: res.stdout,
        stderr: res.stderr,
        elapsed: res.elapsed,
        actual: res.stdout,
        expected: data.expected || data.output || '',
        passed
      });
    } catch (err) {
      self.postMessage({
        id,
        type: 'run-error',
        error: err.message || String(err)
      });
    }
    return;
  }

  // Batch execution - handles all aliases: run-batch, batch-test, batch_test, run_batch
  if (type === 'run-batch' || type === 'batch-test' || type === 'batch_test' || type === 'run_batch') {
    try {
      const py = await initPyodide();
      const casesList = Array.isArray(rawCases) ? rawCases : [];
      const results = [];
      for (const tc of casesList) {
        // tc may have input/output or input/expected
        const tcInput = tc.input ?? '';
        const tcExpected = tc.output ?? tc.expected ?? '';
        const tcLabel = tc.label || '';
        const tcHidden = !!tc.hidden;
        const tcMockFiles = tc.mockFiles || mockFiles || null;
        const res = await runTestCase(py, code, tcInput, tcMockFiles, false, id);
        const actualNorm = normalizeOutput(res.stdout);
        const expectedNorm = normalizeOutput(tcExpected);
        const passed = actualNorm === expectedNorm && !res.stderr;
        results.push({
          input: tcInput,
          output: tcExpected,
          expected: tcExpected,
          label: tcLabel,
          hidden: tcHidden,
          stdout: res.stdout,
          actual: res.stdout,
          stderr: res.stderr,
          elapsed: res.elapsed,
          passed,
          normalizedActual: actualNorm,
          normalizedExpected: expectedNorm
        });
      }
      self.postMessage({
        id,
        type: 'batch-result',
        results
      });
    } catch (err) {
      self.postMessage({
        id,
        type: 'run-error',
        error: err.message || String(err)
      });
    }
    return;
  }

  // Unknown type - return error to avoid hanging
  self.postMessage({ id, type: 'run-error', error: `Unknown execution type: ${type}` });
};
} // end self guard

// Export for Node testing (not used in browser worker context)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeOutput, runTestCase, baseMockFiles, resetMockFS };
}
