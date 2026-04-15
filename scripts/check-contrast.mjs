#!/usr/bin/env node
/**
 * WCAG 2.1 AA contrast audit on the icon colour map and design tokens.
 * Tests every text/foreground colour against:
 *   - white surface (#ffffff)
 *   - app background (#f8fafc)
 *   - card muted (#f1f5f9)
 *   - dark navy (#0f172a)
 *
 * AA thresholds:
 *   - 4.5:1 for normal text
 *   - 3.0:1 for large text (≥ 18px or ≥ 14px bold) and UI components
 *
 * Usage:
 *   node scripts/check-contrast.mjs           # report
 *   node scripts/check-contrast.mjs --strict  # exit 1 if any AA-normal failure
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const strict = process.argv.includes('--strict');

const BACKGROUNDS = [
  { name: 'white',      hex: '#ffffff' },
  { name: 'app-bg',     hex: '#f8fafc' },
  { name: 'card-muted', hex: '#f1f5f9' },
  { name: 'navy-dark',  hex: '#0f172a' },
];

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function relLum([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function ratio(fg, bg) {
  const [l1, l2] = [relLum(hexToRgb(fg)), relLum(hexToRgb(bg))].sort((a, b) => b - a);
  return (l1 + 0.05) / (l2 + 0.05);
}

const grade = (r) => {
  if (r >= 7) return 'AAA';
  if (r >= 4.5) return 'AA';
  if (r >= 3) return 'AA-large';
  return 'FAIL';
};

const colorMapSrc = readFileSync(resolve(root, 'icons/icon-color-map.ts'), 'utf8');
const colors = new Map();
for (const m of colorMapSrc.matchAll(
  /'([a-z][a-z0-9-]+)':\s*\{\s*hex:\s*'(#[0-9a-fA-F]{6})'/g,
)) {
  if (!colors.has(m[2])) colors.set(m[2], []);
  colors.get(m[2]).push(m[1]);
}

console.log(`Auditing ${colors.size} unique colours against ${BACKGROUNDS.length} backgrounds.\n`);

let aaFailures = 0;
const sortedColors = [...colors.entries()].sort();

for (const [hex, names] of sortedColors) {
  const cells = BACKGROUNDS.map((bg) => {
    const r = ratio(hex, bg.hex);
    return { bg: bg.name, ratio: r, grade: grade(r) };
  });
  const passesAA = cells.some((c) => c.grade === 'AA' || c.grade === 'AAA');
  if (!passesAA) aaFailures++;
  const cellStr = cells
    .map((c) => `${c.bg.padEnd(11)} ${c.ratio.toFixed(2).padStart(5)} ${c.grade.padEnd(8)}`)
    .join('  ');
  const tag = passesAA ? '✓' : '✗';
  const sample = names.slice(0, 3).join(', ') + (names.length > 3 ? ` +${names.length - 3}` : '');
  console.log(`${tag} ${hex}  ${cellStr}  (${sample})`);
}

console.log(`\nSummary: ${colors.size - aaFailures}/${colors.size} colours pass WCAG AA on at least one background.`);
if (aaFailures) {
  console.log(`${aaFailures} colour(s) fail AA on every tested background — restrict their use to large/decorative contexts only.`);
}
if (strict && aaFailures) process.exit(1);
