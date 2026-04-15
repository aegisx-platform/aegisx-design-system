# AegisX Dark Mode — Standard Spec

> Version 1.0 · April 2026
> Dark surface colours, text contrast pairings, and Tailwind class shifts.

---

## 1. When to use dark mode

| Context | Mode |
|---------|------|
| Daytime hospital workstations | **Light** (default) |
| Operating room dashboards (low ambient light) | **Dark** |
| ICU / radiology night-shift terminals | **Dark** |
| Mobile apps with system theme respect | **Auto** (`prefers-color-scheme`) |
| Public kiosks / queue displays | **Light** (legibility from distance) |
| Print / PDF | **Light** (always — saves toner) |

Default to light. Dark is opt-in per workstation or system theme.

---

## 2. Surface tokens

| Token | Light | Dark |
|-------|-------|------|
| `surface.background` | `#f8fafc` slate-50 | `#0f172a` navy-900 |
| `surface.card` | `#ffffff` white | `#1e293b` navy-800 |
| `surface.muted` | `#f1f5f9` slate-100 | `#334155` slate-700 |
| `surface.border` | `#e2e8f0` slate-200 | `#334155` slate-700 |
| `surface.border-strong` | `#cbd5e1` slate-300 | `#475569` slate-600 |

## 3. Text tokens

| Token | Light | Dark |
|-------|-------|------|
| `text.primary` | `#0f172a` slate-900 | `#f8fafc` slate-50 |
| `text.secondary` | `#475569` slate-600 | `#cbd5e1` slate-300 |
| `text.muted` | `#64748b` slate-500 | `#94a3b8` slate-400 |
| `text.disabled` | `#94a3b8` slate-400 | `#64748b` slate-500 |
| `text.inverse` | `#ffffff` | `#0f172a` |

All pairings pass WCAG AA on their paired background.

## 4. Brand & semantic colours

These do NOT change between modes — they keep their hex values. What changes is the surrounding surface and how Tailwind shades read.

| Role | Light & Dark |
|------|-------|
| Brand indigo | `#6366f1` |
| Success | `#16a34a` (light) → use `text-green-400` on dark |
| Warning | `#d97706` (light) → use `text-amber-400` on dark |
| Danger | `#dc2626` (light) → use `text-red-400` on dark |

---

## 5. Tailwind shade-shift rule

When a component switches to dark mode, every Tailwind colour utility shifts:

| Light shade | Dark shade |
|-------------|-----------|
| `text-{x}-600` | `text-{x}-400` |
| `text-{x}-700` | `text-{x}-300` |
| `text-{x}-800` | `text-{x}-300` |
| `bg-{x}-50`    | `bg-{x}-950/30` (translucent wash) |

The `getIconClasses(name, size, mode)` helper applies this automatically.

```ts
import { getIconClasses } from '@aegisx-platform/design-system/icons/color-map';

const lightCls = getIconClasses('pharmacy', 'md');           // light default
const darkCls  = getIconClasses('pharmacy', 'md', 'dark');   // dark mode
```

---

## 6. Tailwind config

```ts
// tailwind.config.ts
export default {
  darkMode: 'class', // or 'media' to follow OS theme
  theme: {
    extend: {
      colors: {
        // Hook your tokens here so .dark variants resolve correctly
      },
    },
  },
};
```

Toggle dark mode by adding/removing `dark` class on `<html>`:

```ts
document.documentElement.classList.toggle('dark');
```

---

## 7. Don'ts

- ❌ Don't darken brand or semantic colours (red, green, amber) — only swap their Tailwind shade.
- ❌ Don't use light-mode shadows on dark surfaces — they're invisible. Use border accents or the dark shadow tokens in `tokens/aegisx-tokens-dark.json`.
- ❌ Don't pure-black background (`#000`) — it makes shadows invisible and creates harsh contrast. Use `navy-900` (`#0f172a`).
- ❌ Don't pure-white text (`#fff`) on dark — it's too harsh. Use `slate-50` (`#f8fafc`).
- ❌ Don't auto-invert images, photos, or screenshots — they look broken.
