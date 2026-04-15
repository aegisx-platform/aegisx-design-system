# AegisX Logo — Design Standard

> Version 2.0 · April 2026
> มาตรฐานการออกแบบและใช้งาน AegisX Platform logo

---

## 1. Logo Anatomy

```
                    ┌─ Peak dot (circle + halo)
                    │
                    ▼
                ●
               ╱ ╲
              ╱   ╲
   ──────────╱─────╲──╱╲──╱──────────  ← EKG pulse line
            ╱       ╲╱  ╲╱              + glow line (overlay)
           ╱
    ┌─────╱──────────────────────┐
    │   ◇◇◇  Diamond (3 layers) │      AEGISX
    │   ◇◇◇  rotate(45deg)      │      HOSPITAL PLATFORM
    │   ◇◇◇  with border stroke │
    └────────────────────────────┘
    outer   mid    solid
    0.10    0.20   1.0    ← opacity
```

### Components

| Component | Description | Required |
|-----------|------------|----------|
| **Diamond solid** | Rotated 45° rounded rect, main body | Always |
| **Diamond mid shadow** | Lighter layer, offset upper-right | Always |
| **Diamond outer shadow** | Lightest layer, offset upper-right | Always |
| **Diamond border stroke** | Subtle edge on solid diamond | Always |
| **EKG pulse line** | Heartbeat wave through diamond center | Always |
| **EKG glow line** | Lighter duplicate overlay for depth | Always |
| **Peak dot** | Circle at EKG peak | Always |
| **Peak dot halo** | Larger circle behind peak dot | Always |
| **Wordmark** | "AEGISX" in IBM Plex Sans 700 | Horizontal/Vertical only |
| **Tagline** | "HOSPITAL PLATFORM" in IBM Plex Sans 400 | Horizontal/Vertical only |

---

## 2. Geometry Spec

### 2.1 Diamond layers

3 concentric rounded rects, each rotated 45°, offset to create depth shadow:

```
Layer           Size      rx    Opacity   Translate offset
─────────────   ───────   ───   ───────   ────────────────
Outer shadow    varies    ~12   0.10      (+8, -8) from solid center
Mid shadow      varies    ~14   0.20      (+4, -4) from solid center
Solid           varies    ~15   1.00      (0, 0) = center
```

Shadow direction: **upper-right** → creates subtle 3D depth

### 2.2 Variant dimensions

| Variant | viewBox | Diamond solid | Diamond mid | Diamond outer |
|---------|---------|---------------|-------------|---------------|
| **Icon** | `0 0 120 120` | 76×76 rx=15 at (56,62) | 68×68 rx=14 at (65,53) | 60×60 rx=12 at (74,44) |
| **Horizontal** | `0 0 220 80` | 46×46 rx=10 at (35,43) | 42×42 rx=9 at (42,36) | 38×38 rx=8 at (49,29) |
| **Vertical** | `0 0 120 170` | 66×66 rx=13 at (54,52) | 60×60 rx=12 at (61,45) | 52×52 rx=10 at (68,38) |

### 2.3 EKG pulse path

Consistent wave shape across all variants:

```
Icon:        M25 62 L44 62 L49 36 L56 81 L61 54 L66 62 L87 62
Horizontal:  M13 43 L27 43 L30 25 L35 56 L39 37 L42 43 L57 43
Vertical:    M27 52 L42 52 L46 32 L54 68 L58 46 L62 52 L78 52
```

Wave anatomy: `flat → peak(up) → trough(down) → bump(up) → flat`

### 2.4 Typography

```
Wordmark:  "AEGISX" — IBM Plex Sans, 700, letter-spacing 0.06em
           "X" ใช้สี #3b82f6 (brand blue) ส่วนที่เหลือตาม theme
Tagline:   "HOSPITAL PLATFORM" — IBM Plex Sans, 400, letter-spacing 0.2em
           สี #64748b (slate-500) ทั้ง light และ dark theme

Font sizes:
  Horizontal: wordmark 32px, tagline 10px
  Vertical:   wordmark 24px, tagline 8px
```

---

## 3. Color Spec

### 3.1 Light theme (บน white/light background)

```
Diamond solid fill:    #0f172a (navy-900)
Diamond solid stroke:  #2a5a8f opacity 0.4
Diamond mid fill:      #1e3a5f opacity 0.20
Diamond outer fill:    #1e3a5f opacity 0.10
EKG main stroke:       #3b82f6 (blue-500)
EKG glow stroke:       #60a5fa opacity 0.25
Peak dot fill:         #60a5fa (blue-400)
Peak dot halo:         #3b82f6 opacity 0.12
Wordmark fill:         #0f172a (navy-900), "X" = #3b82f6
Tagline fill:          #64748b (slate-500)
```

### 3.2 Dark theme (บน dark/navy background)

```
Diamond solid fill:    #1e293b (slate-800)
Diamond solid stroke:  #3b82f6 opacity 0.3
Diamond mid fill:      #60a5fa opacity 0.10
Diamond outer fill:    #60a5fa opacity 0.06
EKG main stroke:       #3b82f6 (blue-500)
EKG glow stroke:       #93c5fd opacity 0.20
Peak dot fill:         #60a5fa (blue-400)
Peak dot halo:         #3b82f6 opacity 0.15
Wordmark fill:         #f1f5f9 (slate-50), "X" = #3b82f6
Tagline fill:          #64748b (slate-500)
```

### 3.3 Mono theme (single color, print/watermark)

```
Diamond solid fill:    currentColor (inherits parent color)
Diamond mid fill:      currentColor opacity 0.12
Diamond outer fill:    currentColor opacity 0.06
EKG stroke:            #fff (inverted on solid diamond)
Peak dot fill:         #fff opacity 0.85
Wordmark fill:         currentColor
Tagline fill:          currentColor opacity 0.5
No glow line, no halo, no border stroke
```

### 3.4 Mono inverse (white logo on dark background)

```
Diamond solid fill:    #fff
Diamond mid fill:      #fff opacity 0.12
Diamond outer fill:    #fff opacity 0.06
EKG stroke:            #0f172a
Peak dot fill:         #0f172a opacity 0.85
Wordmark fill:         #fff
Tagline fill:          #fff opacity 0.5
```

---

## 4. Stroke Weights

| Element | Icon (120px) | Horizontal (80px) | Vertical (170px) |
|---------|-------------|-------------------|-------------------|
| EKG main | 3.5 | 2.2 | 2.8 |
| EKG glow | 1.0 | 0.7 | 0.8 |
| Diamond border | 0.5 | 0.4 | 0.4 |
| Peak dot radius | 3.5 | 2.0 | 2.5 |
| Peak halo radius | 6.0 | 3.5 | 4.5 |

ทุก stroke ใช้ `stroke-linecap="round" stroke-linejoin="round"`

---

## 5. File Naming & Variants

### 5.1 Required files (8 variants)

```
aegisx-logo-icon-light.svg          ← ใช้บน white/light bg
aegisx-logo-icon-dark.svg           ← ใช้บน dark/navy bg
aegisx-logo-horizontal-light.svg    ← header, footer บน light bg
aegisx-logo-horizontal-dark.svg     ← header, footer บน dark bg (login page)
aegisx-logo-vertical-light.svg      ← splash screen, about page
aegisx-logo-vertical-dark.svg       ← splash screen บน dark bg
aegisx-logo-horizontal-mono.svg     ← print, watermark (currentColor)
aegisx-logo-horizontal-mono-inverse.svg ← white version บน photos/dark print
```

### 5.2 เมื่อไหร่ใช้ variant ไหน

| Context | Variant |
|---------|---------|
| Login page (dark panel) | `horizontal-dark` |
| Top nav bar (dark header) | `icon-dark` หรือ `horizontal-dark` |
| Top nav bar (light header) | `icon-light` หรือ `horizontal-light` |
| Splash / loading screen | `vertical-dark` (dark bg) หรือ `vertical-light` (light bg) |
| PDF report header | `horizontal-mono` |
| Favicon / PWA icon | `icon-light` (export เป็น PNG) |
| Email signature | `horizontal-light` |
| Watermark on documents | `horizontal-mono` opacity 0.1 |
| Footer copyright | `horizontal-mono` (small size) |
| App store / promotional | `vertical-light` |

---

## 6. Clear Space & Minimum Size

### 6.1 Clear space

รอบ logo ต้องมี clear space อย่างน้อย = **ความสูงของเส้น EKG peak** จาก center line

```
Icon:        min 18px clear space รอบ
Horizontal:  min 12px clear space รอบ
Vertical:    min 14px clear space รอบ
```

### 6.2 Minimum size

| Variant | Minimum width | Minimum height |
|---------|--------------|----------------|
| Icon | 32px | 32px |
| Horizontal | 140px | - |
| Vertical | 80px | - |

ต่ำกว่านี้ EKG pulse จะมองไม่ออก

---

## 7. Do's and Don'ts

### Do's
- ✅ ใช้ variant ที่ถูกกับ background (light/dark)
- ✅ รักษา clear space
- ✅ ใช้ไฟล์ SVG ต้นฉบับ ไม่ rasterize ถ้าเลี่ยงได้
- ✅ "X" ใน AEGISX ต้องเป็นสี `#3b82f6` เสมอ (ยกเว้น mono)
- ✅ Peak dot ต้องมีทุก variant (ยกเว้น mono ใช้ dot เดียว ไม่มี halo)

### Don'ts
- ❌ อย่า rotate logo เพิ่ม (diamond 45° คือ fixed rotation)
- ❌ อย่าเปลี่ยนสี EKG pulse เป็นสีอื่นนอกจาก blue
- ❌ อย่าลบ shadow layers — ต้องมีครบ 3 layers เสมอ
- ❌ อย่าใช้ icon-light บน dark background (จะมองไม่เห็น border)
- ❌ อย่าเปลี่ยน font จาก IBM Plex Sans
- ❌ อย่าวาง pattern/texture ทับ logo
- ❌ อย่าย่อ logo ต่ำกว่า minimum size
- ❌ อย่าวาง logo ติดขอบ — ต้องมี clear space

---

## 8. Technical Notes

### 8.1 ViewBox

ทุก variant ต้อง **viewBox เริ่มที่ 0,0** เสมอ:

```
icon:        viewBox="0 0 120 120"
horizontal:  viewBox="0 0 220 80"
vertical:    viewBox="0 0 120 170"
```

ห้ามใช้ non-zero offset เช่น `viewBox="4 4 118 118"` → ทำให้ positioning ไม่ predictable

### 8.2 Font loading

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap" rel="stylesheet">
```

หรือ self-host:

```css
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('/assets/fonts/IBMPlexSans-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
```

### 8.3 Angular usage

```html
<!-- Inline SVG (preferred for login/splash) -->
<div class="logo" [innerHTML]="logoSvg"></div>

<!-- img tag (simple) -->
<img src="assets/logo/aegisx-logo-horizontal-dark.svg"
     alt="AegisX Hospital Platform"
     width="220" height="80" />

<!-- Background image -->
.brand-panel {
  background-image: url('/assets/logo/aegisx-logo-horizontal-dark.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 280px auto;
}
```

---

## 9. EKG Pulse ≠ Module Icons

**สำคัญ:** EKG heartbeat pulse เป็น visual identity ของ **AegisX Platform** เท่านั้น

- ❌ ห้ามใช้ EKG pulse ใน module app icons (Inventory, OPD, Lab ฯลฯ)
- ❌ ห้ามใช้ EKG pulse ใน navigation icons
- ✅ Module app icons ใช้ diamond shape + icon ที่สื่อความหมายของ module นั้นๆ
- ✅ AegisX Platform icon ใน app launcher ใช้ EKG pulse ใน diamond ได้

ดูรายละเอียดที่ `AEGISX-ICON-SYSTEM-SUMMARY.md`
