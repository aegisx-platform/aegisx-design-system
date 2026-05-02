/* #82 OR record / Operative note */
(function(){
  if (!window.AX7) return;
  const { h, section, sub, demo } = AX7;

  AX7.register(function opnoteSection(){
    const card = h('div', {class:'opnote'});
    card.innerHTML = `
      <div class="opnote__head">
        <div class="opnote__brand">
          <div class="opnote__logo">OP-NOTE</div>
          <div>
            <div class="opnote__title">Operative note · OR record</div>
            <div class="opnote__sub">Form OR-201 v3.0 · 14 Aug 2024 · OR-3 · case 2</div>
          </div>
        </div>
        <div class="opnote__meta">
          <strong>OR-2024-08-14-0712</strong><br/>
          AN · 67-12345<br/>
          PAS-882471
        </div>
      </div>

      <div class="opnote__pt">
        <div class="opnote__pt-cell"><span class="opnote__pt-cap">patient</span><span class="opnote__pt-val">สุดา ปัญญาดี · F · 62y</span><span class="opnote__pt-mono">HN 6712-3344</span></div>
        <div class="opnote__pt-cell"><span class="opnote__pt-cap">surgeon</span><span class="opnote__pt-val">นพ. กิตติศักดิ์ ม.</span><span class="opnote__pt-mono">primary · attending</span></div>
        <div class="opnote__pt-cell"><span class="opnote__pt-cap">1st assistant</span><span class="opnote__pt-val">นพ. ธนากร ส.</span><span class="opnote__pt-mono">resident PGY-3</span></div>
        <div class="opnote__pt-cell"><span class="opnote__pt-cap">scrub / circ</span><span class="opnote__pt-val">RN ปริม · RN วาสนา</span><span class="opnote__pt-mono">scrub · circulating</span></div>
        <div class="opnote__pt-cell"><span class="opnote__pt-cap">anesthesia</span><span class="opnote__pt-val">นพ. ภาวิช อ.</span><span class="opnote__pt-mono">general · ETT</span></div>
      </div>

      <div class="opnote__times">
        <div class="opnote__time"><span class="opnote__time-cap">into OR</span><span class="opnote__time-val">07:12</span><span class="opnote__time-meta">from holding</span></div>
        <div class="opnote__time"><span class="opnote__time-cap">anesth. start</span><span class="opnote__time-val">07:18</span><span class="opnote__time-meta">induction</span></div>
        <div class="opnote__time"><span class="opnote__time-cap">incision</span><span class="opnote__time-val">07:34</span><span class="opnote__time-meta">tourniquet ↑ 07:33</span></div>
        <div class="opnote__time"><span class="opnote__time-cap">closure</span><span class="opnote__time-val">09:21</span><span class="opnote__time-meta">tourniquet ↓ 09:20</span></div>
        <div class="opnote__time"><span class="opnote__time-cap">out of OR</span><span class="opnote__time-val">09:42</span><span class="opnote__time-meta">to PACU</span></div>
        <div class="opnote__time opnote__time--total"><span class="opnote__time-cap">surgical time</span><span class="opnote__time-val">1 h 47 m</span><span class="opnote__time-meta">tourniquet 1 h 47 m</span></div>
      </div>

      <div class="opnote__body">
        <div class="opnote__col">
          <div class="opnote__sec">
            <div class="opnote__sec-h"><span class="opnote__sec-title">Pre-op &amp; post-op diagnosis</span><span class="opnote__sec-cap">ICD-10</span></div>
            <div class="opnote__txt">
              <strong>Pre-op:</strong> Severe primary osteoarthritis, right knee · <em>M17.11</em><br/>
              <strong>Post-op:</strong> same · confirmed Kellgren–Lawrence grade IV with medial compartment collapse and varus deformity 8°<br/>
              <strong>Procedure performed:</strong> Right total knee arthroplasty, cemented · cruciate-retaining · primary
            </div>
          </div>

          <div class="opnote__sec">
            <div class="opnote__sec-h"><span class="opnote__sec-title">Operative findings</span><span class="opnote__sec-cap">5 items</span></div>
            <div class="opnote__list">
              <div class="opnote__item"><div class="opnote__item-num">1</div><div>Medial femoral &amp; tibial compartments with full-thickness cartilage loss; eburnated bone with osteophytes circumferentially.</div></div>
              <div class="opnote__item"><div class="opnote__item-num">2</div><div>Lateral compartment with grade II–III chondromalacia, no full-thickness defect.</div></div>
              <div class="opnote__item"><div class="opnote__item-num">3</div><div>PCL intact and competent — cruciate-retaining design suitable.</div></div>
              <div class="opnote__item"><div class="opnote__item-num">4</div><div>Patella with grade III chondromalacia, small osteophytes resected; resurfaced.</div></div>
              <div class="opnote__item"><div class="opnote__item-num">5</div><div>Varus deformity 8° corrected to mechanical neutral; balanced flexion/extension gaps.</div></div>
            </div>
          </div>

          <div class="opnote__sec">
            <div class="opnote__sec-h"><span class="opnote__sec-title">Procedure (narrative)</span><span class="opnote__sec-cap">CPT 27447</span></div>
            <div class="opnote__txt">
              Patient brought to OR &amp; placed supine on the operating table. <strong>Time-out</strong> performed — confirmed identity, procedure, site (right knee marked), allergies (PCN/sulfa), antibiotics (clindamycin 900 mg IV given 07:00). General anesthesia induced via ETT by Dr. Pawit. <strong>Tourniquet</strong> placed on right thigh, padded; inflated to 300 mmHg at 07:33.<br/><br/>
              Standard <strong>midline skin incision</strong> over the right knee, medial parapatellar arthrotomy. Patella everted; ACL excised, PCL preserved. Tibial cut performed at 3° posterior slope using extramedullary jig. Distal femoral cut at 5° valgus using intramedullary jig; anterior, posterior, and chamfer cuts completed. Trial components inserted — gap balancing and tracking <strong>excellent</strong>.<br/><br/>
              Final components (see right) cemented in place with <em>Palacos R+G</em>. Patella resurfaced. Wound irrigated with 3 L saline; <strong>tranexamic acid 2 g</strong> instilled topically. Tourniquet released — hemostasis achieved with bipolar. Closed in layers: capsule (Vicryl 1), subQ (Vicryl 2-0), skin staples. Sterile dressing &amp; compression bandage applied. Patient awoke, extubated, transferred to PACU in stable condition.
            </div>
          </div>
        </div>

        <div class="opnote__col opnote__col--right">
          <div class="opnote__sec">
            <div class="opnote__sec-h"><span class="opnote__sec-title">Anesthesia / fluids</span><span class="opnote__sec-cap">summary</span></div>
            <dl class="opnote__kv">
              <dt>Type</dt><dd><strong>General · ETT 7.0</strong></dd>
              <dt>EBL</dt><dd><strong>180 mL</strong> · cell-saver not needed</dd>
              <dt>Crystalloid</dt><dd>1,500 mL LRS</dd>
              <dt>Colloid</dt><dd>0 mL</dd>
              <dt>Blood</dt><dd>0 U transfused · 2 U PRBC reserved</dd>
              <dt>Urine out</dt><dd>320 mL · clear</dd>
              <dt>Drains</dt><dd>1 × Hemovac 100 mL · suction</dd>
            </dl>
          </div>

          <div class="opnote__sec">
            <div class="opnote__sec-h"><span class="opnote__sec-title">Counts · sponge / sharp / instr</span><span class="opnote__sec-cap">final ✓</span></div>
            <table class="opnote__counts">
              <thead><tr><th>item</th><th class="num">init</th><th class="num">added</th><th class="num">final</th></tr></thead>
              <tbody>
                <tr class="match"><td>Lap sponges</td><td class="num">10</td><td class="num">5</td><td class="num">15 / 15</td></tr>
                <tr class="match"><td>Raytec 4×4</td><td class="num">20</td><td class="num">10</td><td class="num">30 / 30</td></tr>
                <tr class="match"><td>Needles</td><td class="num">0</td><td class="num">14</td><td class="num">14 / 14</td></tr>
                <tr class="match"><td>Blades</td><td class="num">0</td><td class="num">3</td><td class="num">3 / 3</td></tr>
                <tr class="match"><td>Instruments</td><td class="num">142</td><td class="num">0</td><td class="num">142 / 142</td></tr>
              </tbody>
            </table>
          </div>

          <div class="opnote__sec">
            <div class="opnote__sec-h"><span class="opnote__sec-title">Implants &amp; lot</span><span class="opnote__sec-cap">4 items</span></div>
            <div class="opnote__implants">
              <div class="opnote__implant"><div><strong>Femoral component</strong><br/><span>size 4 · CR · cobalt-chrome</span></div><span>LOT FX-882471 · exp 2027</span></div>
              <div class="opnote__implant"><div><strong>Tibial baseplate</strong><br/><span>size 3 · titanium</span></div><span>LOT TB-441290 · exp 2027</span></div>
              <div class="opnote__implant"><div><strong>Polyethylene insert</strong><br/><span>size 3 · 10 mm · CR</span></div><span>LOT PE-77820 · exp 2026</span></div>
              <div class="opnote__implant"><div><strong>Patella button</strong><br/><span>32 mm · all-poly</span></div><span>LOT PT-3389 · exp 2027</span></div>
            </div>
          </div>

          <div class="opnote__sec">
            <div class="opnote__sec-h"><span class="opnote__sec-title">Specimens to path</span><span class="opnote__sec-cap">2</span></div>
            <div class="opnote__spec"><div class="opnote__spec-icon">S1</div><div><strong>Synovium</strong> · right knee · in formalin</div><span class="opnote__spec-meta">PATH-9921</span></div>
            <div class="opnote__spec"><div class="opnote__spec-icon">S2</div><div><strong>Bone fragments</strong> · resected medial tibia · in formalin</div><span class="opnote__spec-meta">PATH-9922</span></div>
          </div>

          <div class="opnote__sec">
            <div class="opnote__sec-h"><span class="opnote__sec-title">Disposition · post-op orders</span><span class="opnote__sec-cap"></span></div>
            <div class="opnote__txt">
              To PACU stable · then ortho ward bed 4-12 · WB as tolerated with walker · ice/elevation · CPM 0–60° · enoxaparin 40 mg SC q24h × 14d · acetaminophen 1 g PO q6h, oxycodone 5 mg PO q4h prn · CBC + CMP AM · OT/PT POD-1 · drain out POD-2 · staples out POD-14.
            </div>
          </div>
        </div>
      </div>

      <div class="opnote__sign">
        <div class="opnote__sig"><span class="opnote__sig-cap">primary surgeon</span><span class="opnote__sig-name">Dr. Kittisak Manomai, MD</span><span class="opnote__sig-meta">e-sign · 09:55 · attending · v3489</span></div>
        <div class="opnote__sig"><span class="opnote__sig-cap">scrub nurse · counts attest</span><span class="opnote__sig-name">RN Parim Suthon</span><span class="opnote__sig-meta">e-sign · 09:32 · counts ✓</span></div>
        <div class="opnote__sig"><span class="opnote__sig-cap">circulating nurse · timeline</span><span class="opnote__sig-name">RN Wassana Klin</span><span class="opnote__sig-meta">e-sign · 09:42 · times ✓</span></div>
      </div>

      <div class="opnote__foot">
        <div class="opnote__foot-meta">CPT 27447 · ASA II · status: clean wound class I · estimated coding revenue THB 158,400</div>
        <div style="display:flex; gap:6px;">
          <button class="opnote__btn">Print operative note</button>
          <button class="opnote__btn">Send to billing</button>
          <button class="opnote__btn opnote__btn--primary">✓ Sign &amp; lock</button>
        </div>
      </div>`;

    return section('opnote','82','OR record · Operative note',
      'บันทึกการผ่าตัด · 5-cell pt strip · 6-block timeline (into OR → out · surgical time) · 2-col layout: narrative + diagnoses + numbered findings (left) · anesthesia/fluids KV · sponge/sharp counts table · implant lot table · specimen rows · 3-signature panel (surgeon + scrub + circulating).',
      sub('Right TKA · 1h47m · counts match · 4 implants tracked', demo(card)));
  });
})();
