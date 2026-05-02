/* #83 Anesthesia record */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  // helper: build SVG vital trace over 12 columns (07:15..09:30, 15-min ticks)
  // BP rendered as systolic/diastolic with marker shapes; HR as line; SpO2 line.
  function vitalsSvg(){
    // 12 columns × 30 px = 360 px wide; 38 px height
    // simulate values
    const cols = 12;
    const w = 100, h = 100; // viewBox %; we use percent positioning
    return `
      <svg class="anrec__row-svg" viewBox="0 0 ${cols*30} 38" preserveAspectRatio="none">
        <defs>
          <pattern id="grd-an" x="0" y="0" width="${30}" height="38" patternUnits="userSpaceOnUse">
            <path d="M30 0 L30 38" stroke="var(--ax-border-subtle)" stroke-width="0.5"/>
            <path d="M0 19 L30 19" stroke="var(--ax-border-subtle)" stroke-width="0.3" stroke-dasharray="2,2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grd-an)"/>
        <!-- BP: systolic arrow-down (V), diastolic arrow-up (^) connected by vertical line at each 15 min -->
        <g stroke="var(--ax-error-emphasis)" stroke-width="1" fill="var(--ax-error-emphasis)">
          ${[
            [0,12,28],[1,14,30],[2,16,30],[3,18,32],[4,12,26],[5,10,24],[6,12,26],[7,14,28],[8,12,26],[9,10,24],[10,12,26],[11,14,28]
          ].map(([i,sy,dy])=>{
            const x = i*30 + 15;
            return `<line x1="${x}" y1="${sy}" x2="${x}" y2="${dy}" stroke-width="1.2"/>
              <polygon points="${x-3},${sy} ${x+3},${sy} ${x},${sy-4}" />
              <polygon points="${x-3},${dy} ${x+3},${dy} ${x},${dy+4}" />`;
          }).join('')}
        </g>
        <!-- HR line -->
        <polyline fill="none" stroke="var(--ax-info-emphasis)" stroke-width="1.4"
          points="${[18,16,17,15,18,20,21,22,20,18,17,16].map((y,i)=>`${i*30+15},${y}`).join(' ')}"/>
        ${[18,16,17,15,18,20,21,22,20,18,17,16].map((y,i)=>`<circle cx="${i*30+15}" cy="${y}" r="1.6" fill="var(--ax-info-emphasis)"/>`).join('')}
      </svg>`;
  }
  function satSvg(){
    return `
      <svg class="anrec__row-svg" viewBox="0 0 360 38" preserveAspectRatio="none">
        <rect width="100%" height="100%" fill="var(--ax-background-default)"/>
        <polyline fill="none" stroke="var(--ax-success-emphasis)" stroke-width="1.4"
          points="${[8,7,7,8,7,7,8,7,7,8,7,8].map((y,i)=>`${i*30+15},${y}`).join(' ')}"/>
        ${[8,7,7,8,7,7,8,7,7,8,7,8].map((y,i)=>`<circle cx="${i*30+15}" cy="${y}" r="1.6" fill="var(--ax-success-emphasis)"/>`).join('')}
        <polyline fill="none" stroke="var(--ax-warning-emphasis)" stroke-width="1.2" stroke-dasharray="3,2"
          points="${[26,28,27,28,27,26,27,26,27,28,27,28].map((y,i)=>`${i*30+15},${y}`).join(' ')}"/>
      </svg>`;
  }

  AX7.register(function anesthSection(){
    const card = h('div', {class:'anrec'});
    card.innerHTML = `
      <div class="anrec__head">
        <div class="anrec__brand">
          <div class="anrec__logo">ANES</div>
          <div>
            <div class="anrec__title">Anesthesia record · intra-operative</div>
            <div class="anrec__sub">Form AN-301 v2.4 · 14 Aug 2024 · OR-3 · sample period 07:15 – 09:30</div>
          </div>
        </div>
        <div class="anrec__meta">
          <strong>OR-2024-08-14-0712</strong><br/>
          AN · 67-12345<br/>
          attending: ภาวิช อ.
        </div>
      </div>

      <div class="anrec__strip">
        <div class="anrec__sc"><span class="anrec__sc-cap">patient · type</span><span class="anrec__sc-val">สุดา ปัญญาดี · F · 62y · 67kg</span><span class="anrec__sc-mono">general · ETT 7.0 · cuff 25</span></div>
        <div class="anrec__sc"><span class="anrec__sc-cap">ASA</span><span class="anrec__sc-val">II</span><span class="anrec__sc-mono">elective</span></div>
        <div class="anrec__sc"><span class="anrec__sc-cap">mallampati</span><span class="anrec__sc-val">II</span><span class="anrec__sc-mono">CL grade I</span></div>
        <div class="anrec__sc"><span class="anrec__sc-cap">airway</span><span class="anrec__sc-val">single attempt</span><span class="anrec__sc-mono">video laryngoscope</span></div>
        <div class="anrec__sc"><span class="anrec__sc-cap">monitors</span><span class="anrec__sc-val">5-lead ECG · NIBP · SpO₂ · EtCO₂ · Temp</span><span class="anrec__sc-mono">arterial line: nil</span></div>
      </div>

      <div class="anrec__chart">
        <div class="anrec__chart-h">
          <span class="anrec__chart-title">Vital signs · 15-min interval · 2 h 15 m sample</span>
          <div class="anrec__chart-legend">
            <span class="anrec__lg anrec__lg--bp">BP (V/^)</span>
            <span class="anrec__lg anrec__lg--hr">HR ●</span>
            <span class="anrec__lg anrec__lg--sat">SpO₂</span>
            <span class="anrec__lg anrec__lg--et">EtCO₂</span>
          </div>
        </div>

        <div class="anrec__times-row">
          <div class="anrec__times-pad"></div>
          <div class="anrec__times-strip">
            ${['07:15','07:30','07:45','08:00','08:15','08:30','08:45','09:00','09:15','09:30','09:45','10:00'].map(t=>`<div class="anrec__times-cell">${t}</div>`).join('')}
          </div>
        </div>

        <div class="anrec__grid">
          <div class="anrec__row-lbl">BP / HR</div>
          ${vitalsSvg()}
          <div class="anrec__row-lbl">SpO₂ / EtCO₂</div>
          ${satSvg()}
        </div>
      </div>

      <div class="anrec__drugs">
        <div class="anrec__drugs-h">
          <span class="anrec__drugs-title">Anesthetic agents · boluses &amp; infusions</span>
          <span class="anrec__drugs-title" style="opacity:0.6">running total</span>
        </div>

        <div class="anrec__drug">
          <div class="anrec__drug-name"><span class="anrec__drug-n">Propofol</span><span class="anrec__drug-d">induction · 2 mg/kg</span></div>
          <div class="anrec__drug-track">
            <div class="anrec__drug-bg"></div>
            <div class="anrec__drug-mark anrec__drug-mark--bolus" style="left:6%"><span>140 mg</span></div>
          </div>
          <div class="anrec__drug-total"><strong>140 mg</strong><span>total IV</span></div>
        </div>

        <div class="anrec__drug">
          <div class="anrec__drug-name"><span class="anrec__drug-n">Fentanyl</span><span class="anrec__drug-d">opioid bolus</span></div>
          <div class="anrec__drug-track">
            <div class="anrec__drug-bg"></div>
            <div class="anrec__drug-mark anrec__drug-mark--bolus" style="left:6%"><span>100 mcg</span></div>
            <div class="anrec__drug-mark anrec__drug-mark--bolus" style="left:38%"><span>50 mcg</span></div>
            <div class="anrec__drug-mark anrec__drug-mark--bolus" style="left:72%"><span>50 mcg</span></div>
          </div>
          <div class="anrec__drug-total"><strong>200 mcg</strong><span>total IV</span></div>
        </div>

        <div class="anrec__drug">
          <div class="anrec__drug-name"><span class="anrec__drug-n">Rocuronium</span><span class="anrec__drug-d">NMB · 0.6 mg/kg</span></div>
          <div class="anrec__drug-track">
            <div class="anrec__drug-bg"></div>
            <div class="anrec__drug-mark anrec__drug-mark--bolus" style="left:8%"><span>40 mg</span></div>
            <div class="anrec__drug-mark anrec__drug-mark--bolus" style="left:55%"><span>10 mg</span></div>
          </div>
          <div class="anrec__drug-total"><strong>50 mg</strong><span>total IV</span></div>
        </div>

        <div class="anrec__drug">
          <div class="anrec__drug-name"><span class="anrec__drug-n">Sevoflurane</span><span class="anrec__drug-d">inhaled · 1.5–2.0%</span></div>
          <div class="anrec__drug-track">
            <div class="anrec__drug-bg"></div>
            <div class="anrec__drug-infu" style="left:10%; right:8%">infusion · 1.8% avg · 2 L/min flow</div>
          </div>
          <div class="anrec__drug-total"><strong>1.8%</strong><span>avg MAC 0.9</span></div>
        </div>

        <div class="anrec__drug">
          <div class="anrec__drug-name"><span class="anrec__drug-n">Cisatracurium</span><span class="anrec__drug-d">infusion · 1.5 mcg/kg/min</span></div>
          <div class="anrec__drug-track">
            <div class="anrec__drug-bg"></div>
            <div class="anrec__drug-infu" style="left:14%; right:12%">infusion · TOF 1/4 maintained</div>
          </div>
          <div class="anrec__drug-total"><strong>20 mg</strong><span>total IV</span></div>
        </div>

        <div class="anrec__drug">
          <div class="anrec__drug-name"><span class="anrec__drug-n">Clindamycin</span><span class="anrec__drug-d">prophylaxis · pre-incision</span></div>
          <div class="anrec__drug-track">
            <div class="anrec__drug-bg"></div>
            <div class="anrec__drug-mark anrec__drug-mark--bolus" style="left:10%"><span>900 mg</span></div>
          </div>
          <div class="anrec__drug-total"><strong>900 mg</strong><span>IV · once</span></div>
        </div>
      </div>

      <div class="anrec__events">
        <span class="anrec__ev"><strong>07:18</strong> induction</span>
        <span class="anrec__ev"><strong>07:22</strong> intubation · ETT 7.0 · grade I</span>
        <span class="anrec__ev"><strong>07:33</strong> tourniquet ↑ 300 mmHg</span>
        <span class="anrec__ev"><strong>07:34</strong> incision</span>
        <span class="anrec__ev anrec__ev--imp"><strong>08:12</strong> transient ↓BP 88/52 → ephedrine 5 mg, recovered</span>
        <span class="anrec__ev"><strong>09:20</strong> tourniquet ↓ · TXA 2g topical</span>
        <span class="anrec__ev"><strong>09:21</strong> closure · sevoflurane off</span>
        <span class="anrec__ev"><strong>09:38</strong> reversal · sugammadex 200 mg · TOF 4/4</span>
        <span class="anrec__ev"><strong>09:40</strong> extubation · breathing spont · awake</span>
      </div>

      <div class="anrec__totals">
        <div class="anrec__tot"><span class="anrec__tot-cap">crystalloid</span><span class="anrec__tot-val">1,500 mL</span><span class="anrec__tot-meta">LRS</span></div>
        <div class="anrec__tot"><span class="anrec__tot-cap">colloid / blood</span><span class="anrec__tot-val">0 / 0</span><span class="anrec__tot-meta">2 U PRBC reserved</span></div>
        <div class="anrec__tot"><span class="anrec__tot-cap">EBL</span><span class="anrec__tot-val">180 mL</span><span class="anrec__tot-meta">tourniquet aided</span></div>
        <div class="anrec__tot"><span class="anrec__tot-cap">urine out</span><span class="anrec__tot-val">320 mL</span><span class="anrec__tot-meta">clear · Foley</span></div>
        <div class="anrec__tot"><span class="anrec__tot-cap">temp end</span><span class="anrec__tot-val">36.6 °C</span><span class="anrec__tot-meta">forced-air warming</span></div>
      </div>

      <div class="anrec__foot">
        <div class="anrec__foot-meta">All vitals from monitor auto-feed · drug events e-signed against ward MAR · TOF/BIS not displayed</div>
        <div style="display:flex; gap:6px;">
          <button class="anrec__btn">Export PDF (A3 chart)</button>
          <button class="anrec__btn">Send to PACU</button>
          <button class="anrec__btn anrec__btn--primary">✓ Sign &amp; lock</button>
        </div>
      </div>`;

    return section('anrec','83','Anesthesia record',
      'แบบฟอร์ม chart 15-min ticks · 12-column time strip · BP V/^ marker + HR line · SpO₂/EtCO₂ row · 6 drug tracks (bolus markers + infusion bars) ทั้งหมด render ใน SVG ตรงตาม timeline · narrative event chips inline · 5-block totals (crystalloid/EBL/urine/temp) · ASA + Mallampati + airway strip ด้านบน.',
      sub('Right TKA · GA · 2h sample · transient ↓BP at 08:12 highlighted', demo(card)));
  });
})();
