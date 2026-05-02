/* #74 I/O record · 24h intake/output */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function ioSection(){
    const card = h('div', {class:'io'});

    // hourly data: [hour, oralIn, ivIn, urineOut, drainOut]
    const hours = [
      ['00', 0, 80, 60, 0], ['01', 0, 80, 0, 0], ['02', 0, 80, 90, 0], ['03', 0, 80, 0, 0],
      ['04', 0, 80, 70, 0], ['05', 0, 80, 0, 0], ['06', 60, 80, 80, 5],
      // Day shift
      ['07', 120, 80, 50, 0], ['08', 200, 80, 100, 5], ['09', 180, 80, 0, 0], ['10', 150, 80, 80, 0],
      ['11', 100, 80, 0, 0], ['12', 250, 80, 90, 5], ['13', 100, 80, 60, 0], ['14', 80, 80, 850, 10],
      // Evening
      ['15', 120, 80, 200, 0], ['16', 100, 80, 80, 0], ['17', 200, 80, 60, 0], ['18', 250, 80, 100, 5],
      ['19', 100, 80, 90, 0], ['20', 50, 80, 70, 0], ['21', 30, 80, 60, 0], ['22', 0, 80, 50, 0], ['23', 0, 80, 80, 0]
    ];

    let totalIn=0, totalOut=0;
    hours.forEach(r=>{ totalIn += r[1]+r[2]; totalOut += r[3]+r[4]; });
    const balance = totalIn - totalOut;

    const hourRow = (r)=>`<tr><td>${r[0]}:00</td>
      <td class="${r[1]?'io__td-in':'io__td-zero'}">${r[1]||'—'}</td>
      <td class="${r[2]?'io__td-in':'io__td-zero'}">${r[2]||'—'}</td>
      <td class="io__td-in"><strong>${r[1]+r[2]}</strong></td>
      <td class="${r[3]?'io__td-out':'io__td-zero'}">${r[3]||'—'}</td>
      <td class="${r[4]?'io__td-out':'io__td-zero'}">${r[4]||'—'}</td>
      <td class="io__td-out"><strong>${r[3]+r[4]}</strong></td></tr>`;

    const shiftSum = (label, slice)=>{
      let oi=0, iv=0, uo=0, do_=0;
      slice.forEach(r=>{ oi+=r[1]; iv+=r[2]; uo+=r[3]; do_+=r[4]; });
      const inT = oi+iv, outT = uo+do_, bal = inT-outT;
      return `<tr class="io__row-shift"><td>${label}</td><td>${oi}</td><td>${iv}</td><td>${inT}</td><td>${uo}</td><td>${do_}</td><td>${outT}<span style="color:var(--ax-text-subtle); font-weight:400; margin-left:6px;">bal ${bal>=0?'+':''}${bal}</span></td></tr>`;
    };

    const oralBar = Math.round(hours.reduce((s,r)=>s+r[1],0));
    const ivBar = Math.round(hours.reduce((s,r)=>s+r[2],0));
    const urineBar = Math.round(hours.reduce((s,r)=>s+r[3],0));
    const drainBar = Math.round(hours.reduce((s,r)=>s+r[4],0));
    const maxIn = Math.max(oralBar, ivBar);
    const maxOut = Math.max(urineBar, drainBar, 1);
    const maxAny = Math.max(maxIn, maxOut);

    card.innerHTML = `
      <div class="io__head">
        <div>
          <div class="io__title">Intake / Output record · ใบบันทึกน้ำเข้า-ออก</div>
          <div class="io__sub">AN 67-12345 · Suda P. · Bed 4-12 · fluid restriction 1500 mL/day</div>
        </div>
        <div class="io__day-nav">
          <button>‹</button>
          <span class="io__day-cur">2024-08-14 (Day 3)</span>
          <button>›</button>
        </div>
      </div>

      <div class="io__sum">
        <div class="io__sum-cell">
          <span class="io__sum-label">total intake</span>
          <span class="io__sum-value">${totalIn.toLocaleString()}<span class="io__sum-unit">mL</span></span>
          <span class="io__sum-delta">oral ${oralBar} · IV ${ivBar}</span>
        </div>
        <div class="io__sum-cell">
          <span class="io__sum-label">total output</span>
          <span class="io__sum-value">${totalOut.toLocaleString()}<span class="io__sum-unit">mL</span></span>
          <span class="io__sum-delta">urine ${urineBar} · drain ${drainBar}</span>
        </div>
        <div class="io__sum-cell io__sum-cell--bal">
          <span class="io__sum-label">24h balance</span>
          <span class="io__sum-value ${balance>=0?'io__sum-bal--pos':'io__sum-bal--neg'}">${balance>=0?'+':''}${balance}<span class="io__sum-unit">mL</span></span>
          <span class="io__sum-delta">${balance>=0?'positive':'negative'} balance</span>
        </div>
        <div class="io__sum-cell">
          <span class="io__sum-label">cumulative · 3d</span>
          <span class="io__sum-value io__sum-bal--neg">−2,840<span class="io__sum-unit">mL</span></span>
          <span class="io__sum-delta">target: net negative</span>
        </div>
      </div>

      <div class="io__bars">
        <div class="io__bar-row">
          <span class="io__bar-label">Oral PO</span>
          <div class="io__bar-track"><div class="io__bar-fill io__bar-fill--in" style="width:${(oralBar/maxAny*100).toFixed(0)}%">${oralBar}</div></div>
          <span class="io__bar-total">${oralBar} mL</span>
        </div>
        <div class="io__bar-row">
          <span class="io__bar-label">IV fluids</span>
          <div class="io__bar-track"><div class="io__bar-fill io__bar-fill--in" style="width:${(ivBar/maxAny*100).toFixed(0)}%">${ivBar}</div></div>
          <span class="io__bar-total">${ivBar} mL</span>
        </div>
        <div class="io__bar-row">
          <span class="io__bar-label">Urine</span>
          <div class="io__bar-track"><div class="io__bar-fill io__bar-fill--out" style="width:${(urineBar/maxAny*100).toFixed(0)}%">${urineBar}</div></div>
          <span class="io__bar-total">${urineBar} mL</span>
        </div>
        <div class="io__bar-row">
          <span class="io__bar-label">Drains</span>
          <div class="io__bar-track"><div class="io__bar-fill io__bar-fill--out" style="width:${Math.max(2,(drainBar/maxAny*100)).toFixed(0)}%">${drainBar}</div></div>
          <span class="io__bar-total">${drainBar} mL</span>
        </div>
      </div>

      <div class="io__grid">
        <table>
          <thead>
            <tr>
              <th>time</th>
              <th>PO</th>
              <th>IV</th>
              <th>IN</th>
              <th>urine</th>
              <th>drain</th>
              <th>OUT</th>
            </tr>
          </thead>
          <tbody>
            ${shiftSum('Night · 23–07', hours.slice(0,7))}
            ${hours.slice(0,7).map(hourRow).join('')}
            ${shiftSum('Day · 07–15', hours.slice(7,15))}
            ${hours.slice(7,15).map(hourRow).join('')}
            ${shiftSum('Evening · 15–23', hours.slice(15))}
            ${hours.slice(15).map(hourRow).join('')}
          </tbody>
        </table>
      </div>

      <div class="io__foot">
        <div class="io__legend">
          <span><span class="io__legend-dot" style="background:var(--ax-info-emphasis)"></span>intake</span>
          <span><span class="io__legend-dot" style="background:var(--ax-warning-emphasis)"></span>output</span>
          <span>balance = IN − OUT · target net negative for CHF</span>
        </div>
        <div class="io__btn-row">
          <button class="io__btn">Export 24h CSV</button>
          <button class="io__btn">Print chart</button>
          <button class="io__btn io__btn--primary">+ Record entry</button>
        </div>
      </div>`;

    return section('io','74','Intake / Output record',
      'บันทึก fluid balance ราย 24 ชั่วโมง · summary band (in/out/balance/cumulative) · stacked bar viz · hourly grid grouped by shift (night/day/evening) · ทันสมัย: คอมพิวต์ subtotal อัตโนมัติ · เป้าหมายแสดงตามปัญหา (CHF → net negative).',
      sub('24-hour balance · day 3', demo(card)));
  });
})();
