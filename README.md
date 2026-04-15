# AegisX Design System

Design assets, brand specs, and icon library for the **AegisX Hospital Platform**.

This repository is the single source of truth for logos, icons, brand backgrounds, and design standards used across all AegisX apps (web, PDF, mobile).

## Contents

| Folder | What's inside |
|--------|---------------|
| `icons/` | SVG icon set (mono + diamond), Angular Material registry, colour maps |
| `logo/` | Production logo lockups — horizontal / vertical / icon, light / dark / mono |
| `brand/` | Brand background pattern (SVG + SCSS) used on login, splash, PDF covers |
| `specs/` | Canonical design specs (icon catalog, brand guide, printable PDF) |

## Key Documents

- [`specs/AEGISX-BRAND-GUIDE.md`](specs/AEGISX-BRAND-GUIDE.md) — master brand guide
- [`specs/AEGISX-ICON-CATALOG.md`](specs/AEGISX-ICON-CATALOG.md) — every approved app icon across the platform
- [`logo/AEGISX-LOGO-STANDARD.md`](logo/AEGISX-LOGO-STANDARD.md) — logo anatomy & usage rules
- [`logo/USAGE-EXAMPLES.md`](logo/USAGE-EXAMPLES.md) — variant picker, favicon/PWA setup, do's & don'ts
- [`logo/preview.html`](logo/preview.html) — open in a browser to preview every variant on every bg
- [`specs/AEGISX-TYPOGRAPHY.md`](specs/AEGISX-TYPOGRAPHY.md) — type families, scale, weight, line height, print
- [`specs/AEGISX-SPACING.md`](specs/AEGISX-SPACING.md) — spacing, radius, shadow, border, z-index, grid
- [`tokens/aegisx-tokens.json`](tokens/aegisx-tokens.json) — Style Dictionary / W3C Design Tokens export (light)
- [`tokens/aegisx-tokens-dark.json`](tokens/aegisx-tokens-dark.json) — dark surface/text/border overrides
- [`specs/AEGISX-DARK-MODE.md`](specs/AEGISX-DARK-MODE.md) — when to use dark, surface pairings, Tailwind shifts
- [`docs/FIGMA-SYNC.md`](docs/FIGMA-SYNC.md) — Tokens Studio sync workflow Figma ↔ code
- [`docs/MIGRATING-AEGISX-UI.md`](docs/MIGRATING-AEGISX-UI.md) — how `@aegisx/ui` should consume this package
- [`email/aegisx-signature.html`](email/aegisx-signature.html) — email signature template (table-based, Outlook-safe)
- [`print/letterhead.html`](print/letterhead.html) — A4 letterhead template (browser print → PDF)
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to add icons / cut releases
- [`CHANGELOG.md`](CHANGELOG.md) — versioned changes
- [`brand/AEGISX-BRAND-BG-SPEC.md`](brand/AEGISX-BRAND-BG-SPEC.md) — branded background spec
- [`icons/README.md`](icons/README.md) — icon quick start
- [`CLAUDE.md`](CLAUDE.md) — guidance for Claude Code contributors

## Usage

Assets are currently **copied manually** into consumer apps (e.g. `aegisx-starter-1`):

- SVGs from `icons/svg/` → consumer app's `src/assets/icons/...`
- `icons/aegisx-icon-registry.ts`, `icon-color-map.ts`, `diamond-color-map.ts`, `ax-diamond-icon.component.ts` → `libs/shared/ui/icons/src/lib/`
- `brand/aegisx-brand-bg.scss` / `.svg` → consumer asset pipeline

Changes here do not auto-propagate — sync deliberately.

## Contributing

1. Read the relevant spec in `specs/` (or the per-folder standard doc) before editing.
2. When adding a new icon, update **all four** in the same change:
   - `icons/svg/<name>.svg`
   - `icons/aegisx-icon-registry.ts`
   - `icons/icon-color-map.ts` (or `diamond-color-map.ts`)
   - `specs/AEGISX-ICON-CATALOG.md` + `icons/README.md`
3. Do not redraw or recolour the logo — pick a variant from `logo/`.
