/* Hospital Dashboard Views — populates #views */
(function() {
  const views = document.getElementById('views');

  /* ═══════════════════════════════════════════════════════════
     VIEW 1 · OVERVIEW (default)
     ═══════════════════════════════════════════════════════════ */
  const overview = document.createElement('section');
  overview.className = 'hx-body is-active';
  overview.id = 'view-overview';

  overview.innerHTML = `
    <div class="hx-body__head">
      <div>
        <h1 class="hx-body__h1">Overview · ภาพรวมโรงพยาบาล</h1>
        <p class="hx-body__lede">ข้อมูล real-time · อัพเดตครั้งล่าสุด 14:23 น. · พุธ 17 เม.ย. 2568</p>
      </div>
      <div class="hx-body__actions">
        <div class="seg">
          <button class="is-active">เวรเช้า</button>
          <button>เวรบ่าย</button>
          <button>เวรดึก</button>
        </div>
      </div>
    </div>

    <!-- Stat strip -->
    <div class="stat-grid">
      ${statCard('OPD ผู้ป่วยนอก', '247', { delta: '+12%', deltaType:'up', sub: 'vs เมื่อวาน' })}
      ${statCard('IPD Occupancy', '82<small>/120</small>', { delta: '68% เต็ม', deltaType:'neutral' })}
      ${statCard('คิวรอคิวเฉลี่ย', '14<small> นาที</small>', { delta: '-3 min', deltaType:'up' })}
      ${statCard('รายได้วันนี้', '₿ 1.48<small>M</small>', { delta: '+8.4% WoW', deltaType:'up' })}
      ${statCard('ยา stock ต่ำ', '23', { delta: '5 urgent', deltaType:'down' })}
      ${statCard('Lab ค้าง', '47', { delta: '-12 จาก 09:00', deltaType:'up' })}
    </div>

    <!-- Two column: chart + ward occupancy -->
    <div class="grid-7-5" style="margin-bottom:16px;">
      <div class="panel">
        <div class="panel__head">
          <h2 class="panel__title">
            <svg width="14" height="14" viewBox="0 0 24 24" class="icon-stroke"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            จำนวนผู้ป่วย OPD · รายชั่วโมง
          </h2>
          <p class="panel__sub">08:00 – 20:00</p>
          <div class="seg" style="margin-left:0;">
            <button class="is-active">ผู้ป่วย</button>
            <button>เวลารอเฉลี่ย</button>
          </div>
        </div>
        <div class="panel__body">
          ${opdChart()}
          <div class="lg" style="margin-top:12px;">
            <span><i style="background: var(--ax-brand-default);"></i>ใหม่</span>
            <span><i style="background: var(--ax-brand-muted);"></i>นัด</span>
            <span><i style="background: var(--ax-border-subtle);"></i>เป้าหมาย</span>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel__head">
          <h2 class="panel__title">
            <svg width="14" height="14" viewBox="0 0 24 24" class="icon-stroke"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            การครองเตียง IPD
          </h2>
          <a href="#" class="btn btn--link" style="margin-left:auto; font-size:12px;">ดูแผนห้องเต็ม →</a>
        </div>
        <div class="panel__body">
          ${progressRow('อายุรกรรม ชาย', 28, 32, 'warn')}
          ${progressRow('อายุรกรรม หญิง', 22, 30, 'ok')}
          ${progressRow('ศัลยกรรม', 14, 20, 'ok')}
          ${progressRow('สูติ-นรีเวช', 8, 15, 'ok')}
          ${progressRow('กุมารเวช', 6, 12, 'ok')}
          ${progressRow('ICU', 4, 8, 'err')}
          ${progressRow('VIP', 0, 3, 'ok', 'empty')}
        </div>
      </div>
    </div>

    <!-- Two column: today's schedule + alerts -->
    <div class="grid-2-1">
      <div class="panel">
        <div class="panel__head">
          <h2 class="panel__title">นัดหมายผ่าตัด · วันนี้</h2>
          <a href="#" class="btn btn--link" style="font-size:12px;">ทั้งหมด 18 รายการ →</a>
        </div>
        <div class="panel__body" style="padding: 0;">
          <table class="htable">
            <thead>
              <tr>
                <th>เวลา</th>
                <th>OR</th>
                <th>ผู้ป่วย</th>
                <th>หัตถการ</th>
                <th>แพทย์</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
              ${orRow('08:00', 'OR-1', 'นางสาว วันดี ม.', 'HN-68-041293', 'Cholecystectomy (laparoscopic)', 'นพ. ธนากร', 'success', 'เสร็จสิ้น')}
              ${orRow('10:30', 'OR-2', 'นาย สมชาย บ.', 'HN-68-009122', 'Total Knee Replacement', 'นพ. วิชัย', 'brand', 'กำลังผ่าตัด')}
              ${orRow('11:00', 'OR-1', 'เด็กหญิง มาลี ส.', 'HN-68-114520', 'Appendectomy', 'นพ. ธนากร', 'warning', 'เตรียมห้อง')}
              ${orRow('13:00', 'OR-3', 'นาง สุดา ก.', 'HN-68-033401', 'Hysterectomy', 'พญ. สุภาพร', 'neutral', 'รอคิว')}
              ${orRow('14:30', 'OR-2', 'นาย วิรัตน์ ส.', 'HN-68-087712', 'Tonsillectomy', 'นพ. กิตติศักดิ์', 'neutral', 'รอคิว')}
              ${orRow('16:00', 'OR-1', 'นาง รัตนา พ.', 'HN-68-101233', 'Cataract surgery (L)', 'พญ. อรุณี', 'neutral', 'รอคิว')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="panel">
        <div class="panel__head">
          <h2 class="panel__title">
            <svg width="14" height="14" viewBox="0 0 24 24" class="icon-stroke" style="color: var(--ax-warning-emphasis);"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Alert & แจ้งเตือน
          </h2>
          <span class="badge badge--error">8 ใหม่</span>
        </div>
        <div class="panel__body" style="padding: 8px 0;">
          ${alertItem('err', 'Critical value · K+ 6.8 mEq/L', 'HN-68-009122 · นาย สมชาย · IPD-214', '3 นาทีที่แล้ว')}
          ${alertItem('err', 'ยา Paracetamol หมด stock', 'คลังยาห้องจ่าย · เหลือ 0 unit', '12 นาทีที่แล้ว')}
          ${alertItem('warn', 'รอผ่าตัด > 30 นาที', 'เด็กหญิง มาลี · OR-1 · เตรียมห้องช้า', '18 นาทีที่แล้ว')}
          ${alertItem('warn', 'สปสช. reject claim', '12 รายการรอแก้ไข · ยอด ฿ 142,300', '1 ชม. ที่แล้ว')}
          ${alertItem('info', 'Maintenance MRI-1 พรุ่งนี้', 'ปิดบริการ 06:00 – 10:00', '2 ชม. ที่แล้ว')}
        </div>
      </div>
    </div>
  `;
  views.appendChild(overview);

  /* ═══════════════════════════════════════════════════════════
     VIEW 2 · OPD QUEUE
     ═══════════════════════════════════════════════════════════ */
  const opd = document.createElement('section');
  opd.className = 'hx-body';
  opd.id = 'view-opd';

  opd.innerHTML = `
    <div class="hx-body__head">
      <div>
        <h1 class="hx-body__h1">OPD Queue · ห้องตรวจ 4 · อายุรกรรม</h1>
        <p class="hx-body__lede">พญ. สุภา วงศ์ไพบูลย์ · คิว 34 ราย · ตรวจแล้ว 12 · เฉลี่ย 8 นาที/ราย</p>
      </div>
      <div class="hx-body__actions">
        <button class="btn btn--secondary btn--sm">
          <svg width="12" height="12" viewBox="0 0 24 24" class="icon-stroke"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          เลื่อนนัด
        </button>
        <button class="btn btn--primary btn--sm">
          <svg width="12" height="12" viewBox="0 0 24 24" class="icon-stroke"><polyline points="9 18 15 12 9 6"/></svg>
          ถัดไป (#014)
        </button>
      </div>
    </div>

    <!-- Patient banner for currently serving -->
    <div class="pt-banner">
      <div class="pt-banner__ava">สช</div>
      <div>
        <h2 class="pt-banner__name">
          นาย สมชาย บุญมี
          <span class="badge badge--brand badge--dot">กำลังตรวจ</span>
          <span class="badge badge--warning">สปสช.</span>
        </h2>
        <div class="pt-banner__meta">
          <span>🆔 HN <b>68-009122</b></span>
          <span>อายุ <b>52 ปี</b> · ชาย</span>
          <span>แพ้ยา <b style="color:var(--ax-error-emphasis);">Penicillin</b></span>
          <span>โรคประจำตัว <b>DM, HT</b></span>
          <span>เข้าคิวเมื่อ <b>08:42</b></span>
        </div>
      </div>
      <div style="display:flex; gap:8px;">
        <button class="btn btn--secondary btn--sm">ประวัติเต็ม</button>
        <button class="btn btn--primary btn--sm">ส่งห้องยา</button>
      </div>
    </div>

    <!-- Two col: queue list + patient workspace -->
    <div class="grid-7-5">
      <div class="panel">
        <div class="panel__head">
          <h2 class="panel__title">คิวรอตรวจ</h2>
          <div class="seg" style="margin-left:auto;">
            <button class="is-active">ทั้งหมด 22</button>
            <button>ด่วน 2</button>
            <button>นัด 8</button>
          </div>
        </div>
        <div class="panel__body panel__body--flush" style="max-height: 560px; overflow-y: auto;">
          <div class="qlist">
            ${queueItem('013', 'นาง รัตนา ศรีสวัสดิ์', 'HN-68-008771', '08:50', 'รอ 2 นาที', 'is-current', 'นัด ตรวจทั่วไป')}
            ${queueItem('014', 'นาย วิชาญ อุดมพร', 'HN-68-011002', '09:00', 'รอ 9 นาที', '', 'นัด เบาหวาน')}
            ${queueItem('015', 'นางสาว กัลยา ปทุม', 'HN-68-011230', '09:05', 'รอ 13 นาที', '', 'ใหม่ ปวดศีรษะ', 'warning')}
            ${queueItem('016', 'นาย ทวีศักดิ์ เจริญ', 'HN-68-009844', '09:10', 'รอ 17 นาที', '', 'นัด ความดัน')}
            ${queueItem('017', 'เด็กหญิง นภา สมบูรณ์', 'HN-68-101920', '09:12', 'รอ 18 นาที', '', 'ใหม่ ไข้หวัด')}
            ${queueItem('018', 'นาง สุนี วงศ์ทอง', 'HN-68-077711', '09:20', 'รอ 24 นาที', '', 'นัด ติดตามผล')}
            ${queueItem('019', 'นาย ประเสริฐ แก้วดี', 'HN-68-088011', '09:30', 'รอ 31 นาที', '', 'ด่วน เจ็บหน้าอก', 'error')}
            ${queueItem('020', 'นางสาว มณฑา จันทร์เพ็ญ', 'HN-68-099022', '09:35', 'รอ 36 นาที', '', 'นัด DM follow-up')}
            ${queueItem('021', 'นาย สุชาติ ศิริ', 'HN-68-101011', '09:45', 'รอ 46 นาที', '', 'นัด ปวดท้อง')}
            ${queueItem('022', 'นาง จินตนา พัฒนา', 'HN-68-102220', '10:00', 'รอ 61 นาที', '', 'ใหม่ ไอเรื้อรัง')}
            ${queueItem('023', 'นาย ยุทธพงศ์ ภักดี', 'HN-68-103110', '10:10', 'รอ 71 นาที', '', 'นัด HT')}
          </div>
        </div>
        <div class="pager">
          <span>แสดง 11 จาก 22 รายการ · คิวเฉลี่ย 8 นาที</span>
          <div class="pager__right">
            <button class="pager__btn is-active">1</button>
            <button class="pager__btn">2</button>
            <button class="pager__btn">›</button>
          </div>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px;">

        <!-- Vitals -->
        <div class="panel">
          <div class="panel__head">
            <h2 class="panel__title">Vital signs · เข้าซักประวัติ 08:42</h2>
            <span class="badge badge--neutral">22 min ago</span>
          </div>
          <div class="panel__body">
            <div class="vitals">
              <div class="vitals__cell">
                <span class="vitals__lbl">BP</span>
                <span class="vitals__val">148<small>/92</small></span>
                <span class="vitals__trend">↑ สูงกว่าเกณฑ์</span>
              </div>
              <div class="vitals__cell">
                <span class="vitals__lbl">Pulse</span>
                <span class="vitals__val">82</span>
                <span class="vitals__trend">ปกติ</span>
              </div>
              <div class="vitals__cell">
                <span class="vitals__lbl">Temp</span>
                <span class="vitals__val">36.8<small>°C</small></span>
                <span class="vitals__trend">ปกติ</span>
              </div>
              <div class="vitals__cell is-alert">
                <span class="vitals__lbl">FBS</span>
                <span class="vitals__val">218</span>
                <span class="vitals__trend">↑ อัสดง</span>
              </div>
              <div class="vitals__cell">
                <span class="vitals__lbl">SpO₂</span>
                <span class="vitals__val">98<small>%</small></span>
                <span class="vitals__trend">ปกติ</span>
              </div>
              <div class="vitals__cell">
                <span class="vitals__lbl">Weight</span>
                <span class="vitals__val">78.4<small>kg</small></span>
                <span class="vitals__trend">+0.6 kg</span>
              </div>
              <div class="vitals__cell">
                <span class="vitals__lbl">BMI</span>
                <span class="vitals__val">27.1</span>
                <span class="vitals__trend">Overweight</span>
              </div>
              <div class="vitals__cell">
                <span class="vitals__lbl">RR</span>
                <span class="vitals__val">16</span>
                <span class="vitals__trend">ปกติ</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Rx / Order panel -->
        <div class="panel">
          <div class="panel__head">
            <h2 class="panel__title">สั่งยา · Order entry</h2>
            <button class="btn btn--ghost btn--sm">
              <svg width="12" height="12" viewBox="0 0 24 24" class="icon-stroke"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              เพิ่มยา
            </button>
          </div>
          <div class="panel__body">
            ${rxRow('Metformin 500 mg', '1x2 หลังอาหาร เช้า-เย็น · 30 วัน', 'brand', 'ต่อเนื่อง')}
            ${rxRow('Amlodipine 5 mg', '1x1 เช้า · 30 วัน', 'brand', 'ต่อเนื่อง')}
            ${rxRow('Atorvastatin 20 mg', '1x1 ก่อนนอน · 30 วัน', 'success', 'ใหม่')}
            ${rxRow('Losartan 50 mg', '1x1 เช้า · 30 วัน', 'warning', 'ปรับขนาด ↑')}
          </div>
        </div>

        <!-- Diagnosis codes -->
        <div class="panel">
          <div class="panel__head">
            <h2 class="panel__title">ICD-10 Diagnosis</h2>
            <span class="panel__sub">principal · secondary</span>
          </div>
          <div class="panel__body" style="display:flex; flex-wrap:wrap; gap:6px;">
            <span class="chip"><b>E11.9</b>&nbsp;Type 2 diabetes mellitus w/o comp<button>×</button></span>
            <span class="chip"><b>I10</b>&nbsp;Essential hypertension<button>×</button></span>
            <span class="chip"><b>E78.5</b>&nbsp;Hyperlipidemia<button>×</button></span>
            <button class="btn btn--ghost btn--sm">+ เพิ่ม</button>
          </div>
        </div>

      </div>
    </div>
  `;
  views.appendChild(opd);

  /* ═══════════════════════════════════════════════════════════
     VIEW 3 · IPD Wards (minimal, room grid)
     ═══════════════════════════════════════════════════════════ */
  // (Only these three views are pre-built; other nav items are stubs.)

  // --- helpers below ---
  function statCard(lbl, val, opts={}) {
    const { delta='', deltaType='neutral', sub='' } = opts;
    const deltaIcon = deltaType === 'up'
      ? '<svg width="10" height="10" viewBox="0 0 24 24" class="icon-stroke"><polyline points="18 15 12 9 6 15"/></svg>'
      : deltaType === 'down'
      ? '<svg width="10" height="10" viewBox="0 0 24 24" class="icon-stroke"><polyline points="6 9 12 15 18 9"/></svg>'
      : '';
    return `
      <div class="stat-card">
        <div class="stat-card__lbl">${lbl}</div>
        <div class="stat-card__val">${val}</div>
        <div class="stat-card__delta stat-card__delta--${deltaType}">${deltaIcon}${delta}${sub ? ' · <span style="color:var(--ax-text-subtle);">'+sub+'</span>' : ''}</div>
        ${sparkSvg()}
      </div>
    `;
  }
  function sparkSvg() {
    const pts = Array.from({length: 16}, () => 8 + Math.random()*16).map((y, i) => `${i*4},${24-y}`).join(' ');
    return `
      <svg class="stat-card__spark" width="80" height="24" viewBox="0 0 64 24" fill="none">
        <polyline points="${pts}" stroke="var(--ax-brand-default)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/>
      </svg>
    `;
  }
  function opdChart() {
    const data = [12,18,22,35,48,56,64,52,44,38,47,51,38,28,18,12];
    const data2 = [8,12,15,22,28,31,35,30,25,22,26,28,22,18,12,8];
    const labels = ['08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
    const max = 80;
    return `
      <div class="chart">
        ${data.map((v,i)=>{
          const h = (v/max*100).toFixed(1);
          const h2 = (data2[i]/max*100).toFixed(1);
          const isNow = i===6;
          return `
            <div class="chart__bar" style="height:${h}%; ${isNow?'opacity:1;':''}" title="${labels[i]}:00 — ${v} ราย">
              <div class="chart__bar chart__bar--stack" style="position:absolute; bottom:0; left:0; right:0; height:${(data2[i]/v*100).toFixed(1)}%;"></div>
              ${isNow ? '<div style="position:absolute; top:-20px; left:50%; transform:translateX(-50%); font:500 11px/1 var(--ax-font-mono); color: var(--ax-brand-emphasis); white-space:nowrap; background: var(--ax-brand-faint); padding: 3px 6px; border-radius: 4px;">' + v + ' ราย</div>' : ''}
            </div>
          `;
        }).join('')}
        <div class="chart__axis">
          ${labels.map(l=>`<span>${l}</span>`).join('')}
        </div>
      </div>
    `;
  }
  function progressRow(lbl, cur, total, tone, variant) {
    const pct = Math.min(100, cur/total*100);
    const fill = { warn:'prow__fill--warn', err:'prow__fill--err', ok:'prow__fill--ok' }[tone] || '';
    return `
      <div class="prow">
        <div class="prow__lbl">${lbl}</div>
        <div class="prow__bar"><div class="prow__fill ${fill}" style="width:${pct}%;"></div></div>
        <div class="prow__val">${cur}/${total}<span style="color:var(--ax-text-subtle); margin-left:6px;">${pct.toFixed(0)}%</span></div>
      </div>
    `;
  }
  function orRow(time, or, pt, hn, proc, doc, tone, stat) {
    return `
      <tr>
        <td class="strong">${time}</td>
        <td><span class="badge badge--neutral">${or}</span></td>
        <td><div class="strong">${pt}</div><div class="hn">${hn}</div></td>
        <td>${proc}</td>
        <td>${doc}</td>
        <td><span class="badge badge--${tone} badge--dot">${stat}</span></td>
      </tr>
    `;
  }
  function alertItem(tone, title, body, time) {
    const toneColor = { err:'var(--ax-error-default)', warn:'var(--ax-warning-default)', info:'var(--ax-info-default)' }[tone];
    return `
      <div style="display:flex; gap:10px; padding: 10px 16px; border-bottom: 1px solid var(--ax-border-subtle);">
        <div style="width:6px; border-radius: 3px; background: ${toneColor}; flex-shrink:0;"></div>
        <div style="flex:1; min-width:0;">
          <div style="font-size:13px; font-weight:500; color: var(--ax-text-heading); margin-bottom:2px;">${title}</div>
          <div style="font-size:12px; color: var(--ax-text-secondary); margin-bottom: 2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${body}</div>
          <div style="font: 500 11px/1 var(--ax-font-mono); color: var(--ax-text-subtle);">${time}</div>
        </div>
      </div>
    `;
  }
  function queueItem(num, name, hn, time, wait, extraCls='', reason='', badgeTone='') {
    const badge = badgeTone
      ? `<span class="badge badge--${badgeTone}" style="margin-top:4px; font-size:10px;">${reason}</span>`
      : `<span style="font-size:11px; color: var(--ax-text-subtle); font-family: var(--ax-font-mono);">${reason}</span>`;
    return `
      <div class="qitem ${extraCls}">
        <div class="qitem__num">${num}</div>
        <div>
          <div class="qitem__name">${name}</div>
          <div class="qitem__hn">${hn}</div>
          <div style="margin-top:4px;">${badge}</div>
        </div>
        <div class="qitem__time">
          <b>${time}</b>
          ${wait}
        </div>
        <button class="btn btn--ghost btn--sm btn--icon">
          <svg width="12" height="12" viewBox="0 0 24 24" class="icon-stroke"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    `;
  }
  function rxRow(drug, dose, tone, tag) {
    return `
      <div class="rx-row">
        <div>
          <div class="rx-row__drug">${drug}</div>
          <div class="rx-row__dose">${dose}</div>
        </div>
        <div class="rx-row__tag">
          <span class="badge badge--${tone}">${tag}</span>
          <button class="btn btn--ghost btn--sm" style="padding: 2px 6px; height: auto; font-size:11px;">แก้</button>
        </div>
      </div>
    `;
  }
})();
