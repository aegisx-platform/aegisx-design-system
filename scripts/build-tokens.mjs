#!/usr/bin/env node
/**
 * Generate tokens/css/tokens.css from tokens/dtcg/*.json.
 *
 * - Palette, spacing, radius, border-width, shadow, motion, breakpoint,
 *   z-index, component values come from DTCG JSON.
 * - Role palette variants and component-token layer are config here.
 *
 * Usage:
 *   pnpm tokens:build      → writes tokens/css/tokens.css
 *   pnpm tokens:verify     → diffs against tokens/css/tokens.css (CI gate)
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const dtcg = resolve(root, 'tokens/dtcg');
const out = resolve(root, process.env.AX_OUT ?? 'tokens/css/tokens.css');

const read = (name) => JSON.parse(readFileSync(resolve(dtcg, name), 'utf8'));

const color      = read('color.json').color;
const spacing    = read('spacing.json').spacing;
const typography = read('typography.json').typography;
const radius     = read('radius.json').radius;
const border     = read('border-width.json').borderWidth;
const shadow     = read('shadow.json');
const motion     = read('motion.json');
const breakpoint = read('breakpoint.json');
const zIndex     = read('z-index.json').zIndex;
const component  = read('component.json');

// ─── helpers ──────────────────────────────────────────────────
const REF_RE = /^\{([^}]+)\}$/;
const getPath = (obj, path) => path.split('.').reduce((o, k) => o && o[k], obj);
const resolveRef = (root, value) => {
  if (typeof value !== 'string') return value;
  const m = value.match(REF_RE);
  if (!m) return value;
  const target = getPath(root, m[1]);
  if (target === undefined) throw new Error(`Unresolved ref: ${m[1]}`);
  return resolveRef(root, target.$value ?? target);
};

// ─── role palette mapping ─────────────────────────────────────
// Brand = Material Indigo (hardcoded hex because the palette steps don't map
// to simple 50/100/200/500/700 like Tailwind).
// Success = Emerald (not Green).
const ROLE_PALETTES = {
  brand:   'indigo',
  success: 'emerald',
  warning: 'amber',
  error:   'red',
  info:    'blue',
};

// Brand light/dark — hardcoded from production _aegisx-tokens.scss
// because Material Indigo palette steps ≠ Tailwind convention
const BRAND_LIGHT = {
  faint: '#e8eaf6', muted: '#9fa8da', subtle: '#7986cb',
  default: '#3f51b5', emphasis: '#303f9f', inverted: '#ffffff',
};
const BRAND_DARK = {
  faint: '#1a237e', muted: '#283593', subtle: '#303f9f',
  default: '#5c6bc0', emphasis: '#9fa8da', inverted: '#1a237e',
};

// ─── semantic resolution helpers ──────────────────────────────
const toCssVar = (value) => {
  if (typeof value !== 'string') return value;
  const m = value.match(REF_RE);
  if (!m) return value;
  const parts = m[1].split('.');
  if (parts[0] === 'color' && parts[1] === 'palette') {
    return `var(--ax-color-${parts[2]}-${parts[3]})`;
  }
  return value;
};
const resolveSemanticBg = (theme, key) =>
  toCssVar(color.semantic[theme].background[key].$value);
const resolveSemanticText = (theme, key) =>
  toCssVar(color.semantic[theme].text[key].$value);
const resolveSemanticBorder = (theme, key) =>
  toCssVar(color.semantic[theme].border[key].$value);
const resolveSemanticPrimary = (theme, key) =>
  toCssVar(color.semantic[theme].primary[key].$value);

// ─── emitters ─────────────────────────────────────────────────
let lines = [];
const push = (...l) => lines.push(...l);

push(
  '/**',
  ' * AegisX Design Tokens — AUTO-GENERATED',
  ' * Source: tokens/dtcg/*.json  ·  Generator: scripts/build-tokens.mjs',
  ' * Do not edit directly — edit the JSON and run `pnpm tokens:build`.',
  ' *',
  ' * 3-layer architecture:',
  ' *   1. PRIMITIVE --ax-color-*   2. SEMANTIC --ax-{role}-*   3. COMPONENT --ax-{comp}-*',
  ' */',
  '',
  ':root {',
);

// Layer 1 — palette
push('  /* ── Layer 1 · Primitive palette ── */');
for (const [hue, shades] of Object.entries(color.palette)) {
  for (const [step, entry] of Object.entries(shades)) {
    if (step.startsWith('$')) continue; // skip $description
    push(`  --ax-color-${hue}-${step}: ${entry.$value};`);
  }
  push('');
}

// Layer 2 — semantic (light)
push('  /* ── Layer 2 · Semantic (light defaults) ── */');
push('  /* Background */');
for (const k of ['page','default','subtle','muted','emphasis']) {
  push(`  --ax-background-${k}: ${resolveSemanticBg('light', k)};`);
}
push('  /* Text */');
for (const k of ['disabled','subtle','secondary','default','strong','heading','inverted']) {
  push(`  --ax-text-${k}: ${resolveSemanticText('light', k)};`);
}
push('  /* Border */');
for (const k of ['subtle','default','emphasis']) {
  push(`  --ax-border-${k}: ${resolveSemanticBorder('light', k)};`);
}
push('  /* Primary (brand — Material Indigo) */');
for (const k of ['light','default','dark']) {
  const v = resolveSemanticPrimary('light', k);
  push(`  --ax-primary${k === 'default' ? '' : '-' + k}: ${v};`);
}

// Role palettes (light)
push('  /* Role palettes × 6 variants */');
// Brand — hardcoded Material Indigo values
for (const [variant, hex] of Object.entries(BRAND_LIGHT)) {
  push(`  --ax-brand-${variant}:${variant.length <= 5 ? '    ' : ' '}${hex};`);
}
// Other roles — use palette refs
for (const [role, hue] of Object.entries(ROLE_PALETTES)) {
  if (role === 'brand') continue;
  // Production faint values are specific (not always 50)
  const faintOverrides = {
    success: '#d1fae5',  // emerald-100
    warning: '#fef3c7',  // amber-100
    error:   '#fee2e2',  // red-100
    info:    '#dbeafe',  // blue-100
  };
  push(`  --ax-${role}-faint:    ${faintOverrides[role] ?? `var(--ax-color-${hue}-50)`};`);
  push(`  --ax-${role}-muted:    var(--ax-color-${hue}-100);`);
  push(`  --ax-${role}-subtle:   var(--ax-color-${hue}-200);`);
  push(`  --ax-${role}-default:  var(--ax-color-${hue}-500);`);
  push(`  --ax-${role}-emphasis: var(--ax-color-${hue}-700);`);
  push(`  --ax-${role}-inverted: #ffffff;`);
}

// Surface & role border tokens
push('  /* Surface / role border */');
push(`  --ax-info-surface: ${component.surface.info.$value};`);
push(`  --ax-info-border: ${component.roleBorder.info.$value};`);
push(`  --ax-warning-surface: ${component.surface.warning.$value};`);
push(`  --ax-warning-border: ${component.roleBorder.warning.$value};`);
push(`  --ax-success-surface: ${component.surface.success.$value};`);
push(`  --ax-success-border: ${component.roleBorder.success.$value};`);
push(`  --ax-error-surface: ${component.surface.error.$value};`);
push(`  --ax-error-border: ${component.roleBorder.error.$value};`);

// Layer 3 — component tokens (light)
push('');
push('  /* ── Layer 3 · Component tokens ── */');
push('  /* Navigation */');
push(`  --ax-nav-bg: #ffffff;`);
push(`  --ax-nav-text: var(--ax-color-zinc-600);`);
push(`  --ax-nav-text-hover: var(--ax-color-zinc-900);`);
push(`  --ax-nav-text-active: var(--ax-color-indigo-600);`);
push(`  --ax-nav-bg-active: var(--ax-color-indigo-50);`);
push(`  --ax-nav-border: var(--ax-border-subtle);`);
push('  /* Table */');
push(`  --ax-table-header-bg: var(--ax-background-muted);`);
push(`  --ax-table-header-text: var(--ax-text-secondary);`);
push(`  --ax-table-row-hover-bg: var(--ax-background-muted);`);
push(`  --ax-table-cell-border: var(--ax-border-default);`);
push(`  --ax-table-cell-text: var(--ax-text-default);`);
push('  /* Button */');
push(`  --ax-button-primary-bg: var(--ax-primary);`);
push(`  --ax-button-primary-bg-hover: var(--ax-primary-dark);`);
push(`  --ax-button-primary-text: #ffffff;`);
push(`  --ax-button-secondary-bg: #ffffff;`);
push(`  --ax-button-secondary-bg-hover: var(--ax-background-muted);`);
push(`  --ax-button-secondary-text: var(--ax-text-default);`);
push(`  --ax-button-secondary-border: var(--ax-border-default);`);
push(`  --ax-button-danger-bg: var(--ax-error-default);`);
push(`  --ax-button-danger-bg-hover: var(--ax-error-emphasis);`);
push('  /* Input */');
push(`  --ax-input-bg: #ffffff;`);
push(`  --ax-input-bg-disabled: var(--ax-background-muted);`);
push(`  --ax-input-text: var(--ax-text-heading);`);
push(`  --ax-input-placeholder: var(--ax-text-subtle);`);
push(`  --ax-input-border: var(--ax-border-default);`);
push(`  --ax-input-border-hover: var(--ax-border-emphasis);`);
push(`  --ax-input-border-focus: var(--ax-primary);`);
push(`  --ax-input-border-error: var(--ax-error-default);`);
push('  /* Focus ring */');
push(`  --ax-focus-ring-width: ${component.focusRing.width.$value};`);
push(`  --ax-focus-ring-offset: ${component.focusRing.offset.$value};`);
push(`  --ax-focus-ring-opacity: ${component.focusRing.opacity.$value};`);
push(`  --ax-focus-ring-color: ${shadow.focusRing.color.$value};`);

// Form control sizing (density-aware — default = md, [data-density] swaps)
push('  /* Control sizing (density-default) */');
push(`  --ax-control-h: ${component.control.height.md.$value};`);
push(`  --ax-control-h-sm: ${component.control.height.sm.$value};`);
push(`  --ax-control-h-lg: ${component.control.height.lg.$value};`);
push(`  --ax-control-pad-x: ${component.control.paddingX.md.$value};`);
push(`  --ax-control-pad-y: ${component.control.paddingY.md.$value};`);
push(`  --ax-control-gap: ${component.control.gap.md.$value};`);
push(`  --ax-control-icon: ${component.control.iconSize.md.$value};`);

// Form layout
push('  /* Form layout */');
push(`  --ax-form-gap-dense: ${component.form.gap.dense.$value};`);
push(`  --ax-form-gap-default: ${component.form.gap.default.$value};`);
push(`  --ax-form-gap-relaxed: ${component.form.gap.relaxed.$value};`);
push(`  --ax-form-section-gap: ${component.form.sectionGap.$value};`);
push(`  --ax-form-card-padding: ${component.form.cardPadding.$value};`);

// State layers
push('  /* State layers (M3) */');
push(`  --ax-state-hover-opacity: ${component.state.hover.$value};`);
push(`  --ax-state-focus-opacity: ${component.state.focus.$value};`);
push(`  --ax-state-pressed-opacity: ${component.state.pressed.$value};`);
push(`  --ax-state-dragged-opacity: ${component.state.dragged.$value};`);

// Opacity
push('  /* Opacity */');
push(`  --ax-opacity-disabled: ${component.opacity.disabled.$value};`);
push(`  --ax-opacity-hover: ${component.opacity.hover.$value};`);
push(`  --ax-opacity-active: ${component.opacity.active.$value};`);
push('');

// Spacing
push('  /* ── Spacing (4px grid) ── */');
for (const [k, entry] of Object.entries(spacing)) {
  if (typeof entry.$value === 'string') {
    push(`  --ax-spacing-${k}: ${entry.$value};`);
  }
}
for (const group of ['component','layout','inset','stack']) {
  if (!spacing[group]) continue;
  for (const [k, entry] of Object.entries(spacing[group])) {
    const resolved = entry.$value;
    const m = String(resolved).match(REF_RE);
    const val = m ? `var(--ax-spacing-${m[1].split('.').pop()})` : resolved;
    push(`  --ax-${group}-${k}: ${val};`);
  }
}
push('');

// Typography
push('  /* ── Typography ── */');
push(`  --ax-font-sans: ${typography.fontFamily.sans.$value};`);
push(`  --ax-font-serif: ${typography.fontFamily.serif.$value};`);
push(`  --ax-font-mono: ${typography.fontFamily.mono.$value};`);
for (const [k, entry] of Object.entries(typography.text)) {
  push(`  --ax-text-${k}-size: ${entry.$value.fontSize};`);
  push(`  --ax-text-${k}-line: ${entry.$value.lineHeight};`);
}
for (const [k, entry] of Object.entries(typography.display)) {
  push(`  --ax-display-${k}-size: ${entry.$value.fontSize};`);
  push(`  --ax-display-${k}-line: ${entry.$value.lineHeight};`);
  push(`  --ax-display-${k}-tracking: ${entry.$value.letterSpacing ?? '0'};`);
}
for (const [k, entry] of Object.entries(typography.fontWeight)) {
  push(`  --ax-font-weight-${k}: ${entry.$value};`);
}
push(`  --ax-leading-tight: 1.25;`);
push(`  --ax-leading-normal: 1.5;`);
push(`  --ax-leading-relaxed: 1.75;`);
for (const [k, entry] of Object.entries(typography.letterSpacing)) {
  push(`  --ax-tracking-${k}: ${entry.$value};`);
}
push('');

// Radius
push('  /* ── Radius ── */');
for (const [k, entry] of Object.entries(radius)) {
  push(`  --ax-radius-${k}: ${entry.$value};`);
}
push('');

// Border width
push('  /* ── Border width ── */');
for (const [k, entry] of Object.entries(border)) {
  push(`  --ax-border-width-${k}: ${entry.$value};`);
}
push('');

// Shadow & elevation
push('  /* ── Shadow & elevation ── */');
for (const [k, entry] of Object.entries(shadow.shadow)) {
  push(`  --ax-shadow-${k}: ${entry.$value};`);
}
for (const [k, entry] of Object.entries(shadow.elevation)) {
  const v = entry.$value;
  const m = String(v).match(REF_RE);
  const val = m ? `var(--ax-shadow-${m[1].split('.').pop()})` : v;
  push(`  --ax-elevation-${k}: ${val};`);
}
push('');

// Motion
push('  /* ── Motion ── */');
for (const [k, entry] of Object.entries(motion.duration)) {
  if (typeof entry.$value === 'string') push(`  --ax-duration-${k}: ${entry.$value};`);
}
// M3 durations
if (motion.duration.m3) {
  for (const [k, entry] of Object.entries(motion.duration.m3)) {
    if (k.startsWith('$')) continue;
    push(`  --ax-duration-m3-${k}: ${entry.$value};`);
  }
}
for (const [k, entry] of Object.entries(motion.easing)) {
  if (typeof entry.$value === 'string') push(`  --ax-easing-${k}: ${entry.$value};`);
}
// M3 easing
if (motion.easing.m3) {
  for (const [k, entry] of Object.entries(motion.easing.m3)) {
    if (k.startsWith('$')) continue;
    // camelCase → kebab-case
    const kebab = k.replace(/([A-Z])/g, '-$1').toLowerCase();
    push(`  --ax-easing-m3-${kebab}: ${entry.$value};`);
  }
}
push('');

// Z-index
push('  /* ── Z-index scale ── */');
for (const [k, entry] of Object.entries(zIndex)) {
  push(`  --ax-z-${k}: ${entry.$value};`);
}
push('');

// Grid
push('  /* ── Grid ── */');
push(`  --ax-grid-columns: ${component.grid.columns.$value};`);
push(`  --ax-grid-gutter: ${component.grid.gutter.$value};`);
push('');

// Accessibility
push('  /* ── Accessibility ── */');
push(`  --ax-a11y-touch-target-min: ${component.a11y.touchTargetMin.$value};`);
push(`  --ax-a11y-text-min-contrast: ${component.a11y.textMinContrast.$value};`);
push(`  --ax-a11y-text-enhanced-contrast: ${component.a11y.textEnhancedContrast.$value};`);
push('');

// Breakpoints
push('  /* ── Breakpoints ── */');
for (const [k, entry] of Object.entries(breakpoint.breakpoint)) {
  push(`  --ax-breakpoint-${k}: ${entry.$value};`);
}
for (const [k, entry] of Object.entries(breakpoint.container)) {
  push(`  --ax-container-${k}: ${entry.$value};`);
}

// Clinical category badge/chip colors — standardized visual language across all AegisX products
push('');
push('  /* ── Clinical category colors (light) ── */');
push('  --ax-cat-med-subtle:       var(--ax-color-indigo-50);');
push('  --ax-cat-med-emphasis:     var(--ax-color-indigo-700);');
push('  --ax-cat-med-fg:           var(--ax-text-inverted);');
push('  --ax-cat-lab-subtle:       var(--ax-color-cyan-100);');
push('  --ax-cat-lab-emphasis:     var(--ax-color-cyan-700);');
push('  --ax-cat-lab-fg:           var(--ax-text-inverted);');
push('  --ax-cat-imaging-subtle:   var(--ax-color-purple-100);');
push('  --ax-cat-imaging-emphasis: var(--ax-color-purple-700);');
push('  --ax-cat-imaging-fg:       var(--ax-text-inverted);');
push('  --ax-cat-diet-subtle:      #ecfccb;');
push('  --ax-cat-diet-emphasis:    #4d7c0f;');
push('  --ax-cat-diet-fg:          var(--ax-text-inverted);');
push('  --ax-cat-activity-subtle:  var(--ax-color-amber-100);');
push('  --ax-cat-activity-emphasis:var(--ax-color-amber-700);');
push('  --ax-cat-activity-fg:      var(--ax-text-inverted);');
push('  --ax-cat-consult-subtle:   var(--ax-color-pink-100);');
push('  --ax-cat-consult-emphasis: var(--ax-color-pink-700);');
push('  --ax-cat-consult-fg:       var(--ax-text-inverted);');
push('  --ax-cat-procedure-subtle: var(--ax-color-red-100);');
push('  --ax-cat-procedure-emphasis:var(--ax-color-red-700);');
push('  --ax-cat-procedure-fg:     var(--ax-text-inverted);');
push('  --ax-cat-vital-subtle:     var(--ax-color-cyan-50);');
push('  --ax-cat-vital-emphasis:   var(--ax-color-cyan-800);');
push('  --ax-cat-vital-fg:         var(--ax-text-inverted);');

push('}');
push('');

// ─── dark theme ───────────────────────────────────────────────
push('/* ══════════════════════════════════════════════════════════════');
push(' * DARK THEME');
push(' * ══════════════════════════════════════════════════════════════ */');
push('[data-theme="dark"] {');
push('  /* Background (Tremor palette) */');
for (const k of ['page','default','subtle','muted','emphasis']) {
  push(`  --ax-background-${k}: ${resolveSemanticBg('dark', k)};`);
}
push('  /* Text (Gray scale) */');
for (const k of ['disabled','subtle','secondary','default','strong','heading','inverted']) {
  push(`  --ax-text-${k}: ${resolveSemanticText('dark', k)};`);
}
push('  /* Border */');
for (const k of ['subtle','default','emphasis']) {
  push(`  --ax-border-${k}: ${resolveSemanticBorder('dark', k)};`);
}
push('  /* Primary */');
for (const k of ['light','default','dark']) {
  const v = resolveSemanticPrimary('dark', k);
  push(`  --ax-primary${k === 'default' ? '' : '-' + k}: ${v};`);
}
// Brand dark — hardcoded Material Indigo dark values
push('  /* Role palettes (dark) */');
for (const [variant, hex] of Object.entries(BRAND_DARK)) {
  push(`  --ax-brand-${variant}:${variant.length <= 5 ? '    ' : ' '}${hex};`);
}
// Other roles dark
for (const [role, hue] of Object.entries(ROLE_PALETTES)) {
  if (role === 'brand') continue;
  push(`  --ax-${role}-faint:    var(--ax-color-${hue}-900);`);
  push(`  --ax-${role}-muted:    var(--ax-color-${hue}-800);`);
  push(`  --ax-${role}-subtle:   var(--ax-color-${hue}-700);`);
  push(`  --ax-${role}-default:  var(--ax-color-${hue}-400);`);
  push(`  --ax-${role}-emphasis: var(--ax-color-${hue}-200);`);
  push(`  --ax-${role}-inverted: var(--ax-color-zinc-950);`);
}
push('  /* Stronger shadows */');
push('  --ax-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.5);');
push('  --ax-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.5), 0 1px 3px 0 rgb(0 0 0 / 0.4);');
push('  --ax-shadow-md: 0 2px 4px -2px rgb(0 0 0 / 0.5), 0 4px 8px -2px rgb(0 0 0 / 0.4);');
push('  --ax-shadow-lg: 0 4px 6px -2px rgb(0 0 0 / 0.3), 0 12px 16px -4px rgb(0 0 0 / 0.5);');
push('  --ax-shadow-xl: 0 8px 8px -4px rgb(0 0 0 / 0.3), 0 20px 24px -4px rgb(0 0 0 / 0.5);');
push('  /* Component dark overrides */');
push(`  --ax-nav-bg: var(--ax-color-gray-900);`);
push(`  --ax-nav-text: var(--ax-color-gray-400);`);
push(`  --ax-nav-text-hover: var(--ax-color-gray-50);`);
push(`  --ax-nav-text-active: var(--ax-color-indigo-300);`);
push(`  --ax-nav-bg-active: rgb(63 81 181 / 0.15);`);
push(`  --ax-button-secondary-bg: var(--ax-color-gray-800);`);
push(`  --ax-button-secondary-bg-hover: var(--ax-color-gray-700);`);
push(`  --ax-input-bg: var(--ax-color-gray-900);`);
push(`  --ax-input-bg-disabled: var(--ax-color-gray-800);`);
push('  /* Clinical category colors (dark) */');
push('  --ax-cat-med-subtle:        color-mix(in srgb, var(--ax-color-indigo-400) 20%, transparent);');
push('  --ax-cat-med-emphasis:      var(--ax-color-indigo-300);');
push('  --ax-cat-med-fg:            var(--ax-color-zinc-950);');
push('  --ax-cat-lab-subtle:        color-mix(in srgb, var(--ax-color-cyan-400) 18%, transparent);');
push('  --ax-cat-lab-emphasis:      var(--ax-color-cyan-400);');
push('  --ax-cat-lab-fg:            var(--ax-color-zinc-950);');
push('  --ax-cat-imaging-subtle:    color-mix(in srgb, var(--ax-color-purple-400) 20%, transparent);');
push('  --ax-cat-imaging-emphasis:  var(--ax-color-purple-400);');
push('  --ax-cat-imaging-fg:        var(--ax-color-zinc-950);');
push('  --ax-cat-diet-subtle:       color-mix(in srgb, #a3e635 18%, transparent);');
push('  --ax-cat-diet-emphasis:     #a3e635;');
push('  --ax-cat-diet-fg:           var(--ax-color-zinc-950);');
push('  --ax-cat-activity-subtle:   color-mix(in srgb, var(--ax-color-amber-400) 20%, transparent);');
push('  --ax-cat-activity-emphasis: var(--ax-color-amber-400);');
push('  --ax-cat-activity-fg:       var(--ax-color-zinc-950);');
push('  --ax-cat-consult-subtle:    color-mix(in srgb, var(--ax-color-pink-400) 20%, transparent);');
push('  --ax-cat-consult-emphasis:  var(--ax-color-pink-400);');
push('  --ax-cat-consult-fg:        var(--ax-color-zinc-950);');
push('  --ax-cat-procedure-subtle:  color-mix(in srgb, var(--ax-color-red-400) 22%, transparent);');
push('  --ax-cat-procedure-emphasis:var(--ax-color-red-400);');
push('  --ax-cat-procedure-fg:      var(--ax-color-zinc-950);');
push('  --ax-cat-vital-subtle:      color-mix(in srgb, var(--ax-color-cyan-400) 20%, transparent);');
push('  --ax-cat-vital-emphasis:    var(--ax-color-cyan-400);');
push('  --ax-cat-vital-fg:          var(--ax-color-zinc-950);');
push('}');
push('');

// prefers-color-scheme fallback
push('@media (prefers-color-scheme: dark) {');
push('  :root:not([data-theme="light"]) {');
for (const k of ['page','default','subtle','muted','emphasis']) {
  push(`    --ax-background-${k}: ${resolveSemanticBg('dark', k)};`);
}
for (const k of ['disabled','subtle','secondary','default','heading','inverted']) {
  push(`    --ax-text-${k}: ${resolveSemanticText('dark', k)};`);
}
for (const k of ['subtle','default','emphasis']) {
  push(`    --ax-border-${k}: ${resolveSemanticBorder('dark', k)};`);
}
push(`    --ax-primary: ${resolveSemanticPrimary('dark', 'default')};`);
push('  }');
push('}');
push('');

// Density variants — [data-density] swaps control sizing tokens
push('/* ── Density variants ── */');
push('[data-density="compact"] {');
push(`  --ax-control-h: ${component.control.height.sm.$value};`);
push(`  --ax-control-pad-x: ${component.control.paddingX.sm.$value};`);
push(`  --ax-control-pad-y: ${component.control.paddingY.sm.$value};`);
push(`  --ax-control-gap: ${component.control.gap.sm.$value};`);
push(`  --ax-control-icon: ${component.control.iconSize.sm.$value};`);
push('}');
push('[data-density="spacious"] {');
push(`  --ax-control-h: ${component.control.height.lg.$value};`);
push(`  --ax-control-pad-x: ${component.control.paddingX.lg.$value};`);
push(`  --ax-control-pad-y: ${component.control.paddingY.lg.$value};`);
push(`  --ax-control-gap: ${component.control.gap.lg.$value};`);
push(`  --ax-control-icon: ${component.control.iconSize.lg.$value};`);
push('}');
push('');

// reduced motion
push('@media (prefers-reduced-motion: reduce) {');
push('  :root {');
for (const k of Object.keys(motion.duration)) {
  if (typeof motion.duration[k].$value === 'string') {
    push(`    --ax-duration-${k}: 0ms;`);
  }
}
push('  }');
push('}');
push('');

const output = lines.join('\n');
writeFileSync(out, output);
console.log(`✓ Wrote ${out} · ${lines.length} lines`);
