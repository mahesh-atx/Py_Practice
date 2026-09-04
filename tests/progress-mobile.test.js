const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('node:vm');

/* Render the real Progress page cards in a VM and verify the compact
   mobile layout: index numbers hidden on phones, card is a single row
   (icon | content | arrow) with tighter padding, status row wraps. */

function makeEl(id) {
  return {
    id,
    innerHTML: '',
    textContent: '',
    style: {},
    dataset: {},
    classList: {
      _s: new Set(),
      add(...c) { c.forEach(x => this._s.add(x)); },
      remove(...c) { c.forEach(x => this._s.delete(x)); },
      toggle(c, f) { const on = f !== undefined ? f : !this._s.has(c); on ? this._s.add(c) : this._s.delete(c); return on; },
      contains: c => this._s.has(c),
    },
    addEventListener() {},
    appendChild() {},
  };
}

test('progress page: rendered cards use the compact mobile layout', () => {
  const els = {};
  const documentStub = {
    getElementById: id => (els[id] = els[id] || makeEl(id)),
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener() {},
    body: { classList: makeEl('body').classList, style: {} },
  };
  const storage = (seed) => ({ _m: Object.assign({}, seed), getItem(k) { return k in this._m ? this._m[k] : null; }, setItem(k, v) { this._m[k] = String(v); }, removeItem(k) { delete this._m[k]; } });
  // core.js' own isLoggedIn() reads pypractice-auth-v1 from localStorage,
  // so seed a logged-in user there (a bare isLoggedIn stub gets shadowed).
  const sandbox = {
    console: { log: () => {}, warn: () => {}, error: () => {} },
    document: documentStub,
    window: { matchMedia: () => ({ matches: false, addEventListener: () => {} }), addEventListener: () => {} },
    location: { href: 'http://localhost:3000/progress.html', search: '', replace: () => {} },
    localStorage: storage({ 'pypractice-auth-v1': JSON.stringify({ email: 'tester@pypractice.dev', name: 'Tester' }) }),
    sessionStorage: storage(),
    requestAnimationFrame: fn => { fn(); return 1; },
    setTimeout, clearTimeout,
    URL, URLSearchParams,
  };
  sandbox.window.localStorage = sandbox.localStorage;
  vm.createContext(sandbox);

  const root = path.join(__dirname, '..');
  const bundle = ['js/topics-data.js', 'js/core.js', 'js/pages.js']
    .map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
  vm.runInContext(bundle, sandbox, { filename: 'progress-bundle.js' });
  vm.runInContext('initProgressPage()', sandbox);

  const html = els.progressGrid.innerHTML;
  const cards = (html.match(/practice\.html\?topic=/g) || []).length;
  assert.equal(cards, 21, 'all 21 topic cards rendered');

  assert.match(html, /class="hidden sm:inline font-mono text-xs sm:text-sm font-bold/,
    'index number is hidden on mobile (kept for sm+)');
  assert.match(html, /flex flex-row items-start gap-3\.5 sm:items-center sm:justify-between sm:gap-6 p-4 sm:p-6/,
    'mobile card is one row: icon | content | arrow, tighter padding');
  assert.match(html, /flex items-center justify-between gap-x-2 gap-y-1 flex-wrap text-\[10px\]/,
    'status row wraps on very narrow phones');
  // The arrow stays the last child of the card, so on mobile (flex-row) it
  // sits top-right instead of on its own row.
  const firstCard = html.slice(0, html.indexOf('</a>'));
  assert.ok(firstCard.lastIndexOf('fa-arrow-right') > firstCard.lastIndexOf('questions remaining'),
    'arrow comes after the status row in the card');
});
