const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

// Import runner helpers (safe in Node - no Worker/document at require-time)
const runner = require('../js/runner.js');

describe('runner.js - normalizeOutput', () => {
  const { normalizeOutput, compareOutputs, EXECUTION_TIMEOUT_MS } = runner;

  it('should be defined and exported', () => {
    assert.equal(typeof normalizeOutput, 'function');
    assert.equal(typeof compareOutputs, 'function');
  });

  it('should handle empty and null inputs', () => {
    assert.equal(normalizeOutput(''), '');
    assert.equal(normalizeOutput(null), '');
    assert.equal(normalizeOutput(undefined), '');
    assert.equal(normalizeOutput(0), '0');
  });

  it('should convert CRLF to LF', () => {
    assert.equal(normalizeOutput('a\r\nb\r\n'), 'a\nb');
    assert.equal(normalizeOutput('line1\r\nline2'), 'line1\nline2');
  });

  it('should strip trailing newlines', () => {
    assert.equal(normalizeOutput('hello\n'), 'hello');
    assert.equal(normalizeOutput('hello\n\n\n'), 'hello');
    assert.equal(normalizeOutput('hello\n\n'), 'hello');
    // internal newlines preserved
    assert.equal(normalizeOutput('a\nb\n'), 'a\nb');
  });

  it('should trim trailing spaces/tabs', () => {
    assert.equal(normalizeOutput('hello   '), 'hello');
    assert.equal(normalizeOutput('hello\t  \n'), 'hello');
    assert.equal(normalizeOutput('a  \n b  \n'), 'a  \n b');
  });

  it('should preserve internal spacing', () => {
    assert.equal(normalizeOutput('a  b   c'), 'a  b   c');
    assert.equal(normalizeOutput('  hello world  '), '  hello world');
  });

  it('should handle multi-line with mixed endings', () => {
    assert.equal(normalizeOutput('line1\r\nline2\nline3\r\n'), 'line1\nline2\nline3');
  });

  it('compareOutputs should use normalize', () => {
    assert.equal(compareOutputs('hello\n', 'hello'), true);
    assert.equal(compareOutputs('hello\r\n', 'hello\n'), true);
    assert.equal(compareOutputs('hello   \n', 'hello'), true);
    assert.equal(compareOutputs('Hello', 'hello'), false);
    assert.equal(compareOutputs('a b', 'a  b'), false);
    assert.equal(compareOutputs('', ''), true);
    assert.equal(compareOutputs('  42  \n', '42'), false); // leading spaces are significant -> '  42' !== '42'
    assert.equal(compareOutputs('  42  \n', '  42'), true); // same leading, trailing trimmed
    assert.equal(compareOutputs('42 \n', '42'), true);
  });

  it('EXECUTION_TIMEOUT_MS should be 7000 per spec', () => {
    assert.equal(EXECUTION_TIMEOUT_MS, 7000);
  });

  it('should handle unicode and numbers', () => {
    assert.equal(normalizeOutput('₹148.50\n'), '₹148.50');
    assert.equal(normalizeOutput('Hello, World!\n'), 'Hello, World!');
  });
});

describe('runner.js - payload alias handling (via runner logic)', () => {
  it('cases -> testCases alias should be handled', () => {
    // Simulate normalizePayload logic from runner.js
    function normalizePayload(payload) {
      const out = { ...payload };
      if (out.cases && !out.testCases) {
        out.testCases = out.cases;
        delete out.cases;
      }
      if (out.type === 'batch-test' || out.type === 'batch_test') out.type = 'run-batch';
      return out;
    }
    let p = normalizePayload({ type: 'batch-test', cases: [{ input: 'a', output: 'b' }] });
    assert.equal(p.type, 'run-batch');
    assert.deepEqual(p.testCases, [{ input: 'a', output: 'b' }]);
    assert.equal(p.cases, undefined);

    p = normalizePayload({ type: 'run-batch', testCases: [{ input: 'x' }] });
    assert.equal(p.type, 'run-batch');
    assert.deepEqual(p.testCases, [{ input: 'x' }]);
  });

  it('enriched batch results should compute passed correctly', () => {
    const { normalizeOutput } = runner;
    function enrich(results) {
      return results.map(r => {
        if (typeof r.passed !== 'undefined') return r;
        const actual = r.actual ?? r.stdout ?? '';
        const expected = r.expected ?? r.output ?? '';
        const passed = normalizeOutput(actual) === normalizeOutput(expected) && !r.stderr;
        return { ...r, actual, expected, passed };
      });
    }

    let out = enrich([{ stdout: 'hello\n', output: 'hello', stderr: '' }]);
    assert.equal(out[0].passed, true);
    assert.equal(out[0].actual, 'hello\n');

    out = enrich([{ stdout: 'hello\n', output: 'HELLO', stderr: '' }]);
    assert.equal(out[0].passed, false);

    out = enrich([{ stdout: 'hello\n', output: 'hello', stderr: 'Error' }]);
    assert.equal(out[0].passed, false); // stderr makes fail

    out = enrich([{ actual: '42', expected: '42\r\n', stderr: '' }]);
    assert.equal(out[0].passed, true);

    out = enrich([{ actual: '42 ', expected: '42', stderr: '' }]);
    // '42 ' -> normalize -> '42' -> true
    assert.equal(out[0].passed, true);

    // Already has passed should be preserved
    out = enrich([{ stdout: 'a', output: 'b', passed: true }]);
    assert.equal(out[0].passed, true);
  });
});

describe('runner.js - output edge cases from real questions', () => {
  const { normalizeOutput } = runner;
  it('Hello World with newline', () => {
    assert.equal(normalizeOutput('Hello, World!\n'), normalizeOutput('Hello, World!'));
  });
  it('multi-line Welcome', () => {
    assert.equal(normalizeOutput('Welcome to Python\nHappy Coding\n'), 'Welcome to Python\nHappy Coding');
    assert.equal(normalizeOutput('Welcome to Python\nHappy Coding'), 'Welcome to Python\nHappy Coding');
  });
  it('receipt formatting must be exact', () => {
    const a = 'Subtotal: 420.00\nTax: 42.00\nTotal: 462.00';
    const b = 'Subtotal: 420.00\nTax: 42.00\nTotal: 462.00\n';
    assert.equal(normalizeOutput(a), normalizeOutput(b));
  });
  it('trailing spaces should be ignored', () => {
    assert.equal(normalizeOutput('1 2 3   '), normalizeOutput('1 2 3'));
  });
});
