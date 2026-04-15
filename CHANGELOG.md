# Changelog

All notable changes to `@aegisx-platform/design-system` are documented in this file.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] — 2026-04-15

### Added
- "Logo in Context" mockups page (`site-src/mockups.html`) — login, dashboard shell, marketing hero, mobile splash/home, transactional email. Build wires it into the preview site via `site-src/` copy step.
- Typography spec (`specs/AEGISX-TYPOGRAPHY.md`)
- Spacing / radius / shadow scale spec (`specs/AEGISX-SPACING.md`)
- Dark-mode spec (`specs/AEGISX-DARK-MODE.md`) + dark token overrides (`tokens/aegisx-tokens-dark.json`)
- Style Dictionary token export (`tokens/aegisx-tokens.json`)
- Tokens Studio multi-set wiring (`tokens/$themes.json`, `tokens/$metadata.json`)
- Figma sync workflow guide (`docs/FIGMA-SYNC.md`)
- WCAG AA contrast checker (`scripts/check-contrast.mjs` + `pnpm run check:contrast`)
- Email signature HTML template (`email/aegisx-signature.html`)
- Print letterhead template (`print/letterhead.html`)
- `CONTRIBUTING.md` and `LICENSE`
- `getIconClasses(icon, size, mode)` accepts `'light' | 'dark'` mode parameter

## [0.1.0] — 2026-04-15

### Added
- Initial release.
- 153 mono icons (`icons/svg/*.svg`) + 10 featured-error icons + 1 sprite.
- 8 logo lockups (horizontal / vertical / icon × light / dark / mono / mono-inverse).
- Logo PNG exports `@1x/@2x/@3x` + favicon set (16/32/48/180/192/512 + ICO).
- Brand background pattern (`brand/aegisx-brand-bg.svg` + `.scss`).
- Authoritative specs: `AEGISX-BRAND-GUIDE.md`, `AEGISX-ICON-CATALOG.md`, `AEGISX-LOGO-STANDARD.md`, `AEGISX-BRAND-BG-SPEC.md`.
- Angular `AegisxIconRegistry` service + `<ax-diamond-icon>` component.
- 104-entry `ICON_COLOR_MAP` covering 13 categories.
- Generated TS string-literal data for inline `MatIconRegistry` registration (`icons/data/`).
- npm package `@aegisx-platform/design-system` published to GitHub Packages.
- GitHub Actions CI (build + icon integrity check + SVGO drift).
- GitHub Pages preview site at https://aegisx-platform.github.io/aegisx-design-system/.
- Migration guide for `@aegisx/ui` (`docs/MIGRATING-AEGISX-UI.md`).

[Unreleased]: https://github.com/aegisx-platform/aegisx-design-system/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/aegisx-platform/aegisx-design-system/releases/tag/v0.1.0
