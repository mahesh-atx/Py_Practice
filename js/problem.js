/* ==========================================================================
   PyPractice Problem Workspace: Monaco Editor, Test Cases & Run Pipeline
   FIXED v2 - correct IDs, payload, custom handling, robust mapping
   ========================================================================== */

let monacoEditorInstance = null;

/* --------------------------------------------------------------------------
   Mobile pane switcher (Problem | Code)

   Below the `lg` breakpoint the two-column locked workspace would squeeze
   the statement and the editor into a non-scrolling box, so CSS stacks them
   and shows one at a time. These buttons pick which one is mounted.
   -------------------------------------------------------------------------- */
const PANE_MOBILE_QUERY = '(max-width: 1023px)';

function relayoutEditor() {
  requestAnimationFrame(() => {
    try {
      if (monacoEditorInstance) monacoEditorInstance.layout();
    } catch (e) { /* editor not ready yet — automaticLayout will catch up */ }
    window.dispatchEvent(new Event('resize'));
  });
}

function setWorkspacePane(pane) {
  const workspace = document.getElementById('problemWorkspace');
  if (!workspace) return;

  const next = pane === 'code' ? 'code' : 'problem';
  workspace.setAttribute('data-pane', next);

  document.querySelectorAll('[data-pane-btn]').forEach(btn => {
    const isActive = btn.getAttribute('data-pane-btn') === next;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // Monaco measures 0x0 while its host is display:none, so it needs an
  // explicit re-measure the moment the editor is revealed.
  if (next === 'code') relayoutEditor();

  // On phones the pane replaces the other in place, so land at the top
  // rather than wherever the previous pane happened to be scrolled to.
  try {
    if (window.matchMedia(PANE_MOBILE_QUERY).matches) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  } catch (e) {}

  try { localStorage.setItem('pypractice-pane-v1', next); } catch (e) {}
}

function initWorkspacePaneSwitcher() {
  if (!document.getElementById('problemWorkspace')) return;

  let remembered = 'problem';
  try {
    const v = localStorage.getItem('pypractice-pane-v1');
    if (v === 'code' || v === 'problem') remembered = v;
  } catch (e) {}

  document.querySelectorAll('[data-pane-btn]').forEach(btn => {
    btn.addEventListener('click', () => setWorkspacePane(btn.getAttribute('data-pane-btn')));
  });

  setWorkspacePane(remembered);

  // Crossing back into the desktop range restores the side-by-side layout,
  // which renders both panes regardless of the attribute.
  const mq = window.matchMedia(PANE_MOBILE_QUERY);
  const onChange = (e) => { if (!e.matches) relayoutEditor(); };
  if (mq.addEventListener) mq.addEventListener('change', onChange);
  else if (mq.addListener) mq.addListener(onChange);
}

function initBottomTabs() {
  const tabTerminalBtn = document.getElementById('tabTerminalBtn');
  const tabTestCasesBtn = document.getElementById('tabTestCasesBtn');
  const contentTerminal = document.getElementById('tabContentTerminal');
  const contentTestCases = document.getElementById('tabContentTestCases');
  const contentCustomInput = document.getElementById('tabContentCustomInput');
  const customInputToggle = document.getElementById('customInputToggle');
  const clearTerminalBtn = document.getElementById('clearTerminalBtn');

  if (!tabTerminalBtn || !tabTestCasesBtn) return;

  function updateViews() {
    const isTerminal = tabTerminalBtn.classList.contains('active');
    if (isTerminal) {
      contentTerminal?.classList.remove('hidden');
      contentTestCases?.classList.add('hidden');
      contentCustomInput?.classList.add('hidden');
      if (clearTerminalBtn) clearTerminalBtn.classList.remove('hidden');
    } else {
      contentTerminal?.classList.add('hidden');
      if (clearTerminalBtn) clearTerminalBtn.classList.add('hidden');
      if (customInputToggle && customInputToggle.checked) {
        contentCustomInput?.classList.remove('hidden');
        contentTestCases?.classList.add('hidden');
      } else {
        contentTestCases?.classList.remove('hidden');
        contentCustomInput?.classList.add('hidden');
      }
    }
  }

  function setTab(tab) {
    const activeCls = 'bottom-tab active h-full px-2.5 text-[11px] font-medium tracking-wide inline-flex items-center gap-1.5 border-b-2 border-white text-white font-mono transition';
    const idleCls = 'bottom-tab h-full px-2.5 text-[11px] font-medium tracking-wide inline-flex items-center gap-1.5 border-b-2 border-transparent text-white/35 hover:text-white/60 font-mono transition';
    if (tab === 'terminal') {
      tabTerminalBtn.className = activeCls;
      tabTestCasesBtn.className = idleCls;
    } else {
      tabTestCasesBtn.className = activeCls;
      tabTerminalBtn.className = idleCls;
    }
    updateViews();
  }

  tabTerminalBtn.addEventListener('click', () => setTab('terminal'));
  tabTestCasesBtn.addEventListener('click', () => setTab('testcases'));
  customInputToggle?.addEventListener('change', () => {
    setTab('testcases');
  });
  clearTerminalBtn?.addEventListener('click', () => initTerminal());
}

function initMonaco(containerEl, initialCode, onChange) {
  const loadingEl = document.getElementById('monacoLoading');
  const textareaEl = document.getElementById('codeEditor');

  function showTextareaFallback() {
    if (loadingEl) loadingEl.style.display = 'none';
    if (textareaEl) {
      textareaEl.classList.remove('hidden');
      textareaEl.style.display = 'block';
      textareaEl.style.position = 'absolute';
      textareaEl.style.inset = '0';
      textareaEl.style.width = '100%';
      textareaEl.style.height = '100%';
      textareaEl.style.zIndex = '5';
      textareaEl.value = initialCode;
      // ensure textarea fills container when Monaco not available
      textareaEl.addEventListener('input', () => {
        if (onChange) onChange(textareaEl.value);
      });
    }
    if (containerEl) {
      // hide loading but keep container for textarea overlay if needed
      containerEl.style.background = '#211f1e';
    }
  }

  if (!containerEl) {
    showTextareaFallback();
    return;
  }

  if (typeof window.require !== 'undefined') {
    try {
      window.require.config({
        paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }
      });

      let fallbackTimer = setTimeout(() => {
        if (!monacoEditorInstance) {
          console.warn('Monaco load timeout — falling back to textarea');
          showTextareaFallback();
        }
      }, 4000);

      // handle require load errors
      if (window.require.onError) {
        const prevOnError = window.require.onError;
        window.require.onError = function (err) {
          clearTimeout(fallbackTimer);
          console.warn('Monaco require error, fallback to textarea', err);
          showTextareaFallback();
          if (typeof prevOnError === 'function') try { prevOnError(err); } catch {}
        };
      }

      window.require(['vs/editor/editor.main'], function (monaco) {
        clearTimeout(fallbackTimer);
        try {
          if (loadingEl) loadingEl.style.display = 'none';

          monaco.editor.defineTheme('pypractice-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: 'keyword', foreground: '9EAED4', fontStyle: 'bold' },
              { token: 'string', foreground: 'D5B07D' },
              { token: 'number', foreground: '9BB79D' },
              { token: 'comment', foreground: '77716A', fontStyle: 'italic' },
              { token: 'identifier', foreground: 'F4EFE6' },
              { token: 'type', foreground: '9BB79D' },
              { token: 'delimiter', foreground: 'D8D1C5' }
            ],
            colors: {
              'editor.background': '#211f1e',
              'editor.foreground': '#f4efe6',
              'editorLineNumber.foreground': '#6f6b65',
              'editorLineNumber.activeForeground': '#f4efe6',
              'editor.selectionBackground': '#3a3835',
              'editor.inactiveSelectionBackground': '#2b2927',
              'editorCursor.foreground': '#f4efe6',
              'editorIndentGuide.background': '#2d2b29',
              'editorIndentGuide.activeBackground': '#4c4842',
              'editorGutter.background': '#211f1e'
            }
          });

          monacoEditorInstance = monaco.editor.create(containerEl, {
            value: initialCode,
            language: 'python',
            theme: 'pypractice-dark',
            fontSize: 13,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
            tabSize: 4,
            insertSpaces: true,
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            overviewRulerLanes: 0,
            renderLineHighlight: 'line',
            scrollbar: {
              verticalScrollbarSize: 7,
              horizontalScrollbarSize: 7
            },
            padding: { top: 12, bottom: 12 }
          });

          monacoEditorInstance.onDidChangeModelContent(() => {
            const val = monacoEditorInstance.getValue();
            if (textareaEl) textareaEl.value = val;
            if (onChange) onChange(val);
          });

          monacoEditorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            document.getElementById('runBtn')?.click();
          });
          monacoEditorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
            document.getElementById('submitBtn')?.click();
          });

          window.addEventListener('resize', () => {
            if (monacoEditorInstance) monacoEditorInstance.layout();
          });
          // ensure visible
          if (textareaEl) textareaEl.classList.add('hidden');
        } catch (e) {
          console.error('Monaco init error, fallback', e);
          showTextareaFallback();
        }
      }, function (err) {
        clearTimeout(fallbackTimer);
        console.warn('Monaco load failed', err);
        showTextareaFallback();
      });
    } catch (e) {
      console.warn('Monaco setup error, fallback', e);
      showTextareaFallback();
    }
  } else {
    showTextareaFallback();
  }
}

function getEditorCode() {
  if (monacoEditorInstance) {
    return monacoEditorInstance.getValue();
  }
  const textarea = document.getElementById('codeEditor');
  return textarea ? textarea.value : '';
}

function setEditorCode(val) {
  if (monacoEditorInstance) {
    monacoEditorInstance.setValue(val);
  }
  const textarea = document.getElementById('codeEditor');
  if (textarea) textarea.value = val;
}

function markSolved(q) {
  state.solved[q.id] = Date.now();
  recordActivity();
  rememberQuestion(q);
  save();
}

function initProblemPage() {
  const root = document.getElementById('problemPage');
  if (!root) return;

  initTerminal();
  initBottomTabs();
  initWorkspacePaneSwitcher();

  const params = new URLSearchParams(location.search);
  const topic = params.get('topic') || topics[0].name;
  const level = params.get('level') || 'basic';
  const index = Math.max(0, Number(params.get('q') || 0));

  const qs = questionsFor(topic, level);
  const q = qs[index] || qs[0];
  if (!q) return;

  const topicIndex = topics.findIndex(t => t.name === q.topic);
  const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : false;
  if (!loggedIn && topicIndex >= 2) {
    location.replace(`practice.html?topic=${encodeURIComponent(q.topic)}&level=${q.level}`);
    return;
  }

  rememberQuestion(q);

  const topicEl = document.getElementById('problemTopic');
  if (topicEl) topicEl.textContent = q.topic;
  const lvlEl = document.getElementById('problemLevel');
  if (lvlEl) lvlEl.innerHTML = `<i class="fa-solid fa-layer-group text-[10px] opacity-60"></i> ${escapeHtml(levelMeta[q.level].label)}`;
  // Highlight keywords — single primary accent, no background
  function highlightDesc(text) {
    const esc = escapeHtml(text);
    const keywords = ['if','elif','else','for','while','def','return','import','class','try','except','finally','with','as','in','is','and','or','not','from','True','False','None','break','continue','pass','lambda','yield','raise','assert','print','input','range','len','type','int','float','str','bool','list','tuple','set','dict','open','append','extend','pop','sort','sorted','map','filter','sum','min','max','abs','round','enumerate','zip','Python','variable','Variable','String','string','List','Tuple','Set','Dictionary','Function','Loop','Conditional','File','Module','Class','Exception'];
    const sorted = [...keywords].sort((a,b)=>b.length-a.length);
    const re = new RegExp('\\b(' + sorted.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|') + ')\\b','g');
    return esc.replace(re, m => `<span class="kw-primary">${m}</span>`);
  }
  const titleEl = document.getElementById('problemTitle');
  if (titleEl) {
    // The actual question number is part of the heading now (the separate
    // "# Question N" line was removed) so it always matches this problem.
    // Primary accent colour, same font size as the question title.
    titleEl.innerHTML =
      `<span class="green-text shrink-0">Q${q.number}</span>` +
      `<span>${escapeHtml(q.title)}</span>`;
  }
  const descEl = document.getElementById('problemDesc');
  if (descEl) descEl.innerHTML = `<span class="kw-prompt">>_</span> ` + highlightDesc(q.description);
  // Only show the Input block when the question actually has input
  const exInEl = document.getElementById('exampleInput');
  const exInCell = document.getElementById('exampleInputCell');
  const exGrid = document.getElementById('sampleIogrid');
  const hasSampleInput = !!q.input;
  if (exInCell) exInCell.classList.toggle('hidden', !hasSampleInput);
  if (exGrid) exGrid.classList.toggle('sm:grid-cols-2', hasSampleInput);
  if (exInEl) exInEl.textContent = hasSampleInput ? q.input.replace(/\\n/g, '\n') : '';
  const exOutEl = document.getElementById('exampleOutput');
  if (exOutEl) exOutEl.textContent = q.output ? q.output.replace(/\\n/g, '\n') : '(empty)';

  const codeKey = 'code:' + q.id;
  const initialCode = localStorage.getItem(codeKey) || defaultCode(q.topic);

  const explanation = document.getElementById('explanationPanel');
  const editorContainer = document.getElementById('monacoEditor');
  const testTabBadge = document.getElementById('testTabBadge');

  // Previous / Next navigation (bottom) — replaces manual complete button
  const prevBtn = document.getElementById('prevQuestionBtn');
  const nextBtn = document.getElementById('nextQuestionBtn');
  if (prevBtn) {
    if (index > 0) {
      prevBtn.href = `problem.html?topic=${encodeURIComponent(q.topic)}&level=${q.level}&q=${index - 1}`;
      prevBtn.classList.remove('opacity-50','pointer-events-none');
    } else {
      prevBtn.classList.add('opacity-50','pointer-events-none');
      prevBtn.removeAttribute('href');
    }
  }
  if (nextBtn) {
    if (index + 1 < qs.length) {
      nextBtn.href = `problem.html?topic=${encodeURIComponent(q.topic)}&level=${q.level}&q=${index + 1}`;
      nextBtn.classList.remove('opacity-50','pointer-events-none');
    } else {
      nextBtn.href = `practice.html?topic=${encodeURIComponent(q.topic)}&level=${q.level}`;
      nextBtn.innerHTML = `Back to list <i class="fa-solid fa-list text-[11px]"></i>`;
    }
  }

  const backPracticeEl = document.querySelector('[data-back-practice]');
  if (backPracticeEl) backPracticeEl.href = `practice.html?topic=${encodeURIComponent(q.topic)}&level=${q.level}`;

  // Breadcrumb — the level crumb reflects the ACTUAL level of this question,
  // so an Intermediate/Advanced question no longer looks like a "Basic" one.
  // Topic and title are fitted at word boundaries ("…after the word").
  const bcTopic = document.getElementById('problemBreadcrumbTopic');
  if (bcTopic) {
    bcTopic.href = `practice.html?topic=${encodeURIComponent(q.topic)}&level=basic`;
    fitBreadcrumbText(bcTopic, q.topic);
  }
  const bcLevel = document.getElementById('problemBreadcrumbLevel');
  if (bcLevel) {
    bcLevel.textContent = levelMeta[q.level].label;
    bcLevel.href = `practice.html?topic=${encodeURIComponent(q.topic)}&level=${q.level}`;
  }
  const bcTitle = document.getElementById('problemBreadcrumbTitle');
  if (bcTitle) fitBreadcrumbText(bcTitle, q.title);
  // Re-fit word ellipses when the pane width changes
  window.addEventListener('resize', () => {
    if (bcTopic) fitBreadcrumbText(bcTopic, q.topic);
    if (bcTitle) fitBreadcrumbText(bcTitle, q.title);
  });

  initMonaco(editorContainer, initialCode, (newCode) => {
    localStorage.setItem(codeKey, newCode);
    const editorState = document.getElementById('editorState');
    if (editorState) editorState.textContent = 'Editing';
    rememberQuestion(q);
  });

  document.getElementById('resetBtn')?.addEventListener('click', () => {
    const freshCode = defaultCode(q.topic);
    setEditorCode(freshCode);
    localStorage.setItem(codeKey, freshCode);
    const editorState = document.getElementById('editorState');
    if (editorState) editorState.textContent = 'Reset';
    document.getElementById('resultPanel')?.classList.add('hidden');
    if (explanation) explanation.classList.add('hidden');
    clearTimeout(window.__hintTimer);
    if (testTabBadge) testTabBadge.classList.add('hidden');
    // Clear custom output if present
    const customOut = document.getElementById('customOutputPanel');
    if (customOut) { customOut.classList.add('hidden'); customOut.innerHTML = ''; }
    // Reset test results
    testCaseResults = {};
    renderTestCasePills();
    renderActiveCaseDetail();
    appendTerminal(`Reset code to template: ${q.topic}`, 'system');
    toast('Starter code restored.');
  });

  let activeCaseIdx = 0;
  let testCaseResults = {};

  function renderTestCasePills() {
    const tabsContainer = document.getElementById('testCaseTabsContainer');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = q.testCases.map((tc, idx) => {
      const isSelected = idx === activeCaseIdx;
      const res = testCaseResults[idx];
      let dot = '';
      if (res) {
        dot = res.passed
          ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>'
          : '<span class="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>';
      } else {
        dot = '<span class="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>';
      }
      return `
        <button
          data-case-tab="${idx}"
          class="case-pill sm:w-full w-auto shrink-0 text-left flex items-center justify-between gap-2 px-2.5 py-2 rounded-md text-[11px] font-mono leading-none border transition cursor-pointer select-none ${
            isSelected
              ? 'bg-white text-[#1a1918] border-white font-medium shadow-sm'
              : 'bg-white/[.02] text-white/45 border-white/[.07] hover:bg-white/[.06] hover:text-white/80 hover:border-white/12'
          }"
        >
          <span class="inline-flex items-center gap-2 min-w-0"><span class="shrink-0">${dot}</span><span class="truncate">${escapeHtml(tc.label || `Case ${idx + 1}`)}</span></span>
          ${isSelected ? '<span class="w-1 h-1 rounded-full bg-[#1a1918]/30 shrink-0 hidden sm:block"></span>' : ''}
        </button>`;
    }).join('');

    tabsContainer.querySelectorAll('[data-case-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCaseIdx = parseInt(btn.dataset.caseTab, 10);
        renderTestCasePills();
        renderActiveCaseDetail();
      });
    });
  }

  function renderActiveCaseDetail() {
    const detailContainer = document.getElementById('selectedTestCaseDetail');
    if (!detailContainer) return;
    const tc = q.testCases[activeCaseIdx];
    if (!tc) return;
    const res = testCaseResults[activeCaseIdx];
    const rawInput = tc.input ?? '';
    const decodedInput = rawInput.replace(/\\n/g, '\n');
    const hasInput = decodedInput.trim() !== '';
    const inputVal = decodedInput;
    const expectedVal = tc.output ? tc.output.replace(/\\n/g, '\n') : '—';
    const actualVal = res ? (res.actual ?? res.stdout ?? '(no output)') : null;
    const hasStderr = res && res.stderr && String(res.stderr).trim();

    detailContainer.innerHTML = `
      ${hasInput ? `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div class="space-y-1.5">
          <div class="text-[10px] tracking-[.12em] uppercase text-white/30 font-mono">Input</div>
          <pre class="m-0 p-2.5 rounded-md bg-[#1e1c1b] border border-white/[.07] text-[12px] leading-5 text-white/75 whitespace-pre-wrap break-words font-mono min-h-[44px] select-text">${escapeHtml(inputVal)}</pre>
        </div>
        <div class="space-y-1.5">
          <div class="text-[10px] tracking-[.12em] uppercase text-white/30 font-mono">Expected output</div>
          <pre class="m-0 p-2.5 rounded-md bg-[#1e1c1b] border border-white/[.07] text-[12px] leading-5 text-white/75 whitespace-pre-wrap break-words font-mono min-h-[44px] select-text">${escapeHtml(expectedVal)}</pre>
        </div>
      </div>
      ` : `
      <div class="space-y-1.5">
        <div class="text-[10px] tracking-[.12em] uppercase text-white/30 font-mono">Expected output</div>
        <pre class="m-0 p-2.5 rounded-md bg-[#1e1c1b] border border-white/[.07] text-[12px] leading-5 text-white/75 whitespace-pre-wrap break-words font-mono min-h-[44px] select-text">${escapeHtml(expectedVal)}</pre>
      </div>
      `}
      ${res ? `
        <div class="mt-3 pt-3 border-t border-white/[.06] space-y-1.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[10px] tracking-[.12em] uppercase font-mono ${res.passed ? 'text-emerald-300/90' : 'text-red-300/90'}">Your output</span>
            <span class="text-[10px] font-mono ${res.passed ? 'text-emerald-300/60' : 'text-red-300/60'}">${res.passed ? 'Passed' : 'Failed'} · ${res.elapsed ?? 0}ms</span>
          </div>
          <pre class="m-0 p-2.5 rounded-md border-l-2 bg-[#1e1c1b] whitespace-pre-wrap break-words font-mono text-[12px] leading-5 min-h-[44px] select-text ${res.passed ? 'border-emerald-500/50 text-emerald-200/90 border-y border-r border-white/[.07]' : 'border-red-400/60 text-red-200/90 border-y border-r border-white/[.07]'}">${escapeHtml(actualVal)}</pre>
          ${hasStderr ? `<pre class="m-0 mt-2 p-2.5 rounded-md bg-amber-950/15 border border-amber-500/15 text-amber-200/80 whitespace-pre-wrap break-words font-mono text-[11px] leading-5 select-text">${escapeHtml(res.stderr)}</pre>` : ''}
        </div>
      ` : `
        <div class="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-white/25">
          <span class="w-1 h-1 rounded-full bg-white/20 shrink-0"></span>
          Run to see output
        </div>
      `}
    `;
  }

  renderTestCasePills();
  renderActiveCaseDetail();

  // Helper to show explanation safely — now as fixed toast so it never pushes the image/banner
  function showExplanation() {
    if (!explanation) return;
    const hintText = explanationFor(q);
    explanation.classList.remove('hidden');
    explanation.innerHTML = `<div class="text-sm leading-6">${escapeHtml(hintText)}</div>`;
    const explText = document.getElementById('explanationText');
    if (explText) explText.textContent = hintText;
    // auto-hide after longer than normal toast (2600) so hint stays ~5s like a toast
    clearTimeout(window.__hintTimer);
    window.__hintTimer = setTimeout(() => {
      explanation.classList.add('hidden');
    }, 5000);
  }

  async function runCode(mode = 'sample') {
    const code = getEditorCode();
    const runBtn = document.getElementById('runBtn');
    const submitBtn = document.getElementById('submitBtn');
    const testSummary = document.getElementById('testSummary');
    const editorState = document.getElementById('editorState');
    const resultPanel = document.getElementById('resultPanel');
    const customInputToggle = document.getElementById('customInputToggle');
    const customInputEl = document.getElementById('customInputText');
    const customOutputPanel = document.getElementById('customOutputPanel');
    if (runBtn) { runBtn.disabled = true; runBtn.style.opacity = '0.6'; }
    if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '0.6'; }
    // Transient run feedback goes to the toast — the toolbar keeps the
    // persistent Python state (loading / ready / error) untouched.
    toast(mode === 'submit' ? 'Running all test cases…' : 'Running sample…');
    if (testSummary) testSummary.textContent = 'Executing…';
    if (editorState) editorState.textContent = 'Running';

    const isCustom = customInputToggle && customInputToggle.checked && mode === 'sample';
    const isSubmit = mode === 'submit';

    if (isCustom) {
      appendTerminal(`Executing with custom input…`, 'cmd');
    } else {
      appendTerminal(`Executing ${mode === 'submit' ? 'full test suite' : 'sample'}…`, 'cmd');
    }

    try {
      let casesToRun = [];

      if (isCustom) {
        const customVal = customInputEl ? customInputEl.value : '';
        casesToRun = [{
          label: 'Custom Input',
          input: customVal,
          output: '',
          expected: ''
        }];
      } else if (isSubmit) {
        casesToRun = q.testCases;
      } else {
        casesToRun = [q.testCases[0]];
      }

      const startTime = performance.now();

      // Use canonical type and field names for robustness
      const res = await executePythonAsync({
        type: 'run-batch',
        code,
        testCases: casesToRun
      });

      const totalElapsed = Math.round(performance.now() - startTime);

      // Handle custom input separately - show raw output, don't grade
      if (isCustom) {
        const r = res.results && res.results[0];
        if (!r) throw new Error('No result returned');
        const stdout = r.stdout ?? r.actual ?? '';
        const stderr = r.stderr ?? '';
        const hasError = !!(stderr && String(stderr).trim());

        // Update testCaseResults for badge but mark custom as not graded
        testCaseResults[0] = {
          passed: !hasError,
          actual: stdout,
          expected: '',
          elapsed: r.elapsed ?? totalElapsed,
          stderr: stderr,
          isCustom: true
        };

        renderTestCasePills();
        renderActiveCaseDetail();

        // Show custom output panel — minimal
        if (customOutputPanel) {
          customOutputPanel.classList.remove('hidden');
          if (hasError) {
            customOutputPanel.innerHTML = `<pre class="m-0 p-2.5 rounded-md bg-red-950/15 border border-red-500/20 text-red-300/90 font-mono text-[11px] leading-5 whitespace-pre-wrap break-words">${escapeHtml(stderr)}</pre>`;
          } else {
            customOutputPanel.innerHTML = `<div class="space-y-1.5"><div class="text-[10px] tracking-[.12em] uppercase text-white/30 font-mono">Output</div><pre class="m-0 p-2.5 rounded-md bg-[#1e1c1b] border border-white/[.07] text-white/75 font-mono text-[12px] leading-5 whitespace-pre-wrap break-words min-h-[44px]">${escapeHtml(stdout || '—')}</pre><div class="text-[10px] font-mono text-white/25">${r.elapsed ?? totalElapsed}ms</div></div>`;
          }
        }

        if (stdout) appendTerminal(stdout, 'stdout');
        if (stderr) appendTerminal(stderr, 'stderr');
        appendTerminal(`[Exit code ${hasError ? '1' : '0'}, ${r.elapsed ?? totalElapsed}ms]`, 'system');

        if (resultPanel) {
          resultPanel.classList.remove('hidden');
          if (hasError) {
            resultPanel.innerHTML = `
              <div class="pop-in bg-[#1f1110] border-y border-red-500/30 px-4 py-2 flex items-center justify-between font-mono">
                <div class="flex items-center gap-2 text-red-400 text-xs font-semibold">
                  <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  <span>Custom run failed — see output.</span>
                </div>
              </div>
            `;
          } else {
            resultPanel.innerHTML = `
              <div class="pop-in bg-[#050f06] border-y border-[#1a381c] px-4 py-2 flex items-center justify-between font-mono shadow-sm">
                <div class="flex items-center gap-2.5">
                  <svg class="text-[#7CB342] w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span class="text-[#7CB342] font-medium text-xs tracking-wide">Custom input executed.</span>
                </div>
                <span class="text-white/40 text-[11px]">${r.elapsed ?? totalElapsed}ms</span>
              </div>
            `;
          }
        }
        if (testSummary) testSummary.textContent = hasError ? 'Error' : 'Custom done';
        if (editorState) editorState.textContent = hasError ? 'Error' : 'Done';
        showExplanation();
        return;
      }

      // Run (sample) — no grading, terminal only
      if (!isSubmit) {
        const r = res.results && res.results[0];
        if (!r) throw new Error('No result returned');
        const stdout = r.stdout ?? r.actual ?? '';
        const stderr = r.stderr ?? '';
        const hasError = !!(stderr && String(stderr).trim());

        if (stdout) appendTerminal(stdout, 'stdout');
        if (stderr) appendTerminal(stderr, 'stderr');
        appendTerminal(`[Exit code ${hasError ? '1' : '0'}, ${r.elapsed ?? totalElapsed}ms]`, 'system');

        if (testSummary) testSummary.textContent = hasError ? 'Error' : 'Executed';
        if (editorState) editorState.textContent = hasError ? 'Error' : 'Done';

        // Show output in Console — switch to terminal tab
        document.getElementById('tabTerminalBtn')?.click();

        if (resultPanel) {
          resultPanel.classList.remove('hidden');
          if (hasError) {
            resultPanel.innerHTML = `
              <div class="pop-in bg-[#1f1110] border-y border-red-500/30 px-4 py-2 flex items-center gap-2 font-mono">
                <svg class="w-3.5 h-3.5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span class="text-red-400 text-[11px] font-medium">Run failed — see Console.</span>
              </div>`;
          } else {
            resultPanel.innerHTML = `
              <div class="pop-in bg-[#171615] border-y border-white/[.06] px-3 py-2 flex items-center gap-2 font-mono">
                <span class="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></span>
                <span class="text-white/50 text-[11px]">Run completed — output in Console.</span>
                <span class="ml-auto text-white/20 text-[10px]">${r.elapsed ?? totalElapsed}ms</span>
              </div>`;
          }
        }
        return;
      }

      // Submit — grade against all test cases
      let allPassed = true;
      const results = res.results || [];
      results.forEach((r, idx) => {
        const actual = r.actual ?? r.stdout ?? '';
        const expected = r.expected ?? r.output ?? (casesToRun[idx] ? casesToRun[idx].output : '');
        let passed = r.passed;
        if (typeof passed === 'undefined') {
          const normActual = typeof normalizeOutput === 'function' ? normalizeOutput(actual) : String(actual).trim();
          const normExpected = typeof normalizeOutput === 'function' ? normalizeOutput(expected) : String(expected).trim();
          passed = normActual === normExpected && !(r.stderr && String(r.stderr).trim());
        }
        if (!passed) allPassed = false;

        testCaseResults[idx] = {
          passed,
          actual,
          expected,
          elapsed: r.elapsed ?? 0,
          stderr: r.stderr ?? ''
        };

        if (r.stdout ?? actual) appendTerminal(r.stdout ?? actual, 'stdout');
        if (r.stderr) appendTerminal(r.stderr, 'stderr');
      });

      activeCaseIdx = 0;
      renderTestCasePills();
      renderActiveCaseDetail();

      if (testTabBadge) {
        const correctPassed = Object.values(testCaseResults).filter(v => v.passed).length;
        const total = q.testCases.length;
        testTabBadge.classList.remove('hidden');
        testTabBadge.textContent = `· ${correctPassed}/${total}`;
        testTabBadge.className = `text-[10px] font-mono font-normal ${allPassed ? 'text-white/45' : 'text-red-300/70'}`;
      }

      appendTerminal(`[Exit code ${allPassed ? '0' : '1'}, ${totalElapsed}ms]`, 'system');

      if (resultPanel) resultPanel.classList.remove('hidden');

      if (allPassed) {
          if (testSummary) testSummary.textContent = `${results.length}/${results.length} passed`;
          if (editorState) editorState.textContent = 'Accepted';
          appendTerminal(`[All ${results.length} test cases passed in ${totalElapsed}ms]`, 'stdout');
          
          const wasAlreadySolved = state.solved[q.id] ? true : false;
          
          markSolved(q);
          renderHeaderProgress();

          const hasNextQuestion = index + 1 < qs.length;
          const nextQuestion = hasNextQuestion ? qs[index + 1] : null;

          if (resultPanel) resultPanel.innerHTML = `
            <div class="pop-in bg-[#051108] border-y border-[#1a381c] px-4 py-2 flex items-center justify-between font-mono shadow-sm">
              <div class="flex items-center gap-2.5">
                <svg class="text-[#7CB342] w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <div>
                  <span class="text-[#7CB342] font-bold text-xs tracking-wide">Accepted · All ${results.length} Test Cases Passed!</span>
                  ${wasAlreadySolved ? '<span class="text-white/40 text-[11px] ml-2">(Already completed)</span>' : '<span class="text-emerald-400 text-[11px] ml-2">(+1 Solved!)</span>'}
                </div>
              </div>
              <div class="flex items-center gap-2">
                ${hasNextQuestion ? `
                  <a href="${questionUrl(nextQuestion)}" class="bg-[#7CB342] hover:bg-[#689F38] text-[#0A0F0A] font-bold font-mono text-xs px-4 py-1.5 rounded-[2px] transition-colors inline-flex items-center gap-1">
                    <span>Next Question</span>
                    <span>→</span>
                  </a>
                ` : `
                  <a href="practice.html?topic=${encodeURIComponent(q.topic)}&level=${q.level}" class="bg-[#7CB342] hover:bg-[#689F38] text-[#0A0F0A] font-bold font-mono text-xs px-4 py-1.5 rounded-[2px] transition-colors inline-flex items-center gap-1">
                    <span>Back to Topics</span>
                    <span>✓</span>
                  </a>
                `}
              </div>
            </div>
          `;
          toast('Question solved and progress saved!');
        } else {
          const failedCount = results.length - Object.values(testCaseResults).filter(v => v.passed).length;
          if (testSummary) testSummary.textContent = `${results.length - failedCount}/${results.length} passed`;
          if (editorState) editorState.textContent = 'Wrong Answer';
          
          if (resultPanel) resultPanel.innerHTML = `
            <div class="pop-in bg-[#1f1110] border-y border-red-500/30 px-4 py-2 flex items-center justify-between font-mono">
              <div class="flex items-center gap-2 text-red-400 text-xs font-semibold">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                <span>Wrong Answer · Failed ${failedCount} of ${results.length} test cases.</span>
              </div>
              <span class="text-white/40 text-[11px]">Inspect failed test cases below.</span>
            </div>
          `;
        }

      showExplanation();

    } catch (err) {
      console.error('Execution error:', err);
      const testSummary = document.getElementById('testSummary');
      const editorState = document.getElementById('editorState');
      if (testSummary) testSummary.textContent = 'Error';
      if (editorState) editorState.textContent = 'Error';
      appendTerminal(err.message || 'Execution error occurred.', 'stderr');
      const customOutputPanel = document.getElementById('customOutputPanel');
      if (customOutputPanel && document.getElementById('customInputToggle')?.checked) {
        customOutputPanel.classList.remove('hidden');
        customOutputPanel.innerHTML = `<pre class="m-0 p-2.5 rounded-md bg-red-950/15 border border-red-500/20 text-red-300/90 font-mono text-[11px] leading-5 whitespace-pre-wrap break-words">${escapeHtml(err.message || String(err))}</pre>`;
      }
      toast('Execution error.');
    } finally {
      if (runBtn) { runBtn.disabled = false; runBtn.style.opacity = ''; }
      if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = ''; }
    }
  }

  document.getElementById('runBtn')?.addEventListener('click', () => runCode('sample'));
  document.getElementById('submitBtn')?.addEventListener('click', () => runCode('submit'));

  createPyWorker();
}

// Export helpers for Node tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initProblemPage, markSolved };
}
