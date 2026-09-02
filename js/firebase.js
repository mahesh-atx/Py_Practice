// Firebase initialization for PyPractice — FREE, no server needed
// 1) Go to https://console.firebase.google.com → Create project (no Google Analytics needed)
// 2) Build → Authentication → Get started → Enable Email/Password + Google → Save
// 3) Project Settings → Your apps → Web (</>) → Register app → Copy firebaseConfig below and REPLACE the placeholders
// 4) Authentication → Settings → Authorized domains → Add your domain + localhost
// 5) Deploy: Firebase Hosting (free) or GitHub Pages — no server code required

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTAGP-RHyYhx7dvg1mK3x3t0OJJORSWOc",
  authDomain: "pypractice-d9ffb.firebaseapp.com",
  projectId: "pypractice-d9ffb",
  storageBucket: "pypractice-d9ffb.firebasestorage.app",
  messagingSenderId: "95267459312",
  appId: "1:95267459312:web:890f13b58dcb267247b235"
};

// Prevent crash if user hasn't replaced config yet — shows toast hint
let app;
let auth;
try {
  if (firebaseConfig.apiKey.includes("REPLACE")) {
    console.warn("[PyPractice] Firebase config not set — replace placeholders in js/firebase.js with your project config. See comments at top.");
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence).catch(()=>{});
} catch (e) {
  console.error("[PyPractice] Firebase init failed. Check js/firebase.js config:", e);
  // Create a dummy auth to avoid import errors before config is set
  app = null;
  auth = null;
}

export { app, auth };
