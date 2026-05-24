/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card, .social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorFollower.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorFollower.classList.remove('hover'); });
});

/* ===========================
   NAVBAR SCROLL EFFECT
=========================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNavLink();
}, { passive: true });

/* ===========================
   HAMBURGER MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ===========================
   ACTIVE NAV LINK
=========================== */
function updateActiveNavLink() {
  const sections = ['home','skills','education','projects','contact'];
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}
updateActiveNavLink();

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ===========================
   SKILL BAR ANIMATION
=========================== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animated'));
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid').forEach(grid => skillObserver.observe(grid));

/* ===========================
   REVEAL ON SCROLL
=========================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .timeline-item, .project-card').forEach(el => revealObserver.observe(el));

/* ===========================
   SECTION HEADER REVEAL
=========================== */
const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      headerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section-header').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  headerObserver.observe(el);
});

/* ===========================
   CARD 3D TILT EFFECT
=========================== */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 16;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -16;
    card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

/* ===========================
   TYPING ANIMATION (hero)
=========================== */
const words   = ['Developer', 'Designer', 'Creator', 'Problem Solver'];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const accentEl = document.querySelector('.title-line.accent');
  if (!accentEl) return;
  const current = words[wordIndex];
  if (isDeleting) {
    accentEl.textContent = current.substring(0, --charIndex);
  } else {
    accentEl.textContent = current.substring(0, ++charIndex);
  }
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    isDeleting = true; delay = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 400;
  }
  setTimeout(typeEffect, delay);
}
setTimeout(typeEffect, 1200);

/* ===========================
   CONTACT FORM
=========================== */
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
  e.preventDefault();
  submitBtn.innerHTML = `<span>Sending…</span>`;
  submitBtn.style.opacity = '0.7';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = `<span>✓ Message Sent!</span>`;
    submitBtn.style.background = 'linear-gradient(135deg,#22C55E,#16A34A)';
    form.reset();
    setTimeout(() => {
      submitBtn.innerHTML = `<span>Send Message</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
      submitBtn.style.background = '';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
    }, 2800);
  }, 1400);
});

/* ===========================
   PARTICLE SPARKS (subtle)
=========================== */
function createSpark(x, y) {
  const spark = document.createElement('div');
  spark.style.cssText = `
    position:fixed; left:${x}px; top:${y}px; width:4px; height:4px;
    background:${Math.random() > 0.5 ? '#FF8C00' : '#FFD700'};
    border-radius:50%; pointer-events:none; z-index:9997;
    transform:translate(-50%,-50%);
  `;
  document.body.appendChild(spark);
  const angle = Math.random() * Math.PI * 2;
  const dist  = 30 + Math.random() * 50;
  const dx    = Math.cos(angle) * dist;
  const dy    = Math.sin(angle) * dist;
  let opacity = 1;
  let t = 0;
  function animSpark() {
    t += 0.05;
    opacity -= 0.04;
    spark.style.opacity  = opacity;
    spark.style.left     = x + dx * t + 'px';
    spark.style.top      = y + dy * t + 'px';
    if (opacity > 0) requestAnimationFrame(animSpark);
    else spark.remove();
  }
  requestAnimationFrame(animSpark);
}

let sparkThrottle = false;
document.addEventListener('click', e => {
  if (sparkThrottle) return;
  sparkThrottle = true;
  for (let i = 0; i < 8; i++) createSpark(e.clientX, e.clientY);
  setTimeout(() => sparkThrottle = false, 150);
});

/* ===========================
   AVATAR PARALLAX EFFECT
 =========================== */
const heroVisual = document.querySelector('.hero-visual');
const avatarContainer = document.getElementById('avatarContainer');
const avatarImg = document.querySelector('.avatar-img');
const outerRing = document.querySelector('.outer-ring');
const midRing = document.querySelector('.mid-ring');

if (heroVisual && avatarContainer && avatarImg) {
  heroVisual.addEventListener('mousemove', e => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    
    // Parallax effect on avatar image (moves with cursor slightly)
    avatarImg.style.transform = `translate(calc(-50% + ${x * 20}px), ${y * 18}px) scale(1.06)`;
    
    // 3D Tilt on container card (opposite tilt for deep depth perception)
    avatarContainer.style.transform = `translateY(${y * 10}px) rotateX(${-y * 15}deg) rotateY(${x * 15}deg)`;
    avatarContainer.style.borderColor = 'rgba(255, 140, 0, 0.5)';
    avatarContainer.style.boxShadow = `
      ${-x * 20}px ${-y * 20}px 50px rgba(0, 0, 0, 0.7),
      0 0 40px rgba(255, 140, 0, 0.18),
      inset 0 0 50px rgba(255, 140, 0, 0.22)
    `;

    // Telemetry rings move in opposite direction to create real-time depth perspective
    if (outerRing) {
      outerRing.style.transform = `translate(${x * -35}px, ${y * -35}px)`;
    }
    if (midRing) {
      midRing.style.transform = `translate(${x * -20}px, ${y * -20}px) scale(1.02)`;
    }
  });
  
  heroVisual.addEventListener('mouseleave', () => {
    // Reset transforms to resume CSS animations cleanly
    avatarImg.style.transform = '';
    avatarContainer.style.transform = '';
    avatarContainer.style.borderColor = '';
    avatarContainer.style.boxShadow = '';
    if (outerRing) outerRing.style.transform = '';
    if (midRing) midRing.style.transform = '';
  });
}
