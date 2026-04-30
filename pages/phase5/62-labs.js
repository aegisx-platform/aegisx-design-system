/* #62 Lab results table */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function labsSection(){
    const card = h('div', {class:'lab'});

    const spark = (data, color) => {
      const max = Math.max(...data), min = Math.min(...data);
      const range = max-min || 1;
      const pts = data.map((v,i)=>`${(i/(data.length-1))*60},${18 - ((v-min)/range)*16 - 1}`).join(' ');
      return `<svg class="lab__spark" viewBox="0 0 60 18"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.2"/></svg>`;
    };

    const rows = [
      {group:'Hematology · CBC'},
      {n:'WBC', sub:'White blood cells', v:'14.2', u:'×10⁹/L', flag:'H', range:'4.0–10.0', spark:[8.2,9.5,11.0,12.8,14.2], delta:'+1.4', deltaC:'up', highlight:'high'},
      {n:'RBC', sub:'Red blood cells', v:'4.32', u:'×10¹²/L', flag:'', range:'4.20–5.40', spark:[4.4,4.4,4.3,4.3,4.32], delta:'-0.02', deltaC:''},
      {n:'Hgb', sub:'Hemoglobin', v:'10.8', u:'g/dL', flag:'L', range:'12.0–16.0', spark:[12.1,11.8,11.4,11.0,10.8], delta:'-0.2', deltaC:'down', highlight:'low'},
      {n:'Hct', sub:'Hematocrit', v:'33.2', u:'%', flag:'L', range:'36.0–46.0', spark:[36.1,35.4,34.5,33.8,33.2], delta:'-0.6', deltaC:'down', highlight:'low'},
      {n:'Plt', sub:'Platelets', v:'88', u:'×10⁹/L', flag:'LL', range:'150–400', spark:[180,140,120,98,88], delta:'-10', deltaC:'down', highlight:'crit'},
      {group:'Chemistry · BMP'},
      {n:'Na⁺', sub:'Sodium', v:'138', u:'mmol/L', flag:'', range:'135–145', spark:[140,139,138,138,138], delta:'0', deltaC:''},
      {n:'K⁺', sub:'Potassium', v:'5.8', u:'mmol/L', flag:'H', range:'3.5–5.1', spark:[4.2,4.6,5.1,5.4,5.8], delta:'+0.4', deltaC:'up', highlight:'high'},
      {n:'Creatinine', sub:'Cr · eGFR 38', v:'2.1', u:'mg/dL', flag:'H', range:'0.6–1.2', spark:[1.4,1.6,1.8,2.0,2.1], delta:'+0.1', deltaC:'up', highlight:'high'},
      {n:'Glucose', sub:'Random', v:'186', u:'mg/dL', flag:'H', range:'70–140', spark:[145,160,172,180,186], delta:'+6', deltaC:'up', highlight:'high'},
      {group:'Cardiac markers'},
      {n:'Troponin-I', sub:'hs-cTnI · 4h serial', v:'0.42', u:'ng/mL', flag:'HH', range:'<0.04', spark:[0.05,0.12,0.24,0.36,0.42], delta:'+0.06', deltaC:'up', highlight:'crit'},
      {n:'BNP', sub:'B-type natriuretic peptide', v:'620', u:'pg/mL', flag:'H', range:'<100', spark:[420,480,540,580,620], delta:'+40', deltaC:'up', highlight:'high'},
    ];

    const trs = rows.map(r=>{
      if (r.group) return `<tr class="lab__group"><td colspan="6">${r.group}</td></tr>`;
      const valCls = r.highlight==='crit' ? 'lab__val lab__val--crit' : r.highlight==='high' ? 'lab__val lab__val--high' : r.highlight==='low' ? 'lab__val lab__val--low' : 'lab__val';
      const flagCls = r.flag ? `lab__flag lab__flag--${r.flag}` : 'lab__flag';
      const sparkColor = r.highlight==='crit'||r.highlight==='high' ? 'var(--ax-error-emphasis)' : r.highlight==='low' ? 'var(--ax-warning-emphasis)' : 'var(--ax-text-subtle)';
      return `<tr>
        <td><div class="lab__name">${r.n}<small>${r.sub}</small></div></td>
        <td class="num"><span class="${valCls}">${r.v}</span> <span style="color:var(--ax-text-subtle);font-size:10px">${r.u}</span></td>
        <td class="num"><span class="${flagCls}">${r.flag||''}</span></td>
        <td class="num lab__range">${r.range}</td>
        <td>${spark(r.spark, sparkColor)}</td>
        <td class="num"><span class="lab__delta ${r.deltaC?`lab__delta--${r.deltaC}`:''}">${r.delta}</span></td>
      </tr>`;
    }).join('');

    card.innerHTML = `
      <div class="lab__head">
        <div>
          <div class="lab__title">Lab results · panel review</div>
          <div class="lab__meta">Collected 14:32 · resulted 15:18 · prev 18:00 yesterday</div>
        </div>
        <div class="lab__meta">12 of 12 resulted · 4 critical</div>
      </div>
      <table class="lab__table">
        <thead>
          <tr><th>Analyte</th><th class="num">Value</th><th class="num">Flag</th><th class="num">Reference</th><th>Trend (5d)</th><th class="num">Δ vs prev</th></tr>
        </thead>
        <tbody>${trs}</tbody>
      </table>`;

    return section('lab','62','Lab results table',
      'Grouped by panel · ค่า + flag (H/L/HH/LL) · reference range · sparkline 5 จุด · delta จาก prev result · critical values highlight แดงเข้ม.',
      sub('CBC + BMP + cardiac markers', demo(card)));
  });
})();
