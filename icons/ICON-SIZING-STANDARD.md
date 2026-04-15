# AegisX Icon Sizing Standard

## Rules

ทุก icon ต้องมี visual weight สม่ำเสมอเมื่อวางเรียงกัน

### ViewBox
- ทุกตัวใช้ `viewBox="0 0 24 24"`
- effective content area: **2–22** (20px จาก 24px)
- ห้าม content ยุบอยู่แค่ตรงกลาง

### ประเภท icon → ขนาด target

| ประเภท | x range | y range | ตัวอย่าง |
|--------|---------|---------|----------|
| Circle-based | cx=12 r=10 (2–22) | cy=12 r=10 (2–22) | settings, multi-site, help |
| Shield | 3–21 width | 2–22 height | rbac, security, nhso |
| Document/File | 4–20 width | 2–22 height | purchase-order, med-records |
| Box/3D | 3–21 width | 2–22 height | inv-warehouse, stock-overview |
| Person/Figure | 5–19 width | 2.5–22 height | users, rehab, registration |
| Rect/Card | 2–22 width | 3–21 height | billing, budget-ledger |
| Vehicle/Object | 1–23 width | 3–21 height | delivery, vehicle |
| Alert/Triangle | 2–22 width | 3–21 height | risk-mgmt, err-alert-triangle |

### Stroke
- Default: `stroke-width="1.5"`
- Emphasis (checkmark, arrow): `stroke-width="2"`
- Detail lines: `stroke-width="1"` + `opacity="0.4-0.5"`

### Visual weight check
ก่อน commit icon ใหม่ ให้วาง icon ข้างๆ icon ที่มีอยู่แล้ว
ถ้ามองแวบแรกแล้ว icon ใหม่ดู "เล็กกว่า" หรือ "ใหญ่กว่า" = ต้องปรับ

### Common mistakes
1. ❌ Circle r=7 → ดูเล็ก → ✅ ใช้ r=10
2. ❌ Rect 5-19 → ดูเล็ก → ✅ ใช้ 2-22
3. ❌ Person figure 9-15 width → ดูแคบ → ✅ ใช้ 5-19
4. ❌ Shield 5-19 → ดูเล็ก → ✅ ใช้ 3-21
