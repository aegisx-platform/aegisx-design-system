/* #71 Admission record */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function admissionSection(){
    const card = h('div', {class:'adm'});
    card.innerHTML = `
      <div class="adm__head">
        <div class="adm__brand">
          <div class="adm__logo">IPD</div>
          <div>
            <div class="adm__title">ใบรับเข้ารักษาผู้ป่วยใน · Inpatient Admission Record</div>
            <div class="adm__sub">Form IPD-001 v3.2 · 2024-08-12 09:14 · ward 4 (Med-Surg)</div>
          </div>
        </div>
        <div class="adm__meta">
          <strong>ADM-2024-08-12-1412</strong><br/>
          AN · 67-12345<br/>
          HN · 6712-3344
        </div>
      </div>

      <div class="adm__body">

        <div class="adm__sec">
          <div class="adm__sec-h">
            <div class="adm__sec-title"><span class="adm__sec-num">1</span>Patient identification</div>
            <span class="adm__sec-status adm__sec-status--ok">complete</span>
          </div>
          <div class="adm__sec-body">
            <div class="adm__grid adm__grid--3">
              <div class="adm__field"><div class="adm__label">Title<span class="req">*</span></div><div class="adm__val">นาง</div></div>
              <div class="adm__field"><div class="adm__label">First name (TH)<span class="req">*</span></div><div class="adm__val adm__val--big">สุดา</div></div>
              <div class="adm__field"><div class="adm__label">Last name (TH)<span class="req">*</span></div><div class="adm__val adm__val--big">ปัญญาดี</div></div>
              <div class="adm__field"><div class="adm__label">Name (EN)</div><div class="adm__val">Suda Panyadee</div></div>
              <div class="adm__field"><div class="adm__label">National ID<span class="req">*</span></div><div class="adm__val">3-1099-•••••-12-3</div></div>
              <div class="adm__field"><div class="adm__label">DOB / Age</div><div class="adm__val">1962-04-18 · <small>62 ปี 4 เดือน</small></div></div>
              <div class="adm__field"><div class="adm__label">Sex</div>
                <div class="adm__radio-row"><span class="adm__radio">M</span><span class="adm__radio adm__radio--on">F</span><span class="adm__radio">other</span></div>
              </div>
              <div class="adm__field"><div class="adm__label">Marital status</div><div class="adm__val">สมรส</div></div>
              <div class="adm__field"><div class="adm__label">Religion / Nationality</div><div class="adm__val">พุทธ · ไทย</div></div>
              <div class="adm__field"><div class="adm__label">Occupation</div><div class="adm__val">ค้าขาย</div></div>
              <div class="adm__field"><div class="adm__label">Phone</div><div class="adm__val">081-***-2210</div></div>
              <div class="adm__field"><div class="adm__label">HT / WT / BMI</div><div class="adm__val">158 / 58 / <small>23.2</small></div></div>
              <div class="adm__field adm__field--full"><div class="adm__label">Address</div><div class="adm__val">42/15 ซ.พระราม 2 ซอย 50 แขวงแสมดำ เขตบางขุนเทียน กรุงเทพฯ 10150</div></div>
            </div>
          </div>
        </div>

        <div class="adm__sec">
          <div class="adm__sec-h">
            <div class="adm__sec-title"><span class="adm__sec-num">2</span>Family / Emergency contact</div>
            <span class="adm__sec-status adm__sec-status--ok">complete</span>
          </div>
          <div class="adm__sec-body">
            <div class="adm__grid adm__grid--4">
              <div class="adm__field"><div class="adm__label">Name<span class="req">*</span></div><div class="adm__val">นายสมชาย ปัญญาดี</div></div>
              <div class="adm__field"><div class="adm__label">Relation</div><div class="adm__val">สามี</div></div>
              <div class="adm__field"><div class="adm__label">Phone<span class="req">*</span></div><div class="adm__val">081-234-5678</div></div>
              <div class="adm__field"><div class="adm__label">Decision maker</div><div class="adm__val"><span class="adm__pill adm__pill--ok">YES</span></div></div>
              <div class="adm__field"><div class="adm__label">Backup contact</div><div class="adm__val">น.ส. มาลี (ลูกสาว)</div></div>
              <div class="adm__field"><div class="adm__label">Phone</div><div class="adm__val">089-***-1102</div></div>
              <div class="adm__field"><div class="adm__label">Notify on critical</div><div class="adm__val">ทันที 24/7</div></div>
              <div class="adm__field"><div class="adm__label">Language preference</div><div class="adm__val">ไทย · อ่าน-เขียนได้</div></div>
            </div>
          </div>
        </div>

        <div class="adm__sec">
          <div class="adm__sec-h">
            <div class="adm__sec-title"><span class="adm__sec-num">3</span>Admission details</div>
            <span class="adm__sec-status adm__sec-status--ok">complete</span>
          </div>
          <div class="adm__sec-body">
            <div class="adm__grid adm__grid--3" style="margin-bottom:10px">
              <div class="adm__field"><div class="adm__label">Admission type</div>
                <div class="adm__radio-row">
                  <span class="adm__radio adm__radio--on">Emergency</span>
                  <span class="adm__radio">Elective</span>
                  <span class="adm__radio">Transfer</span>
                </div>
              </div>
              <div class="adm__field"><div class="adm__label">Source</div>
                <div class="adm__radio-row">
                  <span class="adm__radio adm__radio--on">ED</span>
                  <span class="adm__radio">OPD</span>
                  <span class="adm__radio">Direct</span>
                  <span class="adm__radio">Refer-in</span>
                </div>
              </div>
              <div class="adm__field"><div class="adm__label">Mode of arrival</div>
                <div class="adm__radio-row">
                  <span class="adm__radio">Walk</span>
                  <span class="adm__radio adm__radio--on">Wheelchair</span>
                  <span class="adm__radio">Stretcher</span>
                  <span class="adm__radio">EMS</span>
                </div>
              </div>
            </div>
            <div class="adm__grid adm__grid--3">
              <div class="adm__field"><div class="adm__label">Admit date / time</div><div class="adm__val">2024-08-12 · 09:14</div></div>
              <div class="adm__field"><div class="adm__label">Ward / Bed<span class="req">*</span></div><div class="adm__val">Med-Surg 4 · <strong>Bed 4-12</strong></div></div>
              <div class="adm__field"><div class="adm__label">Room type</div><div class="adm__val">Standard 4-bed</div></div>
              <div class="adm__field"><div class="adm__label">Attending<span class="req">*</span></div><div class="adm__val">นพ. กิตติศักดิ์ วัฒนสาคร</div></div>
              <div class="adm__field"><div class="adm__label">Service</div><div class="adm__val">Internal Medicine</div></div>
              <div class="adm__field"><div class="adm__label">Estimated LOS</div><div class="adm__val">5–7 days</div></div>
              <div class="adm__field adm__field--full"><div class="adm__label">Chief complaint</div><div class="adm__val">"ไข้สูง ไอ เหนื่อย หายใจลำบาก 3 วัน"</div></div>
              <div class="adm__field adm__field--full"><div class="adm__label">Admitting diagnosis<span class="req">*</span></div><div class="adm__val">Community-acquired pneumonia, R/O sepsis · <small>J18.9 · A41.9</small></div></div>
            </div>
          </div>
        </div>

        <div class="adm__sec">
          <div class="adm__sec-h">
            <div class="adm__sec-title"><span class="adm__sec-num">4</span>Coverage &amp; finance</div>
            <span class="adm__sec-status adm__sec-status--ok">verified</span>
          </div>
          <div class="adm__sec-body">
            <div class="adm__grid adm__grid--4">
              <div class="adm__field"><div class="adm__label">Primary scheme</div><div class="adm__val"><span class="adm__pill adm__pill--cov">UC</span> 30-baht scheme</div></div>
              <div class="adm__field"><div class="adm__label">UC ID</div><div class="adm__val">UC-44219188</div></div>
              <div class="adm__field"><div class="adm__label">Eligibility</div><div class="adm__val"><span class="adm__pill adm__pill--ok">verified 09:08</span></div></div>
              <div class="adm__field"><div class="adm__label">Hospital main</div><div class="adm__val">รพ.ศิริราช</div></div>
              <div class="adm__field"><div class="adm__label">Co-pay</div><div class="adm__val">฿ 30 / visit</div></div>
              <div class="adm__field"><div class="adm__label">Deposit</div><div class="adm__val">— <small>(waived)</small></div></div>
              <div class="adm__field"><div class="adm__label">Secondary</div><div class="adm__val adm__val--empty">none</div></div>
              <div class="adm__field"><div class="adm__label">Estimated cost</div><div class="adm__val">฿ 18,500 <small>(LOS 5d)</small></div></div>
            </div>
          </div>
        </div>

        <div class="adm__sec">
          <div class="adm__sec-h">
            <div class="adm__sec-title"><span class="adm__sec-num">5</span>Initial assessment &amp; advance directives</div>
            <span class="adm__sec-status adm__sec-status--pending">2 of 7 pending</span>
          </div>
          <div class="adm__sec-body">
            <div class="adm__grid adm__grid--2" style="margin-bottom:10px">
              <div class="adm__field"><div class="adm__label">Allergy<span class="req">*</span></div><div class="adm__val"><span class="adm__pill adm__pill--alert">PCN · Sulfa</span> severe</div></div>
              <div class="adm__field"><div class="adm__label">Current medications</div><div class="adm__val">5 home meds reconciled</div></div>
              <div class="adm__field"><div class="adm__label">Past medical history</div><div class="adm__val">HTN · T2DM · CKD-3</div></div>
              <div class="adm__field"><div class="adm__label">Past surgical history</div><div class="adm__val">Appendectomy 1995</div></div>
            </div>
            <div class="adm__check-list">
              <div class="adm__check-row adm__check-row--on"><span class="adm__check-box">✓</span><span><strong>Code status</strong> · DNR/DNI confirmed with patient + family · advance directive on file</span></div>
              <div class="adm__check-row adm__check-row--on"><span class="adm__check-box">✓</span><span><strong>Fall risk screen</strong> · Morse 55 → high risk · yellow band applied</span></div>
              <div class="adm__check-row adm__check-row--on"><span class="adm__check-box">✓</span><span><strong>Pressure injury risk</strong> · Braden 18 → moderate · Q2h reposition</span></div>
              <div class="adm__check-row adm__check-row--on"><span class="adm__check-box">✓</span><span><strong>Pain assessment</strong> · NRS 6/10 chest · documented</span></div>
              <div class="adm__check-row adm__check-row--on"><span class="adm__check-box">✓</span><span><strong>Smoking / alcohol screen</strong> · ex-smoker 5y · no alcohol</span></div>
              <div class="adm__check-row"><span class="adm__check-box"></span><span><strong>Nutrition screen</strong> · MUST score · pending dietitian</span></div>
              <div class="adm__check-row"><span class="adm__check-box"></span><span><strong>Functional / IADL baseline</strong> · pending PT consult</span></div>
            </div>
          </div>
        </div>

        <div class="adm__sec">
          <div class="adm__sec-h">
            <div class="adm__sec-title"><span class="adm__sec-num">6</span>Signatures</div>
            <span class="adm__sec-status adm__sec-status--pending">awaiting witness</span>
          </div>
          <div class="adm__sec-body">
            <div class="adm__signs">
              <div class="adm__sign-block">
                <div class="adm__sign-canvas">สุดา ปัญญาดี</div>
                <div class="adm__sign-name">Patient</div>
                <div class="adm__sign-meta">นางสุดา ปัญญาดี · 09:18</div>
              </div>
              <div class="adm__sign-block">
                <div class="adm__sign-canvas">สมชาย</div>
                <div class="adm__sign-name">Family / Decision maker</div>
                <div class="adm__sign-meta">นายสมชาย (สามี) · 09:19</div>
              </div>
              <div class="adm__sign-block">
                <div class="adm__sign-canvas adm__sign-canvas--empty">awaiting RN signature…</div>
                <div class="adm__sign-name" style="color:var(--ax-text-subtle)">Admitting RN / Witness</div>
                <div class="adm__sign-meta">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="adm__foot">
        <div class="adm__progress">
          <span>Form completion · 92%</span>
          <div class="adm__progress-bar"><div class="adm__progress-fill" style="width:92%"></div></div>
          <span>SHA-256 · a4f2 91c8 …</span>
        </div>
        <div class="adm__btn-row">
          <button class="adm__btn">Print</button>
          <button class="adm__btn">Save draft</button>
          <button class="adm__btn adm__btn--primary">Sign &amp; submit</button>
        </div>
      </div>`;

    return section('adm','71','Admission record',
      'ใบรับเข้า IPD ครบทุกส่วน · identification · family · admission details · coverage · initial assessment + advance directives · multi-party signatures · audit hash + completion progress.',
      sub('IPD admission · ED → Med-Surg', demo(card)));
  });
})();
