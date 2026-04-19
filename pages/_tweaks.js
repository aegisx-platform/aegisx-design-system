/**
 * AegisX Design System — Tweaks controller
 * Live token overrides persisted to localStorage. Does NOT modify tokens.css.
 *
 * Mount by loading this script; it auto-injects the panel + FAB.
 * Keyboard: `T` toggles the panel (ignored when typing in inputs).
 */
(function () {
  'use strict';

  const LS_KEY = 'aegisx-ds-tweaks';

  // Brand presets — `indigo` matches production aegisx-ui (Material Indigo 500 → 200 → 300 …).
  // Other presets are alternative previews only.
  const BRANDS = {
    indigo:  { label: 'Indigo (production)',
               light: { faint:'#e8eaf6', muted:'#9fa8da', subtle:'#7986cb', default:'#3f51b5', emphasis:'#303f9f' },
               dark:  { faint:'#1a237e', muted:'#283593', subtle:'#303f9f', default:'#5c6bc0', emphasis:'#9fa8da' } },
    blue:    { label: 'Blue',
               light: { faint:'#eff6ff', muted:'#bfdbfe', subtle:'#93c5fd', default:'#2563eb', emphasis:'#1d4ed8' },
               dark:  { faint:'rgba(37,99,235,.14)', muted:'rgba(37,99,235,.24)', subtle:'rgba(37,99,235,.40)', default:'#60a5fa', emphasis:'#bfdbfe' } },
    emerald: { label: 'Emerald',
               light: { faint:'#ecfdf5', muted:'#a7f3d0', subtle:'#6ee7b7', default:'#059669', emphasis:'#047857' },
               dark:  { faint:'rgba(16,185,129,.14)', muted:'rgba(16,185,129,.24)', subtle:'rgba(16,185,129,.40)', default:'#34d399', emphasis:'#a7f3d0' } },
    cyan:    { label: 'Cyan',
               light: { faint:'#ecfeff', muted:'#a5f3fc', subtle:'#67e8f9', default:'#0891b2', emphasis:'#0e7490' },
               dark:  { faint:'rgba(8,145,178,.14)', muted:'rgba(8,145,178,.24)', subtle:'rgba(8,145,178,.40)', default:'#22d3ee', emphasis:'#a5f3fc' } },
    purple:  { label: 'Purple',
               light: { faint:'#faf5ff', muted:'#d8b4fe', subtle:'#c084fc', default:'#7e22ce', emphasis:'#6b21a8' },
               dark:  { faint:'rgba(126,34,206,.14)', muted:'rgba(126,34,206,.24)', subtle:'rgba(126,34,206,.40)', default:'#c084fc', emphasis:'#e9d5ff' } },
    rose:    { label: 'Rose',
               light: { faint:'#fff1f2', muted:'#fecdd3', subtle:'#fda4af', default:'#e11d48', emphasis:'#be123c' },
               dark:  { faint:'rgba(225,29,72,.14)', muted:'rgba(225,29,72,.24)', subtle:'rgba(225,29,72,.40)', default:'#fb7185', emphasis:'#fecdd3' } },
    amber:   { label: 'Amber',
               light: { faint:'#fffbeb', muted:'#fde68a', subtle:'#fcd34d', default:'#d97706', emphasis:'#b45309' },
               dark:  { faint:'rgba(217,119,6,.14)', muted:'rgba(217,119,6,.24)', subtle:'rgba(217,119,6,.40)', default:'#fbbf24', emphasis:'#fde68a' } },
    slate:   { label: 'Slate',
               light: { faint:'#f1f5f9', muted:'#cbd5e1', subtle:'#94a3b8', default:'#334155', emphasis:'#1e293b' },
               dark:  { faint:'rgba(51,65,85,.30)', muted:'rgba(51,65,85,.50)', subtle:'rgba(148,163,184,.40)', default:'#94a3b8', emphasis:'#e2e8f0' } }
  };

  const BRAND_ORDER = ['indigo','blue','emerald','cyan','purple','rose','amber','slate'];

  const FONT_STACKS = {
    plex:    "'IBM Plex Sans Thai', 'IBM Plex Sans', 'Noto Sans Thai', system-ui, sans-serif",
    noto:    "'Noto Sans Thai', 'IBM Plex Sans Thai', system-ui, sans-serif",
    inter:   "'Inter', 'Noto Sans Thai', system-ui, sans-serif",
    sarabun: "'Sarabun', 'Noto Sans Thai', system-ui, sans-serif"
  };
  const FONT_LABELS = { plex:'IBM Plex', noto:'Noto Sans Thai', inter:'Inter', sarabun:'Sarabun' };

  const FOCUS_COLORS = { blue:'#3b82f6', brand:null, amber:'#f59e0b' };
  const FOCUS_LABELS = { blue:'Blue', brand:'Brand', amber:'Amber' };

  const DEFAULTS = {
    theme: 'light', brand: 'indigo', density: 'comfortable',
    radius: 6, fontSize: 14, fontFamily: 'plex',
    elevation: 'soft', focusRing: 'blue'
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') el.className = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else if (k === 'dataset') Object.assign(el.dataset, attrs[k]);
      else if (k === 'style') el.style.cssText = attrs[k];
      else if (k === 'hidden' && attrs[k]) el.hidden = true;
      else el.setAttribute(k, attrs[k]);
    }
    if (children) for (const c of children) {
      if (c == null) continue;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  }
  function svg(d, extra) {
    const s = document.createElementNS(SVG_NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    (d || []).forEach(def => {
      const n = document.createElementNS(SVG_NS, def.tag);
      for (const k in def.attrs) n.setAttribute(k, def.attrs[k]);
      s.appendChild(n);
    });
    if (extra) Object.keys(extra).forEach(k => s.setAttribute(k, extra[k]));
    return s;
  }

  function loadFont(family) {
    if (family === 'plex') return;
    if (document.querySelector(`link[data-ax-font="${family}"]`)) return;
    const href = {
      noto:    'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap',
      inter:   'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      sarabun: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap'
    }[family];
    if (!href) return;
    const link = h('link', { rel: 'stylesheet', href: href });
    link.dataset.axFont = family;
    document.head.appendChild(link);
  }

  function buildSeg(key, options) {
    const wrap = h('div', { class: 'ax-tweaks__seg', dataset: { axTwSeg: key } });
    options.forEach(opt => {
      wrap.appendChild(h('button', { type: 'button', dataset: { val: opt.val }, text: opt.text }));
    });
    return wrap;
  }

  function buildSwatchRow(key, swatches) {
    const row = h('div', { class: 'ax-tweaks__color-row', dataset: { axTwSwatch: key } });
    swatches.forEach(s => {
      const sw = h('div', { class: 'ax-tweaks__swatch', dataset: { val: s.val }, style: 'background:' + s.color, title: s.title || s.val });
      row.appendChild(sw);
    });
    return row;
  }

  function buildGroup(labelText, labelKey, control) {
    const label = h('div', { class: 'ax-tweaks__label' }, [
      labelText + ' ',
      h('span', { class: 'ax-tweaks__label-val', dataset: { axTwOut: labelKey } })
    ]);
    return h('div', { class: 'ax-tweaks__group' }, [label, control]);
  }

  function buildSlider(key, min, max, step, value) {
    return h('input', { type: 'range', class: 'ax-tweaks__slider',
      dataset: { axTwSlider: key }, min: min, max: max, step: step, value: value });
  }

  function buildPanel() {
    const closeSvg = svg([
      { tag: 'line', attrs: { x1:'18', y1:'6', x2:'6', y2:'18' } },
      { tag: 'line', attrs: { x1:'6',  y1:'6', x2:'18', y2:'18' } }
    ]);
    const closeBtn = h('button', { type: 'button', class: 'ax-tweaks__close', 'aria-label': 'Close', dataset: { axTw: 'close' } }, [closeSvg]);

    const header = h('div', { class: 'ax-tweaks__header' }, [
      h('div', { class: 'ax-tweaks__title', text: 'Tweaks' }),
      closeBtn
    ]);

    const body = h('div', { class: 'ax-tweaks__body' }, [
      buildGroup('Theme', 'theme', buildSeg('theme', [
        { val: 'light', text: 'Light' },
        { val: 'dark',  text: 'Dark'  }
      ])),

      buildGroup('Brand color', 'brand', buildSwatchRow('brand', BRAND_ORDER.map(k => ({
        val: k, color: BRANDS[k].light.default, title: BRANDS[k].label
      })))),

      buildGroup('Density', 'density', buildSeg('density', [
        { val: 'compact',     text: 'Compact' },
        { val: 'comfortable', text: 'Default' },
        { val: 'spacious',    text: 'Spacious' }
      ])),

      buildGroup('Radius',         'radius',     buildSlider('radius', 0, 16, 1, 6)),
      buildGroup('Base font size', 'fontSize',   buildSlider('fontSize', 12, 17, 1, 14)),

      buildGroup('Font family', 'fontFamily', buildSeg('fontFamily', [
        { val: 'plex',    text: 'Plex'    },
        { val: 'noto',    text: 'Noto'    },
        { val: 'inter',   text: 'Inter'   },
        { val: 'sarabun', text: 'Sarabun' }
      ])),

      buildGroup('Elevation', 'elevation', h('div', {}, [
        buildSeg('elevation', [
          { val: 'flat',   text: 'Flat'   },
          { val: 'soft',   text: 'Soft'   },
          { val: 'strong', text: 'Strong' }
        ]),
        h('div', { class: 'ax-tweaks__shadow-preview' }, [
          h('div', { class: 'ax-tweaks__shadow-tile', dataset: { shadow: 'sm' }, text: 'sm' }),
          h('div', { class: 'ax-tweaks__shadow-tile', dataset: { shadow: 'md' }, text: 'md' }),
          h('div', { class: 'ax-tweaks__shadow-tile', dataset: { shadow: 'lg' }, text: 'lg' })
        ])
      ])),

      buildGroup('Focus ring', 'focusRing', buildSwatchRow('focusRing', [
        { val: 'blue',  color: '#3b82f6' },
        { val: 'brand', color: '#3f51b5' },
        { val: 'amber', color: '#f59e0b' }
      ]))
    ]);

    const resetBtn = h('button', {
      type: 'button', class: 'ax-tweaks__btn ax-tweaks__btn--ghost',
      dataset: { axTw: 'reset' }, text: 'Reset defaults'
    });
    const actions = h('div', { class: 'ax-tweaks__actions' }, [resetBtn]);
    const footer = h('div', { class: 'ax-tweaks__footer' }, [
      'Live preview · saved to localStorage'
    ]);

    return h('aside', { id: 'ax-tweaks', class: 'ax-tweaks', hidden: true }, [header, body, actions, footer]);
  }

  function buildFab() {
    const gearSvg = svg([
      { tag: 'circle', attrs: { cx:'12', cy:'12', r:'3' } },
      { tag: 'path',   attrs: { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' } }
    ]);
    return h('button', {
      id: 'ax-tweaks-fab', type: 'button', class: 'ax-tweaks-fab',
      title: 'Tweaks (T)', 'aria-label': 'Open tweaks panel'
    }, [gearSvg]);
  }

  // Whitelists — anything outside these is dropped on load so tampered localStorage can't flow
  // into CSS selectors, setAttribute values, or getComputedStyle callsites.
  const WHITELIST = {
    theme:      ['light', 'dark'],
    brand:      Object.keys(BRANDS),
    density:    ['compact', 'comfortable', 'spacious'],
    fontFamily: Object.keys(FONT_STACKS),
    elevation:  ['flat', 'soft', 'strong'],
    focusRing:  Object.keys(FOCUS_COLORS)
  };
  function sanitize(raw) {
    const clean = {};
    for (const key of Object.keys(DEFAULTS)) {
      const v = raw[key];
      if (v == null) continue;
      if (WHITELIST[key]) {
        if (WHITELIST[key].includes(v)) clean[key] = v;
      } else if (key === 'radius') {
        const n = Number(v);
        if (Number.isFinite(n) && n >= 0 && n <= 16) clean[key] = n;
      } else if (key === 'fontSize') {
        const n = Number(v);
        if (Number.isFinite(n) && n >= 12 && n <= 17) clean[key] = n;
      }
    }
    return clean;
  }

  let state = Object.assign({}, DEFAULTS);
  try {
    const stored = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    state = Object.assign({}, DEFAULTS, sanitize(stored));
  } catch (e) { /* noop */ }

  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }

  function apply() {
    const root = document.documentElement;
    root.setAttribute('data-theme', state.theme);
    root.setAttribute('data-density', state.density);
    root.setAttribute('data-elevation', state.elevation);

    const brand = BRANDS[state.brand] || BRANDS.indigo;
    const tone = state.theme === 'dark' ? brand.dark : brand.light;
    root.style.setProperty('--ax-brand-faint', tone.faint);
    root.style.setProperty('--ax-brand-muted', tone.muted);
    root.style.setProperty('--ax-brand-subtle', tone.subtle);
    root.style.setProperty('--ax-brand-default', tone.default);
    root.style.setProperty('--ax-brand-emphasis', tone.emphasis);
    root.style.setProperty('--ax-primary', tone.default);
    root.style.setProperty('--ax-primary-light', tone.subtle);
    root.style.setProperty('--ax-primary-dark', tone.emphasis);

    const r = Number(state.radius ?? 6);
    root.style.setProperty('--ax-radius-sm', Math.max(0, r - 2) + 'px');
    root.style.setProperty('--ax-radius-md', r + 'px');
    root.style.setProperty('--ax-radius-lg', (r + 2) + 'px');
    root.style.setProperty('--ax-radius-xl', (r + 6) + 'px');
    root.style.setProperty('--ax-radius-2xl', (r + 10) + 'px');

    // Only override font size when different from default — lets tokens.css win after reset.
    const fs = Number(state.fontSize ?? 14);
    if (fs !== DEFAULTS.fontSize) {
      root.style.setProperty('--ax-text-sm-size', fs + 'px');
      root.style.setProperty('--ax-text-sm-line', Math.round(fs * 1.5) + 'px');
    } else {
      root.style.removeProperty('--ax-text-sm-size');
      root.style.removeProperty('--ax-text-sm-line');
    }

    const fam = FONT_STACKS[state.fontFamily] || FONT_STACKS.plex;
    root.style.setProperty('--ax-font-sans', fam);
    loadFont(state.fontFamily);

    let focus = FOCUS_COLORS[state.focusRing];
    if (state.focusRing === 'brand') {
      focus = getComputedStyle(root).getPropertyValue('--ax-brand-default').trim() || tone.default;
    }
    if (focus) {
      root.style.setProperty('--ax-border-focus', focus);
      root.style.setProperty('--ax-focus-ring-color', focus);
    }

    // Elevation — rewrite --ax-shadow-* so BOTH ax-card AND mat-card/menu/dialog respond
    // (mat-sys-level* bridges to ax-shadow-* in aegisx-material-bridge.scss).
    const SHADOWS = {
      flat: {
        xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'none'
      },
      strong: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.12)',
        sm: '0 2px 4px -1px rgb(0 0 0 / 0.14), 0 1px 3px -1px rgb(0 0 0 / 0.18)',
        md: '0 8px 12px -2px rgb(0 0 0 / 0.18), 0 4px 6px -2px rgb(0 0 0 / 0.14)',
        lg: '0 16px 24px -4px rgb(0 0 0 / 0.20), 0 6px 10px -4px rgb(0 0 0 / 0.16)',
        xl: '0 28px 40px -8px rgb(0 0 0 / 0.28), 0 10px 16px -6px rgb(0 0 0 / 0.18)'
      }
    };
    const shadowKeys = ['xs','sm','md','lg','xl'];
    if (state.elevation === 'soft') {
      shadowKeys.forEach(k => root.style.removeProperty('--ax-shadow-' + k));
    } else {
      const preset = SHADOWS[state.elevation] || SHADOWS.flat;
      shadowKeys.forEach(k => root.style.setProperty('--ax-shadow-' + k, preset[k]));
    }

    document.querySelectorAll('[data-ax-tw-seg]').forEach(seg => {
      const key = seg.getAttribute('data-ax-tw-seg');
      seg.querySelectorAll('button').forEach(b => b.classList.toggle('is-active', b.dataset.val === String(state[key])));
    });
    document.querySelectorAll('[data-ax-tw-swatch]').forEach(row => {
      const key = row.getAttribute('data-ax-tw-swatch');
      row.querySelectorAll('.ax-tweaks__swatch').forEach(s => s.classList.toggle('is-active', s.dataset.val === String(state[key])));
    });
    document.querySelectorAll('[data-ax-tw-slider]').forEach(s => {
      const key = s.getAttribute('data-ax-tw-slider');
      if (state[key] != null) s.value = state[key];
    });

    setOut('theme', state.theme);
    setOut('brand', (BRANDS[state.brand] || BRANDS.indigo).label);
    setOut('density', state.density);
    setOut('radius', r + 'px · ' + (r / 16).toFixed(3).replace(/0+$/, '').replace(/\.$/, '') + 'rem');
    setOut('fontSize', fs + 'px');
    setOut('fontFamily', FONT_LABELS[state.fontFamily] || '');
    setOut('elevation', state.elevation);
    setOut('focusRing', FOCUS_LABELS[state.focusRing] || '');

    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.setTheme === state.theme));
    });
  }

  function setOut(key, text) {
    document.querySelectorAll(`[data-ax-tw-out="${key}"]`).forEach(e => { e.textContent = text; });
  }

  function update(partial) { Object.assign(state, partial); apply(); save(); }

  function reset() {
    state = Object.assign({}, DEFAULTS);
    try { localStorage.removeItem(LS_KEY); } catch (e) {}
    ['--ax-brand-faint','--ax-brand-muted','--ax-brand-subtle','--ax-brand-default','--ax-brand-emphasis',
     '--ax-primary','--ax-primary-light','--ax-primary-dark',
     '--ax-radius-sm','--ax-radius-md','--ax-radius-lg','--ax-radius-xl','--ax-radius-2xl',
     '--ax-text-sm-size','--ax-text-sm-line','--ax-font-sans',
     '--ax-border-focus','--ax-focus-ring-color',
     '--ax-shadow-xs','--ax-shadow-sm','--ax-shadow-md','--ax-shadow-lg','--ax-shadow-xl'
    ].forEach(p => document.documentElement.style.removeProperty(p));
    apply();
  }

  function wire(panel, fab) {
    panel.addEventListener('click', ev => {
      const act = ev.target.closest('[data-ax-tw]');
      if (act && act.dataset.axTw === 'close') { panel.hidden = true; fab.hidden = false; return; }
      if (act && act.dataset.axTw === 'reset') { ev.preventDefault(); reset(); return; }

      const segBtn = ev.target.closest('[data-ax-tw-seg] button');
      if (segBtn) {
        const key = segBtn.parentElement.getAttribute('data-ax-tw-seg');
        update({ [key]: segBtn.dataset.val });
        return;
      }
      const swatch = ev.target.closest('[data-ax-tw-swatch] .ax-tweaks__swatch');
      if (swatch) {
        const key = swatch.parentElement.getAttribute('data-ax-tw-swatch');
        update({ [key]: swatch.dataset.val });
      }
    });

    panel.addEventListener('input', ev => {
      const slider = ev.target.closest('[data-ax-tw-slider]');
      if (slider) update({ [slider.getAttribute('data-ax-tw-slider')]: Number(slider.value) });
    });

    fab.addEventListener('click', () => { panel.hidden = false; fab.hidden = true; });

    document.querySelectorAll('[data-set-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.setTheme;
        if (mode === 'auto') { document.documentElement.removeAttribute('data-theme'); return; }
        update({ theme: mode });
      });
    });

    document.addEventListener('keydown', ev => {
      if (ev.key !== 't' && ev.key !== 'T') return;
      if (ev.target.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
      const wasHidden = panel.hidden;
      panel.hidden = !wasHidden;
      fab.hidden = wasHidden;
    });
  }

  function init() {
    let panel = document.getElementById('ax-tweaks');
    if (!panel) { panel = buildPanel(); document.body.appendChild(panel); }
    let fab = document.getElementById('ax-tweaks-fab');
    if (!fab) { fab = buildFab(); document.body.appendChild(fab); }
    wire(panel, fab);
    apply();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
