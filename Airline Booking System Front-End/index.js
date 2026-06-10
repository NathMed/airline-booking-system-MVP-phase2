/* ════════════════════════════════════════════════════
   Flight606 – index.js
   All JavaScript logic decoupled from HTML
════════════════════════════════════════════════════ */

/* ── Airport Label Maps ─────────────────────────── */
const airportLabels = {
  MNL: 'Manila (MNL)', CEB: 'Cebu (CEB)', DVO: 'Davao (DVO)',
  SIN: 'Singapore (SIN)', TYO: 'Tokyo (TYO)', DXB: 'Dubai (DXB)',
  CDG: 'Paris (CDG)', NRT: 'Tokyo (NRT)', MLE: 'Maldives (MLE)',
  GVA: 'Geneva (GVA)', JFK: 'New York (JFK)'
};

const airportShort = {
  MNL: 'Manila · MNL', CEB: 'Cebu · CEB', DVO: 'Davao · DVO',
  SIN: 'Singapore · SIN', TYO: 'Tokyo · TYO', DXB: 'Dubai · DXB',
  CDG: 'Paris · CDG', NRT: 'Tokyo · NRT', MLE: 'Maldives · MLE',
  GVA: 'Geneva · GVA', JFK: 'New York · JFK'
};

/* ════════════════════════════════════════════════════
   NAVBAR SCROLL BEHAVIOUR
════════════════════════════════════════════════════ */
(function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Run on load in case page is already scrolled
})();

/* ════════════════════════════════════════════════════
   PAGE NAVIGATION
════════════════════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  closeProfileMenu();

  // Collapse mobile nav if open
  const navCollapse = document.getElementById('navbarContent');
  if (navCollapse && navCollapse.classList.contains('show')) {
    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse) bsCollapse.hide();
  }
}

function goNav(el, page, section) {
  showPage(page);

  // Update active nav link
  if (el) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(a => a.classList.remove('active'));
    el.classList.add('active');
  }

  // Smooth scroll to section after page renders
  if (section) {
    setTimeout(() => {
      const target = document.getElementById(section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }
}

/* ════════════════════════════════════════════════════
   HERO SLIDER
════════════════════════════════════════════════════ */
const heroSlides = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&q=80',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1800&q=80'
];

let currentSlide = 0;
let slideInterval = null;

function applySlide(index) {
  currentSlide = (index + heroSlides.length) % heroSlides.length;

  const bg = document.getElementById('heroBg');
  if (bg) {
    bg.style.transition = 'background-image 0s';
    bg.style.backgroundImage = `url('${heroSlides[currentSlide]}')`;
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
  }

  // Update dot indicators
  document.querySelectorAll('#sliderDots .dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() { applySlide(currentSlide + 1); }
function prevSlide() { applySlide(currentSlide - 1); }
function goSlide(i)  { applySlide(i); }

function startSlideInterval() {
  stopSlideInterval();
  slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideInterval() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

/* ════════════════════════════════════════════════════
   BOOKING WIDGET TABS
════════════════════════════════════════════════════ */
function wTab(tab) {
  const buyTab    = document.getElementById('wtb-buy');
  const statusTab = document.getElementById('wtb-status');
  const buyPanel    = document.getElementById('wp-buy');
  const statusPanel = document.getElementById('wp-status');

  if (tab === 'buy') {
    buyTab.classList.add('active');
    statusTab.classList.remove('active');
    buyPanel.style.display = '';
    statusPanel.style.display = 'none';
  } else {
    statusTab.classList.add('active');
    buyTab.classList.remove('active');
    statusPanel.style.display = '';
    buyPanel.style.display = 'none';
  }
}

/* ════════════════════════════════════════════════════
   SYNC HERO WIDGET → SEARCH PAGE
════════════════════════════════════════════════════ */
function syncSearchFrom() {
  const val = document.getElementById('hw-from').value;
  const sfFrom = document.getElementById('sf-from');
  if (val && sfFrom) sfFrom.value = val;
  updateFlightBanner();
}

function syncSearchTo() {
  const val = document.getElementById('hw-to').value;
  const sfTo = document.getElementById('sf-to');
  if (val && sfTo) sfTo.value = val;
  updateFlightBanner();
}

function syncSearchDate() {
  const val = document.getElementById('hw-date').value;
  const sfDate = document.getElementById('sf-date');
  if (val && sfDate) sfDate.value = val;
}

function syncSearchPax() {
  const val = document.getElementById('hw-pax').value;
  const sfPax = document.getElementById('sf-pax');
  if (val && sfPax) sfPax.value = val;
}

/* ════════════════════════════════════════════════════
   UPDATE FLIGHT RESULTS LABELS
════════════════════════════════════════════════════ */
function updateFlightBanner() {
  const fromEl = document.getElementById('sf-from');
  const toEl   = document.getElementById('sf-to');
  if (!fromEl || !toEl) return;

  const from = fromEl.value;
  const to   = toEl.value;
  const fl   = airportLabels[from] || from;
  const tl   = airportLabels[to]   || to;
  const fs   = airportShort[from]  || from;
  const ts   = airportShort[to]    || to;

  // Banner labels
  setTextById('sf-from-label',  fl);
  setTextById('sf-to-label',    tl);
  setTextById('sf-to-label2',   tl);
  setTextById('sf-from-label2', fl);

  // Flight card airports – outbound
  ['fc-dep1', 'fc-dep2'].forEach(id => setTextById(id, fs));
  ['fc-arr1', 'fc-arr2'].forEach(id => setTextById(id, ts));

  // Flight card airports – return
  ['fc-ret-dep1', 'fc-ret-dep2'].forEach(id => setTextById(id, ts));
  ['fc-ret-arr1', 'fc-ret-arr2'].forEach(id => setTextById(id, fs));

  // Booking summary
  const bs = document.getElementById('booking-flight-summary');
  if (bs) bs.textContent = `Fri May 17  ${from} – ${to} | Fri May 31  ${to} – ${from}`;

  // Luggage labels
  setTextById('luggage-out-label', `${from} → ${to}`);
  setTextById('luggage-ret-label', `${to} → ${from}`);
}

function setTextById(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ════════════════════════════════════════════════════
   FLIGHT CARD SELECTION
════════════════════════════════════════════════════ */
function selectFlight(card) {
  // Only deselect siblings in the same group (before/after a .results-banner)
  const allCards = card.parentElement.querySelectorAll('.flight-card');
  allCards.forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

/* ════════════════════════════════════════════════════
   BOOKING SECTION TOGGLE
════════════════════════════════════════════════════ */
function toggleSection(header) {
  const body   = header.nextElementSibling;
  const toggle = header.querySelector('.bs-toggle i');
  if (!body) return;

  if (body.style.display === 'none') {
    body.style.display = '';
    if (toggle) {
      toggle.classList.remove('bi-chevron-right');
      toggle.classList.add('bi-chevron-up');
    }
  } else {
    body.style.display = 'none';
    if (toggle) {
      toggle.classList.remove('bi-chevron-up');
      toggle.classList.add('bi-chevron-right');
    }
  }
}

/* ════════════════════════════════════════════════════
   SEAT MAP BUILDER
════════════════════════════════════════════════════ */
(function buildSeatMap() {
  const map = document.getElementById('seatMap');
  if (!map) return;

  const taken    = ['1A', '1C', '2B', '3D', '4E', '4F', '5A', '7B', '8C', '9D', '10F', '11A', '11C'];
  const selected = ['11B'];
  const cols     = ['A', 'B', 'C', null, 'D', 'E', 'F'];

  // Column labels row
  const labelRow = document.createElement('div');
  labelRow.className = 'seat-col-labels';
  const numSpacer = document.createElement('div');
  numSpacer.className = 'seat-row-num';
  labelRow.appendChild(numSpacer);
  cols.forEach(col => {
    const lbl = document.createElement('div');
    if (col === null) {
      lbl.className = 'seat-aisle-gap';
    } else {
      lbl.className = 'seat-col-label';
      lbl.textContent = col;
    }
    labelRow.appendChild(lbl);
  });
  map.appendChild(labelRow);

  // Seat rows
  for (let r = 1; r <= 12; r++) {
    const row = document.createElement('div');
    row.className = 'seat-row';

    const num = document.createElement('div');
    num.className = 'seat-row-num';
    num.textContent = r;
    row.appendChild(num);

    cols.forEach(col => {
      if (!col) {
        const aisle = document.createElement('div');
        aisle.className = 'seat-aisle';
        row.appendChild(aisle);
        return;
      }

      const seatId = r + col;
      const seat   = document.createElement('div');
      seat.className = 'seat';
      seat.textContent = seatId;
      seat.title = seatId;

      if (taken.includes(seatId)) {
        seat.classList.add('taken');
        seat.title = 'Seat taken';
      } else if (selected.includes(seatId)) {
        seat.classList.add('selected');
        seat.title = 'Your seat';
      } else {
        seat.addEventListener('click', () => {
          const current = map.querySelector('.seat.selected:not(.taken)');
          if (current && current !== seat) current.classList.remove('selected');
          seat.classList.toggle('selected');
        });
      }

      row.appendChild(seat);
    });

    map.appendChild(row);
  }
})();

/* ════════════════════════════════════════════════════
   PROFILE DROPDOWN
════════════════════════════════════════════════════ */
function toggleProfileMenu() {
  const menu = document.getElementById('profileMenu');
  if (menu) menu.classList.toggle('open');
}

function closeProfileMenu() {
  const menu = document.getElementById('profileMenu');
  if (menu) menu.classList.remove('open');
}

// Close on outside click
document.addEventListener('click', e => {
  const dropdown = document.getElementById('profileDropdown');
  if (dropdown && !dropdown.contains(e.target)) closeProfileMenu();
});

/* ════════════════════════════════════════════════════
   AUTH STATE
════════════════════════════════════════════════════ */
let isLoggedIn = false;

function setLoggedIn(state) {
  isLoggedIn = state;
  const loggedOut = document.getElementById('nav-logged-out');
  const loggedIn  = document.getElementById('nav-logged-in');
  if (loggedOut) loggedOut.style.display = state ? 'none' : 'flex';
  if (loggedIn)  loggedIn.style.setProperty('display', state ? 'flex' : 'none', 'important');
}

/* ════════════════════════════════════════════════════
   LOGIN
════════════════════════════════════════════════════ */
function doLogin() {
  const email  = (document.getElementById('l-email').value || '').trim();
  const pass   = document.getElementById('l-pass').value || '';
  const eErr   = document.getElementById('l-email-err');
  const gErr   = document.getElementById('login-err');

  eErr.classList.add('d-none');
  gErr.classList.add('d-none');
  document.getElementById('l-email').classList.remove('err');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    eErr.classList.remove('d-none');
    document.getElementById('l-email').classList.add('err');
    return;
  }

  if (email === 'demo@flight606.com' && pass === 'password123') {
    setLoggedIn(true);
    showPage('home');
  } else {
    gErr.classList.remove('d-none');
    document.getElementById('l-email').classList.add('err');
  }
}

/* ════════════════════════════════════════════════════
   LOGOUT
════════════════════════════════════════════════════ */
function doLogout() {
  setLoggedIn(false);
  closeProfileMenu();
  showPage('home');
}

/* ════════════════════════════════════════════════════
   SIGN UP
════════════════════════════════════════════════════ */
function doSignup() {
  let valid = true;

  const fields = [
    { id: 'su-fn', errId: 'su-fn-e', check: v => v.length > 0,        msg: '' },
    { id: 'su-ln', errId: 'su-ln-e', check: v => v.length > 0,        msg: '' },
    { id: 'su-em', errId: 'su-em-e', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: '' },
    { id: 'su-pw', errId: 'su-pw-e', check: v => v.length >= 8,        msg: '' }
  ];

  fields.forEach(f => {
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!f.check(el.value.trim())) {
      el.classList.add('err');
      err.classList.remove('d-none');
      valid = false;
    } else {
      el.classList.remove('err');
      err.classList.add('d-none');
    }
  });

  // Password match check
  const pw  = document.getElementById('su-pw').value;
  const cp  = document.getElementById('su-cp').value;
  const cpe = document.getElementById('su-cp-e');
  const cpEl = document.getElementById('su-cp');
  if (pw !== cp) {
    cpEl.classList.add('err');
    cpe.classList.remove('d-none');
    valid = false;
  } else {
    cpEl.classList.remove('err');
    cpe.classList.add('d-none');
  }

  // Terms check
  const termsErr = document.getElementById('su-terms-e');
  if (!document.getElementById('su-terms').checked) {
    termsErr.classList.remove('d-none');
    valid = false;
  } else {
    termsErr.classList.add('d-none');
  }

  if (!valid) return;

  document.getElementById('su-ok').classList.remove('d-none');
  setTimeout(() => showPage('login'), 1800);
}

/* ════════════════════════════════════════════════════
   PASSWORD TOGGLE
════════════════════════════════════════════════════ */
function togglePass(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

/* ════════════════════════════════════════════════════
   AUTOFILL PASSENGER
════════════════════════════════════════════════════ */
function autofillPassenger(n) {
  const checkbox = document.getElementById(`autofill-p${n}`);
  if (!checkbox || !checkbox.checked) return;

  if (n === 1) {
    setVal('p1-fn', 'Passenger');
    setVal('p1-ln', 'One');
    setVal('p1-dob', '1990-01-01');
    setVal('p1-gender', 'Male');
  }
}

function setVal(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}

/* ════════════════════════════════════════════════════
   CLEAR ERROR ON INPUT
════════════════════════════════════════════════════ */
document.addEventListener('input', e => {
  if (e.target.classList.contains('f-input')) {
    e.target.classList.remove('err');
  }
});

/* ════════════════════════════════════════════════════
   INITIALISE
════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Set defaults for the hero widget
  const hwFrom = document.getElementById('hw-from');
  const hwTo   = document.getElementById('hw-to');
  if (hwFrom) hwFrom.value = 'MNL';
  if (hwTo)   hwTo.value   = 'CEB';

  // Apply initial flight banner
  updateFlightBanner();

  // Start hero slider
  applySlide(0);
  startSlideInterval();
});