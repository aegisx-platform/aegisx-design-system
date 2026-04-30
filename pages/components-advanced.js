/* ═══════════════════════════════════════════════════════════════
   AegisX DS — Advanced components (Angular Material 17+ coverage)
   + Untitled UI patterns
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

  const ICONS2 = {
    chevD:'<polyline points="6 9 12 15 18 9"/>',
    chevU:'<polyline points="18 15 12 9 6 15"/>',
    chevR:'<polyline points="9 18 15 12 9 6"/>',
    chevL:'<polyline points="15 18 9 12 15 6"/>',
    x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus:'<line x1="5" y1="12" x2="19" y2="12"/>',
    check:'<polyline points="20 6 9 17 4 12"/>',
    upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/>',
    copy:'<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    command:'<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>',
    heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    mail:'<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    link:'<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    image:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    more:'<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>'
  };
  const i2 = (n, s=14) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" class="icon-stroke">${ICONS2[n]||''}</svg>`;

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

  // ═══ 17. FORM FIELD ADVANCED ═══
  function formAdvanced() {
    // Autocomplete (Material)
    const ac = el('div', {class:'demo', style:'position:relative;max-width:420px'});
    ac.appendChild(el('div', {class:'field__label', style:'margin-bottom:6px'}, 'ค้นหาแพทย์ (Autocomplete)'));
    const acInp = el('div', {class:'input-icon'});
    acInp.innerHTML = i2('search',12);
    const inp = el('input', {class:'input', placeholder:'พิมพ์ชื่อหรือแผนก...', value:'นพ. ว'});
    acInp.appendChild(inp);
    ac.appendChild(acInp);
    const acMenu = el('div', {class:'autocomplete-menu'});
    [
      ['นพ. วรพล จิรายุ','อายุรกรรม · MED-042'],
      ['นพ. วิชัย สุทัศน์','ศัลยกรรม · SUR-018'],
      ['พญ. วลัยพร สมประสงค์','สูติ-นรีเวช · OBG-027'],
      ['นพ. วิสุทธิ์ นภาพันธ์','กุมาร · PED-011']
    ].forEach(([n, m], idx) => {
      const it = el('div', {class:'autocomplete-item' + (idx===0?' is-active':'')});
      it.innerHTML = `<div>${n}</div><div class="autocomplete-item__meta">${m}</div>`;
      acMenu.appendChild(it);
    });
    ac.appendChild(acMenu);

    // Datepicker (inline calendar)
    const dp = el('div', {class:'demo'});
    dp.appendChild(el('div', {class:'field__label', style:'margin-bottom:10px'}, 'เลือกวันนัดหมาย'));
    dp.appendChild(datepicker());

    // Time picker
    const tp = el('div', {class:'demo'});
    tp.appendChild(el('div', {class:'field__label', style:'margin-bottom:10px'}, 'เลือกเวลา (Time picker)'));
    const tw = el('div', {style:'display:flex;gap:10px;align-items:center'});
    tw.appendChild(timeInput('09','00'));
    tw.appendChild(el('span', {style:'color:var(--ax-text-subtle);font-size:12px'}, 'ถึง'));
    tw.appendChild(timeInput('10','30'));
    tp.appendChild(tw);

    // Slider
    const sl = el('div', {class:'demo'});
    sl.appendChild(el('div', {class:'field__label', style:'display:flex;justify-content:space-between;margin-bottom:14px'},
      el('span', {}, 'โดส Morphine (mg)'), el('span', {class:'mono', style:'color:var(--ax-brand-emphasis)'}, '8 mg')));
    sl.appendChild(slider(8, 20));

    const sl2 = el('div', {style:'margin-top:20px'});
    sl2.appendChild(el('div', {class:'field__label', style:'display:flex;justify-content:space-between;margin-bottom:14px'},
      el('span', {}, 'ช่วงอายุ (Range slider)'), el('span', {class:'mono', style:'color:var(--ax-brand-emphasis)'}, '18 – 65 ปี')));
    sl2.appendChild(rangeSlider(18, 65, 0, 120));
    sl.appendChild(sl2);

    // Chip input (tag)
    const ci = el('div', {class:'demo'});
    ci.appendChild(el('div', {class:'field__label', style:'margin-bottom:8px'}, 'แพ้ยา (Chip input)'));
    const chipField = el('div', {class:'chip-field'});
    ['Penicillin','Sulfa','Aspirin'].forEach(t => {
      const c = el('span', {class:'chip'});
      c.appendChild(document.createTextNode(t));
      c.innerHTML += `<button>${i2('x',10)}</button>`;
      chipField.appendChild(c);
    });
    chipField.appendChild(el('input', {class:'chip-field__input', placeholder:'พิมพ์ชื่อยา แล้วกด Enter...'}));
    ci.appendChild(chipField);

    // Rating
    const rt = el('div', {class:'demo'});
    rt.appendChild(el('div', {class:'field__label', style:'margin-bottom:8px'}, 'ความพึงพอใจ (Rating)'));
    const stars = el('div', {class:'rating'});
    for (let i=0;i<5;i++) {
      const s = el('span', {class:'rating__star' + (i<4?' is-filled':'')});
      s.innerHTML = i2('star', 18);
      stars.appendChild(s);
    }
    stars.appendChild(el('span', {class:'rating__label'}, '4.0 / 5'));
    rt.appendChild(stars);

    const g = el('div', {class:'grid grid-2'});
    g.appendChild(subsection('Autocomplete', ac));
    g.appendChild(subsection('Time picker · Slider · Range slider', (()=>{
      const w = el('div'); w.appendChild(tp); w.appendChild(el('div',{style:'height:10px'})); w.appendChild(sl); return w;
    })()));

    const g2 = el('div', {class:'grid grid-2'});
    g2.appendChild(subsection('Datepicker (inline)', dp));
    g2.appendChild(subsection('Chip input · Rating', (()=>{
      const w = el('div'); w.appendChild(ci); w.appendChild(el('div',{style:'height:10px'})); w.appendChild(rt); return w;
    })()));

    return section('form-adv','17','Form field · Advanced','Autocomplete · Datepicker · Time picker · Slider · Range · Chip input · Rating — ครบสำหรับ Angular Material form coverage.',
      g, g2
    );

    function timeInput(h, m) {
      const w = el('div', {class:'time-input'});
      w.innerHTML = i2('clock',12);
      w.appendChild(el('span', {class:'mono', style:'font-size:14px;font-weight:500;color:var(--ax-text-heading)'}, h));
      w.appendChild(el('span', {class:'mono', style:'color:var(--ax-text-subtle)'}, ':'));
      w.appendChild(el('span', {class:'mono', style:'font-size:14px;font-weight:500;color:var(--ax-text-heading)'}, m));
      return w;
    }

    function datepicker() {
      const root = el('div', {class:'datepicker'});
      const header = el('div', {class:'datepicker__head'});
      header.appendChild(el('button', {class:'btn btn--ghost btn--sm btn--icon', html:i2('chevL',12)}));
      header.appendChild(el('div', {class:'datepicker__title'}, 'พฤศจิกายน 2568'));
      header.appendChild(el('button', {class:'btn btn--ghost btn--sm btn--icon', html:i2('chevR',12)}));
      root.appendChild(header);

      const grid = el('div', {class:'datepicker__grid'});
      ['อา','จ','อ','พ','พฤ','ศ','ส'].forEach(d => grid.appendChild(el('div', {class:'datepicker__dow'}, d)));
      // November 2025 starts Saturday → 5 blanks ; 30 days
      for (let i=0;i<5;i++) grid.appendChild(el('div'));
      for (let d=1; d<=30; d++) {
        let cls = 'datepicker__day';
        if (d === 3) cls += ' is-today';
        if (d === 12) cls += ' is-selected';
        if (d === 15 || d === 22) cls += ' is-event';
        const day = el('div', {class:cls}, String(d));
        grid.appendChild(day);
      }
      root.appendChild(grid);

      const ft = el('div', {class:'datepicker__foot'});
      ft.appendChild(el('button', {class:'btn btn--ghost btn--sm'}, 'ล้าง'));
      ft.appendChild(el('button', {class:'btn btn--primary btn--sm'}, 'เลือก · 12 พ.ย.'));
      root.appendChild(ft);
      return root;
    }

    function slider(val, max, min=0) {
      const w = el('div', {class:'m-slider'});
      const track = el('div', {class:'m-slider__track'});
      const fill = el('div', {class:'m-slider__fill', style:`width:${(val-min)/(max-min)*100}%`});
      const thumb = el('div', {class:'m-slider__thumb', style:`left:${(val-min)/(max-min)*100}%`});
      track.appendChild(fill); track.appendChild(thumb);
      w.appendChild(track);
      const labels = el('div', {class:'m-slider__labels'});
      labels.appendChild(el('span', {}, String(min)));
      labels.appendChild(el('span', {}, String(max)));
      w.appendChild(labels);
      return w;
    }
    function rangeSlider(v1, v2, min, max) {
      const w = el('div', {class:'m-slider'});
      const track = el('div', {class:'m-slider__track'});
      const p1 = (v1-min)/(max-min)*100, p2 = (v2-min)/(max-min)*100;
      const fill = el('div', {class:'m-slider__fill', style:`left:${p1}%;width:${p2-p1}%`});
      const t1 = el('div', {class:'m-slider__thumb', style:`left:${p1}%`});
      const t2 = el('div', {class:'m-slider__thumb', style:`left:${p2}%`});
      track.appendChild(fill); track.appendChild(t1); track.appendChild(t2);
      w.appendChild(track);
      const labels = el('div', {class:'m-slider__labels'});
      labels.appendChild(el('span', {}, String(min)));
      labels.appendChild(el('span', {}, String(max)));
      w.appendChild(labels);
      return w;
    }
  }

  // ═══ 18. STEPPER ═══
  function stepperSection() {
    const horiz = el('div', {class:'demo'});
    const hs = el('div', {class:'stepper'});
    [
      ['1','ข้อมูลผู้ป่วย','เสร็จสิ้น','done'],
      ['2','ประวัติการรักษา','เสร็จสิ้น','done'],
      ['3','ตรวจวินิจฉัย','กำลังดำเนินการ','active'],
      ['4','สั่งยา','รอ','pending'],
      ['5','สรุป & ปิด','รอ','pending']
    ].forEach(([n, title, sub, state], i, arr) => {
      const item = el('div', {class:'stepper__item stepper__item--' + state});
      const circle = el('div', {class:'stepper__circle'});
      circle.innerHTML = state === 'done' ? i2('check',12) : n;
      item.appendChild(circle);
      item.appendChild(el('div', {class:'stepper__text'},
        el('div', {class:'stepper__title'}, title),
        el('div', {class:'stepper__sub'}, sub)
      ));
      hs.appendChild(item);
      if (i < arr.length-1) hs.appendChild(el('div', {class:'stepper__bar' + (state==='done'?' is-done':'')}));
    });
    horiz.appendChild(hs);

    // Vertical
    const vert = el('div', {class:'demo'});
    const vs = el('div', {class:'stepper stepper--vert'});
    [
      ['1','ยืนยันตัวตน','สแกนบัตรประชาชน หรือกรอกเลข 13 หลัก','done'],
      ['2','บันทึกอาการ','ประเมิน vital signs + chief complaint','active'],
      ['3','ส่งตรวจ','เลือกแผนกและแพทย์ผู้ทำการตรวจ','pending']
    ].forEach(([n, title, sub, state]) => {
      const item = el('div', {class:'stepper-v__item stepper__item--' + state});
      const col = el('div', {class:'stepper-v__col'});
      const circle = el('div', {class:'stepper__circle'});
      circle.innerHTML = state === 'done' ? i2('check',12) : n;
      col.appendChild(circle);
      col.appendChild(el('div', {class:'stepper-v__line'}));
      item.appendChild(col);
      item.appendChild(el('div', {style:'padding-bottom:18px'},
        el('div', {class:'stepper__title'}, title),
        el('div', {class:'stepper__sub', style:'margin-top:3px'}, sub)
      ));
      vs.appendChild(item);
    });
    vert.appendChild(vs);

    return section('stepper','18','Stepper','Horizontal + vertical · done/active/pending states.',
      subsection('Horizontal', horiz),
      subsection('Vertical', vert)
    );
  }

  // ═══ 19. ACCORDION / EXPANSION ═══
  function accordionSection() {
    const d = el('div', {class:'demo'});
    const acc = el('div', {class:'accordion'});
    [
      ['ข้อมูลทั่วไปของผู้ป่วย', 'สมชาย นพกุล · เพศชาย · 42 ปี · O+', true, 'BP 128/82 · HR 76 · SpO₂ 98% · Temp 36.8°C · Weight 68kg · Height 172cm'],
      ['ประวัติการรักษา', '3 ครั้งในปีนี้', false, 'ล่าสุด: 15 ต.ค. 2568 — OPD อายุรกรรม · Dx I10 HT'],
      ['ประวัติการแพ้', '2 รายการ', false, 'Penicillin (severe, anaphylaxis 2019) · Sulfa (mild rash)'],
      ['คำสั่งแพทย์ปัจจุบัน', '5 รายการ', false, 'Amlodipine 5mg OD · ASA 81mg OD · Atorvastatin 20mg hs · ...']
    ].forEach(([t, meta, open, body]) => {
      const item = el('div', {class:'accordion__item' + (open?' is-open':'')});
      const head = el('button', {class:'accordion__head'});
      head.innerHTML = `
        <span class="accordion__icon">${i2('chevD',14)}</span>
        <span class="accordion__title">${t}</span>
        <span class="accordion__meta">${meta}</span>`;
      head.addEventListener('click', () => item.classList.toggle('is-open'));
      item.appendChild(head);
      item.appendChild(el('div', {class:'accordion__body'}, body));
      acc.appendChild(item);
    });
    d.appendChild(acc);
    return section('accordion','19','Expansion panel / Accordion','Collapsible content · single or multi-open · with meta info.',
      subsection('Patient record (multi-open)', d)
    );
  }

  // ═══ 20. LIST / TREE / TIMELINE ═══
  function listSection() {
    // 3-line List (Material)
    const list = el('div', {class:'demo'});
    const lst = el('div', {class:'mat-list'});
    [
      ['นพ. วรพล จิรายุ','อายุรกรรม · ห้อง OPD-3','กำลังตรวจ · คิว #4','brand'],
      ['พญ. ศรีสุดา กาญจนา','OPD ทั่วไป · ห้อง OPD-1','พักเที่ยง · กลับ 13:00','warning'],
      ['นพ. อธิชา พัฒนกุล','ศัลยกรรม · ห้อง OR-2','กำลังผ่าตัด · 2h 15m','error'],
      ['ทน. ชญานิษฐ์ วาสนา','ห้องยา OPD','Online','success']
    ].forEach(([n, sub, meta, role], i) => {
      const it = el('div', {class:'mat-list__item'});
      const av = el('div', {class:'avatar', style:`background:var(--ax-${role}-faint);color:var(--ax-${role}-emphasis)`}, n.split(' ')[0].slice(-2));
      it.appendChild(av);
      it.appendChild(el('div', {class:'mat-list__text'},
        el('div', {class:'mat-list__primary'}, n),
        el('div', {class:'mat-list__secondary'}, sub),
        el('div', {class:'mat-list__tertiary'}, meta)
      ));
      const more = el('button', {class:'btn btn--ghost btn--sm btn--icon'}); more.innerHTML = i2('more',14);
      it.appendChild(more);
      lst.appendChild(it);
    });
    list.appendChild(lst);

    // Tree
    const tree = el('div', {class:'demo'});
    const tr = el('div', {class:'tree'});
    const nodes = [
      {l:'โรงพยาบาล AegisX', exp:true, c:[
        {l:'อาคาร A — ผู้ป่วยนอก', exp:true, c:[
          {l:'ชั้น 1 — OPD ทั่วไป', c:[{l:'ห้อง OPD-1'},{l:'ห้อง OPD-2'},{l:'ห้อง OPD-3'}]},
          {l:'ชั้น 2 — OPD เฉพาะทาง'}
        ]},
        {l:'อาคาร B — ผู้ป่วยใน', c:[
          {l:'วอร์ด 3A'},{l:'วอร์ด 3B'},{l:'วอร์ด 5A'}
        ]},
        {l:'อาคาร C — ฉุกเฉิน & ผ่าตัด'}
      ]}
    ];
    function renderNode(n, depth=0) {
      const wrap = el('div');
      const row = el('div', {class:'tree__node', style:`padding-left:${10 + depth*18}px`});
      if (n.c && n.c.length) {
        const chev = el('span', {class:'tree__chev' + (n.exp?' is-open':'')});
        chev.innerHTML = i2('chevR',10);
        row.appendChild(chev);
      } else {
        row.appendChild(el('span', {class:'tree__chev tree__chev--leaf'}));
      }
      row.appendChild(el('span', {class:'tree__icon', html: n.c ? i2('folder',12) : i2('file',12)}));
      row.appendChild(el('span', {}, n.l));
      row.addEventListener('click', () => {
        if (n.c) { n.exp = !n.exp; tr.innerHTML = ''; nodes.forEach(x => tr.appendChild(renderNode(x))); }
      });
      wrap.appendChild(row);
      if (n.c && n.exp) {
        n.c.forEach(child => wrap.appendChild(renderNode(child, depth+1)));
      }
      return wrap;
    }
    nodes.forEach(n => tr.appendChild(renderNode(n)));
    tree.appendChild(tr);

    // Timeline
    const tl = el('div', {class:'demo'});
    const tline = el('div', {class:'timeline'});
    [
      ['14:32','success','check','บันทึกเวชระเบียน','นพ. วรพล จิรายุ'],
      ['14:10','brand','edit','แก้ไขคำสั่งยา','+ Amlodipine 5mg'],
      ['13:45','info','file','อัปโหลดผล Lab','CBC, BUN/Cr, FBS — 3 ไฟล์'],
      ['13:20','warning','bell','แจ้งเตือนยาใกล้หมด','Insulin Glargine — 42 หลอด'],
      ['12:50','neutral','user','เริ่มตรวจผู้ป่วย','HN 68-12345-01']
    ].forEach(([t, role, ic, title, sub]) => {
      const item = el('div', {class:'timeline__item'});
      const dot = el('div', {class:'timeline__dot', style:`background:var(--ax-${role==='neutral'?'background':role}-faint);color:var(--ax-${role==='neutral'?'text':role}-emphasis)`});
      dot.innerHTML = i2(ic,12);
      item.appendChild(dot);
      item.appendChild(el('div', {class:'timeline__content'},
        el('div', {style:'display:flex;justify-content:space-between;align-items:baseline;gap:8px'},
          el('div', {style:'font-weight:500;color:var(--ax-text-heading);font-size:13px'}, title),
          el('span', {class:'mono', style:'font-size:11px;color:var(--ax-text-subtle)'}, t)
        ),
        el('div', {style:'font-size:12px;color:var(--ax-text-secondary);margin-top:2px'}, sub)
      ));
      tline.appendChild(item);
    });
    tl.appendChild(tline);

    const g = el('div', {class:'grid grid-2'});
    g.appendChild(subsection('Material List (3-line)', list));
    g.appendChild(subsection('Tree view', tree));

    return section('list','20','List · Tree · Timeline','Material list (1/2/3-line) · tree node · activity timeline.',
      g,
      subsection('Timeline (activity feed)', tl)
    );
  }

  // ═══ 21. MENU / DROPDOWN ═══
  function menuSection() {
    const d = el('div', {class:'demo', style:'display:flex;gap:30px;flex-wrap:wrap'});

    // Context menu
    const cm = el('div', {class:'menu', style:'position:static'});
    [
      {i:'edit',l:'แก้ไข',k:'⌘E'},
      {i:'copy',l:'สำเนา',k:'⌘C'},
      {i:'file',l:'ดูรายละเอียด',k:'⌘↵'},
      null,
      {i:'mail',l:'ส่งอีเมลถึงผู้ป่วย'},
      {i:'bell',l:'ตั้งการแจ้งเตือน'},
      null,
      {i:'trash',l:'ลบเวชระเบียน',k:'⌘⌫',danger:true}
    ].forEach(x => {
      if (x === null) { cm.appendChild(el('div', {class:'menu__divider'})); return; }
      const m = el('div', {class:'menu__item' + (x.danger?' menu__item--danger':'')});
      m.innerHTML = `
        <span class="menu__icon">${i2(x.i,14)}</span>
        <span class="menu__label">${x.l}</span>
        ${x.k ? `<span class="menu__kbd mono">${x.k}</span>` : ''}
      `;
      cm.appendChild(m);
    });

    // User menu (with header)
    const um = el('div', {class:'menu', style:'position:static'});
    const umHead = el('div', {class:'menu__header'});
    umHead.innerHTML = `
      <div class="avatar avatar--lg" style="background:var(--ax-brand-faint);color:var(--ax-brand-emphasis)">วพ</div>
      <div>
        <div style="font-weight:600;color:var(--ax-text-heading);font-size:13px">นพ. วรพล จิรายุ</div>
        <div class="mono" style="font-size:10px;color:var(--ax-text-subtle)">MED-042 · อายุรกรรม</div>
      </div>
    `;
    um.appendChild(umHead);
    [
      {i:'user',l:'โปรไฟล์ของฉัน'},
      {i:'settings',l:'การตั้งค่า',k:'⌘,'},
      {i:'help',l:'ศูนย์ช่วยเหลือ'},
      null,
      {i:'logout',l:'ออกจากระบบ',k:'⌘Q'}
    ].forEach(x => {
      if (x === null) { um.appendChild(el('div', {class:'menu__divider'})); return; }
      const m = el('div', {class:'menu__item'});
      m.innerHTML = `
        <span class="menu__icon">${i2(x.i,14)}</span>
        <span class="menu__label">${x.l}</span>
        ${x.k ? `<span class="menu__kbd mono">${x.k}</span>` : ''}
      `;
      um.appendChild(m);
    });

    d.appendChild(cm);
    d.appendChild(um);

    return section('menu','21','Menu / Dropdown','Context menu · user menu · with icons, keyboard hints, sections.',
      subsection('Menu variants', d)
    );
  }

  // ═══ 22. TOOLTIP / POPOVER / KBD ═══
  function tooltipSection() {
    const d = el('div', {class:'demo', style:'display:flex;gap:40px;flex-wrap:wrap;align-items:center;justify-content:center;padding:40px'});
    // Tooltip
    const tg = el('div', {style:'position:relative'});
    tg.appendChild(el('button', {class:'btn btn--secondary btn--sm'}, 'Hover me'));
    tg.innerHTML += `<span class="tooltip tooltip--top">กด ⌘K เพื่อเปิดคำสั่ง</span>`;

    const tg2 = el('div', {style:'position:relative'});
    tg2.appendChild(el('button', {class:'btn btn--secondary btn--sm btn--icon', html: i2('help',14)}));
    tg2.innerHTML += `<span class="tooltip tooltip--right">ความช่วยเหลือ</span>`;

    // Popover
    const pg = el('div', {style:'position:relative'});
    pg.innerHTML = `
      <button class="btn btn--primary btn--sm">Info popover</button>
      <div class="popover">
        <div class="popover__arrow"></div>
        <div class="popover__title">เกี่ยวกับ HN</div>
        <p class="popover__body">Hospital Number — หมายเลขประจำตัวผู้ป่วยในระบบโรงพยาบาล มี 11 หลัก ประกอบด้วยปี · ลำดับ · สาขา</p>
        <div class="popover__foot">
          <a href="#" class="btn btn--link" style="font-size:11px">เรียนรู้เพิ่มเติม →</a>
        </div>
      </div>
    `;

    d.appendChild(tg);
    d.appendChild(tg2);
    d.appendChild(pg);

    // Kbd
    const kb = el('div', {class:'demo', style:'display:flex;gap:16px;flex-wrap:wrap;align-items:center'});
    [
      ['Open command', ['⌘','K']],
      ['Save', ['⌘','S']],
      ['Delete', ['⌘','⌫']],
      ['New patient', ['⌘','⇧','P']],
      ['Search', ['/']]
    ].forEach(([l, keys]) => {
      const w = el('div', {style:'display:flex;gap:8px;align-items:center;font-size:12px;color:var(--ax-text-secondary)'});
      w.appendChild(el('span', {}, l));
      const kbs = el('span', {style:'display:inline-flex;gap:2px'});
      keys.forEach(k => {
        const kbd = el('kbd', {class:'kbd'}, k);
        kbs.appendChild(kbd);
      });
      w.appendChild(kbs);
      kb.appendChild(w);
    });

    return section('tooltip','22','Tooltip · Popover · Keyboard shortcuts','Hover tooltip · rich popover · kbd glyphs.',
      subsection('Tooltips & popover', d),
      subsection('Keyboard shortcuts (kbd)', kb)
    );
  }

  // ═══ 23. BUTTON FAMILY ═══
  function buttonFamily() {
    // Button toggles
    const bt = el('div', {class:'demo row'});
    const grp1 = el('div', {class:'button-toggle-group'});
    ['วันนี้','สัปดาห์','เดือน','ไตรมาส','ปี'].forEach((l,i) => {
      grp1.appendChild(el('button', {class:'button-toggle' + (i===1?' is-active':'')}, l));
    });
    bt.appendChild(grp1);

    const grp2 = el('div', {class:'button-toggle-group'});
    [[ICONS2.grid,'Grid'],[ICONS2.list,'List']].forEach(([svg,l],i) => {
      const b = el('button', {class:'button-toggle' + (i===0?' is-active':'')});
      b.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" class="icon-stroke">${svg}</svg>${l}`;
      grp2.appendChild(b);
    });
    bt.appendChild(grp2);

    // FAB
    const fab = el('div', {class:'demo', style:'display:flex;gap:20px;flex-wrap:wrap;align-items:center'});
    const f1 = el('button', {class:'fab'}); f1.innerHTML = i2('plus',18);
    const f2 = el('button', {class:'fab fab--extended'}); f2.innerHTML = i2('plus',14) + 'สร้างเคสใหม่';
    const f3 = el('button', {class:'fab fab--sm'}); f3.innerHTML = i2('edit',12);
    fab.appendChild(f1); fab.appendChild(f2); fab.appendChild(f3);

    // Split button
    const sp = el('div', {class:'demo row'});
    const sb = el('div', {class:'split-btn'});
    sb.innerHTML = `
      <button class="split-btn__main">Export CSV</button>
      <button class="split-btn__toggle">${i2('chevD',10)}</button>
    `;
    sp.appendChild(sb);
    const sb2 = el('div', {class:'split-btn split-btn--secondary'});
    sb2.innerHTML = `
      <button class="split-btn__main">บันทึกร่าง</button>
      <button class="split-btn__toggle">${i2('chevD',10)}</button>
    `;
    sp.appendChild(sb2);

    // Icon button with badge
    const ic = el('div', {class:'demo row'});
    [
      [ICONS2.bell, 3, 'error'],
      [ICONS2.mail, 12, 'brand'],
      [ICONS2.heart, 0, null]
    ].forEach(([svg, cnt, role]) => {
      const b = el('div', {style:'position:relative;display:inline-block'});
      const btn = el('button', {class:'btn btn--secondary btn--icon'});
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" class="icon-stroke">${svg}</svg>`;
      b.appendChild(btn);
      if (cnt) {
        const dot = el('span', {class:'btn-badge', style:`background:var(--ax-${role}-default);color:var(--ax-${role}-inverted)`});
        dot.textContent = cnt > 9 ? '9+' : String(cnt);
        b.appendChild(dot);
      }
      ic.appendChild(b);
    });

    return section('button-fam','23','Button family','Toggle group · FAB · Split button · Icon button with badge.',
      subsection('Button toggle group (segmented)', bt),
      subsection('FAB (Floating Action Button)', fab),
      subsection('Split button', sp),
      subsection('Icon button with notification badge', ic)
    );
  }

  // ═══ 24. DIALOG / BOTTOM SHEET / DRAWER ═══
  function dialogSection() {
    // Form dialog
    const fd = el('div', {class:'modal-demo'});
    const m = el('div', {class:'modal', style:'width:520px'});
    m.innerHTML = `
      <button class="modal__close">${i2('x',14)}</button>
      <div class="modal__header">
        <h3 class="modal__title">สร้างนัดหมายใหม่</h3>
        <p class="modal__sub">สำหรับ HN 68-12345-01 · นายสมชาย นพกุล</p>
      </div>
      <div class="modal__body" style="padding:14px 24px 20px">
        <div class="grid grid-2" style="gap:12px">
          <div class="field">
            <div class="field__label">วันที่</div>
            <div class="input-icon">${i2('calendar',12)}<input class="input" value="12 พ.ย. 2568"/></div>
          </div>
          <div class="field">
            <div class="field__label">เวลา</div>
            <div class="input-icon">${i2('clock',12)}<input class="input" value="09:30"/></div>
          </div>
          <div class="field" style="grid-column:span 2">
            <div class="field__label">แผนก</div>
            <select class="input select"><option>อายุรกรรม — OPD-3</option></select>
          </div>
          <div class="field" style="grid-column:span 2">
            <div class="field__label">หมายเหตุ</div>
            <textarea class="input" placeholder="กรอกเหตุผลการนัด...">ติดตามผล Lab FBS/HbA1c</textarea>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--ghost btn--sm">ยกเลิก</button>
        <button class="btn btn--primary btn--sm">บันทึกและส่ง SMS</button>
      </div>
    `;
    fd.appendChild(m);

    // Bottom sheet (mobile)
    const bs = el('div', {class:'modal-demo', style:'padding:20px 20px 0;min-height:300px;align-items:flex-end'});
    const bot = el('div', {class:'bottom-sheet'});
    bot.innerHTML = `
      <div class="bottom-sheet__handle"></div>
      <div style="padding:8px 16px 12px">
        <h3 style="margin:0 0 10px;font-size:15px;font-weight:600;color:var(--ax-text-heading)">การดำเนินการด่วน</h3>
        <div class="bottom-sheet__items">
          <button class="bottom-sheet__item">${i2('plus',18)}<span>เพิ่มผู้ป่วย</span></button>
          <button class="bottom-sheet__item">${i2('calendar',18)}<span>นัดหมาย</span></button>
          <button class="bottom-sheet__item">${i2('file',18)}<span>ใบสั่งยา</span></button>
          <button class="bottom-sheet__item">${i2('search',18)}<span>ค้นหา</span></button>
        </div>
      </div>
    `;
    bs.appendChild(bot);

    // Drawer (side panel)
    const dr = el('div', {class:'drawer-demo'});
    dr.innerHTML = `
      <div class="drawer-backdrop"></div>
      <aside class="drawer">
        <div class="drawer__head">
          <h3 style="margin:0;font-size:15px;font-weight:600;color:var(--ax-text-heading)">ตัวกรองขั้นสูง</h3>
          <button class="btn btn--ghost btn--sm btn--icon">${i2('x',14)}</button>
        </div>
        <div class="drawer__body">
          <div style="display:flex;flex-direction:column;gap:14px">
            <div class="field">
              <div class="field__label">ช่วงวันที่</div>
              <div style="display:flex;gap:8px"><input class="input" value="1 พ.ย. 2568"/><input class="input" value="3 พ.ย. 2568"/></div>
            </div>
            <div class="field">
              <div class="field__label">แผนก</div>
              <select class="input select"><option>ทุกแผนก</option></select>
            </div>
            <div class="field">
              <div class="field__label">สถานะ</div>
              <div style="display:flex;flex-direction:column;gap:6px">
                <label class="check"><input type="checkbox" checked/><span class="check__box"></span>กำลังตรวจ</label>
                <label class="check"><input type="checkbox" checked/><span class="check__box"></span>รอตรวจ</label>
                <label class="check"><input type="checkbox"/><span class="check__box"></span>ตรวจแล้ว</label>
              </div>
            </div>
          </div>
        </div>
        <div class="drawer__foot">
          <button class="btn btn--ghost btn--sm">ล้างทั้งหมด</button>
          <button class="btn btn--primary btn--sm">ใช้ตัวกรอง (3)</button>
        </div>
      </aside>
    `;

    return section('dialog','24','Dialog · Bottom sheet · Drawer','Form dialog · mobile action sheet · filter drawer — Material dialog family ครบ.',
      subsection('Form dialog', fd),
      subsection('Bottom sheet (mobile)', bs),
      subsection('Side drawer / filter panel', dr)
    );
  }

  // ═══ 25. SNACKBAR / NOTIFICATION CENTER ═══
  function snackbarSection() {
    // Material snackbars
    const sb = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:8px;max-width:540px'});
    [
      ['Default','บันทึกข้อมูลสำเร็จ','เลิกทำ'],
      ['success','ส่งเบิก NHSO แล้ว · เคส 42','ดู'],
      ['warning','การเชื่อมต่อช้า · กำลัง retry 2/3',''],
      ['error','ไม่สามารถบันทึกได้ · รหัสผิดพลาด 500','ลองใหม่']
    ].forEach(([variant, msg, action]) => {
      const s = el('div', {class:'snackbar' + (variant !== 'Default' ? ' snackbar--'+variant.toLowerCase() : '')});
      s.appendChild(el('span', {class:'snackbar__msg'}, msg));
      if (action) s.appendChild(el('button', {class:'snackbar__action'}, action));
      sb.appendChild(s);
    });

    // Notification center
    const nc = el('div', {class:'demo', style:'max-width:380px;padding:0'});
    const ncHead = el('div', {style:'display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid var(--ax-border-subtle)'});
    ncHead.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        <strong style="font-size:13px;color:var(--ax-text-heading)">การแจ้งเตือน</strong>
        <span class="badge badge--brand">4 ใหม่</span>
      </div>
      <button class="btn btn--link" style="font-size:11px">ทำเครื่องหมายว่าอ่านแล้ว</button>`;
    nc.appendChild(ncHead);
    const nlist = el('div');
    [
      ['warning','bell','ยาใกล้หมด · Insulin Glargine','เหลือ 42 หลอด (ต่ำกว่า reorder point)','2 นาทีที่แล้ว',true],
      ['brand','calendar','นัดหมายใหม่ · 14:30','นายสมชาย · ติดตามผล Lab','12 นาทีที่แล้ว',true],
      ['success','check','อนุมัติเบิกจ่าย','RX-2025-0892 · ฿ 2,580','1 ชั่วโมงที่แล้ว',true],
      ['error','bell','ส่งเบิก NHSO ผิดพลาด','ICD-10 code ไม่ตรงกับ Dx primary','3 ชั่วโมงที่แล้ว',true],
      ['info','mail','ข้อความใหม่จาก นพ. วรพล','กรุณาตรวจสอบผล lab เคส 42','เมื่อวาน',false]
    ].forEach(([role, ico, title, body, time, unread]) => {
      const it = el('div', {class:'notif' + (unread?' notif--unread':'')});
      const icn = el('div', {class:'notif__icon', style:`background:var(--ax-${role}-faint);color:var(--ax-${role}-emphasis)`});
      icn.innerHTML = i2(ico,12);
      it.appendChild(icn);
      it.appendChild(el('div', {class:'notif__body'},
        el('div', {class:'notif__title'}, title),
        el('div', {class:'notif__sub'}, body),
        el('div', {class:'notif__time mono'}, time)
      ));
      if (unread) it.appendChild(el('span', {class:'notif__dot'}));
      nlist.appendChild(it);
    });
    nc.appendChild(nlist);

    return section('snackbar','25','Snackbar · Notification center','Material snackbar (4 variants) · rich notification feed.',
      subsection('Snackbars', sb),
      subsection('Notification center', nc)
    );
  }

  // ═══ 26. PROGRESS / LOADERS ═══
  function progressSection() {
    const d = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:20px'});

    // Determinate
    d.appendChild(el('div', {},
      el('div', {style:'display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px'},
        el('span', {}, 'อัปโหลด DRG 2568'),
        el('span', {class:'mono muted'}, '68%')),
      progressBar(68)
    ));
    d.appendChild(el('div', {},
      el('div', {style:'display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px'},
        el('span', {}, 'Sync ข้อมูล HIS'),
        el('span', {class:'mono muted'}, '100%')),
      progressBar(100, 'success')
    ));
    // Indeterminate
    d.appendChild(el('div', {},
      el('div', {class:'field__label', style:'margin-bottom:6px'}, 'Indeterminate'),
      el('div', {class:'progress progress--indeterminate'},
        el('div', {class:'progress__bar'})
      )
    ));
    // Buffer
    d.appendChild(el('div', {},
      el('div', {class:'field__label', style:'margin-bottom:6px'}, 'Buffer progress'),
      el('div', {class:'progress progress--buffer'},
        el('div', {class:'progress__buffer', style:'width:78%'}),
        el('div', {class:'progress__bar', style:'width:52%'})
      )
    ));

    // Spinners
    const sp = el('div', {class:'demo', style:'display:flex;gap:30px;flex-wrap:wrap;align-items:center;justify-content:center;padding:30px'});
    [16, 24, 32, 48].forEach(s => {
      const w = el('div', {style:'display:flex;flex-direction:column;align-items:center;gap:8px'});
      w.innerHTML = `
        <div class="spinner" style="width:${s}px;height:${s}px;border-width:${Math.max(2,s/12)}px"></div>
        <span class="mono" style="font-size:10px;color:var(--ax-text-subtle)">${s}px</span>
      `;
      sp.appendChild(w);
    });
    // Circular determinate
    const circProg = el('div', {style:'position:relative;width:48px;height:48px'});
    circProg.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--ax-background-muted)" stroke-width="4"/>
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--ax-brand-default)" stroke-width="4"
                stroke-dasharray="${2*Math.PI*20}" stroke-dashoffset="${2*Math.PI*20*0.32}"
                stroke-linecap="round" transform="rotate(-90 24 24)"/>
      </svg>
      <span class="mono" style="position:absolute;inset:0;display:grid;place-items:center;font-size:11px;font-weight:600;color:var(--ax-text-heading)">68%</span>
    `;
    sp.appendChild(circProg);

    return section('progress','26','Progress & Loaders','Linear (determinate/indeterminate/buffer) · circular spinner (4 sizes) · determinate circular.',
      subsection('Linear progress', d),
      subsection('Spinners', sp)
    );

    function progressBar(pct, role='brand') {
      const p = el('div', {class:'progress'});
      p.appendChild(el('div', {class:'progress__bar', style:`width:${pct}%;background:var(--ax-${role}-default)`}));
      return p;
    }
  }

  // ═══ 27. FILE UPLOAD / DROPZONE ═══
  function uploadSection() {
    const d = el('div', {class:'demo'});
    const dz = el('div', {class:'dropzone'});
    dz.innerHTML = `
      <div class="dropzone__icon">${i2('upload',22)}</div>
      <div class="dropzone__title">ลากไฟล์มาวาง หรือ <a href="#" style="color:var(--ax-brand-emphasis);font-weight:500">เลือกไฟล์</a></div>
      <div class="dropzone__sub">PDF, JPG, PNG, DICOM · สูงสุด 20MB ต่อไฟล์</div>
    `;
    d.appendChild(dz);

    // Upload list
    const ul = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:8px'});
    [
      ['X-Ray Chest PA.dicom','2.4 MB','100','success'],
      ['CBC Report.pdf','140 KB','100','success'],
      ['MRI Brain.dicom','18.2 MB','62','progress'],
      ['Lab-report-draft.pdf','—','0','error']
    ].forEach(([name, size, pct, state]) => {
      const it = el('div', {class:'upload-item'});
      it.innerHTML = `
        <div class="upload-item__icon">${i2('file',16)}</div>
        <div class="upload-item__body">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span style="font-size:13px;color:var(--ax-text-heading);font-weight:500">${name}</span>
            <span class="mono" style="font-size:10px;color:var(--ax-text-subtle)">${size}</span>
          </div>
          ${state==='progress' ? `<div class="progress" style="height:4px;margin-top:6px"><div class="progress__bar" style="width:${pct}%"></div></div>` : ''}
          ${state==='success' ? `<div style="font-size:11px;color:var(--ax-success-emphasis);margin-top:2px">✓ อัปโหลดสำเร็จ</div>` : ''}
          ${state==='error' ? `<div style="font-size:11px;color:var(--ax-error-emphasis);margin-top:2px">✗ ไฟล์ใหญ่เกินกำหนด</div>` : ''}
        </div>
        <button class="btn btn--ghost btn--sm btn--icon">${i2('x',12)}</button>
      `;
      ul.appendChild(it);
    });

    return section('upload','27','File upload','Dropzone · upload list with progress/success/error states.',
      subsection('Dropzone', d),
      subsection('Upload list', ul)
    );
  }

  // ═══ 28. COMMAND PALETTE (Cmd+K) ═══
  function commandSection() {
    const d = el('div', {class:'demo', style:'padding:24px;background:var(--ax-background-page)'});
    const c = el('div', {class:'cmdk'});
    c.innerHTML = `
      <div class="cmdk__search">
        ${i2('search',14)}
        <input class="cmdk__input" value="ผู้ป่วย" placeholder="พิมพ์คำสั่งหรือค้นหา..." />
        <kbd class="kbd">esc</kbd>
      </div>
      <div class="cmdk__group">
        <div class="cmdk__group-title">ผลการค้นหา</div>
        <div class="cmdk__item is-active">
          ${i2('user',14)}
          <span>สมชาย นพกุล · HN 68-12345-01</span>
          <span class="mono" style="color:var(--ax-text-subtle);font-size:10px;margin-left:auto">ผู้ป่วย</span>
        </div>
        <div class="cmdk__item">
          ${i2('user',14)}
          <span>สมหญิง ประเสริฐ · HN 68-12388-05</span>
          <span class="mono" style="color:var(--ax-text-subtle);font-size:10px;margin-left:auto">ผู้ป่วย</span>
        </div>
      </div>
      <div class="cmdk__group">
        <div class="cmdk__group-title">การดำเนินการ</div>
        <div class="cmdk__item">
          ${i2('plus',14)}
          <span>สร้างผู้ป่วยใหม่</span>
          <kbd class="kbd" style="margin-left:auto">⌘</kbd><kbd class="kbd">N</kbd>
        </div>
        <div class="cmdk__item">
          ${i2('calendar',14)}
          <span>นัดหมายใหม่</span>
          <kbd class="kbd" style="margin-left:auto">⌘</kbd><kbd class="kbd">⇧</kbd><kbd class="kbd">A</kbd>
        </div>
        <div class="cmdk__item">
          ${i2('file',14)}
          <span>สั่งยาใหม่</span>
          <kbd class="kbd" style="margin-left:auto">⌘</kbd><kbd class="kbd">R</kbd>
        </div>
      </div>
      <div class="cmdk__foot">
        <span><kbd class="kbd">↵</kbd>เลือก</span>
        <span><kbd class="kbd">↑</kbd><kbd class="kbd">↓</kbd>เลื่อน</span>
        <span><kbd class="kbd">esc</kbd>ปิด</span>
      </div>
    `;
    d.appendChild(c);

    return section('command','28','Command palette','⌘K spotlight — search + actions + keyboard navigation. Untitled UI pattern.',
      subsection('Command (⌘K)', d)
    );
  }

  // ═══ 29. CODE BLOCK ═══
  function codeSection() {
    const d = el('div', {class:'demo'});
    const cb = el('div', {class:'code-block'});
    cb.innerHTML = `
      <div class="code-block__head">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="mono" style="font-size:10px;color:var(--ax-text-subtle)">aegisx.theme.ts</span>
        </div>
        <button class="btn btn--ghost btn--sm">${i2('copy',12)}คัดลอก</button>
      </div>
      <pre class="code-block__body"><code><span class="tok-kw">import</span> { createTheme } <span class="tok-kw">from</span> <span class="tok-str">'@angular/material'</span>;

<span class="tok-kw">export const</span> <span class="tok-fn">aegisxTheme</span> = <span class="tok-fn">createTheme</span>({
  <span class="tok-prop">color</span>: {
    <span class="tok-prop">primary</span>: <span class="tok-str">'#3f51b5'</span>,  <span class="tok-cmt">// Indigo</span>
    <span class="tok-prop">accent</span>:  <span class="tok-str">'#10b981'</span>,  <span class="tok-cmt">// Emerald</span>
    <span class="tok-prop">warn</span>:    <span class="tok-str">'#ef4444'</span>,  <span class="tok-cmt">// Red</span>
  },
  <span class="tok-prop">density</span>: <span class="tok-num">-1</span>,
  <span class="tok-prop">typography</span>: {
    <span class="tok-prop">fontFamily</span>: <span class="tok-str">'IBM Plex Sans Thai'</span>,
  }
});</code></pre>
    `;
    d.appendChild(cb);
    return section('code','29','Code block','Syntax-highlighted code · copy button · filename header.',
      subsection('Example · Angular Material theme config', d)
    );
  }

  // ═══ 30. DIVIDER / EMPTY EXTRAS ═══
  function dividerSection() {
    const d = el('div', {class:'demo'});
    d.appendChild(el('div', {},
      el('p', {style:'margin:0;color:var(--ax-text-secondary)'}, 'ข้อความด้านบน'),
      el('hr', {class:'hr'}),
      el('p', {style:'margin:0;color:var(--ax-text-secondary)'}, 'ข้อความด้านล่าง')
    ));

    d.appendChild(el('div', {style:'margin-top:20px'},
      el('div', {class:'hr-labeled'}, el('span', {}, 'หรือดำเนินการต่อด้วย'))
    ));

    d.appendChild(el('div', {style:'margin-top:20px'},
      el('div', {class:'hr hr--dashed'})
    ));

    // Inline divider for lists
    d.appendChild(el('div', {style:'margin-top:20px;display:flex;align-items:center;gap:12px;color:var(--ax-text-secondary);font-size:13px'},
      el('span', {}, 'OPD'),
      el('span', {class:'vr'}),
      el('span', {}, 'ห้อง 3'),
      el('span', {class:'vr'}),
      el('span', {}, 'คิว #4'),
      el('span', {class:'vr'}),
      el('span', {class:'mono', style:'font-size:11px'}, '14:32')
    ));

    return section('divider','30','Dividers & separators','Horizontal rule · labeled divider · dashed · inline vertical.',
      subsection('Variants', d)
    );
  }

  // ═══ Build ═══
  const root = document.getElementById('sections-advanced') || document.getElementById('sections');
  [formAdvanced, stepperSection, accordionSection, listSection, menuSection,
   tooltipSection, buttonFamily, dialogSection, snackbarSection,
   progressSection, uploadSection, commandSection, codeSection, dividerSection
  ].forEach(fn => {
    try { root.appendChild(fn()); } catch (e) { console.error(fn.name, e); }
  });
})();
