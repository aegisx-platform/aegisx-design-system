/* #65 Patient header / banner */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function patientHeaderSection(){
    // Full inpatient banner
    const full = h('div', {class:'pth'});
    full.innerHTML = `
      <div class="pth__top">
        <div class="pth__avatar">สป<div class="pth__avatar-status"></div></div>
        <div>
          <div class="pth__name-row">
            <span class="pth__name">นางสุดา ปัญญาดี</span>
            <span class="pth__name-en">Suda Panyadee</span>
            <span class="pth__pronouns">she/her</span>
          </div>
          <div class="pth__chips">
            <span class="pth__chip pth__chip--alert">⚠ Allergy · PCN/Sulfa</span>
            <span class="pth__chip pth__chip--alert">Fall risk</span>
            <span class="pth__chip pth__chip--warn">DNR</span>
            <span class="pth__chip pth__chip--info">Isolation · contact</span>
            <span class="pth__chip pth__chip--neutral">UC</span>
            <span class="pth__chip pth__chip--success">Verified ID</span>
          </div>
          <div class="pth__sub">
            HN <strong>6712-3344</strong> · DOB 1962-04-18 (62 ปี) · F · 158 cm / 58 kg · BMI 23.2<br/>
            Admitted <strong>2024-08-12 09:14</strong> · Day 3 · Primary Dx <strong>Pneumonia, R/O sepsis</strong>
          </div>
        </div>
        <div class="pth__actions">
          <button class="pth__btn pth__btn--primary">+ Order</button>
          <button class="pth__btn">Note</button>
          <button class="pth__btn">⋯</button>
        </div>
      </div>
      <div class="pth__loc">
        <span><strong>Bed 4-12</strong></span><span class="pth__loc-divider">·</span>
        <span>Med-Surg ward 4 · Bldg A</span><span class="pth__loc-divider">·</span>
        <span>Attending <strong>นพ. กิตติศักดิ์</strong></span><span class="pth__loc-divider">·</span>
        <span>RN <strong>นภาพร</strong></span><span class="pth__loc-divider">·</span>
        <span>Code status <strong style="color:var(--ax-error-emphasis)">DNR/DNI</strong></span>
      </div>
      <div class="pth__bottom">
        <div class="pth__cell"><div class="pth__cell-label">MRN</div><div class="pth__cell-val">6712-3344</div></div>
        <div class="pth__cell"><div class="pth__cell-label">Visit ID</div><div class="pth__cell-val">IPD-241412</div></div>
        <div class="pth__cell pth__cell--alert"><div class="pth__cell-label">NEWS2</div><div class="pth__cell-val">6 <small>medium</small></div></div>
        <div class="pth__cell"><div class="pth__cell-label">LOS</div><div class="pth__cell-val">3 <small>days</small></div></div>
        <div class="pth__cell"><div class="pth__cell-label">eGFR</div><div class="pth__cell-val">38 <small>mL/min</small></div></div>
        <div class="pth__cell"><div class="pth__cell-label">Last vitals</div><div class="pth__cell-val">14:32</div></div>
      </div>`;

    // Compact variant (sidebar / sticky header)
    const compact = h('div', {class:'pth pth--compact'});
    compact.innerHTML = `
      <div class="pth__top">
        <div class="pth__avatar">สป</div>
        <div>
          <div class="pth__name-row">
            <span class="pth__name">นางสุดา ปัญญาดี</span>
            <span class="pth__name-en" style="display:inline">62 ปี · F · HN 6712-3344</span>
          </div>
          <div class="pth__chips" style="margin-top:4px">
            <span class="pth__chip pth__chip--alert">⚠ PCN/Sulfa</span>
            <span class="pth__chip pth__chip--warn">DNR</span>
            <span class="pth__chip pth__chip--neutral">Bed 4-12</span>
          </div>
        </div>
        <div class="pth__actions">
          <button class="pth__btn pth__btn--primary">Open chart</button>
        </div>
      </div>`;

    // OPD variant - no bed
    const opd = h('div', {class:'pth'});
    opd.innerHTML = `
      <div class="pth__top">
        <div class="pth__avatar" style="background:var(--ax-info-subtle); color:var(--ax-info-emphasis)">AB</div>
        <div>
          <div class="pth__name-row">
            <span class="pth__name">นายอานนท์ บุญมี</span>
            <span class="pth__name-en">Anon Boonmee · he/him</span>
          </div>
          <div class="pth__chips">
            <span class="pth__chip pth__chip--success">NKDA</span>
            <span class="pth__chip pth__chip--neutral">Self-pay</span>
            <span class="pth__chip pth__chip--info">First visit</span>
          </div>
          <div class="pth__sub">
            HN <strong>—</strong> · pending registration · DOB 1991-11-02 (33 ปี) · M · phone 089-***-2210<br/>
            Visit type <strong>OPD walk-in</strong> · Triage ESI <strong>4</strong> · check-in 14:18
          </div>
        </div>
        <div class="pth__actions">
          <button class="pth__btn pth__btn--primary">Register</button>
          <button class="pth__btn">Triage</button>
        </div>
      </div>`;

    return section('pth','65','Patient header / banner',
      'Identity card สำหรับติดบนทุกหน้า EMR · ครบ name + ID + safety chips + location + key vitals · variant compact (sidebar) และ OPD (ยังไม่ register).',
      sub('Inpatient · compact · OPD walk-in', demo(full, compact, opd)));
  });
})();
