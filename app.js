/* ═══════════════════════════════════════════════
   FITFLOW  —  app.js
═══════════════════════════════════════════════ */

'use strict';

/* ── Data ─────────────────────────────────────── */
const DATA = {
  kpis: [
    { label: 'Steps today',     value: '6,842', delta: '+12%',  dir: 'pos', color: 'ic-teal',   icon: '<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label: 'kcal burned',     value: '312',   delta: '+8%',   dir: 'pos', color: 'ic-red',    icon: '<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label: 'Active minutes',  value: '38',    delta: '−22 min', dir: 'neg', color: 'ic-amber', icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label: 'Sleep last night',value: '7.2 h', delta: 'Optimal', dir: 'neu', color: 'ic-purple', icon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>' }
  ],
  goals: [
    { label: 'Steps',           current: 6842,  target: 10000, unit: '',    color: '#0EA5B0' },
    { label: 'Active minutes',  current: 38,    target: 60,    unit: ' min',color: '#F59E0B' },
    { label: 'Water',           current: 1.4,   target: 2.5,   unit: ' L',  color: '#3B82F6' },
    { label: 'Calories burned', current: 312,   target: 500,   unit: ' kcal', color: '#EF4444' }
  ],
  week: [
    { day: 'Mon', pct: 80, today: false },
    { day: 'Tue', pct: 58, today: false },
    { day: 'Wed', pct: 95, today: false },
    { day: 'Thu', pct: 44, today: false },
    { day: 'Fri', pct: 72, today: false },
    { day: 'Sat', pct: 68, today: true  },
    { day: 'Sun', pct: 0,  today: false }
  ],
  sleep: [
    { day: 'Mon', pct: 92 },
    { day: 'Tue', pct: 71 },
    { day: 'Wed', pct: 100},
    { day: 'Thu', pct: 56 },
    { day: 'Fri', pct: 82 },
    { day: 'Sat', pct: 90 },
    { day: 'Sun', pct: 5  }
  ],
  workouts: [
    { id:1, name:'5 km Steady Run',      type:'Cardio',   cat:'cardio',   dur:'30 min', kcal:'280 kcal', xp:120, ex:['Warm-up jog|5 min','5 km run|30 min target','Strides|4 × 20 sec','Cool-down walk|5 min'] },
    { id:2, name:'Core Blast HIIT',      type:'HIIT',     cat:'hiit',     dur:'20 min', kcal:'220 kcal', xp:90,  ex:['Jumping jacks|3 × 30','Push-ups|3 × 15','Squat jumps|3 × 20','Mountain climbers|3 × 20','Burpees|3 × 10','Plank|3 × 45 sec'] },
    { id:3, name:'Upper Body Strength',  type:'Strength', cat:'strength', dur:'35 min', kcal:'200 kcal', xp:110, ex:['Dumbbell press|4 × 12','Bent-over row|4 × 12','Shoulder press|3 × 12','Bicep curls|3 × 15','Tricep dips|3 × 12'] },
    { id:4, name:'Morning Yoga Flow',    type:'Yoga',     cat:'yoga',     dur:'20 min', kcal:'100 kcal', xp:70,  ex:["Child's pose|60 sec","Cat-cow|10 rounds","Downward dog|3 × 30 sec","Warrior I|45 sec each","Seated twist|30 sec each","Savasana|2 min"] },
    { id:5, name:'Cycling Sprint',       type:'Cardio',   cat:'cardio',   dur:'35 min', kcal:'310 kcal', xp:130, ex:['Easy warm-up|10 min','Sprint intervals|8 × 30 sec','Recovery pace|4 × 90 sec','Cool-down|5 min'] },
    { id:6, name:'Full Body Strength',   type:'Strength', cat:'strength', dur:'45 min', kcal:'350 kcal', xp:150, ex:['Barbell squat|4 × 10','Deadlift|3 × 8','Bench press|4 × 10','Pull-ups|3 × 8','Plank|3 × 60 sec'] },
    { id:7, name:'Tabata Challenge',     type:'HIIT',     cat:'hiit',     dur:'16 min', kcal:'200 kcal', xp:80,  ex:['Tabata round 1|20 sec on 10 sec off × 8','Tabata round 2|20 sec on 10 sec off × 8','Rest|60 sec','Tabata round 3|20 sec on 10 sec off × 8','Tabata round 4|20 sec on 10 sec off × 8'] },
    { id:8, name:'Stretch & Recover',   type:'Yoga',     cat:'yoga',     dur:'15 min', kcal:'60 kcal',  xp:50,  ex:['Hip flexor stretch|90 sec each','Hamstring stretch|60 sec each','Chest opener|60 sec','Spinal twist|45 sec each','Legs up the wall|3 min'] }
  ],
  challenges: [
    { name:'Run 25 km this week',   sub:'18.3 km done · 3 days left',    pct:73, pts:'200 XP', color:'#0EA5B0', bfill:'#0EA5B0' },
    { name:'Hydration goal 5 days', sub:'2.5 L daily · 3 of 5 done',     pct:60, pts:'80 XP',  color:'#3B82F6', bfill:'#3B82F6' },
    { name:'Sleep 7+ hours 5 days', sub:'3 of 5 nights complete',        pct:60, pts:'100 XP', color:'#7C3AED', bfill:'#7C3AED' },
    { name:'5 strength sessions',   sub:'2 of 5 done · 5 days remaining', pct:40, pts:'150 XP', color:'#F59E0B', bfill:'#F59E0B' }
  ],
  leaderboard: [
    { init:'RK', name:'Rahul Kumar',  pts:'2,340', grad:'135deg,#F59E0B,#EF4444', rank:'r1', me:false },
    { init:'PS', name:'Priya Sharma', pts:'2,180', grad:'135deg,#3B82F6,#7C3AED', rank:'r2', me:false },
    { init:'MV', name:'Mani Venkat',  pts:'1,940', grad:'135deg,#10B981,#3B82F6', rank:'r3', me:false },
    { init:'AK', name:'You',          pts:'1,840', grad:'135deg,#0EA5B0,#059669', rank:'',   me:true  },
    { init:'SR', name:'Siva R.',      pts:'1,720', grad:'135deg,#F59E0B,#10B981', rank:'',   me:false },
    { init:'NK', name:'Nidhi K.',     pts:'1,680', grad:'135deg,#EF4444,#F59E0B', rank:'',   me:false }
  ],
  badges: [
    { name:'First Run',   desc:'Complete first workout', locked:false, color:'ic-teal',   icon:'<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5"/>' },
    { name:'Streak 7',    desc:'7-day active streak',   locked:false, color:'ic-amber',  icon:'<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z"/>' },
    { name:'Hydrated',    desc:'2.5 L daily for 5 days',locked:false, color:'ic-blue',   icon:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>' },
    { name:'Iron Will',   desc:'10 strength sessions',  locked:false, color:'ic-purple', icon:'<path d="M6.5 6.5h11v11h-11z"/><path d="M3 9.5h3.5M17.5 9.5H21M3 14.5h3.5M17.5 14.5H21"/>' },
    { name:'Night Owl',   desc:'7-day sleep goal',      locked:true,  color:'ic-purple', icon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' },
    { name:'Century',     desc:'100 km total distance', locked:true,  color:'ic-teal',   icon:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>' },
    { name:'Champion',    desc:'Win a challenge',       locked:true,  color:'ic-amber',  icon:'<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>' },
    { name:'Zen Master',  desc:'20 yoga sessions',      locked:true,  color:'ic-green',  icon:'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>' }
  ],
  nutKpis: [
    { label:'kcal consumed',  value:'1,842', delta:'Goal 2,200',  dir:'neu', color:'ic-red',    icon:'<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label:'Protein',        value:'82 g',  delta:'−38 g to go', dir:'neg', color:'ic-green',  icon:'<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label:'Carbohydrates',  value:'210 g', delta:'On track',    dir:'pos', color:'ic-amber',  icon:'<path d="M12 2a10 10 0 1 0 10 10H12V2z" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label:'Water',          value:'1.4 L', delta:'−1.1 L to go',dir:'neg', color:'ic-teal',   icon:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" stroke-linecap="round" stroke-linejoin="round"/>' }
  ],
  macros: [
    { label:'Protein',    cur:82,  tot:120, unit:'g',   color:'#10B981' },
    { label:'Carbs',      cur:210, tot:250, unit:'g',   color:'#F59E0B' },
    { label:'Fat',        cur:54,  tot:70,  unit:'g',   color:'#3B82F6' },
    { label:'Calories',   cur:1842,tot:2200,unit:' kcal',color:'#EF4444' }
  ],
  meals: [
    { name:'Breakfast — Oats with banana',  kcal:'450 kcal', time:'7:30 am', color:'#F59E0B' },
    { name:'Lunch — Dal rice, vegetables',  kcal:'680 kcal', time:'1:00 pm', color:'#10B981' },
    { name:'Snack — Boiled eggs and fruit', kcal:'320 kcal', time:'4:30 pm', color:'#3B82F6' },
    { name:'Dinner — not yet logged',       kcal:'—',        time:'—',       color:'#9BA3BA' }
  ],
  healthCards: [
    { label:'Resting heart rate', value:'62', unit:' bpm', delta:'+pos',  dtext:'Down 4 bpm', color:'ic-red',    icon:'<path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65L12 21l8.42-8.77a5.4 5.4 0 0 0 0-7.65z" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label:'Recovery score',     value:'87', unit:' %',   delta:'pos',   dtext:'Excellent',  color:'ic-teal',   icon:'<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label:'Avg sleep (7 days)', value:'7.2',unit:' h',   delta:'pos',   dtext:'Optimal',    color:'ic-purple', icon:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label:'BMI',                value:'22.4',unit:'',    delta:'neu',   dtext:'Normal',     color:'ic-green',  icon:'<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label:'Active today',       value:'38', unit:' min', delta:'neg',   dtext:'22 min left', color:'ic-amber', icon:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14" stroke-linecap="round" stroke-linejoin="round"/>' },
    { label:'Total XP',           value:'1,840',unit:'',  delta:'pos',   dtext:'Level 7',    color:'ic-purple', icon:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke-linecap="round" stroke-linejoin="round"/>' }
  ],
  activityLog: [
    { text:'5 km run completed — 280 kcal',    time:'Today 6:30 am',  color:'#0EA5B0' },
    { text:'Daily step goal reached — 10,200', time:'Yesterday',      color:'#10B981' },
    { text:'Core HIIT session — 20 min',       time:'Fri 7:15 am',   color:'#3B82F6' },
    { text:'Missed water target — 1.2 L only', time:'Thu',           color:'#F59E0B' },
    { text:'Cycling 8 km — 310 kcal',          time:'Wed 5:45 pm',   color:'#7C3AED' }
  ],
  aiMessages: [
    { role:'bot', text:"Hello! I'm your FitFlow AI Coach. I've reviewed your recent activity data. Your consistency is improving — great work on the 12-day streak. What would you like to work on today?" },
  ],
  aiChips: ['Best workout for today', 'Improve my sleep', 'Review my nutrition', 'Recovery tips']
};

const aiReplies = {
  'best workout for today': "Based on your 87% recovery score and current week's activity, I'd recommend a 20–25 min moderate HIIT session. Your cardiovascular data shows good adaptation — pushing intensity today is safe.",
  'improve my sleep': "Your average sleep is 7.2 h which is solid, but Thursday dipped to ~5.5 h. Try a fixed 10:30 pm wind-down: dim lights, no screens, and 5 min of breathing exercises. Consistency in sleep timing matters more than total hours.",
  'review my nutrition': "Protein intake at 82 g is the main gap — you need 120 g to support muscle recovery. Add a protein source to each meal: eggs at breakfast, legumes at lunch, a shake post-workout. Carbs and fat are well balanced.",
  'recovery tips': "Cold water exposure, 10 min walks post-training, and 7–9 h sleep are the highest-leverage recovery tools. Your resting HR of 62 bpm shows the process is working. Schedule one full rest day this week.",
};

/* ── Water state ──────────────────────────────── */
let waterFilled = 5;
const WATER_CUPS = 10;
const WATER_PER_CUP = 0.25;

/* ── Theme ────────────────────────────────────── */
let dark = false;
function toggleTheme() {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const pill = document.getElementById('themePill');
  if (pill) pill.classList.toggle('dark-mode', dark);
  // swap icon
  const knobSvg = document.getElementById('themeKnobSvg');
  if (knobSvg) knobSvg.innerHTML = dark
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
    : '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  notify(dark ? 'Dark mode enabled' : 'Light mode enabled');
}

/* ── Toast ────────────────────────────────────── */
let toastTimer;
function notify(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('visible'), 3000);
}

/* ── Screen navigation ────────────────────────── */
const titles = { home:'Dashboard', workouts:'Workouts', challenges:'Challenges', nutrition:'Nutrition', health:'Health', ai:'AI Coach' };
function showScreen(name, navEl) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const s = document.getElementById('s-' + name);
  if (s) s.classList.add('active');
  if (navEl) navEl.classList.add('active');
  document.getElementById('pageTitle').textContent = titles[name] || name;
  document.getElementById('sidebar').classList.remove('open');
  window.scrollTo(0, 0);
}

/* ── Render helpers ───────────────────────────── */
function svgWrap(inner, size) {
  size = size || 24;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

/* ── KPI grid ─────────────────────────────────── */
function buildKpis(data, containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = data.map(k => `
    <div class="kpi-card">
      <div class="kpi-icon-wrap ${k.color}">${svgWrap(k.icon)}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-delta delta-${k.dir}">${k.delta}</div>
    </div>`).join('');
}

/* ── Goal bars ────────────────────────────────── */
function buildGoals() {
  const c = document.getElementById('goalBars');
  if (!c) return;
  c.innerHTML = DATA.goals.map(g => {
    const pct = Math.min(100, Math.round((g.current / g.target) * 100));
    const cur = typeof g.current === 'number' && g.current < 10 ? g.current.toFixed(1) : g.current.toLocaleString();
    return `
      <div class="goal-row">
        <div class="goal-meta">
          <span class="goal-label">${g.label}</span>
          <span class="goal-vals">${cur}${g.unit} / ${g.target}${g.unit}</span>
        </div>
        <div class="goal-track">
          <div class="goal-fill" style="width:${pct}%;background:${g.color}"></div>
        </div>
      </div>`;
  }).join('');
}

/* ── Bar chart ────────────────────────────────── */
function buildBarChart(data, containerId, color) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = data.map(b => `
    <div class="bar-col">
      <div class="bar-track">
        <div class="bar-fill" style="height:${b.pct}%;background:${color || (b.today ? 'var(--accent)' : 'var(--border-2)')}"></div>
      </div>
      <div class="bar-day${b.today ? ' today' : ''}">${b.day}</div>
    </div>`).join('');
}

/* ── Streak dots ──────────────────────────────── */
function buildStreak() {
  const c = document.getElementById('streakDots');
  if (!c) return;
  const filled = 5;
  c.innerHTML = Array.from({length:7}, (_,i) =>
    `<div class="s-dot${i < filled ? ' active' : ''}"></div>`
  ).join('');
}

/* ── Home workouts ────────────────────────────── */
function buildHomeWorkouts() {
  const c = document.getElementById('homeWorkouts');
  if (!c) return;
  const icons = { cardio:'<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5"/>', strength:'<path d="M6.5 6.5h11v11h-11z"/><path d="M3 9.5h3.5M17.5 9.5H21M3 14.5h3.5M17.5 14.5H21"/>', hiit:'<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z"/>', yoga:'<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>' };
  const colors = { cardio:'ic-teal', strength:'ic-amber', hiit:'ic-red', yoga:'ic-purple' };
  c.innerHTML = DATA.workouts.slice(0, 3).map(w => `
    <div class="workout-row" onclick="openModal(${w.id})">
      <div class="w-icon-box ${colors[w.cat]}">${svgWrap(icons[w.cat])}</div>
      <div class="w-body">
        <div class="w-name">${w.name}</div>
        <div class="w-meta">${w.dur} &middot; ${w.kcal}</div>
      </div>
      <div class="w-xp">+${w.xp} XP</div>
      <button class="start-btn" onclick="event.stopPropagation();openModal(${w.id})">Begin</button>
    </div>`).join('');
}

/* ── Workout grid ─────────────────────────────── */
let activeFilter = 'all';
function buildWorkoutGrid(cat) {
  cat = cat || 'all';
  const c = document.getElementById('workoutGrid');
  if (!c) return;
  const icons = { cardio:'<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5"/>', strength:'<path d="M6.5 6.5h11v11h-11z"/><path d="M3 9.5h3.5M17.5 9.5H21M3 14.5h3.5M17.5 14.5H21"/>', hiit:'<path d="M12 2c0 6-5 9-5 13a5 5 0 0 0 10 0c0-4-5-7-5-13z"/>', yoga:'<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>' };
  const colors = { cardio:'ic-teal', strength:'ic-amber', hiit:'ic-red', yoga:'ic-purple' };
  const filtered = cat === 'all' ? DATA.workouts : DATA.workouts.filter(w => w.cat === cat);
  c.innerHTML = filtered.map(w => `
    <div class="wcard" onclick="openModal(${w.id})">
      <div class="wcard-header">
        <div class="wcard-icon ${colors[w.cat]}">${svgWrap(icons[w.cat], 22)}</div>
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
        <button class="btn-sm" onclick="event.stopPropagation();openModal(${w.id})">Begin</button>
      </div>
    </div>`).join('');
}

/* ── Filter chips ─────────────────────────────── */
function buildFilters() {
  const c = document.getElementById('filterRow');
  if (!c) return;
  const cats = [['all','All'],['cardio','Cardio'],['strength','Strength'],['yoga','Yoga & Flexibility'],['hiit','HIIT']];
  c.innerHTML = cats.map(([v,l]) => `
    <button class="filter-chip${v==='all'?' on':''}" onclick="applyFilter('${v}',this)">${l}</button>`
  ).join('');
}
function applyFilter(cat, el) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('on'));
  el.classList.add('on');
  activeFilter = cat;
  buildWorkoutGrid(cat);
}
function filterSearch(val) {
  const v = val.toLowerCase();
  document.querySelectorAll('.wcard').forEach(c => {
    const title = c.querySelector('.wcard-title').textContent.toLowerCase();
    c.style.display = title.includes(v) ? '' : 'none';
  });
}

/* ── Challenges ───────────────────────────────── */
function buildChallenges() {
  const c = document.getElementById('challengeList');
  if (!c) return;
  const icons = {
    0:'<path d="M13 4v16M8 9l5-5 5 5M8 15l5 5 5-5"/>',
    1:'<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z"/>',
    2:'<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    3:'<path d="M6.5 6.5h11v11h-11z"/><path d="M3 9.5h3.5M17.5 9.5H21M3 14.5h3.5M17.5 14.5H21"/>'
  };
  const icolors = ['ic-teal','ic-blue','ic-purple','ic-amber'];
  c.innerHTML = DATA.challenges.map((ch,i) => `
    <div class="ch-row">
      <div class="ch-icon ${icolors[i]}">${svgWrap(icons[i])}</div>
      <div class="ch-body">
        <div class="ch-name">${ch.name}</div>
        <div class="ch-sub">${ch.sub}</div>
        <div class="ch-mini-track"><div class="ch-mini-fill" style="width:${ch.pct}%;background:${ch.bfill}"></div></div>
      </div>
      <div class="ch-pts" style="background:${ch.color}1A;color:${ch.color}">${ch.pts}</div>
    </div>`).join('');
}

function buildLeaderboard() {
  const c = document.getElementById('leaderboard');
  if (!c) return;
  const ranks = { r1:'1st', r2:'2nd', r3:'3rd' };
  c.innerHTML = DATA.leaderboard.map((p,i) => `
    <div class="lb-row${p.me?' self':''}">
      <div class="lb-rank ${p.rank}">${p.rank ? ranks[p.rank] : (i+1)}</div>
      <div class="lb-av" style="background:linear-gradient(${p.grad})">${p.init}</div>
      <div class="lb-name">${p.name}</div>
      <div class="lb-pts">${p.pts}</div>
    </div>`).join('');
}

function buildBadges() {
  const c = document.getElementById('badges');
  if (!c) return;
  c.innerHTML = DATA.badges.map(b => `
    <div class="badge-tile${b.locked?' locked':''}">
      <div class="badge-icon ${b.color}">${svgWrap(b.icon, 18)}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>`).join('');
}

/* ── Nutrition ────────────────────────────────── */
function renderWater() {
  const c = document.getElementById('waterGrid');
  if (!c) return;
  c.innerHTML = Array.from({length: WATER_CUPS}, (_,i) => `
    <div class="wcup${i < waterFilled ? ' filled' : ''}" onclick="toggleCup(${i})"></div>`
  ).join('');
  document.getElementById('waterStat').textContent =
    `${(waterFilled * WATER_PER_CUP).toFixed(2)} L \u2014 ${(WATER_CUPS * WATER_PER_CUP).toFixed(1)} L target`;
}
function toggleCup(i) {
  waterFilled = i < waterFilled ? i : i + 1;
  renderWater();
  notify(`${(waterFilled * WATER_PER_CUP).toFixed(2)} L logged`);
}
function addWater() {
  if (waterFilled < WATER_CUPS) { waterFilled++; renderWater(); notify(`${(waterFilled * WATER_PER_CUP).toFixed(2)} L logged`); }
  else notify('Daily target reached');
}
function resetWater() { waterFilled = 0; renderWater(); notify('Water log reset'); }

function buildMacros() {
  const c = document.getElementById('macros');
  if (!c) return;
  c.innerHTML = DATA.macros.map(m => {
    const pct = Math.round((m.cur / m.tot) * 100);
    return `
      <div class="goal-row">
        <div class="goal-meta">
          <span class="goal-label">${m.label}</span>
          <span class="goal-vals">${m.cur.toLocaleString()}${m.unit} / ${m.tot.toLocaleString()}${m.unit}</span>
        </div>
        <div class="goal-track"><div class="goal-fill" style="width:${pct}%;background:${m.color}"></div></div>
      </div>`;
  }).join('');
}

function buildMeals() {
  const c = document.getElementById('mealLog');
  if (!c) return;
  c.innerHTML = DATA.meals.map(m => `
    <div class="meal-row">
      <div class="meal-dot" style="background:${m.color}"></div>
      <div class="meal-name">${m.name}</div>
      <div class="meal-kcal">${m.kcal}</div>
      <div class="meal-time">${m.time}</div>
    </div>`).join('');
}

/* ── Health ───────────────────────────────────── */
function buildHealthCards() {
  const c = document.getElementById('healthCards');
  if (!c) return;
  c.innerHTML = DATA.healthCards.map(h => `
    <div class="hcard">
      <div class="hcard-icon ${h.color}">${svgWrap(h.icon, 20)}</div>
      <div class="hcard-val">${h.value}<span class="hcard-unit">${h.unit}</span></div>
      <div class="hcard-label">${h.label}</div>
      <div class="kpi-delta delta-${h.delta}" style="margin:6px auto 0">${h.dtext}</div>
    </div>`).join('');
}

function buildActivityLog() {
  const c = document.getElementById('activityLog');
  if (!c) return;
  c.innerHTML = DATA.activityLog.map(l => `
    <div class="log-row">
      <div class="log-dot" style="background:${l.color}"></div>
      <div class="log-text">${l.text}</div>
      <div class="log-time">${l.time}</div>
    </div>`).join('');
}

/* ── AI Chat ──────────────────────────────────── */
function buildChat() {
  const msgs = document.getElementById('chatMsgs');
  if (!msgs) return;
  msgs.innerHTML = DATA.aiMessages.map(m => `
    <div class="msg ${m.role}">${m.text}</div>`).join('');

  const chips = document.getElementById('chatChips');
  if (chips) chips.innerHTML = DATA.aiChips.map(c => `
    <div class="chat-chip" onclick="chipSend('${c}')">${c}</div>`).join('');
}

function appendMsg(role, text) {
  const c = document.getElementById('chatMsgs');
  if (!c) return;
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.textContent = text;
  c.appendChild(div);
  c.scrollTop = c.scrollHeight;
}

function sendMsg() {
  const inp = document.getElementById('chatInput');
  const val = inp.value.trim();
  if (!val) return;
  appendMsg('user', val);
  inp.value = '';
  setTimeout(() => {
    const key = val.toLowerCase();
    const reply = Object.entries(aiReplies).find(([k]) => key.includes(k.split(' ')[0]));
    appendMsg('bot', reply ? reply[1] : "Good question. Based on your current data, I'd recommend focusing on consistency. Small improvements each day compound significantly over weeks. Would you like a specific plan?");
  }, 600);
}

function chipSend(text) {
  const inp = document.getElementById('chatInput');
  inp.value = text;
  sendMsg();
}

/* ── Modal ────────────────────────────────────── */
function openModal(id) {
  const w = DATA.workouts.find(x => x.id === id);
  if (!w) return;
  document.getElementById('modalTitle').textContent = w.name;
  document.getElementById('modalSub').textContent = `${w.dur} &middot; ${w.kcal} &middot; ${w.type}`;
  document.getElementById('modalBody').innerHTML = `
    <div class="ex-list">
      ${w.ex.map((e,i) => {
        const [nm, sets] = e.split('|');
        return `<div class="ex-row">
          <div class="ex-num">${String(i+1).padStart(2,'0')}</div>
          <div class="ex-name">${nm}</div>
          <div class="ex-sets">${sets || ''}</div>
        </div>`;
      }).join('')}
    </div>`;
  document.getElementById('overlay').classList.add('open');
}

function closeModal(e) {
  if (e.target === document.getElementById('overlay')) closeOverlay();
}
function closeOverlay() {
  document.getElementById('overlay').classList.remove('open');
}
function launchWorkout() {
  closeOverlay();
  notify('Session started — good luck!');
}

/* ── Init ─────────────────────────────────────── */
function init() {
  buildKpis(DATA.kpis, 'kpiGrid');
  buildKpis(DATA.nutKpis, 'nutKpi');
  buildGoals();
  buildBarChart(DATA.week, 'weekChart');
  buildBarChart(DATA.sleep, 'sleepChart', '#7C3AED');
  buildStreak();
  buildHomeWorkouts();
  buildFilters();
  buildWorkoutGrid('all');
  buildChallenges();
  buildLeaderboard();
  buildBadges();
  renderWater();
  buildMacros();
  buildMeals();
  buildHealthCards();
  buildActivityLog();
  buildChat();
}

document.addEventListener('DOMContentLoaded', init);
