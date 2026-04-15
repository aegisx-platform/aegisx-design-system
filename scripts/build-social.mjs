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

/** Brand-aligned background: navy base + radial glows + diamond ripple accents. */
function bgDefs(w, h) {
  return `
  <defs>
    <radialGradient id="g1" cx="${w * 0.7}" cy="${h * 0.2}" r="${Math.max(w, h) * 0.45}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1e293b" stop-opacity=".85"/>
      <stop offset="1" stop-color="#0f172a" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="${w * 0.18}" cy="${h * 0.85}" r="${Math.max(w, h) * 0.35}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#312e81" stop-opacity=".5"/>
      <stop offset="1" stop-color="#0f172a" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0f172a"/>
  <rect width="${w}" height="${h}" fill="url(#g1)"/>
  <rect width="${w}" height="${h}" fill="url(#g2)"/>
  <g opacity=".06" stroke="#fff" stroke-width="1" fill="none">
    ${[0.78, 0.82, 0.86].map((s) => `<rect x="${w * 0.78 - (w * 0.08 * s)}" y="${h * 0.18 - (h * 0.14 * s)}" width="${w * 0.16 * s}" height="${h * 0.28 * s}" rx="${12 * s}" transform="rotate(45 ${w * 0.78} ${h * 0.18})"/>`).join('')}
  </g>
  <g opacity=".04" stroke="#6366f1" stroke-width="1.2" fill="none">
    <path d="M0 ${h * 0.62} L${w * 0.18} ${h * 0.62} L${w * 0.22} ${h * 0.5} L${w * 0.27} ${h * 0.78} L${w * 0.3} ${h * 0.62} L${w} ${h * 0.62}"/>
  </g>`;
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

// Brand icon (icon-dark.svg) inner shapes, kept verbatim so the 3-layer
// offset diamond stack — the AegisX signature — survives intact.
const iconDarkRaw = readFileSync(resolve(root, 'logo/icon-dark.svg'), 'utf8');
const iconInner = iconDarkRaw
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '');

/**
 * The icon's native viewBox is 0 0 120 120, but the visual mass of the
 * 3-layer stack centroid sits at roughly (70, 50) — 10px right of and
 * above the geometric centre — because the mid- and outer-shadow
 * diamonds offset upper-right per the brand spec.
 *
 * To present the icon cleanly inside a circular avatar crop, we wrap
 * it in a nested <svg> with a shifted viewBox: shifting the visible
 * region right & up moves the visual centroid back to (60, 60). The
 * shapes themselves are untouched.
 */
function composeIconCenter({ width, height }) {
  const VB_X = 10;     // shift viewBox right → moves art left in canvas
  const VB_Y = -10;    // shift viewBox up   → moves art down in canvas
  const VB_SIZE = 120;
  const innerSize = Math.min(width, height) * 0.78; // 22% breathing room
  const ix = (width - innerSize) / 2;
  const iy = (height - innerSize) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${bgDefs(width, height)}
  <svg x="${ix}" y="${iy}" width="${innerSize}" height="${innerSize}" viewBox="${VB_X} ${VB_Y} ${VB_SIZE} ${VB_SIZE}" overflow="visible">
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
