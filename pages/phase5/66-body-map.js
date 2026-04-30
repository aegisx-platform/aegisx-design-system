/* #66 Body diagram / pain map */
(function(){
  if (!window.AX5) return;
  const { h, section, sub, demo } = AX5;

  AX5.register(function bodyMapSection(){
    const card = h('div', {class:'bd'});

    // Body silhouette path (simplified anterior figure, viewBox 160x360)
    const anteriorBody = `
      <!-- head -->
      <ellipse class="bd__body-fill" cx="80" cy="32" rx="20" ry="24"/>
      <!-- neck -->
      <path class="bd__body-fill" d="M70 54 L70 64 L90 64 L90 54 Z"/>
      <!-- torso -->
      <path class="bd__body-fill" d="M52 64 Q44 70 44 90 L48 170 L60 200 L100 200 L112 170 L116 90 Q116 70 108 64 Z"/>
      <!-- arms -->
      <path class="bd__body-fill" d="M44 70 Q34 78 30 110 L28 160 L34 200 L42 200 L46 162 L48 120 Z"/>
      <path class="bd__body-fill" d="M116 70 Q126 78 130 110 L132 160 L126 200 L118 200 L114 162 L112 120 Z"/>
      <!-- legs -->
      <path class="bd__body-fill" d="M60 200 L56 280 L60 340 L74 340 L78 280 L78 220 Z"/>
      <path class="bd__body-fill" d="M100 200 L82 220 L82 280 L86 340 L100 340 L104 280 Z"/>
      <!-- center line -->
      <line class="bd__body-line" x1="80" y1="60" x2="80" y2="340"/>
      <!-- shoulder/hip lines -->
      <line class="bd__body-line" x1="44" y1="70" x2="116" y2="70"/>
      <line class="bd__body-line" x1="48" y1="170" x2="112" y2="170"/>
    `;
    const posteriorBody = anteriorBody; // mirror simplification

    // Pain markers: {x, y, severity, num, view}
    const markers = [
      {n:1, x:80, y:90, view:'ant', sev:'severe', loc:'Chest · substernal', desc:'Pressure 8/10 · radiates L arm'},
      {n:2, x:108, y:120, view:'ant', sev:'mod', loc:'Right upper quadrant', desc:'Tender 5/10 · constant ache'},
      {n:3, x:64, y:180, view:'ant', sev:'mild', loc:'Lower abdomen', desc:'3/10 · cramping'},
      {n:4, x:80, y:135, view:'post', sev:'mod', loc:'Mid-back', desc:'5/10 · band-like'},
      {n:5, x:96, y:260, view:'post', sev:'severe', loc:'R lower back', desc:'7/10 · sharp on movement'},
    ];
    const sevColor = {mild:'var(--ax-pain-mild-line)', mod:'var(--ax-pain-mod-line)', severe:'var(--ax-pain-severe-line)'};

    const renderMarkers = (view) => markers.filter(m=>m.view===view).map(m=>`
      <circle class="bd__pain bd__pain--${m.sev}" cx="${m.x}" cy="${m.y}" r="9"/>
      <text class="bd__pain-label" x="${m.x}" y="${m.y+2.5}">${m.n}</text>
    `).join('');

    card.innerHTML = `
      <div class="bd__main">
        <div class="bd__head">
          <div>
            <div class="bd__title">Pain assessment · body diagram</div>
            <div class="bd__sub">Recorded 14:32 · นางสุดา · session 3</div>
          </div>
          <div class="bd__tabs">
            <span class="bd__tab bd__tab--active">Pain</span>
            <span class="bd__tab">Wounds</span>
            <span class="bd__tab">Skin</span>
            <span class="bd__tab">Sensory</span>
          </div>
        </div>
        <div class="bd__canvas">
          <div class="bd__view">
            <span class="bd__view-label">Anterior</span>
            <svg class="bd__svg" viewBox="0 0 160 360">${anteriorBody}${renderMarkers('ant')}</svg>
          </div>
          <div class="bd__view">
            <span class="bd__view-label">Posterior</span>
            <svg class="bd__svg" viewBox="0 0 160 360">${posteriorBody}${renderMarkers('post')}</svg>
          </div>
        </div>
        <div class="bd__legend">
          <span class="bd__legend-item"><span class="bd__legend-dot" style="background:var(--ax-pain-mild-bg); border-color:var(--ax-pain-mild-line)"></span>Mild 1-3</span>
          <span class="bd__legend-item"><span class="bd__legend-dot" style="background:var(--ax-pain-mod-bg); border-color:var(--ax-pain-mod-line)"></span>Moderate 4-6</span>
          <span class="bd__legend-item"><span class="bd__legend-dot" style="background:var(--ax-pain-severe-bg); border-color:var(--ax-pain-severe-line)"></span>Severe 7-10</span>
        </div>
      </div>
      <aside class="bd__side">
        <div>
          <div class="bd__h" style="margin-bottom:6px">Worst pain now · NRS</div>
          <div class="bd__scale">
            ${[0,1,2,3,4,5,6,7,8,9,10].map(n=>{
              const active = n===8;
              const emoji = n<=2?'😀':n<=4?'🙂':n<=6?'😐':n<=8?'😣':'😫';
              return `<div class="bd__scale-item${active?' bd__scale-item--active':''}"><span class="bd__scale-emoji">${emoji}</span><span class="bd__scale-num">${n}</span></div>`;
            }).join('')}
          </div>
          <div style="font-size:10px; color:var(--ax-text-subtle); font-family:var(--ax-font-mono); margin-top:4px; text-align:center">Reported 8/10 · severe</div>
        </div>
        <div>
          <div class="bd__h" style="margin-bottom:6px">Mapped sites · 5</div>
          <ul class="bd__pain-list">
            ${markers.map(m=>`<li class="bd__pain-item">
              <div class="bd__pain-num" style="background:${sevColor[m.sev]}">${m.n}</div>
              <div><div class="bd__pain-loc">${m.loc}</div><div class="bd__pain-desc">${m.desc}</div></div>
            </li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="bd__h" style="margin-bottom:6px">Character</div>
          <div class="bd__char-grid">
            <div class="bd__char-item bd__char-item--on">Sharp</div>
            <div class="bd__char-item">Dull</div>
            <div class="bd__char-item bd__char-item--on">Burning</div>
            <div class="bd__char-item">Throbbing</div>
            <div class="bd__char-item bd__char-item--on">Pressure</div>
            <div class="bd__char-item">Tingling</div>
            <div class="bd__char-item">Cramping</div>
            <div class="bd__char-item bd__char-item--on">Radiating</div>
          </div>
        </div>
      </aside>`;

    return section('bd','66','Body diagram / pain map',
      'Anterior + posterior figure · ผู้ป่วย/พยาบาลแตะตำแหน่งเพื่อบันทึก pain · severity color · NRS scale พร้อม emoji · character chips · linked list ข้าง.',
      sub('Pain assessment · 5 sites mapped', demo(card)));
  });
})();
