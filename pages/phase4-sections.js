/* AegisX DS · Phase 4 — Workflow & Domain patterns */
(function(){
  const h = (tag, attrs, ...kids) => {
    const e = document.createElement(tag);
    if (attrs) for (const [k,v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const k of kids.flat()) {
      if (k == null) continue;
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    }
    return e;
  };
  const section = (id, num, title, desc, ...blocks) => {
    const s = h('section', {id, class:'section'});
    s.appendChild(h('div', {class:'section__head'},
      h('h2', {class:'section__title'}, h('span', {class:'section__num'}, num), title),
      h('p', {class:'section__desc'}, desc)));
    for (const b of blocks) s.appendChild(b);
    return s;
  };
  const sub = (title, body) => {
    const w = h('div', {class:'subsection'});
    if (title) w.appendChild(h('h3', {class:'subsection__title'}, title));
    w.appendChild(body);
    return w;
  };

  // ═══ 61. WIZARD ═══
  function wizardSection() {
    const d = h('div', {class:'demo'});
    const w = h('div', {class:'wizard'});
    w.innerHTML = `
      <div class="wizard__header">
        <div class="wizard__step wizard__step--done">
          <div class="wizard__step-num">✓</div>
          <div class="wizard__step-info">
            <div class="wizard__step-label">Step 1</div>
            <div class="wizard__step-title">ข้อมูลผู้ป่วย</div>
          </div>
        </div>
        <div class="wizard__step wizard__step--done">
          <div class="wizard__step-num">✓</div>
          <div class="wizard__step-info">
            <div class="wizard__step-label">Step 2</div>
            <div class="wizard__step-title">ประวัติการรักษา</div>
          </div>
        </div>
        <div class="wizard__step wizard__step--active">
          <div class="wizard__step-num">3</div>
          <div class="wizard__step-info">
            <div class="wizard__step-label">Step 3 · Active</div>
            <div class="wizard__step-title">ผลตรวจร่างกาย</div>
          </div>
        </div>
        <div class="wizard__step wizard__step--error">
          <div class="wizard__step-num">!</div>
          <div class="wizard__step-info">
            <div class="wizard__step-label">Step 4 · พบข้อผิดพลาด</div>
            <div class="wizard__step-title">การวินิจฉัย</div>
          </div>
        </div>
        <div class="wizard__step">
          <div class="wizard__step-num">5</div>
          <div class="wizard__step-info">
            <div class="wizard__step-label">Step 5</div>
            <div class="wizard__step-title">สรุป & ยืนยัน</div>
          </div>
        </div>
      </div>
      <div class="wizard__body">
        <div class="wizard__title">ผลตรวจร่างกาย <span class="wizard__branch">↳ Branch: ต้องการ X-ray</span></div>
        <div class="wizard__subtitle">บันทึกค่าสัญญาณชีพ + อาการแสดง · บันทึกอัตโนมัติทุก 30 วินาที</div>
        <div class="form-grid">
          <div class="field-row">
            <label class="form-label">ความดัน (mmHg) <span style="color:var(--ax-error-emphasis)">*</span></label>
            <div style="display:flex;gap:8px;align-items:center">
              <input class="input" style="width:80px" value="138">
              <span style="color:var(--ax-text-subtle);font-family:var(--ax-font-mono)">/</span>
              <input class="input" style="width:80px" value="92">
              <span style="font-size:11px;color:var(--ax-warning-emphasis);font-family:var(--ax-font-mono)">⚠ Stage 1 HTN</span>
            </div>
          </div>
          <div class="field-row">
            <label class="form-label">ชีพจร (bpm)</label>
            <input class="input" style="width:120px" value="84">
          </div>
          <div class="field-row">
            <label class="form-label">อุณหภูมิ (°C)</label>
            <input class="input" style="width:120px" value="37.2">
          </div>
          <div class="field-row">
            <label class="form-label">หมายเหตุการตรวจ</label>
            <textarea class="input" rows="3" placeholder="ระบุอาการที่พบ..."></textarea>
          </div>
        </div>
      </div>
      <div class="wizard__footer">
        <div class="wizard__progress">
          Step 3 / 5 · 60% complete
          <div class="wizard__progress-bar"><div class="wizard__progress-fill" style="width:60%"></div></div>
          <span style="color:var(--ax-success-emphasis)">● บันทึกแล้ว 16:42</span>
        </div>
        <div class="wizard__actions">
          <button class="btn btn--ghost btn--sm">บันทึกร่าง</button>
          <button class="btn btn--secondary btn--sm">← ก่อนหน้า</button>
          <button class="btn btn--primary btn--sm">ถัดไป →</button>
        </div>
      </div>`;

    // toggle steps
    w.querySelectorAll('.wizard__step').forEach((step, idx) => {
      step.addEventListener('click', () => {
        // demo: just toggle visual to active
      });
    });
    d.appendChild(w);
    return section('wizard','61','Stepper · advanced wizard',
      'Multi-step form ที่มี validation states (done/active/error), branch indicator, save-as-draft + autosave timestamp, progress bar.',
      sub('Patient examination wizard · 5 steps + branch', d));
  }

  // ═══ 62. APPROVAL ═══
  function approvalSection() {
    const d = h('div', {class:'demo'});
    const a = h('div', {class:'approval'});
    a.innerHTML = `
      <div class="approval__row approval__row--done">
        <div class="approval__node">✓</div>
        <div class="approval__info">
          <div class="approval__name">นพ.สมศักดิ์ จันทร์เพ็ญ</div>
          <div class="approval__role">แพทย์ผู้สั่งใช้ · MD-21847</div>
          <div class="approval__comment">เห็นชอบให้สั่งซื้อตามรายการที่แนบ ผ่าน guideline ของโรงพยาบาล.</div>
        </div>
        <div class="approval__meta">
          <span class="approval__time">14 พ.ย. · 09:42</span>
          <span class="approval__sla approval__sla--ok">⏱ 18 นาที</span>
        </div>
      </div>
      <div class="approval__row approval__row--done">
        <div class="approval__node">✓</div>
        <div class="approval__info">
          <div class="approval__name">ภญ.พรทิพย์ วิภาวิน</div>
          <div class="approval__role">หัวหน้าเภสัชกรรม</div>
          <div class="approval__comment">ตรวจสอบ stock + interaction แล้ว ผ่าน. แนะนำเพิ่ม PPI 1 รายการ.</div>
        </div>
        <div class="approval__meta">
          <span class="approval__time">14 พ.ย. · 11:08</span>
          <span class="approval__sla approval__sla--warn">⏱ 1h 26m</span>
        </div>
      </div>
      <div class="approval__row approval__row--current">
        <div class="approval__node">3</div>
        <div class="approval__info">
          <div class="approval__name">คุณวิทยา สุขสันต์</div>
          <div class="approval__role">หัวหน้าฝ่ายพัสดุ · กำลังพิจารณา</div>
        </div>
        <div class="approval__meta">
          <span class="approval__time">รอตั้งแต่ 11:08</span>
          <span class="approval__sla approval__sla--late">⏱ 4h 12m เกิน SLA</span>
        </div>
      </div>
      <div class="approval__row">
        <div class="approval__node">4</div>
        <div class="approval__info">
          <div class="approval__name">นพ.สุชาติ พรหมมา</div>
          <div class="approval__role">ผู้อำนวยการ · ขั้นสุดท้าย</div>
        </div>
        <div class="approval__meta">
          <span class="approval__time">รอ step ก่อน</span>
        </div>
      </div>`;
    d.appendChild(a);

    // Rejected variant
    const d2 = h('div', {class:'demo'});
    const a2 = h('div', {class:'approval'});
    a2.innerHTML = `
      <div class="approval__row approval__row--done">
        <div class="approval__node">✓</div>
        <div class="approval__info">
          <div class="approval__name">คุณนภา จิตรงาม</div>
          <div class="approval__role">ผู้ขอเบิก · พยาบาลวิชาชีพ</div>
        </div>
        <div class="approval__meta"><span class="approval__time">12 พ.ย. · 14:20</span></div>
      </div>
      <div class="approval__row approval__row--rejected">
        <div class="approval__node">✕</div>
        <div class="approval__info">
          <div class="approval__name">หัวหน้าหอผู้ป่วย</div>
          <div class="approval__role">ปฏิเสธคำขอ</div>
          <div class="approval__comment">รายการที่ 3 (Lidocaine 2%) อยู่ในรายการ stock ปกติของห้อง — ใช้จาก stock ก่อน. แก้ไขแล้วยื่นใหม่.</div>
        </div>
        <div class="approval__meta">
          <span class="approval__time">12 พ.ย. · 15:08</span>
          <span class="approval__sla approval__sla--ok">⏱ 48 นาที</span>
        </div>
      </div>`;
    d2.appendChild(a2);

    return section('approval','62','Approval flow',
      'Visual hierarchy ของผู้อนุมัติแต่ละขั้น พร้อม comments, timestamps, SLA badge. รองรับ status: pending / approved / rejected / current.',
      sub('Multi-step approval (4 levels)', d),
      sub('Rejected example', d2));
  }

  // ═══ 63. INVOICE ═══
  function invoiceSection() {
    const d = h('div', {class:'demo'});
    const inv = h('div', {class:'invoice'});
    inv.innerHTML = `
      <div class="invoice__head">
        <div>
          <div class="invoice__title">ใบสั่งซื้อ #PO-2568-0142</div>
          <div class="invoice__meta">บริษัท เมดิคอล ซัพพลาย จำกัด · 14 พ.ย. 2568</div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn--secondary btn--sm">ดูใบเสนอราคา</button>
          <button class="btn btn--primary btn--sm">ส่งอนุมัติ</button>
        </div>
      </div>
      <table class="invoice__table">
        <thead>
          <tr>
            <th>#</th>
            <th>รายการ</th>
            <th class="num">จำนวน</th>
            <th class="num">ราคา/หน่วย</th>
            <th class="num">ส่วนลด %</th>
            <th class="num">รวม</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="invoice__row-num">1</td>
            <td>Paracetamol 500mg<small class="invoice__sku">SKU: MED-PCM-500-100</small></td>
            <td class="num"><input class="invoice__qty-input" value="200"></td>
            <td class="num"><input class="invoice__price-input" value="2.50"></td>
            <td class="num">5%</td>
            <td class="num">฿475.00</td>
            <td><button class="invoice__del" title="ลบ"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6"/></svg></button></td>
          </tr>
          <tr>
            <td class="invoice__row-num">2</td>
            <td>Surgical gloves (sterile, M)<small class="invoice__sku">SKU: SUP-GLV-M-50</small></td>
            <td class="num"><input class="invoice__qty-input" value="100"></td>
            <td class="num"><input class="invoice__price-input" value="48.00"></td>
            <td class="num">10%</td>
            <td class="num">฿4,320.00</td>
            <td><button class="invoice__del"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6"/></svg></button></td>
          </tr>
          <tr>
            <td class="invoice__row-num">3</td>
            <td>IV catheter 22G<small class="invoice__sku">SKU: SUP-IVC-22G-50</small></td>
            <td class="num"><input class="invoice__qty-input" value="50"></td>
            <td class="num"><input class="invoice__price-input" value="32.00"></td>
            <td class="num">0%</td>
            <td class="num">฿1,600.00</td>
            <td><button class="invoice__del"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6"/></svg></button></td>
          </tr>
          <tr>
            <td class="invoice__row-num">4</td>
            <td>Insulin glargine 100u/ml<small class="invoice__sku">SKU: MED-INS-GLR-10</small></td>
            <td class="num"><input class="invoice__qty-input" value="20"></td>
            <td class="num"><input class="invoice__price-input" value="685.00"></td>
            <td class="num">8%</td>
            <td class="num">฿12,604.00</td>
            <td><button class="invoice__del"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6"/></svg></button></td>
          </tr>
        </tbody>
        <tr class="invoice__add-row">
          <td colspan="7"><button class="btn btn--ghost btn--sm">＋ เพิ่มรายการ</button></td>
        </tr>
      </table>
      <div class="invoice__totals">
        <div class="invoice__notes">
          <strong style="color:var(--ax-text-heading);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;font-family:var(--ax-font-mono)">หมายเหตุ</strong>
          <p style="margin:6px 0 0">ส่งภายใน 7 วันทำการ · เงื่อนไขชำระ 30 วันหลังรับสินค้า · เลขผู้เสียภาษี 0123456789012</p>
        </div>
        <dl class="invoice__totals-list">
          <div class="invoice__total-row">
            <dt>Subtotal</dt><dd>฿18,999.00</dd>
          </div>
          <div class="invoice__total-row invoice__total-row--discount">
            <dt>ส่วนลดรวม</dt><dd>−฿1,392.05</dd>
          </div>
          <div class="invoice__total-row">
            <dt>VAT (7%)</dt><dd>฿1,232.49</dd>
          </div>
          <div class="invoice__total-row invoice__total-row--grand">
            <dt>ยอดสุทธิ</dt><dd>฿18,839.44</dd>
          </div>
        </dl>
      </div>`;
    d.appendChild(inv);
    return section('invoice','63','Invoice / Line items',
      'Editable table สำหรับ PO/invoice/quote — qty + price input live, totals footer (subtotal · discount · VAT · grand total) อัปเดตอัตโนมัติ.',
      sub('Purchase order with 4 line items', d));
  }

  // ═══ 64. SCHEDULING GRID ═══
  function schedSection() {
    const d = h('div', {class:'demo'});
    const sg = h('div', {class:'schedgrid'});
    sg.innerHTML = `
      <div class="schedgrid__head">
        <div>
          <div class="schedgrid__title">ตารางเวร · OPD · สัปดาห์ที่ 46/2568</div>
          <div style="font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);margin-top:2px">10–16 พ.ย. 2568</div>
        </div>
        <div class="schedgrid__nav">
          <button>‹</button>
          <span style="padding:0 8px">วันนี้</span>
          <button>›</button>
          <span style="margin-left:12px;color:var(--ax-text-subtle)">|</span>
          <button class="btn btn--secondary btn--sm" style="margin-left:6px">+ จองช่วงเวลา</button>
        </div>
      </div>
      <div class="schedgrid__body">
        <div class="schedgrid__col-header"></div>
        <div class="schedgrid__col-header">จ<strong>10</strong></div>
        <div class="schedgrid__col-header">อ<strong>11</strong></div>
        <div class="schedgrid__col-header">พ<strong>12</strong></div>
        <div class="schedgrid__col-header">พฤ<strong>13</strong></div>
        <div class="schedgrid__col-header schedgrid__col-header--today">ศ<strong>14</strong></div>
        <div class="schedgrid__col-header">ส<strong>15</strong></div>
        <div class="schedgrid__col-header">อา<strong>16</strong></div>
      </div>`;
    // Build cells
    const body = sg.querySelector('.schedgrid__body');
    const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
    hours.forEach((hr, hi) => {
      const t = h('div', {class:'schedgrid__time'}, hr);
      body.appendChild(t);
      for (let day=0; day<7; day++) {
        const cell = h('div', {class:'schedgrid__cell'+(day===4?' schedgrid__cell--today':'')});
        body.appendChild(cell);
      }
    });
    // place events
    const events = [
      {day:0, start:8, dur:2, type:'', title:'นพ.สมชาย', meta:'OPD 1 · ผู้ป่วย 18'},
      {day:0, start:13, dur:3, type:'success', title:'พญ.มาลี', meta:'OPD 2 · ผู้ป่วย 12'},
      {day:1, start:9, dur:2, type:'', title:'นพ.วิชัย', meta:'OPD 1 · 15 คน'},
      {day:1, start:14, dur:2, type:'warning', title:'meeting', meta:'Quality review'},
      {day:2, start:8, dur:4, type:'success', title:'พญ.พรทิพย์', meta:'OPD 1+3 · double'},
      {day:3, start:10, dur:2, type:'', title:'นพ.สมศักดิ์', meta:'follow-up'},
      {day:3, start:13, dur:3, type:'error', title:'⚠ ต้องหาแพทย์', meta:'ขาด · 13:00–16:00'},
      {day:4, start:8, dur:5, type:'', title:'นพ.สมชาย', meta:'OPD 1 · เต็มวัน'},
      {day:4, start:14, dur:2, type:'success', title:'พญ.พรทิพย์', meta:'walk-in slot'},
      {day:5, start:9, dur:3, type:'warning', title:'on-call', meta:'พญ.มาลี · ฉุกเฉิน'}
    ];
    events.forEach(ev => {
      // each cell is 54px tall; events overlay grid
      const cellIdx = ev.start - 8;
      const targetCell = body.children[1 + (1+7) * cellIdx + 1 + ev.day];
      if (!targetCell) return;
      const e = h('div', {class:'schedgrid__event' + (ev.type ? ' schedgrid__event--'+ev.type : '')});
      e.style.top = '2px';
      e.style.height = (54 * ev.dur - 4) + 'px';
      e.innerHTML = `<div class="schedgrid__event-title">${ev.title}</div><div class="schedgrid__event-meta">${ev.meta}</div>`;
      targetCell.appendChild(e);
    });
    // now line on today (Friday, ~14:30)
    const nowTop = 8 * (54 + 0) + 27 + (54 * 6.5); // approximate
    // simpler: position relative to body top
    const nl = h('div', {class:'schedgrid__now-line'});
    nl.style.top = (40 + 54 * 6.5) + 'px';
    body.appendChild(nl);
    body.style.position = 'relative';

    d.appendChild(sg);
    return section('schedsection','64','Scheduling grid',
      'Week × hour grid สำหรับ shift schedule, appointments, equipment booking. มี today highlight, now-line, event color-coding.',
      sub('OPD doctor schedule · weekly view', d));
  }

  // ═══ 65. PATIENT CLINICAL TIMELINE ═══
  function ctlSection() {
    const d = h('div', {class:'demo'});
    const ct = h('div', {class:'ctl'});
    ct.innerHTML = `
      <div class="ctl__head">
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--ax-text-heading)">ประวัติการรักษา · HN 6781234</div>
          <div style="font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);margin-top:2px">นางสุภาพร แสงทอง · admit 12 พ.ย. 2568</div>
        </div>
        <div class="ctl__filter">
          <span class="ctl__chip ctl__chip--active">ทั้งหมด · 24</span>
          <span class="ctl__chip">Vitals</span>
          <span class="ctl__chip">Labs</span>
          <span class="ctl__chip">Meds</span>
          <span class="ctl__chip">Notes</span>
        </div>
      </div>
      <div class="ctl__body">
        <div class="ctl__day">
          <div class="ctl__day-label">วันนี้<strong>14 พ.ย.</strong></div>
          <div class="ctl__events">
            <div class="ctl__event">
              <div class="ctl__time">14:30</div>
              <div class="ctl__icon ctl__icon--med">RX</div>
              <div class="ctl__title">Insulin glargine 16u SC<small>given · prn coverage</small></div>
              <div class="ctl__by">RN.พรทิพย์</div>
            </div>
            <div class="ctl__event">
              <div class="ctl__time">12:00</div>
              <div class="ctl__icon ctl__icon--vital">V</div>
              <div class="ctl__title">BP 138/86 · HR 78 · T 36.8°C · SpO₂ 97%<small>routine vitals</small></div>
              <div class="ctl__by">RN.สมหวัง</div>
            </div>
            <div class="ctl__event">
              <div class="ctl__time">10:15</div>
              <div class="ctl__icon ctl__icon--lab">L</div>
              <div class="ctl__title">CBC + BMP results<small>Hb 11.2 (low) · K 4.8 · Cr 1.1</small></div>
              <div class="ctl__by">Lab</div>
            </div>
            <div class="ctl__event">
              <div class="ctl__time">09:00</div>
              <div class="ctl__icon ctl__icon--note">N</div>
              <div class="ctl__title">Progress note<small>"ตอบสนองดีต่อ insulin · พิจารณา step-down"</small></div>
              <div class="ctl__by">นพ.สมชาย</div>
            </div>
          </div>
        </div>
        <div class="ctl__day">
          <div class="ctl__day-label">เมื่อวาน<strong>13 พ.ย.</strong></div>
          <div class="ctl__events">
            <div class="ctl__event">
              <div class="ctl__time">22:00</div>
              <div class="ctl__icon ctl__icon--med">RX</div>
              <div class="ctl__title">Metformin 500mg PO<small>routine · BG 142</small></div>
              <div class="ctl__by">RN.มาลี</div>
            </div>
            <div class="ctl__event">
              <div class="ctl__time">16:42</div>
              <div class="ctl__icon ctl__icon--order">OR</div>
              <div class="ctl__title">Order: HbA1c, lipid panel<small>ส่งตรวจพรุ่งนี้เช้า</small></div>
              <div class="ctl__by">นพ.สมชาย</div>
            </div>
            <div class="ctl__event">
              <div class="ctl__time">08:00</div>
              <div class="ctl__icon ctl__icon--vital">V</div>
              <div class="ctl__title">BP 142/90 · HR 82 · T 37.1°C<small>BP slightly elevated</small></div>
              <div class="ctl__by">RN.สมหวัง</div>
            </div>
          </div>
        </div>
        <div class="ctl__day">
          <div class="ctl__day-label">12 พ.ย.<strong>วัน admit</strong></div>
          <div class="ctl__events">
            <div class="ctl__event">
              <div class="ctl__time">14:18</div>
              <div class="ctl__icon ctl__icon--admit">A</div>
              <div class="ctl__title">รับ admit · DM type 2 with hyperglycemia<small>BG 412 · ICD: E11.65</small></div>
              <div class="ctl__by">นพ.สมชาย</div>
            </div>
            <div class="ctl__event">
              <div class="ctl__time">13:45</div>
              <div class="ctl__icon ctl__icon--note">N</div>
              <div class="ctl__title">ER assessment<small>มา รพ. ด้วยอาการอ่อนเพลีย ปัสสาวะบ่อย 3 วัน</small></div>
              <div class="ctl__by">นพ.วิชัย (ER)</div>
            </div>
          </div>
        </div>
      </div>`;
    // chip filter toggle
    ct.querySelectorAll('.ctl__chip').forEach(chip => {
      chip.addEventListener('click', () => {
        ct.querySelectorAll('.ctl__chip').forEach(c => c.classList.remove('ctl__chip--active'));
        chip.classList.add('ctl__chip--active');
      });
    });
    d.appendChild(ct);
    return section('ctl','65','Patient timeline (clinical events)',
      'แกนเวลาแบบ day-grouped events: admit · vitals · labs · meds · orders · notes · discharge. Filter ตามประเภท · แสดงผู้บันทึก.',
      sub('Inpatient 3-day timeline', d));
  }

  // ═══ 66. MAR ═══
  function marSection() {
    const d = h('div', {class:'demo'});
    const m = h('div', {class:'mar'});
    m.innerHTML = `
      <div class="mar__head">
        <div>
          <div class="mar__title">Medication Administration Record (MAR)</div>
          <div class="mar__sub">HN 6781234 · นางสุภาพร · เตียง 412 · 14 พ.ย. 2568</div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn--ghost btn--sm">‹ เมื่อวาน</button>
          <button class="btn btn--secondary btn--sm">วันนี้</button>
          <button class="btn btn--ghost btn--sm">พรุ่งนี้ ›</button>
        </div>
      </div>
      <div class="mar__table">
        <div class="mar__cell-h">Medication / Dose</div>
        <div class="mar__cell-h">06:00</div>
        <div class="mar__cell-h">09:00</div>
        <div class="mar__cell-h">12:00</div>
        <div class="mar__cell-h">15:00</div>
        <div class="mar__cell-h">18:00</div>
        <div class="mar__cell-h">21:00</div>
        <div class="mar__cell-h">00:00</div>
        <div class="mar__cell-h">03:00</div>

        <div class="mar__med">
          <div class="mar__med-name">Metformin</div>
          <div class="mar__med-dose">500mg PO BID</div>
        </div>
        <div class="mar__cell"></div>
        <div class="mar__cell mar__cell--given"><span class="mar__cell-init">PT</span></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell mar__cell--scheduled">18:00</div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>

        <div class="mar__med">
          <div class="mar__med-name">Insulin glargine</div>
          <div class="mar__med-dose">16u SC HS</div>
        </div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell mar__cell--scheduled">21:00</div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>

        <div class="mar__med">
          <div class="mar__med-name">Lisinopril</div>
          <div class="mar__med-dose">10mg PO daily</div>
        </div>
        <div class="mar__cell"></div>
        <div class="mar__cell mar__cell--held">HELD</div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>

        <div class="mar__med">
          <div class="mar__med-name">Aspirin</div>
          <div class="mar__med-dose">81mg PO daily</div>
        </div>
        <div class="mar__cell"></div>
        <div class="mar__cell mar__cell--given"><span class="mar__cell-init">PT</span></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>

        <div class="mar__med">
          <div class="mar__med-name">Atorvastatin</div>
          <div class="mar__med-dose">40mg PO HS</div>
        </div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell mar__cell--scheduled">21:00</div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>

        <div class="mar__med">
          <div class="mar__med-name">Acetaminophen</div>
          <div class="mar__med-dose">500mg PO PRN q4h</div>
        </div>
        <div class="mar__cell mar__cell--prn"></div>
        <div class="mar__cell mar__cell--prn"></div>
        <div class="mar__cell mar__cell--prn mar__cell--given"><span class="mar__cell-init">MN</span></div>
        <div class="mar__cell mar__cell--prn"></div>
        <div class="mar__cell mar__cell--prn"></div>
        <div class="mar__cell mar__cell--prn"></div>
        <div class="mar__cell mar__cell--prn"></div>
        <div class="mar__cell mar__cell--prn"></div>

        <div class="mar__med">
          <div class="mar__med-name">Furosemide</div>
          <div class="mar__med-dose">20mg IV daily</div>
        </div>
        <div class="mar__cell"></div>
        <div class="mar__cell mar__cell--missed">MISS</div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
        <div class="mar__cell"></div>
      </div>`;
    d.appendChild(m);

    const lg = h('div', {style:'margin-top:10px;display:flex;gap:14px;flex-wrap:wrap;font-size:11px;font-family:var(--ax-font-mono);color:var(--ax-text-subtle)'});
    lg.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:14px;background:var(--ax-success-subtle);border-radius:2px"></span>Given (✓)</span>
      <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:14px;background:var(--ax-warning-subtle);border-radius:2px;color:var(--ax-warning-emphasis);text-align:center;font-weight:700;font-size:9px;line-height:14px">H</span>Held by MD</span>
      <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:14px;background:var(--ax-error-subtle);border-radius:2px;color:var(--ax-error-emphasis);text-align:center;font-weight:700;font-size:9px;line-height:14px">M</span>Missed</span>
      <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:14px;height:14px;background:repeating-linear-gradient(45deg,var(--ax-background-subtle),var(--ax-background-subtle) 3px,var(--ax-background-default) 3px,var(--ax-background-default) 6px);border-radius:2px"></span>PRN slot</span>`;
    d.appendChild(lg);
    return section('mar','66','Medication chart (MAR)',
      'ตารางการให้ยา 24h × รายการยา · click cell to mark given · states: scheduled · given · held · missed · PRN.',
      sub('IPD MAR · 24-hour view', d));
  }

  // ═══ 67. AUDIT TRAIL ═══
  function auditSection() {
    const d = h('div', {class:'demo'});
    const a = h('div', {class:'audit'});
    a.innerHTML = `
      <div class="audit__entry">
        <div class="audit__avatar">SM</div>
        <div class="audit__main">
          <div class="audit__line"><strong>นพ.สมชาย</strong> <span class="audit__action audit__action--update">UPDATE</span> ใบสั่งยา <strong>RX-2568-1842</strong></div>
          <div class="audit__diff">
            <span class="audit__diff-key">dose:</span>
            <span class="audit__diff-val"><span class="audit__diff-old">500mg BID</span><span class="audit__diff-arrow">→</span><span class="audit__diff-new">1000mg BID</span></span>
            <span class="audit__diff-key">duration:</span>
            <span class="audit__diff-val"><span class="audit__diff-old">14 days</span><span class="audit__diff-arrow">→</span><span class="audit__diff-new">30 days</span></span>
            <span class="audit__diff-key">notes:</span>
            <span class="audit__diff-val"><span class="audit__diff-new">+ "ปรับขึ้นเนื่องจาก HbA1c 7.8"</span></span>
          </div>
        </div>
        <div class="audit__meta">
          <span class="audit__meta-time">14 พ.ย. · 14:42:18</span>
          <span class="audit__meta-ip">10.42.1.18 · WS-OPD-04</span>
        </div>
      </div>
      <div class="audit__entry">
        <div class="audit__avatar" style="background:var(--ax-success-subtle);color:var(--ax-success-emphasis)">PT</div>
        <div class="audit__main">
          <div class="audit__line"><strong>RN.พรทิพย์</strong> <span class="audit__action audit__action--create">CREATE</span> บันทึกการให้ยา <strong>MAR-Insulin-glargine</strong></div>
          <div class="audit__diff">
            <span class="audit__diff-key">patient:</span><span class="audit__diff-val"><span class="audit__diff-new">HN 6781234</span></span>
            <span class="audit__diff-key">drug:</span><span class="audit__diff-val"><span class="audit__diff-new">Insulin glargine 16u SC</span></span>
            <span class="audit__diff-key">given_at:</span><span class="audit__diff-val"><span class="audit__diff-new">14:30</span></span>
          </div>
        </div>
        <div class="audit__meta">
          <span class="audit__meta-time">14 พ.ย. · 14:30:42</span>
          <span class="audit__meta-ip">10.42.4.12 · TABLET-WARD-4A</span>
        </div>
      </div>
      <div class="audit__entry">
        <div class="audit__avatar" style="background:var(--ax-error-subtle);color:var(--ax-error-emphasis)">AD</div>
        <div class="audit__main">
          <div class="audit__line"><strong>admin@aegisx</strong> <span class="audit__action audit__action--delete">DELETE</span> ผู้ใช้งาน <strong>tmp_user_42</strong></div>
          <div style="font-size:11px;color:var(--ax-text-subtle);margin-top:4px;font-family:var(--ax-font-mono)">เหตุผล: บัญชีทดสอบ — ลบตามนโยบาย retention 90 วัน</div>
        </div>
        <div class="audit__meta">
          <span class="audit__meta-time">14 พ.ย. · 09:18:02</span>
          <span class="audit__meta-ip">10.42.0.5 · admin-console</span>
        </div>
      </div>
      <div class="audit__entry">
        <div class="audit__avatar" style="background:var(--ax-warning-subtle);color:var(--ax-warning-emphasis)">MV</div>
        <div class="audit__main">
          <div class="audit__line"><strong>นพ.มาลี</strong> <span class="audit__action audit__action--update">UPDATE</span> ผลแล็บ <strong>LAB-CBC-558123</strong></div>
          <div class="audit__diff">
            <span class="audit__diff-key">flag:</span><span class="audit__diff-val"><span class="audit__diff-old">normal</span><span class="audit__diff-arrow">→</span><span class="audit__diff-new">abnormal — Hb 11.2 (low)</span></span>
            <span class="audit__diff-key">verified_by:</span><span class="audit__diff-val"><span class="audit__diff-new">นพ.มาลี</span></span>
          </div>
        </div>
        <div class="audit__meta">
          <span class="audit__meta-time">14 พ.ย. · 10:18:04</span>
          <span class="audit__meta-ip">10.42.2.7 · LAB-WS-02</span>
        </div>
      </div>`;
    d.appendChild(a);
    return section('audit','67','Audit trail / Activity log',
      'Diff view ของการเปลี่ยนแปลง: user · action (CREATE/UPDATE/DELETE) · field-by-field old → new · IP + workstation. Compliance-ready.',
      sub('System audit log · last 24h', d));
  }

  // ═══ 68. INBOX / TASK QUEUE ═══
  function inboxSection() {
    const d = h('div', {class:'demo'});
    const ib = h('div', {class:'inbox'});
    ib.innerHTML = `
      <div class="inbox__toolbar">
        <div class="inbox__toolbar-left">
          <label class="inbox__select-all"><input type="checkbox" id="ib_all"> <span class="inbox__count">0 / 8 selected</span></label>
        </div>
        <div class="inbox__bulk">
          <button>มอบหมาย</button>
          <button>เปลี่ยนความสำคัญ</button>
          <button>ปิดงาน</button>
          <button>ส่งออก CSV</button>
        </div>
      </div>`;
    const rows = [
      ['p1', true, 'รออนุมัติยา high-alert', 'RX-2568-1842 · DM patient', 'พรทิพย์', 'ภายใน 18 นาที', 'late', '5m'],
      ['p1', true, 'ตรวจสอบเหตุการณ์ผิดปกติ', 'incident #INC-1842', 'สมชาย', '42 นาที', 'warn', '12m'],
      ['p2', true, 'ทบทวนใบสั่งซื้อพัสดุ', 'PO-2568-0142 · 18,839 บาท', 'วิทยา', '4 ชม.', 'warn', '32m'],
      ['p2', false, 'อนุมัติคำขอลาพักร้อน', 'นางพรทิพย์ · 18–20 พ.ย.', 'หัวหน้าหอ', '1 วัน', 'ok', '1h'],
      ['p3', false, 'ตรวจสอบรายงานประจำเดือน', 'OPD October 2568', 'เลขาฯ', '3 วัน', 'ok', '2h'],
      ['p3', false, 'อัปเดตข้อมูลผู้ป่วย', 'HN 6781234 · ที่อยู่ใหม่', 'ลงทะเบียน', '1 สัปดาห์', 'ok', '4h'],
      ['p4', false, 'ตอบแบบสอบถาม', 'การประเมินคุณภาพ Q4', 'ทุกแผนก', '14 วัน', 'ok', '1d'],
      ['p4', false, 'ลงทะเบียนอบรมประจำปี', 'CPR re-cert · ภายใน ม.ค.', 'HR', '45 วัน', 'ok', '2d']
    ];
    rows.forEach(([pri, unread, title, sub, who, sla, slaState, time]) => {
      const r = h('div', {class: 'inbox__row' + (unread ? ' inbox__row--unread' : ''), style:'position:relative'});
      r.innerHTML = `
        <input type="checkbox" class="inbox__cb">
        <span class="inbox__pri inbox__pri--${pri}" title="Priority ${pri.toUpperCase()}"></span>
        <div class="inbox__title">${title} <small>· ${sub}</small></div>
        <div class="inbox__assignee"><span class="inbox__avatar">${who.slice(0,2)}</span>${who}</div>
        <span class="inbox__sla inbox__sla--${slaState}">⏱ ${sla}</span>
        <span class="inbox__time">${time}</span>`;
      ib.appendChild(r);
    });
    // bulk select count
    setTimeout(() => {
      const cbs = ib.querySelectorAll('.inbox__cb');
      const all = ib.querySelector('#ib_all');
      const cnt = ib.querySelector('.inbox__count');
      function update() {
        const sel = [...cbs].filter(c => c.checked).length;
        cnt.textContent = `${sel} / ${cbs.length} selected`;
        cbs.forEach((c, i) => {
          ib.querySelectorAll('.inbox__row')[i].classList.toggle('inbox__row--selected', c.checked);
        });
      }
      cbs.forEach(c => c.addEventListener('change', update));
      all.addEventListener('change', () => { cbs.forEach(c => c.checked = all.checked); update(); });
    }, 0);
    d.appendChild(ib);
    return section('inbox','68','Inbox / Task queue',
      'รายการงานพร้อม priority bar, assignee, SLA countdown badge, bulk-action toolbar (select-all + multi-select). Click row เปิด task detail.',
      sub('Task queue · 8 items', d));
  }

  // ═══ 69. DIFF VIEWER ═══
  function diffSection() {
    const d = h('div', {class:'demo'});
    const dv = h('div', {class:'diffview'});
    dv.innerHTML = `
      <div class="diffview__head">
        <div class="diffview__head-cell">
          <span><strong>discharge_summary.md</strong> · v2.1 (เดิม)</span>
          <span style="color:var(--ax-text-subtle)">14 พ.ย. 14:18</span>
        </div>
        <div class="diffview__head-cell">
          <span><strong>discharge_summary.md</strong> · v2.2 (ใหม่)</span>
          <span style="color:var(--ax-text-subtle)">14 พ.ย. 16:42</span>
        </div>
      </div>
      <div class="diffview__body">
        <div class="diffview__col">
          <div class="diffview__line"><span class="diffview__line-num">1</span><span class="diffview__line-content"># Discharge Summary</span></div>
          <div class="diffview__line"><span class="diffview__line-num">2</span><span class="diffview__line-content"></span></div>
          <div class="diffview__line"><span class="diffview__line-num">3</span><span class="diffview__line-content">**Patient:** HN 6781234</span></div>
          <div class="diffview__line diffview__line--del"><span class="diffview__line-num">4</span><span class="diffview__line-content">**Admit:** 12 พ.ย. 2568</span></div>
          <div class="diffview__line diffview__line--del"><span class="diffview__line-num">5</span><span class="diffview__line-content">**Discharge:** 16 พ.ย. 2568</span></div>
          <div class="diffview__line"><span class="diffview__line-num">6</span><span class="diffview__line-content"></span></div>
          <div class="diffview__line"><span class="diffview__line-num">7</span><span class="diffview__line-content">## Diagnosis</span></div>
          <div class="diffview__line diffview__line--mod"><span class="diffview__line-num">8</span><span class="diffview__line-content">- DM type 2 (E11.65)</span></div>
          <div class="diffview__line"><span class="diffview__line-num">9</span><span class="diffview__line-content"></span></div>
          <div class="diffview__line"><span class="diffview__line-num">10</span><span class="diffview__line-content">## Medications</span></div>
          <div class="diffview__line"><span class="diffview__line-num">11</span><span class="diffview__line-content">- Metformin 500mg BID</span></div>
          <div class="diffview__line diffview__line--del"><span class="diffview__line-num">12</span><span class="diffview__line-content">- Insulin glargine 16u HS</span></div>
          <div class="diffview__line"><span class="diffview__line-num">13</span><span class="diffview__line-content">- Aspirin 81mg daily</span></div>
        </div>
        <div class="diffview__col">
          <div class="diffview__line"><span class="diffview__line-num">1</span><span class="diffview__line-content"># Discharge Summary</span></div>
          <div class="diffview__line"><span class="diffview__line-num">2</span><span class="diffview__line-content"></span></div>
          <div class="diffview__line"><span class="diffview__line-num">3</span><span class="diffview__line-content">**Patient:** HN 6781234</span></div>
          <div class="diffview__line diffview__line--add"><span class="diffview__line-num">4</span><span class="diffview__line-content">**Patient name:** นางสุภาพร แสงทอง</span></div>
          <div class="diffview__line diffview__line--add"><span class="diffview__line-num">5</span><span class="diffview__line-content">**Admit:** 12 พ.ย. 2568 (14:18)</span></div>
          <div class="diffview__line diffview__line--add"><span class="diffview__line-num">6</span><span class="diffview__line-content">**Discharge:** 16 พ.ย. 2568 (10:30)</span></div>
          <div class="diffview__line"><span class="diffview__line-num">7</span><span class="diffview__line-content"></span></div>
          <div class="diffview__line"><span class="diffview__line-num">8</span><span class="diffview__line-content">## Diagnosis</span></div>
          <div class="diffview__line diffview__line--mod"><span class="diffview__line-num">9</span><span class="diffview__line-content">- DM type 2 with hyperglycemia (E11.65)</span></div>
          <div class="diffview__line"><span class="diffview__line-num">10</span><span class="diffview__line-content"></span></div>
          <div class="diffview__line"><span class="diffview__line-num">11</span><span class="diffview__line-content">## Medications</span></div>
          <div class="diffview__line"><span class="diffview__line-num">12</span><span class="diffview__line-content">- Metformin 1000mg BID</span></div>
          <div class="diffview__line diffview__line--add"><span class="diffview__line-num">13</span><span class="diffview__line-content">- Lisinopril 10mg daily</span></div>
          <div class="diffview__line"><span class="diffview__line-num">14</span><span class="diffview__line-content">- Aspirin 81mg daily</span></div>
        </div>
      </div>`;
    d.appendChild(dv);
    const stats = h('div', {style:'margin-top:8px;font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);display:flex;gap:14px'});
    stats.innerHTML = `
      <span><span style="color:var(--ax-success-emphasis);font-weight:600">+4</span> additions</span>
      <span><span style="color:var(--ax-error-emphasis);font-weight:600">−3</span> deletions</span>
      <span><span style="color:var(--ax-warning-emphasis);font-weight:600">~2</span> modifications</span>
      <span style="margin-left:auto">แก้ไขโดย นพ.สมชาย · 16:42</span>`;
    d.appendChild(stats);
    return section('diff','69','Diff viewer',
      'Side-by-side document compare — line numbers · add (เขียว) · delete (แดง) · modify (เหลือง) · summary stats. ใช้กับ document version, config diff.',
      sub('Discharge summary v2.1 → v2.2', d));
  }

  // ═══ 70. SIGN-OFF ═══
  function signoffSection() {
    const d = h('div', {class:'demo'});
    const so = h('div', {class:'signoff'});
    so.innerHTML = `
      <div class="signoff__head">
        <div class="signoff__title">ใบรับรองการจำหน่ายผู้ป่วย · รอลงนาม</div>
        <span class="signoff__pill">Pending sign-off</span>
      </div>
      <div class="signoff__body">
        <div class="signoff__data">
          <div class="signoff__group">
            <div class="signoff__group-title">ข้อมูลผู้ป่วย</div>
            <div class="signoff__field"><dt>HN</dt><dd>6781234</dd></div>
            <div class="signoff__field"><dt>ชื่อ-นามสกุล</dt><dd>นางสุภาพร แสงทอง</dd></div>
            <div class="signoff__field"><dt>เพศ / อายุ</dt><dd>หญิง / 58 ปี</dd></div>
            <div class="signoff__field"><dt>ช่วงเวลานอน</dt><dd>12–16 พ.ย. 2568 · 4 วัน</dd></div>
          </div>
          <div class="signoff__group">
            <div class="signoff__group-title">การวินิจฉัย & การรักษา</div>
            <div class="signoff__field"><dt>Primary Dx</dt><dd>E11.65 · DM type 2 with hyperglycemia</dd></div>
            <div class="signoff__field"><dt>Secondary Dx</dt><dd>I10 · HTN</dd></div>
            <div class="signoff__field"><dt>หัตถการ</dt><dd>—</dd></div>
            <div class="signoff__field"><dt>ยาต่อเนื่อง</dt><dd>3 รายการ</dd></div>
          </div>
          <div class="signoff__group">
            <div class="signoff__group-title">การชำระเงิน</div>
            <div class="signoff__field"><dt>สิทธิ</dt><dd>UC (บัตรทอง)</dd></div>
            <div class="signoff__field"><dt>ค่าใช้จ่ายรวม</dt><dd>฿18,420</dd></div>
            <div class="signoff__field"><dt>ผู้ป่วยจ่าย</dt><dd>฿0</dd></div>
          </div>
        </div>
        <aside class="signoff__sidebar">
          <label class="signoff__check">
            <input type="checkbox" checked>
            <span>ตรวจสอบข้อมูลผู้ป่วยถูกต้องและครบถ้วน</span>
          </label>
          <label class="signoff__check">
            <input type="checkbox" checked>
            <span>ผู้ป่วยรับทราบและยินยอมการจำหน่าย</span>
          </label>
          <label class="signoff__check">
            <input type="checkbox">
            <span>ใบสั่งยาและคำแนะนำการดูแลตนเองส่งมอบแล้ว</span>
          </label>
          <label class="signoff__check">
            <input type="checkbox">
            <span>นัดติดตาม OPD ใน 14 วัน · 28 พ.ย. 2568</span>
          </label>

          <div class="signoff__sigpad">นพ.สมชาย</div>
          <div class="signoff__sig-meta">
            <span>นพ.สมชาย จันทร์เพ็ญ · MD-21847</span>
            <span>16:42 · 14 พ.ย. 2568</span>
            <span>IP: 10.42.1.18</span>
          </div>

          <div style="display:flex;gap:6px;margin-top:6px">
            <button class="btn btn--ghost btn--sm" style="flex:1">ล้างลายเซ็น</button>
            <button class="btn btn--primary btn--sm" style="flex:2">ยืนยันลงนาม</button>
          </div>
        </aside>
      </div>`;
    d.appendChild(so);
    return section('signoff','70','Form review / Sign-off panel',
      'Read-only data review พร้อม checklist confirmation, signature pad (typed display), timestamp + IP audit. Pattern สำหรับ discharge summary, consent forms.',
      sub('Discharge sign-off · physician', d));
  }

  // build
  const root = document.getElementById('sections-phase4')
            || document.getElementById('sections-phase3')
            || document.getElementById('sections-handoff');
  [
    wizardSection, approvalSection, invoiceSection, schedSection, ctlSection,
    marSection, auditSection, inboxSection, diffSection, signoffSection
  ].forEach(fn => { try { root.appendChild(fn()); } catch (e) { console.error(fn.name, e); } });
})();
