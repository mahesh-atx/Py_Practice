const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('node:vm');

/* Functional simulation of the Learn page's mobile topic drawer:
   the toggle bar opens the off-canvas sidebar, selecting a topic updates
   the bar label and auto-closes the drawer, backdrop/close/Escape close it,
   and on desktop widths the toggle is a no-op. */

function buildEnv({ mobile = true } = {}) {
  const makeClassList = () => {
    const set = new Set();
    return {
      add: (...c) => c.forEach(x => set.add(x)),
      remove: (...c) => c.forEach(x => set.delete(x)),
      toggle: (c, force) => { const on = force !== undefined ? force : !set.has(c); on ? set.add(c) : set.delete(c); return on; },
      contains: c => set.has(c),
    };
  };
  // Elements whose innerHTML may contain topic buttons learn to materialise
  // them: renderSidebar/renderNotes write data-topic-btn="Name" markup and
  // then query for those buttons to attach handlers / mark the active one.
  const makeEl = (id, extra = {}) => {
    let topicButtons = [];
    const el = Object.assign({
      id, textContent: '', value: '', href: '',
      style: {}, dataset: {}, scrollWidth: 10, clientWidth: 100,
      classList: makeClassList(),
      attrs: {},
      setAttribute(n, v) { this.attrs[n] = v; },
      removeAttribute(n) { delete this.attrs[n]; },
      getAttribute(n) { return n in this.attrs ? this.attrs[n] : null; },
      listeners: {},
      addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); },
      getBoundingClientRect: () => ({ top: 0, bottom: 0 }),
      scrollIntoView: () => {},
    }, extra);
    Object.defineProperty(el, 'innerHTML', {
      get() { return el._html || ''; },
      set(v) {
        el._html = String(v);
        topicButtons = [...String(v).matchAll(/<button[^>]*data-topic-btn="([^"]+)"[^>]*>/g)]
          .map(m => {
            const b = withDataset(makeEl(`btn-${m[1].replace(/\W+/g, '_')}`), { 'topic-btn': m[1] });
            b.setAttribute('data-topic-btn', m[1]);
            const lock = /data-is-locked="([^"]+)"/.exec(m[0]);
            if (lock) { b.dataset.isLocked = lock[1]; b.setAttribute('data-is-locked', lock[1]); }
            return b;
          });
        el._topicButtons = topicButtons;
      },
    });
    el.querySelectorAll = sel => (typeof sel === 'string' && sel.includes('data-topic-btn'))
      ? (el._topicButtons || [])
      : [];
    el.querySelector = sel => (typeof sel === 'string' && sel.includes('data-topic-btn'))
      ? ((el._topicButtons || []).find(b => {
          if (sel.includes('"')) {
            const name = sel.slice(sel.lastIndexOf('"') + 1, sel.lastIndexOf('"'));
            return b.dataset['topic-btn'] === name;
          }
          return true;
        })) || null
      : null;
    return el;
  };
  const withDataset = (el, d) => { Object.assign(el.dataset, d); return el; };

  const ids = ['learnPage','learnTopicList','learnContent','learnTopicSearch','learnSearchClear',
    'learnProgressBadge','learnTopicSidebar','learnDrawerBackdrop','learnTopicsToggle',
    'learnTopicsClose','learnTopicsToggleLabel','toast'];
  const els = {};
  ids.forEach(id => els[id] = makeEl(id));
  els.learnDrawerBackdrop.classList.add('hidden'); // reflects the markup class

  const location = { href: 'http://localhost:3000/learn.html', search: '' };
  location.toString = () => location.href; // real Location stringifies to href (new URL(location))
  const pushLog = [];
  const popstateHandlers = [];
  const keydownHandlers = [];
  const resizeHandlers = [];
  const bodyStyle = {};
  const documentStub = {
    getElementById: id => els[id] || null,
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: (type, fn) => { if (type === 'keydown') keydownHandlers.push(fn); },
    createElement: () => makeEl('dyn'),
    body: { style: bodyStyle, appendChild: () => {}, prepend: () => {} },
  };
  const sandbox = {
    console: { log: () => {}, warn: () => {}, error: () => {} },
    document: documentStub,
    window: {
      addEventListener: (type, fn) => {
        if (type === 'popstate') popstateHandlers.push(fn);
        if (type === 'resize') resizeHandlers.push(fn);
      },
      dispatchEvent: () => true,
      matchMedia: q => ({
        matches: q.includes('max-width') ? mobile : !mobile,
        addEventListener: () => {}, addListener: () => {},
      }),
      innerHeight: 800, innerWidth: mobile ? 390 : 1280,
      scrollTo: () => {},
    },
    location,
    history: {
      pushState: (s, t, url) => {
        pushLog.push(url);
        location.href = 'http://localhost:3000/' + url;
        location.search = String(url).includes('?') ? '?' + String(url).split('?').slice(1).join('?') : '';
      },
    },
    localStorage: { _m: {}, getItem(k){ return k in this._m ? this._m[k] : null; }, setItem(k,v){ this._m[k]=String(v); }, removeItem(k){ delete this._m[k]; } },
    sessionStorage: { _m: {}, getItem(k){ return k in this._m ? this._m[k] : null; }, setItem(k,v){ this._m[k]=String(v); }, removeItem(k){ delete this._m[k]; } },
    requestAnimationFrame: fn => { fn(); return 1; },
    CSS: { escape: s => s },
    URL, URLSearchParams,
    setTimeout, clearTimeout,
    performance,
    navigator: { clipboard: { writeText: async () => {} } },
  };
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.sessionStorage = sandbox.sessionStorage;

  const root = path.join(__dirname, '..');
  const bundle = ['js/topics-data.js', 'js/topic-notes-data.js', 'js/core.js', 'js/learn.js']
    .map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
  vm.createContext(sandbox);
  vm.runInContext(bundle, sandbox, { filename: 'learn-bundle.js' });

  const click = el => (el.listeners['click'] || []).forEach(fn => fn({ button: 0, key: '' }));
  const keydown = key => keydownHandlers.forEach(fn => fn({ key }));
  const run = code => vm.runInContext(code, sandbox);
  const topicButton = (hostEl, name) => (hostEl._topicButtons || []).find(b => b.dataset['topic-btn'] === name);
  return { els, location, pushLog, bodyStyle, click, keydown, run, resizeHandlers, topicButton };
}

const tick = (ms = 320) => new Promise(r => setTimeout(r, ms));

test('learn page: mobile topic drawer toggles, selects and closes', async () => {
  const { els, click, keydown, run, bodyStyle, topicButton } = buildEnv({ mobile: true });
  run('initLearnPage()');
  const drawer = els.learnTopicSidebar;
  const backdrop = els.learnDrawerBackdrop;

  // A) initial: drawer closed + inert, backdrop hidden, label = active topic
  assert.ok(!drawer.classList.contains('open'), 'A1 drawer starts closed');
  assert.equal(drawer.attrs.inert, '', 'A2 drawer is inert while closed');
  assert.ok(backdrop.classList.contains('hidden'), 'A3 backdrop hidden');
  assert.equal(els.learnTopicsToggleLabel.textContent, 'Python Basics', 'A4 label shows active topic');

  // B) toggle bar opens the drawer
  click(els.learnTopicsToggle);
  assert.ok(drawer.classList.contains('open'), 'B1 drawer opens');
  assert.ok(!('inert' in drawer.attrs), 'B2 inert removed while open');
  assert.ok(!backdrop.classList.contains('hidden'), 'B3 backdrop visible');
  assert.equal(bodyStyle.overflow, 'hidden', 'B4 page scroll locked');

  // C) selecting a topic updates the label and auto-closes the drawer
  const varsBtn = topicButton(els.learnTopicList, 'Variables');
  assert.ok(varsBtn, 'C0 Variables topic button exists');
  click(varsBtn);
  assert.equal(els.learnTopicsToggleLabel.textContent, 'Variables', 'C1 label follows selection');
  await tick(320);
  assert.ok(!drawer.classList.contains('open'), 'C2 drawer auto-closed after selection');
  assert.ok(backdrop.classList.contains('hidden'), 'C3 backdrop hidden again');
  assert.equal(bodyStyle.overflow, '', 'C4 scroll unlocked');

  // D) open, then Escape closes
  click(els.learnTopicsToggle);
  assert.ok(drawer.classList.contains('open'), 'D1 reopened');
  keydown('Escape');
  assert.ok(!drawer.classList.contains('open'), 'D2 Escape closes');

  // E) open, then backdrop click closes
  click(els.learnTopicsToggle);
  click(backdrop);
  assert.ok(!drawer.classList.contains('open'), 'E1 backdrop click closes');

  // F) open, then close button closes
  click(els.learnTopicsToggle);
  click(els.learnTopicsClose);
  assert.ok(!drawer.classList.contains('open'), 'F1 close button closes');
});

test('learn page: topic toggle is a no-op on desktop widths', () => {
  const { els, click, run, topicButton } = buildEnv({ mobile: false });
  run('initLearnPage()');
  const drawer = els.learnTopicSidebar;
  assert.ok(!('inert' in drawer.attrs), 'F0 desktop sidebar is never inert');
  click(els.learnTopicsToggle);
  assert.ok(!drawer.classList.contains('open'), 'F2 toggle ignored on desktop');
  // Desktop nav still works through the sidebar buttons
  const varsBtn = topicButton(els.learnTopicList, 'Variables');
  click(varsBtn);
  assert.equal(els.learnTopicsToggleLabel.textContent, 'Variables', 'F3 label still tracks selection');
});
