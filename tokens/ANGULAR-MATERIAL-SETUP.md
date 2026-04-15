# Angular Material v3 — AegisX Setup Guide

This guide wires AegisX design tokens into an Angular app that uses Angular Material v3. If you skip this, `--ax-*` tokens will render correctly for custom components but **native Material components (`mat-button`, `mat-form-field`, `mat-card`, etc.) will still use the default violet M3 theme**.

> TL;DR — copy four files, add three lines to `styles.scss`, done.

---

## Why this is needed

Angular Material v3 has its own CSS custom-property namespace (`--mat-sys-*`, `--mdc-*`). It does not read `--ax-*` directly. You need a **bridge layer** that aliases Material's tokens to AegisX's so every component flips when the theme changes.

```
┌────────────────────────────┐   bridge    ┌──────────────────────────┐
│ --ax-primary               │ ─────────→  │ --mat-sys-primary        │
│ --ax-text-default          │             │ --mat-sys-on-surface     │
│ --ax-background-subtle     │             │ --mat-sys-surface-container │
└────────────────────────────┘             └──────────────────────────┘
        ↑                                             ↓
   source of truth                         native Material components
```

---

## Prerequisites

- Angular **19+** with Angular Material **v18+** (M3 API)
- `@angular/material` installed
- SCSS enabled in your project

---

## Setup (4 files, in order)

### 1. Copy `tokens.css` into your app's assets

```bash
cp node_modules/@aegisx-platform/design-system/tokens/css/tokens.css \
   src/assets/css/aegisx-tokens.css
```

Or (preferred in dev) import directly from the package in `styles.scss`:

```scss
@import '@aegisx-platform/design-system/tokens/css/tokens.css';
```

### 2. Copy the three SCSS bridge files

```bash
SRC="node_modules/@aegisx-platform/design-system/tokens/scss"
DST="src/styles"
cp $SRC/aegisx-material-theme.scss      $DST/
cp $SRC/aegisx-material-bridge.scss     $DST/
cp $SRC/aegisx-material-overrides.scss  $DST/
```

### 3. Wire them into `styles.scss` — order matters

```scss
// 1. Tokens first — defines all --ax-* custom properties
@import '@aegisx-platform/design-system/tokens/css/tokens.css';

// 2. Material theme — runs Material's M3 machinery (density, typography, component themes)
@use './styles/aegisx-material-theme';

// 3. Bridge — aliases Material's --mat-sys-* onto our --ax-*
@use './styles/aegisx-material-bridge';

// 4. Component overrides — per-component polish that the M3 API cannot express
@use './styles/aegisx-material-overrides';

// 5. Your app styles
@use './styles/app';
```

### 4. Set the body font

```scss
// styles/app.scss (or root)
html, body {
  font-family: var(--ax-font-sans);
  font-size: var(--ax-text-sm-size);       // 14px — clinical density
  line-height: var(--ax-text-sm-line);
  color: var(--ax-text-default);
  background: var(--ax-background-page);
}
```

### 5. Load IBM Plex Sans Thai

In `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Or self-host via `@fontsource/ibm-plex-sans-thai`.

---

## Theme toggle

```typescript
// theme.service.ts
setTheme(mode: 'light' | 'dark' | 'auto') {
  if (mode === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', mode);
  }
}
```

Both `--ax-*` and `--mat-sys-*` tokens flip automatically because the bridge file re-declares the Material tokens under `[data-theme="dark"]`.

---

## Gotchas

### 1. Do not edit `--mat-sys-*` / `--mdc-*` directly in app code
Keep `--ax-*` as the single source of truth. If you need a new semantic, add it to the AegisX tokens first, then bridge it — not the other way around.

### 2. `!important` is sometimes necessary
Material generates styles with high specificity. The overrides file uses `!important` surgically on shadows, shapes, and focus rings. Match that pattern — do not strip them.

### 3. Ripple vs focus ring
Material uses state-layer tint on focus; AegisX uses a box-shadow ring. The overrides file forces `box-shadow: var(--ax-focus-ring)` on `:focus-visible` for Material buttons. If you add custom buttons, use `:focus-visible` not `:focus` to avoid the ring on mouse click.

### 4. Density
We run at `density: -1` (clinical). Components are 4px shorter than Material default. If you need a taller component in a specific area, wrap it with `[style="--mdc-...-container-height: 48px"]` — do not change global density.

### 5. Icon size
Material icons default to 24px. AegisX prefers 20px for inline icons. Override per-instance:
```html
<mat-icon [style.font-size.px]="20" [style.width.px]="20" [style.height.px]="20">check</mat-icon>
```
Or add a utility class in `overrides.scss`.

### 6. Typography scale mismatch
M3 default sizes do not match Untitled UI. The bridge rewrites `--mat-sys-body-*`, `--mat-sys-title-*`, etc. to use `--ax-text-*` and `--ax-display-*`. If a Material component uses a size that looks wrong, check the bridge first — a missing mapping is usually the cause.

### 7. Dark mode is opt-in per app
The bridge declares `[data-theme="dark"]` overrides for both `--ax-*` and `--mat-sys-*`. If your app uses a different selector (e.g. `.dark`), duplicate the block with your selector.

---

## Verification

After setup, these should all be true:

- [ ] `mat-card` has subtle gray-200 border + `shadow-sm`, not a heavy Material shadow
- [ ] `mat-button color="primary"` is indigo `#6366f1`, not M3 violet
- [ ] `mat-form-field` outline is zinc-200 at rest, indigo-500 on focus, with 3px indigo@18% ring
- [ ] `mat-table` header bg is zinc-50, 11px uppercase labels with letter-spacing
- [ ] Body text is IBM Plex Sans Thai at 14px
- [ ] `[data-theme="dark"]` flips the entire UI — both `mat-*` and custom `.ax-*` components
- [ ] `prefers-reduced-motion: reduce` disables all `--ax-duration-*` transitions

---

## Reference files

| Purpose                           | File                                                                 |
|-----------------------------------|----------------------------------------------------------------------|
| Token source of truth             | `tokens/dtcg/*.json`                                                 |
| Compiled CSS custom properties    | `tokens/css/tokens.css`                                              |
| Component CSS classes             | `tokens/css/components.css`                                          |
| Material M3 theme definition      | `tokens/scss/aegisx-material-theme.scss`                             |
| Token bridge                      | `tokens/scss/aegisx-material-bridge.scss`                            |
| Component overrides (minimal)     | `tokens/scss/aegisx-material-overrides.scss`                         |
| Component overrides (full, 988-line) | `aegisx-skill/skills/aegisx-ui-design/references/aegisx-material-overrides.scss` |

The 988-line version in the skill repo covers every Material component exhaustively. Pull it in if the minimal one in this repo doesn't cover a component you need — they are compatible (same token contract).

---

## Questions

- **"Can I skip the bridge and just use `--ax-*` everywhere?"** Only for components you build yourself with custom CSS. `mat-button`, `mat-form-field`, etc. read `--mat-sys-*` / `--mdc-*` internally — the bridge is how you make them match.
- **"Why not just override `mat-button` with `::ng-deep`?"** Specificity war, per-component duplication, fragile. The system-token approach flows through every Material component once and keeps dark-mode in sync.
- **"What about Tailwind?"** Compatible. Add `theme.extend.colors` that reference `var(--ax-*)` so `bg-brand-default` etc. work. But prefer `var(--ax-*)` in styles — it flips with theme, Tailwind classes don't.
