/* #72 Doctor's order sheet */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function ordersSection(){
    const card = h('div', {class:'dos'});
    card.innerHTML = `
      <div class="dos__head">
        <div>
          <div class="dos__title">Doctor's order sheet · ใบคำสั่งแพทย์</div>
          <div class="dos__sub">AN 67-12345 · Suda P. · Bed 4-12 · Dr. Kittisak W.</div>
        </div>
        <div class="dos__action-row">
          <div class="dos__filter">
            <span class="dos__filter-tab dos__filter-tab--on">all</span>
            <span class="dos__filter-tab">active</span>
            <span class="dos__filter-tab">pending</span>
            <span class="dos__filter-tab">DC'd</span>
          </div>
        </div>
      </div>

      <div class="dos__day">
        <div class="dos__day-h">
          <span><strong>Day 3</strong> · 2024-08-14 (วันนี้)</span>
          <span>5 orders · 1 STAT · 2 new</span>
        </div>

        <div class="dos__order dos__order--stat">
          <div class="dos__time"><strong>14:32</strong><span>วันนี้</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--med">MED</div></div>
          <div class="dos__detail">
            <div class="dos__name">Furosemide 40 mg IV push <span class="dos__pill dos__pill--stat">STAT</span></div>
            <div class="dos__name-sub">× 1 dose now · monitor BP / urine output Q1h × 4</div>
          </div>
          <div class="dos__priority">priority 1</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--exec">executing</span>
            <span>RN Niran · 14:35</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 14:32</div>
          </div>
        </div>

        <div class="dos__order dos__order--new">
          <div class="dos__time"><strong>11:08</strong><span>วันนี้</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--med">MED</div></div>
          <div class="dos__detail">
            <div class="dos__name">Ceftriaxone 2 g IV q24h <span class="dos__pill dos__pill--new">new</span></div>
            <div class="dos__name-sub">in NSS 100 mL drip 30 min · day 1 of 7 · culture pending</div>
          </div>
          <div class="dos__priority">routine</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--ack">acknowledged</span>
            <span>RN Niran · 11:12</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 11:08</div>
          </div>
        </div>

        <div class="dos__order dos__order--new">
          <div class="dos__time"><strong>11:08</strong><span>วันนี้</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--lab">LAB</div></div>
          <div class="dos__detail">
            <div class="dos__name">Procalcitonin · CBC · BUN/Cr <span class="dos__pill dos__pill--now">NOW</span></div>
            <div class="dos__name-sub">repeat tomorrow 06:00 · trend day-to-day</div>
          </div>
          <div class="dos__priority">priority 2</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--done">collected</span>
            <span>Lab · 11:25</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 11:08</div>
          </div>
        </div>

        <div class="dos__order">
          <div class="dos__time"><strong>09:00</strong><span>วันนี้</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--img">IMG</div></div>
          <div class="dos__detail">
            <div class="dos__name">CXR PA upright <span class="dos__pill dos__pill--routine">routine</span></div>
            <div class="dos__name-sub">f/u infiltration RLL · compare 2024-08-12</div>
          </div>
          <div class="dos__priority">routine</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--pend">scheduled 15:30</span>
            <span>Radiology</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 09:00</div>
          </div>
        </div>

        <div class="dos__order">
          <div class="dos__time"><strong>08:30</strong><span>วันนี้</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--act">ACT</div></div>
          <div class="dos__detail">
            <div class="dos__name">Out of bed to chair × 30 min TID</div>
            <div class="dos__name-sub">with assistance · monitor SpO₂ · stop if SpO₂ &lt; 92%</div>
          </div>
          <div class="dos__priority">routine</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--ack">acknowledged</span>
            <span>RN Niran · 08:42</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 08:30</div>
          </div>
        </div>
      </div>

      <div class="dos__day">
        <div class="dos__day-h">
          <span><strong>Day 2</strong> · 2024-08-13 (เมื่อวาน)</span>
          <span>4 orders · 1 DC'd</span>
        </div>

        <div class="dos__order">
          <div class="dos__time"><strong>16:20</strong><span>เมื่อวาน</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--cons">CONS</div></div>
          <div class="dos__detail">
            <div class="dos__name">Consult ID specialist</div>
            <div class="dos__name-sub">re: antibiotic narrowing · culture sensitivity guidance</div>
          </div>
          <div class="dos__priority">routine</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--done">replied 09:30</span>
            <span>Dr. Pinai</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 16:20</div>
          </div>
        </div>

        <div class="dos__order">
          <div class="dos__time"><strong>10:15</strong><span>เมื่อวาน</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--diet">DIET</div></div>
          <div class="dos__detail">
            <div class="dos__name">Soft diet · low salt &lt; 2 g/day</div>
            <div class="dos__name-sub">DM 1500 kcal · fluid restriction 1500 mL/day</div>
          </div>
          <div class="dos__priority">routine</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--done">active</span>
            <span>Dietitian · 10:30</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 10:15</div>
          </div>
        </div>

        <div class="dos__order">
          <div class="dos__time"><strong>10:15</strong><span>เมื่อวาน</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--vit">VIT</div></div>
          <div class="dos__detail">
            <div class="dos__name">Vital signs Q4h · SpO₂ continuous</div>
            <div class="dos__name-sub">notify if T &gt; 38.5 · BP &lt; 90/60 · HR &gt; 120 · SpO₂ &lt; 92%</div>
          </div>
          <div class="dos__priority">routine</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--done">active</span>
            <span>RN team</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 10:15</div>
          </div>
        </div>

        <div class="dos__order dos__order--dc">
          <div class="dos__time"><strong>09:42</strong><span>เมื่อวาน</span></div>
          <div class="dos__cat-cell"><div class="dos__cat dos__cat--med">MED</div></div>
          <div class="dos__detail">
            <div class="dos__name">Levofloxacin 750 mg IV q24h <span class="dos__pill dos__pill--dc">DC'd</span></div>
            <div class="dos__name-sub">discontinued today 11:08 · switched to ceftriaxone per ID</div>
          </div>
          <div class="dos__priority">—</div>
          <div class="dos__status">
            <span class="dos__status-tag dos__status-tag--pend">discontinued</span>
            <span>by Dr. Kittisak</span>
          </div>
          <div class="dos__sig">
            <div class="dos__sig-name">Dr. Kittisak</div>
            <div class="dos__sig-meta">e-sign · 09:42</div>
          </div>
        </div>
      </div>

      <div class="dos__foot">
        <div class="dos__legend">
          <span class="dos__legend-item"><span class="dos__legend-dot" style="background:var(--ax-cat-med-emphasis)"></span>med</span>
          <span class="dos__legend-item"><span class="dos__legend-dot" style="background:var(--ax-cat-lab-emphasis)"></span>lab</span>
          <span class="dos__legend-item"><span class="dos__legend-dot" style="background:var(--ax-cat-imaging-emphasis)"></span>imaging</span>
          <span class="dos__legend-item"><span class="dos__legend-dot" style="background:var(--ax-cat-diet-emphasis)"></span>diet</span>
          <span class="dos__legend-item"><span class="dos__legend-dot" style="background:var(--ax-cat-activity-emphasis)"></span>activity</span>
          <span class="dos__legend-item"><span class="dos__legend-dot" style="background:var(--ax-cat-consult-emphasis)"></span>consult</span>
          <span class="dos__legend-item"><span class="dos__legend-dot" style="background:var(--ax-cat-vital-emphasis)"></span>vital</span>
        </div>
        <div class="dos__action-row">
          <button class="dos__btn">Print 24h slip</button>
          <button class="dos__btn">Add verbal order</button>
          <button class="dos__btn dos__btn--primary">+ New order</button>
        </div>
      </div>`;

    return section('dos','72',"Doctor's order sheet",
      'ใบคำสั่งแพทย์ราย 24 ชั่วโมง · grouped by day · STAT/NOW/routine/PRN priority · 7 categories color-coded · acknowledgement + execution status per order · DC + verbal order workflow.',
      sub('Active orders · day 3 of admission', demo(card)));
  });
})();
