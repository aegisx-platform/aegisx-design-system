/* #78 Patient ID / Wristband */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function wristbandSection(){
    const wrap = h('div', {class:'wb'});
    wrap.innerHTML = `
      <!-- Standard wristband -->
      <div class="wb__card">
        <div class="wb__card-h">
          <span class="wb__card-title">Standard wristband</span>
          <span class="wb__card-meta">white · 25×254 mm · thermal print</span>
        </div>

        <div class="wb__band">
          <div class="wb__band-inner">
            <div class="wb__band-info">
              <div class="wb__band-name">PHONGSRI, Suda</div>
              <div class="wb__band-name-th">นางสุดา พงศ์ศรี · F · 62 ปี</div>
              <div class="wb__band-row">
                <div class="wb__band-field"><span class="wb__band-field-label">HN</span><span class="wb__band-field-value">234567</span></div>
                <div class="wb__band-field"><span class="wb__band-field-label">AN</span><span class="wb__band-field-value">67-12345</span></div>
                <div class="wb__band-field"><span class="wb__band-field-label">DOB</span><span class="wb__band-field-value">14/03/2505</span></div>
                <div class="wb__band-field"><span class="wb__band-field-label">Ward · Bed</span><span class="wb__band-field-value">IPD4 · 4-12</span></div>
              </div>
            </div>
            <div class="wb__band-barcode">
              <div class="wb__band-barcode-bars"></div>
              <span class="wb__band-barcode-id">2345670007</span>
            </div>
          </div>
        </div>

        <div class="wb__scan">
          <div class="wb__scan-icon">⌬</div>
          <div class="wb__scan-info">
            <span class="wb__scan-result">✓ matched · medication 5R verified</span>
            <span class="wb__scan-name">Suda P. · HN 234567</span>
            <span class="wb__scan-meta">scanned 14:35 · scanner ID SC-04 · RN Niran</span>
          </div>
        </div>

        <div class="wb__ck">
          <div class="wb__ck-row"><div class="wb__ck-box"></div><span class="wb__ck-label">ID 1 · name</span><span class="wb__ck-val">Phongsri, Suda</span></div>
          <div class="wb__ck-row"><div class="wb__ck-box"></div><span class="wb__ck-label">ID 2 · DOB</span><span class="wb__ck-val">14/03/2505</span></div>
          <div class="wb__ck-row"><div class="wb__ck-box"></div><span class="wb__ck-label">match · MAR</span><span class="wb__ck-val">furosemide 40 mg IV</span></div>
        </div>
      </div>

      <!-- Alert wristband -->
      <div class="wb__card">
        <div class="wb__card-h">
          <span class="wb__card-title">Alert wristband · allergy + fall risk</span>
          <span class="wb__card-meta">red stripe · diagonal hatch</span>
        </div>

        <div class="wb__band wb__band--alert">
          <span class="wb__band-alert-tag">⚠ alert</span>
          <div class="wb__band-inner">
            <div class="wb__band-info">
              <div class="wb__band-name">PHONGSRI, Suda</div>
              <div class="wb__band-name-th">นางสุดา พงศ์ศรี · F · 62 ปี</div>
              <div class="wb__band-row">
                <div class="wb__band-field"><span class="wb__band-field-label">HN</span><span class="wb__band-field-value">234567</span></div>
                <div class="wb__band-field"><span class="wb__band-field-label">AN</span><span class="wb__band-field-value">67-12345</span></div>
              </div>
              <div class="wb__band-alerts">
                <span class="wb__band-alert-pill">PCN allergy</span>
                <span class="wb__band-alert-pill">Sulfa allergy</span>
                <span class="wb__band-alert-pill">Fall risk</span>
              </div>
            </div>
            <div class="wb__band-barcode">
              <div class="wb__band-barcode-bars"></div>
              <span class="wb__band-barcode-id">2345670007</span>
            </div>
          </div>
        </div>

        <div>
          <div class="wb__card-meta" style="margin-bottom:5px;">Color-coded auxiliary bands</div>
          <div class="wb__color-row">
            <div class="wb__color-band wb__color-band--red"><span>RED</span><span class="wb__color-band-label">allergy</span></div>
            <div class="wb__color-band wb__color-band--yellow"><span>YELLOW</span><span class="wb__color-band-label">fall risk</span></div>
            <div class="wb__color-band wb__color-band--purple"><span>PURPLE</span><span class="wb__color-band-label">DNR</span></div>
            <div class="wb__color-band wb__color-band--pink"><span>PINK</span><span class="wb__color-band-label">limb alert</span></div>
            <div class="wb__color-band wb__color-band--green"><span>GREEN</span><span class="wb__color-band-label">latex allergy</span></div>
          </div>
        </div>
      </div>`;

    return section('wb','78','Patient ID / Wristband',
      'รูปแบบสายข้อมือ 2 แบบ: standard (white) + alert (diagonal red stripe + alert tag) · ข้อมูล HN/AN/DOB/Ward + barcode scan · color-coded auxiliary bands (allergy/fall/DNR/limb/latex) ตามมาตรฐานสากล · 2-identifier match checklist สำหรับ 5R medication scan workflow.',
      sub('Standard + alert wristband · scan workflow', demo(wrap)));
  });
})();
