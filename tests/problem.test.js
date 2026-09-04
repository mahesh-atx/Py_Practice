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

  it('every themed page configures Tailwind darkMode class before the CDN (theme toggle must work everywhere)', () => {
    const files = fs.readdirSync(path.join(__dirname, '..')).filter(f => f.endsWith('.html'));
    for (const file of files) {
      const html = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
      if (!html.includes('data-theme-toggle')) continue; // no toggle (e.g. auth pages force light)
      const cfgIdx = html.indexOf("darkMode: 'class'");
      assert.notEqual(cfgIdx, -1, `${file}: must configure darkMode class for the theme toggle to work`);
      const cdnIdx = html.indexOf('cdn.tailwindcss.com');
      assert.notEqual(cdnIdx, -1, `${file}: Tailwind CDN missing`);
      assert.ok(cfgIdx < cdnIdx, `${file}: darkMode config must be set BEFORE the CDN script loads`);
    }
  });

  it('practice page: no "across this topic" wording; topics page has no reset-progress button', () => {
    const pages = fs.readFileSync(path.join(__dirname, '../js/pages.js'), 'utf8');
    assert.doesNotMatch(pages, /across this topic/);
    const topics = fs.readFileSync(path.join(__dirname, '../topics.html'), 'utf8');
    assert.doesNotMatch(topics, /data-reset-progress/);
    // Reset stays available on the profile page
    const profile = fs.readFileSync(path.join(__dirname, '../profile.html'), 'utf8');
    assert.match(profile, /data-reset-progress/);
  });

  it('problem page switches questions in place with a transition (no full reload)', () => {
    const prob = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    assert.match(prob, /function renderQuestion\(\)/);
    assert.match(prob, /function switchQuestion\(targetIndex\)/);
    assert.match(prob, /history\.pushState\(\{ problem:/);
    assert.match(prob, /direction === 'next' \? 'q-out-next' : 'q-out-prev'/);
    assert.match(prob, /addEventListener\('popstate'/);
    // The Accepted banner's Next Question switches in place
    assert.match(prob, /switchQuestion\(index \+ 1\)/);
    const css = fs.readFileSync(path.join(__dirname, '../css/app.css'), 'utf8');
    assert.match(css, /\.q-out-next \{ opacity: 0; transform: translateX\(-16px\); \}/);
    const html = fs.readFileSync(path.join(__dirname, '../problem.html'), 'utf8');
    assert.match(html, /id="problemStatement"/);
  });

  it('level selection is respected: cards link at filtered level, tabs switch in place', () => {
    const pages = fs.readFileSync(path.join(__dirname, '../js/pages.js'), 'utf8');
    // Directory cards must open at the selected level filter (basic for "All levels"),
    // not a hardcoded basic — that was the "clicking intermediate stays on basic" bug.
    assert.match(pages, /const linkLevel = level !== 'all' \? level : 'basic';/);
    assert.match(pages, /practice\.html\?topic=\$\{encodeURIComponent\(t\.name\)\}&level=\$\{linkLevel\}/);
    // Practice topic-view tabs switch in place (no full reload), URL stays shareable via pushState.
    assert.match(pages, /history\.pushState\(\{ practiceLevel: lvl \}/);
    assert.match(pages, /levels\.includes\(a\.dataset\.level\)/);
    // Invalid level in URL falls back to basic instead of crashing.
    assert.match(pages, /levels\.includes\(params\.get\('level'\)\) \? params\.get\('level'\) : 'basic'/);
    // Back/forward re-syncs level from the URL.
    assert.match(pages, /addEventListener\('popstate'/);
  });

  it('question links hand off their target for query-string-dropping environments', () => {
    const core = fs.readFileSync(path.join(__dirname, '../js/core.js'), 'utf8');
    const app = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
    const prob = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    assert.match(core, /function rememberNavTarget/);
    assert.match(core, /function takeNavTarget/);
    assert.match(app, /a\[href\*="problem\.html"\]/);
    assert.match(app, /rememberNavTarget\(target\)/);
    assert.match(prob, /takeNavTarget\(\)/);
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

  it('login/signup: mobile-only full-screen card with no page scroll', () => {
    for (const page of ['login.html', 'signup.html']) {
      const html = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
      assert.match(html, /@media \(max-width: 767px\)/, page + ': mobile-only rule block');
      assert.match(html, /overflow: hidden !important/, page + ': page scroll disabled on mobile');
      assert.match(html, /height: 100dvh !important/, page + ': dynamic viewport height');
      assert.match(html, /body > main[\s\S]{0,300}?max-width: none !important/, page + ': card is full-width on mobile');
      assert.match(html, /border-radius: 0 !important/, page + ': card corners removed on mobile');
      assert.match(html, /#leftIllustrationPane \{ height: 240px !important; \}/, page + ': illustration shrinks on mobile');
      assert.match(html, /#rightFormPane[\s\S]{0,400}?overflow-y: auto !important/, page + ': form area absorbs remaining height');
    }
  });

  it('progress page: compact mobile cards — index numbers hidden, arrow in the row', () => {
    const pages = fs.readFileSync(path.join(__dirname, '../js/pages.js'), 'utf8');
    const start = pages.indexOf('function initProgressPage');
    assert.ok(start !== -1, 'initProgressPage exists');
    const body = pages.slice(start, start + 9000);
    assert.match(body, /flex flex-row items-start gap-3\.5 sm:items-center sm:justify-between sm:gap-6 p-4 sm:p-6/,
      'card is a single row on mobile (icon | content | arrow) with tighter padding');
    assert.match(body, /class="hidden sm:inline font-mono text-xs sm:text-sm font-bold/,
      '01/02 index is hidden on mobile, kept on desktop');
  });
});
