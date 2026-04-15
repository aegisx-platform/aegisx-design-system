# AegisX Design Tokens — Specification

**Status:** v0.2 (authoritative) · aligned to `aegisx-ui-design` skill (Untitled UI + Angular Material v3)
**Source of truth:** this folder (`aegisx-design-system/tokens/`)
**Downstream:** `aegisx-starter-1/libs/aegisx-ui/src/lib/foundations/*` (TS) and Tokens Studio JSON (Figma). When they drift, these files win.

---

## Design language

AegisX follows the **"Clean Clinical SaaS"** aesthetic:
- Neutral gray-dominant surfaces (Tailwind **Zinc** scale)
- Indigo brand accent used sparingly for actions & status
- Low elevation — subtle borders over heavy shadows
- Dense but readable — 14px body base for clinical screens
- IBM Plex Sans Thai (Thai-first typography)

Reference: `aegisx-platform/aegisx-skill → skills/aegisx-ui-design/SKILL.md`

---

## Three-layer token architecture

```
┌─────────────────────────────────────────────────────────────┐
│ 1. PRIMITIVE  --ax-color-{zinc|indigo|green|amber|red|blue} │  raw palette
│               -{50..950}                                     │
├─────────────────────────────────────────────────────────────┤
│ 2. SEMANTIC   --ax-background-*, --ax-text-*, --ax-border-* │  role aliases
│               --ax-primary, --ax-{brand|success|warning|    │  (theme-aware)
│               error|info}-*                                  │
├─────────────────────────────────────────────────────────────┤
│ 3. COMPONENT  --ax-nav-*, --ax-button-*, --ax-input-*,      │  scoped
│               --ax-table-*                                   │
└─────────────────────────────────────────────────────────────┘
```

**Rule:** UI code uses layer 2 or 3. Layer 1 is never referenced from app code.

---

## Foundations covered

| Foundation | File | Notes |
|---|---|---|
| Color | `dtcg/color.json` | Zinc gray + Indigo brand + Tailwind status hues · light/dark semantic layers |
| Spacing | `dtcg/spacing.json` | 4px grid · xs → 4xl with semantic aliases |
| Typography | `dtcg/typography.json` | IBM Plex Sans Thai · Untitled scale (text xs→xl + display xs→2xl) · 14px base |
| Radius | `dtcg/radius.json` | sm=6 buttons · md=8 cards · lg=12 modals |
| Border width | `dtcg/border-width.json` | 1px dominant · 2px thick |
| Shadow / Elevation | `dtcg/shadow.json` | Untitled UI gentle shadows · elevation 0–4 + focus ring |
| Motion | `dtcg/motion.json` | duration + easing (+ M3 variants) |
| Breakpoints | `dtcg/breakpoint.json` | xs → 2xl mobile-first |

---

## Color tokens

### Primitive palette
All hues use 50–900 scale (Zinc also 950). Tailwind source values.

### Semantic (layer 2) — light theme default

**Background**
- `--ax-background-page` = zinc-50 (app root)
- `--ax-background-default` = white (cards/surfaces)
- `--ax-background-subtle` = zinc-100 (hover, divider)
- `--ax-background-muted` = zinc-50 (table stripe, inset panel)
- `--ax-background-emphasis` = zinc-700 (dark header)

**Text**
- `--ax-text-disabled` = zinc-300
- `--ax-text-subtle` = zinc-400 (icon default, placeholder)
- `--ax-text-secondary` = zinc-500
- `--ax-text-default` = zinc-700 (body text)
- `--ax-text-strong` = zinc-900
- `--ax-text-heading` = zinc-950
- `--ax-text-inverted` = white

**Border**
- `--ax-border-subtle` = zinc-100
- `--ax-border-default` = zinc-200
- `--ax-border-emphasis` = zinc-300

**Primary (brand shorthand)**
- `--ax-primary` = indigo-500
- `--ax-primary-light` = indigo-300
- `--ax-primary-dark` = indigo-700

**Role palettes** — 9 roles × 6 variants
Each of `brand / success / warning / error / info` has `faint / muted / subtle / default / emphasis / inverted`.

### Dark theme
Activated via `[data-theme="dark"]` or `prefers-color-scheme: dark` (when `data-theme` is unset or `"auto"`). Also honors `prefers-reduced-motion`.

Brand/status use the **400 step** in dark mode (softer). Shadows are more opaque to preserve perceived depth.

---

## Component token layer (layer 3)

- **Navigation**: `--ax-nav-bg`, `--ax-nav-text`, `--ax-nav-text-hover`, `--ax-nav-text-active`, `--ax-nav-bg-active`, `--ax-nav-border`
- **Table**: `--ax-table-header-bg`, `--ax-table-header-text`, `--ax-table-row-hover-bg`, `--ax-table-cell-border`, `--ax-table-cell-text`
- **Button**: `--ax-button-primary-*`, `--ax-button-secondary-*`, `--ax-button-danger-*`
- **Input**: `--ax-input-bg`, `--ax-input-border`, `--ax-input-border-focus`, `--ax-input-ring-focus`, `--ax-input-border-error`, `--ax-input-ring-error`
- **Focus ring**: `--ax-focus-ring` (indigo @ 18% · 3px)

---

## Typography

- **Font stack**: IBM Plex Sans Thai (primary) → IBM Plex Sans → system-ui
- **Body base**: 14px (`--ax-text-sm`) — NOT 16px
- **Weights**: 400 regular · 500 medium (labels/nav) · 600 semibold (headings/card titles) · 700 bold (sparingly)
- **Body scale**: `--ax-text-{xs|sm|md|lg|xl}` — 12/14/16/18/20 px
- **Display scale**: `--ax-display-{xs|sm|md|lg|xl|2xl}` — 24/30/36/48/60/72 px

---

## Angular Material v3 integration

See `ANGULAR-MATERIAL-SETUP.md` for consumer setup. TL;DR:
1. Import `css/tokens.css` (defines `--ax-*`)
2. Import `scss/aegisx-material-theme.scss` (M3 API + density -1 + IBM Plex)
3. Import `scss/aegisx-material-bridge.scss` (aliases `--mat-sys-*` → `--ax-*`)
4. Import `scss/aegisx-material-overrides.scss` (per-component polish)

---

## Governance

1. **Changes start in `dtcg/*.json`.** Regenerate `css/tokens.css`, `scss/_tokens.scss`, `scss/aegisx-material-bridge.scss` in the same PR.
2. **Never edit `--mat-sys-*` / `--mdc-*` in app code.** Single source of truth is `--ax-*`.
3. **Name by role, not value.** `--ax-text-default`, not `--ax-text-zinc-700`.
4. **Deprecation:** mark old tokens with `$deprecated: true` + `$replacement`. Keep for one minor version.
5. **Consumer sync:** after JSON changes land here, mirror into `aegisx-ui/foundations/*` in a follow-up PR referencing this version.

---

## Version history

- **v0.2** — Align to `aegisx-ui-design` skill: Zinc palette, IBM Plex Sans Thai, 14px base, Untitled UI type scale, 3-layer token architecture, Angular Material v3 bridge files. **Breaking renames:** `--ax-bg-*` → `--ax-background-*`, `--ax-text-primary` → `--ax-text-default`, M3 role tokens dropped in favor of Untitled text/display scale.
- **v0.1** — Initial promotion from `aegisx-ui/foundations`. Gray (Tailwind gray, not Zinc), Inter font, Material 3 role tokens.
