# AegisX Drug Inventory Icons

ชุด icon SVG 24 ตัวสำหรับระบบคลังยา AegisX Platform  
ออกแบบตาม **Clean Clinical SaaS** design language

## Quick Start

### 1. วางไฟล์ icon

```
src/assets/icons/drug-inventory/
├── drug-master.svg
├── purchase-requisition.svg
├── purchase-order.svg
├── goods-receive.svg
├── dispensing.svg
├── zone-picking.svg
├── wave-picking.svg
├── delivery.svg
├── stock-overview.svg
├── bin-location.svg
├── fefo-expiry.svg
├── auth-lock.svg
├── ven-abc.svg
├── budget-ledger.svg
├── transfer.svg
├── barcode-scan.svg
├── lot-tracking.svg
├── tmt-catalog.svg
├── supplier.svg
├── stock-count.svg
├── drug-return.svg
├── dashboard.svg
├── alert.svg
└── drug-interaction.svg
```

### 2. ลงทะเบียน icon (ทำครั้งเดียว)

```typescript
// app.component.ts
import { AegisxIconRegistry } from '@aegisx/shared/ui/icons';

export class AppComponent {
  private iconRegistry = inject(AegisxIconRegistry);

  constructor() {
    this.iconRegistry.registerDrugInventoryIcons();
  }
}
```

### 3. ใช้งานใน template

```html
<!-- ขนาด default 24px สีตาม parent -->
<mat-icon svgIcon="drug-master"></mat-icon>

<!-- กำหนดสี -->
<mat-icon svgIcon="goods-receive" class="text-success-600"></mat-icon>
<mat-icon svgIcon="fefo-expiry" class="text-error-600"></mat-icon>
<mat-icon svgIcon="alert" class="text-warning-600"></mat-icon>

<!-- ขนาดเล็ก 16px (sidebar) -->
<mat-icon svgIcon="stock-overview" class="!w-4 !h-4 text-gray-500"></mat-icon>

<!-- ขนาดใหญ่ 32px (page header) -->
<mat-icon svgIcon="dispensing" class="!w-8 !h-8 text-brand-600"></mat-icon>
```

## Icon Reference

| Icon | Name | ภาษาไทย | ใช้ใน |
|------|------|---------|-------|
| 💊 | `drug-master` | ข้อมูลยา GP/Trade | Drug Master Data page |
| 📋 | `purchase-requisition` | ใบขอซื้อ | PR list, PR form |
| 📄 | `purchase-order` | ใบสั่งซื้อ | PO list, PO form |
| 📦 | `goods-receive` | รับเข้าคลัง | GR workflow |
| 💉 | `dispensing` | เบิก-จ่ายยา | Requisition/Dispensing |
| 🔲 | `zone-picking` | หยิบยาตามโซน | Zone Picking UI |
| 🌊 | `wave-picking` | หยิบแบบ Wave | Wave Picking UI |
| 🚚 | `delivery` | จัดส่งยา | Delivery Scheduling |
| 📊 | `stock-overview` | ภาพรวมสต็อก | Stock Dashboard |
| 🗄️ | `bin-location` | ตำแหน่งจัดเก็บ | Warehouse/Bin config |
| ⏰ | `fefo-expiry` | วันหมดอายุ | FEFO alerts, Expiry list |
| 🔒 | `auth-lock` | สิทธิ์ยาจำกัด | Drug Authorization Lock |
| 📈 | `ven-abc` | วิเคราะห์ VEN/ABC | Analysis reports |
| 💰 | `budget-ledger` | งบประมาณ | Budget journal |
| 🔄 | `transfer` | โอนย้ายยา | Inter-warehouse transfer |
| 📱 | `barcode-scan` | สแกนบาร์โค้ด | Scan dialog, GR scan |
| 🏷️ | `lot-tracking` | ติดตาม Lot | Lot selection, LOT list |
| 📕 | `tmt-catalog` | บัญชียา TMT | TMT drug catalog |
| 🏢 | `supplier` | บริษัทผู้จำหน่าย | Supplier management |
| ✅ | `stock-count` | ตรวจนับสต็อก | Physical count |
| ↩️ | `drug-return` | คืนยา | Return to supplier |
| 📊 | `dashboard` | รายงาน | Reports/Dashboard |
| 🔔 | `alert` | แจ้งเตือนยา | Notifications |
| ⚠️ | `drug-interaction` | ยาตีกัน | Interaction check |

## Design Specs

- **ViewBox**: `0 0 24 24`
- **Stroke**: `currentColor`, width `1.5px`
- **Line cap/join**: `round`
- **Fill**: `none` (ใช้ `currentColor` opacity `0.1-0.2` สำหรับ accent area)
- **Style**: Stroke-based, consistent with Lucide/Heroicons

## สี Semantic ที่แนะนำ

```scss
// Sidebar navigation (inactive)
.nav-icon { @apply text-gray-400; }

// Sidebar navigation (active)
.nav-icon--active { @apply text-brand-600; }

// Page header icon
.page-icon { @apply text-gray-700; }

// Status: success
.status-icon--success { @apply text-success-600; }

// Status: warning (expiry, low stock)
.status-icon--warning { @apply text-warning-600; }

// Status: error (expired, auth locked)
.status-icon--danger { @apply text-error-600; }

// Status: info
.status-icon--info { @apply text-blue-600; }
```
