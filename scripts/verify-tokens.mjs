#!/usr/bin/env node
/**
 * tokens.css must equal the output of `pnpm tokens:build` byte-for-byte.
 * If they diverge, somebody edited tokens.css by hand (or forgot to
 * regenerate after a JSON change). Drift gate.
 *
 * Use: pre-commit + CI.
 */
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const tmp = mkdtempSync(join(tmpdir(), 'ax-tokens-'));
const tmpOut = join(tmp, 'tokens.css');

const build = spawnSync(process.execPath, ['scripts/build-tokens.mjs'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, AX_OUT: tmpOut },
});
if (build.status !== 0) {
  rmSync(tmp, { recursive: true, force: true });
  process.exit(build.status ?? 1);
}

const canonical = readFileSync(resolve(root, 'tokens/css/tokens.css'), 'utf8');
const generated = readFileSync(tmpOut, 'utf8');
rmSync(tmp, { recursive: true, force: true });

if (canonical === generated) {
  console.log('✓ tokens:verify — tokens.css matches DTCG source byte-for-byte.');
  process.exit(0);
}

// Show a brief diff hint
const cLines = canonical.split('\n');
const gLines = generated.split('\n');
let firstDiff = -1;
for (let i = 0; i < Math.max(cLines.length, gLines.length); i++) {
  if (cLines[i] !== gLines[i]) { firstDiff = i; break; }
}

console.error('\n⚠ tokens.css drifted from DTCG source.');
console.error('Run `pnpm tokens:build` to regenerate, then commit the result.');
if (firstDiff >= 0) {
  console.error(`\nFirst divergence at line ${firstDiff + 1}:`);
  console.error(`  canonical: ${cLines[firstDiff] ?? '(eof)'}`);
  console.error(`  generated: ${gLines[firstDiff] ?? '(eof)'}`);
}
console.error(`\nLines: canonical=${cLines.length} · generated=${gLines.length}`);
process.exit(1);
