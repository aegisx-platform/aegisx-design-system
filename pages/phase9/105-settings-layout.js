/* #105 Settings layout */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  AX9.register(function settingsLayoutSection(){
    const card = h('div', {class:'stl'});
    card.innerHTML = `
      <div class="stl__head">
        <div class="stl__brand">
          <div class="stl__logo">SET</div>
          <div>
            <div class="stl__title">Settings layout · org · clinical defaults</div>
            <div class="stl__sub">left-rail nav (3 groups · 12 sections) · subnav tabs · grouped fields · sticky unsaved bar</div>
          </div>
        </div>
        <div class="stl__meta">
          <strong>Org · Siriraj</strong><br/>
          you · clinician · scope &lt; admin<br/>
          read+write to clinical only
        </div>
      </div>

      <div class="stl__crumbs">
        Settings <span>›</span> <strong>Clinical</strong> <span>›</span> Defaults &amp; thresholds
      </div>

      <div class="stl__body">

        <aside class="stl__nav">
          <div class="stl__nav-grp">Personal</div>
          <a>Profile</a>
          <a>Notification preferences <span class="num">3</span></a>
          <a>Sessions &amp; devices</a>

          <div class="stl__nav-grp">Organization</div>
          <a>General</a>
          <a>Members <span class="num">122</span></a>
          <a>Roles &amp; permissions</a>
          <a>Billing</a>

          <div class="stl__nav-grp">Clinical</div>
          <a class="is-on">Defaults &amp; thresholds <span class="num">8</span></a>
          <a>Order sets</a>
          <a>Forms &amp; templates</a>

          <div class="stl__nav-grp">System</div>
          <a>API keys <span class="num">7</span></a>
          <a>Webhooks <span class="num">4</span></a>
          <a>Audit log</a>
          <a>Integrations</a>
          <a>Branding</a>
        </aside>

        <main class="stl__main">
          <div class="stl__h1">Clinical defaults &amp; thresholds <span class="stl__h1-cap">org-scoped · staff-overridable</span></div>
          <p class="stl__lede">Default values applied to new orders, charts, and alert thresholds. Per-user overrides allowed unless marked locked.</p>

          <nav class="stl__tabs">
            <a class="is-on">Vitals &amp; alerts</a>
            <a>Pain &amp; sedation</a>
            <a>Medications</a>
            <a>Lab reference</a>
            <a>Discharge</a>
          </nav>

          <div class="stl__group">
            <div class="stl__group-h">
              <span class="stl__group-h-t">Vital signs · capture frequency</span>
              <span class="stl__group-h-s">applies to new admissions · 6 fields</span>
            </div>
            <div class="stl__group-body">
              <div class="stl__field">
                <div class="stl__field-l"><strong>Routine vitals interval</strong><small>BP / HR / RR / temp / SpO₂ · ward general</small></div>
                <div class="stl__field-v">
                  <div class="stl__seg">
                    <button>q1h</button>
                    <button>q2h</button>
                    <button class="is-on">q4h</button>
                    <button>q8h</button>
                  </div>
                  <span class="stl__chip">org default</span>
                </div>
                <div class="stl__field-end"><strong>changed</strong>14 Apr · sysadmin</div>
              </div>
              <div class="stl__field">
                <div class="stl__field-l"><strong>Pain reassessment after PRN</strong><small>per JCI 6 · auto-prompt nurse note</small></div>
                <div class="stl__field-v">
                  <input class="stl__inp" value="30 min" style="max-width:120px"/>
                  <div class="stl__sw"><span class="stl__sw-track"><i></i></span><span class="stl__sw-l">enforce</span></div>
                </div>
                <div class="stl__field-end"><strong>locked</strong>policy lvl 1</div>
              </div>
              <div class="stl__field">
                <div class="stl__field-l"><strong>Auto-MEWS / NEWS-2</strong><small>compute on every vital save</small></div>
                <div class="stl__field-v">
                  <div class="stl__sw"><span class="stl__sw-track"><i></i></span><span class="stl__sw-l">enabled (NEWS-2)</span></div>
                  <span class="stl__chip">flag · auto</span>
                </div>
                <div class="stl__field-end"><strong>changed</strong>14 h ago</div>
              </div>
            </div>
          </div>

          <div class="stl__group">
            <div class="stl__group-h">
              <span class="stl__group-h-t">Alert thresholds</span>
              <span class="stl__group-h-s">trigger banners + escalations · 4 of 12 shown</span>
            </div>
            <div class="stl__group-body">
              <div class="stl__field">
                <div class="stl__field-l"><strong>Hypotension MAP</strong><small>banner red · auto-page rapid response if &lt; 55 mmHg × 2</small></div>
                <div class="stl__field-v">
                  <input class="stl__inp" value="MAP &lt; 65 mmHg" style="max-width:200px"/>
                  <span class="stl__chip">red</span>
                </div>
                <div class="stl__field-end"><strong>changed</strong>2 d ago</div>
              </div>
              <div class="stl__field">
                <div class="stl__field-l"><strong>SpO₂ low (room air)</strong><small>banner amber if 90–93 · red if &lt; 90</small></div>
                <div class="stl__field-v">
                  <input class="stl__inp" value="amber 93 · red 90" style="max-width:200px"/>
                  <span class="stl__chip">2-step</span>
                </div>
                <div class="stl__field-end"><strong>org default</strong></div>
              </div>
              <div class="stl__field">
                <div class="stl__field-l"><strong>Fever (axillary)</strong><small>chart-flag if ≥ 38.0 °C · auto-alert physician if ≥ 39.0 × 2</small></div>
                <div class="stl__field-v">
                  <input class="stl__inp" value="flag 38.0 · alert 39.0" style="max-width:200px"/>
                  <div class="stl__sw"><span class="stl__sw-track is-off"><i></i></span><span class="stl__sw-l">page on-call</span></div>
                </div>
                <div class="stl__field-end"><strong>org default</strong></div>
              </div>
              <div class="stl__field">
                <div class="stl__field-l"><strong>Sepsis screen (qSOFA + lactate)</strong><small>auto-screen on triage admit · 2 of 3 → alert</small></div>
                <div class="stl__field-v">
                  <div class="stl__sw"><span class="stl__sw-track"><i></i></span><span class="stl__sw-l">enabled · ED + IPD</span></div>
                  <span class="stl__chip">flag</span>
                </div>
                <div class="stl__field-end"><strong>changed</strong>just now</div>
              </div>
            </div>
          </div>

          <div class="stl__save">
            <div class="stl__save-l"><span class="cx9-dot cx9-dot--warn"></span><strong>2 unsaved changes</strong> in this section · <span class="cx9-mono">Sepsis screen, Auto-NEWS-2</span></div>
            <div class="stl__save-r">
              <button class="stl__btn">Discard</button>
              <button class="stl__btn">Preview impact (28 wards)</button>
              <button class="stl__btn stl__btn--p">Save · 2</button>
            </div>
          </div>

        </main>

      </div>

      <div class="stl__foot">
        <div class="stl__foot-meta">All clinical-default changes versioned · roll-back available 30 d · escalation rules require sysadmin co-sign · audit-logged to immutable store</div>
        <div class="stl__foot-meta">⌘S save · ⌘⇧Z revert · ? help</div>
      </div>`;

    return section('stl','105','Settings layout · left-rail + subnav',
      'Three-pane settings shell: crumbs strip · 220 px left-rail (4 nav groups · 12 destinations · counts on important rows · active row indicator) · main pane with H1+lede · 5-tab subnav · two grouped form-cards (vitals frequency · alert thresholds) with consistent label/value/audit-end layout, segmented controls, switches, inline pills · sticky-feel "2 unsaved" bar with Discard / Preview impact / Save.',
      sub('Org settings · Siriraj · Clinical › Defaults &amp; thresholds · 2 unsaved changes', demo(card)));
  });
})();
