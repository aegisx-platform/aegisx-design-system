# AegisX Typography — Standard Spec

> **Version 2.0** · v0.3 tokens · Aligned to `AEGISX-DESIGN-PRINCIPLES.md` and `tokens/AEGISX-TOKENS-SPEC.md`

The canonical typography system for AegisX — web, PDF, mobile. This spec is consumed by products, not dictated by them: every AegisX product reads through `--ax-*` tokens.

---

## 1. Font stack

**Thai-first.** IBM Plex Sans Thai is the primary family — not Inter.

| Role | Token | Fallback |
|---|---|---|
| **UI / Body** | `--ax-font-sans` | `"IBM Plex Sans Thai", "IBM Plex Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |
| **Code / Mono** | `--ax-font-mono` | `"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace` |
| **Serif (rare — editorial/print only)** | `--ax-font-serif` | `Georgia, Cambria, Times, serif` |

**Rules**
- IBM Plex Sans Thai covers Thai **and** latin — no separate Thai stack needed.
- Never use `Inter` in app code. The migration from v0.2 dropped it.
- Tabular numerics: add `font-variant-numeric: tabular-nums` in table cells and financial figures — works with IBM Plex.
- No decorative / display-only fonts in product UI.

---

## 2. Body text scale (Untitled UI)

Base body is **14px** (`text-sm`) — clinical density. Not 16px.

| Token | Size | Line | Use |
|---|---|---|---|
| `--ax-text-xs-size` / `-line` | 12px | 18 | Caption, table footer, badges |
| `--ax-text-sm-size` / `-line` | **14px** | **20** | **BASE — body, form fields, table cells** |
| `--ax-text-md-size` / `-line` | 16px | 24 | Paragraph body (long-form) |
| `--ax-text-lg-size` / `-line` | 18px | 28 | Card lead, list-item title |
| `--ax-text-xl-size` / `-line` | 20px | 30 | Subsection heading |

**Rule:** never use sizes between these steps. Snap to the nearest token.

---

## 3. Display scale

Capped at **48px** (`display-lg`). Untitled UI's `xl` (60) and `2xl` (72) are intentionally omitted — a hospital dashboard that needs 72px type is communicating hierarchy wrong.

| Token | Size | Line | Weight | Use |
|---|---|---|---|---|
| `--ax-display-xs-*` | 24px | 32 | 600 | Section / card headline |
| `--ax-display-sm-*` | 30px | 38 | 600 | Page title (H2) |
| `--ax-display-md-*` | 36px | 44 | 600 | Dashboard hero (H1) |
| `--ax-display-lg-*` | 48px | 60 | 700 | Splash / onboarding **MAX** |

`-tracking` variant is set per-token — `md` and `lg` use `-0.02em`; smaller sizes use `0`.

---

## 4. Weight

| Token | Value | Use |
|---|---|---|
| `--ax-font-weight-regular`  | 400 | Body, table cells |
| `--ax-font-weight-medium`   | 500 | Form labels, nav items, buttons |
| `--ax-font-weight-semibold` | 600 | Card titles, section headers, display xs–md |
| `--ax-font-weight-bold`     | 700 | Display-lg, hero emphasis (sparingly) |

**Don't use:** 300 (thin, fails clinical legibility) · 800/900 (clashes with brand).

---

## 5. Line height

Thai vowel marks and tone marks stack above the baseline — give them room.

| Token | Ratio | Use |
|---|---|---|
| `--ax-leading-tight`   | 1.25 | Display sizes (md, lg) |
| `--ax-leading-normal`  | 1.5  | Body default |
| `--ax-leading-relaxed` | 1.75 | Long-form Thai paragraphs |

**Rule:** never go below 1.25 for Thai text. English can tolerate 1.0 in display; Thai cannot.

---

## 6. Letter spacing (tracking)

| Token | Value | Use |
|---|---|---|
| `--ax-tracking-tight`   | -0.02em | Display md / lg only |
| `--ax-tracking-normal`  | 0        | Body, default |
| `--ax-tracking-wide`    | 0.025em  | — |
| `--ax-tracking-widest`  | 0.1em    | Table headers, eyebrow labels (latin-only) |

**Rule:** never apply tight tracking or `text-transform: uppercase` to Thai. Both break Thai legibility.

---

## 7. Heading semantics

| Tag | Tokens | Notes |
|---|---|---|
| `<h1>` | `--ax-display-md-*` + weight semibold | One per page |
| `<h2>` | `--ax-display-sm-*` + weight semibold | Major sections |
| `<h3>` | `--ax-display-xs-*` + weight semibold | Subsections, card titles |
| `<h4>` | `--ax-text-lg-*` + weight semibold | Card subtitle, panel header |
| `<h5>` | `--ax-text-md-*` + weight medium | Inline emphasis |
| `<h6>` | `--ax-text-xs-*` + weight medium + `--ax-tracking-widest` + `text-transform: uppercase` | Eyebrow (latin only — do not use on Thai) |

Color for all headings: `color: var(--ax-text-heading)`.

---

## 8. Body & paragraph recipes

Never use raw Tailwind color utilities for text — always `var(--ax-text-*)`.

```css
/* Default body */
.body {
  font-size: var(--ax-text-sm-size);
  line-height: var(--ax-text-sm-line);
  color: var(--ax-text-default);
}

/* Long-form reading (articles, PDFs) */
.prose {
  font-size: var(--ax-text-md-size);
  line-height: var(--ax-leading-relaxed);
  color: var(--ax-text-default);
  max-width: 65ch;
}

/* Helper / hint */
.helper {
  font-size: var(--ax-text-sm-size);
  color: var(--ax-text-secondary);
}

/* Disabled */
.disabled {
  color: var(--ax-text-disabled);
}

/* Error message */
.error {
  font-size: var(--ax-text-sm-size);
  color: var(--ax-error-emphasis);
}
```

---

## 9. Print / PDF

| Element | Size | Notes |
|---|---|---|
| Body | 10pt | IBM Plex Sans Thai Regular |
| Table cell | 9pt | `font-variant-numeric: tabular-nums` |
| Section heading | 13pt Semibold | Display xs equivalent |
| Page title | 18pt Semibold | Display sm equivalent |
| Footer / page number | 8pt | `color: var(--ax-text-secondary)` |

**Rule:** print stylesheet explicitly overrides `--ax-font-sans` if the PDF engine doesn't embed web fonts — test rendered output, not browser preview.

---

## 10. Accessibility

- Minimum body text: **14px** (never below 12, except footnotes).
- Line length: 60–80 characters for prose — `max-width: 65ch`.
- Contrast: every body pairing ≥ WCAG **AA (4.5:1)**. Large text (≥ 18px or ≥ 14px bold) may pass at 3:1 but prefer AA.
- Run the `/tokens/a11y/` audit after any palette change.
- Never rely on color alone to convey meaning — pair with icon / text / weight.

---

## 11. Font loading

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Or self-host via `@fontsource/ibm-plex-sans-thai` / `@fontsource/ibm-plex-sans` / `@fontsource/jetbrains-mono` for offline-capable apps.

---

## Version history

- **v2.0 (2026-04-15)** — Rewrite for tokens v0.3: IBM Plex Sans Thai primary (drop Inter), 14px body base (drop 16), Untitled UI text/display scale, 48px display cap, `--ax-*` tokens instead of Tailwind utility classes.
- **v1.0 (2026-04)** — Initial spec with Inter, 16px base, Tailwind text-{xs..5xl}.
