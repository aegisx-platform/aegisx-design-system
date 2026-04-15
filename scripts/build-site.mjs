#!/usr/bin/env node
/**
 * Build a static preview site under site/ that GitHub Pages will serve.
 * Pulls icon names from the registered files on disk and the colour map,
 * copies all assets into site/assets/, and renders index.html.
 */
import { readFileSync, readdirSync, mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const out = resolve(root, 'site');

if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
mkdirSync(resolve(out, 'assets'), { recursive: true });

cpSync(resolve(root, 'icons/svg'), resolve(out, 'assets/icons'), { recursive: true });
cpSync(resolve(root, 'icons/featured-error'), resolve(out, 'assets/featured-error'), { recursive: true });
cpSync(resolve(root, 'logo'), resolve(out, 'assets/logo'), { recursive: true });
cpSync(resolve(root, 'brand'), resolve(out, 'assets/brand'), { recursive: true });

// Parse colour map
const colorSrc = readFileSync(resolve(root, 'icons/icon-color-map.ts'), 'utf8');
const colorMap = {};
for (const m of colorSrc.matchAll(
  /'([a-z][a-z0-9-]+)':\s*\{\s*hex:\s*'(#[0-9a-fA-F]{6})',\s*tailwind:\s*'([^']+)',\s*bg:\s*'([^']+)',\s*category:\s*'([^']+)'/g,
)) {
  colorMap[m[1]] = { hex: m[2], tailwind: m[3], bg: m[4], category: m[5] };
}

const svgIcons = readdirSync(resolve(root, 'icons/svg'))
  .filter((f) => f.endsWith('.svg'))
  .map((f) => f.replace(/\.svg$/, ''))
  .sort();

const byCategory = {};
for (const name of svgIcons) {
  const cat = colorMap[name]?.category ?? 'uncategorised';
  (byCategory[cat] ??= []).push(name);
}

const renderIcon = (name) => {
  const c = colorMap[name];
  const cls = c ? `${c.bg} ${c.tailwind}` : 'bg-slate-50 text-slate-500';
  return `
    <figure class="tile">
      <div class="badge ${cls}">
        <img src="assets/icons/${name}.svg" alt="${name}" loading="lazy">
      </div>
      <figcaption><code>${name}</code><span>${c?.hex ?? '—'}</span></figcaption>
    </figure>`;
};

const renderCategory = (cat, names) => `
  <section>
    <h2>${cat} <small>(${names.length})</small></h2>
    <div class="grid">${names.map(renderIcon).join('')}</div>
  </section>`;

const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AegisX Design System</title>
<link rel="icon" href="assets/logo/favicons/favicon.ico">
<script src="https://cdn.tailwindcss.com?plugins=forms"></script>
<style>
  body { font: 14px/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
  header { background: #0f172a; color: #fff; padding: 32px 32px 40px; }
  header h1 { margin: 0 0 6px; font-size: 22px; font-weight: 600; }
  header p { margin: 0; opacity: .75; }
  nav.tabs { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 32px; display: flex; gap: 24px; position: sticky; top: 0; z-index: 10; }
  nav.tabs a { padding: 14px 0; color: #475569; text-decoration: none; border-bottom: 2px solid transparent; font-weight: 500; }
  nav.tabs a:hover { color: #0f172a; }
  main { padding: 32px; max-width: 1280px; margin: 0 auto; }
  section + section { margin-top: 48px; }
  h2 { margin: 0 0 16px; font-size: 13px; text-transform: uppercase; letter-spacing: .08em; color: #475569; }
  h2 small { color: #94a3b8; font-weight: 400; margin-left: 4px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
  .tile { margin: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center; transition: border-color .1s; }
  .tile:hover { border-color: #94a3b8; }
  .badge { width: 56px; height: 56px; margin: 0 auto 8px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; }
  .badge img { width: 28px; height: 28px; }
  .tile code { display: block; font-size: 11px; color: #334155; word-break: break-all; }
  .tile span { display: block; font-size: 10px; color: #94a3b8; font-family: ui-monospace, 'SF Mono', Menlo, monospace; margin-top: 2px; }
  .logo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .logo-tile { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
  .logo-tile .stage { padding: 32px; display: flex; align-items: center; justify-content: center; min-height: 140px; background: #fff; }
  .logo-tile .stage.dark { background: #0f172a; }
  .logo-tile .stage.grey { background: #f1f5f9; }
  .logo-tile .label { padding: 10px 12px; font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 11px; color: #475569; border-top: 1px solid #e2e8f0; background: #f8fafc; }
  .logo-tile img { max-width: 100%; height: auto; }
  .swatch { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; }
  .swatch .chip { width: 36px; height: 36px; border-radius: 8px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.06); }
  .swatch code { font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 12px; color: #334155; }
  .swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
</style>
</head>
<body>

<header>
  <h1>AegisX Design System</h1>
  <p>${svgIcons.length} icons · ${Object.keys(byCategory).length} categories · 8 logo variants · 1 brand background</p>
</header>

<nav class="tabs">
  <a href="#logos">Logos</a>
  <a href="#brand">Brand</a>
  <a href="#icons">Icons</a>
</nav>

<main>

<section id="logos">
  <h2>Logos</h2>
  <div class="logo-grid">
    <div class="logo-tile"><div class="stage"><img src="assets/logo/horizontal-light.svg" style="width:220px"></div><div class="label">horizontal-light.svg</div></div>
    <div class="logo-tile"><div class="stage dark"><img src="assets/logo/horizontal-dark.svg" style="width:220px"></div><div class="label">horizontal-dark.svg</div></div>
    <div class="logo-tile"><div class="stage"><img src="assets/logo/horizontal-mono.svg" style="width:220px"></div><div class="label">horizontal-mono.svg</div></div>
    <div class="logo-tile"><div class="stage dark"><img src="assets/logo/horizontal-mono-inverse.svg" style="width:220px"></div><div class="label">horizontal-mono-inverse.svg</div></div>
    <div class="logo-tile"><div class="stage"><img src="assets/logo/vertical-light.svg" style="width:160px"></div><div class="label">vertical-light.svg</div></div>
    <div class="logo-tile"><div class="stage dark"><img src="assets/logo/vertical-dark.svg" style="width:160px"></div><div class="label">vertical-dark.svg</div></div>
    <div class="logo-tile"><div class="stage grey"><img src="assets/logo/icon-light.svg" style="width:96px"></div><div class="label">icon-light.svg</div></div>
    <div class="logo-tile"><div class="stage dark"><img src="assets/logo/icon-dark.svg" style="width:96px"></div><div class="label">icon-dark.svg</div></div>
  </div>
</section>

<section id="brand">
  <h2>Brand background</h2>
  <div class="logo-tile"><div class="stage" style="padding:0; min-height:240px; background:url('assets/brand/aegisx-brand-bg.svg') center/cover"></div><div class="label">brand/aegisx-brand-bg.svg</div></div>
</section>

<section id="icons">
  <h2>Icons (${svgIcons.length})</h2>
  ${Object.entries(byCategory).sort().map(([cat, names]) => renderCategory(cat, names)).join('')}
</section>

</main>

</body></html>`;

writeFileSync(resolve(out, 'index.html'), html);
console.log(`✓ Built site/ (${svgIcons.length} icons, ${Object.keys(byCategory).length} categories)`);
