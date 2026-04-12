/* ===== PARTICLE BACKGROUND ===== */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const PARTICLE_COUNT = 60;
  const MAX_DIST = 120;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function getColor() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'light'
      ? 'rgba(249,115,22,0.35)'
      : 'rgba(249,115,22,0.55)';
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    };
  }

  function initParticleArr() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const col = getColor();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          const alpha = (1 - dist / MAX_DIST) * 0.18;
          ctx.strokeStyle = `rgba(249,115,22,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  initParticleArr();
  draw();
  window.addEventListener('resize', () => { resize(); });
})();

/* ===== THEME TOGGLE ===== */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else {
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
})();

themeToggle.addEventListener('click', () => {
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navCloseBtn = document.getElementById('navCloseBtn');

function openMenu() {
  navLinks.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
if (navCloseBtn) navCloseBtn.addEventListener('click', closeMenu);

navLinks.querySelectorAll('.nav-a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ===== NAVBAR SCROLL STATE ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ===== ANIMATED COUNTERS ===== */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600;
  const steps = 40;
  const increment = target / steps;
  let current = 0;
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(current);
    }
  }, duration / steps);
}

let countersStarted = false;
const countersSection = document.querySelector('.counters-grid');
if (countersSection) {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll('.counter-num').forEach(animateCounter);
    }
  }, { threshold: 0.5 }).observe(countersSection);
}

/* ===== PROFILE PHOTO UPLOAD ===== */
const profileWrapper = document.getElementById('profileWrapper');
const profileImg = document.getElementById('profileImg');
const photoInput = document.getElementById('photoInput');
const profileHint = document.getElementById('profileHint') || { textContent: '' };

if (profileWrapper && photoInput) {
  profileWrapper.addEventListener('click', () => photoInput.click());

  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      profileImg.src = ev.target.result;
      profileImg.style.objectFit = 'cover';
      if (profileHint) profileHint.textContent = '✅ Photo uploaded!';
    };
    reader.readAsDataURL(file);
  });
}

/* ===== CONTACT FORM VALIDATION ===== */
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');
const btnText = document.getElementById('btnText');

function showError(el, msg) { if (el) el.textContent = msg; }
function clearError(el) { if (el) el.textContent = ''; }
function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

if (nameInput) nameInput.addEventListener('input', () => { if (nameInput.value.trim()) clearError(nameError); });
if (emailInput) emailInput.addEventListener('input', () => { if (isValidEmail(emailInput.value.trim())) clearError(emailError); });
if (messageInput) messageInput.addEventListener('input', () => { if (messageInput.value.trim().length >= 10) clearError(messageError); });

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) { showError(nameError, 'Please enter your name.'); valid = false; } else clearError(nameError);
    if (!email) { showError(emailError, 'Please enter your email.'); valid = false; }
    else if (!isValidEmail(email)) { showError(emailError, 'Please enter a valid email address.'); valid = false; }
    else clearError(emailError);
    if (!message) { showError(messageError, 'Please write a message.'); valid = false; }
    else if (message.length < 10) { showError(messageError, 'Message must be at least 10 characters.'); valid = false; }
    else clearError(messageError);

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      if (btnText) btnText.textContent = 'Sending…';
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (formSuccess) {
          formSuccess.classList.add('visible');
          setTimeout(() => formSuccess.classList.remove('visible'), 5000);
        }
      }, 1200);
    }
  });
}
