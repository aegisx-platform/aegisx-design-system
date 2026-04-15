# AegisX Icon System — Complete Summary

> สรุปทั้งหมดจากการออกแบบ icon สำหรับ AegisX Platform
> ใช้เป็น reference ให้ Claude Code implement

---

## 1. สถาปัตยกรรม Icon System

### หลักการ: 1 Icon = 1 SVG File

ทุก icon เป็น **flat mono SVG** ใช้ `stroke="currentColor"` เปลี่ยนสี/shape/ขนาดผ่าน CSS ทั้งหมด ไม่มี SVG แยกตาม variant

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
├── ICON-SIZING-STANDARD.md
└── README.md
```

### SVG Spec มาตรฐาน

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- paths -->
</svg>
```

- ViewBox: `0 0 24 24`
- Effective content area: **2–22** (20px จาก 24px) — ทุกตัวต้อง visual weight สม่ำเสมอ
- Stroke: `currentColor`, width `1.5` (emphasis `2`, detail `1` + `opacity 0.4`)
- Fill: `none` (accent area ใช้ `fill="currentColor" opacity="0.1-0.2"`)

---

## 2. Icon Catalog — 153 Icons ทั้งหมด

### 2.1 Clinical Front Office (30 icons)

| ID | ชื่อไทย | ID | ชื่อไทย |
|---|---|---|---|
| `registration` | ลงทะเบียน | `opd` | ผู้ป่วยนอก |
| `ipd` | ผู้ป่วยใน | `er` (emergency) | ฉุกเฉิน |
| `or-surgery` | ห้องผ่าตัด | `pharmacy` | เภสัชกรรม |
| `laboratory` | ห้องปฏิบัติการ | `radiology` | รังสีวิทยา |
| `dental` | ทันตกรรม | `nursing` | การพยาบาล |
| `rehab` | กายภาพบำบัด | `blood-bank` | ธนาคารเลือด |
| `nutrition` | โภชนาการ | `med-records` | เวชระเบียน |
| `appointment` | นัดหมาย | `queue` | คิว |
| `referral` | ส่งต่อผู้ป่วย | `telehealth` | แพทย์ทางไกล |
| `discharge` | จำหน่ายผู้ป่วย | `checkup` | ตรวจสุขภาพ |
| `icu` | ไอซียู | `hemodialysis` | ไตเทียม |
| `thai-med` | แพทย์แผนไทย | `special-clinic` | คลินิกพิเศษ |
| `home-health` | เยี่ยมบ้าน | `pathology` | พยาธิวิทยา |
| `occupational-health` | อาชีวอนามัย | `maternal` | แม่และเด็ก |
| `social-work` | สังคมสงเคราะห์ | `forensic` | นิติเวช |

### 2.2 Inventory Module (4 sub-apps)

| ID | ชื่อไทย |
|---|---|
| `inv-budget` | งานแผนงบประมาณ |
| `inv-procurement` | จัดซื้อจัดจ้าง |
| `inv-warehouse` | คลังใหญ่ |
| `inv-substore` | คลังย่อย/หน่วยเบิก |

### 2.3 Finance & Billing (9 icons)

| ID | ชื่อไทย | ID | ชื่อไทย |
|---|---|---|---|
| `billing` | การเงินผู้ป่วย | `accounting` | บัญชี |
| `finance` | การเงิน | `nhso` | สปสช. |
| `social-security` | ประกันสังคม | `cgd` | กรมบัญชีกลาง |
| `insurance` | สิทธิ์การรักษา | `cost-center` | ต้นทุน |
| `revenue` | รายรับ-รายจ่าย | | |

### 2.4 Back Office Admin (18 icons)

| ID | ชื่อไทย | ID | ชื่อไทย |
|---|---|---|---|
| `hr` | บุคลากร | `duty-schedule` | ตารางเวร |
| `leave` | ลาออนไลน์ | `ot-manage` | OT/เวรเสริม |
| `general-supply` | พัสดุ/ครุภัณฑ์ | `maintenance` | ซ่อมบำรุง |
| `vehicle` | ยานพาหนะ | `meeting-room` | ห้องประชุม |
| `document` | สารบรรณ/หนังสือเวียน | `laundry` | ซักฟอก |
| `cssd` | จ่ายกลาง | `security` | รปภ. |
| `facilities` | อาคารสถานที่ | `waste` | สิ่งแวดล้อม/ขยะ |
| `training` | อบรม/E-Learning | `cafeteria` | โรงอาหาร |
| `staff-housing` | บ้านพัก | `complaint` | ร้องเรียน |

### 2.5 Quality & Risk (4 icons)

| ID | ชื่อไทย |
|---|---|
| `risk-mgmt` | ความเสี่ยง (RM) |
| `infection-ctrl` | ควบคุมการติดเชื้อ (IC) |
| `quality-ha` | คุณภาพ (HA) |
| `internal-audit` | ตรวจสอบภายใน |

### 2.6 Platform (8 icons)

| ID | ชื่อไทย |
|---|---|
| `platform` | AegisX Platform (EKG pulse = brand) |
| `users` | ผู้ใช้งาน |
| `rbac` | สิทธิ์/บทบาท |
| `settings` | ตั้งค่าระบบ |
| `multi-site` | เครือข่าย รพ. |
| `audit-log` | บันทึกระบบ |
| `api-integration` | เชื่อมต่อ API |
| `dashboard-bi` | แดชบอร์ด/BI |

### 2.7 UI Actions (15 icons)

`act-add`, `act-edit`, `act-delete`, `act-save`, `act-cancel`, `act-print`, `act-filter`, `act-sort`, `act-export`, `act-import`, `act-copy`, `act-duplicate`, `act-more`, `act-refresh`, `act-search`

### 2.8 Status Indicators (8 icons)

`st-active`, `st-pending`, `st-expired`, `st-draft`, `st-locked`, `st-approved`, `st-rejected`, `st-cancelled`

### 2.9 Empty State (5 icons)

`empty-no-data`, `empty-no-results`, `empty-no-permission`, `empty-offline`, `empty-welcome`

### 2.10 File Types (6 icons)

`file-pdf`, `file-excel`, `file-word`, `file-image`, `file-zip`, `file-generic`

### 2.11 Thai Government (6 icons)

`thai-43files`, `thai-e-referral`, `thai-drg`, `thai-icd10`, `thai-moph`, `thai-dmsic`

### 2.12 Notification (4 icons)

`notify-line`, `notify-sms`, `notify-email`, `notify-push`

### 2.13 Error State (11 flat + 10 featured)

Flat: `err-alert-triangle` (400), `err-lock` (401), `err-ban` (403), `err-search` (404), `err-shield-alert` (500), `err-server-crash` (502), `err-wrench` (503), `err-clock` (504), `err-wifi-off` (NETWORK), `err-circle-alert` (DEFAULT), `err-rotate-ccw` (retry button)

Featured (double-ring 60×60 ใน `featured-error/`): same icons แต่มี outer ring + inner circle ตาม Untitled UI pattern สำหรับ `ax-error-state` component

---

## 3. วิธีใช้งาน — 4 รูปแบบ

### 3.1 Flat icon ปกติ (sidebar, table, button)

```html
<mat-icon svgIcon="opd" class="text-emerald-600"></mat-icon>
<mat-icon svgIcon="act-edit" class="text-blue-600 !w-4 !h-4"></mat-icon>
<mat-icon svgIcon="st-approved" class="text-green-600 !w-4 !h-4"></mat-icon>
```

### 3.2 Diamond app icon (dark nav / light app launcher)

ใช้ `<ax-diamond-icon>` component — CSS rotate(45deg) สร้าง diamond shape

```html
<!-- Dark nav header -->
<ax-diamond-icon
  icon="inv-warehouse"
  [bg]="getDiamondColors('inv-warehouse', 'dark').bg"
  [border]="getDiamondColors('inv-warehouse', 'dark').border"
  [iconColor]="getDiamondColors('inv-warehouse', 'dark').stroke"
  size="lg"
/>

<!-- Light app launcher grid -->
<ax-diamond-icon
  icon="inv-warehouse"
  [bg]="getDiamondColors('inv-warehouse', 'light').bg"
  [border]="getDiamondColors('inv-warehouse', 'light').border"
  [iconColor]="getDiamondColors('inv-warehouse', 'light').stroke"
  size="xl"
/>
```

Sizes: `sm` (28px), `md` (32px), `lg` (36px), `xl` (44px)

### 3.3 Tab icon บน dark nav (mono สีเดียว)

Tab ใช้ **slate สีเดียว** ไม่แข่งกับ diamond app icon:

```html
<!-- Active tab: ขาว -->
<mat-icon svgIcon="inv-budget" class="!w-4 !h-4" style="color:#e2e8f0"></mat-icon>
<span class="text-gray-100">งานแผน</span>

<!-- Inactive tab: เทา -->
<mat-icon svgIcon="inv-procurement" class="!w-4 !h-4" style="color:#64748b"></mat-icon>
<span class="text-gray-500">จัดซื้อ</span>
```

### 3.4 Featured icon (Untitled UI empty state / page header)

```html
<div class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
  <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-content">
    <mat-icon svgIcon="opd" class="text-emerald-600 !w-6 !h-6"></mat-icon>
  </div>
</div>
```

---

## 4. Color System

### 4.1 Flat icon สี (ใช้กับ Tailwind class `text-*`)

| Category | Tailwind | ใช้กับ |
|---|---|---|
| `text-blue-600` | Clinical core | Registration, Queue, OPD (alt) |
| `text-emerald-600` | Operations | OPD, Discharge, NHSO, Inventory |
| `text-indigo-600` | Workflow | IPD, Pharmacy, Referral, Reports |
| `text-red-600` | Critical | ER, OR, IC, Risk, Blood Bank |
| `text-cyan-600` | Diagnostics | Lab, CSSD, Telehealth |
| `text-purple-600` | Admin | RBAC, Med Records, Document |
| `text-amber-600` | Finance | Billing, Budget, Audit, Alert |
| `text-teal-600` | HR/Network | HR, Duty, Leave, Rehab, Multi-site |
| `text-pink-600` | Care | Nursing, Maternal, Social Work |
| `text-orange-600` | Procedural | Surgery, Nutrition, Cafeteria |
| `text-slate-600` | Neutral | Settings, X-Ray, Maintenance, Vehicle |
| `text-green-600` | Scheduling | Appointment, Checkup |

### 4.2 Diamond colors (ดูจาก `diamond-color-map.ts`)

ทุก app มี dark + light theme:

```typescript
import { getDiamondColors } from './diamond-color-map';

const dark = getDiamondColors('er', 'dark');
// → { bg: '#991b1b', border: '#ef4444', stroke: '#fca5a5' }

const light = getDiamondColors('er', 'light');
// → { bg: '#fef2f2', border: '#fecaca', stroke: '#dc2626' }
```

### 4.3 Error severity colors

| Severity | Outer ring bg | Inner circle bg | Icon color | HTTP codes |
|---|---|---|---|---|
| `error` | `#FEF3F2` | `#FEE4E2` | `#D92D20` | 403, 500, 502 |
| `warning` | `#FFFAEB` | `#FEF0C7` | `#DC6803` | 400, 401, 504 |
| `info` | `#EFF8FF` | `#D1E9FF` | `#1570EF` | 503 (maintenance) |
| `neutral` | `#F9FAFB` | `#F2F4F7` | `#667085` | 404, NETWORK |

---

## 5. Icon Registration (ทำครั้งเดียว)

```typescript
// app.config.ts หรือ AppComponent
import { AegisxIconRegistry } from '@aegisx/shared/ui/icons';

export class AppComponent {
  private iconRegistry = inject(AegisxIconRegistry);
  constructor() {
    this.iconRegistry.registerDrugInventoryIcons();
    // registers all 153 icons from assets/icons/
  }
}
```

### SVG Sprite alternative (ถ้าต้องการ performance)

```html
<!-- โหลด sprite ครั้งเดียว (ใส่ใน index.html หรือ app component) -->
<div style="display:none" [innerHTML]="spriteContent"></div>

<!-- ใช้ทุกที่ -->
<svg width="20" height="20"><use href="#ax-opd"/></svg>
<svg width="16" height="16"><use href="#ax-act-edit"/></svg>
```

---

## 6. File Structure ที่ต้องวาง

```
src/assets/icons/
├── *.svg                     ← 153 flat icons จาก svg/
├── featured-error/*.svg      ← 10 error icons
└── aegisx-icons.svg          ← sprite file

libs/shared/ui/icons/src/lib/
├── aegisx-icon-registry.ts   ← MatIconRegistry service
├── icon-color-map.ts         ← flat icon color mapping + helpers
├── diamond-color-map.ts      ← diamond dark/light colors ทุก app
├── ax-diamond-icon.component.ts  ← CSS diamond wrapper component
└── index.ts                  ← public API exports
```

---

## 7. Design Rules สำหรับเพิ่ม Icon ใหม่

1. **ViewBox 24×24** — content area 2–22 เสมอ
2. **stroke="currentColor"** — ห้าม hardcode สี
3. **stroke-width 1.5** — emphasis 2, detail 1
4. **Round cap/join** — ดูนุ่มนวล
5. **Max 3-4 shapes** — จำได้ที่ 16px
6. **ชื่อ kebab-case** — `inv-warehouse.svg`
7. **Visual weight check** — วางข้างตัวอื่นดูก่อน commit
8. **เพิ่ม entry ใน** `icon-color-map.ts` + `diamond-color-map.ts`
9. **ลงทะเบียนใน** `aegisx-icon-registry.ts`

---

## 8. AegisX Logo (แยกจาก icon system)

- Diamond 45° + EKG heartbeat pulse line
- สี: navy `#0f172a` + blue `#3b82f6` + glow `#60a5fa`
- Font: IBM Plex Sans 700, letter-spacing 0.06em
- 4 variants: `icon-light`, `icon-dark`, `horizontal-light`, `horizontal-dark`
- Refined: subtle stroke border `#2a5a8f`, EKG glow line, peak dot halo
- EKG pulse = **AegisX Platform logo เท่านั้น** ไม่ใช้กับ module icons อื่น
