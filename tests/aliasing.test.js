const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOPICS_SRC = fs.readFileSync(path.join(ROOT, 'js', 'topics-data.js'), 'utf8');
const CORE_SRC = fs.readFileSync(path.join(ROOT, 'js', 'core.js'), 'utf8');

/* Load topics-data.js + core.js in a sandbox with a fake localStorage, so
   the real progress-migration code runs instead of a copy of it. */
function loadCore(seededSolved) {
  const store = new Map();
  if (seededSolved) {
    store.set('pypractice-progress-v3', JSON.stringify(seededSolved));
  }

  const localStorage = {
    getItem: k => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: k => store.delete(k)
  };

  const noop = () => {};
  const el = {
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    setAttribute: noop, getAttribute: () => null, addEventListener: noop,
    appendChild: noop, removeChild: noop,
    querySelector: () => null, querySelectorAll: () => [],
    style: {}, dataset: {}, innerHTML: '', textContent: '', value: ''
  };
  const document = {
    addEventListener: noop, createElement: () => el,
    getElementById: () => null, querySelector: () => null,
    querySelectorAll: () => [], documentElement: el, body: el
  };

  const sandbox = {
    localStorage, console, module: { exports: {} },
    document,
    window: { addEventListener: noop, matchMedia: () => ({ matches: false, addEventListener: noop }) },
    navigator: { clipboard: { writeText: async () => {} } },
    setTimeout, clearTimeout
  };
  vm.createContext(sandbox);
  vm.runInContext(TOPICS_SRC, sandbox);
  vm.runInContext(CORE_SRC, sandbox);

  return {
    sandbox,
    saved: () => JSON.parse(store.get('pypractice-progress-v3') || '{}'),
    store
  };
}

describe('canonical question ids', () => {
  it('topics sharing a bucket resolve to one id', () => {
    const { sandbox } = loadCore();
    const a = sandbox.questionsFor('List Comprehension', 'basic')[0];
    const b = sandbox.questionsFor('Comprehension', 'basic')[0];
    assert.equal(a.id, b.id);
    // Same question, so solving one marks the other done.
    assert.equal(a.title, b.title);
  });

  it('Variables and Data Types keep distinct ids', () => {
    const { sandbox } = loadCore();
    const a = sandbox.questionsFor('Variables', 'basic')[0];
    const b = sandbox.questionsFor('Data Types', 'basic')[0];
    assert.notEqual(a.id, b.id);
    assert.equal(a.id, 'Variables__basic__1');
    assert.equal(b.id, 'Data Types__basic__1');
  });

  it('topics with their own content keep their own namespace', () => {
    const { sandbox } = loadCore();
    const q = sandbox.questionsFor('For Loops', 'basic')[0];
    assert.equal(q.id, 'For Loops__basic__1');
    const s = sandbox.questionsFor('Strings', 'basic')[0];
    assert.equal(s.id, 'Strings__basic__1');
    const sm = sandbox.questionsFor('String Methods', 'basic')[0];
    assert.equal(sm.id, 'String Methods__basic__1');
  });

  it('no two distinct questions share an id', () => {
    const { sandbox } = loadCore();
    const seen = new Map();
    for (const q of sandbox.allQuestions()) {
      if (seen.has(q.id)) continue;
      seen.set(q.id, `${q.topic}/${q.number}: ${q.title}`);
    }
    // Every id maps to exactly one question; duplicates are the same question.
    for (const q of sandbox.allQuestions()) {
      assert.equal(seen.get(q.id).split(': ')[1], q.title);
    }
  });

  it('overall() counts each distinct question once', () => {
    const { sandbox } = loadCore();
    const { total } = sandbox.overall();
    const ids = new Set(sandbox.allQuestions().map(q => q.id));
    assert.equal(total, ids.size);
    // Aliased topics no longer inflate the total by 30.
    assert.equal(total, 579);
  });
});

describe('progress migration', () => {
  it('re-keys old alias ids to the canonical source', () => {
    const { saved } = loadCore({
      'List Comprehension__basic__1': true,
      'Comprehensions__intermediate__2': true
    });
    const out = saved();
    assert.ok(out['Comprehension__basic__1']);
    assert.ok(out['Comprehension__intermediate__2']);
    assert.equal(out['List Comprehension__basic__1'], undefined);
    assert.equal(out['Comprehensions__intermediate__2'], undefined);
  });

  it('re-keys legacy Variables and Data Types ids to separate topics', () => {
    const { saved } = loadCore({
      'Variables and Data Types__basic__1': true,
      'Variables and Data Types__basic__2': true
    });
    const out = saved();
    assert.ok(out['Variables__basic__1']);
    assert.ok(out['Data Types__basic__1']);
    assert.equal(out['Variables and Data Types__basic__1'], undefined);
    assert.equal(out['Variables and Data Types__basic__2'], undefined);
  });

  it('re-keys legacy Loops ids to separate loop topics', () => {
    const { saved } = loadCore({
      'Loops__basic__1': true,
      'Loops__basic__11': true,
      'Loops__basic__17': true
    });
    const out = saved();
    assert.equal(out['Loops__basic__1'], undefined);
    assert.equal(out['Loops__basic__11'], undefined);
    assert.equal(out['Loops__basic__17'], undefined);
    assert.ok(out['For Loops__basic__1']);
    assert.ok(out['While Loops__basic__5']);
    assert.ok(out['Nested Loops__basic__1']);
  });

  it('re-keys legacy merged Strings ids to String Methods', () => {
    const { saved } = loadCore({
      'Strings__basic__1': true,
      'Strings__basic__11': true,
      'Strings__intermediate__15': true
    });
    const out = saved();
    assert.ok(out['Strings__basic__1']);
    assert.equal(out['Strings__basic__11'], undefined);
    assert.ok(out['String Methods__basic__1']);
    assert.equal(out['Strings__intermediate__15'], undefined);
    assert.ok(out['String Methods__intermediate__5']);
  });

  it('leaves unaffected topics alone', () => {
    const { saved } = loadCore({
      'Operators__basic__1': true,
      'Strings__advanced__5': true,
      'Functions__basic__3': true
    });
    const out = saved();
    assert.ok(out['Operators__basic__1'], 'Operators ids are already canonical');
    assert.ok(out['Strings__advanced__5'], 'Strings ids are already canonical');
    assert.ok(out['Functions__basic__3']);
  });

  it('only runs once', () => {
    const { sandbox, store } = loadCore({ 'List Comprehension__basic__1': true });
    const afterFirst = JSON.parse(store.get('pypractice-progress-v3'));
    // Re-running the migration is a no-op.
    sandbox.migrateCanonicalIds();
    const afterSecond = JSON.parse(store.get('pypractice-progress-v3'));
    assert.deepEqual(afterFirst, afterSecond);
  });

  it('does not overwrite an existing canonical entry', () => {
    // A user who somehow has both the old and new key keeps the new one.
    const { saved } = loadCore({
      'List Comprehension__basic__1': true,
      'Comprehension__basic__1': true
    });
    const out = saved();
    assert.equal(Object.keys(out).length, 1);
    assert.ok(out['Comprehension__basic__1']);
  });
});
