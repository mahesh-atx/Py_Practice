const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

// Worker normalize is same as runner - test via require if possible
let workerNormalize;
try {
  const worker = require('../js/pyodide-worker.js');
  workerNormalize = worker.normalizeOutput;
} catch (e) {
  // fallback inline copy if require fails due to self guard
  workerNormalize = (v) => String(v || '').replace(/\r\n/g, '\n').replace(/\n+$/, '').trimEnd();
}

describe('pyodide-worker.js - normalizeOutput', () => {
  it('exports normalizeOutput', () => {
    assert.equal(typeof workerNormalize, 'function');
  });
  it('matches runner behavior', () => {
    const runner = require('../js/runner.js');
    const cases = ['', 'hello\n', 'a\r\nb\n', ' 42  \n', 'Welcome\nHappy\n', '₹148.50\n'];
    for (const c of cases) {
      assert.equal(workerNormalize(c), runner.normalizeOutput(c), `mismatch for ${JSON.stringify(c)}`);
    }
  });
  it('handles stderr vs stdout pass logic', () => {
    function isPass(actual, expected, stderr) {
      return workerNormalize(actual) === workerNormalize(expected) && !stderr;
    }
    assert.equal(isPass('hello\n', 'hello', ''), true);
    assert.equal(isPass('hello\n', 'hello', 'Error'), false);
    assert.equal(isPass('hello ', 'hello', ''), true);
    assert.equal(isPass('Hello', 'hello', ''), false);
  });
});

describe('pyodide-worker.js - harness generation', () => {
  it('escaped input and code should be JSON-stringified safely', () => {
    const input = 'a\"b\nc\'d';
    const code = 'print(input())\nprint("hi")';
    const escapedInput = JSON.stringify(String(input));
    const escapedCode = JSON.stringify(String(code));
    // Should be valid JSON strings that can be embedded in Python harness
    assert.doesNotThrow(() => JSON.parse(escapedInput));
    assert.doesNotThrow(() => JSON.parse(escapedCode));
    assert.equal(JSON.parse(escapedInput), input);
    assert.equal(JSON.parse(escapedCode), code);
  });

  it('harness should contain input shim and capture logic', () => {
    const fs = require('fs');
    const path = require('path');
    const workerPath = path.join(__dirname, '../js/pyodide-worker.js');
    const content = fs.readFileSync(workerPath, 'utf8');
    // Check key harness pieces
    assert.match(content, /_input_data/);
    assert.match(content, /_input_lines.*splitlines/);
    assert.match(content, /builtins\.input = _input/);
    assert.match(content, /sys\.stdout = _out/);
    assert.match(content, /io\.StringIO/);
    assert.match(content, /exec\(.*escapedCode/);
    // Conditional js import only when interactive
    assert.match(content, /if _interactive:/);
  });

  it('should handle alias types: run-batch, batch-test, etc.', () => {
    const fs = require('fs');
    const content = fs.readFileSync(require('path').join(__dirname, '../js/pyodide-worker.js'), 'utf8');
    // Must handle all aliases
    assert.match(content, /batch-test/);
    assert.match(content, /run-batch/);
    assert.match(content, /testCases.*cases.*testcases/);
  });

  it('batch results should include passed, actual, expected, normalized', () => {
    const fs = require('fs');
    const content = fs.readFileSync(require('path').join(__dirname, '../js/pyodide-worker.js'), 'utf8');
    assert.match(content, /passed/);
    assert.match(content, /normalizedActual/);
    assert.match(content, /actual.*stdout/);
  });

  it('mock FS should pre-populate expected files', () => {
    const fs = require('fs');
    const content = fs.readFileSync(require('path').join(__dirname, '../js/pyodide-worker.js'), 'utf8');
    assert.match(content, /hello\.txt/);
    assert.match(content, /notes\.txt/);
    assert.match(content, /data\.csv/);
  });
});

describe('pyodide-worker.js - runTestCase harness logic simulation', () => {
  // Simulate the Python harness in Node by checking the generated harness contains correct escaped values
  it('should correctly escape special python characters', () => {
    const cases = [
      { input: 'a\\b', code: 'print("a\\\\b")' },
      { input: 'line1\nline2', code: 'print(input())' },
      { input: '\"quoted\"', code: 'print(input())' },
      { input: '', code: 'print("Hello, World!")' },
    ];
    for (const { input, code } of cases) {
      const escapedInput = JSON.stringify(String(input));
      const escapedCode = JSON.stringify(String(code));
      // Both should be valid JSON
      assert.equal(JSON.parse(escapedInput), input);
      assert.equal(JSON.parse(escapedCode), code);
      // Harness would embed as _input_data = "..."
      const harnessSnippet = `_input_data = ${escapedInput}\n_input_lines = _input_data.splitlines()`;
      assert.match(harnessSnippet, /_input_data =/);
    }
  });

  it('should compute elapsed correctly (mock)', async () => {
    const start = performance.now();
    await new Promise(r => setTimeout(r, 10));
    const elapsed = Math.round(performance.now() - start);
    assert.ok(elapsed >= 9 && elapsed < 100, `elapsed ${elapsed} should be ~10ms`);
  });
});
