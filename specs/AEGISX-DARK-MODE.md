# AegisX Dark Mode — Standard Spec

> **Version 2.0** · v0.3 tokens · Aligned to `AEGISX-DESIGN-PRINCIPLES.md` and `tokens/AEGISX-TOKENS-SPEC.md`

How AegisX flips light ↔ dark, which tokens change, which don't, and the rules that keep contrast intact.

---

## 1. When to use dark mode

| Context | Mode |
|---|---|
| Daytime hospital workstations | **Light** (default) |
| Operating room dashboards (low ambient light) | **Dark** |
| ICU / radiology night-shift terminals | **Dark** |
| Mobile apps with system theme respect | **Auto** (`prefers-color-scheme`) |
| Public kiosks / queue displays | **Light** (legibility from distance) |
| Print / PDF | **Light** (always — saves toner) |

Default to light. Dark is opt-in per workstation or system preference.

---

## 2. How the theme flips

There is **one** toggle point — the `data-theme` attribute on `<html>`:

```html
<html data-theme="light">  <!-- default -->
<html data-theme="dark">   <!-- explicit dark -->
<html>                     <!-- follows prefers-color-scheme (auto) -->
```

```ts
// theme.service.ts
type Mode = 'light' | 'dark' | 'auto';
function setTheme(mode: Mode) {
  if (mode === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', mode);
}
```

Both `--ax-*` (AegisX) and `--mat-sys-*` (Angular Material, via bridge) flip automatically — all products inherit.

**No `dark:` Tailwind classes.** Tailwind utilities don't flip; use `--ax-*` CSS custom properties instead.

---

## 3. What changes in dark mode

Only **semantic aliases** (layer 2 and 3) flip. The **primitive palette** (`--ax-color-*`) stays the same.

### Background — surface hierarchy inverts

| Token | Light | Dark |
|---|---|---|
| `--ax-background-page`     | zinc-50 `#fafafa`  | zinc-950 `#09090b` |
| `--ax-background-default`  | white              | zinc-900 `#18181b` |
| `--ax-background-subtle`   | zinc-100 `#f4f4f5` | zinc-800 `#27272a` |
| `--ax-background-muted`    | zinc-50  `#fafafa` | zinc-700 `#3f3f46` |
| `--ax-background-emphasis` | zinc-700 `#3f3f46` | zinc-600 `#52525b` |

### Text — contrast inverts

| Token | Light | Dark |
|---|---|---|
| `--ax-text-heading`   | zinc-950 | zinc-50 |
| `--ax-text-strong`    | zinc-900 | zinc-100 |
| `--ax-text-default`   | zinc-700 | `#e5e5e5` |
| `--ax-text-secondary` | zinc-500 | zinc-400 |
| `--ax-text-subtle`    | zinc-400 | zinc-500 |
| `--ax-text-disabled`  | zinc-300 | zinc-600 |
| `--ax-text-inverted`  | white    | zinc-950 |

### Border — slightly lifted in dark

| Token | Light | Dark |
|---|---|---|
| `--ax-border-subtle`   | zinc-100 | zinc-800 |
| `--ax-border-default`  | zinc-200 | zinc-700 |
| `--ax-border-emphasis` | zinc-300 | zinc-600 |

### Primary & role palettes — softer in dark

In dark mode the **400 step** becomes the default for brand/status roles — easier on the eyes, better contrast on dark surfaces.

| Token | Light default | Dark default |
|---|---|---|
| `--ax-primary`        | indigo-500 | indigo-400 |
| `--ax-brand-default`  | indigo-500 | indigo-400 |
| `--ax-success-default`| green-500  | green-400  |
| `--ax-warning-default`| amber-500  | amber-400  |
| `--ax-error-default`  | red-500    | red-400    |
| `--ax-info-default`   | blue-500   | blue-400   |

`faint` also flips from the light 50 step to the dark 900 step — so alerts keep their subtle background on both themes.

### Shadow — stronger opacity in dark

Dark mode shadows use `rgb(0 0 0 / 0.5)` instead of `rgb(16 24 40 / 0.1)`. Without this bump, elevation reads as flat on dark backgrounds. The flip is automatic via `tokens.css`.

---

## 4. What does NOT change in dark mode

- **Primitive palette** (`--ax-color-zinc-*`, `--ax-color-indigo-*`, …) — all hex values stay the same. Only semantic aliases pick different steps.
- **Typography scale** — sizes, line heights, weights are mode-invariant.
- **Spacing, radius, border-width** — identical.
- **Motion durations / easings** — identical.
- **Breakpoints, z-index** — identical.

---

## 5. Don'ts

- ❌ **Don't hardcode dark colors.** Use `var(--ax-background-default)`, not `#18181b`. Design-system may retune zinc steps.
- ❌ **Don't use Tailwind `dark:*` utilities** for semantic color. They don't follow `--ax-*`. Use `var(--ax-*)` directly.
- ❌ **Don't pure-black background** (`#000`) — makes shadows invisible and creates harsh contrast. Use `--ax-background-page` (zinc-950 `#09090b`).
- ❌ **Don't pure-white text** (`#fff`) on dark — too harsh. `--ax-text-heading` uses zinc-50 (`#fafafa`).
- ❌ **Don't auto-invert images, photos, screenshots** — they look broken. Use `img { filter: none; }` explicitly if a parent has `filter: invert`.
- ❌ **Don't keep light shadows on dark surfaces.** Our `--ax-shadow-*` flip automatically; don't override with hand-coded `rgba`.
- ❌ **Don't make brand / semantic roles less saturated in dark.** They need to stay legible — we use step 400, not step 300.

---

## 6. Verification checklist

Before any palette or surface change ships:

- [ ] Open `/tokens/a11y.html` and toggle to **dark** — every text × background pair is PASS (AA ≥ 4.5).
- [ ] Open `/tokens/components.html` and toggle dark — card borders visible, focus ring visible, alert contrast AA.
- [ ] Open a real product page (if available) — no "white flash" on theme flip, no stranded light shadows, no stuck images.

---

## 7. Auto mode caveats

`data-theme="auto"` (or `data-theme` unset) follows `prefers-color-scheme: dark`. Under `:root:not([data-theme="light"])`, the media query activates dark overrides.

This means **`data-theme="light"` is a distinct value from unset** — light is explicit opt-in, not default. Set `data-theme="light"` to force light regardless of OS preference.

---

## Version history

- **v2.0 (2026-04-15)** — Rewrite for tokens v0.3: Zinc palette (not Slate/Navy), `--ax-background-*` / `--ax-text-*` tokens (not Tailwind `dark:` utilities), `data-theme` attribute (not `.dark` class), softer 400-step role colors in dark.
- **v1.0 (2026-04)** — Tailwind `dark:` class system with Slate/Navy palette.
