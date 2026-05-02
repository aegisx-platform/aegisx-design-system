/* #81 Pre-operative checklist */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function preopSection(){
    const card = h('div', {class:'preop'});
    card.innerHTML = `
      <div class="preop__head">
        <div class="preop__brand">
          <div class="preop__logo">PRE-OP</div>
          <div>
            <div class="preop__title">Pre-operative checklist · WHO Surgical Safety</div>
            <div class="preop__sub">Form OR-101 v4.1 · sign-in phase · 14 Aug 2024 06:42 · holding bay 3</div>
          </div>
        </div>
        <div class="preop__meta">
          <strong>OR-2024-08-14-0712</strong><br/>
          AN · 67-12345<br/>
          OR-3 · case 2 of 7
        </div>
      </div>

      <div class="preop__pt">
        <div class="preop__pt-cell">
          <span class="preop__pt-cap">patient</span>
          <span class="preop__pt-val preop__pt-val--big">สุดา ปัญญาดี · F · 62y</span>
          <span class="preop__pt-mono">HN 6712-3344 · 168 cm · 67 kg · BMI 23.7</span>
        </div>
        <div class="preop__pt-cell">
          <span class="preop__pt-cap">surgeon</span>
          <span class="preop__pt-val">นพ. กิตติศักดิ์ ม.</span>
          <span class="preop__pt-mono">v3489 · ortho</span>
        </div>
        <div class="preop__pt-cell">
          <span class="preop__pt-cap">anesthesia</span>
          <span class="preop__pt-val">นพ. ภาวิช อ.</span>
          <span class="preop__pt-mono">general · ETT</span>
        </div>
        <div class="preop__pt-cell">
          <span class="preop__pt-cap">scheduled</span>
          <span class="preop__pt-val">07:30 → 09:30</span>
          <span class="preop__pt-mono">est. 2h00 · ASA II</span>
        </div>
        <div class="preop__pt-cell">
          <span class="preop__pt-cap">code status</span>
          <span class="preop__pt-val">Full code</span>
          <span class="preop__pt-mono">no DNR active</span>
        </div>
      </div>

      <div class="preop__proc">
        <div class="preop__proc-l">
          <span class="preop__proc-cap">scheduled procedure</span>
          <span class="preop__proc-title">Right total knee arthroplasty (TKA)</span>
          <span class="preop__proc-meta">ICD-9-CM 81.54 · cemented · primary · est. blood loss 250 mL · cell-saver standby</span>
        </div>
        <div class="preop__proc-r">
          <span class="p7-chip p7-chip--blue">elective</span>
          <span class="p7-chip">clean class I</span>
          <span class="p7-chip p7-chip--amber">implant</span>
        </div>
      </div>

      <div class="preop__site">
        <div class="preop__site-l">
          <div class="preop__body-fig" title="surgical site mark">
            <svg viewBox="0 0 36 60" fill="none" stroke="currentColor" stroke-width="1.4" style="color:var(--ax-text-subtle)">
              <circle cx="18" cy="7" r="5"/>
              <path d="M18 12 L18 36 M9 18 L27 18 M11 36 L11 56 M25 36 L25 56"/>
            </svg>
            <div class="preop__body-mark" title="site mark by surgeon"></div>
          </div>
          <div class="preop__site-text">
            <span class="preop__site-cap">surgical site marking</span>
            <span class="preop__site-val">Right knee · marked “YES” by Dr. Kittisak M.</span>
            <span class="preop__site-meta">marked 06:38 · verified by patient (awake, consented) · photo on file</span>
          </div>
        </div>
        <div>
          <span class="p7-chip p7-chip--green">site verified</span>
          <span class="p7-chip">photo · OR-marking-2487.jpg</span>
        </div>
      </div>

      <!-- Sign-in (before induction) -->
      <div class="preop__sec">
        <div class="preop__sec-h">
          <div class="preop__sec-title"><span class="preop__sec-num">1</span>Sign-in · before induction of anesthesia</div>
          <span class="preop__sec-status preop__sec-status--ok">11 of 11 · complete</span>
        </div>
        <div class="preop__list">
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Patient identity confirmed</strong> using 2 identifiers (name + HN/wristband)<span class="preop__row-detail">verbal + wristband scan · matched</span></div><div class="preop__row-by">RN Sirikul</div><div class="preop__row-time">06:40</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Site marked</strong> &amp; verified with patient awake</div><div class="preop__row-by">Dr. Kittisak</div><div class="preop__row-time">06:38</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Procedure &amp; consent</strong> matches schedule (TKA right)<span class="preop__row-detail">surgical consent CON-8821 signed 12 Aug · valid 30d</span></div><div class="preop__row-by">RN Sirikul</div><div class="preop__row-time">06:40</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Anesthesia consent</strong> signed (separate)</div><div class="preop__row-by">Dr. Pawit</div><div class="preop__row-time">06:42</div></div>
          <div class="preop__row preop__row--alert"><div class="preop__check preop__check--alert">!</div><div class="preop__row-text"><strong>Allergy review</strong> · NKDA penicillin · sulfa <span class="p7-chip p7-chip--red">2 active allergies</span><span class="preop__row-detail">prophylaxis: cefazolin 2 g IV → switched to clindamycin 900 mg per allergy protocol</span></div><div class="preop__row-by">Dr. Pawit</div><div class="preop__row-time">06:42</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Difficult-airway / aspiration risk</strong> assessed · Mallampati II · low risk</div><div class="preop__row-by">Dr. Pawit</div><div class="preop__row-time">06:42</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Risk of &gt;500 mL blood loss</strong> &amp; IV access plan · 18G ×2 forearms in</div><div class="preop__row-by">Dr. Pawit</div><div class="preop__row-time">06:43</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Pulse oximeter</strong> attached &amp; functioning</div><div class="preop__row-by">Anes. tech</div><div class="preop__row-time">06:44</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>NPO since 22:00 · 8 h</strong> confirmed (food/clear fluid)</div><div class="preop__row-by">RN Sirikul</div><div class="preop__row-time">06:40</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Blood / type &amp; crossmatch</strong> · 2 U PRBC reserved (B+ available)</div><div class="preop__row-by">Lab</div><div class="preop__row-time">05:55</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text"><strong>Wristband · ID + allergy</strong> in place &amp; legible</div><div class="preop__row-by">RN Sirikul</div><div class="preop__row-time">06:40</div></div>
        </div>
      </div>

      <!-- Pre-op preparation (paperwork & physical) -->
      <div class="preop__sec">
        <div class="preop__sec-h">
          <div class="preop__sec-title"><span class="preop__sec-num">2</span>Patient preparation · physical &amp; paperwork</div>
          <span class="preop__sec-status preop__sec-status--warn">11 of 12 · 1 pending</span>
        </div>
        <div class="preop__list">
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Pre-op shower · chlorhexidine 4% × 2</div><div class="preop__row-by">RN ward</div><div class="preop__row-time">22:30 / 06:00</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Skin prep area · right knee &amp; thigh shaved/clipped</div><div class="preop__row-by">RN ward</div><div class="preop__row-time">06:10</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Voided / catheter inserted (Foley 16Fr)</div><div class="preop__row-by">RN holding</div><div class="preop__row-time">06:35</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Removed: dentures, jewellery, contact lens, prosthesis, hairpins</div><div class="preop__row-by">RN ward</div><div class="preop__row-time">06:05</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Belongings inventory signed (BEL-4412)</div><div class="preop__row-by">RN ward</div><div class="preop__row-time">06:08</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Pre-op gown · TED stockings · SCD ready</div><div class="preop__row-by">RN ward</div><div class="preop__row-time">06:15</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Pre-medication given · midazolam 2 mg IV</div><div class="preop__row-by">Dr. Pawit</div><div class="preop__row-time">06:42</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Antibiotic prophylaxis loaded · clindamycin 900 mg IV (give &lt; 60 min pre-incision)</div><div class="preop__row-by">RN holding</div><div class="preop__row-time">07:00 plan</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Beta-blocker held · ASA stopped 7d ago</div><div class="preop__row-by">Pre-op clinic</div><div class="preop__row-time">07 Aug</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">CXR · ECG · UA on chart</div><div class="preop__row-by">Pre-op clinic</div><div class="preop__row-time">12 Aug</div></div>
          <div class="preop__row"><div class="preop__check preop__check--yes">✓</div><div class="preop__row-text">Lab · CBC · Cr · Coag · electrolytes · HbA1c (7.1)</div><div class="preop__row-by">Lab</div><div class="preop__row-time">12 Aug</div></div>
          <div class="preop__row preop__row--alert"><div class="preop__check preop__check--pending">…</div><div class="preop__row-text"><strong>OR consent witness signature</strong> · awaiting 2nd witness (relative)<span class="preop__row-detail">daughter on the way · ETA 06:55 · proceed once signed</span></div><div class="preop__row-by">RN holding</div><div class="preop__row-time">pending</div></div>
        </div>
      </div>

      <!-- Vitals on transfer -->
      <div class="preop__sec">
        <div class="preop__sec-h">
          <div class="preop__sec-title"><span class="preop__sec-num">3</span>Vitals on transfer to OR</div>
          <span class="preop__sec-status preop__sec-status--ok">recorded 06:44</span>
        </div>
        <div class="preop__chips">
          <span class="preop__chip preop__chip--ok"><span>BP</span><strong>128/76</strong></span>
          <span class="preop__chip preop__chip--ok"><span>HR</span><strong>78</strong></span>
          <span class="preop__chip preop__chip--ok"><span>RR</span><strong>16</strong></span>
          <span class="preop__chip preop__chip--ok"><span>SpO₂</span><strong>99%</strong> RA</span>
          <span class="preop__chip preop__chip--ok"><span>T</span><strong>36.8°C</strong></span>
          <span class="preop__chip"><span>Pain</span><strong>3/10</strong> right knee</span>
          <span class="preop__chip"><span>BG</span><strong>108</strong> mg/dL</span>
          <span class="preop__chip"><span>NPO</span><strong>8 h 42 min</strong></span>
        </div>
      </div>

      <div class="preop__sign">
        <div class="preop__sig">
          <span class="preop__sig-cap">checklist completed by</span>
          <span class="preop__sig-name">RN Sirikul Wongthong</span>
          <span class="preop__sig-meta">e-sign · 06:45 · ID rn-2289</span>
        </div>
        <div class="preop__sig">
          <span class="preop__sig-cap">anesthesiologist sign-in</span>
          <span class="preop__sig-name">Dr. Pawit Atisuk, MD</span>
          <span class="preop__sig-meta">e-sign · 06:46 · ID an-118</span>
        </div>
        <div class="preop__sig preop__sig--pending">
          <span class="preop__sig-cap">surgeon sign-in (awaiting)</span>
          <span class="preop__sig-name">Dr. Kittisak Manomai, MD</span>
          <span class="preop__sig-meta">arriving in OR · 06:55 ETA</span>
        </div>
      </div>

      <div class="preop__foot">
        <div class="preop__foot-meta">WHO Surgical Safety Checklist 2009 · Sign-in phase · proceed only when all critical items confirmed</div>
        <div style="display:flex; gap:6px;">
          <button class="preop__btn">Print checklist</button>
          <button class="preop__btn preop__btn--block">⏸ Hold case</button>
          <button class="preop__btn preop__btn--primary">✓ Ready for transfer to OR</button>
        </div>
      </div>`;

    return section('preop','81','Pre-operative checklist',
      'WHO Surgical Safety · Sign-in phase ก่อน induction · patient strip 5 ช่อง · procedure banner · site marking with body diagram & dot · 11-item sign-in + 12-item prep checklist + transfer vitals · check tokens (✓ × − !) · 3-signature panel · NKDA allergy auto-switches prophylaxis.',
      sub('Holding bay · sign-in phase · TKA right', demo(card)));
  });
})();
