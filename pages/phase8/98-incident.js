/* #98 Incident report (HRMS safety event) */
(function(){
  if (!window.AX8) return;
  const { h, section, sub, demo } = AX8;

  AX8.register(function incidentSection(){
    const card = h('div', {class:'incident'});
    card.innerHTML = `
      <div class="incident__head">
        <div class="incident__brand">
          <div class="incident__logo">IR</div>
          <div>
            <div class="incident__title">Incident report · HRMS safety event · medication near-miss</div>
            <div class="incident__sub">Form QI-308 v4.0 · reported 15 Aug 22:41 · ward 4 · category D (near-miss)</div>
          </div>
        </div>
        <div class="incident__meta">
          <strong>IR-2024-08-15-0337</strong><br/>
          status · UNDER REVIEW<br/>
          QI committee 22 Aug
        </div>
      </div>

      <div class="incident__strip">
        <div class="incident__strip-cell"><span class="incident__strip-cap">event date/time</span><span class="incident__strip-val">15 Aug · 22:38</span><span class="incident__strip-meta">night shift · q4h med round</span></div>
        <div class="incident__strip-cell"><span class="incident__strip-cap">location</span><span class="incident__strip-val">ward 4 · bed 4-12</span><span class="incident__strip-meta">post-op TKA day 1</span></div>
        <div class="incident__strip-cell"><span class="incident__strip-cap">category</span><span class="incident__strip-val">medication</span><span class="incident__strip-meta">wrong-dose intercept</span></div>
        <div class="incident__strip-cell"><span class="incident__strip-cap">severity (NCC-MERP)</span><span class="incident__strip-val"><span class="incident__sev incident__sev--e">D · near-miss</span></span><span class="incident__strip-meta">reached patient · no harm</span></div>
        <div class="incident__strip-cell"><span class="incident__strip-cap">harm</span><span class="incident__strip-val">none</span><span class="incident__strip-meta">caught at bedside · BCMA scan</span></div>
      </div>

      <div class="incident__lad">
        <div class="incident__lad-h"><span>NCC-MERP severity ladder · 9 levels (A → I)</span><span class="incident__sec-cap">this event = D</span></div>
        <div class="incident__lad-track">
          <div class="incident__lad-step"><span class="incident__lad-cap">A</span><span class="incident__lad-name">circumstance<br/>only</span></div>
          <div class="incident__lad-step"><span class="incident__lad-cap">B</span><span class="incident__lad-name">error did<br/>not reach pt</span></div>
          <div class="incident__lad-step"><span class="incident__lad-cap">C</span><span class="incident__lad-name">reached pt<br/>no harm</span></div>
          <div class="incident__lad-step is-on"><span class="incident__lad-cap">D</span><span class="incident__lad-name">reached pt<br/>monitor only</span></div>
          <div class="incident__lad-step"><span class="incident__lad-cap">E</span><span class="incident__lad-name">temp harm<br/>tx needed</span></div>
          <div class="incident__lad-step"><span class="incident__lad-cap">F</span><span class="incident__lad-name">temp harm<br/>prolonged stay</span></div>
          <div class="incident__lad-step"><span class="incident__lad-cap">G</span><span class="incident__lad-name">permanent<br/>harm</span></div>
          <div class="incident__lad-step"><span class="incident__lad-cap">H</span><span class="incident__lad-name">life-saving<br/>intervention</span></div>
          <div class="incident__lad-step"><span class="incident__lad-cap">I</span><span class="incident__lad-name">death</span></div>
        </div>
      </div>

      <div class="incident__body">

        <!-- Persons + reporter -->
        <div>
          <div class="incident__sec-h"><span>Patient · staff · reporter</span><span class="incident__sec-cap">de-identified for QI use</span></div>
          <div class="incident__grid">
            <div class="incident__cell"><span class="incident__cell-cap">patient (affected)</span><span class="incident__cell-val">สุดา ปัญญาดี · F · 62y</span><span class="incident__cell-meta">HN 6712-3344 · post-op TKA POD-1 · stable</span></div>
            <div class="incident__cell"><span class="incident__cell-cap">staff involved</span><span class="incident__cell-val">RN วราภรณ์ · นศ.พยาบาล ปี 4</span><span class="incident__cell-meta">night shift 21:00–07:00 · 1.5y exp · supervised student</span></div>
            <div class="incident__cell"><span class="incident__cell-cap">reporter</span><span class="incident__cell-val">RN พิม · same shift</span><span class="incident__cell-meta">caught the error · self-reported by RN วราภรณ์ jointly</span></div>
            <div class="incident__cell"><span class="incident__cell-cap">witness</span><span class="incident__cell-val">RN ฟ้า · charge nurse</span><span class="incident__cell-meta">at bedside during BCMA alert</span></div>
          </div>
        </div>

        <!-- Narrative -->
        <div>
          <div class="incident__sec-h"><span>Narrative · what happened</span><span class="incident__sec-cap">factual · no blame</span></div>
          <div class="incident__narr">
            <div class="incident__narr-row"><span class="incident__narr-l">22:30</span><span class="incident__narr-v">Q4h scheduled med round started. Pt due for <strong>enoxaparin 40 mg SC</strong>. Student nurse drew up <strong>enoxaparin 60 mg</strong> from a 60mg/0.6mL pre-filled syringe (look-alike packaging — 40mg pen kept in adjacent bin since stock change 12 Aug).</span></div>
            <div class="incident__narr-row"><span class="incident__narr-l">22:37</span><span class="incident__narr-v">Student attempted to administer at bedside. Supervising RN วราภรณ์ scanned wristband + drug barcode (BCMA). System flagged <strong>"DOSE MISMATCH · ordered 40mg, scanned 60mg"</strong>. Administration halted at the bedside — needle had not entered skin.</span></div>
            <div class="incident__narr-row"><span class="incident__narr-l">22:38</span><span class="incident__narr-v">Charge RN ฟ้า called to bedside. Correct 40mg pen retrieved from main stock; second BCMA scan → match. Dose given at 22:42. Pt unaware of error; no monitoring beyond scheduled vitals required.</span></div>
            <div class="incident__narr-row"><span class="incident__narr-l">22:55</span><span class="incident__narr-v">Joint debrief at nursing station; both RN and student wrote statements. Charge RN secured remaining 60mg syringes (5 units) into segregated bin pending stock review.</span></div>
            <div class="incident__narr-row"><span class="incident__narr-l">23:10</span><span class="incident__narr-v">Incident filed in HRMS by RN พิม + RN วราภรณ์ (joint report). MD on-call notified at 23:15 · no orders. Pt notified by charge RN at 23:30 per disclosure policy — accepted, no concerns.</span></div>
          </div>
        </div>

        <!-- 5 Whys -->
        <div>
          <div class="incident__sec-h"><span>Root cause analysis · 5 Whys</span><span class="incident__sec-cap">QI-led 18 Aug</span></div>
          <div class="incident__rca">
            <div class="incident__rca-row"><span class="incident__rca-tag">why 1</span><div><div class="incident__rca-q"><strong>Why was the wrong dose drawn up?</strong></div><div class="incident__rca-a">→ 60mg pen was selected from a bin where 40mg pens were previously kept.</div></div></div>
            <div class="incident__rca-row"><span class="incident__rca-tag">why 2</span><div><div class="incident__rca-q"><strong>Why was the wrong pen in that bin?</strong></div><div class="incident__rca-a">→ Pharmacy stock change 12 Aug: 40mg moved to upper shelf; 60mg now occupies the original bin. Bin label not updated.</div></div></div>
            <div class="incident__rca-row"><span class="incident__rca-tag">why 3</span><div><div class="incident__rca-q"><strong>Why was the bin label not updated?</strong></div><div class="incident__rca-a">→ Stock-change SOP requires label update by pharm tech, but step is not on the printed checklist used during evening restock.</div></div></div>
            <div class="incident__rca-row"><span class="incident__rca-tag">why 4</span><div><div class="incident__rca-q"><strong>Why was the student not supervised at the draw-up step?</strong></div><div class="incident__rca-a">→ Unit policy supervises at administration, not preparation; student had completed med-prep checkoff. Look-alike risk not flagged in handover.</div></div></div>
            <div class="incident__rca-row"><span class="incident__rca-tag is-root">root cause</span><div><div class="incident__rca-q"><strong>Why did the system not block the error sooner?</strong></div><div class="incident__rca-a">→ <strong>System</strong>: BCMA at bedside is the only forcing function; no pharmacy-driven verification exists between stock and medication room. Combined with stale bin labeling after stock change, look-alike packaging created predictable wrong-strength selection.</div></div></div>
          </div>
        </div>

        <!-- Contributing factors -->
        <div>
          <div class="incident__sec-h"><span>Contributing factors · London Protocol</span><span class="incident__sec-cap">3 of 8 active</span></div>
          <div class="incident__factors">
            <div class="incident__fac is-on"><span class="incident__fac-cap">environment</span><span class="incident__fac-name">Look-alike packaging</span><span class="incident__fac-meta">enoxaparin 40 vs 60</span></div>
            <div class="incident__fac is-on"><span class="incident__fac-cap">organizational</span><span class="incident__fac-name">Stock-change SOP gap</span><span class="incident__fac-meta">bin label not in checklist</span></div>
            <div class="incident__fac is-on"><span class="incident__fac-cap">team</span><span class="incident__fac-name">Handover did not flag</span><span class="incident__fac-meta">stock change unannounced</span></div>
            <div class="incident__fac"><span class="incident__fac-cap">individual</span><span class="incident__fac-name">No fatigue / dist</span><span class="incident__fac-meta">8/10h into shift, normal load</span></div>
            <div class="incident__fac"><span class="incident__fac-cap">task</span><span class="incident__fac-name">SOP followed</span><span class="incident__fac-meta">5-rights check normal</span></div>
            <div class="incident__fac"><span class="incident__fac-cap">technology</span><span class="incident__fac-name">BCMA worked</span><span class="incident__fac-meta">caught error · positive control</span></div>
            <div class="incident__fac"><span class="incident__fac-cap">patient</span><span class="incident__fac-name">No factors</span><span class="incident__fac-meta">cooperative · ID band intact</span></div>
            <div class="incident__fac"><span class="incident__fac-cap">communication</span><span class="incident__fac-name">No failure</span><span class="incident__fac-meta">disclosure done same shift</span></div>
          </div>
        </div>

        <!-- CAPA -->
        <div>
          <div class="incident__sec-h"><span>Corrective &amp; preventive actions · CAPA</span><span class="incident__sec-cap">5 actions · 2 done · 2 in-prog · 1 open</span></div>
          <div class="incident__capa">
            <div class="incident__capa-h"><span>#</span><span>action</span><span>owner</span><span>due</span><span>status</span></div>
            <div class="incident__capa-r"><span class="incident__capa-num">01</span><div class="incident__capa-name"><strong>Re-label all enoxaparin bins ward-wide</strong><small>color-tag 40 (blue) vs 60 (orange)</small></div><span class="incident__capa-owner">pharm · ดร.อนุชา</span><span class="incident__capa-due">17 Aug</span><span class="incident__capa-st incident__capa-st--done">DONE</span></div>
            <div class="incident__capa-r"><span class="incident__capa-num">02</span><div class="incident__capa-name"><strong>Add bin-label step to stock-change SOP</strong><small>checklist v3 → v3.1 · sign-off required</small></div><span class="incident__capa-owner">pharm dir</span><span class="incident__capa-due">19 Aug</span><span class="incident__capa-st incident__capa-st--done">DONE</span></div>
            <div class="incident__capa-r"><span class="incident__capa-num">03</span><div class="incident__capa-name"><strong>Daily handover: announce stock changes</strong><small>add to SBAR template "supplies/changes" line</small></div><span class="incident__capa-owner">CNO · พญ.สุดา</span><span class="incident__capa-due">25 Aug</span><span class="incident__capa-st incident__capa-st--prog">IN PROG</span></div>
            <div class="incident__capa-r"><span class="incident__capa-num">04</span><div class="incident__capa-name"><strong>Pre-administration BCMA at med-prep</strong><small>shift forcing function upstream of bedside</small></div><span class="incident__capa-owner">IT + nursing</span><span class="incident__capa-due">15 Sep</span><span class="incident__capa-st incident__capa-st--prog">IN PROG</span></div>
            <div class="incident__capa-r"><span class="incident__capa-num">05</span><div class="incident__capa-name"><strong>Look-alike audit ward-wide (top-50 meds)</strong><small>quarterly · publish heat-map to QI dashboard</small></div><span class="incident__capa-owner">QI committee</span><span class="incident__capa-due">30 Sep</span><span class="incident__capa-st incident__capa-st--open">OPEN</span></div>
          </div>
        </div>

        <!-- Sign-offs -->
        <div>
          <div class="incident__sec-h"><span>Review &amp; sign-off</span><span class="incident__sec-cap">3 of 4 signed</span></div>
          <div class="incident__sigs">
            <div class="incident__sig"><span class="incident__sig-cap">reporter</span><span class="incident__sig-name">RN วราภรณ์ + RN พิม</span><span class="incident__sig-role">primary nurse + witness</span><span class="incident__sig-when">15 Aug 23:10 · joint</span><span class="incident__sig-mark">✓ signed</span></div>
            <div class="incident__sig"><span class="incident__sig-cap">unit manager</span><span class="incident__sig-name">RN ฟ้า · charge</span><span class="incident__sig-role">ward 4 head nurse</span><span class="incident__sig-when">16 Aug 07:30</span><span class="incident__sig-mark">✓ signed</span></div>
            <div class="incident__sig"><span class="incident__sig-cap">RCA lead</span><span class="incident__sig-name">QI · ภญ.ดร.พรรณี</span><span class="incident__sig-role">patient safety officer</span><span class="incident__sig-when">18 Aug 16:00</span><span class="incident__sig-mark">✓ signed</span></div>
          </div>
        </div>
      </div>

      <div class="incident__foot">
        <div class="incident__foot-meta">HRMS · category D near-miss · no patient harm · 5 CAPA actions tracked · QI committee review 22 Aug · de-identified copy → MOPH safety registry</div>
        <div style="display:flex; gap:6px;">
          <button class="incident__btn">Print case file</button>
          <button class="incident__btn">Export RCA (PDF)</button>
          <button class="incident__btn">Add CAPA action</button>
          <button class="incident__btn incident__btn--primary">→ Submit to QI committee</button>
        </div>
      </div>`;

    return section('incident','98','Incident report · HRMS',
      'แบบรายงานเหตุการณ์ไม่พึงประสงค์ · warning-tinted dark header · 5-cell strip (datetime/location/category/severity D pill/harm none) · 9-step NCC-MERP severity ladder A→I (D highlighted) · 4-cell people grid (patient/staff/reporter/witness) · 5-row time-stamped narrative (22:30→23:10) · 5-step "5 Whys" RCA in zebra rows with root-cause emphasis · 8-cell London Protocol contributing factors grid (3 active highlighted) · 5-action CAPA table with owner/due/status pills (DONE×2/IN-PROG×2/OPEN×1) · 3 sign-off cards · footer routes to QI committee + MOPH registry.',
      sub('Medication near-miss · enoxaparin 40 vs 60 look-alike · BCMA caught · 5 CAPA actions filed', demo(card)));
  });
})();
