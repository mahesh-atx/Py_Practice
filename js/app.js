/* ==========================================================================
   PyPractice Main Application Bootstrap & Router
   ========================================================================== */

// Initialize Theme & Header immediately
if (typeof initTheme === 'function') initTheme();
if (typeof setupHeader === 'function') setupHeader();
if (typeof syncAuthUI === 'function') syncAuthUI();
if (typeof renderHeaderProgress === 'function') renderHeaderProgress();
// Fill every <span data-total-topics|data-total-questions> from the data.
if (typeof syncDerivedCounts === 'function') syncDerivedCounts();

/* Question deep-link handoff (see rememberNavTarget in core.js):
   stash the intended question when ANY problem.html link is clicked
   (practice list, banner Next/Back, bottom Previous/Next, continue card).
   If the environment drops the query string on navigation, the problem
   page restores the question from this handoff instead of opening Q1. */
if (typeof rememberNavTarget === 'function' && typeof questionsFor === 'function') {
  document.addEventListener('click', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a[href*="problem.html"]') : null;
    if (!a) return;
    try {
      const u = new URL(a.href, location.href);
      const t = u.searchParams.get('topic');
      const l = u.searchParams.get('level');
      const i = Math.max(0, Number(u.searchParams.get('q')) || 0);
      const target = questionsFor(t, l)[i];
      if (target) rememberNavTarget(target);
    } catch {}
  }, true);
}

/* --------------------------------------------------------------
   Motion & Micro-interactions Orchestrator v2
   -------------------------------------------------------------- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ensureScrollProgress() {
  if (document.getElementById('scrollProgress')) return;
  // No bar on locked problem workspace (no page scroll)
  if (document.getElementById('problemPage')) return;
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = (isNaN(scrolled) ? 0 : scrolled) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initHeaderScroll() {
  const header = document.querySelector('.header-blur');
  if (!header) return;
  // problem page header is .paper not .header-blur in some cases, also handle
  const target = header;
  const onScroll = () => {
    if (window.scrollY > 8) target.classList.add('scrolled');
    else target.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initReveal() {
  if (prefersReducedMotion) return;

  const revealTarget = (el) => {
    if (!el || el.classList.contains('in')) return;
    el.classList.add('in');
    // Animate progress bars inside revealed cards
    if (el.querySelectorAll) {
      el.querySelectorAll('.green-bg, [data-daily-bar], [data-overall-bar]').forEach(bar => {
        const targetW = bar.style.width || bar.getAttribute('data-target-width') || '';
        // store target if not stored
        if (!bar.getAttribute('data-target-width') && targetW) {
          bar.setAttribute('data-target-width', targetW);
        }
        const finalW = bar.getAttribute('data-target-width');
        if (finalW && finalW !== '0%') {
          bar.style.width = '0%';
          // force reflow then animate
          bar.getBoundingClientRect();
          requestAnimationFrame(() => {
            bar.style.transition = 'width 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
            bar.style.width = finalW;
          });
        }
      });
    }
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealTarget(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -20px 0px' });

  const observeOrReveal = (el) => {
    if (!el || el.classList.contains('in')) return;
    const rect = el.getBoundingClientRect();
    // If element is already in or above the viewport on initial load, reveal immediately
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(() => revealTarget(el));
    } else {
      io.observe(el);
    }
  };

  // Generic card/section reveals — add .reveal to major blocks that don't already have animation
  document.querySelectorAll('section, .card, #practiceQuestionList article, #learnContent > *, #continueCard').forEach(el => {
    if (el.classList.contains('fade-up') || el.classList.contains('reveal') || el.classList.contains('reveal-scale') || el.classList.contains('reveal-blur')) return;
    // Don't interfere with Monaco/problem locked workspace or toast notification
    if (el.closest('#problemPage') || el.id === 'toast' || el.classList.contains('toast')) return;
    // Skip elements that already have their own entrance animations (topics, progress, roadmap)
    if (el.closest('#practiceTopics') || el.closest('#progressGrid') || el.classList.contains('roadmap-step')) return;
    // Tag as reveal if it's a direct card/section or practice list item
    if (el.matches('.card') || el.matches('section') || el.parentElement?.id === 'practiceQuestionList') {
      el.classList.add('reveal');
      observeOrReveal(el);
    }
  });

  // Also observe already-tagged .reveal elements (from HTML or prior runs)
  document.querySelectorAll('.reveal, .reveal-scale, .reveal-blur, .stagger').forEach(el => observeOrReveal(el));

  // Tag explicit stagger containers that haven't been animated yet
  document.querySelectorAll('#how-it-works .grid, .soft-bg .grid').forEach(grid => {
    if (!grid.classList.contains('stagger') && !prefersReducedMotion) {
      grid.classList.add('stagger');
      observeOrReveal(grid);
    }
  });

  // Special: hero left/right split stagger
  const heroSplit = document.querySelector('.hero-grid .content-max > div');
  if (heroSplit) {
    heroSplit.querySelectorAll('.fade-up').forEach(el => {
      // already animated via CSS, ensure they stay visible
    });
  }
}

function initRipple() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-ghost, #runBtn, #submitBtn, .level-card');
  buttons.forEach(btn => {
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = btn.style.overflow || 'hidden';
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      // color tweak per button type
      if (btn.classList.contains('btn-primary') || btn.id === 'submitBtn') {
        ripple.style.background = 'rgba(255,255,255,0.28)';
      } else {
        ripple.style.background = 'rgba(91,115,93,0.16)';
      }
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

function initMagneticAndSpotlight() {
  if (prefersReducedMotion) return;
  // Spotlight radial gradient tracking for Run/Submit (kept, not magnetic)
  ['runBtn','submitBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', ((e.clientX - r.left)/r.width*100)+'%');
      btn.style.setProperty('--my', ((e.clientY - r.top)/r.height*100)+'%');
    });
  });
  // Magnetic nudge for .btn-primary removed per user request
}

function initParallax() {
  if (prefersReducedMotion) return;
  if (window.innerWidth < 1024) return;
  const orbits = document.querySelectorAll('.orbit');
  const codeWindow = document.querySelector('.hero-grid .code-window');
  if (!orbits.length && !codeWindow) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY * 0.12;
      orbits.forEach((o, i) => {
        o.style.transform = `translateY(${y * (0.4 + i*0.2)}px) rotate(${y*0.06}deg)`;
      });
      if (codeWindow) {
        codeWindow.style.transform = `translateY(${y * -0.18}px)`;
      }
      ticking = false;
    });
  }, { passive: true });
}

function initCountUp() {
  const els = document.querySelectorAll('#progressSolved, #progressStarted, #progressOverall, #progressStreak, [data-streak], [data-daily-goal]');
  if (!els.length) return;
  const animateNum = (el, target) => {
    const isPct = el.id === 'progressOverall' || el.textContent.includes('%');
    const isFraction = el.textContent.includes('/');
    let end = parseInt(String(target).replace(/[^0-9]/g,''), 10);
    if (isNaN(end)) return;
    // fraction like 0/3 -> animate first number
    if (isFraction) {
      const parts = String(target).split('/');
      end = parseInt(parts[0], 10) || 0;
      const suffix = '/' + parts[1];
      let cur = 0;
      const dur = 700;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start)/dur);
        const eased = 1 - Math.pow(1 - p, 3);
        cur = Math.round(eased * end);
        el.textContent = cur + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.classList.add('popping');
      };
      requestAnimationFrame(tick);
      return;
    }
    let cur = 0;
    const dur = 800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start)/dur);
      const eased = 1 - Math.pow(1 - p, 3);
      cur = Math.round(eased * end);
      el.textContent = isPct ? cur + '%' : String(cur);
      if (p < 1) requestAnimationFrame(tick);
      else {
        el.classList.add('count-up','popping');
        setTimeout(()=> el.classList.remove('popping'), 500);
      }
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = e.target.textContent;
        // reset to 0 first for animation
        if (e.target.textContent.trim() !== '0' && e.target.textContent.trim() !== '0%' && e.target.textContent.trim() !== '0/3') {
          animateNum(e.target, target);
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => io.observe(el));
}

function initInputMicro() {
  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('focus', () => el.parentElement?.classList?.add('focused'));
    el.addEventListener('blur', () => el.parentElement?.classList?.remove('focused'));
  });
  // Auto-wrap search inputs for icon animation
  ['topicSearch','learnTopicSearch','practiceSearch'].forEach(id => {
    const inp = document.getElementById(id);
    if (inp && !inp.parentElement.classList.contains('search-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'search-wrap flex-1';
      inp.parentNode.insertBefore(wrap, inp);
      wrap.appendChild(inp);
      // move relative wrapper styles if needed
      wrap.style.position = 'relative';
      wrap.style.display = 'flex';
    }
  });
}

function initFooterReveal() {
  const footer = document.querySelector('footer');
  if (!footer || prefersReducedMotion) return;
  footer.classList.add('reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=> {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold: 0.2});
  io.observe(footer);
}

function initFooterMicro() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  if (!prefersReducedMotion) {
    // magnetic brand icon
    const brandIcon = footer.querySelector('a[href="index.html"] span.h-8');
    const brandLink = footer.querySelector('a[href="index.html"]');
    if (brandIcon && brandLink && window.innerWidth >= 768) {
      brandLink.addEventListener('mousemove', (e) => {
        const r = brandLink.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        brandIcon.style.transform = `rotate(${-x * 10}deg) scale(${1.05 + Math.abs(x) * 0.04}) translate(${x * 4}px, ${y * -3}px)`;
      }, { passive: true });
      brandLink.addEventListener('mouseleave', () => { brandIcon.style.transform = ''; });
    }
  }
  // stats numbers: click to copy + pop
  footer.querySelectorAll('[data-total-topics], [data-total-questions]').forEach(el => {
    el.style.cursor = 'pointer';
    el.title = 'Click to copy';
    el.addEventListener('click', () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(el.textContent);
        if (typeof toast === 'function') toast(el.textContent + ' copied');
        el.animate([{ transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 240, easing: 'cubic-bezier(0.34,1.56,0.64,1)' });
      } catch {}
    });
  });
}

function initCardTiltHint() {
  if (prefersReducedMotion || window.innerWidth < 768) return;
  document.querySelectorAll('#practiceTopics > article, #progressGrid > a').forEach(card => {
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x*4}deg) rotateX(${-y*4}deg) translateY(-4px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
    });
  });
}

// Re-apply reveal after dynamic renders (topics, practice, progress, learn)
function refreshReveals() {
  // allow DOM to paint then re-init
  setTimeout(() => initReveal(), 60);
  setTimeout(() => initCardTiltHint(), 80);
}
const originalRenderPracticeTopics = typeof renderPracticeTopics === 'function' ? renderPracticeTopics : null;
if (originalRenderPracticeTopics) {
  window.renderPracticeTopics = function() {
    const res = originalRenderPracticeTopics.apply(this, arguments);
    refreshReveals();
    return res;
  };
}

// Also hook into pages that render lists
['initPracticePage','initProgressPage','initTopicsDirectory','initRoadmap','initLearnPage','initProfilePage'].forEach(fnName => {
  const orig = window[fnName];
  if (typeof orig === 'function') {
    window[fnName] = function() {
      const r = orig.apply(this, arguments);
      refreshReveals();
      return r;
    };
  }
});

// Initialize the active page controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof initLanding === 'function') initLanding();
  if (typeof initTopicsDirectory === 'function') initTopicsDirectory();
  if (typeof initPracticePage === 'function') initPracticePage();
  if (typeof initProgressPage === 'function') initProgressPage();
  if (typeof initRoadmap === 'function') initRoadmap();
  if (typeof initProblemPage === 'function') initProblemPage();
  if (typeof initLearnPage === 'function') initLearnPage();
  if (typeof initProfilePage === 'function') initProfilePage();
  if (typeof syncDerivedCounts === 'function') syncDerivedCounts();

  // Motion boot
  ensureScrollProgress();
  initHeaderScroll();
  initReveal();
  initRipple();
  initMagneticAndSpotlight();
  initParallax();
  initCountUp();
  initInputMicro();
  initFooterReveal();
  initFooterMicro();
  initCardTiltHint();

  // Re-observe after a short delay for dynamically injected content
  setTimeout(() => {
    initReveal();
    initCardTiltHint();
  }, 400);

  // Smooth scroll for anchor links with offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const off = 76;
        const top = target.getBoundingClientRect().top + window.scrollY - off;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });
});
