#!/usr/bin/env node
/**
 * Compose social-media banner SVGs from the source logo + brand bg,
 * then render each to PNG via macOS `sips`.
 *
 * Output: logo/social/{src/*.svg, *.png}
 *
 * Each spec defines width × height, logo size & x-offset, optional
 * tagline. The composer inlines the horizontal-mono-inverse logo so
 * the brand stack is always pixel-correct, never reflowed.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = resolve(root, 'logo/social');
const srcDir = resolve(outDir, 'src');
mkdirSync(srcDir, { recursive: true });

// Strip outer <svg> wrapper from horizontal-mono-inverse to get just the
// inner shapes — we'll re-wrap in a translated <g> per banner.
const horizontalRaw = readFileSync(resolve(root, 'logo/horizontal-mono-inverse.svg'), 'utf8');
const horizontalInner = horizontalRaw
  .replace(/^[\s\S]*?<svg[^>]*viewBox="0 0 220 80"[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '');

/** Clean background — flat navy with a single subtle radial glow.
 *  No decorative diamond / EKG shapes — those would conflict with the
 *  logo mark itself. Logo speaks; background stays out of its way. */
function bgDefs(w, h) {
  return `
  <defs>
    <radialGradient id="bg-glow" cx="${w / 2}" cy="${h / 2}" r="${Math.max(w, h) * 0.6}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1e293b"/>
      <stop offset="1" stop-color="#0f172a"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg-glow)"/>`;
}

function composeWithLogo({ width, height, logoScale, logoX, logoY, tagline, taglineY, taglineSize = 18 }) {
  const lw = 220 * logoScale, lh = 80 * logoScale;
  const lx = logoX ?? (width - lw) / 2;
  const ly = logoY ?? (height - lh) / 2 - (tagline ? 30 : 0);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${bgDefs(width, height)}
  <g transform="translate(${lx} ${ly}) scale(${logoScale})" font-family="-apple-system, 'Segoe UI', Roboto, sans-serif">
    ${horizontalInner}
  </g>
  ${tagline ? `<text x="${width / 2}" y="${taglineY ?? ly + lh + 36}" fill="#cbd5e1" font-family="-apple-system, 'Segoe UI', Roboto, sans-serif" font-size="${taglineSize}" font-weight="400" text-anchor="middle" letter-spacing=".05em">${tagline}</text>` : ''}
</svg>`;
}

/**
 * Avatar-grade brand mark.
 *
 * Keeps the AegisX 3-layer diamond stack (solid + mid + outer shadow,
 * all per the brand spec) but draws them in local coordinates centered
 * at (0, 0) with a *tight* upper-right offset so the composite reads
 * cohesively inside a circular avatar crop. The original icon-dark.svg
 * uses wide rotation-pivot offsets that suit the marketing horizontal
 * lockup but spread the layers apart in a square crop — that's why
 * we can't just embed icon-dark verbatim here.
 *
 * Layers (each rotated 45° to form a diamond):
 *   - Outer shadow: 70×70, offset (+5, -5), opacity 0.10
 *   - Mid shadow:   76×76, offset (+2.5, -2.5), opacity 0.18
 *   - Solid:        82×82, centered, navy fill + thin brand-blue stroke
 * Plus the EKG pulse line (with glow) and peak dot, all drawn in the
 * SAME local frame so the entire composition stays anchored.
 */
// Brand icon — embedded verbatim from logo/icon-dark.svg. The logo
// has its own design standard (logo/AEGISX-LOGO-STANDARD.md); we never
// modify its geometry.
const iconDarkRaw = readFileSync(resolve(root, 'logo/icon-dark.svg'), 'utf8');
const iconInner = iconDarkRaw
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '');

function composeIconCenter({ width, height }) {
  // icon-dark.svg's native viewBox is 0 0 120 120. Embed it untouched
  // via a nested <svg> so its preserveAspectRatio handles centering.
  // Pad the canvas, not the logo.
  const innerSize = Math.min(width, height) * 0.78;
  const ix = (width - innerSize) / 2;
  const iy = (height - innerSize) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${bgDefs(width, height)}
  <svg x="${ix}" y="${iy}" width="${innerSize}" height="${innerSize}" viewBox="0 0 120 120" fill="none">
    ${iconInner}
  </svg>
</svg>`;
}

const SPECS = [
  // ─── GitHub ───────────────────────────────────────────
  { name: 'github-org-avatar-400',         w: 400,  h: 400,  fn: composeIconCenter },
  { name: 'github-social-preview-1280x640', w: 1280, h: 640, fn: (s) => composeWithLogo({ ...s, logoScale: 2.4, tagline: 'Enterprise Healthcare Information System Platform', taglineSize: 28 }) },
  { name: 'github-readme-banner-1200x300', w: 1200, h: 300,  fn: (s) => composeWithLogo({ ...s, logoScale: 1.8 }) },

  // ─── X / Twitter ──────────────────────────────────────
  { name: 'twitter-profile-400',           w: 400,  h: 400,  fn: composeIconCenter },
  { name: 'twitter-header-1500x500',       w: 1500, h: 500,  fn: (s) => composeWithLogo({ ...s, logoScale: 2.6, tagline: 'Hospital Information System for the next decade', taglineSize: 24 }) },
  { name: 'twitter-card-1200x628',         w: 1200, h: 628,  fn: (s) => composeWithLogo({ ...s, logoScale: 2.4, tagline: 'Enterprise Healthcare Information System Platform', taglineSize: 26 }) },

  // ─── LinkedIn ─────────────────────────────────────────
  { name: 'linkedin-profile-400',          w: 400,  h: 400,  fn: composeIconCenter },
  { name: 'linkedin-cover-1584x396',       w: 1584, h: 396,  fn: (s) => composeWithLogo({ ...s, logoScale: 2.2, tagline: 'Enterprise Healthcare Information System Platform', taglineSize: 22 }) },
  { name: 'linkedin-share-1200x627',       w: 1200, h: 627,  fn: (s) => composeWithLogo({ ...s, logoScale: 2.4, tagline: 'Enterprise Healthcare Information System Platform', taglineSize: 26 }) },

  // ─── Facebook ─────────────────────────────────────────
  { name: 'facebook-profile-320',          w: 320,  h: 320,  fn: composeIconCenter },
  { name: 'facebook-cover-820x312',        w: 820,  h: 312,  fn: (s) => composeWithLogo({ ...s, logoScale: 1.8, tagline: 'Enterprise Healthcare Information System Platform', taglineSize: 18 }) },
  { name: 'facebook-share-1200x630',       w: 1200, h: 630,  fn: (s) => composeWithLogo({ ...s, logoScale: 2.4, tagline: 'Enterprise Healthcare Information System Platform', taglineSize: 26 }) },

  // ─── YouTube ──────────────────────────────────────────
  { name: 'youtube-channel-icon-800',      w: 800,  h: 800,  fn: composeIconCenter },
  { name: 'youtube-banner-2560x1440',      w: 2560, h: 1440, fn: (s) => composeWithLogo({ ...s, logoScale: 4, tagline: 'Enterprise Healthcare Information System Platform', taglineSize: 48 }) },

  // ─── Slack / Discord ──────────────────────────────────
  { name: 'slack-workspace-512',           w: 512,  h: 512,  fn: composeIconCenter },
  { name: 'discord-server-512',            w: 512,  h: 512,  fn: composeIconCenter },

  // ─── Universal Open Graph ─────────────────────────────
  { name: 'opengraph-1200x630',            w: 1200, h: 630,  fn: (s) => composeWithLogo({ ...s, logoScale: 2.4, tagline: 'Enterprise Healthcare Information System Platform', taglineSize: 26 }) },
];

for (const { name, w, h, fn } of SPECS) {
  const svg = fn({ width: w, height: h });
  const svgPath = resolve(srcDir, `${name}.svg`);
  const pngPath = resolve(outDir, `${name}.png`);
  writeFileSync(svgPath, svg);
  execFileSync('sips', ['-s', 'format', 'png', svgPath, '--out', pngPath, '-Z', String(Math.max(w, h))], { stdio: 'pipe' });
  console.log(`✓ ${name}.png  ${w}×${h}`);
}

// Keep the legacy plain icon dumps too (already committed earlier)
console.log(`\n✅ ${SPECS.length} social assets generated in logo/social/`);
