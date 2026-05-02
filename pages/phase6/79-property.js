/* #79 Property record */
/* NOTE: innerHTML used with static hardcoded demo strings only — no user input, no XSS risk */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function propertySection(){
    const card = h('div', {class:'prop'});
    card.innerHTML = `
      <div class="prop__head">
        <div class="prop__brand">
          <div class="prop__logo">PROP</div>
          <div>
            <div class="prop__title">Property Record · บันทึกทรัพย์สินผู้ป่วย</div>
            <div class="prop__sub">รับฝากของมีค่า · สภาพ · ที่เก็บ · ลายเซ็น</div>
          </div>
        </div>
        <div class="prop__meta">
          <strong>AN · 67-12345</strong><br/>
          Suda P. &middot; Admitted 2024-08-12 09:18<br/>
          RN Niran W.
        </div>
      </div>

      <div class="prop__body">

        <!-- Category 1: Clothing & personal -->
        <div class="prop__cat">
          <div class="prop__cat-h">Clothing &amp; Personal Items · เสื้อผ้าและของใช้ส่วนตัว</div>
          <table class="prop__table">
            <thead><tr>
              <th class="prop__th">Item</th>
              <th class="prop__th">Qty</th>
              <th class="prop__th">Condition</th>
              <th class="prop__th">Storage</th>
            </tr></thead>
            <tbody>
              <tr>
                <td class="prop__td prop__td--item">Clothing set (เสื้อผ้า)</td>
                <td class="prop__td">2 sets</td>
                <td class="prop__td"><span class="prop__badge prop__badge--good">Good</span></td>
                <td class="prop__td prop__td--storage">Patient locker</td>
              </tr>
              <tr>
                <td class="prop__td prop__td--item">Footwear (รองเท้า)</td>
                <td class="prop__td">1 pair</td>
                <td class="prop__td"><span class="prop__badge prop__badge--good">Good</span></td>
                <td class="prop__td prop__td--storage">Patient locker</td>
              </tr>
              <tr>
                <td class="prop__td prop__td--item">Eyeglasses</td>
                <td class="prop__td">1</td>
                <td class="prop__td"><span class="prop__badge prop__badge--good">Good</span></td>
                <td class="prop__td prop__td--storage">Bedside drawer</td>
              </tr>
              <tr>
                <td class="prop__td prop__td--item">Mobile phone (ปิดเครื่อง)</td>
                <td class="prop__td">1</td>
                <td class="prop__td"><span class="prop__badge prop__badge--good">Good</span></td>
                <td class="prop__td prop__td--storage">Locked with family</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Category 2: Valuables -->
        <div class="prop__cat">
          <div class="prop__cat-h">Valuables · ของมีค่า (sent home / locked)</div>
          <table class="prop__table">
            <thead><tr>
              <th class="prop__th">Item</th>
              <th class="prop__th">Qty</th>
              <th class="prop__th">Condition</th>
              <th class="prop__th">Storage</th>
            </tr></thead>
            <tbody>
              <tr>
                <td class="prop__td prop__td--item">Wallet / Cash</td>
                <td class="prop__td">&mdash;</td>
                <td class="prop__td"><span class="prop__badge prop__badge--sent">Sent home</span></td>
                <td class="prop__td prop__td--storage">Sent home with family</td>
              </tr>
              <tr>
                <td class="prop__td prop__td--item">ID card</td>
                <td class="prop__td">1</td>
                <td class="prop__td"><span class="prop__badge prop__badge--good">Good</span></td>
                <td class="prop__td prop__td--storage">Nurse station safe</td>
              </tr>
              <tr>
                <td class="prop__td prop__td--item">National health card</td>
                <td class="prop__td">1</td>
                <td class="prop__td"><span class="prop__badge prop__badge--good">Good</span></td>
                <td class="prop__td prop__td--storage">Nurse station safe</td>
              </tr>
              <tr>
                <td class="prop__td prop__td--item">Gold jewelry</td>
                <td class="prop__td">&mdash;</td>
                <td class="prop__td"><span class="prop__badge prop__badge--sent">Sent home</span></td>
                <td class="prop__td prop__td--storage">Sent home (patient refused storage)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Category 3: Medical devices -->
        <div class="prop__cat">
          <div class="prop__cat-h">Medical Devices · อุปกรณ์การแพทย์</div>
          <table class="prop__table">
            <thead><tr>
              <th class="prop__th">Item</th>
              <th class="prop__th">Qty</th>
              <th class="prop__th">Condition</th>
              <th class="prop__th">Storage</th>
            </tr></thead>
            <tbody>
              <tr>
                <td class="prop__td prop__td--item">CPAP machine</td>
                <td class="prop__td">&mdash;</td>
                <td class="prop__td"><span class="prop__badge prop__badge--na">N/A</span></td>
                <td class="prop__td prop__td--storage">Not brought</td>
              </tr>
              <tr>
                <td class="prop__td prop__td--item">Hearing aid</td>
                <td class="prop__td">&mdash;</td>
                <td class="prop__td"><span class="prop__badge prop__badge--na">N/A</span></td>
                <td class="prop__td prop__td--storage">Not applicable</td>
              </tr>
              <tr>
                <td class="prop__td prop__td--item">Medication (home meds)</td>
                <td class="prop__td">3 bottles</td>
                <td class="prop__td"><span class="prop__badge prop__badge--good">Labelled</span></td>
                <td class="prop__td prop__td--storage">Nurse medication cabinet</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Signatures -->
        <div class="prop__signs">
          <div class="prop__sign-block">
            <div class="prop__sign-canvas">สุดา ปัญญาดี</div>
            <div class="prop__sign-name">Patient</div>
            <div class="prop__sign-meta">นางสุดา ปัญญาดี &middot; 09:18</div>
          </div>
          <div class="prop__sign-block">
            <div class="prop__sign-canvas">นิรัน</div>
            <div class="prop__sign-name">Receiving RN</div>
            <div class="prop__sign-meta">RN Niran W. &middot; 09:20</div>
          </div>
        </div>

        <!-- Discharge return -->
        <div class="prop__discharge-row">
          <strong>Items returned on discharge:</strong> 2024-08-19 11:00 &nbsp;&middot;&nbsp;
          RN confirms: <strong>Niran W.</strong> &nbsp;&middot;&nbsp;
          Patient confirms: <strong>สุดา ปัญญาดี</strong>
        </div>

      </div>

      <div class="prop__foot">
        <div style="font-size:10px; font-family:var(--ax-font-mono); color:var(--ax-text-subtle);">
          PROP-2024-08-12-0918 &middot; SHA-256 &middot; b7e3 f291 &hellip;
        </div>
        <div class="prop__btn-row">
          <button class="prop__btn">Print receipt</button>
          <button class="prop__btn">Save draft</button>
          <button class="prop__btn prop__btn--primary">Sign &amp; confirm</button>
        </div>
      </div>`;

    return section('prop','79','Property record',
      'บันทึกทรัพย์สินผู้ป่วย · รับฝากของมีค่า · สภาพ · ที่เก็บ · ลายเซ็น.',
      sub('Patient belongings on admission', demo(card)));
  });
})();
