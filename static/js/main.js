/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMenu() {
  mobileMenu.classList.remove('open');
}

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--neon)' : '';
  });
});

/* ── CONTACT FORM ── */
async function submitForm(e) {
  e.preventDefault();
  const btn      = document.getElementById('submitBtn');
  const btnText  = document.getElementById('btnText');
  const btnLoader= document.getElementById('btnLoader');
  const formMsg  = document.getElementById('formMsg');

  const name    = document.getElementById('name').value;
  const email   = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  btnText.style.display  = 'none';
  btnLoader.style.display= 'inline-flex';
  btn.disabled = true;
  formMsg.className = 'form-msg';
  formMsg.textContent = '';

  try {
    const res = await fetch('/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject, message })
    });
    const data = await res.json();
    formMsg.textContent = data.message || data.error;
    formMsg.classList.add(data.success ? 'success' : 'error');
    if (data.success) document.getElementById('contactForm').reset();
  } catch {
    formMsg.textContent = 'Something went wrong. Please try again.';
    formMsg.classList.add('error');
  } finally {
    btnText.style.display  = 'inline-flex';
    btnLoader.style.display= 'none';
    btn.disabled = false;
  }
}

/* ── TYPING EFFECT (hero title) ── */
const titleEl = document.querySelector('.hero-title');
if (titleEl) {
  const words = ['Developer', 'Engineer', 'Builder', 'Creator'];
  let wIdx = 0, cIdx = 0, deleting = false;
  const outlineSpan = titleEl.querySelector('.outline-text');
  if (outlineSpan) {
    function typeEffect() {
      const word = words[wIdx];
      if (!deleting) {
        outlineSpan.textContent = word.slice(0, ++cIdx);
        if (cIdx === word.length) { deleting = true; setTimeout(typeEffect, 1800); return; }
      } else {
        outlineSpan.textContent = word.slice(0, --cIdx);
        if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
      }
      setTimeout(typeEffect, deleting ? 60 : 100);
    }
    setTimeout(typeEffect, 1200);
  }
}

/* ── SMOOTH REVEAL ON LOAD ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
});