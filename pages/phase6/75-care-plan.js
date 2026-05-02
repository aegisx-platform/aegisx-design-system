/* #75 Care plan · NANDA / NOC / NIC */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function carePlanSection(){
    const pip = (n,total=5)=>{
      let html='<div class="cp__score">';
      for(let i=1;i<=total;i++) html+=`<span class="cp__score-pip ${i<=n?'is-on':''}"></span>`;
      html+=`<span class="cp__score-num">${n}/${total}</span></div>`;
      return html;
    };

    const card = h('div', {class:'cp'});
    card.innerHTML = `
      <div class="cp__head">
        <div>
          <div class="cp__title">Nursing care plan · แผนการพยาบาล</div>
          <div class="cp__sub">AN 67-12345 · Suda P. · Bed 4-12 · Day 3 · authored RN Niran S.</div>
        </div>
        <div class="cp__meta-stats">
          <span><strong>3</strong> active dx</span>
          <span><strong>1</strong> resolved</span>
          <span>last review <strong>14:50</strong></span>
        </div>
      </div>

      <!-- Diagnosis 1 -->
      <div class="cp__dx">
        <div class="cp__dx-head">
          <div class="cp__dx-num">1</div>
          <div class="cp__dx-titlerow">
            <div class="cp__dx-name">Impaired gas exchange r/t alveolar-capillary membrane changes AEB SpO₂ 88%, dyspnea, crackles</div>
            <div class="cp__dx-name-th">การแลกเปลี่ยนก๊าซบกพร่องสัมพันธ์กับการเปลี่ยนแปลงเยื่อบุถุงลม-เส้นเลือดฝอย</div>
            <div class="cp__dx-tags">
              <span class="cp__dx-tag cp__dx-tag--nanda">NANDA 00030</span>
              <span class="cp__dx-tag cp__dx-tag--prio-high">priority 1 · high</span>
              <span class="cp__dx-tag cp__dx-tag--active">active</span>
              <span class="cp__dx-tag">acute</span>
            </div>
          </div>
          <div class="cp__dx-status"><strong>Day 3</strong><span>started 12 Aug · target resolve 17 Aug</span></div>
        </div>
        <div class="cp__body">
          <div class="cp__col">
            <div class="cp__col-h"><span>Goals · NOC</span><span class="cp__col-h-tag">3</span></div>
            <div class="cp__goal">
              <div class="cp__goal-text"><strong>Respiratory status: gas exchange</strong> — SpO₂ ≥ 95% on RA within 48h${pip(4)}</div>
              <div class="cp__goal-meta">target<br>5/5</div>
            </div>
            <div class="cp__goal">
              <div class="cp__goal-text"><strong>RR within normal</strong> 14–20/min sustained × 24h${pip(3)}</div>
              <div class="cp__goal-meta">target<br>4/5</div>
            </div>
            <div class="cp__goal">
              <div class="cp__goal-text"><strong>Pt verbalizes</strong> understanding of breathing exercises by D/C${pip(2)}</div>
              <div class="cp__goal-meta">target<br>4/5</div>
            </div>
          </div>
          <div class="cp__col">
            <div class="cp__col-h"><span>Interventions · NIC</span><span class="cp__col-h-tag">5</span></div>
            <div class="cp__int"><div class="cp__int-check is-done"></div><div class="cp__int-text"><strong>Oxygen therapy</strong> · titrate to maintain SpO₂ ≥ 95%<span class="cp__int-meta">NIC 3320 · continuous · RN</span></div></div>
            <div class="cp__int"><div class="cp__int-check is-done"></div><div class="cp__int-text"><strong>Position fowler's</strong> 45–60° during dyspnea<span class="cp__int-meta">NIC 0840 · PRN · RN</span></div></div>
            <div class="cp__int"><div class="cp__int-check is-done"></div><div class="cp__int-text"><strong>Monitor respiratory status</strong> Q1h × 4, then Q4h<span class="cp__int-meta">NIC 3350 · scheduled · RN</span></div></div>
            <div class="cp__int"><div class="cp__int-check"></div><div class="cp__int-text"><strong>Teach pursed-lip breathing</strong> · demonstrate, return-demo<span class="cp__int-meta">NIC 3300 · daily · RN/RT</span></div></div>
            <div class="cp__int"><div class="cp__int-check"></div><div class="cp__int-text"><strong>Auscultate breath sounds</strong> Q4h, document changes<span class="cp__int-meta">NIC 6680 · Q4h · RN</span></div></div>
          </div>
          <div class="cp__col">
            <div class="cp__col-h"><span>Evaluation</span><span class="cp__col-h-tag">3 entries</span></div>
            <div class="cp__eval">
              <div class="cp__eval-date">Day 3 · 14 Aug 14:50</div>
              <div class="cp__eval-text">Post-furosemide: SpO₂ 95% on O₂ mask, RR 22, crackles decreased to bases only. Pt verbalizes relief.</div>
              <span class="cp__eval-result cp__eval-result--partial">partially met</span>
            </div>
            <div class="cp__eval">
              <div class="cp__eval-date">Day 2 · 13 Aug 16:00</div>
              <div class="cp__eval-text">SpO₂ 92–94% on O₂ 3 LPM NC. RR 22–24. Continue plan, escalate if SpO₂ drops.</div>
              <span class="cp__eval-result cp__eval-result--ongoing">ongoing</span>
            </div>
            <div class="cp__eval">
              <div class="cp__eval-date">Day 1 · 12 Aug 22:00</div>
              <div class="cp__eval-text">Initial: SpO₂ 88% RA, RR 28, severe dyspnea. Plan initiated.</div>
              <span class="cp__eval-result cp__eval-result--ongoing">baseline</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Diagnosis 2 -->
      <div class="cp__dx">
        <div class="cp__dx-head">
          <div class="cp__dx-num">2</div>
          <div class="cp__dx-titlerow">
            <div class="cp__dx-name">Excess fluid volume r/t compromised regulatory mechanism AEB edema, weight gain 3 kg, crackles</div>
            <div class="cp__dx-name-th">ภาวะน้ำเกินสัมพันธ์กับกลไกควบคุมที่บกพร่อง</div>
            <div class="cp__dx-tags">
              <span class="cp__dx-tag cp__dx-tag--nanda">NANDA 00026</span>
              <span class="cp__dx-tag cp__dx-tag--prio-high">priority 1 · high</span>
              <span class="cp__dx-tag cp__dx-tag--active">active</span>
            </div>
          </div>
          <div class="cp__dx-status"><strong>Day 3</strong><span>started 12 Aug</span></div>
        </div>
        <div class="cp__body">
          <div class="cp__col">
            <div class="cp__col-h"><span>Goals · NOC</span><span class="cp__col-h-tag">2</span></div>
            <div class="cp__goal"><div class="cp__goal-text"><strong>Fluid balance</strong> — net negative 500–1000 mL/day${pip(4)}</div><div class="cp__goal-meta">target<br>5/5</div></div>
            <div class="cp__goal"><div class="cp__goal-text"><strong>No peripheral edema</strong> by D/C${pip(3)}</div><div class="cp__goal-meta">target<br>5/5</div></div>
          </div>
          <div class="cp__col">
            <div class="cp__col-h"><span>Interventions · NIC</span><span class="cp__col-h-tag">4</span></div>
            <div class="cp__int"><div class="cp__int-check is-done"></div><div class="cp__int-text"><strong>Strict I/O</strong> Q shift<span class="cp__int-meta">NIC 4120 · Q8h · RN</span></div></div>
            <div class="cp__int"><div class="cp__int-check is-done"></div><div class="cp__int-text"><strong>Fluid restriction</strong> 1500 mL/day<span class="cp__int-meta">NIC 4120 · 24h · RN/Pt</span></div></div>
            <div class="cp__int"><div class="cp__int-check is-done"></div><div class="cp__int-text"><strong>Daily weight</strong> AM same scale<span class="cp__int-meta">NIC 1260 · 06:00 · RN</span></div></div>
            <div class="cp__int"><div class="cp__int-check"></div><div class="cp__int-text"><strong>Assess edema</strong> bilateral LE Q shift<span class="cp__int-meta">NIC 4120 · Q8h · RN</span></div></div>
          </div>
          <div class="cp__col">
            <div class="cp__col-h"><span>Evaluation</span><span class="cp__col-h-tag">2 entries</span></div>
            <div class="cp__eval">
              <div class="cp__eval-date">Day 3 · 14 Aug 06:00</div>
              <div class="cp__eval-text">Wt 62.4 kg (↓0.8 from yesterday). 24h bal −940 mL. Edema 1+ pretibial.</div>
              <span class="cp__eval-result cp__eval-result--met">goal met</span>
            </div>
            <div class="cp__eval">
              <div class="cp__eval-date">Day 2 · 13 Aug 06:00</div>
              <div class="cp__eval-text">Wt 63.2 kg (↓1.2). Bal −1100 mL. Edema 2+.</div>
              <span class="cp__eval-result cp__eval-result--met">goal met</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Diagnosis 3 (resolved) -->
      <div class="cp__dx">
        <div class="cp__dx-head">
          <div class="cp__dx-num" style="background:var(--ax-success-emphasis);">✓</div>
          <div class="cp__dx-titlerow">
            <div class="cp__dx-name">Acute pain (chest) r/t myocardial ischemia AEB pain rating 7/10, diaphoresis</div>
            <div class="cp__dx-name-th">ความปวดเฉียบพลัน บริเวณหน้าอก</div>
            <div class="cp__dx-tags">
              <span class="cp__dx-tag cp__dx-tag--nanda">NANDA 00132</span>
              <span class="cp__dx-tag cp__dx-tag--prio-low cp__dx-tag--resolved">resolved</span>
            </div>
          </div>
          <div class="cp__dx-status"><strong>Resolved</strong><span>Day 2 · 13 Aug 18:00 · pain 0/10 × 24h</span></div>
        </div>
      </div>

      <div class="cp__foot">
        <div class="cp__foot-stats">
          <span><strong>3</strong> active · <strong>1</strong> resolved</span>
          <span><strong>9</strong> interventions · <strong>6</strong> done</span>
          <span><strong>5</strong> NOC goals tracked</span>
        </div>
        <div class="cp__btn-row">
          <button class="cp__btn">Print care plan</button>
          <button class="cp__btn">+ Evaluation</button>
          <button class="cp__btn cp__btn--primary">+ Add diagnosis</button>
        </div>
      </div>`;

    return section('cp','75','Care plan / Nursing diagnosis',
      'แผนการพยาบาลตามมาตรฐาน NANDA-I (diagnosis) · NOC (goals) · NIC (interventions) · 3-column body แสดงคู่ขนาน · score pips สำหรับ NOC outcome rating · checkable interventions · evaluation timeline พร้อม goal-status (met/partial/ongoing) · resolved diagnosis collapsed.',
      sub('Active diagnoses · day 3', demo(card)));
  });
})();
