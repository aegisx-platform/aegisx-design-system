# AegisX Design Tokens

**Source of truth** for all design tokens in the AegisX platform. Extracted from `aegisx-starter-1/libs/aegisx-ui/src/lib/foundations/` and promoted here so every product lines up against a single authoritative set of primitives.

- Authoritative spec → [`AEGISX-TOKENS-SPEC.md`](./AEGISX-TOKENS-SPEC.md)
- Neutral source format → [`dtcg/*.json`](./dtcg/) (W3C Design Tokens CG)
- Compiled consumables → [`css/tokens.css`](./css/tokens.css), [`scss/_tokens.scss`](./scss/_tokens.scss)

## What's covered

| Foundation      | DTCG file              | Notes                                           |
|-----------------|------------------------|-------------------------------------------------|
| Color           | `color.json`           | palette (50–900) + light/dark semantic          |
| Spacing         | `spacing.json`         | 8pt grid + semantic groups                      |
| Typography      | `typography.json`      | Inter + Noto Sans Thai + M3 roles               |
| Radius          | `radius.json`          | `none → full`                                   |
| Border width    | `border-width.json`    | `none | thin | default | thick`                 |
| Shadow          | `shadow.json`          | + M3 elevation 0–5                              |
| Motion          | `motion.json`          | duration + easing (+ M3 variants)               |
| Breakpoints     | `breakpoint.json`      | xs → 2xl + container max-widths                 |

## How to consume

### Option A — plain CSS (recommended for web apps)

Copy `css/tokens.css` into your app (e.g. `src/styles/tokens.css`) and import once:

```scss
// styles.scss
@import './styles/tokens.css';
```

Then use variables everywhere:

```css
.card {
  background: var(--ax-bg-default);
  color: var(--ax-text-primary);
  border: var(--ax-border-width-thin) solid var(--ax-border-default);
  border-radius: var(--ax-radius-md);
  padding: var(--ax-inset-md);
  box-shadow: var(--ax-elevation-1);
  transition: box-shadow var(--ax-duration-fast) var(--ax-easing-easeOut);
}
```

Dark mode:
```html
<html data-theme="dark">…</html>
```
Or leave `data-theme` unset / `"auto"` to follow system preference. `prefers-reduced-motion: reduce` is already honored.

### Option B — SCSS maps (compile-time logic)

```scss
@use 'aegisx-design-system/tokens/scss/tokens' as ax;

@include ax.breakpoint-up(md) {
  .grid { gap: map-get(ax.$spacing, lg); }
}
```

### Option C — TypeScript (downstream mirror)

The TS version lives in the consumer app at `libs/aegisx-ui/src/lib/foundations/`. It mirrors these JSON files. **Never edit the TS tokens without updating `dtcg/*.json` first** — this repo is upstream.

## Naming rules

- Reference tokens: `--ax-color-{hue}-{50..900}` — raw palette, avoid in app code.
- Semantic tokens: `--ax-{role}-{variant}` (e.g. `--ax-bg-default`, `--ax-text-heading`, `--ax-brand-emphasis`). **Use these.**
- Scalar tokens: `--ax-{foundation}-{scale}` (e.g. `--ax-spacing-md`, `--ax-radius-lg`, `--ax-elevation-3`).

## Relation to existing files

`aegisx-tokens.json`, `aegisx-tokens-dark.json`, `$metadata.json`, `$themes.json` at the root of this folder are **Tokens Studio (Figma plugin) format** — they sync with the Figma library and pre-date this reorganization. They should stay in sync with the DTCG source here; until a bidirectional build is wired up, treat Figma Tokens Studio as a downstream mirror (design-facing) and DTCG JSON as the upstream (code-facing).

## Changelog gate

Any change to these files must:
1. Bump version in `AEGISX-TOKENS-SPEC.md`
2. Regenerate `css/tokens.css` + `scss/_tokens.scss` alongside the JSON
3. Be mirrored into `aegisx-ui/foundations/*` in a follow-up PR referencing this version
