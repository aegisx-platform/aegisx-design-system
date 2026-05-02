/* #97 Insurance pre-authorization */
(function(){
  if (!window.AX8) return;
  const { h, section, sub, demo } = AX8;

  AX8.register(function preauthSection(){
    const card = h('div', {class:'preauth'});
    card.innerHTML = `
      <div class="preauth__head">
        <div class="preauth__brand">
          <div class="preauth__logo">PA</div>
          <div>
            <div class="preauth__title">Insurance pre-authorization · Social Security · TKA right</div>
            <div class="preauth__sub">Form INS-307 v3.2 · submitted 11 Aug 14:30 · response 12 Aug 09:18 · 18h47m turnaround</div>
          </div>
        </div>
        <div class="preauth__meta">
          <strong>PA-2024-00871</strong><br/>
          AN · 67-12345<br/>
          DRG-08 bundle
        </div>
      </div>

      <div class="preauth__hero">
        <div class="preauth__status">
          <span class="preauth__status-cap">authorization status</span>
          <span class="preauth__status-val">APPROVED</span>
          <span class="preauth__status-meta">12 Aug 09:18 · valid 30d through 11 Sep</span>
          <span class="preauth__pa-id">REF · PA-2024-00871</span>
          <span class="preauth__status-meta" style="margin-top:4px;">cap ฿ 144,000 · LOS ≤ 5d</span>
        </div>
        <div class="preauth__tl">
          <div class="preauth__tl-h"><span>Workflow timeline · 7 events</span><span class="preauth__sec-cap">18h47m end-to-end</span></div>
          <div class="preauth__tl-row"><span class="cx-stepdot cx-stepdot--ok">1</span><span class="preauth__tl-time">10/8 · 16:20</span><span class="preauth__tl-event"><strong>Surgery scheduled</strong> · TKA right · OR-3 · 14 Aug 06:30</span><span class="preauth__tl-by">ortho clinic</span></div>
          <div class="preauth__tl-row"><span class="cx-stepdot cx-stepdot--ok">2</span><span class="preauth__tl-time">11/8 · 09:00</span><span class="preauth__tl-event"><strong>Eligibility check</strong> · SS active · 4 yr · cap ฿144k DRG-08</span><span class="preauth__tl-by">ins office</span></div>
          <div class="preauth__tl-row"><span class="cx-stepdot cx-stepdot--ok">3</span><span class="preauth__tl-time">11/8 · 11:40</span><span class="preauth__tl-event"><strong>Documentation assembled</strong> · 6 attachments · clinical justification</span><span class="preauth__tl-by">case mgr</span></div>
          <div class="preauth__tl-row"><span class="cx-stepdot cx-stepdot--ok">4</span><span class="preauth__tl-time">11/8 · 14:30</span><span class="preauth__tl-event"><strong>PA submitted</strong> via EDI portal · ack ID 8847-2231</span><span class="preauth__tl-by">EDI gateway</span></div>
          <div class="preauth__tl-row"><span class="cx-stepdot cx-stepdot--warn">5</span><span class="preauth__tl-time">12/8 · 07:50</span><span class="preauth__tl-event"><strong>Reviewer Q&amp;A</strong> · "confirm conservative tx ≥ 6mo" → answered same day</span><span class="preauth__tl-by">Dr.อรพรรณ</span></div>
          <div class="preauth__tl-row"><span class="cx-stepdot cx-stepdot--ok">6</span><span class="preauth__tl-time">12/8 · 09:18</span><span class="preauth__tl-event"><strong>APPROVED</strong> · 5/6 items full · 1/6 partial (premium implant)</span><span class="preauth__tl-by">SS reviewer</span></div>
          <div class="preauth__tl-row"><span class="cx-stepdot">7</span><span class="preauth__tl-time">17/8 · 11:20</span><span class="preauth__tl-event">Claim auto-submitted at discharge · expect settlement 30d</span><span class="preauth__tl-by">billing</span></div>
        </div>
      </div>

      <div class="preauth__cov">
        <div class="preauth__cov-cell"><span class="preauth__cov-cap">payor</span><span class="preauth__cov-val">SS · ประกันสังคม</span><span class="preauth__cov-meta">member 4 yr · in good standing</span></div>
        <div class="preauth__cov-cell"><span class="preauth__cov-cap">scheme / DRG</span><span class="preauth__cov-val">DRG-08 · TKA</span><span class="preauth__cov-meta">bundled rate ฿144k · LOS ≤ 5d</span></div>
        <div class="preauth__cov-cell"><span class="preauth__cov-cap">approved amount</span><span class="preauth__cov-val">฿ 144,000</span><span class="preauth__cov-meta">94% of est. ฿153k</span></div>
        <div class="preauth__cov-cell"><span class="preauth__cov-cap">patient share</span><span class="preauth__cov-val">฿ 14,720</span><span class="preauth__cov-meta">premium implant + room upgrade</span></div>
      </div>

      <div class="preauth__body">

        <!-- Patient + provider -->
        <div>
          <div class="preauth__sec-h"><span>Patient &amp; provider</span><span class="preauth__sec-cap">verified</span></div>
          <div class="preauth__grid">
            <div class="preauth__cell"><span class="preauth__cell-cap">patient</span><span class="preauth__cell-val">สุดา ปัญญาดี · F · 62y</span><span class="preauth__cell-meta">HN 6712-3344 · ประกันสังคม 67-1234567</span></div>
            <div class="preauth__cell"><span class="preauth__cell-cap">primary diagnosis</span><span class="preauth__cell-val">M17.11 · Primary OA right knee</span><span class="preauth__cell-meta">KL grade 4 · failed conservative tx 8mo</span></div>
            <div class="preauth__cell"><span class="preauth__cell-cap">facility</span><span class="preauth__cell-val">รพ.ศรีนครินทร์ · L3 trauma</span><span class="preauth__cell-meta">contracted provider · ID HSP-0428</span></div>
            <div class="preauth__cell"><span class="preauth__cell-cap">surgeon</span><span class="preauth__cell-val">นพ.วิชัย ตั้งใจ · ortho</span><span class="preauth__cell-meta">license MD-30441 · SS-credentialed</span></div>
          </div>
        </div>

        <!-- Items requested -->
        <div>
          <div class="preauth__sec-h"><span>Items requested · 6 line items</span><span class="preauth__sec-cap">5 full · 1 partial</span></div>
          <div class="preauth__items">
            <div class="preauth__items-h"><span>code</span><span>service</span><span>qty</span><span>req amount</span><span>decision</span></div>
            <div class="preauth__items-r">
              <span class="preauth__items-code">27447</span>
              <div class="preauth__items-name"><strong>TKA right · primary CR</strong><small>CPT 27447 · ICD-10 M17.11</small></div>
              <span class="preauth__items-qty">1</span>
              <span class="preauth__items-amt">฿ 65,000</span>
              <span class="preauth__items-status preauth__items-status--ok">APPROVED</span>
            </div>
            <div class="preauth__items-r">
              <span class="preauth__items-code">RM-STD</span>
              <div class="preauth__items-name"><strong>Standard ward · 5d</strong><small>4-bed room · post-op</small></div>
              <span class="preauth__items-qty">5</span>
              <span class="preauth__items-amt">฿ 15,000</span>
              <span class="preauth__items-status preauth__items-status--ok">APPROVED</span>
            </div>
            <div class="preauth__items-r">
              <span class="preauth__items-code">AN-GA</span>
              <div class="preauth__items-name"><strong>General anesthesia ≤ 3h</strong><small>anesthetist + drugs + gas</small></div>
              <span class="preauth__items-qty">1</span>
              <span class="preauth__items-amt">฿ 18,400</span>
              <span class="preauth__items-status preauth__items-status--ok">APPROVED</span>
            </div>
            <div class="preauth__items-r">
              <span class="preauth__items-code">IMP-ZIM</span>
              <div class="preauth__items-name"><strong>Knee implant · CR cemented (Zim Persona)</strong><small>requested premium · capped at standard rate</small></div>
              <span class="preauth__items-qty">1</span>
              <span class="preauth__items-amt">฿ 28,000</span>
              <span class="preauth__items-status preauth__items-status--partial">PARTIAL</span>
            </div>
            <div class="preauth__items-r">
              <span class="preauth__items-code">PT-IPD</span>
              <div class="preauth__items-name"><strong>Physiotherapy · bedside × 6</strong><small>POD 1 → discharge</small></div>
              <span class="preauth__items-qty">6</span>
              <span class="preauth__items-amt">฿ 4,800</span>
              <span class="preauth__items-status preauth__items-status--ok">APPROVED</span>
            </div>
            <div class="preauth__items-r">
              <span class="preauth__items-code">DX-PKG</span>
              <div class="preauth__items-name"><strong>Pre-op + post-op diagnostics package</strong><small>lab + imaging</small></div>
              <span class="preauth__items-qty">1</span>
              <span class="preauth__items-amt">฿ 21,800</span>
              <span class="preauth__items-status preauth__items-status--ok">APPROVED</span>
            </div>
          </div>
        </div>

        <!-- Justification -->
        <div>
          <div class="preauth__sec-h"><span>Clinical justification &amp; medical necessity</span><span class="preauth__sec-cap">required</span></div>
          <div class="preauth__just">
            <div class="preauth__just-row"><span class="preauth__just-l">indication</span><span class="preauth__just-v"><strong>End-stage right knee OA</strong> · KL grade 4 on radiograph 5/8/2024 (joint space &lt; 1mm, subchondral sclerosis, large osteophytes). Pain VAS 8/10 at rest, limits ADLs and ambulation &lt; 50m.</span></div>
            <div class="preauth__just-row"><span class="preauth__just-l">conservative tx</span><span class="preauth__just-v"><strong>Failed ≥ 8 months</strong> of: NSAIDs (celecoxib 200 BID × 6mo, gastritis), 3× HA injections (Jan/Apr/Jul 2024 — diminishing benefit), supervised PT × 12 sessions (Mar–May 2024), weight loss program (−4 kg, plateau). <code>conservative-tx-failed = TRUE</code></span></div>
            <div class="preauth__just-row"><span class="preauth__just-l">guideline ref</span><span class="preauth__just-v">SS clinical policy <code>SS-ORTH-2023-04</code> · TKA criteria met: KL 4 ✓ · pain VAS ≥ 7 ✓ · functional limit ✓ · failed conservative 6mo ✓ · BMI &lt; 35 ✓ · age &gt; 50 ✓</span></div>
            <div class="preauth__just-row"><span class="preauth__just-l">expected outcome</span><span class="preauth__just-v">Return to independent ambulation by POD 30, ROM 0–115° by 6 weeks, return to ADLs by 12 weeks. Post-op PT × 6 IPD + 12 OPD sessions covered under bundle.</span></div>
            <div class="preauth__just-row"><span class="preauth__just-l">reviewer note</span><span class="preauth__just-v">"Approved as medically necessary. Premium implant downgraded to standard cemented CR (capped); patient may upgrade self-pay differential ฿8,400."<br/><em>— SS reviewer ID 1147 · 12 Aug 09:18</em></span></div>
          </div>
        </div>

        <!-- Attachments -->
        <div>
          <div class="preauth__sec-h"><span>Attachments · 6 documents submitted</span><span class="preauth__sec-cap">PDF · 4.2 MB</span></div>
          <div class="preauth__att">
            <div class="preauth__att-c"><div class="preauth__att-icon">XR</div><div><div class="preauth__att-name">Knee X-ray AP+lat</div><div class="preauth__att-meta">5/8/2024 · 1.4 MB · DICOM</div></div></div>
            <div class="preauth__att-c"><div class="preauth__att-icon">RPT</div><div><div class="preauth__att-name">Radiology report · KL grade 4</div><div class="preauth__att-meta">5/8 · signed Dr.พิม · PDF</div></div></div>
            <div class="preauth__att-c"><div class="preauth__att-icon">CN</div><div><div class="preauth__att-name">Ortho clinic note</div><div class="preauth__att-meta">10/8 · Dr.วิชัย · PDF</div></div></div>
            <div class="preauth__att-c"><div class="preauth__att-icon">PT</div><div><div class="preauth__att-name">PT progress notes × 12</div><div class="preauth__att-meta">Mar–May · combined PDF</div></div></div>
            <div class="preauth__att-c"><div class="preauth__att-icon">RX</div><div><div class="preauth__att-name">Med history · NSAIDs/HA</div><div class="preauth__att-meta">8mo timeline · CSV</div></div></div>
            <div class="preauth__att-c"><div class="preauth__att-icon">CON</div><div><div class="preauth__att-name">Patient consent · disclosure</div><div class="preauth__att-meta">10/8 · signed · PDF</div></div></div>
          </div>
        </div>

      </div>

      <div class="preauth__foot">
        <div class="preauth__foot-meta">PA REF · PA-2024-00871 · valid 11 Sep 2024 · auto-attached to claim · downgrade communicated to patient ✓ · self-pay diff ฿8,400 acknowledged</div>
        <div style="display:flex; gap:6px;">
          <button class="preauth__btn">Print PA letter</button>
          <button class="preauth__btn">Appeal partial</button>
          <button class="preauth__btn">Submit amendment</button>
          <button class="preauth__btn preauth__btn--primary">✓ Attach to claim</button>
        </div>
      </div>`;

    return section('preauth','97','Insurance pre-authorization',
      'PA workflow · success-tinted status hero "APPROVED" + REF + 30d validity · 7-event timeline (schedule → eligibility → docs → submit → reviewer Q&A → approved → claim) with stepdots · 4-cell coverage strip (payor/DRG/approved amt/patient share) · patient+provider 4-cell grid · 6-line items table with code/CPT/qty/amount/decision pills (5 APPROVED · 1 PARTIAL premium implant capped) · 5-row clinical justification (indication/conservative tx failed/guideline ref/expected outcome/reviewer note) · 6 attachments grid (XR/report/clinic note/PT/Rx/consent) · action row.',
      sub('SS DRG-08 · ฿144,000 cap approved · 18h47m turnaround · self-pay diff ฿8,400', demo(card)));
  });
})();
