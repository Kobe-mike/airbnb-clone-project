// Ghana Stay - Complete Frontend JavaScript Implementation
// Handles all interactivity, forms, filters, animations, and API integration

// ============ STATE MANAGEMENT ============
const state = {
  currentUser: null,
  authToken: localStorage.getItem('authToken'),
  properties: [],
  currentFilter: 'all',
  currentPage: 1,
  itemsPerPage: 6,
  modalsShown: { newsletter: false, promo: false },
  authManager: null
};

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeHeroSection();
  initializeBookingForm();
  initializePropertyGrid();
  initializeFilters();
  initializeFAQ();
  initializeModals();
  initializeScrollAnimations();
  initializeCounters();
  checkAuthStatus();
  loadProperties();
});

// ============ NAVIGATION ============
function initializeNavigation() {
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('navbar-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const navbar = document.getElementById('navbar');
  const loginBtn = document.getElementById('login-btn');

  hamburger?.addEventListener('click', () => {
    drawer.classList.add('active');
    drawer.style.display = 'flex';
  });

  drawerClose?.addEventListener('click', () => {
    drawer.classList.remove('active');
    drawer.style.display = 'none';
  });

  document.querySelectorAll('.navbar__drawer-links a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
      drawer.style.display = 'none';
    });
  });

  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none';
  });

  // Login button click - redirect to auth page
  loginBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/client/auth.html';
  });
}

// ============ HERO SECTION ============
function initializeHeroSection() {
  const scrollCue = document.querySelector('.hero__scroll-cue');
  const exploreBtn = document.querySelector('.hero__buttons .btn--primary');

  [scrollCue, exploreBtn].forEach(el => {
    el?.addEventListener('click', () => {
      document.querySelector('.property-grid-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ============ BOOKING FORM ============
function initializeBookingForm() {
  const form = document.getElementById('booking-form');
  const guestsMinus = document.getElementById('guests-minus');
  const guestsPlus = document.getElementById('guests-plus');
  const guestsInput = document.getElementById('guests');

  guestsMinus?.addEventListener('click', (e) => {
    e.preventDefault();
    const current = parseInt(guestsInput.value);
    if (current > 1) guestsInput.value = current - 1;
  });

  guestsPlus?.addEventListener('click', (e) => {
    e.preventDefault();
    guestsInput.value = parseInt(guestsInput.value) + 1;
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.property-grid-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  const checkinInput = document.getElementById('checkin');
  if (checkinInput) {
    checkinInput.min = new Date().toISOString().split('T')[0];
  }
}

// ============ PROPERTY GRID ============
async function loadProperties() {
  try {
    const response = await fetch('/api/listings');
    if (!response.ok) throw new Error('Failed to load properties');
    state.properties = await response.json();
    renderPropertyGrid(state.properties);
  } catch (error) {
    console.error('Error loading properties:', error);
    renderPropertyGridPlaceholders();
  }
}

function renderPropertyGrid(properties) {
  const grid = document.getElementById('property-grid');
  if (!grid) return;

  let filtered = state.currentFilter !== 'all'
    ? properties.filter(p => p.property_type?.toLowerCase() === state.currentFilter.toLowerCase())
    : properties;

  const start = (state.currentPage - 1) * state.itemsPerPage;
  const paginated = filtered.slice(start, start + state.itemsPerPage);

  grid.innerHTML = paginated.length ? paginated.map(p => `
    <div class="property-card" data-listing-id="${p.id}">
      <div class="property-card__image" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%233A6B4F%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-family=%22Outfit%22 font-size=%2218%22 fill=%22%23fff%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22500%22%3E${p.title}%3C/text%3E%3C/svg%3E')">
        <span class="property-card__badge">${p.property_type || 'Room'}</span>
        <button class="property-card__save">♡</button>
      </div>
      <div class="property-card__details">
        <div class="property-card__rating"><span class="property-card__stars">★★★★★</span> <span>4.8</span></div>
        <h3 class="property-card__title">${p.title}</h3>
        <div class="property-card__location">📍 ${p.location || 'Ghana'}</div>
        <div class="property-card__info-grid">
          <div class="property-card__info-item"><span>🛏️</span> <span>${p.bedrooms || '1'} beds</span></div>
          <div class="property-card__info-item"><span>🚿</span> <span>${p.bathrooms || '1'} baths</span></div>
          <div class="property-card__info-item"><span>📡</span> <span>Internet</span></div>
          <div class="property-card__info-item"><span>🅿️</span> <span>Parking</span></div>
        </div>
        <div class="property-card__price">GHS ${p.price_per_night || '0'}<div class="property-card__price-note">incl. taxes</div></div>
        <button class="btn btn--primary btn--full" onclick="bookProperty(${p.id})">Book Now</button>
      </div>
    </div>
  `).join('') : '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No properties found.</p>';

  document.querySelectorAll('.property-card__save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.style.color = btn.style.color === 'rgb(201, 148, 58)' ? '' : '#C9943A';
    });
  });
}

function renderPropertyGridPlaceholders() {
  const grid = document.getElementById('property-grid');
  if (!grid) return;
  grid.innerHTML = Array(6).fill('<div class="property-card" style="opacity: 0.5;"><div class="property-card__image"></div></div>').join('');
}

function initializePropertyGrid() {
  loadProperties();
}

// ============ FILTERS ============
function initializeFilters() {
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.currentFilter = pill.dataset.type || 'all';
      state.currentPage = 1;
      renderPropertyGrid(state.properties);
    });
  });
}

// ============ FAQ ACCORDION ============
function initializeFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

// ============ MODALS ============
function initializeModals() {
  const newsletter = document.getElementById('newsletter-overlay');
  const promo = document.getElementById('promo-popup');

  if (newsletter && !state.modalsShown.newsletter) {
    setTimeout(() => {
      newsletter.classList.add('active');
      state.modalsShown.newsletter = true;
    }, 8000);
  }

  document.getElementById('newsletter-close')?.addEventListener('click', () => newsletter.classList.remove('active'));
  newsletter?.addEventListener('click', (e) => e.target === newsletter && newsletter.classList.remove('active'));

  document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletter?.classList.remove('active');
  });

  if (promo && !state.modalsShown.promo) {
    setTimeout(() => {
      promo.style.display = 'block';
      state.modalsShown.promo = true;
    }, 3000);
  }

  document.querySelector('.promo-popup__close')?.addEventListener('click', () => promo.style.display = 'none');

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      newsletter?.classList.remove('active');
      if (promo) promo.style.display = 'none';
    }
  });
}

// ============ SCROLL ANIMATIONS ============
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  document.querySelectorAll('.featured-stays, .property-grid-section, .category-showcase, .value-proposition, .testimonials-section, .faq-section, .blog-section').forEach(s => observer.observe(s));
}

// ============ COUNTERS ============
function initializeCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.counter-number').forEach(c => {
          if (!c.dataset.animated) {
            animateCounter(c, parseInt(c.dataset.target));
            c.dataset.animated = 'true';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  document.querySelector('.counters-strip')?.forEach(s => observer.observe(s));
}

function animateCounter(el, target) {
  let current = 0;
  const step = target / 50;
  const timer = setInterval(() => {
    current += step;
    el.textContent = current >= target ? target : Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 30);
}

// ============ AUTH ============
async function checkAuthStatus() {
  if (state.authToken) {
    try {
      const res = await fetch('/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${state.authToken}` }
      });
      if (res.ok) state.currentUser = await res.json();
      else localStorage.removeItem('authToken');
    } catch (e) { console.error(e); }
  }
}

function bookProperty(id) {
  if (!state.authToken) {
    alert('Please log in');
    return;
  }
  console.log('Booking property:', id);
}

console.log('%c✓ Ghana Stay Frontend Loaded', 'color: #C9943A; font-size: 14px; font-weight: bold;');

