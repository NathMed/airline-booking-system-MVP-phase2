/* ── NAVIGATION ── */
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  window.scrollTo(0,0);
  closeMob();
}
function goNav(el,page,section){
  showPage(page);
  if(el){
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
    el.classList.add('active');
  }
  if(section) setTimeout(()=>{
    const t=document.getElementById(section);
    if(t) t.scrollIntoView({behavior:'smooth'});
  },60);
}
function toggleMob(){document.getElementById('mobMenu').classList.toggle('open')}
function closeMob(){document.getElementById('mobMenu').classList.remove('open')}

/* ── SLIDER ── */
let slide=0;
const slides=[
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&q=80',
  'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1800&q=80'
];
function applySlide(i){
  slide=(i+slides.length)%slides.length;
  document.querySelectorAll('.hero-bg').forEach(b=>{
    b.style.backgroundImage=
      `linear-gradient(180deg,rgba(10,8,6,.6) 0%,rgba(10,8,6,.32) 42%,rgba(10,8,6,.68) 100%),url('${slides[slide]}')`;
  });
  document.querySelectorAll('#sDots .s-dot,.w-fdot').forEach((d,idx)=>{
    d.classList.toggle('active',idx%3===slide);
  });
}
function nextSlide(){applySlide(slide+1)}
function prevSlide(){applySlide(slide-1)}
function goSlide(i){applySlide(i)}
setInterval(nextSlide,5000);

/* ── WIDGET TABS ── */
function wTab(t){
  document.getElementById('wtb-buy').classList.toggle('active',t==='buy');
  document.getElementById('wtb-status').classList.toggle('active',t==='status');
  document.getElementById('wp-buy').style.display=t==='buy'?'':'none';
  document.getElementById('wp-status').style.display=t==='status'?'':'none';
}
function doSearch(){
  document.getElementById('tours').scrollIntoView({behavior:'smooth'});
}

/* ── PASSWORD TOGGLE ── */
function tPass(id){
  const el=document.getElementById(id);
  el.type=el.type==='password'?'text':'password';
}

/* ── LOGIN ── */
function doLogin(){
  const email=document.getElementById('l-email').value.trim();
  const pass =document.getElementById('l-pass').value;
  const eErr =document.getElementById('l-email-err');
  const gErr =document.getElementById('login-err');
  let ok=true;
  eErr.classList.add('hidden');gErr.classList.add('hidden');
  document.getElementById('l-email').classList.remove('err');

  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    eErr.classList.remove('hidden');
    document.getElementById('l-email').classList.add('err');
    ok=false;
  }
  if(!ok)return;
  if(email==='demo@flight606.com'&&pass==='password123'){
    showPage('home');
  } else {
    gErr.classList.remove('hidden');
    document.getElementById('l-email').classList.add('err');
  }
}

/* ── SIGN UP ── */
function doSignup(){
  let ok=true;
  [{id:'su-fn',e:'su-fn-e',fn:v=>v.length>0},
   {id:'su-ln',e:'su-ln-e',fn:v=>v.length>0},
   {id:'su-em',e:'su-em-e',fn:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)},
   {id:'su-pw',e:'su-pw-e',fn:v=>v.length>=8}
  ].forEach(c=>{
    const el=document.getElementById(c.id);
    const er=document.getElementById(c.e);
    if(!c.fn(el.value.trim())){el.classList.add('err');er.classList.remove('hidden');ok=false}
    else{el.classList.remove('err');er.classList.add('hidden')}
  });
  const pw=document.getElementById('su-pw').value;
  const cp=document.getElementById('su-cp').value;
  const cpe=document.getElementById('su-cp-e');
  if(pw!==cp){document.getElementById('su-cp').classList.add('err');cpe.classList.remove('hidden');ok=false}
  else{document.getElementById('su-cp').classList.remove('err');cpe.classList.add('hidden')}
  const te=document.getElementById('su-terms-e');
  if(!document.getElementById('su-terms').checked){te.classList.remove('hidden');ok=false}
  else te.classList.add('hidden');
  if(!ok)return;
  document.getElementById('su-ok').classList.remove('hidden');
  setTimeout(()=>showPage('login'),1800);
}

/* ── CLEAR ERR ON INPUT ── */
document.addEventListener('input',e=>{
  if(e.target.classList.contains('f-input'))e.target.classList.remove('err');
  if(e.target.id==='l-pass'&&e.target.value.length>=8)
    document.getElementById('l-pass-chk').classList.remove('hidden');
});


/* ── CONFIRM INFO ── */
function confirmBooking(){

    showPage('success');

}