/* #67 e-Consent form */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function consentSection(){
    const card = h('div', {class:'cons'});
    card.innerHTML = `
      <div class="cons__head">
        <div>
          <div class="cons__title">หนังสือยินยอมรับการรักษา · Informed Consent for Procedure</div>
          <div class="cons__sub">Cardiac Catheterization with possible PCI · Form CT-2024-v3.1 (TH/EN)</div>
        </div>
        <div class="cons__id">
          <strong>CON-2024-0814-7710</strong><br/>
          Created · 2024-08-14 14:18<br/>
          Lang · ไทย / English
        </div>
      </div>

      <div class="cons__progress">
        <div class="cons__step cons__step--done"><div class="cons__step-num">✓</div>Identity</div>
        <div class="cons__step cons__step--done"><div class="cons__step-num">✓</div>Procedure</div>
        <div class="cons__step cons__step--done"><div class="cons__step-num">✓</div>Risks &amp; benefits</div>
        <div class="cons__step cons__step--active"><div class="cons__step-num">4</div>Acknowledge &amp; sign</div>
        <div class="cons__step"><div class="cons__step-num">5</div>Witness</div>
      </div>

      <div class="cons__body">
        <div class="cons__pt-block">
          <div class="cons__pt-field"><div class="cons__pt-label">Patient</div><div class="cons__pt-val">นางสุดา ปัญญาดี</div></div>
          <div class="cons__pt-field"><div class="cons__pt-label">HN</div><div class="cons__pt-val">6712-3344</div></div>
          <div class="cons__pt-field"><div class="cons__pt-label">DOB / Age</div><div class="cons__pt-val">1962-04-18 · 62 ปี</div></div>
          <div class="cons__pt-field"><div class="cons__pt-label">National ID</div><div class="cons__pt-val">3-1099-•••••-12-3</div></div>
        </div>

        <div class="cons__section">
          <h3><span class="cons__num">1</span>Procedure to be performed</h3>
          <p class="cons__para">ข้าพเจ้ายินยอมให้แพทย์ทำหัตถการ <strong>Cardiac Catheterization (สวนหัวใจ)</strong> และอาจทำ <strong>Percutaneous Coronary Intervention (PCI · ใส่ขดลวด)</strong> หากพบว่ามีหลอดเลือดหัวใจตีบรุนแรง</p>
          <p class="cons__para">Performing physician · <strong>นพ. กิตติศักดิ์ วัฒนสาคร</strong>, Interventional Cardiologist (License ว.34218) · scheduled <strong>2024-08-15 09:00</strong> · cath lab 2.</p>
        </div>

        <div class="cons__section">
          <h3><span class="cons__num">2</span>Risks &amp; benefits</h3>
          <div class="cons__risks">
            <div class="cons__risk-card cons__risk-card--common">
              <div class="cons__risk-h">Common (≥1%)</div>
              <ul class="cons__risk-list">
                <li>Bruising at access site<span class="pct">~10%</span></li>
                <li>Contrast allergy (mild)<span class="pct">~3%</span></li>
                <li>Arrhythmia (transient)<span class="pct">~2%</span></li>
              </ul>
            </div>
            <div class="cons__risk-card cons__risk-card--rare">
              <div class="cons__risk-h">Serious / rare (&lt;1%)</div>
              <ul class="cons__risk-list">
                <li>Major bleeding<span class="pct">~0.5%</span></li>
                <li>Stroke / MI<span class="pct">~0.2%</span></li>
                <li>Death<span class="pct">~0.1%</span></li>
                <li>Emergency CABG<span class="pct">~0.1%</span></li>
              </ul>
            </div>
          </div>
          <p class="cons__para"><strong>Benefits</strong> · ตรวจวินิจฉัยภาวะเส้นเลือดหัวใจตีบและเปิดหลอดเลือดได้ทันทีหากจำเป็น ช่วยลดความเสี่ยงต่อกล้ามเนื้อหัวใจตายในอนาคต</p>
          <p class="cons__para"><strong>Alternatives</strong> · CT coronary angiography · medical management (β-blocker, statin, antiplatelet) · CABG หากมีข้อบ่งชี้</p>
        </div>

        <div class="cons__section">
          <h3><span class="cons__num">3</span>Acknowledgments</h3>
          <div class="cons__check cons__check--on"><div class="cons__check-box">✓</div><div class="cons__check-text">ข้าพเจ้าได้รับฟังคำอธิบายเกี่ยวกับหัตถการ <strong>ความเสี่ยง ประโยชน์ และทางเลือก</strong> จากแพทย์ผู้รักษา และเข้าใจดีแล้ว</div></div>
          <div class="cons__check cons__check--on"><div class="cons__check-box">✓</div><div class="cons__check-text">ข้าพเจ้าได้มีโอกาส<strong>ถามคำถาม</strong>และได้รับคำตอบที่พอใจ</div></div>
          <div class="cons__check cons__check--on"><div class="cons__check-box">✓</div><div class="cons__check-text">ข้าพเจ้าเข้าใจว่า <strong>ผลลัพธ์ไม่สามารถรับรองได้ 100%</strong> และอาจเกิดภาวะแทรกซ้อนที่คาดไม่ถึง</div></div>
          <div class="cons__check cons__check--on"><div class="cons__check-box">✓</div><div class="cons__check-text">ข้าพเจ้ายินยอมให้บันทึกภาพ/วีดิทัศน์เพื่อการวินิจฉัยรักษา และยินยอมให้ใช้ข้อมูลแบบ<strong>ไม่ระบุตัวตน</strong>เพื่อการศึกษาและวิจัย</div></div>
          <div class="cons__check"><div class="cons__check-box"></div><div class="cons__check-text">ข้าพเจ้ายินยอมให้รับเลือดหรือผลิตภัณฑ์เลือด หากมีความจำเป็นในระหว่างหัตถการ <em>(optional)</em></div></div>
        </div>

        <div class="cons__section">
          <h3><span class="cons__num">4</span>Signatures</h3>
          <div class="cons__sig-row">
            <div class="cons__sig-block">
              <div class="cons__sig-canvas">สุดา ปัญญาดี</div>
              <div class="cons__sig-name">นางสุดา ปัญญาดี · Patient</div>
              <div class="cons__sig-meta"><span>Captured · 14:32:08</span><span>IP · 10.20.4.91</span></div>
            </div>
            <div class="cons__sig-block">
              <div class="cons__sig-canvas" style="color:var(--ax-text-subtle); font-size:11px; font-family:var(--ax-font-mono); font-style:normal">awaiting witness signature…</div>
              <div class="cons__sig-name" style="color:var(--ax-text-subtle); font-weight:400">Witness · Nurse on duty</div>
              <div class="cons__sig-meta"><span>Pending</span><span>—</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="cons__foot">
        <div class="cons__hash">SHA-256 · <strong>a4f2 91c8 d3e7 8bb1 …</strong> · TimestampAuth · เวลามาตรฐาน NICT</div>
        <div class="cons__btn-row">
          <button class="cons__btn cons__btn--danger">Decline</button>
          <button class="cons__btn">Save draft</button>
          <button class="cons__btn cons__btn--primary">Submit consent</button>
        </div>
      </div>`;

    return section('cons','67','e-Consent form',
      'Multi-step consent (identity → procedure → risks → ack → sign) · risk table แบบ common/rare · checklist acknowledgments · dual signatures (patient + witness) · audit hash + timestamp.',
      sub('Cardiac cath consent · awaiting witness', demo(card)));
  });
})();
