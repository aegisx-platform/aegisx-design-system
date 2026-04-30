/* #68 Triage / acuity scoring */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function triageSection(){
    const card = h('div', {class:'tri'});
    card.innerHTML = `
      <div class="tri__head">
        <div>
          <div class="tri__title">ED Triage · Acuity Assessment</div>
          <div class="tri__sub">Triaged 14:18 · นางสุดา ปัญญาดี · HN 6712-3344 · arrival mode walk-in</div>
        </div>
        <div class="tri__verdict">
          <div class="tri__big tri-l2">
            <div class="tri__big-num">2</div>
            <div class="tri__big-lbl">ESI</div>
          </div>
          <div class="tri__verdict-text">
            <div class="tri__verdict-h">Emergent · high risk</div>
            <div class="tri__verdict-d">Target seen by MD &lt; 10 min · resus bay 3 · tele monitor</div>
          </div>
        </div>
      </div>

      <div class="tri__scale">
        <div class="tri__scale-cell tri-l1"><span class="tri__scale-num">1</span><span class="tri__scale-lbl">Resuscitation</span><span class="tri__scale-time">immediate</span></div>
        <div class="tri__scale-cell tri-l2 tri__scale-cell--active"><span class="tri__scale-num">2</span><span class="tri__scale-lbl">Emergent</span><span class="tri__scale-time">&lt;10 min</span></div>
        <div class="tri__scale-cell tri-l3"><span class="tri__scale-num">3</span><span class="tri__scale-lbl">Urgent</span><span class="tri__scale-time">&lt;30 min</span></div>
        <div class="tri__scale-cell tri-l4"><span class="tri__scale-num">4</span><span class="tri__scale-lbl">Less urgent</span><span class="tri__scale-time">&lt;60 min</span></div>
        <div class="tri__scale-cell tri-l5"><span class="tri__scale-num">5</span><span class="tri__scale-lbl">Non-urgent</span><span class="tri__scale-time">&lt;120 min</span></div>
      </div>

      <div class="tri__body">
        <div class="tri__col">
          <div class="tri__h">ESI decision criteria</div>
          <ul class="tri__criteria">
            <li class="tri__criterion">
              <div class="tri__cri-mark">A</div>
              <div class="tri__cri-text">Requires <strong>immediate life-saving</strong> intervention? <em>(intubation, CPR, mass transfusion)</em></div>
              <div class="tri__cri-points">No</div>
            </li>
            <li class="tri__criterion tri__criterion--met">
              <div class="tri__cri-mark">B</div>
              <div class="tri__cri-text"><strong>High-risk situation</strong>? Confused/lethargic, severe pain &gt;7/10, or vital sign in danger zone</div>
              <div class="tri__cri-points">YES → ESI 2</div>
            </li>
            <li class="tri__criterion">
              <div class="tri__cri-mark">C</div>
              <div class="tri__cri-text">How many resources expected? <em>(labs, imaging, IV meds, specialist consult)</em></div>
              <div class="tri__cri-points">≥ 2</div>
            </li>
            <li class="tri__criterion tri__criterion--met">
              <div class="tri__cri-mark">D</div>
              <div class="tri__cri-text"><strong>Vital signs danger zone</strong> · age-adjusted</div>
              <div class="tri__cri-points">2 of 5</div>
            </li>
          </ul>

          <div class="tri__h" style="margin-top:14px">Chief complaint &amp; exam</div>
          <div style="font-size:12px; color:var(--ax-text-default); line-height:1.6; padding:8px 10px; background:var(--ax-background-subtle); border-radius:6px">
            <strong>"เจ็บแน่นหน้าอก ร้าวไปแขนซ้าย 45 นาที"</strong> · onset 13:30 · diaphoretic · pain 8/10 substernal pressure radiating to left arm · history HTN, T2DM, smoking 20 pack-year. Sister DM &amp; CAD.
          </div>
        </div>

        <div class="tri__col">
          <div class="tri__h">Vital signs · age 62</div>
          <div class="tri__vit-grid">
            <div class="tri__vit tri__vit--warn"><div class="tri__vit-l">BP</div><div class="tri__vit-v">168/98 <small>mmHg</small></div></div>
            <div class="tri__vit tri__vit--alert"><div class="tri__vit-l">HR</div><div class="tri__vit-v">112 <small>bpm</small></div></div>
            <div class="tri__vit"><div class="tri__vit-l">RR</div><div class="tri__vit-v">22 <small>/min</small></div></div>
            <div class="tri__vit tri__vit--warn"><div class="tri__vit-l">SpO₂</div><div class="tri__vit-v">94 <small>%</small></div></div>
            <div class="tri__vit"><div class="tri__vit-l">Temp</div><div class="tri__vit-v">37.1 <small>°C</small></div></div>
            <div class="tri__vit tri__vit--alert"><div class="tri__vit-l">Pain</div><div class="tri__vit-v">8 <small>/10</small></div></div>
          </div>

          <div class="tri__news">
            <div class="tri__news-head">
              <div class="tri__news-title">NEWS2 · early warning</div>
              <div class="tri__news-score">7 <small style="font-size:10px;color:var(--ax-warning-emphasis)">HIGH</small></div>
            </div>
            <div class="tri__news-bars">
              <div class="tri__news-bar"><div class="tri__news-bar-l">RR</div><div class="tri__news-bar-fill" data-pts="2">2</div></div>
              <div class="tri__news-bar"><div class="tri__news-bar-l">SpO₂</div><div class="tri__news-bar-fill" data-pts="1">1</div></div>
              <div class="tri__news-bar"><div class="tri__news-bar-l">O₂</div><div class="tri__news-bar-fill" data-pts="0">0</div></div>
              <div class="tri__news-bar"><div class="tri__news-bar-l">BP</div><div class="tri__news-bar-fill" data-pts="2">2</div></div>
              <div class="tri__news-bar"><div class="tri__news-bar-l">HR</div><div class="tri__news-bar-fill" data-pts="2">2</div></div>
              <div class="tri__news-bar"><div class="tri__news-bar-l">Temp</div><div class="tri__news-bar-fill" data-pts="0">0</div></div>
              <div class="tri__news-bar"><div class="tri__news-bar-l">AVPU</div><div class="tri__news-bar-fill" data-pts="0">0</div></div>
            </div>
          </div>

          <div class="tri__h" style="margin-top:14px">Auto-recommendations</div>
          <div class="tri__rec">
            <div class="tri__rec-item"><strong>STAT</strong> · ECG 12-lead within 10 min · door-to-ECG goal &lt; 10 min for chest pain</div>
            <div class="tri__rec-item"><strong>Order set</strong> · Chest pain protocol (ASA 325, troponin, CXR, IV ×2)</div>
            <div class="tri__rec-item"><strong>Notify</strong> · ED attending + cardiology fellow on-call</div>
          </div>
        </div>
      </div>`;

    return section('tri','68','Triage / acuity scoring',
      'ESI 5-level color spectrum + active level highlight · decision criteria checklist (A/B/C/D) · vital signs grid พร้อม alert state · NEWS2 sub-score แบบ stacked bars · auto-recommendations.',
      sub('ED chest-pain triage · ESI 2', demo(card)));
  });
})();
