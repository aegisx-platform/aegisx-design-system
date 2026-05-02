/* #118 Color-blind safe palette */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  // Okabe-Ito-inspired 8-step palette tuned for clinical UI
  const PAL = [
    {n:'navy',     hex:'#0f3a72', fg:'#e3edff', label:'01'},
    {n:'sky',      hex:'#3a8fc2', fg:'#0a1822', label:'02'},
    {n:'teal',     hex:'#1f9a86', fg:'#0a1a17', label:'03'},
    {n:'green',    hex:'#5fa337', fg:'#0a1606', label:'04'},
    {n:'sand',     hex:'#e0c270', fg:'#1f1700', label:'05'},
    {n:'orange',   hex:'#e08a2b', fg:'#1a0d00', label:'06'},
    {n:'vermilion',hex:'#c0432a', fg:'#fff4f0', label:'07'},
    {n:'plum',     hex:'#7a3a87', fg:'#f5e8f8', label:'08'}
  ];

  // very rough simulated swatches per CVD type (illustrative; matches tone, not absolute)
  const SIM = {
    normal:    PAL.map(p=>p.hex),
    deutan:    ['#1a3868','#5285a6','#8a8e6c','#a09a4a','#d6c25f','#b4882c','#7d6021','#5a3f6e'],
    protan:    ['#1a386a','#578bb5','#7a886c','#94994a','#d4c264','#a78224','#624c1c','#52366a'],
    tritan:    ['#0e3850','#36808d','#3aa1a3','#71a1a1','#dcc7a8','#dc8c69','#c4564a','#8a4763']
  };

  const PATS = {
    'navy':"linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%)",
    'sky':"radial-gradient(circle, #fff 1px, transparent 1.6px)",
    'teal':"linear-gradient(135deg,#fff 50%,transparent 50%)",
    'green':"linear-gradient(0deg,#fff 50%,transparent 50%)",
    'sand':"linear-gradient(90deg,#222 50%,transparent 50%)",
    'orange':"linear-gradient(45deg,#222 25%,transparent 25%,transparent 75%,#222 75%)",
    'vermilion':"radial-gradient(circle, #fff 1px, transparent 1.6px)",
    'plum':"linear-gradient(135deg,#fff 50%,transparent 50%)"
  };

  function strip(arr){
    return arr.map(c => `<div class="cbs__sim-cell" style="background:${c};"></div>`).join('');
  }

  AX10.register(function cbsSection(){
    const card = h('div', {class:'cbs'});
    card.innerHTML = `
      <div class="cbs__head">
        <div class="cbs__brand">
          <div class="cbs__logo">CB</div>
          <div>
            <div class="cbs__title">Color-blind safe palette · Okabe-Ito-tuned · 8 distinguishable hues</div>
            <div class="cbs__sub">never color-only · always paired with shape, pattern, label or icon · validated for deutan · protan · tritan · monochrome · all combinations &gt; 3:1 ΔE</div>
          </div>
        </div>
        <div class="cbs__meta">
          <strong>covers</strong> 99.4 % CVD users<br/>
          <strong>min ΔE</strong> 28 (normal) · 12 (deutan)<br/>
          <strong>signal</strong> color + shape + label
        </div>
      </div>

      <!-- 8-step palette -->
      <div class="cbs__pal">
        ${PAL.map(p=>`
          <div class="cbs__sw" style="background:${p.hex}; color:${p.fg};">
            <div><strong>${p.n}</strong><br/><small>${p.label} · base</small></div>
            <small>${p.hex.toUpperCase()}</small>
          </div>`).join('')}
      </div>

      <!-- simulation matrix -->
      <div class="cbs__sim">
        <div class="cbs__sim-row">
          <div class="cbs__sim-l">
            <strong>Normal vision</strong>
            <small>trichromat · baseline</small>
            <div class="pop">~92 % of users</div>
          </div>
          <div class="cbs__sim-r">${strip(SIM.normal)}</div>
        </div>
        <div class="cbs__sim-row">
          <div class="cbs__sim-l">
            <strong>Deuteranopia</strong>
            <small>green-weak · most common</small>
            <div class="pop">~6 % of men</div>
          </div>
          <div class="cbs__sim-r">${strip(SIM.deutan)}</div>
        </div>
        <div class="cbs__sim-row">
          <div class="cbs__sim-l">
            <strong>Protanopia</strong>
            <small>red-weak</small>
            <div class="pop">~1 % of men</div>
          </div>
          <div class="cbs__sim-r">${strip(SIM.protan)}</div>
        </div>
        <div class="cbs__sim-row">
          <div class="cbs__sim-l">
            <strong>Tritanopia</strong>
            <small>blue-yellow · rare</small>
            <div class="pop">&lt; 0.1 %</div>
          </div>
          <div class="cbs__sim-r">${strip(SIM.tritan)}</div>
        </div>
      </div>

      <!-- live test scenes -->
      <div class="cbs__tests">

        <!-- Stacked bar chart -->
        <div class="cbs__test">
          <div class="cbs__test-h"><span class="cbs__test-t">Stacked admission mix · 320 patients</span><span class="cbs__test-c">+ pattern fills</span></div>
          <div class="cbs__stack">
            <span style="background:#0f3a72; --pat:${PATS.navy}; flex:0 0 24%;">24</span>
            <span style="background:#1f9a86; --pat:${PATS.teal}; flex:0 0 18%;">18</span>
            <span style="background:#5fa337; --pat:${PATS.green}; flex:0 0 16%;">16</span>
            <span style="background:#e0c270; --pat:${PATS.sand}; flex:0 0 14%; color:#1a1300;">14</span>
            <span style="background:#e08a2b; --pat:${PATS.orange}; flex:0 0 12%;">12</span>
            <span style="background:#c0432a; --pat:${PATS.vermilion}; flex:0 0 10%;">10</span>
            <span style="background:#7a3a87; --pat:${PATS.plum}; flex:0 0 6%;">6</span>
          </div>
          <div class="cbs__stack-key">
            <span><i class="p" style="background-color:#0f3a72; --pat:${PATS.navy};"></i>ICU</span>
            <span><i class="p" style="background-color:#1f9a86; --pat:${PATS.teal};"></i>Internal</span>
            <span><i class="p" style="background-color:#5fa337; --pat:${PATS.green};"></i>Surg</span>
            <span><i class="p" style="background-color:#e0c270; --pat:${PATS.sand};"></i>Ortho</span>
            <span><i class="p" style="background-color:#e08a2b; --pat:${PATS.orange};"></i>Peds</span>
            <span><i class="p" style="background-color:#c0432a; --pat:${PATS.vermilion};"></i>OB</span>
            <span><i class="p" style="background-color:#7a3a87; --pat:${PATS.plum};"></i>ER</span>
          </div>
          <div style="font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle); margin-top:8px;">each segment carries: hue + sub-pattern + numeric label + tooltip → still parseable in deutan + tritan + grayscale print</div>
        </div>

        <!-- status indicators -->
        <div class="cbs__test">
          <div class="cbs__test-h"><span class="cbs__test-t">Patient status indicators</span><span class="cbs__test-c">color + icon + word</span></div>
          <div class="cbs__sts">
            <div class="cbs__sts-row">
              <span class="cbs__sts-dot" style="background:#1f9a86;"></span>
              <span class="cbs__sts-icn" style="background:#1f9a86;">✓</span>
              <span class="cbs__sts-l"><strong>Stable</strong><small>vitals normal · checked 12 m ago</small></span>
            </div>
            <div class="cbs__sts-row">
              <span class="cbs__sts-dot" style="background:#e08a2b; clip-path:polygon(50% 0,100% 100%,0 100%); border-radius:0;"></span>
              <span class="cbs__sts-icn" style="background:#e08a2b;">!</span>
              <span class="cbs__sts-l"><strong>Watch</strong><small>K⁺ trending · re-check 30 m</small></span>
            </div>
            <div class="cbs__sts-row">
              <span class="cbs__sts-dot" style="background:#c0432a; clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%); border-radius:0;"></span>
              <span class="cbs__sts-icn" style="background:#c0432a;">×</span>
              <span class="cbs__sts-l"><strong>Critical</strong><small>K⁺ 6.4 · MD paged</small></span>
            </div>
            <div class="cbs__sts-row">
              <span class="cbs__sts-dot" style="background:#7a3a87; border-radius:2px;"></span>
              <span class="cbs__sts-icn" style="background:#7a3a87;">◌</span>
              <span class="cbs__sts-l"><strong>NPO</strong><small>fasting · pre-op</small></span>
            </div>
          </div>
        </div>

        <!-- Binary diff bars -->
        <div class="cbs__test">
          <div class="cbs__test-h"><span class="cbs__test-t">Critical / not-critical encoding</span><span class="cbs__test-c">double-cued</span></div>
          <div class="cbs__binary">
            <div class="cbs__bin-row">
              <span class="cbs__bin-l">▲ above</span>
              <div class="cbs__bin-bar" style="background:#c0432a; width:78%; --pat:${PATS.vermilion};"></div>
              <span class="cbs__bin-v">+ 2.1 σ</span>
            </div>
            <div class="cbs__bin-row">
              <span class="cbs__bin-l">▼ below</span>
              <div class="cbs__bin-bar" style="background:#0f3a72; width:46%; --pat:${PATS.navy};"></div>
              <span class="cbs__bin-v">– 0.8 σ</span>
            </div>
            <div class="cbs__bin-row">
              <span class="cbs__bin-l">● on-target</span>
              <div class="cbs__bin-bar" style="background:#1f9a86; width:62%; --pat:${PATS.teal};"></div>
              <span class="cbs__bin-v">± 0.2 σ</span>
            </div>
          </div>
          <div style="font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle); margin-top:10px; line-height:1.5;">never use red-vs-green alone · always pair with up / down arrow + sigma value · the same bar reads correctly when printed BW</div>
        </div>

      </div>

      <!-- rules -->
      <div class="cbs__rules">
        <div class="cbs__rules-h">
          <span class="cbs__rules-t">Five rules · printed on every chart spec</span>
          <span class="cbs__rules-c">authored by data-viz · audited per release</span>
        </div>
        <div class="cbs__rules-grid">
          <div class="cbs__rule">
            <div class="cbs__rule-n">1 · Never color alone</div>
            <div class="cbs__rule-d">Pair every hue with shape, pattern, label or icon. If color is removed, meaning must remain.</div>
            <div class="cbs__rule-c">double-cue rule</div>
          </div>
          <div class="cbs__rule">
            <div class="cbs__rule-n">2 · Max 8 categorical hues</div>
            <div class="cbs__rule-d">Beyond 8 categories switch to small-multiples. Dimensions before categories.</div>
            <div class="cbs__rule-c">cap = 8</div>
          </div>
          <div class="cbs__rule">
            <div class="cbs__rule-n">3 · Sequential = single-hue</div>
            <div class="cbs__rule-d">Use luminance ramps within one hue (navy 100→900) for ordered scales · diverging only when zero is meaningful.</div>
            <div class="cbs__rule-c">single-hue ramps</div>
          </div>
          <div class="cbs__rule">
            <div class="cbs__rule-n">4 · Red and green never adjacent</div>
            <div class="cbs__rule-d">Insert a luminance gap or a third hue between red and green segments to keep the boundary visible.</div>
            <div class="cbs__rule-c">spacer hue</div>
          </div>
        </div>
      </div>

      <div class="cbs__foot">
        <div class="cbs__foot-meta">8-step Okabe-Ito-tuned palette · validated via Sim Daltonism + Color Oracle on 14 charts · 0 regressions · BW-print test on Brother HL-L2350 · also see #113 high-contrast theme</div>
        <div style="display:flex; gap:8px;">
          <button class="cbs__btn">Download · tokens.json</button>
          <button class="cbs__btn">Run · CVD audit</button>
          <button class="cbs__btn p">Open · sim Daltonism</button>
        </div>
      </div>`;

    return section('cbs','118','Color-blind safe palette',
      'Hero shows the 8-hue Okabe-Ito-tuned categorical palette as full-bleed swatches with hex / role · followed by a 4-row simulation matrix (normal · deutan · protan · tritan) so designers can see the same colors through each CVD lens. Three live test scenes verify it works in production: a 7-segment stacked admission-mix bar with sub-patterns + numeric labels, a status-indicator stack pairing color + icon-shape + word (stable / watch / critical / NPO), and a critical-encoding binary chart using arrows + sigma values + pattern fills so red-vs-green is never the only signal. Closes with the 5-rule house style (no color-alone · max 8 categorical · sequential = single-hue · red+green never adjacent).',
      sub('8 hues · Okabe-Ito tuned · sim deutan / protan / tritan · pattern + label always · 5 rules · CVD-audit on every release', demo(card)));
  });
})();
