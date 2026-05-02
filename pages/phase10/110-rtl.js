/* #110 RTL support */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  function buildCard(rtl){
    const dir = rtl ? 'rtl' : 'ltr';
    const cls = rtl ? 'rtl__card rtl__rtl-mode' : 'rtl__card';
    const name = rtl ? 'فاطمة الحسيني' : 'Sudaa Pongchai';
    const sub = rtl ? 'العمر 64 · أنثى · MRN-67-12345' : 'Age 64 · Female · MRN-67-12345';
    const allergy = rtl ? 'الحساسية' : 'Allergies';
    const allergyV = rtl ? 'البنسلين · الأسبرين' : 'Penicillin · Aspirin';
    const ward = rtl ? 'الجناح' : 'Ward';
    const wardV = rtl ? 'الباطنية · غرفة ٤١٢' : 'Internal · 412';
    const adm = rtl ? 'تاريخ الدخول' : 'Admit';
    const admV = rtl ? '٢٠٢٥-٠٣-١٢' : '2025-03-12';
    const dx = rtl ? 'التشخيص' : 'Diagnosis';
    const dxV = rtl ? 'سكري نوع ٢ · ضغط الدم' : 'DM-2 · Hypertension';
    const closeT = rtl ? 'إغلاق' : 'Close';
    const editT = rtl ? 'تعديل' : 'Edit';
    const tags = rtl
      ? ['أنسولين', 'حمية ٢٠٠٠ سعرة', 'سقوط · مرتفع']
      : ['Insulin', 'Diet 2000 kcal', 'Fall · high'];
    const stable = rtl ? 'مستقر' : 'Stable';
    const lengthLabel = rtl ? 'مدة الإقامة' : 'Length of stay';
    const dayN = rtl ? '١٢ من ٢٠ يوم' : '12 of 20 days';
    const crumb = rtl
      ? ['الرئيسية', 'المرضى', 'فاطمة']
      : ['Home', 'Patients', 'Fatima'];
    const arrow = '›';

    return `
      <div class="${cls}" dir="${dir}">
        <div class="rtl__crumb">
          <span>${crumb[0]}</span>
          <span class="rtl__crumb-arrow">${arrow}</span>
          <span>${crumb[1]}</span>
          <span class="rtl__crumb-arrow">${arrow}</span>
          <span class="rtl__crumb-cur">${crumb[2]}</span>
        </div>
        <div class="rtl__card-h">
          <div class="rtl__avatar">${rtl?'ف':'S'}</div>
          <div>
            <div class="rtl__card-name">${name}</div>
            <div class="rtl__card-mrn">${sub}</div>
          </div>
          <span class="rtl__card-pill">${stable}</span>
        </div>
        <div class="rtl__row">
          <div class="rtl__field"><div class="rtl__field-l">${ward}</div><div class="rtl__field-v">${wardV}</div></div>
          <div class="rtl__field"><div class="rtl__field-l">${adm}</div><div class="rtl__field-v">${admV}</div></div>
          <div class="rtl__field"><div class="rtl__field-l">${dx}</div><div class="rtl__field-v">${dxV}</div></div>
          <div class="rtl__field"><div class="rtl__field-l">${allergy}</div><div class="rtl__field-v" style="color:var(--ax-error-emphasis); font-weight:600;">${allergyV}</div></div>
        </div>
        <div class="rtl__chips">
          ${tags.map(t=>`<span class="rtl__chip">${t} <span class="rtl__chip-x">×</span></span>`).join('')}
        </div>
        <div class="rtl__pbar">
          <div class="rtl__pbar-h"><span>${lengthLabel}</span><span>${dayN} · 62 %</span></div>
          <div class="rtl__pbar-t"><div class="rtl__pbar-f"></div></div>
        </div>
        <div class="rtl__act">
          <button class="rtl__btn">${closeT}</button>
          <button class="rtl__btn rtl__btn--p">${editT} <span class="rtl__icon-flip">→</span></button>
        </div>
      </div>`;
  }

  AX10.register(function rtlSection(){
    const card = h('div', {class:'rtl'});
    card.innerHTML = `
      <div class="rtl__head">
        <div class="rtl__brand">
          <div class="rtl__logo">RTL</div>
          <div>
            <div class="rtl__title">RTL support · logical-property mirror</div>
            <div class="rtl__sub">supports th · en · ar · he · fa · ur · 14 locales · token-driven · zero override CSS · numerals stay LTR via &lt;bdo&gt;</div>
          </div>
        </div>
        <div class="rtl__meta">
          <strong>policy</strong> dir attr on &lt;html&gt;<br/>
          all spacing uses inline-start / end<br/>
          icons mirror via [dir="rtl"]
        </div>
      </div>

      <div class="rtl__rules">
        <div class="rtl__rule">
          <div class="rtl__rule-h"><span class="rtl__rule-name">Logical properties</span><span class="rtl__rule-tag">enforced</span></div>
          <div class="rtl__rule-d">use inline-start · inline-end · block-start instead of left / right / top.</div>
          <div class="rtl__rule-c">margin-inline-start: 12px;</div>
        </div>
        <div class="rtl__rule">
          <div class="rtl__rule-h"><span class="rtl__rule-name">Direction-aware icons</span><span class="rtl__rule-tag">data-flip</span></div>
          <div class="rtl__rule-d">arrow / chevron / breadcrumb mirrored via scaleX(-1) when dir=rtl.</div>
          <div class="rtl__rule-c">[dir="rtl"] .icon--flip { transform: scaleX(-1); }</div>
        </div>
        <div class="rtl__rule">
          <div class="rtl__rule-h"><span class="rtl__rule-name">Bi-directional numerals</span><span class="rtl__rule-tag">bdo</span></div>
          <div class="rtl__rule-d">MRN · ICD · vital values stay LTR even inside Arabic paragraph.</div>
          <div class="rtl__rule-c">&lt;bdo dir="ltr"&gt;67-12345&lt;/bdo&gt;</div>
        </div>
        <div class="rtl__rule">
          <div class="rtl__rule-h"><span class="rtl__rule-name">Font fallback chain</span><span class="rtl__rule-tag">stack</span></div>
          <div class="rtl__rule-d">IBM Plex Sans Arabic · Noto Naskh Arabic · system Arabic UI fallback.</div>
          <div class="rtl__rule-c">font-family: var(--ax-font-base);</div>
        </div>
      </div>

      <div class="rtl__compare">

        <div class="rtl__pane">
          <div class="rtl__pane-h">
            <span class="rtl__pane-t">LTR · English source</span>
            <span class="rtl__pane-c">dir="ltr" · lang="en"</span>
          </div>
          ${buildCard(false)}

          <div class="rtl__bidi">
            Lab K<sup>+</sup> drawn at <bdo dir="ltr">09:14</bdo> resulted <bdo dir="ltr">6.4 mmol/L</bdo> · order <bdo dir="ltr">RX-2025-0034</bdo>.
          </div>
        </div>

        <div class="rtl__pane">
          <div class="rtl__pane-h">
            <span class="rtl__pane-t">RTL · Arabic mirror</span>
            <span class="rtl__pane-c">dir="rtl" · lang="ar"</span>
          </div>
          ${buildCard(true)}

          <div class="rtl__bidi" dir="rtl" lang="ar" style="text-align:right;">
            تم سحب البوتاسيوم في <bdo dir="ltr">٠٩:١٤</bdo> ونتج <bdo dir="ltr">6.4 mmol/L</bdo> · أمر <bdo dir="ltr">RX-2025-0034</bdo>.
          </div>
        </div>

      </div>

      <div class="rtl__map">
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
          <span style="font-size:12px; font-weight:700; color:var(--ax-text-heading);">Property mappings · physical → logical</span>
          <span style="font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle);">codemod · 142 files migrated · automated</span>
        </div>
        <div class="rtl__map-grid">
          <div class="rtl__map-row">
            <div class="rtl__map-pair"><span class="rtl__map-old">margin-left</span><span class="rtl__map-arrow">→</span><span class="rtl__map-new">margin-inline-start</span></div>
            <div class="rtl__map-d">spacing on the start side of the inline axis</div>
          </div>
          <div class="rtl__map-row">
            <div class="rtl__map-pair"><span class="rtl__map-old">padding-right</span><span class="rtl__map-arrow">→</span><span class="rtl__map-new">padding-inline-end</span></div>
            <div class="rtl__map-d">padding on the end side of the inline axis</div>
          </div>
          <div class="rtl__map-row">
            <div class="rtl__map-pair"><span class="rtl__map-old">text-align: left</span><span class="rtl__map-arrow">→</span><span class="rtl__map-new">text-align: start</span></div>
            <div class="rtl__map-d">aligns to writing-direction start (left in LTR · right in RTL)</div>
          </div>
          <div class="rtl__map-row">
            <div class="rtl__map-pair"><span class="rtl__map-old">left: 0</span><span class="rtl__map-arrow">→</span><span class="rtl__map-new">inset-inline-start: 0</span></div>
            <div class="rtl__map-d">positioning offset relative to inline start</div>
          </div>
          <div class="rtl__map-row">
            <div class="rtl__map-pair"><span class="rtl__map-old">border-left-width</span><span class="rtl__map-arrow">→</span><span class="rtl__map-new">border-inline-start-width</span></div>
            <div class="rtl__map-d">accent border on side bars · cards</div>
          </div>
          <div class="rtl__map-row">
            <div class="rtl__map-pair"><span class="rtl__map-old">float: left</span><span class="rtl__map-arrow">→</span><span class="rtl__map-new">float: inline-start</span></div>
            <div class="rtl__map-d">legacy float repositioning · use flex/grid where possible</div>
          </div>
        </div>
      </div>

      <div class="rtl__foot">
        <div class="rtl__foot-meta">14 locales · ar / he / fa / ur swap to RTL · numerals isolated via bdo · icons opt-in to mirror via .icon--flip · stylelint rule blocks left/right · padding-left/right at PR review</div>
        <div style="display:flex; gap:8px;">
          <button class="rtl__btn-foot">Codemod report · 142 files</button>
          <button class="rtl__btn-foot">View · stylelint rules</button>
        </div>
      </div>`;

    return section('rtl','110','RTL support · logical mirror',
      'Side-by-side LTR / RTL parity. Header explains the policy: dir attribute on <html>, logical CSS properties, scaleX(-1) icon flip, bdo-isolated numerals. 4-tile rule strip lists the 4 rules with example code. Two demo panes render the same patient card — left in English LTR, right in Arabic RTL — with mirrored avatar/breadcrumb/pill/progress and an arrow icon that flips. A bidi paragraph below shows numerals (lab time, ICD, RX) staying LTR inside an Arabic sentence. Bottom mapping grid tabulates 6 physical → logical CSS migrations actually shipped via codemod.',
      sub('14 locales · 4 RTL · 142 files codemodded · stylelint-enforced logical properties · 0-config dir flip', demo(card)));
  });
})();
