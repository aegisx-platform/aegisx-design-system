/* #94 Education delivery checklist (pre-discharge teaching) */
(function(){
  if (!window.AX8) return;
  const { h, section, sub, demo } = AX8;

  AX8.register(function eduSection(){
    const card = h('div', {class:'edu'});

    card.innerHTML = `
      <div class="edu__head">
        <div class="edu__brand">
          <div class="edu__logo">EDU</div>
          <div>
            <div class="edu__title">Patient education delivery · pre-discharge teaching</div>
            <div class="edu__sub">Form NSG-304 v2.0 · TKA right · target discharge 17 Aug · 14 Aug 14:00</div>
          </div>
        </div>
        <div class="edu__meta">
          <strong>EDU-2024-08-14-1400</strong><br/>
          AN · 67-12345<br/>
          ward 4 · bed 4-12
        </div>
      </div>

      <div class="edu__hero">
        <div class="edu__score">
          <span class="edu__score-cap">teaching readiness</span>
          <span class="edu__score-val">11<small style="font-size:18px; color:var(--ax-text-subtle);">/16</small></span>
          <span class="edu__score-meta">topics complete · 69%<br/>5 to go before discharge</span>
        </div>
        <div class="edu__bands">
          <div class="edu__bands-h">Domain readiness</div>
          <div class="edu__rec"><span class="edu__rec-l">Disease</span><div class="edu__rec-bar"><div class="edu__rec-fill" style="width:100%"></div></div><span class="edu__rec-pct">3/3</span></div>
          <div class="edu__rec"><span class="edu__rec-l">Medication</span><div class="edu__rec-bar"><div class="edu__rec-fill edu__rec-fill--warn" style="width:75%"></div></div><span class="edu__rec-pct">3/4</span></div>
          <div class="edu__rec"><span class="edu__rec-l">Wound &amp; PT</span><div class="edu__rec-bar"><div class="edu__rec-fill" style="width:100%"></div></div><span class="edu__rec-pct">3/3</span></div>
          <div class="edu__rec"><span class="edu__rec-l">Diet &amp; lifestyle</span><div class="edu__rec-bar"><div class="edu__rec-fill edu__rec-fill--warn" style="width:50%"></div></div><span class="edu__rec-pct">1/2</span></div>
          <div class="edu__rec"><span class="edu__rec-l">Red-flag &amp; f/u</span><div class="edu__rec-bar"><div class="edu__rec-fill edu__rec-fill--zero" style="width:25%"></div></div><span class="edu__rec-pct">1/4</span></div>
        </div>
      </div>

      <div class="edu__learner">
        <div class="edu__learner-c"><span class="edu__learner-cap">primary learner</span><span class="edu__learner-val">patient · คุณสุดา ปัญญาดี</span></div>
        <div class="edu__learner-c"><span class="edu__learner-cap">family learner</span><span class="edu__learner-val">daughter · คุณนิภาพร</span></div>
        <div class="edu__learner-c"><span class="edu__learner-cap">language</span><span class="edu__learner-val">Thai · literacy OK</span></div>
        <div class="edu__learner-c"><span class="edu__learner-cap">learning style</span><span class="edu__learner-val">demo + handout</span></div>
        <div class="edu__learner-c"><span class="edu__learner-cap">barriers</span><span class="edu__learner-val">presbyopia · brings glasses</span></div>
        <span class="edu__chip edu__chip--ok">consent obtained</span>
        <span class="edu__chip edu__chip--ok">family present</span>
        <span class="edu__chip edu__chip--warn">re-eval needed · red-flag</span>
      </div>

      <div class="edu__body">

        <!-- Disease group -->
        <div class="edu__group">
          <div class="edu__group-h"><span class="edu__group-t">Disease &amp; surgery understanding</span><span class="edu__group-cap">3 topics</span><span class="edu__group-prog edu__group-prog--full">3/3 ✓</span></div>
          <div class="edu__topics">
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>OA knee &amp; reason for TKA</strong><small>anatomy diagram · expected outcome · timeline</small></div>
              <div class="edu__t-method"><span class="is-on">talk</span><span class="is-on">handout</span><span>video</span></div>
              <div class="edu__t-tb edu__t-tb--ok">teach-back ✓</div>
              <div class="edu__t-by">RN Pim · 13/8 16:00</div>
              <div class="edu__t-tk">✓</div>
            </div>
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>What was done in OR</strong><small>implant · expected pain · drains</small></div>
              <div class="edu__t-method"><span class="is-on">talk</span><span>handout</span><span>video</span></div>
              <div class="edu__t-tb edu__t-tb--ok">teach-back ✓</div>
              <div class="edu__t-by">Dr. Nattapong · 14/8 09:30</div>
              <div class="edu__t-tk">✓</div>
            </div>
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Recovery timeline · 6-week plan</strong><small>milestones · realistic expectations</small></div>
              <div class="edu__t-method"><span class="is-on">talk</span><span class="is-on">handout</span></div>
              <div class="edu__t-tb edu__t-tb--ok">teach-back ✓</div>
              <div class="edu__t-by">RN Pim · 14/8 10:30</div>
              <div class="edu__t-tk">✓</div>
            </div>
          </div>
        </div>

        <!-- Medication group -->
        <div class="edu__group">
          <div class="edu__group-h"><span class="edu__group-t">Medication management</span><span class="edu__group-cap">4 topics</span><span class="edu__group-prog">3/4</span></div>
          <div class="edu__topics">
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Pain regimen at home</strong><small>paracetamol q6h · tramadol PRN · ladder</small></div>
              <div class="edu__t-method"><span class="is-on">talk</span><span class="is-on">handout</span><span class="is-on">demo</span></div>
              <div class="edu__t-tb edu__t-tb--ok">teach-back ✓</div>
              <div class="edu__t-by">RN Pim · 14/8 11:00</div>
              <div class="edu__t-tk">✓</div>
            </div>
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Enoxaparin SC self-injection</strong><small>thigh rotation · sharps disposal · 14-day course</small></div>
              <div class="edu__t-method"><span class="is-on">demo</span><span class="is-on">handout</span><span class="is-on">video</span></div>
              <div class="edu__t-tb edu__t-tb--ok">return-demo ✓</div>
              <div class="edu__t-by">RN Pim · 14/8 11:30</div>
              <div class="edu__t-tk">✓</div>
            </div>
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Warfarin · INR · diet stability</strong><small>vit-K consistency · bleeding signs · weekly INR</small></div>
              <div class="edu__t-method"><span class="is-on">talk</span><span class="is-on">handout</span></div>
              <div class="edu__t-tb edu__t-tb--partial">partial · re-test</div>
              <div class="edu__t-by">RD Areeya · 14/8 13:00</div>
              <div class="edu__t-tk edu__t-tk--warn">!</div>
            </div>
            <div class="edu__t">
              <div class="edu__t-tk edu__t-tk--pending">·</div>
              <div class="edu__t-text"><strong>Drug-interaction list (NSAID, antacid, herbs)</strong><small>what to avoid · pharmacist counseling</small></div>
              <div class="edu__t-method"><span>talk</span><span>handout</span></div>
              <div class="edu__t-tb edu__t-tb--na">not started</div>
              <div class="edu__t-by">scheduled 15/8 10:00</div>
              <div class="edu__t-tk edu__t-tk--pending">·</div>
            </div>
          </div>
        </div>

        <!-- Wound + PT group -->
        <div class="edu__group">
          <div class="edu__group-h"><span class="edu__group-t">Wound care &amp; physiotherapy</span><span class="edu__group-cap">3 topics</span><span class="edu__group-prog edu__group-prog--full">3/3 ✓</span></div>
          <div class="edu__topics">
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Wound dressing change at home</strong><small>hand hygiene · sterile technique · weekly</small></div>
              <div class="edu__t-method"><span class="is-on">demo</span><span class="is-on">handout</span></div>
              <div class="edu__t-tb edu__t-tb--ok">return-demo ✓</div>
              <div class="edu__t-by">RN Pim · 14/8 11:45</div>
              <div class="edu__t-tk">✓</div>
            </div>
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Quad sets · ankle pumps · ROM</strong><small>10 reps × 3/day · log book</small></div>
              <div class="edu__t-method"><span class="is-on">demo</span><span class="is-on">video</span><span class="is-on">handout</span></div>
              <div class="edu__t-tb edu__t-tb--ok">return-demo ✓</div>
              <div class="edu__t-by">PT Somchai · 14/8 09:30</div>
              <div class="edu__t-tk">✓</div>
            </div>
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Walker use · stair negotiation</strong><small>up/down strategy · home prep</small></div>
              <div class="edu__t-method"><span class="is-on">demo</span></div>
              <div class="edu__t-tb edu__t-tb--ok">return-demo ✓</div>
              <div class="edu__t-by">PT Somchai · 14/8 10:00</div>
              <div class="edu__t-tk">✓</div>
            </div>
          </div>
        </div>

        <!-- Diet + Red-flag combined preview row -->
        <div class="edu__group">
          <div class="edu__group-h"><span class="edu__group-t">Diet, red-flags &amp; follow-up</span><span class="edu__group-cap">6 topics · pending bundle</span><span class="edu__group-prog">2/6</span></div>
          <div class="edu__topics">
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Diet · soft → regular &amp; DM 1500</strong><small>portion · fiber · low-Na</small></div>
              <div class="edu__t-method"><span class="is-on">talk</span><span class="is-on">handout</span></div>
              <div class="edu__t-tb edu__t-tb--ok">teach-back ✓</div>
              <div class="edu__t-by">RD Areeya · 14/8 13:00</div>
              <div class="edu__t-tk">✓</div>
            </div>
            <div class="edu__t">
              <div class="edu__t-tk edu__t-tk--pending">·</div>
              <div class="edu__t-text"><strong>Vit-K consistency · grapefruit avoidance</strong><small>weekly food diary first month</small></div>
              <div class="edu__t-method"><span>talk</span><span>handout</span></div>
              <div class="edu__t-tb edu__t-tb--na">not started</div>
              <div class="edu__t-by">RD Areeya · 15/8</div>
              <div class="edu__t-tk edu__t-tk--pending">·</div>
            </div>
            <div class="edu__t edu__t--done">
              <div class="edu__t-tk">✓</div>
              <div class="edu__t-text"><strong>Fall prevention at home</strong><small>night light · grab bar · footwear</small></div>
              <div class="edu__t-method"><span class="is-on">talk</span><span class="is-on">handout</span></div>
              <div class="edu__t-tb edu__t-tb--ok">teach-back ✓</div>
              <div class="edu__t-by">RN Pim · 14/8 12:30</div>
              <div class="edu__t-tk">✓</div>
            </div>
            <div class="edu__t">
              <div class="edu__t-tk edu__t-tk--warn">!</div>
              <div class="edu__t-text"><strong>Red-flag signs (fever, calf pain, chest pain, bleeding)</strong><small>when to call vs ER vs 1669</small></div>
              <div class="edu__t-method"><span>talk</span><span>handout</span></div>
              <div class="edu__t-tb edu__t-tb--na">not started</div>
              <div class="edu__t-by">scheduled 15/8 PM</div>
              <div class="edu__t-tk edu__t-tk--warn">!</div>
            </div>
            <div class="edu__t">
              <div class="edu__t-tk edu__t-tk--pending">·</div>
              <div class="edu__t-text"><strong>Follow-up appointment + INR clinic</strong><small>OPD ortho 21/8 · INR 17/8</small></div>
              <div class="edu__t-method"><span>handout</span></div>
              <div class="edu__t-tb edu__t-tb--na">not started</div>
              <div class="edu__t-by">scheduled 16/8 AM</div>
              <div class="edu__t-tk edu__t-tk--pending">·</div>
            </div>
            <div class="edu__t">
              <div class="edu__t-tk edu__t-tk--pending">·</div>
              <div class="edu__t-text"><strong>Emergency contact &amp; helpline 1669</strong><small>family chain · printed card</small></div>
              <div class="edu__t-method"><span>talk</span><span>handout</span></div>
              <div class="edu__t-tb edu__t-tb--na">not started</div>
              <div class="edu__t-by">on discharge day</div>
              <div class="edu__t-tk edu__t-tk--pending">·</div>
            </div>
          </div>
        </div>

      </div>

      <div class="edu__sign">
        <div class="edu__sig"><span class="edu__sig-cap">primary educator · RN</span><span class="edu__sig-name">RN Pim Kanchana</span><span class="edu__sig-meta">e-sign · 14 Aug · q-shift update</span></div>
        <div class="edu__sig"><span class="edu__sig-cap">patient acknowledged</span><span class="edu__sig-name">คุณสุดา ปัญญาดี</span><span class="edu__sig-meta">e-sign · 14 Aug 12:30</span></div>
        <div class="edu__sig"><span class="edu__sig-cap">family acknowledged</span><span class="edu__sig-name">คุณนิภาพร · daughter</span><span class="edu__sig-meta">e-sign · 14 Aug 12:30</span></div>
      </div>

      <div class="edu__foot">
        <div class="edu__foot-meta">All red-flag + follow-up topics must be teach-back ✓ before discharge sign-off · re-attempt within 24 h on partials</div>
        <div style="display:flex; gap:6px;">
          <button class="edu__btn">Print teach-back log</button>
          <button class="edu__btn">Schedule remaining</button>
          <button class="edu__btn edu__btn--primary">✓ Save 14 Aug update</button>
        </div>
      </div>`;

    return section('edu','94','Education delivery checklist',
      'Pre-discharge teaching · 16-topic readiness panel (11/16 done) + 5-domain progress bars · learner strip (patient/family/language/style/barrier) with consent + family + re-eval chips · 4 topic groups (Disease 3/3 · Med 3/4 · Wound+PT 3/3 · Diet+RedFlag+FU 2/6) · per-topic row = check token + topic+sub + method chips (talk/handout/demo/video) + teach-back outcome chip + signed-by · 3-sig footer (RN/patient/family).',
      sub('11 of 16 done · 5 pending incl. red-flag bundle · target d/c 17 Aug', demo(card)));
  });
})();
