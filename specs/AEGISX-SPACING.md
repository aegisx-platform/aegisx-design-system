# AegisX Spacing · Radius · Shadow · Z-index — Standard Spec

> **Version 2.0** · v0.3 tokens · Aligned to `AEGISX-DESIGN-PRINCIPLES.md` and `tokens/AEGISX-TOKENS-SPEC.md`

The locked subset of spacing, radius, shadow, border, and z-index tokens that every AegisX product uses. Pick from this list — never invent ad-hoc values.

---

## 1. Spacing scale · 4px grid

| Token | Value | px | Use |
|---|---|---|---|
| `--ax-spacing-xs`  | 0.25rem | 4  | Tight inline gap (icon ↔ text) |
| `--ax-spacing-sm`  | 0.5rem  | 8  | Form-field internal, chip padding |
| `--ax-spacing-md`  | 0.75rem | 12 | Input horizontal padding, compact rows |
| `--ax-spacing-lg`  | 1rem    | 16 | **Default gap, card body padding** |
| `--ax-spacing-xl`  | 1.5rem  | 24 | Card horizontal padding, modal body |
| `--ax-spacing-2xl` | 2rem    | 32 | Section padding |
| `--ax-spacing-3xl` | 3rem    | 48 | Page section rhythm |
| `--ax-spacing-4xl` | 4rem    | 64 | Hero / splash vertical |

**Semantic aliases** (same values, named by intent):
- `--ax-component-{xs|sm|md|lg}` — inside components
- `--ax-layout-{xs..xl}` — between components
- `--ax-container-{xs..xl}` — inside a container
- `--ax-inset-{xs..xl}` — padding on all sides
- `--ax-stack-{xs..xl}` — vertical rhythm

**Anti-patterns:**
- ❌ `padding: 5px` — snap to 4 or 8.
- ❌ `padding: 20px` — we removed that step. Pick 16 or 24.
- ❌ Inline `style="margin: 13px"` — bypasses the system.

---

## 2. Radius

Capped at **16px** (`xl`). Untitled UI `rounded-2xl` and beyond is too playful for clinical UI.

| Token | Value | px | Use |
|---|---|---|---|
| `--ax-radius-none` | 0       | 0  | Tables, code blocks, flush corners |
| `--ax-radius-xs`   | 0.25rem | 4  | Small badges, checkboxes |
| `--ax-radius-sm`   | 0.375rem| 6  | **Buttons, inputs** |
| `--ax-radius-md`   | 0.5rem  | 8  | Dropdowns, menus, popovers |
| `--ax-radius-lg`   | 0.75rem | 12 | **Cards, modals, large panels (preferred)** |
| `--ax-radius-xl`   | 1rem    | 16 | Hero / onboarding panels |
| `--ax-radius-full` | 9999px  | —  | Avatars, pills, status dots |

**Default picks**
- Button / input → `sm` (6px)
- Card / modal → `lg` (12px)
- Badge / chip / avatar → `full`

---

## 3. Border width

AegisX prefers thin borders over heavy shadows.

| Token | Value | Use |
|---|---|---|
| `--ax-border-width-none`    | 0   | Remove border |
| `--ax-border-width-thin`    | 1px | **Default — all surfaces** |
| `--ax-border-width-default` | 1px | (alias of thin) |
| `--ax-border-width-thick`   | 2px | Focus ring, error input emphasis |

**Rule:** 1px is dominant. Use 2px only when emphasis is semantic (focus, error).

---

## 4. Border color — via tokens only

Never use `border-color: slate-200` / `border-color: #e5e7eb` literally. Read `--ax-border-*`.

| Token | Light value | Use |
|---|---|---|
| `--ax-border-subtle`   | zinc-100 | Hover divider, panel split |
| `--ax-border-default`  | zinc-200 | **Default — cards, inputs, tables** |
| `--ax-border-emphasis` | zinc-300 | Hover outline, non-focus emphasis |

---

## 5. Shadow — Untitled UI soft palette

AegisX uses subtle borders as primary separation; shadows only for elevation.

| Token | Use |
|---|---|
| `--ax-shadow-none` | Explicitly remove shadow (override Material default) |
| `--ax-shadow-xs`   | Resting state on neutral surfaces |
| `--ax-shadow-sm`   | **Default card / panel** |
| `--ax-shadow-md`   | Dropdown, popover |
| `--ax-shadow-lg`   | Modal, slide-out |
| `--ax-shadow-xl`   | Toast, command palette (max) |

All shadows use `rgb(16 24 40 / …)` base — never pure black, never colored shadows.

**Dark mode:** the shadows auto-switch to higher opacity (`rgb(0 0 0 / 0.5)`) — no manual override needed.

---

## 6. Elevation (Material 3 mapping)

| Token | Mirrors | Use |
|---|---|---|
| `--ax-elevation-0` | `shadow.none` | Flat — tables, inline sections |
| `--ax-elevation-1` | `shadow.sm`   | Cards, panels (default) |
| `--ax-elevation-2` | `shadow.md`   | Menus, dropdowns |
| `--ax-elevation-3` | `shadow.lg`   | Modals, dialogs |
| `--ax-elevation-4` | `shadow.xl`   | Toasts, max |

`mat-card` is forced to `elevation-1` via `scss/aegisx-material-overrides.scss` — native Material 3D shadows are suppressed.

---

## 7. Focus ring

| Token | Value | Use |
|---|---|---|
| `--ax-focus-ring` | `0 0 0 3px rgb(99 102 241 / 0.18)` | `:focus-visible` on interactive elements |
| `--ax-focus-ring-offset` | 2px | Outline offset when using `outline-style: solid` |

**Rule:** AegisX uses box-shadow ring, not Material's state-layer tint. All buttons/inputs/links use `:focus-visible` (not `:focus`) to avoid ring on mouse click.

---

## 8. Z-index scale

Use named tokens — never raw integers.

| Token | Value | Use |
|---|---|---|
| `--ax-z-base`     | 0    | Default |
| `--ax-z-dropdown` | 100  | Selects, autocomplete menus |
| `--ax-z-sticky`   | 200  | Sticky table headers, sticky page nav |
| `--ax-z-overlay`  | 300  | Drawer backdrop, side panel |
| `--ax-z-modal`    | 400  | Modal / dialog |
| `--ax-z-popover`  | 500  | Popover, tooltip |
| `--ax-z-toast`    | 600  | Toast notifications |
| `--ax-z-debug`    | 9999 | **Dev-only** inspector overlays |

**Rule:** if you need a value between tokens, something else is wrong. Restructure the stacking context.

---

## 9. Container widths

| Token | Max | Use |
|---|---|---|
| `--ax-container-sm`  | 640  | Auth, narrow forms |
| `--ax-container-md`  | 960  | Reading content |
| `--ax-container-lg`  | 1280 | **Dashboards, tables (default)** |
| `--ax-container-xl`  | 1440 | Wide dashboards |
| `--ax-container-2xl` | 1728 | Full-bleed analytics |

Page-level horizontal padding (via `--ax-inset-*`): mobile `md` · tablet `lg` · desktop `xl`.

---

## 10. Breakpoints (mobile-first)

| Token | Min width | Device |
|---|---|---|
| `--ax-breakpoint-xs`  | 0px    | Mobile portrait |
| `--ax-breakpoint-sm`  | 600px  | Mobile landscape / small tablet |
| `--ax-breakpoint-md`  | 960px  | Tablet |
| `--ax-breakpoint-lg`  | 1280px | **Desktop (primary AegisX target)** |
| `--ax-breakpoint-xl`  | 1440px | Large desktop |
| `--ax-breakpoint-2xl` | 1920px | Extra large |

Usage:
```css
@media (min-width: 960px)  { /* tablet+ */ }
@media (min-width: 1280px) { /* desktop+ — use --ax-breakpoint-lg for consistency */ }
```

Or the SCSS mixin:
```scss
@use 'tokens/scss/tokens' as ax;
@include ax.breakpoint-up(md) { … }
```

---

## 11. Touch targets (mobile / tablet)

Minimum **44 × 44 px** hit area for any interactive element.

Most `.ax-button` defaults are 40px — pad surrounding target for mobile if needed.

---

## 12. Page rhythm cheat-sheet

| Element | Padding | Spacing after |
|---|---|---|
| Page header | `--ax-inset-lg --ax-inset-xl` | `--ax-stack-xl` (24) |
| Section | `--ax-inset-xl` | `--ax-stack-2xl` (32) |
| Card | `--ax-spacing-lg --ax-spacing-xl` | `--ax-stack-lg` (16) |
| Card header → body | in-card `--ax-stack-md` (16) | — |
| Form-field group | `gap: var(--ax-spacing-lg)` | — |
| Modal | body `--ax-inset-xl`, footer `--ax-spacing-md --ax-spacing-xl` | — |

---

## 13. Anti-patterns (all break the system)

- ❌ `box-shadow: 0 0 10px black` — colored/black shadows look amateur. Use `--ax-shadow-*`.
- ❌ `z-index: 9999` for a dropdown — that's the debug layer.
- ❌ `border: 3px solid #e5e7eb` — 3px isn't in the scale. Use `--ax-border-width-thick` (2px) + `--ax-border-default`.
- ❌ Inline hex in color, border, shadow — everything goes through `--ax-*` for theme flipping.
- ❌ Tailwind utility classes for semantic color (`bg-slate-50`, `text-zinc-600`) — they don't flip in dark mode.

---

## Version history

- **v2.0 (2026-04-15)** — Rewrite for tokens v0.3: xs/sm/md/lg/xl/2xl/3xl/4xl naming (drop numeric 0..24), radius `xs/sm/md/lg/xl/full` (drop `2xl`), 1px dominant border, Untitled UI shadow palette, focus ring via `--ax-focus-ring`, z-index tokens, breakpoints in DTCG.
- **v1.0 (2026-04)** — Tailwind-class-based with numeric spacing scale.
