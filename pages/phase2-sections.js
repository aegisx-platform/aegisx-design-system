/* ═══════════════════════════════════════════════════════════════
   AegisX DS · Phase 2 — Display & Layout
   Card variants · Empty state · Error pages · Popover · Drawer
   Command palette · Filter bar · Tag group · Calendar · Timeline
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
    chevR:'<polyline points="9 18 15 12 9 6"/>',
    chevL:'<polyline points="15 18 9 12 15 6"/>',
    x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    check:'<polyline points="20 6 9 17 4 12"/>',
    search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
    activity:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    chart:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    list:'<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
    cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    sort:'<path d="M3 6h18M7 12h10M10 18h4"/>',
    filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    alert:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    wifi:'<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    pill:'<path d="M10.5 20.5L3.5 13.5a4.95 4.95 0 0 1 7-7l7 7a4.95 4.95 0 0 1-7 7z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>',
    edit:'<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>',
    trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    log:'<polyline points="14 2 14 8 20 8"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'
  };
  const i = (n, sz=14) => `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" class="icon-stroke">${ICONS[n]||''}</svg>`;
  const section = (id, num, title, desc, ...blocks) => {
    const s = el('section', {id, class:'section'});
    s.appendChild(el('div', {class:'section__head'},
      el('h2', {class:'section__title'}, el('span', {class:'section__num'}, num), title),
      el('p', {class:'section__desc'}, desc)));
    for (const b of blocks) s.appendChild(b);
    return s;
  };
  const subsection = (title, body) => {
    const w = el('div', {class:'subsection'});
    if (title) w.appendChild(el('h3', {class:'subsection__title'}, title));
    w.appendChild(body);
    return w;
  };

  // ═══ 41. CARD VARIANTS ═══
  function cardSection() {
    // Variant grid
    const d = el('div', {class:'demo'});
    const g = el('div', {class:'grid grid-3'});

    // 1 default
    const c1 = el('div', {class:'card card--hover'});
    c1.innerHTML = `
      <div class="card__head">
        <div>
          <div class="card__eyebrow">PATIENT</div>
          <div class="card__title">นางสาวสุภาพร เจริญสุข</div>
        </div>
        <span class="badge">HN 6781234</span>
      </div>
      <p class="card__desc">หญิง 42 ปี · DM type 2, HTN — ติดตาม HbA1c ทุก 3 เดือน</p>
      <div class="card__meta">
        <span>ตึกอายุรกรรม 4A</span><span class="card__meta-dot"></span>
        <span>ห้อง 412</span><span class="card__meta-dot"></span>
        <span>วันที่ 3</span>
      </div>`;
    g.appendChild(c1);

    // 2 accent + warning
    const c2 = el('div', {class:'card card--accent card--warning'});
    c2.innerHTML = `
      <div class="card__head">
        <div class="card__icon-wrap card__icon-wrap--warning">${i('alert',16)}</div>
        <span class="badge badge--warning">รออนุมัติ</span>
      </div>
      <div class="card__title" style="font-size:14px">ใบสั่งยา · Warfarin 5 mg</div>
      <p class="card__desc">ขนาดสูงกว่ามาตรฐาน — ต้องการการอนุมัติจากเภสัชกร</p>
      <div class="card__foot">
        <span class="card__meta">นพ. กิตติ · 14:32</span>
        <button class="btn btn--secondary btn--sm">รีวิว</button>
      </div>`;
    g.appendChild(c2);

    // 3 stat card
    const c3 = el('div', {class:'card stat-card'});
    c3.innerHTML = `
      <div class="stat-card__label">ผู้ป่วยนอกวันนี้</div>
      <div class="stat-card__value">348</div>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="stat-card__trend stat-card__trend--up">▲ 12%</span>
        <span style="font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono)">vs สัปดาห์ที่แล้ว</span>
      </div>`;
    g.appendChild(c3);

    // 4 media card
    const c4 = el('div', {class:'card card--hover'});
    c4.innerHTML = `
      <div class="card__media">DICOM · CHEST PA</div>
      <div class="card__title" style="font-size:14px">X-Ray ทรวงอกท่าหลัง</div>
      <p class="card__desc" style="font-size:12px">ผลตรวจปกติ · ไม่พบรอยโรค</p>
      <div class="card__meta">
        <span>2.4 MB</span><span class="card__meta-dot"></span>
        <span>15 พ.ย. 2568</span>
      </div>`;
    g.appendChild(c4);

    // 5 filled
    const c5 = el('div', {class:'card card--filled'});
    c5.innerHTML = `
      <div class="card__title" style="font-size:14px">เคล็ดลับ: ตรวจ vital signs ครบ</div>
      <p class="card__desc" style="font-size:12px">บันทึก SpO₂ ทุกชั่วโมงสำหรับผู้ป่วย ICU เพื่อรับคะแนน Quality บวก</p>
      <a href="#" style="font-size:12px;color:var(--ax-brand-emphasis);font-weight:500">เรียนรู้เพิ่มเติม →</a>`;
    g.appendChild(c5);

    // 6 ghost / empty placeholder
    const c6 = el('div', {class:'card card--ghost', style:'align-items:center;justify-content:center;color:var(--ax-text-subtle);text-align:center;min-height:140px'});
    c6.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
        <div style="color:var(--ax-text-subtle)">${i('plus',24)}</div>
        <div style="font-size:13px;font-weight:500">เพิ่มการ์ดใหม่</div>
        <div style="font-size:11px">ลากไฟล์มาวาง หรือคลิกเพื่อเลือก</div>
      </div>`;
    g.appendChild(c6);

    d.appendChild(g);

    return section('card-variants','41','Card variants',
      'ขยายจากการ์ดพื้นฐาน — default, accent (4 roles), stat, media, filled, ghost. ใช้กับ patient summary, alerts, KPI tiles, image previews.',
      subsection('6 variants', d)
    );
  }

  // ═══ 42. EMPTY STATE ═══
  function emptySection() {
    const d = el('div', {class:'demo'});
    const e1 = el('div', {class:'empty'});
    e1.innerHTML = `
      <div class="empty__art">${i('inbox',36)}</div>
      <div class="empty__title">ยังไม่มีผู้ป่วยรอตรวจ</div>
      <p class="empty__desc">เมื่อมีผู้ป่วยใหม่ลงทะเบียน รายชื่อจะปรากฏที่นี่ — ลองรีเฟรชหรือเปลี่ยนตัวกรองด้านบน</p>
      <div class="empty__actions">
        <button class="btn btn--secondary btn--sm">เปลี่ยนตัวกรอง</button>
        <button class="btn btn--primary btn--sm">+ ลงทะเบียนผู้ป่วย</button>
      </div>`;
    d.appendChild(e1);

    // No search results
    const d2 = el('div', {class:'demo'});
    const e2 = el('div', {class:'empty'});
    e2.innerHTML = `
      <div class="empty__art">${i('search',36)}</div>
      <div class="empty__title">ไม่พบผลการค้นหา</div>
      <p class="empty__desc">ไม่พบผู้ป่วยที่ตรงกับ "<strong style="color:var(--ax-text-heading)">สมชาย ใจ</strong>" ลองพิมพ์เฉพาะ HN, นามสกุล, หรือลด filter ลง</p>
      <div class="empty__actions">
        <button class="btn btn--ghost btn--sm">ล้างคำค้น</button>
      </div>`;
    d2.appendChild(e2);

    // Error fetching
    const d3 = el('div', {class:'demo'});
    const e3 = el('div', {class:'empty'});
    e3.innerHTML = `
      <div class="empty__art" style="background:var(--ax-error-subtle);color:var(--ax-error-emphasis)">${i('alert',32)}</div>
      <div class="empty__title">โหลดข้อมูลไม่สำเร็จ</div>
      <p class="empty__desc">ไม่สามารถเชื่อมต่อกับ EMR API ได้ในขณะนี้ — ระบบจะลองใหม่อัตโนมัติทุก 30 วินาที</p>
      <div class="empty__actions">
        <button class="btn btn--secondary btn--sm">ลองใหม่</button>
        <button class="btn btn--ghost btn--sm">ดูสถานะระบบ</button>
      </div>`;
    d3.appendChild(e3);

    // Inline (smaller, in-table)
    const d4 = el('div', {class:'demo'});
    const tbl = el('div', {style:'border:1px solid var(--ax-border-subtle);border-radius:var(--ax-radius-md);overflow:hidden'});
    tbl.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 80px;background:var(--ax-background-subtle);padding:10px 14px;font-size:11px;color:var(--ax-text-subtle);text-transform:uppercase;letter-spacing:0.06em;font-weight:600;font-family:var(--ax-font-mono);border-bottom:1px solid var(--ax-border-subtle)">
        <div>HN</div><div>ชื่อ-นามสกุล</div><div>การวินิจฉัย</div><div>สถานะ</div>
      </div>`;
    const inline = el('div', {class:'empty empty--inline'});
    inline.innerHTML = `
      <div class="empty__art empty__art--inline">${i('folder',24)}</div>
      <div class="empty__title" style="font-size:13px">ตารางว่าง</div>
      <p class="empty__desc" style="font-size:12px">ยังไม่มีรายการในแท็บนี้</p>`;
    tbl.appendChild(inline);
    d4.appendChild(tbl);

    const g = el('div', {class:'grid grid-2', style:'align-items:start'});
    g.appendChild(subsection('No data yet', d));
    g.appendChild(subsection('No search results', d2));

    const g2 = el('div', {class:'grid grid-2', style:'align-items:start'});
    g2.appendChild(subsection('Error / can\u2019t load', d3));
    g2.appendChild(subsection('Inline (in-table)', d4));

    return section('empty','42','Empty state',
      'แทน UI ที่ "ว่าง" ด้วย art + ข้อความ + CTA — ใช้กับตารางที่ยังไม่มีข้อมูล, ผลค้นหาว่าง, error, in-card placeholders.',
      g, g2
    );
  }

  // ═══ 43. ERROR PAGES ═══
  function errPagesSection() {
    function errpage(role, code, sub, title, desc, diag, actions) {
      const e = el('div', {class:'errpage errpage--' + role});
      const left = el('div');
      left.innerHTML = `<div class="errpage__code">${code}<span class="errpage__code-sub">${sub}</span></div>`;
      const right = el('div');
      let acts = actions.map(([label, kind]) => `<button class="btn btn--${kind} btn--sm">${label}</button>`).join('');
      right.innerHTML = `
        <h3 class="errpage__title">${title}</h3>
        <p class="errpage__desc">${desc}</p>
        <div class="errpage__actions">${acts}</div>
        ${diag ? `<div class="errpage__diag">${diag}</div>` : ''}`;
      e.appendChild(left); e.appendChild(right);
      return e;
    }

    const d404 = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    d404.appendChild(errpage('neutral','404','Not Found',
      'ไม่พบหน้าที่คุณค้นหา',
      'หน้านี้อาจถูกย้าย, ลบออก, หรือ URL พิมพ์ผิด — ลองกลับไปหน้าหลักหรือใช้การค้นหาด้านบน',
      'request_id: a3f8c2 · path: /patients/HN-9999999',
      [['← กลับหน้าหลัก','primary'],['ค้นหา','secondary']]));

    const d500 = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    d500.appendChild(errpage('error','500','Server Error',
      'เซิร์ฟเวอร์ขัดข้องชั่วคราว',
      'ระบบกำลังประสบปัญหาภายใน ทีมเทคนิคได้รับแจ้งเหตุการณ์แล้ว — โปรดลองอีกครั้งใน 1-2 นาที',
      'incident_id: INC-20251115-0042 · timestamp: 14:32:17 ICT',
      [['ลองใหม่','primary'],['ดูสถานะระบบ','secondary'],['แจ้งฝ่ายไอที','ghost']]));

    const d403 = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    d403.appendChild(errpage('warn','403','Forbidden',
      'ไม่มีสิทธิ์เข้าถึง',
      'บัญชีของคุณไม่มีสิทธิ์ดูหน้านี้ — หากคิดว่าผิดพลาด โปรดติดต่อหัวหน้าแผนกหรือ admin ระบบ',
      'role: nurse · required: physician | nurse_lead',
      [['ขอสิทธิ์เพิ่ม','primary'],['← ย้อนกลับ','secondary']]));

    const dnet = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    const noNet = el('div', {class:'errpage errpage--neutral'});
    noNet.innerHTML = `
      <div style="display:flex;justify-content:center;color:var(--ax-text-subtle)">${i('wifi',96)}</div>
      <div>
        <h3 class="errpage__title">ไม่พบการเชื่อมต่ออินเทอร์เน็ต</h3>
        <p class="errpage__desc">ตรวจสอบสายเครือข่ายหรือ Wi-Fi — ระบบจะกลับมาเชื่อมต่ออัตโนมัติเมื่อพร้อม</p>
        <div class="errpage__actions">
          <button class="btn btn--primary btn--sm">ลองเชื่อมต่อใหม่</button>
          <button class="btn btn--ghost btn--sm">ทำงานแบบออฟไลน์</button>
        </div>
        <div class="errpage__diag">last_sync: 14:08 · 24 รายการรอ sync</div>
      </div>`;
    dnet.appendChild(noNet);

    return section('errpage','43','Error pages',
      'Full-page errors: 404, 500, 403, no-network — code ขนาดใหญ่ + ข้อความ + actions + diagnostic block สำหรับ support.',
      subsection('404 — Not found', d404),
      subsection('500 — Server error', d500),
      subsection('403 — No permission', d403),
      subsection('Network offline', dnet)
    );
  }

  // ═══ 44. POPOVER ═══
  function popoverSection() {
    // Filter popover
    const d = el('div', {class:'demo', style:'background:var(--ax-background-page);min-height:300px;display:flex;justify-content:center;align-items:flex-start;padding-top:24px'});
    const popWrap = el('div', {style:'position:relative;display:inline-flex;flex-direction:column;align-items:flex-start;gap:14px'});
    popWrap.appendChild(el('button', {class:'btn btn--secondary btn--sm', html: i('filter',12) + '<span style="margin-left:6px">แผนก: ทั้งหมด</span>'}));
    const pop = el('div', {class:'popover', style:'margin-top:6px'});
    pop.innerHTML = `
      <div class="popover__head">
        <div class="popover__title">กรองตามแผนก</div>
        <button class="btn btn--ghost btn--sm btn--icon" style="width:24px;height:24px">${i('x',12)}</button>
      </div>
      <div class="popover__body">
        <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" class="checkbox" checked> อายุรกรรม <span style="margin-left:auto;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);font-size:11px">42</span></label>
        <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" class="checkbox" checked> ศัลยกรรม <span style="margin-left:auto;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);font-size:11px">38</span></label>
        <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" class="checkbox"> กุมารเวช <span style="margin-left:auto;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);font-size:11px">22</span></label>
        <label style="display:flex;align-items:center;gap:8px;font-size:13px"><input type="checkbox" class="checkbox"> ฉุกเฉิน <span style="margin-left:auto;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);font-size:11px">27</span></label>
      </div>
      <div class="popover__foot">
        <button class="btn btn--ghost btn--sm">ล้าง</button>
        <button class="btn btn--primary btn--sm">ใช้ (2)</button>
      </div>`;
    popWrap.appendChild(pop);
    d.appendChild(popWrap);

    // Info popover (small)
    const d2 = el('div', {class:'demo', style:'background:var(--ax-background-page);min-height:200px;display:flex;justify-content:center;padding-top:24px'});
    const inf = el('div', {style:'position:relative'});
    inf.innerHTML = `
      <button class="btn btn--ghost btn--sm">รายละเอียด HbA1c</button>
      <div class="popover" style="margin-top:6px;width:280px">
        <div class="popover__body" style="font-size:12px">
          <div style="display:flex;justify-content:space-between"><span style="color:var(--ax-text-subtle)">ค่าปัจจุบัน</span><strong class="mono">7.8%</strong></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--ax-text-subtle)">เป้าหมาย</span><span class="mono">&lt; 7.0%</span></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--ax-text-subtle)">ตรวจครั้งล่าสุด</span><span class="mono">12 พ.ย. 2568</span></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--ax-text-subtle)">แนวโน้ม 6 เดือน</span><span style="color:var(--ax-warning-emphasis)">↑ 0.4%</span></div>
        </div>
      </div>`;
    d2.appendChild(inf);

    const g = el('div', {class:'grid grid-2', style:'align-items:start'});
    g.appendChild(subsection('Filter popover (with footer actions)', d));
    g.appendChild(subsection('Info popover (read-only stats)', d2));

    return section('popover','44','Popover',
      'หนากว่า tooltip — มีหัว + body + footer actions รองรับ form / filter / mini-detail. แตะปุ่มหรือคลิกชื่อเพื่อเปิด.',
      g
    );
  }

  // ═══ 45. DRAWER / SIDE PANEL ═══
  function drawerSection() {
    const d = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    const stage = el('div', {class:'drawer-stage'});
    stage.appendChild(el('div', {class:'drawer-stage__bg'}));
    stage.appendChild(el('div', {class:'drawer-scrim'}));
    const dr = el('div', {class:'drawer drawer--right'});
    dr.innerHTML = `
      <div class="drawer__head">
        <div>
          <div class="drawer__eyebrow">PATIENT · HN 6781234</div>
          <div class="drawer__title">นางสาวสุภาพร เจริญสุข</div>
        </div>
        <button class="drawer__close">${i('x',14)}</button>
      </div>
      <div class="drawer__body">
        <div class="drawer-section">
          <div class="drawer-section__title">ข้อมูลทั่วไป</div>
          <div class="drawer-row"><span class="drawer-row__label">เพศ / อายุ</span><span class="drawer-row__value">หญิง · 42 ปี</span></div>
          <div class="drawer-row"><span class="drawer-row__label">หมู่เลือด</span><span class="drawer-row__value">A Rh+</span></div>
          <div class="drawer-row"><span class="drawer-row__label">น้ำหนัก / ส่วนสูง</span><span class="drawer-row__value">68 kg · 162 cm</span></div>
          <div class="drawer-row"><span class="drawer-row__label">การแพ้</span><span class="drawer-row__value" style="color:var(--ax-error-emphasis)">Penicillin · Sulfa</span></div>
        </div>
        <div class="drawer-section">
          <div class="drawer-section__title">การวินิจฉัย</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <span class="tag tag--brand">E11.9 · DM2</span>
            <span class="tag tag--warning">I10 · HTN</span>
            <span class="tag tag--neutral">+2 อื่น ๆ</span>
          </div>
        </div>
        <div class="drawer-section">
          <div class="drawer-section__title">สัญญาณชีพล่าสุด</div>
          <div class="drawer-row"><span class="drawer-row__label">BP</span><span class="drawer-row__value mono">128/82 mmHg</span></div>
          <div class="drawer-row"><span class="drawer-row__label">HR</span><span class="drawer-row__value mono">76 bpm</span></div>
          <div class="drawer-row"><span class="drawer-row__label">Temp</span><span class="drawer-row__value mono" style="color:var(--ax-warning-emphasis)">37.8 °C ↑</span></div>
          <div class="drawer-row"><span class="drawer-row__label">SpO₂</span><span class="drawer-row__value mono">98%</span></div>
        </div>
      </div>
      <div class="drawer__foot">
        <button class="btn btn--ghost btn--sm">ปิด</button>
        <button class="btn btn--secondary btn--sm">ดูประวัติเต็ม</button>
        <button class="btn btn--primary btn--sm">เปิดเวชระเบียน</button>
      </div>`;
    stage.appendChild(dr);
    d.appendChild(stage);

    return section('drawer','45','Drawer / Side panel',
      'Slide-out จากขอบขวา (หรือซ้าย) สำหรับ detail view, filters, settings — ไม่บล็อกหน้าเดิมเหมือน dialog. รองรับ scroll body + sticky head/foot.',
      subsection('Patient detail drawer (right, with scrim)', d)
    );
  }

  // ═══ 46. COMMAND PALETTE ═══
  function cmdkSection() {
    const d = el('div', {class:'demo', style:'background:var(--ax-background-page);padding:20px;display:flex;justify-content:center'});
    const c = el('div', {class:'cmdk'});
    c.innerHTML = `
      <div class="cmdk__search">
        <span class="cmdk__search-icon">${i('search',16)}</span>
        <input class="cmdk__search-input" placeholder="ค้นหาผู้ป่วย, การกระทำ, รายงาน..." value="warf">
        <span class="cmdk__kbd">esc</span>
      </div>
      <div class="cmdk__list">
        <div class="cmdk__group-title">การกระทำ</div>
        <div class="cmdk__item is-active">
          <span class="cmdk__item-icon">${i('pill',12)}</span>
          <span class="cmdk__item-label">สั่งยา <strong>Warf</strong>arin</span>
          <span class="cmdk__item-meta">Order</span>
          <span class="cmdk__item-shortcut"><span class="cmdk__kbd">⌘</span><span class="cmdk__kbd">O</span></span>
        </div>
        <div class="cmdk__item">
          <span class="cmdk__item-icon">${i('user',12)}</span>
          <span class="cmdk__item-label">ค้นหาผู้ป่วย</span>
          <span class="cmdk__item-meta">Patient</span>
          <span class="cmdk__item-shortcut"><span class="cmdk__kbd">⌘</span><span class="cmdk__kbd">F</span></span>
        </div>
        <div class="cmdk__item">
          <span class="cmdk__item-icon">${i('plus',12)}</span>
          <span class="cmdk__item-label">ลงทะเบียนผู้ป่วยใหม่</span>
          <span class="cmdk__item-meta">Patient</span>
          <span class="cmdk__item-shortcut"><span class="cmdk__kbd">⌘</span><span class="cmdk__kbd">N</span></span>
        </div>
        <div class="cmdk__group-title">ผู้ป่วยที่เปิดล่าสุด</div>
        <div class="cmdk__item">
          <span class="cmdk__item-icon" style="background:var(--ax-brand-subtle);color:var(--ax-brand-emphasis);font-size:9px;font-family:var(--ax-font-mono);font-weight:600">SJ</span>
          <span class="cmdk__item-label">สุภาพร เจริญสุข</span>
          <span class="cmdk__item-meta">HN 6781234 · ห้อง 412</span>
        </div>
        <div class="cmdk__item">
          <span class="cmdk__item-icon" style="background:var(--ax-brand-subtle);color:var(--ax-brand-emphasis);font-size:9px;font-family:var(--ax-font-mono);font-weight:600">PT</span>
          <span class="cmdk__item-label">ประยุทธ์ ทรัพย์มา</span>
          <span class="cmdk__item-meta">HN 5512987 · OPD</span>
        </div>
        <div class="cmdk__group-title">การนำทาง</div>
        <div class="cmdk__item">
          <span class="cmdk__item-icon">${i('home',12)}</span>
          <span class="cmdk__item-label">ไปที่ Dashboard</span>
          <span class="cmdk__item-meta">Page</span>
          <span class="cmdk__item-shortcut"><span class="cmdk__kbd">G</span><span class="cmdk__kbd">D</span></span>
        </div>
        <div class="cmdk__item">
          <span class="cmdk__item-icon">${i('chart',12)}</span>
          <span class="cmdk__item-label">รายงานประจำเดือน</span>
          <span class="cmdk__item-meta">Page</span>
          <span class="cmdk__item-shortcut"><span class="cmdk__kbd">G</span><span class="cmdk__kbd">R</span></span>
        </div>
      </div>
      <div class="cmdk__foot">
        <span>7 ผลลัพธ์</span>
        <div class="cmdk__foot-keys">
          <span class="cmdk__foot-key"><span class="cmdk__kbd">↑</span><span class="cmdk__kbd">↓</span> เลือก</span>
          <span class="cmdk__foot-key"><span class="cmdk__kbd">↵</span> เปิด</span>
          <span class="cmdk__foot-key"><span class="cmdk__kbd">esc</span> ปิด</span>
        </div>
      </div>`;
    d.appendChild(c);

    // trigger
    const dt = el('div', {class:'demo', style:'display:flex;align-items:center;gap:12px'});
    dt.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid var(--ax-border-default);border-radius:var(--ax-radius-md);background:var(--ax-background-default);min-width:280px;color:var(--ax-text-subtle);font-size:13px">
        ${i('search',14)}
        <span>ค้นหา...</span>
        <span style="margin-left:auto;display:inline-flex;gap:3px">
          <span class="cmdk__kbd">⌘</span><span class="cmdk__kbd">K</span>
        </span>
      </div>
      <span style="font-size:12px;color:var(--ax-text-subtle)">หรือกด <span class="cmdk__kbd">⌘K</span> ที่ใดก็ได้</span>`;

    return section('cmdk','46','Command palette (⌘K)',
      'Global search + actions สำหรับ power users — ผู้ป่วยล่าสุด, นำทาง, สั่งยา, สร้างใบส่งตรวจ. รองรับ keyboard nav, group titles, และ shortcuts ในแถว.',
      subsection('Open palette — fuzzy match "warf"', d),
      subsection('Trigger button (in nav bar)', dt)
    );
  }

  // ═══ 47. FILTER BAR / TOOLBAR ═══
  function filterbarSection() {
    const d = el('div', {class:'demo'});
    const fb = el('div', {class:'filterbar'});
    fb.innerHTML = `
      <button class="filter-chip is-active">
        วันนี้ <span class="filter-chip__count">42</span>
      </button>
      <button class="filter-chip">7 วัน</button>
      <button class="filter-chip">30 วัน</button>
      <div class="filterbar__sep"></div>
      <button class="filter-chip is-active">
        แผนก: 2 <span style="opacity:0.7">${i('x',10)}</span>
      </button>
      <button class="filter-chip">
        สถานะ: ทั้งหมด ${i('chevR',10)}
      </button>
      <button class="filter-chip filter-chip--add">
        ${i('plus',10)} เพิ่มตัวกรอง
      </button>
      <div class="filterbar__spacer"></div>
      <button class="btn btn--ghost btn--sm">${i('sort',12)} เรียง</button>
      <div class="viewtoggle">
        <button class="viewtoggle__btn is-active" title="Grid">${i('grid',12)}</button>
        <button class="viewtoggle__btn" title="List">${i('list',12)}</button>
        <button class="viewtoggle__btn" title="Calendar">${i('cal',12)}</button>
      </div>`;
    d.appendChild(fb);

    // search variant
    const d2 = el('div', {class:'demo'});
    const fb2 = el('div', {class:'filterbar'});
    fb2.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:220px;max-width:320px;height:30px;padding:0 10px;border:1px solid var(--ax-border-default);border-radius:var(--ax-radius-md);background:var(--ax-background-default)">
        <span style="color:var(--ax-text-subtle)">${i('search',14)}</span>
        <input style="border:0;outline:0;background:transparent;flex:1;font-size:13px;color:var(--ax-text-heading)" placeholder="ค้นหา HN, ชื่อ, ICD..." value="DM type 2">
        <button style="border:0;background:transparent;color:var(--ax-text-subtle);cursor:pointer">${i('x',12)}</button>
      </div>
      <div class="filterbar__sep"></div>
      <button class="filter-chip is-active">DM <span style="opacity:0.7">${i('x',10)}</span></button>
      <button class="filter-chip is-active">HTN <span style="opacity:0.7">${i('x',10)}</span></button>
      <button class="filter-chip filter-chip--add">${i('plus',10)} เพิ่ม</button>
      <div class="filterbar__spacer"></div>
      <span style="font-size:12px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono)">พบ <strong style="color:var(--ax-text-heading)">237</strong> รายการ</span>
      <button class="btn btn--secondary btn--sm">${i('download',12)} Export</button>`;
    d2.appendChild(fb2);

    return section('filterbar','47','Filter bar / Toolbar',
      'Multi-filter chips + search + view toggle + actions — pattern หลักของ table headers, list pages, และ dashboard panels.',
      subsection('Quick filters + view toggle', d),
      subsection('Search + active filters + count + export', d2)
    );
  }

  // ═══ 48. TAG GROUP ═══
  function tagSection() {
    // semantic colors
    const d = el('div', {class:'demo'});
    const r = el('div', {style:'display:flex;flex-wrap:wrap;gap:6px;align-items:center'});
    [
      ['neutral','Default'], ['brand','Info / Brand'], ['success','Stable'],
      ['warning','Watch'], ['error','Critical'], ['purple','VIP'],
      ['pink','Pediatric'], ['teal','Insurance']
    ].forEach(([role, label]) => {
      r.appendChild(el('span', {class:'tag tag--' + role, html: '<span class="tag__dot"></span>' + label}));
    });
    d.appendChild(r);

    // ICD diagnoses use case
    const d2 = el('div', {class:'demo'});
    const r2 = el('div', {style:'display:flex;flex-wrap:wrap;gap:6px;align-items:center'});
    [
      ['brand','E11.9','DM type 2'],
      ['warning','I10','HTN'],
      ['error','J44.1','COPD exacerbation'],
      ['neutral','Z79.4','Long-term insulin']
    ].forEach(([role, code, name]) => {
      const t = el('span', {class:'tag tag--' + role});
      t.innerHTML = `<strong style="font-weight:600">${code}</strong> · ${name}<button class="tag__close">${i('x',10)}</button>`;
      r2.appendChild(t);
    });
    r2.appendChild(el('button', {class:'tag', style:'border-style:dashed;color:var(--ax-text-subtle);cursor:pointer', html: i('plus',10) + ' เพิ่ม ICD'}));
    d2.appendChild(r2);

    // Sizes
    const d3 = el('div', {class:'demo'});
    const r3 = el('div', {style:'display:flex;flex-wrap:wrap;gap:8px;align-items:center'});
    r3.appendChild(el('span', {class:'tag tag--brand', style:'height:18px;padding:0 6px;font-size:10px'}, 'sm'));
    r3.appendChild(el('span', {class:'tag tag--brand'}, 'default'));
    r3.appendChild(el('span', {class:'tag tag--brand', style:'height:26px;padding:0 10px;font-size:12px'}, 'lg'));
    r3.appendChild(el('span', {class:'tag tag--brand', style:'border-radius:11px'}, 'pill'));
    r3.appendChild(el('span', {class:'tag tag--success', html: '<span class="tag__dot"></span>with dot'}));
    r3.appendChild(el('span', {class:'tag tag--warning', html: 'closeable<button class="tag__close">' + i('x',10) + '</button>'}));
    d3.appendChild(r3);

    return section('tag-group','48','Tag / Label (semantic)',
      'แบนกว่า badge — สำหรับติด label หลายอันต่อ entity (ICD, allergies, departments, insurance). 8 colors + size variants + closeable.',
      subsection('Semantic palette', d),
      subsection('ICD diagnoses (closeable)', d2),
      subsection('Sizes & shapes', d3)
    );
  }

  // ═══ 49. CALENDAR / SCHEDULE ═══
  function calendarSection() {
    // Month view
    const dm = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    const cw = el('div', {class:'cal-wrap'});
    const tb = el('div', {class:'cal-toolbar'});
    tb.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px">
        <div class="cal-toolbar__nav">
          <button class="btn btn--ghost btn--sm btn--icon">${i('chevL',12)}</button>
          <button class="btn btn--ghost btn--sm">วันนี้</button>
          <button class="btn btn--ghost btn--sm btn--icon">${i('chevR',12)}</button>
        </div>
        <div class="cal-toolbar__title">พฤศจิกายน 2568</div>
      </div>
      <div style="display:flex;gap:6px">
        <div class="segmented" style="height:28px">
          <button class="segmented__btn">เดือน</button>
          <button class="segmented__btn is-active">สัปดาห์</button>
          <button class="segmented__btn">วัน</button>
        </div>
        <button class="btn btn--primary btn--sm">+ นัดใหม่</button>
      </div>`;
    cw.appendChild(tb);

    const month = el('div', {class:'cal-month'});
    ['อา','จ','อ','พ','พฤ','ศ','ส'].forEach(d => {
      month.appendChild(el('div', {class:'cal-month__dow'}, d));
    });
    // build 35 cells: Nov 2025 starts Sat
    const events = {
      3: [['ประชุมแผนก','brand']],
      5: [['Ward round 4A','success']],
      7: [['ผ่าตัด GA','warning'], ['Ward round 3B','success']],
      10:[['ประชุมแผนก','brand'], ['+ 2 อื่น','more']],
      12:[['ออก OPD','success']],
      15:[['สัมมนา CME','brand']],
      18:[['ประชุมจริยธรรม','warning']],
      20:[['ผ่าตัดด่วน','error']],
      24:[['ประชุมประจำเดือน','brand']],
      27:[['Ward round 4A','success']]
    };
    // Nov 1 2025 = Saturday → 6 leading
    for (let k=26; k<=31; k++) month.appendChild(el('div', {class:'cal-month__cell is-other'}, el('span', {class:'cal-month__date'}, String(k))));
    for (let d=1; d<=30; d++) {
      const isToday = d === 15;
      const cell = el('div', {class:'cal-month__cell' + (isToday?' is-today':'')});
      cell.appendChild(el('span', {class:'cal-month__date'}, String(d)));
      (events[d] || []).forEach(([name, role]) => {
        cell.appendChild(el('span', {class:'cal-event' + (role!=='brand' ? ' cal-event--'+role : '') + (role==='more'?' cal-event--more':'')}, name));
      });
      month.appendChild(cell);
    }
    // trailing (4 to fill 35)
    for (let k=1; k<=4; k++) month.appendChild(el('div', {class:'cal-month__cell is-other'}, el('span', {class:'cal-month__date'}, String(k))));
    cw.appendChild(month);
    dm.appendChild(cw);

    // Week view
    const dw = el('div', {class:'demo', style:'padding:0;overflow:hidden'});
    const ww = el('div', {class:'cal-wrap'});
    const wtb = el('div', {class:'cal-toolbar'});
    wtb.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px">
        <div class="cal-toolbar__nav">
          <button class="btn btn--ghost btn--sm btn--icon">${i('chevL',12)}</button>
          <button class="btn btn--ghost btn--sm">สัปดาห์นี้</button>
          <button class="btn btn--ghost btn--sm btn--icon">${i('chevR',12)}</button>
        </div>
        <div class="cal-toolbar__title">10 – 16 พฤศจิกายน 2568</div>
      </div>`;
    ww.appendChild(wtb);

    const week = el('div', {class:'cal-week'});
    week.appendChild(el('div', {class:'cal-week__head', style:'background:var(--ax-background-subtle)'}));
    ['10 จ.','11 อ.','12 พ.','13 พฤ.','14 ศ.','15 ส.','16 อา.'].forEach((d,idx) => {
      const isToday = idx === 5;
      const h = el('div', {class:'cal-week__head' + (isToday?' is-today':'')});
      const [date, dow] = d.split(' ');
      h.innerHTML = `<div class="cal-week__head-dow">${dow}</div><div class="cal-week__head-date">${date}</div>`;
      week.appendChild(h);
    });
    // hours column
    const hours = el('div', {class:'cal-week__hours'});
    for (let h=8; h<=16; h++) hours.appendChild(el('div', {class:'cal-week__hour'}, String(h).padStart(2,'0') + ':00'));
    week.appendChild(hours);

    function makeCol(events) {
      const c = el('div', {class:'cal-week__col'});
      events.forEach(([startH, dur, title, time, role]) => {
        const ev = el('div', {class: 'cal-week__event' + (role!=='brand' ? ' cal-week__event--'+role : '')});
        ev.style.top = ((startH-8)*30 + 2) + 'px';
        ev.style.height = (dur*30 - 4) + 'px';
        ev.innerHTML = `<span class="cal-week__event-title">${title}</span><span class="cal-week__event-time">${time}</span>`;
        c.appendChild(ev);
      });
      return c;
    }
    week.appendChild(makeCol([[9,1,'Ward round 4A','9:00–10:00','success'],[14,2,'OPD','14:00–16:00','brand']]));
    week.appendChild(makeCol([[10,1.5,'Surgery prep','10:00–11:30','warning']]));
    week.appendChild(makeCol([[8,1,'Standup','8:00–9:00','brand'],[13,2,'CME seminar','13:00–15:00','brand']]));
    week.appendChild(makeCol([[9,1,'Ward round','9:00–10:00','success'],[15,1,'Patient follow-up','15:00–16:00','success']]));
    week.appendChild(makeCol([[10,3,'Surgery: GA','10:00–13:00','error']]));
    week.appendChild(makeCol([[9,1,'Ward round','9:00–10:00','success']]));
    week.appendChild(makeCol([]));
    ww.appendChild(week);
    dw.appendChild(ww);

    return section('calendar','49','Calendar / Schedule',
      'Month + week views สำหรับนัดหมายผู้ป่วย, ตารางเวร, OR scheduling. รองรับ event colors ตาม semantic role (success/warning/error).',
      subsection('Month view — พฤศจิกายน 2568', dm),
      subsection('Week view — ตารางเวร', dw)
    );
  }

  // ═══ 50. TIMELINE / ACTIVITY FEED ═══
  function timelineSection() {
    // Vertical activity log
    const d = el('div', {class:'demo'});
    const tl = el('div', {class:'timeline'});
    [
      ['filled','พบแพทย์ — สรุปการตรวจ','15 พ.ย. 14:32',
        'นพ. กิตติ พงษ์สวัสดิ์ บันทึก progress note และสั่งยาเพิ่ม',
        '<div class="timeline__card">ปรับ Metformin จาก 500mg → 1000mg bid · เพิ่ม Lisinopril 10mg od</div>',
        'KP', 'นพ. กิตติ'],
      ['success','ผลแล็บออก — CBC, BUN, Cr','15 พ.ย. 11:08',
        'ผลแล็บปกติทั้งหมด · Cr 0.9 (target &lt; 1.2)', '', 'LB', 'ระบบ Lab'],
      ['warning','สัญญาณชีพผิดปกติ','15 พ.ย. 09:45',
        'อุณหภูมิ 37.8°C สูงกว่าปกติ — แจ้งพยาบาลผู้ดูแล',
        '<div class="timeline__card">Alert ส่งถึง: พยาบาลใหญ่ตึก 4A · ตอบรับเมื่อ 09:48</div>',
        'NW','นวพร'],
      ['brand','รับยา — Metformin 500mg','14 พ.ย. 16:20',
        'เภสัชกรจ่ายยาตามใบสั่ง 60 เม็ด สำหรับ 30 วัน', '', 'PH', 'เภสัช'],
      ['','ลงทะเบียน OPD — แผนกอายุรกรรม','14 พ.ย. 08:15',
        'นัดติดตาม HbA1c ตาม follow-up plan', '', 'RG','พนง. ทะเบียน']
    ].forEach(([dotRole, title, time, desc, card, initials, actor]) => {
      const it = el('div', {class:'timeline__item'});
      it.innerHTML = `
        <span class="timeline__dot ${dotRole?'timeline__dot--'+dotRole:''}"></span>
        <div class="timeline__head">
          <span class="timeline__title">${title}</span>
          <span class="timeline__time">${time}</span>
        </div>
        <div class="timeline__desc">${desc}</div>
        ${card}
        <div class="timeline__actor">
          <span class="timeline__actor-avatar">${initials}</span>
          <span>${actor}</span>
        </div>`;
      tl.appendChild(it);
    });
    d.appendChild(tl);

    // Horizontal compact (process tracker)
    const dh = el('div', {class:'demo'});
    const hl = el('div', {class:'timeline-h'});
    [
      ['ลงทะเบียน','08:15','done'],
      ['ตรวจสัญญาณชีพ','09:45','done'],
      ['พบแพทย์','10:30','done'],
      ['แล็บ / X-ray','11:08','active'],
      ['ผลตรวจ','—','pending'],
      ['รับยา','—','pending']
    ].forEach(([label, time, state]) => {
      const s = el('div', {class:'timeline-h__step is-' + state});
      s.innerHTML = `
        <span class="timeline-h__dot"></span>
        <div class="timeline-h__label">${label}</div>
        <div class="timeline-h__time">${time}</div>`;
      hl.appendChild(s);
    });
    dh.appendChild(hl);

    // Audit log (compact, mono)
    const da = el('div', {class:'demo', style:'background:var(--ax-background-subtle)'});
    const al = el('div', {class:'timeline'});
    [
      ['success','EDIT · vital_signs','admin@hosp.local','15:08:42','+temp:37.8 +hr:88'],
      ['','VIEW · medical_record','dr.kitti@hosp','14:32:11',''],
      ['warning','LOGIN_RETRY (3/5)','nurse.np@hosp','14:08:55','ip:10.0.4.22'],
      ['brand','CREATE · prescription','dr.kitti@hosp','13:45:02','rx:RX-20251115-0042'],
      ['error','PERMISSION_DENIED · billing','nurse.np@hosp','13:12:30','required:billing_clerk']
    ].forEach(([role, action, user, time, meta]) => {
      const it = el('div', {class:'timeline__item', style:'padding-bottom:12px'});
      it.innerHTML = `
        <span class="timeline__dot ${role?'timeline__dot--'+role:''}"></span>
        <div class="timeline__head">
          <span class="timeline__title mono" style="font-size:12px;color:var(--ax-text-heading)">${action}</span>
          <span class="timeline__time">${time}</span>
        </div>
        <div class="timeline__meta">
          <span><strong style="color:var(--ax-text-default)">${user}</strong></span>
          ${meta ? `<span>· ${meta}</span>` : ''}
        </div>`;
      al.appendChild(it);
    });
    da.appendChild(al);

    return section('timeline','50','Timeline / Activity feed',
      'Vertical event log สำหรับ patient history, audit trail, notification feed. + horizontal process tracker สำหรับ flow visualization.',
      subsection('Patient activity feed (rich)', d),
      subsection('Process tracker — horizontal', dh),
      subsection('Audit log — compact / mono', da)
    );
  }

  // ═══ Build ═══
  const root = document.getElementById('sections-phase2')
            || document.getElementById('sections-phase1')
            || document.getElementById('sections-handoff');
  [
    cardSection, emptySection, errPagesSection, popoverSection, drawerSection,
    cmdkSection, filterbarSection, tagSection, calendarSection, timelineSection
  ].forEach(fn => {
    try { root.appendChild(fn()); } catch (e) { console.error(fn.name, e); }
  });

  // Light interactivity — filter chip toggle, view toggle, cmdk arrow nav
  document.addEventListener('click', (ev) => {
    const fc = ev.target.closest('.filter-chip');
    if (fc && !fc.classList.contains('filter-chip--add')) {
      fc.classList.toggle('is-active');
    }
    const vt = ev.target.closest('.viewtoggle__btn');
    if (vt) {
      vt.parentElement.querySelectorAll('.viewtoggle__btn').forEach(b => b.classList.remove('is-active'));
      vt.classList.add('is-active');
    }
    const ci = ev.target.closest('.cmdk__item');
    if (ci) {
      ci.parentElement.querySelectorAll('.cmdk__item').forEach(b => b.classList.remove('is-active'));
      ci.classList.add('is-active');
    }
    const tc = ev.target.closest('.tag__close');
    if (tc) {
      tc.parentElement.style.transition = 'opacity 0.15s';
      tc.parentElement.style.opacity = '0';
      setTimeout(() => tc.parentElement.remove(), 150);
    }
  });

})();
