/* #99 Permission matrix */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  AX9.register(function permissionMatrixSection(){
    const card = h('div', {class:'pmx'});
    const ROLES = [
      { k:'owner', n:'Owner', m:'1 user' },
      { k:'admin', n:'Admin', m:'4 users' },
      { k:'clinician', n:'Clinician', m:'82 users' },
      { k:'biller', n:'Biller', m:'12 users' },
      { k:'audit', n:'Auditor', m:'3 users' },
      { k:'viewer', n:'Viewer', m:'21 users' }
    ];
    const GROUPS = [
      { name:'Patient & EMR', items:[
        { l:'Patient demographics', d:'pat:read · pat:write', r:['all','all','rw','r','r','r'] },
        { l:'Clinical notes (SOAP)',  d:'note:* · note:cosign', r:['all','rw','rw','no','r','r'] },
        { l:'Lab results',  d:'lab:read · lab:export', r:['all','rw','rw','no','r','r'] },
        { l:'Prescriptions (Rx)',  d:'rx:create · rx:sign', r:['all','rw','rw','no','r','no'] }
      ]},
      { name:'Billing & Insurance', items:[
        { l:'Charges & invoices', d:'bill:read · bill:write', r:['all','rw','r','all','r','r'] },
        { l:'Pre-authorization', d:'auth:submit · auth:approve', r:['all','rw','r','rw','r','no'] },
        { l:'Payor contracts', d:'payor:read · payor:write', r:['all','rw','no','rw','r','no'] }
      ]},
      { name:'Org & System', items:[
        { l:'User management', d:'user:invite · user:role', r:['all','rw','no','no','r','no'] },
        { l:'API keys & webhooks', d:'key:create · hook:write', r:['all','rw','no','no','r','no'] },
        { l:'Audit log', d:'audit:read · audit:export', r:['all','r','no','r','all','no'] },
        { l:'Billing settings', d:'org:billing', r:['all','inh','no','rw','r','no'] }
      ]}
    ];

    const swMap = { all:['All','pmx__sw--all'], rw:['R + W','pmx__sw--rw'], r:['Read','pmx__sw--r'], no:['—','pmx__sw--no'], inh:['inherit','pmx__sw--inh'] };
    let html = `
      <div class="pmx__head">
        <div class="pmx__brand">
          <div class="pmx__logo">RBAC</div>
          <div>
            <div class="pmx__title">Permission matrix · roles × resources</div>
            <div class="pmx__sub">Org · aegisx-bgkk-001 · 6 roles · 11 resources · last edit 30 Apr 14:08 by sysadmin</div>
          </div>
        </div>
        <div class="pmx__meta">
          <strong>v 4.2.0</strong><br/>
          schema rbac-2024-q2<br/>
          drift 0 · OK
        </div>
      </div>

      <div class="pmx__bar">
        <span class="pmx__chip is-on">All</span>
        <span class="pmx__chip">Patient</span>
        <span class="pmx__chip">Billing</span>
        <span class="pmx__chip">System</span>
        <input class="pmx__search" placeholder="filter resource or scope (e.g. rx:sign)…"/>
        <button class="pmx__btn">Bulk edit</button>
        <button class="pmx__btn pmx__btn--p">Save changes · 3 pending</button>
      </div>

      <div class="pmx__wrap">
        <table class="pmx__tbl">
          <thead>
            <tr>
              <th class="pmx__col-h">Resource · scope</th>
              ${ROLES.map(r => `<th class="pmx__col-h pmx__col-h--role"><strong>${r.n}</strong><small>${r.m}</small></th>`).join('')}
            </tr>
          </thead>
          <tbody>`;

    GROUPS.forEach(g => {
      html += `<tr><td class="pmx__grp" colspan="${ROLES.length+1}">${g.name}</td></tr>`;
      g.items.forEach(it => {
        html += `<tr class="pmx__row"><td class="pmx__lab"><strong>${it.l}</strong><small>${it.d}</small></td>`;
        it.r.forEach(v => {
          const [t,c] = swMap[v];
          html += `<td class="pmx__cell"><span class="pmx__sw ${c}">${t}</span></td>`;
        });
        html += `</tr>`;
      });
    });

    html += `</tbody></table></div>

      <div class="pmx__leg">
        <span class="pmx__leg-i"><span class="pmx__sw pmx__sw--all">All</span> full + delete</span>
        <span class="pmx__leg-i"><span class="pmx__sw pmx__sw--rw">R + W</span> read &amp; write</span>
        <span class="pmx__leg-i"><span class="pmx__sw pmx__sw--r">Read</span> read only</span>
        <span class="pmx__leg-i"><span class="pmx__sw pmx__sw--no">—</span> denied</span>
        <span class="pmx__leg-i"><span class="pmx__sw pmx__sw--inh">inherit</span> from parent role</span>
      </div>

      <div class="pmx__foot">
        <div class="pmx__foot-meta">RBAC engine v 1.8 · evaluated in &lt; 4 ms · effective permissions cached 5 min · changes audit-logged</div>
        <div class="pmx__foot-meta">Owner · sysadmin@aegisx.health · ⌘S to save · ⌘Z to revert</div>
      </div>`;
    card.innerHTML = html;

    return section('pmx','99','Permission matrix · roles × resources',
      'RBAC editor · 6 roles × 11 resources × 5 access levels (All / R+W / Read / — / inherit) · grouped resource rows (Patient · Billing · System) · header chips for resource filter and search · bulk edit + 3-pending save · legend strip · drift-free schema v 4.2.0.',
      sub('Owner / Admin / Clinician / Biller / Auditor / Viewer · 11 resources · 3 pending changes', demo(card)));
  });
})();
