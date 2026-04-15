# AegisX Logo — Usage Guide

When to use which logo variant, plus ready-to-paste snippets for web, PWA, email, and print.

> Source-of-truth spec: [`AEGISX-LOGO-STANDARD.md`](AEGISX-LOGO-STANDARD.md)

---

## 1. Variant Picker

| Context | Background | File |
|---------|-----------|------|
| Web navbar, light UI | White / light grey | `horizontal-light.svg` |
| Login, splash, dark hero | Navy `#0f172a` | `horizontal-dark.svg` |
| Stamp on photos (dark) | Dark photo | `horizontal-mono-inverse.svg` |
| Stamp on photos (light) | Light photo | `horizontal-mono.svg` |
| Invoice / fax / B&W print | White (mono printer) | `horizontal-mono.svg` |
| Portrait poster / PDF cover | Any brand bg | `vertical-light.svg` / `vertical-dark.svg` |
| App launcher / favicon / PWA | n/a | `icon-light.svg` |
| Dark app launcher | n/a | `icon-dark.svg` |
| Social avatar (square) | n/a | `icon-*.svg` |

**Rule of thumb:** pick `-light` on light bg, `-dark` on dark bg, `-mono` when you must print one colour.

---

## 2. Clear Space & Min Size

- **Clear space**: 1× the peak-dot radius on every side. Nothing (text, image, UI chrome) may enter that margin.
- **Minimum display size**:
  - Horizontal lockup — 120 px wide on screen, 30 mm in print
  - Vertical lockup — 96 px wide on screen, 24 mm in print
  - Icon-only — 24 px on screen, 8 mm in print

Going smaller degrades the EKG pulse line — switch to icon-only instead.

---

## 3. Web / Favicon Setup

Generated files live in [`favicons/`](favicons/):

```
favicons/
├── favicon.ico           ← legacy browsers
├── favicon-16.png        ← tab icon
├── favicon-32.png
├── favicon-48.png
├── apple-touch-icon.png  ← iOS home-screen (180×180)
├── icon-192.png          ← PWA / Android
└── icon-512.png          ← PWA splash
```

Paste into your app's `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

`site.webmanifest`:

```json
{
  "name": "AegisX Hospital Platform",
  "short_name": "AegisX",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#0f172a",
  "background_color": "#0f172a",
  "display": "standalone"
}
```

---

## 4. PNG Exports

Generated in [`png/`](png/) at `@1x`, `@2x`, `@3x` for tools that don't accept SVG (email clients, Office, LINE, some CMSes).

- Horizontal — 200 / 400 / 600 px wide
- Vertical — 240 / 480 / 720 px wide
- Icon — 64 / 128 / 192 px

**Email signature example:**

```html
<img src="https://cdn.aegisx.io/logo/horizontal-light@2x.png"
     width="200" height="auto" alt="AegisX" style="display:block">
```

---

## 5. Angular / Web Component Usage

Import the SVG directly (preferred — scales crisply, themes via CSS):

```html
<img src="/assets/logo/horizontal-light.svg" alt="AegisX" class="h-8 w-auto">
```

Dark-mode aware:

```html
<img src="/assets/logo/horizontal-light.svg" alt="AegisX" class="h-8 w-auto dark:hidden">
<img src="/assets/logo/horizontal-dark.svg"  alt="AegisX" class="h-8 w-auto hidden dark:block">
```

---

## 6. Don'ts

- ❌ Don't recolour the diamond — colours are fixed per the standard.
- ❌ Don't rotate, skew, or reshape the logo.
- ❌ Don't redraw the EKG pulse — use the file.
- ❌ Don't place `-light` variants on dark bg, or vice versa.
- ❌ Don't outline the logo with a border or drop a shadow behind it.
- ❌ Don't scale below the minimum size — switch to icon-only.

---

## 7. Regenerating Exports

```bash
./logo/build-assets.sh
```

Requires macOS `sips` (built-in). Regenerates everything in `favicons/` and `png/` from the source SVGs. Commit the output so consumer apps don't need to run it.
