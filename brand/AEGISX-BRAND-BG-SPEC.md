# AegisX Brand Background — Standard Spec (B4)

> Pattern: Diamond Ripple + Ambient Glow + Data Nodes + Multi EKG
> ใช้ทั้ง Web (login, splash) + PDF (cover, headers)

---

## 1. Base

```
Background: #0f172a (Navy 900)
```

---

## 2. Ambient Glow (radial gradients)

| Position | Center | Radius | Color | Opacity |
|----------|--------|--------|-------|---------|
| Top-right | 70%, 20% | 40% | #1e293b | 0.6 → 0 |
| Bottom-left | 22%, 82% | 28% | #1e293b | 0.3 → 0 |

---

## 3. Diamond Ripple

สองกลุ่ม มุมตรงข้าม สร้าง diagonal balance:

### Top-right cluster (center ~75%, 18%)

| Ring | Size | rx | Stroke color | Opacity | Width |
|------|------|----|-------------|---------|-------|
| 1 (inner) | 240×240 | 38 | #3b82f6 | 0.08 | 1.2 |
| 2 | 360×360 | 58 | #3b82f6 | 0.05 | 0.8 |
| 3 | 480×480 | 76 | #60a5fa | 0.03 | 0.5 |
| 4 (outer) | 620×620 | 98 | #60a5fa | 0.015 | 0.4 |

### Bottom-left cluster (center ~19%, 83%)

| Ring | Size | rx | Stroke color | Opacity | Width |
|------|------|----|-------------|---------|-------|
| 1 (inner) | 160×160 | 25 | #3b82f6 | 0.06 | 0.8 |
| 2 | 260×260 | 42 | #3b82f6 | 0.035 | 0.5 |
| 3 (outer) | 360×360 | 58 | #60a5fa | 0.02 | 0.4 |

All diamonds: `rotate(45deg)`, `fill: none`, `stroke-only`

---

## 4. Data Nodes (network dots)

### Top-right cluster (7 dots + 8 connections)

```
Dots:   r = 1.5–2px, fill #3b82f6/#60a5fa, opacity 0.06–0.12
Lines:  stroke #3b82f6, width 0.4px, opacity 0.03–0.05
```

Positioned around the diamond cluster, offset toward center.

### Bottom-left cluster (3 dots + 2 connections)

Smaller, sparser — balance ไม่ต้องเยอะเท่า top-right.

---

## 5. EKG Pulse Lines

### Main EKG (center horizontal)

```
Y position: 50% of height
Path shape: flat → peak(up) → trough(down) → bump(up) → flat
Stroke:     #3b82f6, width 1.5px, opacity 0.04
Glow:       #60a5fa, width 0.5px, opacity 0.02 (overlay)
Peak dot:   r=6, fill #3b82f6 opacity 0.06
Peak halo:  r=18, fill #3b82f6 opacity 0.02
```

### Secondary EKG upper (~28% from top)

```
Stroke: #1e293b, width 0.6px, opacity 0.45
Shorter wave, smaller amplitude
```

### Secondary EKG lower (~73% from top)

```
Stroke: #1e293b, width 0.5px, opacity 0.35
Shortest wave, smallest amplitude
```

---

## 6. Files

```
assets/brand/
├── aegisx-brand-bg.svg          ← SVG background (ใช้ตรงใน CSS)
├── aegisx-brand-bg.scss         ← SCSS component styles
└── AEGISX-BRAND-BG-SPEC.md     ← ไฟล์นี้
```

---

## 7. Usage

### Login page (Angular)

```html
<div class="ax-login-layout">
  <div class="ax-login-layout__brand">
    <img src="assets/logo/aegisx-logo-horizontal-dark.svg"
         alt="AegisX" width="280" />
  </div>
  <div class="ax-login-layout__form">
    <!-- form content -->
  </div>
</div>
```

```scss
.ax-login-layout__brand {
  background: #0f172a url('/assets/brand/aegisx-brand-bg.svg') center/cover no-repeat;
}
```

### PDF cover (reportlab)

ดู `build-brand-guide-v2.py` — Page 1 section.

### Splash screen

```html
<div class="ax-brand-bg ax-brand-bg--svg">
  <div class="ax-brand-bg__content">
    <img src="assets/logo/aegisx-logo-vertical-dark.svg" />
  </div>
</div>
```

---

## 8. Design Rules

- ทุก element ต้อง **opacity ต่ำมาก** (0.015–0.08) ไม่แย่ง attention จาก content
- Diamond ต้อง **stroke-only** ไม่มี fill — ให้ดูเป็น blueprint/wireframe
- EKG shape ต้อง **flat → peak → trough → bump → flat** เหมือน heartbeat จริง
- Data nodes ต้อง **กระจายรอบ diamond** ไม่เป็นตาราง
- **ห้ามเพิ่ม element อื่น** นอกจาก 4 layers นี้: glow, diamond, nodes, EKG
- ห้ามเปลี่ยนสีหลักจาก blue (#3b82f6/#60a5fa) เป็นสีอื่น
