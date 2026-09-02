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

function setupMockFS(py) {
  try {
    py.FS.writeFile('hello.txt', 'Hello\nWorld\nPython file handling');
    py.FS.writeFile('notes.txt', 'Learning Python\nPractice makes perfect\nLine 3 notes');
    py.FS.writeFile('source.txt', 'Sample source content for copying and processing.');
    py.FS.writeFile('data.csv', 'name,score\nNina,95\nAman,88\nRiya,92');
  } catch (err) {
    // ignore - FS may not be ready on some pyodide builds
  }
}

async function runTestCase(py, code, inputValue, mockFiles, interactive, requestId) {
  if (mockFiles && typeof mockFiles === 'object') {
    for (const [filename, content] of Object.entries(mockFiles)) {
      try {
        py.FS.writeFile(filename, content);
      } catch (e) {}
    }
  }

  const escapedInput = JSON.stringify(String(inputValue || ''));
  const escapedCode = JSON.stringify(String(code || ''));
  const isInteractive = interactive ? 'True' : 'False';
  const escapedId = JSON.stringify(String(requestId || ''));

  // Conditional import of js helpers only when interactive to avoid overhead/bugs
  const harness = `
import sys, io, builtins

_input_data = ${escapedInput}
_input_lines = _input_data.splitlines()
_input_index = 0
_interactive = ${isInteractive}
_req_id = ${escapedId}

def _input(prompt=''):
    global _input_index
    if prompt:
        print(prompt, end='')
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
            return val
        else:
            raise EOFError('Input cancelled or failed')
    else:
        if _input_index >= len(_input_lines):
            raise EOFError('No more input values.')
        value = _input_lines[_input_index]
        _input_index += 1
        return value

_out = io.StringIO()
_err = io.StringIO()
_original_input = builtins.input
_original_stdout = sys.stdout
_original_stderr = sys.stderr

try:
    builtins.input = _input
    sys.stdout = _out
    sys.stderr = _err
    exec(${escapedCode}, {})
except Exception as _exc:
    import traceback
    _err.write(type(_exc).__name__ + ': ' + str(_exc))
finally:
    builtins.input = _original_input
    sys.stdout = _original_stdout
    sys.stderr = _original_stderr

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
  module.exports = { normalizeOutput, runTestCase };
}
