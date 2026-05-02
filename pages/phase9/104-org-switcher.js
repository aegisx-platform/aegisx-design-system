/* #104 Org switcher */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  AX9.register(function orgSwitcherSection(){
    const card = h('div', {class:'osw'});
    card.innerHTML = `
      <div class="osw__head">
        <div class="osw__brand">
          <div class="osw__logo">ORG</div>
          <div>
            <div class="osw__title">Org switcher · multi-tenant + workspace</div>
            <div class="osw__sub">user dr.naree@aegisx.health · 5 orgs · last switch 2 d ago · region ap-southeast-1</div>
          </div>
        </div>
        <div class="osw__meta">
          <strong>⌘K to switch</strong><br/>
          1–9 jump shortcuts<br/>
          MFA per-org
        </div>
      </div>

      <div class="osw__stage">

        <div>
          <div class="osw__topbar">
            <div class="osw__topbar-logo">AX</div>
            <div class="osw__topbar-name">AegisX Platform</div>
            <div class="osw__trigger">
              <span class="osw__trigger-av">SR</span>
              <span class="osw__trigger-name">Siriraj Hospital</span>
              <span class="osw__trigger-role">· clinician</span>
              <span class="osw__trigger-caret">⇅</span>
            </div>
          </div>

          <div class="osw__hint">
            <div class="osw__hint-h">Switching context</div>
            <div class="osw__hint-row"><span class="osw__hint-l">Scope</span><span class="osw__hint-v">org-level · all session state (queue, drafts, prefs) is partitioned by org_id</span></div>
            <div class="osw__hint-row"><span class="osw__hint-l">Auth</span><span class="osw__hint-v">re-prompt MFA if org policy = strict (Bumrungrad, MoPH)</span></div>
            <div class="osw__hint-row"><span class="osw__hint-l">URL</span><span class="osw__hint-v">subdomain rewrites <kbd>siriraj.aegisx.health</kbd> · deep-links survive switch</span></div>
            <div class="osw__hint-row"><span class="osw__hint-l">Shortcut</span><span class="osw__hint-v"><kbd>⌘K</kbd> open · <kbd>1</kbd>–<kbd>5</kbd> jump · <kbd>↵</kbd> confirm · <kbd>esc</kbd> cancel</span></div>
            <div class="osw__hint-row"><span class="osw__hint-l">Pending</span><span class="osw__hint-v">1 invitation · expires 6 May</span></div>
          </div>
        </div>

        <div class="osw__pop">
          <div class="osw__pop-search">
            <input placeholder="Search organizations…"/>
            <kbd>⌘K</kbd>
          </div>

          <div class="osw__sec-h">Current</div>
          <div class="osw__list">
            <div class="osw__o is-cur">
              <div class="osw__o-av osw__o-av--g">SR</div>
              <div class="osw__o-info"><strong>Siriraj Hospital</strong><small>siriraj.aegisx.health · 1,420 staff · TH</small></div>
              <div class="osw__o-end"><span class="osw__o-role">clinician</span><span class="osw__o-mark">● current</span></div>
            </div>
          </div>

          <div class="osw__sec-h">Recent · 4</div>
          <div class="osw__list">
            <div class="osw__o">
              <div class="osw__o-av osw__o-av--b">BG</div>
              <div class="osw__o-info"><strong>Bumrungrad International</strong><small>bumrungrad.aegisx.health · 980 staff · TH · MFA</small></div>
              <div class="osw__o-end"><span class="osw__o-role is-owner">owner</span><span class="osw__o-shortcut">1</span></div>
            </div>
            <div class="osw__o">
              <div class="osw__o-av osw__o-av--p">CM</div>
              <div class="osw__o-info"><strong>Chiang Mai Central</strong><small>cm-central.aegisx.health · 412 staff · TH</small></div>
              <div class="osw__o-end"><span class="osw__o-role">admin</span><span class="osw__o-shortcut">2</span></div>
            </div>
            <div class="osw__o">
              <div class="osw__o-av osw__o-av--o">PH</div>
              <div class="osw__o-info"><strong>Phyathai Group · 4 sites</strong><small>phyathai.aegisx.health · 2,140 staff · TH · workspace</small></div>
              <div class="osw__o-end"><span class="osw__o-role">biller</span><span class="osw__o-shortcut">3</span></div>
            </div>
            <div class="osw__o is-pend">
              <div class="osw__o-av osw__o-av--gy">MP</div>
              <div class="osw__o-info"><strong>MoPH · pilot tenant</strong><small>moph-pilot.aegisx.health · invitation expires 6 May</small></div>
              <div class="osw__o-end"><span class="osw__o-role is-pend">pending</span><span class="osw__o-shortcut">4</span></div>
            </div>
          </div>

          <div class="osw__sec-h">Other · 1</div>
          <div class="osw__list">
            <div class="osw__o">
              <div class="osw__o-av osw__o-av--gy">DV</div>
              <div class="osw__o-info"><strong>AegisX · Dev sandbox</strong><small>dev.aegisx.health · 12 staff · personal</small></div>
              <div class="osw__o-end"><span class="osw__o-role">viewer</span><span class="osw__o-shortcut">5</span></div>
            </div>
          </div>

          <div class="osw__pop-foot">
            <button>+ Create organization</button>
            <button class="is-p">Manage memberships</button>
          </div>
        </div>

      </div>

      <div class="osw__foot">
        <div class="osw__foot-meta">Org-scoped tokens · session re-issued on switch · per-org RBAC and MFA · workspace orgs (Phyathai) group multiple tenants under one finance umbrella</div>
        <div class="osw__foot-meta">⌘K · ↑↓ navigate · ↵ select · esc close</div>
      </div>`;

    return section('osw','104','Org switcher · ⌘K command popover',
      'Right-anchored command-style popover off the topbar trigger · search input with ⌘K kbd · current-org row with green "● current" mark · 4 recent orgs with avatar/role/shortcut keys 1–4 (one pending invitation styled distinctly) · Other section · footer Create / Manage actions · arrow callout · explainer panel showing scope, auth, URL, shortcut and pending count.',
      sub('5 orgs · current Siriraj · 1 pending MoPH · ⌘K · 1–9 jump · per-org MFA', demo(card)));
  });
})();
