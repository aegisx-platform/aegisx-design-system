/* #84 Restraint order & q2h monitoring */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function restraintSection(){
    const card = h('div', {class:'rest'});
    // build q2h monitoring table — last 24h, 12 cols (q2h)
    const times = ['08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00','00:00','02:00','04:00','06:00'];
    const skin     = ['ok','ok','ok','ok','warn','ok','ok','ok','ok','ok','ok','now'];
    const circ     = ['ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','now'];
    const rom      = ['ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','ok','now'];
    const release  = ['10','10','10','10','15','10','10','10','10','10','10','—'];
    const toilet   = ['Y','—','Y','—','Y','—','Y','—','—','—','Y','—'];
    const fluid    = ['Y','Y','Y','Y','Y','Y','Y','Y','—','—','Y','—'];
    const behav    = ['agit','calm','calm','calm','agit','calm','calm','sleep','sleep','sleep','calm','calm'];
    const future   = [false,false,false,false,false,false,false,false,false,false,false,false];

    function row(label, vals, kind){
      return `<tr><td class="lbl">${label}</td>${vals.map((v,i)=>{
        let cls = '';
        if (kind === 'state') {
          if (v === 'warn') return `<td class="warn">⚠</td>`;
          if (v === 'now')  return `<td class="now">✓</td>`;
          if (v === 'ok')   return `<td class="ok">✓</td>`;
          if (v === 'alert') return `<td class="alert">!</td>`;
        }
        if (kind === 'mins') return `<td>${v} min</td>`;
        if (kind === 'yn') return `<td class="${v==='Y'?'ok':''}">${v}</td>`;
        if (kind === 'behav') {
          if (v === 'agit') return `<td class="warn">agitated</td>`;
          if (v === 'sleep') return `<td>sleeping</td>`;
          return `<td class="ok">calm</td>`;
        }
        return `<td>${v}</td>`;
      }).join('')}</tr>`;
    }

    card.innerHTML = `
      <div class="rest__head">
        <div class="rest__brand">
          <div class="rest__logo">RESTR</div>
          <div>
            <div class="rest__title">Restraint order &amp; monitoring · IPD</div>
            <div class="rest__sub">Form NSG-118 v2.0 · order written 13 Aug 18:05 · q2h monitoring · 24 h window</div>
          </div>
        </div>
        <div class="rest__meta">
          <strong>RST-2024-08-13-1805</strong><br/>
          AN · 67-12345<br/>
          ward 4 · bed 4-12
        </div>
      </div>

      <div class="rest__alert">
        <div class="rest__alert-icon">!</div>
        <div class="rest__alert-txt">
          <strong>Least-restrictive alternatives must be tried first.</strong>
          Restraint is time-limited (max 24 h per order, must re-evaluate by physician); release every 2 h × 10 min minimum, with skin/circulation/ROM check at each release. Order auto-expires <strong>14 Aug 18:05</strong> (in 12 h 33 min).
        </div>
      </div>

      <!-- Order details -->
      <div class="rest__sec">
        <div class="rest__sec-h"><span>Order</span><span class="rest__sec-cap">written by Dr. Niran K. · 13 Aug 18:05</span></div>
        <div class="rest__order">
          <div class="rest__o rest__o--high"><span class="rest__o-cap">type</span><span class="rest__o-val">Soft mitts × 2</span><span class="rest__o-meta">both wrists · padded</span></div>
          <div class="rest__o"><span class="rest__o-cap">duration</span><span class="rest__o-val">24 h max</span><span class="rest__o-meta">expires 14 Aug 18:05</span></div>
          <div class="rest__o"><span class="rest__o-cap">monitoring freq.</span><span class="rest__o-val">q2h</span><span class="rest__o-meta">12 checks / order</span></div>
          <div class="rest__o"><span class="rest__o-cap">release schedule</span><span class="rest__o-val">10 min q2h</span><span class="rest__o-meta">+ toilet · fluids</span></div>
        </div>
      </div>

      <div class="rest__sec">
        <div class="rest__sec-h"><span>Indication &amp; alternatives tried</span><span class="rest__sec-cap">required for order validity</span></div>
        <div class="rest__rationale">
          <strong>Rationale:</strong> Patient post-op day 1 from craniotomy, with intermittent agitation and 2 attempts to dislodge ETT and central line. Continuing direct threat to medical devices essential for treatment (ICP monitor, central line, Foley). Patient unable to follow verbal redirection at this time.
        </div>
        <div class="rest__alts">
          <span class="rest__alt"><span class="rest__alt-tk rest__alt-tk--no">✓</span>verbal redirection <em>tried · ineffective</em></span>
          <span class="rest__alt"><span class="rest__alt-tk rest__alt-tk--no">✓</span>family at bedside <em>tried · brief effect</em></span>
          <span class="rest__alt"><span class="rest__alt-tk rest__alt-tk--no">✓</span>1:1 sitter <em>tried · resource unavailable after 18:00</em></span>
          <span class="rest__alt"><span class="rest__alt-tk rest__alt-tk--no">✓</span>device camouflage / mitten alone <em>tried · ineffective</em></span>
          <span class="rest__alt"><span class="rest__alt-tk">✗</span>chemical sedation <em>contraindicated · neuro check q1h</em></span>
        </div>
      </div>

      <!-- q2h monitoring grid -->
      <div class="rest__sec">
        <div class="rest__sec-h"><span>q2h monitoring · 24 h window</span><span class="rest__sec-cap">12 of 12 checks · last 06:00 just now</span></div>
        <div class="rest__monitor">
          <table class="rest__mtable">
            <thead><tr><th class="lbl">check</th>${times.map(t=>`<th>${t}</th>`).join('')}</tr></thead>
            <tbody>
              ${row('Skin · pressure', skin, 'state')}
              ${row('Circulation', circ, 'state')}
              ${row('ROM exercise', rom, 'state')}
              ${row('Release time', release, 'mins')}
              ${row('Toilet offered', toilet, 'yn')}
              ${row('Fluids offered', fluid, 'yn')}
              ${row('Behavior', behav, 'behav')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="rest__sum">
        <div class="rest__s"><span class="rest__s-cap">cumulative restraint</span><span class="rest__s-val">22 h 00 m</span><span class="rest__s-meta">of 24 h max</span></div>
        <div class="rest__s"><span class="rest__s-cap">released time</span><span class="rest__s-val">2 h 05 m</span><span class="rest__s-meta">11 releases · avg 11 min</span></div>
        <div class="rest__s"><span class="rest__s-cap">skin findings</span><span class="rest__s-val">1 alert</span><span class="rest__s-meta">16:00 · L wrist redness · resolved</span></div>
        <div class="rest__s"><span class="rest__s-cap">re-eval needed</span><span class="rest__s-val">in 12 h 33 m</span><span class="rest__s-meta">MD order renew or stop</span></div>
      </div>

      <div class="rest__sign">
        <div class="rest__sig"><span class="rest__sig-cap">ordering physician</span><span class="rest__sig-name">Dr. Niran Kalyanon, MD</span><span class="rest__sig-meta">e-sign · 13 Aug 18:05 · attending</span></div>
        <div class="rest__sig"><span class="rest__sig-cap">primary RN</span><span class="rest__sig-name">RN Pim Kanchana</span><span class="rest__sig-meta">application + q2h checks · evening shift</span></div>
        <div class="rest__sig"><span class="rest__sig-cap">family informed</span><span class="rest__sig-name">Daughter · K. Praew</span><span class="rest__sig-meta">verbal consent · 13 Aug 18:20 · phone</span></div>
      </div>

      <div class="rest__foot">
        <div class="rest__foot-meta">JCI-aligned · order requires MD re-eval q24h · alarm set: re-eval at 14 Aug 17:00</div>
        <div style="display:flex; gap:6px;">
          <button class="rest__btn">Print log</button>
          <button class="rest__btn rest__btn--danger">⏹ Discontinue</button>
          <button class="rest__btn rest__btn--primary">↻ Renew order (24 h)</button>
        </div>
      </div>`;

    return section('rest','84','Restraint order &amp; q2h monitoring',
      'แบบฟอร์มผูกยึดผู้ป่วย · alert banner สิทธิผู้ป่วย · 4-cell order tile (type/duration/freq/release) · alternatives tried list (✓/✗ tokens) · 12-column q2h monitoring grid (skin/circ/ROM/release-min/toilet/fluids/behavior) · 4-block summary · 3-signature panel (MD + RN + family informed) · auto-expiry timer.',
      sub('24 h window · 1 skin alert · 12 of 12 checks done · ~12 h to re-eval', demo(card)));
  });
})();
