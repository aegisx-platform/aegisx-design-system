#!/usr/bin/env node
/**
 * Generate the Tokens Studio (Figma plugin) JSON files from DTCG source.
 *
 * Outputs:
 *   tokens/aegisx-tokens.json       — base set (palette + light semantic + scales)
 *   tokens/aegisx-tokens-dark.json  — dark-mode semantic overrides
 *
 * These files are the bridge between code (DTCG) and Figma. Designers
 * configure Tokens Studio to read them; the plugin renders them as
 * Figma variables. Bidirectional sync = run this script after every
 * DTCG change; if Figma made the change first, port it back into DTCG
 * by hand and re-run.
 *
 * Usage: pnpm tokens:studio
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const dtcg = resolve(root, 'tokens/dtcg');

const read = (n) => JSON.parse(readFileSync(resolve(dtcg, n), 'utf8'));
const color   = read('color.json').color;
const spacing = read('spacing.json').spacing;
const typography = read('typography.json').typography;
const radius  = read('radius.json').radius;
const border  = read('border-width.json').borderWidth;
const shadow  = read('shadow.json');
const motion  = read('motion.json');
const breakpoint = read('breakpoint.json');
const zIndex  = read('z-index.json').zIndex;

const ROLES = { brand: 'indigo', success: 'green', warning: 'amber', error: 'red', info: 'blue' };

// Strip non-DTCG fields and collapse for Tokens Studio
const stripDescription = (obj) => {
  if (Array.isArray(obj)) return obj.map(stripDescription);
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      if (k === '$description' || k === '$schema' || k === '_note' || k.startsWith('_')) continue;
      out[k] = stripDescription(v);
    }
    return out;
  }
  return obj;
};

// ─── Base set ─────────────────────────────────────────────────
const base = {
  $schema: 'https://design-tokens.github.io/community-group/format/',
  $description: 'AegisX v0.3 design tokens — Tokens Studio mirror auto-generated from dtcg/. Do not edit by hand; run `pnpm tokens:studio`.',
  $version: '0.3.2',
  color: {
    palette: stripDescription(color.palette),
    semantic: stripDescription(color.semantic.light),
    role: Object.fromEntries(
      Object.entries(ROLES).map(([role, hue]) => [role, {
        faint:    { $value: `{color.palette.${hue}.50}`,  $type: 'color' },
        muted:    { $value: `{color.palette.${hue}.100}`, $type: 'color' },
        subtle:   { $value: `{color.palette.${hue}.200}`, $type: 'color' },
        default:  { $value: `{color.palette.${hue}.500}`, $type: 'color' },
        emphasis: { $value: `{color.palette.${hue}.700}`, $type: 'color' },
        inverted: { $value: '#ffffff', $type: 'color' },
      }])
    ),
  },
  spacing: stripDescription(
    Object.fromEntries(Object.entries(spacing).filter(([k]) => !k.startsWith('_')))
  ),
  radius: stripDescription(radius),
  borderWidth: stripDescription(border),
  shadow: stripDescription(shadow.shadow),
  elevation: stripDescription(shadow.elevation),
  font: {
    family: stripDescription(typography.fontFamily),
    weight: stripDescription(typography.fontWeight),
  },
  text: stripDescription(typography.text),
  display: stripDescription(typography.display),
  duration: stripDescription(motion.duration),
  easing: stripDescription(motion.easing),
  breakpoint: stripDescription(breakpoint.breakpoint),
  container: stripDescription(breakpoint.container),
  zIndex: stripDescription(zIndex),
};

writeFileSync(
  resolve(root, 'tokens/aegisx-tokens.json'),
  JSON.stringify(base, null, 2) + '\n',
);

// ─── Dark overrides set ───────────────────────────────────────
const dark = {
  $schema: 'https://design-tokens.github.io/community-group/format/',
  $description: 'AegisX v0.3 dark-mode overrides — Tokens Studio mirror auto-generated from dtcg/. Layer on top of aegisx-tokens.json.',
  $version: '0.3.2',
  color: {
    semantic: stripDescription(color.semantic.dark),
    role: Object.fromEntries(
      Object.entries(ROLES).map(([role, hue]) => [role, {
        faint:    { $value: `{color.palette.${hue}.900}`, $type: 'color' },
        muted:    { $value: `{color.palette.${hue}.800}`, $type: 'color' },
        subtle:   { $value: `{color.palette.${hue}.700}`, $type: 'color' },
        default:  { $value: `{color.palette.${hue}.400}`, $type: 'color' },
        emphasis: { $value: `{color.palette.${hue}.200}`, $type: 'color' },
        inverted: { $value: '{color.palette.zinc.950}',    $type: 'color' },
      }])
    ),
  },
  shadow: {
    xs: { $value: '0 1px 2px 0 rgb(0 0 0 / 0.5)', $type: 'shadow' },
    sm: { $value: '0 1px 2px 0 rgb(0 0 0 / 0.5), 0 1px 3px 0 rgb(0 0 0 / 0.4)', $type: 'shadow' },
    md: { $value: '0 2px 4px -2px rgb(0 0 0 / 0.5), 0 4px 8px -2px rgb(0 0 0 / 0.4)', $type: 'shadow' },
    lg: { $value: '0 4px 6px -2px rgb(0 0 0 / 0.3), 0 12px 16px -4px rgb(0 0 0 / 0.5)', $type: 'shadow' },
    xl: { $value: '0 8px 8px -4px rgb(0 0 0 / 0.3), 0 20px 24px -4px rgb(0 0 0 / 0.5)', $type: 'shadow' },
  },
};

writeFileSync(
  resolve(root, 'tokens/aegisx-tokens-dark.json'),
  JSON.stringify(dark, null, 2) + '\n',
);

console.log('✓ Wrote tokens/aegisx-tokens.json + aegisx-tokens-dark.json (Tokens Studio format)');
