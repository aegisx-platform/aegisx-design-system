/* #103 Audit log search */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  AX9.register(function auditSearchSection(){
    const card = h('div', {class:'aud'});

    // 48 buckets, mostly info, a few warn, 2 err
    const bars = [3,2,4,3,5,4,7,6,8,9,7,5,4,3,4,6,8,12,14,16,18,15,11,9,8,12,14,17,19,22,18,15,12,9,7,8,11,14,16,13,10,8,6,5,4,5,6,8];
    const wIdx = new Set([7,18,30,39]);
    const eIdx = new Set([14,33]);
    const histHtml = bars.map((b,i)=>{
      const cls = eIdx.has(i)?'is-e':wIdx.has(i)?'is-w':'';
      return `<i style="height:${(b/24)*100}%" class="${cls}"></i>`;
    }).join('');

    card.innerHTML = `
      <div class="aud__head">
        <div class="aud__brand">
          <div class="aud__logo">AUD</div>
          <div>
            <div class="aud__title">Audit log search · last 24 h</div>
            <div class="aud__sub">org aegisx-bgkk-001 · 482 events · WORM-archived 7 y · HIPAA / PDPA tagged · query took 38 ms</div>
          </div>
        </div>
        <div class="aud__meta">
          <strong>tier · hot 30 d</strong><br/>
          warm 1 y · cold 7 y<br/>
          immutable · merkle-anchored
        </div>
      </div>

      <div class="aud__qbar">
        <div class="aud__q">
          <span class="aud__q-prompt">›</span>
          <div class="aud__q-val">action:<span class="ax-tok">rx.signed</span> OR severity:<span class="ax-tok ax-tok--w">warn</span> AND user.role:<span class="ax-tok">clinician</span> AND time:<span class="ax-tok">last 24h</span> NOT ip:<span class="ax-tok ax-tok--e">10.0.0.0/8</span></div>
          <button class="aud__q-btn">Search</button>
        </div>
        <div class="aud__q-help">
          <span><kbd>action:</kbd> <kbd>actor:</kbd> <kbd>resource:</kbd> <kbd>severity:</kbd> <kbd>ip:</kbd> <kbd>time:</kbd></span>
          <span>· operators <kbd>AND</kbd> <kbd>OR</kbd> <kbd>NOT</kbd> <kbd>"…"</kbd> · ⌘K shortcuts · saved searches: <kbd>after-hours rx</kbd> <kbd>failed logins</kbd> <kbd>export PHI</kbd></span>
        </div>
      </div>

      <div class="aud__top">

        <div class="aud__facets">
          <div class="aud__facet">
            <span class="aud__facet-h">Severity · 482</span>
            <div class="aud__facet-list">
              <div class="aud__facet-i is-on">● info<span class="num">441</span></div>
              <div class="aud__facet-i">● warn<span class="num">37</span></div>
              <div class="aud__facet-i">● error<span class="num">4</span></div>
            </div>
          </div>
          <div class="aud__facet">
            <span class="aud__facet-h">Action · top 6</span>
            <div class="aud__facet-list">
              <div class="aud__facet-i">login.success<span class="num">128</span></div>
              <div class="aud__facet-i">pat.read<span class="num">96</span></div>
              <div class="aud__facet-i is-on">rx.signed<span class="num">71</span></div>
              <div class="aud__facet-i">note.create<span class="num">52</span></div>
              <div class="aud__facet-i">bill.post<span class="num">34</span></div>
              <div class="aud__facet-i">login.failed<span class="num">12</span></div>
            </div>
          </div>
          <div class="aud__facet">
            <span class="aud__facet-h">Actor · role</span>
            <div class="aud__facet-list">
              <div class="aud__facet-i is-on">clinician<span class="num">218</span></div>
              <div class="aud__facet-i">nurse<span class="num">147</span></div>
              <div class="aud__facet-i">biller<span class="num">61</span></div>
              <div class="aud__facet-i">sysadmin<span class="num">38</span></div>
              <div class="aud__facet-i">api-key<span class="num">18</span></div>
            </div>
          </div>
          <div class="aud__facet">
            <span class="aud__facet-h">Source IP</span>
            <div class="aud__facet-list">
              <div class="aud__facet-i">192.168.10.0/24<span class="num">312</span></div>
              <div class="aud__facet-i">203.150.224.0/24<span class="num">147</span></div>
              <div class="aud__facet-i">other<span class="num">23</span></div>
            </div>
          </div>
        </div>

        <div class="aud__top-r">
          <div class="aud__hist">
            <div class="aud__hist-h">
              <span class="aud__hist-h-l">Events · 30-min buckets</span>
              <span class="aud__hist-h-r"><strong>482</strong> total · 4 errors · 37 warnings · peak 14:00</span>
            </div>
            <div class="aud__hist-bars">${histHtml}</div>
            <div class="aud__hist-cap"><span>09:00 yest</span><span>15:00</span><span>21:00</span><span>03:00</span><span>09:00 today</span></div>
          </div>
          <div class="aud__strip">
            <div class="aud__strip-c"><span class="aud__strip-cap">Unique actors</span><span class="aud__strip-val">38</span><span class="aud__strip-meta">+2 vs avg</span></div>
            <div class="aud__strip-c"><span class="aud__strip-cap">After-hours</span><span class="aud__strip-val">14</span><span class="aud__strip-meta">22:00–06:00</span></div>
            <div class="aud__strip-c"><span class="aud__strip-cap">Failed auth</span><span class="aud__strip-val">12</span><span class="aud__strip-meta">2 IPs · brute-block</span></div>
            <div class="aud__strip-c"><span class="aud__strip-cap">PHI exports</span><span class="aud__strip-val">3</span><span class="aud__strip-meta">all consented</span></div>
          </div>
        </div>

      </div>

      <div class="aud__tbl">
        <div class="aud__th">
          <div>Time · UTC+7</div>
          <div>Sev</div>
          <div>Action</div>
          <div>Summary</div>
          <div>Actor</div>
          <div>IP</div>
        </div>
        <div class="aud__r">
          <div class="aud__time"><strong>09:14:32</strong>9 m ago</div>
          <span class="aud__sev aud__sev--info">info</span>
          <div class="aud__act">rx.signed</div>
          <div class="aud__sum">signed Rx <strong>Paracetamol 500 mg × 30</strong> for MRN 67-12345 · cosign waived (single signer policy) · diff <code>+1 line</code></div>
          <div class="aud__user"><strong>Dr. Naree S.</strong>clinician · u_8f2a</div>
          <div class="aud__ip">192.168.10.42</div>
        </div>
        <div class="aud__r">
          <div class="aud__time"><strong>09:11:08</strong>12 m ago</div>
          <span class="aud__sev aud__sev--warn">warn</span>
          <div class="aud__act">pat.export</div>
          <div class="aud__sum">exported <strong>14 patient records</strong> as CSV · purpose <code>quality-audit</code> · consent batch BC-241004 verified</div>
          <div class="aud__user"><strong>QA team</strong>auditor · u_3a8b</div>
          <div class="aud__ip">192.168.10.61</div>
        </div>
        <div class="aud__r">
          <div class="aud__time"><strong>09:08:55</strong>15 m ago</div>
          <span class="aud__sev aud__sev--err">error</span>
          <div class="aud__act">login.failed</div>
          <div class="aud__sum">5 consecutive failures for <strong>u_dr_pong</strong> · account <code>locked 15 min</code> · brute-force protection</div>
          <div class="aud__user"><strong>—</strong>system</div>
          <div class="aud__ip">203.0.113.18</div>
        </div>
        <div class="aud__r">
          <div class="aud__time"><strong>09:02:41</strong>21 m ago</div>
          <span class="aud__sev aud__sev--info">info</span>
          <div class="aud__act">role.change</div>
          <div class="aud__sum">role <code>biller → biller-lead</code> on user RN Pim K. · approved by sysadmin · 2-step verified</div>
          <div class="aud__user"><strong>sysadmin</strong>owner · u_0001</div>
          <div class="aud__ip">192.168.10.2</div>
        </div>
        <div class="aud__r">
          <div class="aud__time"><strong>08:58:12</strong>26 m ago</div>
          <span class="aud__sev aud__sev--warn">warn</span>
          <div class="aud__act">flag.toggle</div>
          <div class="aud__sum">flag <strong>sepsis-early-warning</strong> rolled out canary <code>40 % → 60 %</code> on 3 wards · 2-approval met</div>
          <div class="aud__user"><strong>Clinical AI</strong>service · u_svc_ai</div>
          <div class="aud__ip">10.0.4.12</div>
        </div>
        <div class="aud__r">
          <div class="aud__time"><strong>08:54:09</strong>30 m ago</div>
          <span class="aud__sev aud__sev--info">info</span>
          <div class="aud__act">key.rotate</div>
          <div class="aud__sum">rotated API key <strong>EMR mobile (iOS)</strong> · old key revoked in 24 h grace · new prefix <code>sk_live_…7c4d</code></div>
          <div class="aud__user"><strong>sysadmin</strong>owner · u_0001</div>
          <div class="aud__ip">192.168.10.2</div>
        </div>
        <div class="aud__r">
          <div class="aud__time"><strong>08:47:33</strong>37 m ago</div>
          <span class="aud__sev aud__sev--err">error</span>
          <div class="aud__act">webhook.fail</div>
          <div class="aud__sum">delivery to <strong>LIS partner</strong> failed <code>503</code> · auto-retry succeeded on attempt 2 · evt_4f86</div>
          <div class="aud__user"><strong>—</strong>system</div>
          <div class="aud__ip">—</div>
        </div>
      </div>

      <div class="aud__foot">
        <div class="aud__foot-meta">Logs immutable · merkle-anchored hourly · WORM 7 y · queries audit-logged themselves · exports require purpose tag</div>
        <div class="aud__foot-page">
          showing 1–7 of 482
          <button>‹ prev</button>
          <button>next ›</button>
          <button>Export CSV</button>
          <button>Save search</button>
        </div>
      </div>`;

    return section('aud','103','Audit log search · DSL + facets',
      'Splunk-style query bar with tokenized DSL (action: severity: actor: ip: time:) plus AND/OR/NOT operators · 4-facet sidebar (severity, action, actor, IP) with active-pill counts · 48-bucket 30-min histogram with warn/err coloring · 4-tile context strip (actors / after-hours / failed auth / PHI exports) · 7-row table with time, severity pill, action, summary with diff codes, actor + role, source IP · WORM + merkle anchored.',
      sub('482 events 24 h · 4 errors · 37 warnings · query 38 ms · peak 14:00', demo(card)));
  });
})();
