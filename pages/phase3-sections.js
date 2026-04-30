/* AegisX DS · Phase 3 — Charts & Data Visualization */
(function(){
  const el = (tag, attrs, ...kids) => {
    const e = document.createElementNS(attrs && attrs.svg ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml', tag);
    if (attrs) for (const [k,v] of Object.entries(attrs)) {
      if (k === 'svg') continue;
      if (k === 'class') e.setAttribute('class', v);
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const k of kids.flat()) {
      if (k == null) continue;
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    }
    return e;
  };
  const h = (tag, attrs, ...kids) => {
    const e = document.createElement(tag);
    if (attrs) for (const [k,v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else e.setAttribute(k, v);
    }
    for (const k of kids.flat()) {
      if (k == null) continue;
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    }
    return e;
  };
  const SVGNS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs={}) => {
    const e = document.createElementNS(SVGNS, tag);
    for (const [k,v] of Object.entries(attrs)) e.setAttribute(k, v);
    return e;
  };

  const section = (id, num, title, desc, ...blocks) => {
    const s = h('section', {id, class:'section'});
    s.appendChild(h('div', {class:'section__head'},
      h('h2', {class:'section__title'}, h('span', {class:'section__num'}, num), title),
      h('p', {class:'section__desc'}, desc)));
    for (const b of blocks) s.appendChild(b);
    return s;
  };
  const sub = (title, body) => {
    const w = h('div', {class:'subsection'});
    if (title) w.appendChild(h('h3', {class:'subsection__title'}, title));
    w.appendChild(body);
    return w;
  };

  // ═══ 51. LINE CHART ═══
  function lineChart() {
    const W = 640, H = 220, PL = 36, PR = 16, PT = 10, PB = 26;
    const iw = W - PL - PR, ih = H - PT - PB;

    const series1 = [128, 132, 130, 135, 140, 138, 142, 145, 148, 150, 152, 149, 147, 144]; // BP systolic
    const series2 = [82, 84, 80, 86, 88, 85, 90, 92, 88, 89, 91, 88, 87, 85];  // BP diastolic
    const yMin = 60, yMax = 160;
    const x = i => PL + (i / (series1.length - 1)) * iw;
    const y = v => PT + (1 - (v - yMin) / (yMax - yMin)) * ih;

    const svg = svgEl('svg', {viewBox: `0 0 ${W} ${H}`, class:'chart__svg', style:'height:220px'});
    // grid
    [80, 100, 120, 140].forEach(v => {
      svg.appendChild(svgEl('line', {x1:PL, x2:W-PR, y1:y(v), y2:y(v), class:'chart__grid'}));
      const t = svgEl('text', {x: 4, y: y(v)+3, class:'chart__tick'});
      t.textContent = v;
      svg.appendChild(t);
    });
    // threshold (140)
    svg.appendChild(svgEl('line', {x1:PL, x2:W-PR, y1:y(140), y2:y(140), class:'line-threshold'}));
    const tlbl = svgEl('text', {x:W-PR-2, y: y(140)-4, class:'chart__label', 'text-anchor':'end', fill:'var(--ax-error-emphasis)'});
    tlbl.textContent = 'HTN threshold 140';
    svg.appendChild(tlbl);

    // x-axis labels
    ['08:00','10:00','12:00','14:00','16:00','18:00','20:00'].forEach((d, idx) => {
      const xi = PL + (idx*2 / (series1.length-1)) * iw;
      const t = svgEl('text', {x: xi, y: H-8, class:'chart__tick', 'text-anchor':'middle'});
      t.textContent = d;
      svg.appendChild(t);
    });
    // axis line
    svg.appendChild(svgEl('line', {x1:PL, x2:W-PR, y1:H-PB, y2:H-PB, class:'chart__axis'}));

    // area
    const areaPath = `M${x(0)},${y(yMin)} ` + series1.map((v,i)=>`L${x(i)},${y(v)}`).join(' ') + ` L${x(series1.length-1)},${y(yMin)} Z`;
    svg.appendChild(svgEl('path', {d:areaPath, class:'line-area-1'}));

    // lines
    const path1 = 'M' + series1.map((v,i)=>`${x(i)},${y(v)}`).join(' L');
    svg.appendChild(svgEl('path', {d:path1, class:'line-series-1'}));
    const path2 = 'M' + series2.map((v,i)=>`${x(i)},${y(v)}`).join(' L');
    svg.appendChild(svgEl('path', {d:path2, class:'line-series-2'}));

    // dots on key points
    [3, 7, 11].forEach(i => {
      svg.appendChild(svgEl('circle', {cx:x(i), cy:y(series1[i]), r:3.5, class:'line-dot line-dot--brand'}));
    });
    // peak alert dot
    const peak = series1.indexOf(Math.max(...series1));
    svg.appendChild(svgEl('circle', {cx:x(peak), cy:y(series1[peak]), r:4.5, class:'line-dot line-dot--warning', 'stroke-width':2.5}));
    const peakLbl = svgEl('text', {x: x(peak), y: y(series1[peak])-10, class:'chart__value-label', 'text-anchor':'middle', fill:'var(--ax-warning-emphasis)'});
    peakLbl.textContent = '152';
    svg.appendChild(peakLbl);

    const c = h('div', {class:'chart'});
    const head = h('div', {class:'chart__head'});
    head.innerHTML = `
      <div>
        <div class="chart__title">Blood Pressure trend · 24h</div>
        <div class="chart__sub">HN 6781234 · 15 พ.ย. 2568</div>
      </div>
      <div class="chart__legend">
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-brand-emphasis)"></span>Systolic</span>
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-success-emphasis)"></span>Diastolic</span>
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-error-emphasis)"></span>Threshold</span>
      </div>`;
    c.appendChild(head);
    c.appendChild(svg);

    const d = h('div', {class:'demo'});
    d.appendChild(c);
    return section('linechart','51','Line chart',
      'Multi-series time-series — vital signs, lab trends, occupancy. รองรับ threshold line, area fill, peak markers.',
      sub('Vital sign trend (BP 24h)', d));
  }

  // ═══ 52. BAR CHART ═══
  function barChart() {
    // Vertical SVG bar
    const W = 640, H = 220, PL = 36, PR = 16, PT = 10, PB = 30;
    const data = [
      ['อายุรกรรม', 142],
      ['ศัลยกรรม', 98],
      ['กุมารฯ', 76],
      ['สูติฯ', 64],
      ['ฉุกเฉิน', 184],
      ['จิตเวช', 32],
      ['ทันตกรรม', 48]
    ];
    const max = 200;
    const iw = W - PL - PR, ih = H - PT - PB;
    const bw = iw / data.length * 0.65;
    const gap = iw / data.length * 0.35;
    const svg = svgEl('svg', {viewBox:`0 0 ${W} ${H}`, class:'chart__svg', style:'height:220px'});
    [50, 100, 150, 200].forEach(v => {
      const yy = PT + (1 - v/max) * ih;
      svg.appendChild(svgEl('line', {x1:PL, x2:W-PR, y1:yy, y2:yy, class:'chart__grid'}));
      const t = svgEl('text', {x:4, y:yy+3, class:'chart__tick'});
      t.textContent = v;
      svg.appendChild(t);
    });
    svg.appendChild(svgEl('line', {x1:PL, x2:W-PR, y1:H-PB, y2:H-PB, class:'chart__axis'}));
    data.forEach(([label, v], idx) => {
      const xx = PL + idx * (iw/data.length) + gap/2;
      const bh = (v/max) * ih;
      const yy = H - PB - bh;
      const cls = label === 'ฉุกเฉิน' ? 'bar bar--warning' : 'bar';
      svg.appendChild(svgEl('rect', {x:xx, y:yy, width:bw, height:bh, rx:2, class:cls}));
      const tv = svgEl('text', {x:xx+bw/2, y:yy-5, class:'chart__value-label', 'text-anchor':'middle'});
      tv.textContent = v;
      svg.appendChild(tv);
      const tl = svgEl('text', {x:xx+bw/2, y:H-12, class:'chart__tick', 'text-anchor':'middle'});
      tl.textContent = label;
      svg.appendChild(tl);
    });
    const c = h('div', {class:'chart'});
    c.innerHTML = `<div class="chart__head"><div><div class="chart__title">ผู้ป่วย OPD ตามแผนก · วันนี้</div><div class="chart__sub">รวม 644 ครั้ง · เทียบกับเฉลี่ย 7 วัน</div></div></div>`;
    c.appendChild(svg);
    const d = h('div', {class:'demo'});
    d.appendChild(c);

    // Horizontal bars (no SVG)
    const d2 = h('div', {class:'demo'});
    const c2 = h('div', {class:'chart'});
    c2.innerHTML = `<div class="chart__head"><div class="chart__title">Top 10 ICD diagnoses · Q4 2568</div></div>`;
    const list = h('div', {class:'hbars'});
    [
      ['I10 · HTN', 412, 'brand'],
      ['E11.9 · DM type 2', 358, 'brand'],
      ['J44.1 · COPD', 224, 'warning'],
      ['I25 · IHD', 198, 'brand'],
      ['N18 · CKD', 142, 'warning'],
      ['F32 · Depression', 98, 'brand'],
      ['K29 · Gastritis', 76, 'brand'],
      ['M54 · Back pain', 68, 'brand'],
      ['J45 · Asthma', 54, 'brand'],
      ['G43 · Migraine', 42, 'brand']
    ].forEach(([lab, v, role]) => {
      const w = 412;
      const r = h('div', {class:'hbar'});
      r.innerHTML = `
        <div class="hbar__label">${lab}</div>
        <div class="hbar__track"><div class="hbar__fill ${role==='warning'?'hbar__fill--warning':''}" style="width:${(v/w*100).toFixed(1)}%"></div></div>
        <div class="hbar__value">${v}</div>`;
      list.appendChild(r);
    });
    c2.appendChild(list);
    d2.appendChild(c2);

    return section('barchart','52','Bar chart',
      'Vertical SVG bar (เปรียบเทียบหมวดหมู่) + horizontal CSS bars (rankings) — pattern หลักของ analytics dashboard.',
      sub('Vertical · OPD by department', d),
      sub('Horizontal · top 10 ICD codes', d2));
  }

  // ═══ 53. DONUT / PIE ═══
  function donutChart() {
    function donutSvg(size, segments, centerVal, centerLbl) {
      const r = size/2 - 12;
      const cx = size/2, cy = size/2;
      const svg = svgEl('svg', {viewBox:`0 0 ${size} ${size}`, width:size, height:size});
      const total = segments.reduce((s,[,v])=>s+v, 0);
      let cumLen = 0;
      const C = 2 * Math.PI * r;
      // background ring
      svg.appendChild(svgEl('circle', {cx, cy, r, fill:'none', stroke:'var(--ax-background-subtle)', 'stroke-width':18}));
      segments.forEach(([name, v, color]) => {
        const len = (v/total) * C;
        const c = svgEl('circle', {cx, cy, r, fill:'none', stroke:color, 'stroke-width':18,
          'stroke-dasharray': `${len} ${C-len}`,
          'stroke-dashoffset': -cumLen,
          transform: `rotate(-90 ${cx} ${cy})`,
          'stroke-linecap':'butt'});
        svg.appendChild(c);
        cumLen += len;
      });
      const wrap = h('div', {class:'donut', style:`width:${size}px;height:${size}px`});
      wrap.appendChild(svg);
      wrap.appendChild(h('div', {class:'donut__center', html:
        `<div class="donut__center-value">${centerVal}</div><div class="donut__center-label">${centerLbl}</div>`}));
      return wrap;
    }
    function legend(segments, total) {
      const l = h('div', {class:'donut-legend'});
      segments.forEach(([name, v, color]) => {
        const pct = (v/total*100).toFixed(1);
        const r = h('div', {class:'donut-legend__row'});
        r.innerHTML = `
          <span class="donut-legend__dot" style="background:${color}"></span>
          <span class="donut-legend__name">${name}</span>
          <span class="donut-legend__value">${v}</span>
          <span class="donut-legend__pct">${pct}%</span>`;
        l.appendChild(r);
      });
      return l;
    }

    // Payer mix
    const payers = [
      ['UC (บัตรทอง)', 412, 'var(--ax-brand-emphasis)'],
      ['SSO (ประกันสังคม)', 198, 'var(--ax-success-emphasis)'],
      ['CSMBS (ราชการ)', 142, 'var(--ax-warning-emphasis)'],
      ['Self-pay', 86, '#8b5cf6'],
      ['ประกันเอกชน', 64, '#ec4899']
    ];
    const total1 = payers.reduce((s,[,v])=>s+v, 0);
    const c1 = h('div', {class:'chart'});
    c1.innerHTML = `<div class="chart__head"><div class="chart__title">Payer mix · พ.ย. 2568</div></div>`;
    const w1 = h('div', {class:'donut-wrap'});
    w1.appendChild(donutSvg(160, payers, total1, 'รวม'));
    w1.appendChild(legend(payers, total1));
    c1.appendChild(w1);

    // Case mix (pie style — full)
    const cases = [
      ['Critical', 18, 'var(--ax-error-emphasis)'],
      ['Observation', 32, 'var(--ax-warning-emphasis)'],
      ['Stable', 78, 'var(--ax-success-emphasis)'],
      ['Discharged', 12, 'var(--ax-text-subtle)']
    ];
    const total2 = cases.reduce((s,[,v])=>s+v, 0);
    const c2 = h('div', {class:'chart'});
    c2.innerHTML = `<div class="chart__head"><div class="chart__title">Patient acuity · current</div></div>`;
    const w2 = h('div', {class:'donut-wrap'});
    w2.appendChild(donutSvg(160, cases, '140', 'PATIENTS'));
    w2.appendChild(legend(cases, total2));
    c2.appendChild(w2);

    const grid = h('div', {class:'grid grid-2', style:'align-items:start'});
    grid.appendChild(h('div', {class:'demo'}, c1));
    grid.appendChild(h('div', {class:'demo'}, c2));
    return section('donut','53','Donut / Pie',
      'Proportional charts สำหรับ case mix, payer mix, capacity allocation. Center label + side legend with values + %.',
      grid);
  }

  // ═══ 54. SPARKLINE ═══
  function sparklineSection() {
    function spark(values, role='brand', w=120, hh=28) {
      const max = Math.max(...values), min = Math.min(...values);
      const range = max - min || 1;
      const x = i => (i / (values.length-1)) * w;
      const y = v => hh - 2 - ((v - min) / range) * (hh - 4);
      const svg = svgEl('svg', {viewBox:`0 0 ${w} ${hh}`, width:w, height:hh, class:'sparkline'});
      // area
      const area = `M0,${hh} ` + values.map((v,i)=>`L${x(i)},${y(v)}`).join(' ') + ` L${w},${hh} Z`;
      const colors = {brand:'var(--ax-brand-emphasis)', success:'var(--ax-success-emphasis)', warning:'var(--ax-warning-emphasis)', error:'var(--ax-error-emphasis)'};
      svg.appendChild(svgEl('path', {d:area, fill:colors[role], 'fill-opacity':'0.12'}));
      // line
      const path = 'M' + values.map((v,i)=>`${x(i)},${y(v)}`).join(' L');
      svg.appendChild(svgEl('path', {d:path, fill:'none', stroke:colors[role], 'stroke-width':1.5, 'stroke-linecap':'round'}));
      // last dot
      svg.appendChild(svgEl('circle', {cx:x(values.length-1), cy:y(values[values.length-1]), r:2.2, fill:colors[role]}));
      return svg;
    }

    const d = h('div', {class:'demo'});
    const list = h('div', {style:'display:flex;flex-direction:column'});
    [
      ['HbA1c', '7.8%', [6.4, 6.8, 7.0, 7.2, 7.5, 7.6, 7.8], '+0.4', 'down', 'warning'],
      ['Total cholesterol', '198', [220, 215, 210, 208, 205, 200, 198], '−22', 'up', 'success'],
      ['BP systolic', '132', [128, 130, 135, 132, 130, 134, 132], '±0', 'flat', 'brand'],
      ['Weight (kg)', '68.2', [70.1, 69.8, 69.5, 68.9, 68.5, 68.3, 68.2], '−1.9', 'up', 'success'],
      ['Heart rate (avg)', '78', [82, 80, 79, 81, 80, 79, 78], '−4', 'up', 'success'],
      ['Sleep (hrs)', '6.2', [7.5, 7.2, 6.8, 6.5, 6.3, 6.4, 6.2], '−1.3', 'down', 'warning']
    ].forEach(([label, val, values, delta, dir, role]) => {
      const r = h('div', {class:'sparkline-row'});
      r.appendChild(h('div', {class:'sparkline-row__label'}, label));
      r.appendChild(spark(values, role));
      r.appendChild(h('div', {class:'sparkline-row__value'}, val));
      const dd = h('div', {class:'sparkline-row__delta sparkline-row__delta--'+dir});
      dd.textContent = (dir==='up'?'▲ ':dir==='down'?'▼ ':'')+delta;
      r.appendChild(dd);
      list.appendChild(r);
    });
    d.appendChild(list);

    // Inline mini in cards
    const d2 = h('div', {class:'demo'});
    const g = h('div', {class:'grid grid-3'});
    [
      ['Admissions', '142', [120,128,132,138,140,142,142], 'brand'],
      ['Discharges', '128', [140,135,130,132,128,126,128], 'success'],
      ['LOS avg (days)', '4.2', [4.5,4.4,4.3,4.2,4.3,4.2,4.2], 'success']
    ].forEach(([l, v, vals, role]) => {
      const c = h('div', {class:'card'});
      c.innerHTML = `<div class="card__eyebrow">${l}</div><div style="display:flex;align-items:flex-end;justify-content:space-between;gap:8px"><div class="stat-card__value" style="font-size:24px">${v}</div></div>`;
      c.appendChild(spark(vals, role, 200, 36));
      g.appendChild(c);
    });
    d2.appendChild(g);

    return section('sparkline','54','Sparkline',
      'Mini chart inline ในตาราง / card — แสดงแนวโน้มแบบรวบรัด ไม่ต้องมี axis. ใช้ใน lab panel, KPI tiles, monitoring rows.',
      sub('Lab panel — 7-day trend rows', d),
      sub('Cards with sparkline footer', d2));
  }

  // ═══ 55. HEATMAP ═══
  function heatmapSection() {
    // Calendar-style heatmap (year activity)
    const d = h('div', {class:'demo'});
    const c = h('div', {class:'chart'});
    c.innerHTML = `<div class="chart__head"><div><div class="chart__title">Patient volume · 12 weeks</div><div class="chart__sub">Mon–Sun · จำนวนผู้ป่วยต่อวัน</div></div></div>`;
    const wrap = h('div', {class:'heatmap'});
    const grid = h('div', {class:'heatmap__grid', style:'grid-template-columns:30px repeat(12, 1fr)'});
    grid.appendChild(h('div'));
    for (let w=1; w<=12; w++) grid.appendChild(h('div', {class:'heatmap__col-label'}, 'W'+w));
    ['จ','อ','พ','พฤ','ศ','ส','อา'].forEach(dow => {
      grid.appendChild(h('div', {class:'heatmap__row-label'}, dow));
      for (let w=0; w<12; w++) {
        const seed = (dow.charCodeAt(0) + w*7) % 100;
        const lvl = ['อา','ส'].includes(dow) ? Math.floor(seed/35) : Math.min(5, 1 + Math.floor(seed/22));
        const cell = h('div', {class:'heatmap__cell heatmap__cell--l'+lvl, title:`W${w+1} ${dow}: ${30+seed} ผู้ป่วย`});
        grid.appendChild(cell);
      }
    });
    wrap.appendChild(grid);
    const lg = h('div', {class:'heatmap__legend'});
    lg.innerHTML = `<span>น้อย</span><div class="heatmap__legend-cells">
      <div class="heatmap__legend-cell heatmap__cell--l1"></div>
      <div class="heatmap__legend-cell heatmap__cell--l2"></div>
      <div class="heatmap__legend-cell heatmap__cell--l3"></div>
      <div class="heatmap__legend-cell heatmap__cell--l4"></div>
      <div class="heatmap__legend-cell heatmap__cell--l5"></div>
    </div><span>มาก</span>`;
    wrap.appendChild(lg);
    c.appendChild(wrap);
    d.appendChild(c);

    // Hour-of-day x day-of-week (no-show patterns)
    const d2 = h('div', {class:'demo'});
    const c2 = h('div', {class:'chart'});
    c2.innerHTML = `<div class="chart__head"><div><div class="chart__title">No-show rate · ชั่วโมง × วัน</div><div class="chart__sub">8:00–18:00 · 5 วันทำการ</div></div></div>`;
    const grid2 = h('div', {class:'heatmap__grid', style:'grid-template-columns:40px repeat(11, 1fr)'});
    grid2.appendChild(h('div'));
    for (let hr=8; hr<=18; hr++) grid2.appendChild(h('div', {class:'heatmap__col-label'}, String(hr).padStart(2,'0')));
    ['จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์'].forEach((d,row) => {
      grid2.appendChild(h('div', {class:'heatmap__row-label'}, d));
      for (let hr=8; hr<=18; hr++) {
        const lvl = (hr===8||hr===17||hr===18) ? Math.min(5, 2+row) : (hr>=12 && hr<=13 ? 4 : Math.max(1, ((hr*3+row)%5)));
        grid2.appendChild(h('div', {class:'heatmap__cell heatmap__cell--l'+lvl, title:`${d} ${hr}:00`}));
      }
    });
    c2.appendChild(grid2);
    d2.appendChild(c2);

    return section('heatmap','55','Heatmap',
      'Density visualization — patient volume, no-show patterns, occupancy intensity. 5-level scale ปรับตาม brand.',
      sub('12-week activity', d),
      sub('Hour × day-of-week', d2));
  }

  // ═══ 56. STAT BLOCK (rich KPI) ═══
  function statblockSection() {
    function spark(values, role='brand', w=140, hh=32) {
      const max = Math.max(...values), min = Math.min(...values);
      const range = max - min || 1;
      const x = i => (i / (values.length-1)) * w;
      const y = v => hh - 2 - ((v - min) / range) * (hh - 4);
      const svg = svgEl('svg', {viewBox:`0 0 ${w} ${hh}`, width:w, height:hh});
      const colors = {brand:'var(--ax-brand-emphasis)', success:'var(--ax-success-emphasis)', warning:'var(--ax-warning-emphasis)', error:'var(--ax-error-emphasis)'};
      const area = `M0,${hh} ` + values.map((v,i)=>`L${x(i)},${y(v)}`).join(' ') + ` L${w},${hh} Z`;
      svg.appendChild(svgEl('path', {d:area, fill:colors[role], 'fill-opacity':'0.12'}));
      const path = 'M' + values.map((v,i)=>`${x(i)},${y(v)}`).join(' L');
      svg.appendChild(svgEl('path', {d:path, fill:'none', stroke:colors[role], 'stroke-width':1.5}));
      return svg;
    }
    const d = h('div', {class:'demo'});
    const g = h('div', {class:'grid grid-3'});

    // 1 — with sparkline
    const s1 = h('div', {class:'statblock statblock--accent'});
    s1.innerHTML = `
      <div class="statblock__label">ผู้ป่วยใน <span style="color:var(--ax-text-subtle);font-weight:400;text-transform:none;letter-spacing:0">(IPD)</span></div>
      <div class="statblock__value">142<span class="statblock__unit">คน</span></div>
      <div class="statblock__row">
        <span class="statblock__delta statblock__delta--up">▲ 8%</span>
        <span class="statblock__compare">vs สัปดาห์ก่อน</span>
      </div>`;
    s1.appendChild(spark([120,128,132,138,140,142,142], 'brand', 240, 40));
    g.appendChild(s1);

    // 2 — with target bar
    const s2 = h('div', {class:'statblock'});
    s2.innerHTML = `
      <div class="statblock__label">Bed occupancy</div>
      <div class="statblock__value">76<span class="statblock__unit">%</span></div>
      <div class="statblock__row">
        <span style="font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono)">เป้าหมาย 80–90%</span>
        <span class="statblock__delta statblock__delta--down">−4% target</span>
      </div>
      <div class="statblock__bar"><div class="statblock__bar-fill" style="width:76%"></div></div>`;
    g.appendChild(s2);

    // 3 — error/critical
    const s3 = h('div', {class:'statblock', style:'border-left:3px solid var(--ax-error-emphasis)'});
    s3.innerHTML = `
      <div class="statblock__label" style="color:var(--ax-error-emphasis)">⚠ Critical alerts</div>
      <div class="statblock__value" style="color:var(--ax-error-emphasis)">7</div>
      <div class="statblock__row">
        <span class="statblock__delta statblock__delta--down" style="color:var(--ax-error-emphasis)">▲ 3 ใหม่</span>
        <span class="statblock__compare">5 นาทีล่าสุด</span>
      </div>
      <div style="display:flex;gap:4px;margin-top:4px">
        <span class="badge badge--error">Sepsis</span>
        <span class="badge badge--warning">Falls risk</span>
      </div>`;
    g.appendChild(s3);

    // 4 — money
    const s4 = h('div', {class:'statblock'});
    s4.innerHTML = `
      <div class="statblock__label">รายได้สุทธิ · MTD</div>
      <div class="statblock__value">฿4.2<span class="statblock__unit">M</span></div>
      <div class="statblock__row">
        <span class="statblock__delta statblock__delta--up">▲ 12.4%</span>
        <span class="statblock__compare">YoY · ฿3.7M เดิม</span>
      </div>`;
    s4.appendChild(spark([3.2,3.4,3.6,3.7,3.9,4.0,4.2], 'success', 240, 40));
    g.appendChild(s4);

    // 5 — average
    const s5 = h('div', {class:'statblock'});
    s5.innerHTML = `
      <div class="statblock__label">LOS เฉลี่ย</div>
      <div class="statblock__value">4.2<span class="statblock__unit">วัน</span></div>
      <div class="statblock__row">
        <span class="statblock__delta statblock__delta--up">▼ 0.3</span>
        <span class="statblock__compare">เป้า ≤ 4.5 ✓</span>
      </div>`;
    s5.appendChild(spark([4.8,4.6,4.5,4.4,4.3,4.2,4.2], 'success', 240, 40));
    g.appendChild(s5);

    // 6 — text-rich
    const s6 = h('div', {class:'statblock', style:'border-left:3px solid var(--ax-warning-emphasis)'});
    s6.innerHTML = `
      <div class="statblock__label">Readmission 30d</div>
      <div class="statblock__value">11.8<span class="statblock__unit">%</span></div>
      <div class="statblock__row">
        <span class="statblock__delta statblock__delta--down">▲ 2.1pp</span>
        <span class="statblock__compare">เป้า &lt; 10%</span>
      </div>
      <div class="statblock__bar" style="background:var(--ax-warning-subtle)"><div class="statblock__bar-fill" style="width:118%;background:var(--ax-warning-emphasis);max-width:100%"></div></div>`;
    g.appendChild(s6);

    d.appendChild(g);
    return section('statblock','56','Stat block (rich KPI)',
      'Detailed KPI tile — value + unit + delta + compare + sparkline / bar / badges. ใช้บน executive dashboard.',
      sub('6 KPI tiles for hospital exec dashboard', d));
  }

  // ═══ 57. COMPARISON BARS ═══
  function comparisonSection() {
    // Paired (current vs previous)
    const d = h('div', {class:'demo'});
    const c = h('div', {class:'chart'});
    c.innerHTML = `<div class="chart__head"><div><div class="chart__title">เดือนนี้ vs เดือนที่แล้ว</div><div class="chart__sub">พ.ย. 2568 vs ต.ค. 2568</div></div>
      <div class="chart__legend">
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-border-default)"></span>ต.ค.</span>
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-brand-emphasis)"></span>พ.ย.</span>
      </div></div>`;
    const list = h('div');
    const max = 600;
    [
      ['OPD visits', 412, 458],
      ['IPD admit', 128, 142],
      ['Surgeries', 64, 68],
      ['ER cases', 198, 224],
      ['Lab orders', 542, 598],
      ['Imaging', 142, 158]
    ].forEach(([label, prev, curr]) => {
      const r = h('div', {class:'cmpbar'});
      r.innerHTML = `
        <div class="cmpbar__label">${label}</div>
        <div class="cmpbar__col cmpbar__col--prev"><div class="cmpbar__fill" style="width:${prev/max*100}%"></div><span class="cmpbar__num">${prev}</span></div>
        <div class="cmpbar__col cmpbar__col--curr"><div class="cmpbar__fill" style="width:${curr/max*100}%"></div><span class="cmpbar__num">${curr}</span></div>`;
      list.appendChild(r);
    });
    c.appendChild(list);
    d.appendChild(c);

    // Stacked bars
    const d2 = h('div', {class:'demo'});
    const c2 = h('div', {class:'chart'});
    c2.innerHTML = `<div class="chart__head"><div><div class="chart__title">Bed occupancy by ward</div></div>
      <div class="chart__legend">
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-success-emphasis)"></span>Available</span>
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-brand-emphasis)"></span>Occupied</span>
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-warning-emphasis)"></span>Cleaning</span>
        <span class="chart__legend-item"><span class="chart__legend-dot" style="background:var(--ax-text-subtle)"></span>Blocked</span>
      </div></div>`;
    const stacks = h('div', {style:'display:flex;flex-direction:column;gap:10px'});
    [
      ['ICU 1 (12)', [[10,'brand'],[1,'warning'],[0,'success'],[1,'neutral']]],
      ['ICU 2 (10)', [[8,'brand'],[0,'warning'],[2,'success'],[0,'neutral']]],
      ['Med 4A (24)', [[18,'brand'],[2,'warning'],[3,'success'],[1,'neutral']]],
      ['Surg 3B (20)', [[14,'brand'],[1,'warning'],[5,'success'],[0,'neutral']]],
      ['Ped (16)',  [[8,'brand'],[1,'warning'],[6,'success'],[1,'neutral']]],
      ['OB (14)', [[12,'brand'],[0,'warning'],[2,'success'],[0,'neutral']]]
    ].forEach(([label, segs]) => {
      const total = segs.reduce((s,[v])=>s+v, 0);
      const row = h('div', {style:'display:grid;grid-template-columns:120px 1fr 60px;gap:10px;align-items:center'});
      row.appendChild(h('div', {style:'font-size:12px;color:var(--ax-text-default)'}, label));
      const sb = h('div', {class:'stackbar'});
      segs.forEach(([v, role]) => {
        if (v === 0) return;
        const seg = h('div', {class:'stackbar__seg stackbar__seg--'+role, style:`width:${v/total*100}%`});
        if (v >= 2) seg.textContent = v;
        sb.appendChild(seg);
      });
      row.appendChild(sb);
      const occ = segs[0][0];
      row.appendChild(h('div', {class:'mono', style:'font-size:11px;color:var(--ax-text-subtle);text-align:right'}, `${occ}/${total}`));
      stacks.appendChild(row);
    });
    c2.appendChild(stacks);
    d2.appendChild(c2);

    return section('comparison','57','Comparison bars',
      'เปรียบเทียบสองค่า (current vs prev) ด้วย back-to-back bars + stacked bar สำหรับ composition.',
      sub('Paired · current vs previous', d),
      sub('Stacked · ward occupancy', d2));
  }

  // ═══ 58. FUNNEL ═══
  function funnelSection() {
    const d = h('div', {class:'demo'});
    const c = h('div', {class:'chart'});
    c.innerHTML = `<div class="chart__head"><div><div class="chart__title">Patient journey · OPD funnel</div><div class="chart__sub">15 พ.ย. 2568 · 8:00–17:00</div></div></div>`;
    const f = h('div', {class:'funnel'});
    const steps = [
      ['ลงทะเบียน', 412, 100, ''],
      ['ตรวจสัญญาณชีพ', 398, 96.6, '14 คน ออก (3.4%)'],
      ['พบแพทย์', 376, 91.3, '22 คน หลุด (5.5%)'],
      ['สั่งแล็บ/X-ray', 248, 60.2, ''],
      ['รับยา', 364, 88.3, '12 คน ไม่รับ (3.2%)']
    ];
    const max = steps[0][1];
    steps.forEach(([label, count, pct, drop], idx) => {
      const r = h('div', {class:'funnel__step'});
      const wrap = h('div', {class:'funnel__bar-wrap'});
      const bar = h('div', {class:'funnel__bar' + (idx>0?' funnel__bar--s'+(idx+1):'')});
      bar.style.width = (count/max*100) + '%';
      bar.textContent = label;
      wrap.appendChild(bar);
      r.appendChild(wrap);
      r.appendChild(h('div', {class:'funnel__count'}, String(count)));
      r.appendChild(h('div', {class:'funnel__pct'}, pct.toFixed(1)+'%'));
      f.appendChild(r);
      if (drop) {
        const dropEl = h('div', {class:'funnel__drop'}, '↓ ' + drop);
        f.appendChild(dropEl);
      }
    });
    c.appendChild(f);
    d.appendChild(c);

    return section('funnel','58','Funnel',
      'Conversion / drop-off visualization — ขั้นตอนการเข้ารับบริการ, การสมัคร, การยินยอม. แสดง count + % + drop-off annotation.',
      sub('OPD patient journey', d));
  }

  // ═══ 59. DISTRIBUTION / HISTOGRAM ═══
  function distributionSection() {
    const d = h('div', {class:'demo'});
    const c = h('div', {class:'chart'});
    c.innerHTML = `<div class="chart__head"><div><div class="chart__title">การกระจายอายุผู้ป่วย IPD</div><div class="chart__sub">Q4 2568 · 1,248 คน · ค่าเฉลี่ย 58.4 ปี</div></div></div>`;
    const counts = [12, 28, 45, 68, 92, 118, 156, 184, 168, 142, 108, 78, 32, 11];
    const max = Math.max(...counts);
    const histo = h('div', {class:'histo'});
    counts.forEach((v, idx) => {
      const isPeak = v === max;
      const cls = isPeak ? 'histo__bar histo__bar--peak' : (idx >= 6 && idx <= 9 ? 'histo__bar' : 'histo__bar histo__bar--highlighted'.replace('histo__bar--highlighted', ''));
      const bar = h('div', {class: isPeak ? 'histo__bar histo__bar--peak' : 'histo__bar'});
      bar.style.height = (v/max*100)+'%';
      bar.innerHTML = `<span class="histo__bar-tip">${v}</span>`;
      histo.appendChild(bar);
    });
    c.appendChild(histo);
    const ax = h('div', {class:'histo-axis'});
    ['0','10','20','30','40','50','60','70','80','90','100+'].forEach(t => {
      ax.appendChild(h('div', {class:'histo-axis__tick'}, t));
    });
    c.appendChild(ax);
    // legend
    const stats = h('div', {style:'display:flex;gap:18px;font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);margin-top:6px'});
    stats.innerHTML = `
      <span>Median: <strong style="color:var(--ax-text-heading)">62</strong></span>
      <span>Mean: <strong style="color:var(--ax-text-heading)">58.4</strong></span>
      <span>SD: <strong style="color:var(--ax-text-heading)">±18.2</strong></span>
      <span>Mode: <strong style="color:var(--ax-success-emphasis)">60–69</strong></span>`;
    c.appendChild(stats);
    d.appendChild(c);

    // LOS distribution
    const d2 = h('div', {class:'demo'});
    const c2 = h('div', {class:'chart'});
    c2.innerHTML = `<div class="chart__head"><div><div class="chart__title">Length of stay (LOS) — วัน</div><div class="chart__sub">Median 4 วัน · max 24 วัน</div></div></div>`;
    const losCounts = [220, 312, 285, 198, 142, 88, 56, 38, 24, 16, 12, 8];
    const losMax = Math.max(...losCounts);
    const losHisto = h('div', {class:'histo'});
    losCounts.forEach((v, idx) => {
      const bar = h('div', {class:'histo__bar' + (idx>=8?' histo__bar--highlighted':'')});
      bar.style.height = (v/losMax*100)+'%';
      bar.innerHTML = `<span class="histo__bar-tip">${v}</span>`;
      losHisto.appendChild(bar);
    });
    c2.appendChild(losHisto);
    const ax2 = h('div', {class:'histo-axis'});
    ['1','2','3','4','5','6','7','8','9','10','11','12+'].forEach(t => ax2.appendChild(h('div', {class:'histo-axis__tick'}, t)));
    c2.appendChild(ax2);
    c2.appendChild(h('div', {style:'font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);margin-top:6px'},
      h('span', {style:'color:var(--ax-warning-emphasis)'}, '⚠ '),
      'long-stay (>8 days): 98 คน (5.4%) — เกินเป้า ≤ 4%'));
    d2.appendChild(c2);

    const g = h('div', {class:'grid grid-2', style:'align-items:start'});
    g.appendChild(sub('Age distribution', d));
    g.appendChild(sub('LOS distribution', d2));
    return section('distribution','59','Distribution / Histogram',
      'Frequency buckets สำหรับ age, LOS, lab values. Highlight peak (mode), outliers, threshold zones.',
      g);
  }

  // ═══ 60. STATUS GRID (BED MAP) ═══
  function bedgridSection() {
    const d = h('div', {class:'demo'});
    const c = h('div', {class:'chart'});
    c.innerHTML = `<div class="chart__head"><div><div class="chart__title">Bed map · ตึกอายุรกรรม 4A</div><div class="chart__sub">24 เตียง · 18 occupied (75%) · 2 cleaning · 1 blocked</div></div>
      <div class="bed-legend">
        <span class="bed-legend__sw"><span class="bed-legend__chip" style="background:var(--ax-background-default);border-color:var(--ax-success-emphasis)"></span>Available</span>
        <span class="bed-legend__sw"><span class="bed-legend__chip" style="background:var(--ax-brand-subtle);border-color:var(--ax-brand-emphasis)"></span>Occupied</span>
        <span class="bed-legend__sw"><span class="bed-legend__chip" style="background:var(--ax-warning-subtle);border-color:var(--ax-warning-emphasis)"></span>Observation</span>
        <span class="bed-legend__sw"><span class="bed-legend__chip" style="background:var(--ax-error-subtle);border-color:var(--ax-error-emphasis)"></span>Critical</span>
        <span class="bed-legend__sw"><span class="bed-legend__chip" style="background:var(--ax-background-subtle);border-style:dashed"></span>Cleaning</span>
        <span class="bed-legend__sw"><span class="bed-legend__chip" style="background:var(--ax-background-subtle);opacity:0.5"></span>Blocked</span>
      </div></div>`;
    const grid = h('div', {class:'bedgrid'});
    const beds = [
      // 1-8
      ['401','occupied','สุภาพร'], ['402','occupied','ประยุทธ์'], ['403','available','—'], ['404','occupied','สมศรี'],
      ['405','critical','+อนงค์'], ['406','occupied','วิชัย'], ['407','observation','สุดา'], ['408','occupied','รัตนา'],
      // 9-16
      ['409','occupied','ปริญญา'], ['410','cleaning','—'], ['411','occupied','กิตติ'], ['412','occupied','สุภาพร'],
      ['413','occupied','พรชัย'], ['414','available','—'], ['415','occupied','มาลี'], ['416','observation','ดวงใจ'],
      // 17-24
      ['417','occupied','สมพงษ์'], ['418','blocked','—'], ['419','occupied','อภิชาติ'], ['420','occupied','สมหวัง'],
      ['421','available','—'], ['422','cleaning','—'], ['423','occupied','ชลธิชา'], ['424','occupied','ธนพล']
    ];
    beds.forEach(([num, state, name]) => {
      const b = h('div', {class:'bed bed--'+state, title: state==='occupied'?`เตียง ${num} · ${name}`:`เตียง ${num} · ${state}`});
      b.innerHTML = `<div class="bed__num">${num}</div><div class="bed__sub">${name}</div>`;
      grid.appendChild(b);
    });
    c.appendChild(grid);
    d.appendChild(c);

    return section('bedgrid','60','Status grid (bed map)',
      'Spatial state visualization — bed map, OR rooms, equipment status. 6 states + hover tooltips + click handlers.',
      sub('Med ward 4A · 24 beds', d));
  }

  // build
  const root = document.getElementById('sections-phase3')
            || document.getElementById('sections-phase2')
            || document.getElementById('sections-phase1')
            || document.getElementById('sections-handoff');
  [
    lineChart, barChart, donutChart, sparklineSection, heatmapSection,
    statblockSection, comparisonSection, funnelSection, distributionSection, bedgridSection
  ].forEach(fn => { try { root.appendChild(fn()); } catch (e) { console.error(fn.name, e); } });
})();
