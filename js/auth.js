// Shared Firebase Auth UI & State Sync Helper
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

function syncFirebaseSession(user) {
  if (user) {
    const existingRaw = localStorage.getItem('pypractice-auth-v1');
    let existing = null;
    try { existing = JSON.parse(existingRaw || 'null'); } catch {}

    const name = user.displayName || (existing && existing.name) || user.email?.split('@')[0] || 'Learner';
    const authData = {
      uid: user.uid,
      name: name,
      email: user.email,
      photoURL: user.photoURL || '',
      provider: user.providerData?.[0]?.providerId || 'google',
      loggedInAt: existing?.loggedInAt || new Date().toISOString(),
      remember: true
    };
    localStorage.setItem('pypractice-auth-v1', JSON.stringify(authData));

    // Also ensure profile store has matching name
    try {
      const pRaw = localStorage.getItem('pypractice-profile-v1');
      let p = null;
      try { p = JSON.parse(pRaw || 'null'); } catch {}
      if (!p || !p.name || p.name === 'Learner') {
        localStorage.setItem('pypractice-profile-v1', JSON.stringify({
          name: name,
          bio: p?.bio || 'Learning Python, one problem at a time.',
          createdAt: p?.createdAt || new Date().toISOString()
        }));
      }
    } catch {}
  }

  // Always update DOM with active session
  if (typeof syncAuthUI === 'function') {
    syncAuthUI();
  }

  if (typeof renderHeaderProgress === 'function') {
    renderHeaderProgress();
  }

  // If on practice topics page (topics.html), refresh the topic cards so they unlock immediately
  if (typeof renderPracticeTopics === 'function') {
    renderPracticeTopics();
  }

  // If on learn page (learn.html), re-trigger initialization to unlock sidebar and notes
  if (document.getElementById('learnPage')) {
    if (typeof initLearnPage === 'function') {
      try { initLearnPage(); } catch {}
    }
  }

  // If on profile page and user just logged in
  if (document.getElementById('profileNameInput') && typeof syncProfileUI === 'function') {
    try { syncProfileUI(); } catch {}
  }
}

if (auth) {
  onAuthStateChanged(auth, (user) => {
    syncFirebaseSession(user);
  });

  // Global logout listener for Firebase
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-logout-btn]');
    if (!btn) return;
    e.preventDefault();
    try {
      await signOut(auth);
    } catch {}
    localStorage.removeItem('pypractice-auth-v1');
    if (typeof toast === 'function') toast('Signed out');
    setTimeout(() => location.href = 'index.html', 300);
  });
} else {
  // If Firebase not configured or offline, sync with whatever is in localStorage
  if (typeof syncAuthUI === 'function') syncAuthUI();
  if (typeof renderHeaderProgress === 'function') renderHeaderProgress();
}

export { auth };
