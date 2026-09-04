const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

/* Functional simulation of the problem page's IN-PLACE question switching.
   Runs the real topics-data.js + core.js + runner.js + problem.js against a
   stubbed DOM and verifies: no full navigation on Next/Prev, correct
   pushState URLs, re-rendered content, back-button (popstate) re-sync, and
   that the last question still navigates to the practice list. */

function buildEnv() {
  const makeClassList = () => {
    const set = new Set();
    return {
      add: (...c) => c.forEach(x => set.add(x)),
      remove: (...c) => c.forEach(x => set.delete(x)),
      toggle: (c, force) => { const on = force !== undefined ? force : !set.has(c); on ? set.add(c) : set.delete(c); return on; },
      contains: c => set.has(c),
    };
  };
  const makeEl = (id, extra = {}) => Object.assign({
    id, innerHTML: '', textContent: '', value: '', href: '', disabled: false,
    checked: false, style: {}, dataset: {},
    scrollTop: 0, scrollWidth: 10, clientWidth: 100, offsetWidth: 100,
    classList: makeClassList(),
    listeners: {},
    addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); },
    removeAttribute(n) { if (n === 'href') this.href = ''; },
    setAttribute(n, v) { if (n === 'data-pane') this.dataset.pane = v; },
    getAttribute(n) { if (n === 'data-pane') return this.dataset.pane || null; return null; },
    querySelectorAll: () => [],
    closest: () => null,
    getBoundingClientRect: () => ({ top: 0, bottom: 0, width: 10, height: 10 }),
  }, extra);

  const ids = ['problemPage','problemStatement','problemTitle','problemDesc','exampleInput','exampleInputCell',
    'sampleIogrid','exampleOutput','explanationPanel','monacoEditor','monacoLoading','codeEditor','testTabBadge',
    'prevQuestionBtn','nextQuestionBtn','problemBreadcrumbTopic','problemBreadcrumbLevel','problemBreadcrumbTitle',
    'problemPane','problemWorkspace','resultPanel','testCaseTabsContainer','selectedTestCaseDetail','tabTerminalBtn',
    'tabTestCasesBtn','tabContentTerminal','tabContentTestCases','tabContentCustomInput','customInputToggle',
    'clearTerminalBtn','customInputText','customOutputPanel','terminalLogs','toast','editorToolbar'];
  const els = {};
  ids.forEach(id => els[id] = makeEl(id));
  const paneBtns = ['problem','code'].map(p => makeEl('pane-' + p, { dataset: { paneBtn: p } }));

  const location = { href: '', search: '' };
  const pushLog = [];
  const popstateHandlers = [];
  const documentStub = {
    getElementById: id => els[id] || null,
    querySelectorAll: sel => (String(sel).includes('data-pane-btn') ? paneBtns : []),
    querySelector: () => null,
    addEventListener: () => {},
    createElement: () => makeEl('dyn'),
    body: { prepend: () => {}, appendChild: () => {}, style: {} },
  };
  const sandbox = {
    console,
    document: documentStub,
    window: {
      addEventListener: (type, fn) => { if (type === 'popstate') popstateHandlers.push(fn); },
      dispatchEvent: () => true,
      matchMedia: q => ({ matches: q.includes('max-width'), addEventListener: () => {}, addListener: () => {} }),
      innerHeight: 800, innerWidth: 390,
    },
    location,
    history: {
      length: 2,
      pushState: (s, t, url) => {
        pushLog.push(url);
        location.href = 'http://localhost:3000/' + url;
        location.search = url.includes('?') ? '?' + url.split('?').slice(1).join('?') : '';
      },
    },
    localStorage: { _m: {}, getItem(k){ return k in this._m ? this._m[k] : null; }, setItem(k,v){ this._m[k]=String(v); }, removeItem(k){ delete this._m[k]; } },
    sessionStorage: { _m: {}, getItem(k){ return k in this._m ? this._m[k] : null; }, setItem(k,v){ this._m[k]=String(v); }, removeItem(k){ delete this._m[k]; } },
    requestAnimationFrame: fn => { fn(); return 1; },
    Worker: class {
      constructor() { setTimeout(() => { if (this.onmessage) this.onmessage({ data: { type: 'init-ready' } }); }, 0); }
      postMessage(){} terminate(){} addEventListener(){}
    },
    Event: class { constructor(t){ this.type = t; } },
    URL, URLSearchParams,
    setTimeout, clearTimeout, setInterval, clearInterval,
    performance,
  };
  sandbox.window.localStorage = sandbox.localStorage;
  sandbox.window.sessionStorage = sandbox.sessionStorage;

  const root = path.join(__dirname, '..');
  const bundle = ['js/topics-data.js', 'js/core.js', 'js/runner.js', 'js/problem.js']
    .map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
  vm.createContext(sandbox);
  vm.runInContext(bundle, sandbox, { filename: 'app-bundle.js' });

  const run = code => vm.runInContext(code, sandbox);
  const click = (el, ev = {}) => {
    const e = Object.assign({ button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, prevented: false, preventDefault(){ this.prevented = true; } }, ev);
    (el.listeners['click'] || []).forEach(fn => fn(e));
    return e;
  };
  return { els, location, pushLog, popstateHandlers, click, run };
}

const tick = (ms = 320) => new Promise(r => setTimeout(r, ms));

test('problem page switches questions in place (no reload) with correct URLs', async () => {
  const { els, location, pushLog, popstateHandlers, click, run } = buildEnv();
  const title = () => els.problemTitle.innerHTML;

  // A) initial render at Q1
  location.href = 'http://localhost:3000/problem.html?topic=Python%20Basics&level=basic&q=0';
  location.search = '?topic=Python%20Basics&level=basic&q=0';
  run('initProblemPage()');
  assert.ok(title().includes('Hello World'), 'A1 title Q1');
  assert.ok(title().includes('Q1'), 'A2 Q number in title');
  assert.equal(els.prevQuestionBtn.href, '', 'A3 prev disabled at Q1');
  assert.ok(els.nextQuestionBtn.href.endsWith('&q=1'), 'A4 next -> q=1');
  assert.ok(els.problemDesc.innerHTML.includes('Hello, World!'), 'A5 description rendered');

  // B) click Next: in place, no navigation
  const evB = click(els.nextQuestionBtn);
  assert.ok(evB.prevented, 'B1 navigation prevented');
  await tick();
  assert.deepEqual(pushLog, ['problem.html?topic=Python%20Basics&level=basic&q=1'], 'B2 pushState URL');
  assert.ok(title().includes('Print multiple lines'), 'B3 title Q2');
  assert.ok(els.prevQuestionBtn.href.endsWith('&q=0'), 'B4 prev -> q=0');
  assert.ok(els.nextQuestionBtn.href.endsWith('&q=2'), 'B5 next -> q=2');
  assert.ok(els.terminalLogs.innerHTML.includes('Switched to Q2'), 'B6 terminal switch line');
  assert.ok(els.selectedTestCaseDetail.innerHTML.length > 0, 'B7 case detail rendered');

  // C) Next again -> Q3 (last of Python Basics basic)
  click(els.nextQuestionBtn);
  await tick();
  assert.ok(title().includes('Print calculations'), 'C1 title Q3');
  assert.ok(els.nextQuestionBtn.href.startsWith('practice.html'), 'C2 last q -> Back to list href');
  assert.ok(els.nextQuestionBtn.innerHTML.includes('Back to list'), 'C3 label = Back to list');

  // D) Next on the LAST question still navigates to the list
  const evD = click(els.nextQuestionBtn);
  assert.equal(evD.prevented, false, 'D1 last-question next navigates');

  // E) Previous -> back to Q2, Next label restored
  const evE = click(els.prevQuestionBtn);
  assert.ok(evE.prevented, 'E1 prev prevented');
  await tick();
  assert.ok(pushLog[pushLog.length - 1].endsWith('&q=1'), 'E2 URL pushed q=1');
  assert.ok(title().includes('Print multiple lines'), 'E3 title Q2 again');
  assert.ok(els.nextQuestionBtn.innerHTML.includes('Next'), 'E4 Next label restored');

  // F) modified (ctrl) click is not intercepted — anchor behaviour kept
  const evF = click(els.nextQuestionBtn, { ctrlKey: true });
  assert.equal(evF.prevented, false, 'F1 ctrl-click navigates normally');

  // G) popstate (back button) re-renders from the URL
  location.href = 'http://localhost:3000/problem.html?topic=Python%20Basics&level=basic&q=0';
  location.search = '?topic=Python%20Basics&level=basic&q=0';
  assert.ok(popstateHandlers.length >= 1, 'G0 popstate registered');
  popstateHandlers[popstateHandlers.length - 1]();
  assert.ok(title().includes('Hello World'), 'G1 popstate re-render Q1');
  assert.ok(els.problemDesc.innerHTML.includes('Hello, World!'), 'G2 desc re-rendered');
});
