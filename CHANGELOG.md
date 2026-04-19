# Changelog

All notable changes to `@aegisx-platform/design-system` are documented in this file.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.3] — 2026-04-19

### Changed — Stepper "done" state follows theme
- **`.ax-stepper__step.done`** and **`.mat-stepper-horizontal/.mat-stepper-vertical`** — done state icon + connector now use `--ax-primary` / `--ax-brand-inverted` (was `--ax-success-default` / `--ax-success-inverted`), so completed steps match the active brand color instead of introducing a second hue. Success green is now reserved for explicit success/validation semantics.

### Fixed — `.ax-stepper` horizontal layout
- Container: added `min-width: 0; max-width: 100%; width: 100%; overflow: hidden` so step content is clipped at the cell boundary instead of pushing the parent wider.
- Step circle: `28px → 24px`, border `thick → thin` to align with compact `mat-step-icon`.
- Connector line: `flex: 1 1 0` (fills cell) replaced with `flex: 0 1 64px; width: 64px; min-width: 24px` — fixed 64px visual length keeps both steppers visually equal inside parity cells.
- Step gap `sm → xs`, step `align-items: center`, label `display: block; overflow: hidden; text-overflow: ellipsis` so labels truncate gracefully on narrow viewports instead of forcing horizontal overflow.

### Fixed — `.ax-paginator` density + icon button size
- Row `min-height: 3.5rem` to match `mat-paginator`.
- `.ax-paginator__size .ax-select select` overridden to `height: 2rem`, compact padding, `font-size: xs` — was inheriting the 48px default form-control height.
- `.ax-paginator__nav .ax-button--icon` overridden to `2rem × 2rem` with `1.125rem` icon.
- `.ax-paginator__size` adds `white-space: nowrap` so "Items per page:" stays on one line.

### Fixed — Toolbar icon button color follows toolbar theme
- **`.ax-toolbar .ax-button`** — forces `background: transparent; color: inherit; box-shadow: none` so icon buttons inside a colored toolbar (`--primary` / `--dark` / `--warn`) inherit the toolbar's text color; hover/active use `color-mix(currentColor, transparent)` overlays.
- **`.mat-toolbar.mat-primary/.mat-accent/.mat-warn .mat-mdc-icon-button`** — sets `--mdc-icon-button-icon-color: currentColor` so the Material icon-button inside a primary/accent/warn toolbar uses the toolbar's foreground color instead of the default `--ax-text-secondary`.

### Changed — Angular override-tests demo layout
- Parity comparison restructured from 3-column table (`component | mat | ax`) to **2-column grid with the component label as a full-width header row above `mat | ax`**. Achieved via CSS only (`<table>` HTML unchanged): `.parity` becomes a `display: block` with `<tr>` laid out as `display: grid` using `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr)` and `grid-template-areas: "label label" / "mat ax"`.
- `minmax(0, 1fr)` instead of `1fr` — prevents nested content from pushing columns wider than their share.
- All layout rules use `>` child combinators (`.parity > thead > tr`, `.parity > tbody > tr > td`) so nested `<mat-table>` / `<table class="ax-table">` inside a parity cell render with normal table layout.
- Label row now has `background: var(--ax-background-subtle)` + bottom border, vertical divider between mat/ax cells uses `--ax-border-default`, outer border promoted from `--ax-border-subtle` → `--ax-border-default` + shadow-xs for stronger visual separation.
- Mobile (≤768px): collapses to 1-column stack (`label / mat / ax`).
- `.card-variants max-width: 340px → 100%` so card previews fill the new wider cell.

### Removed — ax-only section from Angular demo
- Dropped the `#ax-only` section (Navbar / OTP / Upload / Timeline / Alerts / Stats preview grid, 100 lines of markup) and its TOC entry from `apps/demo/src/app/app.component.html`. These components are already showcased in `pages/components.html` and were duplicating the coverage.

## [0.5.2] — 2026-04-19

### Fixed — Standards-based Material elevation chain
- **`aegisx-material-overrides.scss`** — replaced hardcoded `box-shadow: var(--ax-elevation-N) !important` on `mat-card`, `mat-menu`, `mat-autocomplete`, `mat-select-panel`, `mat-raised-button`, `mat-dialog`, `mat-snack-bar`, `mat-sidenav`, `mat-expansion-panel` with proper aliasing of Material v20's own component elevation tokens:
  - `--mat-card-elevated-container-elevation` → `var(--ax-elevation-1)`
  - `--mat-menu-container-elevation-shadow` → `var(--ax-elevation-2)`
  - `--mat-autocomplete-container-elevation-shadow` → `var(--ax-elevation-2)`
  - `--mat-button-protected-{default,hover,focus,pressed,disabled}-container-elevation-shadow` → `var(--ax-shadow-{xs,sm})`
  - `--mat-expansion-container-elevation-shadow` → `none`
  - `--mat-sidenav-container-elevation-shadow` → `var(--ax-shadow-md)`
- Effect: shadow tokens now re-resolve at runtime through the full chain `--ax-shadow-* → --ax-elevation-* → --mat-*-container-elevation* → Material component`, so the Tweaks panel (or any consumer theme override of `--ax-shadow-*`) propagates to every Material surface without `!important`. Consumer Angular apps can override shadows from their own `:root` without fighting specificity.

### Added — Tweaks panel & demo
- Elevation segment now writes `--ax-shadow-xs/sm/md/lg/xl` inline on `<html>`, adds a live **shadow preview strip** (sm · md · lg tiles) under the control, and replaces the footer reset text-link with a prominent **Reset defaults** button alongside Export theme.
- Card parity row now shows three raised variants (outlined, raised, raised + avatar + actions) on the Material side and four ax-card variants (default, `--elevated`, `--floating`, `--flat`) on the ax side, giving the Tweaks Elevation control visible targets.

## [0.5.1] — 2026-04-19

### Added — Phase 5 `ax-only` polish
- **`.ax-navbar`** — height now derives from `--ax-control-h` (density-aware); new `.ax-navbar__drawer` mobile slide-in panel (with `[data-open=true]` toggle); new `.ax-navbar__search` slot with prefix icon + trailing ⌘K hint.
- **`.ax-command`** — `aria-selected` highlighted state, `<mark>`/`.ax-match` substring highlight, `.ax-command__group-title` for grouped results, `.ax-command__empty`, `.ax-command__item-icon/-desc` slots, `.ax-command__footer-hint` for keyboard legend.
- **`.ax-otp`** — hover + focus ring (color-mix tint), disabled state, `[data-filled]` indicator, `.ax-otp--error` / `--success` / `--sm` / `--lg` variants, `.ax-otp__separator`.
- **`.ax-upload` + `.ax-upload-list` + `.ax-upload-item`** — drag-over state via `[data-drag=true]`, error/success/disabled states, per-file list with icon/info/progress/remove, per-file progress bar + success/error variants.
- **`.ax-timeline`** — success green (was brand) for done state, new active (brand-faint halo) + warning states, optional `.ax-timeline__icon` slot, `.ax-timeline--dense/--relaxed/--alternate` variants (alternate collapses to single-column under 640px).
- **`.ax-image-preview`** — zoom via `--ax-image-zoom` + `[data-zoom]`, `__caption` gradient overlay, `__toolbar` button row, `.ax-image-preview--lightbox` full-screen fixed overlay.
- **`.ax-drawer`** — transform animation (`[data-open=true]`), `.ax-drawer--start` (left) and `.ax-drawer--bottom` (sheet with drag handle) variants, width presets `--sm/--md/--lg/--xl`, `.ax-drawer__close` button.
- **`.ax-toast` + `.ax-toast-stack`** — `__icon/__title/__desc/__action/__close` slots, role-tinted icon, auto-dismiss progress bar (`--ax-toast-progress` + `--ax-toast-duration`), 6 corner positions (top/bottom × left/right/center), slide-in animation.

### Added — Mobile responsiveness
- `.ax-table-wrap` — horizontal scroll wrapper with rounded border.
- `.ax-table--stack` — on ≤640px, rows render as cards with `data-label::before` column headers.
- `.ax-page-header` — stacks vertically under 640px, actions take full width + `flex:1`.
- `.ax-paginator` — flex-wraps under 640px, nav buttons pinned to end.
- `.ax-shell` — sidebar collapses to fixed overlay under 1023px (toggled via `.is-open`); reduced padding under 640px.

## [0.5.0] — 2026-04-19

Group A complete — every Angular Material v3 component on material.angular.dev/components/categories now has **both** a fully-themed Material override (`--mat-sys-*` + `--mdc-*`) and a standalone `ax-*` custom twin, driven by the same `--ax-*` tokens. The live Tweaks panel propagates into both paths. See `docs/COMPONENT-OVERRIDE-PLAN.md` for the per-component matrix.

### Added — Foundation (Phase 1)
- **Control sizing tokens** (`tokens/dtcg/component.json` + generator): `--ax-control-h/-h-sm/-h-lg`, `--ax-control-pad-x/-y`, `--ax-control-gap`, `--ax-control-icon`, `--ax-focus-ring-width/-offset/-opacity`. `[data-density=compact|spacious]` rules in `tokens.css` swap these automatically — every form control reads them so density propagates without per-class overrides.
- **Material bridge coverage** (`tokens/scss/aegisx-material-bridge.scss`): state-layer opacities (hover/focus/pressed/dragged), disabled opacity, full M3 corner-shape scale, secondary + tertiary fixed/dim/variant triplets, plain/brand font-family and weight roles, dark-theme stronger state layers + scrim.
- **Theme export** (`pages/_export-theme.js`): "Export theme" button in the Tweaks panel footer downloads `aegisx-theme-{brand}-{density}-{date}.scss` with 6 paste-ready sections (`README.md`, `tokens.css`, `aegisx-material-theme.scss`, `aegisx-material-bridge.scss`, `aegisx-component-overrides.scss`, `tokens.json`).

### Added — Group A (Phases 2 – 4, every Angular Material component)
- **A1 Form Controls** — `mat-form-field` (density + prefix/suffix + label typography) · `mat-input` (readonly/autofill/number-spinner) · `mat-select` (options + optgroup + trigger height) · `mat-autocomplete` (panel + `<mark>` highlight) · `mat-checkbox` (indeterminate/error) · `mat-radio-group` (spacing/orientation) · `mat-slide-toggle` (off-track + focus ring) · `mat-slider` (full MDC palette + focus outline) · `mat-datepicker` (calendar + day-cell states).
- **A2 Buttons & Indicators** — all button variants (text / filled / raised / outlined / icon) with hover + pressed + disabled + focus ring · `mat-fab` · `mat-mini-fab` · `mat-extended-fab` · `mat-progress-bar` (buffer + indicator height) · `mat-progress-spinner` (size attrs 20/24/32) · `mat-badge` (role variants).
- **A3 Navigation** — `mat-sidenav` (scrim + animation) · `mat-toolbar` (primary/accent/warn + mobile height) · `mat-menu` (items + dividers + danger item) · `mat-tabs` (ink-bar + pager) · `mat-stepper` (step-icon states + horizontal + vertical variant).
- **A4 Layout** — `mat-card` (header/content/actions padding + divider) · `mat-divider` (inset variant) · `mat-expansion-panel` (group radius + header hover).
- **A5 Data Table** — `mat-table` sticky columns · `mat-sort` arrow states (brand on aria-sort) · `mat-paginator` (range label + page-size select + nav icon buttons).
- **A6 Popups & Modals** — `mat-dialog` (width presets sm/md/lg/full + section dividers) · `mat-snack-bar` (role variants via panel-class) · `mat-tooltip` polish · `mat-bottom-sheet` (drag handle + safe-area inset).
- **A7 Other** — `mat-chips` (selected / disabled / avatar / removable / role variants) · `mat-list` (1/2/3-line heights) · `mat-tree` (indent rails + chevron).

### Added — `ax-*` custom twins
- **New:** `.ax-autocomplete`, `.ax-select-panel` + `.ax-option`, `.ax-datepicker`, `.ax-datepicker-input`, `.ax-slider-range`, `.ax-slider-ticks`, `.ax-slider-label`, `.ax-fab` + `--mini` + `--extended`, `.ax-toolbar` + variants, `.ax-paginator`, `.ax-table__sort`, `.ax-bottom-sheet`, `.ax-tree`.
- **Enriched:** `.ax-button` (pressed states + `.ax-button--elevated`/`--icon`/`--success`/`--link`), `.ax-checkbox` (indeterminate + error + group), `.ax-radio` (disabled + error + group), `.ax-toggle` (hover + size variants), `.ax-stepper` (success-green done + error + disabled + vertical), `.ax-chip` (selected + interactive + avatar + role variants), `.ax-pagination` focus.

### Changed
- `pages/_tweaks.css` — density overrides reduced to table rows + list item min-height; form-control sizing flows through `--ax-control-*` tokens instead of per-class rules.
- `.ax-button` / `.ax-input` / `.ax-textarea` / `.ax-select` / `.ax-search` now reference `--ax-control-h` / `--ax-control-pad-x` for density awareness.

### Deferred
- **Override test page** (`pages/override-tests.html`) — requires bootstrapping Angular Material inside the static docs site. Blocked on a separate Angular demo app.

## [0.4.1] — 2026-04-19

### Fixed
- **Navbar demo** (`pages/components.html`) — used non-existent `.ax-navbar__nav` / `.ax-navbar__actions` classes without the required `.ax-navbar__container` wrapper, so brand/links/actions stacked vertically instead of laying out horizontally. Rewritten to the production API: `__container > __start + __center + __end`.
- **Density tweak now visibly changes form controls + tables** — `[data-density]` previously set `--ax-density-row` / `--ax-density-pad` tokens that no component consumed. `pages/_tweaks.css` now overrides heights + padding + font-size on `.ax-button`, `.ax-input`, `.ax-select`, `.ax-search`, `.ax-textarea`, `.ax-counter__value`, `.ax-tab-pills__item`, `.ax-segmented button`, plus `.ax-table` row padding and `.ax-list__item` min-height, when a `[data-density]` attribute is set. Production CSS (`tokens/css/components.css`) is untouched.

## [0.4.0] — 2026-04-19

### Added
- **Unified docs shell** (`pages/_shared.css`) — 240px content sidebar + topbar + hero + numbered sections, applied to `tokens.html`, `components.html`, `navigation.html`, `a11y.html`. Replaces the legacy `ax-nav` rail chrome (the rail is a documented component, not site chrome).
- **Live Tweaks panel** (`pages/_tweaks.{css,js}`) — floating editor to preview theme · 8 brand presets (indigo = production) · density · radius · base font size · font family (Plex / Noto / Inter / Sarabun, lazy-loaded) · elevation · focus ring. Writes CSS custom-property overrides at `:root`, persisted to `localStorage[aegisx-ds-tweaks]`. FAB bottom-right + keyboard `T` toggle. Does not modify `tokens.css`.
- **Token showcase primitives** in `_shared.css` — `.swatch` with step+hex overlay (click-to-copy), compact `.semantic-grid`, `.type-row`, `.spacing-row`, `.radius-cell`, `.shadow-cell`.
- **Scroll-spy sidebar navigation** — each page highlights its current section as the user scrolls.
- **Build-time version injection** — `{{DS_VERSION}}` placeholder in pages is substituted with `package.json` `version` during `pnpm site:build`.

### Changed
- `scripts/build-site.mjs` — also copies `.js` files from `pages/` (for `_tweaks.js`).
- All four docs pages re-wired to the new shell; in-page anchor navigation moved into the outer sidebar's "on this page" group.
- `pages/components.html` — re-grouped 60+ component anchors into 7 clean categories (Form / Data / Progress / Feedback / Navigation / Layout / Composition).

### Fixed
- `scripts/build-platforms.mjs` — CI had been failing since tokens realigned to production:
  - `ROLES.success` referenced a non-existent `green` palette; corrected to `emerald` (matches production DTCG + `tokens.css`).
  - All `Object.entries(color.palette[hue])` loops now skip non-token metadata (`$description` etc.) lacking a `$value`.
- `_tweaks.js`:
  - Validates every state field loaded from `localStorage` against a hard-coded whitelist (`theme`/`brand`/`density`/`fontFamily`/`elevation`/`focusRing` enum; `radius` 0–16; `fontSize` 12–17) before applying — prevents CSS-selector injection and invalid `setAttribute` values via tampered LS.
  - No longer sets `root.style.fontSize` unconditionally; CSS variables are only overridden when the user's value differs from default, so `tokens.css` wins after reset.

### Removed
- Legacy `.page-sidebar` / `.page-layout` / `.page-head` / `nav.tabs` rail chrome from all docs pages. `navigation.html` still demonstrates `ax-nav` as inline content.

## [0.3.2] — 2026-04-16

### Added
- **Multi-platform token export** (`scripts/build-platforms.mjs`) — emits `dist/tokens/`:
  - `tailwind/tailwind-preset.cjs` — Tailwind v3 config preset (palette + spacing + radius + fontFamily)
  - `ios/AegisXTokens.swift` — SwiftUI `Color` / `CGFloat` constants
  - `android/colors.xml` + `dimens.xml` — Android resource files
  - `flutter/aegisx_tokens.dart` — Flutter `Color` / spacing / radius constants
  - Wired via `pnpm tokens:platforms` and chained into `pnpm tokens:build`
- **Tokens Studio bidirectional sync** (`scripts/build-tokens-studio.mjs`) — generates `tokens/aegisx-tokens.json` + `aegisx-tokens-dark.json` directly from `dtcg/*.json`. Run `pnpm tokens:studio` after any DTCG change to keep Figma in sync.
- **Dark-mode static audit** (`scripts/audit-dark-mode.mjs`) — flags Slate hex literals in chrome (must be Zinc per v0.3), stale v0.2 token references (`--ax-bg-*`, `--ax-text-primary`, M3 role tokens). Wired via `pnpm audit:dark-mode` and CI.
- Subpath exports for native bindings: `@aegisx-platform/design-system/tokens/{tailwind,ios,android,flutter}/...`.

### Changed
- **`tokens.css` is now generator output** — single source of truth via `pnpm tokens:build`. The hand-written `tokens.css` and parallel `tokens.generated.css` collapsed into one file.
- **`pnpm tokens:verify`** rewritten as **byte-equal** drift gate (was semantic diff). Runs the generator into a temp file and compares; pre-commit + CI fail on any divergence.
- **`pnpm tokens:build`** chains all three generators (`build-tokens` → `build-tokens-studio` → `build-platforms`).
- **`prebuild`** now runs `tokens:build` so `pnpm publish` always ships fresh native bindings.
- **Preview pages chrome** — bulk Slate→Zinc rewrite in `tokens/preview.html`, `components.html`, `a11y.html`. Header brand navy (`#0f172a`, `#1e293b`) preserved as intentional brand identity.

### CI
- New steps: `audit:dark-mode` and `tokens:platforms`.

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
