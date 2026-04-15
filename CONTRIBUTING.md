# Contributing

Thanks for working on the AegisX design system. Read this once before your first PR.

## Ground rules

0. **`AEGISX-DESIGN-PRINCIPLES.md` is rule 0.** Every decision runs through the five pillars (Calm · High-contrast · Thai-first · Clinical-dense · No ornamentation). Read it before any design change. If you disagree with a pillar, open a `principles-change` issue — don't bypass in a token PR.
1. **Specs in `specs/` and `tokens/AEGISX-TOKENS-SPEC.md` are authoritative.** A change that contradicts a spec needs a spec update in the same PR.
2. **No drift between sources.** Adding an icon means updating `icons/svg/`, `icons/aegisx-icon-registry.ts`, `icons/icon-color-map.ts`, and `specs/AEGISX-ICON-CATALOG.md` in one commit. Adding a token means updating `tokens/dtcg/*.json`, regenerating via `pnpm tokens:build`, and updating `tokens/CHANGELOG.md`. CI runs `pnpm run check:icons` / `pnpm tokens:verify` and will surface gaps.
3. **No backward-compat shims.** Bump the version, write the changelog entry, move on.
4. **One concern per PR.** Don't bundle "added 3 icons + retoned the brand colour + added a component token" — split them.

## Adding / changing a design token

Tokens are the foundation of every product UI. Order matters:

```bash
# 1. Edit the DTCG source (this is the authoritative form)
vim tokens/dtcg/{color|spacing|typography|radius|border-width|shadow|motion|breakpoint|z-index}.json

# 2. Regenerate the compiled CSS
pnpm tokens:build        # → tokens/css/tokens.generated.css

# 3. Reconcile the canonical tokens.css with the generated file
#    (the hand-written file remains canonical until parity is locked;
#    treat a diff as either "intentional hand-tuning — leave it" or
#    "drift — port the change over")
pnpm tokens:verify       # diff -u; exits non-zero on drift

# 4. If the token is consumed by Angular Material, update the bridge
vim tokens/scss/aegisx-material-bridge.scss

# 5. Update the Tokens Studio mirror (Figma downstream)
vim tokens/aegisx-tokens.json tokens/aegisx-tokens-dark.json

# 6. Run the a11y audit — the gate before any palette change ships
open tokens/a11y.html     # manual: theme-toggle both light & dark, zero new fails

# 7. Log it
vim tokens/CHANGELOG.md   # token-level log
vim CHANGELOG.md          # package-level if shipping a release
```

**Golden rule — no domain tokens here.** Triage levels, NHSO claim statuses, ward types, drug interaction severities belong in the **consumer app** as `--app-*` aliases (`--app-triage-red: var(--ax-error-default)`). See `AEGISX-DESIGN-PRINCIPLES.md § Domain tokens`.

## Adding an icon

```bash
# 1. Drop the SVG in icons/svg/  (or icons/featured-error/)
#    Rules: 24×24 viewBox · stroke="currentColor" · stroke-width 1.5
#    fill="none" · round line caps. Run pnpm run svgo.

# 2. Register in icons/aegisx-icon-registry.ts (DRUG_INVENTORY_ICONS array)

# 3. Add a colour-map entry in icons/icon-color-map.ts

# 4. Add a row in specs/AEGISX-ICON-CATALOG.md

# 5. Verify
pnpm run check:icons       # should report ✓ All in sync
pnpm run gen:icon-data     # regenerates icons/data/
pnpm run build             # tsc clean
```

## Modifying the logo

You can't. The logo is fixed per `logo/AEGISX-LOGO-STANDARD.md`. To propose a brand evolution, open an issue tagged `brand-evolution` first — code changes don't ship without sign-off from the brand owner.

## Modifying brand colours

Same — change `specs/AEGISX-BRAND-GUIDE.md` first via an issue, then update `tokens/aegisx-tokens.json`, the icon colour maps, and any Tailwind references.

## Local development

```bash
pnpm install             # installs dev deps (Angular peer deps, SVGO, TS)
pnpm run build           # tsc → dist/
pnpm run gen:icon-data   # regenerates icons/data/ from SVGs
pnpm run svgo            # optimize all SVGs
pnpm run check:icons     # icon-svg ↔ registry ↔ colour-map cross-check
pnpm run check:contrast  # WCAG AA contrast audit on colour map
pnpm run site:build      # rebuilds the preview site under site/
pnpm run assets:logo     # regenerates logo/png and logo/favicons
```

## Commit style

- Conventional-ish prefixes are nice but not enforced: `feat:`, `fix:`, `chore:`, `docs:`.
- Subject line ≤ 72 chars, imperative voice ("Add chemo icon", not "added").
- Body explains *why* if the change isn't obvious from the diff.

## Releases

1. Update `CHANGELOG.md` — move `[Unreleased]` items into a new version section.
2. Bump `version` in `package.json`.
3. Commit, tag, and push:
   ```bash
   git commit -am "Release v0.X.Y"
   git tag v0.X.Y
   git push --follow-tags
   ```
4. Create a GitHub Release from the tag — this triggers `.github/workflows/publish.yml` to push to GitHub Packages.

Use semver: patch for SVG cleanups / typo fixes, minor for new icons / new exports, major for any rename or removal that breaks consumer imports.
