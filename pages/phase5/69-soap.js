/* #69 Clinical note (SOAP) */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function soapSection(){
    const card = h('div', {class:'soap'});
    card.innerHTML = `
      <div class="soap__head">
        <div>
          <div class="soap__title">Progress note · SOAP</div>
          <div class="soap__meta">นางสุดา ปัญญาดี · HN 6712-3344 · IPD bed 4-12 · 2024-08-14 · 14:45 · day 3</div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:4px">
          <span class="soap__status">Draft · auto-saved</span>
          <span style="font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle)">Note ID · NOTE-2024-08-14-7841</span>
        </div>
      </div>

      <div class="soap__body">
        <div class="soap__lane"><span class="soap__letter">S</span><span class="soap__lane-label">Subjective</span></div>
        <div class="soap__content">
          ผู้ป่วยรู้สึก<strong>ดีขึ้นเล็กน้อย</strong>เมื่อเช้านี้ ไอน้อยลง เสมหะใสขึ้น ยังมีเหนื่อยเวลาเดิน 10 ก้าว · รับประทานอาหารได้ ~50% ของถาด · นอนหลับไม่สนิทเพราะไอตอนกลางคืน ~3 ครั้ง
          <span class="soap__quote">"คุณหมอคะ ตอนนี้หายใจได้ดีขึ้น ไม่ค่อยเจ็บอกแล้วค่ะ แต่ยังเหนื่อยเวลาเดินไปห้องน้ำ"</span>
          ROS · denies chest pain, palpitation, hemoptysis · admits mild fatigue, decreased appetite. Pain <em>3/10</em> at chest (was 6/10 yesterday).
        </div>

        <div class="soap__lane"><span class="soap__letter">O</span><span class="soap__lane-label">Objective</span></div>
        <div class="soap__content">
          <strong>Vital signs · 14:32</strong>
          <div class="soap__vit-row">
            <span class="soap__vit-pill">T <strong>37.5°C</strong></span>
            <span class="soap__vit-pill soap__vit-pill--alert">BP <strong>138/86</strong></span>
            <span class="soap__vit-pill">HR <strong>88</strong></span>
            <span class="soap__vit-pill">RR <strong>18</strong></span>
            <span class="soap__vit-pill">SpO₂ <strong>96% RA</strong></span>
            <span class="soap__vit-pill">I/O <strong>1850/1640</strong></span>
          </div>
          <strong>PE</strong> · alert, oriented ×3, NAD · <strong>Lungs</strong> · crackles RLL improved, no wheeze · <strong>CV</strong> · RRR no m/r/g · <strong>Abd</strong> · soft, BS+ · <strong>Ext</strong> · no edema, pulses 2+ ·
          <strong>Labs (15:18)</strong> · WBC <span class="soap__token soap__token--alert">14.2 H</span> ↘ from 18.6 · CRP <span class="soap__token">82 → 54</span> · Cr <span class="soap__token soap__token--alert">2.1 H</span> stable · Lactate <span class="soap__token">1.4</span> ·
          <strong>CXR (today)</strong> · RLL infiltrate decreased ~30% vs admission · no effusion · <strong>Cultures</strong> · S. pneumoniae sensitive ceftriaxone (final).
        </div>

        <div class="soap__lane"><span class="soap__letter">A</span><span class="soap__lane-label">Assessment</span></div>
        <div class="soap__content">
          ผู้ป่วยหญิง 62 ปี admitted with community-acquired pneumonia, RLL · day 3 IV ceftriaxone · clinically <strong>improving</strong> (afebrile trend, decreasing WBC/CRP, radiographic improvement, ↓ O₂ requirement). Ongoing comorbid issues require continued monitoring.
          <ol class="soap__plist">
            <li class="soap__pitem">
              <div class="soap__pnum">1</div>
              <div>
                <div class="soap__pdx">CAP, RLL · S. pneumoniae confirmed <span class="soap__pdx-code">J13 · ICD-10</span></div>
                <div style="font-size:11px; color:var(--ax-text-subtle); font-family:var(--ax-font-mono)">Improving · target 7-day course total · de-escalate to PO once afebrile 48h.</div>
              </div>
            </li>
            <li class="soap__pitem">
              <div class="soap__pnum">2</div>
              <div>
                <div class="soap__pdx">AKI on CKD-3, stable <span class="soap__pdx-code">N17.9</span></div>
                <div style="font-size:11px; color:var(--ax-text-subtle); font-family:var(--ax-font-mono)">Cr 2.1 (baseline 1.7) · likely pre-renal from sepsis · improving with hydration.</div>
              </div>
            </li>
            <li class="soap__pitem">
              <div class="soap__pnum">3</div>
              <div>
                <div class="soap__pdx">HTN, suboptimal control <span class="soap__pdx-code">I10</span></div>
                <div style="font-size:11px; color:var(--ax-text-subtle); font-family:var(--ax-font-mono)">SBP 130-150 range · resume home amlodipine, hold lisinopril until Cr &lt; 1.8.</div>
              </div>
            </li>
            <li class="soap__pitem">
              <div class="soap__pnum">4</div>
              <div>
                <div class="soap__pdx">T2DM <span class="soap__pdx-code">E11.9</span></div>
                <div style="font-size:11px; color:var(--ax-text-subtle); font-family:var(--ax-font-mono)">Glucose 140-200 on sliding scale · resume Metformin once eGFR &gt; 45.</div>
              </div>
            </li>
          </ol>
        </div>

        <div class="soap__lane"><span class="soap__letter">P</span><span class="soap__lane-label">Plan</span></div>
        <div class="soap__content">
          <ol class="soap__plist">
            <li class="soap__pitem">
              <div class="soap__pnum">1</div>
              <div>
                <div class="soap__pdx">CAP</div>
                <ul class="soap__pplan">
                  <li>Continue <strong>ceftriaxone 2g IV q24h</strong> · day 3 of 7</li>
                  <li>Repeat WBC + CRP tomorrow AM</li>
                  <li>Consider PO step-down to amox/clav if afebrile 48h</li>
                  <li>Incentive spirometry q1h while awake</li>
                </ul>
              </div>
            </li>
            <li class="soap__pitem">
              <div class="soap__pnum">2</div>
              <div>
                <div class="soap__pdx">AKI / Renal</div>
                <ul class="soap__pplan">
                  <li>Strict I/O · target +500 mL net</li>
                  <li>Daily BMP · trend Cr, K⁺</li>
                  <li>Avoid nephrotoxins · NSAIDs hold</li>
                </ul>
              </div>
            </li>
            <li class="soap__pitem">
              <div class="soap__pnum">3</div>
              <div>
                <div class="soap__pdx">Disposition / D-c planning</div>
                <ul class="soap__pplan">
                  <li>Anticipated discharge in <strong>2-3 days</strong> if clinically stable</li>
                  <li>Pharmacist to counsel on home Rx · case manager engaged for home O₂ assessment</li>
                  <li>Follow-up OPD med ในสัปดาห์หน้า · CXR in 4 weeks</li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div class="soap__foot">
        <div>Authored by · <span class="soap__author">นพ. กิตติศักดิ์ วัฒนสาคร, MD</span> · Internal Medicine · License ว.34218 · last edit 14:48:22</div>
        <div class="soap__btn-row">
          <button class="soap__btn">Insert template</button>
          <button class="soap__btn">Co-sign</button>
          <button class="soap__btn soap__btn--primary">Sign &amp; finalize</button>
        </div>
      </div>`;

    return section('soap','69','Clinical note (SOAP)',
      'โครงสร้าง SOAP ชัดเจน · S/O/A/P lane เด่นด้วยตัวอักษรใหญ่ · in-line tokens สำหรับ lab values + ICD codes · numbered problem list · plan แตกตามปัญหา · authored + sign metadata.',
      sub('IPD progress note · day 3 CAP', demo(card)));
  });
})();
