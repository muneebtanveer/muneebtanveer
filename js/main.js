/**
 * Muneeb Tanveer - Portfolio JavaScript
 * Pure Vanilla JS - Light, Fast, Framework-Free
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initScrollAnimations();
  initCopyEmail();
  initRoiCalculator();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. Sticky Header & Active Nav Links on Scroll
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Toggle header dark glass effect
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting based on current scroll position
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Close nav when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. Intersection Observer Scroll Animations
   ========================================================================== */
function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.fade-in-up');

  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    animateElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Copy Email to Clipboard Feature
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.querySelector('.copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = copyBtn.dataset.email || 'muneeb@example.com';

    navigator.clipboard.writeText(email).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Copied Email!
      `;
      copyBtn.style.background = 'rgba(52, 211, 153, 0.2)';
      copyBtn.style.color = 'var(--accent-emerald)';

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
        copyBtn.style.color = '';
      }, 3000);
    }).catch(err => {
      console.error('Could not copy email: ', err);
    });
  });
}

/* ==========================================================================
   5. Interactive CRO ROI Calculator Widget
   ========================================================================== */
function initRoiCalculator() {
  const trafficSlider = document.getElementById('calc-traffic');
  const aovSlider = document.getElementById('calc-aov');
  const cvrSlider = document.getElementById('calc-cvr');

  if (!trafficSlider || !aovSlider || !cvrSlider) return;

  const trafficDisplay = document.getElementById('traffic-val');
  const aovDisplay = document.getElementById('aov-val');
  const cvrDisplay = document.getElementById('cvr-val');
  const resultDisplay = document.getElementById('revenue-lift-val');

  function calculateLift() {
    const monthlyTraffic = parseInt(trafficSlider.value, 10);
    const avgOrderValue = parseInt(aovSlider.value, 10);
    const cvrIncrease = parseFloat(cvrSlider.value);

    // Baseline revenue estimation
    const currentOrders = monthlyTraffic * (1.8 / 100);
    const currentRevenue = currentOrders * avgOrderValue;

    // Improved conversion revenue
    const newOrders = monthlyTraffic * ((1.8 + cvrIncrease) / 100);
    const newRevenue = newOrders * avgOrderValue;

    const monthlyLift = Math.round(newRevenue - currentRevenue);
    const annualLift = monthlyLift * 12;

    // Format numbers
    trafficDisplay.textContent = monthlyTraffic.toLocaleString() + ' / mo';
    aovDisplay.textContent = '$' + avgOrderValue;
    cvrDisplay.textContent = '+' + cvrIncrease.toFixed(1) + '%';
    resultDisplay.textContent = '+$' + annualLift.toLocaleString() + ' / yr';
  }

  trafficSlider.addEventListener('input', calculateLift);
  aovSlider.addEventListener('input', calculateLift);
  cvrSlider.addEventListener('input', calculateLift);

  calculateLift(); // Initial calculation
}

/* ==========================================================================
   6. Contact Form Submission (Netlify Forms Support)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const successMsg = document.getElementById('form-success-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="10"></circle>
      </svg>
      Sending Message...
    `;

    // Process Form via Netlify or fetch
    const formData = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      form.reset();
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 6000);
      }
    })
    .catch((error) => {
      console.warn('Netlify form post fallback to local confirmation state:', error);
      form.reset();
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      if (successMsg) {
        successMsg.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   7. Back to Top Smooth Scroll
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
