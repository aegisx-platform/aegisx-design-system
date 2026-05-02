/* #86 Pressure injury (Braden) + skin/reposition log */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function bradenSection(){
    const card = h('div', {class:'brad'});
    const score = 14;
    const markPos = ((score - 6) / (23 - 6)) * 100;

    // q2h clock x12
    const times = ['08','10','12','14','16','18','20','22','00','02','04','06'];
    const positions = ['L','S','R','L','S','R','L','S','S','R','L','—'];
    const states    = ['ok','ok','ok','ok','miss','ok','ok','ok','ok','ok','ok','now'];

    card.innerHTML = `
      <div class="brad__head">
        <div class="brad__brand">
          <div class="brad__logo">BRAD</div>
          <div>
            <div class="brad__title">Pressure injury risk · Braden Scale + skin / reposition log</div>
            <div class="brad__sub">Form NSG-204 v2.2 · re-assessed 14 Aug 06:00 (q-shift) · post-op day 1</div>
          </div>
        </div>
        <div class="brad__meta">
          <strong>BRAD-2024-08-14-0600</strong><br/>
          AN · 67-12345<br/>
          ward 4 · bed 4-12
        </div>
      </div>

      <div class="brad__hero">
        <div class="brad__score">
          <span class="brad__score-cap">Braden total</span>
          <span class="brad__score-val">${score}</span>
          <span class="brad__score-of">of 23</span>
          <span class="brad__score-band">⚠ HIGH RISK</span>
          <span class="brad__score-meta">10–12 = high risk<br/>q2h reposition + pressure-redistr. surface</span>
        </div>
        <div class="brad__bands">
          <div class="brad__bands-h">Braden risk bands · 6–23</div>
          <div class="brad__bands-bar">
            <div class="brad__bands-seg brad__bands-seg--vh">very high · ≤9</div>
            <div class="brad__bands-seg brad__bands-seg--h">high · 10–12</div>
            <div class="brad__bands-seg brad__bands-seg--m">mod · 13–14</div>
            <div class="brad__bands-seg brad__bands-seg--mi">mild · 15–18</div>
            <div class="brad__bands-seg brad__bands-seg--no">no risk · 19–23</div>
            <div class="brad__bands-mark" style="left:${markPos}%"></div>
          </div>
          <div class="brad__bands-scale"><span>6</span><span>9</span><span>12</span><span>14</span><span>18</span><span>23</span></div>
          <div style="margin-top:8px; font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle);">trend · 12 Aug pre-op <strong style="color:var(--ax-text-heading)">19 (mild)</strong> → 13 Aug post-op <strong style="color:var(--ax-text-heading)">16 (mild)</strong> → 14 Aug 06:00 <strong style="color:var(--ax-warning-emphasis)">14 (mod→high)</strong></div>
        </div>
      </div>

      <!-- 6 Braden subs -->
      <div class="brad__sec">
        <div class="brad__sec-h"><span>Braden subscales · 6 items · score 1–4 (or 1–3 friction)</span><span class="brad__sec-cap">total ${score}</span></div>
        <div class="brad__subs">
          <div class="brad__sub">
            <div class="brad__sub-top"><span class="brad__sub-name">Sensory perception</span><span class="brad__sub-pts">3</span></div>
            <div class="brad__sub-opts"><span class="brad__sub-opt">1</span><span class="brad__sub-opt">2</span><span class="brad__sub-opt brad__sub-opt--on">3</span><span class="brad__sub-opt">4</span></div>
            <span class="brad__sub-desc">slightly limited · responds to verbal but cannot always communicate discomfort</span>
          </div>
          <div class="brad__sub">
            <div class="brad__sub-top"><span class="brad__sub-name">Moisture</span><span class="brad__sub-pts">3</span></div>
            <div class="brad__sub-opts"><span class="brad__sub-opt">1</span><span class="brad__sub-opt">2</span><span class="brad__sub-opt brad__sub-opt--on">3</span><span class="brad__sub-opt">4</span></div>
            <span class="brad__sub-desc">occasionally moist · linen change ~ q12h · Foley draining</span>
          </div>
          <div class="brad__sub">
            <div class="brad__sub-top"><span class="brad__sub-name">Activity</span><span class="brad__sub-pts">2</span></div>
            <div class="brad__sub-opts"><span class="brad__sub-opt">1</span><span class="brad__sub-opt brad__sub-opt--on">2</span><span class="brad__sub-opt">3</span><span class="brad__sub-opt">4</span></div>
            <span class="brad__sub-desc">chairfast · very limited ability to walk</span>
          </div>
          <div class="brad__sub">
            <div class="brad__sub-top"><span class="brad__sub-name">Mobility</span><span class="brad__sub-pts">2</span></div>
            <div class="brad__sub-opts"><span class="brad__sub-opt">1</span><span class="brad__sub-opt brad__sub-opt--on">2</span><span class="brad__sub-opt">3</span><span class="brad__sub-opt">4</span></div>
            <span class="brad__sub-desc">very limited · post-op pain limits independent movement</span>
          </div>
          <div class="brad__sub">
            <div class="brad__sub-top"><span class="brad__sub-name">Nutrition</span><span class="brad__sub-pts">2</span></div>
            <div class="brad__sub-opts"><span class="brad__sub-opt">1</span><span class="brad__sub-opt brad__sub-opt--on">2</span><span class="brad__sub-opt">3</span><span class="brad__sub-opt">4</span></div>
            <span class="brad__sub-desc">probably inadequate · ~50% of meals · liquid supplement added</span>
          </div>
          <div class="brad__sub">
            <div class="brad__sub-top"><span class="brad__sub-name">Friction / shear</span><span class="brad__sub-pts">2</span></div>
            <div class="brad__sub-opts"><span class="brad__sub-opt">1</span><span class="brad__sub-opt brad__sub-opt--on">2</span><span class="brad__sub-opt">3</span></div>
            <span class="brad__sub-desc">potential problem · slides in chair, requires assist with positioning</span>
          </div>
        </div>
      </div>

      <!-- Skin findings on body -->
      <div class="brad__sec">
        <div class="brad__sec-h"><span>Skin assessment · 2 active pressure points</span><span class="brad__sec-cap">photo on file</span></div>
        <div class="brad__skin">
          <div class="brad__body">
            <div class="brad__body-svg">
              <svg viewBox="0 0 80 100" fill="none" stroke="currentColor" stroke-width="1">
                <ellipse cx="40" cy="10" rx="6" ry="7"/>
                <path d="M28 22 Q40 18 52 22 L54 50 Q40 54 26 50 Z"/>
                <path d="M28 22 L18 38 M52 22 L62 38 M18 38 L16 60 M62 38 L64 60"/>
                <path d="M30 50 L26 90 M50 50 L54 90"/>
              </svg>
              <div class="brad__body-mark brad__body-mark--st1" style="top:53%; left:50%" title="sacrum stage 1">1</div>
              <div class="brad__body-mark brad__body-mark--st2" style="top:88%; left:62%" title="R heel stage 2">2</div>
            </div>
            <span class="brad__body-cap">posterior · 2 sites marked</span>
          </div>
          <div class="brad__inj">
            <div class="brad__i">
              <div class="brad__i-tk brad__i-tk--st1">1</div>
              <div class="brad__i-text"><strong>Sacrum</strong> · stage I · non-blanchable erythema 3 × 4 cm · noted 14 Aug 06:00</div>
              <div class="brad__i-meta">new · 0 d<br/>photo IMG-9921</div>
            </div>
            <div class="brad__i">
              <div class="brad__i-tk brad__i-tk--st2">2</div>
              <div class="brad__i-text"><strong>R heel</strong> · stage II · partial-thickness loss 1 × 1.5 cm · clean wound bed</div>
              <div class="brad__i-meta">2 d · slow healing<br/>photo IMG-9922</div>
            </div>
            <div class="brad__i">
              <div class="brad__i-tk" style="background:var(--ax-success-emphasis)">✓</div>
              <div class="brad__i-text"><strong>Other bony prominences</strong> · occiput · scapulae · elbows · trochanters · ischia — all intact</div>
              <div class="brad__i-meta">14 Aug 06:00<br/>RN Pim</div>
            </div>
          </div>
        </div>
      </div>

      <!-- q2h reposition clock -->
      <div class="brad__sec">
        <div class="brad__sec-h"><span>q2h reposition log · 24 h</span><span class="brad__sec-cap">11 of 12 · 1 missed (16:00)</span></div>
        <div class="brad__clock">
          ${times.map((t,i)=>{
            const st = states[i];
            const ico = st === 'ok' ? '✓' : st === 'miss' ? '✗' : st === 'now' ? '·' : '';
            return `<div class="brad__c brad__c--${st}"><span class="brad__c-t">${t}:00</span><span class="brad__c-ico">${ico}</span><span class="brad__c-pos">${positions[i]}</span></div>`;
          }).join('')}
        </div>
        <div style="margin-top:8px; display:flex; gap:14px; font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle);">
          <span><strong style="color:var(--ax-text-heading)">L</strong> left lateral</span>
          <span><strong style="color:var(--ax-text-heading)">R</strong> right lateral</span>
          <span><strong style="color:var(--ax-text-heading)">S</strong> supine 30°</span>
          <span style="margin-left:auto">surface: alternating-pressure mattress · heel float · barrier cream q-shift</span>
        </div>
      </div>

      <div class="brad__sign">
        <div class="brad__sig"><span class="brad__sig-cap">assessor · skin survey</span><span class="brad__sig-name">RN Pim Kanchana</span><span class="brad__sig-meta">e-sign · 14 Aug 06:00</span></div>
        <div class="brad__sig"><span class="brad__sig-cap">wound nurse consult</span><span class="brad__sig-name">CWOCN K. Suchada</span><span class="brad__sig-meta">notified for stage II heel · ETA 09:00</span></div>
      </div>

      <div class="brad__foot">
        <div class="brad__foot-meta">Braden 14 / 23 · 1 stage I + 1 stage II active · re-assess q-shift &amp; on transfer; q2h reposition mandatory until ≥ 16</div>
        <div style="display:flex; gap:6px;">
          <button class="brad__btn">View 30-d trend</button>
          <button class="brad__btn">Order surface</button>
          <button class="brad__btn brad__btn--primary">✓ Save assessment</button>
        </div>
      </div>`;

    return section('brad','86','Pressure injury · Braden + skin log',
      'Braden Scale (6 subscales 1–4) · score panel + 5-band risk bar (very-high → no-risk) · 6-card subscale grid พร้อม option dots และ description · skin survey: posterior body diagram + numbered marks (stage I/II) + injury list with photos · q2h reposition clock 24-h (12 cells: ok/miss/now/future, position label L/R/S) · 2-signature panel (RN + CWOCN consult).',
      sub('Score 14 = high · sacrum st.I + R heel st.II · 11 of 12 q2h done', demo(card)));
  });
})();
