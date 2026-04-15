# AegisX Design Tokens

**Source of truth** for every design primitive in the AegisX platform. Aligned to the `aegisx-ui-design` skill (Untitled UI reference + Angular Material v3 targets).

- Spec → [`AEGISX-TOKENS-SPEC.md`](./AEGISX-TOKENS-SPEC.md)
- Angular Material setup → [`ANGULAR-MATERIAL-SETUP.md`](./ANGULAR-MATERIAL-SETUP.md)
- Source format → [`dtcg/*.json`](./dtcg/) (W3C Design Tokens CG)
- Compiled CSS → [`css/tokens.css`](./css/tokens.css)
- Component classes → [`css/components.css`](./css/components.css)
- SCSS bridges → [`scss/aegisx-material-theme.scss`](./scss/aegisx-material-theme.scss), [`aegisx-material-bridge.scss`](./scss/aegisx-material-bridge.scss), [`aegisx-material-overrides.scss`](./scss/aegisx-material-overrides.scss)

## Design language at a glance

- Gray scale: **Tailwind Zinc** (`#fafafa → #09090b`)
- Brand: **Tailwind Indigo** (`#6366f1` primary / `#4338ca` dark)
- Status: green · amber · red · blue
- Font: **IBM Plex Sans Thai** (Thai-first, NOT Inter)
- Body base: **14px** (clinical density)
- Elevation: subtle border + shadow-sm; heavy Material shadows suppressed
- Radius: sm=6 buttons · md=8 cards · lg=12 modals

## Three-layer tokens

1. **Primitive** — `--ax-color-{zinc|indigo|green|amber|red|blue}-{50..950}` (raw palette)
2. **Semantic** — `--ax-background-*`, `--ax-text-*`, `--ax-border-*`, `--ax-primary`, `--ax-{role}-*` (theme-aware aliases)
3. **Component** — `--ax-nav-*`, `--ax-button-*`, `--ax-input-*`, `--ax-table-*` (scoped)

UI code uses layer 2 or 3. Layer 1 is never referenced directly.

## Quick start (plain CSS)

```scss
@import '@aegisx-platform/design-system/tokens/css/tokens.css';

.card {
  background: var(--ax-background-default);
  color: var(--ax-text-default);
  border: var(--ax-border-width-thin) solid var(--ax-border-default);
  border-radius: var(--ax-radius-lg);          /* 12px per Untitled UI */
  padding: var(--ax-spacing-lg) var(--ax-spacing-xl);
  box-shadow: var(--ax-elevation-1);
  transition: box-shadow var(--ax-duration-fast) var(--ax-easing-easeOut);
}
```

Dark mode:
```html
<html data-theme="dark">…</html>
```
Or leave `data-theme` unset to follow `prefers-color-scheme`. `prefers-reduced-motion: reduce` is honored automatically.

## Quick start (Angular Material v3)

See [`ANGULAR-MATERIAL-SETUP.md`](./ANGULAR-MATERIAL-SETUP.md). Four imports in `styles.scss`:

```scss
@import '@aegisx-platform/design-system/tokens/css/tokens.css';
@use   'tokens/scss/aegisx-material-theme';
@use   'tokens/scss/aegisx-material-bridge';
@use   'tokens/scss/aegisx-material-overrides';
```

## Breaking changes from v0.1 → v0.2

| v0.1 | v0.2 | Reason |
|---|---|---|
| Gray (Tailwind gray) | **Zinc** | Skill spec |
| Inter font | **IBM Plex Sans Thai** | Thai-first, skill spec |
| 16px body base | **14px** | Clinical density |
| Material 3 role tokens (`--ax-body-medium-size`) | **Untitled UI scale** (`--ax-text-sm-size`, `--ax-display-md-size`) | Skill spec |
| `--ax-bg-*` | `--ax-background-*` | Skill naming |
| `--ax-text-primary` | `--ax-text-default` | Skill naming |
| 2-layer tokens | **3-layer** (+ component layer) | Skill architecture |
| `--ax-radius-md`=10px | 8px | Untitled UI |

Consumer apps (`aegisx-ui` lib, `aegisx-starter-1`) must rename referenced tokens to match v0.2 before upgrading.

## Relation to other files

- `aegisx-tokens.json` / `aegisx-tokens-dark.json` (Tokens Studio Figma format) at this folder root are **design-side mirrors**. Bidirectional sync not yet wired up — DTCG JSON here is upstream; Figma is downstream.
- `aegisx-ui/foundations/*` (TypeScript) is **code-side mirror** — must be regenerated from DTCG source when tokens change.
- `aegisx-skill/skills/aegisx-ui-design/references/aegisx-material-overrides.scss` is a **988-line exhaustive override file** covering every Material component. Our `scss/aegisx-material-overrides.scss` is the minimal subset; pull the skill version in for per-component parity.
