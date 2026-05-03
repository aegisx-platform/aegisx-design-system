# SHOWCASE TOKEN MIGRATION PLAN

> เอา `--app-*` ออกจาก design system repo ทั้งหมด → ทุก demo CSS ใช้ `--ax-*` ตาม 3-layer architecture ของ `AEGISX-DESIGN-PRINCIPLES.md` 100% · visual ผลลัพธ์เหมือนเดิมทุกหน้า

**ตัวเลข state ปัจจุบัน:**
- `pages/showcase/demo-tokens.css` มี **17 ตัวแปร `--app-*`** (paper, terminal, push, wristband 5, orgavatar, toggle)
- ปรากฏในไฟล์ phase CSS **9 ไฟล์** · ใช้รวม **~50 จุด**

---

## หลัก (เอามาตรฐาน design system ที่มีอยู่)

ตาม `tokens/dtcg/color.json` semantic structure ที่ `AEGISX-DESIGN-PRINCIPLES.md` กำหนด:

```
PRIMITIVE   --ax-color-{hue}-{step}     (ห้าม UI อ่านตรง)
SEMANTIC    --ax-{role}-{variant}       (UI อ่านได้)
COMPONENT   --ax-{component}-{property}
```

**สิ่งที่ต้องเพิ่มใน semantic:**

| ตัวใหม่ | layer | คู่ light | คู่ dark | meaning |
|---|---|---|---|---|
| `--ax-surface-paper` | semantic.surface | `#ffffff` | `#ffffff` (theme-locked) | กระดาษพิมพ์ |
| `--ax-surface-paper-stage` | semantic.surface | zinc-200 | zinc-900 | ฉากหลังของ paper preview (flip) |
| `--ax-surface-paper-ink` | semantic.surface | `#0a0a0a` | `#0a0a0a` (theme-locked) | หมึก |
| `--ax-surface-paper-ink-soft` | semantic.surface | zinc-700 | zinc-700 (theme-locked) | หมึกอ่อน |
| `--ax-surface-paper-ink-meta` | semantic.surface | zinc-600 | zinc-600 (theme-locked) | meta line |
| `--ax-surface-paper-rule` | semantic.surface | `#0a0a0a` | `#0a0a0a` (theme-locked) | เส้นแบ่ง |
| `--ax-surface-paper-border` | semantic.surface | zinc-300 | zinc-300 (theme-locked) | border |
| `--ax-surface-paper-row-alt` | semantic.surface | zinc-50 | zinc-50 (theme-locked) | row alt |
| `--ax-surface-terminal` | semantic.surface | zinc-950 | zinc-900 | bg ของ terminal/SR log |
| `--ax-surface-terminal-text` | semantic.surface | zinc-200 | zinc-200 | fg |
| `--ax-surface-terminal-meta` | semantic.surface | zinc-500 | zinc-500 | meta line |
| `--ax-surface-terminal-rule` | semantic.surface | zinc-800 | zinc-700 | divider |
| `--ax-surface-notification-from` | semantic.surface | zinc-800 | zinc-800 (theme-locked dark) | gradient start |
| `--ax-surface-notification-to` | semantic.surface | zinc-900 | zinc-900 (theme-locked dark) | gradient end |
| `--ax-surface-notification-text` | semantic.surface | `#ffffff` | `#ffffff` | fg |
| `--ax-surface-notification-shadow` | semantic.surface | zinc-950 | zinc-950 | shadow |
| `--ax-id-band-allergy` | semantic.id (NEW group) | error-emphasis | error-emphasis | ดู `wristband alergy` |
| `--ax-id-band-fall-risk` | semantic.id | warning-emphasis | warning-emphasis | |
| `--ax-id-band-dnr` | semantic.id | purple-600 | purple-600 | |
| `--ax-id-band-restricted` | semantic.id | pink-600 | pink-600 | |
| `--ax-id-band-limb-alert` | semantic.id | success-emphasis | success-emphasis | |
| `--ax-component-toggle-thumb` | component | `#ffffff` | `#ffffff` (theme-locked) | toggle switch thumb |
| `--ax-component-orgavatar-purple` | component | purple-600 | purple-600 | org avatar fallback |

> **ทำไม id-band ไม่ใช่ domain token (ที่ design principles บอกห้าม)?**
> Wristband 5 สี = **identity color set** ที่ design system ต้องคุมเพราะ:
> - WCAG contrast ระหว่างคู่สีนี้ pass ทั้งหมด — เป็น a11y decision ไม่ใช่ policy
> - Triage / NHSO / Drug interaction = domain (consumer override `--app-*`)
> - Wristband identity 5 สี = surface decision (design system คุม) — เหมือน `--ax-cat-med`, `--ax-cat-lab` ที่มีอยู่ใน DTCG แล้ว

---

## ขั้นตอน — ทำตามลำดับ

### Step 1 · เพิ่ม token ใน DTCG source
ไฟล์: `tokens/dtcg/color.json`

เพิ่มในโครงสร้างที่มีอยู่:
- `color.semantic.light.surface.{paper, paper-*, terminal, terminal-*, notification-*}`
- `color.semantic.dark.surface.{...}` — ค่าเหมือนหรือ flip ตาม theme-lock policy
- `color.semantic.id-band.{allergy, fall-risk, dnr, restricted, limb-alert}` (group ใหม่)
- `color.component.{toggle.thumb, orgavatar.purple}` (component layer)

### Step 2 · แก้ build script
ไฟล์: `scripts/build-tokens.mjs`

เพิ่ม emit blocks ใน script:
- After "Surface / role border" — emit `--ax-surface-paper*`, `--ax-surface-terminal*`, `--ax-surface-notification*`
- New section "ID bands" — emit `--ax-id-band-*`
- Component layer — append `--ax-component-toggle-thumb`, `--ax-component-orgavatar-purple`
- Dark theme block — same emit แต่ใช้ค่า dark (ส่วนที่ flip)

รัน: `pnpm tokens:build` (หรือ `node scripts/build-tokens.mjs`)
ผลลัพธ์: `tokens/css/tokens.css` + `tokens/scss/_tokens.scss` มี token ใหม่

### Step 3 · Refactor phase CSS — เปลี่ยน `--app-*` → `--ax-*`

| ไฟล์ | from `--app-*` | to `--ax-*` |
|---|---|---|
| `pages/phase6/78-wristband.css` | `--app-wristband-allergy` | `--ax-id-band-allergy` |
| | `--app-wristband-fall-risk` | `--ax-id-band-fall-risk` |
| | `--app-wristband-dnr` | `--ax-id-band-dnr` |
| | `--app-wristband-restricted` | `--ax-id-band-restricted` |
| | `--app-wristband-limb-alert` | `--ax-id-band-limb-alert` |
| | `--app-wristband-paper` | `--ax-surface-paper` |
| | `--app-wristband-paper-stripe` | `--ax-error-faint` (existing) |
| | `--app-wristband-text` | `--ax-surface-paper-ink` |
| | `--app-wristband-text-soft` | `--ax-surface-paper-ink-soft` |
| | `--app-wristband-barcode` | `--ax-surface-paper-ink` |
| `pages/phase9/104-org-switcher.css` | `--app-orgavatar-purple` | `--ax-component-orgavatar-purple` |
| `pages/phase9/105-settings-layout.css` | `--app-toggle-thumb` | `--ax-component-toggle-thumb` |
| `pages/phase9/108-notification-prefs.css` | `--app-push-bg-from` | `--ax-surface-notification-from` |
| | `--app-push-bg-to` | `--ax-surface-notification-to` |
| | `--app-push-text` | `--ax-surface-notification-text` |
| | `--app-push-shadow` | `--ax-surface-notification-shadow` |
| `pages/phase10/112-print.css` | `--app-paper-stage-bg` | `--ax-surface-paper-stage` |
| | `--app-paper-bg` | `--ax-surface-paper` |
| | `--app-paper-text` | `--ax-surface-paper-ink` |
| | `--app-paper-text-soft` | `--ax-surface-paper-ink-soft` |
| | `--app-paper-text-meta` | `--ax-surface-paper-ink-meta` |
| | `--app-paper-border` | `--ax-surface-paper-border` |
| | `--app-paper-rule` | `--ax-surface-paper-rule` |
| | `--app-paper-row-alt` | `--ax-surface-paper-row-alt` |
| `pages/phase10/116-live-regions.css` | `--app-srlog-bg` | `--ax-surface-terminal` |
| | `--app-srlog-fg` | `--ax-surface-terminal-text` |
| | `--app-srlog-meta` | `--ax-surface-terminal-meta` |
| | `--app-srlog-rule` | `--ax-surface-terminal-rule` |
| | `--app-srlog-cursor` | `--ax-success-default` (existing) |
| | `--app-srlog-polite` | `--ax-info-default` (existing) |
| | `--app-srlog-assertive` | `--ax-error-default` (existing) |

### Step 4 · ลบ `pages/showcase/demo-tokens.css`
- ลบ `<link rel="stylesheet" href="showcase/demo-tokens.css">` ใน `pages/showcase.html`
- ลบไฟล์ `pages/showcase/demo-tokens.css`

### Step 5 · Verify
- `node scripts/build-site.mjs` — rebuild
- Playwright sweep ทุก route × dark + light → screenshots เปรียบเทียบ before/after = visual identical
- `grep -r "var(--app-" pages/ tokens/` → 0 ผลลัพธ์
- `grep -rE "#[0-9a-fA-F]{3,8}|rgba?\([0-9]" pages/phase*/[0-9]*.css | grep -v "var(--ax"` → 0 ผลลัพธ์ (ยกเว้น comment numbering)
- `pnpm tokens:verify` — pass (หรือ no drift)

### Step 6 · เพิ่ม guard ป้องกัน hardcoded ใหม่
ไฟล์ใหม่ `scripts/verify-no-hardcoded.mjs`:
- Scan `pages/**/*.css` ยกเว้น `pages/showcase.css` (ที่มี `color-mix` legitimately)
- Fail ถ้าเจอ `#[0-9a-f]{3,8}` หรือ `rgba?\(` ที่ไม่อยู่หลัง `var(--ax-`
- เพิ่มใน `package.json` script: `"check:tokens": "node scripts/verify-no-hardcoded.mjs"`
- (Optional) hook ก่อน commit

### Step 7 · Document
- Update `tokens/AEGISX-TOKENS-SPEC.md` เพิ่ม section "Surface theme-locks + ID bands"
- Update `CHANGELOG.md` — entry `Removed --app-* shadow layer; promoted to semantic --ax-surface-*` 

---

## Acceptance criteria

1. **0 `--app-*` references ในทุกไฟล์ของ repo** — `grep -r "var(--app-"` empty
2. **0 hardcoded color/rgba ใน phase CSS** — except `color-mix(in srgb, var(--ax-*), transparent)`
3. **Visual diff = 0** — playwright before/after screenshots same (eye-test on 5+ key routes)
4. **`pnpm tokens:verify` pass** — DTCG source + tokens.css อยู่ใน sync
5. **Light/dark + density toggle ทำงานครบทุก route**
6. **Spec doc updated** — `tokens/AEGISX-TOKENS-SPEC.md` มี section ใหม่อธิบาย surface lock pattern

---

## Files affected (สรุป)

**แก้:**
- `tokens/dtcg/color.json` — เพิ่ม semantic.surface + semantic.id-band + component
- `scripts/build-tokens.mjs` — emit token ใหม่
- `tokens/css/tokens.css` — auto-regenerate
- `tokens/scss/_tokens.scss` — auto-regenerate
- `pages/phase6/78-wristband.css`
- `pages/phase9/104-org-switcher.css`
- `pages/phase9/105-settings-layout.css`
- `pages/phase9/108-notification-prefs.css`
- `pages/phase10/112-print.css`
- `pages/phase10/116-live-regions.css`
- `pages/showcase.html` — ลบ link demo-tokens.css
- `tokens/AEGISX-TOKENS-SPEC.md` — section ใหม่
- `CHANGELOG.md`

**ลบ:**
- `pages/showcase/demo-tokens.css`

**ใหม่:**
- `scripts/verify-no-hardcoded.mjs` (Step 6 — guard)
