/* #74 I/O record */
/* NOTE: innerHTML below is a static trusted template literal — no user input is interpolated. */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function ioSection(){
    const card = h('div', {class:'io'});
    // Static trusted template — no user-supplied data interpolated
    card.innerHTML = [
      '<div class="io__head">',
      '  <div>',
      '    <div style="font-size:14px;font-weight:600;color:var(--ax-text-heading)">I/O Record · บันทึก Intake/Output</div>',
      '    <div style="font-size:11px;color:var(--ax-text-subtle);font-family:var(--ax-font-mono);margin-top:2px">',
      '      Form IO-24h · <span class="io__date-badge">2024-08-14</span> · Day 3 of admission',
      '    </div>',
      '  </div>',
      '  <div style="text-align:right;font-family:var(--ax-font-mono);font-size:10px;color:var(--ax-text-subtle);line-height:1.6">',
      '    AN · 67-12345<br/>Suda P. · Bed 4-12<br/>',
      '    <strong style="color:var(--ax-text-heading)">Dr. Kittisak W.</strong>',
      '  </div>',
      '</div>',

      '<div class="io__shift">',
      '  <div class="io__shift-h io__shift-h--day">',
      '    <span>Day shift &nbsp;<small>07:00–15:00</small></span>',
      '    <span style="font-weight:400;color:var(--ax-text-subtle)">complete</span>',
      '  </div>',
      '  <table class="io__table">',
      '    <thead><tr>',
      '      <th class="io__th" style="text-align:left;width:70px">Time</th>',
      '      <th class="io__th" style="text-align:left">Intake</th>',
      '      <th class="io__th" style="width:80px">Vol (mL)</th>',
      '      <th class="io__th" style="text-align:left">Output</th>',
      '      <th class="io__th" style="width:80px">Vol (mL)</th>',
      '    </tr></thead>',
      '    <tbody>',
      '      <tr><td class="io__td io__td--time">07:30</td><td class="io__td"><span class="io__type-badge io__type-badge--iv">IV</span> NS 0.9% · 1000 mL @125 mL/h</td><td class="io__td io__td--vol">1000</td><td class="io__td"></td><td class="io__td io__td--vol"></td></tr>',
      '      <tr><td class="io__td io__td--time">07–15</td><td class="io__td"></td><td class="io__td io__td--vol"></td><td class="io__td"><span class="io__type-badge io__type-badge--urine">Urine</span> catheter · Q2h running</td><td class="io__td io__td--vol">880</td></tr>',
      '      <tr><td class="io__td io__td--time">10:00</td><td class="io__td"><span class="io__type-badge io__type-badge--oral">Oral</span> water</td><td class="io__td io__td--vol">200</td><td class="io__td"></td><td class="io__td io__td--vol"></td></tr>',
      '      <tr><td class="io__td io__td--time">12:00</td><td class="io__td"><span class="io__type-badge io__type-badge--oral">Oral</span> soup/liquid diet</td><td class="io__td io__td--vol">150</td><td class="io__td"></td><td class="io__td io__td--vol"></td></tr>',
      '      <tr><td class="io__td io__td--time">14:00</td><td class="io__td"><span class="io__type-badge io__type-badge--iv">IV</span> NS+KCl 40 mEq · 500 mL @100 mL/h</td><td class="io__td io__td--vol">500</td><td class="io__td"></td><td class="io__td io__td--vol"></td></tr>',
      '      <tr class="io__subtotal-row"><td class="io__td" colspan="2">Shift total</td><td class="io__td io__td--vol">1850</td><td class="io__td"></td><td class="io__td io__td--vol">880</td></tr>',
      '      <tr class="io__subtotal-row"><td class="io__td" colspan="4" style="text-align:right;font-size:10px;color:var(--ax-text-subtle)">Shift balance</td><td class="io__td io__td--vol io__bal--pos">+970</td></tr>',
      '    </tbody>',
      '  </table>',
      '</div>',

      '<div class="io__shift">',
      '  <div class="io__shift-h io__shift-h--eve">',
      '    <span>Evening shift &nbsp;<small>15:00–23:00</small></span>',
      '    <span style="font-weight:400;color:var(--ax-text-subtle)">complete</span>',
      '  </div>',
      '  <table class="io__table">',
      '    <tbody>',
      '      <tr><td class="io__td io__td--time">15:30</td><td class="io__td"><span class="io__type-badge io__type-badge--iv">IV</span> NS 0.9% · 500 mL @50 mL/h</td><td class="io__td io__td--vol">500</td><td class="io__td"></td><td class="io__td io__td--vol"></td></tr>',
      '      <tr><td class="io__td io__td--time">15–23</td><td class="io__td"></td><td class="io__td io__td--vol"></td><td class="io__td"><span class="io__type-badge io__type-badge--urine">Urine</span> catheter · Q2h running</td><td class="io__td io__td--vol">600</td></tr>',
      '      <tr><td class="io__td io__td--time">17:00</td><td class="io__td"><span class="io__type-badge io__type-badge--oral">Oral</span> water</td><td class="io__td io__td--vol">200</td><td class="io__td"></td><td class="io__td io__td--vol"></td></tr>',
      '      <tr><td class="io__td io__td--time">20:00</td><td class="io__td"><span class="io__type-badge io__type-badge--oral">Oral</span> water</td><td class="io__td io__td--vol">150</td><td class="io__td"></td><td class="io__td io__td--vol"></td></tr>',
      '      <tr class="io__subtotal-row"><td class="io__td" colspan="2">Shift total</td><td class="io__td io__td--vol">850</td><td class="io__td"></td><td class="io__td io__td--vol">600</td></tr>',
      '      <tr class="io__subtotal-row"><td class="io__td" colspan="4" style="text-align:right;font-size:10px;color:var(--ax-text-subtle)">Shift balance</td><td class="io__td io__td--vol io__bal--pos">+250</td></tr>',
      '    </tbody>',
      '  </table>',
      '</div>',

      '<div class="io__shift">',
      '  <div class="io__shift-h io__shift-h--night io__shift-h--active">',
      '    <span>Night shift &nbsp;<small>23:00–07:00</small> <span style="font-size:9px;background:var(--ax-info-subtle);color:var(--ax-info-emphasis);padding:1px 6px;border-radius:3px;margin-left:4px">in progress</span></span>',
      '    <span style="font-weight:400;color:var(--ax-text-subtle)">as of 02:00</span>',
      '  </div>',
      '  <table class="io__table">',
      '    <tbody>',
      '      <tr><td class="io__td io__td--time">23:30</td><td class="io__td"><span class="io__type-badge io__type-badge--iv">IV</span> NS 0.9% · 500 mL @50 mL/h</td><td class="io__td io__td--vol">500</td><td class="io__td"></td><td class="io__td io__td--vol"></td></tr>',
      '      <tr><td class="io__td io__td--time">23–02</td><td class="io__td"></td><td class="io__td io__td--vol"></td><td class="io__td"><span class="io__type-badge io__type-badge--urine">Urine</span> catheter · running</td><td class="io__td io__td--vol">190</td></tr>',
      '      <tr class="io__subtotal-row"><td class="io__td" colspan="2">Shift total (partial)</td><td class="io__td io__td--vol">500</td><td class="io__td"></td><td class="io__td io__td--vol">190</td></tr>',
      '      <tr class="io__subtotal-row"><td class="io__td" colspan="4" style="text-align:right;font-size:10px;color:var(--ax-text-subtle)">Shift balance</td><td class="io__td io__td--vol io__bal--pos">+310</td></tr>',
      '    </tbody>',
      '  </table>',
      '</div>',

      '<div class="io__alert">',
      '  <span style="font-weight:600">⚠</span>',
      '  <span>24h cumulative balance <strong>+1530 mL</strong> — approaching fluid overload threshold (≥ +2000 mL) · monitor for respiratory distress</span>',
      '</div>',

      '<div class="io__foot">',
      '  <div class="io__totals">',
      '    <div class="io__total-item"><span class="io__total-label">24h Intake</span><span class="io__total-val">3200 mL</span></div>',
      '    <div class="io__total-item"><span class="io__total-label">24h Output</span><span class="io__total-val">1670 mL</span></div>',
      '    <div class="io__total-item"><span class="io__total-label">24h Balance</span><span class="io__total-val io__total-val--bal">+1530 mL</span></div>',
      '    <div class="io__total-item"><span class="io__total-label">Urine rate</span><span class="io__total-val">0.7 mL/kg/h</span></div>',
      '  </div>',
      '  <div class="io__btn-row">',
      '    <button class="io__btn">Print</button>',
      '    <button class="io__btn">Add entry</button>',
      '    <button class="io__btn io__btn--primary">Verify &amp; sign</button>',
      '  </div>',
      '</div>'
    ].join('');

    return section('ior','74','I/O record',
      'บันทึก intake/output 24 ชั่วโมง · จัดกลุ่มตาม shift · สรุป balance สะสม · แจ้งเตือนเมื่อเกินเกณฑ์.',
      sub('Fluid balance · Day 3 of admission', demo(card)));
  });
})();
