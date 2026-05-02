/* #95 Satisfaction survey (PROMs) */
(function(){
  if (!window.AX8) return;
  const { h, section, sub, demo } = AX8;

  AX8.register(function promsSection(){
    const card = h('div', {class:'proms'});
    card.innerHTML = `
      <div class="proms__head">
        <div class="proms__brand">
          <div class="proms__logo">PRO</div>
          <div>
            <div class="proms__title">Satisfaction survey · PROMs · post-discharge</div>
            <div class="proms__sub">Form QI-305 v3.1 · sent 18 Aug 09:00 · completed 18 Aug 14:32 · channel SMS-link</div>
          </div>
        </div>
        <div class="proms__meta">
          <strong>PROM-2024-08-18-1432</strong><br/>
          AN · 67-12345 · TKA right<br/>
          ward 4 · LOS 4d
        </div>
      </div>

      <div class="proms__hero">
        <div class="proms__nps">
          <span class="proms__nps-cap">net promoter score</span>
          <span class="proms__nps-val">+62</span>
          <span class="proms__nps-band">excellent</span>
          <span class="proms__nps-meta">ward Q3 avg +48<br/>(industry &gt; +50 = excellent)</span>
        </div>
        <div class="proms__bd">
          <div class="proms__bd-h">Score breakdown · 247 responses · ward 4 · last 90 d</div>
          <div class="proms__bd-row">
            <span class="proms__bd-l">distribution</span>
            <div class="proms__bd-bar">
              <div class="proms__bd-seg proms__bd-seg--prom" style="width:71%"></div>
              <div class="proms__bd-seg proms__bd-seg--pass" style="width:20%"></div>
              <div class="proms__bd-seg proms__bd-seg--det" style="width:9%"></div>
            </div>
            <span class="proms__bd-pct">100%</span>
          </div>
          <div class="proms__bd-leg">
            <span class="lp">promoter (9–10) · 71% · 175</span>
            <span class="lpa">passive (7–8) · 20% · 49</span>
            <span class="ld">detractor (0–6) · 9% · 23</span>
          </div>
          <div class="proms__bd-row" style="margin-top:6px;">
            <span class="proms__bd-l">vs Q2 2024</span>
            <div class="proms__bd-bar">
              <div class="proms__bd-seg proms__bd-seg--prom" style="width:64%"></div>
              <div class="proms__bd-seg proms__bd-seg--pass" style="width:24%"></div>
              <div class="proms__bd-seg proms__bd-seg--det" style="width:12%"></div>
            </div>
            <span class="proms__bd-pct">+7% prom</span>
          </div>
          <div class="proms__bd-row">
            <span class="proms__bd-l">response rate</span>
            <div class="proms__bd-bar"><div class="proms__bd-seg proms__bd-seg--prom" style="width:68%"></div></div>
            <span class="proms__bd-pct">68% · 247/362</span>
          </div>
        </div>
      </div>

      <div class="proms__body">

        <!-- Likert items -->
        <div>
          <div class="proms__sec-h"><span>Core experience · 6 items · this respondent</span><span class="proms__sec-cap">1=worst · 5=best</span></div>
          <div class="proms__q">

            <div class="proms__qi">
              <div class="proms__qi-h"><div class="proms__qi-t">Overall care &amp; treatment<small>คะแนนรวมการรักษาพยาบาล</small></div><div class="proms__qi-score">5<small>/5</small></div></div>
              <div class="proms__qi-likert"><span class="proms__qi-l">1</span><span class="proms__qi-l">2</span><span class="proms__qi-l">3</span><span class="proms__qi-l">4</span><span class="proms__qi-l is-on is-on--good">5</span></div>
              <div class="proms__qi-meta"><span>ward avg 4.6</span><span>top-box ✓</span></div>
            </div>

            <div class="proms__qi">
              <div class="proms__qi-h"><div class="proms__qi-t">Doctor communication<small>หมออธิบายเข้าใจง่าย</small></div><div class="proms__qi-score">5<small>/5</small></div></div>
              <div class="proms__qi-likert"><span class="proms__qi-l">1</span><span class="proms__qi-l">2</span><span class="proms__qi-l">3</span><span class="proms__qi-l">4</span><span class="proms__qi-l is-on is-on--good">5</span></div>
              <div class="proms__qi-meta"><span>ward avg 4.5</span><span>top-box ✓</span></div>
            </div>

            <div class="proms__qi">
              <div class="proms__qi-h"><div class="proms__qi-t">Nursing responsiveness<small>พยาบาลตอบสนองเร็ว</small></div><div class="proms__qi-score">4<small>/5</small></div></div>
              <div class="proms__qi-likert"><span class="proms__qi-l">1</span><span class="proms__qi-l">2</span><span class="proms__qi-l">3</span><span class="proms__qi-l is-on is-on--good">4</span><span class="proms__qi-l">5</span></div>
              <div class="proms__qi-meta"><span>ward avg 4.4</span><span>nighttime −1</span></div>
            </div>

            <div class="proms__qi">
              <div class="proms__qi-h"><div class="proms__qi-t">Pain management<small>การจัดการความปวดได้ดี</small></div><div class="proms__qi-score">5<small>/5</small></div></div>
              <div class="proms__qi-likert"><span class="proms__qi-l">1</span><span class="proms__qi-l">2</span><span class="proms__qi-l">3</span><span class="proms__qi-l">4</span><span class="proms__qi-l is-on is-on--good">5</span></div>
              <div class="proms__qi-meta"><span>ward avg 4.3</span><span>top-box ✓</span></div>
            </div>

            <div class="proms__qi">
              <div class="proms__qi-h"><div class="proms__qi-t">Cleanliness &amp; environment<small>ความสะอาดของห้อง</small></div><div class="proms__qi-score">3<small>/5</small></div></div>
              <div class="proms__qi-likert"><span class="proms__qi-l">1</span><span class="proms__qi-l">2</span><span class="proms__qi-l is-on is-on--mid">3</span><span class="proms__qi-l">4</span><span class="proms__qi-l">5</span></div>
              <div class="proms__qi-meta"><span>ward avg 4.2</span><span>flag · re-clean</span></div>
            </div>

            <div class="proms__qi">
              <div class="proms__qi-h"><div class="proms__qi-t">Food quality<small>คุณภาพอาหาร</small></div><div class="proms__qi-score">2<small>/5</small></div></div>
              <div class="proms__qi-likert"><span class="proms__qi-l">1</span><span class="proms__qi-l is-on is-on--bad">2</span><span class="proms__qi-l">3</span><span class="proms__qi-l">4</span><span class="proms__qi-l">5</span></div>
              <div class="proms__qi-meta"><span>ward avg 3.8</span><span>flag · diet review</span></div>
            </div>
          </div>
        </div>

        <!-- Domain rollup -->
        <div>
          <div class="proms__sec-h"><span>Domain rollup · ward 4 · 90 d</span><span class="proms__sec-cap">5 domains</span></div>
          <div class="proms__dom">
            <div class="proms__d"><div class="proms__d-h"><span class="proms__d-t">Clinical care</span><span class="proms__d-v">94<small>%</small></span></div><div class="proms__d-bar"><div class="proms__d-fill" style="width:94%"></div></div><span class="proms__d-meta">232/247 ≥ 4 · top quartile</span></div>
            <div class="proms__d"><div class="proms__d-h"><span class="proms__d-t">Communication</span><span class="proms__d-v">91<small>%</small></span></div><div class="proms__d-bar"><div class="proms__d-fill" style="width:91%"></div></div><span class="proms__d-meta">Δ +4 vs Q2 · best gain</span></div>
            <div class="proms__d"><div class="proms__d-h"><span class="proms__d-t">Pain &amp; comfort</span><span class="proms__d-v">88<small>%</small></span></div><div class="proms__d-bar"><div class="proms__d-fill" style="width:88%"></div></div><span class="proms__d-meta">in target</span></div>
            <div class="proms__d"><div class="proms__d-h"><span class="proms__d-t">Environment</span><span class="proms__d-v">76<small>%</small></span></div><div class="proms__d-bar"><div class="proms__d-fill proms__d-fill--mid" style="width:76%"></div></div><span class="proms__d-meta">noise + cleanliness flagged</span></div>
            <div class="proms__d"><div class="proms__d-h"><span class="proms__d-t">Food &amp; diet</span><span class="proms__d-v">62<small>%</small></span></div><div class="proms__d-bar"><div class="proms__d-fill proms__d-fill--low" style="width:62%"></div></div><span class="proms__d-meta">action item · ID PROM-Q3-04</span></div>
            <div class="proms__d"><div class="proms__d-h"><span class="proms__d-t">Discharge readiness</span><span class="proms__d-v">86<small>%</small></span></div><div class="proms__d-bar"><div class="proms__d-fill" style="width:86%"></div></div><span class="proms__d-meta">teach-back program working</span></div>
          </div>
        </div>

        <!-- Verbatim -->
        <div>
          <div class="proms__sec-h"><span>Open feedback · this respondent</span><span class="proms__sec-cap">2 quotes</span></div>
          <div class="proms__quotes">
            <div class="proms__qu">
              <span class="proms__qu-tag">+ positive</span>
              <div class="proms__qu-text">"คุณหมอนัฐพงศ์อธิบายขั้นตอนการผ่าตัดเข่าให้ฟังจนเข้าใจ พยาบาลพิมก็ใจดีและเช็คอาการบ่อย ลูกสาวก็พักด้วยได้ทั้งคืน ประทับใจมากค่ะ"</div>
              <div class="proms__qu-by">Q11 · what did we do well · 18 Aug 14:32</div>
            </div>
            <div class="proms__qu proms__qu--neg">
              <span class="proms__qu-tag">− improvement</span>
              <div class="proms__qu-text">"อาหารอ่อนๆ จืดมาก ทานไม่ค่อยลง อยากให้มีเมนูเลือกได้บ้าง · ห้องน้ำกลิ่นเปรี้ยวตอนกลางคืน เช้าวันที่ 3"</div>
              <div class="proms__qu-by">Q12 · what to improve · 18 Aug 14:32 → routed to dietitian + housekeeping</div>
            </div>
          </div>
        </div>
      </div>

      <div class="proms__foot">
        <div class="proms__foot-meta">PROMs · 6-item Likert + NPS + 2 open · sent T+1 day after discharge · auto-flag any score ≤2 to QI for action · anonymous rollup published quarterly</div>
        <div style="display:flex; gap:6px;">
          <button class="proms__btn">Open ward dashboard</button>
          <button class="proms__btn">Route to QI committee</button>
          <button class="proms__btn proms__btn--primary">✓ Mark reviewed</button>
        </div>
      </div>`;

    return section('proms','95','Satisfaction survey · PROMs',
      'แบบสำรวจความพึงพอใจ · NPS hero panel +62 (success-tinted) + 3-row breakdown bar (promoter/passive/detractor) with vs-Q2 + response rate · 6-item Likert grid (1–5) แต่ละข้อมี top-box pill + ward avg compare (cleanliness 3 + food 2 flagged) · 6-domain rollup with progress bars (clinical/comm/pain/env/food/discharge · food 62% = action item) · 2 verbatim quotes (positive + negative routed to dietitian+housekeeping) · auto-routing footer.',
      sub('NPS +62 · top-box on 4 of 6 · food + cleanliness flagged for action', demo(card)));
  });
})();
