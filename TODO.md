# TODO — `aegisx-design-system`

> Resume here. Last shipped: **v0.3.2** (2026-04-16) — tokens realigned to production `_aegisx-tokens.scss`, navigation demo page, pages/ restructure.

This file is the **single source of truth for what to do next**. Update it as items move between sections. Do not let it rot.

---

## 🔵 In progress (pick up next session)

### components.css rewrite — batch 2: data display + feedback
- **What:** Read SCSS source for each component, extract exact values, update `tokens/css/components.css`
- **Components:** alert, badge, toast, avatar, stat, kv, empty, progress, spinner, skeleton, timeline, stepper, banner, drawer, upload, counter
- **Source files:** `_component-tokens.scss` (badge tokens), `_material-overrides.scss` (expansion panel, progress bar, snackbar, tooltip, badge), inline styles in component `.ts` files
- **Batch 1 done:** button, input, card, table, dialog, menu, chip, checkbox, radio (commit `d6ff6dc`)

### components.css rewrite — batch 3: navigation + layout
- **What:** sidenav (already has dark navy from ax-nav-rail), navbar, tabs, breadcrumb, pagination, shell, page-header, accordion, command palette, tab-pills
- **Source files:** `ax-nav-rail.component.ts`, `ax-nav-topbar.component.ts`, `ax-nav-expanded-panel.component.ts`, `navbar.component.scss`, `_material-overrides.scss` (tabs, expansion panel, toolbar)

### Bump to v0.4.0
- **What:** Update package.json version, CHANGELOG.md, PRODUCTION-VALUES-SPEC.md (mark resolved items), TODO.md
- **Breaking changes:** token values changed (brand #3f51b5, spacing md=16px, radius shifted, z-index 1000-scale, dark mode Tremor/Gray, success=Emerald), pages moved to `pages/`, focus ring approach changed

---

## 🔴 Blocked / waiting on user

- **Mirror tokens v0.4 into `aegisx-starter-1/libs/aegisx-ui/foundations/`** — user explicitly said do not touch consumer projects until design-system is finalised. Migration plan parked at `aegisx-starter-1/docs/features/03-planned/design-system-migration/`.

---

## 🟡 Ready to pick up (no blocker)

### Visual dark-mode audit (browser, manual)
- **What:** open `pages/tokens.html`, `pages/components.html`, `pages/a11y.html`, `pages/navigation.html` in a real browser, toggle DARK, check for stranded light shadows / white-on-white text / chrome that doesn't flip / contrast failures.

### Playwright snapshot tests
- Add `@playwright/test` (only as dev dep), wire screenshot snapshot tests for all pages in light + dark modes.

### UX guidelines audit
- Use `references/ux-guidelines.csv` (99 rules) as checklist against component demos in `pages/components.html`. Flag violations.

---

## 🟢 Polish / nice-to-have

- **Touch-target audit** — `.ax-button` is 40px default, mobile WCAG wants 44×44. Document the wrapping pattern or bump default.
- **Print stylesheet template** — `tokens/css/print.css` with `@media print` overrides.
- **Refactor `icons/icon-color-map.ts`** to drop Tailwind class field — `getIconClasses()` is deprecated.
- **Add z-index examples** to specs.
- **Component snapshot tests** via Playwright.

---

## ⚪ Future / not scheduled

- Update `aegisx-skill` description to reflect AegisX's own design system (not Untitled UI clone).
- Figma variable collection setup via Tokens Studio.
- Versioned docs site — `/v0.4.0/` archive URL.
- Email signature + letterhead refresh using v0.4 tokens.
- Storybook? — debatable for token-only repo.

---

## 🚫 Explicitly out of scope

- **Domain-specific tokens** (triage, NHSO, ward type, drug interaction, etc.) — belong in **consumer apps** as `--app-*` aliases.
- **Application-layer logic** in component CSS — `.ax-*` classes are visual-only.

---

## How to update this file

When you start an item, move it to 🔵 In progress. When you ship it, move it to `CHANGELOG.md` and **delete from this file**.
