/* ═══════════════════════════════════════════════════════════════
   AegisX DS · Phase 1 — Form & Data
   Multi-select · Date Range · Time Picker · File Upload · Number Stepper
   Pagination · Spinner · Skeleton · Wizard · OTP
   ═══════════════════════════════════════════════════════════════ */
(function(){
  const el = (tag, attrs, ...kids) => {
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

  const ICONS = {
    chevD:'<polyline points="6 9 12 15 18 9"/>',
    chevU:'<polyline points="18 15 12 9 6 15"/>',
    chevR:'<polyline points="9 18 15 12 9 6"/>',
    chevL:'<polyline points="15 18 9 12 15 6"/>',
    chevsL:'<polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/>',
    chevsR:'<polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>',
    x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus:'<line x1="5" y1="12" x2="19" y2="12"/>',
    check:'<polyline points="20 6 9 17 4 12"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
    refresh:'<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>'
  };
  const i = (n, sz=14) => `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" class="icon-stroke">${ICONS[n]||''}</svg>`;

  const section = (id, num, title, desc, ...blocks) => {
    const s = el('section', {id, class:'section'});
    s.appendChild(el('div', {class:'section__head'},
      el('h2', {class:'section__title'},
        el('span', {class:'section__num'}, num),
        title
      ),
      el('p', {class:'section__desc'}, desc)
    ));
    for (const b of blocks) s.appendChild(b);
    return s;
  };
  const subsection = (title, body) => {
    const w = el('div', {class:'subsection'});
    if (title) w.appendChild(el('h3', {class:'subsection__title'}, title));
    w.appendChild(body);
    return w;
  };

  // ═══ 31. MULTI-SELECT / COMBOBOX ═══
  function multiselectSection() {
    // Selected example
    const d = el('div', {class:'demo'});
    d.appendChild(el('div', {class:'field__label', style:'margin-bottom:6px'}, 'แผนกที่รับผิดชอบ (Multi-select)'));
    const ms = el('div', {class:'multiselect'});
    const fld = el('div', {class:'multiselect__field'});
    [['อายุรกรรม','MED'], ['ศัลยกรรม','SUR'], ['กุมารเวช','PED']].forEach(([n]) => {
      const c = el('span', {class:'multiselect__chip'}, n);
      const b = el('button', {type:'button', html:i('x',10)});
      c.appendChild(b);
      fld.appendChild(c);
    });
    fld.appendChild(el('input', {class:'multiselect__input', placeholder:'พิมพ์เพื่อค้นหา...', value:''}));
    fld.appendChild(el('span', {class:'multiselect__caret', html:i('chevD',12)}));
    ms.appendChild(fld);

    const menu = el('div', {class:'multiselect__menu'});
    menu.appendChild(el('div', {class:'multiselect__group-title'}, 'แผนกการแพทย์'));
    [
      ['อายุรกรรม','MED','42 บุคลากร', true],
      ['ศัลยกรรม','SUR','38 บุคลากร', true],
      ['กุมารเวช','PED','22 บุคลากร', true],
      ['สูติ-นรีเวช','OBG','18 บุคลากร', false],
      ['ฉุกเฉิน','ER','27 บุคลากร', false],
      ['จิตเวช','PSY','9 บุคลากร', false]
    ].forEach(([name, code, meta, sel], idx) => {
      const o = el('div', {class:'multiselect__option' + (sel?' is-selected':'') + (idx===3?' is-active':'')});
      o.appendChild(el('span', {class:'ms-check', html: sel ? i('check',10) : ''}));
      o.appendChild(el('span', {}, name));
      o.appendChild(el('span', {class:'multiselect__option-meta'}, code + ' · ' + meta));
      menu.appendChild(o);
    });
    ms.appendChild(menu);
    d.appendChild(ms);
    d.appendChild(el('div', {style:'height:240px'})); // give dropdown room

    // Single-line empty state
    const d2 = el('div', {class:'demo'});
    d2.appendChild(el('div', {class:'field__label', style:'margin-bottom:6px'}, 'ICD-10 codes (พิมพ์เพื่อค้นหา)'));
    const ms2 = el('div', {class:'multiselect'});
    const fld2 = el('div', {class:'multiselect__field'});
    fld2.appendChild(el('input', {class:'multiselect__input', placeholder:'I10 · E11 · J45 ...'}));
    fld2.appendChild(el('span', {class:'multiselect__caret', html:i('chevD',12)}));
    ms2.appendChild(fld2);
    d2.appendChild(ms2);

    const g = el('div', {class:'grid grid-2', style:'align-items:start'});
    g.appendChild(subsection('Multi-select with chips · open dropdown', d));
    g.appendChild(subsection('Combobox · empty state', d2));

    return section('multiselect','31','Multi-select / Combobox',
      'เลือกหลายค่าพร้อม search ใน dropdown — chips ภายใน field, group title, selected indicator. ใช้กับแผนก, ICD-10, ยา, เจ้าหน้าที่.',
      g
    );
  }

  // ═══ 32. DATE RANGE PICKER ═══
  function daterangeSection() {
    // Trigger
    const trigger = el('div', {class:'demo'});
    trigger.appendChild(el('div', {class:'field__label', style:'margin-bottom:6px'}, 'ช่วงวันที่ออกรายงาน'));
    const dr = el('div', {class:'daterange'});
    dr.appendChild(el('div', {class:'daterange__field', html: i('calendar',12) + '<span>1 พ.ย. 2568</span>'}));
    dr.appendChild(el('div', {class:'daterange__sep'}));
    dr.appendChild(el('div', {class:'daterange__field', html: i('calendar',12) + '<span>15 พ.ย. 2568</span>'}));
    trigger.appendChild(dr);
    trigger.appendChild(el('div', {style:'margin-top:10px;font-size:12px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono)'},
      '14 วัน · 1 พ.ย. – 15 พ.ย. 2568'));

    // Open calendar
    const cal = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    const c = el('div', {class:'daterange-cal'});

    // Presets
    const pre = el('div', {class:'daterange-cal__presets'});
    [['วันนี้',false],['เมื่อวาน',false],['7 วันล่าสุด',false],['14 วันล่าสุด',true],['30 วันล่าสุด',false],['เดือนนี้',false],['ไตรมาสนี้',false],['ปีนี้',false],['ปรับเอง',false]].forEach(([n, act]) => {
      pre.appendChild(el('button', {class:'daterange-cal__preset' + (act?' is-active':'')}, n));
    });
    c.appendChild(pre);

    // Two months
    function monthGrid(monthLabel, year, monthIdx, range, today) {
      const m = el('div', {class:'daterange-cal__month'});
      const head = el('div', {class:'daterange-cal__head'});
      head.appendChild(el('button', {class:'btn btn--ghost btn--sm btn--icon', html: i('chevL',12)}));
      head.appendChild(el('div', {class:'daterange-cal__title'}, monthLabel));
      head.appendChild(el('button', {class:'btn btn--ghost btn--sm btn--icon', html: i('chevR',12)}));
      m.appendChild(head);
      const g = el('div', {class:'daterange-cal__grid'});
      ['อา','จ','อ','พ','พฤ','ศ','ส'].forEach(d => g.appendChild(el('div', {class:'daterange-cal__dow'}, d)));
      const first = new Date(year, monthIdx, 1).getDay();
      const days = new Date(year, monthIdx+1, 0).getDate();
      const prevDays = new Date(year, monthIdx, 0).getDate();
      // leading
      for (let k=first-1; k>=0; k--) g.appendChild(el('div', {class:'daterange-cal__day is-other'}, String(prevDays - k)));
      for (let d=1; d<=days; d++) {
        let cls = 'daterange-cal__day';
        if (range && range.month === monthIdx) {
          if (d === range.start) cls += ' is-start';
          else if (d === range.end) cls += ' is-end';
          else if (d > range.start && d < range.end) cls += ' is-in-range';
        } else if (range && range.month2 === monthIdx) {
          if (d <= range.end2) cls += ' is-in-range';
          if (d === range.end2) cls += ' is-end';
        }
        if (today && today.month === monthIdx && d === today.d) cls += ' is-today';
        g.appendChild(el('div', {class:cls}, String(d)));
      }
      m.appendChild(g);
      return m;
    }
    // Nov 2025: range 1–15
    c.appendChild(monthGrid('พฤศจิกายน 2568', 2025, 10, {month:10, start:1, end:15}, {month:10, d:3}));
    c.appendChild(monthGrid('ธันวาคม 2568', 2025, 11, null, null));

    cal.appendChild(c);

    return section('daterange','32','Date Range Picker',
      'ขยายจาก Datepicker เดี่ยว — preset shortcuts, ปฏิทินคู่, highlight ช่วง. ใช้กับรายงาน OPD, การเงิน, การเข้างาน.',
      subsection('Trigger field', trigger),
      subsection('Open state — dual month with presets', cal)
    );
  }

  // ═══ 33. TIME PICKER ═══
  function timepickerSection() {
    // Inline input style
    const d = el('div', {class:'demo'});
    d.appendChild(el('div', {class:'field__label', style:'margin-bottom:6px'}, 'เวลานัด (Time picker · 24h)'));
    const tp = el('div', {class:'timepicker'});
    tp.appendChild(el('span', {html: i('clock',12)}));
    tp.appendChild(el('span', {class:'timepicker__seg is-focus'}, '09'));
    tp.appendChild(el('span', {class:'timepicker__sep'}, ':'));
    tp.appendChild(el('span', {class:'timepicker__seg'}, '30'));
    const steps = el('div', {class:'timepicker__steps'});
    steps.appendChild(el('button', {html: i('chevU',10)}));
    steps.appendChild(el('button', {html: i('chevD',10)}));
    tp.appendChild(steps);
    d.appendChild(tp);
    d.appendChild(el('div', {style:'margin-top:8px;font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono)'},
      'คลิก-ลาก หรือกดลูกศร · ลูกศรขึ้น/ลง บนช่องเพื่อเปลี่ยนค่า'));

    // Range
    const dr = el('div', {class:'demo'});
    dr.appendChild(el('div', {class:'field__label', style:'margin-bottom:6px'}, 'ช่วงเวลานัด'));
    const tw = el('div', {style:'display:flex;gap:10px;align-items:center'});
    function tinp(h, m, focus) {
      const t = el('div', {class:'timepicker'});
      t.appendChild(el('span', {html: i('clock',12)}));
      t.appendChild(el('span', {class:'timepicker__seg' + (focus?' is-focus':'')}, h));
      t.appendChild(el('span', {class:'timepicker__sep'}, ':'));
      t.appendChild(el('span', {class:'timepicker__seg'}, m));
      return t;
    }
    tw.appendChild(tinp('09','00', true));
    tw.appendChild(el('span', {style:'color:var(--ax-text-subtle);font-size:12px'}, 'ถึง'));
    tw.appendChild(tinp('10','30', false));
    dr.appendChild(tw);

    // Picker panel (open state)
    const panel = el('div', {class:'demo', style:'background:var(--ax-background-page)'});
    const pn = el('div', {class:'timepicker__panel', style:'box-shadow:none'});
    const cH = el('div', {class:'timepicker__col'});
    cH.appendChild(el('div', {class:'timepicker__col-title'}, 'ชม.'));
    for (let h=7; h<=20; h++) {
      const cell = el('div', {class:'timepicker__cell' + (h===9?' is-active':'') + (h<8?' is-disabled':'')}, String(h).padStart(2,'0'));
      cH.appendChild(cell);
    }
    const cM = el('div', {class:'timepicker__col'});
    cM.appendChild(el('div', {class:'timepicker__col-title'}, 'นาที'));
    [0,5,10,15,20,25,30,35,40,45,50,55].forEach(m => {
      const cell = el('div', {class:'timepicker__cell' + (m===30?' is-active':'')}, String(m).padStart(2,'0'));
      cM.appendChild(cell);
    });
    pn.appendChild(cH); pn.appendChild(cM);
    panel.appendChild(el('div', {style:'display:flex;justify-content:center'}, pn));

    const g = el('div', {class:'grid grid-2', style:'align-items:start'});
    g.appendChild(subsection('Single time · drag-segments', d));
    g.appendChild(subsection('Time range', dr));

    return section('timepicker','33','Time Picker',
      'สำหรับนัดผู้ป่วย, ตารางเวร, log เวลา — segments แยกชั่วโมง/นาที, scroll-wheel panel ในตัวเลือกแบบ step 5 นาที.',
      g,
      subsection('Picker panel — scroll-wheel (5-minute steps)', panel)
    );
  }

  // ═══ 34. FILE UPLOAD (formal) ═══
  function fileUploadSection() {
    // Dropzone (referencing existing class)
    const d = el('div', {class:'demo'});
    const dz = el('div', {class:'dropzone'});
    dz.innerHTML = `
      <div class="dropzone__icon">${i('upload',22)}</div>
      <div class="dropzone__title">ลากไฟล์มาวาง หรือ <a href="#" style="color:var(--ax-brand-emphasis);font-weight:500">เลือกไฟล์</a></div>
      <div class="dropzone__sub">PDF · JPG · PNG · DICOM — สูงสุด 20MB</div>`;
    d.appendChild(dz);

    // Single file with progress
    const single = el('div', {class:'demo'});
    const u1 = el('div', {class:'upload-item'});
    u1.innerHTML = `
      <div class="upload-item__icon">${i('file',16)}</div>
      <div class="upload-item__body">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:13px;color:var(--ax-text-heading);font-weight:500">MRI-Brain-T1.dicom</span>
          <span class="mono" style="font-size:11px;color:var(--ax-text-subtle)">11.4 / 18.2 MB</span>
        </div>
        <div class="progress" style="height:4px;margin-top:6px"><div class="progress__bar" style="width:62%"></div></div>
        <div style="display:flex;justify-content:space-between;margin-top:4px">
          <span style="font-size:11px;color:var(--ax-text-subtle)">กำลังอัปโหลด · 2.4 MB/s</span>
          <span class="mono" style="font-size:11px;color:var(--ax-brand-emphasis)">62%</span>
        </div>
      </div>
      <button class="btn btn--ghost btn--sm btn--icon" title="หยุดชั่วคราว">${i('pause',12)}</button>`;
    single.appendChild(u1);

    // List of mixed states
    const list = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:8px'});
    [
      ['X-Ray-Chest-PA.dicom','2.4 MB','100','success'],
      ['CBC-2025-11-12.pdf','140 KB','100','success'],
      ['MRI-Brain-T1.dicom','11.4/18.2 MB','62','progress'],
      ['Lab-report-draft.pdf','—','0','error'],
      ['Surgery-consent.pdf','82 KB','—','queued']
    ].forEach(([name, size, pct, state]) => {
      const it = el('div', {class:'upload-item'});
      let trail = '';
      if (state === 'progress') trail = `<div class="progress" style="height:4px;margin-top:6px"><div class="progress__bar" style="width:${pct}%"></div></div>`;
      if (state === 'success') trail = `<div style="font-size:11px;color:var(--ax-success-emphasis);margin-top:2px;display:inline-flex;align-items:center;gap:4px">${i('check',10)} อัปโหลดสำเร็จ</div>`;
      if (state === 'error') trail = `<div style="font-size:11px;color:var(--ax-error-emphasis);margin-top:2px">ขนาดไฟล์เกิน 20MB — ลองใหม่</div>`;
      if (state === 'queued') trail = `<div style="font-size:11px;color:var(--ax-text-subtle);margin-top:2px">รอคิว — 1 ก่อนหน้า</div>`;
      const trailBtn = state === 'error'
        ? `<button class="btn btn--ghost btn--sm btn--icon" title="ลองใหม่">${i('refresh',12)}</button>`
        : `<button class="btn btn--ghost btn--sm btn--icon" title="ลบ">${i('x',12)}</button>`;
      it.innerHTML = `
        <div class="upload-item__icon">${i('file',16)}</div>
        <div class="upload-item__body">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:13px;color:var(--ax-text-heading);font-weight:500">${name}</span>
            <span class="mono" style="font-size:11px;color:var(--ax-text-subtle)">${size}</span>
          </div>
          ${trail}
        </div>
        ${trailBtn}`;
      list.appendChild(it);
    });

    return section('upload-formal','34','File Upload / Dropzone',
      'Dropzone + queue รองรับ pause / retry / cancel. ใช้กับ DICOM, lab report, ใบยินยอมผู้ป่วย.',
      subsection('Dropzone', d),
      subsection('Single file uploading (62%)', single),
      subsection('Upload queue · success / progress / error / queued', list)
    );
  }

  // ═══ 35. NUMBER STEPPER ═══
  function numberStepperSection() {
    const d = el('div', {class:'demo'});
    function step(val, min, max, label, hint, unit) {
      const w = el('div', {style:'display:flex;flex-direction:column;gap:4px;min-width:0'});
      w.appendChild(el('label', {class:'field__label'}, label));
      const row = el('div', {style:'display:flex;align-items:center;gap:8px'});
      const sn = el('div', {class:'stepnum'});
      const dec = el('button', {class:'stepnum__btn', type:'button', html:i('minus',12)});
      if (val <= min) dec.setAttribute('disabled','');
      sn.appendChild(dec);
      sn.appendChild(el('input', {class:'stepnum__input', type:'number', value:String(val), min:String(min), max:String(max)}));
      sn.appendChild(el('button', {class:'stepnum__btn', type:'button', html:i('plus',12)}));
      row.appendChild(sn);
      if (unit) row.appendChild(el('span', {style:'font-family:var(--ax-font-mono);font-size:12px;color:var(--ax-text-subtle)'}, unit));
      w.appendChild(row);
      if (hint) w.appendChild(el('div', {style:'font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono)'}, hint));
      return w;
    }
    const grid = el('div', {class:'grid grid-3'});
    grid.appendChild(step(2, 0, 99, 'จำนวนผู้เข้าร่วม', 'min 0 · step 1', 'คน'));
    grid.appendChild(step(8, 0, 100, 'โดส Morphine', 'step 0.5 · max 100', 'mg'));
    grid.appendChild(step(0, 0, 30, 'ส่วนลด', 'min 0 · max 30', '%'));
    d.appendChild(grid);

    // States row
    const states = el('div', {class:'demo'});
    const sg = el('div', {class:'grid grid-4', style:'align-items:end'});
    function sv(label, val, attrs) {
      const w = el('div');
      w.appendChild(el('div', {class:'field__label', style:'margin-bottom:4px'}, label));
      const sn = el('div', {class:'stepnum'});
      sn.appendChild(el('button', {class:'stepnum__btn', html:i('minus',12), ...(attrs?.dec||{})}));
      sn.appendChild(el('input', {class:'stepnum__input', type:'number', value:val, ...(attrs?.inp||{})}));
      sn.appendChild(el('button', {class:'stepnum__btn', html:i('plus',12), ...(attrs?.inc||{})}));
      w.appendChild(sn);
      return w;
    }
    sg.appendChild(sv('Default', '5'));
    sg.appendChild(sv('At minimum', '0', {dec:{disabled:''}}));
    sg.appendChild(sv('At maximum', '99', {inc:{disabled:''}}));
    sg.appendChild(sv('Disabled', '12', {dec:{disabled:''}, inc:{disabled:''}, inp:{disabled:''}}));
    states.appendChild(sg);

    return section('number-stepper','35','Number Stepper',
      'Input ตัวเลข + ปุ่ม +/− สำหรับ dose, จำนวน, ปริมาณ. รองรับ min/max, step, unit suffix.',
      subsection('Common patterns', d),
      subsection('States', states)
    );
  }

  // ═══ 36. PAGINATION ═══
  function paginationSection() {
    // Standalone
    const d = el('div', {class:'demo'});
    const p = el('div', {class:'pagination'});
    p.innerHTML = `
      <button class="pagination__btn" title="หน้าแรก">${i('chevsL',10)}</button>
      <button class="pagination__btn" title="ก่อนหน้า">${i('chevL',10)}</button>
      <button class="pagination__btn">1</button>
      <button class="pagination__btn">2</button>
      <button class="pagination__btn is-active">3</button>
      <button class="pagination__btn">4</button>
      <button class="pagination__btn">5</button>
      <button class="pagination__btn pagination__btn--ellipsis">…</button>
      <button class="pagination__btn">42</button>
      <button class="pagination__btn" title="ถัดไป">${i('chevR',10)}</button>
      <button class="pagination__btn" title="หน้าสุดท้าย">${i('chevsR',10)}</button>`;
    d.appendChild(p);

    // Bar (formal — full table footer)
    const bar = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    const barInner = el('div', {class:'pagination-bar'});
    barInner.innerHTML = `
      <div class="pagination-bar__info">แสดง <strong>21 – 40</strong> จาก <strong>837</strong> รายการ</div>
      <div class="pagination-bar__perpage">
        <span>ต่อหน้า</span>
        <select class="select" style="width:auto;padding-right:24px">
          <option>10</option><option selected>20</option><option>50</option><option>100</option>
        </select>
      </div>
      <div class="pagination">
        <button class="pagination__btn" disabled title="ก่อนหน้า">${i('chevL',10)}</button>
        <button class="pagination__btn">1</button>
        <button class="pagination__btn is-active">2</button>
        <button class="pagination__btn">3</button>
        <button class="pagination__btn">4</button>
        <button class="pagination__btn pagination__btn--ellipsis">…</button>
        <button class="pagination__btn">42</button>
        <button class="pagination__btn" title="ถัดไป">${i('chevR',10)}</button>
      </div>`;
    bar.appendChild(barInner);

    // Disabled boundaries
    const ed = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:14px'});
    const p1 = el('div', {class:'pagination'});
    p1.innerHTML = `
      <button class="pagination__btn" disabled>${i('chevsL',10)}</button>
      <button class="pagination__btn" disabled>${i('chevL',10)}</button>
      <button class="pagination__btn is-active">1</button>
      <button class="pagination__btn">2</button>
      <button class="pagination__btn">3</button>
      <button class="pagination__btn">${i('chevR',10)}</button>
      <button class="pagination__btn">${i('chevsR',10)}</button>`;
    ed.appendChild(el('div', {}, el('div', {class:'subsection__title', style:'margin-top:0'}, 'หน้าแรก'), p1));

    const p2 = el('div', {class:'pagination'});
    p2.innerHTML = `
      <button class="pagination__btn">${i('chevsL',10)}</button>
      <button class="pagination__btn">${i('chevL',10)}</button>
      <button class="pagination__btn">40</button>
      <button class="pagination__btn">41</button>
      <button class="pagination__btn is-active">42</button>
      <button class="pagination__btn" disabled>${i('chevR',10)}</button>
      <button class="pagination__btn" disabled>${i('chevsR',10)}</button>`;
    ed.appendChild(el('div', {}, el('div', {class:'subsection__title', style:'margin-top:14px'}, 'หน้าสุดท้าย'), p2));

    return section('pagination','36','Pagination',
      'Compact pager + table footer pattern พร้อม per-page select + range info. รองรับ disabled boundaries, ellipsis, jump first/last.',
      subsection('Compact pagination', d),
      subsection('Table footer pattern', bar),
      subsection('Boundary states', ed)
    );
  }

  // ═══ 37. SPINNER (formal) ═══
  function spinnerSection() {
    const d = el('div', {class:'demo'});
    const r = el('div', {style:'display:flex;align-items:center;gap:32px;flex-wrap:wrap'});
    [['xs','12'],['sm','16'],['md','24'],['lg','36'],['xl','56']].forEach(([sz, px]) => {
      const c = el('div', {style:'display:flex;flex-direction:column;align-items:center;gap:8px'});
      c.appendChild(el('span', {class:'spin spin--' + sz}));
      c.appendChild(el('span', {class:'mono', style:'font-size:10px;color:var(--ax-text-subtle)'}, sz + ' · ' + px + 'px'));
      r.appendChild(c);
    });
    d.appendChild(r);

    // Color variants
    const dc = el('div', {class:'demo'});
    const rc = el('div', {style:'display:flex;align-items:center;gap:24px;flex-wrap:wrap'});
    [['brand','Brand'],['success','Success'],['warning','Warning'],['error','Error'],['neutral','Neutral']].forEach(([role, label]) => {
      const c = el('div', {style:'display:flex;flex-direction:column;align-items:center;gap:8px'});
      c.appendChild(el('span', {class:'spin spin--md spin--' + role}));
      c.appendChild(el('span', {class:'mono', style:'font-size:10px;color:var(--ax-text-subtle)'}, label));
      rc.appendChild(c);
    });
    dc.appendChild(rc);

    // Inline usage
    const di = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:14px;align-items:flex-start'});
    di.appendChild(el('div', {class:'spin-inline'},
      el('span', {class:'spin spin--xs'}),
      el('span', {}, 'กำลังบันทึก...')));
    di.appendChild(el('div', {class:'spin-inline'},
      el('span', {class:'spin spin--sm spin--success'}),
      el('span', {}, 'กำลังตรวจสอบสิทธิ์...')));
    const btn = el('button', {class:'btn btn--primary'});
    btn.innerHTML = '<span class="spin spin--xs" style="border-color:rgba(255,255,255,0.3);border-top-color:white"></span> กำลังประมวลผล';
    di.appendChild(btn);

    return section('spinner','37','Spinner / Loading indicator',
      '5 sizes · 5 color roles. ใช้ inline กับข้อความ, ภายในปุ่ม, หรือ overlay เต็มหน้า.',
      subsection('Sizes', d),
      subsection('Color roles', dc),
      subsection('Inline usage', di)
    );
  }

  // ═══ 38. SKELETON LOADER ═══
  function skeletonSection() {
    // Primitives
    const d = el('div', {class:'demo'});
    const stack = el('div', {class:'skel-stack', style:'max-width:520px'});
    stack.appendChild(el('div', {class:'skel skel--title', style:'width:60%'}));
    stack.appendChild(el('div', {class:'skel skel--text', style:'width:90%'}));
    stack.appendChild(el('div', {class:'skel skel--text', style:'width:80%'}));
    stack.appendChild(el('div', {class:'skel skel--text', style:'width:70%'}));
    stack.appendChild(el('div', {class:'skel skel--button', style:'margin-top:8px'}));
    d.appendChild(stack);

    // List with avatars
    const dl = el('div', {class:'demo'});
    const ls = el('div', {class:'skel-stack'});
    for (let k=0; k<4; k++) {
      const row = el('div', {class:'skel-row'});
      row.appendChild(el('div', {class:'skel skel--avatar'}));
      const col = el('div', {style:'flex:1;display:flex;flex-direction:column;gap:6px'});
      col.appendChild(el('div', {class:'skel skel--text-lg', style:'width:'+(40+k*8)+'%'}));
      col.appendChild(el('div', {class:'skel skel--text', style:'width:'+(60+k*4)+'%'}));
      row.appendChild(col);
      row.appendChild(el('div', {class:'skel skel--text', style:'width:48px'}));
      ls.appendChild(row);
    }
    dl.appendChild(ls);

    // Card grid skeleton
    const dc = el('div', {class:'demo'});
    const cg = el('div', {class:'grid grid-3'});
    for (let k=0; k<3; k++) {
      const card = el('div', {style:'border:1px solid var(--ax-border-subtle);border-radius:var(--ax-radius-md);padding:14px;display:flex;flex-direction:column;gap:8px'});
      card.appendChild(el('div', {class:'skel skel--text', style:'width:50%'}));
      card.appendChild(el('div', {class:'skel skel--title', style:'width:80%;margin:4px 0'}));
      card.appendChild(el('div', {class:'skel skel--text', style:'width:64%'}));
      cg.appendChild(card);
    }
    dc.appendChild(cg);

    // Table skeleton
    const dt = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    const tb = el('div', {style:'padding:14px'});
    for (let r=0; r<5; r++) {
      const row = el('div', {style:'display:grid;grid-template-columns:24px 1fr 100px 80px 60px;gap:14px;align-items:center;padding:10px 0;border-bottom:1px solid var(--ax-border-subtle)'});
      row.appendChild(el('div', {class:'skel skel--circle', style:'width:14px;height:14px'}));
      row.appendChild(el('div', {class:'skel skel--text', style:'width:'+(50+r*6)+'%'}));
      row.appendChild(el('div', {class:'skel skel--text'}));
      row.appendChild(el('div', {class:'skel skel--text', style:'width:60%'}));
      row.appendChild(el('div', {class:'skel skel--text', style:'width:40px'}));
      tb.appendChild(row);
    }
    dt.appendChild(tb);

    const g = el('div', {class:'grid grid-2', style:'align-items:start'});
    g.appendChild(subsection('Article block', d));
    g.appendChild(subsection('List with avatars', dl));

    return section('skeleton','38','Skeleton Loader',
      'Shimmer placeholder ก่อนข้อมูลโหลดเสร็จ — text, title, circle, avatar, button, card. ใช้แทนการกระพริบทั้งหน้า.',
      g,
      subsection('Card grid', dc),
      subsection('Table rows', dt)
    );
  }

  // ═══ 39. WIZARD / MULTI-STEP ═══
  function wizardSection() {
    const d = el('div', {class:'demo', style:'padding:0;background:var(--ax-background-page)'});
    const w = el('div', {class:'wizard'});

    // Nav
    const nav = el('div', {class:'wizard__nav'});
    [
      ['1','ข้อมูลผู้ป่วย','HN · ชื่อ · เพศ · อายุ', 'done'],
      ['2','ประวัติการแพ้','ยา / อาหาร / สิ่งแวดล้อม', 'done'],
      ['3','สัญญาณชีพ','BP · HR · Temp · SpO₂', 'active'],
      ['4','อาการสำคัญ','Chief complaint', 'pending'],
      ['5','ส่งตรวจ','แผนก · แพทย์ · ห้อง', 'pending'],
      ['6','สรุป & ยืนยัน','ตรวจสอบและบันทึก', 'pending']
    ].forEach(([n, t, sub, state]) => {
      const item = el('div', {class:'wizard__step is-'+state});
      const c = el('div', {class:'wizard__circle'});
      c.innerHTML = state === 'done' ? i('check',12) : n;
      item.appendChild(c);
      item.appendChild(el('div', {},
        el('div', {class:'wizard__title'}, t),
        el('div', {class:'wizard__sub'}, sub)
      ));
      nav.appendChild(item);
    });
    w.appendChild(nav);

    // Panel
    const panel = el('div', {class:'wizard__panel'});
    const head = el('div', {class:'wizard__panel-head'});
    head.appendChild(el('div', {class:'wizard__panel-eyebrow'}, 'ขั้นที่ 3 / 6'));
    head.appendChild(el('h3', {class:'wizard__panel-title'}, 'บันทึกสัญญาณชีพ'));
    head.appendChild(el('p', {class:'wizard__panel-desc'}, 'กรอก vital signs ของผู้ป่วยล่าสุด — ระบบจะ flag ค่าที่ผิดปกติอัตโนมัติ'));
    panel.appendChild(head);

    // form fields (use existing field/input)
    const grid = el('div', {class:'grid grid-2', style:'gap:14px;flex:1'});
    function fld(label, val, hint, hintRole) {
      const f = el('div');
      f.appendChild(el('label', {class:'field__label'}, label));
      f.appendChild(el('input', {class:'input', value:val, style:'margin-top:4px'}));
      if (hint) f.appendChild(el('div', {style:`font-size:11px;color:var(--ax-${hintRole||'text-subtle'});margin-top:4px;font-family:var(--ax-font-mono)`}, hint));
      return f;
    }
    grid.appendChild(fld('ความดันโลหิต (mmHg)', '128/82', 'normal range 90-120 / 60-80'));
    grid.appendChild(fld('ชีพจร (bpm)', '76', 'normal 60-100'));
    grid.appendChild(fld('อุณหภูมิ (°C)', '37.8', '↑ ไข้ต่ำ — แจ้งผู้ดูแล', 'warning-emphasis'));
    grid.appendChild(fld('SpO₂ (%)', '98', 'normal ≥ 95'));
    grid.appendChild(fld('อัตราหายใจ (/min)', '18', 'normal 12-20'));
    grid.appendChild(fld('น้ำหนัก (kg)', '68'));
    panel.appendChild(grid);

    const foot = el('div', {class:'wizard__foot'});
    foot.appendChild(el('button', {class:'btn btn--secondary'}, '← ก่อนหน้า'));
    foot.appendChild(el('div', {class:'wizard__progress'}, '3 / 6  ·  50%'));
    const next = el('button', {class:'btn btn--primary'}, 'ถัดไป →');
    foot.appendChild(next);
    panel.appendChild(foot);

    w.appendChild(panel);
    d.appendChild(w);

    return section('wizard','39','Stepper / Wizard',
      'Multi-step flow แนวตั้ง — admit, registration, การส่งต่อ. แสดง done/active/pending, กดข้ามขั้นที่เสร็จแล้วได้.',
      subsection('Patient admission flow (step 3 of 6)', d)
    );
  }

  // ═══ 40. OTP INPUT ═══
  function otpSection() {
    function makeOtp(values, opts={}) {
      const w = el('div', {class:'otp' + (opts.separated?' otp--separated':'')});
      const cls = 'otp__cell' + (opts.size?' otp__cell--'+opts.size:'') + (opts.error?' is-error':'');
      values.forEach((v, idx) => {
        const isFocus = opts.focus === idx;
        const filled = v !== '';
        w.appendChild(el('input', {
          class: cls + (filled?' is-filled':''),
          type:'text', maxlength:'1', value:v,
          inputmode:'numeric',
          ...(isFocus ? {autofocus:''} : {})
        }));
        if (opts.separated && idx === 2) {
          w.appendChild(el('span', {class:'otp__sep'}, '–'));
        }
      });
      return w;
    }

    // Default 6 digits — partial fill
    const d = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:18px;align-items:flex-start'});
    d.appendChild(el('div', {style:'display:flex;flex-direction:column;gap:8px'},
      el('label', {class:'field__label'}, 'รหัส OTP 6 หลัก (ส่งไปยัง •••• 8842)'),
      makeOtp(['4','7','2','9','',''], {focus:4})
    ));
    d.appendChild(el('div', {style:'display:flex;gap:14px;align-items:center;font-size:12px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono)'},
      el('span', {}, 'ขอรหัสใหม่ใน 0:42'),
      el('span', {style:'color:var(--ax-border-default)'}, '·'),
      el('a', {href:'#', style:'color:var(--ax-brand-emphasis)'}, 'ส่งรหัสซ้ำ')
    ));

    // Separated 3-3
    const ds = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:8px;align-items:flex-start'});
    ds.appendChild(el('label', {class:'field__label'}, 'รหัสยืนยัน 6 หลัก (3-3)'));
    ds.appendChild(makeOtp(['4','7','2','9','1','5'], {separated:true}));

    // Error state
    const de = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:8px;align-items:flex-start'});
    de.appendChild(el('label', {class:'field__label'}, 'รหัส OTP — ผิดพลาด'));
    de.appendChild(makeOtp(['4','7','2','9','1','3'], {error:true}));
    de.appendChild(el('div', {style:'font-size:11px;color:var(--ax-error-emphasis);margin-top:2px'},
      '✗ รหัส OTP ไม่ถูกต้อง — เหลือความพยายาม 2 ครั้ง'));

    // Sizes
    const dz = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:14px;align-items:flex-start'});
    dz.appendChild(el('div', {}, el('div', {class:'subsection__title', style:'margin-top:0;margin-bottom:6px'}, 'Small (4-digit PIN)'),
      makeOtp(['1','2','3',''], {size:'sm', focus:3})));
    dz.appendChild(el('div', {}, el('div', {class:'subsection__title', style:'margin-top:0;margin-bottom:6px'}, 'Default (6-digit OTP)'),
      makeOtp(['','','','','',''])));
    dz.appendChild(el('div', {}, el('div', {class:'subsection__title', style:'margin-top:0;margin-bottom:6px'}, 'Large (auth screens)'),
      makeOtp(['','','','','',''], {size:'lg'})));

    const g = el('div', {class:'grid grid-2', style:'align-items:start'});
    g.appendChild(subsection('6-digit · partial input', d));
    g.appendChild(subsection('Separated 3-3 · all filled', ds));

    const g2 = el('div', {class:'grid grid-2', style:'align-items:start'});
    g2.appendChild(subsection('Error state', de));
    g2.appendChild(subsection('Sizes', dz));

    return section('otp','40','OTP Input',
      '4–6 ช่องสำหรับ 2FA, ยืนยันการสั่งยา, ยืนยันการอนุมัติ. รองรับ paste auto-fill และแยกกลุ่ม 3-3.',
      g, g2
    );
  }

  // ═══ Build ═══
  const root = document.getElementById('sections-phase1') || document.getElementById('sections-advanced') || document.getElementById('sections');
  [
    multiselectSection,
    daterangeSection,
    timepickerSection,
    fileUploadSection,
    numberStepperSection,
    paginationSection,
    spinnerSection,
    skeletonSection,
    wizardSection,
    otpSection
  ].forEach(fn => {
    try { root.appendChild(fn()); } catch (e) { console.error(fn.name, e); }
  });

  // Light interactivity — number stepper +/- and OTP advance focus
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.stepnum__btn');
    if (!btn || btn.disabled) return;
    const sn = btn.closest('.stepnum');
    const inp = sn.querySelector('.stepnum__input');
    const isInc = btn === sn.lastElementChild;
    const cur = Number(inp.value || 0);
    const min = inp.min !== '' ? Number(inp.min) : -Infinity;
    const max = inp.max !== '' ? Number(inp.max) : Infinity;
    const next = Math.max(min, Math.min(max, cur + (isInc ? 1 : -1)));
    inp.value = next;
  });

  document.addEventListener('input', (ev) => {
    const cell = ev.target.closest('.otp__cell');
    if (!cell) return;
    cell.value = (cell.value || '').replace(/[^0-9]/g,'').slice(0,1);
    if (cell.value) {
      cell.classList.add('is-filled');
      const nxt = cell.parentElement.querySelectorAll('.otp__cell');
      const arr = Array.from(nxt);
      const i = arr.indexOf(cell);
      if (i < arr.length - 1) arr[i+1].focus();
    } else {
      cell.classList.remove('is-filled');
    }
  });
  document.addEventListener('keydown', (ev) => {
    const cell = ev.target.closest('.otp__cell');
    if (!cell) return;
    if (ev.key === 'Backspace' && !cell.value) {
      const arr = Array.from(cell.parentElement.querySelectorAll('.otp__cell'));
      const i = arr.indexOf(cell);
      if (i > 0) arr[i-1].focus();
    }
  });

})();
