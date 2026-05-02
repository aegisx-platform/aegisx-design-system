/* #101 Webhook config */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  AX9.register(function webhookSection(){
    const card = h('div', {class:'whk'});
    const events = [
      ['patient.created',1],['patient.updated',1],['patient.merged',0],
      ['encounter.opened',1],['encounter.closed',1],['encounter.transferred',0],
      ['order.placed',1],['order.cancelled',0],['order.completed',1],
      ['result.posted',1],['result.amended',1],['result.flagged',0],
      ['rx.signed',1],['rx.dispensed',0],['rx.refilled',0],
      ['bill.posted',0],['bill.paid',0],['preauth.decided',1]
    ];
    const evtHtml = events.map(([n,on]) => `<div class="whk__e ${on?'is-on':''}"><span class="whk__e-mark">${on?'✓':''}</span>${n}</div>`).join('');

    const bars = [12,9,18,22,14,8,5,3,4,7,11,16,24,28,21,17,13,9,7,6,5,4,3,2];
    const errIdx = [4,12];
    const chartHtml = bars.map((b,i) => `<i style="height:${(b/30)*100}%" class="${errIdx.includes(i)?'has-err':''}"></i>`).join('');

    card.innerHTML = `
      <div class="whk__head">
        <div class="whk__brand">
          <div class="whk__logo">HOOK</div>
          <div>
            <div class="whk__title">Webhook · LIS partner endpoint</div>
            <div class="whk__sub">whk_8a3f · created 12 Mar · 1 of 4 endpoints · v 2 schema · HMAC SHA-256</div>
          </div>
        </div>
        <div class="whk__meta">
          <strong>● live · 99.84 % 7 d</strong><br/>
          retry · exp-backoff · 5 attempts<br/>
          mTLS optional
        </div>
      </div>

      <div class="whk__body">

        <div class="whk__l">

          <div class="whk__sec">
            <div class="whk__sec-h"><span>Endpoint</span><span class="whk__sec-cap">POST · JSON</span></div>
            <div class="whk__url">
              <span class="whk__url-method">POST</span>
              <span class="whk__url-val">https://lis.bumrungrad.health/api/v2/aegisx/webhook</span>
              <span class="whk__url-st whk__url-st--ok">verified</span>
            </div>
            <div class="whk__field"><span class="whk__field-l">name</span><span class="whk__field-v"><strong>LIS partner · Bumrungrad</strong></span></div>
            <div class="whk__field"><span class="whk__field-l">description</span><span class="whk__field-v">forward order &amp; result events to external LIS</span></div>
            <div class="whk__field"><span class="whk__field-l">api version</span><span class="whk__field-v"><strong>2024-04-15</strong> · pinned</span></div>
            <div class="whk__field"><span class="whk__field-l">timeout</span><span class="whk__field-v">10 s · 5 retries · exp-backoff 1m → 32m</span></div>
            <div class="whk__field"><span class="whk__field-l">ip allow</span><span class="whk__field-v">203.150.224.0/24 · 203.150.225.0/24</span></div>
          </div>

          <div class="whk__sec">
            <div class="whk__sec-h"><span>Signing secret</span><span class="whk__sec-cap">HMAC-SHA-256</span></div>
            <div class="whk__secret">
              <span class="whk__secret-v">whsec_…dx4f7q9c2k</span>
              <button>Reveal</button>
              <button>Copy</button>
              <button>Rotate</button>
            </div>
            <div class="whk__field"><span class="whk__field-l">header</span><span class="whk__field-v">X-AegisX-Signature: t=…,v1=…</span></div>
            <div class="whk__field"><span class="whk__field-l">last rotated</span><span class="whk__field-v">28 Apr 09:14 by sysadmin</span></div>
          </div>

          <div class="whk__sec">
            <div class="whk__sec-h"><span>Events · 18 selected of 18</span><span class="whk__sec-cap">11 enabled</span></div>
            <div class="whk__evt">${evtHtml}</div>
          </div>

        </div>

        <div class="whk__r">

          <div class="whk__strip">
            <div class="whk__strip-c"><span class="whk__strip-cap">24 h sent</span><span class="whk__strip-val">2,184</span><span class="whk__strip-meta">+8 % d/d</span></div>
            <div class="whk__strip-c"><span class="whk__strip-cap">Success</span><span class="whk__strip-val">99.91 %</span><span class="whk__strip-meta">2 fail · auto-retry OK</span></div>
            <div class="whk__strip-c"><span class="whk__strip-cap">p95 latency</span><span class="whk__strip-val">142 ms</span><span class="whk__strip-meta">SLA &lt; 500 ms</span></div>
            <div class="whk__strip-c"><span class="whk__strip-cap">Queue lag</span><span class="whk__strip-val">0 s</span><span class="whk__strip-meta">no backlog</span></div>
          </div>

          <div class="whk__sec">
            <div class="whk__sec-h"><span>Last 24 h volume</span><span class="whk__sec-cap">hourly · 2 errors</span></div>
            <div class="whk__chart">${chartHtml}</div>
            <div class="whk__chart-cap"><span>09:00 yest</span><span>15:00</span><span>21:00</span><span>03:00</span><span>09:00 today</span></div>
          </div>

          <div class="whk__sec">
            <div class="whk__sec-h"><span>Recent deliveries</span><span class="whk__sec-cap">last 6</span></div>
            <div class="whk__del">
              <div class="whk__d">
                <span class="whk__d-time">09:14:08</span>
                <span class="whk__d-code whk__d-code--ok">200</span>
                <span class="whk__d-evt">result.posted<small>evt_4f8a · order O-2024-188214</small></span>
                <span class="whk__d-lat">128 ms</span>
              </div>
              <div class="whk__d">
                <span class="whk__d-time">09:13:42</span>
                <span class="whk__d-code whk__d-code--ok">200</span>
                <span class="whk__d-evt">order.placed<small>evt_4f89 · CBC + BMP</small></span>
                <span class="whk__d-lat">96 ms</span>
              </div>
              <div class="whk__d">
                <span class="whk__d-time">09:11:55</span>
                <span class="whk__d-code whk__d-code--err">503</span>
                <span class="whk__d-evt">result.posted<small>evt_4f86 · retried · OK on attempt 2</small></span>
                <span class="whk__d-lat">retry +1 m</span>
              </div>
              <div class="whk__d">
                <span class="whk__d-time">09:08:11</span>
                <span class="whk__d-code whk__d-code--ok">200</span>
                <span class="whk__d-evt">encounter.opened<small>evt_4f82 · MRN 67-12345</small></span>
                <span class="whk__d-lat">88 ms</span>
              </div>
              <div class="whk__d">
                <span class="whk__d-time">09:06:34</span>
                <span class="whk__d-code whk__d-code--ok">200</span>
                <span class="whk__d-evt">rx.signed<small>evt_4f80 · PCM 500 mg</small></span>
                <span class="whk__d-lat">104 ms</span>
              </div>
              <div class="whk__d">
                <span class="whk__d-time">09:02:18</span>
                <span class="whk__d-code whk__d-code--ok">200</span>
                <span class="whk__d-evt">patient.updated<small>evt_4f7c · address change</small></span>
                <span class="whk__d-lat">71 ms</span>
              </div>
            </div>
          </div>

        </div>

        <div class="whk__foot">
          <div class="whk__foot-meta">All payloads at-rest encrypted · PII redaction profile <strong>strict</strong> · raw body stored 7 d for replay</div>
          <div class="whk__foot-meta">Send test event · Replay last failed · Disable endpoint</div>
        </div>

      </div>`;

    return section('whk','101','Webhook config · endpoint detail',
      'Single-endpoint detail · POST URL with verified pill · pinned API version · IP allow-list · HMAC signing secret with reveal/copy/rotate · 18-event grid (11 enabled, 7 off) · 4-tile 24 h stat strip · 24-bar hourly volume sparkline (2 error bars) · 6-row recent deliveries with status code, event, attempt note, latency.',
      sub('Live · 99.84 % 7-day · 2,184 sent today · last delivery 09:14 (200 · 128 ms)', demo(card)));
  });
})();
