/* #85 Fall risk (Morse) + intervention */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function fallSection(){
    const card = h('div', {class:'fall'});
    const score = 65;
    const markPos = Math.min(100, (score/125)*100);

    card.innerHTML = `
      <div class="fall__head">
        <div class="fall__brand">
          <div class="fall__logo">FALL</div>
          <div>
            <div class="fall__title">Fall risk assessment · Morse Fall Scale</div>
            <div class="fall__sub">Form NSG-201 v3.1 · re-assessed 14 Aug 07:00 (q-shift) · post-op day 1 TKA</div>
          </div>
        </div>
        <div class="fall__meta">
          <strong>FALL-2024-08-14-0700</strong><br/>
          AN · 67-12345<br/>
          ward 4 · bed 4-12
        </div>
      </div>

      <div class="fall__hero">
        <div class="fall__score">
          <span class="fall__score-cap">total Morse score</span>
          <span class="fall__score-val">${score}</span>
          <span class="fall__score-band">⚠ HIGH RISK</span>
          <span class="fall__score-meta">≥ 45 = high risk<br/>requires high-risk protocol bundle</span>
        </div>
        <div class="fall__bands">
          <div class="fall__bands-h">Morse risk bands</div>
          <div class="fall__bands-bar">
            <div class="fall__bands-seg fall__bands-seg--low">low · 0–24</div>
            <div class="fall__bands-seg fall__bands-seg--mod">mod · 25–44</div>
            <div class="fall__bands-seg fall__bands-seg--high">high · ≥ 45</div>
            <div class="fall__bands-mark" style="left:${markPos}%" title="current 65"></div>
          </div>
          <div class="fall__bands-scale"><span>0</span><span>25</span><span>45</span><span>125</span></div>
          <div class="fall__bands-trend">
            <span><strong>13 Aug pre-op</strong> 35 (mod)</span>
            <span>→</span>
            <span><strong>14 Aug 06:00</strong> 65 (high)</span>
            <span>→</span>
            <span><strong>14 Aug 14:00 (next)</strong> due in 7 h</span>
          </div>
        </div>
      </div>

      <!-- 6 Morse criteria -->
      <div class="fall__sec">
        <div class="fall__sec-h"><span>Morse criteria · 6 items</span><span class="fall__sec-cap">tap option to score</span></div>
        <div class="fall__items">
          <div class="fall__item">
            <div class="fall__item-num">1</div>
            <div class="fall__item-q">
              <div class="fall__item-qt">History of falling (in past 3 mo)</div>
              <div class="fall__item-opts">
                <span class="fall__item-opt fall__item-opt--on">Yes · 25</span>
                <span class="fall__item-opt">No · 0</span>
              </div>
            </div>
            <div class="fall__item-pts">25</div>
          </div>

          <div class="fall__item">
            <div class="fall__item-num">2</div>
            <div class="fall__item-q">
              <div class="fall__item-qt">Secondary diagnosis (≥ 2 medical dx)</div>
              <div class="fall__item-opts">
                <span class="fall__item-opt fall__item-opt--on">Yes · 15</span>
                <span class="fall__item-opt">No · 0</span>
              </div>
            </div>
            <div class="fall__item-pts">15</div>
          </div>

          <div class="fall__item">
            <div class="fall__item-num">3</div>
            <div class="fall__item-q">
              <div class="fall__item-qt">Ambulatory aid</div>
              <div class="fall__item-opts">
                <span class="fall__item-opt">none · 0</span>
                <span class="fall__item-opt fall__item-opt--on">crutch / cane / walker · 15</span>
                <span class="fall__item-opt">furniture · 30</span>
              </div>
            </div>
            <div class="fall__item-pts">15</div>
          </div>

          <div class="fall__item">
            <div class="fall__item-num">4</div>
            <div class="fall__item-q">
              <div class="fall__item-qt">IV / heparin lock</div>
              <div class="fall__item-opts">
                <span class="fall__item-opt fall__item-opt--on">Yes · 20</span>
                <span class="fall__item-opt">No · 0</span>
              </div>
            </div>
            <div class="fall__item-pts">20</div>
          </div>

          <div class="fall__item">
            <div class="fall__item-num">5</div>
            <div class="fall__item-q">
              <div class="fall__item-qt">Gait / transferring</div>
              <div class="fall__item-opts">
                <span class="fall__item-opt">normal · 0</span>
                <span class="fall__item-opt">weak · 10</span>
                <span class="fall__item-opt fall__item-opt--on">impaired · 20</span>
              </div>
            </div>
            <div class="fall__item-pts">20</div>
          </div>

          <div class="fall__item">
            <div class="fall__item-num">6</div>
            <div class="fall__item-q">
              <div class="fall__item-qt">Mental status</div>
              <div class="fall__item-opts">
                <span class="fall__item-opt fall__item-opt--on">oriented to ability · 0</span>
                <span class="fall__item-opt">overestimates / forgets limits · 15</span>
              </div>
            </div>
            <div class="fall__item-pts fall__item-pts--zero">0</div>
          </div>
        </div>
      </div>

      <!-- Interventions -->
      <div class="fall__sec">
        <div class="fall__sec-h"><span>High-risk intervention bundle · 8 items</span><span class="fall__sec-cap">7 active · 1 pending</span></div>
        <div class="fall__int">
          <div class="fall__i"><div class="fall__i-tk">✓</div><div class="fall__i-text"><strong>Yellow wristband</strong> · fall-risk visible</div><div class="fall__i-by">RN · 06:55</div></div>
          <div class="fall__i"><div class="fall__i-tk">✓</div><div class="fall__i-text"><strong>Bed in low position</strong> · brakes locked</div><div class="fall__i-by">CG · 06:50</div></div>
          <div class="fall__i"><div class="fall__i-tk">✓</div><div class="fall__i-text"><strong>4 side rails up</strong> + bed alarm on</div><div class="fall__i-by">RN · 06:55</div></div>
          <div class="fall__i"><div class="fall__i-tk">✓</div><div class="fall__i-text"><strong>Call light in reach</strong> · educated</div><div class="fall__i-by">RN · 06:55</div></div>
          <div class="fall__i"><div class="fall__i-tk">✓</div><div class="fall__i-text"><strong>Non-skid socks</strong> on both feet</div><div class="fall__i-by">CG · 06:50</div></div>
          <div class="fall__i"><div class="fall__i-tk">✓</div><div class="fall__i-text"><strong>Toilet schedule q2h</strong> proactive</div><div class="fall__i-by">RN plan</div></div>
          <div class="fall__i"><div class="fall__i-tk">✓</div><div class="fall__i-text"><strong>Assist × 2</strong> for first OOB transfer</div><div class="fall__i-by">PT plan 09:00</div></div>
          <div class="fall__i"><div class="fall__i-tk fall__i-tk--pending">…</div><div class="fall__i-text"><strong>Family at bedside × 24 h</strong> · awaiting daughter</div><div class="fall__i-by">ETA 08:30</div></div>
        </div>
      </div>

      <!-- Recent fall history -->
      <div class="fall__sec">
        <div class="fall__sec-h"><span>Recent fall events</span><span class="fall__sec-cap">past 6 months · 1 prior</span></div>
        <div class="fall__hist">
          <div class="fall__hist-h">date</div><div class="fall__hist-h">12 May 2024</div>
          <div class="fall__hist-h">where</div><div class="fall__hist-h">home · bedroom at night, no light</div>
          <div class="fall__hist-h">injury</div><div class="fall__hist-h">L hip contusion · no Fx</div>
          <div class="fall__hist-h">med-related</div><div class="fall__hist-h">recently started zolpidem (since stopped)</div>
        </div>
      </div>

      <div class="fall__sign">
        <div class="fall__sig"><span class="fall__sig-cap">assessor</span><span class="fall__sig-name">RN Pim Kanchana</span><span class="fall__sig-meta">e-sign · 14 Aug 07:00 · q-shift</span></div>
        <div class="fall__sig"><span class="fall__sig-cap">co-sign · charge</span><span class="fall__sig-name">RN Manee · charge ward 4</span><span class="fall__sig-meta">e-sign · 14 Aug 07:05</span></div>
      </div>

      <div class="fall__foot">
        <div class="fall__foot-meta">Morse Fall Scale · score 65 / 125 · re-assess q-shift &amp; after any fall, transfer, sedation, or condition change</div>
        <div style="display:flex; gap:6px;">
          <button class="fall__btn">View 30-day trend</button>
          <button class="fall__btn">Apply intervention plan</button>
          <button class="fall__btn fall__btn--primary">✓ Save assessment</button>
        </div>
      </div>`;

    return section('fall','85','Fall risk · Morse + interventions',
      'Morse Fall Scale (6 items) · score panel ใหญ่ + risk-band bar (low/mod/high) + trend line · 3-shift trend · 6 criteria แต่ละข้อมี options + คะแนน · 8-item high-risk intervention bundle (✓/pending tokens) · prior-fall history mini-table · 2-signature panel (assessor + co-sign).',
      sub('Score 65 = HIGH · post-op day 1 · 7 of 8 interventions active', demo(card)));
  });
})();
