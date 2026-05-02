/* #100 API key manager */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  AX9.register(function apiKeysSection(){
    const card = h('div', {class:'akm'});
    card.innerHTML = `
      <div class="akm__head">
        <div class="akm__brand">
          <div class="akm__logo">KEY</div>
          <div>
            <div class="akm__title">API key manager · org-scoped tokens</div>
            <div class="akm__sub">7 active · 2 expiring &lt; 30d · 1 revoked · last rotation 28 Apr 11:02</div>
          </div>
        </div>
        <div class="akm__meta">
          <strong>v 2 · sk_live · sk_test</strong><br/>
          rotation policy 90 d<br/>
          IP allow-list ON
        </div>
      </div>

      <div class="akm__new">
        <div class="akm__new-ico">!</div>
        <div class="akm__new-body">
          <div class="akm__new-h">New key created · copy now — shown only once</div>
          <div class="akm__new-sub">name: <strong>Lab partner · Bumrungrad</strong> · created just now · 90 d expiry · scopes lab:read, pat:read</div>
          <div class="akm__new-key">
            <div class="akm__new-val">sk_live_DEMO_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
            <button class="akm__new-btn">Copy</button>
            <button class="akm__new-btn akm__new-btn--p">I've saved it</button>
          </div>
        </div>
      </div>

      <div class="akm__strip">
        <div class="akm__strip-c"><span class="akm__strip-cap">Active keys</span><span class="akm__strip-val">7</span><span class="akm__strip-meta">5 server · 2 partner</span></div>
        <div class="akm__strip-c"><span class="akm__strip-cap">Calls 24 h</span><span class="akm__strip-val">128.4k</span><span class="akm__strip-meta">+12 % wow · p99 84 ms</span></div>
        <div class="akm__strip-c"><span class="akm__strip-cap">Errors 24 h</span><span class="akm__strip-val">0.21 %</span><span class="akm__strip-meta">269 / 128.4k · 401 most</span></div>
        <div class="akm__strip-c"><span class="akm__strip-cap">Expiring &lt; 30 d</span><span class="akm__strip-val">2</span><span class="akm__strip-meta">rotate before 28 May</span></div>
      </div>

      <div class="akm__bar">
        <span class="akm__chip is-on">All</span>
        <span class="akm__chip">Live</span>
        <span class="akm__chip">Test</span>
        <span class="akm__chip">Expiring</span>
        <span class="akm__chip">Revoked</span>
        <input class="akm__search" placeholder="search by name, prefix, owner…"/>
        <button class="akm__btn">Export CSV</button>
        <button class="akm__btn akm__btn--p">+ Create key</button>
      </div>

      <div class="akm__wrap">
        <table class="akm__tbl">
          <thead>
            <tr>
              <th class="akm__th">Name · owner</th>
              <th class="akm__th">Key (last 4)</th>
              <th class="akm__th">Scopes</th>
              <th class="akm__th">Last used</th>
              <th class="akm__th">Usage / quota</th>
              <th class="akm__th">Expires</th>
              <th class="akm__th">Status</th>
              <th class="akm__th"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="akm__td"><div class="akm__name"><span class="akm__name-t">Lab partner · Bumrungrad</span><span class="akm__name-s">created by sysadmin · just now</span></div></td>
              <td class="akm__td"><span class="akm__key">sk_live_…b1a3</span></td>
              <td class="akm__td"><div class="akm__scope"><span>lab:read</span><span>pat:read</span></div></td>
              <td class="akm__td"><span class="cx9-mono">never</span></td>
              <td class="akm__td"><div class="akm__use">0 / 50k <small>min · day</small><div class="akm__bar-mini"><i style="width:0%"></i></div></div></td>
              <td class="akm__td"><span class="cx9-mono">29 Jul · 90 d</span></td>
              <td class="akm__td"><span class="akm__st akm__st--ok">active</span></td>
              <td class="akm__td"><div class="akm__act"><button>Edit</button><button>Rotate</button><button class="is-danger">Revoke</button></div></td>
            </tr>
            <tr>
              <td class="akm__td"><div class="akm__name"><span class="akm__name-t">EMR mobile (iOS)</span><span class="akm__name-s">owner mobile-team · 12 Feb</span></div></td>
              <td class="akm__td"><span class="akm__key">sk_live_…7c4d</span></td>
              <td class="akm__td"><div class="akm__scope"><span>pat:*</span><span>note:rw</span><span>rx:create</span></div></td>
              <td class="akm__td"><span class="cx9-mono">2 min ago</span></td>
              <td class="akm__td"><div class="akm__use">42.1k / 100k <small>req · day</small><div class="akm__bar-mini"><i style="width:42%"></i></div></div></td>
              <td class="akm__td"><span class="cx9-mono">12 May · 11 d</span></td>
              <td class="akm__td"><span class="akm__st akm__st--warn">expires soon</span></td>
              <td class="akm__td"><div class="akm__act"><button>Edit</button><button>Rotate</button><button class="is-danger">Revoke</button></div></td>
            </tr>
            <tr>
              <td class="akm__td"><div class="akm__name"><span class="akm__name-t">Billing batch · nightly</span><span class="akm__name-s">owner finance-bot · 2 Jan</span></div></td>
              <td class="akm__td"><span class="akm__key">sk_live_…9f1e</span></td>
              <td class="akm__td"><div class="akm__scope"><span>bill:rw</span><span>auth:read</span></div></td>
              <td class="akm__td"><span class="cx9-mono">8 h ago</span></td>
              <td class="akm__td"><div class="akm__use">8.4k / 20k <small>req · day</small><div class="akm__bar-mini"><i style="width:42%"></i></div></div></td>
              <td class="akm__td"><span class="cx9-mono">2 Apr 27 · 11 mo</span></td>
              <td class="akm__td"><span class="akm__st akm__st--ok">active</span></td>
              <td class="akm__td"><div class="akm__act"><button>Edit</button><button>Rotate</button><button class="is-danger">Revoke</button></div></td>
            </tr>
            <tr>
              <td class="akm__td"><div class="akm__name"><span class="akm__name-t">Insurance gateway</span><span class="akm__name-s">owner platform · 4 Nov</span></div></td>
              <td class="akm__td"><span class="akm__key">sk_live_…3a8b</span></td>
              <td class="akm__td"><div class="akm__scope"><span>auth:submit</span><span>auth:approve</span></div></td>
              <td class="akm__td"><span class="cx9-mono">17 min ago</span></td>
              <td class="akm__td"><div class="akm__use">19.6k / 20k <small>req · day</small><div class="akm__bar-mini is-err"><i style="width:98%"></i></div></div></td>
              <td class="akm__td"><span class="cx9-mono">8 May · 7 d</span></td>
              <td class="akm__td"><span class="akm__st akm__st--warn">expires soon</span></td>
              <td class="akm__td"><div class="akm__act"><button>Edit</button><button>Rotate</button><button class="is-danger">Revoke</button></div></td>
            </tr>
            <tr>
              <td class="akm__td"><div class="akm__name"><span class="akm__name-t">QA sandbox</span><span class="akm__name-s">owner qa-team · 3 Mar</span></div></td>
              <td class="akm__td"><span class="akm__key">sk_test_…5d2c</span></td>
              <td class="akm__td"><div class="akm__scope"><span>*:read</span></div></td>
              <td class="akm__td"><span class="cx9-mono">3 d ago</span></td>
              <td class="akm__td"><div class="akm__use">412 / 5k <small>req · day</small><div class="akm__bar-mini"><i style="width:8%"></i></div></div></td>
              <td class="akm__td"><span class="cx9-mono">3 Jun · 33 d</span></td>
              <td class="akm__td"><span class="akm__st akm__st--ok">active</span></td>
              <td class="akm__td"><div class="akm__act"><button>Edit</button><button>Rotate</button><button class="is-danger">Revoke</button></div></td>
            </tr>
            <tr>
              <td class="akm__td"><div class="akm__name"><span class="akm__name-t">Old dashboard (legacy)</span><span class="akm__name-s">owner sysadmin · 18 Aug 24</span></div></td>
              <td class="akm__td"><span class="akm__key">sk_live_…0e6f</span></td>
              <td class="akm__td"><div class="akm__scope"><span>pat:read</span></div></td>
              <td class="akm__td"><span class="cx9-mono">never (90 d)</span></td>
              <td class="akm__td"><div class="akm__use">— <small>idle key</small><div class="akm__bar-mini is-warn"><i style="width:0%"></i></div></div></td>
              <td class="akm__td"><span class="cx9-mono">18 Nov · revoked</span></td>
              <td class="akm__td"><span class="akm__st akm__st--rev">revoked</span></td>
              <td class="akm__td"><div class="akm__act"><button>Restore</button><button class="is-danger">Delete</button></div></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="akm__foot">
        <div class="akm__foot-meta">Keys hashed at rest (argon2id) · scoped JWTs · IP allow-list 4 ranges · all actions audit-logged · rotation reminders 14/7/1 d before expiry</div>
        <div class="akm__foot-meta">⌘N create · ⌘R rotate selected · ⌘⇧Del revoke</div>
      </div>`;

    return section('akm','100','API key manager · org tokens',
      'Stripe-style key console · "shown once" callout for newly created key with copy + acknowledge · 4-tile usage strip (active · 24 h calls · errors · expiring) · filter chips + search · 6-row table with name/owner, masked key, scope chips, last-used, usage bar vs quota, expiry, status pill (active/expiring/revoked), and per-row Edit/Rotate/Revoke.',
      sub('1 just-created · 7 active · 2 expiring &lt; 30 d · 1 revoked · 128.4k calls today', demo(card)));
  });
})();
