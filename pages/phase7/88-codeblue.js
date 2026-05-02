/* #88 Code blue / Resuscitation sheet */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function codeBlueSection(){
    const card = h('div', {class:'cb'});
    // build min-by-min row
    const events = [
      {t:'14:32', rh:'VF', cpr:'CPR', sh:'200J', drug:'—', io:'IV ✓', evt:'Witnessed arrest · monitor VF · CPR start'},
      {t:'14:33', rh:'VF', cpr:'CPR', sh:'200J', drug:'—', io:'—', evt:'Shock #1 · 200 J biphasic · resume CPR 2 min'},
      {t:'14:35', rh:'VF', cpr:'CPR', sh:'200J', drug:'EPI 1mg', io:'—', evt:'Rhythm check VF · Shock #2 200 J · Epi 1 mg IV'},
      {t:'14:37', rh:'VF', cpr:'CPR', sh:'200J', drug:'AMI 300', io:'—', evt:'Rhythm check VF · Shock #3 200 J · Amiodarone 300 mg IV bolus'},
      {t:'14:39', rh:'PEA', cpr:'CPR', sh:'—', drug:'EPI 1mg', io:'—', evt:'Rhythm check PEA · Epi 1 mg IV · CPR continue'},
      {t:'14:41', rh:'PEA', cpr:'CPR', sh:'—', drug:'—', io:'ETT', evt:'Intubated ETT 7.5 · grade I · ETCO₂ 18'},
      {t:'14:43', rh:'VF', cpr:'CPR', sh:'200J', drug:'AMI 150', io:'—', evt:'Rhythm check VF · Shock #4 200 J · Amio 150 mg'},
      {t:'14:45', rh:'SB', cpr:'—', sh:'—', drug:'—', io:'—', evt:'Rhythm check sinus brady 48 · pulse present · ROSC achieved'}
    ];

    function row(e){
      return `<tr>
        <td class="t">${e.t}</td>
        <td class="${e.rh==='VF'?'shock':e.rh==='PEA'?'epi':'rosc'}">${e.rh}</td>
        <td class="${e.cpr==='CPR'?'cpr':''}">${e.cpr}</td>
        <td class="${e.sh!=='—'?'shock':''}">${e.sh}</td>
        <td class="${e.drug!=='—'?'epi':''}">${e.drug}</td>
        <td class="${e.io!=='—'?'r':''}">${e.io}</td>
        <td class="l">${e.evt}</td>
      </tr>`;
    }

    card.innerHTML = `
      <div class="cb__head">
        <div class="cb__brand">
          <div class="cb__logo">CODE</div>
          <div>
            <div class="cb__title">⚡ Code blue · Resuscitation record · ROSC ACHIEVED</div>
            <div class="cb__sub">Form CPR-401 v2.0 · 14 Aug 2024 · ward 4 · bed 4-12 · ACLS protocol</div>
          </div>
        </div>
        <div class="cb__meta">
          <strong>CB-2024-08-14-1432</strong><br/>
          AN · 67-12345<br/>
          team leader: Dr. Niran K.
        </div>
      </div>

      <div class="cb__strip">
        <div class="cb__sc"><span class="cb__sc-cap">arrest time</span><span class="cb__sc-val">14:32</span><span class="cb__sc-mono">witnessed · monitored</span></div>
        <div class="cb__sc"><span class="cb__sc-cap">cpr started</span><span class="cb__sc-val">14:32</span><span class="cb__sc-mono">delay 0 min</span></div>
        <div class="cb__sc"><span class="cb__sc-cap">first shock</span><span class="cb__sc-val">14:33</span><span class="cb__sc-mono">delay 1 min</span></div>
        <div class="cb__sc cb__sc--rosc"><span class="cb__sc-cap">ROSC</span><span class="cb__sc-val">14:45</span><span class="cb__sc-mono">downtime 13 min</span></div>
        <div class="cb__sc"><span class="cb__sc-cap">total CPR cycles</span><span class="cb__sc-val">6</span><span class="cb__sc-mono">~ 13 min</span></div>
      </div>

      <div class="cb__rhythm">
        <span class="cb__rh cb__rh--vf">first rhythm · <strong>VF</strong></span>
        <span class="cb__rh cb__rh--vf">shocks · <strong>4 × 200 J</strong></span>
        <span class="cb__rh cb__rh--pea">PEA episode · <strong>14:39</strong></span>
        <span class="cb__rh cb__rh--sb">final · <strong>sinus brady 48</strong></span>
        <span class="cb__rh">CPR quality · <strong>compression depth ≥ 5 cm · rate 110/min · feedback device</strong></span>
      </div>

      <!-- min-by-min -->
      <div class="cb__sec">
        <div class="cb__sec-h"><span>Minute-by-minute log · 14:32 → 14:45 (13 min)</span><span class="cb__sec-cap">8 events recorded</span></div>
        <div class="cb__tw">
          <table class="cb__tbl">
            <thead>
              <tr><th>time</th><th>rhythm</th><th>CPR</th><th>shock J</th><th>drug</th><th>airway / IV</th><th class="l" style="text-align:left">event / note</th></tr>
            </thead>
            <tbody>${events.map(row).join('')}</tbody>
          </table>
        </div>
      </div>

      <!-- Drug summary -->
      <div class="cb__sec">
        <div class="cb__sec-h"><span>Drug summary · totals</span><span class="cb__sec-cap">all e-signed against pyxis</span></div>
        <div class="cb__drugs">
          <div class="cb__d"><span class="cb__d-cap">Epinephrine</span><span class="cb__d-val">2 mg</span><span class="cb__d-meta">2 × 1 mg IV q3-5 min</span></div>
          <div class="cb__d"><span class="cb__d-cap">Amiodarone</span><span class="cb__d-val">450 mg</span><span class="cb__d-meta">300 + 150 mg IV bolus</span></div>
          <div class="cb__d"><span class="cb__d-cap">Defibrillation</span><span class="cb__d-val">4 × 200 J</span><span class="cb__d-meta">biphasic · all converted</span></div>
          <div class="cb__d"><span class="cb__d-cap">Fluid · LRS</span><span class="cb__d-val">500 mL</span><span class="cb__d-meta">wide open</span></div>
        </div>
      </div>

      <!-- Outcome -->
      <div class="cb__out">
        <div class="cb__out-l">
          <span class="cb__out-cap">outcome</span>
          <div class="cb__out-val">✓ ROSC achieved at 14:45</div>
          <div class="cb__out-meta">post-ROSC: BP 102/64 · HR 48 sinus brady → atropine 0.5 mg ×1 → 78 NSR · SpO₂ 96% on FiO₂ 1.0 · GCS 6 (E1 V T M4) · transferred to ICU bed 12 at 15:08 · TTM protocol initiated.</div>
        </div>
        <div class="cb__out-r">
          <span class="cb__out-cap" style="color:var(--ax-text-subtle)">cause / context</span>
          <div class="cb__out-val" style="color:var(--ax-text-heading); font-size:14px;">Suspected cardiac · primary VF</div>
          <div class="cb__out-meta">Day 1 post-TKA · sudden VF on monitor while at rest. K 4.1, Mg 1.8, troponin pending. EKG post-ROSC: anterior ST changes — cardiology paged. Family notified by Dr. Niran 14:55 (daughter).</div>
        </div>
      </div>

      <!-- Team -->
      <div class="cb__sec">
        <div class="cb__sec-h"><span>Code team · 6 members</span><span class="cb__sec-cap">all roles assigned within 90 s</span></div>
        <div class="cb__team">
          <div class="cb__tm"><span class="cb__tm-role">team leader</span><span class="cb__tm-name">Dr. Niran Kalyanon</span><span class="cb__tm-meta">attending · arrived 14:33</span></div>
          <div class="cb__tm"><span class="cb__tm-role">airway</span><span class="cb__tm-name">Dr. Pawit Atisuk</span><span class="cb__tm-meta">anesthesia · ETT 14:41</span></div>
          <div class="cb__tm"><span class="cb__tm-role">compressions</span><span class="cb__tm-name">RN Pim · RN Suchart</span><span class="cb__tm-meta">rotated q2 min × 6 cycles</span></div>
          <div class="cb__tm"><span class="cb__tm-role">defib / monitor</span><span class="cb__tm-name">RN Manee</span><span class="cb__tm-meta">charge nurse</span></div>
          <div class="cb__tm"><span class="cb__tm-role">meds / IV</span><span class="cb__tm-name">RN Wassana</span><span class="cb__tm-meta">push doses · Pyxis run</span></div>
          <div class="cb__tm"><span class="cb__tm-role">recorder</span><span class="cb__tm-name">RN Suda Lim</span><span class="cb__tm-meta">timeline + drugs</span></div>
        </div>
      </div>

      <div class="cb__sign">
        <div class="cb__sig"><span class="cb__sig-cap">team leader</span><span class="cb__sig-name">Dr. Niran Kalyanon, MD</span><span class="cb__sig-meta">e-sign · 15:15 · attending</span></div>
        <div class="cb__sig"><span class="cb__sig-cap">recorder</span><span class="cb__sig-name">RN Suda Lim</span><span class="cb__sig-meta">e-sign · 15:10 · timeline verified</span></div>
        <div class="cb__sig"><span class="cb__sig-cap">debrief scheduled</span><span class="cb__sig-name">15 Aug 08:00</span><span class="cb__sig-meta">all team members invited · ICU conf room</span></div>
      </div>

      <div class="cb__foot">
        <div class="cb__foot-meta">AHA 2020 ACLS · auto-imported from defib + monitor + Pyxis · CPR feedback device data attached</div>
        <div style="display:flex; gap:6px;">
          <button class="cb__btn">Export AHA Get-With-Guidelines</button>
          <button class="cb__btn">Print sheet</button>
          <button class="cb__btn cb__btn--primary">✓ Sign &amp; lock</button>
        </div>
      </div>`;

    return section('cb','88','Code blue · Resuscitation sheet',
      'แบบฟอร์ม CPR · header สีแดงเด่น · 5-block timestamp strip (arrest/CPR/first shock/ROSC/cycles) พร้อม ROSC highlight สีเขียว · rhythm chip row · minute-by-minute table 8 events × 7 cols (time/rhythm/CPR/shock/drug/IV/note) ใช้สีตาม event type · 4-card drug totals · outcome split (ROSC + cause) · 6-role team grid · 3-signature panel + debrief.',
      sub('VF arrest · 13 min downtime · 4 shocks · 2 mg epi · ROSC achieved → ICU TTM', demo(card)));
  });
})();
