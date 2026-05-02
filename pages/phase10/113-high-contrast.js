/* #113 High-contrast theme */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  function patientCard(kind){
    return `
      <div class="hcm__card ${kind}">
        <div class="hcm__card-h">
          <div class="hcm__card-av">SP</div>
          <div>
            <div class="hcm__card-name">Sudaa Pongchai</div>
            <div class="hcm__card-meta">MRN-67-12345 · 64F</div>
          </div>
          <span class="hcm__card-pill">stable</span>
        </div>
        <div class="hcm__card-row">
          <div><div class="hcm__card-l">Ward</div><div class="hcm__card-v">Internal · 412</div></div>
          <div><div class="hcm__card-l">Diagnosis</div><div class="hcm__card-v">DM-2 · HTN</div></div>
          <div><div class="hcm__card-l">K⁺ result</div><div class="hcm__card-v">6.4 mmol/L</div></div>
          <div><div class="hcm__card-l">Allergy</div><div class="hcm__card-v">PCN · ASA</div></div>
        </div>
        <div class="hcm__card-act">
          <button class="hcm__btn">Close</button>
          <button class="hcm__btn p">Open chart →</button>
        </div>
      </div>`;
  }

  AX10.register(function hcSection(){
    const card = h('div', {class:'hcm'});
    card.innerHTML = `
      <div class="hcm__head">
        <div class="hcm__brand">
          <div class="hcm__logo">HC</div>
          <div>
            <div class="hcm__title">High-contrast theme · WCAG 2.2 AAA · forced-colors aware</div>
            <div class="hcm__sub">third theme alongside light / dark · pure black / white / yellow ramp · 21:1 body · 12:1 borders · respects prefers-contrast: more &amp; Windows forced-colors</div>
          </div>
        </div>
        <div class="hcm__meta">
          <strong>token set</strong> --ax-* · 96 keys<br/>
          <strong>activates</strong> data-theme="hc"<br/>
          <strong>also via</strong> @media (forced-colors)
        </div>
      </div>

      <div class="hcm__seg">
        <span class="hcm__seg-l">theme</span>
        <div class="hcm__seg-btns">
          <button>light</button>
          <button>dark</button>
          <button class="is-on">high-contrast</button>
          <button>auto · system</button>
        </div>
        <span class="hcm__seg-l" style="margin-left:14px;">contrast policy</span>
        <span class="cx10-pill cx10-pill--ok">21 : 1 body</span>
        <span class="cx10-pill cx10-pill--info">12 : 1 borders</span>
        <span class="cx10-pill cx10-pill--ghost">3 px focus ring</span>
      </div>

      <div class="hcm__compare">
        <div class="hcm__pane">
          <div class="hcm__pane-h">
            <span class="hcm__pane-t">Light · default</span>
            <span class="hcm__pane-tag">AA</span>
          </div>
          ${patientCard('light')}
        </div>
        <div class="hcm__pane">
          <div class="hcm__pane-h">
            <span class="hcm__pane-t">Dark · low light</span>
            <span class="hcm__pane-tag">AA</span>
          </div>
          ${patientCard('dark')}
        </div>
        <div class="hcm__pane" style="background:#0a0a0c;">
          <div class="hcm__pane-h" style="border-color:#fff;">
            <span class="hcm__pane-t" style="color:#fff;">High-contrast</span>
            <span class="hcm__pane-tag aaa">AAA</span>
          </div>
          ${patientCard('hc')}
        </div>
      </div>

      <div class="hcm__matrix">
        <div class="hcm__matrix-h">
          <span class="hcm__matrix-t">Token swatch · text on background contrast</span>
          <span class="hcm__matrix-c">measured per WCAG 2.x relative-luminance</span>
        </div>
        <table class="hcm__sw-table">
          <thead>
            <tr><th>Token</th><th>Light</th><th>Dark</th><th>HC · text</th><th>HC · accent</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="name">--ax-text-heading on bg-default</td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#fff;"></span><span class="hcm__ratio aaa">17.2 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#141417;"></span><span class="hcm__ratio aaa">15.8 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#000;"></span><span class="hcm__ratio aaa">21 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#ffea00;"></span><span class="hcm__ratio aaa">19.6 : 1</span></div></td>
            </tr>
            <tr>
              <td class="name">--ax-text-secondary</td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#fff;"></span><span class="hcm__ratio aa">8.4 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#141417;"></span><span class="hcm__ratio aa">7.9 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#000;"></span><span class="hcm__ratio aaa">21 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#ffea00;"></span><span class="hcm__ratio aaa">19.6 : 1</span></div></td>
            </tr>
            <tr>
              <td class="name">--ax-brand-emphasis</td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#303f9f;"></span><span class="hcm__ratio aaa">8.2 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#c5cae9;"></span><span class="hcm__ratio aa">11.4 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#ffea00;"></span><span class="hcm__ratio aaa">19.6 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#ffea00;"></span><span class="hcm__ratio aaa">19.6 : 1</span></div></td>
            </tr>
            <tr>
              <td class="name">--ax-success-emphasis</td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#047857;"></span><span class="hcm__ratio aa">5.3 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#a7f3d0;"></span><span class="hcm__ratio aa">12.1 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#00ff7f;"></span><span class="hcm__ratio aaa">15.8 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#00ff7f;"></span><span class="hcm__ratio aaa">15.8 : 1</span></div></td>
            </tr>
            <tr>
              <td class="name">--ax-error-emphasis</td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#b91c1c;"></span><span class="hcm__ratio aa">5.9 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#fecaca;"></span><span class="hcm__ratio aa">10.6 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#ff5577;"></span><span class="hcm__ratio aaa">9.4 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#ff5577;"></span><span class="hcm__ratio aaa">9.4 : 1</span></div></td>
            </tr>
            <tr>
              <td class="name">focus ring · 3 px outline</td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#3b82f6;"></span><span class="hcm__ratio aa">4.5 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#60a5fa;"></span><span class="hcm__ratio aa">5.2 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#ffea00;"></span><span class="hcm__ratio aaa">19.6 : 1</span></div></td>
              <td><div class="hcm__sw-cell"><span class="hcm__sw" style="background:#ffea00;"></span><span class="hcm__ratio aaa">19.6 : 1</span></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="hcm__trig">
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
          <span style="font-size:12px; font-weight:700; color:var(--ax-text-heading);">Activation triggers · 3 paths</span>
          <span style="font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle);">layered: explicit > system > none</span>
        </div>
        <div class="hcm__trig-grid">
          <div class="hcm__trig-row">
            <div class="hcm__trig-h"><span class="hcm__trig-n">Explicit · user setting</span><span class="hcm__trig-tag">primary</span></div>
            <div class="hcm__trig-d">User picks high-contrast in settings · persists per profile · overrides system.</div>
            <div class="hcm__trig-c">&lt;html data-theme="hc"&gt;</div>
          </div>
          <div class="hcm__trig-row">
            <div class="hcm__trig-h"><span class="hcm__trig-n">prefers-contrast: more</span><span class="hcm__trig-tag">auto</span></div>
            <div class="hcm__trig-d">macOS Increase Contrast · iOS · Linux GNOME — auto-adopts when no explicit setting.</div>
            <div class="hcm__trig-c">@media (prefers-contrast: more)</div>
          </div>
          <div class="hcm__trig-row">
            <div class="hcm__trig-h"><span class="hcm__trig-n">forced-colors · Windows</span><span class="hcm__trig-tag">system</span></div>
            <div class="hcm__trig-d">Windows High Contrast Mode · uses CanvasText / Highlight system colors · charts switch to patterns.</div>
            <div class="hcm__trig-c">@media (forced-colors: active)</div>
          </div>
        </div>
      </div>

      <div class="hcm__foot">
        <div class="hcm__foot-meta">96 tokens remapped · 0 brand color in HC mode (yellow accent only) · borders 2 px min · focus ring 3 px solid · charts use patterns + labels · tested NVDA + JAWS + VoiceOver</div>
        <div style="display:flex; gap:8px;">
          <button class="hcm__btn-foot">Reset to system</button>
          <button class="hcm__btn-foot">Test · forced-colors</button>
          <button class="hcm__btn-foot p">Activate · high-contrast</button>
        </div>
      </div>`;

    return section('hcm','113','High-contrast theme · WCAG AAA',
      'Theme switcher in 3-pane comparison: header tag pill calls out 21:1 body / 12:1 borders / 3 px focus ring · segmented control selects light · dark · high-contrast · auto. Three side-by-side patient cards (same data) render in each theme — high-contrast pane uses pure black/white with yellow accents, doubled border weights, and a 3 px outlined focus pattern. Token swatch matrix tabulates contrast ratios for 6 token roles across light / dark / HC, all hitting AAA in HC. Triggers strip explains the 3 activation paths: explicit user setting, prefers-contrast: more, and Windows forced-colors.',
      sub('21:1 body · pure b/w + yellow accent · 96 tokens remapped · 3 activation paths · NVDA / JAWS / VoiceOver tested', demo(card)));
  });
})();
