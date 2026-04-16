# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state — read first when resuming

- **Last shipped:** `@aegisx-platform/design-system@v0.3.1` published 2026-04-16, SHA `306d022`. All 3 GitHub workflows green (CI / Pages / Publish to GitHub Packages).
- **What changed since v0.1.0:** v0.2 added `tokens/` directory; v0.3 BREAKING-realigned tokens to the `aegisx-ui-design` skill (Tailwind Zinc + Indigo, IBM Plex Sans Thai, 14px clinical body base, Untitled UI type scale, 3-layer architecture, Angular Material v3 bridge, runtime WCAG audit page, AEGISX-DESIGN-PRINCIPLES.md as rule 0); v0.3.1 added pre-commit hook + CI gate + npm packaging for tokens.
- **`pnpm tokens:verify` reports zero drift** across 255 `--ax-*` tokens vs the DTCG source.
- **What to do next:** read `TODO.md` at repo root — it's the prioritised work list. Update it as items move; do not let it rot.
- **Critical hands-off:** user explicitly said do **NOT** touch `aegisx-starter-1` or `aegisx-ui` library until design-system is fully finalised here. Migration to consumer-side is parked.

## Repository Purpose

This is a **design asset / design-system repo** for the AegisX Hospital Platform. It contains no build system, no `package.json`, and no application code — only source SVG assets, brand tokens, Angular integration snippets meant to be copied into consumer apps, and authoritative specs that downstream apps must conform to.

Consumers (e.g. `aegisx-starter-1`) copy:
- SVGs from `icons/svg/` into their own `src/assets/icons/...`
- `icons/aegisx-icon-registry.ts`, `icons/icon-color-map.ts`, `icons/diamond-color-map.ts`, `icons/ax-diamond-icon.component.ts` into `libs/shared/ui/icons/src/lib/`
- `brand/aegisx-brand-bg.scss` / `.svg` into their own asset pipeline

Nothing is published as an npm package. Edits here do not auto-propagate — changes must be synced manually into consumer repos.

## Directory Layout (top-level)

- `tokens/` — **Authoritative design tokens.** W3C DTCG JSON (`dtcg/`) + compiled `css/tokens.css` + `scss/_tokens.scss`. Spec in `AEGISX-TOKENS-SPEC.md`. Upstream of `aegisx-starter-1/libs/aegisx-ui/src/lib/foundations/*` — edits there must come from here.
- `icons/` — SVG icon set (`svg/` mono, `svg-sprite/`, `featured-error/`), Angular registry/service source, colour maps, and icon authoring docs (`README.md`, `SKILL.md`, `ICON-SIZING-STANDARD.md`, `AEGISX-ICON-SYSTEM-SUMMARY.md`).
- `logo/` — Production logo lockups (horizontal/vertical/icon, light/dark/mono variants) + `AEGISX-LOGO-STANDARD.md` (the spec everything else must match).
- `brand/` — Brand background pattern (`aegisx-brand-bg.svg`, `.scss`) + `AEGISX-BRAND-BG-SPEC.md`.
- `specs/` — Canonical, cross-cutting specs: `AEGISX-BRAND-GUIDE.md`, `AEGISX-ICON-CATALOG.md`, `AEGISX-ICON-SYSTEM-SUMMARY.md`, plus the printable PDF guide.

## Architectural Rules (the "big picture")

0. **Design principles are the north star.** `AEGISX-DESIGN-PRINCIPLES.md` at repo root defines the five pillars (Calm · High-contrast · Thai-first · Clinical-dense · No ornamentation) and the rule that domain-specific tokens (triage, NHSO status, ward type, drug interaction) live in consumer apps as `--app-*` aliases, NOT in this repo. Read it before any token/spec change.

1. **Specs are authoritative.** Before adding or modifying an icon, logo, brand asset, or token, read the corresponding spec in `specs/`, `tokens/AEGISX-TOKENS-SPEC.md`, or the per-folder standard doc. `specs/AEGISX-ICON-CATALOG.md` is the master list of every approved app icon across the platform (Clinical, Inventory, Finance, Back Office, Quality, Platform). Do not invent new icon IDs without updating this catalog.

2. **Two icon systems coexist — keep them separate.**
   - **Mono/stroke icons** (`icons/svg/*.svg`): 24×24 viewBox, `stroke="currentColor"`, stroke-width 1.5, `fill="none"`, round line caps. Registered via `aegisx-icon-registry.ts` and used with `<mat-icon svgIcon="…">`. Colour comes from the parent (Tailwind class on a wrapper).
   - **Diamond app icons** (per `specs/AEGISX-ICON-CATALOG.md`): 42×42 (dark nav) / 48×48 (light app), diamond background rotated 45°, fixed bg/stroke hex per category. Rendered via `ax-diamond-icon.component.ts` + `diamond-color-map.ts`. Never mix their colour models.

3. **Semantic colour mapping lives in code, not ad hoc.** When assigning colour to an icon usage, use `icon-color-map.ts` / `diamond-color-map.ts` helpers (e.g. `getIconClasses('drug-master')`) instead of hand-picking Tailwind classes. New icons must be added to these maps with the correct category (status, clinical, inventory, etc.).

4. **Logo usage must match `AEGISX-LOGO-STANDARD.md`.** The logo has fixed anatomy (diamond 3-layer stack, EKG pulse, peak dot + halo). Pick the variant file in `logo/` — do not redraw, recolour, or reconstruct it.

5. **Brand background is a single source.** The login/splash/PDF cover pattern is defined once in `brand/` per `AEGISX-BRAND-BG-SPEC.md` (navy #0f172a base + diamond ripple + ambient glow + EKG). Consumers import the SCSS/SVG; they do not reimplement the pattern.

## Working in This Repo

- No `install` / `build` / `test` / `lint` commands exist. Do not try to run them.
- To preview an SVG, open it in a browser or editor; there is no dev server.
- When adding a new icon: place the SVG in `icons/svg/`, register its name in `aegisx-icon-registry.ts`, add its colour entry to `icon-color-map.ts` (or `diamond-color-map.ts` for diamond icons), and add a row to `specs/AEGISX-ICON-CATALOG.md` and `icons/README.md`. All four must stay in sync.
- When editing a spec Markdown file, treat the change as a breaking-ish design decision — the spec is what consumer apps review against.
