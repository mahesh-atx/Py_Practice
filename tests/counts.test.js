const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const { topics, questionSeeds, TOPIC_SOURCE } = require(path.join(ROOT, 'js', 'topics-data.js'));

const htmlFiles = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html'))
  .map(f => ({ name: f, text: fs.readFileSync(path.join(ROOT, f), 'utf8') }));

const canonical = n => TOPIC_SOURCE[n] || n;

/* The number the UI should show, derived the same way core.js derives it. */
function derivedTotal() {
  const ids = new Set();
  for (const t of topics) {
    const s = questionSeeds[t.name] || {};
    for (const lvl of ['basic', 'intermediate', 'advanced']) {
      const arr = s[lvl] || [];
      for (let i = 0; i < arr.length; i++) ids.add(`${canonical(t.name)}__${lvl}__${i + 1}`);
    }
  }
  return ids.size;
}

const TOTAL = derivedTotal();

describe('question counts are derived, not hardcoded', () => {
  it('derived total is stable and sane', () => {
    assert.ok(TOTAL > 500, `expected a few hundred questions, got ${TOTAL}`);
    assert.equal(topics.length, 21);
  });

  it('no page still says 162', () => {
    for (const f of htmlFiles) {
      assert.doesNotMatch(f.text, /\b162\b/, `${f.name} still contains the stale 162 count`);
    }
    const readme = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
    assert.doesNotMatch(readme, /\b162\b/, 'README still contains the stale 162 count');
  });

  it('SEO copy states the real total', () => {
    // Crawlers don't run JS, so marketing copy has to stay literal — but it
    // must match the data. Matched narrowly: a loose regex picks up runtime
    // placeholders like practice.html's per-level count.
    const patterns = [
      /\| (\d+) Interactive Exercises/,
      /(\d+) in-browser interactive coding questions/,
      /(\d+) in-browser interactive coding exercises/,
      /Master Python with (\d+) interactive problems/,
      /by solving (\d+) exercises/,
      /(\d+) interactive coding challenges/,
      /with (\d+) structured questions\./,
      /(\d+) hand-crafted exercises/
    ];
    for (const f of htmlFiles) {
      for (const re of patterns) {
        const m = f.text.match(re);
        if (m) assert.equal(Number(m[1]), TOTAL, `${f.name} says "${m[0]}" but the data has ${TOTAL}`);
      }
    }
  });

  it('data-total-* placeholders hold the real values', () => {
    // What renders before JS runs, or if JS fails.
    for (const f of htmlFiles) {
      for (const m of f.text.matchAll(/<span data-total-topics>(\d+)<\/span>/g)) {
        assert.equal(Number(m[1]), topics.length, `${f.name} topic placeholder is ${m[1]}`);
      }
      for (const m of f.text.matchAll(/<span data-total-questions>(\d+)<\/span>/g)) {
        assert.equal(Number(m[1]), TOTAL, `${f.name} question placeholder is ${m[1]}`);
      }
    }
  });

  it('index and guide wire up both count hooks', () => {
    for (const name of ['index.html', 'guide.html']) {
      const f = htmlFiles.find(x => x.name === name);
      assert.ok(f.text.includes('data-total-topics'), `${name} missing data-total-topics`);
      assert.ok(f.text.includes('data-total-questions'), `${name} missing data-total-questions`);
    }
  });

  it('core.js exposes derived counters and no longer hardcodes totals', () => {
    const core = fs.readFileSync(path.join(ROOT, 'js', 'core.js'), 'utf8');
    assert.match(core, /function totalQuestions\(\)/);
    assert.match(core, /function totalTopics\(\)/);
    assert.doesNotMatch(core, /\/18`/, 'core.js still hardcodes a /18 topic total');
  });

  it('learn.js no longer hardcodes topic or level counts', () => {
    const learn = fs.readFileSync(path.join(ROOT, 'js', 'learn.js'), 'utf8');
    assert.doesNotMatch(learn, /\/18 started/, 'learn.js still hardcodes the topic total');
    assert.doesNotMatch(learn, /Basic \(3\)/, 'learn.js still hardcodes level counts');
    assert.match(learn, /questionsFor\(t\.name, 'basic'\)\.length/);
  });

  it('app.js runs the count sync on every page', () => {
    const app = fs.readFileSync(path.join(ROOT, 'js', 'app.js'), 'utf8');
    assert.ok(app.includes('syncDerivedCounts'), 'app.js never calls syncDerivedCounts()');
  });
});
