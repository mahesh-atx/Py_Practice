/* ==========================================================================
   PyPractice Profile Page — minimal editorial, local-first
   ========================================================================== */

function initProfilePage() {
  const root = document.getElementById('profilePage');
  if (!root) return;

  if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
    location.replace('login.html');
    return;
  }

  const avatarEl = document.getElementById('profileAvatar');
  const nameEl = document.getElementById('profileName');
  const bioEl = document.getElementById('profileBio');
  const sinceEl = document.getElementById('profileSince');
  const topicsDoneEl = document.getElementById('profileTopicsDone');

  const solvedEl = document.getElementById('profileSolved');
  const overallEl = document.getElementById('profileOverall');
  const streakEl = document.getElementById('profileStreak');
  const previewEl = document.getElementById('profileProgressPreview');

  const activityEl = document.getElementById('profileActivity');
  const noActivityEl = document.getElementById('profileNoActivity');
  const achievementsEl = document.getElementById('profileAchievements');

  const editBtn = document.getElementById('editProfileBtn');
  const formEl = document.getElementById('profileEditForm');
  const nameInput = document.getElementById('profileNameInput');
  const bioInput = document.getElementById('profileBioInput');
  const saveBtn = document.getElementById('saveProfileBtn');
  const cancelBtn = document.getElementById('cancelProfileBtn');
  const exportBtn = document.getElementById('exportBtn');

  function renderHeader() {
    const p = getProfile();
    const initials = profileInitials(p.name);
    if (avatarEl) avatarEl.textContent = initials;
    if (nameEl) nameEl.textContent = p.name || 'Learner';
    if (bioEl) bioEl.textContent = p.bio || 'Learning Python, one problem at a time.';
    if (sinceEl) sinceEl.textContent = 'Member since ' + memberSince();
    const started = topics.filter(t => topicProgress(t.name).done > 0).length;
    if (topicsDoneEl) topicsDoneEl.textContent = `${started} topics started`;
    if (nameInput) nameInput.value = p.name || '';
    if (bioInput) bioInput.value = p.bio || '';
  }

  function renderStats() {
    if (typeof syncAllStats === 'function') syncAllStats();
    else {
      const o = overall();
      const started = topics.filter(t => topicProgress(t.name).done > 0).length;
      const pctStr = o.pct + '%';
      if (solvedEl) solvedEl.textContent = o.done;
      if (overallEl) overallEl.textContent = pctStr;
      if (streakEl) streakEl.textContent = streak();
      if (previewEl) previewEl.textContent = `${started}/18 topics · ${pctStr} complete`;
      if (topicsDoneEl) topicsDoneEl.textContent = `${started} topics started`;
    }
  }

  function renderActivity() {
    if (!activityEl) return;
    const act = state.activity.slice(-7).reverse(); // last 7
    if (!act.length) {
      activityEl.classList.add('hidden');
      if (noActivityEl) noActivityEl.classList.remove('hidden');
      return;
    }
    if (noActivityEl) noActivityEl.classList.add('hidden');
    activityEl.classList.remove('hidden');
    activityEl.innerHTML = act.map(dateStr => {
      const d = new Date(dateStr);
      const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const isToday = dateStr === new Date().toISOString().slice(0, 10);
      return `
        <div class="flex items-center gap-3 py-3 px-3 border ${isToday ? 'border-[var(--green)] bg-[var(--green-soft)] dark:bg-[#79917a]/15' : 'border-line panel'} rounded-[12px] transition-colors">
          <span class="h-8 w-8 rounded-[10px] grid place-items-center text-xs shrink-0 ${isToday ? 'bg-[var(--green)] text-white' : 'bg-[var(--soft)] border border-line text-muted dark:bg-[#2a2826]'}"><i class="fa-solid ${isToday ? 'fa-fire' : 'fa-check'} text-[11px]"></i></span>
          <span class="text-sm flex-1 ${isToday ? 'font-semibold' : ''}">${escapeHtml(label)}</span>
          <span class="text-[11px] px-2 py-1 rounded-full border ${isToday ? 'bg-white border-[var(--green)]/20 text-[var(--green)] font-medium dark:bg-white/10' : 'bg-white border-line text-muted dark:bg-white/[0.06]'}">${isToday ? 'Today · streak' : 'Active'}</span>
        </div>
      `;
    }).join('');
    if (!act.includes(new Date().toISOString().slice(0, 10))) {
      activityEl.innerHTML += `<div class="text-xs text-muted py-3 text-center flex items-center justify-center gap-2"><i class="fa-regular fa-lightbulb text-amber-500"></i> Solve today to keep the streak.</div>`;
    }
  }

  function renderAchievements() {
    if (!achievementsEl) return;
    const o = overall();
    const s = streak();
    const done = o.done;
    const items = [
      { label: 'First solve', desc: 'Solve 1 question', ok: done >= 1, icon: 'fa-solid fa-star' },
      { label: '5 solves', desc: 'Solve 5', ok: done >= 5, icon: 'fa-solid fa-award' },
      { label: '10 solves', desc: 'Solve 10', ok: done >= 10, icon: 'fa-solid fa-trophy' },
      { label: '25 solves', desc: 'Solve 25', ok: done >= 25, icon: 'fa-solid fa-crown' },
      { label: 'Streak 3', desc: '3 days', ok: s >= 3, icon: 'fa-solid fa-fire' },
      { label: 'Streak 7', desc: '7 days', ok: s >= 7, icon: 'fa-solid fa-bolt' },
      { label: 'Halfway', desc: '50% done', ok: o.pct >= 50, icon: 'fa-solid fa-chart-simple' },
      { label: 'Complete', desc: '100% done', ok: o.pct === 100, icon: 'fa-solid fa-certificate' },
    ];
    achievementsEl.innerHTML = items.map(it => `
      <div class="card rounded-[12px] p-3 flex items-center gap-3 ${it.ok ? 'border-[var(--green)] bg-[var(--green-soft)]/50 dark:bg-[#79917a]/10' : 'border-line panel opacity-75'} transition-all hover:shadow-sm">
        <span class="h-9 w-9 rounded-xl grid place-items-center border text-sm shrink-0 ${it.ok ? 'bg-[var(--green)] border-[var(--green)] text-white shadow-sm dark:bg-[#79917a] dark:border-[#79917a]' : 'bg-[var(--soft)] border-line text-muted dark:bg-[#2a2826]'}"><i class="${it.icon} text-[13px]"></i></span>
        <div class="min-w-0 flex-1">
          <div class="text-xs font-semibold truncate ${it.ok ? 'text-ink' : 'text-muted'}">${escapeHtml(it.label)}</div>
          <div class="text-[11px] text-muted">${escapeHtml(it.desc)}</div>
        </div>
        ${it.ok ? '<span class="h-6 w-6 rounded-full bg-emerald-500 text-white grid place-items-center text-[10px] shadow-sm"><i class="fa-solid fa-check"></i></span>' : '<span class="h-6 w-6 rounded-full border border-line bg-white text-muted grid place-items-center text-[10px] dark:bg-white/[0.06]"><i class="fa-regular fa-circle text-[10px]"></i></span>'}
      </div>
    `).join('');
  }

  function renderTopics() {
    // Profile no longer shows full topic list — keep for compat if element exists
    const topicListEl = document.getElementById('profileTopicList');
    if (!topicListEl) return;
    const html = topics.slice(0, 3).map(t => {
      const tp = topicProgress(t.name);
      const isDone = tp.pct === 100;
      return `<a href="practice.html?topic=${encodeURIComponent(t.name)}&level=basic" class="flex items-center justify-between py-2 text-sm hover:text-ink"><span class="truncate">${escapeHtml(t.name)}</span><span class="text-xs text-muted font-mono">${tp.done}/${tp.total}</span></a>`;
    }).join('');
    topicListEl.innerHTML = html + `<a href="progress.html" class="block text-xs text-muted hover:text-ink underline underline-offset-4 mt-2">View full progress →</a>`;
  }

  // Edit flow
  let editing = false;
  function setEditing(v) {
    editing = v;
    if (formEl) formEl.classList.toggle('hidden', !v);
    if (editBtn) editBtn.textContent = v ? 'Close' : 'Edit profile';
  }
  if (editBtn) editBtn.addEventListener('click', () => setEditing(!editing));
  if (cancelBtn) cancelBtn.addEventListener('click', () => {
    renderHeader();
    setEditing(false);
  });
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const name = (nameInput?.value || '').trim() || 'Learner';
    const bio = (bioInput?.value || '').trim() || 'Learning Python, one problem at a time.';
    const cur = getProfile();
    saveProfile({ ...cur, name, bio });
    renderHeader();
    setEditing(false);
    toast('Profile saved.');
  });

  // Export (supports both desktop and mobile buttons)
  const exportBtns = [exportBtn, document.getElementById('exportBtnMobile')].filter(Boolean);
  exportBtns.forEach(btn => btn.addEventListener('click', () => {
    const data = {
      profile: getProfile(),
      progress: state.solved,
      activity: state.activity,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pypractice-progress.json';
    a.click();
    URL.revokeObjectURL(url);
    toast('Progress exported.');
  }));

  // Initial render
  renderHeader();
  renderStats();
  renderActivity();
  renderAchievements();
  renderTopics();
}
