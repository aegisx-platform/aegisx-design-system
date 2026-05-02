/* #115 Focus management & skip-links */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  AX10.register(function focusSection(){
    const card = h('div', {class:'fcm'});
    card.innerHTML = `
      <div class="fcm__head">
        <div class="fcm__brand">
          <div class="fcm__logo">⇥</div>
          <div>
            <div class="fcm__title">Focus management · skip-links · roving tabindex · focus-visible only</div>
            <div class="fcm__sub">3 skip-links surface on tab · logical DOM order matches reading order · focus traps in dialogs · 3 px yellow ring on focus-visible · :focus-within for grouped controls</div>
          </div>
        </div>
        <div class="fcm__meta">
          <strong>tab stops</strong> 27 visible · 3 skip<br/>
          <strong>ring</strong> 3 px solid #ffea00<br/>
          <strong>traps</strong> dialog · sheet · cmd-K
        </div>
      </div>

      <div class="fcm__body">

        <div class="fcm__l">

          <div class="fcm__app">
            <div class="fcm__skip">
              <a href="#main">Skip to main <small>tab 1</small></a>
              <a href="#nav">Skip to nav <small>tab 2</small></a>
              <a href="#search">Skip to search <small>tab 3</small></a>
            </div>
            <div class="fcm__skip-cap">↑ visible only when focused · sr-only otherwise</div>

            <div class="fcm__app-grid">
              <nav class="fcm__app-nav" aria-label="Primary">
                <div class="fcm__app-nav-l">Primary nav · arrow keys</div>
                <div class="fcm__app-nav-i is-on">⊞ Inbox<span class="fcm__seq b">4</span></div>
                <div class="fcm__app-nav-i">◫ Patients</div>
                <div class="fcm__app-nav-i">◷ Schedule</div>
                <div class="fcm__app-nav-i">◇ Orders</div>
                <div class="fcm__app-nav-i">◬ Reports</div>
                <div style="margin-top:14px; font-family:var(--ax-font-mono); font-size:9px; opacity:0.6; line-height:1.5;">roving tabindex<br/>only ⊞ has tabindex=0<br/>others = -1 · ↑↓ to move</div>
              </nav>

              <main class="fcm__app-main" tabindex="-1" id="main">
                <div class="fcm__app-main-h">
                  <h2 class="fcm__app-main-t">Patient · Sudaa P. <span class="fcm__seq" style="margin-left:8px;">5</span></h2>
                  <div class="fcm__app-act">
                    <button class="fcm__app-btn">Discharge<span class="fcm__seq" style="position:absolute; top:-7px; right:-7px;">8</span></button>
                    <button class="fcm__app-btn focused">Sign &amp; submit<span class="fcm__seq b" style="position:absolute; top:-7px; right:-7px;">9</span></button>
                  </div>
                </div>

                <div class="fcm__app-form">
                  <div class="fcm__field"><span class="fcm__field-l">Vitals · BP</span><span class="fcm__field-v">128 / 84 mmHg</span><span class="fcm__seq" style="position:absolute; top:-7px; left:-7px;">6</span></div>
                  <div class="fcm__field"><span class="fcm__field-l">Pulse</span><span class="fcm__field-v">82 bpm</span><span class="fcm__seq" style="position:absolute; top:-7px; left:-7px;">7</span></div>
                  <div class="fcm__field" style="grid-column:span 2;"><span class="fcm__field-l">Note · subjective</span><span class="fcm__field-v">Patient reports improved hydration · K⁺ trending down · ambulating ✓</span></div>
                </div>
              </main>

              <aside class="fcm__app-aside" id="aside">
                <div class="fcm__app-aside-l">Right rail · landmark</div>
                <div class="fcm__app-aside-i">◧ Allergies · 2</div>
                <div class="fcm__app-aside-i">◧ Active orders · 4</div>
                <div class="fcm__app-aside-i">◧ Lab in window · 3</div>
                <div style="font-family:var(--ax-font-mono); font-size:9px; color:var(--ax-text-subtle); margin-top:10px; line-height:1.5;">aside is a landmark · not in tab order until shift+f6 cycles to it · or ⌘F6 macOS</div>
              </aside>

            </div>
          </div>

          <div class="fcm__legend">
            <span><span class="lg-sw skip"></span><strong>skip-link</strong> visible only on focus · 3px yellow</span>
            <span><span class="lg-sw first"></span><strong>tab order</strong> 1-9 shown · 27 total</span>
            <span><span class="lg-sw next"></span><strong>currently focused</strong> Sign &amp; submit</span>
          </div>

        </div>

        <div class="fcm__r">

          <div class="fcm__sec-h"><span class="fcm__sec-t">Patterns we use</span><span class="fcm__sec-cap">implemented as hooks</span></div>
          <div class="fcm__pat">
            <div class="fcm__pat-row">
              <span class="fcm__pat-tag">trap</span>
              <div class="fcm__pat-l"><strong>useFocusTrap()</strong><small>dialog · sheet · cmd-K · saves opener · returns focus on close · tab cycles within</small></div>
              <span class="fcm__pat-c">21 mounts</span>
            </div>
            <div class="fcm__pat-row">
              <span class="fcm__pat-tag">roving</span>
              <div class="fcm__pat-l"><strong>useRovingTabindex()</strong><small>nav · toolbar · radio group · arrow keys move · only one child has tabindex=0</small></div>
              <span class="fcm__pat-c">8 widgets</span>
            </div>
            <div class="fcm__pat-row">
              <span class="fcm__pat-tag">restore</span>
              <div class="fcm__pat-l"><strong>useFocusReturn()</strong><small>after route change · after toast dismissed · after async result loaded</small></div>
              <span class="fcm__pat-c">routes</span>
            </div>
            <div class="fcm__pat-row">
              <span class="fcm__pat-tag">visible</span>
              <div class="fcm__pat-l"><strong>:focus-visible only</strong><small>ring shown for keyboard, hidden for mouse · global rule in _focus.scss</small></div>
              <span class="fcm__pat-c">global</span>
            </div>
            <div class="fcm__pat-row">
              <span class="fcm__pat-tag">live</span>
              <div class="fcm__pat-l"><strong>autoFocus on context</strong><small>first invalid field on submit · search input on cmd-K · row n on table page-load</small></div>
              <span class="fcm__pat-c">contextual</span>
            </div>
          </div>

          <div class="fcm__sec-h"><span class="fcm__sec-t">Focus ring spec · 3 variants</span><span class="fcm__sec-cap">brand · default · group</span></div>
          <div class="fcm__ring">
            <div class="fcm__ring-cell">
              <div class="fcm__ring-btn r1">Default</div>
              <span>2 px brand · solid<br/>buttons · links</span>
            </div>
            <div class="fcm__ring-cell">
              <div class="fcm__ring-btn r2">Critical</div>
              <span>3 px yellow · solid<br/>destructive · skip-links</span>
            </div>
            <div class="fcm__ring-cell">
              <div class="fcm__ring-btn r3">Group</div>
              <span>2 px dashed · offset 3<br/>:focus-within container</span>
            </div>
          </div>

          <div class="fcm__sec-h"><span class="fcm__sec-t">Tested with</span><span class="fcm__sec-cap">QA matrix</span></div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <span class="cx10-pill cx10-pill--ok">NVDA · Firefox</span>
            <span class="cx10-pill cx10-pill--ok">JAWS · Edge</span>
            <span class="cx10-pill cx10-pill--ok">VoiceOver · Safari</span>
            <span class="cx10-pill cx10-pill--ok">VoiceOver · iOS</span>
            <span class="cx10-pill cx10-pill--ok">TalkBack · Android</span>
            <span class="cx10-pill cx10-pill--info">keyboard-only audit Q1 25</span>
          </div>

        </div>

      </div>

      <div class="fcm__foot">
        <div class="fcm__foot-meta">average path length to primary action: 3.2 keystrokes from page-load · skip-links cut path to nav from 12 → 1 · zero focus-loss bugs in last 90 days per axe runtime telemetry</div>
        <div style="display:flex; gap:8px;">
          <button class="fcm__btn">Run · keyboard audit</button>
          <button class="fcm__btn">View · _focus.scss</button>
          <button class="fcm__btn p">Tab through · live</button>
        </div>
      </div>`;

    return section('fcm','115','Focus management · skip-links · roving tabindex',
      'Annotated app frame with three visible skip-links pinned at top (visible-on-focus, 3 px yellow ring), a primary nav with roving-tabindex callout, a main with numbered focus-order badges (1–9 shown out of 27 total), an active focused button (Sign & submit) drawn with the critical ring, and a landmark aside reachable via shift+F6. Right column lists 5 production hooks (useFocusTrap / useRovingTabindex / useFocusReturn / :focus-visible / autoFocus on context) with mount counts, shows the 3 ring variants (default / critical / group), and an AT-tested matrix.',
      sub('27 tab stops · 3 skip-links · 5 hooks · 3 ring variants · NVDA · JAWS · VoiceOver · TalkBack tested', demo(card)));
  });
})();
