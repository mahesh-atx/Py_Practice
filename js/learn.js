/* ==========================================================================
   PyPractice Learn Module: Modern Sidebar, Interactive Notes & Reader Template
   ========================================================================== */

const LEARN_FA_ICONS = {
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

const TOPIC_DOMAINS = {
  'Python Basics': { domain: 'Foundation', level: 'Beginner', readTime: '5 min' },
  'Variables': { domain: 'Syntax & Memory', level: 'Beginner', readTime: '6 min' },
  'Data Types': { domain: 'Data Structures', level: 'Beginner', readTime: '7 min' },
  'Input and Output': { domain: 'I/O & Formatting', level: 'Beginner', readTime: '5 min' },
  'Operators': { domain: 'Expressions', level: 'Beginner', readTime: '6 min' },
  'Conditional Statements': { domain: 'Flow Control', level: 'Beginner', readTime: '6 min' },
  'Loops': { domain: 'Iteration', level: 'Intermediate', readTime: '8 min' },
  'Strings': { domain: 'Text Processing', level: 'Intermediate', readTime: '7 min' },
  'Functions': { domain: 'Modular Code', level: 'Intermediate', readTime: '8 min' },
  'Lists': { domain: 'Sequences', level: 'Intermediate', readTime: '8 min' },
  'Tuples': { domain: 'Immutable Data', level: 'Intermediate', readTime: '6 min' },
  'Sets': { domain: 'Collections', level: 'Intermediate', readTime: '6 min' },
  'Dictionaries': { domain: 'Key-Value Mapping', level: 'Intermediate', readTime: '8 min' },
  'Comprehension': { domain: 'Concise Syntax', level: 'Intermediate', readTime: '6 min' },
  'Exception Handling': { domain: 'Defensive Code', level: 'Advanced', readTime: '7 min' },
  'File Handling': { domain: 'I/O & Persistence', level: 'Advanced', readTime: '7 min' },
  'Modules and Packages': { domain: 'Architecture', level: 'Advanced', readTime: '8 min' },
  'Object-Oriented Programming': { domain: 'OOP & Design', level: 'Advanced', readTime: '10 min' }
};

function getLearnIcon(name) { return LEARN_FA_ICONS[name] || 'fa-solid fa-code'; }
function getTopicMeta(name) { return TOPIC_DOMAINS[name] || { domain: 'General Python', level: 'Core', readTime: '6 min' }; }

function initLearnPage() {
  const root = document.getElementById('learnPage');
  if (!root) return;

  const topicListEl = document.getElementById('learnTopicList');
  const contentEl = document.getElementById('learnContent');
  const searchInput = document.getElementById('learnTopicSearch');
  const clearSearchBtn = document.getElementById('learnSearchClear');
  const progressBadgeEl = document.getElementById('learnProgressBadge');

  const params = new URLSearchParams(location.search);
  let activeTopicName = params.get('topic') || topics[0].name;
  if (!topics.some(t => t.name === activeTopicName)) {
    activeTopicName = topics[0].name;
  }

  let searchQuery = '';

  function renderSidebar() {
    if (!topicListEl) return;

    const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : false;

    if (progressBadgeEl) {
      const totalStarted = topics.filter(t => topicProgress(t.name).done > 0).length;
      progressBadgeEl.innerHTML = `<i class="fa-solid fa-layer-group text-[10px] opacity-60"></i> ${totalStarted}/18 started`;
    }

    if (clearSearchBtn) {
      clearSearchBtn.classList.toggle('hidden', !searchQuery);
    }

    const filtered = topics.filter(t => 
      !searchQuery || 
      t.name.toLowerCase().includes(searchQuery) || 
      t.desc.toLowerCase().includes(searchQuery)
    );

    if (!filtered.length) {
      topicListEl.innerHTML = `
        <div class="card p-6 text-center rounded-[14px] border border-dashed border-line">
          <i class="fa-solid fa-magnifying-glass text-2xl opacity-15 mb-3 block"></i>
          <div class="text-xs font-semibold text-ink">No matching topics</div>
          <div class="text-[11px] text-muted mt-1">Try a different concept or clear the search.</div>
          <button id="learnResetSearch" class="btn-ghost px-3 py-1.5 text-xs rounded-[8px] mt-3 inline-flex items-center gap-1.5">
            <i class="fa-solid fa-rotate-left text-[10px]"></i> Clear search
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('learnResetSearch');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          searchQuery = '';
          renderSidebar();
        });
      }
      return;
    }

    topicListEl.innerHTML = filtered.map((t, idx) => {
      const globalIdx = topics.findIndex(x => x.name === t.name);
      const isLocked = !loggedIn && globalIdx >= 2;
      const isActive = t.name === activeTopicName;
      const progress = topicProgress(t.name);
      const iconClass = getLearnIcon(t.name);
      const isDone = progress.pct === 100;
      const isStarted = progress.done > 0;
      const indexStr = String(globalIdx + 1).padStart(2, '0');

      return `
        <button
          type="button"
          data-topic-btn="${escapeHtml(t.name)}"
          data-is-locked="${isLocked ? 'true' : 'false'}"
          class="learn-topic-btn group relative w-full text-left p-3 rounded-[14px] border flex items-center gap-3 transition-all duration-200 overflow-hidden ${
            isActive 
              ? 'bg-white border-[var(--green)] shadow-[0_6px_20px_rgba(91,115,93,0.14)] ring-1 ring-[var(--green)]/20' 
              : 'bg-[var(--paper-2)] border-line/70 hover:bg-white hover:border-[var(--green)]/30 hover:shadow-[0_4px_14px_rgba(43,39,34,0.06)] hover:-translate-y-[1px]'
          } ${isLocked ? 'opacity-85' : ''}"
        >
          ${isActive ? '<div class="absolute left-0 top-0 bottom-0 w-[3.5px] bg-[var(--green)]"></div>' : ''}
          
          <span class="learn-icon-box h-9 w-9 shrink-0 rounded-[10px] border grid place-items-center text-[13px] transition-all duration-300 ${
            isActive 
              ? 'bg-[var(--green)] text-white border-[var(--green)] shadow-[0_4px_12px_rgba(91,115,93,0.22)]' 
              : 'bg-[var(--soft)] border-line text-ink group-hover:bg-white group-hover:border-[var(--green)]/20 group-hover:text-[var(--green)]'
          }">
            <i class="${isLocked ? 'fa-solid fa-lock text-amber-500' : iconClass}"></i>
          </span>

          <span class="flex-1 min-w-0 text-left">
            <span class="flex items-center gap-1.5">
              <span class="font-mono text-[10px] font-bold ${isActive ? 'text-[var(--green)]' : 'text-muted/60'}">${indexStr}</span>
              <span class="block text-[13px] leading-tight truncate ${isActive ? 'text-ink font-bold' : 'text-ink/90 font-medium group-hover:text-ink'}">${escapeHtml(t.name)}</span>
            </span>
            <span class="flex items-center gap-1.5 mt-1.5">
              ${isLocked ? `
                <span class="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                  <i class="fa-solid fa-lock text-[9px]"></i> Free Account
                </span>
              ` : `
                <span class="h-1 flex-1 max-w-[64px] rounded-full progress-track overflow-hidden"><span class="h-full block rounded-full ${isDone ? 'bg-emerald-500' : 'green-bg'}" style="width:${progress.pct}%"></span></span>
                <span class="text-[10px] font-mono ${isDone ? 'text-emerald-600 font-semibold' : isStarted ? 'text-[var(--green)] font-medium' : 'text-muted'}">${progress.done}/${progress.total} · ${progress.pct}%</span>
              `}
            </span>
          </span>

          <span class="shrink-0 flex items-center gap-1.5">
            ${isLocked ? `
              <span class="h-5 w-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 grid place-items-center text-[9px] shadow-2xs">
                <i class="fa-solid fa-lock"></i>
              </span>
            ` : isDone ? `
              <span class="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 grid place-items-center text-[9px] shadow-2xs"><i class="fa-solid fa-check"></i></span>
            ` : isStarted ? `
              <span class="h-5 w-5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 grid place-items-center text-[9px] shadow-2xs"><i class="fa-solid fa-fire"></i></span>
            ` : `
              <span class="h-5 w-5 rounded-full bg-transparent border border-line grid place-items-center text-muted/40 text-[8px] group-hover:border-[var(--green)]/40 group-hover:text-[var(--green)]"><i class="fa-regular fa-circle"></i></span>
            `}
            <i class="fa-solid fa-chevron-right text-[9px] ${isActive ? 'text-[var(--green)] opacity-80' : 'text-muted opacity-0 group-hover:opacity-40 group-hover:translate-x-0.5'} transition-all hidden sm:block"></i>
          </span>
        </button>
      `;
    }).join('');

    topicListEl.querySelectorAll('[data-topic-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-topic-btn');
        const isLocked = btn.getAttribute('data-is-locked') === 'true';
        if (isLocked) {
          if (typeof promptLoginModal === 'function') {
            promptLoginModal('Sign in or create a free account to unlock ' + selected + ' curriculum notes and all 18 topics!');
          }
          return;
        }
        selectTopic(selected);
      });
    });

    const activeBtn = topicListEl.querySelector(`[data-topic-btn="${CSS.escape(activeTopicName)}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ block: 'nearest' });
    }
  }

  function enhanceCodeBlocks(container) {
    if (!container) return;
    container.querySelectorAll('pre').forEach(pre => {
      if (pre.closest('.code-window-wrapped') || pre.closest('.output-block')) return;
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText;
      const langClass = code ? (code.className || '') : '';
      const isOutput = langClass.includes('language-text') || langClass.includes('language-output') || langClass.includes('language-plain');

      if (isOutput) {
        const wrapper = document.createElement('div');
        wrapper.className = 'output-block code-window-wrapped my-5 rounded-[12px] overflow-hidden border border-line bg-[var(--paper-2)]';
        const header = document.createElement('div');
        header.className = 'px-3.5 py-1.5 border-b border-line flex items-center justify-between text-[11px] font-mono text-muted bg-[var(--soft)]';
        header.innerHTML = `
          <span class="flex items-center gap-1.5"><i class="fa-solid fa-terminal text-[10px] opacity-60"></i> Output</span>
          <button class="copy-btn hover:text-ink transition">Copy</button>
        `;
        const copyBtn = header.querySelector('.copy-btn');
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(text);
          copyBtn.textContent = 'Copied! ✓';
          copyBtn.classList.add('copied');
          toast('Output copied to clipboard!');
          setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('copied');
          }, 1800);
        });
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(header);
        wrapper.appendChild(pre);
        pre.className = 'm-0 p-3.5 text-xs font-mono text-ink overflow-x-auto';
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'code-window code-window-wrapped rounded-[12px] overflow-hidden my-6 border border-[#3b3835] shadow-md';

      const header = document.createElement('div');
      header.className = 'px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs text-white/50 bg-[#1c1a19]';
      header.innerHTML = `
        <div class="flex items-center gap-1.5">
          <span class="h-2 w-2 rounded-full bg-[#ff5f56]"></span>
          <span class="h-2 w-2 rounded-full bg-[#ffbd2e]"></span>
          <span class="h-2 w-2 rounded-full bg-[#27c93f]"></span>
          <span class="ml-2 font-mono text-[11px] text-white/40">example.py</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-mono text-white/30 uppercase tracking-wider">Python 3</span>
          <button class="text-[11px] text-white/60 hover:text-white transition px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 copy-btn">
            Copy
          </button>
        </div>
      `;

      const copyBtn = header.querySelector('.copy-btn');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(text);
        copyBtn.textContent = 'Copied! ✓';
        copyBtn.classList.add('copied');
        toast('Code snippet copied!');
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 1800);
      });

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
      pre.className = 'm-0 p-4 text-[13px] leading-6 overflow-x-auto font-mono text-[#f4efe6] bg-[#211f1e]';
    });
  }

  function renderMarkdownNotes(mdText, t, progress) {
    const meta = getTopicMeta(t.name);
    const currentIndex = topics.findIndex(x => x.name === t.name);
    const prevTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
    const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

    const sections = [];
    const headingRegex = /^##?\s+([0-9]+[\.\)]?\s*[^#\n]+)/gm;
    let match;
    while ((match = headingRegex.exec(mdText)) !== null) {
      const rawTitle = match[1].trim();
      const slug = rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      sections.push({ title: rawTitle, id: 'sec-' + slug });
    }

    let parsedHtml = '';
    if (typeof marked !== 'undefined' && marked.parse) {
      parsedHtml = marked.parse(mdText);
    } else {
      parsedHtml = mdText
        .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold tracking-tight mt-6">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold tracking-tight mt-8 mb-3">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-base font-semibold mt-6 mb-2">$1</h3>')
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        .replace(/\n\n/gim, '<br><br>');
    }

    sections.forEach(s => {
      const titleEsc = s.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const hRegex = new RegExp(`(<h[23][^>]*>)(${titleEsc})`, 'i');
      parsedHtml = parsedHtml.replace(hRegex, `$1<span id="${s.id}" class="anchor-target"></span>$2`);
    });

    return `
      <header class="notes-hero mb-8 pb-8 border-b border-line">
        <nav class="flex items-center gap-2 text-xs text-muted font-mono mb-4">
          <a href="index.html" class="hover:text-ink transition flex items-center gap-1.5"><i class="fa-solid fa-house text-[10px]"></i> Home</a>
          <span class="opacity-40">/</span>
          <a href="learn.html" class="hover:text-ink transition">Learn</a>
          <span class="opacity-40">/</span>
          <span class="text-ink font-semibold">${escapeHtml(t.name)}</span>
        </nav>


        <h1 class="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-[-.04em] text-ink leading-[1.15] mt-2">
          ${escapeHtml(t.name)}
        </h1>

      </header>

      <article class="prose-notes pb-8">
        ${parsedHtml}
      </article>


      <section class="card learn-cta-card p-6 sm:p-8 rounded-[16px] mt-12 overflow-hidden relative border border-line shadow-sm">
        <div class="absolute top-0 left-0 right-0 h-[3px] ${progress.pct === 100 ? 'bg-emerald-500' : progress.done > 0 ? 'green-bg' : 'bg-[var(--line)]'} opacity-80"></div>
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="flex-1 min-w-0">
            <div class="inline-flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-muted font-mono font-semibold">
              <i class="fa-solid fa-bolt text-[11px] text-amber-500"></i> Deliberate Practice
            </div>
            <h3 class="text-2xl font-bold tracking-tight mt-2 flex items-center gap-2">
              <i class="${getLearnIcon(t.name)} text-[18px] text-[var(--green)] opacity-80"></i> Test your knowledge on ${escapeHtml(t.name)}
            </h3>
            <p class="text-[13px] text-muted leading-relaxed mt-2 max-w-lg">
              Solidify what you just read with curated test cases. Solve from scratch with live error diagnostics.
              <span class="font-medium ${progress.pct === 100 ? 'text-emerald-600' : progress.done > 0 ? 'text-[var(--green)]' : 'text-muted'} font-mono">${progress.done}/${progress.total} completed (${progress.pct}%)</span>
            </p>
            <div class="mt-3.5 h-1.5 max-w-[280px] rounded-full progress-track overflow-hidden">
              <div class="h-full ${progress.pct === 100 ? 'bg-emerald-500' : 'green-bg'} rounded-full transition-all duration-700" style="width:${progress.pct}%"></div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row lg:flex-col xl:flex-row flex-wrap gap-2.5 shrink-0">
            <a href="practice.html?topic=${encodeURIComponent(t.name)}&level=basic" class="inline-flex items-center justify-center gap-2 btn-primary px-5 py-2.5 text-xs rounded-[10px]">
              <i class="fa-solid fa-play text-[10px]"></i> Basic (3) <span class="opacity-60">→</span>
            </a>
            <a href="practice.html?topic=${encodeURIComponent(t.name)}&level=intermediate" class="inline-flex items-center justify-center gap-2 btn-ghost px-5 py-2.5 text-xs rounded-[10px] border border-line">
              <i class="fa-solid fa-layer-group text-[10px]"></i> Intermediate (3)
            </a>
            <a href="practice.html?topic=${encodeURIComponent(t.name)}&level=advanced" class="inline-flex items-center justify-center gap-2 btn-ghost px-5 py-2.5 text-xs rounded-[10px] border border-line">
              <i class="fa-solid fa-rocket text-[10px]"></i> Advanced (3)
            </a>
          </div>
        </div>
      </section>

      <nav class="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4" aria-label="Topic navigation">
        ${prevTopic ? `
          <button type="button" data-topic-btn="${escapeHtml(prevTopic.name)}" class="flex-1 sm:max-w-[48%] p-4 rounded-[14px] card hover:border-[var(--green)]/40 hover:-translate-y-0.5 transition flex items-center gap-3.5 text-left group">
            <span class="h-8 w-8 rounded-[10px] bg-[var(--soft)] group-hover:bg-[var(--green)] group-hover:text-white transition grid place-items-center text-muted text-xs shrink-0">
              <i class="fa-solid fa-arrow-left"></i>
            </span>
            <div class="min-w-0">
              <div class="text-[10px] uppercase tracking-wider font-mono text-muted font-semibold">Previous Topic</div>
              <div class="text-sm font-semibold text-ink truncate group-hover:text-[var(--green)] transition">${escapeHtml(prevTopic.name)}</div>
            </div>
          </button>
        ` : '<div class="hidden sm:block"></div>'}

        ${nextTopic ? `
          <button type="button" data-topic-btn="${escapeHtml(nextTopic.name)}" class="flex-1 sm:max-w-[48%] p-4 rounded-[14px] card hover:border-[var(--green)]/40 hover:-translate-y-0.5 transition flex items-center justify-between sm:justify-end gap-3.5 text-right sm:ml-auto group">
            <div class="min-w-0 text-left sm:text-right">
              <div class="text-[10px] uppercase tracking-wider font-mono text-muted font-semibold">Next Topic</div>
              <div class="text-sm font-semibold text-ink truncate group-hover:text-[var(--green)] transition">${escapeHtml(nextTopic.name)}</div>
            </div>
            <span class="h-8 w-8 rounded-[10px] bg-[var(--soft)] group-hover:bg-[var(--green)] group-hover:text-white transition grid place-items-center text-muted text-xs shrink-0">
              <i class="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        ` : '<div class="hidden sm:block"></div>'}
      </nav>
    `;
  }

  function renderNotes(topicName) {
    if (!contentEl) return;
    const t = topics.find(x => x.name === topicName) || topics[0];
    const topicIndex = topics.findIndex(x => x.name === t.name);
    const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : false;

    // If guest and topic is 3rd or beyond, display locked topic barrier
    if (!loggedIn && topicIndex >= 2) {
      contentEl.innerHTML = `
        <div class="w-full min-h-[500px] flex items-center justify-center p-4 sm:p-8">
          <div class="card max-w-lg w-full p-8 sm:p-10 text-center rounded-[24px] shadow-soft border border-amber-500/30 bg-amber-500/[0.03] relative animate-in fade-in zoom-in-95 duration-200">
            <div class="w-14 h-14 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 grid place-items-center text-2xl mx-auto mb-5 shadow-sm">
              <i class="fa-solid fa-lock"></i>
            </div>
            <div class="text-[11px] uppercase tracking-[.2em] text-amber-600 dark:text-amber-400 font-mono font-semibold">
              Member Topic
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-ink mt-2">
              ${escapeHtml(t.name)} is Locked
            </h2>
            <p class="text-sm text-muted mt-3 leading-relaxed max-w-md mx-auto">
              The first 2 topics (<b>${escapeHtml(topics[0].name)}</b> and <b>${escapeHtml(topics[1].name)}</b>) are completely free to read. Please log in or create a free account to unlock <b>${escapeHtml(t.name)}</b> and all 18 topics!
            </p>
            <div class="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="login.html" class="btn-primary py-3 px-6 text-xs font-semibold rounded-[10px] text-center shadow-sm">
                Log in to unlock
              </a>
              <a href="signup.html" class="btn-ghost py-3 px-6 text-xs font-semibold rounded-[10px] text-center border border-line">
                Create free account
              </a>
            </div>
            <div class="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs text-muted">
              <button type="button" data-unlocked-btn="${escapeHtml(topics[0].name)}" class="text-[var(--green)] hover:underline font-medium">← Read ${escapeHtml(topics[0].name)}</button>
              <button type="button" data-unlocked-btn="${escapeHtml(topics[1].name)}" class="text-[var(--green)] hover:underline font-medium">Read ${escapeHtml(topics[1].name)} →</button>
            </div>
          </div>
        </div>
      `;
      contentEl.querySelectorAll('[data-unlocked-btn]').forEach(b => {
        b.onclick = () => selectTopic(b.getAttribute('data-unlocked-btn'));
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const notes = (typeof topicNotes !== 'undefined' && topicNotes[t.name]) || null;
    const progress = topicProgress(t.name);

    if (!notes) {
      contentEl.innerHTML = `
        <div class="card p-8 rounded-[16px] border border-line">
          <div class="inline-flex items-center gap-2 text-[11px] uppercase tracking-[.18em] text-muted font-mono font-semibold">
            <i class="fa-solid fa-book text-[var(--green)]"></i> Documentation
          </div>
          <h2 class="text-2xl font-bold mt-2 text-ink">${escapeHtml(t.name)}</h2>
          <p class="text-sm text-muted mt-2 leading-relaxed">${escapeHtml(t.desc)}</p>
          <div class="mt-6">
            <a href="practice.html?topic=${encodeURIComponent(t.name)}" class="btn-primary px-5 py-2.5 text-xs rounded-[10px] inline-flex items-center gap-2">
              Practice this topic <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      `;
      return;
    }

    if (notes.markdown) {
      contentEl.innerHTML = renderMarkdownNotes(notes.markdown, t, progress);
      enhanceCodeBlocks(contentEl);

      contentEl.querySelectorAll('[data-topic-btn]').forEach(btn => {
        btn.addEventListener('click', () => {
          const selected = btn.getAttribute('data-topic-btn');
          const targetIndex = topics.findIndex(x => x.name === selected);
          if (!loggedIn && targetIndex >= 2) {
            if (typeof promptLoginModal === 'function') {
              promptLoginModal('Sign in or create a free account to unlock ' + selected + ' curriculum notes and all 18 topics!');
            }
            return;
          }
          selectTopic(selected);
        });
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (notes.customHtml) {
      contentEl.innerHTML = notes.customHtml;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  }

  function selectTopic(topicName) {
    activeTopicName = topicName;
    const url = new URL(location);
    url.searchParams.set('topic', topicName);
    history.pushState({}, '', url);
    renderSidebar();
    renderNotes(topicName);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderSidebar();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      renderSidebar();
    });
  }

  window.addEventListener('popstate', () => {
    const p = new URLSearchParams(location.search);
    const top = p.get('topic') || topics[0].name;
    activeTopicName = top;
    renderSidebar();
    renderNotes(top);
  });

  renderSidebar();
  renderNotes(activeTopicName);
}


