# AegisX Icon System — Claude Code Skill

## Purpose

ให้ Claude Code รู้จัก icon set ทั้งหมดของ AegisX Platform, ใช้ชื่อ icon ถูกต้องเวลาสร้าง UI, สร้าง icon ใหม่ตาม pattern เดียวกัน, และ map สีตาม semantic category

## File Locations

```
src/assets/icons/
├── svg/                  ← mono icons (currentColor)
├── svg-colored/          ← colored icons (fixed hex)
libs/shared/ui/icons/src/lib/
├── aegisx-icon-registry.ts   ← MatIconRegistry service
├── icon-color-map.ts         ← color/category mapping + helpers
```

## Usage in Templates

```html
<!-- Basic (inherits parent color) -->
<mat-icon svgIcon="drug-master"></mat-icon>

<!-- With color class -->
<mat-icon svgIcon="emergency" class="text-red-600"></mat-icon>

<!-- Featured icon (colored bg circle + icon) — Untitled UI pattern -->
<div class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600">
  <mat-icon svgIcon="drug-master" class="!w-5 !h-5"></mat-icon>
</div>

<!-- Using helper (preferred) -->
<div [class]="getIconClasses('drug-master')">
  <mat-icon svgIcon="drug-master"></mat-icon>
</div>

<!-- Sizes: 16px sidebar, 20px default, 24px header, 32px hero -->
<mat-icon svgIcon="opd" class="!w-4 !h-4"></mat-icon>   <!-- sidebar -->
<mat-icon svgIcon="opd"></mat-icon>                       <!-- default -->
<mat-icon svgIcon="opd" class="!w-8 !h-8"></mat-icon>   <!-- hero -->
```

## Icon Registry Setup

เรียกครั้งเดียวใน AppComponent:

```typescript
import { AegisxIconRegistry } from '@aegisx/shared/ui/icons';

export class AppComponent {
  private iconRegistry = inject(AegisxIconRegistry);
  constructor() {
    this.iconRegistry.registerDrugInventoryIcons();
  }
}
```

## Complete Icon Catalog

### Platform Management

| Name | Thai | Color | Hex | Use Case |
|------|------|-------|-----|----------|
| `users` | จัดการผู้ใช้ | blue-600 | #2563eb | User management, user list |
| `rbac` | สิทธิ์/บทบาท | purple-600 | #9333ea | Roles, permissions, access control |
| `organization` | โครงสร้างองค์กร | emerald-600 | #059669 | Hospital org, departments |
| `settings` | ตั้งค่าระบบ | slate-600 | #475569 | System config, preferences |
| `audit-log` | บันทึกการใช้งาน | yellow-700 | #a16207 | Activity log, change history |
| `monitoring` | สถานะระบบ | emerald-600 | #059669 | System health, uptime |
| `integration` | เชื่อมต่อ API | indigo-600 | #4f46e5 | API config, webhooks |
| `multi-site` | เครือข่าย รพ. | teal-600 | #0d9488 | Hospital network, sites |

### Hospital App Modules

| Name | Thai | Color | Hex | Use Case |
|------|------|-------|-----|----------|
| `registration` | ลงทะเบียน | blue-600 | #2563eb | Patient registration |
| `opd` | ผู้ป่วยนอก | emerald-600 | #059669 | OPD clinic, encounter |
| `ipd` | ผู้ป่วยใน | indigo-600 | #4f46e5 | Ward, admission |
| `emergency` | ฉุกเฉิน | red-600 | #dc2626 | ER, triage |
| `laboratory` | ห้องปฏิบัติการ | cyan-600 | #0891b2 | Lab orders, results |
| `radiology` | รังสีวิทยา | slate-600 | #475569 | X-ray, CT, MRI |
| `pharmacy` | เภสัชกรรม | blue-600 | #2563eb | Prescription, dispensing |
| `surgery` | ห้องผ่าตัด | orange-600 | #ea580c | OR scheduling |
| `med-records` | เวชระเบียน | purple-600 | #9333ea | Charts, medical records |
| `billing` | การเงิน | yellow-600 | #ca8a04 | Billing, payment |
| `blood-bank` | ธนาคารเลือด | red-600 | #dc2626 | Blood products |
| `dental` | ทันตกรรม | sky-600 | #0284c7 | Dental clinic |
| `rehab` | กายภาพบำบัด | teal-600 | #0d9488 | PT, OT, rehab |
| `nutrition` | โภชนาการ | orange-600 | #ea580c | Diet, meal planning |
| `referral` | ส่งต่อผู้ป่วย | indigo-600 | #4f46e5 | Patient transfer |
| `nursing` | บันทึกพยาบาล | pink-600 | #db2777 | Nursing notes, care plan |
| `infection-control` | ควบคุมการติดเชื้อ | red-600 | #dc2626 | IC surveillance |
| `discharge` | จำหน่ายผู้ป่วย | emerald-600 | #059669 | Discharge summary |
| `telehealth` | แพทย์ทางไกล | cyan-600 | #0891b2 | Video consult |
| `appointment` | นัดหมาย | green-600 | #16a34a | Scheduling |
| `queue` | คิวรอตรวจ | blue-600 | #2563eb | Queue management |
| `kiosk` | ตู้บริการตนเอง | slate-600 | #475569 | Self-service kiosk |
| `nhso-claims` | ส่งเบิก สปสช. | emerald-600 | #059669 | NHSO eclaim |

### Platform Tools

| Name | Thai | Color | Hex | Use Case |
|------|------|-------|-----|----------|
| `report-builder` | สร้างรายงาน | indigo-600 | #4f46e5 | Custom reports |
| `migration` | โอนข้อมูล | cyan-600 | #0891b2 | Data migration wizard |
| `notifications` | ศูนย์แจ้งเตือน | amber-600 | #d97706 | Notification center |
| `help-center` | คู่มือ/ช่วยเหลือ | slate-500 | #64748b | Docs, FAQ |

### Drug Inventory Module

| Name | Thai | Color | Hex | Use Case |
|------|------|-------|-----|----------|
| `drug-master` | ข้อมูลยา GP/Trade | blue-600 | #2563eb | Drug master data |
| `tmt-catalog` | บัญชียา TMT | emerald-600 | #059669 | TMT drug catalog |
| `supplier` | ผู้จำหน่าย | green-600 | #16a34a | Supplier management |
| `lot-tracking` | ติดตาม Lot | violet-600 | #7c3aed | Lot/batch tracking |
| `purchase-requisition` | ใบขอซื้อ (PR) | indigo-500 | #6366f1 | PR workflow |
| `purchase-order` | ใบสั่งซื้อ (PO) | blue-500 | #3b82f6 | PO workflow |
| `budget-ledger` | งบประมาณ | yellow-600 | #ca8a04 | Budget journal DR/CR |
| `goods-receive` | รับเข้าคลัง (GR) | emerald-500 | #10b981 | Goods receiving |
| `bin-location` | ตำแหน่งจัดเก็บ | violet-600 | #7c3aed | Warehouse bin config |
| `stock-overview` | ภาพรวมสต็อก | blue-600 | #2563eb | Stock dashboard |
| `stock-count` | ตรวจนับสต็อก | orange-600 | #ea580c | Physical count |
| `transfer` | โอนย้ายยา | blue-600 | #2563eb | Inter-warehouse transfer |
| `drug-return` | คืนยา | red-600 | #dc2626 | Return to supplier |
| `zone-picking` | หยิบตามโซน | indigo-500 | #6366f1 | Zone picking UI |
| `wave-picking` | หยิบแบบ Wave | cyan-600 | #0891b2 | Wave picking UI |
| `delivery` | จัดส่งยา | emerald-600 | #059669 | Delivery scheduling |
| `dispensing` | เบิก-จ่ายยา | amber-600 | #d97706 | Requisition/dispensing |
| `auth-lock` | สิทธิ์ยาจำกัด | red-600 | #dc2626 | Drug authorization lock |
| `fefo-expiry` | วันหมดอายุ | red-500 | #ef4444 | FEFO alerts, expiry |
| `drug-interaction` | ยาตีกัน | red-600 | #dc2626 | Interaction check |
| `barcode-scan` | สแกนบาร์โค้ด | slate-600 | #475569 | Barcode scan dialog |
| `dashboard` | รายงาน/แดชบอร์ด | indigo-600 | #4f46e5 | Reports dashboard |
| `alert` | แจ้งเตือนยา | amber-600 | #d97706 | Drug alerts |
| `ven-abc` | วิเคราะห์ VEN/ABC | teal-600 | #0d9488 | VEN/ABC analysis |

## Color Semantic Rules

เมื่อเลือกสีให้ icon ใหม่ ให้ยึดตาม semantic mapping นี้:

| Color Family | Hex Range | ใช้กับ |
|---|---|---|
| **Blue** (#2563eb) | blue-500..600 | Clinical core: OPD, Registration, Pharmacy, Queue |
| **Emerald/Green** (#059669, #10b981, #16a34a) | emerald/green-500..600 | Operations: GR, Delivery, Discharge, Monitoring, NHSO |
| **Purple/Violet** (#9333ea, #7c3aed) | purple/violet-600 | Admin & Security: RBAC, Lot, Bin, Med Records |
| **Red** (#dc2626, #ef4444) | red-500..600 | Critical/Safety: Emergency, Auth Lock, Expiry, IC, Blood Bank |
| **Yellow/Amber** (#ca8a04, #d97706) | yellow/amber-600..700 | Finance & Alerts: Billing, Budget, Alert, Notifications |
| **Cyan** (#0891b2) | cyan-600 | Diagnostics & Tech: Lab, Telehealth, Migration, Wave Picking |
| **Orange** (#ea580c) | orange-600 | Procedural: Surgery, Nutrition, Stock Count |
| **Indigo** (#4f46e5, #6366f1) | indigo-500..600 | Workflow & Integration: PR, Zone Picking, Referral, Reports |
| **Teal** (#0d9488) | teal-600 | Analysis & Network: VEN/ABC, Multi-site, Rehab |
| **Pink** (#db2777) | pink-600 | Nursing & Care |
| **Slate** (#475569, #64748b) | slate-500..600 | Neutral/Utility: Settings, Barcode, Radiology, Kiosk, Help |

## SVG Design Spec (สำหรับสร้าง icon ใหม่)

ทุก icon ต้องเป็นไปตาม spec นี้:

```
ViewBox:        0 0 24 24
Stroke:         currentColor
Stroke-width:   1.5
Stroke-linecap: round
Stroke-linejoin: round
Fill:           none (default)
```

### Rules

1. **Stroke-based เท่านั้น** — ไม่ใช้ filled icons เป็นหลัก
2. **fill ใช้แค่ accent** — `fill="currentColor" opacity="0.1..0.2"` สำหรับ highlight area เล็กๆ เช่น badge dot, selected zone
3. **ความหนา stroke เดียว** — ใช้ 1.5 ทั้ง icon, ยกเว้น emphasis ใช้ stroke-width="2" ได้ (เช่น checkmark, arrow)
4. **ไม่ซับซ้อนเกิน** — ควรจำได้ที่ขนาด 16px, max 3-4 main shapes
5. **Round cap/join เสมอ** — ให้ดูนุ่มนวล ไม่คม
6. **Opacity สำหรับ secondary elements** — ใช้ `opacity="0.4..0.5"` สำหรับ detail lines
7. **ชื่อไฟล์ kebab-case** — `drug-master.svg`, `zone-picking.svg`

### Template สำหรับ icon ใหม่

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- main shape -->
  <!-- detail lines (opacity 0.4-0.5 for secondary) -->
  <!-- accent fill (currentColor opacity 0.1-0.2 for highlight area) -->
</svg>
```

### Colored Version

สร้าง colored version โดย replace `currentColor` → hex color:

```bash
sed 's/currentColor/#2563eb/g' svg/new-icon.svg > svg-colored/new-icon.svg
```

### Register Icon ใหม่

1. เพิ่มชื่อใน `DRUG_INVENTORY_ICONS` array ใน `aegisx-icon-registry.ts`
2. เพิ่ม entry ใน `ICON_COLOR_MAP` ใน `icon-color-map.ts`
3. วาง SVG file ใน `src/assets/icons/drug-inventory/`

## Helper Functions

```typescript
import { getIconClasses, getIconsByCategory, ICON_COLOR_MAP } from '@aegisx/shared/ui/icons';

// Featured icon classes (returns Tailwind classes string)
getIconClasses('drug-master')        // → 'inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600'
getIconClasses('emergency', 'lg')    // → '... w-12 h-12 rounded-xl bg-red-50 text-red-600'
getIconClasses('settings', 'sm')     // → '... w-8 h-8 rounded-md bg-slate-50 text-slate-600'

// Filter by category
getIconsByCategory('platform')   // → ['users', 'rbac', 'organization', ...]
getIconsByCategory('clinical')   // → ['registration', 'opd', 'ipd', ...]
getIconsByCategory('inventory')  // → ['drug-master', 'tmt-catalog', ...]

// Direct access
ICON_COLOR_MAP['emergency'].hex       // → '#dc2626'
ICON_COLOR_MAP['emergency'].tailwind  // → 'text-red-600'
ICON_COLOR_MAP['emergency'].bg        // → 'bg-red-50'
ICON_COLOR_MAP['emergency'].category  // → 'clinical'
```

## Context Patterns

### Sidebar Navigation

```html
<a [routerLink]="['/inventory']" routerLinkActive="bg-gray-800 text-white">
  <mat-icon svgIcon="stock-overview" class="!w-5 !h-5 mr-3"></mat-icon>
  <span>คลังยา</span>
</a>
```

### Page Header

```html
<div class="flex items-center gap-3">
  <div [class]="getIconClasses('goods-receive', 'lg')">
    <mat-icon svgIcon="goods-receive" class="!w-6 !h-6"></mat-icon>
  </div>
  <div>
    <h1 class="text-lg font-semibold text-gray-900">รับเข้าคลัง</h1>
    <p class="text-sm text-gray-500">Goods Receiving</p>
  </div>
</div>
```

### Empty State

```html
<div class="text-center py-12">
  <div [class]="getIconClasses('drug-master', 'lg')" class="mx-auto mb-4">
    <mat-icon svgIcon="drug-master" class="!w-6 !h-6"></mat-icon>
  </div>
  <h3 class="text-md font-semibold text-gray-900">ยังไม่มีข้อมูลยา</h3>
  <p class="text-sm text-gray-500 mt-1">เพิ่มข้อมูลยาตัวแรกเพื่อเริ่มต้นใช้งาน</p>
  <button mat-flat-button color="primary" class="mt-4">เพิ่มข้อมูลยา</button>
</div>
```

### Status Badge with Icon

```html
<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
  <mat-icon svgIcon="fefo-expiry" class="!w-3.5 !h-3.5"></mat-icon>
  ใกล้หมดอายุ
</span>
```

### App Launcher / Module Grid

```html
<div class="grid grid-cols-4 gap-4">
  @for (app of apps; track app.name) {
    <a [routerLink]="app.route"
       class="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
      <div [class]="getIconClasses(app.icon, 'lg')">
        <mat-icon [svgIcon]="app.icon" class="!w-6 !h-6"></mat-icon>
      </div>
      <span class="text-sm font-medium text-gray-700">{{ app.label }}</span>
    </a>
  }
</div>
```
