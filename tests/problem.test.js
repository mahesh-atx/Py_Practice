const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

describe('problem.js - ID and DOM contract', () => {
  it('should reference correct DOM IDs (customInputText, customOutputPanel)', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    assert.match(p, /customInputText/, 'should use customInputText not customInputTextarea');
    assert.doesNotMatch(p, /getElementById\('customInputTextarea'\)/, 'should not have old wrong ID');
    assert.match(p, /customOutputPanel/);
    assert.match(p, /customInputToggle/);
  });

  it('should use canonical payload type run-batch and testCases', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    assert.match(p, /type:\s*'run-batch'/);
    assert.match(p, /testCases:\s*casesToRun/);
    // Should not still use old batch-test only
    // We check it handles but canonical is run-batch
    assert.match(p, /executePythonAsync/);
  });

  it('should handle explanationPanel safely (no crash if explanationText missing)', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    // Should check for explanationText existence or use fallback
    assert.match(p, /getElementById\('explanationText'\)/);
    // Should also have guard for missing element (our fix adds check)
    assert.match(p, /if \(explText\)/);
    assert.match(p, /explanation\.innerHTML/);
  });

  it('should compute badge correctly via passed filter', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    // Old buggy code used indexOf, new should use direct passed count
    assert.doesNotMatch(p, /res\.results\.indexOf/);
    // Should count via Object.values(testCaseResults).filter
    assert.match(p, /Object\.values\(testCaseResults\)/);
  });

  it('should handle custom input as special case (not graded)', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    assert.match(p, /isCustom/);
    assert.match(p, /Custom Input/);
    assert.match(p, /customOutputPanel/);
    // Custom branch should return early and not go to allPassed logic
    assert.match(p, /if \(isCustom\)[\s\S]*?return;/);
  });

  it('run feedback goes to the toast, not the toolbar status', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    // Transient "Running…" messages are toasts now
    assert.match(p, /toast\(mode === 'submit' \? 'Running all test cases…' : 'Running sample…'\)/);
    // The toolbar only shows the file label now — runner.js owns the
    // Python status (as toasts) and problem.js must not touch it.
    assert.doesNotMatch(p, /runnerStatus/);
    assert.doesNotMatch(p, /pyodideStatus/);
  });

  it('pyodide lifecycle status is toasted, not written to the toolbar', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/runner.js'), 'utf8');
    assert.match(p, /toast\('Python loading…'\)/);
    assert.match(p, /toast\('Python ready'\)/);
    assert.match(p, /toast\('Python error'\)/);
    assert.doesNotMatch(p, /getElementById\('pyodideStatus'\)/);
  });

  it('should have robust result mapping (actual/stdout, expected/output)', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    assert.match(p, /r\.actual \?\? r\.stdout/);
    assert.match(p, /r\.expected \?\? r\.output/);
    assert.match(p, /normalizeOutput/);
  });
});

describe('problem.js - result mapping logic (pure)', () => {
  const runner = require('../js/runner.js');
  const { normalizeOutput } = runner;

  function mapResults(results, casesToRun) {
    return results.map((r, idx) => {
      const actual = r.actual ?? r.stdout ?? '';
      const expected = r.expected ?? r.output ?? (casesToRun[idx] ? casesToRun[idx].output : '');
      let passed = r.passed;
      if (typeof passed === 'undefined') {
        passed = normalizeOutput(actual) === normalizeOutput(expected) && !(r.stderr && String(r.stderr).trim());
      }
      return { actual, expected, passed, elapsed: r.elapsed ?? 0, stderr: r.stderr ?? '' };
    });
  }

  it('should map worker stdout/output to actual/expected', () => {
    const cases = [{ input: '5', output: 'Hello' }];
    const results = [{ stdout: 'Hello\n', output: 'Hello', stderr: '' }];
    const mapped = mapResults(results, cases);
    assert.equal(mapped[0].actual, 'Hello\n');
    assert.equal(mapped[0].expected, 'Hello');
    assert.equal(mapped[0].passed, true);
  });

  it('should compute passed when missing', () => {
    const cases = [{ output: '42' }];
    const results = [{ stdout: '42\n', stderr: '' }]; // no passed, no output field
    const mapped = mapResults(results, cases);
    assert.equal(mapped[0].passed, true);

    const fail = mapResults([{ stdout: '43\n', stderr: '' }], [{ output: '42' }]);
    assert.equal(fail[0].passed, false);
  });

  it('stderr should make passed false even if output matches', () => {
    const cases = [{ output: 'hello' }];
    const results = [{ stdout: 'hello', stderr: 'Traceback...', output: 'hello' }];
    const mapped = mapResults(results, cases);
    assert.equal(mapped[0].passed, false);
  });

  it('should handle CRLF and trailing spaces', () => {
    const cases = [{ output: 'Hello, World!' }];
    const results = [{ stdout: 'Hello, World!\r\n', stderr: '' }];
    const mapped = mapResults(results, cases);
    assert.equal(mapped[0].passed, true);
  });

  it('badge count logic', () => {
    const results = [
      { passed: true }, { passed: false }, { passed: true }
    ];
    const mapped = results.map(r => ({ passed: r.passed }));
    const correctPassed = mapped.filter(v => v.passed).length;
    assert.equal(correctPassed, 2);
  });

  it('custom input should not be graded but show hasError', () => {
    function customPassed(stdout, stderr) {
      return !stderr || !String(stderr).trim();
    }
    assert.equal(customPassed('some output', ''), true);
    assert.equal(customPassed('', ''), true);
    assert.equal(customPassed('output', 'Error'), false);
    assert.equal(customPassed('', 'Traceback'), false);
  });
});

describe('problem.js - file handles (mock)', () => {
  it('problem.html should have required elements', () => {
    const html = fs.readFileSync(path.join(__dirname, '../problem.html'), 'utf8');
    assert.match(html, /id="customInputText"/);
    assert.match(html, /id="customOutputPanel"/);
    assert.match(html, /id="customInputToggle"/);
    assert.match(html, /id="testCaseTabsContainer"/);
    assert.match(html, /id="selectedTestCaseDetail"/);
    // Lifecycle status moved to toasts — no status element in the toolbar
    assert.doesNotMatch(html, /id="pyodideStatus"/);
    assert.match(html, /id="runBtn"/);
    assert.match(html, /id="submitBtn"/);
    assert.match(html, /id="resultPanel"/);
    assert.match(html, /id="explanationPanel"/);
  });

  it('reset button lives in the editor toolbar next to Run/Submit', () => {
    const html = fs.readFileSync(path.join(__dirname, '../problem.html'), 'utf8');
    const toolbarIdx = html.indexOf('id="editorToolbar"');
    const resetIdx = html.indexOf('id="resetBtn"');
    const submitIdx = html.indexOf('id="submitBtn"');
    assert.notEqual(toolbarIdx, -1, 'editorToolbar exists');
    assert.notEqual(resetIdx, -1, 'resetBtn exists');
    assert.notEqual(submitIdx, -1, 'submitBtn exists');
    assert.ok(resetIdx > toolbarIdx && resetIdx < submitIdx,
      'resetBtn should sit inside the toolbar, before the Run/Submit group');
  });
});
