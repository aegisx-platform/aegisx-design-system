#!/usr/bin/env node
/**
 * Generate tokens/css/tokens.generated.css from tokens/dtcg/*.json.
 *
 * - Palette, spacing, radius, border-width, shadow, motion, breakpoint
 *   values come from DTCG JSON.
 * - Role palette variants (6 variants × 5 roles, light + dark) and the
 *   component-token layer are hardcoded here because they're config,
 *   not primitive data.
 *
 * Usage:
 *   pnpm tokens:build      → writes tokens/css/tokens.generated.css
 *   pnpm tokens:verify     → diffs against tokens/css/tokens.css (CI gate)
 *
 * The hand-written tokens.css remains canonical for now; this generator
 * gives drift protection against JSON changes. Once parity is stable we
 * can swap the hand-written file for the generated one.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const dtcg = resolve(root, 'tokens/dtcg');
const out  = resolve(root, 'tokens/css/tokens.generated.css');

const read = (name) => JSON.parse(readFileSync(resolve(dtcg, name), 'utf8'));

const color      = read('color.json').color;
const spacing    = read('spacing.json').spacing;
const typography = read('typography.json').typography;
const radius     = read('radius.json').radius;
const border     = read('border-width.json').borderWidth;
const shadow     = read('shadow.json');
const motion     = read('motion.json');
const breakpoint = read('breakpoint.json');
const zIndex    = read('z-index.json').zIndex;

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
// Variant → palette step, for light and dark modes.
const ROLE_PALETTES = {
  brand:   'indigo',
  success: 'green',
  warning: 'amber',
  error:   'red',
  info:    'blue',
};
const VARIANT_STEPS_LIGHT = { faint: 50,  muted: 100, subtle: 200, default: 500, emphasis: 700 };
const VARIANT_STEPS_DARK  = { faint: 900, muted: 800, subtle: 700, default: 400, emphasis: 200 };

const hexAt = (hue, step) => {
  const entry = color.palette[hue]?.[step];
  if (!entry) throw new Error(`Missing palette entry: ${hue}.${step}`);
  return entry.$value;
};

// ─── semantic resolution helpers ──────────────────────────────
const resolveSemanticBg = (theme, key) =>
  resolveRef({ color }, color.semantic[theme].background[key].$value);
const resolveSemanticText = (theme, key) =>
  resolveRef({ color }, color.semantic[theme].text[key].$value);
const resolveSemanticBorder = (theme, key) =>
  resolveRef({ color }, color.semantic[theme].border[key].$value);
const resolveSemanticPrimary = (theme, key) =>
  resolveRef({ color }, color.semantic[theme].primary[key].$value);

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
push('  /* Primary (brand) */');
for (const k of ['light','default','dark']) {
  const v = resolveSemanticPrimary('light', k);
  push(`  --ax-primary${k === 'default' ? '' : '-' + k}: ${v};`);
}

// Role palettes (light)
push('  /* Role palettes × 6 variants */');
for (const [role, hue] of Object.entries(ROLE_PALETTES)) {
  for (const [variant, step] of Object.entries(VARIANT_STEPS_LIGHT)) {
    push(`  --ax-${role}-${variant}: ${hexAt(hue, step)};`);
  }
  push(`  --ax-${role}-inverted: #ffffff;`);
}

// Layer 3 — component tokens (light)
push('');
push('  /* ── Layer 3 · Component tokens ── */');
push('  /* Navigation */');
push(`  --ax-nav-bg: #ffffff;`);
push(`  --ax-nav-text: ${hexAt('zinc', 600)};`);
push(`  --ax-nav-text-hover: ${hexAt('zinc', 900)};`);
push(`  --ax-nav-text-active: ${hexAt('indigo', 600)};`);
push(`  --ax-nav-bg-active: ${hexAt('indigo', 50)};`);
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
push(`  --ax-input-ring-focus: 0 0 0 3px rgb(99 102 241 / 0.18);`);
push(`  --ax-input-ring-error: 0 0 0 3px rgb(239 68 68 / 0.15);`);
push('  /* Focus ring */');
push(`  --ax-focus-ring: 0 0 0 3px rgb(99 102 241 / 0.18);`);
push(`  --ax-focus-ring-offset: 2px;`);
push('');

// Spacing
push('  /* ── Spacing (4px grid) ── */');
for (const [k, entry] of Object.entries(spacing)) {
  if (typeof entry.$value === 'string') {
    push(`  --ax-spacing-${k}: ${entry.$value};`);
  }
}
for (const group of ['component','layout','container','inset','stack']) {
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
for (const [k, entry] of Object.entries(motion.easing)) {
  if (typeof entry.$value === 'string') push(`  --ax-easing-${k}: ${entry.$value};`);
}
push('');

// Z-index
push('  /* ── Z-index scale ── */');
for (const [k, entry] of Object.entries(zIndex)) {
  push(`  --ax-z-${k}: ${entry.$value};`);
}
push('');

// Breakpoints
push('  /* ── Breakpoints ── */');
for (const [k, entry] of Object.entries(breakpoint.breakpoint)) {
  push(`  --ax-breakpoint-${k}: ${entry.$value};`);
}
for (const [k, entry] of Object.entries(breakpoint.container)) {
  push(`  --ax-container-${k}: ${entry.$value};`);
}

push('}');
push('');

// ─── dark theme ───────────────────────────────────────────────
push('/* ══════════════════════════════════════════════════════════════');
push(' * DARK THEME');
push(' * ══════════════════════════════════════════════════════════════ */');
push('[data-theme="dark"] {');
push('  /* Background */');
for (const k of ['page','default','subtle','muted','emphasis']) {
  push(`  --ax-background-${k}: ${resolveSemanticBg('dark', k)};`);
}
push('  /* Text */');
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
push('  /* Role palettes (dark) */');
for (const [role, hue] of Object.entries(ROLE_PALETTES)) {
  for (const [variant, step] of Object.entries(VARIANT_STEPS_DARK)) {
    push(`  --ax-${role}-${variant}: ${hexAt(hue, step)};`);
  }
  push(`  --ax-${role}-inverted: ${hexAt('zinc', 950)};`);
}
push('  /* Stronger shadows */');
push('  --ax-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.5);');
push('  --ax-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.5), 0 1px 3px 0 rgb(0 0 0 / 0.4);');
push('  --ax-shadow-md: 0 2px 4px -2px rgb(0 0 0 / 0.5), 0 4px 8px -2px rgb(0 0 0 / 0.4);');
push('  --ax-shadow-lg: 0 4px 6px -2px rgb(0 0 0 / 0.3), 0 12px 16px -4px rgb(0 0 0 / 0.5);');
push('  --ax-shadow-xl: 0 8px 8px -4px rgb(0 0 0 / 0.3), 0 20px 24px -4px rgb(0 0 0 / 0.5);');
push('  /* Component dark overrides */');
push(`  --ax-nav-bg: ${hexAt('zinc', 900)};`);
push(`  --ax-nav-text: ${hexAt('zinc', 400)};`);
push(`  --ax-nav-text-hover: ${hexAt('zinc', 50)};`);
push(`  --ax-nav-text-active: ${hexAt('indigo', 300)};`);
push(`  --ax-nav-bg-active: rgb(99 102 241 / 0.15);`);
push(`  --ax-button-secondary-bg: ${hexAt('zinc', 800)};`);
push(`  --ax-button-secondary-bg-hover: ${hexAt('zinc', 700)};`);
push(`  --ax-input-bg: ${hexAt('zinc', 900)};`);
push(`  --ax-input-bg-disabled: ${hexAt('zinc', 800)};`);
push('}');
push('');

// prefers-color-scheme fallback (minimal — just surfaces + text)
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
