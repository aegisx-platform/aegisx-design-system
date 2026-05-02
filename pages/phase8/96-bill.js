/* #96 IPD bill / Itemized charges */
(function(){
  if (!window.AX8) return;
  const { h, section, sub, demo } = AX8;

  AX8.register(function billSection(){
    const card = h('div', {class:'bill'});
    card.innerHTML = `
      <div class="bill__head">
        <div class="bill__brand">
          <div class="bill__logo">BILL</div>
          <div>
            <div class="bill__title">IPD itemized bill · final invoice</div>
            <div class="bill__sub">Form FIN-306 v4.0 · LOS 4d · admit 13/8 → d/c 17/8 · printed 17 Aug 11:20</div>
          </div>
        </div>
        <div class="bill__meta">
          <strong>INV-2024-08-17-0411</strong><br/>
          AN · 67-12345 · TKA right<br/>
          ward 4 · bed 4-12
        </div>
      </div>

      <div class="bill__hero">
        <div class="bill__total">
          <span class="bill__total-cap">total charges</span>
          <span class="bill__total-val">฿ 184,520<small>.00</small></span>
          <span class="bill__total-meta">42 line items · 8 categories</span>
          <span class="bill__total-meta" style="margin-top:4px;">patient owes <strong>฿ 14,720.00</strong></span>
        </div>
        <div class="bill__pay">
          <div class="bill__pay-h"><span>Payor split</span><span class="bill__sec-cap">covered 92%</span></div>
          <div class="bill__pay-row">
            <span class="bill__pay-l">distribution</span>
            <div class="bill__pay-bar">
              <div class="bill__pay-seg bill__pay-seg--ins" style="width:78%">SS 78%</div>
              <div class="bill__pay-seg bill__pay-seg--copay" style="width:14%">co-pay 14%</div>
              <div class="bill__pay-seg bill__pay-seg--self" style="width:8%">self 8%</div>
            </div>
            <span class="bill__pay-amt">฿ 184,520</span>
          </div>
          <div class="bill__pay-row"><span class="bill__pay-l">Social Security</span><div class="bill__pay-bar"><div class="bill__pay-seg bill__pay-seg--ins" style="width:78%">covered</div></div><span class="bill__pay-amt">฿ 144,000</span></div>
          <div class="bill__pay-row"><span class="bill__pay-l">co-payment 30%</span><div class="bill__pay-bar"><div class="bill__pay-seg bill__pay-seg--copay" style="width:14%">excess</div></div><span class="bill__pay-amt">฿ 25,800</span></div>
          <div class="bill__pay-row"><span class="bill__pay-l">self-pay items</span><div class="bill__pay-bar"><div class="bill__pay-seg bill__pay-seg--self" style="width:8%">non-cov</div></div><span class="bill__pay-amt">฿ 14,720</span></div>
        </div>
      </div>

      <div class="bill__cov">
        <div class="bill__cov-cell"><span class="bill__cov-cap">primary payor</span><span class="bill__cov-val">SS · ประกันสังคม</span><span class="bill__cov-meta">ID 67-1234567 · DRG bundle</span></div>
        <div class="bill__cov-cell"><span class="bill__cov-cap">scheme</span><span class="bill__cov-val">DRG-08 · TKA</span><span class="bill__cov-meta">cap ฿ 144,000 · LOS ≤ 5d</span></div>
        <div class="bill__cov-cell"><span class="bill__cov-cap">pre-auth ref</span><span class="bill__cov-val">PA-2024-00871</span><span class="bill__cov-meta">approved 12/8 · valid 30d</span></div>
        <div class="bill__cov-cell"><span class="bill__cov-cap">claim status</span><span class="bill__cov-val">submitted 17/8</span><span class="bill__cov-meta">EDI · expect 30d</span></div>
      </div>

      <div class="bill__body">

        <!-- Cat 1 — Room -->
        <div class="bill__cat">
          <div class="bill__cat-h">
            <div class="bill__cat-icon">RM</div>
            <div class="bill__cat-t">Room &amp; board · 4 nights<small>ward 4 · standard 4-bed · post-op</small></div>
            <div class="bill__cat-tot">฿ 12,000</div>
          </div>
          <div class="bill__rows">
            <div class="bill__rh">date</div><div class="bill__rh">item</div><div class="bill__rh">qty</div><div class="bill__rh">cov</div><div class="bill__rh" style="text-align:right;">amount</div>
            <div class="bill__rc bill__rc--mono">13–14/8</div><div class="bill__rc">Standard ward bed · day 1</div><div class="bill__rc bill__rc--mono">1</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 3,000</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">14–15/8</div><div class="bill__rc bill__rc--bg">Standard ward bed · day 2</div><div class="bill__rc bill__rc--mono bill__rc--bg">1</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 3,000</div>
            <div class="bill__rc bill__rc--mono">15–16/8</div><div class="bill__rc">Standard ward bed · day 3</div><div class="bill__rc bill__rc--mono">1</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 3,000</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">16–17/8</div><div class="bill__rc bill__rc--bg">Standard ward bed · day 4</div><div class="bill__rc bill__rc--mono bill__rc--bg">1</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 3,000</div>
          </div>
        </div>

        <!-- Cat 2 — OR / Surgery -->
        <div class="bill__cat">
          <div class="bill__cat-h">
            <div class="bill__cat-icon">OR</div>
            <div class="bill__cat-t">Operating room &amp; surgery<small>14/8 · TKA right · 1h47m · OR-3</small></div>
            <div class="bill__cat-tot">฿ 78,500</div>
          </div>
          <div class="bill__rows">
            <div class="bill__rh">date</div><div class="bill__rh">item</div><div class="bill__rh">qty</div><div class="bill__rh">cov</div><div class="bill__rh" style="text-align:right;">amount</div>
            <div class="bill__rc bill__rc--mono">14/8</div><div class="bill__rc">OR time · 1st hour</div><div class="bill__rc bill__rc--mono">1h</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 12,000</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">14/8</div><div class="bill__rc bill__rc--bg">OR time · additional 47 min</div><div class="bill__rc bill__rc--mono bill__rc--bg">0.78h</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 9,500</div>
            <div class="bill__rc bill__rc--mono">14/8</div><div class="bill__rc">Surgeon fee · TKA primary</div><div class="bill__rc bill__rc--mono">1</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 25,000</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">14/8</div><div class="bill__rc bill__rc--bg">Knee implant · CR cemented (Zim)</div><div class="bill__rc bill__rc--mono bill__rc--bg">1</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov bill__rc-cov--partial">partial</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 28,000</div>
            <div class="bill__rc bill__rc--mono">14/8</div><div class="bill__rc">Disposable kit · TKA</div><div class="bill__rc bill__rc--mono">1</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 4,000</div>
          </div>
        </div>

        <!-- Cat 3 — Anesthesia -->
        <div class="bill__cat">
          <div class="bill__cat-h">
            <div class="bill__cat-icon">AN</div>
            <div class="bill__cat-t">Anesthesia<small>GA · 2h05m · anesthetist + nurse</small></div>
            <div class="bill__cat-tot">฿ 18,400</div>
          </div>
          <div class="bill__rows">
            <div class="bill__rh">date</div><div class="bill__rh">item</div><div class="bill__rh">qty</div><div class="bill__rh">cov</div><div class="bill__rh" style="text-align:right;">amount</div>
            <div class="bill__rc bill__rc--mono">14/8</div><div class="bill__rc">Anesthetist fee · GA</div><div class="bill__rc bill__rc--mono">2.1h</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 12,000</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">14/8</div><div class="bill__rc bill__rc--bg">Anesthesia drugs &amp; gas</div><div class="bill__rc bill__rc--mono bill__rc--bg">—</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 4,200</div>
            <div class="bill__rc bill__rc--mono">14/8</div><div class="bill__rc">Anesthesia equipment</div><div class="bill__rc bill__rc--mono">—</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 2,200</div>
          </div>
        </div>

        <!-- Cat 4 — Medication -->
        <div class="bill__cat">
          <div class="bill__cat-h">
            <div class="bill__cat-icon">RX</div>
            <div class="bill__cat-t">Medication &amp; IV fluids<small>4-day course · 14 items</small></div>
            <div class="bill__cat-tot">฿ 9,820</div>
          </div>
          <div class="bill__rows">
            <div class="bill__rh">date</div><div class="bill__rh">item</div><div class="bill__rh">qty</div><div class="bill__rh">cov</div><div class="bill__rh" style="text-align:right;">amount</div>
            <div class="bill__rc bill__rc--mono">13–17/8</div><div class="bill__rc">Cefazolin 1g IV</div><div class="bill__rc bill__rc--mono">8</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 1,920</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">13–17/8</div><div class="bill__rc bill__rc--bg">Enoxaparin 40mg SC</div><div class="bill__rc bill__rc--mono bill__rc--bg">5</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 2,500</div>
            <div class="bill__rc bill__rc--mono">13–17/8</div><div class="bill__rc">Paracetamol 500mg PO</div><div class="bill__rc bill__rc--mono">28</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 280</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">13–17/8</div><div class="bill__rc bill__rc--bg">Tramadol 50mg PRN</div><div class="bill__rc bill__rc--mono bill__rc--bg">9</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 720</div>
            <div class="bill__rc bill__rc--mono">13–17/8</div><div class="bill__rc">IV fluids · NSS / RLS</div><div class="bill__rc bill__rc--mono">8</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 1,200</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">13–17/8</div><div class="bill__rc bill__rc--bg">Other meds (10 items, see detail)</div><div class="bill__rc bill__rc--mono bill__rc--bg">—</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 3,200</div>
          </div>
        </div>

        <!-- Cat 5 — Lab + Imaging + PT + Other -->
        <div class="bill__cat">
          <div class="bill__cat-h">
            <div class="bill__cat-icon">DX</div>
            <div class="bill__cat-t">Diagnostics, PT &amp; ancillary<small>lab · imaging · physiotherapy · supplies</small></div>
            <div class="bill__cat-tot">฿ 51,080</div>
          </div>
          <div class="bill__rows">
            <div class="bill__rh">date</div><div class="bill__rh">item</div><div class="bill__rh">qty</div><div class="bill__rh">cov</div><div class="bill__rh" style="text-align:right;">amount</div>
            <div class="bill__rc bill__rc--mono">13/8</div><div class="bill__rc">Pre-op lab panel (CBC, BMP, PT/INR, Cr, type+screen)</div><div class="bill__rc bill__rc--mono">1</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 2,800</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">13/8</div><div class="bill__rc bill__rc--bg">Pre-op CXR + ECG</div><div class="bill__rc bill__rc--mono bill__rc--bg">1</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 1,400</div>
            <div class="bill__rc bill__rc--mono">14/8</div><div class="bill__rc">Knee X-ray AP+lat (post-op)</div><div class="bill__rc bill__rc--mono">2</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 1,600</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">14–17/8</div><div class="bill__rc bill__rc--bg">Physiotherapy session bedside</div><div class="bill__rc bill__rc--mono bill__rc--bg">6</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 4,800</div>
            <div class="bill__rc bill__rc--mono">14–17/8</div><div class="bill__rc">Wound dressing kit + supplies</div><div class="bill__rc bill__rc--mono">8</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 1,280</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">14/8</div><div class="bill__rc bill__rc--bg">Walker + non-skid socks (take-home)</div><div class="bill__rc bill__rc--mono bill__rc--bg">1</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov bill__rc-cov--no">self</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 2,800</div>
            <div class="bill__rc bill__rc--mono">14–17/8</div><div class="bill__rc">Single-room upgrade · 4 nights (patient request)</div><div class="bill__rc bill__rc--mono">4</div><div class="bill__rc"><span class="bill__rc-cov bill__rc-cov--no">self</span></div><div class="bill__rc bill__rc--right">฿ 12,000</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">13–17/8</div><div class="bill__rc bill__rc--bg">Meals · standard tray + snacks (LOS 4d)</div><div class="bill__rc bill__rc--mono bill__rc--bg">12</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 4,800</div>
            <div class="bill__rc bill__rc--mono">17/8</div><div class="bill__rc">Discharge medication 14-day supply</div><div class="bill__rc bill__rc--mono">1</div><div class="bill__rc"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right">฿ 1,600</div>
            <div class="bill__rc bill__rc--mono bill__rc--bg">13–17/8</div><div class="bill__rc bill__rc--bg">Other ancillary (5 items, see detail)</div><div class="bill__rc bill__rc--mono bill__rc--bg">—</div><div class="bill__rc bill__rc--bg"><span class="bill__rc-cov">SS</span></div><div class="bill__rc bill__rc--right bill__rc--bg">฿ 18,000</div>
          </div>
        </div>

      </div>

      <div class="bill__sum">
        <div class="bill__sum-c"><span class="bill__sum-cap">subtotal</span><span class="bill__sum-val">฿ 184,520</span></div>
        <div class="bill__sum-c"><span class="bill__sum-cap">covered (SS)</span><span class="bill__sum-val">− ฿ 144,000</span></div>
        <div class="bill__sum-c"><span class="bill__sum-cap">prior deposit</span><span class="bill__sum-val">− ฿ 25,800</span></div>
        <div class="bill__sum-c bill__sum-c--em"><span class="bill__sum-cap">balance due</span><span class="bill__sum-val">฿ 14,720</span></div>
      </div>

      <div class="bill__foot">
        <div class="bill__foot-meta">42 line items · DRG-08 TKA bundle · ineligible items billed self-pay · pay before discharge or 30d net · receipt e-mailed</div>
        <div style="display:flex; gap:6px;">
          <button class="bill__btn">Print receipt</button>
          <button class="bill__btn">Email PDF</button>
          <button class="bill__btn">Apply discount</button>
          <button class="bill__btn bill__btn--primary">✓ Settle ฿ 14,720</button>
        </div>
      </div>`;

    return section('bill','96','IPD bill · itemized charges',
      'Final invoice · ฿184,520 dark total panel + 4-row payor split bar (SS 78% / co-pay 14% / self 8%) · 4-cell coverage strip (payor/scheme DRG-08/pre-auth/claim status) · 5 itemized category cards (Room/OR/Anesthesia/Med/Ancillary) แต่ละ cat header มี icon + total + 5-col line table (date/item/qty/coverage chip/amount) with SS·partial·self chips · 4-cell summary footer (subtotal − covered − deposit = balance ฿14,720 dark) · action row (print/email/discount/settle).',
      sub('LOS 4d · TKA · ฿184,520 total · 92% covered · ฿14,720 balance', demo(card)));
  });
})();
