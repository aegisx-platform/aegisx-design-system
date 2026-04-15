# AegisX Platform — Brand & Design Standard

> Version 2.0 · April 2026
> AegisX Platform Team · aegisx.dev

---

## สารบัญ

1. [Logo Anatomy](#1-logo-anatomy)
2. [Logo Variants](#2-logo-variants)
3. [Logo Colors](#3-logo-colors)
4. [Logo Usage](#4-logo-usage)
5. [Brand Background](#5-brand-background)
6. [Icon System](#6-icon-system)
7. [Diamond Component](#7-diamond-component)
8. [Color System](#8-color-system)
9. [Error Severity](#9-error-severity)

---

## 1. Logo Anatomy

### Components

| # | Component | Description | Required |
|---|-----------|------------|----------|
| 1 | **Diamond solid** | Main body — rotated 45° rounded rect, opacity 1.0 | Always |
| 2 | **Diamond mid shadow** | Lighter layer, offset upper-right, opacity 0.20 | Always |
| 3 | **Diamond outer shadow** | Lightest layer, offset further upper-right, opacity 0.10 | Always |
| 4 | **Diamond border stroke** | Subtle edge on solid diamond, opacity 0.4 | Always |
| 5 | **EKG pulse line** | Heartbeat wave through diamond center | Always |
| 6 | **EKG glow line** | Lighter overlay for depth — opacity 0.25 | Always |
| 7 | **Peak dot** | Circle at highest EKG point | Always |
| 8 | **Peak dot halo** | Larger circle behind peak dot, opacity 0.12 | Always |
| 9 | **Wordmark** | "AEGISX" in IBM Plex Sans 700 | Horizontal / Vertical |
| 10 | **Tagline** | "HOSPITAL PLATFORM" in IBM Plex Sans 400 | Horizontal / Vertical |

### Typography

```
Wordmark:   "AEGISX" — IBM Plex Sans 700, letter-spacing 0.06em
            "X" ใช้สี #3b82f6 (brand blue) เสมอ ยกเว้น mono variants

Tagline:    "HOSPITAL PLATFORM" — IBM Plex Sans 400, letter-spacing 0.2em
            สี #64748b (slate-500) ทั้ง light และ dark theme

Font sizes:
  Horizontal: wordmark 32px, tagline 10px
  Vertical:   wordmark 24px, tagline 8px
```

### EKG Pulse Path Shape

```
ทุก variant ใช้ wave shape เดียวกัน:
  flat ── peak(up) ── trough(down) ── bump(up) ── flat

Icon:        M25 62 L44 62 L49 36 L56 81 L61 54 L66 62 L87 62
Horizontal:  M13 43 L27 43 L30 25 L35 56 L39 37 L42 43 L57 43
Vertical:    M27 52 L42 52 L46 32 L54 68 L58 46 L62 52 L78 52
```

---

## 2. Logo Variants

### 8 Required Files

| File | Theme | ใช้เมื่อ |
|------|-------|---------|
| `aegisx-logo-icon-light.svg` | Light | Favicon, light header, app icon |
| `aegisx-logo-icon-dark.svg` | Dark | Dark header, dark nav |
| `aegisx-logo-horizontal-light.svg` | Light | Header/footer บน light bg |
| `aegisx-logo-horizontal-dark.svg` | Dark | Login page, dark header |
| `aegisx-logo-vertical-light.svg` | Light | Splash screen, about page |
| `aegisx-logo-vertical-dark.svg` | Dark | Splash screen บน dark bg |
| `aegisx-logo-horizontal-mono.svg` | Mono | Print, watermark, PDF header |
| `aegisx-logo-horizontal-mono-inverse.svg` | Mono (white) | Logo บน photos, dark print |

### ViewBox Standard

ทุก variant ต้อง viewBox **เริ่มที่ 0,0** เสมอ:

| Variant | viewBox | Diamond | EKG stroke | Text |
|---------|---------|---------|------------|------|
| Icon | `0 0 120 120` | 76×76, rx=15 | 3.5px | — |
| Horizontal | `0 0 220 80` | 46×46, rx=10 | 2.2px | 32px / 10px |
| Vertical | `0 0 120 170` | 66×66, rx=13 | 2.8px | 24px / 8px |

### Diamond Layer Geometry

3 concentric rounded rects, rotated 45°, offset upper-right for depth shadow:

```
Layer           Offset from solid    Opacity
─────────────   ──────────────────   ───────
Outer shadow    (+8, -8)             0.10
Mid shadow      (+4, -4)             0.20
Solid           (0, 0)               1.00
```

Shadow direction: **upper-right** → creates 3D depth

---

## 3. Logo Colors

### Light Theme — บน white/light background

| Element | Color | Opacity |
|---------|-------|---------|
| Diamond solid fill | `#0f172a` | 1.0 |
| Diamond border stroke | `#2a5a8f` | 0.4 |
| Diamond shadow layers | `#1e3a5f` | 0.10 / 0.20 |
| EKG main stroke | `#3b82f6` | 1.0 |
| EKG glow stroke | `#60a5fa` | 0.25 |
| Peak dot | `#60a5fa` | 1.0 |
| Peak dot halo | `#3b82f6` | 0.12 |
| Wordmark | `#0f172a`, "X" = `#3b82f6` | — |
| Tagline | `#64748b` | — |

### Dark Theme — บน dark/navy background

| Element | Color | Opacity |
|---------|-------|---------|
| Diamond solid fill | `#1e293b` | 1.0 |
| Diamond border stroke | `#3b82f6` | 0.3 |
| Diamond shadow layers | `#60a5fa` | 0.06 / 0.10 |
| EKG main stroke | `#3b82f6` | 1.0 |
| EKG glow stroke | `#93c5fd` | 0.20 |
| Peak dot | `#60a5fa` | 1.0 |
| Peak dot halo | `#3b82f6` | 0.15 |
| Wordmark | `#f1f5f9`, "X" = `#3b82f6` | — |
| Tagline | `#64748b` | — |

### Mono Theme — print, watermark

| Element | Color | Opacity |
|---------|-------|---------|
| Diamond solid fill | `currentColor` | 1.0 |
| Diamond shadow layers | `currentColor` | 0.06 / 0.12 |
| EKG stroke | `#fff` (inverted) | 1.0 |
| Peak dot | `#fff` | 0.85 |
| Wordmark | `currentColor` | — |
| Tagline | `currentColor` | 0.5 |

No glow line, no halo, no border stroke ใน mono

### Primary Brand Colors

| Swatch | Name | Hex | Usage |
|--------|------|-----|-------|
| ■ Navy | Navy 900 | `#0f172a` | Primary dark, light theme diamond |
| ■ Slate | Slate 800 | `#1e293b` | Dark theme diamond fill |
| ■ Blue | Blue 500 | `#3b82f6` | Brand blue, EKG, "X" color |
| ■ Sky | Blue 400 | `#60a5fa` | Glow, peak dot |
| ■ Light blue | Blue 300 | `#93c5fd` | Dark mode glow |
| ■ Custom | — | `#2a5a8f` | Border stroke |

### Stroke Weights

| Element | Icon (120px) | Horizontal (80px) | Vertical (170px) |
|---------|-------------|-------------------|-------------------|
| EKG main | 3.5 | 2.2 | 2.8 |
| EKG glow | 1.0 | 0.7 | 0.8 |
| Diamond border | 0.5 | 0.4 | 0.4 |
| Peak dot r | 3.5 | 2.0 | 2.5 |
| Peak halo r | 6.0 | 3.5 | 4.5 |

---

## 4. Logo Usage

### Variant Selection Guide

| Context | Variant |
|---------|---------|
| Login page (dark panel) | `horizontal-dark` |
| Top nav (dark header) | `icon-dark` or `horizontal-dark` |
| Top nav (light header) | `icon-light` or `horizontal-light` |
| Splash / loading screen | `vertical-dark` or `vertical-light` |
| PDF report header | `horizontal-mono` |
| Favicon / PWA icon | `icon-light` (export as PNG) |
| Email signature | `horizontal-light` |
| Watermark on documents | `horizontal-mono`, opacity 0.1 |
| Footer copyright | `horizontal-mono` (small) |
| App store listing | `vertical-light` |

### Clear Space

Minimum clear space = **height of EKG peak from center line**

```
Icon:        18px min clear space
Horizontal:  12px min clear space
Vertical:    14px min clear space
```

### Minimum Size

| Variant | Min width | Min height |
|---------|----------|------------|
| Icon | 32px | 32px |
| Horizontal | 140px | — |
| Vertical | 80px | — |

ต่ำกว่านี้ EKG pulse จะมองไม่ออก

### Do's

- ✅ ใช้ variant ที่ถูกกับ background (light/dark)
- ✅ รักษา clear space
- ✅ ใช้ SVG ต้นฉบับ ไม่ rasterize ถ้าเลี่ยงได้
- ✅ "X" ต้องเป็นสี `#3b82f6` เสมอ (ยกเว้น mono)
- ✅ Peak dot ต้องมีทุก variant

### Don'ts

- ❌ ห้าม rotate logo เพิ่ม (diamond 45° คือ fixed)
- ❌ ห้ามเปลี่ยนสี EKG pulse จาก blue
- ❌ ห้ามลบ shadow layers — ต้องมีครบ 3 layers
- ❌ ห้ามใช้ icon-light บน dark background
- ❌ ห้ามเปลี่ยน font จาก IBM Plex Sans
- ❌ ห้ามวาง pattern/texture ทับ logo
- ❌ ห้ามย่อต่ำกว่า minimum size
- ❌ ห้ามวาง logo ติดขอบ — ต้องมี clear space

---

## 5. Brand Background

### Pattern: B4 (Diamond Ripple + Ambient Glow + Data Nodes + Multi EKG)

ใช้ทั้ง Web (login, splash) และ PDF (cover, headers)

### 4 Layers

#### Layer 1: Ambient Glow

| Position | Center | Radius | Color | Opacity |
|----------|--------|--------|-------|---------|
| Top-right | 70%, 20% | 40% | `#1e293b` | 0.6 → 0 |
| Bottom-left | 22%, 82% | 28% | `#1e293b` | 0.3 → 0 |

#### Layer 2: Diamond Ripple

Top-right cluster (4 rings expanding outward):

| Ring | Size | rx | Color | Opacity | Width |
|------|------|----|-------|---------|-------|
| 1 (inner) | 240×240 | 38 | `#3b82f6` | 0.08 | 1.2 |
| 2 | 360×360 | 58 | `#3b82f6` | 0.05 | 0.8 |
| 3 | 480×480 | 76 | `#60a5fa` | 0.03 | 0.5 |
| 4 (outer) | 620×620 | 98 | `#60a5fa` | 0.015 | 0.4 |

Bottom-left cluster (3 rings, smaller):

| Ring | Size | rx | Color | Opacity | Width |
|------|------|----|-------|---------|-------|
| 1 | 160×160 | 25 | `#3b82f6` | 0.06 | 0.8 |
| 2 | 260×260 | 42 | `#3b82f6` | 0.035 | 0.5 |
| 3 | 360×360 | 58 | `#60a5fa` | 0.02 | 0.4 |

#### Layer 3: Data Nodes

```
Dots:   r = 1.5–2px, fill #3b82f6/#60a5fa, opacity 0.06–0.12
Lines:  stroke #3b82f6, width 0.4px, opacity 0.03–0.05
```

Top-right: 7 dots + 8 connections (around diamond cluster)
Bottom-left: 3 dots + 2 connections (sparse, balance)

#### Layer 4: EKG Pulse Lines

| Line | Position | Color | Width | Opacity |
|------|----------|-------|-------|---------|
| Main | 50% height | `#3b82f6` | 1.5 | 0.04 |
| Main glow | 50% height | `#60a5fa` | 0.5 | 0.02 |
| Secondary upper | ~28% | `#1e293b` | 0.6 | 0.45 |
| Secondary lower | ~73% | `#1e293b` | 0.5 | 0.35 |

Peak dot: r=6, fill `#3b82f6` opacity 0.06
Peak halo: r=18, fill `#3b82f6` opacity 0.02

### Usage

```scss
// Login page
.ax-login-layout__brand {
  background: #0f172a url('/assets/brand/aegisx-brand-bg.svg') center/cover no-repeat;
}

// Splash screen
.ax-brand-bg {
  background: #0f172a url('/assets/brand/aegisx-brand-bg.svg') center/cover no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Files

```
assets/brand/
├── aegisx-brand-bg.svg       ← SVG background (1 file ใช้ทุกที่)
├── aegisx-brand-bg.scss      ← SCSS component + design tokens
└── AEGISX-BRAND-BG-SPEC.md   ← Spec document
```

---

## 6. Icon System

### Architecture: 1 Icon = 1 SVG File

```
aegisx-icons/
├── svg/                  153 flat mono icons (currentColor)
├── featured-error/        10 double-ring error icons
├── svg-sprite/             1 file (aegisx-icons.svg — 153 symbols)
├── aegisx-icon-registry.ts
├── icon-color-map.ts
├── diamond-color-map.ts
├── ax-diamond-icon.component.ts
├── SKILL.md
└── ICON-SIZING-STANDARD.md
```

### SVG Spec

```
ViewBox:         0 0 24 24
Content area:    2–22 (20px effective within 24px)
Stroke:          currentColor, width 1.5
Emphasis:        width 2
Detail:          width 1 + opacity 0.4
Fill:            none (accent: fill="currentColor" opacity 0.1–0.2)
Caps/Joins:      round / round
```

### 153 Icons — 13 Categories

| Category | Count | Examples |
|----------|-------|---------|
| Clinical Front Office | 30 | registration, opd, ipd, er, pharmacy, laboratory, nursing, dental, rehab, icu, hemodialysis, thai-med, home-health, pathology, maternal, forensic |
| Inventory Module | 4 | inv-budget, inv-procurement, inv-warehouse, inv-substore |
| Finance & Billing | 9 | billing, accounting, finance, nhso, social-security, cgd, insurance, cost-center, revenue |
| Back Office Admin | 18 | hr, duty-schedule, leave, ot-manage, general-supply, maintenance, vehicle, meeting-room, document, laundry, cssd, security, facilities, waste, training, cafeteria, staff-housing, complaint |
| Quality & Risk | 4 | risk-mgmt, infection-ctrl, quality-ha, internal-audit |
| Platform | 8 | platform, users, rbac, settings, multi-site, audit-log, api-integration, dashboard-bi |
| UI Actions | 15 | act-add, act-edit, act-delete, act-save, act-cancel, act-print, act-filter, act-sort, act-export, act-import, act-copy, act-duplicate, act-more, act-refresh, act-search |
| Status Indicators | 8 | st-active, st-pending, st-expired, st-draft, st-locked, st-approved, st-rejected, st-cancelled |
| Empty State | 5 | empty-no-data, empty-no-results, empty-no-permission, empty-offline, empty-welcome |
| File Types | 6 | file-pdf, file-excel, file-word, file-image, file-zip, file-generic |
| Thai Government | 6 | thai-43files, thai-e-referral, thai-drg, thai-icd10, thai-moph, thai-dmsic |
| Notification | 4 | notify-line, notify-sms, notify-email, notify-push |
| Error State | 11 | err-alert-triangle, err-lock, err-ban, err-search, err-shield-alert, err-server-crash, err-wrench, err-clock, err-wifi-off, err-circle-alert, err-rotate-ccw |

### Usage — 4 Modes

#### Flat icon (sidebar, table, button)

```html
<mat-icon svgIcon="opd" class="text-emerald-600"></mat-icon>
<mat-icon svgIcon="act-edit" class="text-blue-600 !w-4 !h-4"></mat-icon>
```

#### Diamond app icon (dark nav / light launcher)

```html
<ax-diamond-icon icon="er" bg="#991b1b" border="#ef4444"
  iconColor="#fca5a5" size="lg" />
```

#### Tab icon (mono slate)

```html
<!-- Active -->
<mat-icon svgIcon="inv-budget" class="!w-4 !h-4" style="color:#e2e8f0"></mat-icon>
<!-- Inactive -->
<mat-icon svgIcon="inv-budget" class="!w-4 !h-4" style="color:#64748b"></mat-icon>
```

#### Featured icon (Untitled UI double-ring)

```html
<div class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
  <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
    <mat-icon svgIcon="opd" class="text-emerald-600 !w-6 !h-6"></mat-icon>
  </div>
</div>
```

#### SVG Sprite

```html
<svg width="20" height="20"><use href="#ax-opd"/></svg>
```

---

## 7. Diamond Component

### CSS-only — Zero SVG Files

ลบ 134 diamond SVG files → ใช้ CSS `rotate(45deg)` wrapper แทน

| Before | After |
|--------|-------|
| `diamond-dark/` 67 files | `ax-diamond-icon.component.ts` (CSS) |
| `diamond-light/` 67 files | `diamond-color-map.ts` (67 app colors) |
| **134 extra SVG files** | **0 extra files** |

### Sizes

| Size | Dimension | Usage |
|------|-----------|-------|
| `sm` | 28px | Tab icon, compact nav |
| `md` | 32px | Sidebar, list item |
| `lg` | 36px | Nav header, card header |
| `xl` | 44px | App launcher, hero |

### Color Map

```typescript
import { getDiamondColors } from './diamond-color-map';

const dark = getDiamondColors('er', 'dark');
// → { bg: '#991b1b', border: '#ef4444', stroke: '#fca5a5' }

const light = getDiamondColors('er', 'light');
// → { bg: '#fef2f2', border: '#fecaca', stroke: '#dc2626' }
```

---

## 8. Color System

### Icon Category Colors

| Color | Hex | Tailwind | Categories |
|-------|-----|----------|-----------|
| Blue | `#3b82f6` | `text-blue-600` | Clinical core, Registration, Queue |
| Emerald | `#10b981` | `text-emerald-600` | OPD, Discharge, NHSO, Quality HA |
| Indigo | `#6366f1` | `text-indigo-600` | IPD, Pharmacy, Special Clinic |
| Red | `#ef4444` | `text-red-600` | ER, OR, Risk, IC, Blood Bank |
| Cyan | `#06b6d4` | `text-cyan-600` | Lab, CSSD, Telehealth |
| Purple | `#a855f7` | `text-purple-600` | Med Records, RBAC, Document |
| Amber | `#f59e0b` | `text-amber-600` | Finance, Billing, Audit |
| Teal | `#14b8a6` | `text-teal-600` | HR, Duty, Leave, Rehab |
| Pink | `#ec4899` | `text-pink-600` | Nursing, Maternal, Social Work |
| Orange | `#f97316` | `text-orange-600` | Nutrition, Sub-store, Cafeteria |
| Slate | `#64748b` | `text-slate-600` | Settings, X-Ray, Maintenance |
| Green | `#22c55e` | `text-green-600` | Appointment, Checkup |

---

## 9. Error Severity

### Severity → Color → Icon

| Severity | Icon color | Outer ring | Inner circle | HTTP codes | Use case |
|----------|-----------|------------|-------------|------------|----------|
| `error` | `#D92D20` | `#FEF3F2` | `#FEE4E2` | 403, 500, 502 | System failure, no user action |
| `warning` | `#DC6803` | `#FFFAEB` | `#FEF0C7` | 400, 401, 504 | Temporary, user can retry |
| `info` | `#1570EF` | `#EFF8FF` | `#D1E9FF` | 503 | Planned maintenance |
| `neutral` | `#667085` | `#F9FAFB` | `#F2F4F7` | 404, NETWORK | Not anyone's fault |

### Error Icons

| Flat icon | HTTP | Severity |
|-----------|------|----------|
| `err-alert-triangle` | 400 | warning |
| `err-lock` | 401 | warning |
| `err-ban` | 403 | error |
| `err-search` | 404 | neutral |
| `err-shield-alert` | 500 | error |
| `err-server-crash` | 502 | error |
| `err-wrench` | 503 | info |
| `err-clock` | 504 | warning |
| `err-wifi-off` | NETWORK | neutral |
| `err-circle-alert` | DEFAULT | error |
| `err-rotate-ccw` | — | retry button |

### EKG Pulse = AegisX Platform Only

**สำคัญ:** EKG heartbeat pulse เป็น identity ของ **AegisX Platform** เท่านั้น

- ❌ ห้ามใช้ EKG ใน module app icons (Inventory, OPD, Lab ฯลฯ)
- ❌ ห้ามใช้ EKG ใน navigation icons
- ✅ Module icons ใช้ diamond shape + icon เฉพาะ module
- ✅ AegisX Platform icon ใน app launcher ใช้ EKG ใน diamond ได้

---

## 10. File Structure

```
src/assets/
├── brand/
│   ├── aegisx-brand-bg.svg           ← Brand background (B4)
│   └── aegisx-brand-bg.scss          ← SCSS styles
├── logo/
│   ├── aegisx-logo-icon-light.svg
│   ├── aegisx-logo-icon-dark.svg
│   ├── aegisx-logo-horizontal-light.svg
│   ├── aegisx-logo-horizontal-dark.svg
│   ├── aegisx-logo-vertical-light.svg
│   ├── aegisx-logo-vertical-dark.svg
│   ├── aegisx-logo-horizontal-mono.svg
│   └── aegisx-logo-horizontal-mono-inverse.svg
├── icons/
│   ├── *.svg                          ← 153 flat mono icons
│   ├── featured-error/*.svg           ← 10 double-ring
│   └── aegisx-icons.svg              ← SVG sprite

libs/shared/ui/icons/src/lib/
├── aegisx-icon-registry.ts
├── icon-color-map.ts
├── diamond-color-map.ts
├── ax-diamond-icon.component.ts
└── index.ts
```

---

## 11. Adding New Icons

1. สร้าง SVG ใน `svg/` — viewBox `0 0 24 24`, content area 2–22, stroke `currentColor`
2. เพิ่ม entry ใน `icon-color-map.ts`
3. เพิ่ม entry ใน `diamond-color-map.ts` (ถ้าเป็น app module)
4. ลงทะเบียนใน `aegisx-icon-registry.ts`
5. Visual weight check — วางข้าง icon อื่นดูก่อน commit
6. อัปเดต SVG sprite `aegisx-icons.svg`
