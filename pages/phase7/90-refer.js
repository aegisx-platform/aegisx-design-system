/* #90 Refer / Inter-facility transfer */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function referSection(){
    const card = h('div', {class:'rf'});

    card.innerHTML = `
      <div class="rf__head">
        <div class="rf__brand">
          <div class="rf__logo">REF</div>
          <div>
            <div class="rf__title">Inter-facility transfer · refer-out</div>
            <div class="rf__sub">Form RF-601 v3.0 · level 2 → level 3 · MOPH refer-link · 14 Aug 2024</div>
          </div>
        </div>
        <div class="rf__meta">
          <strong>RF-2024-08-14-1100</strong><br/>
          AN · 67-12345<br/>
          accepted · ETA 12:30
        </div>
      </div>

      <div class="rf__hop">
        <div class="rf__f">
          <span class="rf__f-cap">from · referring</span>
          <span class="rf__f-name">รพ. ชุมชน A · 60 เตียง</span>
          <span class="rf__f-meta">
            level 2 · ER → ICU<br/>
            <strong>contact</strong> ER ext 1199 · Dr. Niran Kalyanon, MD<br/>
            <strong>tel</strong> 053-XXX-1234 · fax 053-XXX-1235<br/>
            ระยะทาง: ส่งต่อในเครือเขตสุขภาพ 1
          </span>
        </div>
        <div class="rf__arr">→</div>
        <div class="rf__f" style="background:var(--ax-info-subtle);">
          <span class="rf__f-cap" style="color:var(--ax-info-emphasis);">to · receiving</span>
          <span class="rf__f-name">รพ. ศูนย์ B · ตติยภูมิ</span>
          <span class="rf__f-meta">
            level 3 · cardiac cath / ICU<br/>
            <strong>accepted by</strong> Dr. Pawin Suthiwong, cardiologist<br/>
            <strong>bed</strong> CCU bed 3 · reserved 11:45<br/>
            <strong>distance</strong> 42 km · ETA 12:30
          </span>
        </div>
      </div>

      <div class="rf__strip">
        <div class="rf__sc"><span class="rf__sc-cap">reason for transfer</span><span class="rf__sc-val">STEMI · cath needed</span><span class="rf__sc-mono">no cath-lab on site</span></div>
        <div class="rf__sc rf__sc--accept"><span class="rf__sc-cap">acceptance</span><span class="rf__sc-val">✓ Accepted 11:45</span><span class="rf__sc-mono">verbal + written confirm</span></div>
        <div class="rf__sc"><span class="rf__sc-cap">priority</span><span class="rf__sc-val">Urgent (yellow)</span><span class="rf__sc-mono">door-to-balloon target &lt; 120 min</span></div>
        <div class="rf__sc"><span class="rf__sc-cap">mode</span><span class="rf__sc-val">ALS ambulance</span><span class="rf__sc-mono">EMS-1188 · ETD 11:30 · ETA 12:30</span></div>
      </div>

      <!-- Clinical summary -->
      <div class="rf__sec">
        <div class="rf__sec-h"><span>Clinical summary</span><span class="rf__sec-cap"><span class="rf__triage rf__triage--y">stable / urgent</span></span></div>
        <div class="rf__sum">
          <div class="rf__cell"><span class="rf__cell-cap">Patient</span><span class="rf__cell-val"><strong>สมศรี ใจดี</strong> · F · 67y · HN 6712-3344 · AN 67-12345 · weight 68 kg · height 158 cm</span></div>
          <div class="rf__cell"><span class="rf__cell-cap">Allergy</span><span class="rf__cell-val"><strong>NKDA</strong> · NSAIDs caution (gastritis)</span></div>
          <div class="rf__cell"><span class="rf__cell-cap">Diagnosis</span><span class="rf__cell-val"><strong>Acute STEMI · anterior wall</strong> · onset 09:30 · ECG ST↑ V1–V4 · troponin 4.2 ng/mL · Killip II</span></div>
          <div class="rf__cell"><span class="rf__cell-cap">Past hx</span><span class="rf__cell-val">DM2 · HT · DLP · CKD3 · TKA L 2022 · ex-smoker 30 pack-yr (quit 2018)</span></div>
          <div class="rf__cell"><span class="rf__cell-cap">Pre-hospital tx given</span><span class="rf__cell-val">ASA 300 mg PO · clopidogrel 600 mg PO · atorva 80 mg PO · enoxaparin 60 mg SC · MO 3 mg IV · O₂ 4 LPM</span></div>
          <div class="rf__cell"><span class="rf__cell-cap">Investigations · sent with</span><span class="rf__cell-val">12-lead ECG (printed + DICOM) · CXR · CBC · BUN/Cr 1.6 · K 4.2 · troponin · type &amp; screen</span></div>
        </div>
      </div>

      <!-- Vitals at departure -->
      <div class="rf__sec">
        <div class="rf__sec-h"><span>Vitals · last 3 readings before transport</span><span class="rf__sec-cap">stable on current tx</span></div>
        <table class="rf__vit">
          <thead><tr><th class="lbl">parameter</th><th>10:00</th><th>10:30</th><th>11:00</th><th class="now">11:25 · pre-departure</th></tr></thead>
          <tbody>
            <tr><td class="lbl">BP mmHg</td><td>106/68</td><td>110/70</td><td>112/72</td><td class="now">114/74</td></tr>
            <tr><td class="lbl">HR</td><td>92</td><td>88</td><td>86</td><td class="now">84 NSR</td></tr>
            <tr><td class="lbl">SpO₂ %</td><td>96 (4 LPM)</td><td>97</td><td>98</td><td class="now">98 (4 LPM)</td></tr>
            <tr><td class="lbl">RR</td><td>22</td><td>20</td><td>20</td><td class="now">18</td></tr>
            <tr><td class="lbl">Pain 0–10</td><td>8</td><td>5</td><td>3</td><td class="now">2</td></tr>
            <tr><td class="lbl">GCS</td><td>15</td><td>15</td><td>15</td><td class="now">15 · alert</td></tr>
          </tbody>
        </table>
      </div>

      <!-- Transport equipment + crew -->
      <div class="rf__sec">
        <div class="rf__sec-h"><span>Transport plan · ALS ambulance · EMS-1188</span><span class="rf__sec-cap">10 of 11 ready · 1 pending</span></div>
        <div class="rf__list">
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>O₂ tank</strong> · full · 2,000 L · cannula + mask</div><div class="rf__li-by">EMT 11:20</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>Defib / monitor</strong> · 12-lead capable · pads on</div><div class="rf__li-by">EMT 11:20</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>2 IV lines patent</strong> · 18G L &amp; R · LRS KVO</div><div class="rf__li-by">RN Pim 11:15</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>Infusion pump × 2</strong> · NTG 5 µg/min · heparin gtt</div><div class="rf__li-by">RN Pim 11:18</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>Code drugs · ACLS</strong> · epi · amio · atropine</div><div class="rf__li-by">EMT</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>Suction · BVM · airway kit</strong> · ETT 7.0/7.5</div><div class="rf__li-by">EMT</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>Stretcher · belts × 5</strong> · head elev 30°</div><div class="rf__li-by">EMT</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>Family informed</strong> · son to drive separately</div><div class="rf__li-by">RN 11:00</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>Records sealed envelope</strong> · ECG · labs · meds list</div><div class="rf__li-by">RN 11:25</div></div>
          <div class="rf__li"><div class="rf__li-tk">✓</div><div class="rf__li-text"><strong>Insurance · UCS</strong> · refer slip ทร.18 attached</div><div class="rf__li-by">cashier 11:10</div></div>
          <div class="rf__li"><div class="rf__li-tk rf__li-tk--off">…</div><div class="rf__li-text"><strong>Receiving CCU final ETA confirm</strong> · awaiting call-back</div><div class="rf__li-by">due 11:30</div></div>
        </div>
      </div>

      <!-- En-route timeline -->
      <div class="rf__sec">
        <div class="rf__sec-h"><span>En-route plan · 60 min transit</span><span class="rf__sec-cap">RN escort + EMT-P · radio MD on call</span></div>
        <div class="rf__route">
          <div class="rf__rs rf__rs--start"><span class="rf__rs-dot">●</span><span class="rf__rs-time">11:30</span><span class="rf__rs-evt">depart รพ.A<br/>vitals q5 → q15</span></div>
          <div class="rf__rs-line"></div>
          <div class="rf__rs"><span class="rf__rs-dot">15</span><span class="rf__rs-time">11:45</span><span class="rf__rs-evt">v/s check<br/>NTG titrate</span></div>
          <div class="rf__rs-line"></div>
          <div class="rf__rs"><span class="rf__rs-dot">30</span><span class="rf__rs-time">12:00</span><span class="rf__rs-evt">v/s check<br/>halfway pt</span></div>
          <div class="rf__rs-line"></div>
          <div class="rf__rs"><span class="rf__rs-dot">45</span><span class="rf__rs-time">12:15</span><span class="rf__rs-evt">radio receiving<br/>ETA 15 min</span></div>
          <div class="rf__rs-line"></div>
          <div class="rf__rs rf__rs--end"><span class="rf__rs-dot">●</span><span class="rf__rs-time">12:30</span><span class="rf__rs-evt">arrive รพ.B CCU<br/>handoff SBAR</span></div>
        </div>
      </div>

      <div class="rf__sign">
        <div class="rf__sig"><span class="rf__sig-cap">referring physician</span><span class="rf__sig-name">Dr. Niran Kalyanon, MD</span><span class="rf__sig-meta">e-sign · 11:25 · ER attending</span></div>
        <div class="rf__sig"><span class="rf__sig-cap">accepting physician</span><span class="rf__sig-name">Dr. Pawin Suthiwong</span><span class="rf__sig-meta">cardiologist · phone-confirm 11:45 · รพ.B</span></div>
        <div class="rf__sig"><span class="rf__sig-cap">RN escort</span><span class="rf__sig-name">RN Pim Kanchana</span><span class="rf__sig-meta">e-sign · ALS-trained · radio call sign R-1188</span></div>
      </div>

      <div class="rf__foot">
        <div class="rf__foot-meta">MOPH refer-link · ทร.18 e-submit · clinical packet uploaded to receiving HIS · arrival auto-pushes back to referring chart</div>
        <div style="display:flex; gap:6px;">
          <button class="rf__btn">Print refer slip</button>
          <button class="rf__btn">SBAR phone-handoff</button>
          <button class="rf__btn rf__btn--primary">✓ Lock &amp; dispatch</button>
        </div>
      </div>`;

    return section('rf','90','Inter-facility transfer · refer-out',
      'แบบฟอร์มส่งต่อ · From → To facility cards พร้อมลูกศร · 4-block strip (reason/acceptance/priority/mode) + triage chip · 6-cell clinical summary (patient/allergy/dx/PMH/pre-hosp tx/investigations) · 3+1 vitals timeline table · 11-item transport-plan checklist (O₂/defib/IV/pumps/code drugs/airway/stretcher/family/records/insurance/ETA) · 5-stop en-route timeline · 3-signature panel (referring MD + accepting MD + RN escort).',
      sub('STEMI · level 2 → 3 · ALS · ETA 12:30 · door-to-balloon target', demo(card)));
  });
})();
