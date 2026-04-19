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
| 0.4 | **Override test page** — `pages/override-tests.html` renders every control in **three columns**: plain Material (baseline) / `.ax-field`-skinned Material (override path) / `ax-custom` (custom path). Proves visual parity at every Tweaks state. | `pages/override-tests.html` (new) |

---

## Group A — Material components (each needs BOTH paths)

Columns:
- **Mat** = Material override status (skins `<mat-*>`)
- **Ax** = `ax-*` custom status (pure CSS)
- **Tweaks** = does the live Tweaks panel affect both paths?

### A1 · Form Controls

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A1.1 | `mat-form-field` | 🟡 | `.ax-field` | 🟢 | ✅ | Mat: need density support + prefix/suffix alignment + label typography. Ax: complete. |
| A1.2 | `mat-input` | 🟡 | `.ax-input` / `.ax-textarea` | 🟢 | ✅ | Mat: disabled contrast, readonly, autofill bg, number spinners. Ax: complete. |
| A1.3 | `mat-select` | 🟡 | `.ax-select` (trigger) + new `.ax-menu` panel | 🟡 | ✅ | Mat: panel options hover/active/group-header. Ax: trigger exists — need `.ax-select-panel` for open-state dropdown (reuse `.ax-menu`). |
| A1.4 | `mat-autocomplete` | 🟡 | `.ax-autocomplete` (**missing**) | 🔴 | ✅ | Build: input + floating panel + keyboard nav + match-highlight. |
| A1.5 | `mat-checkbox` | 🟡 | `.ax-checkbox` | 🟢 | ✅ | Mat: indeterminate + ripple suppression. |
| A1.6 | `mat-radio-group` | 🟡 | `.ax-radio` + `.ax-radio-group` | 🟢 | ✅ | Mat: group spacing, disabled tint. |
| A1.7 | `mat-slide-toggle` | 🟡 | `.ax-toggle` | 🟢 | ✅ | Mat: off-track + focus ring. |
| A1.8 | `mat-slider` | 🔴 | `.ax-slider` | 🟡 | ✅ | Mat: handle / track / tick / value-indicator not skinned yet. Ax: exists but basic — add value label, range variant, step ticks. |
| A1.9 | `mat-datepicker` | 🔴 | `.ax-datepicker` (**missing**) | 🔴 | ✅ | Build both. Ax version: calendar popover, month/year nav, today/selected/range cells, Buddhist-era hook. |

### A2 · Buttons & Indicators

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A2.1 | `mat-button` (text) | 🟡 | `.ax-button--ghost` | 🟢 | ✅ | Mat: hover tint via `color-mix`, density. |
| A2.2 | `mat-flat-button` (filled) | 🟡 | `.ax-button--primary` | 🟢 | ✅ | Mat: hover darken, pressed, disabled bg. |
| A2.3 | `mat-raised-button` | 🟡 | `.ax-button--primary` + `.ax-elevation-2` | 🟡 | ✅ | Mat: elevation on hover. Ax: add elevation modifier. |
| A2.4 | `mat-stroked-button` | 🟡 | `.ax-button--outline` | 🟢 | ✅ | Mat: border hover + disabled. |
| A2.5 | `mat-icon-button` | 🟡 | `.ax-button--icon` / `.ax-navbar__icon-btn` | 🟢 | ✅ | Mat: hover bg + focus ring + density variants. |
| A2.6 | `mat-fab` | 🔴 | `.ax-fab` (**missing**) | 🔴 | ✅ | Build both. Circular 56px + extended variant (pill with label). |
| A2.7 | `mat-mini-fab` | 🔴 | `.ax-fab--mini` (**missing**) | 🔴 | ✅ | 40px. |
| A2.8 | `mat-progress-bar` | 🟡 | `.ax-progress` + `.ax-loading-bar` | 🟢 | ✅ | Mat: buffer bar, indeterminate timing. |
| A2.9 | `mat-progress-spinner` | 🔴 | `.ax-spinner` / `.ax-circular` | 🟢 | ✅ | Mat: color + stroke-width. |
| A2.10 | `mat-badge` | 🔴 | `.ax-badge` + `.ax-counter-wrap` | 🟢 | ✅ | Mat: overlap position (above/below × left/right), size variants. Ax: complete. |

### A3 · Navigation

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A3.1 | `mat-sidenav` + container | 🟡 | `.ax-sidenav` + `.ax-shell` / `.ax-page-shell` | 🟢 | ✅ | Mat: scrim + content-shift animation for `mode="over"`. |
| A3.2 | `mat-toolbar` | 🔴 | `.ax-toolbar` (**missing**) — separate from `.ax-navbar` | 🔴 | ✅ | `mat-toolbar` ≠ navbar (no brand/user/menu, just container). Build `.ax-toolbar` + `.ax-toolbar--primary` color variants. |
| A3.3 | `mat-menu` | 🟡 | `.ax-menu` | 🟢 | ✅ | Mat: submenu arrow, icon alignment, keyboard. |
| A3.4 | `mat-tabs` | 🟡 | `.ax-tabs` + `.ax-tab-pills` | 🟢 | ✅ | Mat: ink-bar curve, disabled tab, scrollable pager. |
| A3.5 | `mat-stepper` (horiz + vert) | 🔴 | `.ax-stepper` | 🟡 | ✅ | Mat: skin step icons + connector. Ax: add vertical variant + done/active/disabled states. |

### A4 · Layout

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A4.1 | `mat-card` | 🟡 | `.ax-card` | 🟢 | ✅ | Mat: header/subtitle/footer typography, media, action-buttons padding; elevation matches Tweaks. |
| A4.2 | `mat-divider` | 🔴 | `.ax-divider` | 🟢 | — | Mat: color + inset. |
| A4.3 | `mat-expansion-panel` | 🔴 | `.ax-accordion` | 🟢 | ✅ | Mat: header hover, expand icon, body padding. Ax: complete — verify `.ax-expansion-panel` alias. |
| A4.4 | `mat-grid-list` | — | `.ax-grid` (utility) | 🟢 | — | No mat skin needed; document CSS grid as the preferred approach. |

### A5 · Data Table

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A5.1 | `mat-table` | 🟢 | `.ax-table` | 🟢 | ✅ | Both solid. Verify sticky column + column resize. |
| A5.2 | `mat-paginator` | 🔴 | `.ax-pagination` + new `.ax-paginator` (**needs enrichment**) | 🟡 | ✅ | `.ax-pagination` = numeric pager. `.ax-paginator` needs: page-size dropdown, range label "1–10 of 100", next/prev/first/last. |
| A5.3 | `mat-sort` header | 🟡 | `.ax-table__sort` (part of `.ax-table`) | 🟡 | — | Both: arrow color + hover + aria-live. |

### A6 · Popups & Modals

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A6.1 | `mat-dialog` | 🟡 | `.ax-dialog` | 🟢 | ✅ | Mat: padding + width presets (sm/md/lg) + divider. |
| A6.2 | `mat-snack-bar` | 🟡 | `.ax-toast` | 🟡 | ✅ | Mat: action button + success/warning/error variants. Ax: stack + auto-dismiss progress. |
| A6.3 | `mat-tooltip` | 🟢 | `.ax-tooltip` (`[data-tooltip]`) | 🟢 | ✅ | Both done. Verify Thai font + max-width. |
| A6.4 | `mat-bottom-sheet` | 🔴 | `.ax-bottom-sheet` (**missing**) | 🔴 | ✅ | Build both. Handle + safe-area inset + swipe-dismiss. |

### A7 · Other

| # | Material component | Mat | Ax twin (class) | Ax | Tweaks | Gap / notes |
|---|---|:---:|---|:---:|:---:|---|
| A7.1 | `mat-chips` | 🟡 | `.ax-chip` + `.ax-tag-input` | 🟢 | ✅ | Mat: selected / disabled / removable / avatar slot. |
| A7.2 | `mat-list` / `mat-nav-list` | 🔴 | `.ax-list` | 🟢 | ✅ | Mat: row height, leading-icon, trailing-meta, 2/3-line variants. |
| A7.3 | `mat-tree` | 🔴 | `.ax-tree` (**missing**) | 🔴 | ✅ | Build both. Chevron, indent rails, drag-drop hint, keyboard. |

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

### Phase 2 — Form Controls (A1)
- [ ] A1.1 `mat-form-field` density + prefix/suffix + label
- [ ] A1.2 `mat-input` disabled / readonly / autofill
- [ ] A1.3 `mat-select` panel + `.ax-select-panel`
- [ ] A1.4 **build** `mat-autocomplete` override + `.ax-autocomplete`
- [ ] A1.5 `mat-checkbox` indeterminate
- [ ] A1.6 `mat-radio-group` spacing
- [ ] A1.7 `mat-slide-toggle` off-track + focus
- [ ] A1.8 `mat-slider` override + `.ax-slider` enrichment
- [ ] A1.9 **build** `mat-datepicker` override + `.ax-datepicker`

### Phase 3 — Buttons, Nav, Tables (A2 + A3 + A5)
- [ ] A2.1–A2.5 All button variants — hover / pressed / disabled / density
- [ ] A2.6/A2.7 **build** `mat-fab` / `mat-mini-fab` override + `.ax-fab` / `.ax-fab--mini`
- [ ] A2.8 `mat-progress-bar` indeterminate + buffer
- [ ] A2.9 `mat-progress-spinner` override (Ax already done)
- [ ] A2.10 `mat-badge` position variants
- [ ] A3.1 `mat-sidenav` scrim + animation
- [ ] A3.2 **build** `mat-toolbar` override + `.ax-toolbar`
- [ ] A3.3 `mat-menu` items / dividers / submenus
- [ ] A3.4 `mat-tabs` ink-bar + typography
- [ ] A3.5 `mat-stepper` step icons + vertical variant
- [ ] A5.2 **enrich** `.ax-paginator` + `mat-paginator` override
- [ ] A5.3 `mat-sort` + `.ax-table__sort` arrow + aria

### Phase 4 — Popups + Other (A4 + A6 + A7)
- [ ] A4.1 `mat-card` header / footer / media
- [ ] A4.2 `mat-divider` override
- [ ] A4.3 `mat-expansion-panel` override (Ax `.ax-accordion` already done)
- [ ] A6.1 `mat-dialog` size presets
- [ ] A6.2 `mat-snack-bar` variants + `.ax-toast` stack
- [ ] A6.3 `mat-tooltip` polish
- [ ] A6.4 **build** `mat-bottom-sheet` override + `.ax-bottom-sheet`
- [ ] A7.1 `mat-chips` variants
- [ ] A7.2 `mat-list` override
- [ ] A7.3 **build** `mat-tree` override + `.ax-tree`

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
