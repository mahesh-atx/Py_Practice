// Shared Firebase Auth + Firestore Sync — replaces localStorage as source of truth per user
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

let firestoreUnsub = null;
let isLoadingFromCloud = false;

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
  if (typeof syncAuthUI === 'function') syncAuthUI();
  if (typeof renderHeaderProgress === 'function') renderHeaderProgress();
  if (typeof renderPracticeTopics === 'function') renderPracticeTopics();
  if (document.getElementById('learnPage') && typeof initLearnPage === 'function') {
    try { initLearnPage(); } catch {}
  }
  if (document.getElementById('profileNameInput') && typeof syncProfileUI === 'function') {
    try { syncProfileUI(); } catch {}
  }
}

// Firestore helpers — per-user doc users/{uid}
async function loadUserData(uid){
  if(!db || !uid) return;
  try{
    const ref = doc(db, 'users', uid);
    const snap = await getDoc(ref);
    if(snap.exists()){
      const data = snap.data();
      isLoadingFromCloud = true;
      // Bidirectional merge so no locally solved questions or dates are lost
      if(typeof state !== 'undefined'){
        if(data.solved){
          state.solved = { ...(state.solved || {}), ...(data.solved || {}) };
          localStorage.setItem('pypractice-progress-v3', JSON.stringify(state.solved));
        }
        if(data.activity){
          state.activity = Array.from(new Set([...(state.activity || []), ...(data.activity || [])])).sort();
          localStorage.setItem('pypractice-activity-v1', JSON.stringify(state.activity));
        }
      }
      if(data.profile){
        const curProfile = JSON.parse(localStorage.getItem('pypractice-profile-v1') || '{}');
        localStorage.setItem('pypractice-profile-v1', JSON.stringify({ ...curProfile, ...data.profile }));
      }
      // Restore code drafts
      if(data.codeDrafts){
        Object.entries(data.codeDrafts).forEach(([k,v])=> {
          if (!localStorage.getItem(k)) localStorage.setItem(k, v);
        });
      }
      isLoadingFromCloud = false;

      // Sync merged data back up to cloud immediately
      await saveUserData(uid);

      // Refresh UI across the page
      if(typeof syncAllStats === 'function') syncAllStats();
      if(typeof renderHeaderProgress === 'function') renderHeaderProgress();
      if(typeof renderPracticeTopics === 'function') renderPracticeTopics();
      if(typeof initProgressPage === 'function' && document.getElementById('progressPage')) initProgressPage();
      if(typeof initProfilePage === 'function' && document.getElementById('profilePage')) initProfilePage();
    } else {
      // First cloud login — upload initial local progress to Firestore
      await saveUserData(uid);
    }
    // Real-time sync for multi-device/multi-tab updates
    if(firestoreUnsub) firestoreUnsub();
    firestoreUnsub = onSnapshot(doc(db, 'users', uid), (snap)=>{
      if(!snap.exists() || isLoadingFromCloud) return;
      const data = snap.data();
      isLoadingFromCloud = true;
      if(data.solved && typeof state !== 'undefined') {
        state.solved = { ...(state.solved || {}), ...data.solved };
        localStorage.setItem('pypractice-progress-v3', JSON.stringify(state.solved));
      }
      if(data.activity && typeof state !== 'undefined') {
        state.activity = Array.from(new Set([...(state.activity || []), ...(data.activity || [])])).sort();
        localStorage.setItem('pypractice-activity-v1', JSON.stringify(state.activity));
      }
      if(data.profile) localStorage.setItem('pypractice-profile-v1', JSON.stringify(data.profile));
      isLoadingFromCloud = false;
      if(typeof syncAllStats === 'function') syncAllStats();
      if(typeof renderHeaderProgress === 'function') renderHeaderProgress();
    });
  }catch(e){ console.warn('[Firestore] load failed, using offline localStorage', e); }
}

async function saveUserData(uid){
  if(!db || !uid || isLoadingFromCloud) return;
  try{
    const codeDrafts = {};
    try{
      for(let i=0;i<localStorage.length;i++){
        const k = localStorage.key(i);
        if(k && k.startsWith('code:')) codeDrafts[k] = localStorage.getItem(k);
      }
    }catch{}
    const payload = {
      solved: (typeof state!=='undefined' ? state.solved : JSON.parse(localStorage.getItem('pypractice-progress-v3')||'{}')),
      activity: (typeof state!=='undefined' ? state.activity : JSON.parse(localStorage.getItem('pypractice-activity-v1')||'[]')),
      profile: JSON.parse(localStorage.getItem('pypractice-profile-v1')||'null'),
      codeDrafts,
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'users', uid), payload, { merge:true });
  }catch(e){ console.warn('[Firestore] save failed', e); }
}

window.saveUserData = saveUserData;

// Wrap core.js save() and profile saves to also push to Firestore
function wrapSaves(uid){
  if(typeof save === 'function' && !save._wrapped){
    const origSave = save;
    const wrapped = function(){
      const r = origSave.apply(this, arguments);
      if(uid) saveUserData(uid);
      return r;
    };
    wrapped._wrapped = true;
    // @ts-ignore
    window.save = wrapped;
    // also patch global save if core.js uses window.save
    try{ save = wrapped; }catch{}
  }
  // Also watch profile saves
  const origSaveProfile = window.saveProfile;
  if(typeof origSaveProfile === 'function' && !origSaveProfile._wrapped){
    const wrappedP = function(p){
      const r = origSaveProfile.apply(this, arguments);
      if(uid) saveUserData(uid);
      return r;
    };
    wrappedP._wrapped = true;
    window.saveProfile = wrappedP;
  }
  // Watch code drafts via storage event is automatic on next saveUserData call from initProblemPage onChange
  // Hook localStorage.setItem for code: keys
  if(!localStorage.setItem._wrapped){
    const origSet = localStorage.setItem.bind(localStorage);
    const wrappedSet = function(k,v){
      const r = origSet(k,v);
      if(k && (k.startsWith('code:') || k.startsWith('pypractice-')) && auth?.currentUser?.uid){
        // debounce
        clearTimeout(window._firestoreSaveTimer);
        window._firestoreSaveTimer = setTimeout(()=> saveUserData(auth.currentUser.uid), 800);
      }
      return r;
    };
    wrappedSet._wrapped = true;
    localStorage.setItem = wrappedSet;
  }
}

if (auth) {
  onAuthStateChanged(auth, async (user) => {
    syncFirebaseSession(user);
    if(firestoreUnsub){ firestoreUnsub(); firestoreUnsub=null; }
    if(user && db){
      await loadUserData(user.uid);
      wrapSaves(user.uid);
    }
  });
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-logout-btn]');
    if (!btn) return;
    e.preventDefault();
    try { await signOut(auth); } catch {}
    localStorage.removeItem('pypractice-auth-v1');
    if(firestoreUnsub){ firestoreUnsub(); firestoreUnsub=null; }
    if (typeof toast === 'function') toast('Signed out');
    setTimeout(() => location.href = 'index.html', 300);
  });
} else {
  if (typeof syncAuthUI === 'function') syncAuthUI();
  if (typeof renderHeaderProgress === 'function') renderHeaderProgress();
}

export { auth, db };
