#!/usr/bin/env node
/**
 * Build the static preview site under site/ for GitHub Pages.
 * v0.4 redesign: identity-first IA, eats own dog food (--ax-* tokens).
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

// Pages — all HTML preview pages live in pages/, served under site/pages/
mkdirSync(resolve(out, 'pages'), { recursive: true });
const pageFiles = readdirSync(resolve(root, 'pages')).filter(f => f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js'));
// Inject live package version into HTML placeholders (`{{DS_VERSION}}`) so sidebar labels stay in sync.
const DS_VERSION = pkg.version;
for (const f of pageFiles) {
  const src = resolve(root, 'pages', f);
  const dst = resolve(out, 'pages', f);
  if (f.endsWith('.html')) {
    const content = readFileSync(src, 'utf8').replace(/\{\{DS_VERSION\}\}/g, DS_VERSION);
    writeFileSync(dst, content);
  } else {
    cpSync(src, dst);
  }
}
// Recursively copy phase subdirectories (flat readdirSync above misses them)
for (const subdir of ['phase5', 'phase6', 'phase7', 'phase8', 'phase9', 'phase10']) {
  const srcDir = resolve(root, 'pages', subdir);
  const dstDir = resolve(out, 'pages', subdir);
  if (existsSync(srcDir)) cpSync(srcDir, dstDir, { recursive: true });
}

// Token data (CSS, SCSS, DTCG) — used by pages via ../tokens/css/tokens.css
mkdirSync(resolve(out, 'tokens'), { recursive: true });
cpSync(resolve(root, 'tokens/css'),              resolve(out, 'tokens/css'),  { recursive: true });
cpSync(resolve(root, 'tokens/scss'),             resolve(out, 'tokens/scss'), { recursive: true });
cpSync(resolve(root, 'tokens/ANGULAR-MATERIAL-SETUP.md'), resolve(out, 'tokens/ANGULAR-MATERIAL-SETUP.md'));
cpSync(resolve(root, 'tokens/AEGISX-TOKENS-SPEC.md'),     resolve(out, 'tokens/AEGISX-TOKENS-SPEC.md'));
cpSync(resolve(root, 'AEGISX-DESIGN-PRINCIPLES.md'),      resolve(out, 'AEGISX-DESIGN-PRINCIPLES.md'));

const socialDir = resolve(root, 'logo/social');
const socialFiles = readdirSync(socialDir).filter((f) => f.endsWith('.png')).sort();

const SOCIAL_GROUPS = {
  GitHub: ['github-org-avatar-400', 'github-social-preview-1280x640', 'github-readme-banner-1200x300'],
  'X / Twitter': ['twitter-profile-400', 'twitter-header-1500x500', 'twitter-card-1200x628'],
  LinkedIn: ['linkedin-profile-400', 'linkedin-cover-1584x396', 'linkedin-share-1200x627'],
  Facebook: ['facebook-profile-320', 'facebook-cover-820x312', 'facebook-share-1200x630'],
  YouTube: ['youtube-channel-icon-800', 'youtube-banner-2560x1440'],
  'Slack / Discord': ['slack-workspace-512', 'discord-server-512'],
  'Open Graph': ['opengraph-1200x630'],
};

const SOCIAL_NOTES = {
  'github-org-avatar-400': 'Org → Settings → Profile picture',
  'github-social-preview-1280x640': 'Repo → Settings → Social preview',
  'github-readme-banner-1200x300': 'Top of README.md',
  'twitter-profile-400': 'Profile picture', 'twitter-header-1500x500': 'Profile header', 'twitter-card-1200x628': 'twitter:image meta',
  'linkedin-profile-400': 'Company logo', 'linkedin-cover-1584x396': 'Company cover', 'linkedin-share-1200x627': 'Post share',
  'facebook-profile-320': 'Page profile', 'facebook-cover-820x312': 'Page cover', 'facebook-share-1200x630': 'OG share',
  'youtube-channel-icon-800': 'Channel avatar', 'youtube-banner-2560x1440': 'Banner (1546×423 safe)',
  'slack-workspace-512': 'Workspace icon', 'discord-server-512': 'Server icon',
  'opengraph-1200x630': 'og:image universal',
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

const TW_50 = { blue: '#eff6ff', emerald: '#ecfdf5', slate: '#f8fafc', yellow: '#fefce8', indigo: '#eef2ff', red: '#fef2f2', cyan: '#ecfeff', orange: '#fff7ed', sky: '#f0f9ff', teal: '#f0fdfa', pink: '#fdf2f8', green: '#f0fdf4', violet: '#f5f3ff', lime: '#f7fee7', gray: '#f9fafb', amber: '#fffbeb', purple: '#faf5ff' };

const iconBgHex = (bg) => TW_50[bg.replace('bg-', '').replace('-50', '')] ?? '#fafafa';
const renderIcon = (name) => {
  const c = colorMap[name];
  const fg = c?.hex ?? '#71717a';
  const bg = c ? iconBgHex(c.bg) : '#fafafa';
  const snippet = `<mat-icon svgIcon="${name}"></mat-icon>`;
  return `
    <figure class="ax-icon-tile" data-name="${name}" data-snippet="${snippet.replace(/"/g, '&quot;')}" tabindex="0" title="Click to copy ${name}">
      <div class="ax-icon-tile__badge" style="background:${bg};color:${fg}"><img src="assets/icons/${name}.svg" alt=""></div>
      <figcaption>${name}</figcaption>
    </figure>`;
};
const renderCategory = (cat, names) => `
  <details class="ax-icon-cat">
    <summary><span>${cat}</span><span class="count">${names.length}</span></summary>
    <div class="ax-icon-grid">${names.map(renderIcon).join('')}</div>
  </details>`;

const html = `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AegisX Design System</title>
<meta name="description" content="Clean Clinical SaaS design system for the AegisX Hospital Platform — tokens, components, brand assets, Angular Material v3.">
<link rel="icon" href="assets/logo/favicons/favicon.ico">
<link rel="apple-touch-icon" href="assets/logo/favicons/apple-touch-icon.png">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens/css/tokens.css">
<link rel="stylesheet" href="tokens/css/components.css">
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: var(--ax-font-sans);
    font-size: var(--ax-text-sm-size);
    line-height: var(--ax-text-sm-line);
    color: var(--ax-text-default);
    background: var(--ax-background-page);
  }
  a { color: var(--ax-primary); text-decoration: none; }
  a:hover { text-decoration: underline; }
  code { font-family: var(--ax-font-mono); font-size: var(--ax-text-xs-size); background: var(--ax-background-subtle); color: var(--ax-text-default); padding: 1px 6px; border-radius: var(--ax-radius-xs); }

  /* ── Top bar ─────────────────────────────── */
  .ax-topbar {
    position: sticky; top: 0; z-index: var(--ax-z-sticky);
    background: var(--ax-background-default);
    border-bottom: 1px solid var(--ax-border-default);
    padding: var(--ax-spacing-md) var(--ax-spacing-xl);
    display: flex; align-items: center; gap: var(--ax-spacing-lg);
  }
  .ax-topbar__brand { display: flex; align-items: center; gap: var(--ax-spacing-sm); font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading); font-size: var(--ax-text-md-size); }
  .ax-topbar__brand img { height: 22px; }
  .ax-topbar nav { flex: 1; display: flex; gap: var(--ax-spacing-xl); overflow-x: auto; }
  .ax-topbar nav a { color: var(--ax-text-secondary); font-weight: var(--ax-font-weight-medium); font-size: var(--ax-text-sm-size); white-space: nowrap; }
  .ax-topbar nav a:hover { color: var(--ax-text-heading); text-decoration: none; }
  .ax-topbar__version { font-family: var(--ax-font-mono); font-size: var(--ax-text-xs-size); color: var(--ax-text-secondary); padding: 4px 10px; border-radius: var(--ax-radius-full); background: var(--ax-background-muted); }

  /* ── Hero ────────────────────────────────── */
  .ax-hero {
    position: relative;
    background:
      radial-gradient(ellipse at 20% 30%, rgba(99,102,241,.18), transparent 55%),
      radial-gradient(ellipse at 80% 80%, rgba(56,189,248,.10), transparent 55%),
      url('assets/brand/aegisx-brand-bg.svg') center/cover,
      var(--ax-color-zinc-950);
    color: #fff;
    padding: 64px var(--ax-spacing-xl) 56px;
    overflow: hidden;
  }
  .ax-hero__inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .ax-hero__logo { display: flex; align-items: center; gap: var(--ax-spacing-md); margin-bottom: var(--ax-spacing-xl); }
  .ax-hero__logo img { height: 44px; }
  .ax-hero h1 {
    margin: 0 0 var(--ax-spacing-md);
    font-size: var(--ax-display-md-size);
    line-height: var(--ax-display-md-line);
    font-weight: var(--ax-font-weight-semibold);
    letter-spacing: var(--ax-display-md-tracking);
    color: #fff;
    max-width: 720px;
  }
  .ax-hero p.lead {
    margin: 0 0 var(--ax-spacing-xl);
    font-size: var(--ax-text-lg-size);
    line-height: var(--ax-text-lg-line);
    color: rgba(255,255,255,.78);
    max-width: 640px;
  }
  .ax-hero__pillars { display: flex; gap: var(--ax-spacing-sm); flex-wrap: wrap; margin-bottom: var(--ax-spacing-2xl); }
  .ax-hero__pillars span {
    font-size: var(--ax-text-xs-size);
    font-family: var(--ax-font-mono);
    padding: 6px 12px;
    border-radius: var(--ax-radius-full);
    background: rgba(255,255,255,.08);
    color: rgba(255,255,255,.85);
    border: 1px solid rgba(255,255,255,.12);
  }
  .ax-hero__cta { display: flex; gap: var(--ax-spacing-md); flex-wrap: wrap; }
  .ax-hero__cta .ax-button { font-size: var(--ax-text-sm-size); }
  .ax-hero__cta .ax-button--primary { background: #fff; color: var(--ax-color-zinc-900); }
  .ax-hero__cta .ax-button--primary:hover { background: var(--ax-color-zinc-100); }
  .ax-hero__cta .ax-button--ghost { background: rgba(255,255,255,.08); color: #fff; border-color: rgba(255,255,255,.18); }
  .ax-hero__cta .ax-button--ghost:hover { background: rgba(255,255,255,.14); }

  /* ── Stats strip ─────────────────────────── */
  .ax-stats {
    background: var(--ax-background-default);
    border-bottom: 1px solid var(--ax-border-default);
    padding: var(--ax-spacing-xl);
  }
  .ax-stats__grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--ax-spacing-xl); text-align: center; }
  .ax-stats .n { display: block; font-size: var(--ax-display-xs-size); line-height: var(--ax-display-xs-line); font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading); letter-spacing: -0.02em; }
  .ax-stats .l { display: block; font-size: var(--ax-text-xs-size); color: var(--ax-text-secondary); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }

  /* ── Section ─────────────────────────────── */
  main { max-width: 1200px; margin: 0 auto; padding: var(--ax-spacing-3xl) var(--ax-spacing-xl); }
  .ax-section + .ax-section { margin-top: var(--ax-spacing-4xl); }
  .ax-section__head { margin-bottom: var(--ax-spacing-xl); }
  .ax-section__eyebrow { font-size: var(--ax-text-xs-size); font-weight: var(--ax-font-weight-medium); color: var(--ax-primary); text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 var(--ax-spacing-xs); }
  .ax-section__head h2 { margin: 0 0 var(--ax-spacing-xs); font-size: var(--ax-display-xs-size); line-height: var(--ax-display-xs-line); font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading); }
  .ax-section__head p { margin: 0; font-size: var(--ax-text-md-size); color: var(--ax-text-secondary); max-width: 640px; }

  /* ── Pillar cards ────────────────────────── */
  .ax-pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--ax-spacing-md); }
  .ax-pillar { background: var(--ax-background-default); border: 1px solid var(--ax-border-default); border-radius: var(--ax-radius-lg); padding: var(--ax-spacing-lg) var(--ax-spacing-xl); }
  .ax-pillar__icon { width: 32px; height: 32px; border-radius: var(--ax-radius-md); display: grid; place-items: center; background: var(--ax-brand-faint); color: var(--ax-brand-emphasis); font-weight: 700; margin-bottom: var(--ax-spacing-sm); }
  .ax-pillar h3 { margin: 0 0 4px; font-size: var(--ax-text-md-size); font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading); }
  .ax-pillar p { margin: 0; color: var(--ax-text-secondary); font-size: var(--ax-text-sm-size); }

  /* ── Foundation previews ─────────────────── */
  .ax-found-grid { display: grid; gap: var(--ax-spacing-md); grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .ax-found-card { background: var(--ax-background-default); border: 1px solid var(--ax-border-default); border-radius: var(--ax-radius-lg); padding: var(--ax-spacing-xl); display: flex; flex-direction: column; gap: var(--ax-spacing-md); }
  .ax-found-card h3 { margin: 0; font-size: var(--ax-text-md-size); font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading); }
  .ax-found-card .desc { margin: 0; color: var(--ax-text-secondary); font-size: var(--ax-text-sm-size); }
  .ax-found-card .preview { padding: var(--ax-spacing-md); background: var(--ax-background-muted); border-radius: var(--ax-radius-md); }
  .ax-found-card .more { font-size: var(--ax-text-xs-size); color: var(--ax-primary); font-weight: var(--ax-font-weight-medium); margin-top: auto; }

  .pal-strip { display: flex; gap: 4px; }
  .pal-strip span { flex: 1; aspect-ratio: 1; border-radius: var(--ax-radius-xs); }
  .type-stack { display: flex; flex-direction: column; gap: 6px; line-height: 1.1; color: var(--ax-text-heading); }
  .type-stack .t1 { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; }
  .type-stack .t2 { font-size: 18px; font-weight: 600; }
  .type-stack .t3 { font-size: 14px; font-weight: 400; color: var(--ax-text-default); }
  .space-stack { display: flex; flex-direction: column; gap: 6px; }
  .space-stack div { background: var(--ax-primary); border-radius: var(--ax-radius-xs); height: 10px; }
  .shadow-stack { display: flex; gap: 8px; align-items: flex-end; }
  .shadow-stack > div { flex: 1; height: 50px; background: #fff; border-radius: var(--ax-radius-md); }

  /* ── Component preview ───────────────────── */
  .ax-comp-preview { background: var(--ax-background-default); border: 1px solid var(--ax-border-default); border-radius: var(--ax-radius-lg); padding: var(--ax-spacing-xl); display: flex; flex-direction: column; gap: var(--ax-spacing-lg); }
  .ax-comp-row { display: flex; gap: var(--ax-spacing-sm); flex-wrap: wrap; align-items: center; padding-bottom: var(--ax-spacing-md); border-bottom: 1px solid var(--ax-border-subtle); }
  .ax-comp-row:last-child { border-bottom: 0; padding-bottom: 0; }
  .ax-comp-row__label { font-size: var(--ax-text-xs-size); color: var(--ax-text-secondary); text-transform: uppercase; letter-spacing: 0.08em; min-width: 100px; }

  /* ── Logos ───────────────────────────────── */
  .ax-logo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--ax-spacing-md); }
  .ax-logo-tile { background: var(--ax-background-default); border: 1px solid var(--ax-border-default); border-radius: var(--ax-radius-lg); overflow: hidden; }
  .ax-logo-tile .stage { padding: 32px; min-height: 130px; display: grid; place-items: center; background: #fff; }
  .ax-logo-tile .stage.dark { background: var(--ax-color-zinc-950); }
  .ax-logo-tile .stage.grey { background: var(--ax-background-muted); }
  .ax-logo-tile .meta { padding: var(--ax-spacing-md) var(--ax-spacing-lg); border-top: 1px solid var(--ax-border-subtle); display: flex; justify-content: space-between; align-items: center; }
  .ax-logo-tile .meta code { background: transparent; padding: 0; }

  /* ── Brand bg ────────────────────────────── */
  .ax-brand-bg { background: var(--ax-background-default); border: 1px solid var(--ax-border-default); border-radius: var(--ax-radius-lg); overflow: hidden; }
  .ax-brand-bg .preview { min-height: 280px; background: url('assets/brand/aegisx-brand-bg.svg') center/cover; }

  /* ── Social cards ────────────────────────── */
  .ax-social-grp { margin-top: var(--ax-spacing-xl); }
  .ax-social-grp h3 { margin: 0 0 var(--ax-spacing-md); font-size: var(--ax-text-xs-size); text-transform: uppercase; letter-spacing: 0.08em; color: var(--ax-text-secondary); font-weight: var(--ax-font-weight-medium); }
  .ax-social-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--ax-spacing-md); }
  .ax-social-card { background: var(--ax-background-default); border: 1px solid var(--ax-border-default); border-radius: var(--ax-radius-lg); overflow: hidden; transition: border-color var(--ax-duration-fast); }
  .ax-social-card:hover { border-color: var(--ax-border-emphasis); }
  .ax-social-card .preview { aspect-ratio: 16/10; background: repeating-conic-gradient(var(--ax-background-muted) 0% 25%, var(--ax-background-default) 0% 50%) 50% / 16px 16px; display: grid; place-items: center; padding: 8px; }
  .ax-social-card .preview.square { aspect-ratio: 1; }
  .ax-social-card .preview img { max-width: 100%; max-height: 100%; object-fit: contain; }
  .ax-social-card .meta { padding: var(--ax-spacing-md); border-top: 1px solid var(--ax-border-subtle); }
  .ax-social-card .meta .name { font-family: var(--ax-font-mono); font-size: 11px; color: var(--ax-text-default); word-break: break-all; }
  .ax-social-card .meta .dim { font-size: 10px; color: var(--ax-text-subtle); margin-top: 2px; }
  .ax-social-card .meta .where { font-size: var(--ax-text-xs-size); color: var(--ax-text-secondary); margin-top: 6px; }
  .ax-social-card .meta .actions { display: flex; gap: 8px; margin-top: var(--ax-spacing-sm); }
  .ax-social-card .meta .actions a { flex: 1; text-align: center; padding: 6px 10px; border-radius: var(--ax-radius-sm); font-size: var(--ax-text-xs-size); font-weight: var(--ax-font-weight-medium); }
  .ax-social-card .meta .actions a.dl { background: var(--ax-primary); color: #fff; }
  .ax-social-card .meta .actions a.dl:hover { background: var(--ax-primary-dark); text-decoration: none; }
  .ax-social-card .meta .actions a.view { background: var(--ax-background-subtle); color: var(--ax-text-default); }
  .ax-social-card .meta .actions a.view:hover { background: var(--ax-background-muted); text-decoration: none; }

  /* ── Icons gallery ───────────────────────── */
  .ax-icon-cat { background: var(--ax-background-default); border: 1px solid var(--ax-border-default); border-radius: var(--ax-radius-lg); margin-bottom: var(--ax-spacing-md); padding: var(--ax-spacing-md) var(--ax-spacing-xl); }
  .ax-icon-cat summary { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: var(--ax-spacing-sm) 0; font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading); font-size: var(--ax-text-md-size); }
  .ax-icon-cat summary .count { font-family: var(--ax-font-mono); font-size: var(--ax-text-xs-size); color: var(--ax-text-secondary); }
  .ax-icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: var(--ax-spacing-sm); padding: var(--ax-spacing-md) 0; }
  .ax-icon-tile { margin: 0; padding: var(--ax-spacing-md) var(--ax-spacing-sm); background: var(--ax-background-default); border: 1px solid var(--ax-border-subtle); border-radius: var(--ax-radius-md); text-align: center; cursor: pointer; transition: all var(--ax-duration-fast); position: relative; }
  .ax-icon-tile:hover { border-color: var(--ax-primary); transform: translateY(-1px); box-shadow: var(--ax-shadow-sm); }
  .ax-icon-tile:focus { outline: none; box-shadow: var(--ax-focus-ring); }
  .ax-icon-tile.copied::after { content: 'Copied!'; position: absolute; top: 6px; right: 6px; background: var(--ax-success-default); color: #fff; font-size: 9px; padding: 2px 6px; border-radius: var(--ax-radius-full); }
  .ax-icon-tile__badge { width: 44px; height: 44px; margin: 0 auto var(--ax-spacing-sm); display: grid; place-items: center; border-radius: var(--ax-radius-md); }
  .ax-icon-tile__badge img { width: 22px; height: 22px; }
  .ax-icon-tile figcaption { display: block; font-family: var(--ax-font-mono); font-size: 10px; color: var(--ax-text-default); word-break: break-all; line-height: 1.3; }

  /* ── Code blocks ─────────────────────────── */
  .ax-code { background: var(--ax-color-zinc-950); color: var(--ax-color-zinc-200); padding: var(--ax-spacing-lg); border-radius: var(--ax-radius-md); font-family: var(--ax-font-mono); font-size: var(--ax-text-xs-size); line-height: 1.7; overflow-x: auto; position: relative; }
  .ax-code .lang { position: absolute; top: 8px; right: 12px; font-size: 9px; color: var(--ax-color-zinc-500); text-transform: uppercase; letter-spacing: 0.08em; }
  .ax-code .c { color: var(--ax-color-zinc-500); }
  .ax-code .k { color: #c084fc; }
  .ax-code .s { color: var(--ax-color-green-300); }
  .ax-code .t { color: var(--ax-color-blue-300); }
  .ax-code .a { color: var(--ax-color-amber-300); }

  /* ── Two-col split for designer/developer ── */
  .ax-split { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: var(--ax-spacing-xl); }
  .ax-card-block { background: var(--ax-background-default); border: 1px solid var(--ax-border-default); border-radius: var(--ax-radius-lg); padding: var(--ax-spacing-xl); display: flex; flex-direction: column; gap: var(--ax-spacing-md); }
  .ax-card-block h3 { margin: 0; font-size: var(--ax-text-md-size); font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading); display: flex; align-items: center; gap: var(--ax-spacing-sm); }
  .ax-card-block .badge { font-size: 10px; font-family: var(--ax-font-mono); padding: 2px 8px; border-radius: var(--ax-radius-full); background: var(--ax-brand-faint); color: var(--ax-brand-emphasis); }
  .ax-card-block ul { margin: 0; padding-left: var(--ax-spacing-lg); color: var(--ax-text-default); }
  .ax-card-block ul li { margin-bottom: 4px; }

  /* ── Footer ──────────────────────────────── */
  .ax-footer { background: var(--ax-background-default); border-top: 1px solid var(--ax-border-default); padding: var(--ax-spacing-xl); margin-top: var(--ax-spacing-4xl); }
  .ax-footer__inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--ax-spacing-md); }
  .ax-footer .name { font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading); font-size: var(--ax-text-sm-size); }
  .ax-footer .meta { font-size: var(--ax-text-xs-size); color: var(--ax-text-secondary); }
  .ax-footer .links { display: flex; gap: var(--ax-spacing-lg); font-size: var(--ax-text-xs-size); }

  @media (max-width: 720px) {
    .ax-hero { padding: var(--ax-spacing-3xl) var(--ax-spacing-lg); }
    .ax-hero h1 { font-size: var(--ax-display-sm-size); line-height: var(--ax-display-sm-line); }
    main { padding: var(--ax-spacing-2xl) var(--ax-spacing-lg); }
    .ax-topbar nav { display: none; }
  }
</style>
</head>
<body>

<header class="ax-topbar">
  <a class="ax-topbar__brand" href="#top">
    <img src="assets/logo/icon-light.svg" alt="">
    <span>AegisX Design System</span>
  </a>
  <nav>
    <a href="#foundations">Foundations</a>
    <a href="#components">Components</a>
    <a href="#brand">Brand</a>
    <a href="#developers">Developers</a>
    <a href="#designers">Designers</a>
    <a href="pages/">Tokens ↗</a>
    <a href="pages/components.html">Components ↗</a>
    <a href="pages/navigation.html">Navigation ↗</a>
    <a href="pages/a11y.html">A11y ↗</a>
  </nav>
  <span class="ax-topbar__version">${pkg.name}@${pkg.version}</span>
</header>

<section class="ax-hero" id="top">
  <div class="ax-hero__inner">
    <div class="ax-hero__logo">
      <img src="assets/logo/horizontal-dark.svg" alt="AegisX">
    </div>
    <h1>Design system for the AegisX Hospital Platform.</h1>
    <p class="lead">Tokens, components, brand assets, and an Angular Material v3 bridge — all built on five principles: calm, high-contrast, Thai-first, clinical-dense, no ornamentation.</p>
    <div class="ax-hero__pillars">
      <span>Calm</span><span>High-contrast</span><span>Thai-first</span><span>Clinical-dense</span><span>No ornamentation</span>
    </div>
    <div class="ax-hero__cta">
      <a class="ax-button ax-button--primary ax-button--lg" href="#foundations">Browse foundations</a>
      <a class="ax-button ax-button--ghost ax-button--lg" href="#components">View components</a>
    </div>
  </div>
</section>

<section class="ax-stats">
  <div class="ax-stats__grid">
    <div><span class="n">${svgIcons.length}</span><span class="l">icons</span></div>
    <div><span class="n">8</span><span class="l">logo lockups</span></div>
    <div><span class="n">5</span><span class="l">status palettes</span></div>
    <div><span class="n">4</span><span class="l">native bindings</span></div>
    <div><span class="n">v${pkg.version}</span><span class="l">latest release</span></div>
  </div>
</section>

<main>

  <!-- ─────────── Principles ─────────── -->
  <section class="ax-section" id="principles">
    <div class="ax-section__head">
      <p class="ax-section__eyebrow">North star</p>
      <h2>Five principles, in five words.</h2>
      <p>Every design decision serves one of these. If it doesn't, it doesn't ship.</p>
    </div>
    <div class="ax-pillars">
      <div class="ax-pillar"><div class="ax-pillar__icon">·</div><h3>Calm</h3><p>Color is expensive. Use only where meaning changes.</p></div>
      <div class="ax-pillar"><div class="ax-pillar__icon">↑</div><h3>High-contrast</h3><p>WCAG 2.1 AA minimum. AAA preferred for body text.</p></div>
      <div class="ax-pillar"><div class="ax-pillar__icon">ก</div><h3>Thai-first</h3><p>IBM Plex Sans Thai leads. Line-height ≥ 1.5 for vowel marks.</p></div>
      <div class="ax-pillar"><div class="ax-pillar__icon">⚕</div><h3>Clinical-dense</h3><p>14px body, 40px row height, 48px display max.</p></div>
      <div class="ax-pillar"><div class="ax-pillar__icon">⌿</div><h3>No ornament</h3><p>Border &gt; shadow &gt; gradient. Every pixel earns its seat.</p></div>
    </div>
    <p style="margin-top: var(--ax-spacing-md); font-size: var(--ax-text-sm-size); color: var(--ax-text-secondary);">→ Read the full <a href="AEGISX-DESIGN-PRINCIPLES.md">design principles</a></p>
  </section>

  <!-- ─────────── Foundations ─────────── -->
  <section class="ax-section" id="foundations">
    <div class="ax-section__head">
      <p class="ax-section__eyebrow">Layer 1 + 2</p>
      <h2>Foundations.</h2>
      <p>Tailwind Zinc + Indigo · IBM Plex Sans Thai · 14px clinical body. Three-layer tokens: primitive → semantic → component.</p>
    </div>
    <div class="ax-found-grid">
      <div class="ax-found-card">
        <h3>Color · Zinc + Indigo</h3>
        <p class="desc">Neutral Zinc dominates surfaces. Indigo for actions. 5 status hues for messaging.</p>
        <div class="preview">
          <div class="pal-strip" style="margin-bottom:6px;">
            <span style="background:var(--ax-color-zinc-50)"></span><span style="background:var(--ax-color-zinc-200)"></span><span style="background:var(--ax-color-zinc-400)"></span><span style="background:var(--ax-color-zinc-500)"></span><span style="background:var(--ax-color-zinc-700)"></span><span style="background:var(--ax-color-zinc-900)"></span>
          </div>
          <div class="pal-strip" style="margin-bottom:6px;">
            <span style="background:var(--ax-color-indigo-100)"></span><span style="background:var(--ax-color-indigo-300)"></span><span style="background:var(--ax-color-indigo-500)"></span><span style="background:var(--ax-color-indigo-700)"></span>
          </div>
          <div class="pal-strip">
            <span style="background:var(--ax-success-default)"></span><span style="background:var(--ax-warning-default)"></span><span style="background:var(--ax-error-default)"></span><span style="background:var(--ax-info-default)"></span>
          </div>
        </div>
        <a class="more" href="pages/tokens.html#palette">Explore palette →</a>
      </div>

      <div class="ax-found-card">
        <h3>Typography · IBM Plex</h3>
        <p class="desc">Thai-first stack. Display 24–48px, body capped at 14px for clinical density.</p>
        <div class="preview">
          <div class="type-stack">
            <span class="t1">AegisX สวัสดี</span>
            <span class="t2">Display headline</span>
            <span class="t3">Body 14px · บอดี้ภาษาไทย</span>
          </div>
        </div>
        <a class="more" href="pages/tokens.html#typography">Explore typography →</a>
      </div>

      <div class="ax-found-card">
        <h3>Spacing · 4pt grid</h3>
        <p class="desc">xs → 4xl scale. Default gap 16px, card padding 24px.</p>
        <div class="preview">
          <div class="space-stack">
            <div style="width:12.5%"></div>
            <div style="width:25%"></div>
            <div style="width:37.5%"></div>
            <div style="width:50%"></div>
            <div style="width:75%"></div>
            <div style="width:100%"></div>
          </div>
        </div>
        <a class="more" href="pages/tokens.html#spacing">Explore spacing →</a>
      </div>

      <div class="ax-found-card">
        <h3>Shadow · Untitled UI soft</h3>
        <p class="desc">elevation-0 to 4. Subtle borders do most of the work; shadows only for floating UI.</p>
        <div class="preview">
          <div class="shadow-stack">
            <div style="box-shadow: var(--ax-shadow-sm)"></div>
            <div style="box-shadow: var(--ax-shadow-md)"></div>
            <div style="box-shadow: var(--ax-shadow-lg)"></div>
          </div>
        </div>
        <a class="more" href="pages/tokens.html#shadow">Explore elevation →</a>
      </div>
    </div>
  </section>

  <!-- ─────────── Components ─────────── -->
  <section class="ax-section" id="components">
    <div class="ax-section__head">
      <p class="ax-section__eyebrow">Layer 3</p>
      <h2>Components.</h2>
      <p>Token-driven primitives. Importable as <code>tokens/css/components.css</code> or pulled through Angular Material via the bridge.</p>
    </div>
    <div class="ax-comp-preview">
      <div class="ax-comp-row">
        <span class="ax-comp-row__label">Buttons</span>
        <button class="ax-button ax-button--primary">Primary</button>
        <button class="ax-button ax-button--secondary">Secondary</button>
        <button class="ax-button ax-button--outline">Outline</button>
        <button class="ax-button ax-button--ghost">Ghost</button>
        <button class="ax-button ax-button--danger">Danger</button>
      </div>
      <div class="ax-comp-row">
        <span class="ax-comp-row__label">Badges</span>
        <span class="ax-badge ax-badge--soft-success">Active</span>
        <span class="ax-badge ax-badge--soft-warning">Pending</span>
        <span class="ax-badge ax-badge--soft-error">Rejected</span>
        <span class="ax-badge ax-badge--soft-info">Draft</span>
        <span class="ax-badge ax-badge--solid-brand">New</span>
      </div>
      <div class="ax-comp-row">
        <span class="ax-comp-row__label">Alert</span>
        <div class="ax-alert ax-alert--info" style="flex:1;">
          <div class="ax-alert__icon">i</div>
          <div class="ax-alert__body"><p class="ax-alert__title">Lab results received</p><p class="ax-alert__text">HN-44821 · Reviewed by Dr. Chaiyaphum</p></div>
        </div>
      </div>
      <div class="ax-comp-row">
        <span class="ax-comp-row__label">Field</span>
        <div class="ax-field" style="flex:1; max-width:320px;">
          <label class="ax-field__label">Patient ID</label>
          <input class="ax-input" placeholder="HN-#####">
        </div>
      </div>
    </div>
    <p style="margin-top: var(--ax-spacing-md); font-size: var(--ax-text-sm-size); color: var(--ax-text-secondary);">→ View all components in the <a href="pages/components.html">component preview</a></p>
  </section>

  <!-- ─────────── Brand ─────────── -->
  <section class="ax-section" id="brand">
    <div class="ax-section__head">
      <p class="ax-section__eyebrow">Identity</p>
      <h2>Brand.</h2>
      <p>Pick the lockup that matches your background. Click any tile to download the SVG.</p>
    </div>
    <div class="ax-logo-grid">
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
      <div class="ax-logo-tile">
        <div class="stage ${stage}"><img src="assets/logo/${f}.svg" style="width:${w}px;height:auto;"></div>
        <div class="meta"><code>${f}.svg</code><a href="assets/logo/${f}.svg" download>↓</a></div>
      </div>`).join('')}
    </div>

    <div style="margin-top: var(--ax-spacing-xl);">
      <h3 style="margin: 0 0 var(--ax-spacing-md); font-size: var(--ax-text-md-size); font-weight: var(--ax-font-weight-semibold); color: var(--ax-text-heading);">Brand background</h3>
      <div class="ax-brand-bg">
        <div class="preview"></div>
        <div style="padding: var(--ax-spacing-md) var(--ax-spacing-lg); border-top: 1px solid var(--ax-border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <code>brand/aegisx-brand-bg.svg</code>
          <a href="assets/brand/aegisx-brand-bg.svg" download>↓ download</a>
        </div>
      </div>
    </div>

    <p style="margin: var(--ax-spacing-md) 0 0; font-size: var(--ax-text-sm-size); color: var(--ax-text-secondary);">→ Social media assets (${socialFiles.length} PNGs) + favicons available on the <a href="mockups.html">mockups page</a></p>
  </section>

  <!-- ─────────── Icons ─────────── -->
  <section class="ax-section" id="icons">
    <div class="ax-section__head">
      <p class="ax-section__eyebrow">${svgIcons.length} mono icons · ${Object.keys(byCategory).length} categories</p>
      <h2>Icon library.</h2>
      <p>Click any icon to copy its <code>&lt;mat-icon&gt;</code> snippet.</p>
    </div>
    ${Object.entries(byCategory).sort().map(([cat, names]) => renderCategory(cat, names)).join('')}
  </section>

  <!-- ─────────── Developer + Designer paths ─────────── -->
  <section class="ax-section" id="developers">
    <div class="ax-section__head">
      <p class="ax-section__eyebrow">Pick your lane</p>
      <h2>Two ways in.</h2>
    </div>

    <div class="ax-split">
      <div class="ax-card-block">
        <h3>Developers <span class="badge">npm</span></h3>
        <p style="margin: 0; color: var(--ax-text-secondary); font-size: var(--ax-text-sm-size);">Install via GitHub Packages, then import tokens or component CSS directly.</p>

        <pre class="ax-code"><span class="lang">.npmrc</span><span class="c"># In repo root</span>
@aegisx-platform:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}</pre>

        <pre class="ax-code"><span class="lang">terminal</span>pnpm add @aegisx-platform/design-system</pre>

        <pre class="ax-code"><span class="lang">styles.scss</span><span class="k">@import</span> <span class="s">'@aegisx-platform/design-system/tokens/css/tokens.css'</span>;
<span class="k">@import</span> <span class="s">'@aegisx-platform/design-system/tokens/css/components.css'</span>;
<span class="c">// Angular Material v3</span>
<span class="k">@use</span>   <span class="s">'@aegisx-platform/design-system/tokens/scss/material-theme'</span>;
<span class="k">@use</span>   <span class="s">'@aegisx-platform/design-system/tokens/scss/material-bridge'</span>;
<span class="k">@use</span>   <span class="s">'@aegisx-platform/design-system/tokens/scss/material-overrides'</span>;</pre>

        <h3 style="margin-top: var(--ax-spacing-md); font-size: var(--ax-text-sm-size); font-weight: var(--ax-font-weight-medium); text-transform: uppercase; letter-spacing: 0.08em; color: var(--ax-text-secondary);">Native bindings</h3>
        <ul>
          <li><code>tokens/tailwind/tailwind-preset.cjs</code> — Tailwind v3 preset</li>
          <li><code>tokens/ios/AegisXTokens.swift</code> — SwiftUI</li>
          <li><code>tokens/android/{colors,dimens}.xml</code> — Android resources</li>
          <li><code>tokens/flutter/aegisx_tokens.dart</code> — Flutter</li>
        </ul>

        <p style="margin: 0; font-size: var(--ax-text-sm-size);">→ Full guide: <a href="tokens/ANGULAR-MATERIAL-SETUP.md">Angular Material setup</a></p>
      </div>

      <div class="ax-card-block" id="designers">
        <h3>Designers <span class="badge">Figma</span></h3>
        <p style="margin: 0; color: var(--ax-text-secondary); font-size: var(--ax-text-sm-size);">Pull tokens into Figma via Tokens Studio. Get the brand asset bundle from the brand section above.</p>

        <pre class="ax-code"><span class="lang">tokens-studio config</span><span class="c"># In Figma → Tokens Studio plugin</span>
File: tokens/aegisx-tokens.json       <span class="c"># base set</span>
File: tokens/aegisx-tokens-dark.json  <span class="c"># dark overrides</span>

<span class="c"># Sync workflow:</span>
<span class="c"># 1. Designer edits in Figma → exports back to JSON</span>
<span class="c"># 2. Engineer ports change into dtcg/*.json</span>
<span class="c"># 3. pnpm tokens:studio regenerates aegisx-tokens.json</span></pre>

        <h3 style="margin-top: var(--ax-spacing-md); font-size: var(--ax-text-sm-size); font-weight: var(--ax-font-weight-medium); text-transform: uppercase; letter-spacing: 0.08em; color: var(--ax-text-secondary);">Reference docs</h3>
        <ul>
          <li><a href="AEGISX-DESIGN-PRINCIPLES.md">Design principles</a> — five pillars + domain-token policy</li>
          <li><a href="tokens/AEGISX-TOKENS-SPEC.md">Tokens spec</a> — three-layer architecture</li>
          <li><a href="pages/tokens.html">Live token preview</a> — palette, typography, spacing</li>
          <li><a href="pages/a11y.html">A11y audit</a> — WCAG contrast for every pair</li>
        </ul>

        <p style="margin: 0; font-size: var(--ax-text-sm-size);">→ Brand assets in the <a href="#brand">Brand section</a> above</p>
      </div>
    </div>
  </section>

</main>

<footer class="ax-footer">
  <div class="ax-footer__inner">
    <span class="name">${pkg.name}</span>
    <span class="meta">v${pkg.version} · ${svgIcons.length} icons · ${Object.keys(byCategory).length} categories · ${socialFiles.length} social assets</span>
    <div class="links">
      <a href="https://github.com/aegisx-platform/aegisx-design-system" target="_blank" rel="noopener">GitHub</a>
      <a href="https://github.com/aegisx-platform/aegisx-design-system/releases">Releases</a>
      <a href="CHANGELOG.md">Changelog</a>
      <a href="CONTRIBUTING.md">Contribute</a>
    </div>
  </div>
</footer>

<script>
  document.querySelectorAll('.ax-icon-tile').forEach((el) => {
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

// Copy markdown docs that the site links to (so navigation doesn't 404)
for (const md of ['CHANGELOG.md', 'CONTRIBUTING.md']) {
  const src = resolve(root, md);
  if (existsSync(src)) cpSync(src, resolve(out, md));
}

// Copy static pages (mockups)
const siteSrc = resolve(root, 'site-src');
if (existsSync(siteSrc)) cpSync(siteSrc, out, { recursive: true });

console.log(`✓ Built site/ (${svgIcons.length} icons, ${Object.keys(byCategory).length} categories)`);
