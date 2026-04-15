# AegisX Design Tokens — Specification

**Status:** v0.1 (authoritative)
**Source of truth:** this folder (`aegisx-design-system/tokens/`)
**Downstream mirror:** `aegisx-starter-1/libs/aegisx-ui/src/lib/foundations/*` — TypeScript token files there must match these JSON files. When they drift, these JSON files win.

---

## Scope

AegisX tokens cover **7 foundations**:

| Foundation | File | Consumers |
|---|---|---|
| Color | `dtcg/color.json` | all UI |
| Spacing | `dtcg/spacing.json` | layout, components |
| Typography | `dtcg/typography.json` | all text |
| Radius | `dtcg/radius.json` | components |
| Border width | `dtcg/border-width.json` | components |
| Shadow / Elevation | `dtcg/shadow.json`, `dtcg/elevation.json` | cards, overlays |
| Motion | `dtcg/motion.json` (duration + easing) | transitions, animations |
| Breakpoints | `dtcg/breakpoint.json` | responsive layout |

---

## Format

- **Source:** [W3C Design Tokens Community Group (DTCG) draft](https://tr.designtokens.org/format/) JSON format. Each leaf is `{ "$value": ..., "$type": ... }`.
- **Prefix:** all CSS custom properties are emitted with `--ax-` prefix.
- **Theme:** `color` is the only foundation that forks light/dark. Every other foundation is theme-agnostic.

---

## Color — two layers

1. **Reference palette** (`color.palette.*`) — raw hues with 50–900 scale (Tailwind-aligned). Do not use directly in UI code.
2. **Semantic tokens** (`color.semantic.*`) — role-based aliases (`background.default`, `text.primary`, `brand.emphasis`, etc.) that reference the palette. **UI code uses these.**

Light is the default (`:root`). Dark overrides via `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)`.

### Semantic categories
- `background`: `muted | subtle | default | emphasis`
- `text`: `disabled | subtle | secondary | primary | heading | inverted`
- `border`: `muted | default | emphasis`
- Status / accent palettes (`success | warning | error | info | cyan | purple | indigo | pink | brand`), each with `faint | muted | subtle | default | emphasis | inverted`.

---

## Spacing — 8pt grid

4, 8, 12, 16, 24, 32, 48, 64 (px) as `xs | sm | md | lg | xl | 2xl | 3xl | 4xl`. Semantic groups (`component.*`, `layout.*`, `container.*`, `inset.*`, `stack.*`) alias to the base scale.

## Typography

- Sans stack: `Inter, "Noto Sans Thai", …system` (Thai language is a first-class citizen — do not drop it).
- Mono stack: `"JetBrains Mono", "Fira Code", …`
- Size scale: `xs … 4xl` matches Tailwind.
- Weights: 400 / 500 / 600 / 700.
- **Material 3 roles:** `display | headline | title | body | label` × `large | medium | small`. Use these for semantic headings in products (not raw `fontSize`).

## Radius

`none | sm(6px) | md(10px) | lg(16px) | xl(20px) | 2xl(24px) | full(9999px)`.

## Border width

`none | thin(1px) | default(2px) | thick(4px)`.

## Shadow & Elevation

Two parallel scales:
- `shadow.{none|xs|sm|md|lg|xl}` — general-purpose (Tailwind-aligned).
- `elevation.{0..5}` — Material 3 depth levels. Use these for component specs (cards=1, raised buttons=2, menus=3, modals=4, max=5).

## Motion

- `duration.{instant|fast|normal|slow|slower}` = 75 / 150 / 250 / 350 / 500 ms.
- Plus M3 scale `duration.m3.{short1..long4}` (50 → 600 ms).
- `easing.{linear|ease|easeIn|easeOut|easeInOut}` + M3 `easing.m3.{standard|emphasized|...}`.

## Breakpoints

Mobile-first: `xs=0 | sm=600 | md=960 | lg=1280 | xl=1440 | 2xl=1920`. Container max-widths defined separately (`container.{sm..2xl}`).

---

## Governance

1. **Add / change a token:** PR modifies `dtcg/*.json` first. Regenerate `css/tokens.css` and `scss/_tokens.scss` in the same PR. Bump this spec's version.
2. **Consumer sync:** `aegisx-ui/src/lib/foundations/*` must be updated by the consumer repo owner in a follow-up PR referencing the design-system version. Never edit the TS tokens directly without updating the JSON here first.
3. **Naming rule:** semantic tokens refer to *role*, not *value*. Do not introduce `color.blue.500` as a semantic name — use `color.info.default` or add a new semantic role.
4. **Deprecation:** mark old tokens `$deprecated: true` with `$replacement`. Keep for one minor version before removal.
