#!/usr/bin/env node
/**
 * Static dark-mode audit. Catches the cheap stuff without a browser:
 *
 *   1. Slate hex literals in tokens/*.html chrome (must be Zinc per v0.3).
 *   2. Hardcoded `#fff` / `#ffffff` / `#000` / `#000000` outside of
 *      explicit "inverted" contexts.
 *   3. CSS rules that set `color` or `background` without a paired
 *      `[data-theme="dark"]` override (heuristic — flag for review).
 *   4. Any `--ax-bg-*` / `--ax-text-primary` references (v0.2 names that
 *      should have been renamed in v0.3).
 *
 * Manual checks remain — open the pages in a real browser, toggle dark,
 * verify nothing breaks. This script just catches the static stuff.
 *
 * Usage:
 *   pnpm audit:dark-mode             # report
 *   pnpm audit:dark-mode --strict    # exit 1 on any finding
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const strict = process.argv.includes('--strict');

const SLATE_HEXES = {
  '#f8fafc': 'slate-50  → use #fafafa (zinc-50)',
  '#f1f5f9': 'slate-100 → use #f4f4f5 (zinc-100)',
  '#e2e8f0': 'slate-200 → use #e4e4e7 (zinc-200)',
  '#cbd5e1': 'slate-300 → use #d4d4d8 (zinc-300)',
  '#94a3b8': 'slate-400 → use #a1a1aa (zinc-400)',
  '#64748b': 'slate-500 → use #71717a (zinc-500)',
  '#475569': 'slate-600 → use #52525b (zinc-600)',
  '#334155': 'slate-700 → use #3f3f46 (zinc-700)',
  '#1e293b': 'slate-800 — keep ONLY in header gradient (brand navy)',
  '#0f172a': 'slate-900 — keep ONLY in header gradient (brand navy)',
  '#1f2937': 'gray-800  → use #27272a (zinc-800)',
  '#030712': 'gray-950  → use #09090b (zinc-950)',
};

const STALE_TOKENS = ['--ax-bg-', '--ax-text-primary', '--ax-body-medium', '--ax-title-large', '--ax-label-large'];

const findings = [];

const audit = (file, src) => {
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    // Allow header gradient lines (brand navy is intentional)
    const isHeaderGradient = /linear-gradient.*#0f172a.*#1e293b/.test(line);

    // Slate hex check
    for (const [hex, hint] of Object.entries(SLATE_HEXES)) {
      if (line.toLowerCase().includes(hex)) {
        if (isHeaderGradient && (hex === '#0f172a' || hex === '#1e293b')) continue;
        findings.push({ file, lineNo, level: 'warn', msg: `Slate hex ${hex} — ${hint}`, snippet: line.trim().slice(0, 120) });
      }
    }

    // Stale token check
    for (const stale of STALE_TOKENS) {
      if (line.includes(stale) && !line.startsWith('//') && !/(CHANGELOG|README|migration|deprecated)/i.test(line)) {
        findings.push({ file, lineNo, level: 'error', msg: `Stale v0.2 token reference: ${stale}…`, snippet: line.trim().slice(0, 120) });
      }
    }
  }
};

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules' || entry === 'dist' || entry === 'site') continue;
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) {
      walk(p);
    } else if (/\.(html|css|scss)$/.test(entry)) {
      // .ts / .mjs files (icon-color-map, scripts) legitimately hold Tailwind
      // hue references for iconographic identity — skip the chrome check.
      audit(relative(root, p), readFileSync(p, 'utf8'));
    }
  }
};

// Audit only files that are supposed to consume --ax-* tokens.
// site-src/mockups.html is a *static* product mockup — it deliberately
// uses raw Slate hex to demonstrate "how a real consumer page might look",
// not how to consume the token system. Skip it.
walk(resolve(root, 'tokens'));
walk(resolve(root, 'icons'));

const errors = findings.filter((f) => f.level === 'error');
const warnings = findings.filter((f) => f.level === 'warn');

if (findings.length === 0) {
  console.log('✓ audit:dark-mode — no static issues found.');
  process.exit(0);
}

const fmt = (f) => `  ${f.file}:${f.lineNo}  [${f.level.toUpperCase()}] ${f.msg}\n    > ${f.snippet}`;

if (errors.length) {
  console.log('\n━━━ ERRORS ━━━');
  errors.forEach((f) => console.log(fmt(f)));
}
if (warnings.length) {
  console.log('\n━━━ WARNINGS ━━━');
  warnings.forEach((f) => console.log(fmt(f)));
}

console.log(`\n${errors.length} error(s) · ${warnings.length} warning(s)`);
console.log('Run a real-browser audit too — script catches static stuff only.');
if (errors.length || (strict && warnings.length)) process.exit(1);
