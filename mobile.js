'use strict';

/* ── Shared data ──────────────────────────────────────── */
const D = {
  kpis: [
    { label:'Steps',         value:'6,842', delta:'+12%',    dc:'dp', color:'ic-teal',   icon:'<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5"/>' },
    { label:'kcal burned',   value:'312',   delta:'+8%',     dc:'dp', color:'ic-red',    icon:'<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z"/>' },
    { label:'Active min',    value:'38',    delta:'\u221222m', dc:'dn', color:'ic-amber', icon:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
    { label:'Sleep',         value:'7.2h',  delta:'Optimal', dc:'dn2', color:'ic-purple', icon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' }
  ],
  goals: [
    { label:'Steps',          cur:6842,  tot:10000, unit:'',      color:'#0EA5B0' },
    { label:'Active minutes', cur:38,    tot:60,    unit:' min',  color:'#F59E0B' },
    { label:'Water',          cur:1.4,   tot:2.5,   unit:' L',   color:'#3B82F6' },
    { label:'Calories burned',cur:312,   tot:500,   unit:' kcal', color:'#EF4444' }
  ],
  workouts: [
    { id:1, name:'5 km Steady Run',     type:'Cardio',   cat:'cardio',   dur:'30 min', kcal:'280 kcal', xp:120, ex:['Warm-up jog|5 min','5 km run|30 min','Strides|4×20 sec','Cool-down|5 min'] },
    { id:2, name:'Core Blast HIIT',     type:'HIIT',     cat:'hiit',     dur:'20 min', kcal:'220 kcal', xp:90,  ex:['Jumping jacks|3×30','Push-ups|3×15','Squat jumps|3×20','Mountain climbers|3×20','Burpees|3×10','Plank|3×45 sec'] },
    { id:3, name:'Upper Body Strength', type:'Strength', cat:'strength', dur:'35 min', kcal:'200 kcal', xp:110, ex:['Dumbbell press|4×12','Bent-over row|4×12','Shoulder press|3×12','Bicep curls|3×15','Tricep dips|3×12'] },
    { id:4, name:'Morning Yoga Flow',   type:'Yoga',     cat:'yoga',     dur:'20 min', kcal:'100 kcal', xp:70,  ex:["Child's pose|60 sec","Cat-cow|10 rounds","Downward dog|3×30 sec","Warrior I|45 sec","Savasana|2 min"] },
    { id:5, name:'Cycling Sprint',      type:'Cardio',   cat:'cardio',   dur:'35 min', kcal:'310 kcal', xp:130, ex:['Warm-up|10 min','Sprint intervals|8×30 sec','Recovery|4×90 sec','Cool-down|5 min'] },
    { id:6, name:'Full Body Strength',  type:'Strength', cat:'strength', dur:'45 min', kcal:'350 kcal', xp:150, ex:['Squat|4×10','Deadlift|3×8','Bench press|4×10','Pull-ups|3×8','Plank|3×60 sec'] },
    { id:7, name:'Tabata Challenge',    type:'HIIT',     cat:'hiit',     dur:'16 min', kcal:'200 kcal', xp:80,  ex:['Round 1|20s on 10s off ×8','Round 2|20s on 10s off ×8','Rest|60 sec','Round 3|20s on 10s off ×8','Round 4|20s on 10s off ×8'] },
    { id:8, name:'Stretch & Recover',  type:'Yoga',     cat:'yoga',     dur:'15 min', kcal:'60 kcal',  xp:50,  ex:['Hip flexor|90 sec each','Hamstring|60 sec each','Chest opener|60 sec','Spinal twist|45 sec each','Legs up the wall|3 min'] }
  ],
  challenges: [
    { name:'Run 25 km this week',    sub:'18.3 km done · 3 days left', pct:73, pts:'200 XP', color:'#0EA5B0', ic:'ic-teal',   svg:'<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5"/>' },
    { name:'Hydration goal 5 days',  sub:'2.5 L daily · 3 of 5 done',  pct:60, pts:'80 XP',  color:'#3B82F6', ic:'ic-blue',   svg:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>' },
    { name:'Sleep 7+ hours 5 days',  sub:'3 of 5 nights done',         pct:60, pts:'100 XP', color:'#7C3AED', ic:'ic-purple', svg:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' },
    { name:'5 strength sessions',    sub:'2 of 5 done · 5 days left',  pct:40, pts:'150 XP', color:'#F59E0B', ic:'ic-amber',  svg:'<path d="M6.5 6.5h11v11h-11z"/><path d="M3 9.5h3.5M17.5 9.5H21M3 14.5h3.5M17.5 14.5H21"/>' }
  ],
  leaderboard: [
    { init:'RK', name:'Rahul Kumar',  pts:'2,340', grad:'135deg,#F59E0B,#EF4444', rank:'r1', me:false },
    { init:'PS', name:'Priya Sharma', pts:'2,180', grad:'135deg,#3B82F6,#7C3AED', rank:'r2', me:false },
    { init:'MV', name:'Mani Venkat',  pts:'1,940', grad:'135deg,#10B981,#3B82F6', rank:'r3', me:false },
    { init:'AK', name:'You',          pts:'1,840', grad:'135deg,#0EA5B0,#059669', rank:'',   me:true  },
    { init:'SR', name:'Siva R.',      pts:'1,720', grad:'135deg,#F59E0B,#10B981', rank:'',   me:false }
  ],
  nutKpis: [
    { label:'kcal consumed', value:'1,842', delta:'Goal 2,200',  dc:'dn2', color:'ic-red',   icon:'<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z"/>' },
    { label:'Protein',       value:'82 g',  delta:'\u221238 g',  dc:'dn',  color:'ic-green', icon:'<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>' },
    { label:'Carbs',         value:'210 g', delta:'On track',    dc:'dp',  color:'ic-amber', icon:'<path d="M12 2a10 10 0 1 0 10 10H12V2z"/>' },
    { label:'Water',         value:'1.4 L', delta:'\u22121.1 L', dc:'dn',  color:'ic-teal',  icon:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>' }
  ],
  macros: [
    { label:'Protein',  cur:82,  tot:120, unit:'g',    color:'#10B981' },
    { label:'Carbs',    cur:210, tot:250, unit:'g',    color:'#F59E0B' },
    { label:'Fat',      cur:54,  tot:70,  unit:'g',    color:'#3B82F6' },
    { label:'Calories', cur:1842,tot:2200,unit:' kcal',color:'#EF4444' }
  ],
  meals: [
    { name:'Breakfast \u2014 Oats with banana', kcal:'450 kcal', time:'7:30 am', color:'#F59E0B' },
    { name:'Lunch \u2014 Dal rice, vegetables',  kcal:'680 kcal', time:'1:00 pm', color:'#10B981' },
    { name:'Snack \u2014 Boiled eggs and fruit', kcal:'320 kcal', time:'4:30 pm', color:'#3B82F6' },
    { name:'Dinner \u2014 not yet logged',        kcal:'\u2014',   time:'\u2014',  color:'#9BA3BA' }
  ],
  healthCards: [
    { label:'Resting HR',    value:'62',    unit:' bpm', delta:'Down 4 bpm', dc:'dp', color:'ic-red',    icon:'<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65L12 21l8.42-8.77a5.4 5.4 0 0 0 0-7.65z"/>' },
    { label:'Recovery',      value:'87',    unit:' %',   delta:'Excellent',  dc:'dp', color:'ic-teal',   icon:'<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>' },
    { label:'Avg sleep',     value:'7.2',   unit:' h',   delta:'Optimal',    dc:'dp', color:'ic-purple', icon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' },
    { label:'BMI',           value:'22.4',  unit:'',     delta:'Normal',     dc:'dn2',color:'ic-green',  icon:'<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>' },
    { label:'Active today',  value:'38',    unit:' min', delta:'22 min left',dc:'dn', color:'ic-amber',  icon:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>' },
    { label:'Total XP',      value:'1,840', unit:'',     delta:'Level 7',    dc:'dp', color:'ic-purple', icon:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' }
  ],
  activityLog: [
    { text:'5 km run completed \u2014 280 kcal',     time:'Today 6:30 am', color:'#0EA5B0' },
    { text:'Daily step goal reached \u2014 10,200', time:'Yesterday',     color:'#10B981' },
    { text:'Core HIIT session \u2014 20 min',       time:'Fri 7:15 am',  color:'#3B82F6' },
    { text:'Missed water target \u2014 1.2 L',      time:'Thu',          color:'#F59E0B' },
    { text:'Cycling 8 km \u2014 310 kcal',          time:'Wed 5:45 pm',  color:'#7C3AED' }
  ],
  aiResponses: {
    'best workout for today': "Based on your 87% recovery score today, a 20-minute moderate HIIT session is ideal. Your cardiovascular adaptation data is strong — you can push intensity safely.",
    'improve my sleep': "Your 7.2 h average is solid, but Thursday dipped to ~5.5 h. A fixed 10:30 pm wind-down with dim lights and 5 min of breathing exercises will help align your sleep timing, which matters more than raw duration.",
    'review my nutrition': "Your main gap is protein — 82 g against a 120 g target. Add a protein source to every meal: eggs at breakfast, legumes at lunch, a shake post-workout. Carbs and fat are well balanced.",
    'recovery tips': "Cold exposure, 10-minute walks post-session, and consistent 7–9 h sleep are your highest-leverage tools. Your resting HR of 62 bpm confirms the process is working. Schedule one full rest day this week."
  }
};

/* ── State ────────────────────────────────────────────── */
let waterFilled = 5;
const WATER_CUPS = 10;
let dark = false;
let activeTab = 'home';
let activeFilter = 'all';

/* ── Helpers ──────────────────────────────────────────── */
function svg(inner) {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}
function set(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

/* ── Toast ────────────────────────────────────────────── */
let toastT;
function notify(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('visible'), 2800);
}

/* ── Theme ────────────────────────────────────────────── */
function toggleTheme() {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const ico = document.getElementById('themeIco');
  if (ico) ico.innerHTML = dark
    ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
    : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  notify(dark ? 'Dark mode on' : 'Light mode on');
}

/* ── Tab navigation ───────────────────────────────────── */
function switchTab(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const screen = document.getElementById('m-' + name);
  if (screen) screen.classList.add('active');
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  const tabs = ['home','workouts','challenges','nutrition','health'];
  const idx = tabs.indexOf(name);
  if (idx >= 0 && navItems[idx]) navItems[idx].classList.add('active');
  activeTab = name;
  window.scrollTo && window.scrollTo(0, 0);
  // special tab
  if (name === 'ai') {
    // ai tab not in bottom nav — show it from coach card
    document.querySelectorAll('.bottom-nav .nav-item').forEach(n => n.classList.remove('active'));
  }
}

/* ── Build: KPI row ───────────────────────────────────── */
function buildKpiRow(data, containerId) {
  set(containerId, data.map(k => `
    <div class="kpi-card">
      <div class="kpi-icon ${k.color}">${svg(k.icon)}</div>
      <div class="kpi-val">${k.value}</div>
      <div class="kpi-label">${k.label}</div>
      <span class="kpi-delta ${k.dc}">${k.delta}</span>
    </div>`).join(''));
}

/* ── Build: Streak dots ───────────────────────────────── */
function buildStreak() {
  set('mStreakDots', Array.from({length:7}, (_,i) =>
    `<div class="s-dot${i<5?' active':''}"></div>`).join(''));
}

/* ── Build: Goal bars ─────────────────────────────────── */
function buildGoals() {
  set('mGoals', D.goals.map(g => {
    const pct = Math.min(100, Math.round((g.cur / g.tot) * 100));
    const cur = g.cur < 10 ? g.cur.toFixed(1) : g.cur.toLocaleString();
    return `
      <div class="goal-row">
        <div class="goal-meta">
          <span class="goal-lbl">${g.label}</span>
          <span class="goal-vals">${cur}${g.unit} / ${g.tot}${g.unit}</span>
        </div>
        <div class="goal-track">
          <div class="goal-fill" style="width:${pct}%;background:${g.color}"></div>
        </div>
      </div>`;
  }).join(''));
}

/* ── Build: Home workouts ─────────────────────────────── */
function buildHomeWorkouts() {
  const icons = {
    cardio:   '<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5"/>',
    strength: '<path d="M6.5 6.5h11v11h-11z"/><path d="M3 9.5h3.5M17.5 9.5H21M3 14.5h3.5M17.5 14.5H21"/>',
    hiit:     '<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z"/>',
    yoga:     '<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>'
  };
  const colors = { cardio:'ic-teal', strength:'ic-amber', hiit:'ic-red', yoga:'ic-purple' };
  set('mWorkouts', D.workouts.slice(0,3).map(w => `
    <div class="workout-row" onclick="openModal(${w.id})">
      <div class="w-icon ${colors[w.cat]}">${svg(icons[w.cat])}</div>
      <div class="w-body">
        <div class="w-name">${w.name}</div>
        <div class="w-meta">${w.dur} &middot; ${w.kcal}</div>
      </div>
      <div class="w-xp">+${w.xp} XP</div>
    </div>`).join(''));
}

/* ── Build: Filter chips ──────────────────────────────── */
function buildFilters() {
  const cats = [['all','All'],['cardio','Cardio'],['strength','Strength'],['yoga','Yoga'],['hiit','HIIT']];
  set('mFilterRow', cats.map(([v,l]) =>
    `<div class="filter-chip${v==='all'?' on':''}" onclick="applyFilter('${v}',this)">${l}</div>`
  ).join(''));
}

function applyFilter(cat, el) {
  document.querySelectorAll('#mFilterRow .filter-chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  activeFilter = cat;
  buildWorkoutCards(cat);
}

/* ── Build: Workout cards ─────────────────────────────── */
function buildWorkoutCards(cat) {
  cat = cat || 'all';
  const icons = {
    cardio:   '<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5"/>',
    strength: '<path d="M6.5 6.5h11v11h-11z"/><path d="M3 9.5h3.5M17.5 9.5H21M3 14.5h3.5M17.5 14.5H21"/>',
    hiit:     '<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z"/>',
    yoga:     '<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>'
  };
  const colors = { cardio:'ic-teal', strength:'ic-amber', hiit:'ic-red', yoga:'ic-purple' };
  const list = cat === 'all' ? D.workouts : D.workouts.filter(w => w.cat === cat);
  set('mWorkoutCards', list.map(w => `
    <div class="wcard" onclick="openModal(${w.id})">
      <div class="wcard-head">
        <div class="wcard-icon ${colors[w.cat]}">${svg(icons[w.cat])}</div>
        <div>
          <div class="wcard-title">${w.name}</div>
          <div class="wcard-type">${w.type}</div>
        </div>
      </div>
      <div class="wcard-tags">
        <span class="tag">${w.dur}</span>
        <span class="tag">${w.kcal}</span>
        <span class="tag">${w.type}</span>
      </div>
      <div class="wcard-foot">
        <div class="wcard-xp">+${w.xp} XP</div>
        <button class="btn-accent" style="padding:6px 14px;font-size:12px" onclick="event.stopPropagation();openModal(${w.id})">Begin</button>
      </div>
    </div>`).join(''));
}

/* ── Build: Challenges ────────────────────────────────── */
function buildChallenges() {
  set('mChallenges', D.challenges.map(c => `
    <div class="ch-row">
      <div class="ch-icon ${c.ic}">${svg(c.svg)}</div>
      <div class="ch-body">
        <div class="ch-name">${c.name}</div>
        <div class="ch-sub">${c.sub}</div>
        <div class="ch-prog"><div class="ch-prog-fill" style="width:${c.pct}%;background:${c.color}"></div></div>
      </div>
      <div class="ch-pts" style="background:${c.color}1A;color:${c.color}">${c.pts}</div>
    </div>`).join(''));
}

function buildLeaderboard() {
  const rankLabel = { r1:'1st', r2:'2nd', r3:'3rd' };
  set('mLeaderboard', D.leaderboard.map((p,i) => `
    <div class="lb-row${p.me?' self':''}">
      <div class="lb-rank ${p.rank}">${p.rank ? rankLabel[p.rank] : (i+1)}</div>
      <div class="lb-av" style="background:linear-gradient(${p.grad})">${p.init}</div>
      <div class="lb-name">${p.name}</div>
      <div class="lb-pts">${p.pts}</div>
    </div>`).join(''));
}

/* ── Build: Nutrition ─────────────────────────────────── */
function renderWater() {
  set('mWaterCups', Array.from({length:WATER_CUPS}, (_,i) =>
    `<div class="wcup${i<waterFilled?' filled':''}" onclick="toggleCup(${i})"></div>`
  ).join(''));
  document.getElementById('mWaterStat').textContent =
    `${(waterFilled*0.25).toFixed(2)} L of ${(WATER_CUPS*0.25).toFixed(2)} L`;
}

function toggleCup(i) {
  waterFilled = i < waterFilled ? i : i + 1;
  renderWater();
  notify(`${(waterFilled*0.25).toFixed(2)} L logged`);
}
function addWater() {
  if (waterFilled < WATER_CUPS) { waterFilled++; renderWater(); notify(`${(waterFilled*0.25).toFixed(2)} L logged`); }
  else notify('Daily target reached');
}
function resetWater() { waterFilled = 0; renderWater(); notify('Water log reset'); }

function buildMacros() {
  set('mMacros', D.macros.map(m => {
    const pct = Math.min(100, Math.round((m.cur/m.tot)*100));
    return `
      <div class="goal-row">
        <div class="goal-meta">
          <span class="goal-lbl">${m.label}</span>
          <span class="goal-vals">${m.cur.toLocaleString()}${m.unit} / ${m.tot.toLocaleString()}${m.unit}</span>
        </div>
        <div class="goal-track"><div class="goal-fill" style="width:${pct}%;background:${m.color}"></div></div>
      </div>`;
  }).join(''));
}

function buildMeals() {
  set('mMeals', D.meals.map(m => `
    <div class="meal-row">
      <div class="meal-dot" style="background:${m.color}"></div>
      <div class="meal-name">${m.name}</div>
      <div class="meal-kcal">${m.kcal}</div>
      <div class="meal-time">${m.time}</div>
    </div>`).join(''));
}

/* ── Build: Health ────────────────────────────────────── */
function buildHealthCards() {
  set('mHealthCards', D.healthCards.map(h => `
    <div class="hcard">
      <div class="hcard-icon ${h.color}">${svg(h.icon)}</div>
      <div class="hcard-val">${h.value}<span class="hcard-unit">${h.unit}</span></div>
      <div class="hcard-label">${h.label}</div>
      <span class="hcard-delta ${h.dc}">${h.delta}</span>
    </div>`).join(''));
}

function buildActivityLog() {
  set('mActivityLog', D.activityLog.map(l => `
    <div class="log-row">
      <div class="log-dot" style="background:${l.color}"></div>
      <div class="log-text">${l.text}</div>
      <div class="log-time">${l.time}</div>
    </div>`).join(''));
}

/* ── AI chat ──────────────────────────────────────────── */
function buildChat() {
  set('mChatMsgs', `<div class="msg bot">Hello! I'm your FitFlow AI Coach. I've reviewed your recent activity. Your 12-day streak shows great consistency. What would you like to work on today?</div>`);
  set('mChatChips', ['Best workout for today','Improve my sleep','Review my nutrition','Recovery tips']
    .map(c => `<div class="chip" onclick="chipSend('${c}')">${c}</div>`).join(''));
}

function appendMsg(role, text) {
  const c = document.getElementById('mChatMsgs');
  if (!c) return;
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  d.textContent = text;
  c.appendChild(d);
  c.scrollTop = c.scrollHeight;
}

function mSendMsg() {
  const inp = document.getElementById('mChatInput');
  const val = (inp.value || '').trim();
  if (!val) return;
  appendMsg('user', val);
  inp.value = '';
  setTimeout(() => {
    const key = val.toLowerCase();
    const match = Object.entries(D.aiResponses).find(([k]) => key.includes(k.split(' ')[0]));
    appendMsg('bot', match ? match[1] : 'Good question. Based on your current data, consistency is your biggest advantage right now. Would you like a detailed weekly plan?');
  }, 500);
}

function chipSend(text) {
  document.getElementById('mChatInput').value = text;
  mSendMsg();
}

/* ── Modal (bottom sheet) ─────────────────────────────── */
function openModal(id) {
  const w = D.workouts.find(x => x.id === id);
  if (!w) return;
  document.getElementById('sheetTitle').textContent = w.name;
  document.getElementById('sheetSub').textContent = `${w.dur} \u00b7 ${w.kcal} \u00b7 ${w.type}`;
  set('sheetBody', `<div>${
    w.ex.map((e,i) => {
      const [nm,sets] = e.split('|');
      return `<div class="ex-row">
        <div class="ex-num">${String(i+1).padStart(2,'0')}</div>
        <div class="ex-name">${nm}</div>
        <div class="ex-sets">${sets||''}</div>
      </div>`;
    }).join('')
  }</div>`);
  document.getElementById('overlay').classList.add('open');
}

function closeModal(e) {
  if (e.target === document.getElementById('overlay')) closeOverlay();
}
function closeOverlay() { document.getElementById('overlay').classList.remove('open'); }
function startSession() { closeOverlay(); notify('Session started — good luck!'); }

/* ── Init ─────────────────────────────────────────────── */
function init() {
  buildStreak();
  buildKpiRow(D.kpis, 'mKpiRow');
  buildGoals();
  buildHomeWorkouts();
  buildFilters();
  buildWorkoutCards('all');
  buildChallenges();
  buildLeaderboard();
  buildKpiRow(D.nutKpis, 'mNutKpi');
  renderWater();
  buildMacros();
  buildMeals();
  buildHealthCards();
  buildActivityLog();
  buildChat();
}

document.addEventListener('DOMContentLoaded', init);
