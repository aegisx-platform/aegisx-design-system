# SHOWCASE-PHASE-COMPLETION-SPEC

> เอา component ที่เหลือ **35 ตัว** ใส่ showcase ให้ครบ **58/58** เพื่อให้ทุก builder ที่ register ใน `window.PHASE_BUILDERS` มีจุดเข้าถึงในแอพ HIS

ขอบเขต: ต่อยอดจาก `SHOWCASE-INTEGRATION-PLAN.md` (ใส่ไปแล้ว 23/58) — spec นี้ครอบคลุมที่เหลือทั้งหมด

---

## Acceptance criteria (ทั้งงาน)

1. คลิกเข้าถึง builder ทั้ง 58 ตัวได้จาก showcase UI (เปิด tab/menu ตรงๆแล้วเห็น component render)
2. Playwright count = **58** unique `[id^="..."-tab-"]` หรือ container ที่มี content จริง
3. Sidebar เพิ่ม **2 menu** ใหม่: `Quality` (1 tab) + `A11y Lab` (10 sub-tabs)
4. Topbar embed `orgSwitcherSection` บนซ้ายของ search (รองรับสลับสาขา/หน่วยงาน)
5. Light / Dark theme + density toggle ยังทำงานครบทุกหน้าใหม่
6. **0 console error** บน playwright sweep ตามทุก route
7. รัน `pnpm tokens:verify` ไม่ revert tokens.css ของ user

---

## Mapping table — 35 components ที่เพิ่ม

### Phase 5 — 3 ตัว
| # | builder | target | placement |
|---|---|---|---|
| 66 | bodyMapSection | PatientDetail | **sub-tab ใหม่ "Body map"** ใน clinical tab strip |
| 67 | consentSection | IPD | stack ใต้ #71 ใน `ipd-tab-admission` |
| 70 | orderSetSection | IPD | stack ใต้ #72 ใน `ipd-tab-orders` |

### Phase 6 — 4 ตัว
| # | builder | target | placement |
|---|---|---|---|
| 75 | carePlanSection | IPD | stack ใต้ #73 ใน `ipd-tab-nurse` |
| 77 | medRecSection | IPD | stack ใต้ #76 ใน `ipd-tab-discharge` |
| 78 | wristbandSection | IPD | stack ใต้ #71+#67 ใน `ipd-tab-admission` |
| 79 | belongingsSection | IPD | stack ใต้ #78 ใน `ipd-tab-admission` |

### Phase 7 — 5 ตัว
| # | builder | target | placement |
|---|---|---|---|
| 81 | preopSection | IPD | **sub-tab ใหม่ "Pre-op"** |
| 82 | opnoteSection | IPD | **sub-tab ใหม่ "OR record"** |
| 83 | anesthSection | IPD | stack ใต้ #82 ใน `ipd-tab-or` |
| 84 | restraintSection | IPD | stack ใน `ipd-tab-safety` (ต่อจาก #87) |
| 89 | deathSection | IPD | stack ใน `ipd-tab-discharge` (ต่อจาก #77) |

### Phase 8 — 5 ตัว
| # | builder | target | placement |
|---|---|---|---|
| 91 | bedsideSection | IPD | **sub-tab ใหม่ "Bedside"** |
| 92 | visitorSection | IPD | stack ใต้ #91 ใน `ipd-tab-bedside` |
| 94 | eduSection | IPD | stack ใน `ipd-tab-discharge` (ต่อจาก #89) |
| 95 | promsSection | PatientDetail | **sub-tab ใหม่ "PROMs"** |
| 98 | incidentSection | **เมนูใหม่ "Quality"** | route ใหม่ `quality` (ใต้ group "ระบบ" ก่อน รายงาน) |

### Phase 9 — 8 ตัว — refactor Settings
| # | builder | target | placement |
|---|---|---|---|
| 99 | permissionMatrixSection | Settings | **sub-tab ใหม่ "Access control"** |
| 100 | apiKeysSection | Settings | **sub-tab ใหม่ "API & Integrations"** |
| 101 | webhookSection | Settings | stack ใต้ #100 ใน `settings-tab-api` |
| 102 | featureFlagsSection | Settings | **sub-tab ใหม่ "Advanced"** |
| 104 | orgSwitcherSection | Settings | stack ใต้ #99 ใน `settings-tab-access` (revised — เป็น full-page demo ไม่เหมาะ slot ใน topbar) |
| 105 | settingsLayoutSection | Settings | stack ใต้ display card ใน `settings-tab-display` |
| 106 | importExportSection | Settings | stack ใน `settings-tab-advanced` (ต่อจาก #102) |
| 108 | notifPrefsSection | Settings | **sub-tab ใหม่ "Notifications"** |

### Phase 10 — 10 ตัว — เมนูใหม่ "A11y Lab"
| # | builder | sub-tab |
|---|---|---|
| 109 | a11yAuditSection | Audit |
| 110 | rtlSection | RTL |
| 111 | localeSection | Locale |
| 112 | printSection | Print |
| 113 | hcSection | High contrast |
| 114 | shortcutSection | Shortcuts |
| 115 | focusSection | Focus |
| 116 | liveSection | Live regions |
| 117 | rmoSection | Reduced motion |
| 118 | cbsSection | Color blind |

---

## Settings sub-tab strip (final shape)

`โปรไฟล์ | การแสดงผล | Notifications | Access control | API & Integrations | Advanced | Audit log | System health`

(8 tabs — เกินจากเดิม 4 → 8)

## IPD sub-tab strip (final shape)

`แผนผังเตียง | Admission | Doctor's orders | Nurse note | I/O 24h | Diet | Discharge | Pre-op | OR record | Bedside | Safety | Hand-off`

(เพิ่ม Pre-op + OR record + Bedside → 12 tabs)

## PatientDetail clinical tabs (final shape)

`ประวัติการตรวจ | Vital chart | ผล Lab | SOAP note | Prescription | Body map | PROMs`

(เพิ่ม Body map + PROMs → 7 tabs)

## Sidebar nav (final shape)

```
หน้าหลัก
  - แดชบอร์ด
  - ตารางนัด
งานคลินิก
  - ผู้ป่วย
  - OPD
  - IPD
  - ฉุกเฉิน (ER)
บริการสนับสนุน
  - ห้องยา
  - ห้องปฏิบัติการ
  - รังสีวินิจฉัย
  - การเงิน / สิทธิ
ระบบ
  - Quality          ← ใหม่
  - A11y Lab         ← ใหม่
  - รายงาน
  - ตั้งค่า
```

---

## Workflow บังคับ

ทำเป็น phase ตามลำดับ — แต่ละ phase ทำตาม checklist เดียวกัน:

### Per-phase checklist
- [ ] อ่าน mapping ของ phase นั้นจาก spec นี้
- [ ] แก้ `pages/showcase/views.js` (และ/หรือ `pages/showcase/router.js` + `pages/showcase.html` ถ้ามี route ใหม่)
- [ ] รัน `node scripts/build-site.mjs`
- [ ] รัน playwright smoke ของ phase นั้น (ทุก builder ที่เพิ่ม → query `:visible` ใน tab → expect ≥1)
- [ ] **เรียก code-reviewer agent** ตรวจ diff ก่อน mark task complete
- [ ] ถ้า reviewer flag issue → แก้ → review รอบใหม่ → ผ่านค่อยไป phase ถัดไป

### Verification queries (playwright)
```js
// per-phase
await page.click('a[data-nav="<route>"]');
await page.click(`button:has-text("${tab}")`);
expect(await page.locator(`#${tabId} .${componentClass}`).count()).toBeGreaterThan(0);
```

### Final verification
```js
// after all phases
const builders = ['vitalsSection', 'labsSection', /* ... 58 builders ... */];
for (const b of builders) {
  // navigate to home of b → assert visible
}
expect(errors).toHaveLength(0);
```

---

## Out of scope ของ spec นี้

- ไม่แตะ `tokens/css/tokens.css` (มี local diff ของ user)
- ไม่ refactor Pharmacy / Lab / Radiology / Reports
- ไม่ทำ responsive mobile layout (showcase = desktop demo)
- ไม่แตะ `aegisx-starter-1` หรือ consumer projects
