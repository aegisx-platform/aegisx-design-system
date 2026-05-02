/* #107 System health dashboard */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  // Build a latency chart with p50, p95 lines and a budget threshold
  function buildChart(){
    const W = 720, H = 160, PAD_L = 28, PAD_R = 8, PAD_T = 8, PAD_B = 18;
    const innerW = W - PAD_L - PAD_R;
    const innerH = H - PAD_T - PAD_B;
    const N = 48;
    // p50 (ms): 110..160 with one bump
    const p50 = [115,118,116,114,120,122,118,116,115,114,118,120,122,124,128,130,132,128,124,122,120,118,116,118,120,122,124,128,134,142,148,156,162,158,150,142,135,130,126,124,122,120,118,116,115,114,113,114];
    // p95 (ms): 240..420 with bigger spike
    const p95 = [255,260,258,252,265,272,268,262,258,254,260,268,272,278,285,290,298,295,288,280,272,265,260,265,272,280,290,308,332,360,395,432,448,420,388,352,322,300,285,278,272,265,260,255,252,250,248,250];
    const yMax = 500;
    const xAt = i => PAD_L + (i / (N - 1)) * innerW;
    const yAt = v => PAD_T + (1 - v / yMax) * innerH;
    const path = arr => arr.map((v,i)=>(i===0?'M':'L') + xAt(i).toFixed(1) + ',' + yAt(v).toFixed(1)).join(' ');
    const budgetY = yAt(400);
    // y-axis labels
    const yLabels = [0, 100, 200, 300, 400, 500].map(v =>
      `<g><text x="${PAD_L - 5}" y="${yAt(v) + 3}" text-anchor="end" font-size="9" font-family="monospace" fill="rgba(15,23,42,0.45)">${v}</text>
       <line x1="${PAD_L}" x2="${W - PAD_R}" y1="${yAt(v)}" y2="${yAt(v)}" stroke="rgba(15,23,42,0.06)" stroke-width="1"/></g>`
    ).join('');
    return `
      <svg class="shd__chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
        ${yLabels}
        <line x1="${PAD_L}" x2="${W - PAD_R}" y1="${budgetY}" y2="${budgetY}" stroke="var(--ax-warning-emphasis)" stroke-width="1.2" stroke-dasharray="3 3"/>
        <text x="${W - PAD_R - 4}" y="${budgetY - 4}" text-anchor="end" font-size="9" font-family="monospace" fill="var(--ax-warning-emphasis)" font-weight="700">budget 400 ms</text>
        <path d="${path(p95)}" fill="none" stroke="var(--ax-info-emphasis)" stroke-width="1.5" opacity="0.85"/>
        <path d="${path(p50)}" fill="none" stroke="var(--ax-text-heading)" stroke-width="1.8"/>
        <circle cx="${xAt(31)}" cy="${yAt(p95[31])}" r="3" fill="var(--ax-warning-emphasis)"/>
      </svg>`;
  }

  // Sparklines
  function spark(values, warnIdx){
    const max = Math.max(...values);
    return `<div class="shd__spark">${values.map((v,i) => {
      const cls = (warnIdx && warnIdx.includes(i)) ? 'w' : '';
      return `<i style="height:${(v/max)*100}%" class="${cls}"></i>`;
    }).join('')}</div>`;
  }

  AX9.register(function systemHealthSection(){
    const card = h('div', {class:'shd'});
    card.innerHTML = `
      <div class="shd__head">
        <div class="shd__brand">
          <div class="shd__logo">SYS</div>
          <div>
            <div class="shd__title">System health · platform · 30-day SLOs</div>
            <div class="shd__sub">org-scoped + global view · region ap-southeast-1 (primary) · ap-southeast-2 (warm-standby) · refresh every 15 s</div>
          </div>
        </div>
        <div class="shd__meta">
          <strong>● all systems normal</strong><br/>
          status.aegisx.health<br/>
          on-call · SRE-2 · Kanya
        </div>
      </div>

      <div class="shd__banner">
        <div class="shd__banner-l">
          <span class="shd__banner-dot"></span>
          <div>
            <div class="shd__banner-t">All systems normal · no active incidents</div>
            <div class="shd__banner-s">last incident · 27 Apr 14:03 · webhook delivery degradation · resolved 14:31 · postmortem published</div>
          </div>
        </div>
        <div class="shd__banner-r">
          <strong>uptime 30 d · 99.987 %</strong><br/>
          error budget remaining <strong>62 %</strong>
        </div>
      </div>

      <div class="shd__slo-grid">
        <div class="shd__slo">
          <div class="shd__slo-h"><span class="shd__slo-name">Availability · 30 d</span><span class="shd__slo-pill shd__slo-pill--ok">on track</span></div>
          <div class="shd__slo-val">99.987<small>%</small></div>
          <div class="shd__slo-bar"><i style="width:62%"></i></div>
          <div class="shd__slo-meta"><span>budget burn 38 %</span><strong>SLO 99.95 %</strong></div>
        </div>
        <div class="shd__slo">
          <div class="shd__slo-h"><span class="shd__slo-name">API latency p95</span><span class="shd__slo-pill shd__slo-pill--ok">on track</span></div>
          <div class="shd__slo-val">298<small>ms</small></div>
          <div class="shd__slo-bar"><i style="width:48%"></i></div>
          <div class="shd__slo-meta"><span>budget 400 ms</span><strong>p99 612 ms</strong></div>
        </div>
        <div class="shd__slo">
          <div class="shd__slo-h"><span class="shd__slo-name">Webhook delivery</span><span class="shd__slo-pill shd__slo-pill--warn">watch</span></div>
          <div class="shd__slo-val">99.62<small>%</small></div>
          <div class="shd__slo-bar"><i class="is-warn" style="width:78%"></i></div>
          <div class="shd__slo-meta"><span>burn 78 % MTD</span><strong>SLO 99.5 %</strong></div>
        </div>
        <div class="shd__slo">
          <div class="shd__slo-h"><span class="shd__slo-name">Job queue depth</span><span class="shd__slo-pill shd__slo-pill--ok">on track</span></div>
          <div class="shd__slo-val">142<small>p95</small></div>
          <div class="shd__slo-bar"><i style="width:28%"></i></div>
          <div class="shd__slo-meta"><span>oldest 4.2 s</span><strong>budget 1k</strong></div>
        </div>
      </div>

      <div class="shd__body">

        <div class="shd__l">

          <div class="shd__chart">
            <div class="shd__chart-h">
              <div>
                <div class="shd__chart-t">API latency · 24 h</div>
                <div class="shd__chart-s">all routes · weighted by RPS · spike at 08:30 = warm cache miss after deploy v847</div>
              </div>
              <div class="shd__chart-leg"><span>p50</span><span>p95</span><span>budget 400 ms</span></div>
            </div>
            ${buildChart()}
            <div class="shd__chart-x"><span>09:00</span><span>15:00</span><span>21:00</span><span>03:00</span><span>09:00 today</span></div>
          </div>

          <div class="shd__sec-h"><span>Services · 8 of 12</span><span class="shd__sec-cap">click to drill into traces</span></div>
          <div class="shd__svc">
            <div class="shd__svc-h">
              <div>service</div>
              <div>p95 ms</div>
              <div>RPS</div>
              <div>err %</div>
              <div>1 h trend</div>
              <div>status</div>
            </div>
            <div class="shd__svc-r">
              <div class="shd__svc-name"><span class="shd__svc-dot ok"></span><div><strong>api-gateway</strong><small>edge · auth · rate-limit</small></div></div>
              <div class="shd__svc-num">142</div>
              <div class="shd__svc-num">1,842</div>
              <div class="shd__svc-num">0.04</div>
              <div>${spark([4,5,4,6,5,7,6,5,4,5,6,5,4,5,6,7,5,4,5,6])}</div>
              <div class="shd__svc-num" style="color:var(--ax-success-emphasis); font-weight:700;">OK</div>
            </div>
            <div class="shd__svc-r">
              <div class="shd__svc-name"><span class="shd__svc-dot ok"></span><div><strong>patient-svc</strong><small>EHR core · postgres</small></div></div>
              <div class="shd__svc-num">186</div>
              <div class="shd__svc-num">624</div>
              <div class="shd__svc-num">0.02</div>
              <div>${spark([5,5,4,6,7,5,4,5,6,5,4,5,6,7,5,4,5,5,6,5])}</div>
              <div class="shd__svc-num" style="color:var(--ax-success-emphasis); font-weight:700;">OK</div>
            </div>
            <div class="shd__svc-r">
              <div class="shd__svc-name"><span class="shd__svc-dot ok"></span><div><strong>rx-svc</strong><small>orders · DUR · sign</small></div></div>
              <div class="shd__svc-num">220</div>
              <div class="shd__svc-num">218</div>
              <div class="shd__svc-num">0.08</div>
              <div>${spark([6,5,7,8,6,5,7,6,5,7,8,6,5,7,8,9,7,6,5,7])}</div>
              <div class="shd__svc-num" style="color:var(--ax-success-emphasis); font-weight:700;">OK</div>
            </div>
            <div class="shd__svc-r">
              <div class="shd__svc-name"><span class="shd__svc-dot warn"></span><div><strong>webhook-dispatcher</strong><small>fan-out · retry · DLQ</small></div></div>
              <div class="shd__svc-num is-warn">412</div>
              <div class="shd__svc-num">96</div>
              <div class="shd__svc-num is-warn">0.38</div>
              <div>${spark([4,5,6,7,8,9,12,14,11,10,9,8,7,6,5,6,7,8,9,7],[6,7,8,9])}</div>
              <div class="shd__svc-num" style="color:var(--ax-warning-emphasis); font-weight:700;">WATCH</div>
            </div>
            <div class="shd__svc-r">
              <div class="shd__svc-name"><span class="shd__svc-dot ok"></span><div><strong>billing-svc</strong><small>invoices · claims · NHSO</small></div></div>
              <div class="shd__svc-num">312</div>
              <div class="shd__svc-num">42</div>
              <div class="shd__svc-num">0.00</div>
              <div>${spark([6,5,7,8,6,5,7,8,6,5,7,8,6,5,7,8,6,5,7,8])}</div>
              <div class="shd__svc-num" style="color:var(--ax-success-emphasis); font-weight:700;">OK</div>
            </div>
            <div class="shd__svc-r">
              <div class="shd__svc-name"><span class="shd__svc-dot ok"></span><div><strong>auth-svc</strong><small>OAuth · MFA · session</small></div></div>
              <div class="shd__svc-num">88</div>
              <div class="shd__svc-num">412</div>
              <div class="shd__svc-num">0.01</div>
              <div>${spark([3,4,3,5,4,3,4,3,5,4,3,4,3,5,4,3,4,3,5,4])}</div>
              <div class="shd__svc-num" style="color:var(--ax-success-emphasis); font-weight:700;">OK</div>
            </div>
            <div class="shd__svc-r">
              <div class="shd__svc-name"><span class="shd__svc-dot ok"></span><div><strong>search-svc</strong><small>elastic · 18 ms idx lag</small></div></div>
              <div class="shd__svc-num">62</div>
              <div class="shd__svc-num">198</div>
              <div class="shd__svc-num">0.00</div>
              <div>${spark([2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3])}</div>
              <div class="shd__svc-num" style="color:var(--ax-success-emphasis); font-weight:700;">OK</div>
            </div>
            <div class="shd__svc-r">
              <div class="shd__svc-name"><span class="shd__svc-dot ok"></span><div><strong>worker-pool</strong><small>jobs · 142 in queue</small></div></div>
              <div class="shd__svc-num">—</div>
              <div class="shd__svc-num">62 jps</div>
              <div class="shd__svc-num">0.06</div>
              <div>${spark([4,5,4,6,5,4,5,6,5,4,5,6,5,4,5,6,5,4,5,6])}</div>
              <div class="shd__svc-num" style="color:var(--ax-success-emphasis); font-weight:700;">OK</div>
            </div>
          </div>

        </div>

        <div class="shd__r">

          <div class="shd__sec-h"><span>Regions</span><span class="shd__sec-cap">2 active · primary + warm-standby</span></div>
          <div class="shd__reg">
            <div class="shd__reg-r">
              <div class="shd__reg-name"><span class="shd__reg-flag">SG</span><span>ap-southeast-1 · primary<br/><small style="color:var(--ax-text-subtle); font-size:9.5px;">Singapore · 8 AZ · active-active</small></span></div>
              <div class="shd__reg-meta"><strong>p95 142 ms</strong><br/>1,842 RPS</div>
              <div><span class="shd__reg-st ok">healthy</span></div>
            </div>
            <div class="shd__reg-r">
              <div class="shd__reg-name"><span class="shd__reg-flag">AU</span><span>ap-southeast-2 · standby<br/><small style="color:var(--ax-text-subtle); font-size:9.5px;">Sydney · warm · 4 m RPO</small></span></div>
              <div class="shd__reg-meta"><strong>replica lag 240 ms</strong><br/>readonly · last DR 14 d</div>
              <div><span class="shd__reg-st ok">ready</span></div>
            </div>
            <div class="shd__reg-r">
              <div class="shd__reg-name"><span class="shd__reg-flag">TH</span><span>local · siriraj-edge<br/><small style="color:var(--ax-text-subtle); font-size:9.5px;">on-prem cache · 2 nodes</small></span></div>
              <div class="shd__reg-meta"><strong>cache hit 94.2 %</strong><br/>last sync 12 s ago</div>
              <div><span class="shd__reg-st ok">healthy</span></div>
            </div>
          </div>

          <div class="shd__sec-h"><span>Recent incidents · 7 d</span><span class="shd__sec-cap">3 entries · 0 active</span></div>
          <div class="shd__inc">
            <div class="shd__inc-r">
              <div class="shd__inc-h">
                <div class="shd__inc-t"><span class="shd__inc-tag is-res">resolved</span>Webhook delivery degradation</div>
                <span class="shd__inc-time">27 Apr · 28 m</span>
              </div>
              <div class="shd__inc-d">DLQ surge after partner timeout config change · auto-retry succeeded · postmortem inc-2024-04-27 published · action item: tighten remote timeout to 8 s</div>
            </div>
            <div class="shd__inc-r">
              <div class="shd__inc-h">
                <div class="shd__inc-t"><span class="shd__inc-tag is-res">resolved</span>Search reindex lag</div>
                <span class="shd__inc-time">24 Apr · 12 m</span>
              </div>
              <div class="shd__inc-d">Elastic primary failover during patch · read-only fallback to replica · no data loss · auto-resolved on rejoin</div>
            </div>
            <div class="shd__inc-r">
              <div class="shd__inc-h">
                <div class="shd__inc-t"><span class="shd__inc-tag is-mon">monitoring</span>Lab partner LIS slow</div>
                <span class="shd__inc-time">29 Apr · ongoing</span>
              </div>
              <div class="shd__inc-d">External · Bumrungrad LIS-A reporting +2.4 s p95 · circuit breaker engaged on 3 retries · partner notified · status downstream-only</div>
            </div>
          </div>

          <div class="shd__sec-h"><span>Capacity · headroom</span><span class="shd__sec-cap">scale-up readiness</span></div>
          <div class="shd__reg">
            <div class="shd__reg-r">
              <div class="shd__reg-name"><span style="font-family:var(--ax-font-mono); color:var(--ax-text-heading); font-weight:600;">CPU pool · API tier</span></div>
              <div class="shd__reg-meta"><strong>38 %</strong> of 96 vCPU</div>
              <div><span class="shd__reg-st ok">3.2× headroom</span></div>
            </div>
            <div class="shd__reg-r">
              <div class="shd__reg-name"><span style="font-family:var(--ax-font-mono); color:var(--ax-text-heading); font-weight:600;">Postgres connections</span></div>
              <div class="shd__reg-meta"><strong>240 / 400</strong> · pgbouncer</div>
              <div><span class="shd__reg-st warn">60 %</span></div>
            </div>
            <div class="shd__reg-r">
              <div class="shd__reg-name"><span style="font-family:var(--ax-font-mono); color:var(--ax-text-heading); font-weight:600;">Storage · clinical</span></div>
              <div class="shd__reg-meta"><strong>4.8 / 12 TB</strong> · grow 18 GB/d</div>
              <div><span class="shd__reg-st ok">280 d</span></div>
            </div>
          </div>

        </div>

      </div>

      <div class="shd__foot">
        <div class="shd__foot-meta">SLOs reset on the 1st · burn-rate alerts page on-call at 2× over 1 h or 5× over 5 m · runbooks linked from each row · status page mirrors this view publicly</div>
        <div class="shd__foot-meta">refreshed 4 s ago · paused on tab blur · ⌘R force refresh</div>
      </div>`;

    return section('shd','107','System health dashboard · SLOs + services',
      'Operator overview: all-clear status banner with on-call info · 4-tile SLO bar (availability, p95 latency, webhook delivery, queue depth) with budget bars and burn % · 24-h API latency SVG chart with p50, p95 and 400 ms budget threshold · 8-row service table with sparklines, p95/RPS/err%/status pill (one row in WATCH) · 2-region active-active panel + on-prem edge · 7-day incident timeline (resolved + monitoring tags) · capacity headroom strip.',
      sub('All systems normal · uptime 99.987 % · error budget 62 % left · 1 service WATCH · 0 active incidents', demo(card)));
  });
})();
