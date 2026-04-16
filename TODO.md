# TODO — `aegisx-design-system`

> Resume here. Last shipped: **v0.3.1** (2026-04-16, SHA `306d022`) — pre-commit hook + CI gate + npm packaging. All 3 GitHub workflows green.

This file is the **single source of truth for what to do next**. Update it as items move between sections. Do not let it rot.

---

## 🔴 Blocked / waiting on user

- **Mirror tokens v0.3 into `aegisx-starter-1/libs/aegisx-ui/foundations/`** — user explicitly said do not touch consumer projects until design-system is finalised. When green-lit, this is the next move. Migration plan parked at `aegisx-starter-1/docs/features/03-planned/design-system-migration/`.

---

## 🟡 Ready to pick up (no blocker)

### Visual dark-mode audit
- **What:** open `/tokens/preview.html`, `/tokens/components.html`, `/tokens/a11y.html` in a real browser (Chromium + Safari + Firefox), toggle theme to **DARK** and **AUTO** on each, scroll through every section, check for:
  - white-on-white text or invisible borders
  - stranded light shadows on dark surfaces
  - chrome (header/nav) that doesn't flip
  - text contrast that fails AA in dark
- **Why deferred:** can't be done headless without bringing in Playwright; tokens repo is intentionally zero-runtime-dep.
- **Likely findings:** chrome in preview/components/a11y still uses Slate hex (`#0f172a`, `#475569`, `#e2e8f0`) instead of Zinc. Cosmetic but worth fixing for consistency.
- **Acceptance:** zero visual bugs OR an issue per bug filed.

### Tokens.css ↔ tokens.generated.css full parity
- **State:** semantic-equal (zero drift on values), but byte-different (canonical has richer comments + intentional ordering). `pnpm tokens:verify` already passes.
- **Decision needed:** keep canonical as hand-curated (current pattern, allows annotation) OR switch fully to generated (pure pipeline, no annotation). Pick one.
- **If switching to generated:** delete `tokens.css`, rename `tokens.generated.css` → `tokens.css`, update build flow to write directly to `tokens.css`.

### Style Dictionary multi-platform export
- **What:** wire `tokens/dtcg/*.json` through Style Dictionary to emit:
  - Tailwind preset (`dist/tailwind-preset.js`)
  - iOS Swift (`dist/AegisXTokens.swift`)
  - Android XML (`dist/colors.xml`, `dist/dimens.xml`)
  - Flutter Dart (`dist/aegisx_tokens.dart`)
- **Why:** consumer apps beyond Angular get the same source of truth.
- **Stub:** mentioned in `docs/FIGMA-SYNC.md` v0.1.

### Tokens Studio ↔ DTCG bidirectional sync
- **State:** `tokens/aegisx-tokens.json` + `-dark.json` rewritten to v0.3 manually. No script generates them from `dtcg/`.
- **Need:** `scripts/build-tokens-studio.mjs` that reads `dtcg/*.json` and emits the Tokens Studio single-file format. Wire into `pnpm tokens:build`.
- **Why:** Figma stays in sync automatically when DTCG source changes.

---

## 🟢 Polish / nice-to-have

- **Refactor `icons/icon-color-map.ts` to drop Tailwind class field entirely** — the v0.3.1 added `getIconStyle()` (preferred) and marked `getIconClasses()` `@deprecated`. In v0.4.x consider removing the Tailwind branch + the `tailwind:` and `bg:` properties from each map entry. **Breaking** for current Tailwind consumers — needs migration note.
- **Add z-index to specs/AEGISX-SPACING.md** — already in tokens.css and the spec mentions it, but worth a dedicated section showing real stacking-context examples.
- **Component tests** — `tokens/components.html` is preview-only. Could add a Playwright snapshot test that ensures component classes render identically across releases.
- **Touch-target audit** — `.ax-button` is 40px default, mobile WCAG wants 44×44. Document the wrapping pattern in spec or bump to 44 by default for `--ax-button-md` and add `--ax-button-sm` at 36 / `--ax-button-xs` at 32.
- **Print stylesheet template** — `tokens/css/print.css` with `@media print` overrides (force light theme, drop shadows, disable webfonts if not embedded).

---

## ⚪ Future / not scheduled

- Update `aegisx-skill` description to reflect that AegisX is its own design system, not Untitled UI clone — drop Untitled-isms (skeuomorphic buttons, 60/72px display) from skill prose.
- Figma variable collection setup — awaits designer running Tokens Studio against `tokens/aegisx-tokens.json`.
- Versioned docs site — currently Pages always shows `main`. Add `/v0.3.1/` archive URL on each release.
- Email signature + letterhead refresh using v0.3 tokens (currently in `email/`, `print/` from v0.1.0 era).
- Storybook? — debatable for a token-only repo; current `preview.html` + `components.html` cover the demo case without bringing in 200MB of dev deps.

---

## 🚫 Explicitly out of scope

- **Domain-specific tokens** (triage, NHSO claim status, ward type, drug interaction, insurance tier, etc.) — these belong in **consumer apps** as `--app-*` aliases of `--ax-*`. See `AEGISX-DESIGN-PRINCIPLES.md § Domain tokens`. Do not add to this repo.
- **Application-layer logic** in component CSS — `.ax-*` classes are visual-only. State management, click handlers, focus trap for dialogs, etc. live in framework code (Angular/React/etc.) at the consumer layer.

---

## How to update this file

When you start an item, move it to a `🟢 In progress` section above 🟡. When you ship it, move it to the relevant `CHANGELOG.md` entry and **delete from this file**. Don't accumulate "done" entries here — that's what changelogs are for.
