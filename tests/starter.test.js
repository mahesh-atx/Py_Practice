const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadCore() {
  const srcCore = fs.readFileSync(path.join(__dirname, '../js/topics-data.js'), 'utf8');
  const src = fs.readFileSync(path.join(__dirname, '../js/core.js'), 'utf8');
  const store = new Map();
  const localStorage = { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k), key: i => [...store.keys()][i] || null, get length() { return store.size; } };
  const noop = () => {};
  const el = { classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {} };
  const sandbox = { localStorage, console, module: { exports: {} }, document: { addEventListener: noop, createElement: () => el, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], body: el, documentElement: el }, window: {}, navigator: {}, setTimeout, clearTimeout };
  vm.createContext(sandbox);
  vm.runInContext(srcCore, sandbox);
  vm.runInContext(src, sandbox);
  return { sandbox, store };
}

describe('starter comment', () => {
  it('starterComment exists and is comment-only', () => {
    const { sandbox } = loadCore();
    assert.equal(typeof sandbox.starterComment, 'function');
    const q = { number: 2, title: 'Store a greeting' };
    const s = sandbox.starterComment(q);
    assert.match(s, /^# Q2 · Store a greeting/m);
    assert.match(s, /write your solution below/i);
    const nonBlank = s.split('\n').filter(l => l.trim() !== '');
    for (const l of nonBlank) assert.match(l.trim(), /^#/, `non-blank line must be a comment: ${l}`);
  });

  it('starter differs per question and includes title', () => {
    const { sandbox } = loadCore();
    const a = sandbox.starterComment({ number: 1, title: 'Hello World' });
    const b = sandbox.starterComment({ number: 2, title: 'Variables' });
    assert.notEqual(a, b);
    assert.match(a, /Hello World/);
    assert.match(b, /Variables/);
  });

  it('problem.js uses starterComment(q) at all call sites', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    assert.match(p, /starterComment\(q\)/);
    // No topic-keyed defaultCode calls should remain for starters
    assert.doesNotMatch(p, /defaultCode\(q\.topic\)/);
    assert.match(p, /Reset to starter comment/);
    assert.match(p, /Starter comment restored/);
  });

  it('Run/Submit guard for empty/comment-only editor', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/problem.js'), 'utf8');
    assert.match(p, /Write your solution first/);
    assert.match(p, /hasCode/);
    assert.match(p, /!l\.trim\(\)\.startsWith\('#'\)/);
  });

  it('cleanup removes exact legacy templates only', () => {
    const p = fs.readFileSync(path.join(__dirname, '../js/core.js'), 'utf8');
    assert.match(p, /legacyStarters/);
    assert.match(p, /localStorage\.removeItem\(k\)/);
    // Must not blindly clear all code: keys
    assert.match(p, /legacyStarters\.has\(v\)/);
  });

  it('core no longer ships executable per-topic defaults', () => {
    const c = fs.readFileSync(path.join(__dirname, '../js/core.js'), 'utf8');
    assert.doesNotMatch(c, /const defaultCodes = \{/);
  });
});
