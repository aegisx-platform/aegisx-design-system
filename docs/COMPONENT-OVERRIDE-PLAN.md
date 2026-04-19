# Component override & theming plan

**Scope:** every Angular Material v3 component on <https://material.angular.dev/components/categories> must satisfy two deliverables — both treated as first-class, not fallback:

1. **Material override path** — consumer uses `<mat-button>` / `<mat-form-field>` / …, styled via `--mat-sys-*` + `--mdc-*` tokens so it matches the AegisX design.
2. **`ax-*` custom path** — a pure CSS/HTML component (no Angular, no Material dep) that reproduces the same visual + behaviour. Consumers who do not use Angular Material (or use a different framework) drop in `<button class="ax-button">` / `<div class="ax-field">` / …

Both paths consume the same `--ax-*` tokens and must respond identically to the live **Tweaks** panel. The tweaks state must be **exportable** as a re-usable theme bundle (SCSS + CSS vars + JSON).

Last updated: 2026-04-19 · Driven by `tokens/css/tokens.css` (`--ax-*`) + `tokens/scss/aegisx-material-overrides.scss` (MDC-level overrides).

---

## Legend

Status icons apply to each path independently (Material vs ax-*):
- 🟢 **Complete** — uses `--ax-*` tokens, no hard-coded values, light + dark parity, Tweaks panel affects it, matches production screenshots.
- 🟡 **Partial** — exists but incomplete (hard-coded values, missing states, missing dark mode, Tweaks not wired).
- 🔴 **Missing** — not yet implemented.
- `—` **N/A** (e.g., Material provides a directive only, no DOM shape to skin).

Tweaks-driven means **all four** controls (brand · density · radius · font family) affect the component live without extra CSS in consumer.

---

## Phase 0 — Foundation (prerequisite, must land first)

| # | Task | Files |
|---|---|---|
| 0.1 | Audit `--mat-sys-*` bridge — every M3 system token (primary, secondary, tertiary, error, surface, surface-container, on-surface, outline, outline-variant, shadow, scrim) aliases to `--ax-*` in both light and dark. Also audit on-state roles (on-primary, on-error, on-surface-variant). | `tokens/scss/aegisx-material-bridge.scss` |
| 0.2 | **Theme export** — "Export theme" button in the Tweaks panel downloads `aegisx-custom-theme-{YYMMDD}.zip` with 5 files ready to drop into `src/styles/`. Contract is specified below. | `pages/_tweaks.js` + new `pages/_export-theme.js` |
| 0.3 | **Component-consuming tokens** — replace hack overrides in `_tweaks.css` with real tokens (`--ax-control-h`, `--ax-control-pad-x`, `--ax-control-pad-y`, `--ax-focus-ring-width`, `--ax-focus-ring-offset`, `--ax-focus-ring-color`) referenced from every form-control class in `components.css`. `_tweaks.css` then only needs to set these variables — no `[data-density] .ax-button { height }` wildcard rules. | `tokens/css/tokens.css` + `components.css` |
| 0.4 | **Override test page** — ⏸ **deferred**. Requires an Angular runtime in the docs site to render `<mat-*>` components live, which the static Pages build doesn't have. Blocked on a separate Angular demo app; until then, visual verification happens per-component in `pages/components.html`. | `pages/override-tests.html` (future) |

---

## Group A — Material components (each needs BOTH paths)

Columns:
- **Mat** = Material override status (skins `<mat-*>`)
- **Ax** = `ax-*` custom status (pure CSS)
- **Tweaks** = does the live Tweaks panel affect both paths?

### A1 · Form Controls

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A1.1 | `mat-form-field` | 🟢 | `.ax-field` | 🟢 | ✅ | `8407d72` |
| A1.2 | `mat-input` | 🟢 | `.ax-input` / `.ax-textarea` | 🟢 | ✅ | `8407d72` |
| A1.3 | `mat-select` | 🟢 | `.ax-select` + `.ax-select-panel` | 🟢 | ✅ | `8407d72` |
| A1.4 | `mat-autocomplete` | 🟢 | `.ax-autocomplete` | 🟢 | ✅ | `d29110a` |
| A1.5 | `mat-checkbox` | 🟢 | `.ax-checkbox` + `.ax-checkbox-group` | 🟢 | ✅ | `d29110a` |
| A1.6 | `mat-radio-group` | 🟢 | `.ax-radio` + `.ax-radio-group` | 🟢 | ✅ | `d29110a` |
| A1.7 | `mat-slide-toggle` | 🟢 | `.ax-toggle` (+ sm/lg variants) | 🟢 | ✅ | `d29110a` |
| A1.8 | `mat-slider` | 🟢 | `.ax-slider` + `.ax-slider-range` + `.ax-slider-ticks` | 🟢 | ✅ | `d2a94fb` |
| A1.9 | `mat-datepicker` | 🟢 | `.ax-datepicker` + `.ax-datepicker-input` | 🟢 | ✅ | `d2a94fb` |

### A2 · Buttons & Indicators

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A2.1 | `mat-button` (text) | 🟢 | `.ax-button--ghost` | 🟢 | ✅ | `f4038e3` |
| A2.2 | `mat-flat-button` (filled) | 🟢 | `.ax-button--primary` | 🟢 | ✅ | `f4038e3` |
| A2.3 | `mat-raised-button` | 🟢 | `.ax-button--elevated` | 🟢 | ✅ | `f4038e3` |
| A2.4 | `mat-stroked-button` | 🟢 | `.ax-button--outline` | 🟢 | ✅ | `f4038e3` |
| A2.5 | `mat-icon-button` | 🟢 | `.ax-button--icon` / `[data-icon-only]` | 🟢 | ✅ | `f4038e3` |
| A2.6 | `mat-fab` | 🟢 | `.ax-fab` | 🟢 | ✅ | `f4038e3` |
| A2.7 | `mat-mini-fab` | 🟢 | `.ax-fab--mini` | 🟢 | ✅ | `f4038e3` |
| A2.8 | `mat-progress-bar` | 🟢 | `.ax-progress` + `.ax-loading-bar` | 🟢 | ✅ | `f4038e3` |
| A2.9 | `mat-progress-spinner` | 🟢 | `.ax-spinner` / `.ax-circular` | 🟢 | ✅ | `f4038e3` |
| A2.10 | `mat-badge` | 🟢 | `.ax-badge` + role variants | 🟢 | ✅ | `f4038e3` |

### A3 · Navigation

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A3.1 | `mat-sidenav` + container | 🟢 | `.ax-sidenav` + `.ax-shell` / `.ax-page-shell` | 🟢 | ✅ | `135a8bc` |
| A3.2 | `mat-toolbar` | 🟢 | `.ax-toolbar` (+ --primary/--dark/--warn/--dense/--mobile) | 🟢 | ✅ | `135a8bc` |
| A3.3 | `mat-menu` | 🟢 | `.ax-menu` | 🟢 | ✅ | `135a8bc` |
| A3.4 | `mat-tabs` | 🟢 | `.ax-tabs` + `.ax-tab-pills` | 🟢 | ✅ | `135a8bc` |
| A3.5 | `mat-stepper` (horiz + vert) | 🟢 | `.ax-stepper` + `--vertical` | 🟢 | ✅ | `135a8bc` |

### A4 · Layout

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A4.1 | `mat-card` | 🟢 | `.ax-card` | 🟢 | ✅ | `e9de33e` |
| A4.2 | `mat-divider` | 🟢 | `.ax-divider` | 🟢 | — | `e9de33e` |
| A4.3 | `mat-expansion-panel` | 🟢 | `.ax-accordion` | 🟢 | ✅ | `e9de33e` |
| A4.4 | `mat-grid-list` | — | `.ax-grid` (utility) | 🟢 | — | Use CSS grid directly — no Material skin needed. |

### A5 · Data Table

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A5.1 | `mat-table` | 🟢 | `.ax-table` | 🟢 | ✅ | `2f0fad5` (sticky column) |
| A5.2 | `mat-paginator` | 🟢 | `.ax-pagination` + `.ax-paginator` | 🟢 | ✅ | `2f0fad5` |
| A5.3 | `mat-sort` header | 🟢 | `.ax-table__sort` | 🟢 | ✅ | `2f0fad5` |

### A6 · Popups & Modals

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A6.1 | `mat-dialog` | 🟢 | `.ax-dialog` + `.ax-dialog--sm/md/lg/full` | 🟢 | ✅ | `e9de33e` |
| A6.2 | `mat-snack-bar` | 🟢 | `.ax-toast` + `.ax-snack--*` role variants | 🟢 | ✅ | `e9de33e` |
| A6.3 | `mat-tooltip` | 🟢 | `.ax-tooltip` (`[data-tooltip]`) | 🟢 | ✅ | (shipped v0.4.0) |
| A6.4 | `mat-bottom-sheet` | 🟢 | `.ax-bottom-sheet` | 🟢 | ✅ | `e9de33e` |

### A7 · Other

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A7.1 | `mat-chips` | 🟢 | `.ax-chip` + `.ax-tag-input` + role variants | 🟢 | ✅ | `e9de33e` |
| A7.2 | `mat-list` / `mat-nav-list` | 🟢 | `.ax-list` | 🟢 | ✅ | `e9de33e` |
| A7.3 | `mat-tree` | 🟢 | `.ax-tree` | 🟢 | ✅ | `e9de33e` |

---

## Group B — `ax-only` components (no Material equivalent)

These only exist as `ax-*`; Material has no counterpart. Production-grade quality required — same bar as Group A twins.

| Component class | Status | Notes |
|---|:---:|---|
| `.ax-navbar` + `__container`/`__start`/`__center`/`__end`/`__brand`/`__link`/`__icon-btn` | 🟡 | Demo fixed in 0.4.1. Missing: density, mobile hamburger drawer, search slot, sticky + blur variants. |
| `.ax-nav-rail` (dark navy 80px rail) | 🟢 | Production-extracted from `ax-nav-rail.component.ts`. Verify NAV_ACCENTS × themes. |
| `.ax-search` (search input + suggestions) | 🟡 | Trigger exists. Missing: result panel, keyboard nav, grouping. |
| `.ax-command` (⌘K palette) | 🟡 | Markup exists. Missing: filter logic, match highlight, empty state, recent/suggested sections. |
| `.ax-stat` / `.ax-kv` / `.ax-field-display` | 🟢 | Production-grade. Add density support. |
| `.ax-breadcrumb` | 🟢 | Verify overflow ellipsis + Thai breakpoints. |
| `.ax-otp` | 🟡 | 6-box. Missing: paste-all, auto-advance, error state. |
| `.ax-counter` (incr/decr) | 🟡 | Exists. Missing: min/max/step/disabled. |
| `.ax-upload` (dropzone) | 🟡 | Missing: multi-file, progress per file, reject visual. |
| `.ax-banner` (full-width alert) | 🟢 | Verify dismiss. |
| `.ax-empty` / `.ax-error-state` / `.ax-skeleton` / `.ax-splash` | 🟢 | Production-grade visuals. |
| `.ax-timeline` | 🟡 | Exists. Missing: alternate side, density, icon variants. |
| `.ax-code-block` + `.ax-kbd` | 🟢 | Good. |
| `.ax-section-card` / `.ax-select-card` / `.ax-launcher` | 🟡 | Visuals ok. Missing: hover + selected polish. |
| `.ax-master-detail` | 🟡 | Layout shell. Missing: mobile collapse. |
| `.ax-page-header` / `.ax-page-shell` / `.ax-form-section` | 🟢 | Production-extracted. |
| `.ax-image-preview` | 🟡 | Basic. Missing: zoom/pan, download, caption. |
| `.ax-drawer` (non-Material) | 🟡 | Missing: handle, overlay click-close, swipe. |
| `.ax-alert` | 🟢 | Success/warning/error/info variants done. |
| `.ax-avatar` | 🟢 | Size + initials + image + group variants done. |

---

## Execution phases

Each phase lands green (every row 🟢 per sign-off checklist) before the next starts.

### Phase 1 — Foundation (Phase 0 tasks)
- [ ] 0.1 `--mat-sys-*` bridge audit + dark parity
- [ ] 0.2 Theme-export button + ZIP bundle generator
- [ ] 0.3 Component-consuming tokens (`--ax-control-h`, `--ax-focus-ring-*`)
- [ ] 0.4 Three-column override-tests page

### Phase 2 — Form Controls (A1) ✅ complete
- [x] A1.1 `mat-form-field` density + prefix/suffix + label — `8407d72`
- [x] A1.2 `mat-input` disabled / readonly / autofill — `8407d72`
- [x] A1.3 `mat-select` panel + `.ax-select-panel` — `8407d72`
- [x] A1.4 **build** `mat-autocomplete` override + `.ax-autocomplete` — `d29110a`
- [x] A1.5 `mat-checkbox` indeterminate — `d29110a`
- [x] A1.6 `mat-radio-group` spacing — `d29110a`
- [x] A1.7 `mat-slide-toggle` off-track + focus — `d29110a`
- [x] A1.8 `mat-slider` override + `.ax-slider` enrichment — `d2a94fb`
- [x] A1.9 **build** `mat-datepicker` override + `.ax-datepicker` — `d2a94fb`

### Phase 3 — Buttons, Nav, Tables (A2 + A3 + A5) ✅ complete
- [x] A2.1–A2.5 button variants (text / filled / raised / outlined / icon) — `f4038e3`
- [x] A2.6/A2.7 `mat-fab` / `mat-mini-fab` override + `.ax-fab` / `.ax-fab--mini` / `--extended` — `f4038e3`
- [x] A2.8 `mat-progress-bar` indeterminate + buffer — `f4038e3`
- [x] A2.9 `mat-progress-spinner` override — `f4038e3`
- [x] A2.10 `mat-badge` role variants — `f4038e3`
- [x] A3.1 `mat-sidenav` scrim + animation — `135a8bc`
- [x] A3.2 `mat-toolbar` override + `.ax-toolbar` — `135a8bc`
- [x] A3.3 `mat-menu` items / dividers / danger-item — `135a8bc`
- [x] A3.4 `mat-tabs` ink-bar + typography — `135a8bc`
- [x] A3.5 `mat-stepper` step icons + vertical variant — `135a8bc`
- [x] A5.1 `mat-table` sticky columns — `2f0fad5`
- [x] A5.2 `.ax-paginator` + `mat-paginator` override — `2f0fad5`
- [x] A5.3 `mat-sort` + `.ax-table__sort` — `2f0fad5`

### Phase 4 — Popups + Other (A4 + A6 + A7) ✅ complete
- [x] A4.1 `mat-card` header / footer / media — `e9de33e`
- [x] A4.2 `mat-divider` override — `e9de33e`
- [x] A4.3 `mat-expansion-panel` override — `e9de33e`
- [x] A6.1 `mat-dialog` size presets — `e9de33e`
- [x] A6.2 `mat-snack-bar` role variants — `e9de33e`
- [x] A6.3 `mat-tooltip` (shipped v0.4.0)
- [x] A6.4 `mat-bottom-sheet` override + `.ax-bottom-sheet` — `e9de33e`
- [x] A7.1 `mat-chips` variants — `e9de33e`
- [x] A7.2 `mat-list` override — `e9de33e`
- [x] A7.3 `mat-tree` override + `.ax-tree` — `e9de33e`

### Phase 5 — `ax-only` polish (Group B gaps)
- [ ] `.ax-navbar` density + hamburger + search slot
- [ ] `.ax-command` filter + keyboard + highlight
- [ ] `.ax-otp` paste + error
- [ ] `.ax-upload` multi-file + progress
- [ ] `.ax-timeline` alternate-side
- [ ] `.ax-image-preview` zoom
- [ ] `.ax-drawer` swipe-dismiss
- [ ] Mobile responsiveness audit

---

## Theme export contract (Phase 1 · task 0.2)

`aegisx-custom-theme-{YYMMDD}.zip` contains:

```
aegisx-custom-theme/
├── tokens.css              # current Tweaks state as :root custom properties
├── aegisx-material-theme.scss   # mat.define-theme({...}) with current density + typography
├── aegisx-material-bridge.scss  # current --mat-sys-* aliases
├── aegisx-component-overrides.scss  # per-component MDC overrides differing from defaults
├── tokens.json             # Tokens Studio format (Figma sync)
└── README.md               # Quick-start: drop into Angular `styles.scss`
```

Consumer drops these into `src/styles/` and adds `@use './styles/aegisx-material-theme';` — no further config.

---

## Sign-off checklist (per component, **both paths**)

Mark 🟢 only when **all** true:

1. Uses `--ax-*` tokens only — no hex / rgb literals in overrides.
2. Light + dark parity verified.
3. All four Tweaks controls (brand / density / radius / font-family) change the component live.
4. Matches production screenshot (or documented as a new design).
5. Has a demo in `pages/components.html`.
6. Has a row in `pages/override-tests.html` — three columns (plain Mat / skinned Mat / ax-custom) visually identical.
7. WCAG AA contrast on every interactive state (hover / focus / disabled).
8. RTL-safe (Thai) — logical properties (`inline-start` / `inline-end`) not `left` / `right`.
9. CHANGELOG entry + commit SHA referenced here.

---

## Out of scope (post-1.0)

- CDK primitives (virtual-scroll, drag-drop, overlay, a11y) — used as-is, no override.
- Legacy namespace (`mat-legacy-*`).
- Non-Material framework skins (Ionic, PrimeNG, Bootstrap).
