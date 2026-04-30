/* ═══════════════════════════════════════════════════════════════
   AegisX Design System — App controller
   · theme + tweaks + persistence
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const LS_KEY = 'aegisx-ds-tweaks';

  const BRANDS = {
    indigo:  {faint:'#e8eaf6', muted:'#c5cae9', subtle:'#9fa8da', default:'#3f51b5', emphasis:'#303f9f',
              darkFaint:'rgba(63, 81, 181, 0.12)', darkMuted:'rgba(63, 81, 181, 0.22)', darkSubtle:'rgba(63, 81, 181, 0.36)', darkDefault:'#7986cb', darkEmphasis:'#c5cae9'},
    blue:    {faint:'#eff6ff', muted:'#dbeafe', subtle:'#93c5fd', default:'#2563eb', emphasis:'#1d4ed8',
              darkFaint:'rgba(37, 99, 235, 0.14)', darkMuted:'rgba(37, 99, 235, 0.24)', darkSubtle:'rgba(37, 99, 235, 0.40)', darkDefault:'#60a5fa', darkEmphasis:'#bfdbfe'},
    emerald: {faint:'#ecfdf5', muted:'#d1fae5', subtle:'#6ee7b7', default:'#059669', emphasis:'#047857',
              darkFaint:'rgba(16, 185, 129, 0.14)', darkMuted:'rgba(16, 185, 129, 0.24)', darkSubtle:'rgba(16, 185, 129, 0.40)', darkDefault:'#34d399', darkEmphasis:'#a7f3d0'},
    cyan:    {faint:'#ecfeff', muted:'#cffafe', subtle:'#67e8f9', default:'#0891b2', emphasis:'#0e7490',
              darkFaint:'rgba(8, 145, 178, 0.14)', darkMuted:'rgba(8, 145, 178, 0.24)', darkSubtle:'rgba(8, 145, 178, 0.40)', darkDefault:'#22d3ee', darkEmphasis:'#a5f3fc'},
    purple:  {faint:'#faf5ff', muted:'#e9d5ff', subtle:'#c084fc', default:'#7e22ce', emphasis:'#6b21a8',
              darkFaint:'rgba(126, 34, 206, 0.14)', darkMuted:'rgba(126, 34, 206, 0.24)', darkSubtle:'rgba(126, 34, 206, 0.40)', darkDefault:'#c084fc', darkEmphasis:'#e9d5ff'},
    rose:    {faint:'#fff1f2', muted:'#ffe4e6', subtle:'#fda4af', default:'#e11d48', emphasis:'#be123c',
              darkFaint:'rgba(225, 29, 72, 0.14)', darkMuted:'rgba(225, 29, 72, 0.24)', darkSubtle:'rgba(225, 29, 72, 0.40)', darkDefault:'#fb7185', darkEmphasis:'#fecdd3'},
    amber:   {faint:'#fffbeb', muted:'#fef3c7', subtle:'#fcd34d', default:'#d97706', emphasis:'#b45309',
              darkFaint:'rgba(217, 119, 6, 0.14)', darkMuted:'rgba(217, 119, 6, 0.24)', darkSubtle:'rgba(217, 119, 6, 0.40)', darkDefault:'#fbbf24', darkEmphasis:'#fde68a'},
    slate:   {faint:'#f8fafc', muted:'#e2e8f0', subtle:'#94a3b8', default:'#334155', emphasis:'#1e293b',
              darkFaint:'rgba(51, 65, 85, 0.30)', darkMuted:'rgba(51, 65, 85, 0.50)', darkSubtle:'rgba(148, 163, 184, 0.40)', darkDefault:'#94a3b8', darkEmphasis:'#e2e8f0'}
  };

  const BRAND_LABELS = {indigo:'Indigo', blue:'Blue', emerald:'Emerald', cyan:'Cyan', purple:'Purple', rose:'Rose', amber:'Amber', slate:'Slate'};

  const FOCUS_COLORS = { blue: '#3b82f6', brand: null /* dynamic */, amber: '#f59e0b' };
  const FOCUS_LABELS = { blue: 'Blue', brand: 'Brand', amber: 'Amber' };

  const FONT_STACKS = {
    plex:    "'IBM Plex Sans Thai', 'Noto Sans Thai', system-ui, sans-serif",
    noto:    "'Noto Sans Thai', 'IBM Plex Sans Thai', system-ui, sans-serif",
    inter:   "'Inter', 'Noto Sans Thai', system-ui, sans-serif",
    sarabun: "'Sarabun', 'Noto Sans Thai', system-ui, sans-serif"
  };
  const FONT_LABELS = { plex:'IBM Plex', noto:'Noto Sans Thai', inter:'Inter', sarabun:'Sarabun' };

  // Load extra fonts lazily
  function loadFont(family) {
    if (document.querySelector(`link[data-font="${family}"]`)) return;
    const links = {
      noto:    'family=Noto+Sans+Thai:wght@300;400;500;600;700',
      inter:   'family=Inter:wght@400;500;600;700',
      sarabun: 'family=Sarabun:wght@300;400;500;600;700'
    };
    if (!links[family]) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = `https://fonts.googleapis.com/css2?${links[family]}&display=swap`;
    l.dataset.font = family;
    document.head.appendChild(l);
  }

  // Load from localStorage, fallback to TWEAK_DEFAULTS
  const defaults = window.TWEAK_DEFAULTS || {};
  let state;
  try {
    state = Object.assign({}, defaults, JSON.parse(localStorage.getItem(LS_KEY) || '{}'));
  } catch (e) {
    state = Object.assign({}, defaults);
  }

  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
    // also tell the host (for persistence across reload)
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: state }, '*');
    } catch (e) {}
  }

  function apply() {
    const root = document.documentElement;
    // Theme
    root.setAttribute('data-theme', state.theme || 'light');
    // Density
    root.setAttribute('data-density', state.density || 'compact');
    // Elevation
    root.setAttribute('data-elevation', state.elevation || 'soft');

    // Brand
    const brand = BRANDS[state.brand] || BRANDS.indigo;
    const isDark = (state.theme === 'dark');
    root.style.setProperty('--ax-brand-faint',    isDark ? brand.darkFaint    : brand.faint);
    root.style.setProperty('--ax-brand-muted',    isDark ? brand.darkMuted    : brand.muted);
    root.style.setProperty('--ax-brand-subtle',   isDark ? brand.darkSubtle   : brand.subtle);
    root.style.setProperty('--ax-brand-default',  isDark ? brand.darkDefault  : brand.default);
    root.style.setProperty('--ax-brand-emphasis', isDark ? brand.darkEmphasis : brand.emphasis);

    // Radius
    const rPx = Number(state.radius ?? 6);
    root.style.setProperty('--ax-radius-sm', Math.max(0, rPx - 2) + 'px');
    root.style.setProperty('--ax-radius-md', rPx + 'px');
    root.style.setProperty('--ax-radius-lg', (rPx + 2) + 'px');
    root.style.setProperty('--ax-radius-xl', (rPx + 6) + 'px');
    root.style.setProperty('--ax-radius-2xl', (rPx + 10) + 'px');

    // Font size
    const fs = Number(state.fontSize ?? 14);
    root.style.setProperty('--ax-text-base', fs + 'px');
    root.style.setProperty('--ax-text-sm', fs + 'px');
    root.style.setProperty('--ax-lh-sm', Math.round(fs * 1.5) + 'px');

    // Font family
    const fam = FONT_STACKS[state.fontFamily || 'plex'];
    if (fam) root.style.setProperty('--ax-font-base', fam);
    if (state.fontFamily) loadFont(state.fontFamily);

    // Focus ring
    const fc = FOCUS_COLORS[state.focusRing || 'blue'];
    const focusColor = state.focusRing === 'brand' ? getComputedStyle(root).getPropertyValue('--ax-brand-default').trim() : fc;
    if (focusColor) root.style.setProperty('--ax-border-focus', focusColor);

    // Update UI reflections
    document.querySelectorAll('#themeSeg button').forEach(b => b.classList.toggle('is-active', b.dataset.theme === state.theme));
    setActive('#tw_theme button',    'val', state.theme);
    setActive('#tw_density button',  'val', state.density);
    setActive('#tw_fontfam button',  'val', state.fontFamily);
    setActive('#tw_elev button',     'val', state.elevation);
    setActive('#tw_brand .tweaks__swatch', 'val', state.brand);
    setActive('#tw_focus .tweaks__swatch', 'val', state.focusRing);

    setText('tw_themeVal',    state.theme);
    setText('tw_densityVal',  state.density);
    setText('tw_fontfamVal',  FONT_LABELS[state.fontFamily] || '');
    setText('tw_brandVal',    BRAND_LABELS[state.brand] || '');
    setText('tw_focusVal',    FOCUS_LABELS[state.focusRing] || '');
    setText('tw_radiusVal',   (rPx / 16).toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + 'rem · ' + rPx + 'px');
    setText('tw_fontVal',     fs + 'px');

    const rs = document.getElementById('tw_radius'); if (rs) rs.value = rPx;
    const fss = document.getElementById('tw_font');  if (fss) fss.value = fs;
  }

  function setActive(selector, key, value) {
    document.querySelectorAll(selector).forEach(b => {
      b.classList.toggle('is-active', b.dataset[key] === value);
    });
  }
  function setText(id, t) {
    const e = document.getElementById(id);
    if (e) e.textContent = t;
  }

  function set(partial) {
    Object.assign(state, partial);
    apply();
    save();
  }

  // Wire controls
  function wire() {
    // Topbar theme segmented
    document.querySelectorAll('#themeSeg button').forEach(b => {
      b.addEventListener('click', () => set({ theme: b.dataset.theme }));
    });

    // Tweaks panel
    segWire('#tw_theme', v => set({ theme: v }));
    segWire('#tw_density', v => set({ density: v }));
    segWire('#tw_fontfam', v => set({ fontFamily: v }));
    segWire('#tw_elev', v => set({ elevation: v }));

    swatchWire('#tw_brand', v => set({ brand: v }));
    swatchWire('#tw_focus', v => set({ focusRing: v }));

    const r = document.getElementById('tw_radius');
    if (r) r.addEventListener('input', e => set({ radius: Number(e.target.value) }));
    const f = document.getElementById('tw_font');
    if (f) f.addEventListener('input', e => set({ fontSize: Number(e.target.value) }));

    // Keyboard shortcut — T to toggle tweaks panel
    document.addEventListener('keydown', e => {
      if (e.target.matches('input, textarea, select')) return;
      if (e.key === 't' || e.key === 'T') {
        const t = document.getElementById('tweaks');
        t.hidden = !t.hidden;
      }
    });

    // Sidebar active-link highlight on scroll
    const links = document.querySelectorAll('.sidebar__link');
    const map = new Map();
    links.forEach(l => {
      const id = l.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) map.set(target, l);
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(l => l.classList.remove('is-active'));
          const a = map.get(en.target);
          if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    map.forEach((_, target) => io.observe(target));

    // Smooth scroll
    links.forEach(l => {
      l.addEventListener('click', e => {
        e.preventDefault();
        const id = l.getAttribute('href').slice(1);
        const t = document.getElementById(id);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function segWire(sel, cb) {
    document.querySelectorAll(`${sel} button`).forEach(b => {
      b.addEventListener('click', () => cb(b.dataset.val));
    });
  }
  function swatchWire(sel, cb) {
    document.querySelectorAll(`${sel} .tweaks__swatch`).forEach(s => {
      s.addEventListener('click', () => cb(s.dataset.val));
    });
  }

  // Host edit-mode handshake (optional)
  window.addEventListener('message', e => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === '__activate_edit_mode') {
      document.getElementById('tweaks').hidden = false;
    } else if (e.data.type === '__deactivate_edit_mode') {
      document.getElementById('tweaks').hidden = true;
    }
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}

  // Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { wire(); apply(); });
  } else {
    wire(); apply();
  }
})();
