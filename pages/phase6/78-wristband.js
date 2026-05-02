/* #78 Patient wristband */
/* NOTE: innerHTML used with static hardcoded demo strings only — no user input, no XSS risk */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function wristbandSection(){
    const card = h('div', {class:'wb'});
    card.innerHTML = `
      <div class="wb__head">
        <div class="wb__brand">
          <div class="wb__logo">ID<br>BAND</div>
          <div>
            <div class="wb__title">Patient ID / Wristband · แถบข้อมือผู้ป่วย</div>
            <div class="wb__sub">ID band + Allergy band · 25mm &times; 280mm thermal · print-ready</div>
          </div>
        </div>
        <div class="wb__meta">
          <strong>HN · 6712-3344</strong><br/>
          AN · 67-12345<br/>
          Ward Med-Surg 4 · Bed 4-12
        </div>
      </div>

      <div class="wb__bands">

        <div class="wb__band wb__band--id">
          <div class="wb__patient-name">สุดา ปัญญาดี &nbsp;/&nbsp; Suda Panyadee</div>
          <div class="wb__detail">DOB: 1962-04-18 &middot; 62Y F</div>
          <div class="wb__detail">HN: 6712-3344 &nbsp;&middot;&nbsp; AN: 67-12345</div>
          <div class="wb__detail">Ward: Med-Surg 4 &nbsp;&middot;&nbsp; Bed: 4-12</div>
          <div class="wb__barcode">|||&thinsp;|&thinsp;||&thinsp;|||&thinsp;|&thinsp;|&thinsp;||&thinsp;||||&thinsp;|&thinsp;|||&thinsp;||&thinsp;|&thinsp;||||&thinsp;||&thinsp;|&thinsp;|||&thinsp;|&thinsp;||&thinsp;||||&thinsp;|&thinsp;|&thinsp;||&thinsp;|||&thinsp;|</div>
          <div class="wb__barcode-num">67123344-ADM-20240812</div>
        </div>

        <div class="wb__band wb__band--allergy">
          <div class="wb__allergy-icon">&#9888;</div>
          <div class="wb__patient-name wb__patient-name--alert">ALLERGY &nbsp;/&nbsp; แพ้ยา</div>
          <div class="wb__allergy-drugs">PCN &middot; Sulfa</div>
          <div class="wb__detail" style="color:var(--ax-error-emphasis); margin-top:6px;">HN: 6712-3344</div>
        </div>

      </div>

      <div class="wb__info-boxes">
        <div class="wb__info-box">
          <strong>Print instructions</strong>
          Use label printer LP-4 &middot; 25mm &times; 280mm thermal &middot; 2 copies
        </div>
        <div class="wb__info-box">
          <strong>Verification required</strong>
          Verify with patient verbally before applying band
        </div>
      </div>

      <div class="wb__foot">
        <div style="font-size:10px; font-family:var(--ax-font-mono); color:var(--ax-text-subtle);">
          Printed: 2024-08-12 09:22 &middot; RN Niran W.
        </div>
        <div class="wb__btn-row">
          <button class="wb__btn">Print ID band</button>
          <button class="wb__btn">Print allergy band</button>
          <button class="wb__btn wb__btn--primary">Reprint both</button>
        </div>
      </div>`;

    return section('wba','78','Patient ID / wristband',
      'แถบข้อมือผู้ป่วย · ID band + Allergy band · พร้อม barcode · print-ready layout.',
      sub('ID band + allergy band preview', demo(card)));
  });
})();
