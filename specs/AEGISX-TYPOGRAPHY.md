# AegisX Typography — Standard Spec

> Version 1.0 · April 2026
> Type system for AegisX Hospital Platform — web, PDF, mobile.

---

## 1. Type Families

| Role | Family | Fallback stack |
|------|--------|----------------|
| **UI / Body** | `Inter` (variable) | `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` |
| **Thai script** | `IBM Plex Sans Thai` | `'IBM Plex Sans Thai', 'Sarabun', sans-serif` |
| **Numerics (tabular)** | `Inter` w/ `font-feature-settings: 'tnum'` | inherits |
| **Code / Mono** | `JetBrains Mono` | `ui-monospace, 'SF Mono', Menlo, monospace` |
| **Display (marketing only)** | `Inter Display` | inherits Inter stack |

**Rules**
- All Thai text MUST use the Thai stack — Inter alone has no Thai glyphs.
- Tabular numerics in tables, financial figures, and timestamps.
- No serif fonts anywhere in product UI.

---

## 2. Type Scale (rem-based, 16px root)

| Token | px | rem | Use |
|-------|-----|------|-----|
| `text-xs`   | 12 | 0.75   | Caption, table footer, badge |
| `text-sm`   | 14 | 0.875  | Body small, form helper, table cell |
| `text-base` | 16 | 1.0    | Body default, paragraphs |
| `text-lg`   | 18 | 1.125  | Card lead, list item title |
| `text-xl`   | 20 | 1.25   | Subsection heading |
| `text-2xl`  | 24 | 1.5    | Page subtitle, modal title |
| `text-3xl`  | 30 | 1.875  | Page title (H2) |
| `text-4xl`  | 36 | 2.25   | Hero title (H1) |
| `text-5xl`  | 48 | 3.0    | Marketing hero (web only, not in app) |

**Avoid:** anything between these steps. Pick the nearest token.

---

## 3. Line Height

| Token | Ratio | Use |
|-------|-------|-----|
| `leading-none`    | 1.00 | Numeric displays, large headlines |
| `leading-tight`   | 1.25 | H1–H3 |
| `leading-snug`    | 1.375 | H4–H6, card titles |
| `leading-normal`  | 1.5  | Body text default |
| `leading-relaxed` | 1.625 | Long-form Thai text (Thai needs more leading) |

---

## 4. Font Weight

| Token | Weight | Use |
|-------|--------|-----|
| `font-normal`   | 400 | Body |
| `font-medium`   | 500 | Buttons, links, table headers, emphasis |
| `font-semibold` | 600 | Headings H4–H6, card titles, labels |
| `font-bold`     | 700 | Headings H1–H3, hero |

**Don't use:** 300 (too thin for clinical UI) · 800/900 (too heavy, clashes with brand).

---

## 5. Letter Spacing

| Token | Value | Use |
|-------|-------|-----|
| `tracking-tight`  | -0.01em | H1–H3 |
| `tracking-normal` |  0       | Body, default |
| `tracking-wide`   |  0.025em | All-caps labels, eyebrow text, badges |
| `tracking-wider`  |  0.05em  | Section headers (uppercase) |

---

## 6. Heading System (semantic)

| Tag | Class combo | Notes |
|-----|------------|-------|
| `<h1>` | `text-4xl font-bold leading-tight tracking-tight text-slate-900` | One per page |
| `<h2>` | `text-3xl font-bold leading-tight tracking-tight text-slate-900` | Page sections |
| `<h3>` | `text-2xl font-semibold leading-snug text-slate-900` | Subsections |
| `<h4>` | `text-xl font-semibold leading-snug text-slate-800` | Card titles |
| `<h5>` | `text-lg font-semibold leading-snug text-slate-800` | Sub-card |
| `<h6>` | `text-sm font-semibold tracking-wide uppercase text-slate-600` | Eyebrow / category |

---

## 7. Body & Paragraph

| Use | Class combo |
|-----|-------------|
| Default body | `text-base font-normal leading-normal text-slate-700` |
| Long-form (article) | `text-base leading-relaxed text-slate-700 max-w-prose` |
| Muted helper | `text-sm leading-normal text-slate-500` |
| Disabled | `text-sm text-slate-400` |
| Error message | `text-sm text-red-600` |

---

## 8. Print / PDF

| Element | px (at 100% zoom) | Notes |
|---------|-------------------|-------|
| Body | 11pt (`14.7 px`) | Inter Regular |
| Table cell | 9pt | Tabular numerics |
| Section heading | 14pt Semibold | |
| Page heading | 18pt Bold | |
| Footer / pagination | 8pt Slate-500 | |

Use `IBM Plex Sans Thai` for Thai paragraphs in PDFs (Thai render quality at small sizes is better than Inter fallback).

---

## 9. Accessibility

- Minimum body text: **14 px** (16 px preferred). Never go below 12 px except for footnotes.
- Line length: aim for **60–80 characters** per line for prose. Use `max-w-prose` (Tailwind 65ch).
- Contrast: every body-text colour pair must pass WCAG AA (4.5:1). Headings ≥ 18 px or ≥ 14 px bold may pass at 3:1.

---

## 10. Loading the fonts

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Or self-host via `@fontsource/inter` / `@fontsource/ibm-plex-sans-thai` / `@fontsource/jetbrains-mono` for offline-capable apps.
