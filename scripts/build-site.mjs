#!/usr/bin/env node
/**
 * Build the static preview site under site/ for GitHub Pages.
 * - Renders icons grouped by category, click-to-copy snippets,
 *   install instructions, logo lockups, brand bg, and quick-start code.
 */
import { readFileSync, readdirSync, mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const out = resolve(root, 'site');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

if (existsSync(out)) rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
mkdirSync(resolve(out, 'assets'), { recursive: true });

cpSync(resolve(root, 'icons/svg'), resolve(out, 'assets/icons'), { recursive: true });
cpSync(resolve(root, 'icons/featured-error'), resolve(out, 'assets/featured-error'), { recursive: true });
cpSync(resolve(root, 'logo'), resolve(out, 'assets/logo'), { recursive: true });
cpSync(resolve(root, 'brand'), resolve(out, 'assets/brand'), { recursive: true });

// Design tokens preview + components + Angular Material setup guide.
mkdirSync(resolve(out, 'tokens'), { recursive: true });
cpSync(resolve(root, 'tokens/preview.html'),     resolve(out, 'tokens/index.html'));
cpSync(resolve(root, 'tokens/preview.html'),     resolve(out, 'tokens/preview.html'));
cpSync(resolve(root, 'tokens/components.html'),  resolve(out, 'tokens/components.html'));
cpSync(resolve(root, 'tokens/css'),              resolve(out, 'tokens/css'),  { recursive: true });
cpSync(resolve(root, 'tokens/scss'),             resolve(out, 'tokens/scss'), { recursive: true });
cpSync(resolve(root, 'tokens/ANGULAR-MATERIAL-SETUP.md'), resolve(out, 'tokens/ANGULAR-MATERIAL-SETUP.md'));
cpSync(resolve(root, 'tokens/AEGISX-TOKENS-SPEC.md'),     resolve(out, 'tokens/AEGISX-TOKENS-SPEC.md'));

// Social assets (logo/social/*.png) are picked up via the logo cpSync above —
// they live under assets/logo/social/.
const socialDir = resolve(root, 'logo/social');
const socialFiles = readdirSync(socialDir)
  .filter((f) => f.endsWith('.png'))
  .sort();

const SOCIAL_GROUPS = {
  GitHub:    ['github-org-avatar-400', 'github-social-preview-1280x640', 'github-readme-banner-1200x300'],
  'X / Twitter': ['twitter-profile-400', 'twitter-header-1500x500', 'twitter-card-1200x628'],
  LinkedIn:  ['linkedin-profile-400', 'linkedin-cover-1584x396', 'linkedin-share-1200x627'],
  Facebook:  ['facebook-profile-320', 'facebook-cover-820x312', 'facebook-share-1200x630'],
  YouTube:   ['youtube-channel-icon-800', 'youtube-banner-2560x1440'],
  'Slack / Discord': ['slack-workspace-512', 'discord-server-512'],
  'Open Graph (universal)': ['opengraph-1200x630'],
};

const SOCIAL_NOTES = {
  'github-org-avatar-400': 'Organization → Settings → Profile picture',
  'github-social-preview-1280x640': 'Each repo → Settings → Social preview',
  'github-readme-banner-1200x300': 'Embed at top of README.md',
  'twitter-profile-400': 'Profile picture',
  'twitter-header-1500x500': 'Profile header',
  'twitter-card-1200x628': 'twitter:image meta tag',
  'linkedin-profile-400': 'Company logo',
  'linkedin-cover-1584x396': 'Company cover',
  'linkedin-share-1200x627': 'Post share image',
  'facebook-profile-320': 'Page profile',
  'facebook-cover-820x312': 'Page cover photo',
  'facebook-share-1200x630': 'OG share image',
  'youtube-channel-icon-800': 'Channel avatar',
  'youtube-banner-2560x1440': 'Channel banner (1546×423 safe area)',
  'slack-workspace-512': 'Workspace icon',
  'discord-server-512': 'Server icon',
  'opengraph-1200x630': 'og:image for any page',
};

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
  const snippet = `<mat-icon svgIcon="${name}"></mat-icon>`;
  return `
    <figure class="tile" data-name="${name}" data-snippet="${snippet.replace(/"/g, '&quot;')}" tabindex="0" title="Click to copy">
      <div class="badge ${cls}"><img src="assets/icons/${name}.svg" alt="${name}" loading="lazy"></div>
      <figcaption><code>${name}</code><span>${c?.hex ?? '—'}</span></figcaption>
    </figure>`;
};

const renderCategory = (cat, names) => `
  <section class="cat">
    <h3>${cat} <small>${names.length}</small></h3>
    <div class="grid">${names.map(renderIcon).join('')}</div>
  </section>`;

const html = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AegisX Design System</title>
<link rel="icon" href="assets/logo/favicons/favicon.ico">
<link rel="apple-touch-icon" href="assets/logo/favicons/apple-touch-icon.png">
<script src="https://cdn.tailwindcss.com?plugins=forms"></script>
<style>
  body { font: 14px/1.55 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; background: #f8fafc; color: #0f172a; }
  header { background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); color: #fff; padding: 36px 32px 44px; }
  header h1 { margin: 0 0 6px; font-size: 24px; font-weight: 600; letter-spacing: -.01em; }
  header p { margin: 0; opacity: .65; font-size: 13px; }
  header .badges { margin-top: 14px; display: flex; gap: 8px; flex-wrap: wrap; }
  header .badges span { font-size: 11px; padding: 4px 10px; border-radius: 999px; background: rgba(255,255,255,.1); color: rgba(255,255,255,.85); font-family: ui-monospace, 'SF Mono', Menlo, monospace; }
  nav.tabs { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 32px; display: flex; gap: 24px; position: sticky; top: 0; z-index: 10; box-shadow: 0 1px 3px rgba(15,23,42,.04); }
  nav.tabs a { padding: 14px 0; color: #475569; text-decoration: none; border-bottom: 2px solid transparent; font-weight: 500; font-size: 13px; }
  nav.tabs a:hover { color: #0f172a; }
  main { padding: 32px; max-width: 1280px; margin: 0 auto; }
  section.block + section.block { margin-top: 56px; }
  section.block > h2 { margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #0f172a; }
  section.block > p.muted { margin: 0 0 20px; color: #64748b; font-size: 13px; }
  .cat + .cat { margin-top: 28px; }
  .cat h3 { margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: #64748b; font-weight: 600; }
  .cat h3 small { color: #cbd5e1; font-weight: 400; margin-left: 6px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 10px; }
  .tile { margin: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 8px; text-align: center; transition: all .12s; cursor: pointer; position: relative; }
  .tile:hover { border-color: #6366f1; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99,102,241,.15); }
  .tile:focus { outline: 2px solid #6366f1; outline-offset: 2px; }
  .tile.copied::after { content: 'Copied!'; position: absolute; top: 6px; right: 6px; background: #16a34a; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 999px; }
  .badge { width: 52px; height: 52px; margin: 0 auto 8px; display: inline-flex; align-items: center; justify-content: center; border-radius: 12px; }
  .badge img { width: 26px; height: 26px; }

  /* Social asset cards */
  .social-grp { margin-top: 24px; }
  .social-grp h3 { margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: .1em; color: #64748b; font-weight: 600; }
  .social-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
  .social-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; transition: border-color .12s, transform .12s; }
  .social-card:hover { border-color: #6366f1; transform: translateY(-2px); }
  .social-card .preview { aspect-ratio: 16 / 10; background: repeating-conic-gradient(#f1f5f9 0% 25%, #fff 0% 50%) 50% / 16px 16px; display: flex; align-items: center; justify-content: center; padding: 8px; }
  .social-card .preview img { max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 2px 8px rgba(15,23,42,.1); border-radius: 4px; }
  .social-card .preview.square { aspect-ratio: 1; }
  .social-card .meta { padding: 12px 14px; border-top: 1px solid #e2e8f0; }
  .social-card .meta .name { font-family: ui-monospace, monospace; font-size: 11px; color: #334155; word-break: break-all; }
  .social-card .meta .dim { font-size: 10px; color: #94a3b8; margin-top: 2px; font-family: ui-monospace, monospace; }
  .social-card .meta .where { font-size: 11px; color: #475569; margin-top: 6px; }
  .social-card .meta .actions { display: flex; gap: 8px; margin-top: 10px; }
  .social-card .meta a { flex: 1; text-align: center; padding: 6px 10px; border-radius: 6px; font-size: 11px; font-weight: 500; text-decoration: none; transition: background .12s; }
  .social-card .meta a.dl { background: #6366f1; color: #fff; }
  .social-card .meta a.dl:hover { background: #4f46e5; }
  .social-card .meta a.view { background: #f1f5f9; color: #475569; }
  .social-card .meta a.view:hover { background: #e2e8f0; }
  .tile code { display: block; font-size: 11px; color: #334155; word-break: break-all; line-height: 1.3; font-family: ui-monospace, 'SF Mono', Menlo, monospace; }
  .tile span { display: block; font-size: 9px; color: #94a3b8; font-family: ui-monospace, monospace; margin-top: 3px; }

  /* Code blocks */
  .code { background: #0f172a; color: #e2e8f0; padding: 16px 18px; border-radius: 10px; font-family: ui-monospace, 'SF Mono', Menlo, monospace; font-size: 12.5px; line-height: 1.6; overflow-x: auto; position: relative; }
  .code .lang { position: absolute; top: 8px; right: 12px; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: .08em; }
  .code .c { color: #64748b; } /* comment */
  .code .k { color: #c084fc; } /* keyword */
  .code .s { color: #86efac; } /* string */
  .code .t { color: #93c5fd; } /* tag */
  .code .a { color: #fbbf24; } /* attr */

  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
  .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
  .card h4 { margin: 0 0 6px; font-size: 14px; font-weight: 600; }
  .card p { margin: 0 0 14px; color: #64748b; font-size: 13px; }
  .card .code { font-size: 12px; padding: 12px 14px; }

  .logo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
  .logo-tile { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
  .logo-tile .stage { padding: 28px; display: flex; align-items: center; justify-content: center; min-height: 130px; background: #fff; }
  .logo-tile .stage.dark { background: #0f172a; }
  .logo-tile .stage.grey { background: #f1f5f9; }
  .logo-tile .label { padding: 10px 12px; font-family: ui-monospace, monospace; font-size: 11px; color: #475569; border-top: 1px solid #e2e8f0; background: #f8fafc; display: flex; justify-content: space-between; align-items: center; }
  .logo-tile .label a { color: #6366f1; text-decoration: none; font-size: 11px; }
  .logo-tile img { max-width: 100%; height: auto; }

  .swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; }
  .swatch { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; }
  .swatch .chip { width: 28px; height: 28px; border-radius: 6px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.06); flex-shrink: 0; }
  .swatch .meta { font-family: ui-monospace, monospace; font-size: 11px; color: #334155; }
  .swatch .meta b { display: block; font-weight: 500; }
  .swatch .meta span { color: #94a3b8; font-size: 10px; }
</style>
</head>
<body>

<header>
  <h1>AegisX Design System</h1>
  <p>Icons, logos, brand backgrounds, and Angular components for the AegisX Hospital Platform.</p>
  <div class="badges">
    <span>${pkg.name}@${pkg.version}</span>
    <span>${svgIcons.length} icons</span>
    <span>${Object.keys(byCategory).length} categories</span>
    <span>8 logo variants</span>
  </div>
</header>

<nav class="tabs">
  <a href="#install">Install</a>
  <a href="#usage">Usage</a>
  <a href="tokens/">Tokens ↗</a>
  <a href="tokens/components.html">Components ↗</a>
  <a href="#logos">Logos</a>
  <a href="mockups.html">Mockups ↗</a>
  <a href="#brand">Brand</a>
  <a href="#social">Social</a>
  <a href="#favicons">Favicons</a>
  <a href="#colors">Colours</a>
  <a href="#icons">Icons</a>
</nav>

<main>

<section class="block" id="install">
  <h2>Install</h2>
  <p class="muted">Published to GitHub Packages. Add a workspace <code>.npmrc</code> first, then install.</p>
  <div class="cards">
    <div class="card">
      <h4>1. Configure registry</h4>
      <p>One-time setup per workspace.</p>
      <pre class="code"><span class="lang">.npmrc</span><span class="c"># In repo root</span>
@aegisx-platform:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}</pre>
    </div>
    <div class="card">
      <h4>2. Install</h4>
      <p>Works with pnpm / npm / yarn.</p>
      <pre class="code"><span class="lang">terminal</span>pnpm add @aegisx-platform/design-system

<span class="c"># or</span>
npm install @aegisx-platform/design-system</pre>
    </div>
  </div>
</section>

<section class="block" id="usage">
  <h2>Usage</h2>
  <p class="muted">Two consumption models — pick one per project.</p>

  <div class="cards">
    <div class="card">
      <h4>Angular library (inline literals)</h4>
      <p>Best for libs like <code>@aegisx/ui</code>. Bundles SVG as TS strings, no HTTP at runtime.</p>
      <pre class="code"><span class="lang">app.component.ts</span><span class="k">import</span> { inject } <span class="k">from</span> <span class="s">'@angular/core'</span>;
<span class="k">import</span> { MatIconRegistry } <span class="k">from</span> <span class="s">'@angular/material/icon'</span>;
<span class="k">import</span> { DomSanitizer } <span class="k">from</span> <span class="s">'@angular/platform-browser'</span>;
<span class="k">import</span> {
  AEGISX_ICON_DATA,
} <span class="k">from</span> <span class="s">'@aegisx-platform/design-system/icons/data'</span>;

<span class="k">export class</span> AppComponent {
  <span class="k">private</span> registry = inject(MatIconRegistry);
  <span class="k">private</span> sanitizer = inject(DomSanitizer);

  <span class="k">constructor</span>() {
    <span class="k">for</span> (<span class="k">const</span> [name, svg] <span class="k">of</span> Object.entries(AEGISX_ICON_DATA)) {
      <span class="k">this</span>.registry.addSvgIconLiteralInNamespace(
        <span class="s">'ax'</span>, name,
        <span class="k">this</span>.sanitizer.bypassSecurityTrustHtml(svg),
      );
    }
  }
}</pre>
      <pre class="code"><span class="lang">component.html</span><span class="t">&lt;mat-icon</span> <span class="a">svgIcon</span>=<span class="s">"ax:pharmacy"</span><span class="t">&gt;&lt;/mat-icon&gt;</span></pre>
    </div>

    <div class="card">
      <h4>Raw SVG via Angular CLI assets</h4>
      <p>Best for app projects. Copies SVGs at build time, served from <code>/assets/</code>.</p>
      <pre class="code"><span class="lang">project.json</span><span class="s">"assets"</span>: [
  {
    <span class="s">"glob"</span>: <span class="s">"**/*"</span>,
    <span class="s">"input"</span>: <span class="s">"node_modules/@aegisx-platform/design-system/icons/svg"</span>,
    <span class="s">"output"</span>: <span class="s">"assets/icons/aegisx"</span>
  },
  {
    <span class="s">"glob"</span>: <span class="s">"**/*"</span>,
    <span class="s">"input"</span>: <span class="s">"node_modules/@aegisx-platform/design-system/logo"</span>,
    <span class="s">"output"</span>: <span class="s">"assets/logo"</span>
  }
]</pre>
      <pre class="code"><span class="lang">component.html</span><span class="t">&lt;img</span> <span class="a">src</span>=<span class="s">"assets/icons/aegisx/pharmacy.svg"</span> <span class="a">alt</span>=<span class="s">""</span><span class="t">&gt;</span>
<span class="t">&lt;img</span> <span class="a">src</span>=<span class="s">"assets/logo/horizontal-light.svg"</span> <span class="a">alt</span>=<span class="s">"AegisX"</span><span class="t">&gt;</span></pre>
    </div>

    <div class="card">
      <h4>Featured error icons</h4>
      <p>10 large stroke icons for empty states / error pages.</p>
      <pre class="code"><span class="lang">app.component.ts</span><span class="k">import</span> { AEGISX_FEATURED_ICON_DATA }
  <span class="k">from</span> <span class="s">'@aegisx-platform/design-system/icons/data'</span>;

<span class="c">// register under namespace 'axf'</span>
<span class="k">for</span> (<span class="k">const</span> [name, svg] <span class="k">of</span> Object.entries(AEGISX_FEATURED_ICON_DATA)) {
  registry.addSvgIconLiteralInNamespace(<span class="s">'axf'</span>, name, ...);
}</pre>
      <pre class="code"><span class="lang">html</span><span class="t">&lt;mat-icon</span> <span class="a">svgIcon</span>=<span class="s">"axf:err-lock"</span> <span class="t">/&gt;</span></pre>
    </div>

    <div class="card">
      <h4>Colour map helper</h4>
      <p>Get Tailwind classes per icon for badge wrappers.</p>
      <pre class="code"><span class="lang">component.ts</span><span class="k">import</span> { getIconClasses }
  <span class="k">from</span> <span class="s">'@aegisx-platform/design-system/icons/color-map'</span>;

cls = getIconClasses(<span class="s">'pharmacy'</span>, <span class="s">'md'</span>);
<span class="c">// → 'inline-flex … w-10 h-10 rounded-lg bg-blue-50 text-blue-600'</span></pre>
      <pre class="code"><span class="lang">html</span><span class="t">&lt;div</span> <span class="a">[class]</span>=<span class="s">"cls"</span><span class="t">&gt;</span>
  <span class="t">&lt;mat-icon</span> <span class="a">svgIcon</span>=<span class="s">"ax:pharmacy"</span><span class="t">/&gt;</span>
<span class="t">&lt;/div&gt;</span></pre>
    </div>

    <div class="card">
      <h4>Diamond app icons</h4>
      <p>Rotated 45° brand-coloured icon for app launchers and module headers.</p>
      <pre class="code"><span class="lang">component.ts</span><span class="k">import</span> { AxDiamondIconComponent }
  <span class="k">from</span> <span class="s">'@aegisx-platform/design-system/icons/diamond-component'</span>;</pre>
      <pre class="code"><span class="lang">html</span><span class="t">&lt;ax-diamond-icon</span> <span class="a">icon</span>=<span class="s">"pharmacy"</span> <span class="a">size</span>=<span class="s">"lg"</span><span class="t">/&gt;</span></pre>
    </div>

    <div class="card">
      <h4>Brand background SCSS</h4>
      <p>Login page / splash / PDF cover pattern.</p>
      <pre class="code"><span class="lang">styles.scss</span><span class="k">@use</span> <span class="s">'@aegisx-platform/design-system/styles/brand-bg'</span>;

.login-page {
  <span class="k">@include</span> aegisx-brand-bg;
}</pre>
    </div>
  </div>
</section>

<section class="block" id="logos">
  <h2>Logos</h2>
  <p class="muted">Pick the variant that matches the background. Click to download.</p>
  <div class="logo-grid">
    ${[
      { f: 'horizontal-light', stage: '', w: 220 },
      { f: 'horizontal-dark', stage: 'dark', w: 220 },
      { f: 'horizontal-mono', stage: '', w: 220 },
      { f: 'horizontal-mono-inverse', stage: 'dark', w: 220 },
      { f: 'vertical-light', stage: '', w: 160 },
      { f: 'vertical-dark', stage: 'dark', w: 160 },
      { f: 'icon-light', stage: 'grey', w: 96 },
      { f: 'icon-dark', stage: 'dark', w: 96 },
    ].map(({ f, stage, w }) => `
    <div class="logo-tile">
      <div class="stage ${stage}"><img src="assets/logo/${f}.svg" style="width:${w}px"></div>
      <div class="label"><code>${f}.svg</code><a href="assets/logo/${f}.svg" download>↓ download</a></div>
    </div>`).join('')}
  </div>
</section>

<section class="block" id="brand">
  <h2>Brand background</h2>
  <p class="muted">Use on login, splash, and PDF covers. Available as SVG and SCSS mixin.</p>
  <div class="logo-tile">
    <div class="stage" style="padding:0; min-height:280px; background:url('assets/brand/aegisx-brand-bg.svg') center/cover"></div>
    <div class="label"><code>brand/aegisx-brand-bg.svg</code><a href="assets/brand/aegisx-brand-bg.svg" download>↓ download</a></div>
  </div>
</section>

<section class="block" id="social">
  <h2>Social media assets</h2>
  <p class="muted">${socialFiles.length} ready-to-upload PNGs, sized exactly per platform. Click <b>Download</b> to save, or <b>View</b> for full size.</p>
  ${Object.entries(SOCIAL_GROUPS).map(([group, names]) => `
    <div class="social-grp">
      <h3>${group}</h3>
      <div class="social-grid">
        ${names.map((n) => {
          const file = `${n}.png`;
          const dim = n.match(/(\d+)x(\d+)/);
          const dimStr = dim ? `${dim[1]} × ${dim[2]} px` : (n.match(/(\d+)$/) ? `${n.match(/(\d+)$/)[1]} × ${n.match(/(\d+)$/)[1]} px (square)` : '');
          const isSquare = !n.match(/\d+x\d+/);
          return `
        <div class="social-card">
          <div class="preview ${isSquare ? 'square' : ''}"><img src="assets/logo/social/${file}" alt="${n}" loading="lazy"></div>
          <div class="meta">
            <div class="name">${file}</div>
            <div class="dim">${dimStr}</div>
            <div class="where">${SOCIAL_NOTES[n] ?? ''}</div>
            <div class="actions">
              <a class="dl" href="assets/logo/social/${file}" download>↓ Download</a>
              <a class="view" href="assets/logo/social/${file}" target="_blank" rel="noopener">View</a>
            </div>
          </div>
        </div>`;
        }).join('')}
      </div>
    </div>`).join('')}
</section>

<section class="block" id="favicons">
  <h2>Favicons</h2>
  <p class="muted">PNG + ICO ready for any web app's <code>&lt;head&gt;</code>. See <a href="https://github.com/aegisx-platform/aegisx-design-system/blob/main/logo/USAGE-EXAMPLES.md#3-web--favicon-setup" target="_blank">USAGE-EXAMPLES.md</a> for the snippet.</p>
  <div class="social-grid">
    ${['favicon-16.png','favicon-32.png','favicon-48.png','apple-touch-icon.png','icon-192.png','icon-512.png','favicon.ico'].map((f) => {
      const sizeMatch = f.match(/(\d+)/);
      const sz = sizeMatch ? `${sizeMatch[1]} × ${sizeMatch[1]}` : '48 × 48';
      const isIco = f.endsWith('.ico');
      return `
    <div class="social-card">
      <div class="preview square">${isIco ? '<div style="font-family:ui-monospace;color:#94a3b8;font-size:11px">.ico (binary)</div>' : `<img src="assets/logo/favicons/${f}" alt="${f}">`}</div>
      <div class="meta">
        <div class="name">${f}</div>
        <div class="dim">${sz} px</div>
        <div class="actions">
          <a class="dl" href="assets/logo/favicons/${f}" download>↓ Download</a>
        </div>
      </div>
    </div>`;
    }).join('')}
  </div>
</section>

<section class="block" id="colors">
  <h2>Colour tokens</h2>
  <p class="muted">Each icon has a paired Tailwind text/bg class. Same token across web, PDF, and slides.</p>
  <div class="swatches">
    ${[...new Map(Object.values(colorMap).map((c) => [c.hex, c])).values()]
      .sort((a, b) => a.hex.localeCompare(b.hex))
      .map((c) => `
    <div class="swatch">
      <div class="chip" style="background:${c.hex}"></div>
      <div class="meta"><b>${c.tailwind}</b><span>${c.hex}</span></div>
    </div>`).join('')}
  </div>
</section>

<section class="block" id="icons">
  <h2>Icons (${svgIcons.length})</h2>
  <p class="muted">Click any icon to copy its <code>&lt;mat-icon&gt;</code> snippet to clipboard.</p>
  ${Object.entries(byCategory).sort().map(([cat, names]) => renderCategory(cat, names)).join('')}
</section>

</main>

<script>
  document.querySelectorAll('.tile').forEach((el) => {
    const copy = () => {
      const snippet = el.dataset.snippet;
      navigator.clipboard.writeText(snippet).then(() => {
        el.classList.add('copied');
        setTimeout(() => el.classList.remove('copied'), 1200);
      });
    };
    el.addEventListener('click', copy);
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copy(); } });
  });
</script>

</body></html>`;

writeFileSync(resolve(out, 'index.html'), html);

// Copy static pages from site-src/ (e.g. mockups.html)
const siteSrc = resolve(root, 'site-src');
if (existsSync(siteSrc)) {
  cpSync(siteSrc, out, { recursive: true });
}

console.log(`✓ Built site/ (${svgIcons.length} icons, ${Object.keys(byCategory).length} categories)`);
