/* #79 Property / Belongings record */
(function(){
  if (!window.AX6) return;
  const { h, section, sub, demo } = AX6;

  AX6.register(function belongingsSection(){
    const card = h('div', {class:'bel'});

    const items = [
      // category, [icon, name, desc, qty, loc, status, hasPhoto, valuable]
      ['valuables', [
        ['💍','Gold ring','22K · floral pattern · ~3.5 g',1,'Hosp safe · S-127','vault',true,true],
        ['📿','Buddha pendant','Phra Somdej · with chain',1,'Hosp safe · S-127','vault',true,true],
        ['💵','Cash','THB ฿2,450 · sealed envelope',1,'Hosp safe · S-127','vault',false,true],
        ['💳','Bank card','SCB debit · ending 4421',1,'Hosp safe · S-127','vault',false,true],
        ['📱','Mobile phone','iPhone · black case',1,'Bedside table','bedside',true,true],
      ]],
      ['personal', [
        ['👓','Eyeglasses','reading · brown frame',1,'Bedside table','bedside',false,false],
        ['🦷','Dentures','upper partial',1,'Bedside cup','bedside',false,false],
        ['🩴','Slippers','blue rubber',1,'Floor under bed','bedside',false,false],
        ['👜','Handbag','small · black canvas',1,'Wardrobe locker 4-12','bedside',false,false],
        ['👚','Clothing','set · stripe pajama',1,'Bag in wardrobe','bedside',false,false],
      ]],
      ['device', [
        ['🦮','Walker','4-wheel · pt-owned',1,'At bedside','worn',false,false],
        ['💉','Insulin pen','Pt-owned · returned to family',1,'—','given',false,false],
      ]],
    ];

    const catLabel = {valuables:'Valuables · stored in safe', personal:'Personal items · at bedside', device:'Medical devices'};

    let n = 0;
    const sections = items.map(([cat,arr])=>{
      const rows = arr.map((it)=>{
        n++;
        const [icon,name,desc,qty,loc,status,photo,_] = it;
        const rowMod = status==='vault' ? 'bel__item--vault' : status==='given' ? 'bel__item--given' : '';
        const statusLabel = {bedside:'bedside', vault:'safe', given:'given to family', lost:'lost', worn:'in use'}[status];
        return `<div class="bel__item ${rowMod}">
          <div class="bel__num">${String(n).padStart(2,'0')}</div>
          <div class="bel__icon">${icon}</div>
          <div class="bel__name"><div class="bel__name-main">${name}</div><div class="bel__name-desc">${desc}</div></div>
          <div><span class="bel__qty">×${qty}</span></div>
          <div class="bel__loc"><strong>${loc.split(' · ')[0]}</strong>${loc.includes(' · ')?loc.split(' · ').slice(1).join(' · '):''}</div>
          <div><span class="bel__status bel__status--${status}">${statusLabel}</span></div>
          <div class="bel__photo ${photo?'bel__photo--has':''}">${photo?'📷':'no img'}</div>
        </div>`;
      }).join('');
      return `<div class="bel__sect-h"><span>${catLabel[cat]}</span><span><strong>${arr.length}</strong> items</span></div><div class="bel__list">${rows}</div>`;
    }).join('');

    const totals = items.reduce((acc,[c,arr])=>{ acc.total+=arr.length; arr.forEach(it=>{ if(it[7]) acc.val++; }); return acc; },{total:0,val:0});

    card.innerHTML = `
      <div class="bel__head">
        <div>
          <div class="bel__title">Patient property / belongings record · บันทึกทรัพย์สินผู้ป่วย</div>
          <div class="bel__sub">AN 67-12345 · Suda P. · admission inventory · 12 Aug 2024 22:48</div>
        </div>
        <span class="bel__stamp">verified · 2-witness</span>
      </div>

      <div class="bel__band">
        <div class="bel__band-cell"><span class="bel__band-label">total items</span><span class="bel__band-value">${totals.total}</span><span class="bel__band-meta">across 3 categories</span></div>
        <div class="bel__band-cell"><span class="bel__band-label">valuables</span><span class="bel__band-value">${totals.val}</span><span class="bel__band-meta">in hospital safe</span></div>
        <div class="bel__band-cell"><span class="bel__band-label">safe receipt</span><span class="bel__band-value">S-127</span><span class="bel__band-meta">issued 12 Aug 22:48</span></div>
        <div class="bel__band-cell"><span class="bel__band-label">photos</span><span class="bel__band-value">5 / ${totals.total}</span><span class="bel__band-meta">attached evidence</span></div>
      </div>

      ${sections}

      <div class="bel__sigrow">
        <div class="bel__sig">
          <div class="bel__sig-cap">Patient / family</div>
          <div class="bel__sig-mark" style="font-style:italic;">S. Phongsri</div>
          <div class="bel__sig-name">Suda Phongsri (Pt)</div>
          <div class="bel__sig-meta">12 Aug 22:48 · acknowledged inventory</div>
        </div>
        <div class="bel__sig">
          <div class="bel__sig-cap">RN witness 1</div>
          <div class="bel__sig-mark">A. Tanaka</div>
          <div class="bel__sig-name">RN Aoy T.</div>
          <div class="bel__sig-meta">12 Aug 22:48 · admit nurse</div>
        </div>
        <div class="bel__sig">
          <div class="bel__sig-cap">Witness 2 · security</div>
          <div class="bel__sig-mark">M. Charoen</div>
          <div class="bel__sig-name">Sec. Manop C.</div>
          <div class="bel__sig-meta">12 Aug 22:50 · sealed safe S-127</div>
        </div>
      </div>

      <div class="bel__foot">
        <div class="bel__band-meta">Discharge will require both witnesses + receipt S-127 · last edit 12 Aug 22:48</div>
        <div class="bel__btn-row">
          <button class="bel__btn">Print receipt</button>
          <button class="bel__btn">+ Add item</button>
          <button class="bel__btn bel__btn--primary">Release on D/C</button>
        </div>
      </div>`;

    return section('bel','79','Property / Belongings record',
      'บันทึกทรัพย์สินผู้ป่วยตอน admit · 3 categories: valuables (วาง safe) · personal (bedside) · medical devices · row tinted ตาม status (vault=warning, given=mute, lost=error) · photo evidence column · safe receipt # · 2-witness signature workflow + family acknowledgment.',
      sub('Admission inventory · 12 items', demo(card)));
  });
})();
