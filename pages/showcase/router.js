/* AegisX HIS Showcase — route loader
   Each render* fn in views.js returns an HTML string for the demo content area.
   This is a static mockup — strings come from the codebase, not user input. */
const ROUTES = {
  dashboard:  { title: 'แดชบอร์ด',          fn: 'renderDashboard' },
  schedule:   { title: 'ตารางนัด',           fn: 'renderSchedule' },
  patients:   { title: 'ผู้ป่วย',             fn: 'renderPatients' },
  opd:        { title: 'OPD',                fn: 'renderOPD' },
  ipd:        { title: 'IPD / ผู้ป่วยใน',     fn: 'renderIPD' },
  er:         { title: 'ห้องฉุกเฉิน',         fn: 'renderER' },
  pharmacy:   { title: 'ห้องยา',              fn: 'renderPharmacy' },
  lab:        { title: 'ห้องปฏิบัติการ',       fn: 'renderLab' },
  radiology:  { title: 'รังสีวินิจฉัย',         fn: 'renderRadiology' },
  billing:    { title: 'การเงิน / สิทธิ',      fn: 'renderBilling' },
  reports:    { title: 'รายงาน',              fn: 'renderReports' },
  settings:   { title: 'ตั้งค่า',              fn: 'renderSettings' },
  quality:    { title: 'คุณภาพ',              fn: 'renderQuality' },
  a11y:       { title: 'A11y Lab',            fn: 'renderA11yLab' },
};

function goRoute(name) {
  if (name === 'login') {
    document.body.setAttribute('data-route', 'login');
    return;
  }
  document.body.setAttribute('data-route', name);
  const route = ROUTES[name] || ROUTES.dashboard;
  document.getElementById('crumb-current').textContent = route.title;
  document.querySelectorAll('#sidebar-nav .his-sidebar__link').forEach(a => {
    a.classList.toggle('is-active', a.dataset.nav === name);
  });
  const renderer = window[route.fn];
  const container = document.getElementById('content');
  // Static mockup — render functions return demo markup from codebase, not user input
  container.innerHTML = renderer ? renderer() : '<div class="empty">Loading…</div>';
  window.scrollTo(0, 0);
}

/* ─── Theme + density preferences (persisted in localStorage) ─── */
const PREFS_KEY = 'aegisx.showcase.prefs';
function loadPrefs() {
  try { return JSON.parse(localStorage.getItem(PREFS_KEY)) || {}; }
  catch { return {}; }
}
function savePrefs(p) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch {}
}
function applyPrefs() {
  const p = loadPrefs();
  const root = document.documentElement;
  const theme = p.theme || 'dark';
  const density = p.density || 'compact';
  root.setAttribute('data-theme', theme);
  root.setAttribute('data-density', density);
  syncThemeIcon(theme);
  return { theme, density };
}
function syncThemeIcon(theme) {
  const dark = document.getElementById('theme-icon-dark');
  const light = document.getElementById('theme-icon-light');
  if (dark && light) {
    dark.hidden = theme === 'light';
    light.hidden = theme === 'dark';
  }
}
function setTheme(theme) {
  const p = loadPrefs();
  p.theme = theme;
  savePrefs(p);
  applyPrefs();
  // re-render settings tabs so the active button updates
  if (document.body.getAttribute('data-route') === 'settings') goRoute('settings');
}
function setDensity(density) {
  const p = loadPrefs();
  p.density = density;
  savePrefs(p);
  applyPrefs();
  if (document.body.getAttribute('data-route') === 'settings') goRoute('settings');
}
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  setTheme(cur === 'light' ? 'dark' : 'light');
}
function getPrefs() { return applyPrefs(); }

// Apply prefs as early as possible (before DOMContentLoaded) to avoid theme flash
applyPrefs();

/* Mount a phase builder into a target element using DOM nodes (no innerHTML).
   Strips the docs section header / .demo wrapper but keeps the rest as live nodes. */
function mountPhaseInto(targetId, builderName) {
  var target = document.getElementById(targetId);
  var fn = window.PHASE_BUILDERS && window.PHASE_BUILDERS[builderName];
  if (!target || typeof fn !== 'function') return;
  var node = fn();
  if (!node) return;
  var demos = node.querySelectorAll('.demo');
  target.replaceChildren();
  if (demos.length === 0) {
    node.querySelectorAll('.section__head, .subsection__title').forEach(function (el) { el.remove(); });
    target.appendChild(node);
    return;
  }
  for (var i = 0; i < demos.length; i++) {
    while (demos[i].firstChild) target.appendChild(demos[i].firstChild);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyPrefs();
  document.querySelectorAll('#sidebar-nav .his-sidebar__link').forEach(a => {
    a.addEventListener('click', e => { e.preventDefault(); goRoute(a.dataset.nav); });
  });
  goRoute('dashboard');
});
