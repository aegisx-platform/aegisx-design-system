# AegisX Spacing, Radius, Shadow & Layout — Standard Spec

> Version 1.0 · April 2026

All values are Tailwind-default tokens unless flagged. The point of this spec is to lock the **subset** AegisX uses — designers/devs pick from this list, never invent ad-hoc values.

---

## 1. Spacing scale

8-based step. Every padding / margin / gap MUST snap to one of these.

| Token | px | Tailwind | Use |
|-------|-----|---------|-----|
| `space-0`  | 0   | `0`  | Reset |
| `space-1`  | 4   | `1`  | Tight inline gap (icon ↔ text) |
| `space-2`  | 8   | `2`  | Form field internal padding |
| `space-3`  | 12  | `3`  | Compact list rows |
| `space-4`  | 16  | `4`  | **Default card padding, default gap** |
| `space-5`  | 20  | `5`  | Section internal spacing |
| `space-6`  | 24  | `6`  | Card padding (comfortable), modal body |
| `space-8`  | 32  | `8`  | Section padding |
| `space-10` | 40  | `10` | Page section vertical rhythm |
| `space-12` | 48  | `12` | Page header, large modal padding |
| `space-16` | 64  | `16` | Hero section vertical |
| `space-24` | 96  | `24` | Marketing hero only |

**Don't use:** 5, 7, 9, 11, 13, 14, 15 — fractional steps create visual noise.

---

## 2. Border radius

| Token | px | Tailwind | Use |
|-------|-----|---------|-----|
| `radius-none` | 0   | `rounded-none` | Tables, code blocks |
| `radius-sm`   | 4   | `rounded`      | Buttons, small inputs, badges |
| `radius-md`   | 8   | `rounded-lg`   | **Default — cards, modals, dropdowns** |
| `radius-lg`   | 12  | `rounded-xl`   | Large cards, feature blocks |
| `radius-xl`   | 16  | `rounded-2xl`  | Hero panels |
| `radius-full` | 9999 | `rounded-full` | Avatars, pills, status dots |

---

## 3. Shadow

| Token | Tailwind | CSS | Use |
|-------|---------|-----|-----|
| `shadow-xs` | `shadow-sm` | `0 1px 2px rgba(15,23,42,.04)` | Resting cards, table borders alt |
| `shadow-sm` | `shadow`    | `0 1px 3px rgba(15,23,42,.08), 0 1px 2px rgba(15,23,42,.04)` | Default card |
| `shadow-md` | `shadow-md` | `0 4px 6px -1px rgba(15,23,42,.1), 0 2px 4px -2px rgba(15,23,42,.05)` | Hover state, dropdown |
| `shadow-lg` | `shadow-lg` | `0 10px 15px -3px rgba(15,23,42,.1), 0 4px 6px -4px rgba(15,23,42,.05)` | Modal, popover |
| `shadow-xl` | `shadow-xl` | `0 20px 25px -5px rgba(15,23,42,.1), 0 8px 10px -6px rgba(15,23,42,.04)` | Toast, command palette |
| `shadow-focus` (custom) | — | `0 0 0 3px rgba(99,102,241,.4)` | Keyboard focus ring on inputs |

Use `slate-900` (`#0f172a`) as the shadow base — never pure black, never coloured shadows in product UI.

---

## 4. Border

| Token | Tailwind | Colour | Use |
|-------|---------|--------|-----|
| `border-default` | `border border-slate-200` | `#e2e8f0` | Cards, table dividers |
| `border-strong`  | `border border-slate-300` | `#cbd5e1` | Form inputs (resting) |
| `border-focus`   | `border border-indigo-500` | `#6366f1` | Form inputs (focused) |
| `border-error`   | `border border-red-500`   | `#ef4444` | Form inputs (error) |
| `border-success` | `border border-emerald-500` | `#10b981` | Form inputs (valid) |

---

## 5. Z-index scale

| Token | Value | Use |
|-------|-------|-----|
| `z-base`     | 0     | Default |
| `z-dropdown` | 100   | Selects, autocomplete menus |
| `z-sticky`   | 200   | Sticky table headers, sticky page nav |
| `z-overlay`  | 300   | Drawer backdrop, side panel |
| `z-modal`    | 400   | Modal dialog |
| `z-popover`  | 500   | Popovers, tooltips |
| `z-toast`    | 600   | Toast notifications |
| `z-debug`    | 9999  | Dev-only inspector overlays |

Don't use raw integers. Always use the named token.

---

## 6. Container widths

| Token | Max width | Use |
|-------|-----------|-----|
| `container-sm` | 640 px  | Auth pages, narrow forms |
| `container-md` | 768 px  | Reading content, articles |
| `container-lg` | 1024 px | Standard product pages |
| `container-xl` | 1280 px | Dashboards, tables |
| `container-full` | 100% | Full-bleed panels (with internal `px-6` minimum) |

Page-level horizontal padding: `px-4` mobile, `px-6` tablet, `px-8` desktop.

---

## 7. Touch targets (mobile / tablet)

Minimum **44 × 44 px** hit area for any interactive element. Use `min-h-11 min-w-11` (44 px in Tailwind via custom token, or pad small icons with empty space).

---

## 8. Grid system

12-column grid. Gutters:
- Mobile (< 640): `gap-4` (16 px)
- Tablet (≥ 640): `gap-6` (24 px)
- Desktop (≥ 1024): `gap-8` (32 px)

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">…</div>
```

---

## 9. Page rhythm cheat-sheet

| Element | Padding | Spacing-after |
|---------|---------|---------------|
| Page header | `px-8 py-6` | `mb-8` |
| Section | `px-8 py-6` | `mb-10` |
| Card | `p-6` | `mb-4` between cards |
| Card header → body | inside `p-6`, `mb-4` after header | — |
| Form field group | `space-y-4` | — |
| Modal | `p-6` body, `px-6 py-4` footer | — |

---

## 10. Anti-patterns

- ❌ `padding: 5px` — snap to 4 or 8.
- ❌ `border-radius: 6px` — pick `rounded` (4) or `rounded-lg` (8).
- ❌ `box-shadow: 0 0 10px black` — coloured/black shadows look amateur in clinical UI.
- ❌ `z-index: 9999` for a dropdown — that's the debug layer.
- ❌ Inline `style="margin: 13px"` — bypass the system, design breaks visually.
