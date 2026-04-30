/* #63 Prescription pad (Rx) */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function rxSection(){
    const card = h('div', {class:'rx'});

    // QR placeholder pattern
    const qrCells = Array.from({length:64}, ()=>Math.random()>0.5).map((on,i)=>{
      const x = (i%8)*10, y = Math.floor(i/8)*10;
      return on?`<rect x="${x+5}" y="${y+5}" width="10" height="10" fill="var(--ax-color-zinc-900)"/>`:'';
    }).join('');
    const qr = `<svg viewBox="0 0 90 90" width="90" height="90"><rect width="90" height="90" fill="var(--ax-color-zinc-50)"/>${qrCells}<rect x="5" y="5" width="22" height="22" fill="none" stroke="var(--ax-color-zinc-900)" stroke-width="3"/><rect x="63" y="5" width="22" height="22" fill="none" stroke="var(--ax-color-zinc-900)" stroke-width="3"/><rect x="5" y="63" width="22" height="22" fill="none" stroke="var(--ax-color-zinc-900)" stroke-width="3"/></svg>`;

    card.innerHTML = `
      <div class="rx__main">
        <div class="rx__head">
          <div class="rx__brand">
            <div class="rx__logo">RX</div>
            <div>
              <div class="rx__brand-name">โรงพยาบาลศิริราช · Outpatient</div>
              <div class="rx__brand-sub">2 Wanglang Rd · Bangkok 10700 · Lic 13/2540</div>
            </div>
          </div>
          <div class="rx__id">
            <strong>RX-2024-0741-2891</strong><br/>
            Issued · 2024-08-14 14:42<br/>
            Valid until · 2024-09-14
          </div>
        </div>

        <div class="rx__pt">
          <div class="rx__pt-field"><div class="rx__pt-label">Patient</div><div class="rx__pt-val">นางสุดา ปัญญาดี</div></div>
          <div class="rx__pt-field"><div class="rx__pt-label">HN</div><div class="rx__pt-val">6712-3344</div></div>
          <div class="rx__pt-field"><div class="rx__pt-label">Age / Sex</div><div class="rx__pt-val">62 ปี · F</div></div>
          <div class="rx__pt-field"><div class="rx__pt-label">Weight</div><div class="rx__pt-val">58 kg</div></div>
          <div class="rx__pt-field"><div class="rx__pt-label">Dx</div><div class="rx__pt-val">HTN, T2DM, CKD-3</div></div>
          <div class="rx__pt-field"><div class="rx__pt-label">Allergy</div><div class="rx__pt-val" style="color:var(--ax-error-emphasis);font-weight:600">Penicillin · Sulfa</div></div>
          <div class="rx__pt-field"><div class="rx__pt-label">eGFR</div><div class="rx__pt-val">38 mL/min</div></div>
          <div class="rx__pt-field"><div class="rx__pt-label">Coverage</div><div class="rx__pt-val">UC (30 ฿)</div></div>
        </div>

        <div>
          <span class="rx__symbol">℞</span>
          <ol class="rx__items" style="margin-top:6px">
            <li class="rx__item">
              <div class="rx__item-head">
                <div><div class="rx__drug">Amlodipine 5 mg <small>(generic · Norvasc®)</small></div></div>
                <div class="rx__num">1</div>
              </div>
              <div class="rx__sig">Sig: 1 tab po qd morning · #30 tabs · refill ×2</div>
              <div class="rx__sig-th">รับประทานครั้งละ 1 เม็ด วันละ 1 ครั้ง ก่อนอาหารเช้า · จำนวน 30 เม็ด</div>
              <div class="rx__meta">
                <span>Indication · <strong>HTN</strong></span>
                <span>Days · <strong>30</strong></span>
                <span>DAW · <strong>no</strong></span>
                <span>ATC · C08CA01</span>
              </div>
            </li>

            <li class="rx__item rx__item--alert">
              <div class="rx__item-head">
                <div><div class="rx__drug">Metformin XR 500 mg <small>(Glucophage XR®)</small></div></div>
                <div class="rx__num">2</div>
              </div>
              <div class="rx__sig">Sig: 1 tab po bid c̄ meals · #60 tabs · no refill</div>
              <div class="rx__sig-th">รับประทานครั้งละ 1 เม็ด วันละ 2 ครั้ง พร้อมอาหาร · จำนวน 60 เม็ด</div>
              <div class="rx__warn">
                <span class="rx__warn-icon">!</span>
                <span><strong>Renal alert · </strong>eGFR 38 → reduce to 500 mg bid (max). Hold if eGFR &lt; 30. Reviewed by pharmacist N. Suchada, RPh.</span>
              </div>
              <div class="rx__meta">
                <span>Indication · <strong>T2DM</strong></span>
                <span>Days · <strong>30</strong></span>
                <span>Reduced dose · <strong>yes</strong></span>
                <span>ATC · A10BA02</span>
              </div>
            </li>

            <li class="rx__item">
              <div class="rx__item-head">
                <div><div class="rx__drug">Atorvastatin 20 mg <small>(Lipitor®)</small></div></div>
                <div class="rx__num">3</div>
              </div>
              <div class="rx__sig">Sig: 1 tab po qhs · #30 tabs · refill ×5</div>
              <div class="rx__sig-th">รับประทานครั้งละ 1 เม็ด ก่อนนอน · จำนวน 30 เม็ด</div>
              <div class="rx__meta">
                <span>Indication · <strong>Dyslipidemia</strong></span>
                <span>Days · <strong>30</strong></span>
                <span>Substitute OK</span>
                <span>ATC · C10AA05</span>
              </div>
            </li>
          </ol>
        </div>

        <div class="rx__sign">
          <div class="rx__doc">
            <div class="rx__sign-line">Dr. K. Wattanasak</div>
            <div class="rx__sign-label">Prescriber signature</div>
            <div style="margin-top:8px"><strong>นพ. กิตติศักดิ์ วัฒนสาคร</strong> · Internal Medicine</div>
            <div style="font-family:var(--ax-font-mono);font-size:10px;color:var(--ax-text-subtle);margin-top:1px">License ว.34218 · DEA · Sig hash a4f2…91c8</div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--ax-font-mono);font-size:10px;color:var(--ax-text-subtle);margin-bottom:4px">DIGITAL SIGNATURE</div>
            <div style="display:inline-block">${qr}</div>
            <div style="font-family:var(--ax-font-mono);font-size:9px;color:var(--ax-text-subtle);margin-top:4px">Verify @ rx.siriraj.go.th</div>
          </div>
        </div>
      </div>

      <aside class="rx__side">
        <div class="rx__side-block">
          <h4>Safety checks</h4>
          <ul class="rx__check-list">
            <li><span class="rx__check">✓</span><span>No allergy conflict (PCN/Sulfa cleared)</span></li>
            <li><span class="rx__check">✓</span><span>No drug-drug interaction</span></li>
            <li><span class="rx__check rx__check--warn">!</span><span>Renal dose adjustment applied (Metformin)</span></li>
            <li><span class="rx__check">✓</span><span>Duplicate therapy check passed</span></li>
            <li><span class="rx__check">✓</span><span>Pregnancy category · n/a</span></li>
          </ul>
        </div>
        <div class="rx__side-block">
          <h4>Dispense plan</h4>
          <ul class="rx__check-list">
            <li><span class="rx__check">✓</span><span>Pickup · OPD pharmacy window 4</span></li>
            <li><span class="rx__check">✓</span><span>Counseling required (new Metformin)</span></li>
            <li><span class="rx__check">✓</span><span>30-day supply · refills tracked in EMR</span></li>
          </ul>
        </div>
        <div class="rx__side-block">
          <h4>Cost summary</h4>
          <div class="rx__cost">
            <div class="rx__cost-row"><span>Amlodipine ×30</span><span>฿ 60.00</span></div>
            <div class="rx__cost-row"><span>Metformin XR ×60</span><span>฿ 240.00</span></div>
            <div class="rx__cost-row"><span>Atorvastatin ×30</span><span>฿ 180.00</span></div>
            <div class="rx__cost-row rx__cost-row--cov"><span>UC coverage</span><span>− ฿ 450.00</span></div>
            <div class="rx__cost-row rx__cost-row--total"><span>Patient pays</span><span>฿ 30.00</span></div>
          </div>
        </div>
      </aside>`;

    return section('rx','63','Prescription pad (Rx)',
      'รวม brand header · patient block · ℞ symbol · numbered drug items + Sig (TH/EN) · safety alerts · digital signature + QR · dispense plan + cost summary.',
      sub('OPD prescription · 3 items, 1 renal alert', demo(card)));
  });
})();
