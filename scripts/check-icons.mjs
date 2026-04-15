#!/usr/bin/env node
/**
 * Icon integrity check.
 * Cross-references icons/svg/* against icons/aegisx-icon-registry.ts
 * and icons/icon-color-map.ts. Reports gaps in either direction.
 *
 * Usage:
 *   node scripts/check-icons.mjs           # report only, exit 0
 *   node scripts/check-icons.mjs --strict  # exit 1 on any mismatch
 */
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const strict = process.argv.includes('--strict');

const svgFiles = readdirSync(resolve(root, 'icons/svg'))
  .filter((f) => f.endsWith('.svg'))
  .map((f) => f.replace(/\.svg$/, ''));

const registrySrc = readFileSync(resolve(root, 'icons/aegisx-icon-registry.ts'), 'utf8');
const colorMapSrc = readFileSync(resolve(root, 'icons/icon-color-map.ts'), 'utf8');

// Names quoted as plain string literals inside the const arrays / object keys.
const registryNames = new Set(
  [...registrySrc.matchAll(/'([a-z][a-z0-9-]+)'/g)].map((m) => m[1]),
);
const colorMapNames = new Set(
  [...colorMapSrc.matchAll(/^ {2}'([a-z][a-z0-9-]+)':/gm)].map((m) => m[1]),
);

// SVGs whose semantic prefix means they live in a different system
// (action / status / error / empty / file / notify) and don't need a
// per-icon colour-map entry.
const PREFIX_OPT_OUT = ['act-', 'st-', 'err-', 'empty-', 'file-', 'notify-'];
const isOptOut = (n) => PREFIX_OPT_OUT.some((p) => n.startsWith(p));

const missingInColorMap = svgFiles.filter((n) => !colorMapNames.has(n) && !isOptOut(n));
const orphanColorMap = [...colorMapNames].filter((n) => !svgFiles.includes(n));
const orphanRegistry = [...registryNames].filter(
  (n) => !svgFiles.includes(n) && !isOptOut(n) && !['root'].includes(n),
);

console.log(
  `Scanned ${svgFiles.length} SVGs · registry has ${registryNames.size} · colour map has ${colorMapNames.size}`,
);

let issues = 0;
function section(title, list) {
  if (!list.length) return;
  issues += list.length;
  console[strict ? 'error' : 'warn'](`\n${strict ? '✗' : '·'} ${title} (${list.length}):`);
  for (const n of list) console[strict ? 'error' : 'warn'](`    - ${n}`);
}

section('SVGs missing from icon-color-map.ts', missingInColorMap);
section('Colour-map entries with no SVG on disk', orphanColorMap);
section('Registry entries with no SVG on disk', orphanRegistry);

if (!issues) {
  console.log('\n✓ All icons are in sync.');
  process.exit(0);
}

console.log(`\n${issues} issue(s) found.`);
if (strict) {
  console.error('Run without --strict to inspect, or fix the mismatches above.');
  process.exit(1);
}
process.exit(0);
