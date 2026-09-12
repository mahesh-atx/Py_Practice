const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');

const ROOT = path.join(__dirname, '..');

async function runHarness(code, inputValue, files = {}) {
  const escapedInput = JSON.stringify(String(inputValue || ''));
  const escapedCode = JSON.stringify(String(code || ''));
  const escapedFiles = JSON.stringify(files);
  const harness = `
import sys, io, builtins, json, pathlib
_input_data = ${escapedInput}
_stdin_buf = io.StringIO(_input_data)
for _fn, _ct in json.loads(${JSON.stringify(escapedFiles)}).items():
    pathlib.Path(_fn).write_text(_ct)
def _input(prompt=''):
    if prompt:
        print(prompt, end='')
    line = _stdin_buf.readline()
    if line == '':
        raise EOFError('No more input values.')
    return line.rstrip('\\r\\n')
_out = io.StringIO()
_err = io.StringIO()
_o_in, _o_out, _o_err, _o_stdin = builtins.input, sys.stdout, sys.stderr, sys.stdin
try:
    builtins.input = _input
    sys.stdout = _out
    sys.stderr = _err
    sys.stdin = _stdin_buf
    exec(${escapedCode}, {})
except Exception as _exc:
    _err.write(type(_exc).__name__ + ': ' + str(_exc))
finally:
    builtins.input = _o_in
    sys.stdout = _o_out
    sys.stderr = _o_err
    sys.stdin = _o_stdin
print(json.dumps({"stdout": _out.getvalue(), "stderr": _err.getvalue()}))
`;
  const workdir = fs.mkdtempSync(path.join(os.tmpdir(), 'pypractice_multi_'));
  const tmp = path.join(workdir, 'run.py');
  fs.writeFileSync(tmp, harness, 'utf8');
  return new Promise((resolve, reject) => {
    const proc = spawn('python', [tmp], { timeout: 7000, cwd: workdir });
    let out = '';
    let err = '';
    proc.stdout.on('data', d => out += d.toString());
    proc.stderr.on('data', d => err += d.toString());
    proc.on('error', reject);
    proc.on('close', () => {
      try { fs.rmSync(workdir, { recursive: true, force: true }); } catch {}
      if (err) return resolve({ stdout: '', stderr: err });
      try {
        const parsed = JSON.parse(out.trim().split('\n').pop());
        resolve({ stdout: parsed.stdout, stderr: parsed.stderr });
      } catch (e) {
        resolve({ stdout: out, stderr: err });
      }
    });
  });
}

function norm(v) {
  return String(v ?? '').replace(/\r\n/g, '\n').replace(/\n+$/, '').trimEnd();
}

describe('multicase - no quoted output keys remain', () => {
  it('topics-data.js has no single-quoted output keys', () => {
    const src = fs.readFileSync(path.join(ROOT, 'js', 'topics-data.js'), 'utf8');
    assert.doesNotMatch(src, /'output'\s*:/);
  });
});

describe('multicase - core passes mockFiles through (single-case)', () => {
  it('file questions expose mockFiles on the single testCase', () => {
    const vm = require('node:vm');
    const store = new Map();
    const localStorage = { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) };
    const noop = () => {};
    const el = { classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {} };
    const sandbox = { localStorage, console, module: { exports: {} }, document: { addEventListener: noop, createElement: () => el, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], body: el, documentElement: el }, window: {}, navigator: {}, setTimeout, clearTimeout };
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'topics-data.js'), 'utf8'), sandbox);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'core.js'), 'utf8'), sandbox);
    const qs = sandbox.questionsFor('File Handling', 'intermediate');
    const byTitle = Object.fromEntries(qs.map(q => [q.title, q]));
    assert.equal(byTitle['Read numbers and sum'].testCases.length, 1);
    assert.ok(byTitle['Read numbers and sum'].testCases[0].mockFiles['nums.txt']);
    assert.equal(byTitle['Reverse file lines'].testCases.length, 1);
    assert.ok(byTitle['Reverse file lines'].testCases[0].mockFiles['a.txt']);
    const adv = sandbox.questionsFor('File Handling', 'advanced');
    const advByTitle = Object.fromEntries(adv.map(q => [q.title, q]));
    assert.ok(advByTitle['Sort numbers file'].testCases[0].mockFiles['nums.txt']);
  });
  it('questionsFor returns exactly one testCase per question', () => {
    const vm = require('node:vm');
    const store = new Map();
    const localStorage = { getItem: k => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: k => store.delete(k) };
    const noop = () => {};
    const el = { classList: { add: noop, remove: noop, toggle: noop, contains: () => false }, style: {} };
    const sandbox = { localStorage, console, module: { exports: {} }, document: { addEventListener: noop, createElement: () => el, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], body: el, documentElement: el }, window: {}, navigator: {}, setTimeout, clearTimeout };
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'topics-data.js'), 'utf8'), sandbox);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'core.js'), 'utf8'), sandbox);
    for (const q of sandbox.allQuestions()) {
      assert.equal(q.testCases.length, 1, `${q.id} should have 1 testCase`);
    }
  });
});

describe('multicase - corrected file expectations match real Python (single visible case)', () => {
  it('word count: visible sample notes=8', async () => {
    const code = 'fn = input().strip()\nwith open(fn) as f:\n    print(len(f.read().split()))';
    const files = { 'hello.txt': 'Hello\nWorld\nPython file handling', 'notes.txt': 'Learning Python\nPractice makes perfect\nLine 3 notes' };
    // Single-case mode exposes only the sample input (notes.txt); hello.txt remains covered by base mocks but not graded
    const r = await runHarness(code, 'notes.txt', files);
    assert.equal(r.stderr, '');
    assert.equal(norm(r.stdout), '8');
  });

  it('longest line: visible sample notes=22', async () => {
    const code = 'fn = input().strip()\nwith open(fn) as f:\n    print(max(len(l) for l in f.read().splitlines()))';
    const files = { 'hello.txt': 'Hello\nWorld\nPython file handling', 'notes.txt': 'Learning Python\nPractice makes perfect\nLine 3 notes' };
    const r = await runHarness(code, 'notes.txt', files);
    assert.equal(norm(r.stdout), '22');
  });

  it('read numbers and sum: sample nums.txt', async () => {
    const { questionSeeds } = require('../js/topics-data.js');
    const q = questionSeeds['File Handling'].intermediate.find(x => x[0] === 'Read numbers and sum');
    const code = 'fn = input().strip()\nwith open(fn) as f:\n    print(sum(int(x) for x in f.read().split()))';
    const mocks = { 'nums.txt': '5\n5\n5', 'data.txt': '11\n11\n11' };
    const r = await runHarness(code, q[2], mocks);
    assert.equal(norm(r.stdout), norm(q[3]));
  });

  it('reverse lines: sample a.txt', async () => {
    const { questionSeeds } = require('../js/topics-data.js');
    const q = questionSeeds['File Handling'].intermediate.find(x => x[0] === 'Reverse file lines');
    const code = 'fn = input().strip()\nwith open(fn) as f:\n    lines = f.read().splitlines()\nfor l in reversed(lines):\n    print(l)';
    const seedMocks = { 'a.txt': 'a\nb\nc', 'b.txt': 'x\ny\nz' };
    const r = await runHarness(code, q[2], seedMocks);
    assert.equal(norm(r.stdout), norm(q[3]));
  });

  it('filter lines: visible sample a.txt cat', async () => {
    const { questionSeeds } = require('../js/topics-data.js');
    const q = questionSeeds['File Handling'].advanced.find(x => x[0] === 'Filter lines');
    const code = 'fn = input().strip()\nword = input().strip()\nwith open(fn) as f:\n    [print(l) for l in f.read().splitlines() if word in l]';
    const worker = require('../js/pyodide-worker.js');
    const base = worker.baseMockFiles();
    const r = await runHarness(code, q[2], base);
    assert.equal(norm(r.stdout), norm(q[3]));
  });

  it('sys.stdin.read style also works (unified buffer)', async () => {
    const code = 'import sys\ndata = sys.stdin.read().strip().split()\na, b = map(int, data[:2])\nprint(a + b)';
    let r = await runHarness(code, '7 5', {});
    assert.equal(norm(r.stdout), '12');
    r = await runHarness(code, '100 25', {});
    assert.equal(norm(r.stdout), '125');
  });

  it('sys.stdin.readline mixed with input()', async () => {
    const code = 'import sys\nfirst = input().strip()\nrest = sys.stdin.read().strip()\nprint(first + rest)';
    const r = await runHarness(code, 'a\nb', {});
    assert.equal(norm(r.stdout), 'ab');
  });
});

describe('multicase - spec-fixed questions state their rules', () => {
  const { questionSeeds } = require('../js/topics-data.js');
  const get = (t, l, n) => questionSeeds[t][l][n - 1];
  it('grade/BMI/feedback/shipping/tax/slab descriptions include thresholds', () => {
    assert.match(get('Conditional Statements', 'intermediate', 1)[1], /80.*60.*40.*33/);
    assert.match(get('Conditional Statements', 'intermediate', 5)[1], /18\.5.*22\.9.*23/);
    assert.match(get('Conditional Statements', 'intermediate', 9)[1], /85.*50/);
    assert.match(get('Conditional Statements', 'advanced', 1)[1], /1000.*500/);
    assert.match(get('Conditional Statements', 'advanced', 3)[1], /25000.*10%.*20%/);
    assert.match(get('Conditional Statements', 'advanced', 4)[1], /0\.75.*1\.50/);
  });
  it('diagonal of numbers scales rows with N', () => {
    const q = get('Nested Loops', 'intermediate', 2);
    assert.equal(q[2], '4');
    assert.equal(q[3].split('\n').length, 4);
    assert.equal(q[4][0].input, '3');
    assert.equal(q[4][0].output.split('\n').length, 3);
  });
});

describe('multicase - one generic solution passes both cases (spec-fixed)', () => {
  const { questionSeeds } = require('../js/topics-data.js');
  async function bothPass(topic, lvl, idx, code) {
    const q = questionSeeds[topic][lvl][idx];
    const cases = [{ input: q[2], output: q[3] }, ...q[4].map(e => ({ input: e.input, output: e.output }))];
    for (const c of cases) {
      const r = await runHarness(code, c.input, {});
      assert.equal(r.stderr, '', `${q[0]} input=${JSON.stringify(c.input)} stderr=${r.stderr}`);
      assert.equal(norm(r.stdout), norm(c.output), `${q[0]} input=${JSON.stringify(c.input)}`);
    }
  }
  it('Grade calculator', async () => {
    await bothPass('Conditional Statements', 'intermediate', 0,
      's=int(input())\nprint("A" if s>=80 else "B" if s>=60 else "C" if s>=40 else "D" if s>=33 else "F")');
  });
  it('BMI category', async () => {
    await bothPass('Conditional Statements', 'intermediate', 4,
      'import sys\ndata=sys.stdin.read().strip().split()\nw,h=map(float,data[:2])\nb=w/(h*h)\nprint("Underweight" if b<18.5 else "Normal" if b<23 else "Overweight")');
  });
  it('Grade with feedback', async () => {
    await bothPass('Conditional Statements', 'intermediate', 8,
      's=int(input())\nprint("High" if s>=85 else "Average" if s>=50 else "Low")');
  });
  it('Shipping tier', async () => {
    await bothPass('Conditional Statements', 'advanced', 0,
      'import sys\np=sys.stdin.read().strip().split()\na=float(p[0]);m=p[1]=="True"\nprint("Free" if a>=1000 or (m and a>=500) else "Standard")');
  });
  it('Tax bracket', async () => {
    await bothPass('Conditional Statements', 'advanced', 2,
      'x=float(input())\nprint(x*0.2 if x>100000 else x*0.1 if x>25000 else 0.0)');
  });
  it('Electricity bill', async () => {
    await bothPass('Conditional Statements', 'advanced', 3,
      'u=float(input())\nb=u*0.75 if u<=200 else 200*0.75+(u-200)*1.5+5\nprint(b)');
  });
  it('Diagonal of numbers', async () => {
    await bothPass('Nested Loops', 'intermediate', 1,
      'n=int(input())\nc=1\nfor i in range(1,n+1):\n    print(" ".join(str(c+j) for j in range(i)))\n    c+=i');
  });
});

describe('multicase - worker base mocks cover file refs', () => {
  it('every non-stdin file ref exists in base mocks or per-case mocks', () => {
    const { questionSeeds } = require('../js/topics-data.js');
    const worker = require('../js/pyodide-worker.js');
    const base = worker.baseMockFiles();
    const missing = [];
    for (const levels of Object.values(questionSeeds)) {
      for (const lvl of ['basic', 'intermediate', 'advanced']) {
        for (const q of (levels[lvl] || [])) {
          const cases = [{ input: q[2], mockFiles: (q[5] || {}).mockFiles }, ...q[4]];
          for (const c of cases) {
            const firstLine = String(c.input || '').split('\n')[0].trim();
            if (/^[\w\-]+\.(txt|csv)$/.test(firstLine) && firstLine.includes('.')) {
              // missing.txt / absent.txt are intentionally absent (FileNotFound tests)
              if (['missing.txt', 'absent.txt'].includes(firstLine)) continue;
              if (!base[firstLine] && !(c.mockFiles && c.mockFiles[firstLine])) {
                // stdin-style multi-line inputs whose first line happens to look like text are skipped
                if (['INFO', 'ERROR'].includes(firstLine)) continue;
                missing.push(`${q[0]} refs ${firstLine}`);
              }
            }
          }
        }
      }
    }
    assert.deepEqual(missing, []);
  });
});
