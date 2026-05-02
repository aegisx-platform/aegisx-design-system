/* #108 Notification preferences */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  function cb(on, locked){
    const cls = ['npr__cb'];
    if (on) cls.push('is-on');
    if (locked) cls.push('is-locked');
    return `<div class="npr__mtx-c"><span class="${cls.join(' ')}">${on?'✓':'·'}</span></div>`;
  }
  function pri(level){
    return `<div class="npr__mtx-pri"><span class="npr__pri npr__pri--${level}">${level}</span></div>`;
  }

  AX9.register(function notifPrefsSection(){
    const card = h('div', {class:'npr'});
    card.innerHTML = `
      <div class="npr__head">
        <div class="npr__brand">
          <div class="npr__logo">NTF</div>
          <div>
            <div class="npr__title">Notification preferences · per-event × per-channel</div>
            <div class="npr__sub">user dr.naree@aegisx.health · org Siriraj · 14 events · 5 channels · quiet hours respected for non-critical only</div>
          </div>
        </div>
        <div class="npr__meta">
          <strong>org policy</strong><br/>
          critical alerts can&rsquo;t be silenced<br/>
          changes audit-logged
        </div>
      </div>

      <div class="npr__chans">
        <div class="npr__ch">
          <div class="npr__ch-h"><span class="npr__ch-name">In-app</span><span class="npr__ch-st ok">on</span></div>
          <div class="npr__ch-val">Bell + toast</div>
          <div class="npr__ch-meta">always · cannot disable</div>
        </div>
        <div class="npr__ch">
          <div class="npr__ch-h"><span class="npr__ch-name">Push</span><span class="npr__ch-st ok">on</span></div>
          <div class="npr__ch-val">iPhone 15 · iPad</div>
          <div class="npr__ch-meta">2 devices · last 4 m ago</div>
        </div>
        <div class="npr__ch">
          <div class="npr__ch-h"><span class="npr__ch-name">SMS</span><span class="npr__ch-st ok">on</span></div>
          <div class="npr__ch-val">+66 81 ··· 5678</div>
          <div class="npr__ch-meta">verified · TH gateway</div>
        </div>
        <div class="npr__ch">
          <div class="npr__ch-h"><span class="npr__ch-name">Email</span><span class="npr__ch-st ok">on</span></div>
          <div class="npr__ch-val">dr.naree@…</div>
          <div class="npr__ch-meta">digest 08:00 · per-msg crit</div>
        </div>
        <div class="npr__ch">
          <div class="npr__ch-h"><span class="npr__ch-name">Pager</span><span class="npr__ch-st off">off</span></div>
          <div class="npr__ch-val">— not paired</div>
          <div class="npr__ch-meta">on-call only · org-managed</div>
        </div>
      </div>

      <div class="npr__body">

        <div class="npr__l">

          <div class="npr__sec-h"><span>Event matrix</span><span class="npr__sec-cap">14 events · 5 channels · ✓ on · — locked-on by org</span></div>

          <div class="npr__mtx">
            <div class="npr__mtx-h">
              <div>Event</div>
              <div class="npr__mtx-h-c">In-app</div>
              <div class="npr__mtx-h-c">Push</div>
              <div class="npr__mtx-h-c">SMS</div>
              <div class="npr__mtx-h-c">Email</div>
              <div class="npr__mtx-h-c">priority</div>
            </div>

            <div class="npr__mtx-grp">Patient safety · 4</div>

            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Critical lab result</strong><small>panic value · all assigned patients</small></div>
              ${cb(true,true)}${cb(true,true)}${cb(true,false)}${cb(true,false)}${pri('crit')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Sepsis early-warning trigger</strong><small>auto NEWS-2 ≥ 7 on assigned patient</small></div>
              ${cb(true,true)}${cb(true,true)}${cb(true,false)}${cb(false,false)}${pri('crit')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Code blue · ward-paged</strong><small>any patient on your team coverage</small></div>
              ${cb(true,true)}${cb(true,true)}${cb(true,true)}${cb(false,false)}${pri('crit')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Drug-interaction · severity high</strong><small>your Rx · DUR returned major or contraindicated</small></div>
              ${cb(true,false)}${cb(true,false)}${cb(false,false)}${cb(true,false)}${pri('high')}
            </div>

            <div class="npr__mtx-grp">Workflow · 6</div>

            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Co-sign requested</strong><small>resident note awaiting your signature</small></div>
              ${cb(true,false)}${cb(true,false)}${cb(false,false)}${cb(false,false)}${pri('high')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>New referral assigned</strong><small>internal · cross-department</small></div>
              ${cb(true,false)}${cb(true,false)}${cb(false,false)}${cb(true,false)}${pri('norm')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Order pending pharmacy verify</strong><small>your Rx queued &gt; 15 min</small></div>
              ${cb(true,false)}${cb(false,false)}${cb(false,false)}${cb(false,false)}${pri('norm')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Patient checked in</strong><small>scheduled appointment arrival</small></div>
              ${cb(true,false)}${cb(true,false)}${cb(false,false)}${cb(false,false)}${pri('norm')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Room ready · admission</strong><small>bed assignment confirmed</small></div>
              ${cb(true,false)}${cb(false,false)}${cb(false,false)}${cb(false,false)}${pri('low')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>@-mention in note or thread</strong><small>colleague tagged you</small></div>
              ${cb(true,false)}${cb(true,false)}${cb(false,false)}${cb(true,false)}${pri('norm')}
            </div>

            <div class="npr__mtx-grp">Account &amp; security · 4</div>

            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Sign-in from new device</strong><small>org policy · cannot disable in-app + email</small></div>
              ${cb(true,true)}${cb(false,false)}${cb(false,false)}${cb(true,true)}${pri('high')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Password / MFA changed</strong><small>14 d cooldown for sensitive actions</small></div>
              ${cb(true,true)}${cb(false,false)}${cb(true,false)}${cb(true,true)}${pri('high')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Weekly activity digest</strong><small>Mon 08:00 · summary of last 7 d</small></div>
              ${cb(false,false)}${cb(false,false)}${cb(false,false)}${cb(true,false)}${pri('low')}
            </div>
            <div class="npr__mtx-r">
              <div class="npr__mtx-l"><strong>Product changelog</strong><small>major releases · monthly</small></div>
              ${cb(false,false)}${cb(false,false)}${cb(false,false)}${cb(true,false)}${pri('low')}
            </div>
          </div>

          <div class="npr__sec-h"><span>Quiet hours · timezone Asia/Bangkok</span><span class="npr__sec-cap">22:00 → 06:00 daily · 30 % of day</span></div>
          <div class="npr__quiet">
            <div class="npr__quiet-h">
              <div class="npr__quiet-t">Daily schedule</div>
              <div style="font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle);">applies to non-critical only · critical bypasses</div>
            </div>
            <div class="npr__quiet-track" aria-label="quiet hours timeline">
              <div class="npr__quiet-on is-q" style="left:0; width:25%;"><span class="npr__quiet-num">quiet 00–06</span></div>
              <div class="npr__quiet-on" style="left:25%; width:9%"><span class="npr__quiet-num">work 06–08</span></div>
              <div class="npr__quiet-on is-q" style="left:34%; width:5%"><span class="npr__quiet-numo" style="color:#fff;">break 08–10</span></div>
              <div class="npr__quiet-on" style="left:39%; width:50%"><span class="npr__quiet-num">work 10–22</span></div>
              <div class="npr__quiet-on is-q" style="left:89%; width:11%"><span class="npr__quiet-num">quiet 22–24</span></div>
              ${[3,6,9,12,15,18,21].map(h=>`<span class="npr__quiet-tick" style="left:${(h/24)*100}%"></span>`).join('')}
            </div>
            <div class="npr__quiet-x">
              <span>00</span><span>03</span><span>06</span><span>09</span><span>12</span><span>15</span><span>18</span><span>21</span><span>24</span>
            </div>
            <div class="npr__quiet-foot">
              <span class="npr__quiet-leg">active hours</span>
              <span class="npr__quiet-leg is-q">quiet · digest only</span>
              <span class="npr__quiet-leg" style="font-family:var(--ax-font-mono); font-size:10px;">— critical alerts always go through (org policy)</span>
            </div>
          </div>

          <div class="npr__sec-h"><span>Bundling &amp; smart defaults</span><span class="npr__sec-cap">3 toggles</span></div>
          <div class="npr__bundle">
            <div class="npr__bun-r">
              <span class="npr__bun-cb">✓</span>
              <div class="npr__bun-l"><strong>Bundle similar within 5 min</strong><small>e.g. 3 lab results for the same patient → 1 push · expand on tap</small></div>
            </div>
            <div class="npr__bun-r">
              <span class="npr__bun-cb">✓</span>
              <div class="npr__bun-l"><strong>Suppress when on shift &amp; viewing the patient</strong><small>auto-mute redundant in-app pings while you have the chart open</small></div>
            </div>
            <div class="npr__bun-r">
              <span class="npr__bun-cb is-off">·</span>
              <div class="npr__bun-l"><strong>Auto-acknowledge non-critical after 24 h</strong><small>clears the bell counter · audit-logged</small></div>
            </div>
          </div>

        </div>

        <div class="npr__r">

          <div class="npr__live">
            <div class="npr__live-h">
              <span>Live preview</span>
              <div class="npr__live-tabs">
                <button class="is-on">push</button>
                <button>email</button>
                <button>SMS</button>
              </div>
            </div>
            <div class="npr__push">
              <div class="npr__push-bar"><span>9:41</span><span>5G · 92 %</span></div>
              <div class="npr__push-card">
                <div class="npr__push-ico">!</div>
                <div style="flex:1;">
                  <div class="npr__push-h">
                    <span class="npr__push-app">AegisX · Siriraj</span>
                    <span class="npr__push-time">now</span>
                  </div>
                  <div class="npr__push-t">Critical lab · K⁺ 6.4 mmol/L</div>
                  <div class="npr__push-d">MRN 67-12345 · Sudaa P. · panic-high · drawn 09:08 · resulted 09:14</div>
                  <div class="npr__push-act">
                    <button>Acknowledge</button>
                    <button class="is-p">Open chart →</button>
                  </div>
                </div>
              </div>
            </div>
            <div style="font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle); margin-top:8px; line-height:1.5;">
              critical · bypasses quiet hours · banner red · haptic 2× · also dispatched to in-app + SMS per matrix above
            </div>
          </div>

          <div class="npr__sec-h"><span>Recent · last 24 h</span><span class="npr__sec-cap">38 sent · 12 in-app · 8 push · 14 email · 4 SMS</span></div>
          <div class="npr__history">
            <div class="npr__hist-h"><span>delivery log</span><span style="font-weight:600; color:var(--ax-text-subtle);">via</span></div>
            <div class="npr__hist-r">
              <span class="npr__hist-time">09:14</span>
              <span class="npr__hist-msg"><strong>Critical lab</strong> · K⁺ 6.4 · MRN 67-12345 · acknowledged 32 s</span>
              <span class="npr__hist-via">push+sms</span>
            </div>
            <div class="npr__hist-r">
              <span class="npr__hist-time">08:42</span>
              <span class="npr__hist-msg"><strong>Co-sign</strong> · resident note · S. Lim → ENT consult</span>
              <span class="npr__hist-via">in-app</span>
            </div>
            <div class="npr__hist-r">
              <span class="npr__hist-time">08:00</span>
              <span class="npr__hist-msg"><strong>Daily digest</strong> · 6 patients · 2 pending co-signs · 1 referral</span>
              <span class="npr__hist-via">email</span>
            </div>
            <div class="npr__hist-r">
              <span class="npr__hist-time">07:58</span>
              <span class="npr__hist-msg"><strong>Patient checked in</strong> · OPD-12 09:00 follow-up</span>
              <span class="npr__hist-via">in-app</span>
            </div>
            <div class="npr__hist-r">
              <span class="npr__hist-time">22:14</span>
              <span class="npr__hist-msg"><strong>Sign-in</strong> · iPad · 192.168.10.42 · approved</span>
              <span class="npr__hist-via">email</span>
            </div>
            <div class="npr__hist-r">
              <span class="npr__hist-time">21:08</span>
              <span class="npr__hist-msg"><strong>DUR · major</strong> · warfarin + amiodarone · suppressed (chart open) </span>
              <span class="npr__hist-via">in-app</span>
            </div>
          </div>

          <div class="npr__sec-h"><span>Devices · push</span><span class="npr__sec-cap">2 paired</span></div>
          <div class="npr__bundle">
            <div class="npr__bun-r">
              <span class="npr__bun-cb">✓</span>
              <div class="npr__bun-l"><strong>iPhone 15 Pro · iOS 17.4</strong><small>last token refresh 4 m ago · TH carrier · biometric unlock required for chart deeplinks</small></div>
            </div>
            <div class="npr__bun-r">
              <span class="npr__bun-cb">✓</span>
              <div class="npr__bun-l"><strong>iPad Pro · ward 8</strong><small>shared device · org-managed · push muted outside shift hours 07:00–19:00</small></div>
            </div>
            <div class="npr__bun-r">
              <span class="npr__bun-cb is-off">+</span>
              <div class="npr__bun-l"><strong>Pair another device</strong><small>QR or 6-digit code · expires 2 min</small></div>
            </div>
          </div>

        </div>

      </div>

      <div class="npr__foot">
        <div class="npr__foot-meta">All preference changes versioned 90 d · org policy locks (✓ shaded) cannot be turned off · critical priority bypasses quiet hours and bundling · push tokens rotated weekly</div>
        <div style="display:flex; gap:8px;">
          <button class="npr__btn">Reset to org defaults</button>
          <button class="npr__btn">Test send · all channels</button>
          <button class="npr__btn npr__btn--p">Save preferences</button>
        </div>
      </div>`;

    return section('npr','108','Notification preferences · matrix + quiet hours',
      'Per-user preferences split into 3 zones: 5-channel header strip showing connection state and metadata · 14-event × 4-channel matrix grouped by Patient safety / Workflow / Account, with locked-on cells (org policy) shown distinctly and a per-row priority pill (crit/high/norm/low) · 24-h quiet-hours timeline with active vs hatched-quiet bands and a "critical bypasses" footnote · live push preview rendered in a phone-style frame · 24-h delivery log with channel pills · paired-device list · save bar with reset / test-send.',
      sub('14 events · 5 channels · 2 push devices · quiet hours 22:00–06:00 · org-locks visible · audit-logged', demo(card)));
  });
})();
