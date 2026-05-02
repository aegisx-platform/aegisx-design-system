/* #80 SBAR hand-off */
/* NOTE: innerHTML used with static hardcoded demo strings only — no user input, no XSS risk */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function sbarSection(){
    const card = h('div', {class:'sbar'});
    card.innerHTML = `
      <div class="sbar__head">
        <div class="sbar__brand">
          <div class="sbar__logo">SBAR</div>
          <div>
            <div class="sbar__title">SBAR Hand-off · แบบ SBAR Shift Hand-off</div>
            <div class="sbar__sub">Shift hand-off Day &rarr; Evening &middot; 2024-08-14 15:00</div>
          </div>
        </div>
        <div class="sbar__meta">
          <strong>Suda P. &middot; Bed 4-12</strong><br/>
          AN 67-12345 &middot; Day 3<br/>
          Ward Med-Surg 4
        </div>
      </div>

      <div class="sbar__hand">
        <span><strong>RN Niran W.</strong> (Day shift)</span>
        <span class="sbar__hand-arrow">&rarr;</span>
        <span><strong>RN Somjai K.</strong> (Evening shift)</span>
        <span style="margin-left:auto; color:var(--ax-text-subtle);">2024-08-14 &middot; 15:00</span>
      </div>

      <div class="sbar__body">

        <div class="sbar__block sbar__block--s">
          <span class="sbar__block-label sbar__block-label--s">S</span>
          <span class="sbar__block-title">Situation</span>
          <div class="sbar__content">
            Patient Suda P., 62F, Day 3 CAP, bed 4-12.<br/>
            Current status: SpO&#8322; 95% on 2L NC, stable but not fully weaned from oxygen.<br/>
            Reason for hand-off: routine shift change.
          </div>
          <div class="sbar__alert-line">&#9888;&nbsp; NRS 4/10 chest pain &middot; paracetamol given 15:00 &middot; monitor response</div>
        </div>

        <div class="sbar__block sbar__block--b">
          <span class="sbar__block-label sbar__block-label--b">B</span>
          <span class="sbar__block-title">Background</span>
          <ul class="sbar__list">
            <li>Admitted 2024-08-12 with CAP + suspected sepsis</li>
            <li>PMH: HTN, T2DM, CKD-3 &middot; allergy PCN + Sulfa</li>
            <li>Day 3 of ceftriaxone (IV) &mdash; culture pending (ID consult replied today)</li>
            <li>Previous NRS 6/10 &rarr; now 4/10 after paracetamol</li>
          </ul>
        </div>

        <div class="sbar__block sbar__block--a">
          <span class="sbar__block-label sbar__block-label--a">A</span>
          <span class="sbar__block-title">Assessment</span>
          <ul class="sbar__list">
            <li><strong>Respiratory:</strong> improving &middot; SpO&#8322; 95% on 2L &middot; RR 19</li>
            <li><strong>Pain:</strong> partially controlled &middot; NRS 4/10</li>
            <li><strong>Fever:</strong> 38.2&deg;C &middot; antipyretic given 12:00 (not yet reassessed evening)</li>
            <li><strong>Infection:</strong> WBC trending &middot; ID consult done &middot; continue ceftriaxone Day 4 tomorrow</li>
            <li><strong>Fall risk:</strong> Morse 55 HIGH &mdash; yellow band on</li>
          </ul>
        </div>

        <div class="sbar__block sbar__block--r" style="border-bottom:none;">
          <span class="sbar__block-label sbar__block-label--r">R</span>
          <span class="sbar__block-title">Recommendation</span>
          <ul class="sbar__list">
            <li>Maintain O&#8322; 2L NC &middot; wean if SpO&#8322; &gt;97% &times; 2h</li>
            <li>Reassess NRS at 18:00 &middot; escalate if &gt;5</li>
            <li>Temperature check at 17:00</li>
            <li><strong>Call MD if:</strong> SpO&#8322; &lt; 92% &middot; RR &gt; 24 &middot; NRS &gt; 7 &middot; T &gt; 39&deg;C &middot; BP &lt; 90/60</li>
            <li>Continue fall precautions &middot; bed in low position &middot; call bell within reach</li>
          </ul>
        </div>

      </div>

      <div class="sbar__pending">
        <div class="sbar__pending-title">Pending tasks</div>
        <div class="sbar__task">
          <div class="sbar__task-box"></div>
          <span>CXR result review (scheduled 15:30 Radiology)</span>
        </div>
        <div class="sbar__task">
          <div class="sbar__task-box"></div>
          <span>Blood glucose AC dinner ~17:30</span>
        </div>
        <div class="sbar__task">
          <div class="sbar__task-box sbar__task-box--done">&#10003;</div>
          <span style="color:var(--ax-text-subtle);">ID consult note received &mdash; reviewed</span>
        </div>
        <div class="sbar__task">
          <div class="sbar__task-box sbar__task-box--done">&#10003;</div>
          <span style="color:var(--ax-text-subtle);">Ceftriaxone Day 3 dose given 11:08</span>
        </div>
      </div>

      <div class="sbar__foot">
        <div>
          Handed off by <strong>RN Niran W.</strong> &nbsp;&middot;&nbsp;
          Received by <strong>RN Somjai K.</strong> &nbsp;&middot;&nbsp; 15:02
        </div>
        <div>SHA-256 &middot; c9a1 4d82 7f03 &hellip;</div>
      </div>`;

    return section('sbar','80','SBAR hand-off',
      'แบบ SBAR สำหรับ shift hand-off · Situation · Background · Assessment · Recommendation · pending tasks · critical flags.',
      sub('Shift hand-off Day → Evening \xb7 15:00', demo(card)));
  });
})();
