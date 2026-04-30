/* #70 Order set / Bundle */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function orderSetSection(){
    const card = h('div', {class:'os'});

    const item = (on, name, detail, meta, opts={}) => {
      const cls = `os__item${on?' os__item--on':''}${opts.required?' os__item--required':''}`;
      const pills = (opts.pills||[]).map(p=>`<span class="os__pill os__pill--${p.t}">${p.l}</span>`).join('');
      const checkMark = opts.required ? '!' : (on ? '✓' : '');
      return `<li class="${cls}">
        <div class="os__check">${checkMark}</div>
        <div>
          <div class="os__item-name">${name} ${pills}</div>
          <div class="os__item-detail">${detail}</div>
        </div>
        <div class="os__item-meta">${meta}</div>
      </li>`;
    };

    card.innerHTML = `
      <div class="os__head">
        <div>
          <div class="os__title">
            Sepsis Bundle · 1-hour <span class="os__badge">Bundle</span>
          </div>
          <div class="os__sub">SSC 2021 · ED activation · นางสุดา HN 6712-3344 · started 14:18 · target 15:18</div>
        </div>
        <div class="os__stats">
          <div class="os__stat"><div class="os__stat-l">Selected</div><div class="os__stat-v">11/14</div></div>
          <div class="os__stat"><div class="os__stat-l">Time left</div><div class="os__stat-v" style="color:var(--ax-warning-emphasis)">23 min</div></div>
        </div>
      </div>

      <div class="os__body">
        <div class="os__main">
          <div class="os__group">
            <div class="os__group-h"><span>① Diagnostics · ภายใน 60 นาที</span><span class="os__group-count">3/3</span></div>
            <ul class="os__items">
              ${item(true, 'Lactate level', 'Serum lactate · STAT · repeat in 2-4h if &gt;2 mmol/L', '<strong>14:24</strong><br/>resulted 1.4', {required:true, pills:[{t:'req',l:'Required'},{t:'evid',l:'Strong'}]})}
              ${item(true, 'Blood cultures × 2', 'Aerobic + anaerobic bottles · before antibiotics · separate sites', '<strong>14:30</strong><br/>pending', {required:true, pills:[{t:'req',l:'Required'},{t:'evid',l:'Strong'}]})}
              ${item(true, 'CBC, BMP, coags, CRP', 'Reflex panel for sepsis workup', '<strong>14:30</strong><br/>resulted', {pills:[{t:'evid',l:'Strong'}]})}
            </ul>
          </div>

          <div class="os__group">
            <div class="os__group-h"><span>② Antibiotics · ภายใน 60 นาที</span><span class="os__group-count">1/2</span></div>
            <ul class="os__items">
              ${item(true, 'Ceftriaxone 2g IV', 'Empiric · CAP coverage · within 1h of recognition', '<strong>14:48</strong><br/>infusing', {required:true, pills:[{t:'req',l:'Required'},{t:'alert',l:'PCN-allergy ck'}]})}
              ${item(false, 'Azithromycin 500mg IV', 'Atypical coverage · add if severe CAP/ICU admit', 'queued<br/>—', {pills:[{t:'evid',l:'Cond'}]})}
            </ul>
          </div>

          <div class="os__group">
            <div class="os__group-h"><span>③ Hemodynamics · ภายใน 3 ชั่วโมง</span><span class="os__group-count">3/3</span></div>
            <ul class="os__items">
              ${item(true, 'IV crystalloid 30 mL/kg', 'NS or LR · for hypotension or lactate ≥4 · weight 58kg → 1740 mL', '<strong>14:32</strong><br/>1200/1740', {required:true, pills:[{t:'req',l:'Required'}]})}
              ${item(true, '2 large-bore IV access', '18g antecubital ×2 · for resuscitation', '<strong>14:22</strong><br/>RN นภาพร', {})}
              ${item(true, 'Continuous BP, SpO₂, ECG', 'Monitor mode · q15min documentation', '<strong>14:20</strong><br/>active', {})}
            </ul>
          </div>

          <div class="os__group">
            <div class="os__group-h"><span>④ Reassessment &amp; escalation</span><span class="os__group-count">2/4</span></div>
            <ul class="os__items">
              ${item(true, 'qSOFA / SOFA score', 'Calculate at recognition + every shift', '<strong>14:20</strong><br/>qSOFA 2', {})}
              ${item(true, 'Reassess after fluid (60 min)', 'Vital signs, mental status, perfusion · document', 'due <strong>15:32</strong><br/>pending', {})}
              ${item(false, 'Vasopressor if MAP &lt; 65', 'Norepinephrine 0.05 mcg/kg/min titrate · central line', 'standby<br/>—', {pills:[{t:'evid',l:'Cond'}]})}
              ${item(false, 'ICU consult', 'If lactate &gt; 4, vasopressor need, or qSOFA ≥ 2 sustained', 'standby<br/>—', {pills:[{t:'evid',l:'Cond'}]})}
            </ul>
          </div>

          <div class="os__group">
            <div class="os__group-h"><span>⑤ Source control &amp; supportive</span><span class="os__group-count">2/2</span></div>
            <ul class="os__items">
              ${item(true, 'Identify source · imaging', 'CXR · UA · consider CT abdomen if no obvious source', '<strong>14:50</strong><br/>CXR done', {})}
              ${item(true, 'Glycemic control · target &lt; 180', 'Sliding scale insulin · q4h glucose', '<strong>15:00</strong><br/>BG 168', {})}
            </ul>
          </div>
        </div>

        <aside class="os__side">
          <div class="os__side-block">
            <div class="os__side-h">Bundle compliance</div>
            <div class="os__bundle-stats">
              <div>
                <div class="os__bs-row"><span>Diagnostics</span><strong>3/3 · 100%</strong></div>
                <div class="os__bs-bar"><div class="os__bs-bar-fill" style="width:100%"></div></div>
              </div>
              <div>
                <div class="os__bs-row"><span>Antibiotic timing</span><strong>30 min</strong></div>
                <div class="os__bs-bar"><div class="os__bs-bar-fill" style="width:50%; background:var(--ax-warning-emphasis)"></div></div>
              </div>
              <div>
                <div class="os__bs-row"><span>Fluid resuscitation</span><strong>69%</strong></div>
                <div class="os__bs-bar"><div class="os__bs-bar-fill" style="width:69%"></div></div>
              </div>
              <div>
                <div class="os__bs-row"><span>Overall bundle</span><strong>11/14 · 79%</strong></div>
                <div class="os__bs-bar"><div class="os__bs-bar-fill" style="width:79%"></div></div>
              </div>
            </div>
          </div>

          <div class="os__side-block">
            <div class="os__side-h">Evidence base</div>
            <div class="os__guideline">
              <strong>Surviving Sepsis Campaign 2021</strong> — Hour-1 bundle: lactate, blood cultures before abx, broad-spectrum antibiotics, 30 mL/kg crystalloid for hypotension or lactate ≥4, vasopressors for MAP &lt;65 after fluids.
              <span class="os__guideline-cite">Evans L et al. Crit Care Med 2021;49:e1063 · Local protocol v3.2</span>
            </div>
          </div>

          <div class="os__side-block">
            <div class="os__side-h">Linked outcomes</div>
            <div class="os__bundle-stats">
              <div class="os__bs-row"><span>Mortality (compliant)</span><strong>−7.6%</strong></div>
              <div class="os__bs-bar"><div class="os__bs-bar-fill" style="width:38%"></div></div>
              <div class="os__bs-row"><span>LOS reduction</span><strong>−1.8 d</strong></div>
            </div>
          </div>
        </aside>
      </div>

      <div class="os__foot">
        <div class="os__foot-info">Bundle activated by <strong>นพ. กิตติศักดิ์</strong> · co-managed RN <strong>นภาพร</strong>, RPh <strong>สุชาดา</strong> · audit log 14 events</div>
        <div class="os__btn-row">
          <button class="os__btn">Customize</button>
          <button class="os__btn">Pause clock</button>
          <button class="os__btn os__btn--primary">Sign &amp; submit orders</button>
        </div>
      </div>`;

    return section('os','70','Order set / Bundle',
      'Evidence-based bundle รวมรายการเป็นกลุ่ม (diagnostics/abx/hemodynamics/reassess/source) · required vs optional · timing meta · compliance bars · evidence citation · audit info.',
      sub('Sepsis 1-hour bundle · ED activation', demo(card)));
  });
})();
