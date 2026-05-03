# SHOWCASE-INTEGRATION-PLAN

> Plan สำหรับ session ถัดไป — เอา phase 1-10 components ใส่ใน showcase routes

Save ไฟล์นี้ไว้ที่ `pages/SHOWCASE-INTEGRATION-PLAN.md` หรืออ่านจาก message นี้ตรง ๆ เปิด session ใหม่ก็ทำต่อได้

---

## Context (สำหรับ session ใหม่)

**สิ่งที่ทำเสร็จแล้ว (committed via files):**

- `pages/showcase.html` (147 บรรทัด) — app shell + login + sidebar 12 nav + topbar
- `pages/showcase.css` (466 บรรทัด) — extract จาก Hospital App v2.html · token-driven 100%
- `pages/showcase/router.js` (42 บรรทัด) — 12 routes table + click handler
- `pages/showcase/views.js` (1265 บรรทัด) — 13 page renderers (Dashboard, Schedule, Patients, PatientDetail, OPD, IPD, ER, Pharmacy, Lab, Radiology, Billing, Reports, Settings)
- `pages/index.html` — เพิ่มปุ่ม Showcase ใน topbar
- `scripts/build-site.mjs` — เพิ่ม `'showcase'` ใน subdir copy + `<a href="pages/showcase.html">Showcase ↗</a>` ใน home topbar nav

**Build & verify:**

- Server: `python3 -m http.server 5555 --bind 127.0.0.1 --directory site`
- URL: http://127.0.0.1:5555/pages/showcase.html
- ⚠️ Chrome MCP เข้าไม่ถึง localhost (sandbox limitation) — ต้องใช้ browser ปกติของพี่เปิด

---

## เป้าหมาย session ถัดไป

ใส่ phase 1-10 components ใน routes ของ showcase ตามบริบทคลินิกจริง — เพื่อเห็น CSS issue ตอนวางคู่กับ component อื่น (spacing, dark mode contrast, density, max-width)

**ไม่ใช่:** ดูแค่ link ไปกลับ docs / **ไม่ใช่:** duplicate index.html ทั้งก้อน

---

## Mapping (phase component → showcase route)

| Phase # | Component               | ใส่ใน route                                      |
| ------- | ----------------------- | ------------------------------------------------ |
| 61      | Vital signs chart       | OPD (Patient view tab), IPD, ER, PatientDetail   |
| 62      | Lab results table       | Lab, PatientDetail                               |
| 63      | Prescription pad (Rx)   | Pharmacy, OPD, PatientDetail                     |
| 64      | Allergies banner        | OPD, IPD, ER (เหนือ patient header)              |
| 65      | Patient header/banner   | PatientDetail, OPD, IPD                          |
| 68      | Triage scoring          | ER (Triage tab)                                  |
| 69      | SOAP note               | OPD, PatientDetail                               |
| 71      | Admission record        | IPD (Admission tab)                              |
| 72      | Doctor's order sheet    | IPD (Orders tab), ER                             |
| 73      | Nurse's note (DAR)      | IPD (Nurse note tab)                             |
| 74      | I/O record              | IPD (I-O tab)                                    |
| 76      | Discharge summary       | IPD (Discharge tab)                              |
| 80      | SBAR hand-off           | IPD (Hand-off tab)                               |
| 85      | Fall risk Morse         | IPD (Safety tab)                                 |
| 86      | Pressure injury Braden  | IPD (Safety tab)                                 |
| 87      | Blood transfusion       | IPD (Special order tab)                          |
| 88      | Code blue               | ER (Resus tab)                                   |
| 90      | Refer/transfer          | ER (Refer tab)                                   |
| 93      | Diet sheet              | IPD (Diet tab)                                   |
| 96      | IPD bill                | Billing (Itemized tab)                           |
| 97      | Insurance pre-auth      | Billing (Pre-auth tab)                           |
| 103     | Audit search            | Settings (Audit tab)                             |
| 107     | System health dashboard | Settings (System tab)                            |

---

## Step-by-step (ทำตามลำดับ)

### Step 1 — Helper `mountPhase(builderName, container)` (~30 นาที)

**ปัญหา:** phase 5-10 ใช้ `AX5/6/7/8/9/10.register(builderFn)` + `_index.js` mount ไป `#sections-phaseN` ที่ไม่มีในหน้า showcase

**ทางออก:** สร้าง `pages/showcase/phase-loader.js`:

```js
// เก็บ builder ที่ register ไว้ทั้งหมด
window.PHASE_BUILDERS = {};

// override register ของแต่ละ AX namespace ให้ store builder by name
['AX5','AX6','AX7','AX8','AX9','AX10'].forEach(ns => {
  if (window[ns]) {
    const orig = window[ns].register;
    window[ns].register = function(fn) {
      PHASE_BUILDERS[fn.name] = fn;  // เก็บ by function name
      return orig.call(this, fn);
    };
    // ปิด mount() เพื่อไม่ให้ append ไป #sections-phaseN ที่ไม่มี
    window[ns].mount = function() {};
  }
});

// Helper เรียกใน views.js
window.renderPhaseComponent = function(builderName) {
  const fn = PHASE_BUILDERS[builderName];
  if (!fn) return `<div class="empty">Component "${builderName}" not loaded</div>`;
  const node = fn();
  return node.outerHTML;
};
```

**Load order ใน `showcase.html`:**

1. `styles.css` + `showcase.css` + ทุก phase CSS (ครบ 10 phase)
2. `router.js` (override `goRoute`)
3. `phase-loader.js` (ก่อน phase JS)
4. ทุก phase `_helpers.js` + builder JS + `_index.js` (rejected — `mount()` ปิดแล้ว)
5. `views.js`

**Warning:** builder function names ต้องเช็คก่อน — `grep -E "register\(function (\w+)" phase5/*.js` เพื่อเอาชื่อจริง

### Step 2 — PatientDetail tab "Clinical view" (~45 นาที)

แก้ `views.js` `renderPatientDetail()` — เปลี่ยน tab สุดท้ายจาก hard-coded list เป็น sub-tab system:

```js
// ใน "การตรวจ" tab content — แยกเป็น 4 sub-tabs:
<div class="page-tabs">
  <button class="is-active" onclick="switchClinicalTab(event, 'vital')">Vital chart</button>
  <button onclick="switchClinicalTab(event, 'lab')">Lab results</button>
  <button onclick="switchClinicalTab(event, 'soap')">SOAP note</button>
  <button onclick="switchClinicalTab(event, 'rx')">Prescription</button>
</div>
<div id="clinical-tab-vital">${renderPhaseComponent('vitalsSection')}</div>
<div id="clinical-tab-lab" hidden>${renderPhaseComponent('labsSection')}</div>
...
```

**ตัวที่ใส่:** #61 Vital, #62 Lab, #69 SOAP, #63 Rx — ใช้ helper `renderPhaseComponent()` จาก step 1

### Step 3 — OPD subnav (~30 นาที)

`renderOPD()` เพิ่ม top tabs:

- **Queue** (เนื้อเดิม)
- **Patient view** — #65 patient header → #64 allergies banner → #61 vital → #69 SOAP → #63 Rx (จัด layout `his-section` แนวตั้ง)

### Step 4 — IPD subnav 8 tab (~60 นาที — ใหญ่สุด)

`renderIPD()` แทนที่ทั้ง renderer ด้วย sub-tab navigation:

- **Bed map** (เดิม — bed grid)
- **Admission** (#71)
- **Orders** (#72)
- **Nurse note** (#73)
- **I/O 24h** (#74)
- **Diet** (#93)
- **Discharge** (#76)
- **Safety** (#85 + #86 + #87 รวม section)
- **Hand-off** (#80)

ใช้ pattern เดียวกับ Pharmacy `page-tabs` (มีอยู่แล้วใน `views.js:823`)

### Step 5 — ER subnav 4 tab (~20 นาที)

- **Live list** (เดิม — STEMI alert + table)
- **Triage** (#68)
- **Resus** (#88)
- **Refer** (#90)

### Step 6 — Billing + Settings subnav (~20 นาที)

- **Billing:** Bills (เดิม) | IPD itemized (#96) | Pre-auth (#97) | Claims (เดิม)
- **Settings:** Profile (เดิม) | Display (เดิม) | Audit (#103) | System health (#107)

### Step 7 — Build + verify (~30 นาที)

```bash
/opt/homebrew/bin/node scripts/build-site.mjs
pkill -f "http.server 5555" 2>/dev/null
nohup python3 -m http.server 5555 --bind 127.0.0.1 --directory site > /tmp/aegisx-showcase-server.log 2>&1 &
disown
```

เปิดใน browser ปกติของพี่ → คลิก:

- PatientDetail tab "Clinical view" → 4 sub-tabs (Vital/Lab/SOAP/Rx)
- OPD → Patient view — 5 components stacked
- IPD → ทุก 9 sub-tab
- ER → 4 sub-tab
- Billing + Settings sub-tab
- ลอง toggle Theme Light/Dark + Density Compact/Comfortable/Spacious ใน Settings → ทุกหน้าต้อง flip ถูก

### Step 8 — Audit + Fix CSS issues (~ตามที่เจอ)

ที่คาดว่าจะเจอ:

1. Phase component max-width ตาย (เช่น admission record assume desktop 1400px) — overflow ใน showcase content area
2. Dark mode token mapping เพี้ยน — บาง phase ที่ต่อ jpy ก่อน v0.5.4 audit อาจมี hardcoded สีเหลือ
3. Density spacing ไม่ flip — phase components ใช้ hard-coded `padding: 12px 16px` แทน `var(--ax-spacing-*)`
4. z-index conflict — phase modal/dropdown ทับ topbar
5. Font-size override — phase set `font-size: 14px` แทน inherit

แก้ที่ต้นตอ — แก้ใน `pages/phaseN/NN-name.css` ตรง ๆ ตาม Rule 1 ของ CLAUDE.md (ใช้ token ไม่ invent ค่า)

### Step 9 — Update TODO + CHANGELOG

- `CHANGELOG` v0.6.0: Hospital App showcase + phase components integrated into 6 routes
- `TODO`: เคลียร์ "Visual dark-mode audit" → กลายเป็น automated coverage แล้ว
- `README`: เพิ่มลิงก์ showcase

---

## Files ที่จะถูกแก้

| ไฟล์                             | ที่ทำ                                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `pages/showcase.html`            | เพิ่ม link ทุก phase CSS + script ทุก phase JS + `phase-loader.js`                              |
| `pages/showcase/phase-loader.js` | ใหม่ — override register/mount                                                                  |
| `pages/showcase/views.js`        | refactor `renderPatientDetail` / `renderOPD` / `renderIPD` / `renderER` / `renderBilling` / `renderSettings` |
| `pages/phaseN/*.css`             | ตามที่ audit เจอ — token-driven fixes                                                            |

**Estimate รวม session ใหม่:** ~4-5 ชม.

- Step 1-2 (~1.5 ชม.) → เห็นผลแรก
- Step 3-6 (~2 ชม.) → ครบทุก route
- Step 7-9 (~1.5 ชม.) → verify + audit fix + docs

---

## ระวัง

1. **ห้ามแตะ `aegisx-starter-1`** (CLAUDE.md rule)
2. builder function name ใน `register()` — ถ้าเป็น anonymous (`register(function(){...})`) ต้องไป grep แก้ให้มีชื่อ หรือใช้ index-based แทน
3. Phase JS ต้อง load **หลัง** `phase-loader.js` ไม่งั้น override ไม่ทัน
4. ทุก `_index.js` ของ phase จะถูก no-op ผ่าน `mount()` ที่เรา override — ไม่กระทบ `index.html` docs page เพราะคนละไฟล์ HTML
5. ตรวจ token หลังแก้แต่ละ phase CSS ด้วย `pnpm tokens:verify`

---

## Snapshot สถานะตอนนี้

```
pages/
├── index.html            (514 บรรทัด, มี Showcase button แล้ว)
├── showcase.html         (147 บรรทัด, app shell)
├── showcase.css          (466 บรรทัด, token-driven 100%)
├── showcase/
│   ├── router.js         (42 บรรทัด)
│   └── views.js          (1265 บรรทัด, 13 routes แต่ยังไม่มี phase components)
├── phase5-10/            (ครบ ~118 components, ไม่ต้องแตะ)
└── ... (เดิม)

scripts/build-site.mjs    (เพิ่ม 'showcase' ใน subdir + nav link แล้ว)
```

Server เปิดอยู่ background: http://127.0.0.1:5555/pages/showcase.html

clear ได้เลย — เปิด session ใหม่อ่าน plan นี้ทำต่อตามขั้นตอน
