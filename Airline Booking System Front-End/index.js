
// ── Page Navigation ──
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo(0,0);
  closeMobileMenu();
}

function setActive(el) {
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}

function scrollToSection(id) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({ behavior: 'smooth' });
  }, 50);
}

// ── Mobile Menu ──
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── Booking Tabs ──
function setTab(btn, tab) {
  document.querySelectorAll('.widget-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-buy').style.display = tab === 'buy' ? '' : 'none';
  document.getElementById('tab-status').style.display = tab === 'status' ? '' : 'none';
}

// ── Toggle Password ──
function togglePass(id, icon) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

// ── Login Handler ──
function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  const emailErr = document.getElementById('login-email-err');
  const loginErr = document.getElementById('login-error');
  let valid = true;

  // Reset
  emailErr.classList.add('hidden');
  loginErr.classList.add('hidden');
  document.getElementById('login-email').classList.remove('error');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailErr.classList.remove('hidden');
    document.getElementById('login-email').classList.add('error');
    valid = false;
  }

  if (!valid) return;

  // Simulate: only accepts demo@flight606.com / password123
  if (email === 'demo@flight606.com' && pass === 'password123') {
    showPage('home');
  } else {
    loginErr.classList.remove('hidden');
    document.getElementById('login-email').classList.add('error');
  }
}

// ── Signup Handler ──
function handleSignup() {
  let valid = true;
  const fields = [
    { id: 'su-fname', errId: 'su-fname-err', check: v => v.length > 0 },
    { id: 'su-lname', errId: 'su-lname-err', check: v => v.length > 0 },
    { id: 'su-email', errId: 'su-email-err', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'su-pass',  errId: 'su-pass-err',  check: v => v.length >= 8 },
  ];
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.errId);
    if (!f.check(el.value.trim())) {
      el.classList.add('error'); err.classList.remove('hidden'); valid = false;
    } else {
      el.classList.remove('error'); err.classList.add('hidden');
    }
  });

  const pass = document.getElementById('su-pass').value;
  const cpass = document.getElementById('su-cpass').value;
  const cpassEl = document.getElementById('su-cpass');
  const cpassErr = document.getElementById('su-cpass-err');
  if (pass !== cpass) {
    cpassEl.classList.add('error'); cpassErr.classList.remove('hidden'); valid = false;
  } else {
    cpassEl.classList.remove('error'); cpassErr.classList.add('hidden');
  }

  const terms = document.getElementById('su-terms');
  const termsErr = document.getElementById('su-terms-err');
  if (!terms.checked) {
    termsErr.classList.remove('hidden'); valid = false;
  } else {
    termsErr.classList.add('hidden');
  }

  if (!valid) return;

  document.getElementById('signup-success').classList.remove('hidden');
  setTimeout(() => { showPage('login'); }, 1800);
}

// Clear errors on input
document.addEventListener('input', e => {
  if (e.target.classList.contains('form-input')) {
    e.target.classList.remove('error');
  }
});