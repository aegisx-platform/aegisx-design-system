# Component Map — Material v3 ↔ AegisX

How every `.ax-*` CSS component relates to Angular Material v3. Use this when deciding whether to use a native `mat-*` component with the bridge, or a standalone `.ax-*` class.

**Rule:** In Angular apps, use `mat-*` components whenever one exists — the Material bridge (`scss/aegisx-material-overrides.scss`) ensures they look like AegisX. Use `.ax-*` standalone CSS only when:
1. No Material equivalent exists (AegisX-custom components)
2. Non-Angular context (static HTML, preview pages, marketing)
3. Lightweight alternative needed (no Angular Material dependency)

---

## Material-aligned components (27)

These have a `mat-*` equivalent. The `.ax-*` CSS mirrors the same design values (radius, padding, color) that the bridge applies to Material components.

| `.ax-*` class | Material component | Bridge file | Notes |
|---|---|---|---|
| `.ax-button` | `mat-button`, `mat-flat-button`, `mat-stroked-button`, `mat-raised-button` | `--mdc-*-button-*` | 5 variants × 5 sizes |
| `.ax-button-group` | `mat-button-toggle-group` | `--mat-*-toggle-*` | Joined buttons |
| `.ax-input` | `mat-form-field` (outline) | `--mdc-outlined-text-field-*` | Ring-based border |
| `.ax-textarea` | `mat-form-field` (textarea) | same | Multi-line |
| `.ax-select` | `mat-select` | `--mat-select-*` | Native select wrapper |
| `.ax-checkbox` | `mat-checkbox` | `--mdc-checkbox-*` | Styled checkbox |
| `.ax-radio` | `mat-radio-button` | `--mdc-radio-*` | Styled radio |
| `.ax-toggle` | `mat-slide-toggle` | `--mdc-switch-*` | On/off switch |
| `.ax-slider` | `mat-slider` | `--mdc-slider-*` | Range input |
| `.ax-card` | `mat-card` | `box-shadow`, `border-radius` | Flat/elevated/floating |
| `.ax-dialog` | `mat-dialog` | `--mdc-dialog-*` | Modal |
| `.ax-menu` | `mat-menu` | `--mat-menu-*` | Dropdown |
| `.ax-tabs` | `mat-tab-group` (underline) | `--mat-tab-header-*` | Underline tabs |
| `.ax-tab-pills` | `mat-button-toggle-group` (can style as pills) | custom | Pill tabs |
| `.ax-chip` | `mat-chip` | `--mdc-chip-*` | Removable tag |
| `.ax-badge` | `mat-badge` (counter) + custom pill | `--mat-badge-*` | Pill + counter |
| `.ax-tooltip` | `mat-tooltip` | `--mdc-plain-tooltip-*` | CSS-only via `[data-tooltip]` |
| `.ax-table` | `mat-table` | `--mat-table-*` | Full table |
| `.ax-pagination` | `mat-paginator` | custom | Table companion |
| `.ax-progress` | `mat-progress-bar` | `--mdc-linear-progress-*` | Linear |
| `.ax-circular` | `mat-progress-spinner` | `--mdc-circular-progress-*` | SVG donut |
| `.ax-spinner` | `mat-spinner` | same | Indeterminate |
| `.ax-stepper` | `mat-stepper` | custom | Wizard steps |
| `.ax-accordion` | `mat-expansion-panel` | `--mat-expansion-*` | Collapsible |
| `.ax-divider` | `mat-divider` | inherits | Separator |
| `.ax-toast` | `mat-snack-bar` | `--mdc-snackbar-*` | Notification |
| `.ax-list` | `mat-list` / `mat-nav-list` | `--mat-list-*` | Generic list |
| `.ax-sidenav` | `mat-sidenav` | custom | Side navigation |
| `.ax-drawer` | `mat-drawer` / bottom sheet | custom | Slide-out panel |

## AegisX-custom components (37)

No Material v3 equivalent. These are pure AegisX patterns — use `.ax-*` classes directly in any context.

### Data display
| `.ax-*` class | Purpose |
|---|---|
| `.ax-avatar` | User photo / initials (4 sizes × role variants) |
| `.ax-dot` | Status indicator (success/warning/error/info) |
| `.ax-stat` | Dashboard KPI card (value + label + trend) |
| `.ax-kv` | Key-value grid (patient record layout) |
| `.ax-field-display` | Read-only label:value (single field) |
| `.ax-section-card` | Card with labeled header |
| `.ax-select-card` | Selectable option card (radio-like) |
| `.ax-timeline` | Vertical event log |
| `.ax-code-block` | Syntax-highlighted code + language tabs |
| `.ax-code-tag` | Inline language label |
| `.ax-image-preview` | Preview card with hover overlay |
| `.ax-kbd` | Keyboard shortcut badge |
| `.ax-counter` | Notification count badge (on icon/avatar) |
| `.ax-segmented-progress` | Multi-segment progress bar |
| `.ax-featured-icon` | Large icon circle (4 sizes × 6 roles) |

### Feedback
| `.ax-*` class | Purpose |
|---|---|
| `.ax-alert` | Inline status message (4 roles) |
| `.ax-banner` | Full-width dismissable notification |
| `.ax-empty` | No-data empty state |
| `.ax-error-state` | Error state with code |
| `.ax-skeleton` | Loading placeholder (no shimmer) |
| `.ax-loading-bar` | Top-of-page indeterminate bar |
| `.ax-splash` | Full-page loading screen |

### Navigation
| `.ax-*` class | Purpose |
|---|---|
| `.ax-navbar` | Horizontal top nav (brand/links/actions/user) |
| `.ax-navbar-user` | User avatar + name + dropdown trigger |
| `.ax-breadcrumb` | Hierarchy trail |
| `.ax-command` | Search/command palette (visual shell) |

### Layout
| `.ax-*` class | Purpose |
|---|---|
| `.ax-shell` | App shell (sidebar + topbar + content grid) |
| `.ax-page-header` | Page title + actions bar |
| `.ax-master-detail` | List + detail split layout |
| `.ax-form-section` | Grouped fields with heading |

### Forms
| `.ax-*` class | Purpose |
|---|---|
| `.ax-search` | Input with icon prefix |
| `.ax-tag-input` | Inline removable tags + text input |
| `.ax-otp` | OTP digit box grid |
| `.ax-upload` | File dropzone |

### Misc
| `.ax-*` class | Purpose |
|---|---|
| `.ax-link` | Styled anchor |
| `.ax-launcher-card` | App module launcher |
| `.ax-scrim` | Overlay backdrop |

---

## Design values alignment

Key values that MUST match between `.ax-*` CSS and the Material bridge:

| Property | Value | Token | Where |
|---|---|---|---|
| Button radius | 6px | `--ax-radius-sm` | `.ax-button` + `--mdc-*-button-container-shape` |
| Input radius | 6px | `--ax-radius-sm` | `.ax-input` + `--mdc-outlined-text-field-container-shape` |
| Card radius | 12px | `--ax-radius-lg` | `.ax-card` + `mat-mdc-card` |
| Dialog radius | 12px | `--ax-radius-lg` | `.ax-dialog` + `--mdc-dialog-container-shape` |
| Menu radius | 8px | `--ax-radius-md` | `.ax-menu` + `--mat-menu-container-shape` |
| Chip radius | 9999px | `--ax-radius-full` | `.ax-chip` + `--mdc-chip-container-shape` |
| Tooltip radius | 6px | `--ax-radius-sm` | `[data-tooltip]` + `--mdc-plain-tooltip-container-shape` |
| Body font | IBM Plex Sans Thai | `--ax-font-sans` | everywhere |
| Body size | 14px | `--ax-text-sm-size` | base |
| Primary color | `#6366f1` | `--ax-primary` | `--mat-sys-primary` |
| Focus ring | `0 0 0 3px indigo@18%` | `--ax-focus-ring` | all interactive |
| Card shadow | `shadow-sm` | `--ax-elevation-1` | `.ax-card--elevated` + `mat-mdc-card` |
| Border default | zinc-200 | `--ax-border-default` | ring-based `inset 0 0 0 1px` |

### Density note

Material bridge sets `density: -1` (clinical). This makes `mat-button` height **36px** (not 40px). The standalone `.ax-button` uses 40px at `md` size for readability in non-Angular contexts. When precise parity is needed, use `mat-button` via the bridge — not `.ax-button`.

| Size | `.ax-button` | `mat-button` (density -1) | Δ |
|---|---|---|---|
| xs | 28px | — | AegisX only |
| sm | 32px | ~32px (icon btn) | ≈ match |
| md | 40px | 36px | +4px |
| lg | 44px | — | AegisX only |
| xl | 48px | 40px (density 0) | +8px |

This is intentional: `.ax-*` optimizes for standalone readability; Material bridge optimizes for clinical density in Angular apps. Both use the same colors, fonts, and radii.
