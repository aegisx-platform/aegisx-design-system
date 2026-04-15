# AegisX Design Principles

**The "what" and "why" behind every visual decision in AegisX.** This is the north star — not Untitled UI, not Material Design, not any public reference. They are inputs; **AegisX is what we ship.**

---

## Identity in one sentence

> **Calm, high-contrast, Thai-first, clinical-dense — no ornamentation.**

If a design choice doesn't serve one of those five traits, it doesn't belong in AegisX.

---

## The five pillars

### 1. Calm
Hospital operators work long shifts under stress. The UI must reduce cognitive load, not add to it.

- **Color is expensive.** Use color only where meaning changes (status, errors, calls-to-action). A clinical record list should be 95% neutral Zinc.
- **No decoration.** Borders do more work than shadows; shadows do more work than gradients; gradients almost never earn their spot.
- **Motion is functional.** Transitions acknowledge state changes; they do not entertain.

### 2. High-contrast
Every pairing passes **WCAG 2.1 AA** at minimum, AAA preferred for body text. The built-in `/tokens/a11y/` audit must show zero fails before any palette change ships.

- Body text uses `--ax-text-default` (zinc-700) on white — 10.4:1 contrast (AAA).
- Status text uses `--ax-{role}-emphasis` on `--ax-{role}-faint` — AA verified.
- Never pair 400-step text on 100-step background. Never.

### 3. Thai-first
Thai language is the primary audience. Every typographic decision serves Thai legibility first, English second.

- Font: **IBM Plex Sans Thai** leads the stack — NOT Inter, NOT Geist.
- Line height: normal **1.5** minimum because Thai vowel marks and tone marks stack above the baseline.
- Avoid tight tracking on Thai text — `--ax-tracking-tight` is for English display sizes only.
- Never use all-caps for Thai. `text-transform: uppercase` is latin-safe only.

### 4. Clinical-dense
Doctors read 120 patient rows, not 12. Nurses scan 40 medications per round. Density is a feature, not a constraint.

- Body base: **14px** (`--ax-text-sm`), not 16.
- Component density: Material `-1` scale. Row height 40px, not 48.
- Max display size: **48px** (`--ax-display-lg`). Untitled UI's 60 / 72 px sizes are **intentionally omitted** — a hospital dashboard that needs 72px type is communicating hierarchy wrong.
- Spacing grid: 4px, but prefer 8/12/16 for composition. 24+ only for section separation.

### 5. No ornamentation
Every pixel must earn its seat. If a reader can't tell you what information a visual element adds, delete it.

- Buttons: flat. No inner glow, no skeuomorphic ring. A border and a color is enough.
- Cards: subtle border **or** soft shadow — never both as competing emphasis.
- Icons: single stroke, `stroke-width: 1.5`, round caps. No filled-color icons except diamond app icons (which carry brand identity, not UI function).
- Loading states: spinner or progress bar, not skeletons with shimmer (shimmer = ornament).

---

## What AegisX is NOT

- **Not Untitled UI.** We borrow its 3-layer token architecture and its Zinc/Indigo choice because they're sound; we reject its skeuomorphic buttons, 72px display, and 16px body base because clinical UI needs a different shape.
- **Not Material 3 out of the box.** We run Material v3 as the component substrate, but we override its heavy shadows, ripples, and display scale because they are built for consumer apps, not hospitals.
- **Not a "vibrant SaaS" aesthetic.** No purple gradients, no brand-colored hero sections, no emoji mascots. AegisX is a tool, not a toy.
- **Not a generic B2B template.** Clinical density, Thai-first typography, and WCAG AA minimums are non-negotiable constraints that exclude design choices other B2B systems make freely.

---

## Token architecture (three-layer, strict)

```
PRIMITIVE    --ax-color-{zinc|indigo|green|amber|red|blue}-{50..950}
                         --ax-spacing-{xs..4xl}  --ax-radius-{none..full}  ...
    ↓
SEMANTIC     --ax-background-{page|default|subtle|muted|emphasis}
             --ax-text-{disabled|subtle|secondary|default|strong|heading|inverted}
             --ax-border-{subtle|default|emphasis}
             --ax-primary, --ax-{brand|success|warning|error|info}-*
    ↓
COMPONENT    --ax-nav-*, --ax-button-*, --ax-input-*, --ax-table-*
```

**Rule:** UI code reads layer 2 or 3 only. Never layer 1. Ever.

**Rule:** Design system defines primitive + semantic + generic component tokens. Nothing else.

---

## Domain tokens — NOT in this repo

When a product needs domain-specific meaning (triage level, NHSO claim status, drug interaction severity, ward type, insurance tier, …), **define those tokens in the consumer app, not here.**

### Why

1. AegisX serves many products (Clinical, Inventory, Finance, Back Office, Quality, Platform). Each has its own domain vocabulary.
2. Adding `--ax-triage-red` to the foundation is a slippery slope — next is `--ax-nhso-rejected`, then `--ax-ward-icu`, then 1000 tokens no one can audit.
3. Domain mapping is product policy, not design primitive. A product may switch from START triage to ESI 5-level; the design system must not care.

### Pattern

Each consumer app owns a `styles/domain-tokens.css`:

```css
/* aegisx-starter-1/src/styles/domain-tokens.css */
:root {
  /* Triage — START protocol */
  --app-triage-immediate: var(--ax-error-default);
  --app-triage-delayed:   var(--ax-warning-default);
  --app-triage-minor:     var(--ax-success-default);
  --app-triage-deceased:  var(--ax-text-heading);

  /* NHSO claim status */
  --app-nhso-draft:     var(--ax-text-secondary);
  --app-nhso-pending:   var(--ax-warning-emphasis);
  --app-nhso-approved:  var(--ax-success-emphasis);
  --app-nhso-rejected:  var(--ax-error-emphasis);

  /* Drug interaction severity */
  --app-rx-major:       var(--ax-error-default);
  --app-rx-moderate:    var(--ax-warning-default);
  --app-rx-minor:       var(--ax-info-default);

  /* Ward type */
  --app-ward-icu:       var(--ax-error-subtle);
  --app-ward-or:        var(--ax-info-subtle);
  --app-ward-opd:       var(--ax-background-subtle);
  --app-ward-isolation: var(--ax-warning-subtle);
}
```

**Rule:** All `--app-*` variables alias a `var(--ax-*)` — never a raw hex. This keeps theme-switching intact and means a design-system palette change flows through automatically.

**Rule:** When the protocol changes (e.g., START → ESI), the product updates its `domain-tokens.css`. The design system does not.

---

## Contribution rules

1. **Before adding a token**, ask: could this be a consumer `--app-*` alias instead? If yes, reject.
2. **Before adding a visual effect**, ask: does it communicate information, or decorate? If decorate, reject.
3. **Before expanding a scale**, ask: what would the 4th size do that the existing 3 cannot? If no clear answer, reject.
4. **Before copying from Untitled UI / Material / Tailwind**, ask: does their assumption (consumer app, 16px base, latin-only) apply to a Thai hospital? If no, adapt or reject.
5. **Every palette change** runs through `/tokens/a11y/`. Zero new fails allowed.
6. **Every typography change** is tested on a Thai string longer than the English translation (Thai often runs 1.4× wider).

---

## When in doubt

Pick the calmer, smaller, higher-contrast, Thai-first, less-decorated option. That is AegisX.
