/* #80 Bedside hand-off · SBAR */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function sbarSection(){
    const card = h('div', {class:'sbar'});
    card.innerHTML = `
      <div class="sbar__head">
        <div>
          <div class="sbar__title">Bedside hand-off · SBAR communication</div>
          <div class="sbar__sub">AN 67-12345 · Suda P. · Bed 4-12 · shift change 14 Aug 15:00</div>
        </div>
      </div>

      <div class="sbar__handoff-meta">
        <div class="sbar__hm-side">
          <span class="sbar__hm-cap">handing off · day shift</span>
          <span class="sbar__hm-name">RN Niran Saetang</span>
          <span class="sbar__hm-meta">07:00–15:00 · 4 patients</span>
        </div>
        <div class="sbar__hm-arrow">→</div>
        <div class="sbar__hm-side">
          <span class="sbar__hm-cap">receiving · evening shift</span>
          <span class="sbar__hm-name">RN Pim Kanchana</span>
          <span class="sbar__hm-meta">15:00–23:00 · 4 patients</span>
        </div>
      </div>

      <div class="sbar__tabs">
        <span class="sbar__tab sbar__tab--on">Bed 4-12 · Suda P.</span>
        <span class="sbar__tab">Bed 4-13 · Wichai R.</span>
        <span class="sbar__tab">Bed 4-15 · Malee K.</span>
        <span class="sbar__tab">Bed 4-18 · Somchai T.</span>
      </div>

      <!-- S -->
      <div class="sbar__block sbar__block--S">
        <div class="sbar__letter">
          <span class="sbar__letter-big">S</span>
          <span class="sbar__letter-cap">situation</span>
        </div>
        <div class="sbar__body">
          <div class="sbar__b-h">Situation<span class="sbar__b-h-tag">why · who · where</span></div>
          <div class="sbar__b-text">62-yo F, day 3 of admission for <strong>acute pulmonary edema with CHF</strong> (EF 35%, new). Currently stable post-acute episode at 14:32 today — responded well to STAT furosemide. On O₂ 4 LPM via NC, alert and conversing.</div>
        </div>
      </div>

      <!-- B -->
      <div class="sbar__block sbar__block--B">
        <div class="sbar__letter">
          <span class="sbar__letter-big">B</span>
          <span class="sbar__letter-cap">background</span>
        </div>
        <div class="sbar__body">
          <div class="sbar__b-h">Background<span class="sbar__b-h-tag">history · context</span></div>
          <div class="sbar__b-text">PMHx: HTN ×10y, T2DM ×8y. <strong>NKDA penicillin · sulfa</strong>. Code status: <strong>full code</strong>. Family at bedside (daughter, son). Lives alone w/ daily helper. Echo 13 Aug → EF 35%.</div>
        </div>
      </div>

      <!-- A -->
      <div class="sbar__block sbar__block--A">
        <div class="sbar__letter">
          <span class="sbar__letter-big">A</span>
          <span class="sbar__letter-cap">assessment</span>
        </div>
        <div class="sbar__body">
          <div class="sbar__b-h">Assessment<span class="sbar__b-h-tag">current · trends</span></div>
          <div class="sbar__b-text">Last vitals 14:50 (post-event +15min):</div>
          <div class="sbar__vit-row">
            <span class="sbar__vit"><span>BP</span><strong>132/78</strong></span>
            <span class="sbar__vit"><span>HR</span><strong>92</strong></span>
            <span class="sbar__vit sbar__vit--warn"><span>RR</span><strong>22</strong></span>
            <span class="sbar__vit sbar__vit--ok"><span>SpO₂</span><strong>95%</strong> O₂</span>
            <span class="sbar__vit"><span>T</span><strong>37.4°C</strong></span>
            <span class="sbar__vit"><span>Pain</span><strong>2/10</strong></span>
          </div>
          <div class="sbar__b-text">Bilateral basal crackles improved (was mid-zone). 2+ pretibial edema (was 3+). I/O 14h: in 2,150 / out 2,640 → <strong>−490 mL</strong>. Foley patent. IV L forearm patent, no signs of infiltration.</div>
        </div>
      </div>

      <!-- R -->
      <div class="sbar__block sbar__block--R">
        <div class="sbar__letter">
          <span class="sbar__letter-big">R</span>
          <span class="sbar__letter-cap">recommendation</span>
        </div>
        <div class="sbar__body">
          <div class="sbar__b-h">Recommendation<span class="sbar__b-h-tag">to-do · watch</span></div>
          <div class="sbar__items">
            <div class="sbar__item"><div class="sbar__item-bullet sbar__item-bullet--high">!</div><div class="sbar__item-text"><strong>Q1h vitals × 2 more</strong> per Dr. Kittisak post-acute order — next 16:00, 17:00</div><div class="sbar__item-meta">priority · 16:00</div></div>
            <div class="sbar__item"><div class="sbar__item-bullet sbar__item-bullet--high">!</div><div class="sbar__item-text"><strong>Monitor SpO₂</strong> — if drops &lt; 92% notify MD, titrate O₂ up to 6 LPM</div><div class="sbar__item-meta">continuous</div></div>
            <div class="sbar__item"><div class="sbar__item-bullet sbar__item-bullet--med">2</div><div class="sbar__item-text"><strong>Ceftriaxone 2 g IV</strong> due 18:00 (day 1 of 7)</div><div class="sbar__item-meta">18:00</div></div>
            <div class="sbar__item"><div class="sbar__item-bullet sbar__item-bullet--med">2</div><div class="sbar__item-text"><strong>OOB to chair × 30 min</strong> at 17:00 if tolerating</div><div class="sbar__item-meta">17:00</div></div>
            <div class="sbar__item"><div class="sbar__item-bullet sbar__item-bullet--low">3</div><div class="sbar__item-text">Daughter requested D/C planning meeting tomorrow AM</div><div class="sbar__item-meta">tomorrow</div></div>
            <div class="sbar__item"><div class="sbar__item-bullet sbar__item-bullet--low">3</div><div class="sbar__item-text">CXR scheduled 15:30 — porter will come</div><div class="sbar__item-meta">15:30</div></div>
          </div>
        </div>
      </div>

      <div class="sbar__confirm">
        <div class="sbar__cf-card">
          <div class="sbar__cf-status sbar__cf-status--done">✓</div>
          <div class="sbar__cf-info">
            <span class="sbar__cf-cap">handed off</span>
            <span class="sbar__cf-name">RN Niran Saetang</span>
            <span class="sbar__cf-meta">e-sign · 15:02 · 4 of 4 patients</span>
          </div>
        </div>
        <div class="sbar__cf-card">
          <div class="sbar__cf-status sbar__cf-status--pending">…</div>
          <div class="sbar__cf-info">
            <span class="sbar__cf-cap">awaiting acknowledge</span>
            <span class="sbar__cf-name">RN Pim Kanchana</span>
            <span class="sbar__cf-meta">2 of 4 confirmed · current pt pending</span>
          </div>
        </div>
      </div>

      <div class="sbar__foot">
        <div class="sbar__foot-meta">SBAR template · WHO patient-safety standard · estimated 4 min/pt at bedside</div>
        <div class="sbar__btn-row">
          <button class="sbar__btn">Print SBAR slip</button>
          <button class="sbar__btn">Next patient ›</button>
          <button class="sbar__btn sbar__btn--primary">✓ Acknowledge &amp; receive</button>
        </div>
      </div>`;

    return section('sbar','80','Bedside hand-off · SBAR',
      'รูปแบบส่งเวร SBAR (Situation/Background/Assessment/Recommendation) · WHO patient-safety standard · 4 ตัวอักษรใหญ่ในแถบสีต่าง · vital chips + I/O inline · prioritized to-do list (high/med/low bullets) · multi-patient tabs · 2-side handoff acknowledgment workflow.',
      sub('Day → evening shift · 4 patients', demo(card)));
  });
})();
