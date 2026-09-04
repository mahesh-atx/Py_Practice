const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('node:vm');

/* Functional check of the REAL enhanceCodeBlocks from js/learn.js with a
   tiny fake DOM: each <pre> becomes a single .code-snippet box whose only
   chrome is the floating chip (Copy button for code, OUTPUT label for
   text blocks), highlight.js is applied to code blocks only, the copy
   button works, and re-running is a no-op (no box-in-box rebuilds). */

function detach(child) {
  if (child && child.parentNode && child.parentNode.children) {
    const i = child.parentNode.children.indexOf(child);
    if (i !== -1) child.parentNode.children.splice(i, 1);
  }
}

function makeEl(tag) {
  const set = new Set();
  const el = {
    tagName: tag,
    innerHTML: '',
    innerText: '',
    type: '',
    dataset: {},
    attrs: {},
    children: [],
    parentNode: null,
    listeners: {},
    addEventListener(t, fn) { (this.listeners[t] = this.listeners[t] || []).push(fn); },
    setAttribute(n, v) { this.attrs[n] = v; },
    appendChild(child) {
      detach(child);
      child.parentNode = this;
      this.children.push(child);
      return child;
    },
    insertBefore(child, ref) {
      detach(child);
      child.parentNode = this;
      const i = this.children.indexOf(ref);
      if (i === -1) this.children.push(child);
      else this.children.splice(i, 0, child);
      return child;
    },
    querySelector(sel) {
      if (sel === 'code') return (this.children.find(c => c.tagName === 'code')) || null;
      return null;
    },
    querySelectorAll() { return []; },
    closest(sel) {
      if (typeof sel !== 'string' || !sel.startsWith('.')) return null;
      let n = this;
      while (n) {
        if (n.classList && n.classList.contains(sel.slice(1))) return n;
        n = n.parentNode;
      }
      return null;
    },
  };
  el.classList = {
    add: (...c) => c.forEach(x => set.add(x)),
    remove: (...c) => c.forEach(x => set.delete(x)),
    toggle: (c, f) => { const on = f !== undefined ? f : !set.has(c); on ? set.add(c) : set.delete(c); return on; },
    contains: c => set.has(c),
  };
  Object.defineProperty(el, 'className', {
    get() { return el._cn || ''; },
    set(v) {
      el._cn = String(v);
      set.clear();
      el._cn.split(/\s+/).filter(Boolean).forEach(c => set.add(c));
    },
  });
  return el;
}

test('learn notes: code blocks render as one minimal box with copy chip + highlighting', () => {
  const hljsCalls = [];
  const copiedTexts = [];
  const toasts = [];
  const documentStub = { createElement: tag => makeEl(tag) };

  const sandbox = {
    console: { log: () => {}, warn: () => {}, error: () => {} },
    document: documentStub,
    navigator: { clipboard: { writeText: t => { copiedTexts.push(t); return Promise.resolve(); } } },
    toast: m => toasts.push(m),
    hljs: { highlightElement: el => { hljsCalls.push(el); el.className += ' hljs'; } },
    setTimeout, clearTimeout,
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/learn.js'), 'utf8'), sandbox, { filename: 'learn.js' });

  // Build: a python block, a text (output) block, and a bare pre (no code child)
  const code1 = makeEl('code'); code1.className = 'language-python'; code1.innerText = 'print("hi")';
  const pre1 = makeEl('pre'); pre1.appendChild(code1);
  const code2 = makeEl('code'); code2.className = 'language-text'; code2.innerText = 'hello';
  const pre2 = makeEl('pre'); pre2.appendChild(code2);
  const pre3 = makeEl('pre'); pre3.innerText = 'bare';
  const host = makeEl('div');
  host.querySelectorAll = sel => (sel === 'pre' ? [pre1, pre2, pre3] : []);
  [pre1, pre2, pre3].forEach(p => host.appendChild(p));
  sandbox.__host = host;

  vm.runInContext('enhanceCodeBlocks(__host)', sandbox);

  // A) exactly three wrappers, in order, each containing ONLY chip + pre
  assert.equal(host.children.length, 3, 'three wrappers created');
  const [w1, w2, w3] = host.children;
  assert.ok(w1.classList.contains('code-snippet'), 'A1 code wrapper is code-snippet');
  assert.ok(!w1.classList.contains('output-block'), 'A2 code wrapper is not output');
  assert.equal(w1.children.length, 2, 'A3 single box: only chip + pre, no header/inner box');

  const copyBtn = w1.children[0];
  assert.equal(copyBtn.tagName, 'button', 'A4 chip is the copy button');
  assert.ok(copyBtn.classList.contains('snip-chip'), 'A5 chip class');
  assert.equal(copyBtn.attrs['aria-label'], 'Copy code', 'A6 accessible label');
  assert.ok(copyBtn.innerHTML.includes('Copy'), 'A7 Copy label');
  assert.equal(w1.children[1], pre1, 'A8 pre moved inside the wrapper');

  // B) output block: span label, no highlighting
  assert.ok(w2.classList.contains('code-snippet') && w2.classList.contains('output-block'), 'B1 output wrapper classes');
  const outLabel = w2.children[0];
  assert.equal(outLabel.tagName, 'span', 'B2 output chip is a label');
  assert.equal(outLabel.textContent, 'Output', 'B3 plain Output label (no >_ terminal icon)');
  assert.ok(!String(outLabel.innerHTML).includes('<i'), 'B4 no icon markup in the label');
  assert.equal(w2.children[1], pre2, 'B4 output pre inside wrapper');

  // C) bare pre (no code child) still gets the box, no highlighting
  assert.ok(w3.classList.contains('code-snippet') && !w3.classList.contains('output-block'), 'C1 bare pre wrapper');

  // D) highlighting applied exactly once, only to the python code
  assert.equal(hljsCalls.length, 1, 'D1 highlight.js called once');
  assert.equal(hljsCalls[0], code1, 'D2 highlighted element is the python <code>');
  assert.ok(code1.classList.contains('hljs'), 'D3 hljs class added');

  // E) idempotent — a second pass must not re-wrap
  vm.runInContext('enhanceCodeBlocks(__host)', sandbox);
  assert.equal(host.children.length, 3, 'E1 no duplicate wrappers');
  assert.equal(w1.children.length, 2, 'E2 wrapper untouched on re-run');

  // F) copy button copies the code text, toasts, and flips to Copied
  copyBtn.listeners['click'].forEach(fn => fn({}));
  assert.equal(copiedTexts[0], 'print("hi")', 'F1 copied the code text');
  assert.equal(toasts[0], 'Code snippet copied!', 'F2 toast shown');
  assert.ok(copyBtn.innerHTML.includes('Copied'), 'F3 label flips to Copied');
  assert.ok(copyBtn.classList.contains('copied'), 'F4 copied state class');
});
