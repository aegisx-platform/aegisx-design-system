/* #91 Patient/Family bedside dashboard (tablet, read-only) */
(function(){
  if (!window.AX8) return;
  const { h, section, sub, demo } = AX8;

  AX8.register(function bedsideSection(){
    const card = h('div', {class:'bds'});
    card.innerHTML = `
      <div class="bds__head">
        <div class="bds__brand">
          <div class="bds__logo">BED</div>
          <div>
            <div class="bds__title">Patient bedside dashboard · tablet view</div>
            <div class="bds__sub">Form PT-301 v2.0 · read-only · last sync 14 Aug 09:14 · room 4-12</div>
          </div>
        </div>
        <div class="bds__meta">
          <strong>BED-2024-08-14-0914</strong><br/>
          AN · 67-12345<br/>
          ward 4 · bed 4-12
        </div>
      </div>

      <div class="bds__body">

        <!-- LEFT COL -->
        <div class="bds__col">

          <!-- Greeting hero -->
          <div class="bds__hero">
            <div class="bds__hero-avatar">สด</div>
            <div>
              <div class="bds__hi-greet">good morning</div>
              <div class="bds__hi-name">คุณสุดา ปัญญาดี <span class="bds__hi-pill">post-op day 1</span></div>
              <div class="bds__hi-room">room 4-12 · TKA right · admit 13 Aug · today 14 Aug 09:14</div>
            </div>
          </div>

          <!-- Today's plan -->
          <div class="bds__sec">
            <div class="bds__sec-h"><span>Today's plan · 14 Aug</span><span class="bds__sec-cap">7 events</span></div>
            <div class="bds__plan">
              <div class="bds__p bds__p--done">
                <div class="bds__p-time">07:00<small>done</small></div>
                <div class="bds__p-text"><strong>Morning vitals &amp; pain check</strong> · BP / HR / pain score</div>
                <div class="bds__p-tag bds__p-tag--done">✓ done</div>
              </div>
              <div class="bds__p bds__p--done">
                <div class="bds__p-time">07:30<small>done</small></div>
                <div class="bds__p-text"><strong>Breakfast</strong> · soft diet · ate 60%</div>
                <div class="bds__p-tag bds__p-tag--done">✓ done</div>
              </div>
              <div class="bds__p bds__p--now">
                <div class="bds__p-time">09:30<small>now</small></div>
                <div class="bds__p-text"><strong>Physiotherapy bedside</strong> · first OOB transfer · assist × 2</div>
                <div class="bds__p-tag bds__p-tag--now">● now</div>
              </div>
              <div class="bds__p">
                <div class="bds__p-time">10:00<small>up next</small></div>
                <div class="bds__p-text"><strong>Doctor's round</strong> · Dr. Nattapong (ortho)</div>
                <div class="bds__p-tag bds__p-tag--soon">in 46 m</div>
              </div>
              <div class="bds__p">
                <div class="bds__p-time">12:00</div>
                <div class="bds__p-text"><strong>Lunch</strong> · soft diet · low salt</div>
                <div class="bds__p-tag bds__p-tag--soon">scheduled</div>
              </div>
              <div class="bds__p">
                <div class="bds__p-time">14:00</div>
                <div class="bds__p-text"><strong>Wound dressing</strong> · sterile change</div>
                <div class="bds__p-tag bds__p-tag--soon">scheduled</div>
              </div>
              <div class="bds__p">
                <div class="bds__p-time">18:00</div>
                <div class="bds__p-text"><strong>Family visit hour</strong> · daughter expected</div>
                <div class="bds__p-tag bds__p-tag--soon">scheduled</div>
              </div>
            </div>
          </div>

          <!-- Care team -->
          <div class="bds__sec">
            <div class="bds__sec-h"><span>Your care team today</span><span class="bds__sec-cap">shift 07:00–19:00</span></div>
            <div class="bds__team">
              <div class="bds__t">
                <div class="bds__t-av">นภ</div>
                <div class="bds__t-role">attending</div>
                <div class="bds__t-name">Dr. Nattapong<br/>Sirikul</div>
                <div class="bds__t-status bds__t-status--on">on round</div>
              </div>
              <div class="bds__t">
                <div class="bds__t-av">พิม</div>
                <div class="bds__t-role">primary RN</div>
                <div class="bds__t-name">RN Pim<br/>Kanchana</div>
                <div class="bds__t-status bds__t-status--on">at station</div>
              </div>
              <div class="bds__t">
                <div class="bds__t-av">สม</div>
                <div class="bds__t-role">PT</div>
                <div class="bds__t-name">PT Somchai<br/>Boonyarat</div>
                <div class="bds__t-status bds__t-status--on">at bedside</div>
              </div>
              <div class="bds__t">
                <div class="bds__t-av">มน</div>
                <div class="bds__t-role">care giver</div>
                <div class="bds__t-name">CG Manee<br/>Phromma</div>
                <div class="bds__t-status">break · 11:30</div>
              </div>
            </div>
          </div>

        </div>

        <!-- RIGHT COL -->
        <div class="bds__col">

          <!-- Vitals snapshot -->
          <div class="bds__sec">
            <div class="bds__sec-h"><span>Latest vitals · auto-sync</span><span class="bds__sec-cap">07:00 · q4h</span></div>
            <div class="bds__vit">
              <div class="bds__v">
                <span class="bds__v-cap">blood pressure</span>
                <span class="bds__v-val">128<small>/82</small></span>
                <span class="bds__v-meta">in range</span>
              </div>
              <div class="bds__v">
                <span class="bds__v-cap">heart rate</span>
                <span class="bds__v-val">82<small> bpm</small></span>
                <span class="bds__v-meta">in range</span>
              </div>
              <div class="bds__v">
                <span class="bds__v-cap">temperature</span>
                <span class="bds__v-val">37.2<small>°C</small></span>
                <span class="bds__v-meta">in range</span>
              </div>
              <div class="bds__v">
                <span class="bds__v-cap">pain score</span>
                <span class="bds__v-val">4<small>/10</small></span>
                <span class="bds__v-meta bds__v-meta--warn">mild · monitor</span>
              </div>
            </div>
          </div>

          <!-- Meds upcoming -->
          <div class="bds__sec">
            <div class="bds__sec-h"><span>Upcoming medications</span><span class="bds__sec-cap">next 12 h · 5 items</span></div>
            <div class="bds__meds">
              <div class="bds__m">
                <div class="bds__m-time">10:00</div>
                <div class="bds__m-text"><strong>Paracetamol 500 mg</strong> · 1 tab PO<small>pain · routine q6h · with food</small></div>
                <div class="bds__m-pill">PO</div>
              </div>
              <div class="bds__m">
                <div class="bds__m-time">10:00</div>
                <div class="bds__m-text"><strong>Enoxaparin 40 mg</strong> · SC<small>DVT prophylaxis · daily</small></div>
                <div class="bds__m-pill">SC</div>
              </div>
              <div class="bds__m">
                <div class="bds__m-time">14:00</div>
                <div class="bds__m-text"><strong>Tramadol 50 mg</strong> · 1 tab PO<small>pain breakthrough · q8h PRN</small></div>
                <div class="bds__m-pill">PRN</div>
              </div>
              <div class="bds__m">
                <div class="bds__m-time">18:00</div>
                <div class="bds__m-text"><strong>Cefazolin 1 g</strong> · IV<small>surgical prophylaxis · last dose</small></div>
                <div class="bds__m-pill">IV</div>
              </div>
              <div class="bds__m">
                <div class="bds__m-time">22:00</div>
                <div class="bds__m-text"><strong>Paracetamol 500 mg</strong> · 1 tab PO<small>routine q6h</small></div>
                <div class="bds__m-pill">PO</div>
              </div>
            </div>
          </div>

          <!-- Education -->
          <div class="bds__sec">
            <div class="bds__sec-h"><span>For you to learn</span><span class="bds__sec-cap">2 of 3 done</span></div>
            <div class="bds__edu">
              <div class="bds__e">
                <div class="bds__e-ico">▶</div>
                <div class="bds__e-t">After-knee-surgery exercises</div>
                <div class="bds__e-meta bds__e-meta--done">5 m · watched 13 Aug</div>
              </div>
              <div class="bds__e">
                <div class="bds__e-ico">▶</div>
                <div class="bds__e-t">Wound care at home</div>
                <div class="bds__e-meta bds__e-meta--done">3 m · watched 14 Aug</div>
              </div>
              <div class="bds__e">
                <div class="bds__e-ico">▶</div>
                <div class="bds__e-t">Preventing blood clots after surgery</div>
                <div class="bds__e-meta">4 m · before discharge</div>
              </div>
            </div>
          </div>

          <!-- Help quick actions -->
          <div class="bds__sec">
            <div class="bds__sec-h"><span>Need help?</span><span class="bds__sec-cap">tap a button</span></div>
            <div class="bds__help">
              <div class="bds__h"><div class="bds__h-ico bds__h-ico--call">!</div><div class="bds__h-t">Call nurse</div><div class="bds__h-sub">~2 min</div></div>
              <div class="bds__h"><div class="bds__h-ico bds__h-ico--food">☕</div><div class="bds__h-t">Water / snack</div><div class="bds__h-sub">soft diet</div></div>
              <div class="bds__h"><div class="bds__h-ico bds__h-ico--info">i</div><div class="bds__h-t">Question</div><div class="bds__h-sub">message team</div></div>
              <div class="bds__h"><div class="bds__h-ico">☾</div><div class="bds__h-t">Quiet mode</div><div class="bds__h-sub">until 06:00</div></div>
            </div>
          </div>

        </div>

      </div>

      <div class="bds__foot">
        <div class="bds__foot-meta">Read-only patient/family view · no clinical entry · auto-sync every 60 s · privacy-screen on tilt</div>
        <div class="bds__foot-lang">
          <span class="is-on">TH</span><span>EN</span><span>中文</span><span>A+</span>
        </div>
      </div>`;

    return section('bds','91','Patient bedside dashboard · tablet',
      'Tablet read-only patient/family view · greeting hero with post-op day pill · 7-event today timeline (done/now/soon tokens with time + meta) · 4-avatar care-team strip with on-shift dots · 4-tile vitals snapshot · 5-row upcoming meds with route pills · 3-tile education videos with done check · 4-button big help row (nurse/food/question/quiet) · footer language + text-size strip.',
      sub('Post-op day 1 TKA · 09:14 · PT in progress · doctor round in 46 m', demo(card)));
  });
})();
