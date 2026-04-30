# TODO — `aegisx-design-system`

> Resume here. Last shipped: **v0.5.3** (2026-04-30) — Phase 5 Clinical Specialty (#61–70) + Phase 6 partial (#71 Admission, #72 Doctor's orders), Stepper/paginator/toolbar polish, `--ax-cat-*` clinical category tokens added to DTCG.

This file is the **single source of truth for what to do next**. Update it as items move between sections. Do not let it rot.

---

## 🔵 In progress (pick up next session)

### Phase 6 · IPD Paperless — remaining components (#74–80)
- **74** I/O record · **75** Care plan · **76** Discharge summary · **77** Medication reconciliation
- **78** Patient ID/wristband · **79** Property record · **80** SBAR hand-off
- **Pattern:** `pages/phase6/{NN}-{name}.{css,js}` — follow #71/#72 as reference
- **Wire:** link CSS + sidebar + script in `pages/index.html`

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
