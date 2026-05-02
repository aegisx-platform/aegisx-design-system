/* #102 Feature flag board */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  AX9.register(function featureFlagsSection(){
    const card = h('div', {class:'ffb'});
    const FLAGS = [
      { name:'rx-second-signature', desc:'mandatory 2-sig for high-risk Rx', tags:['clinical','perm'],
        envs:[['on','100 %'],['on','100 %'],['roll','25 %'],['off','—']],
        owner:'Dr. Naree', mod:'2 d ago' },
      { name:'sepsis-early-warning', desc:'auto NEWS-2 + alert banner', tags:['clinical','ml'],
        envs:[['on','100 %'],['on','100 %'],['seg','3 wards'],['off','—']],
        owner:'Clinical AI', mod:'14 h ago' },
      { name:'bedside-tablet-v2', desc:'patient-facing tablet redesign', tags:['ux'],
        envs:[['on','100 %'],['on','100 %'],['roll','60 %'],['on','100 %']],
        owner:'PX team', mod:'5 h ago' },
      { name:'bill-bundle-drg', desc:'DRG bundle pricing in invoice', tags:['billing'],
        envs:[['on','100 %'],['on','100 %'],['seg','2 payors'],['off','—']],
        owner:'RCM', mod:'1 d ago' },
      { name:'lab-result-streaming', desc:'SSE push for lab postings', tags:['perf'],
        envs:[['on','100 %'],['on','100 %'],['roll','40 %'],['off','—']],
        owner:'Platform', mod:'9 m ago' },
      { name:'dark-mode-default', desc:'staff dashboard dark theme default', tags:['ux'],
        envs:[['off','—'],['on','100 %'],['off','—'],['off','—']],
        owner:'DS team', mod:'3 d ago' },
      { name:'kill-old-rx-flow', desc:'force migration off legacy Rx', tags:['kill'],
        envs:[['on','100 %'],['on','100 %'],['on','100 %'],['on','100 %']],
        owner:'Platform', mod:'6 d ago' },
      { name:'incident-rca-fivewhys', desc:'5-Whys editor on HRMS form', tags:['hrms'],
        envs:[['on','100 %'],['off','—'],['off','—'],['off','—']],
        owner:'Quality', mod:'just now' }
    ];

    const tileMap = {
      on:'ffb__tile-st--on', off:'ffb__tile-st--off', roll:'ffb__tile-st--roll', seg:'ffb__tile-st--seg'
    };
    const tileTxt = { on:'ON', off:'OFF', roll:'ROLL', seg:'SEG' };

    const rowsHtml = FLAGS.map(f => {
      const envs = f.envs.map(([s,p]) => {
        let bar = '';
        if (s === 'roll') {
          const pct = parseInt(p,10) || 0;
          bar = `<div class="ffb__tile-bar"><i style="width:${pct}%"></i></div>`;
        }
        return `<div class="ffb__cell"><div class="ffb__tile">
          <span class="ffb__tile-st ${tileMap[s]}">${tileTxt[s]}</span>
          ${bar}
          <span class="ffb__tile-meta">${p}</span>
        </div></div>`;
      }).join('');
      const tagHtml = f.tags.map(t => {
        if (t==='kill') return `<span class="is-kill">kill</span>`;
        if (t==='perm') return `<span class="is-perm">perm</span>`;
        return `<span>${t}</span>`;
      }).join('');
      return `<div class="ffb__row">
        <div class="ffb__cell ffb__name"><strong>${f.name}</strong><small>${f.desc}</small><div class="ffb__tags">${tagHtml}</div></div>
        ${envs}
        <div class="ffb__cell ffb__owner"><strong>${f.owner}</strong>edited ${f.mod}</div>
      </div>`;
    }).join('');

    card.innerHTML = `
      <div class="ffb__head">
        <div class="ffb__brand">
          <div class="ffb__logo">FLG</div>
          <div>
            <div class="ffb__title">Feature flag board · 4 environments</div>
            <div class="ffb__sub">8 of 24 flags shown · 2 perm · 1 kill-switch · last sync 09:14 · drift OK</div>
          </div>
        </div>
        <div class="ffb__meta">
          <strong>SDK · ax-flags v 3.1.4</strong><br/>
          poll 30 s · evaluated client-side<br/>
          changes audit-logged
        </div>
      </div>

      <div class="ffb__bar">
        <span class="ffb__chip is-on">All</span>
        <span class="ffb__chip">Clinical</span>
        <span class="ffb__chip">Billing</span>
        <span class="ffb__chip">UX</span>
        <span class="ffb__chip">Kill</span>
        <div class="ffb__seg">
          <button class="is-on">Active</button>
          <button>Stale</button>
          <button>Archived</button>
        </div>
        <input class="ffb__search" placeholder="search flag key…"/>
        <button class="ffb__btn">Diff vs prod</button>
        <button class="ffb__btn ffb__btn--p">+ New flag</button>
      </div>

      <div class="ffb__env">
        <div class="ffb__env-c"><span class="ffb__env-cap"><span class="cx9-dot cx9-dot--ok"></span> dev</span><span class="ffb__env-val">22<small> / 24</small></span><span class="ffb__env-meta">2 off · auto-sync</span></div>
        <div class="ffb__env-c"><span class="ffb__env-cap"><span class="cx9-dot cx9-dot--ok"></span> staging</span><span class="ffb__env-val">19<small> / 24</small></span><span class="ffb__env-meta">5 off · 0 drift</span></div>
        <div class="ffb__env-c"><span class="ffb__env-cap"><span class="cx9-dot cx9-dot--warn"></span> canary</span><span class="ffb__env-val">12<small> / 24</small></span><span class="ffb__env-meta">5 rollouts in flight</span></div>
        <div class="ffb__env-c"><span class="ffb__env-cap"><span class="cx9-dot cx9-dot--info"></span> prod</span><span class="ffb__env-val">9<small> / 24</small></span><span class="ffb__env-meta">approval queue · 2</span></div>
      </div>

      <div class="ffb__list">
        <div class="ffb__row is-head">
          <div class="ffb__cell">Flag · description</div>
          <div class="ffb__cell">dev</div>
          <div class="ffb__cell">staging</div>
          <div class="ffb__cell">canary</div>
          <div class="ffb__cell">prod</div>
          <div class="ffb__cell">Owner</div>
        </div>
        ${rowsHtml}
      </div>

      <div class="ffb__foot">
        <div class="ffb__foot-meta">Targeting · org / role / cohort · prerequisite chains supported · prod toggle requires 2nd approval (sysadmin + on-call)</div>
        <div class="ffb__foot-meta">⌘N new · ⌘D diff · ⌥click cell to override</div>
      </div>`;

    return section('ffb','102','Feature flag board · multi-environment',
      'LaunchDarkly-style board · 4-env strip (dev/staging/canary/prod) with health dot and on-count · filter chips + segmented active/stale/archived · 8-row grid: flag key + description + tag chips (clinical/perm/kill) × 4 env tiles (ON / OFF / ROLL with %-bar / SEG) + owner column · prod toggle requires 2nd approval.',
      sub('8 flags shown · canary 5 rollouts · prod 2 approvals queued · last edit "just now" by Quality', demo(card)));
  });
})();
