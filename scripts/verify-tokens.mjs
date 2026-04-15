#!/usr/bin/env node
/**
 * Semantic diff between tokens/css/tokens.css (canonical, hand-curated)
 * and tokens/css/tokens.generated.css (produced from DTCG).
 *
 * Byte equality is not required — the canonical file has richer comments,
 * intentional ordering, and a small set of component-layer / dark-mode
 * rules that are not derivable from DTCG alone.
 *
 * What we enforce:
 *   - every --ax-* property declared in the generated file also exists
 *     in the canonical file
 *   - their *resolved* values match (var() chains are compared literally,
 *     hex values case-insensitively)
 *
 * Drift = a JSON change that didn't land in tokens.css. Fix by editing
 * tokens.css to match the generated output.
 *
 * Run `pnpm tokens:build` first to refresh tokens.generated.css.
 */
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

// Regenerate first so we compare against current JSON state.
const build = spawnSync(process.execPath, ['scripts/build-tokens.mjs'], {
  cwd: root,
  stdio: 'inherit',
});
if (build.status !== 0) process.exit(build.status ?? 1);

const canonical = readFileSync(resolve(root, 'tokens/css/tokens.css'), 'utf8');
const generated = readFileSync(resolve(root, 'tokens/css/tokens.generated.css'), 'utf8');

const DECL = /--ax-[a-z0-9-]+\s*:\s*([^;]+);/gi;

const extract = (css) => {
  const map = new Map();
  for (const m of css.matchAll(DECL)) {
    const name = m[0].split(':')[0].trim();
    const value = m[1].trim().toLowerCase();
    // Keep the FIRST definition (light defaults); ignore later :root blocks.
    if (!map.has(name)) map.set(name, value);
  }
  return map;
};

const c = extract(canonical);
const g = extract(generated);

let missing = 0;
let drift = 0;
const report = [];

for (const [name, value] of g) {
  if (!c.has(name)) {
    report.push(`MISSING in tokens.css: ${name} = ${value}`);
    missing++;
    continue;
  }
  const canonicalVal = c.get(name);
  if (canonicalVal !== value) {
    report.push(`DRIFT: ${name}\n  canonical:  ${canonicalVal}\n  generated:  ${value}`);
    drift++;
  }
}

if (missing + drift === 0) {
  console.log(`✓ tokens:verify — ${g.size} tokens match DTCG source. No drift.`);
  process.exit(0);
}

console.log(report.join('\n\n'));
console.log(`\n⚠ ${missing} missing · ${drift} drifted · ${g.size} total`);
console.log('Fix by editing tokens/css/tokens.css to match tokens/css/tokens.generated.css.');
process.exit(1);
