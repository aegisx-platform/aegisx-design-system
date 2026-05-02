/* #76 Discharge summary */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function dischargeSection(){
    const card = h('div', {class:'ds'});
    card.innerHTML = `
      <div class="ds__head">
        <div>
          <div class="ds__title">Discharge summary · ใบสรุปการรักษา</div>
          <div class="ds__sub">AN 67-12345 · Suda Phongsri · HN 234567 · Ward IPD 4 · Bed 4-12</div>
        </div>
        <div class="ds__stamp">
          <span class="ds__stamp-tag">finalized</span>
          <span>Discharge: 2024-08-17 11:30</span>
          <span>Doc ID: DS-67-08-1142</span>
        </div>
      </div>

      <div class="ds__band">
        <div class="ds__band-cell">
          <span class="ds__band-label">admitted</span>
          <span class="ds__band-value">12 Aug 2024</span>
          <span class="ds__band-meta">22:14 via ER</span>
        </div>
        <div class="ds__band-cell">
          <span class="ds__band-label">discharged</span>
          <span class="ds__band-value">17 Aug 2024</span>
          <span class="ds__band-meta">11:30 home</span>
        </div>
        <div class="ds__band-cell">
          <span class="ds__band-label">length of stay</span>
          <span class="ds__band-value">5 days</span>
          <span class="ds__band-meta">DRG est: 4–6d</span>
        </div>
        <div class="ds__band-cell">
          <span class="ds__band-label">disposition</span>
          <span class="ds__band-value">Home · stable</span>
          <span class="ds__band-meta">f/u OPD 7 days</span>
        </div>
      </div>

      <div class="ds__body">
        <div class="ds__sect">
          <div class="ds__sect-h">Diagnoses<small>ICD-10</small></div>
          <div class="ds__sect-body">
            <div class="ds__dx-list">
              <div class="ds__dx-item"><span class="ds__dx-icd">I50.1</span><span class="ds__dx-name">Acute left ventricular failure with pulmonary edema</span><span class="ds__dx-tag ds__dx-tag--prim">primary</span></div>
              <div class="ds__dx-item"><span class="ds__dx-icd">I10</span><span class="ds__dx-name">Essential (primary) hypertension</span><span class="ds__dx-tag ds__dx-tag--sec">comorbid</span></div>
              <div class="ds__dx-item"><span class="ds__dx-icd">E11.9</span><span class="ds__dx-name">Type 2 diabetes mellitus without complications</span><span class="ds__dx-tag ds__dx-tag--sec">comorbid</span></div>
              <div class="ds__dx-item"><span class="ds__dx-icd">N17.9</span><span class="ds__dx-name">Acute kidney injury, unspecified — resolved D/C</span><span class="ds__dx-tag ds__dx-tag--comp">complication</span></div>
            </div>
          </div>
        </div>

        <div class="ds__sect">
          <div class="ds__sect-h">Brief history<small>HPI · admission</small></div>
          <div class="ds__sect-body">62-yo female with hx HTN, T2DM presented to ER 12 Aug 22:14 c/o <strong>progressive dyspnea × 3 days</strong>, orthopnea, ankle swelling. On admission: BP 168/95, HR 118, RR 28, SpO₂ 88% on RA. Bibasilar crackles, JVD, 2+ pitting edema BLE. CXR: bilateral infiltrates c/w pulmonary edema. NT-proBNP 4,820. Echo EF 35% (new, prior 55%).</div>
        </div>

        <div class="ds__sect">
          <div class="ds__sect-h">Hospital course<small>day-by-day</small></div>
          <div class="ds__sect-body"><strong>Day 1–2:</strong> Treated with IV furosemide 40 mg q12h, NTG drip titrated, O₂ supplementation. Diuresed −2.1 L net. Symptoms improved.<br><strong>Day 3:</strong> Acute episode pulmonary edema 14:32, responded to STAT furosemide push. ID consult: started ceftriaxone for suspected concurrent pneumonia (procalcitonin 1.8).<br><strong>Day 4:</strong> Transitioned to oral diuretics. Renal function recovered (Cr 1.0 from peak 1.6).<br><strong>Day 5:</strong> Stable on oral regimen, ambulating without dyspnea, SpO₂ 96% RA. Discharge planning completed.</div>
        </div>

        <div class="ds__sect">
          <div class="ds__sect-h">Procedures<small>CPT</small></div>
          <div class="ds__sect-body">
            • <strong>Echocardiogram</strong> (93306) — 13 Aug · EF 35%, mod diastolic dysfunction<br>
            • <strong>Foley catheterization</strong> (51702) — 14 Aug · removed 16 Aug<br>
            • <strong>Peripheral IV access</strong> × 2 — 12 Aug, 14 Aug
          </div>
        </div>

        <div class="ds__sect">
          <div class="ds__sect-h">Discharge medications<small>see attached reconciliation</small></div>
          <div class="ds__sect-body">
            <strong>New:</strong> Furosemide 40 mg PO BID · Carvedilol 6.25 mg PO BID · Lisinopril 10 mg PO daily · Spironolactone 25 mg PO daily<br>
            <strong>Continued:</strong> Metformin 1 g PO BID · ASA 81 mg PO daily<br>
            <strong>Stopped:</strong> Amlodipine 10 mg (replaced by ACE-I)
          </div>
        </div>

        <div class="ds__sect">
          <div class="ds__sect-h">Patient instructions<small>คำแนะนำผู้ป่วย</small></div>
          <div class="ds__sect-body">
            <div class="ds__instr">
              <div class="ds__instr-row"><div class="ds__instr-num">1</div><div class="ds__instr-text"><strong>ทานยาตามคำสั่งทุกมื้อ</strong> — ห้ามขาดยาขับปัสสาวะ ทานช่วงเช้าเพื่อไม่รบกวนการนอน</div></div>
              <div class="ds__instr-row"><div class="ds__instr-num">2</div><div class="ds__instr-text"><strong>จำกัดน้ำดื่ม 1.5 L/วัน</strong> · เกลือ &lt; 2 g/วัน · ชั่งน้ำหนักทุกเช้าก่อนอาหาร</div></div>
              <div class="ds__instr-row"><div class="ds__instr-num">3</div><div class="ds__instr-text"><strong>กลับ ER ทันที</strong> หาก: หายใจลำบาก / น้ำหนักขึ้น &gt; 1 kg ใน 1 วัน / บวมเพิ่ม / เจ็บหน้าอก</div></div>
              <div class="ds__instr-row"><div class="ds__instr-num">4</div><div class="ds__instr-text"><strong>นัดติดตาม</strong> Cardiology OPD 24 Aug 09:00 · Lab BUN/Cr/K 7 วันก่อนนัด</div></div>
              <div class="ds__instr-row"><div class="ds__instr-num">5</div><div class="ds__instr-text"><strong>กิจกรรม</strong> เดินเรียบ ๆ ได้ · งดยกของหนัก × 2 สัปดาห์ · งดออกกำลังหนักจนกว่าหมอจะอนุญาต</div></div>
            </div>
          </div>
        </div>

        <div class="ds__sect">
          <div class="ds__sect-h">Condition at D/C<small>ผลการรักษา</small></div>
          <div class="ds__sect-body"><strong>Improved · stable.</strong> VS at D/C: BP 124/76, HR 78, RR 16, SpO₂ 97% RA. Ambulating independently. Tolerating regular cardiac diet. Verbalizes understanding of medications and follow-up plan. Family present at discharge teaching.</div>
        </div>
      </div>

      <div class="ds__sigrow">
        <div class="ds__sig">
          <div class="ds__sig-cap">Attending physician</div>
          <div class="ds__sig-mark">K. Watcharapong</div>
          <div class="ds__sig-name">Dr. Kittisak Watcharapong</div>
          <div class="ds__sig-meta">License 12345 · 17 Aug 11:25</div>
        </div>
        <div class="ds__sig">
          <div class="ds__sig-cap">Discharging RN</div>
          <div class="ds__sig-mark">N. Saetang</div>
          <div class="ds__sig-name">RN Niran Saetang</div>
          <div class="ds__sig-meta">RN-67890 · 17 Aug 11:30</div>
        </div>
        <div class="ds__sig">
          <div class="ds__sig-cap">Patient / family acknowledgment</div>
          <div class="ds__sig-mark" style="font-style:italic; opacity:0.85;">S. Phongsri</div>
          <div class="ds__sig-name">Suda Phongsri</div>
          <div class="ds__sig-meta">Pt · 17 Aug 11:30 · received copy</div>
        </div>
      </div>

      <div class="ds__foot">
        <div class="ds__foot-meta">PDF · A4 · 2 pages · digitally signed · audit hash 4f8a…b21c</div>
        <div class="ds__btn-row">
          <button class="ds__btn">Email to patient</button>
          <button class="ds__btn">Print A4</button>
          <button class="ds__btn ds__btn--primary">Download PDF</button>
        </div>
      </div>`;

    return section('ds','76','Discharge summary',
      'ใบสรุปการรักษาแบบ A4-print + e-signed · 4-cell admission band (in/out/LOS/disposition) · ICD-coded diagnosis list w/ priority tag · day-by-day hospital course · เลขเรียงคำแนะนำผู้ป่วยภาษาไทย · 3-signature block (MD, RN, Pt acknowledgment).',
      sub('Final discharge document', demo(card)));
  });
})();
