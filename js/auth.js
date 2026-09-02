// Shared Firebase Auth UI helper — include as <script type="module" src="js/auth.js"> on every page
import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

function updateHeader(user){
  // Elements that should show only when logged in vs guest
  document.querySelectorAll("[data-auth-only]").forEach(el=> el.classList.toggle("hidden", !user));
  document.querySelectorAll("[data-guest-only]").forEach(el=> el.classList.toggle("hidden", !!user));
  document.querySelectorAll("[data-user-name]").forEach(el=> el.textContent = user ? (user.displayName || user.email?.split("@")[0] || "Learner") : "Learner");
  document.querySelectorAll("[data-user-email]").forEach(el=> el.textContent = user ? user.email : "");
  // Update profile page if present
  if(user && typeof getProfile === 'function' && typeof saveProfile === 'function'){
    try{
      const p = getProfile();
      if(!p || p.name === 'Learner'){
        const name = user.displayName || user.email.split("@")[0];
        saveProfile({ ...p, name: name.charAt(0).toUpperCase()+name.slice(1), bio: p?.bio || 'Learning Python, one problem at a time.', createdAt: p?.createdAt || new Date().toISOString() });
      }
    }catch{}
  }
}

if(auth){
  onAuthStateChanged(auth, (user)=>{
    updateHeader(user);
    // Optional: protect private pages — uncomment to force login
    // const privatePages = ['profile.html','progress.html'];
    // const isPrivate = privatePages.some(p=> location.pathname.endsWith(p));
    // if(!user && isPrivate) location.href = 'login.html';
  });

  document.addEventListener('click', async (e)=>{
    const btn = e.target.closest('[data-logout-btn]');
    if(!btn) return;
    e.preventDefault();
    try{ await signOut(auth); localStorage.removeItem('pypractice-auth-v1'); if(typeof toast==='function') toast('Signed out'); setTimeout(()=> location.href='index.html', 400);}catch(err){ if(typeof toast==='function') toast(err.message); }
  });
} else {
  console.warn("[PyPractice] Firebase auth not initialized — check js/firebase.js config.");
  // Fallback: show guest UI
  updateHeader(null);
}

// Export for inline module scripts
export { auth };
