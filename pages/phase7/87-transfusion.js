/* #87 Blood transfusion record (2-witness) */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function btxSection(){
    const card = h('div', {class:'btx'});
    const times = ['00','15','30','45','60','75','90','105','120'];
    const bp = ['132/78','130/76','128/76','130/78','128/74','126/74','—','—','—'];
    const hr = ['86','84','85','82','80','82','—','—','—'];
    const t  = ['37.0','37.0','37.1','37.0','37.1','37.0','—','—','—'];
    const sat= ['98','98','99','99','98','99','—','—','—'];
    const states = ['ok','ok','ok','ok','ok','now','future','future','future'];

    function row(lbl, vals, alertIdx){
      return `<tr><td class="lbl">${lbl}</td>${vals.map((v,i)=>{
        let cls = states[i];
        if (alertIdx === i) cls = 'alert';
        if (v === '—') cls = 'future';
        return `<td class="${cls}">${v}</td>`;
      }).join('')}</tr>`;
    }

    card.innerHTML = `
      <div class="btx__head">
        <div class="btx__brand">
          <div class="btx__logo">BTX</div>
          <div>
            <div class="btx__title">Blood transfusion record · 2-witness verification</div>
            <div class="btx__sub">Form BB-301 v3.0 · 14 Aug 2024 · ward 4 · bed 4-12 · unit 1 of 2 PRBC</div>
          </div>
        </div>
        <div class="btx__meta">
          <strong>BTX-2024-08-14-1530</strong><br/>
          AN · 67-12345<br/>
          BB ref · BB-882471
        </div>
      </div>

      <div class="btx__unit">
        <div class="btx__u">
          <span class="btx__u-cap">unit · product</span>
          <div class="btx__u-row">
            <div class="btx__u-bag"></div>
            <div class="btx__u-info">
              <span class="btx__u-id">UNIT • R-2024-882471</span>
              <div class="btx__u-type">
                <span class="btx__u-pill btx__u-pill--abo">B Rh+</span>
                <span class="btx__u-pill" style="background:var(--ax-text-heading)">PRBC · LR</span>
              </div>
              <span class="btx__u-meta">collected 12 Aug · expires 17 Sep<br/>volume 280 mL · Hct 72% · CMV-neg · irrad. no</span>
            </div>
          </div>
        </div>
        <div class="btx__u">
          <span class="btx__u-cap">recipient · order</span>
          <div class="btx__u-row">
            <div style="width:46px; height:54px; border-radius:6px; background:var(--ax-text-heading); color:#fff; display:grid; place-items:center; font-family:var(--ax-font-mono); font-size:10px; font-weight:700; text-align:center; line-height:1.2;">PT<br/>67<br/>12345</div>
            <div class="btx__u-info">
              <span class="btx__u-id">สุดา ปัญญาดี · F · 62y</span>
              <div class="btx__u-type">
                <span class="btx__u-pill btx__u-pill--abo">B Rh+</span>
                <span class="btx__u-pill" style="background:var(--ax-info-emphasis)">XM · compatible</span>
              </div>
              <span class="btx__u-meta">order TX-1188 · 2 U PRBC for Hb 7.6<br/>indication: post-op anemia · target Hb ≥ 9</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2 witness verification -->
      <div class="btx__witness">
        <div class="btx__witness-h">
          <span class="btx__witness-t">2-witness bedside verification · before spike</span>
          <span class="btx__witness-cap">all 5 fields must match · verified 15:28</span>
        </div>
        <div class="btx__match">
          <div><span class="btx__match-cap">patient name (wristband)</span><span class="btx__match-l">SUDA PANYADEE</span></div>
          <div class="btx__match-eq">=</div>
          <div><span class="btx__match-cap">name on unit label</span><span class="btx__match-r">SUDA PANYADEE</span></div>
          <div class="btx__match-tk">✓ MATCH</div>
        </div>
        <div class="btx__match">
          <div><span class="btx__match-cap">HN / AN</span><span class="btx__match-l">HN 6712-3344 · AN 67-12345</span></div>
          <div class="btx__match-eq">=</div>
          <div><span class="btx__match-cap">label HN/AN</span><span class="btx__match-r">HN 6712-3344 · AN 67-12345</span></div>
          <div class="btx__match-tk">✓ MATCH</div>
        </div>
        <div class="btx__match">
          <div><span class="btx__match-cap">ABO / Rh recipient</span><span class="btx__match-l">B Rh+</span></div>
          <div class="btx__match-eq">=</div>
          <div><span class="btx__match-cap">ABO / Rh unit</span><span class="btx__match-r">B Rh+</span></div>
          <div class="btx__match-tk">✓ MATCH</div>
        </div>
        <div class="btx__match">
          <div><span class="btx__match-cap">unit no.</span><span class="btx__match-l">R-2024-882471</span></div>
          <div class="btx__match-eq">=</div>
          <div><span class="btx__match-cap">crossmatch slip</span><span class="btx__match-r">R-2024-882471</span></div>
          <div class="btx__match-tk">✓ MATCH</div>
        </div>
        <div class="btx__match">
          <div><span class="btx__match-cap">expiry</span><span class="btx__match-l">17 Sep 2024 (in 34 d)</span></div>
          <div class="btx__match-eq">=</div>
          <div><span class="btx__match-cap">visual integrity</span><span class="btx__match-r">no clot · no leak · no discolor</span></div>
          <div class="btx__match-tk">✓ OK</div>
        </div>
      </div>

      <!-- Rate / progress -->
      <div class="btx__sec">
        <div class="btx__sec-h"><span>Infusion · in progress</span><span class="btx__sec-cap">started 15:30 · 45 min in · ~75 min remaining</span></div>
        <div class="btx__rate">
          <div class="btx__r"><span class="btx__r-cap">rate</span><span class="btx__r-val">125 mL/h</span><span class="btx__r-meta">target 2 h infusion</span></div>
          <div class="btx__r"><span class="btx__r-cap">infused / total</span><span class="btx__r-val">95 / 280 mL</span><span class="btx__r-meta">34% of unit</span><div class="btx__r-bar"><div class="btx__r-bar-fill" style="width:34%"></div></div></div>
          <div class="btx__r"><span class="btx__r-cap">filter / line</span><span class="btx__r-val">170 µm · 18G</span><span class="btx__r-meta">R forearm · patent</span></div>
          <div class="btx__r"><span class="btx__r-cap">premed</span><span class="btx__r-val">none</span><span class="btx__r-meta">pt no h/o reaction</span></div>
        </div>
      </div>

      <!-- Vitals during transfusion -->
      <div class="btx__sec">
        <div class="btx__sec-h"><span>Vitals during transfusion · q15 min × first hour, then q30 min</span><span class="btx__sec-cap">5 of 9 done · next 18:00</span></div>
        <table class="btx__vit">
          <thead><tr><th class="lbl">min from start</th>${times.map(x=>`<th>+${x}</th>`).join('')}</tr></thead>
          <tbody>
            ${row('BP', bp)}
            ${row('HR', hr)}
            ${row('T °C', t)}
            ${row('SpO₂ %', sat)}
          </tbody>
        </table>
      </div>

      <!-- Reaction watch -->
      <div class="btx__sec">
        <div class="btx__sec-h"><span>Reaction watch · all clear at +45 min</span><span class="btx__sec-cap">stop &amp; call MD if any positive</span></div>
        <div class="btx__rx">
          <div class="btx__rxi"><div class="btx__rxi-tk">✓</div><div class="btx__rxi-text"><strong>Fever</strong> · ΔT &gt; 1°C · none</div></div>
          <div class="btx__rxi"><div class="btx__rxi-tk">✓</div><div class="btx__rxi-text"><strong>Chills / rigors</strong> · none</div></div>
          <div class="btx__rxi"><div class="btx__rxi-tk">✓</div><div class="btx__rxi-text"><strong>Hypotension</strong> · ↓ &gt; 20 mmHg · none</div></div>
          <div class="btx__rxi"><div class="btx__rxi-tk">✓</div><div class="btx__rxi-text"><strong>Urticaria / rash</strong> · none</div></div>
          <div class="btx__rxi"><div class="btx__rxi-tk">✓</div><div class="btx__rxi-text"><strong>Dyspnea / wheeze</strong> · none</div></div>
          <div class="btx__rxi"><div class="btx__rxi-tk">✓</div><div class="btx__rxi-text"><strong>Back / flank pain</strong> · none</div></div>
          <div class="btx__rxi"><div class="btx__rxi-tk">✓</div><div class="btx__rxi-text"><strong>Hemoglobinuria</strong> (red urine) · clear amber</div></div>
          <div class="btx__rxi"><div class="btx__rxi-tk">✓</div><div class="btx__rxi-text"><strong>IV site reaction</strong> · no infiltration / phlebitis</div></div>
        </div>
      </div>

      <div class="btx__sign">
        <div class="btx__sig"><span class="btx__sig-cap">witness 1 · administering RN</span><span class="btx__sig-name">RN Pim Kanchana</span><span class="btx__sig-meta">e-sign · 15:28 · ID rn-3389</span></div>
        <div class="btx__sig"><span class="btx__sig-cap">witness 2 · second RN</span><span class="btx__sig-name">RN Manee Promkam</span><span class="btx__sig-meta">e-sign · 15:28 · ID rn-2104 · charge</span></div>
        <div class="btx__sig"><span class="btx__sig-cap">ordering physician</span><span class="btx__sig-name">Dr. Niran Kalyanon, MD</span><span class="btx__sig-meta">order TX-1188 · 14 Aug 14:50</span></div>
      </div>

      <div class="btx__foot">
        <div class="btx__foot-meta">AABB / TRSA standard · keep unit segment for 7 d post-tx · empty bag to BB after completion</div>
        <div style="display:flex; gap:6px;">
          <button class="btx__btn">Print log</button>
          <button class="btx__btn btx__btn--danger">⏹ STOP &amp; report reaction</button>
          <button class="btx__btn btx__btn--primary">✓ Mark unit complete</button>
        </div>
      </div>`;

    return section('btx','87','Blood transfusion record · 2-witness',
      'แบบฟอร์มให้เลือด · 2-side unit/recipient card with bag/wristband icons · 5-field 2-witness verification grid (= MATCH tokens) · 4-block infusion rate panel + progress bar · vitals table q15min × 9 cells · 8-item reaction-watch checklist · 3-signature panel (RN ×2 witnesses + ordering MD) · STOP &amp; report button.',
      sub('Unit 1 of 2 PRBC · 45 min in · all-clear · next vitals 18:00', demo(card)));
  });
})();
