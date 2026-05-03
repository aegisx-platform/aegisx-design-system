# TODO — `aegisx-design-system`

> Resume here. Last shipped: **v0.5.4** (2026-05-02) — Token violations fixed (CRITICAL+HIGH across phase7-10), `113-high-contrast` fully tokenized, Tweaks button added to `index.html` topbar.
>
> **Unreleased (working):** Hospital App showcase **complete coverage** — all **58/58 phase builders** (phases 5-10) reachable from showcase UI via `pages/showcase/phase-loader.js` + `renderPhaseDemo`. Per `pages/SHOWCASE-PHASE-COMPLETION-SPEC.md`: 6 clinical routes (PatientDetail · OPD · IPD · ER · Billing · Settings) plus 2 new sidebar menus (Quality · A11y Lab). 0 console errors on full playwright sweep.

This file is the **single source of truth for what to do next**. Update it as items move between sections. Do not let it rot.

---

## 🔵 In progress (pick up next session)

_Nothing in progress — showcase phase integration shipped (Step 1-7 of `pages/SHOWCASE-INTEGRATION-PLAN.md`)._

---

## 🔴 Blocked / waiting on user

- **Mirror tokens v0.4 into `aegisx-starter-1/libs/aegisx-ui/foundations/`** — user explicitly said do not touch consumer projects until design-system is finalised. Migration plan parked at `aegisx-starter-1/docs/features/03-planned/design-system-migration/`.

---

## 🟡 Ready to pick up (no blocker)

### Showcase polish (Step 8 follow-ups from `pages/SHOWCASE-INTEGRATION-PLAN.md`)
- **Section header noise inside sub-tabs** — phase builders return `<section>` with `61 Vital signs chart + desc` (docs-mode header). Inside showcase tab content, that header is redundant — only the demo card matters. Options: (a) add a `renderPhaseDemo(name)` variant in `phase-loader.js` that strips `.section__head`, or (b) hide `.section__head` via CSS scoped to `.his-content [id*="-tab-"] .section__head { display:none }`. Visible in `pages/.playwright-cli/showcase-ipd-admission.png:1`.
- **Width / overflow on phase components** — manual browser sweep needed. Some phase docs assume 1280px+ canvas; in showcase content area (max-width 1400px minus sidebar) a few may overflow horizontally. Audit each tab in DEFAULT density first, then COMPACT.
- **Density flip** — confirm phase components honor `data-density` toggle. Builders that hard-coded padding (instead of `var(--ax-spacing-*)`) will not flip. Catch these by toggling density in Settings → Display.

### Visual dark-mode audit (browser, manual)
- **What:** open `pages/tokens.html`, `pages/components.html`, `pages/a11y.html`, `pages/navigation.html` in a real browser, toggle DARK, check for stranded light shadows / white-on-white text / chrome that doesn't flip / contrast failures.

### Playwright snapshot tests
- Add `@playwright/test` (only as dev dep), wire screenshot snapshot tests for all pages in light + dark modes. Showcase smoke script lives at `~/.hermes/hermes-agent/showcase-smoke.mjs` (ad-hoc) — promote into repo as proper test.

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
