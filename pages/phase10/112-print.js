/* #112 Print stylesheet */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  AX10.register(function printSection(){
    const card = h('div', {class:'prn'});
    card.innerHTML = `
      <div class="prn__head">
        <div class="prn__brand">
          <div class="prn__logo">PRT</div>
          <div>
            <div class="prn__title">Print stylesheet · A4 · A5 · thermal · @media print</div>
            <div class="prn__sub">six clinical documents pinned to print: Rx, lab order, discharge summary, wristband (75×25mm), referral, MAR sheet — chrome hidden, monochrome ink, 2 cm margins</div>
          </div>
        </div>
        <div class="prn__meta">
          <strong>preview</strong> Rx · A5 · BW<br/>
          <strong>media</strong> @media print<br/>
          <strong>page</strong> A5 portrait · 2 cm
        </div>
      </div>

      <div class="prn__tabs">
        <button class="prn__tab is-on">Rx · prescription <small>A5</small></button>
        <button class="prn__tab">Lab order <small>A4</small></button>
        <button class="prn__tab">Discharge <small>A4 · 2pp</small></button>
        <button class="prn__tab">Wristband <small>75×25</small></button>
        <button class="prn__tab">Referral <small>A4</small></button>
        <button class="prn__tab">MAR <small>A4 land.</small></button>
      </div>

      <div class="prn__body">

        <div class="prn__l">

          <div class="prn__paper">
            <div class="prn__paper-h">
              <div class="prn__hosp-mark">SR</div>
              <div>
                <div class="prn__hosp-name">SIRIRAJ HOSPITAL</div>
                <div class="prn__hosp-sub">Faculty of Medicine · Mahidol University · Wanglang Rd, Bangkok 10700</div>
                <div class="prn__hosp-sub">License No. 09-100-0001 · Tel 02-419-7000</div>
              </div>
              <div class="prn__doc-id">
                <strong>RX-2025-0034</strong><br/>
                printed 2025-03-14<br/>
                09:42 · OPD-12<br/>
                page 1 / 1
              </div>
            </div>

            <div class="prn__paper-t">Prescription · ใบสั่งยา</div>
            <div class="prn__paper-sub">Outpatient · valid 30 days from issue · controlled substances stamped separately</div>

            <div class="prn__pat">
              <div><div class="prn__pat-l">Patient</div><div class="prn__pat-v">Pongchai, Sudaa</div></div>
              <div><div class="prn__pat-l">MRN</div><div class="prn__pat-v">67-12345</div></div>
              <div><div class="prn__pat-l">Age / Sex</div><div class="prn__pat-v">64 / F</div></div>
              <div><div class="prn__pat-l">Weight</div><div class="prn__pat-v">58 kg</div></div>
              <div><div class="prn__pat-l">Allergy</div><div class="prn__pat-v" style="color:#7f1d1d;">PCN, Aspirin</div></div>
              <div><div class="prn__pat-l">Diagnosis</div><div class="prn__pat-v">DM-2 · HTN</div></div>
              <div><div class="prn__pat-l">Issued</div><div class="prn__pat-v">14 Mar 2025</div></div>
              <div><div class="prn__pat-l">Visit</div><div class="prn__pat-v">OPD F/U · 30 d</div></div>
            </div>

            <div class="prn__rx">
              <div class="prn__rx-row">
                <div class="prn__rx-n">1.</div>
                <div>
                  <div class="prn__rx-name">Metformin 500 mg tab</div>
                  <div class="prn__rx-sig">Sig: take 1 tab PO twice daily after meals · refill ×0</div>
                </div>
                <div class="prn__rx-qty">#60 tab<br/>30 d</div>
              </div>
              <div class="prn__rx-row">
                <div class="prn__rx-n">2.</div>
                <div>
                  <div class="prn__rx-name">Enalapril 10 mg tab</div>
                  <div class="prn__rx-sig">Sig: take 1 tab PO once daily in the morning · refill ×0</div>
                </div>
                <div class="prn__rx-qty">#30 tab<br/>30 d</div>
              </div>
              <div class="prn__rx-row">
                <div class="prn__rx-n">3.</div>
                <div>
                  <div class="prn__rx-name">Atorvastatin 20 mg tab</div>
                  <div class="prn__rx-sig">Sig: take 1 tab PO once daily at bedtime · refill ×0</div>
                </div>
                <div class="prn__rx-qty">#30 tab<br/>30 d</div>
              </div>
              <div class="prn__rx-row">
                <div class="prn__rx-n">4.</div>
                <div>
                  <div class="prn__rx-name">Insulin glargine 100 U/mL pen</div>
                  <div class="prn__rx-sig">Sig: inject 12 U SC SubQ at bedtime · rotate sites · refill ×0</div>
                </div>
                <div class="prn__rx-qty">1 pen<br/>30 d</div>
              </div>
            </div>

            <div class="prn__paper-foot">
              <div>
                <div class="prn__sig"></div>
                <div class="prn__sig-l">Prescriber signature</div>
                <div class="prn__sig-name">Dr. Naree Tantipong, MD · Lic 12345</div>
              </div>
              <div>
                <div class="prn__sig"></div>
                <div class="prn__sig-l">Pharmacist verification</div>
                <div class="prn__sig-name">Date / Time / Initials</div>
              </div>
            </div>

            <div class="prn__legal">
              <span>Generic substitution permitted unless marked DAW · For medical use only · keep out of reach of children</span>
              <span>SR-OPD-RX-v3.2</span>
            </div>

            <div class="prn__page">page 1 of 1 · A5 · 148 × 210 mm</div>
          </div>

        </div>

        <div class="prn__r">

          <div class="prn__sec-h"><span class="prn__sec-t">Page setup</span><span class="prn__sec-cap">@page rule</span></div>
          <div class="prn__opts">
            <div class="prn__opt-row">
              <span class="prn__opt-cb is-on">✓</span>
              <div class="prn__opt-l"><strong>Paper size</strong><small>auto-selects per template</small></div>
              <span class="prn__opt-c">A5</span>
            </div>
            <div class="prn__opt-row">
              <span class="prn__opt-cb is-on">✓</span>
              <div class="prn__opt-l"><strong>Orientation</strong><small>landscape only for MAR</small></div>
              <span class="prn__opt-c">portrait</span>
            </div>
            <div class="prn__opt-row">
              <span class="prn__opt-cb is-on">✓</span>
              <div class="prn__opt-l"><strong>Margin</strong><small>WHO patient-safety: ≥ 15 mm</small></div>
              <span class="prn__opt-c">20 mm</span>
            </div>
            <div class="prn__opt-row">
              <span class="prn__opt-cb is-on">✓</span>
              <div class="prn__opt-l"><strong>Header / Footer</strong><small>page X of Y · timestamp · doc-id</small></div>
              <span class="prn__opt-c">on</span>
            </div>
          </div>

          <div class="prn__sec-h"><span class="prn__sec-t">Color profile</span><span class="prn__sec-cap">ink-saving · WCAG safe in BW</span></div>
          <div class="prn__seg">
            <button>color</button>
            <button class="is-on">monochrome</button>
            <button>grayscale</button>
          </div>

          <div class="prn__sec-h"><span class="prn__sec-t">Hide on print</span><span class="prn__sec-cap">page-chrome elements</span></div>
          <div class="prn__opts">
            <div class="prn__opt-row">
              <span class="prn__opt-cb is-on">✓</span>
              <div class="prn__opt-l"><strong>App nav · sidebar · topbar</strong></div>
              <span class="prn__opt-c">aside, .nav</span>
            </div>
            <div class="prn__opt-row">
              <span class="prn__opt-cb is-on">✓</span>
              <div class="prn__opt-l"><strong>Toasts · floating panels · cmd-K</strong></div>
              <span class="prn__opt-c">[role="dialog"]</span>
            </div>
            <div class="prn__opt-row">
              <span class="prn__opt-cb is-on">✓</span>
              <div class="prn__opt-l"><strong>Hover-only icons · action buttons</strong></div>
              <span class="prn__opt-c">.no-print</span>
            </div>
            <div class="prn__opt-row">
              <span class="prn__opt-cb">·</span>
              <div class="prn__opt-l"><strong>Watermark · DRAFT</strong><small>only on unsigned drafts</small></div>
              <span class="prn__opt-c">conditional</span>
            </div>
          </div>

          <div class="prn__sec-h"><span class="prn__sec-t">@media print rules</span><span class="prn__sec-cap">_print.scss · 78 lines</span></div>
          <div class="prn__rules">
            <span class="c">/* page setup · A5 portrait */</span><br/>
            <span class="k">@page</span> { <span class="k">size</span>: <span class="v">A5 portrait</span>; <span class="k">margin</span>: <span class="v">20mm</span>; }<br/>
            <span class="k">@page</span>:first { <span class="k">margin-top</span>: <span class="v">28mm</span>; }<br/>
            <br/>
            <span class="c">/* hide app chrome */</span><br/>
            .sidebar, .topbar, [role="dialog"], .no-print { <span class="k">display</span>: <span class="v">none !important</span>; }<br/>
            <br/>
            <span class="c">/* keep tables together */</span><br/>
            tr, .prn__rx-row { <span class="k">break-inside</span>: <span class="v">avoid</span>; }<br/>
            h1, h2, .prn__paper-t { <span class="k">break-after</span>: <span class="v">avoid</span>; }<br/>
            <br/>
            <span class="c">/* drop tints · keep ink */</span><br/>
            * { <span class="k">background</span>: <span class="v">#fff !important</span>; }<br/>
            * { <span class="k">color</span>: <span class="v">#000 !important</span>; }<br/>
            * { <span class="k">box-shadow</span>: <span class="v">none</span>; }<br/>
            <br/>
            <span class="c">/* expose link URLs after text */</span><br/>
            a[href]::after { <span class="k">content</span>: <span class="v">" (" attr(href) ")"</span>; <span class="k">font-size</span>: <span class="v">9pt</span>; }
          </div>

        </div>

      </div>

      <div class="prn__foot">
        <div class="prn__foot-meta">6 templates · @page rules ship in _print.scss · QA every release on Lexmark MS431 + Brother HL-L2350 · barcode resolution ≥ 300 dpi · WHO Rx-safety compliant</div>
        <div style="display:flex; gap:8px;">
          <button class="prn__btn">Open print dialog · ⌘P</button>
          <button class="prn__btn">Download PDF</button>
          <button class="prn__btn prn__btn--p">Print 1 copy</button>
        </div>
      </div>`;

    return section('prn','112','Print stylesheet · @media print',
      'Two-column print preview. Header tabs switch between 6 print templates (Rx, lab order, discharge, wristband, referral, MAR). Left renders an authentic A5 prescription mockup on shadowed paper — hospital header strip, document id, patient grid (4×2 fields), 4-row Rx block with Sig + qty days-supply, 2-signature footer, legal micro-footer, page-of-N marker. Right configures @page setup (size · orientation · margin · headers), monochrome / grayscale color profile segmented control, hide-on-print element list, and a literal @media print CSS rules viewer.',
      sub('6 templates · A4 · A5 · thermal · WHO patient-safety margins · monochrome · ink-saving · barcode 300dpi', demo(card)));
  });
})();
