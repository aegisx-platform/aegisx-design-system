/* #77 Discharge med reconciliation */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function medRecSection(){
    const card = h('div', {class:'dmr'});

    // [name, generic, preAdmDose, dischargeDose, action, alerts]
    const meds = [
      ['Furosemide','loop diuretic',null,'40 mg PO BID', 'new', ['renal']],
      ['Carvedilol','beta-blocker',null,'6.25 mg PO BID · titrate up', 'new', []],
      ['Lisinopril','ACE inhibitor',null,'10 mg PO daily', 'new', ['renal']],
      ['Spironolactone','K-sparing diuretic',null,'25 mg PO daily', 'new', ['renal']],
      ['Metformin','biguanide','1 g PO BID','1 g PO BID', 'cont', []],
      ['Aspirin EC','antiplatelet','81 mg PO daily','81 mg PO daily', 'cont', []],
      ['Atorvastatin','statin','20 mg PO HS','40 mg PO HS', 'mod', []],
      ['Amlodipine','CCB','10 mg PO daily',null, 'stop', ['inter']],
      ['Glibenclamide','sulfonylurea','5 mg PO daily',null, 'stop', ['allergy']],
      ['Multivitamin','OTC','1 tab PO daily','1 tab PO daily', 'cont', []],
      ['Ibuprofen','NSAID PRN','PRN',null, 'stop', ['renal']],
    ];

    const actionLabel = {cont:'continue', new:'new', mod:'modified', stop:'stop', hold:'hold'};
    const alertLabel = {inter:'⚠ interaction', allergy:'⚠ allergy', renal:'⚠ renal-adj'};

    const rowHtml = (m)=>{
      const [name,gen,pre,post,act,alerts] = m;
      const rowMod = (act==='stop'||act==='new'||act==='mod') ? `dmr__row--${act}`:'';
      const preCell = pre
        ? `<span class="dmr__dose ${act==='stop'?'dmr__dose-strike':''}">${pre}</span>`
        : `<span class="dmr__cell-empty">— not on prior list</span>`;
      const postCell = post
        ? `<span class="dmr__dose">${post}${act==='mod'?'<span class="dmr__dose-mod">changed</span>':''}</span>`
        : `<span class="dmr__cell-empty">— discontinued</span>`;
      const alertHtml = alerts.length
        ? '<br>'+alerts.map(a=>`<span class="dmr__alert dmr__alert--${a}">${alertLabel[a]}</span>`).join(' ')
        : '';
      return `
        <div class="dmr__row ${rowMod}">
          <div class="dmr__cell"><div class="dmr__name">${name}</div><div class="dmr__name-sub">${gen}</div>${alertHtml}</div>
          <div class="dmr__cell">${preCell}</div>
          <div class="dmr__cell">${postCell}</div>
          <div class="dmr__action"><span class="dmr__action-tag dmr__action-tag--${act}">${actionLabel[act]}</span></div>
          <div class="dmr__check"><div class="dmr__check-box ${act!=='hold'?'is-on':''}"></div></div>
        </div>`;
    };

    const counts = {cont:0,new:0,mod:0,stop:0,hold:0};
    meds.forEach(m=>counts[m[4]]++);

    card.innerHTML = `
      <div class="dmr__head">
        <div>
          <div class="dmr__title">Discharge medication reconciliation · ปรับยาก่อนกลับบ้าน</div>
          <div class="dmr__sub">AN 67-12345 · Suda P. · 11 prior + new medications · Pharm Pim K. reviewed 17 Aug 09:42</div>
        </div>
      </div>

      <div class="dmr__legend">
        <span class="dmr__legend-item"><span class="dmr__legend-tag dmr__legend-tag--cont">continue</span>เดิม</span>
        <span class="dmr__legend-item"><span class="dmr__legend-tag dmr__legend-tag--new">new</span>เพิ่มใหม่</span>
        <span class="dmr__legend-item"><span class="dmr__legend-tag dmr__legend-tag--mod">modified</span>ปรับขนาด</span>
        <span class="dmr__legend-item"><span class="dmr__legend-tag dmr__legend-tag--stop">stop</span>หยุด</span>
        <span class="dmr__legend-item"><span class="dmr__legend-tag dmr__legend-tag--hold">hold</span>ระงับชั่วคราว</span>
      </div>

      <div class="dmr__grid">
        <div class="dmr__hd">medication</div>
        <div class="dmr__hd">prior to admission</div>
        <div class="dmr__hd">discharge regimen</div>
        <div class="dmr__hd" style="text-align:center">action</div>
        <div class="dmr__hd" style="text-align:center">✓</div>
        ${meds.map(rowHtml).join('')}
      </div>

      <div class="dmr__rec-summary">
        <div class="dmr__rec-cell"><span class="dmr__rec-num">${counts.cont}</span><span class="dmr__rec-label">continued</span></div>
        <div class="dmr__rec-cell"><span class="dmr__rec-num" style="color:var(--ax-info-emphasis)">${counts.new}</span><span class="dmr__rec-label">new started</span></div>
        <div class="dmr__rec-cell"><span class="dmr__rec-num" style="color:var(--ax-warning-emphasis)">${counts.mod}</span><span class="dmr__rec-label">modified</span></div>
        <div class="dmr__rec-cell"><span class="dmr__rec-num" style="color:var(--ax-error-emphasis)">${counts.stop}</span><span class="dmr__rec-label">discontinued</span></div>
        <div class="dmr__rec-cell"><span class="dmr__rec-num">${meds.length}</span><span class="dmr__rec-label">total reviewed</span></div>
      </div>

      <div class="dmr__foot">
        <div class="dmr__foot-meta">
          <span>Pharm review · <strong>Pim K.</strong> 09:42</span>
          <span>MD verify · <strong>Dr. Kittisak</strong> 10:15</span>
          <span>Pt counseled · <strong>Niran S.</strong> 11:00</span>
        </div>
        <div class="dmr__btn-row">
          <button class="dmr__btn dmr__btn--warn">⚠ 4 alerts</button>
          <button class="dmr__btn">Print MAR</button>
          <button class="dmr__btn">Patient handout (TH)</button>
          <button class="dmr__btn dmr__btn--primary">Sign &amp; release</button>
        </div>
      </div>`;

    return section('dmr','77','Discharge medication reconciliation',
      'ตารางเทียบยา pre-admission ↔ discharge แบบ side-by-side · 5 actions: continue/new/modified/stop/hold · row-tinted ตาม action · alert pills (interaction/allergy/renal-adj) inline · summary count band · 3-step sign-off (Pharm → MD → Pt counseling).',
      sub('11 medications reviewed', demo(card)));
  });
})();
