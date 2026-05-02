/* #116 Screen-reader live regions */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  AX10.register(function liveSection(){
    const card = h('div', {class:'srl'});
    card.innerHTML = `
      <div class="srl__head">
        <div class="srl__brand">
          <div class="srl__logo">aria</div>
          <div>
            <div class="srl__title">Screen-reader live regions · 4 channels · debounce 250 ms</div>
            <div class="srl__sub">aria-live=polite for status · =assertive for errors and code-blue · aria-atomic, aria-relevant tuned per channel · queue prevents clobber · per-route reset</div>
          </div>
        </div>
        <div class="srl__meta">
          <strong>regions</strong> 4 · always mounted<br/>
          <strong>queue</strong> max 8 · debounce 250 ms<br/>
          <strong>tested</strong> NVDA · JAWS · VoiceOver
        </div>
      </div>

      <div class="srl__body">

        <div class="srl__l">

          <div class="srl__sec-h"><span class="srl__sec-t">4 region channels</span><span class="srl__sec-cap">always in DOM · sr-only</span></div>
          <div class="srl__regions">
            <div class="srl__region">
              <div class="srl__region-h">
                <span class="srl__region-tag pol">polite</span>
                <span class="srl__region-n">#sr-status</span>
              </div>
              <div class="srl__region-d">Save toasts · row counts after filter · saved-draft confirmations · interrupts only on quiet.</div>
              <div class="srl__region-c">aria-live="polite"<br/>aria-atomic="true"</div>
            </div>
            <div class="srl__region">
              <div class="srl__region-h">
                <span class="srl__region-tag ass">assertive</span>
                <span class="srl__region-n">#sr-alert</span>
              </div>
              <div class="srl__region-d">Allergy collisions · failed-sign · unsaved changes warning · code-blue broadcasts. Cuts current speech.</div>
              <div class="srl__region-c">aria-live="assertive"<br/>role="alert"</div>
            </div>
            <div class="srl__region">
              <div class="srl__region-h">
                <span class="srl__region-tag pol">polite</span>
                <span class="srl__region-n">#sr-progress</span>
              </div>
              <div class="srl__region-d">Long ops: imports, syncs, AI summaries · throttled to 1 update / 2 s · final result always announced.</div>
              <div class="srl__region-c">aria-live="polite"<br/>aria-busy="true"</div>
            </div>
            <div class="srl__region">
              <div class="srl__region-h">
                <span class="srl__region-tag off">off</span>
                <span class="srl__region-n">#sr-log</span>
              </div>
              <div class="srl__region-d">Chat-style streams (orders feed, audit log) · use role=log · only newest reads, additions append.</div>
              <div class="srl__region-c">role="log"<br/>aria-relevant="additions"</div>
            </div>
          </div>

          <div class="srl__sec-h"><span class="srl__sec-t">Debounce timeline · 1.6 s window</span><span class="srl__sec-cap">events vs announcements</span></div>
          <div class="srl__deb">
            <div class="srl__deb-track">
              <!-- ticks every 200ms -->
              <div class="srl__deb-tick" style="left:12.5%;"></div>
              <div class="srl__deb-tick" style="left:25%;"></div>
              <div class="srl__deb-tick" style="left:37.5%;"></div>
              <div class="srl__deb-tick" style="left:50%;"></div>
              <div class="srl__deb-tick" style="left:62.5%;"></div>
              <div class="srl__deb-tick" style="left:75%;"></div>
              <div class="srl__deb-tick" style="left:87.5%;"></div>

              <!-- 6 raw events -->
              <div class="srl__deb-event" style="left:8%;"></div>
              <div class="srl__deb-event" style="left:14%;"></div>
              <div class="srl__deb-event" style="left:19%;"></div>
              <div class="srl__deb-event" style="left:24%;"></div>
              <div class="srl__deb-event" style="left:55%;"></div>
              <div class="srl__deb-event" style="left:78%;"></div>

              <!-- 3 actual announcements (after debounce) -->
              <div class="srl__deb-event fire" style="left:39%;"></div>
              <div class="srl__deb-event fire" style="left:70%;"></div>
              <div class="srl__deb-event fire" style="left:93%;"></div>

              <div class="srl__deb-label" style="left:39%;">a₁</div>
              <div class="srl__deb-label" style="left:70%;">a₂</div>
              <div class="srl__deb-label" style="left:93%;">a₃</div>
            </div>
            <div class="srl__deb-foot">
              <span>0 s</span>
              <span>6 events captured · 3 announcements emitted</span>
              <span>1.6 s</span>
            </div>
          </div>

          <div class="srl__sec-h"><span class="srl__sec-t">Announcement helper API</span><span class="srl__sec-cap">use-announce.ts</span></div>
          <table class="srl__types">
            <thead><tr><th>Method</th><th>Channel</th><th>Use</th></tr></thead>
            <tbody>
              <tr><td><strong>announce(msg)</strong><small>default polite</small></td><td>#sr-status</td><td>Toasts</td></tr>
              <tr><td><strong>announceUrgent(msg)</strong><small>cuts speech</small></td><td>#sr-alert</td><td>Errors, alerts</td></tr>
              <tr><td><strong>announceProgress(p,t)</strong><small>throttled</small></td><td>#sr-progress</td><td>Imports</td></tr>
              <tr><td><strong>logEvent(e)</strong><small>append-only</small></td><td>#sr-log</td><td>Streams</td></tr>
              <tr><td><strong>routeChanged(t)</strong><small>auto on nav</small></td><td>#sr-status</td><td>Page title</td></tr>
            </tbody>
          </table>

        </div>

        <div class="srl__r">

          <div class="srl__sec-h"><span class="srl__sec-t">Live announcement log · simulated NVDA stream</span><span class="srl__sec-cap">last 14 events · 9 spoken</span></div>
          <div class="srl__log">
            <div class="srl__log-h">
              <span>NVDA · simulated · &gt; speech.viewer</span>
              <span class="live">live</span>
            </div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:01</span><span class="srl__entry-pol p">P</span><span class="srl__entry-msg">"Patient Sudaa Pongchai. <em>page heading</em>"</span></div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:03</span><span class="srl__entry-pol p">P</span><span class="srl__entry-msg">"Vitals card. <em>region</em>"</span></div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:09</span><span class="srl__entry-pol p">P</span><span class="srl__entry-msg">"Saved draft 2 minutes ago."</span></div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:14</span><span class="srl__entry-pol a">A</span><span class="srl__entry-msg">"Allergy alert. Penicillin contraindicated. Confirm to override."</span></div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:16</span><span class="srl__entry-pol p">P</span><span class="srl__entry-msg">"Confirm override <em>button</em>."</span></div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:24</span><span class="srl__entry-pol p">P</span><span class="srl__entry-msg">"24 patients matching renal · sorted by ward."</span></div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:28</span><span class="srl__entry-pol p">P</span><span class="srl__entry-msg">"Importing CSV. 14 of 320 rows."</span></div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:34</span><span class="srl__entry-pol p">P</span><span class="srl__entry-msg">"Importing CSV. 188 of 320 rows."</span></div>
            <div class="srl__entry"><span class="srl__entry-t">09:42:42</span><span class="srl__entry-pol p">P</span><span class="srl__entry-msg">"Import complete. 320 of 320 succeeded."</span></div>
          </div>

          <div class="srl__sec-h"><span class="srl__sec-t">Verbosity controls · per profile</span><span class="srl__sec-cap">user.preferences.a11y</span></div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:var(--ax-background-default); border:1px solid var(--ax-border-subtle); border-radius:6px;">
              <div>
                <div style="font-size:11px; font-weight:700; color:var(--ax-text-heading);">Toast announcements</div>
                <div style="font-size:10px; color:var(--ax-text-subtle); margin-top:1px; font-family:var(--ax-font-mono);">on save · on copy · on filter</div>
              </div>
              <span class="cx10-pill cx10-pill--ok">verbose</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:var(--ax-background-default); border:1px solid var(--ax-border-subtle); border-radius:6px;">
              <div>
                <div style="font-size:11px; font-weight:700; color:var(--ax-text-heading);">Progress chatter</div>
                <div style="font-size:10px; color:var(--ax-text-subtle); margin-top:1px; font-family:var(--ax-font-mono);">imports · syncs · uploads</div>
              </div>
              <span class="cx10-pill cx10-pill--info">milestones only</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:var(--ax-background-default); border:1px solid var(--ax-border-subtle); border-radius:6px;">
              <div>
                <div style="font-size:11px; font-weight:700; color:var(--ax-text-heading);">Allergy / contraindication alerts</div>
                <div style="font-size:10px; color:var(--ax-text-subtle); margin-top:1px; font-family:var(--ax-font-mono);">cannot be muted · safety</div>
              </div>
              <span class="cx10-pill cx10-pill--err">always</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:var(--ax-background-default); border:1px solid var(--ax-border-subtle); border-radius:6px;">
              <div>
                <div style="font-size:11px; font-weight:700; color:var(--ax-text-heading);">Route changes</div>
                <div style="font-size:10px; color:var(--ax-text-subtle); margin-top:1px; font-family:var(--ax-font-mono);">on history.push</div>
              </div>
              <span class="cx10-pill cx10-pill--ok">title + landmark</span>
            </div>
          </div>

        </div>

      </div>

      <div class="srl__foot">
        <div class="srl__foot-meta">queue capacity 8 · oldest dropped if overflow · per-route hard reset on history.push · sr-only css uses standard clip-path · zero double-announcement bugs since 2024-Q3 axe runtime audit</div>
        <div style="display:flex; gap:8px;">
          <button class="srl__btn">Open · use-announce.ts</button>
          <button class="srl__btn">Run · NVDA replay</button>
          <button class="srl__btn p">Test · announce now</button>
        </div>
      </div>`;

    return section('srl','116','Screen-reader live regions',
      'Two-column. Left lists 4 always-mounted live regions (#sr-status polite · #sr-alert assertive · #sr-progress throttled · #sr-log role=log) with their aria attributes, then a debounce timeline showing 6 raw events collapsing into 3 emitted announcements over a 1.6 s window, then the announce-helper API table. Right plays a simulated NVDA speech-viewer stream tagged P / A by politeness, with timestamps, plus per-profile verbosity controls (toasts verbose, progress milestones-only, allergy alerts forced-on, route changes announce title+landmark).',
      sub('4 channels · debounce 250 ms · queue 8 · per-route reset · NVDA · JAWS · VoiceOver tested · safety alerts forced', demo(card)));
  });
})();
