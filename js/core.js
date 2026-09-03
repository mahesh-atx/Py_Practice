/* ==========================================================================
   PyPractice Core: State, Progress, Theme, Storage & Common Utilities
   ========================================================================== */

const storageKey = 'pypractice-progress-v3';
const themeKey = 'pypractice-theme';
const activityKey = 'pypractice-activity-v1';
const lastQuestionKey = 'pypractice-last-question-v1';
const profileKey = 'pypractice-profile-v1';
const dailyGoal = 3;

const state = {
  solved: JSON.parse(localStorage.getItem(storageKey) || '{}'),
  activity: JSON.parse(localStorage.getItem(activityKey) || '[]')
};

/* Topics that share a question bucket must share progress too. Variables
   and Data Types both draw on the "Variables and Data Types" bucket, so a
   question solved under one heading was still unsolved under the other.
   Filing ids under the SOURCE topic makes them the same question. */
function canonicalTopic(name) {
  return (typeof TOPIC_SOURCE !== 'undefined' && TOPIC_SOURCE[name]) || name;
}

function migrateSeparateLoops() {
  const flag = 'pypractice-loops-split-v1';
  if (localStorage.getItem(flag)) return;
  let changed = false;
  const basicMap = {
    1: 'For Loops__basic__1', 2: 'For Loops__basic__2', 3: 'For Loops__basic__3', 4: 'For Loops__basic__4',
    5: 'For Loops__basic__5', 6: 'For Loops__basic__6', 7: 'For Loops__basic__7', 8: 'For Loops__basic__8',
    9: 'For Loops__basic__9', 10: 'For Loops__basic__10',
    11: 'While Loops__basic__5', 12: 'While Loops__basic__6', 13: 'While Loops__basic__7',
    14: 'While Loops__basic__8', 15: 'While Loops__basic__9', 16: 'While Loops__basic__10',
    17: 'Nested Loops__basic__1', 18: 'Nested Loops__basic__2', 19: 'Nested Loops__basic__3',
    20: 'Nested Loops__basic__4', 21: 'Nested Loops__basic__5', 22: 'Nested Loops__basic__6',
    23: 'Nested Loops__basic__7', 24: 'Nested Loops__basic__8', 25: 'Nested Loops__basic__9',
    26: 'Nested Loops__basic__10'
  };

  for (const id of Object.keys(state.solved)) {
    if (id.startsWith('Loops__')) {
      const parts = id.split('__');
      const lvl = parts[1];
      const num = parseInt(parts[2], 10);
      let newId;
      if (lvl === 'basic') {
        newId = basicMap[num];
      } else if (lvl === 'intermediate' || lvl === 'advanced') {
        if (num <= 10) newId = `For Loops__${lvl}__${num}`;
        else if (num <= 20) newId = `While Loops__${lvl}__${num - 10}`;
        else newId = `Nested Loops__${lvl}__${num - 20}`;
      }
      if (newId) {
        if (!(newId in state.solved)) state.solved[newId] = state.solved[id];
        delete state.solved[id];
        changed = true;
      }
    }
  }
  localStorage.setItem(flag, '1');
  if (changed) save();
}
migrateSeparateLoops();

function migrateSeparateStringMethods() {
  const flag = 'pypractice-string-methods-split-v1';
  if (localStorage.getItem(flag)) return;
  let changed = false;
  for (const id of Object.keys(state.solved)) {
    if (id.startsWith('Strings__')) {
      const parts = id.split('__');
      const lvl = parts[1];
      const num = parseInt(parts[2], 10);
      if (num > 10) {
        const newId = `String Methods__${lvl}__${num - 10}`;
        if (!(newId in state.solved)) state.solved[newId] = state.solved[id];
        delete state.solved[id];
        changed = true;
      }
    }
  }
  localStorage.setItem(flag, '1');
  if (changed) save();
}
migrateSeparateStringMethods();

/* Saved progress predates canonical ids: anyone who solved something under
   "Variables" has it stored as `Variables__basic__1`. Re-key those entries
   once so history carries across instead of looking wiped. */
function migrateCanonicalIds() {
  const flag = 'pypractice-canonical-ids-v1';
  if (localStorage.getItem(flag)) return;
  let changed = false;
  for (const id of Object.keys(state.solved)) {
    const sep = id.indexOf('__');
    if (sep === -1) continue;
    const topic = id.slice(0, sep);
    const canonical = canonicalTopic(topic);
    if (canonical === topic) continue;
    const newId = canonical + id.slice(sep);
    if (!(newId in state.solved)) state.solved[newId] = state.solved[id];
    delete state.solved[id];
    changed = true;
  }
  localStorage.setItem(flag, '1');
  if (changed) save();
}
migrateCanonicalIds();

const legacyVarDtMap = {
  'Variables and Data Types__basic__1': 'Variables__basic__1',
  'Variables and Data Types__basic__2': 'Data Types__basic__1',
  'Variables and Data Types__basic__3': 'Data Types__basic__2',
  'Variables and Data Types__basic__4': 'Variables__basic__2',
  'Variables and Data Types__basic__5': 'Variables__basic__3',
  'Variables and Data Types__basic__6': 'Data Types__basic__3',
  'Variables and Data Types__basic__7': 'Variables__basic__6',
  'Variables and Data Types__basic__8': 'Variables__basic__4',
  'Variables and Data Types__basic__9': 'Variables__basic__5',
  'Variables and Data Types__basic__10': 'Data Types__basic__4',
  'Variables and Data Types__intermediate__1': 'Variables__intermediate__1',
  'Variables and Data Types__intermediate__2': 'Variables__intermediate__2',
  'Variables and Data Types__intermediate__3': 'Variables__intermediate__3',
  'Variables and Data Types__intermediate__4': 'Data Types__intermediate__5',
  'Variables and Data Types__intermediate__5': 'Variables__intermediate__4',
  'Variables and Data Types__intermediate__6': 'Data Types__intermediate__1',
  'Variables and Data Types__intermediate__7': 'Data Types__intermediate__2',
  'Variables and Data Types__intermediate__8': 'Data Types__intermediate__3',
  'Variables and Data Types__intermediate__9': 'Data Types__intermediate__4',
  'Variables and Data Types__intermediate__10': 'Variables__intermediate__5',
  'Variables and Data Types__advanced__1': 'Data Types__advanced__1',
  'Variables and Data Types__advanced__2': 'Data Types__advanced__2',
  'Variables and Data Types__advanced__3': 'Data Types__advanced__3',
  'Variables and Data Types__advanced__4': 'Variables__advanced__4',
  'Variables and Data Types__advanced__5': 'Data Types__advanced__4',
  'Variables and Data Types__advanced__6': 'Variables__advanced__1',
  'Variables and Data Types__advanced__7': 'Data Types__advanced__5',
  'Variables and Data Types__advanced__8': 'Variables__advanced__2',
  'Variables and Data Types__advanced__9': 'Variables__advanced__3',
  'Variables and Data Types__advanced__10': 'Variables__advanced__5'
};

function migrateSeparateVariablesAndDataTypes() {
  const flag = 'pypractice-variables-datatypes-split-v1';
  if (localStorage.getItem(flag)) return;
  let changed = false;
  for (const id of Object.keys(state.solved)) {
    if (legacyVarDtMap[id]) {
      const newId = legacyVarDtMap[id];
      if (!(newId in state.solved)) state.solved[newId] = state.solved[id];
      delete state.solved[id];
      changed = true;
    }
  }
  localStorage.setItem(flag, '1');
  if (changed) save();
}
migrateSeparateVariablesAndDataTypes();



const levels = ['basic', 'intermediate', 'advanced'];
const levelMeta = {
  basic: { label: 'Basic', note: 'Learn the core idea and write the first working solution.' },
  intermediate: { label: 'Intermediate', note: 'Combine concepts and write clearer multi-step logic.' },
  advanced: { label: 'Advanced', note: 'Solve larger problems and make stronger design choices.' }
};

function allQuestions() {
  return topics.flatMap(t => levels.flatMap(l => questionsFor(t.name, l)));
}

function questionsFor(topicName, level) {
  const arr = (questionSeeds[topicName] && questionSeeds[topicName][level]) || [];
  return arr.map((x, i) => {
    const primaryCase = { label: 'Case 1 · sample', input: x[2], output: x[3] };
    const extraCases = (x[4] || []).map((c, ci) => ({
      label: `Case ${ci + 2} · test`,
      input: c.input,
      output: c.output
    }));
    const testCases = [primaryCase, ...extraCases];

    return {
      id: `${canonicalTopic(topicName)}__${level}__${i + 1}`,
      number: i + 1,
      title: x[0],
      description: x[1],
      input: x[2],
      output: x[3],
      testCases,
      topic: topicName,
      level
    };
  });
}

function solved(id) {
  return !!state.solved[id];
}

/* Every count the UI shows is derived from the data. These used to be
   hardcoded as "162" and "18" in sixteen places across nine files, and
   went stale the moment any question was added. Two topics can share a
   question bucket, so questions are counted by distinct id. */
function totalQuestions() {
  const seen = new Set();
  for (const q of allQuestions()) seen.add(q.id);
  return seen.size;
}

function totalTopics() {
  return topics.length;
}

/* Pages mark up the number itself (<span data-total-questions>162</span>)
   so the surrounding copy stays readable in the source while the value
   always comes from the data. */
function syncDerivedCounts() {
  document.querySelectorAll('[data-total-topics]').forEach(el => {
    el.textContent = totalTopics();
  });
  document.querySelectorAll('[data-total-questions]').forEach(el => {
    el.textContent = totalQuestions();
  });
}

function overall() {
  // Aliased topics list the same question under two headings, so walking
  // every topic would count those twice. Count each distinct id once.
  const seen = new Set();
  let total = 0;
  let done = 0;
  for (const q of allQuestions()) {
    if (seen.has(q.id)) continue;
    seen.add(q.id);
    total++;
    if (solved(q.id)) done++;
  }
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

function topicProgress(name) {
  const total = levels.reduce((s, l) => s + questionsFor(name, l).length, 0);
  const done = levels.reduce((s, l) => s + questionsFor(name, l).filter(q => solved(q.id)).length, 0);
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

function save() {
  localStorage.setItem(storageKey, JSON.stringify(state.solved));
  localStorage.setItem(activityKey, JSON.stringify(state.activity));
}

function escapeHtml(v) {
  return String(v || '').replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}

function setTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);
  document.documentElement.classList.toggle('theme-dark', isDark);
  document.documentElement.classList.toggle('dark', isDark);
  localStorage.setItem(themeKey, theme);
  document.querySelectorAll('[data-theme-icon]').forEach(e => e.textContent = isDark ? '☼' : '◐');
  document.querySelectorAll('[data-theme-label]').forEach(e => e.textContent = isDark ? 'Light mode' : 'Dark mode');
}

function initTheme() {
  setTheme(localStorage.getItem(themeKey) || 'light');
}

function toast(msg, durationMs) {
  const duration = typeof durationMs === 'number' && durationMs > 0 ? durationMs : 2600;
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.innerHTML = `<span class="inline-block mr-1 font-bold" style="color:#7ee787">✓</span><span>${escapeHtml(msg)}</span>`;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => {
    el.classList.remove('show');
  }, duration);
}

function setupHeader() {
  document.querySelectorAll('[data-theme-toggle]').forEach(b => {
    b.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      // tiny scale pop before theme switches
      b.style.transform = 'scale(0.92)';
      setTimeout(() => b.style.transform = '', 140);
      setTheme(isDark ? 'light' : 'dark');
      // re-trigger reveal to adapt to new theme colors if needed
      document.body.animate([{ filter: 'brightness(0.98)' }, { filter: 'brightness(1)' }], { duration: 260, easing: 'ease-out' });
    });
  });
  // Background stays in place — menu is fixed overlay, no scroll jump
  const lockMenuScroll = () => {
    if (window.innerWidth >= 768) return;
    // keep scroll position intact; only contain overscroll, do not hide overflow (prevents jump to top on mobile)
    document.body.style.overscrollBehavior = 'contain';
    document.documentElement.style.overscrollBehavior = 'contain';
  };
  const unlockMenuScroll = () => {
    document.body.style.overscrollBehavior = '';
    document.documentElement.style.overscrollBehavior = '';
  };
  document.querySelectorAll('[data-mobile-toggle]').forEach(b => {
    const originalText = b.textContent;
    b.addEventListener('click', () => {
      const menu = document.getElementById('mobileMenu');
      if (!menu) return;
      const willOpen = !menu.classList.contains('open');
      menu.classList.toggle('open');
      // morph hamburger -> close icon
      b.textContent = willOpen ? '✕' : originalText;
      b.style.transform = 'scale(0.9)';
      setTimeout(() => b.style.transform = '', 160);
      // lock background scroll without jumping to top
      if (willOpen) lockMenuScroll();
      else unlockMenuScroll();
    });
  });
  // close mobile menu when clicking a link or outside
  document.querySelectorAll('#mobileMenu a').forEach(a => {
    a.addEventListener('click', () => {
      const menu = document.getElementById('mobileMenu');
      const toggle = document.querySelector('[data-mobile-toggle]');
      const wasOpen = menu && menu.classList.contains('open');
      if (menu) menu.classList.remove('open');
      if (toggle) toggle.textContent = '☰';
      if (wasOpen) unlockMenuScroll();
    });
  });
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const toggle = document.querySelector('[data-mobile-toggle]');
    if (!menu || !toggle) return;
    if (!menu.classList.contains('open')) return;
    if (menu.contains(e.target) || toggle.contains(e.target)) return;
    menu.classList.remove('open');
    toggle.textContent = '☰';
    unlockMenuScroll();
  });
  document.querySelectorAll('[data-reset-progress]').forEach(b => {
    b.addEventListener('click', async () => {
      if (!confirm('Reset all question progress, streak data, and saved code?')) return;
      state.solved = {};
      state.activity = [];
      save();
      allQuestions().forEach(q => localStorage.removeItem(`code:${q.id}`));
      localStorage.removeItem(lastQuestionKey);
      toast('Progress reset.');
      b.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], { duration: 260, easing: 'ease-out' });
      
      const authObj = typeof getAuth === 'function' ? getAuth() : null;
      if (typeof window.saveUserData === 'function' && authObj?.uid) {
        try { await window.saveUserData(authObj.uid); } catch {}
      }
      setTimeout(() => location.reload(), 300);
    });
  });
  if (typeof syncAuthUI === 'function') syncAuthUI();
}

function renderHeaderProgress() {
  const p = overall();
  document.querySelectorAll('[data-overall-pct]').forEach(e => e.textContent = p.pct + '%');
  document.querySelectorAll('[data-overall-bar]').forEach(e => e.style.width = p.pct + '%');
  document.querySelectorAll('[data-hero-progress-bar]').forEach(e => e.style.width = p.pct + '%');
  document.querySelectorAll('[data-hero-progress-label]').forEach(e => e.textContent = p.pct + '% completed');
  document.querySelectorAll('[data-hero-solved-label]').forEach(e => e.textContent = p.done + '/' + p.total + ' solved');
}

function syncAllStats() {
  const o = overall();
  const started = topics.filter(t => topicProgress(t.name).done).length;
  const todayVal = `${Math.min(dailyGoal, activityToday())}/${dailyGoal}`;
  const pctStr = o.pct + '%';
  const s = streak();
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setWidth = (id, val) => { const el = document.getElementById(id); if (el) el.style.width = val; };
  setText('progressSolved', o.done);
  setText('profileSolved', o.done);
  setText('progressStarted', started);
  setText('profileTopicsStarted', `${started}/${topics.length}`);
  setText('profileTopicsDone', `${started} topics started`);
  setText('progressOverall', pctStr);
  setText('profileOverall', pctStr);
  setText('progressOverallLabel', pctStr + ' complete');
  setText('progressStreak', s);
  setText('profileStreak', s);
  setText('progressToday', todayVal);
  setText('profileToday', todayVal);
  setWidth('progressOverallBar', o.pct + '%');
  setWidth('profileOverallBar', o.pct + '%');
  renderHeaderProgress();
  const preview = document.getElementById('profileProgressPreview');
  if (preview) preview.textContent = `${started}/${topics.length} topics · ${pctStr} complete`;
}

const defaultCodes = {
  'Python Basics': 'print("Hello, World!")',
  'Variables': 'name = input().strip()\nprint(f"Hello, {name}!")',
  'Data Types': 'val = input().strip()\nprint(type(val))',
  'Variables and Data Types': 'name = input().strip()\nprint(f"Hello, {name}!")',
  'Input and Output': 'value = input().strip()\nprint(value)',
  'Operators': 'a, b = map(int, input().split())\nprint(a + b)',
  'Conditional Statements': 'n = int(input())\nprint("Even" if n % 2 == 0 else "Odd")',
  'Loops': 'n = int(input())\nfor i in range(1, n + 1):\n    print(i)',
  'For Loops': 'n = int(input())\nfor i in range(1, n + 1):\n    print(i)',
  'While Loops': 'n = int(input())\ni = 1\nwhile i <= n:\n    print(i)\n    i += 1',
  'Nested Loops': 'n = int(input())\nfor i in range(n):\n    print("*" * n)',
  'Strings': 'text = input().strip()\nprint(text[::-1])',
  'String Methods': 'text = input().strip()\nprint(text.replace(" ", "-"))',
  'Functions': 'def solve(value):\n    return value * value\n\nprint(solve(int(input())))',
  'Lists': 'numbers = list(map(int, input().split()))\nprint(sum(numbers))',
  'Tuples': 'values = tuple(map(int, input().split()))\nprint(values)',
  'Sets': 'values = set(map(int, input().split()))\nprint(len(values))',
  'Dictionaries': 'words = input().split()\ncounts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)',
  'Comprehensions': 'n = int(input())\nresult = [i * i for i in range(1, n + 1)]\nprint(*result)',
  'Comprehension': 'n = int(input())\nresult = [i * i for i in range(1, n + 1)]\nprint(*result)',
  'List Comprehension': 'n = int(input())\nresult = [i * i for i in range(1, n + 1)]\nprint(*result)',
  'Exception Handling': 'try:\n    value = int(input())\n    print(value)\nexcept ValueError:\n    print("Invalid")',
  'File Handling': 'filename = input().strip()\nwith open(filename, "r", encoding="utf-8") as file:\n    content = file.read()\nprint(content)',
  'Modules and Packages': 'import math\n\nn = int(input())\nprint(math.isqrt(n))',
  'Object-Oriented Programming': 'class Person:\n    def __init__(self, name):\n        self.name = name\n\nperson = Person(input())\nprint(person.name)'
};

function defaultCode(topic) {
  return defaultCodes[topic] || '# Write your Python solution here\n';
}

function recordActivity() {
  const today = new Date().toISOString().slice(0, 10);
  if (!state.activity.includes(today)) state.activity.push(today);
  state.activity = state.activity.slice(-180);
  save();
}

function activityToday() {
  const today = new Date().toISOString().slice(0, 10);
  if (!state.activity.includes(today)) return 0;
  return Object.keys(state.solved).filter(id => {
    const stamp = state.solved[id];
    return typeof stamp === 'number' && new Date(stamp).toISOString().slice(0, 10) === today;
  }).length;
}

function streak() {
  const set = new Set(state.activity);
  let date = new Date();
  const today = date.toISOString().slice(0, 10);
  if (!set.has(today)) {
    date.setDate(date.getDate() - 1);
    if (!set.has(date.toISOString().slice(0, 10))) return 0;
  }
  let count = 0;
  while (set.has(date.toISOString().slice(0, 10))) {
    count++;
    date.setDate(date.getDate() - 1);
  }
  return count;
}

function questionUrl(q) {
  return `problem.html?topic=${encodeURIComponent(q.topic)}&level=${q.level}&q=${q.number - 1}`;
}

function rememberQuestion(q) {
  localStorage.setItem(lastQuestionKey, JSON.stringify({ topic: q.topic, level: q.level, index: q.number - 1, id: q.id }));
}

function getLastQuestion() {
  try { return JSON.parse(localStorage.getItem(lastQuestionKey) || 'null'); } catch { return null; }
}

function findQuestionFromLast() {
  const last = getLastQuestion();
  if (!last) return null;
  return allQuestions().find(q => q.id === last.id) || null;
}

function explanationFor(q) {
  const byTopic = {
    'Python Basics': 'Follow Python syntax rules, write clear print statements, and use 4 spaces for indentation.',
    'Variables': 'Use descriptive variable names, follow naming rules, and use single assignment or multiple assignment.',
    'Data Types': 'Determine whether the value is an int, float, str, or bool. Use type() to inspect or int()/float()/str()/bool() to convert.',
    'Variables and Data Types': 'Use the value’s type to decide how it should be stored or converted. Keep the input, conversion, and output steps separate.',
    'Input and Output': 'Read the input first, convert it only when needed, then build the required output with clear formatting.',
    'Operators': 'Break the task into small expressions. Check the operator you need before adding extra logic.',
    'Conditional Statements': 'List the possible cases first, then order your if/elif/else checks from the most specific case to the fallback case.',
    'Loops': 'Choose between for and while based on whether the number of passes is known or condition-driven. Update the loop state properly on every pass.',
    'For Loops': 'Choose a clear range, name the loop variable, and update the result inside the loop.',
    'While Loops': 'Decide the stop condition before the loop starts, and make sure each pass moves toward that stop condition.',
    'Nested Loops': 'Use the outer loop for the bigger structure and the inner loop for the repeated work inside each part.',
    'Strings': 'Treat a string as a sequence. Index or slice it first, then apply the smallest operation that solves the task.',
    'String Methods': 'Pick the method that matches the text task, and chain methods only when each step has a clear reason.',
    'Functions': 'Give the function one clear job. Pass data in with parameters and return the result instead of printing too early.',
    'Lists': 'Choose whether you need to read, update, search, or rebuild the list, then use the simplest list operation for that job.',
    'Tuples': 'Use tuple unpacking for fixed groups of values and keep tuple data focused on records that should not change.',
    'Sets': 'Use sets when uniqueness or membership matters more than order.',
    'Dictionaries': 'Think in key → value pairs. Choose keys that clearly identify the data you need to read or update.',
    'Comprehensions': 'Write the loop transformation and filter cleanly in one line using list, dict, or set comprehension syntax.',
    'Comprehension': 'Write the loop transformation and filter cleanly in one line using list, dict, or set comprehension syntax.',
    'List Comprehension': 'Write the normal loop first in your head, then turn the simple value-building step into a comprehension.',
    'Exception Handling': 'Protect only the operation that can fail and handle the specific error you expect.',
    'File Handling': 'Open the file safely with a context manager (with open), read or write the data, then print results cleanly.',
    'Modules and Packages': 'Import the standard module (e.g. math, random, datetime, collections) and use its functions cleanly.',
    'Object-Oriented Programming': 'Give each class a clear responsibility. Store related data on the object and keep behavior close to that data.'
  };
  return byTopic[q.topic] || 'Break the problem into input, processing, and output. Start with the simplest correct solution, then improve it.';
}

function getProfile() {
  try {
    const raw = JSON.parse(localStorage.getItem(profileKey) || 'null');
    if (raw && raw.name) return raw;
  } catch {}
  return {
    name: 'Learner',
    bio: 'Learning Python, one problem at a time.',
    createdAt: new Date().toISOString()
  };
}

function saveProfile(p) {
  localStorage.setItem(profileKey, JSON.stringify(p));
}

function profileInitials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'L';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function memberSince() {
  const p = getProfile();
  try {
    const d = new Date(p.createdAt);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch { return new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); }
}

/* ==========================================================================
   Authentication & Session State Management
   ========================================================================== */
const authKey = 'pypractice-auth-v1';

function getAuth() {
  try {
    const raw = localStorage.getItem(authKey);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && (data.email || data.name)) return data;
  } catch {}
  return null;
}

function isLoggedIn() {
  return !!getAuth();
}

function logoutUser() {
  localStorage.removeItem(authKey);
  if (typeof toast === 'function') {
    toast('Signed out successfully.');
  }
  setTimeout(() => location.reload(), 300);
}

function syncAuthUI() {
  const auth = getAuth();
  const loggedIn = !!auth;

  // 0. Update body classes for CSS-level auth state rules
  if (document.body) {
    document.body.classList.toggle('is-authenticated', loggedIn);
    document.body.classList.toggle('is-guest', !loggedIn);
  }

  // 1. Elements visible ONLY when logged in
  document.querySelectorAll('[data-auth-only]').forEach(el => {
    if (loggedIn) {
      el.style.removeProperty('display');
      // Do not strip 'hidden' if element has responsive prefixes (sm:, md:, lg:)
      // where 'hidden' is the mobile base style!
      if (!/\b(sm|md|lg):/.test(el.className)) {
        el.classList.remove('hidden');
      }
    } else {
      el.classList.add('hidden');
      el.style.display = 'none';
    }
  });

  // 2. Elements visible ONLY when guest (not logged in)
  document.querySelectorAll('[data-guest-only]').forEach(el => {
    if (loggedIn) {
      el.classList.add('hidden');
      el.style.display = 'none';
    } else {
      el.style.removeProperty('display');
      // Do not strip 'hidden' if element has responsive prefixes (sm:, md:, lg:)
      // where 'hidden' is the mobile base style!
      if (!/\b(sm|md|lg):/.test(el.className)) {
        el.classList.remove('hidden');
      }
    }
  });

  // 3. User name & email interpolations
  if (loggedIn) {
    const name = auth.name || (auth.email ? auth.email.split('@')[0] : 'Learner');
    const initial = name.charAt(0).toUpperCase();
    document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = name);
    document.querySelectorAll('[data-user-initial]').forEach(el => el.textContent = initial);
    document.querySelectorAll('[data-user-email]').forEach(el => el.textContent = auth.email || '');
  }

  // 4. Automatically hide Progress & Profile navigation links when not logged in
  document.querySelectorAll('a[href="progress.html"], a[href="profile.html"]').forEach(a => {
    // Only target header navs, mobile drawers, or footer explore links
    if (a.closest('nav') || a.closest('#mobileMenu') || a.closest('.header-blur') || a.closest('header') || a.closest('ul')) {
      if (!loggedIn) {
        a.classList.add('hidden');
        a.style.display = 'none';
        if (a.parentElement && a.parentElement.tagName === 'LI') {
          a.parentElement.classList.add('hidden');
          a.parentElement.style.display = 'none';
        }
      } else {
        a.classList.remove('hidden');
        a.style.removeProperty('display');
        if (a.parentElement && a.parentElement.tagName === 'LI') {
          a.parentElement.classList.remove('hidden');
          a.parentElement.style.removeProperty('display');
        }
      }
    }
  });

  // 5. Logout buttons
  document.querySelectorAll('[data-logout-btn]').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      logoutUser();
    };
  });
}

/* --- Global Auth Prompt Modal --- */
function promptLoginModal(message) {
  let modal = document.getElementById('globalAuthModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'globalAuthModal';
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm transition-opacity duration-200';
    modal.innerHTML = `
      <div class="card w-full max-w-[420px] p-7 sm:p-8 rounded-[24px] shadow-2xl relative border border-line animate-in fade-in zoom-in-95 duration-200" style="background-color: var(--paper-2, #FFFFFF); color: var(--ink, #18181B);">
        <button type="button" data-close-auth-modal class="absolute top-4 right-4 w-8 h-8 rounded-full grid place-items-center text-muted hover:text-ink btn-ghost border border-line text-sm" aria-label="Close">✕</button>
        <div class="w-12 h-12 rounded-2xl bg-[var(--green-soft, #dce9de)] text-[var(--green, #2e5a33)] grid place-items-center text-xl mb-4">
          <i class="fa-solid fa-lock"></i>
        </div>
        <h3 class="text-xl font-bold tracking-tight text-ink">Sign in required</h3>
        <p id="authModalMsg" class="text-xs sm:text-sm text-muted mt-2 leading-relaxed"></p>
        <div class="mt-6 flex flex-col gap-2.5">
          <a href="login.html" class="btn-primary w-full py-3 px-4 text-xs font-semibold rounded-[10px] text-center shadow-sm">Log in</a>
          <a href="signup.html" class="btn-ghost w-full py-3 px-4 text-xs font-semibold rounded-[10px] text-center border border-line">Create free account</a>
        </div>
        <div class="mt-4 text-center">
          <button type="button" data-close-auth-modal class="text-xs text-muted hover:text-ink hover:underline">Maybe later</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelectorAll('[data-close-auth-modal]').forEach(b => {
      b.onclick = () => modal.remove();
    });
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
  }
  const msgEl = modal.querySelector('#authModalMsg');
  if (msgEl) {
    msgEl.textContent = message || 'Please log in or create an account to access this feature.';
  }
}

// Expose for Firestore sync (js/auth.js module needs access)
try { window.state = state; window.save = save; window.saveProfile = saveProfile; window.getProfile = getProfile; } catch {}



