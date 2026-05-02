/* #89 Death record / Body release */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function deathSection(){
    const card = h('div', {class:'dr'});

    card.innerHTML = `
      <div class="dr__head">
        <div class="dr__brand">
          <div class="dr__logo">DTH</div>
          <div>
            <div class="dr__title">Death record · Body release form</div>
            <div class="dr__sub">Form DC-501 v2.1 · ICU bed 12 · 16 Aug 2024 · MOPH death-cert ระบบ</div>
          </div>
        </div>
        <div class="dr__meta">
          <strong>DC-2024-08-16-0342</strong><br/>
          AN · 67-12345<br/>
          locked · awaiting BoR sync
        </div>
      </div>

      <div class="dr__strip">
        <div class="dr__sc"><span class="dr__sc-cap">date / time of death</span><span class="dr__sc-val">16 Aug · 03:42</span><span class="dr__sc-mono">Sat · post-arrest day 2</span></div>
        <div class="dr__sc"><span class="dr__sc-cap">pronouncing physician</span><span class="dr__sc-val">Dr. Niran K., MD</span><span class="dr__sc-mono">attending · in-person</span></div>
        <div class="dr__sc"><span class="dr__sc-cap">manner</span><span class="dr__sc-val">Natural</span><span class="dr__sc-mono">no police case · no autopsy req</span></div>
        <div class="dr__sc"><span class="dr__sc-cap">disposition</span><span class="dr__sc-val">Family · home rites</span><span class="dr__sc-mono">Wat Phra Thong · 16 Aug 14:00</span></div>
      </div>

      <!-- ICD cause of death -->
      <div class="dr__sec">
        <div class="dr__sec-h"><span>Cause of death · ICD-10 certificate format</span><span class="dr__sec-cap">part I (Ia–Ic) immediate → underlying · part II contributing</span></div>
        <div class="dr__cod">
          <div class="dr__cod-row">
            <span class="dr__cod-tag dr__cod-tag--ia">I (a)</span>
            <span class="dr__cod-text"><strong>Anoxic brain injury</strong><small>immediate cause · post-cardiac-arrest · onset 14 Aug 14:32</small></span>
            <span class="dr__cod-icd">ICD-10<br/><strong>G93.1</strong></span>
          </div>
          <div class="dr__cod-row">
            <span class="dr__cod-tag dr__cod-tag--ib">I (b)</span>
            <span class="dr__cod-text"><strong>Cardiac arrest · ventricular fibrillation</strong><small>due to · ROSC at 14:45 but persistent coma · TTM completed 16 Aug 02:00</small></span>
            <span class="dr__cod-icd">ICD-10<br/><strong>I46.0</strong></span>
          </div>
          <div class="dr__cod-row">
            <span class="dr__cod-tag dr__cod-tag--ic">I (c)</span>
            <span class="dr__cod-text"><strong>Acute myocardial infarction · anterior</strong><small>underlying cause · troponin 28.4 · cath deferred per family</small></span>
            <span class="dr__cod-icd">ICD-10<br/><strong>I21.0</strong></span>
          </div>
          <div class="dr__cod-row">
            <span class="dr__cod-tag dr__cod-tag--ii">II</span>
            <span class="dr__cod-text"><strong>Type 2 diabetes mellitus · CKD stage 3 · post-op TKA day 3</strong><small>contributing conditions (not in causal chain)</small></span>
            <span class="dr__cod-icd">ICD-10<br/><strong>E11.9 · N18.3</strong></span>
          </div>
        </div>
      </div>

      <!-- Pronouncement -->
      <div class="dr__sec">
        <div class="dr__sec-h"><span>Pronouncement of death · clinical criteria</span><span class="dr__sec-cap">in-person at bedside</span></div>
        <div class="dr__pron">
          <div class="dr__pp">
            <span class="dr__pp-cap">examiner findings</span>
            <span class="dr__pp-val">No spontaneous respiration · no pulse · no heart sounds × 2 min</span>
            <span class="dr__pp-meta">
              · pupils fixed &amp; dilated 6 mm bilateral<br/>
              · no response to noxious stimulus<br/>
              · monitor asystole on 3 leads × 2 min<br/>
              · ETCO₂ flat-line · ventilator off prior to exam
            </span>
          </div>
          <div class="dr__pp">
            <span class="dr__pp-cap">resuscitation status</span>
            <span class="dr__pp-val">DNR · in effect since 15 Aug 22:00</span>
            <span class="dr__pp-meta">
              · DNR signed by son after family meeting<br/>
              · withdrawal of life-sustaining tx 16 Aug 02:30<br/>
              · comfort meds (morphine 2 mg q1h prn) given<br/>
              · family at bedside throughout
            </span>
          </div>
        </div>
      </div>

      <!-- Body release checklist -->
      <div class="dr__sec">
        <div class="dr__sec-h"><span>Body release checklist · 10 items</span><span class="dr__sec-cap">9 done · 1 pending sync</span></div>
        <div class="dr__list">
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>ID confirmed</strong> · wristband + family verify</div><div class="dr__li-by">RN Suda · 03:50</div></div>
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>Tubes / lines removed</strong> · ETT, CVC, Foley, drains</div><div class="dr__li-by">RN Suda · 04:05</div></div>
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>Body cleaned &amp; dressed</strong> · shroud applied</div><div class="dr__li-by">CG · 04:20</div></div>
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>2 ID tags</strong> · toe + shroud · matching HN</div><div class="dr__li-by">RN Suda · 04:25</div></div>
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>Religious rite</strong> · Buddhist · monk attended 04:00</div><div class="dr__li-by">family arranged</div></div>
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>Death certificate (ทร.4 /1)</strong> · issued</div><div class="dr__li-by">Dr. Niran · 04:15</div></div>
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>Belongings inventoried</strong> · 6 items</div><div class="dr__li-by">RN + son co-sign</div></div>
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>Implants noted</strong> · TKA prosthesis · no pacemaker</div><div class="dr__li-by">chart review</div></div>
          <div class="dr__li"><div class="dr__li-tk">✓</div><div class="dr__li-text"><strong>Mortuary notified</strong> · transport arrived 04:40</div><div class="dr__li-by">log MT-1042</div></div>
          <div class="dr__li"><div class="dr__li-tk dr__li-tk--pending">…</div><div class="dr__li-text"><strong>BoR / civil registry sync</strong> · ทร.4 e-submit</div><div class="dr__li-by">in queue · ETA 09:00</div></div>
        </div>
      </div>

      <!-- Belongings -->
      <div class="dr__sec">
        <div class="dr__sec-h"><span>Personal belongings released</span><span class="dr__sec-cap">6 items · receipt RB-2024-1042</span></div>
        <table class="dr__bel">
          <thead><tr><th>#</th><th>item</th><th>description</th><th>qty</th><th>released to</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>Wedding ring</td><td>yellow gold · L ring finger</td><td class="q">1</td><td>son · Mr. Somchai</td></tr>
            <tr><td>2</td><td>Necklace · pendant</td><td>gold chain · Buddha amulet</td><td class="q">1</td><td>son</td></tr>
            <tr><td>3</td><td>Earrings</td><td>gold studs · pair</td><td class="q">2</td><td>son</td></tr>
            <tr><td>4</td><td>Wallet</td><td>brown leather · ID + ฿ 1,240 cash</td><td class="q">1</td><td>son</td></tr>
            <tr><td>5</td><td>Reading glasses</td><td>tortoise frame · case</td><td class="q">1</td><td>son</td></tr>
            <tr><td>6</td><td>Mobile phone</td><td>Samsung · charger included</td><td class="q">1</td><td>son</td></tr>
          </tbody>
        </table>
      </div>

      <!-- NOK -->
      <div class="dr__sec">
        <div class="dr__sec-h"><span>Next of kin · receipt</span><span class="dr__sec-cap">verified ID + signed</span></div>
        <div class="dr__nok">
          <div class="dr__nok-av">SP</div>
          <div class="dr__nok-info">
            <span class="dr__nok-name">Mr. Somchai Panyadee</span>
            <span class="dr__nok-rel">son · age 38 · primary NOK on file</span>
            <span class="dr__nok-meta">
              <strong>ID</strong> ป.ปชช 1-1234-56789-01-2 (verified) · <strong>tel</strong> 081-234-5678<br/>
              <strong>signature</strong> e-sign 04:45 · <strong>witness</strong> RN Suda Lim<br/>
              <strong>copy of death cert</strong> handed in person · 1 original + 2 certified copies
            </span>
          </div>
        </div>
      </div>

      <div class="dr__sign">
        <div class="dr__sig"><span class="dr__sig-cap">pronouncing physician</span><span class="dr__sig-name">Dr. Niran Kalyanon, MD</span><span class="dr__sig-meta">e-sign · 04:15 · ลายเซ็น 7-2284</span></div>
        <div class="dr__sig"><span class="dr__sig-cap">attending nurse</span><span class="dr__sig-name">RN Suda Lim</span><span class="dr__sig-meta">e-sign · 04:50 · checklist verified</span></div>
        <div class="dr__sig"><span class="dr__sig-cap">family · receiving</span><span class="dr__sig-name">Mr. Somchai Panyadee</span><span class="dr__sig-meta">e-sign · 04:45 · son · ID verified</span></div>
      </div>

      <div class="dr__foot">
        <div class="dr__foot-meta">MOPH ทร.4 ระบบ · ICD-10 cause-of-death format · auto-submit to civil registry within 24 h · this record is locked</div>
        <div style="display:flex; gap:6px;">
          <button class="dr__btn">Print death cert (ทร.4)</button>
          <button class="dr__btn">Print body-release receipt</button>
          <button class="dr__btn dr__btn--primary">🔒 Locked · final</button>
        </div>
      </div>`;

    return section('dr','89','Death record · Body release',
      'แบบฟอร์มมรณบัตร / ปล่อยร่าง · header สี dark · 4-block strip (DTOD/MD/manner/disposition) · ICD-10 cause-of-death pyramid Ia/Ib/Ic/II พร้อม code chips · pronouncement panel (clinical criteria + DNR/withdrawal status) · 10-item body-release checklist · 6-row belongings table + receipt · NOK card (signed) · 3-signature panel (MD + RN + family) · MOPH ทร.4 + civil-registry sync.',
      sub('DOD 16 Aug 03:42 · natural · post-arrest anoxic brain injury · family release', demo(card)));
  });
})();
