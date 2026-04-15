# Tokens Changelog

Token-only changelog for `aegisx-design-system/tokens/`. Package-level changes live in the root `CHANGELOG.md`.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Token versions move independently of the npm package semver but are pinned inside package releases (design-system v0.3.0 ships tokens v0.3.x).

---

## [0.3.0] — 2026-04-15 · Design discipline

### Added
- **`AEGISX-DESIGN-PRINCIPLES.md`** (repo root) — five pillars (Calm · High-contrast · Thai-first · Clinical-dense · No ornamentation), explicit non-goals, domain-token policy. Rule 0 for any token change.
- **Z-index scale** — `--ax-z-{base|dropdown|sticky|overlay|modal|popover|toast|debug}` tokens.
- **Component tokens (layer 3)** — `--ax-nav-*`, `--ax-button-*`, `--ax-input-*`, `--ax-table-*`, `--ax-focus-ring`.
- **Angular Material v3 bridge** (`tokens/scss/`) — `aegisx-material-theme.scss`, `aegisx-material-bridge.scss`, `aegisx-material-overrides.scss`. Makes native Material components (mat-button, mat-form-field, mat-card, mat-table, …) read `--ax-*` via `--mat-sys-*` aliases.
- **Component CSS library** (`tokens/css/components.css`) — `.ax-button`, `.ax-input`, `.ax-card`, `.ax-alert`, `.ax-badge`, `.ax-chip`, `.ax-dialog`, `.ax-toast`, `.ax-link`, `.ax-table`.
- **Token build pipeline** — `scripts/build-tokens.mjs` compiles `dtcg/*.json` → `tokens.generated.css`. `pnpm tokens:build` / `pnpm tokens:verify` for CI drift gate.
- **Runtime WCAG audit** — `tokens/a11y.html` resolves every text × background / button / alert / border pair via `getComputedStyle` and reports AA/AAA pass/fail.

### Changed — BREAKING (v0.2 → v0.3 realignment)
- **Gray palette** — Tailwind Gray → Tailwind **Zinc** (`#fafafa → #09090b`).
- **Font stack** — Inter + Noto Sans Thai → **IBM Plex Sans Thai** (Thai-first stack, not Inter).
- **Body base** — 16px → **14px** (`text-sm`, clinical density).
- **Type scale** — Material 3 roles (`--ax-body-*`, `--ax-title-*`, `--ax-label-*`, `--ax-display-*-size` at display/headline/title/body/label × L/M/S) → Untitled UI scale:
  - `--ax-text-{xs|sm|md|lg|xl}-size` / `-line`
  - `--ax-display-{xs|sm|md|lg}-size` / `-line` / `-tracking`
- **Semantic token renames:**
  - `--ax-bg-*`         → `--ax-background-*` (page / default / subtle / muted / emphasis)
  - `--ax-text-primary` → `--ax-text-default`
  - new: `--ax-text-strong`
  - new: `--ax-primary`, `--ax-primary-light`, `--ax-primary-dark` (shorthand for brand)
- **Radius** — `md` 10px → **8px**; `lg` 16px → **12px**. Per Untitled UI.
- **Border width** — default is now **1px** (was 2px). 2px reserved for focus/error emphasis.
- **Display scale capped** at `display-lg` (48px). Dropped `display-xl` (60) and `display-2xl` (72).
- **Token Studio JSON** (`tokens/aegisx-tokens.json`, `aegisx-tokens-dark.json`) rewritten for v0.3 — previous v1.x format (brand.navy / surface.background / text.primary) replaced with DTCG-aligned palette + semantic structure.

### Removed
- `--ax-bg-*` aliases (renamed to `--ax-background-*`).
- `--ax-text-primary` (renamed to `--ax-text-default`).
- M3 role tokens (`--ax-body-medium-size`, `--ax-title-large-line`, etc.).
- `--ax-color-gray-*` (replaced by `--ax-color-zinc-*`).
- `--ax-color-{cyan|purple|pink}-*` primitives (kept only the 5 status roles — brand/success/warning/error/info).
- `display-xl` and `display-2xl` typography tokens.

### Migration guide — consumer apps

```diff
- color: var(--ax-text-primary);
+ color: var(--ax-text-default);

- background: var(--ax-bg-default);
+ background: var(--ax-background-default);

- font-size: var(--ax-body-medium-size);
+ font-size: var(--ax-text-sm-size);

- font-size: var(--ax-title-large-size);
+ font-size: var(--ax-text-lg-size);
```

Domain-specific tokens (triage, NHSO claim status, ward type, drug interaction) must now be defined **per-app** as `--app-{domain}: var(--ax-{role})` in `styles/domain-tokens.css` — not in this repo. See `AEGISX-DESIGN-PRINCIPLES.md § Domain tokens`.

---

## [0.2.0] — 2026-04-15 · Initial promotion

### Added
- Promoted tokens from `aegisx-starter-1/libs/aegisx-ui/src/lib/foundations/*` into this repo as the authoritative source.
- DTCG JSON: `tokens/dtcg/{color,spacing,typography,radius,border-width,shadow,motion,breakpoint}.json`.
- Compiled `tokens/css/tokens.css` with `--ax-*` prefix.
- SCSS maps at `tokens/scss/_tokens.scss`.
- Light default via `:root`; dark via `[data-theme="dark"]` + `prefers-color-scheme` fallback.
- `prefers-reduced-motion: reduce` zeros all durations.

Token naming at v0.2 used **Tailwind Gray** palette, **Inter + Noto Sans Thai** font stack, **16px** body base, and **Material 3 role** typography tokens. Token studio JSON (`tokens/aegisx-tokens.json`) predated this release with different naming (brand.navy, surface.*).

---

## [0.1.0] — predecessor

Token shape lived in `aegisx-starter-1/libs/aegisx-ui/src/lib/foundations/` only; no dedicated design-system repo tokens yet.
