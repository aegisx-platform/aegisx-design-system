# Changelog

All notable changes to `@aegisx-platform/design-system` are documented in this file.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.1] — 2026-04-16

### Added
- **Pre-commit hook** (`.githooks/pre-commit`) — auto-runs `pnpm tokens:verify`, `pnpm check:icons`, and `tsc --noEmit` only on relevant changed files. Activated automatically via `pnpm install` (`prepare` script sets `core.hooksPath`).
- **CI gates** — `.github/workflows/ci.yml` now runs `pnpm tokens:verify` (DTCG ↔ tokens.css drift) and `pnpm check:contrast` (WCAG audit) on every push and PR.
- **`scripts/verify-tokens.mjs`** — semantic diff between canonical `tokens.css` and DTCG-generated `tokens.generated.css`. Fails CI on missing or drifted `--ax-*` properties.
- **`getIconStyle(name, size, mode)`** API in `icons/icon-color-map.ts` — returns inline style + class strings using hex directly, avoiding Tailwind utility classes that don't flip with the theme.

### Changed
- **Token build pipeline** emits `var(--ax-color-*)` references (not literal hex) for role palettes and component tokens, so palette edits cascade without re-running the generator on every consumer.
- **`borderWidth` DTCG** — `default` 2px → 1px, `thick` 4px → 2px to match the v0.3 "1px dominant" rule.
- **`spacing` DTCG** — dropped the `container` group that collided with `breakpoint.container` max-widths; horizontal page padding uses `--ax-inset-*` instead.
- **Package files / exports** — `package.json` now bundles `tokens/css`, `tokens/scss`, `tokens/dtcg`, `AEGISX-DESIGN-PRINCIPLES.md`, and exposes them via subpath exports (`@aegisx-platform/design-system/tokens/css/tokens.css`, `…/scss/material-bridge`, etc.).

### Deprecated
- `getIconClasses()` — kept for Tailwind-using consumers but marked `@deprecated` in JSDoc; prefer `getIconStyle()` in new code.

### Verification
- `pnpm tokens:verify` reports **255 tokens match DTCG source · zero drift**.

## [0.3.0] — 2026-04-15

### Added
- **Design token foundation** (`tokens/`) — authoritative source for all design primitives:
  - W3C DTCG JSON in `tokens/dtcg/` (color, spacing, typography, radius, border-width, shadow, motion, breakpoint)
  - Compiled `tokens/css/tokens.css` with 3-layer architecture (primitive → semantic → component), prefix `--ax-*`
  - SCSS maps in `tokens/scss/_tokens.scss`
- **Component CSS library** (`tokens/css/components.css`) — reusable classes using tokens: `.ax-button`, `.ax-input`, `.ax-card`, `.ax-alert`, `.ax-badge`, `.ax-chip`, `.ax-dialog`, `.ax-toast`, `.ax-link`, `.ax-table`.
- **Angular Material v3 bridge** (`tokens/scss/`) — three-file consumer integration:
  - `aegisx-material-theme.scss` — M3 theme API (density -1, IBM Plex Sans Thai)
  - `aegisx-material-bridge.scss` — maps `--mat-sys-*` / `--mdc-*` onto `--ax-*`
  - `aegisx-material-overrides.scss` — minimal per-component polish (cards, buttons, form fields, tables, dialogs, menus, chips, tooltip, snackbar, progress bar, checkbox/radio/toggle, tabs, ripple)
- **Consumer setup guide** (`tokens/ANGULAR-MATERIAL-SETUP.md`) — step-by-step integration with gotchas, dark-mode wiring, and verification checklist.
- **Live preview pages** served under `/tokens/`:
  - `preview.html` — palette, semantic roles, typography, spacing, radius, shadow, elevation, motion, breakpoints
  - `components.html` — all `.ax-*` component classes with composition demo
  - `a11y.html` — runtime WCAG 2.1 contrast audit (text × background, buttons, alerts, borders) with theme toggle
- **Token build pipeline** (`scripts/build-tokens.mjs`) — DTCG JSON → CSS generator:
  - `pnpm tokens:build` writes `tokens/css/tokens.generated.css`
  - `pnpm tokens:verify` diffs against canonical `tokens.css` (CI drift gate)
- **AegisX Design Principles** (`AEGISX-DESIGN-PRINCIPLES.md`) — codified north star:
  - Five pillars: Calm · High-contrast · Thai-first · Clinical-dense · No ornamentation
  - Explicit "what AegisX is NOT" (not Untitled UI, not Material out-of-the-box)
  - Strict domain-token policy: triage / NHSO / ward-type / drug-interaction tokens live in consumer apps as `--app-*` aliases of `--ax-*`, not in this repo

### Changed
- **BREAKING — tokens v0.2:** rewrite to align with `aegisx-ui-design` skill (Untitled UI + Angular Material v3):
  - Gray palette: Tailwind **Zinc** (not gray) — `#fafafa → #09090b`
  - Font stack: **IBM Plex Sans Thai** (Thai-first, not Inter)
  - Body base: **14px** (`text-sm` — clinical density, not 16px)
  - Type scale: Untitled UI `text-{xs..xl}` + `display-{xs..lg}` (dropped Material 3 role tokens like `--ax-body-medium-size`)
  - Token renames: `--ax-bg-*` → `--ax-background-*`, `--ax-text-primary` → `--ax-text-default`
  - Radius: `md` 10px → 8px, `lg` 16px → 12px per Untitled UI
- Display typography capped at `display-lg` (48px). Removed `display-xl` (60px) and `display-2xl` (72px) — clinical UIs do not need them.
- `CLAUDE.md` elevates `AEGISX-DESIGN-PRINCIPLES.md` to rule 0 (read before any token/spec change).

### Migration notes
Consumer apps (`aegisx-ui`, `aegisx-starter-1`) must rename referenced tokens:
```
--ax-bg-*                             → --ax-background-*
--ax-text-primary                     → --ax-text-default
--ax-{body|title|label}-*-size  (M3)  → --ax-text-*-size / --ax-display-*-size
```
Domain tokens (triage, NHSO status, ward type, drug interaction) must now be defined per-app as `--app-*` aliases, not pulled from the design system.

## [0.2.0] — 2026-04-15

### Added
- "Logo in Context" mockups page (`site-src/mockups.html`) — login, dashboard shell, marketing hero, mobile splash/home, transactional email. Build wires it into the preview site via `site-src/` copy step.
- Typography spec (`specs/AEGISX-TYPOGRAPHY.md`)
- Spacing / radius / shadow scale spec (`specs/AEGISX-SPACING.md`)
- Dark-mode spec (`specs/AEGISX-DARK-MODE.md`) + dark token overrides (`tokens/aegisx-tokens-dark.json`)
- Style Dictionary token export (`tokens/aegisx-tokens.json`)
- Tokens Studio multi-set wiring (`tokens/$themes.json`, `tokens/$metadata.json`)
- Figma sync workflow guide (`docs/FIGMA-SYNC.md`)
- WCAG AA contrast checker (`scripts/check-contrast.mjs` + `pnpm run check:contrast`)
- Email signature HTML template (`email/aegisx-signature.html`)
- Print letterhead template (`print/letterhead.html`)
- `CONTRIBUTING.md` and `LICENSE`
- `getIconClasses(icon, size, mode)` accepts `'light' | 'dark'` mode parameter

## [0.1.0] — 2026-04-15

### Added
- Initial release.
- 153 mono icons (`icons/svg/*.svg`) + 10 featured-error icons + 1 sprite.
- 8 logo lockups (horizontal / vertical / icon × light / dark / mono / mono-inverse).
- Logo PNG exports `@1x/@2x/@3x` + favicon set (16/32/48/180/192/512 + ICO).
- Brand background pattern (`brand/aegisx-brand-bg.svg` + `.scss`).
- Authoritative specs: `AEGISX-BRAND-GUIDE.md`, `AEGISX-ICON-CATALOG.md`, `AEGISX-LOGO-STANDARD.md`, `AEGISX-BRAND-BG-SPEC.md`.
- Angular `AegisxIconRegistry` service + `<ax-diamond-icon>` component.
- 104-entry `ICON_COLOR_MAP` covering 13 categories.
- Generated TS string-literal data for inline `MatIconRegistry` registration (`icons/data/`).
- npm package `@aegisx-platform/design-system` published to GitHub Packages.
- GitHub Actions CI (build + icon integrity check + SVGO drift).
- GitHub Pages preview site at https://aegisx-platform.github.io/aegisx-design-system/.
- Migration guide for `@aegisx/ui` (`docs/MIGRATING-AEGISX-UI.md`).

[Unreleased]: https://github.com/aegisx-platform/aegisx-design-system/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/aegisx-platform/aegisx-design-system/releases/tag/v0.1.0
