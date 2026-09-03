/* ==========================================================================
   PyPractice Page Controllers: Landing, Topics Directory, Practice, Progress, Roadmap
   ========================================================================== */

function initContinueWidget() {
  const host = document.getElementById('continueCard');
  if (!host) return;
  const q = findQuestionFromLast();
  if (!q) { host.classList.add('hidden'); return; }
  const p = topicProgress(q.topic);
  host.classList.remove('hidden');
  host.classList.add('ambient-glow');
  host.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div>
        <div class="text-[10px] uppercase tracking-[.18em] text-muted">Continue where you left off</div>
        <div class="text-2xl tracking-[-.03em] mt-2">${escapeHtml(q.title)}</div>
        <p class="text-sm text-muted mt-2">${escapeHtml(q.topic)} · ${levelMeta[q.level].label} · ${p.done}/${p.total} solved in this topic</p>
      </div>
      <a href="${questionUrl(q)}" class="btn-primary px-5 py-3 text-sm rounded-[3px] shrink-0">Continue →</a>
    </div>
  `;
}

function initLanding() {
  if (!document.getElementById('landingPage')) return;
  initContinueWidget();
  document.querySelectorAll('[data-streak]').forEach(e => e.textContent = streak());
  document.querySelectorAll('[data-daily-goal]').forEach(e => e.textContent = `${Math.min(dailyGoal, activityToday())}/${dailyGoal}`);
  document.querySelectorAll('[data-daily-bar]').forEach(e => e.style.width = `${Math.min(100, activityToday() / dailyGoal * 100)}%`);
}

const TOPIC_FA_ICONS = {
  'Python Basics': 'fa-brands fa-python',
  'Variables': 'fa-solid fa-cubes',
  'Data Types': 'fa-solid fa-database',
  'Input and Output': 'fa-solid fa-keyboard',
  'Operators': 'fa-solid fa-calculator',
  'Conditional Statements': 'fa-solid fa-code-branch',
  'Loops': 'fa-solid fa-rotate',
  'Strings': 'fa-solid fa-font',
  'Functions': 'fa-solid fa-gears',
  'Lists': 'fa-solid fa-list-ol',
  'Tuples': 'fa-solid fa-layer-group',
  'Sets': 'fa-solid fa-circle-nodes',
  'Dictionaries': 'fa-solid fa-book-open',
  'Comprehension': 'fa-solid fa-bolt',
  'Exception Handling': 'fa-solid fa-triangle-exclamation',
  'File Handling': 'fa-solid fa-file-lines',
  'Modules and Packages': 'fa-solid fa-boxes-stacked',
  'Object-Oriented Programming': 'fa-solid fa-diagram-project',
  'Variables and Data Types': 'fa-solid fa-cubes-stacked',
  'For Loops': 'fa-solid fa-repeat',
  'While Loops': 'fa-solid fa-arrows-rotate',
  'Nested Loops': 'fa-solid fa-table-cells-large',
  'String Methods': 'fa-solid fa-font',
  'List Comprehension': 'fa-solid fa-bolt'
};

function getTopicIcon(name) {
  return TOPIC_FA_ICONS[name] || 'fa-solid fa-code';
}

const TOPIC_ART = {
  'Python Basics': { img: 'assets/05_asset.png', domain: 'Syntax', pos: 'object-center', bg: 'bg-[#faeed6] dark:bg-[#201e1d]' },
  'Variables': { img: 'assets/07_asset.png', domain: 'Memory', pos: 'object-center', bg: 'bg-[#fceed8] dark:bg-[#201e1d]' },
  'Data Types': { img: 'assets/09_asset.png', domain: 'Types', pos: 'object-center', bg: 'bg-[#d7c4ea] dark:bg-[#201e1d]' },
  'Variables and Data Types': { img: 'assets/07_asset.png', domain: 'Foundations', pos: 'object-center', bg: 'bg-[#fceed8] dark:bg-[#201e1d]' },

  'Input and Output': { img: 'assets/03_asset.jpg', domain: 'I/O', pos: 'object-center', bg: 'bg-[#fdf5df] dark:bg-[#201e1d]' },
  'Operators': { img: 'assets/10_asset.png', domain: 'Operations', pos: 'object-center', bg: 'bg-[#cfe5d8] dark:bg-[#201e1d]' },
  'Conditional Statements': { img: 'assets/19_asset.jpg', domain: 'Branching', pos: 'object-[center_35%]', bg: 'bg-[#fef3e2] dark:bg-[#201e1d]' },

  'Loops': { img: 'assets/08_asset.png', domain: 'Iteration', pos: 'object-center', bg: 'bg-[#fcecd7] dark:bg-[#201e1d]' },
  'For Loops': { img: 'assets/08_asset.png', domain: 'Iteration', pos: 'object-center', bg: 'bg-[#fcecd7] dark:bg-[#201e1d]' },
  'While Loops': { img: 'assets/08_asset.png', domain: 'Iteration', pos: 'object-center', bg: 'bg-[#fcecd7] dark:bg-[#201e1d]' },
  'Nested Loops': { img: 'assets/08_asset.png', domain: 'Iteration', pos: 'object-center', bg: 'bg-[#fcecd7] dark:bg-[#201e1d]' },

  'Strings': { img: 'assets/25_asset.jpg', domain: 'Text', pos: 'object-center', bg: 'bg-[#6e8777] dark:bg-[#201e1d]' },
  'String Methods': { img: 'assets/25_asset.jpg', domain: 'Text', pos: 'object-center', bg: 'bg-[#6e8777] dark:bg-[#201e1d]' },
  'Lists': { img: 'assets/16_asset.jpg', domain: 'Sequences', pos: 'object-center', bg: 'bg-[#fdf5df] dark:bg-[#201e1d]' },

  'Functions': { img: 'assets/12_asset.png', domain: 'Modular', pos: 'object-center', bg: 'bg-[#fded7a] dark:bg-[#201e1d]' },
  'Tuples': { img: 'assets/20_asset.jpg', domain: 'Immutable', pos: 'object-center', bg: 'bg-[#454363]' },
  'Sets': { img: 'assets/15_asset.jpg', domain: 'Unique', pos: 'object-[center_35%]', bg: 'bg-[#fef8ed] dark:bg-[#201e1d]' },

  'Dictionaries': { img: 'assets/24_asset.jpg', domain: 'Mapping', pos: 'object-center', bg: 'bg-[#fdf2dc] dark:bg-[#201e1d]' },
  'Comprehension': { img: 'assets/14_asset.png', domain: 'Concise', pos: 'object-center', bg: 'bg-[#fbb993] dark:bg-[#201e1d]' },
  'List Comprehension': { img: 'assets/14_asset.png', domain: 'Concise', pos: 'object-center', bg: 'bg-[#fbb993] dark:bg-[#201e1d]' },

  'Object-Oriented Programming': { img: 'assets/06_asset.png', domain: 'Architecture', pos: 'object-center', bg: 'bg-[#fedec2] dark:bg-[#201e1d]' },
  'Exception Handling': { img: 'assets/11_asset.png', domain: 'Defensive', pos: 'object-center', bg: 'bg-[#1c55a4]' },
  'File Handling': { img: 'assets/13_asset.png', domain: 'I/O & Files', pos: 'object-center', bg: 'bg-[#bee5cc] dark:bg-[#201e1d]' },
  'Modules and Packages': { img: 'assets/18_asset.jpg', domain: 'Packages', pos: 'object-center', bg: 'bg-[#333f63]' }
};

function getTopicArt(name) {
  return TOPIC_ART[name] || { img: 'assets/25_asset.jpg', domain: 'Python', pos: 'object-center', bg: 'bg-[#6e8777]' };
}

function renderPracticeTopics() {
  const grid = document.getElementById('practiceTopics');
  if (!grid) return;
  const q = (document.getElementById('topicSearch')?.value || '').toLowerCase();
  const level = document.getElementById('levelFilter')?.value || 'all';
  const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : false;
  const items = topics.filter(t => (!q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)) && (level === 'all' || questionsFor(t.name, level).length));

  grid.innerHTML = items.map((t, idx) => {
    const originalIdx = topics.findIndex(x => x.name === t.name);
    const isLocked = !loggedIn && originalIdx >= 2;
    const p = topicProgress(t.name);
    const iconClass = getTopicIcon(t.name);
    const art = getTopicArt(t.name);
    const pct = p.pct;
    const isDone = pct === 100;
    const isStarted = p.done > 0;
    const statusLabel = isDone ? 'Completed' : isStarted ? pct + '% completed' : 'Not started';
    const statusIcon = isDone ? 'fa-solid fa-circle-check' : isStarted ? 'fa-solid fa-chart-simple' : 'fa-regular fa-circle-play';
    const statusColor = isDone ? 'text-emerald-600 dark:text-emerald-400' : isStarted ? 'text-[var(--green)]' : 'text-muted';
    const topBarClass = isLocked ? 'bg-amber-500/70' : isDone ? 'bg-emerald-500' : isStarted ? 'green-bg' : 'bg-[var(--line)]';
    const btnClass = isDone
      ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800 dark:hover:bg-emerald-900/30'
      : 'btn-primary';
    const btnLabel = isDone ? 'Review topic' : isStarted ? 'Continue' : 'Start practicing';
    const btnIcon = isDone ? 'fa-solid fa-arrow-rotate-left' : 'fa-solid fa-play';

    return `
      <article class="topic-card group card flex flex-col p-5 sm:p-6 rounded-[18px] relative overflow-hidden ${isLocked ? 'opacity-90' : ''}" style="animation-delay: ${idx * 0.04}s">
        <div class="absolute top-0 left-0 right-0 h-[3px] ${topBarClass} opacity-80 z-20"></div>
        
        <!-- Framed Illustration Viewport matching Home Screen -->
        <div class="w-full h-52 rounded-[14px] overflow-hidden ${art.bg} border border-line/40 relative mb-5 flex items-center justify-center shrink-0">
          <img
            src="${art.img}"
            alt="${escapeHtml(t.name)}"
            class="w-full h-full object-cover ${art.pos || 'object-center'} group-hover:scale-105 transition-transform duration-500 ease-out dark:brightness-[0.93] dark:contrast-[1.05]"
            loading="lazy"
          />
          <!-- Floating Category & Progress Badges -->
          <span class="absolute top-3 left-3 card-badge text-[10px] uppercase font-mono font-semibold tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-10 ${isLocked ? '!bg-amber-500/20 !text-amber-700 dark:!text-amber-300 !border-amber-500/30' : ''}">
            <i class="${isLocked ? 'fa-solid fa-lock text-amber-500' : iconClass + ' text-[var(--green)]'}"></i> ${isLocked ? 'Locked' : art.domain}
          </span>
          <span class="absolute top-3 right-3 card-badge text-[10px] font-mono font-semibold tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-10 ${isDone ? '!text-emerald-700 dark:!text-emerald-300' : ''}">
            ${isLocked 
              ? '<i class="fa-solid fa-user-lock text-[10px] opacity-70"></i> Free Account'
              : `<i class="${isDone ? 'fa-solid fa-medal text-emerald-600' : isStarted ? 'fa-solid fa-fire text-[var(--green)]' : 'fa-regular fa-circle text-muted'} text-[10px]"></i> ${p.done}/${p.total} · ${pct}%`
            }
          </span>
        </div>

        <!-- Card Content -->
        <div class="flex flex-col flex-1">
          <h3 class="text-xl font-semibold tracking-[-.03em] text-ink group-hover:text-[var(--green)] transition-colors leading-snug flex items-center justify-between">
            <span>${escapeHtml(t.name)}</span>
            ${isLocked ? '<i class="fa-solid fa-lock text-xs text-amber-500/80"></i>' : ''}
          </h3>
          <p class="text-sm text-muted leading-6 mt-2 line-clamp-2 min-h-[44px]">
            ${escapeHtml(t.desc)}
          </p>

          <!-- Action Footer -->
          <div class="mt-auto pt-5 border-t border-line/50">
            ${isLocked ? `
              <button type="button" onclick="promptLoginModal('Sign in or create a free account to unlock ${escapeHtml(t.name)} and all 18 topics!')" class="w-full relative overflow-hidden inline-flex items-center justify-between gap-2 px-4 py-3 rounded-[10px] text-xs font-semibold btn-ghost border border-dashed border-line hover:border-[var(--green)] hover:text-[var(--green)] transition-all group/btn">
                <span class="relative z-10 inline-flex items-center gap-2 text-muted group-hover/btn:text-ink">
                  <i class="fa-solid fa-lock text-amber-500"></i> Unlock with free account
                </span>
                <span class="relative z-10 text-[10px] font-mono text-[var(--green)] font-semibold">
                  Sign in →
                </span>
              </button>
            ` : `
              <a href="practice.html?topic=${encodeURIComponent(t.name)}&level=basic" class="w-full relative overflow-hidden inline-flex items-center justify-between gap-2 px-4 py-3 rounded-[10px] text-xs font-semibold ${btnClass} transition-all hover:shadow-md group/btn isolate">
                <!-- Track (subtle) -->
                <span class="absolute inset-0 rounded-[10px] ${isDone ? 'bg-emerald-500/[0.07] dark:bg-emerald-500/10' : 'bg-black/[0.04] dark:bg-white/[0.06]'} pointer-events-none" aria-hidden="true"></span>
                <!-- Fill — high contrast + right edge + shimmer -->
                <span class="absolute inset-y-0 left-0 ${isDone ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-white dark:bg-white'} transition-all duration-700 ease-out" style="width:${pct}%; opacity:${isDone ? 0.22 : 0.24}" aria-hidden="true"></span>
                <span class="absolute inset-y-0 left-0 border-r ${isDone ? 'border-emerald-500/40 dark:border-emerald-400/50' : 'border-white/50 dark:border-white/30'} transition-all duration-700" style="width:${pct}%; opacity:${pct>0?1:0}" aria-hidden="true"></span>
                <span class="relative z-10 inline-flex items-center gap-2">
                  <i class="${btnIcon} text-[11px]"></i> ${btnLabel}
                </span>
                <span class="relative z-10 inline-flex items-center gap-2">
                  ${pct>0 ? `<span class="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full ${isDone ? 'bg-emerald-500 text-white dark:bg-emerald-500' : 'bg-[var(--ink)] text-white dark:bg-white dark:text-[#1b1a19]'}">${pct}%</span>` : ''}
                  <i class="fa-solid fa-arrow-right text-[11px] transition-transform group-hover/btn:translate-x-1"></i>
                </span>
              </a>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('') || '<div class="card p-10 text-center text-sm text-muted col-span-full rounded-[14px]"><i class="fa-solid fa-magnifying-glass text-3xl opacity-10 mb-4 block"></i><div class="font-medium">No topics match your search.</div><div class="text-xs mt-1">Try another keyword or switch the level filter.</div></div>';

  const meta = document.getElementById('topicResultMeta');
  if (meta) {
    const filterLabel = level !== 'all' ? ' · ' + level.charAt(0).toUpperCase() + level.slice(1) : '';
    if (items.length === 0) {
      meta.innerHTML = '<i class="fa-solid fa-circle-info"></i> No matches' + (q ? ' for “' + escapeHtml(q) + '”' : '') + filterLabel;
    } else if (q || level !== 'all') {
      meta.innerHTML = '<i class="fa-solid fa-filter text-[11px] opacity-60"></i> Showing ' + items.length + ' of ' + topics.length + ' topics' + (q ? ' for “' + escapeHtml(q) + '”' : '') + filterLabel;
    } else {
      meta.innerHTML = '<i class="fa-solid fa-layer-group text-[11px] opacity-60"></i> ' + topics.length + ' topics · 3 levels · ' + allQuestions().length + ' questions';
    }
  }

  // Ensure topic cards are visible immediately on initial load and after search/filter
  if (!grid.classList.contains('in')) {
    requestAnimationFrame(() => grid.classList.add('in'));
  }
}

function initTopicsDirectory() {
  const grid = document.getElementById('practiceTopics');
  if (!grid) return;
  renderPracticeTopics();
  if (!grid.classList.contains('in')) {
    requestAnimationFrame(() => grid.classList.add('in'));
  }
  document.getElementById('topicSearch')?.addEventListener('input', renderPracticeTopics);
  document.getElementById('levelFilter')?.addEventListener('change', renderPracticeTopics);
}

function initPracticePage() {
  const title = document.getElementById('practicePageTitle');
  if (!title) return;
  const params = new URLSearchParams(location.search);
  const topic = params.get('topic') || topics[0].name;
  const level = params.get('level') || 'basic';
  const t = topics.find(x => x.name === topic) || topics[0];
  const qs = questionsFor(t.name, level);

  const breadcrumbTopic = document.getElementById('practiceBreadcrumbTopic');
  if (breadcrumbTopic) breadcrumbTopic.textContent = t.name;
  const topicDescEl = document.getElementById('practiceTopicDesc');
  if (topicDescEl) topicDescEl.textContent = t.desc;
  const pageTitleEl = document.getElementById('practicePageTitle');
  if (pageTitleEl) pageTitleEl.textContent = `${levelMeta[level].label} practice`;
  const countEl = document.getElementById('practiceCount');
  if (countEl) countEl.innerHTML = `<i class="fa-solid fa-list-ol text-[11px] opacity-60"></i> ${qs.length} ${levelMeta[level].label.toLowerCase()} questions`;
  document.querySelectorAll('[data-level-link]').forEach(a => {
    a.href = `practice.html?topic=${encodeURIComponent(t.name)}&level=${a.dataset.level}`;
    a.classList.toggle('border-ink', a.dataset.level === level);
    a.classList.toggle('bg-[var(--soft)]', a.dataset.level === level);
    a.classList.toggle('font-medium', a.dataset.level === level);
  });
  const progEl = document.getElementById('practiceProgress');
  if (progEl) progEl.innerHTML = `<i class="fa-solid fa-chart-pie text-[11px] opacity-60"></i> ${topicProgress(t.name).pct}% complete across this topic`;

  const topicIndex = topics.findIndex(x => x.name === t.name);
  const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : false;
  if (!loggedIn && topicIndex >= 2) {
    const listEl = document.getElementById('practiceQuestionList');
    if (listEl) {
      listEl.innerHTML = `
        <div class="card p-10 sm:p-14 text-center rounded-[20px] max-w-xl mx-auto my-8 border border-amber-500/30 bg-amber-500/[0.04]">
          <div class="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 grid place-items-center text-2xl mx-auto mb-4">
            <i class="fa-solid fa-lock"></i>
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-ink">Topic Locked for Guests</h2>
          <p class="text-sm text-muted mt-2.5 leading-relaxed">
            The first 2 topics (<b>${escapeHtml(topics[0].name)}</b> and <b>${escapeHtml(topics[1].name)}</b>) are completely free to practice. Please log in or create a free account to unlock <b>${escapeHtml(t.name)}</b> and all 18 topics!
          </p>
          <div class="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="login.html" class="btn-primary w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-[10px]">Log in</a>
            <a href="signup.html" class="btn-ghost w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-[10px] border border-line">Sign up free</a>
          </div>
          <div class="mt-5">
            <a href="topics.html" class="text-xs text-[var(--green)] hover:underline">← Back to unlocked topics</a>
          </div>
        </div>
      `;
    }
    renderHeaderProgress();
    return;
  }

  document.getElementById('practiceQuestionList').innerHTML = qs.map((q, idx) => {
    const isSolved = solved(q.id);
    return `
    <article class="group card reveal topic-card flex flex-col sm:flex-row sm:items-center gap-5 p-5 sm:p-6 rounded-[14px] relative overflow-hidden" style="animation-delay: ${idx * 0.04}s">
      <div class="absolute top-0 left-0 right-0 h-[2.5px] ${isSolved ? 'bg-emerald-500' : 'bg-[var(--line)]'} opacity-80"></div>
      <div class="flex gap-4 flex-1 min-w-0">
        <div class="h-11 w-11 shrink-0 rounded-xl border ${isSolved ? 'bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300' : 'bg-[var(--soft)] border-line text-ink dark:bg-[#2a2826] dark:border-[var(--dark-line)] dark:text-[#f4efe6]'} grid place-items-center text-xs font-mono shrink-0 group-hover:scale-105 transition-transform duration-300">${String(q.number).padStart(2, '0')}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border ${isSolved ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300' : 'bg-[var(--soft)] border-line text-muted dark:bg-white/[0.06] dark:border-white/10'}"><i class="fa-solid ${isSolved ? 'fa-check' : 'fa-play'} text-[10px]"></i> ${levelMeta[level].label} • Q${q.number}</span>
            ${isSolved ? '<span class="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300"><i class="fa-solid fa-circle-check text-[11px]"></i> Completed</span>' : '<span class="text-[11px] text-muted inline-flex items-center gap-1"><i class="fa-regular fa-circle text-[11px]"></i> Not started</span>'}
          </div>
          <h3 class="text-[17px] font-semibold tracking-[-.02em] mt-2 leading-tight">${escapeHtml(q.title)}</h3>
          <p class="text-[13px] text-muted leading-6 mt-1.5 line-clamp-2">${escapeHtml(q.description)}</p>
        </div>
      </div>
      <div class="sm:ml-auto flex items-center gap-3 shrink-0 w-full sm:w-auto">
        <a class="${isSolved ? 'btn-ghost' : 'btn-primary'} w-full sm:w-auto px-5 py-2.5 text-xs rounded-[10px] inline-flex items-center justify-center gap-2" href="${questionUrl(q)}"><i class="fa-solid ${isSolved ? 'fa-rotate-left' : 'fa-play'} text-[11px]"></i> ${isSolved ? 'Review' : 'Solve'} <i class="fa-solid fa-arrow-right text-[10px] opacity-60 group-hover:translate-x-0.5 transition-transform"></i></a>
      </div>
    </article>
  `;
  }).join('');
  renderHeaderProgress();
}

function initProgressPage() {
  const root = document.getElementById('progressPage');
  if (!root) return;

  if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
    location.replace('login.html');
    return;
  }

  if (typeof syncAllStats === 'function') syncAllStats();
  else {
    const p = overall();
    const solvedEl = document.getElementById('progressSolved');
    if (solvedEl) solvedEl.textContent = p.done;
    const overallEl = document.getElementById('progressOverall');
    if (overallEl) overallEl.textContent = p.pct + '%';
    const overallBar = document.getElementById('progressOverallBar');
    if (overallBar) overallBar.style.width = p.pct + '%';
    const startedEl = document.getElementById('progressStarted');
    if (startedEl) startedEl.textContent = topics.filter(t => topicProgress(t.name).done).length;
    const streakEl = document.getElementById('progressStreak');
    if (streakEl) streakEl.textContent = streak();
    const todayEl = document.getElementById('progressToday');
    if (todayEl) todayEl.textContent = `${Math.min(dailyGoal, activityToday())}/${dailyGoal}`;
  }
  const p = overall();
  const overallLabel = document.getElementById('progressOverallLabel');
  if (overallLabel) overallLabel.textContent = p.pct + '% complete';

  const emptyEl = document.getElementById('progressEmpty');
  const grid = document.getElementById('progressGrid');
  if (!grid) return;

  // Empty state
  if (p.done === 0) {
    grid.classList.add('hidden');
    if (emptyEl) emptyEl.classList.remove('hidden');
  } else {
    grid.classList.remove('hidden');
    if (emptyEl) emptyEl.classList.add('hidden');
  }

  grid.innerHTML = topics.map((t, idx) => {
    const tp = topicProgress(t.name);
    const isDone = tp.pct === 100;
    const isStarted = tp.done > 0;
    const pct = tp.pct;
    const iconClass = getTopicIcon(t.name);
    const num = String(idx + 1).padStart(2, '0');
    const statusLabel = isDone ? 'Completed' : isStarted ? pct + '% completed' : 'Not started';
    const statusIcon = isDone ? 'fa-solid fa-circle-check' : isStarted ? 'fa-solid fa-chart-simple' : 'fa-regular fa-circle-play';
    const statusColor = isDone ? 'text-emerald-600 dark:text-emerald-400' : isStarted ? 'text-[var(--green)]' : 'text-muted';
    const art = getTopicArt(t.name);

    return `
      <a href="practice.html?topic=${encodeURIComponent(t.name)}&level=basic"
         class="card reveal group relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 p-5 sm:p-6 rounded-[18px] border border-line hover:border-[var(--green)]/40 hover:shadow-[0_12px_32px_rgba(43,39,34,0.06)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:-translate-y-[2px] transition-all duration-300 overflow-hidden block"
         style="animation-delay: ${idx * 0.02}s">
        <!-- Left accent indicator on hover -->
        <div class="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--green)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <!-- Left Index & Icon Box -->
        <div class="flex items-center gap-3.5 sm:gap-4 shrink-0">
          <span class="font-mono text-xs sm:text-sm font-bold text-muted/50 tracking-wider w-5 text-right shrink-0">${num}</span>
          <div class="h-12 w-12 rounded-[14px] bg-[var(--soft)] border border-line grid place-items-center text-ink text-base group-hover:bg-[var(--green)] group-hover:text-white group-hover:border-[var(--green)] group-hover:shadow-[0_4px_16px_rgba(91,115,93,0.25)] transition-all duration-300 dark:bg-[#2a2826] dark:border-[var(--dark-line)] dark:text-[#f4efe6] shrink-0">
            <i class="${iconClass} text-[16px]"></i>
          </div>
        </div>

        <!-- Middle Content & Progress -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-3 flex-wrap">
            <div class="flex items-center gap-2.5 min-w-0">
              <h3 class="text-base sm:text-lg font-semibold tracking-[-.02em] text-ink group-hover:text-[var(--green)] transition-colors truncate">
                ${escapeHtml(t.name)}
              </h3>
              <span class="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border border-line bg-white/70 dark:bg-white/[0.06] text-muted">
                ${art.domain}
              </span>
            </div>
            <span class="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border shadow-sm ${isDone ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300' : isStarted ? 'bg-[var(--green-soft)] border-[var(--green)]/20 text-[var(--green)] dark:bg-[#79917a]/15 dark:text-[#9eb69f] dark:border-[#79917a]/25' : 'bg-white border-line text-muted dark:bg-white/[0.06] dark:border-white/10'} shrink-0">
              <i class="${isDone ? 'fa-solid fa-medal text-emerald-600' : isStarted ? 'fa-solid fa-fire text-[var(--green)]' : 'fa-regular fa-circle text-muted'} text-[10px]"></i>
              ${tp.done}/${tp.total} <span class="opacity-40">·</span> ${pct}%
            </span>
          </div>

          <!-- Progress track -->
          <div class="mt-3 h-1.5 rounded-full progress-track overflow-hidden">
            <div class="h-full ${isDone ? 'bg-emerald-500' : 'green-bg'} rounded-full transition-all duration-700 ease-out" style="width:${pct}%"></div>
          </div>

          <!-- Status and remaining count -->
          <div class="mt-2 flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
            <span class="uppercase tracking-[.14em] font-semibold ${statusColor} inline-flex items-center gap-1.5">
              <i class="${statusIcon} text-[10px]"></i> ${statusLabel}
            </span>
            <span class="text-muted font-mono">
              ${isDone ? 'All questions solved' : (tp.total - tp.done) + ' questions remaining'}
            </span>
          </div>
        </div>

        <!-- Right Arrow Circle Button -->
        <div class="shrink-0 flex items-center pl-1 sm:pl-2">
          <span class="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-line bg-[var(--soft)]/50 grid place-items-center text-muted group-hover:bg-[var(--green)] group-hover:text-white group-hover:border-[var(--green)] group-hover:translate-x-1 transition-all duration-300 shrink-0 dark:bg-white/[0.04]">
            <i class="fa-solid fa-arrow-right text-xs sm:text-sm"></i>
          </span>
        </div>
      </a>
    `;
  }).join('');
}

function initRoadmap() {
  const root = document.getElementById('roadmap');
  if (!root) return;
  root.innerHTML = [
    ['01', 'Foundations', 'Variables, data types, input, output and operators.', 'Variables and Data Types'],
    ['02', 'Control Flow', 'Conditions, for loops, while loops and nested loops.', 'Conditional Statements'],
    ['03', 'Strings & Collections', 'Strings, methods, lists, tuples, sets and dictionaries.', 'Strings'],
    ['04', 'Functions', 'Reusable logic, parameters, returns and cleaner program structure.', 'Functions'],
    ['05', 'Advanced Python', 'Comprehensions, exceptions, files and object-oriented programming.', 'Exception Handling']
  ].map((x, i) => `
    <article class="roadmap-step ${i === 0 ? 'current' : ''}">
      <div class="roadmap-node font-mono">${x[0]}</div>
      <div>
        <div class="text-[10px] uppercase tracking-[.18em] text-muted">${x[1]}</div>
        <h3 class="text-xl mt-2 font-medium">${x[2]}</h3>
        <a class="inline-block mt-4 text-sm underline underline-offset-4" href="practice.html?topic=${encodeURIComponent(x[3])}&level=basic">Start here →</a>
      </div>
    </article>
  `).join('');
}
