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
function avatarMarkLocal() {
  return `
    <g>
      <!-- single solid diamond — no offset shadow stack (avatar crop is too tight) -->
      <g transform="rotate(45)">
        <rect x="-44" y="-44" width="88" height="88" rx="16" fill="#1e293b"/>
        <rect x="-44" y="-44" width="88" height="88" rx="16"
              fill="none" stroke="#3b82f6" stroke-width=".8" opacity=".4"/>
      </g>
      <!-- EKG glow + main line, centered around (0, 0) -->
      <path stroke="#3b82f6" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="4.5" fill="none"
            d="M-34 8 h18 l5-28 l7 48 l5-29 l5 9 h18"/>
      <path stroke="#93c5fd" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" fill="none" opacity=".3"
            d="M-34 8 h18 l5-28 l7 48 l5-29 l5 9 h18"/>
      <!-- peak dot + halo -->
      <circle cx="-5" cy="-20" r="4.5" fill="#60a5fa"/>
      <circle cx="-5" cy="-20" r="8"   fill="#3b82f6" opacity=".2"/>
    </g>`;
}

function composeIconCenter({ width, height }) {
  // Solid diamond rotated 45° from a 88×88 rect → spans ~125×125 in
  // local coords; pad ~25% inside any platform's circular crop.
  const span = 125;
  const scale = (Math.min(width, height) * 0.75) / span;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${bgDefs(width, height)}
  <g transform="translate(${width / 2} ${height / 2}) scale(${scale})">
    ${avatarMarkLocal()}
  </g>
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
