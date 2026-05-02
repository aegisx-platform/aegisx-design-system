/* #77 Medication reconciliation */
/* NOTE: innerHTML used with static hardcoded demo strings only — no user input, no XSS risk */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function medReconcileSection(){
    const card = h('div', {class:'mrec'});

    const rows = [
      /* Head */
      '<div class="mrec__head">',
      '  <div>',
      '    <div class="mrec__title">Medication Reconciliation &middot; เปรียบเทียบรายการยา</div>',
      '    <div class="mrec__sub">AN 67-12345 &middot; Suda P. &middot; Discharge: 2024-08-19 &middot; Ward 4 (Med-Surg)</div>',
      '  </div>',
      '  <div class="mrec__meta">',
      '    <strong>RPh. Kannika T.</strong><br>',
      '    Attending: Dr. Kittisak W.<br>',
      '    8 drugs reconciled',
      '  </div>',
      '</div>',
      /* Table */
      '<table class="mrec__table">',
      '  <thead>',
      '    <tr>',
      '      <th class="mrec__th">#</th>',
      '      <th class="mrec__th">Drug</th>',
      '      <th class="mrec__th">Home dose</th>',
      '      <th class="mrec__th">Hospital</th>',
      '      <th class="mrec__th">Discharge plan</th>',
      '      <th class="mrec__th">Action</th>',
      '      <th class="mrec__th">Note</th>',
      '    </tr>',
      '  </thead>',
      '  <tbody>',
      /* Row 1 - CONTINUE */
      '    <tr>',
      '      <td class="mrec__td">1</td>',
      '      <td class="mrec__td mrec__td--drug">Amlodipine 5 mg</td>',
      '      <td class="mrec__td">OD</td>',
      '      <td class="mrec__td">continued</td>',
      '      <td class="mrec__td">OD</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--continue">Continue</span></td>',
      '      <td class="mrec__td mrec__td--note">HTN</td>',
      '    </tr>',
      /* Row 2 - CONTINUE */
      '    <tr>',
      '      <td class="mrec__td">2</td>',
      '      <td class="mrec__td mrec__td--drug">Metformin 500 mg</td>',
      '      <td class="mrec__td">BID w/meals</td>',
      '      <td class="mrec__td">continued</td>',
      '      <td class="mrec__td">BID</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--continue">Continue</span></td>',
      '      <td class="mrec__td mrec__td--note">DM</td>',
      '    </tr>',
      /* Row 3 - CONTINUE */
      '    <tr>',
      '      <td class="mrec__td">3</td>',
      '      <td class="mrec__td mrec__td--drug">Enalapril 5 mg</td>',
      '      <td class="mrec__td">OD</td>',
      '      <td class="mrec__td">continued</td>',
      '      <td class="mrec__td">OD</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--continue">Continue</span></td>',
      '      <td class="mrec__td mrec__td--note">HTN+CKD</td>',
      '    </tr>',
      /* Row 4 - RESUME */
      '    <tr>',
      '      <td class="mrec__td">4</td>',
      '      <td class="mrec__td mrec__td--drug">Aspirin 81 mg</td>',
      '      <td class="mrec__td">OD</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--held">HELD</span></td>',
      '      <td class="mrec__td">resume OD</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--resume">Resume</span></td>',
      '      <td class="mrec__td mrec__td--note">held during acute illness</td>',
      '    </tr>',
      /* Row 5 - DCd */
      '    <tr>',
      '      <td class="mrec__td">5</td>',
      '      <td class="mrec__td mrec__td--drug mrec__td--dc">Levofloxacin 750 mg</td>',
      '      <td class="mrec__td">&mdash;</td>',
      '      <td class="mrec__td">Day 1&ndash;2 (IV)</td>',
      '      <td class="mrec__td">&mdash;</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--dc">DC\'d</span></td>',
      '      <td class="mrec__td mrec__td--note">switched to ceftriaxone</td>',
      '    </tr>',
      /* Row 6 - DCd */
      '    <tr>',
      '      <td class="mrec__td">6</td>',
      '      <td class="mrec__td mrec__td--drug mrec__td--dc">Ceftriaxone 2 g IV</td>',
      '      <td class="mrec__td">&mdash;</td>',
      '      <td class="mrec__td">Day 1&ndash;7</td>',
      '      <td class="mrec__td">&mdash;</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--dc">DC\'d</span></td>',
      '      <td class="mrec__td mrec__td--note">course complete</td>',
      '    </tr>',
      /* Row 7 - NEW */
      '    <tr>',
      '      <td class="mrec__td">7</td>',
      '      <td class="mrec__td mrec__td--drug">Amoxicillin-clavulanate 875/125 mg</td>',
      '      <td class="mrec__td">&mdash;</td>',
      '      <td class="mrec__td">&mdash;</td>',
      '      <td class="mrec__td">BID 7d</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--new">New</span></td>',
      '      <td class="mrec__td mrec__td--note">oral step-down</td>',
      '    </tr>',
      /* Row 8 - CONTINUE */
      '    <tr>',
      '      <td class="mrec__td">8</td>',
      '      <td class="mrec__td mrec__td--drug">Paracetamol 500 mg</td>',
      '      <td class="mrec__td">PRN</td>',
      '      <td class="mrec__td">scheduled Q6h</td>',
      '      <td class="mrec__td">PRN Q6h</td>',
      '      <td class="mrec__td"><span class="mrec__action mrec__action--continue">Continue</span></td>',
      '      <td class="mrec__td mrec__td--note">&nbsp;</td>',
      '    </tr>',
      '  </tbody>',
      '</table>',
      /* Footer */
      '<div class="mrec__foot">',
      '  <div>',
      '    <div class="mrec__summary">8 drugs reconciled &middot; 0 discrepancies &middot; 2 new prescriptions</div>',
      '    <div class="mrec__sign-row">Pharmacist reviewed 11:15 &middot; Physician confirmed 11:22</div>',
      '  </div>',
      '  <div class="mrec__btn-row">',
      '    <button class="mrec__btn">Print</button>',
      '    <button class="mrec__btn">Export PDF</button>',
      '    <button class="mrec__btn mrec__btn--primary">Confirm &amp; sign</button>',
      '  </div>',
      '</div>'
    ];

    card.innerHTML = rows.join('\n');
    return section('mrec','77','Medication reconciliation',
      'เปรียบเทียบยาบ้าน · ยาใน · แผนจำหน่าย · pharmacist sign-off.',
      sub('Home → Hospital → Discharge plan', demo(card)));
  });
})();
