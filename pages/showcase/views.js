/* ════════════════════════════════════════════════════════════
   AegisX HIS — view renderers
   Each render* fn returns an HTML string for #content
   ════════════════════════════════════════════════════════════ */

/* ─── Helpers ─── */
const ICON = {
  plus:    `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`,
  filter:  `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>`,
  download:`<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`,
  search:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  print:   `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/></svg>`,
  pill:    `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 20.5a7 7 0 1 1 10-10l-10 10zM8.5 8.5l7 7"/></svg>`,
  beaker:  `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 8V2M9 2h6"/></svg>`,
  scan:    `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`,
  check:   `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  more:    `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`,
};

const sparkline = (points, color = 'var(--ax-brand-default)') => {
  const max = Math.max(...points), min = Math.min(...points);
  const w = 80, h = 28, span = max - min || 1;
  const path = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / span) * (h - 4) - 2;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg class="stat__sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <path d="${path}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
};

const avatar = (name, size = '') => {
  const initials = name.split(' ').map(s => s[0]).slice(0, 2).join('');
  const cls = size ? `avatar avatar--${size}` : 'avatar avatar--sm';
  return `<div class="${cls}" style="background: var(--ax-brand-faint); color: var(--ax-brand-emphasis); font-weight:600;">${initials}</div>`;
};

/* Generic sub-tab switcher — toggles is-active on sibling buttons + reveals
   the content element whose id matches `${prefix}-${key}` while hiding the
   others that share the same prefix within the surrounding card. */
function switchSubTab(event, prefix, key) {
  const tabs = event.currentTarget.parentElement;
  tabs.querySelectorAll('button').forEach(b => b.classList.remove('is-active'));
  event.currentTarget.classList.add('is-active');
  const card = tabs.parentElement;
  card.querySelectorAll('[id^="' + prefix + '-"]').forEach(el => {
    el.hidden = el.id !== prefix + '-' + key;
  });
}
function switchClinicalTab(e, k) { switchSubTab(e, 'clinical-tab', k); }
function switchOpdTab(e, k)      { switchSubTab(e, 'opd-tab', k); }
function switchIpdTab(e, k)      { switchSubTab(e, 'ipd-tab', k); }
function switchErTab(e, k)       { switchSubTab(e, 'er-tab', k); }
function switchBillingTab(e, k)  { switchSubTab(e, 'billing-tab', k); }
function switchSettingsTab(e, k) { switchSubTab(e, 'settings-tab', k); }
function switchA11yTab(e, k)     { switchSubTab(e, 'a11y-tab', k); }

/* ════════════ DASHBOARD ════════════ */
function renderDashboard() {
  const today = new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>สวัสดี, นพ. สมศักดิ์</h1>
        <p class="page-head__sub">${today} · กะเช้า 08:00–17:00 · ห้องตรวจ 304</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">${ICON.download}ส่งออกรายงาน</button>
        <button class="btn btn--primary btn--sm">${ICON.plus}เริ่มเวรตรวจ</button>
      </div>
    </div>

    <div class="alert alert--info">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top:2px;"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
      <div>
        <h4 class="alert__title">มีผู้ป่วย 3 รายในห้องฉุกเฉินรอรับเข้า IPD</h4>
        <p class="alert__body">ห้อง ICU เหลือ 2 เตียง · ห้องสามัญชาย เหลือ 8 เตียง · กรุณาประสานทีมพยาบาล <a href="#" onclick="goRoute('er');return false;" class="btn btn--link" style="font-size:12px;">ดูรายละเอียด →</a></p>
      </div>
    </div>

    <!-- Stat tiles -->
    <div class="stat-grid">
      ${statTile('OPD วันนี้', '142', '+12 จากเมื่อวาน', 'up', [12,18,15,22,28,30,42], 'brand')}
      ${statTile('IPD ครองเตียง', '78%', '102 / 130 เตียง', 'up', [70,72,68,74,76,78,78], 'success')}
      ${statTile('คิวห้องยา', '34', 'รอเฉลี่ย 8 นาที', 'down', [50,42,38,35,40,36,34], 'warning')}
      ${statTile('รายได้วันนี้', '฿284K', '+8.4% MoM', 'up', [220,235,210,250,270,265,284], 'brand')}
    </div>

    <div class="col-2">
      <!-- Today schedule preview -->
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">นัดตรวจวันนี้ · ห้อง 304</h3>
          <a href="#" onclick="goRoute('schedule');return false;" class="btn btn--link" style="font-size:12px;">ดูทั้งหมด →</a>
        </div>
        <div class="item-list">
          ${[
            { time: '09:00', name: 'นางสาว วราภรณ์ จันทร์เพ็ญ', hn: 'HN-2024-08471', note: 'ติดตามความดันโลหิต · F/U 3 เดือน', status: 'success', label: 'มาแล้ว' },
            { time: '09:30', name: 'นาย ประยุทธ์ ศิริวัฒน์', hn: 'HN-2024-12035', note: 'อาการ: ไอเรื้อรัง 2 สัปดาห์', status: 'success', label: 'มาแล้ว' },
            { time: '10:00', name: 'นาง ลักษณา พงศ์ภัทร', hn: 'HN-2025-00194', note: 'ผล Lab: HbA1c 7.2', status: 'brand', label: 'กำลังตรวจ' },
            { time: '10:30', name: 'นาย วีระชัย ทองดี', hn: 'HN-2024-00982', note: 'รับยาประจำ DM Type 2', status: 'neutral', label: 'รอเรียก' },
            { time: '11:00', name: 'นางสาว นันทิดา ภูมิใจ', hn: 'HN-2025-00211', note: 'อาการแพ้: เข็ม Penicillin', status: 'warning', label: 'แจ้งล่วงหน้า' },
            { time: '11:30', name: 'นาย จักรกฤษณ์ บุญมา', hn: 'HN-2023-04021', note: 'นัดคุยผล CT-scan', status: 'neutral', label: 'รอเรียก' },
          ].map(it => `
            <div class="item-list__row">
              <span class="text-mono text-sub" style="width:48px;">${it.time}</span>
              ${avatar(it.name)}
              <div class="item-list__main">
                <span class="item-list__title">${it.name}</span>
                <span class="item-list__sub">${it.hn} · ${it.note}</span>
              </div>
              <span class="badge badge--${it.status} badge--dot">${it.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- Pending tasks -->
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">งานรอดำเนินการ</h3>
            <span class="badge badge--brand">8</span>
          </div>
          <div class="item-list">
            ${[
              { t: 'อนุมัติใบสั่งยา · นาย ประยุทธ์', sub: 'Pharmacy รอ 12 นาที', icon: ICON.pill, color: 'warning' },
              { t: 'อ่านผล CBC · นางสาว วราภรณ์', sub: 'Lab ส่งผลแล้ว 5 นาที', icon: ICON.beaker, color: 'brand' },
              { t: 'ลงนามผล X-Ray ปอด', sub: '3 ราย รอลงนาม', icon: ICON.scan, color: 'brand' },
              { t: 'ตอบ Consult ER', sub: 'นพ.วิชัย · 2 นาที', icon: '', color: 'error' },
            ].map(t => `
              <div class="item-list__row">
                <div class="order-row__icon" style="background: var(--ax-${t.color}-faint); color: var(--ax-${t.color}-emphasis);">${t.icon || ICON.check}</div>
                <div class="item-list__main">
                  <span class="item-list__title">${t.t}</span>
                  <span class="item-list__sub">${t.sub}</span>
                </div>
                <button class="btn btn--ghost btn--sm">เปิด</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bed status -->
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">สถานะเตียง · ภาพรวม</h3>
            <a href="#" onclick="goRoute('ipd');return false;" class="btn btn--link" style="font-size:12px;">ดูแผนผัง →</a>
          </div>
          <div class="card__body" style="padding:14px 16px;">
            <div style="display:flex; flex-direction:column; gap:10px;">
              ${[
                { ward: 'ICU', total: 12, used: 10, color: 'error' },
                { ward: 'CCU', total: 8, used: 5, color: 'warning' },
                { ward: 'หอผู้ป่วยสามัญชาย', total: 40, used: 32, color: 'brand' },
                { ward: 'หอผู้ป่วยสามัญหญิง', total: 40, used: 30, color: 'brand' },
                { ward: 'หอผู้ป่วยพิเศษ', total: 30, used: 25, color: 'success' },
              ].map(w => `
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
                    <span style="color: var(--ax-text-default);">${w.ward}</span>
                    <span class="text-mono text-sub">${w.used}/${w.total}</span>
                  </div>
                  <div class="progress"><div class="progress__bar" style="width:${(w.used/w.total*100).toFixed(0)}%; background: var(--ax-${w.color}-default);"></div></div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function statTile(label, value, delta, dir, points, tone) {
  return `
    <div class="stat stat--${tone}">
      <div class="stat__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-7"/></svg>
      </div>
      <span class="stat__label">${label}</span>
      <div class="stat__row">
        <span class="stat__value">${value}</span>
        ${sparkline(points, `var(--ax-${tone}-default)`)}
      </div>
      <span class="stat__delta stat__delta--${dir}">${dir === 'up' ? '↑' : '↓'} ${delta}</span>
    </div>`;
}

/* ════════════ SCHEDULE ════════════ */
function renderSchedule() {
  const slots = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','13:00','13:30','14:00','14:30','15:00','15:30','16:00'];
  const events = {
    '09:00': { title: 'วราภรณ์ จันทร์เพ็ญ', meta: 'F/U HT · HN-2024-08471', tone: 'success' },
    '09:30': { title: 'ประยุทธ์ ศิริวัฒน์', meta: 'ไอเรื้อรัง · HN-2024-12035', tone: 'success' },
    '10:00': { title: 'ลักษณา พงศ์ภัทร', meta: 'DM Type 2 · กำลังตรวจ', tone: '' },
    '10:30': { title: 'วีระชัย ทองดี', meta: 'รับยา DM · HN-2024-00982', tone: '' },
    '11:00': { title: 'นันทิดา ภูมิใจ', meta: '⚠️ Penicillin allergy', tone: 'warning' },
    '11:30': { title: 'จักรกฤษณ์ บุญมา', meta: 'นัดอ่านผล CT', tone: '' },
    '13:30': { title: 'สุภาวดี เจริญสุข', meta: 'New patient · 60+', tone: '' },
    '14:00': { title: 'อนุชา ทรงศรี', meta: 'F/U Asthma', tone: '' },
    '15:00': { title: 'BLOCK · ประชุมแผนก', meta: 'CME meeting', tone: 'warning' },
    '16:00': { title: 'มาลี กิจสมบูรณ์', meta: 'F/U กระเพาะอักเสบ', tone: '' },
  };

  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>ตารางนัด</h1>
        <p class="page-head__sub">วันพฤหัสบดี 30 เมษายน 2569 · ห้อง 304 · นพ. สมศักดิ์ ใจดี</p>
      </div>
      <div class="page-head__actions">
        <div style="display:flex; border:1px solid var(--ax-border-subtle); border-radius:var(--ax-radius-md); overflow:hidden;">
          <button class="btn btn--ghost btn--sm" style="border-radius:0;">วัน</button>
          <button class="btn btn--secondary btn--sm" style="border-radius:0; border:0;">สัปดาห์</button>
          <button class="btn btn--ghost btn--sm" style="border-radius:0;">เดือน</button>
        </div>
        <button class="btn btn--secondary btn--sm">วันนี้</button>
        <button class="btn btn--primary btn--sm">${ICON.plus}เพิ่มนัด</button>
      </div>
    </div>

    <div class="card">
      <div class="card__header">
        <h3 class="card__title">ตารางวันนี้ · 16 ช่วงเวลา</h3>
        <div class="row-flex" style="gap:12px; font-size:11px; color: var(--ax-text-subtle); font-family: var(--ax-font-mono);">
          <span><span class="legend__sw" style="background: var(--ax-success-faint); border-color: var(--ax-success-muted);"></span>มาแล้ว</span>
          <span><span class="legend__sw" style="background: var(--ax-brand-faint); border-color: var(--ax-brand-muted);"></span>นัด</span>
          <span><span class="legend__sw" style="background: var(--ax-warning-faint); border-color: var(--ax-warning-muted);"></span>หมายเหตุ</span>
        </div>
      </div>
      <div class="schedule">
        ${slots.map(t => {
          const e = events[t];
          const ev = e ? `<div class="schedule__event ${e.tone ? 'schedule__event--' + e.tone : ''}"><div class="schedule__event-title">${e.title}</div><div class="schedule__event-meta">${e.meta}</div></div>` : '';
          return `<div class="schedule__time">${t}</div><div class="schedule__cell">${ev}</div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

/* ════════════ PATIENTS ════════════ */
const PATIENTS = [
  { hn: 'HN-2024-08471', name: 'วราภรณ์ จันทร์เพ็ญ',  age: 58, sex: 'F', phone: '081-234-5678', dx: 'HT, DM Type 2',         visit: '30/04/2569', status: 'active' },
  { hn: 'HN-2024-12035', name: 'ประยุทธ์ ศิริวัฒน์',   age: 64, sex: 'M', phone: '089-345-6789', dx: 'COPD',                  visit: '30/04/2569', status: 'active' },
  { hn: 'HN-2025-00194', name: 'ลักษณา พงศ์ภัทร',    age: 47, sex: 'F', phone: '062-456-7890', dx: 'DM Type 2',             visit: '30/04/2569', status: 'inpatient' },
  { hn: 'HN-2024-00982', name: 'วีระชัย ทองดี',      age: 72, sex: 'M', phone: '085-567-8901', dx: 'CKD Stage 3, DM',       visit: '28/04/2569', status: 'active' },
  { hn: 'HN-2025-00211', name: 'นันทิดา ภูมิใจ',      age: 32, sex: 'F', phone: '098-678-9012', dx: 'Penicillin allergy',     visit: '30/04/2569', status: 'active' },
  { hn: 'HN-2023-04021', name: 'จักรกฤษณ์ บุญมา',   age: 55, sex: 'M', phone: '081-789-0123', dx: 'Liver mass r/o',         visit: '25/04/2569', status: 'active' },
  { hn: 'HN-2025-00322', name: 'สุภาวดี เจริญสุข',   age: 68, sex: 'F', phone: '086-890-1234', dx: 'New · 1st visit',        visit: '30/04/2569', status: 'new' },
  { hn: 'HN-2022-11098', name: 'อนุชา ทรงศรี',     age: 41, sex: 'M', phone: '092-901-2345', dx: 'Asthma',                 visit: '15/04/2569', status: 'active' },
  { hn: 'HN-2024-09182', name: 'มาลี กิจสมบูรณ์',    age: 53, sex: 'F', phone: '083-012-3456', dx: 'Gastritis',              visit: '20/04/2569', status: 'discharged' },
  { hn: 'HN-2023-07761', name: 'ธนากร พิทักษ์',     age: 29, sex: 'M', phone: '087-123-4567', dx: 'Migraine',               visit: '12/04/2569', status: 'active' },
];

function renderPatients() {
  const statusBadge = s => ({
    active:     '<span class="badge badge--success badge--dot">Active</span>',
    inpatient:  '<span class="badge badge--brand badge--dot">Inpatient</span>',
    new:        '<span class="badge badge--info badge--dot">ผู้ป่วยใหม่</span>',
    discharged: '<span class="badge badge--neutral badge--dot">Discharged</span>',
  }[s]);

  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>ผู้ป่วย</h1>
        <p class="page-head__sub">ทั้งหมด 2,148 ราย · Active 1,824 · ผู้ป่วยใน 102</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">${ICON.download}ส่งออก CSV</button>
        <button class="btn btn--primary btn--sm" onclick="renderPatientDetail('HN-2024-08471')">${ICON.plus}ลงทะเบียนผู้ป่วยใหม่</button>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-bar__search">
        ${ICON.search}
        <input class="input" placeholder="ค้นหา HN, ชื่อ, เบอร์โทร, เลขประจำตัวประชาชน...">
      </div>
      <select class="input select" style="width:auto;">
        <option>ทุกสถานะ</option><option>Active</option><option>Inpatient</option><option>Discharged</option>
      </select>
      <select class="input select" style="width:auto;">
        <option>ทุกสิทธิการรักษา</option><option>UC (บัตรทอง)</option><option>ประกันสังคม</option><option>เบิกได้</option><option>เงินสด</option>
      </select>
      <button class="btn btn--secondary btn--sm">${ICON.filter}ตัวกรองเพิ่มเติม</button>
      <div class="filter-bar__spacer"></div>
      <span class="text-mono text-sub" style="font-size:11px;">${PATIENTS.length} จาก 2,148</span>
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th style="width:30px;"><input type="checkbox"></th>
            <th>HN</th>
            <th>ผู้ป่วย</th>
            <th>อายุ / เพศ</th>
            <th>โทรศัพท์</th>
            <th>การวินิจฉัย</th>
            <th>เยี่ยมล่าสุด</th>
            <th>สถานะ</th>
            <th style="width:40px;"></th>
          </tr>
        </thead>
        <tbody>
          ${PATIENTS.map(p => `
            <tr style="cursor:pointer;" onclick="renderPatientDetail('${p.hn}')">
              <td><input type="checkbox" onclick="event.stopPropagation();"></td>
              <td class="text-mono text-sub">${p.hn}</td>
              <td>
                <div class="user-cell">
                  ${avatar(p.name)}
                  <div>
                    <div class="user-cell__name">${p.name}</div>
                  </div>
                </div>
              </td>
              <td>${p.age} · ${p.sex}</td>
              <td class="text-mono">${p.phone}</td>
              <td>${p.dx}</td>
              <td class="text-mono text-sub">${p.visit}</td>
              <td>${statusBadge(p.status)}</td>
              <td><button class="btn btn--ghost btn--sm btn--icon" onclick="event.stopPropagation();">${ICON.more}</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="pagination">
        <span>1–10 จาก 2,148</span>
        <div class="pagination__spacer"></div>
        <button class="btn btn--ghost btn--sm">ก่อนหน้า</button>
        <button class="btn btn--secondary btn--sm">1</button>
        <button class="btn btn--ghost btn--sm">2</button>
        <button class="btn btn--ghost btn--sm">3</button>
        <span>…</span>
        <button class="btn btn--ghost btn--sm">215</button>
        <button class="btn btn--ghost btn--sm">ถัดไป</button>
      </div>
    </div>
  </div>`;
}

function renderPatientDetail(hn) {
  const p = PATIENTS.find(x => x.hn === hn) || PATIENTS[0];
  document.getElementById('crumb-current').textContent = `ผู้ป่วย / ${p.name}`;
  document.getElementById('content').innerHTML = `
  <div class="his-section">
    <div class="page-head">
      <div>
        <a href="#" onclick="goRoute('patients');return false;" class="btn btn--link" style="font-size:12px;">← กลับรายการผู้ป่วย</a>
        <h1 style="margin-top:6px;">${p.name}</h1>
        <p class="page-head__sub">${p.hn} · ${p.age} ปี · เพศ ${p.sex === 'F' ? 'หญิง' : 'ชาย'} · เลือดกรุ๊ป O+</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">${ICON.print}พิมพ์ใบประวัติ</button>
        <button class="btn btn--secondary btn--sm">นัดติดตาม</button>
        <button class="btn btn--primary btn--sm">เริ่มตรวจ</button>
      </div>
    </div>

    <div class="alert alert--warning">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top:2px;"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
      <div>
        <h4 class="alert__title">ข้อควรระวัง · แพ้ยา Penicillin (rash)</h4>
        <p class="alert__body">บันทึกครั้งล่าสุด 12/03/2568 โดย นพ. วิชัย ตันติพงษ์</p>
      </div>
    </div>

    <div class="patient-grid">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div class="patient-summary">
          <div class="patient-summary__hd">
            <div style="display:flex; gap:12px; align-items:center;">
              ${avatar(p.name, 'xl')}
              <div>
                <div class="patient-summary__name">${p.name}</div>
                <div class="patient-summary__meta"><span>${p.hn}</span> · <span>${p.age} ปี</span> · <span>${p.sex === 'F' ? 'หญิง' : 'ชาย'}</span></div>
                <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
                  <span class="badge badge--success badge--dot">Active</span>
                  <span class="badge badge--brand">UC (บัตรทอง)</span>
                </div>
              </div>
            </div>
          </div>
          <div class="kv-list">
            <div class="kv-list__row"><span class="kv-list__k">เลข ปชช.</span><span class="kv-list__v text-mono">3-1014-12345-67-8</span></div>
            <div class="kv-list__row"><span class="kv-list__k">เกิด</span><span class="kv-list__v">14 มีนาคม 2510</span></div>
            <div class="kv-list__row"><span class="kv-list__k">โทรศัพท์</span><span class="kv-list__v text-mono">${p.phone}</span></div>
            <div class="kv-list__row"><span class="kv-list__k">ที่อยู่</span><span class="kv-list__v">123/45 ถ.พระราม 4 แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110</span></div>
            <div class="kv-list__row"><span class="kv-list__k">ผู้ติดต่อฉุกเฉิน</span><span class="kv-list__v">นาย สมพงษ์ จันทร์เพ็ญ (สามี) · 081-999-8888</span></div>
            <div class="kv-list__row"><span class="kv-list__k">แพ้ยา</span><span class="kv-list__v danger-text">Penicillin (rash)</span></div>
            <div class="kv-list__row"><span class="kv-list__k">โรคประจำตัว</span><span class="kv-list__v">${p.dx}</span></div>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <h3 class="card__title">การนัดถัดไป</h3>
          </div>
          <div class="item-list">
            <div class="item-list__row">
              <span class="text-mono text-sub" style="width:48px;">15/05</span>
              <div class="item-list__main">
                <span class="item-list__title">F/U HT + Lab CBC, BUN/Cr</span>
                <span class="item-list__sub">นพ. สมศักดิ์ · 09:30 · ห้อง 304</span>
              </div>
            </div>
            <div class="item-list__row">
              <span class="text-mono text-sub" style="width:48px;">22/06</span>
              <div class="item-list__main">
                <span class="item-list__title">นัดตา · DM Retinopathy screening</span>
                <span class="item-list__sub">พญ. นวลปราง · 14:00 · ห้องตา 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <div class="vital-grid">
          <div class="vital">
            <div class="vital__label">BP</div>
            <div class="vital__value">128/82<span class="vital__unit"> mmHg</span></div>
            <div class="vital__delta">ก่อนหน้า 132/85 · ลดลง</div>
          </div>
          <div class="vital">
            <div class="vital__label">HR</div>
            <div class="vital__value">76<span class="vital__unit"> bpm</span></div>
            <div class="vital__delta">ปกติ</div>
          </div>
          <div class="vital">
            <div class="vital__label">Temp</div>
            <div class="vital__value">36.8<span class="vital__unit"> °C</span></div>
            <div class="vital__delta">ปกติ</div>
          </div>
          <div class="vital">
            <div class="vital__label">SpO₂</div>
            <div class="vital__value">98<span class="vital__unit"> %</span></div>
            <div class="vital__delta">ปกติ</div>
          </div>
          <div class="vital">
            <div class="vital__label">น้ำหนัก</div>
            <div class="vital__value">62.5<span class="vital__unit"> kg</span></div>
            <div class="vital__delta">−0.4 จากครั้งก่อน</div>
          </div>
          <div class="vital">
            <div class="vital__label">BMI</div>
            <div class="vital__value">23.4</div>
            <div class="vital__delta">Normal</div>
          </div>
          <div class="vital">
            <div class="vital__label">FBS</div>
            <div class="vital__value">142<span class="vital__unit"> mg/dL</span></div>
            <div class="vital__delta danger-text">สูงกว่าปกติ</div>
          </div>
          <div class="vital">
            <div class="vital__label">HbA1c</div>
            <div class="vital__value">7.2<span class="vital__unit"> %</span></div>
            <div class="vital__delta">เป้า &lt; 7.0</div>
          </div>
        </div>

        <div class="card">
          <div class="page-tabs">
            <button class="is-active" onclick="switchClinicalTab(event, 'history')">ประวัติการตรวจ</button>
            <button onclick="switchClinicalTab(event, 'vital')">Vital chart</button>
            <button onclick="switchClinicalTab(event, 'lab')">ผล Lab</button>
            <button onclick="switchClinicalTab(event, 'soap')">SOAP note</button>
            <button onclick="switchClinicalTab(event, 'rx')">Prescription</button>
            <button onclick="switchClinicalTab(event, 'bodymap')">Body map</button>
            <button onclick="switchClinicalTab(event, 'proms')">PROMs</button>
          </div>
          <div id="clinical-tab-history">
            <div class="item-list">
              ${[
                { date: '30/04/2569', title: 'OPD Visit · F/U HT + DM', dr: 'นพ. สมศักดิ์ ใจดี', sub: 'BP 128/82 · FBS 142 · ปรับ Metformin 500→1000 mg', tone: 'brand' },
                { date: '15/02/2569', title: 'OPD Visit · F/U HT', dr: 'นพ. สมศักดิ์ ใจดี', sub: 'BP 132/85 · เพิ่ม Amlodipine 5 mg', tone: 'brand' },
                { date: '20/12/2568', title: 'OPD Visit · ปรึกษาอาการเวียนศีรษะ', dr: 'พญ. กนกวรรณ', sub: 'Dx: Vertigo · BPPV · ให้ Stemetil', tone: 'neutral' },
                { date: '10/09/2568', title: 'Admit IPD · Pneumonia', dr: 'นพ. ธนพล', sub: 'นอน รพ. 4 วัน · LOS 4d · D/C improved', tone: 'success' },
              ].map(v => `
                <div class="item-list__row">
                  <span class="text-mono text-sub" style="width:80px;">${v.date}</span>
                  <div class="item-list__main">
                    <span class="item-list__title">${v.title}</span>
                    <span class="item-list__sub">${v.dr} · ${v.sub}</span>
                  </div>
                  <button class="btn btn--ghost btn--sm">เปิด</button>
                </div>
              `).join('')}
            </div>
          </div>
          <div id="clinical-tab-vital" hidden>${renderPhaseDemo('vitalsSection')}</div>
          <div id="clinical-tab-lab" hidden>${renderPhaseDemo('labsSection')}</div>
          <div id="clinical-tab-soap" hidden>${renderPhaseDemo('soapSection')}</div>
          <div id="clinical-tab-rx" hidden>${renderPhaseDemo('rxSection')}</div>
          <div id="clinical-tab-bodymap" hidden>${renderPhaseDemo('bodyMapSection')}</div>
          <div id="clinical-tab-proms" hidden>${renderPhaseDemo('promsSection')}</div>
        </div>

        <div class="card">
          <div class="card__header">
            <h3 class="card__title">ใบสั่งยาปัจจุบัน · 4 รายการ</h3>
            <button class="btn btn--secondary btn--sm">${ICON.plus}เพิ่มยา</button>
          </div>
          <div>
            ${[
              { name: 'Metformin', strength: '500 mg', dose: '1×3 หลังอาหาร', supply: '90 เม็ด · 30 วัน', icon: ICON.pill },
              { name: 'Amlodipine', strength: '5 mg', dose: '1×1 เช้า', supply: '30 เม็ด · 30 วัน', icon: ICON.pill },
              { name: 'Atorvastatin', strength: '20 mg', dose: '1×1 ก่อนนอน', supply: '30 เม็ด · 30 วัน', icon: ICON.pill },
              { name: 'Aspirin', strength: '81 mg', dose: '1×1 หลังอาหารเช้า', supply: '30 เม็ด · 30 วัน', icon: ICON.pill },
            ].map(m => `
              <div class="order-row">
                <div class="order-row__icon">${m.icon}</div>
                <div>
                  <div class="order-row__title">${m.name} <span class="text-sub text-mono" style="font-size:12px;">${m.strength}</span></div>
                  <div class="order-row__sub">${m.dose} · ${m.supply}</div>
                </div>
                <span class="badge badge--success">Active</span>
                <button class="btn btn--ghost btn--sm btn--icon">${ICON.more}</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`;
  window.scrollTo(0, 0);
}

/* ════════════ OPD ════════════ */
function renderOPD() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>คิว OPD</h1>
        <p class="page-head__sub">42 คิวรอตรวจ · เวลารอเฉลี่ย 12 นาที · 6 ห้องตรวจเปิด</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">${ICON.print}พิมพ์บัตรคิว</button>
        <button class="btn btn--primary btn--sm">เรียกคิวถัดไป</button>
      </div>
    </div>

    <div class="stat-grid">
      ${statTile('คิวรอเรียก', '24', 'รอเฉลี่ย 12 นาที', 'down', [38,35,30,28,26,25,24], 'brand')}
      ${statTile('กำลังตรวจ', '6', '6 ห้องเต็ม', 'up', [4,5,5,6,6,6,6], 'success')}
      ${statTile('ตรวจเสร็จ', '112', '+18 จากชั่วโมงก่อน', 'up', [40,55,70,85,95,105,112], 'brand')}
      ${statTile('เกินเวลานัด', '3', 'เกินเฉลี่ย 8 นาที', 'down', [8,7,5,4,4,3,3], 'warning')}
    </div>

    <div class="page-tabs">
      <button class="is-active" onclick="switchOpdTab(event, 'queue')">คิวรอตรวจ</button>
      <button onclick="switchOpdTab(event, 'patient')">มุมมองผู้ป่วย</button>
    </div>

    <div id="opd-tab-queue">
      <div class="filter-bar">
        <div class="filter-bar__search">
          ${ICON.search}
          <input class="input" placeholder="ค้นหา HN หรือชื่อ...">
        </div>
        <select class="input select" style="width:auto;">
          <option>ทุกแผนก</option><option>อายุรกรรม</option><option>ศัลยกรรม</option><option>กุมาร</option><option>สูติ-นรีเวช</option>
        </select>
        <select class="input select" style="width:auto;">
          <option>ทุกห้อง</option><option>304</option><option>305</option><option>306</option>
        </select>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>คิว</th>
              <th>เวลานัด</th>
              <th>ผู้ป่วย</th>
              <th>HN</th>
              <th>แผนก / ห้อง</th>
              <th>แพทย์</th>
              <th>อาการสำคัญ</th>
              <th>สถานะ</th>
              <th style="width:120px;">ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            ${[
              { q: 'A042', time: '10:30', name: 'วีระชัย ทองดี', hn: 'HN-2024-00982', dept: 'อายุรกรรม / 304', dr: 'นพ. สมศักดิ์', cc: 'รับยา DM ประจำ', status: ['neutral','รอเรียก'] },
              { q: 'A043', time: '10:45', name: 'นันทิดา ภูมิใจ', hn: 'HN-2025-00211', dept: 'อายุรกรรม / 304', dr: 'นพ. สมศักดิ์', cc: 'ปวดท้องด้านขวาบน', status: ['warning','รอนาน 18 นาที'] },
              { q: 'A044', time: '11:00', name: 'จักรกฤษณ์ บุญมา', hn: 'HN-2023-04021', dept: 'อายุรกรรม / 304', dr: 'นพ. สมศักดิ์', cc: 'นัดอ่านผล CT-scan', status: ['neutral','รอเรียก'] },
              { q: 'B021', time: '10:00', name: 'สมหญิง วงศ์ดี', hn: 'HN-2024-05521', dept: 'ศัลยกรรม / 401', dr: 'นพ. ธนพล', cc: 'แผลผ่าตัดยังไม่หาย', status: ['brand','กำลังตรวจ'] },
              { q: 'B022', time: '10:15', name: 'อภิชาติ บัวศรี', hn: 'HN-2025-00102', dept: 'ศัลยกรรม / 401', dr: 'นพ. ธนพล', cc: 'ก้อนที่คอ 2 สัปดาห์', status: ['neutral','รอเรียก'] },
              { q: 'C015', time: '09:45', name: 'ด.ช. ภูมิรพี', hn: 'HN-2025-00890', dept: 'กุมาร / 201', dr: 'พญ. ปิยะนุช', cc: 'ไข้สูง 2 วัน', status: ['success','ตรวจเสร็จ'] },
              { q: 'C016', time: '10:30', name: 'ด.ญ. มินตรา', hn: 'HN-2024-08812', dept: 'กุมาร / 201', dr: 'พญ. ปิยะนุช', cc: 'วัคซีนตามวัย 4 ขวบ', status: ['brand','กำลังตรวจ'] },
            ].map(r => `
              <tr>
                <td><span class="badge badge--brand badge--solid text-mono">${r.q}</span></td>
                <td class="text-mono text-sub">${r.time}</td>
                <td>
                  <div class="user-cell">${avatar(r.name)}<div class="user-cell__name">${r.name}</div></div>
                </td>
                <td class="text-mono text-sub">${r.hn}</td>
                <td>${r.dept}</td>
                <td>${r.dr}</td>
                <td>${r.cc}</td>
                <td><span class="badge badge--${r.status[0]} badge--dot">${r.status[1]}</span></td>
                <td>
                  <button class="btn btn--secondary btn--sm">เปิดบันทึก</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div id="opd-tab-patient" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('patientHeaderSection')}
        ${renderPhaseDemo('allergiesSection')}
        ${renderPhaseDemo('vitalsSection')}
        ${renderPhaseDemo('soapSection')}
        ${renderPhaseDemo('rxSection')}
      </div>
    </div>
  </div>`;
}

/* ════════════ IPD ════════════ */
function renderIPD() {
  // generate beds for ICU detail
  const bedStates = ['occupied','occupied','occupied','occupied','cleaning','occupied','free','occupied','occupied','reserved','occupied','blocked'];
  const patients = ['สมชาย ก.','วรรณา ม.','พิเชษฐ์ ส.','รัตนา ภ.','—','ธนพร น.','—','ชาตรี ป.','สุภาพ ห.','— จองไว้','มาลี ค.','ปิดซ่อม'];

  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>IPD · ผู้ป่วยใน</h1>
        <p class="page-head__sub">ครองเตียง 102 / 130 (78%) · 3 รายรอรับเข้าจาก ER · 2 รายเตรียม D/C</p>
      </div>
      <div class="page-head__actions">
        <select class="input select" style="width:auto;">
          <option>ICU · 12 เตียง</option>
          <option>CCU · 8 เตียง</option>
          <option>หอผู้ป่วยสามัญชาย 5A</option>
          <option>หอผู้ป่วยสามัญหญิง 5B</option>
          <option>หอผู้ป่วยพิเศษ 7</option>
        </select>
        <button class="btn btn--primary btn--sm">${ICON.plus}รับผู้ป่วยใหม่</button>
      </div>
    </div>

    <div class="page-tabs">
      <button class="is-active" onclick="switchIpdTab(event, 'bedmap')">แผนผังเตียง</button>
      <button onclick="switchIpdTab(event, 'admission')">Admission</button>
      <button onclick="switchIpdTab(event, 'orders')">Doctor's orders</button>
      <button onclick="switchIpdTab(event, 'nurse')">Nurse note</button>
      <button onclick="switchIpdTab(event, 'io')">I/O 24h</button>
      <button onclick="switchIpdTab(event, 'diet')">Diet</button>
      <button onclick="switchIpdTab(event, 'discharge')">Discharge</button>
      <button onclick="switchIpdTab(event, 'preop')">Pre-op</button>
      <button onclick="switchIpdTab(event, 'or')">OR record</button>
      <button onclick="switchIpdTab(event, 'bedside')">Bedside</button>
      <button onclick="switchIpdTab(event, 'safety')">Safety</button>
      <button onclick="switchIpdTab(event, 'handoff')">Hand-off</button>
    </div>

    <div id="ipd-tab-bedmap">
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">ICU · ห้อง 12 เตียง</h3>
          <div class="legend">
            <span><span class="legend__sw" style="background: var(--ax-brand-faint); border-color: var(--ax-brand-muted);"></span>มีผู้ป่วย</span>
            <span><span class="legend__sw" style="background: var(--ax-warning-faint); border-color: var(--ax-warning-muted);"></span>กำลังทำความสะอาด</span>
            <span><span class="legend__sw" style="background: var(--ax-info-faint); border-color: var(--ax-info-muted);"></span>จองไว้</span>
            <span><span class="legend__sw" style="background: var(--ax-error-faint); border-color: var(--ax-error-muted);"></span>ปิด</span>
            <span><span class="legend__sw" style="background: var(--ax-background-default);"></span>ว่าง</span>
          </div>
        </div>
        <div class="card__body">
          <div class="bed-grid">
            ${bedStates.map((s, i) => `
              <div class="bed bed--${s}">
                <div class="bed__num">ICU-${String(i+1).padStart(2,'0')}</div>
                <div class="bed__name">${patients[i]}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="col-2">
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">รายชื่อผู้ป่วยใน · ICU</h3>
            <button class="btn btn--ghost btn--sm">${ICON.filter}กรอง</button>
          </div>
          <div class="table-wrap" style="border:0; border-radius:0;">
            <table class="table">
              <thead>
                <tr><th>เตียง</th><th>ผู้ป่วย</th><th>Admit</th><th>Dx หลัก</th><th>แพทย์</th><th>วันที่ ๆ</th></tr>
              </thead>
              <tbody>
                ${[
                  { bed: 'ICU-01', name: 'สมชาย ก.', adm: '24/04', dx: 'Sepsis', dr: 'นพ. ธนพล', day: 6 },
                  { bed: 'ICU-02', name: 'วรรณา ม.', adm: '27/04', dx: 'AMI Post-PCI', dr: 'นพ. กนกพล', day: 3 },
                  { bed: 'ICU-03', name: 'พิเชษฐ์ ส.', adm: '28/04', dx: 'Pneumonia c Septic Shock', dr: 'นพ. ธนพล', day: 2 },
                  { bed: 'ICU-04', name: 'รัตนา ภ.', adm: '29/04', dx: 'Post-op Cholecystectomy', dr: 'นพ. ธนพล', day: 1 },
                  { bed: 'ICU-06', name: 'ธนพร น.', adm: '25/04', dx: 'Acute Pancreatitis', dr: 'นพ. สมศักดิ์', day: 5 },
                  { bed: 'ICU-08', name: 'ชาตรี ป.', adm: '20/04', dx: 'CHF Exacerbation', dr: 'นพ. กนกพล', day: 10 },
                  { bed: 'ICU-09', name: 'สุภาพ ห.', adm: '22/04', dx: 'CVA, ICH', dr: 'นพ. ธนพล', day: 8 },
                  { bed: 'ICU-11', name: 'มาลี ค.', adm: '29/04', dx: 'Resp. Failure', dr: 'นพ. ธนพล', day: 1 },
                ].map(p => `
                  <tr>
                    <td class="text-mono">${p.bed}</td>
                    <td><div class="user-cell">${avatar(p.name)}<div class="user-cell__name">${p.name}</div></div></td>
                    <td class="text-mono text-sub">${p.adm}</td>
                    <td>${p.dx}</td>
                    <td>${p.dr}</td>
                    <td class="text-mono text-num">${p.day} วัน</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <h3 class="card__title">รอ Admit / Discharge</h3>
          </div>
          <div class="item-list">
            <div class="item-list__row">
              <span class="badge badge--info">Admit</span>
              <div class="item-list__main">
                <span class="item-list__title">นาย ชัยวัฒน์ พรพิพัฒน์</span>
                <span class="item-list__sub">จาก ER · Dx: ACS · ต้องการ CCU</span>
              </div>
              <button class="btn btn--primary btn--sm">รับเข้า</button>
            </div>
            <div class="item-list__row">
              <span class="badge badge--info">Admit</span>
              <div class="item-list__main">
                <span class="item-list__title">นาง สุนิสา จำปาทอง</span>
                <span class="item-list__sub">จาก ER · Dx: Pneumonia · ต้องการ ICU</span>
              </div>
              <button class="btn btn--primary btn--sm">รับเข้า</button>
            </div>
            <div class="item-list__row">
              <span class="badge badge--info">Admit</span>
              <div class="item-list__main">
                <span class="item-list__title">เด็กชาย ธนพล สุข</span>
                <span class="item-list__sub">จาก OPD · Dx: Dengue · กุมาร</span>
              </div>
              <button class="btn btn--primary btn--sm">รับเข้า</button>
            </div>
            <div class="item-list__row">
              <span class="badge badge--success">D/C</span>
              <div class="item-list__main">
                <span class="item-list__title">นาง วิภาดา ลือไกล</span>
                <span class="item-list__sub">เตียง W5A-12 · Improved · รอชำระเงิน</span>
              </div>
              <button class="btn btn--secondary btn--sm">ดำเนินการ</button>
            </div>
            <div class="item-list__row">
              <span class="badge badge--success">D/C</span>
              <div class="item-list__main">
                <span class="item-list__title">นาย วิทยา จงสำเร็จ</span>
                <span class="item-list__sub">เตียง W7-04 · Stable · รอ TR ผู้ดูแล</span>
              </div>
              <button class="btn btn--secondary btn--sm">ดำเนินการ</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="ipd-tab-admission" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('admissionSection')}
        ${renderPhaseDemo('consentSection')}
        ${renderPhaseDemo('wristbandSection')}
        ${renderPhaseDemo('belongingsSection')}
      </div>
    </div>
    <div id="ipd-tab-orders" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('ordersSection')}
        ${renderPhaseDemo('orderSetSection')}
      </div>
    </div>
    <div id="ipd-tab-nurse" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('nurseNoteSection')}
        ${renderPhaseDemo('carePlanSection')}
      </div>
    </div>
    <div id="ipd-tab-io" hidden>${renderPhaseDemo('ioSection')}</div>
    <div id="ipd-tab-diet" hidden>${renderPhaseDemo('dietSection')}</div>
    <div id="ipd-tab-discharge" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('dischargeSection')}
        ${renderPhaseDemo('medRecSection')}
        ${renderPhaseDemo('eduSection')}
        ${renderPhaseDemo('deathSection')}
      </div>
    </div>
    <div id="ipd-tab-preop" hidden>${renderPhaseDemo('preopSection')}</div>
    <div id="ipd-tab-or" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('opnoteSection')}
        ${renderPhaseDemo('anesthSection')}
      </div>
    </div>
    <div id="ipd-tab-bedside" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('bedsideSection')}
        ${renderPhaseDemo('visitorSection')}
      </div>
    </div>
    <div id="ipd-tab-safety" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('fallSection')}
        ${renderPhaseDemo('bradenSection')}
        ${renderPhaseDemo('btxSection')}
        ${renderPhaseDemo('restraintSection')}
      </div>
    </div>
    <div id="ipd-tab-handoff" hidden>${renderPhaseDemo('sbarSection')}</div>
  </div>`;
}

/* ════════════ ER ════════════ */
function renderER() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>ห้องฉุกเฉิน (ER)</h1>
        <p class="page-head__sub">ผู้ป่วยในระบบ 8 ราย · Resuscitation 1 · รอเตียง 3</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">เรียกทีมเสริม</button>
        <button class="btn btn--danger btn--sm">${ICON.plus}รับเคสฉุกเฉิน</button>
      </div>
    </div>

    <div class="alert alert--error">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top:2px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
      <div>
        <h4 class="alert__title">CODE STEMI · ห้อง Resus 1</h4>
        <p class="alert__body">นาย ชัยวัฒน์ พรพิพัฒน์ · 58 ปี · Onset 45 นาที · ส่ง Cath Lab · ETA 8 นาที</p>
      </div>
    </div>

    <div class="stat-grid">
      ${statTile('Resuscitation', '1', 'ใช้งาน 1/2', 'up', [0,1,1,2,1,1,1], 'error')}
      ${statTile('Triage 2 (Emergent)', '2', 'รอเฉลี่ย 4 นาที', 'up', [3,2,2,3,2,2,2], 'warning')}
      ${statTile('Triage 3-4', '5', 'รอเฉลี่ย 22 นาที', 'down', [8,7,6,6,5,5,5], 'brand')}
      ${statTile('รอเตียง IPD', '3', '2 ICU · 1 CCU', 'up', [1,2,2,3,3,3,3], 'warning')}
    </div>

    <div class="page-tabs">
      <button class="is-active" onclick="switchErTab(event, 'live')">Live list</button>
      <button onclick="switchErTab(event, 'triage')">Triage</button>
      <button onclick="switchErTab(event, 'resus')">Resus / Code blue</button>
      <button onclick="switchErTab(event, 'refer')">Refer / Transfer</button>
    </div>

    <div id="er-tab-live">
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">รายการ ER · Live</h3>
          <span class="badge badge--success badge--dot">อัพเดต Real-time</span>
        </div>
        <div class="table-wrap" style="border:0; border-radius:0;">
          <table class="table">
            <thead>
              <tr>
                <th>Triage</th>
                <th>เวลามาถึง</th>
                <th>ผู้ป่วย</th>
                <th>อาการ / Vital</th>
                <th>สถานะ</th>
                <th>แพทย์</th>
                <th style="width:120px;">ดำเนินการ</th>
              </tr>
            </thead>
            <tbody>
              ${[
                { t: 1, time: '10:42', name: 'ชัยวัฒน์ พรพิพัฒน์', cc: 'Chest pain · BP 96/62 · HR 112', status: ['error','Resus 1 · STEMI'], dr: 'นพ. ธนพล' },
                { t: 2, time: '10:25', name: 'สุนิสา จำปาทอง', cc: 'SOB · SpO2 89% · HR 124', status: ['warning','Bay 2 · Pneumonia'], dr: 'นพ. กนกพล' },
                { t: 2, time: '10:15', name: 'อรทัย มั่นคง', cc: 'Severe abd. pain · BP 110/70', status: ['warning','Bay 3 · ผ่าตัดด่วน'], dr: 'นพ. ธนพล' },
                { t: 3, time: '09:58', name: 'ด.ช. ภูมิรินทร์', cc: 'High fever 39.5 · ชัก 1 ครั้ง', status: ['brand','Bay 5 · รอผล Lab'], dr: 'พญ. ปิยะนุช' },
                { t: 3, time: '09:40', name: 'ทศพล ภูมิจิต', cc: 'Trauma · MVA · L. ankle', status: ['brand','Bay 6 · รอ X-ray'], dr: 'นพ. กิตติพงศ์' },
                { t: 4, time: '09:28', name: 'ลำใย ผ่องใส', cc: 'Headache 3 วัน · BP 130/85', status: ['neutral','Bay 7'], dr: 'นพ. กนกพล' },
                { t: 4, time: '09:15', name: 'ดวงพร อมรเดช', cc: 'แผลที่นิ้วมือ · เย็บ 3 เข็ม', status: ['success','D/C ได้'], dr: 'นพ. กิตติพงศ์' },
                { t: 5, time: '09:00', name: 'สมศรี เกษมสุข', cc: 'รับยาเดิม · ไม่มีอาการเฉียบพลัน', status: ['success','D/C ได้'], dr: 'นพ. กนกพล' },
              ].map(r => `
                <tr>
                  <td><span class="badge badge--${['','error','warning','brand','neutral','neutral'][r.t]} badge--solid text-mono">T${r.t}</span></td>
                  <td class="text-mono text-sub">${r.time}</td>
                  <td><div class="user-cell">${avatar(r.name)}<div class="user-cell__name">${r.name}</div></div></td>
                  <td class="text-mono" style="font-size:12px;">${r.cc}</td>
                  <td><span class="badge badge--${r.status[0]} badge--dot">${r.status[1]}</span></td>
                  <td>${r.dr}</td>
                  <td><button class="btn btn--secondary btn--sm">เปิดเคส</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div id="er-tab-triage" hidden>${renderPhaseDemo('triageSection')}</div>
    <div id="er-tab-resus" hidden>${renderPhaseDemo('codeBlueSection')}</div>
    <div id="er-tab-refer" hidden>${renderPhaseDemo('referSection')}</div>
  </div>`;
}

/* ════════════ PHARMACY ════════════ */
function renderPharmacy() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>ห้องยา</h1>
        <p class="page-head__sub">คิว 34 ใบสั่ง · กำลังจัด 6 · ตรวจซ้ำ 4 · รอจ่าย 12</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">${ICON.print}พิมพ์รายงาน</button>
        <button class="btn btn--primary btn--sm">เรียกคิวถัดไป</button>
      </div>
    </div>

    <div class="page-tabs">
      <button class="is-active">ใบสั่งใหม่ <span class="badge badge--brand" style="margin-left:6px;">12</span></button>
      <button>กำลังจัด <span class="badge badge--neutral" style="margin-left:6px;">6</span></button>
      <button>ตรวจซ้ำ <span class="badge badge--warning" style="margin-left:6px;">4</span></button>
      <button>พร้อมจ่าย <span class="badge badge--success" style="margin-left:6px;">12</span></button>
      <button>คลัง / สต็อก</button>
    </div>

    <div class="col-2">
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">คิวรอจัดยา</h3>
        </div>
        <div>
          ${[
            { q: 'P102', name: 'วราภรณ์ จันทร์เพ็ญ', meta: 'OPD 304 · 4 รายการ', wait: '2 นาที', tone: 'brand' },
            { q: 'P103', name: 'ประยุทธ์ ศิริวัฒน์', meta: 'OPD 304 · 6 รายการ', wait: '4 นาที', tone: 'brand' },
            { q: 'P104', name: 'ลักษณา พงศ์ภัทร', meta: 'OPD 304 · 8 รายการ · ⚠️ Penicillin', wait: '5 นาที', tone: 'warning' },
            { q: 'P105', name: 'วีระชัย ทองดี', meta: 'OPD 304 · 5 รายการ', wait: '7 นาที', tone: 'brand' },
            { q: 'P106', name: 'สมหญิง วงศ์ดี', meta: 'OPD 401 · 3 รายการ', wait: '9 นาที', tone: 'brand' },
            { q: 'P107', name: 'ด.ช. ภูมิรพี', meta: 'OPD 201 · 2 รายการ · กุมาร', wait: '11 นาที', tone: 'brand' },
            { q: 'P108', name: 'จักรกฤษณ์ บุญมา', meta: 'OPD 304 · 4 รายการ', wait: '12 นาที', tone: 'warning' },
          ].map(r => `
            <div class="queue-row">
              <div class="queue-row__num">${r.q}</div>
              <div>
                <div class="item-list__title">${r.name}</div>
                <div class="item-list__sub">${r.meta}</div>
              </div>
              <span class="badge badge--${r.tone} badge--dot">${r.wait}</span>
              <button class="btn btn--secondary btn--sm">เริ่มจัด</button>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">สต็อกใกล้หมด</h3>
            <span class="badge badge--warning">5 รายการ</span>
          </div>
          <div class="item-list">
            ${[
              { n: 'Insulin Glargine 100 IU/mL', stock: 12, min: 30, tone: 'error' },
              { n: 'Amoxicillin 500 mg cap', stock: 240, min: 500, tone: 'warning' },
              { n: 'Salbutamol Inhaler 100 mcg', stock: 8, min: 20, tone: 'error' },
              { n: 'Paracetamol 500 mg tab', stock: 1820, min: 2000, tone: 'warning' },
              { n: 'Warfarin 3 mg tab', stock: 60, min: 100, tone: 'warning' },
            ].map(s => `
              <div class="item-list__row">
                <div class="order-row__icon" style="background: var(--ax-${s.tone}-faint); color: var(--ax-${s.tone}-emphasis);">${ICON.pill}</div>
                <div class="item-list__main">
                  <span class="item-list__title">${s.n}</span>
                  <span class="item-list__sub">เหลือ ${s.stock} · ขั้นต่ำ ${s.min}</span>
                </div>
                <button class="btn btn--ghost btn--sm">สั่งซื้อ</button>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card__header">
            <h3 class="card__title">DDI / แพ้ยาที่ตรวจพบวันนี้</h3>
          </div>
          <div class="item-list">
            <div class="item-list__row">
              <div class="order-row__icon" style="background: var(--ax-error-faint); color: var(--ax-error-emphasis);">!</div>
              <div class="item-list__main">
                <span class="item-list__title">Warfarin × Aspirin</span>
                <span class="item-list__sub">นาง พรทิพย์ · เพิ่มความเสี่ยงเลือดออก · ระงับใบสั่ง</span>
              </div>
              <span class="badge badge--error badge--dot">High</span>
            </div>
            <div class="item-list__row">
              <div class="order-row__icon" style="background: var(--ax-warning-faint); color: var(--ax-warning-emphasis);">!</div>
              <div class="item-list__main">
                <span class="item-list__title">Penicillin · ผู้ป่วยแพ้</span>
                <span class="item-list__sub">นาง ลักษณา · บล็อกอัตโนมัติ · เปลี่ยนเป็น Macrolide</span>
              </div>
              <span class="badge badge--warning badge--dot">Block</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ════════════ LAB ════════════ */
function renderLab() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>ห้องปฏิบัติการ</h1>
        <p class="page-head__sub">รอเก็บ 18 · กำลังตรวจ 24 · ผลออกแล้ววันนี้ 142</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">${ICON.print}พิมพ์ Worklist</button>
        <button class="btn btn--primary btn--sm">${ICON.plus}สั่งตรวจใหม่</button>
      </div>
    </div>

    <div class="stat-grid">
      ${statTile('รอเก็บตัวอย่าง', '18', 'รอเฉลี่ย 5 นาที', 'down', [25,22,20,19,18,18,18], 'warning')}
      ${statTile('กำลังตรวจ', '24', 'TAT 35 นาที', 'up', [18,20,22,24,24,24,24], 'brand')}
      ${statTile('ผลผิดปกติ', '12', 'ต้อง Critical Call 2', 'up', [8,9,10,11,11,12,12], 'error')}
      ${statTile('ผลออกแล้ว', '142', '+24 จากชั่วโมงก่อน', 'up', [60,80,100,115,128,135,142], 'success')}
    </div>

    <div class="card">
      <div class="card__header">
        <h3 class="card__title">Worklist · อายุรกรรม</h3>
        <div class="row-flex">
          <select class="input select" style="width:auto; height:28px; font-size:12px;">
            <option>ทุกประเภท</option><option>Hematology</option><option>Chemistry</option><option>Microbiology</option>
          </select>
        </div>
      </div>
      <div class="table-wrap" style="border:0; border-radius:0;">
        <table class="table">
          <thead>
            <tr><th>เลขสิ่งส่ง</th><th>ผู้ป่วย</th><th>การตรวจ</th><th>เก็บเมื่อ</th><th>TAT</th><th>สถานะ</th><th>ผล</th></tr>
          </thead>
          <tbody>
            ${[
              { id: 'L-25-04421', name: 'วราภรณ์ จันทร์เพ็ญ', test: 'CBC, BUN/Cr, Lipid, HbA1c', collected: '08:30', tat: '42 min', status: ['success','ออกผลแล้ว'], result: 'HbA1c 7.2 ↑' },
              { id: 'L-25-04422', name: 'ประยุทธ์ ศิริวัฒน์', test: 'CBC, ESR, CRP', collected: '08:45', tat: '38 min', status: ['success','ออกผลแล้ว'], result: 'CRP 18 mg/L ↑' },
              { id: 'L-25-04423', name: 'ลักษณา พงศ์ภัทร', test: 'FBS, HbA1c, Microalbumin', collected: '09:15', tat: '25 min', status: ['brand','กำลังวิเคราะห์'], result: '—' },
              { id: 'L-25-04424', name: 'จักรกฤษณ์ บุญมา', test: 'AFP, CEA, Liver function', collected: '09:30', tat: '15 min', status: ['warning','รอเครื่อง'], result: '—' },
              { id: 'L-25-04425', name: 'สมชาย ก. (ICU)', test: 'Blood C/S × 2, ABG, Lactate', collected: '09:00', tat: '60 min', status: ['error','Critical: Lactate 4.2'], result: 'รอ C/S' },
              { id: 'L-25-04426', name: 'ด.ช. ภูมิรพี', test: 'CBC, Dengue NS1, Platelet', collected: '10:00', tat: '20 min', status: ['brand','กำลังวิเคราะห์'], result: '—' },
              { id: 'L-25-04427', name: 'อรทัย มั่นคง (ER)', test: 'Amylase, Lipase, CBC', collected: '10:20', tat: '5 min', status: ['neutral','รอเก็บ'], result: '—' },
            ].map(r => `
              <tr>
                <td class="text-mono text-sub">${r.id}</td>
                <td><div class="user-cell">${avatar(r.name)}<div class="user-cell__name">${r.name}</div></div></td>
                <td class="text-mono" style="font-size:12px;">${r.test}</td>
                <td class="text-mono text-sub">${r.collected}</td>
                <td class="text-mono">${r.tat}</td>
                <td><span class="badge badge--${r.status[0]} badge--dot">${r.status[1]}</span></td>
                <td class="text-mono" style="font-size:12px;">${r.result}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

/* ════════════ RADIOLOGY ════════════ */
function renderRadiology() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>รังสีวินิจฉัย</h1>
        <p class="page-head__sub">รอถ่าย 8 · รออ่าน 14 · รอลงนาม 3 · เสร็จวันนี้ 56</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">${ICON.print}พิมพ์ตารางคิว</button>
        <button class="btn btn--primary btn--sm">${ICON.plus}สั่งตรวจ</button>
      </div>
    </div>

    <div class="col-2">
      <div class="card">
        <div class="card__header">
          <h3 class="card__title">คิวห้องตรวจ</h3>
        </div>
        <div class="item-list">
          ${[
            { mod: 'CT', room: 'CT-1', name: 'จักรกฤษณ์ บุญมา', test: 'CT Whole Abdomen c contrast', tone: 'brand', status: 'กำลังถ่าย' },
            { mod: 'CT', room: 'CT-1', name: 'อรทัย มั่นคง (ER)', test: 'CT Brain non-contrast', tone: 'warning', status: 'รอ ER' },
            { mod: 'X-ray', room: 'XR-2', name: 'ด.ช. ภูมิรพี', test: 'CXR PA', tone: 'brand', status: 'กำลังถ่าย' },
            { mod: 'X-ray', room: 'XR-2', name: 'ทศพล ภูมิจิต (ER)', test: 'L. ankle AP/Lat', tone: 'brand', status: 'รอ' },
            { mod: 'MRI', room: 'MRI-1', name: 'สุภาพ ห. (ICU)', test: 'MRI Brain DWI', tone: 'error', status: 'รอ ICU' },
            { mod: 'US', room: 'US-3', name: 'ลักษณา พงศ์ภัทร', test: 'US Upper Abdomen', tone: 'neutral', status: 'นัด 11:00' },
            { mod: 'US', room: 'US-3', name: 'มาลี กิจสมบูรณ์', test: 'US KUB', tone: 'neutral', status: 'นัด 11:30' },
          ].map(r => `
            <div class="item-list__row">
              <span class="badge badge--neutral text-mono" style="min-width:48px; justify-content:center;">${r.mod}</span>
              <span class="text-mono text-sub" style="width:60px;">${r.room}</span>
              <div class="item-list__main">
                <span class="item-list__title">${r.name}</span>
                <span class="item-list__sub">${r.test}</span>
              </div>
              <span class="badge badge--${r.tone} badge--dot">${r.status}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card__header">
          <h3 class="card__title">รออ่าน / ลงนาม · นพ. รังสี</h3>
          <span class="badge badge--brand">17</span>
        </div>
        <div class="item-list">
          ${[
            { name: 'วราภรณ์ จันทร์เพ็ญ', test: 'CXR PA · ผ่านเช้า 09:00', urgent: false },
            { name: 'จักรกฤษณ์ บุญมา', test: 'CT Whole Abd c contrast · STAT', urgent: true },
            { name: 'อรทัย มั่นคง (ER)', test: 'CT Brain non-contrast · STAT', urgent: true },
            { name: 'ด.ญ. มินตรา', test: 'CXR PA', urgent: false },
            { name: 'ทศพล ภูมิจิต', test: 'L. ankle AP/Lat', urgent: false },
            { name: 'สมชาย ก. (ICU)', test: 'CXR Portable', urgent: false },
          ].map(r => `
            <div class="item-list__row">
              <div class="order-row__icon" style="background: ${r.urgent ? 'var(--ax-error-faint)' : 'var(--ax-background-subtle)'}; color: ${r.urgent ? 'var(--ax-error-emphasis)' : 'var(--ax-text-secondary)'};">${ICON.scan}</div>
              <div class="item-list__main">
                <span class="item-list__title">${r.name}</span>
                <span class="item-list__sub">${r.test}</span>
              </div>
              ${r.urgent ? '<span class="badge badge--error">STAT</span>' : ''}
              <button class="btn btn--secondary btn--sm">อ่าน</button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>`;
}

/* ════════════ BILLING ════════════ */
function renderBilling() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>การเงิน / สิทธิการรักษา</h1>
        <p class="page-head__sub">รอชำระ 22 · ตรวจสอบสิทธิ 8 · เคลม 45 · ปฏิเสธ 3</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--secondary btn--sm">${ICON.download}ส่งออกรายงาน</button>
        <button class="btn btn--primary btn--sm">${ICON.plus}เปิดบิลใหม่</button>
      </div>
    </div>

    <div class="stat-grid">
      ${statTile('รายได้วันนี้', '฿284,150', '+8.4% MoM', 'up', [220,235,210,250,270,265,284], 'brand')}
      ${statTile('รอชำระ', '22 ราย', '฿62,400 รวม', 'down', [30,28,26,25,24,23,22], 'warning')}
      ${statTile('เคลมประกัน (เดือนนี้)', '฿1.84M', 'อนุมัติ 92%', 'up', [1.2,1.4,1.5,1.6,1.7,1.78,1.84], 'success')}
      ${statTile('เคลมถูกปฏิเสธ', '3', 'ต้องอุทธรณ์ 2', 'down', [8,7,5,4,4,3,3], 'error')}
    </div>

    <div class="page-tabs">
      <button class="is-active" onclick="switchBillingTab(event, 'bills')">ใบเสร็จ / รอชำระ</button>
      <button onclick="switchBillingTab(event, 'itemized')">IPD itemized bill</button>
      <button onclick="switchBillingTab(event, 'preauth')">Insurance pre-auth</button>
      <button onclick="switchBillingTab(event, 'claims')">เคลมประกัน</button>
    </div>

    <div id="billing-tab-bills">
      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>เลขที่</th><th>ผู้ป่วย</th><th>วันที่</th><th>บริการ</th><th>สิทธิ</th>
              <th class="table__num">ราคา</th><th class="table__num">เบิกได้</th><th class="table__num">คงเหลือ</th>
              <th>สถานะ</th><th></th>
            </tr>
          </thead>
          <tbody>
            ${[
              { no: 'BL-25-08842', name: 'วราภรณ์ จันทร์เพ็ญ', date: '30/04', svc: 'OPD + Lab + ยา', sch: 'UC',  total: 1820,  cov: 1820, due: 0,    status: ['success','ผ่านสิทธิ'] },
              { no: 'BL-25-08843', name: 'ประยุทธ์ ศิริวัฒน์',  date: '30/04', svc: 'OPD + ยา',       sch: 'UC',  total: 980,   cov: 980,  due: 0,    status: ['success','ผ่านสิทธิ'] },
              { no: 'BL-25-08844', name: 'ลักษณา พงศ์ภัทร',  date: '30/04', svc: 'OPD + Lab',     sch: 'ปกส.',total: 2450,  cov: 2200, due: 250,  status: ['warning','รอชำระส่วนต่าง'] },
              { no: 'BL-25-08845', name: 'จักรกฤษณ์ บุญมา', date: '30/04', svc: 'OPD + CT',      sch: 'เบิกได้',total: 8500, cov: 8500, due: 0,    status: ['success','ผ่านสิทธิ'] },
              { no: 'BL-25-08846', name: 'มาลี กิจสมบูรณ์',  date: '30/04', svc: 'OPD',           sch: 'เงินสด',total: 600,   cov: 0,    due: 600,  status: ['warning','รอชำระ'] },
              { no: 'BL-25-08847', name: 'อภิชาติ บัวศรี',    date: '30/04', svc: 'OPD + ผ่าตัดเล็ก',sch: 'ปกส.', total: 4200,cov: 0,    due: 4200, status: ['error','สิทธิไม่ครอบคลุม'] },
              { no: 'BL-25-08848', name: 'สมชาย ก. (ICU)', date: '30/04', svc: 'IPD วันที่ 6',     sch: 'UC',  total: 12400, cov: 12400, due: 0,   status: ['brand','รออนุมัติ'] },
            ].map(r => `
              <tr>
                <td class="text-mono text-sub">${r.no}</td>
                <td><div class="user-cell">${avatar(r.name)}<div class="user-cell__name">${r.name}</div></div></td>
                <td class="text-mono text-sub">${r.date}</td>
                <td>${r.svc}</td>
                <td><span class="badge badge--neutral">${r.sch}</span></td>
                <td class="table__num">฿${r.total.toLocaleString()}</td>
                <td class="table__num text-sub">฿${r.cov.toLocaleString()}</td>
                <td class="table__num"><strong>฿${r.due.toLocaleString()}</strong></td>
                <td><span class="badge badge--${r.status[0]} badge--dot">${r.status[1]}</span></td>
                <td><button class="btn btn--ghost btn--sm">เปิด</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div id="billing-tab-itemized" hidden>${renderPhaseDemo('billSection')}</div>
    <div id="billing-tab-preauth" hidden>${renderPhaseDemo('preauthSection')}</div>
    <div id="billing-tab-claims" hidden>
      <div class="card">
        <div class="card__header"><h3 class="card__title">เคลมประกัน</h3></div>
        <div class="card__body"><div class="empty">ใช้ Pre-auth tab ตรวจสอบสิทธิประกันก่อนยื่นเคลม</div></div>
      </div>
    </div>
  </div>`;
}

/* ════════════ REPORTS ════════════ */
function renderReports() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>รายงาน</h1>
        <p class="page-head__sub">รายงานสำเร็จรูป 24 ชุด · กำหนดเอง 8 ชุด · เป้าหมาย HA 18 ตัวชี้วัด</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--primary btn--sm">${ICON.plus}สร้างรายงาน</button>
      </div>
    </div>

    <div class="grid grid-3">
      ${[
        { cat: 'ผู้ป่วยและการบริการ', items: ['สรุปผู้ป่วย OPD รายวัน','สรุปผู้ป่วย IPD รายเดือน','ระยะเวลารอตรวจเฉลี่ย','อัตราการครองเตียง','ผู้ป่วย Top 10 Diagnosis'] },
        { cat: 'การเงินและสิทธิ',     items: ['รายได้แยกตามสิทธิ','เคลมประกันคงค้าง','รายงานเบิกจ่าย UC','รายได้แยกตามแผนก','ผู้ป่วยค้างชำระ'] },
        { cat: 'คุณภาพและความปลอดภัย', items: ['อัตราการกลับมารักษาใน 28 วัน','Hospital Acquired Infection','Medication Error','HA Indicators','Mortality Review'] },
      ].map(g => `
        <div class="card">
          <div class="card__header">
            <h3 class="card__title">${g.cat}</h3>
          </div>
          <div class="item-list">
            ${g.items.map(it => `
              <div class="item-list__row">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="color:var(--ax-text-subtle);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                <div class="item-list__main"><span class="item-list__title">${it}</span></div>
                <button class="btn btn--ghost btn--sm">ดู</button>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

/* ════════════ QUALITY ════════════ */
function renderQuality() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>คุณภาพและความปลอดภัย</h1>
        <p class="page-head__sub">รายงานอุบัติการณ์ · ตัวชี้วัด HA · ปฏิบัติการแก้ไข</p>
      </div>
      <div class="page-head__actions">
        <button class="btn btn--primary btn--sm">${ICON.plus}รายงานใหม่</button>
      </div>
    </div>
    ${renderPhaseDemo('incidentSection')}
  </div>`;
}

/* ════════════ A11Y LAB ════════════ */
function renderA11yLab() {
  const tabs = [
    { key: 'audit',    label: 'A11y audit',      fn: 'a11yAuditSection' },
    { key: 'rtl',      label: 'RTL',             fn: 'rtlSection' },
    { key: 'locale',   label: 'Locale',          fn: 'localeSection' },
    { key: 'print',    label: 'Print',           fn: 'printSection' },
    { key: 'hc',       label: 'High contrast',   fn: 'hcSection' },
    { key: 'shortcut', label: 'Shortcuts',       fn: 'shortcutSection' },
    { key: 'focus',    label: 'Focus',           fn: 'focusSection' },
    { key: 'live',     label: 'Live regions',    fn: 'liveSection' },
    { key: 'rmo',      label: 'Reduced motion',  fn: 'rmoSection' },
    { key: 'cbs',      label: 'Color blind',     fn: 'cbsSection' },
  ];
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>A11y Lab</h1>
        <p class="page-head__sub">เครื่องมือตรวจสอบและจำลอง accessibility · 10 modules</p>
      </div>
    </div>

    <div class="page-tabs">
      ${tabs.map((t, i) => `<button class="${i === 0 ? 'is-active' : ''}" onclick="switchA11yTab(event, '${t.key}')">${t.label}</button>`).join('')}
    </div>

    ${tabs.map((t, i) => `<div id="a11y-tab-${t.key}"${i === 0 ? '' : ' hidden'}>${renderPhaseDemo(t.fn)}</div>`).join('')}
  </div>`;
}

/* ════════════ SETTINGS ════════════ */
function renderSettings() {
  return `
  <div class="his-section">
    <div class="page-head">
      <div>
        <h1>ตั้งค่า</h1>
        <p class="page-head__sub">บัญชี การแสดงผล Audit log และสุขภาพระบบ</p>
      </div>
    </div>

    <div class="page-tabs">
      <button class="is-active" onclick="switchSettingsTab(event, 'profile')">โปรไฟล์</button>
      <button onclick="switchSettingsTab(event, 'display')">การแสดงผล</button>
      <button onclick="switchSettingsTab(event, 'notif')">Notifications</button>
      <button onclick="switchSettingsTab(event, 'access')">Access control</button>
      <button onclick="switchSettingsTab(event, 'api')">API &amp; Integrations</button>
      <button onclick="switchSettingsTab(event, 'advanced')">Advanced</button>
      <button onclick="switchSettingsTab(event, 'audit')">Audit log</button>
      <button onclick="switchSettingsTab(event, 'system')">System health</button>
    </div>

    <div id="settings-tab-profile">
      <div class="grid grid-2">
        <div class="card">
          <div class="card__header"><h3 class="card__title">โปรไฟล์ผู้ใช้</h3></div>
          <div class="card__body">
            <div style="display:flex; gap:14px; align-items:center; margin-bottom:14px;">
              ${avatar('สม สม', 'xl')}
              <div>
                <div style="font-size:14px; font-weight:600; color: var(--ax-text-heading);">นพ. สมศักดิ์ ใจดี</div>
                <div class="text-mono text-sub" style="font-size:12px;">EMP-04421 · อายุรกรรม</div>
              </div>
              <button class="btn btn--secondary btn--sm" style="margin-left:auto;">เปลี่ยนรูป</button>
            </div>

            <div class="field">
              <label class="field__label">ชื่อ–นามสกุล</label>
              <input class="input" value="นพ. สมศักดิ์ ใจดี">
            </div>
            <div class="field" style="margin-top:10px;">
              <label class="field__label">อีเมล</label>
              <input class="input" value="somsak.j@aegisx-hospital.go.th">
            </div>
            <div class="field" style="margin-top:10px;">
              <label class="field__label">เบอร์โทรภายใน</label>
              <input class="input" value="304">
            </div>
          </div>
          <div class="card__footer">
            <button class="btn btn--ghost btn--sm">ยกเลิก</button>
            <button class="btn btn--primary btn--sm">บันทึก</button>
          </div>
        </div>

        <div class="card">
          <div class="card__header"><h3 class="card__title">ความปลอดภัย</h3></div>
          <div class="item-list">
            <div class="item-list__row">
              <div class="item-list__main">
                <span class="item-list__title">เปลี่ยนรหัสผ่าน</span>
                <span class="item-list__sub">เปลี่ยนล่าสุด 14 วันที่แล้ว</span>
              </div>
              <button class="btn btn--secondary btn--sm">เปลี่ยน</button>
            </div>
            <div class="item-list__row">
              <div class="item-list__main">
                <span class="item-list__title">2-Factor Authentication</span>
                <span class="item-list__sub">SMS · 081-xxx-xx89</span>
              </div>
              <span class="badge badge--success badge--dot">เปิดใช้งาน</span>
            </div>
            <div class="item-list__row">
              <div class="item-list__main">
                <span class="item-list__title">Active Sessions</span>
                <span class="item-list__sub">2 เครื่องล็อกอินอยู่</span>
              </div>
              <button class="btn btn--ghost btn--sm">จัดการ</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="settings-tab-display" hidden>
      ${(() => {
        const p = (typeof getPrefs === 'function') ? getPrefs() : { theme: 'dark', density: 'compact' };
        const tBtn = (val, label) => `<button class="btn btn--${p.theme === val ? 'secondary' : 'ghost'} btn--sm" onclick="setTheme('${val}')">${label}</button>`;
        const dBtn = (val, label) => `<button class="btn btn--${p.density === val ? 'secondary' : 'ghost'} btn--sm" onclick="setDensity('${val}')">${label}</button>`;
        return `
        <div class="card">
          <div class="card__header"><h3 class="card__title">การแสดงผล</h3></div>
          <div class="card__body">
            <div class="field">
              <label class="field__label">ธีม</label>
              <div class="row-flex" style="gap:8px;">
                ${tBtn('light', 'สว่าง')}
                ${tBtn('dark', 'มืด')}
              </div>
            </div>
            <div class="field" style="margin-top:14px;">
              <label class="field__label">ความหนาแน่น</label>
              <div class="row-flex" style="gap:8px;">
                ${dBtn('compact', 'กะทัดรัด')}
                ${dBtn('comfortable', 'ปกติ')}
                ${dBtn('spacious', 'โปร่ง')}
              </div>
            </div>
            <div class="field" style="margin-top:14px;">
              <label class="field__label">ภาษา</label>
              <select class="input select">
                <option>ไทย</option><option>English</option>
              </select>
            </div>
          </div>
        </div>`;
      })()}
      <div style="margin-top: var(--ax-spacing-lg);">
        ${renderPhaseDemo('settingsLayoutSection')}
      </div>
    </div>

    <div id="settings-tab-notif" hidden>${renderPhaseDemo('notifPrefsSection')}</div>
    <div id="settings-tab-access" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('permissionMatrixSection')}
        ${renderPhaseDemo('orgSwitcherSection')}
      </div>
    </div>
    <div id="settings-tab-api" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('apiKeysSection')}
        ${renderPhaseDemo('webhookSection')}
      </div>
    </div>
    <div id="settings-tab-advanced" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('featureFlagsSection')}
        ${renderPhaseDemo('importExportSection')}
      </div>
    </div>

    <div id="settings-tab-audit" hidden>${renderPhaseDemo('auditSearchSection')}</div>

    <div id="settings-tab-system" hidden>
      <div class="his-stack">
        ${renderPhaseDemo('systemHealthSection')}
        <div class="card">
          <div class="card__header"><h3 class="card__title">เกี่ยวกับระบบ</h3></div>
          <div class="kv-list">
            <div class="kv-list__row"><span class="kv-list__k">เวอร์ชัน</span><span class="kv-list__v text-mono">AegisX HIS v4.2.1</span></div>
            <div class="kv-list__row"><span class="kv-list__k">Build</span><span class="kv-list__v text-mono">2026.04.30-prod</span></div>
            <div class="kv-list__row"><span class="kv-list__k">Database</span><span class="kv-list__v text-mono">PostgreSQL 16 · OK</span></div>
            <div class="kv-list__row"><span class="kv-list__k">Last sync HIE</span><span class="kv-list__v text-mono">10:42 น. (3 นาทีที่แล้ว)</span></div>
            <div class="kv-list__row"><span class="kv-list__k">PDPA / HA</span><span class="kv-list__v"><span class="badge badge--success badge--dot">Compliant</span></span></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
