/* #64 Allergies / Alerts banner */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function allergiesSection(){
    // Variant A: full critical banner
    const wrapA = h('div', {class:'alb'});
    wrapA.innerHTML = `
      <div class="alb__banner">
        <div class="alb__stripe">
          <span>⚠ ALLERGY · DRUG · CROSS-SENSITIVITY</span>
          <span>VERIFY BEFORE PRESCRIBING</span>
        </div>
        <div class="alb__body">
          <div class="alb__icon">!</div>
          <div>
            <div class="alb__title">Active allergies · 4 known reactions</div>
            <div class="alb__items">
              <span class="alb__chip"><strong>SEVERE</strong> Penicillin <small>· anaphylaxis · 2019</small></span>
              <span class="alb__chip"><strong>SEVERE</strong> Sulfa drugs <small>· SJS · 2014</small></span>
              <span class="alb__chip"><strong>MOD</strong> Aspirin <small>· urticaria</small></span>
              <span class="alb__chip"><strong>MILD</strong> Latex <small>· contact rash</small></span>
            </div>
          </div>
          <div class="alb__verified">
            <strong>Verified by</strong>
            พญ. นภัสสร · 2024-08-12<br/>
            Source · patient + EMR<br/>
            Next review · 2025-08
          </div>
        </div>
      </div>

      <div class="alb__row">
        <div class="alb__sub alb__sub--warn">
          <div class="alb__sub-icon">⚠</div>
          <div>
            <div class="alb__sub-title">Cross-sensitivity</div>
            <div class="alb__sub-body">Avoid <strong>cephalosporins gen 1–2</strong> (cross-reactivity ~5% with PCN allergy). Gen 3+ acceptable with caution.</div>
          </div>
        </div>
        <div class="alb__sub alb__sub--info">
          <div class="alb__sub-icon">i</div>
          <div>
            <div class="alb__sub-title">Precautions</div>
            <div class="alb__sub-body">Carry <strong>EpiPen</strong> · MedicAlert bracelet present · emergency contact ลูกชาย 081-234-5678</div>
          </div>
        </div>
      </div>`;

    // Variant B: compact inline & none-known
    const wrapB = h('div', {class:'alb'});
    wrapB.innerHTML = `
      <div class="alb__compact">
        <span class="alb__compact-tag">ALG</span>
        <span class="alb__compact-text">Penicillin · Sulfa <small>· severe · last reviewed 12 Aug</small></span>
      </div>
      <div class="alb__none">
        <span class="alb__none-icon">✓</span>
        <span><strong>NKDA</strong> · No known drug allergies · self-reported, verified by RN at 14:02</span>
      </div>
      <div class="alb__compact" style="background:var(--ax-warning-subtle); border-color:var(--ax-warning-emphasis)">
        <span class="alb__compact-tag" style="background:var(--ax-warning-emphasis)">CAUTION</span>
        <span class="alb__compact-text">Allergy history unverified <small>· last update 2019 · please confirm with patient</small></span>
      </div>`;

    return section('alb','64','Allergies / Alerts banner',
      'Banner สีแดงเด่นเตือน drug allergy · severity chips · verified-by metadata · sub-alerts สำหรับ cross-sensitivity และ precautions · variant compact + NKDA + unverified.',
      sub('Critical banner · variant compact', demo(wrapA, wrapB)));
  });
})();
