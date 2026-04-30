/* #61 Vital signs chart */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function vitalsSection(){
    const card = h('div', {class:'vsc'});
    // SVG dimensions: 700x240, padding 30
    const W=700, H=220, PADL=36, PADR=8, PADT=10, PADB=22;
    const x = i => PADL + (i/11)*(W-PADL-PADR);
    // BP sys 90-180, HR 50-130, SpO2 88-100, Temp 36-39, RR 10-30 → unify to y axis 0-200
    const yBP   = v => PADT + (1 - (v-60)/120) * (H-PADT-PADB);
    const yHR   = v => PADT + (1 - (v-50)/100) * (H-PADT-PADB);
    const ySpo2 = v => PADT + (1 - (v-85)/15)  * (H-PADT-PADB);
    const yTemp = v => PADT + (1 - (v-35.5)/4) * (H-PADT-PADB);

    const bpSys = [128,132,138,142,148,156,162,158,150,144,140,138];
    const bpDia = [82,84,88,90,94,98,102,98,94,90,88,86];
    const hr    = [78,80,82,86,92,96,104,102,98,94,90,88];
    const spo2  = [98,98,97,96,95,94,93,92,93,94,95,96];
    const temp  = [37.0,37.1,37.2,37.4,37.6,37.9,38.2,38.4,38.1,37.9,37.7,37.5];

    const path = (data, fy) => 'M ' + data.map((v,i)=>`${x(i).toFixed(1)} ${fy(v).toFixed(1)}`).join(' L ');
    const dots = (data, fy, color, alertFn) => data.map((v,i)=>
      `<circle class="vsc__dot${alertFn&&alertFn(v)?' vsc__dot--alert':''}" cx="${x(i).toFixed(1)}" cy="${fy(v).toFixed(1)}" r="3" fill="${color}"/>`
    ).join('');

    const yLabels = (vals, fy, color) => vals.map(v=>`<text x="${PADL-4}" y="${(fy(v)+3).toFixed(1)}" text-anchor="end" fill="${color}">${v}</text>`).join('');

    const xLabels = ['08:00','','10:00','','12:00','','14:00','','16:00','','18:00','19:00'];

    card.innerHTML = `
      <div class="vsc__head">
        <div>
          <div class="vsc__title">Vital signs · 12-hour trend</div>
          <div class="vsc__sub" style="font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);margin-top:2px">Bed 4-12 · นางสุดา (HN 6712-3344) · last 12h</div>
        </div>
        <div class="vsc__legend">
          <span class="vsc__legend-item"><span class="vsc__legend-dot" style="background:var(--ax-vital-bp)"></span>BP (sys/dia)</span>
          <span class="vsc__legend-item"><span class="vsc__legend-dot" style="background:var(--ax-vital-hr)"></span>HR (bpm)</span>
          <span class="vsc__legend-item"><span class="vsc__legend-dot" style="background:var(--ax-vital-spo2)"></span>SpO₂ (%)</span>
          <span class="vsc__legend-item"><span class="vsc__legend-dot" style="background:var(--ax-vital-temp)"></span>Temp (°C)</span>
        </div>
      </div>
      <div class="vsc__chart">
        <svg class="vsc__svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
          <!-- alert zones for BP sys >140 -->
          <rect class="vsc__zone-warn" x="${PADL}" y="${yBP(160).toFixed(1)}" width="${W-PADL-PADR}" height="${(yBP(140)-yBP(160)).toFixed(1)}"/>
          <rect class="vsc__zone-crit" x="${PADL}" y="${PADT}" width="${W-PADL-PADR}" height="${(yBP(160)-PADT).toFixed(1)}"/>
          <g class="vsc__grid">
            ${[0,1,2,3,4].map(i=>`<line x1="${PADL}" y1="${PADT+i*((H-PADT-PADB)/4)}" x2="${W-PADR}" y2="${PADT+i*((H-PADT-PADB)/4)}"/>`).join('')}
            ${[0,3,6,9,11].map(i=>`<line x1="${x(i)}" y1="${PADT}" x2="${x(i)}" y2="${H-PADB}"/>`).join('')}
          </g>
          <g class="vsc__axis">
            ${yLabels([60,90,120,150,180], yBP, 'var(--ax-vital-bp)')}
            ${xLabels.map((t,i)=>t?`<text x="${x(i)}" y="${H-6}" text-anchor="middle">${t}</text>`:'').join('')}
          </g>
          <!-- BP bars (sys-dia) -->
          ${bpSys.map((s,i)=>`<line class="vsc__bp-bar" x1="${x(i)}" y1="${yBP(s)}" x2="${x(i)}" y2="${yBP(bpDia[i])}" stroke="var(--ax-vital-bp)" stroke-opacity="0.25"/>`).join('')}
          <path class="vsc__line" d="${path(bpSys, yBP)}" stroke="var(--ax-vital-bp)"/>
          <path class="vsc__line" d="${path(bpDia, yBP)}" stroke="var(--ax-vital-bp)" stroke-dasharray="3 2" opacity="0.7"/>
          <path class="vsc__line" d="${path(hr, yHR)}" stroke="var(--ax-vital-hr)"/>
          <path class="vsc__line" d="${path(spo2, ySpo2)}" stroke="var(--ax-vital-spo2)"/>
          <path class="vsc__line" d="${path(temp, yTemp)}" stroke="var(--ax-vital-temp)" stroke-dasharray="4 2"/>
          ${dots(bpSys, yBP, 'var(--ax-vital-bp)', v=>v>=160)}
          ${dots(hr, yHR, 'var(--ax-vital-hr)', v=>v>=100)}
          ${dots(spo2, ySpo2, 'var(--ax-vital-spo2)', v=>v<94)}
          ${dots(temp, yTemp, 'var(--ax-vital-temp)', v=>v>=38.0)}
        </svg>
      </div>
      <div class="vsc__current">
        <div class="vsc__metric vsc__metric--warn">
          <div class="vsc__metric-label">BP</div>
          <div class="vsc__metric-val">138/86 <small>mmHg</small></div>
          <div class="vsc__metric-trend">↗ Stage 1 HTN</div>
        </div>
        <div class="vsc__metric">
          <div class="vsc__metric-label">HR</div>
          <div class="vsc__metric-val">88 <small>bpm</small></div>
          <div class="vsc__metric-trend">→ stable</div>
        </div>
        <div class="vsc__metric vsc__metric--alert">
          <div class="vsc__metric-label">Temp</div>
          <div class="vsc__metric-val">37.5 <small>°C</small></div>
          <div class="vsc__metric-trend">↘ from 38.4 (peak 14:00)</div>
        </div>
        <div class="vsc__metric">
          <div class="vsc__metric-label">SpO₂</div>
          <div class="vsc__metric-val">96 <small>%</small></div>
          <div class="vsc__metric-trend">↗ rec. min 92</div>
        </div>
        <div class="vsc__metric">
          <div class="vsc__metric-label">RR</div>
          <div class="vsc__metric-val">18 <small>/min</small></div>
          <div class="vsc__metric-trend">→ normal</div>
        </div>
      </div>`;

    return section('vsc','61','Vital signs chart',
      'Multi-parameter timeline (BP/HR/Temp/SpO₂/RR) บนแกนเวลาเดียว · alert zones สำหรับค่าผิดปกติ · ค่า current แสดงแบบ stat row.',
      sub('12-hour trend · ICU bed', demo(card)));
  });
})();
