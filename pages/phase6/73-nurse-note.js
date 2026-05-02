/* #73 Nurse's note · Focus / DAR */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function nurseNoteSection(){
    const card = h('div', {class:'nn'});
    card.innerHTML = `
      <div class="nn__head">
        <div>
          <div class="nn__title">Nurse's note · บันทึกทางการพยาบาล (Focus/DAR)</div>
          <div class="nn__sub">AN 67-12345 · Suda P. · Bed 4-12 · Day 3</div>
        </div>
        <div class="nn__filter">
          <span class="nn__filter-tab nn__filter-tab--on">all</span>
          <span class="nn__filter-tab">problem</span>
          <span class="nn__filter-tab">routine</span>
          <span class="nn__filter-tab">amend</span>
        </div>
      </div>

      <div class="nn__shift">
        <span><strong>Day shift</strong> · 07:00 — 15:00 · 2024-08-14</span>
        <span class="nn__shift-meta"><span>RN Niran S. (in-charge)</span><span>4 entries · 1 cosigned</span></span>
      </div>

      <div class="nn__entry nn__entry--problem">
        <div class="nn__time"><strong>14:35</strong><span class="nn__date">14 Aug</span></div>
        <div class="nn__focus">
          <span class="nn__focus-cat">focus</span>
          <span class="nn__focus-name">Acute pulmonary edema</span>
          <span class="nn__focus-tag nn__focus-tag--problem">problem</span>
          <span class="nn__focus-icd">ICD I50.1</span>
        </div>
        <div class="nn__dar">
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--D">D</div>
            <div class="nn__dar-text">Dyspnea, RR <span class="nn__tok nn__tok--alert">28/min</span> SpO₂ <span class="nn__tok nn__tok--alert">88%</span> on RA · bilateral crackles to mid-zone · pink frothy sputum noted. Pt anxious.<span class="nn__quote">"หายใจไม่ออก รู้สึกแน่นหน้าอกมาก"</span></div>
          </div>
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--A">A</div>
            <div class="nn__dar-text">Notified Dr. Kittisak 14:32. Position fowler's. <strong>O₂ via mask 8 LPM</strong> started. Furosemide 40 mg IV push given per STAT order 14:35. Foley catheter inserted for accurate I/O. Cardiac monitor on.</div>
          </div>
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--R">R</div>
            <div class="nn__dar-text">15 min later: RR <span class="nn__tok nn__tok--warn">22/min</span> SpO₂ <span class="nn__tok nn__tok--ok">95%</span> on O₂ mask. Urine output <span class="nn__tok">+850 mL</span> in 1h. Pt reports "หายใจดีขึ้นเยอะ". Continue Q1h monitoring × 4.</div>
          </div>
        </div>
        <div class="nn__sig">
          <div class="nn__sig-name">RN Niran S.</div>
          <div class="nn__sig-role">Reg. Nurse</div>
          <div class="nn__sig-time">e-sign 14:48</div>
          <span class="nn__sig-cosign">✓ co-sign</span>
        </div>
      </div>

      <div class="nn__entry">
        <div class="nn__time"><strong>10:00</strong><span class="nn__date">14 Aug</span></div>
        <div class="nn__focus">
          <span class="nn__focus-cat">routine</span>
          <span class="nn__focus-name">Routine round · vital signs</span>
          <span class="nn__focus-tag nn__focus-tag--routine">routine</span>
        </div>
        <div class="nn__dar">
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--D">D</div>
            <div class="nn__dar-text">Pt resting in bed, alert oriented ×3, conversing comfortably. Skin warm dry. No edema noted lower extremities. Tolerating soft diet · breakfast 80% consumed.
              <div class="nn__vitals">
                <span class="nn__vit-pill">BP <strong>132/78</strong></span>
                <span class="nn__vit-pill">HR <strong>84</strong></span>
                <span class="nn__vit-pill">RR <strong>18</strong></span>
                <span class="nn__vit-pill">T <strong>37.2°C</strong></span>
                <span class="nn__vit-pill">SpO₂ <strong>97%</strong> RA</span>
                <span class="nn__vit-pill">Pain <strong>2/10</strong></span>
              </div>
            </div>
          </div>
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--A">A</div>
            <div class="nn__dar-text">Routine vital signs taken Q4h per order. AM medications administered. Encouraged ambulation × 30 min per care plan.</div>
          </div>
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--R">R</div>
            <div class="nn__dar-text">Stable. Continue current plan. Family at bedside, education on fluid restriction reinforced.</div>
          </div>
        </div>
        <div class="nn__sig">
          <div class="nn__sig-name">RN Niran S.</div>
          <div class="nn__sig-role">Reg. Nurse</div>
          <div class="nn__sig-time">e-sign 10:12</div>
        </div>
      </div>

      <div class="nn__entry nn__entry--event">
        <div class="nn__time"><strong>08:30</strong><span class="nn__date">14 Aug</span></div>
        <div class="nn__focus">
          <span class="nn__focus-cat">goal</span>
          <span class="nn__focus-name">Mobility · OOB to chair</span>
          <span class="nn__focus-tag nn__focus-tag--goal">goal met</span>
        </div>
        <div class="nn__dar">
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--D">D</div>
            <div class="nn__dar-text">Per Dr. order: out of bed to chair × 30 min TID. Pt cooperative, expresses willingness to mobilize.</div>
          </div>
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--A">A</div>
            <div class="nn__dar-text">Assisted Pt OOB to chair with 1 staff support. Slipper-socks, walker available. Monitored SpO₂ continuous, BP at start &amp; end.</div>
          </div>
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--R">R</div>
            <div class="nn__dar-text">Tolerated 30 min in chair · SpO₂ remained <span class="nn__tok nn__tok--ok">96–98%</span> · no SOB. Returned to bed safely. <strong>Goal achieved.</strong> Schedule next: 12:30, 17:00.</div>
          </div>
        </div>
        <div class="nn__sig">
          <div class="nn__sig-name">RN Pim K.</div>
          <div class="nn__sig-role">Reg. Nurse</div>
          <div class="nn__sig-time">e-sign 09:05</div>
        </div>
      </div>

      <div class="nn__entry nn__entry--amend">
        <div class="nn__time"><strong>07:30</strong><span class="nn__date">14 Aug</span></div>
        <div class="nn__focus">
          <span class="nn__focus-cat">handoff</span>
          <span class="nn__focus-name">Shift handoff received</span>
          <span class="nn__focus-tag nn__focus-tag--routine">routine</span>
        </div>
        <div class="nn__dar">
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--D">D</div>
            <div class="nn__dar-text">Received report from night shift (RN Aoy). Pt slept 5h interrupted. No acute events overnight. NPO since midnight for AM labs (drawn 06:00).</div>
          </div>
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--A">A</div>
            <div class="nn__dar-text">Bedside check: IV site L forearm patent, no swelling. Foley not in. Bed alarm on. Call bell within reach.</div>
          </div>
          <div class="nn__dar-row"><div class="nn__dar-letter nn__dar-letter--R">R</div>
            <div class="nn__dar-text">Plan for the shift acknowledged.</div>
          </div>
          <div class="nn__amend-note">⊘ amended 14:50 — corrected typo "Foley not in" was originally mistyped as "Foley in"</div>
        </div>
        <div class="nn__sig">
          <div class="nn__sig-name">RN Niran S.</div>
          <div class="nn__sig-role">Reg. Nurse</div>
          <div class="nn__sig-time">e-sign 07:42</div>
        </div>
      </div>

      <div class="nn__foot">
        <div class="nn__foot-stats">
          <span><strong>4</strong> entries this shift</span>
          <span><strong>1</strong> problem · <strong>1</strong> goal-met</span>
          <span><strong>1</strong> amendment</span>
          <span>last sync <strong>14:50</strong></span>
        </div>
        <div class="nn__btn-row">
          <button class="nn__btn">Print shift summary</button>
          <button class="nn__btn">Add quick note</button>
          <button class="nn__btn nn__btn--primary">+ New focus</button>
        </div>
      </div>`;

    return section('nn','73',"Nurse's note (Focus/DAR)",
      'บันทึกทางการพยาบาลแบบ Focus Charting · DAR (Data/Action/Response) · 4 focus types: problem, event, routine, goal-met · inline data tokens (vitals + scores) · Pt quotes · amendment trail with original-vs-corrected · cosignature workflow.',
      sub('Day shift entries · timeline view', demo(card)));
  });
})();
