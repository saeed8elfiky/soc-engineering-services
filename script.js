// ─── NAV SCROLL ──────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── HAMBURGER ───────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ─── TERMINAL TYPING ──────────────────────────────────────────────
const commands = [
  { el: 'typed-1', text: 'deploy --siem elk --scope full', out: 'out-1', delay: 600 },
  { el: 'typed-2', text: 'query --stack technologies', out: 'out-2', delay: 2800 },
  { el: 'typed-3', text: 'status --engagement ready', out: null, delay: 5000 },
];

function typeText(elId, text, cb) {
  const el = document.getElementById(elId);
  if (!el) return;
  let i = 0;
  function next() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      setTimeout(next, 45 + Math.random() * 30);
    } else if (cb) cb();
  }
  next();
}

commands.forEach(cmd => {
  setTimeout(() => {
    typeText(cmd.el, cmd.text, () => {
      if (cmd.out) {
        const outEl = document.getElementById(cmd.out);
        if (outEl) { outEl.style.display = 'flex'; }
      }
    });
  }, cmd.delay);
});

// ─── SCROLL REVEAL ────────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.service-card, .stat-card, .phase-item, .outcome-card, .why-card, .contact-option, .stack-row:not(.stack-header), .summary-text, .summary-stats, .workshop-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ─── ACTIVE NAV HIGHLIGHT ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.removeAttribute('style'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active && !active.classList.contains('nav-cta')) {
        active.style.color = '#60a5fa';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ─── TECH TAGS GLOW ──────────────────────────────────────────────
document.querySelectorAll('.tech-tag:not(.tech-tag-cert)').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.boxShadow = '0 0 12px rgba(59,130,246,0.25)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.boxShadow = '';
  });
});
