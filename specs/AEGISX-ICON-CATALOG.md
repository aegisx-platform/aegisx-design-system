# AegisX Hospital Platform — Complete App Icon Catalog

รวม icon ทุกระบบของ รพ.ไทย ทั้ง Front Office, Inventory, Finance, Back Office, Quality, Platform
ทุกตัวใช้ **diamond 45° shape** เป็น brand identity ของ AegisX

## Icon Format

ทุก icon มี 2 version:
- **Dark nav** — ใช้บน dark header (bg เข้ม + stroke สีอ่อน)
- **Light app** — ใช้บน light background (bg อ่อน + stroke สีเข้ม)

### SVG Template

```svg
<!-- Dark nav version (42x42) -->
<svg width="42" height="42" viewBox="0 0 42 42">
  <g transform="translate(21,21) rotate(45)">
    <rect x="-16" y="-16" width="32" height="32" rx="7"
          fill="{bg_dark}" stroke="{accent}" stroke-width="0.5" opacity="0.4"/>
  </g>
  <g transform="translate(21,21)">
    <!-- icon paths with stroke="{stroke_light}" -->
  </g>
</svg>

<!-- Light app version (48x48) -->
<svg width="48" height="48" viewBox="0 0 48 48">
  <g transform="translate(24,24) rotate(45)">
    <rect x="-18" y="-18" width="36" height="36" rx="8"
          fill="{bg_light}" stroke="{accent}" stroke-width="0.5" opacity="0.3"/>
  </g>
  <g transform="translate(24,24)">
    <!-- icon paths with stroke="{stroke_dark}" -->
  </g>
</svg>
```

---

## 1. CLINICAL FRONT OFFICE (24 apps)

| # | ID | ชื่อไทย | English | สี | bg_dark | bg_light | Icon คำอธิบาย |
|---|---|---------|---------|-----|---------|----------|---------------|
| 1 | `registration` | ลงทะเบียน | Registration | Blue | #1e3a5f | #eff6ff | User + plus sign |
| 2 | `opd` | ผู้ป่วยนอก | OPD | Emerald | #059669 | #ecfdf5 | Hospital building + door |
| 3 | `ipd` | ผู้ป่วยใน | IPD | Indigo | #312e81 | #eef2ff | Bed + medical cross |
| 4 | `er` | ฉุกเฉิน | Emergency | Red | #991b1b | #fef2f2 | EKG pulse line (urgent) |
| 5 | `or-surgery` | ห้องผ่าตัด | Surgery/OR | Red-dark | #7f1d1d | #fef2f2 | Surgical light + scalpel |
| 6 | `pharmacy` | เภสัชกรรม | Pharmacy | Indigo | #4338ca | #eef2ff | Rx bottle + cross |
| 7 | `laboratory` | ห้องปฏิบัติการ | Laboratory | Cyan | #155e75 | #ecfeff | Flask/test tube |
| 8 | `radiology` | รังสีวิทยา | Radiology | Slate | #334155 | #f8fafc | X-ray frame + body |
| 9 | `dental` | ทันตกรรม | Dental | Sky | #075985 | #f0f9ff | Tooth shape |
| 10 | `nursing` | การพยาบาล | Nursing | Pink | #831843 | #fdf2f8 | Heart + cross |
| 11 | `rehab` | กายภาพบำบัด | Rehab/PT | Teal | #134e4a | #f0fdfa | Person stretching |
| 12 | `blood-bank` | ธนาคารเลือด | Blood Bank | Red | #7f1d1d | #fef2f2 | Blood drop + cross |
| 13 | `nutrition` | โภชนาการ | Nutrition | Orange | #7c2d12 | #fff7ed | Cup + steam |
| 14 | `med-records` | เวชระเบียน | Medical Records | Purple | #581c87 | #faf5ff | Book/folder + lines |
| 15 | `appointment` | นัดหมาย | Appointment | Green | #166534 | #f0fdf4 | Calendar + check |
| 16 | `queue` | คิว | Queue | Blue | #1e3a5f | #eff6ff | Stacked bars (001) |
| 17 | `referral` | ส่งต่อผู้ป่วย | Referral | Indigo | #312e81 | #eef2ff | Two circles + arrow |
| 18 | `telehealth` | แพทย์ทางไกล | Telehealth | Cyan | #155e75 | #ecfeff | Monitor + camera dot |
| 19 | `discharge` | จำหน่ายผู้ป่วย | Discharge | Emerald | #059669 | #ecfdf5 | Door + arrow out |
| 20 | `checkup` | ตรวจสุขภาพ | Health Checkup | Green | #166534 | #f0fdf4 | Clipboard + heart |
| 21 | `icu` | ไอซียู/ซีซียู | ICU/CCU | Red | #991b1b | #fef2f2 | Monitor + heartbeat |
| 22 | `hemodialysis` | ไตเทียม | Hemodialysis | Blue | #1e3a5f | #eff6ff | Kidney + cycle arrows |
| 23 | `thai-med` | แพทย์แผนไทย | Thai Traditional | Emerald | #065f46 | #ecfdf5 | Mortar & pestle |
| 24 | `special-clinic` | คลินิกพิเศษ | Special Clinic | Indigo | #4338ca | #eef2ff | Star + stethoscope |

---

## 2. INVENTORY MODULE (4 apps)

| # | ID | ชื่อไทย | English | สี | bg_dark | bg_light | Icon คำอธิบาย |
|---|---|---------|---------|-----|---------|----------|---------------|
| 25 | `inv-budget` | งานแผนงบประมาณ | Budget Planning | Emerald-dark | #065f46 | #ecfdf5 | Ledger table DR/CR |
| 26 | `inv-procurement` | จัดซื้อจัดจ้าง | Procurement | Blue | #1e3a5f | #eff6ff | Cart + checkmark |
| 27 | `inv-warehouse` | คลังใหญ่ | Main Warehouse | Indigo | #4338ca | #eef2ff | 3D box (isometric) |
| 28 | `inv-substore` | คลังย่อย/หน่วยเบิก | Sub-store | Orange | #7c2d12 | #fff7ed | Small box + split arrow |

---

## 3. FINANCE & BILLING (9 apps)

| # | ID | ชื่อไทย | English | สี | bg_dark | bg_light | Icon คำอธิบาย |
|---|---|---------|---------|-----|---------|----------|---------------|
| 29 | `billing` | การเงินผู้ป่วย | Patient Billing | Amber | #92400e | #fffbeb | Credit card + receipt |
| 30 | `accounting` | บัญชี | Accounting | Amber-dark | #713f12 | #fefce8 | Ledger T-account |
| 31 | `finance` | การเงิน | Finance | Amber | #854d0e | #fffbeb | ฿ baht symbol in circle |
| 32 | `nhso` | สปสช. | NHSO (UC) | Emerald | #065f46 | #ecfdf5 | Shield + medical cross |
| 33 | `social-security` | ประกันสังคม | Social Security | Blue | #1e3a5f | #eff6ff | Shield + person |
| 34 | `cgd` | กรมบัญชีกลาง | CGD (Gov Officer) | Blue-dark | #1e3a5f | #eff6ff | Government building |
| 35 | `insurance` | สิทธิ์การรักษา | Insurance/Rights | Blue | #1e3a5f | #eff6ff | Shield + checkmark |
| 36 | `cost-center` | ต้นทุนบริการ | Cost Center | Amber | #92400e | #fffbeb | Pie chart + ฿ |
| 37 | `revenue` | รายรับ-รายจ่าย | Revenue/Expense | Amber-dark | #713f12 | #fefce8 | Up/down arrows + coins |

---

## 4. BACK OFFICE — ADMIN (18 apps)

| # | ID | ชื่อไทย | English | สี | bg_dark | bg_light | Icon คำอธิบาย |
|---|---|---------|---------|-----|---------|----------|---------------|
| 38 | `hr` | บุคลากร | HR | Teal | #134e4a | #f0fdfa | Two people |
| 39 | `duty-schedule` | ตารางเวร | Duty Schedule | Teal | #134e4a | #f0fdfa | Calendar grid + clock |
| 40 | `leave` | ลาออนไลน์ | Leave Management | Teal | #134e4a | #f0fdfa | Calendar + person away |
| 41 | `ot-manage` | OT/เวรเสริม | OT Management | Teal | #134e4a | #f0fdfa | Clock + plus |
| 42 | `general-supply` | พัสดุ/ครุภัณฑ์ | General Supply | Blue | #1e3a5f | #eff6ff | Warehouse + boxes |
| 43 | `maintenance` | ซ่อมบำรุง | Maintenance | Slate | #334155 | #f8fafc | Wrench + gear |
| 44 | `vehicle` | ยานพาหนะ | Vehicle/Fleet | Slate | #334155 | #f8fafc | Car/ambulance |
| 45 | `meeting-room` | ห้องประชุม | Meeting Room | Indigo | #312e81 | #eef2ff | Table + people |
| 46 | `document` | สารบรรณ/หนังสือเวียน | Document Circulation | Purple | #581c87 | #faf5ff | Envelope + arrows |
| 47 | `laundry` | ซักฟอก | Laundry | Blue | #1e3a5f | #eff6ff | Washing machine |
| 48 | `cssd` | จ่ายกลาง (CSSD) | Central Sterile | Cyan | #155e75 | #ecfeff | Sterilization pack |
| 49 | `security` | รักษาความปลอดภัย | Security | Slate | #334155 | #f8fafc | Shield + key |
| 50 | `facilities` | อาคารสถานที่ | Facilities | Slate | #334155 | #f8fafc | Building + wrench |
| 51 | `waste` | สิ่งแวดล้อม/ขยะ | Waste/Environment | Emerald | #065f46 | #ecfdf5 | Recycle + biohazard |
| 52 | `training` | อบรม/E-Learning | Training | Indigo | #4338ca | #eef2ff | Graduation cap + screen |
| 53 | `cafeteria` | โรงอาหาร | Cafeteria | Orange | #7c2d12 | #fff7ed | Fork + knife |
| 54 | `staff-housing` | บ้านพัก/ห้องพัก | Staff Housing | Blue | #1e3a5f | #eff6ff | House + bed |
| 55 | `complaint` | ร้องเรียน/เสนอแนะ | Complaints/Feedback | Amber | #92400e | #fffbeb | Chat bubble + ! |

---

## 5. QUALITY & RISK (4 apps)

| # | ID | ชื่อไทย | English | สี | bg_dark | bg_light | Icon คำอธิบาย |
|---|---|---------|---------|-----|---------|----------|---------------|
| 56 | `risk-mgmt` | ความเสี่ยง (RM) | Risk Management | Red | #991b1b | #fef2f2 | Triangle ! warning |
| 57 | `infection-ctrl` | ควบคุมการติดเชื้อ | Infection Control | Red | #991b1b | #fef2f2 | Virus + shield |
| 58 | `quality-ha` | คุณภาพ (HA) | Quality/HA | Emerald | #065f46 | #ecfdf5 | Star + checkmark |
| 59 | `internal-audit` | ตรวจสอบภายใน | Internal Audit | Amber | #713f12 | #fefce8 | Magnifying glass + doc |

---

## 6. PLATFORM (8 apps)

| # | ID | ชื่อไทย | English | สี | bg_dark | bg_light | Icon คำอธิบาย |
|---|---|---------|---------|-----|---------|----------|---------------|
| 60 | `platform` | AegisX Platform | Platform (Home) | Blue | #1e3a5f | #eff6ff | EKG pulse (brand) |
| 61 | `users` | ผู้ใช้งาน | Users | Blue | #1e3a5f | #eff6ff | Person + person |
| 62 | `rbac` | สิทธิ์/บทบาท | RBAC | Purple | #581c87 | #faf5ff | Shield + checkmark |
| 63 | `settings` | ตั้งค่าระบบ | Settings | Slate | #334155 | #f8fafc | Gear |
| 64 | `multi-site` | เครือข่าย รพ. | Multi-site | Teal | #134e4a | #f0fdfa | Globe |
| 65 | `audit-log` | บันทึกระบบ | Audit Log | Amber | #713f12 | #fefce8 | Clock + list |
| 66 | `api-integration` | เชื่อมต่อ API | API/Integration | Indigo | #312e81 | #eef2ff | Plug + arrow |
| 67 | `dashboard-bi` | แดชบอร์ด/BI | Dashboard/BI | Indigo | #312e81 | #eef2ff | Chart panels grid |

---

## Color System Summary

| Category | Primary Color | bg_dark | bg_light | Used For |
|----------|--------------|---------|----------|----------|
| **Blue** | #3b82f6 | #1e3a5f | #eff6ff | Clinical core, Registration, Queue |
| **Emerald** | #10b981 | #065f46 | #ecfdf5 | OPD, Discharge, NHSO, Quality |
| **Indigo** | #6366f1 | #312e81/#4338ca | #eef2ff | IPD, Pharmacy, Special, Meetings |
| **Red** | #ef4444 | #991b1b/#7f1d1d | #fef2f2 | ER, OR, IC, Risk, Blood Bank |
| **Cyan** | #06b6d4 | #155e75 | #ecfeff | Lab, CSSD, Telehealth |
| **Purple** | #a855f7 | #581c87 | #faf5ff | Med Records, Document, RBAC |
| **Amber** | #f59e0b | #92400e/#713f12 | #fffbeb/#fefce8 | Finance, Billing, Audit, Complaints |
| **Teal** | #14b8a6 | #134e4a | #f0fdfa | HR, Duty, Leave, Rehab, Multi-site |
| **Pink** | #ec4899 | #831843 | #fdf2f8 | Nursing |
| **Orange** | #f97316 | #7c2d12 | #fff7ed | Nutrition, Sub-store, Cafeteria |
| **Slate** | #64748b | #334155 | #f8fafc | X-Ray, Maintenance, Vehicle, Settings |
| **Sky** | #0ea5e9 | #075985 | #f0f9ff | Dental |
| **Green** | #22c55e | #166534 | #f0fdf4 | Appointment, Checkup |

---

## Usage Guide

### Dark navbar (app icon ตรง header)
```html
<div class="w-[42px] h-[42px] flex items-center justify-center">
  <svg width="42" height="42" viewBox="0 0 42 42">
    <g transform="translate(21,21) rotate(45)">
      <rect x="-16" y="-16" width="32" height="32" rx="7" fill="#065f46"/>
    </g>
    <g transform="translate(21,21)">
      <!-- icon SVG paths -->
    </g>
  </svg>
</div>
```

### Light app launcher (grid ของ module)
```html
<div class="grid grid-cols-4 gap-4 p-4">
  <button class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50">
    <div class="w-[48px] h-[48px] flex items-center justify-center">
      <svg width="48" height="48" viewBox="0 0 48 48">
        <g transform="translate(24,24) rotate(45)">
          <rect x="-18" y="-18" width="36" height="36" rx="8" fill="#ecfdf5"/>
        </g>
        <g transform="translate(24,24)">
          <!-- icon SVG paths -->
        </g>
      </svg>
    </div>
    <span class="text-sm text-gray-700">คลังใหญ่</span>
  </button>
</div>
```

### Tab icon (simple, mono สีเดียว)
```html
<!-- Active -->
<svg width="16" height="16" stroke="#e2e8f0" stroke-width="1.8">...</svg>
<span class="text-gray-100">งานแผน</span>

<!-- Inactive -->
<svg width="16" height="16" stroke="#64748b" stroke-width="1.5">...</svg>
<span class="text-gray-500">งานแผน</span>
```

Total: **67 apps** across 6 categories
