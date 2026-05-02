/* #92 Visiting hour & visitor log */
(function(){
  if (!window.AX8) return;
  const { h, section, sub, demo } = AX8;

  AX8.register(function visitorSection(){
    const card = h('div', {class:'vis'});

    // Hours bands: 11:00–13:00 + 17:00–20:00 within a 06:00–22:00 axis (16 h window)
    const dayStart = 6, dayEnd = 22, span = dayEnd - dayStart; // 16 h
    const pct = (h)=> ((h - dayStart) / span) * 100;
    const nowH = 18.4; // 18:24

    card.innerHTML = `
      <div class="vis__head">
        <div class="vis__brand">
          <div class="vis__logo">VIS</div>
          <div>
            <div class="vis__title">Visiting hour &amp; visitor log</div>
            <div class="vis__sub">Form ADM-302 v1.4 · ward 4 · 14 Aug 2024 · printed 18:24</div>
          </div>
        </div>
        <div class="vis__meta">
          <strong>VIS-2024-08-14</strong><br/>
          AN · 67-12345<br/>
          ward 4 · bed 4-12
        </div>
      </div>

      <div class="vis__strip">
        <div class="vis__cell vis__cell--ok">
          <span class="vis__cell-cap">visiting status now</span>
          <span class="vis__cell-val">OPEN</span>
          <span class="vis__cell-meta">17:00 — 20:00 · ends in 1h 36m</span>
        </div>
        <div class="vis__cell vis__cell--warn">
          <span class="vis__cell-cap">at bedside</span>
          <span class="vis__cell-val">2<small>/2 max</small></span>
          <span class="vis__cell-meta">at limit · waitlist 1</span>
        </div>
        <div class="vis__cell">
          <span class="vis__cell-cap">today total</span>
          <span class="vis__cell-val">5<small> visits</small></span>
          <span class="vis__cell-meta">2 family · 3 friend</span>
        </div>
        <div class="vis__cell">
          <span class="vis__cell-cap">avg duration</span>
          <span class="vis__cell-val">42<small> min</small></span>
          <span class="vis__cell-meta">vs ward avg 35 m</span>
        </div>
      </div>

      <div class="vis__hours">
        <div class="vis__hours-h"><span>Visiting hours · today</span><span class="vis__hours-cap">2 windows · 5 h total</span></div>
        <div class="vis__hours-bar">
          <div class="vis__hours-block" data-label="11:00–13:00 · midday" style="left:${pct(11)}%; width:${(13-11)/span*100}%"></div>
          <div class="vis__hours-block" data-label="17:00–20:00 · evening" style="left:${pct(17)}%; width:${(20-17)/span*100}%"></div>
          <div class="vis__hours-now" data-time="18:24" style="left:${pct(nowH)}%"></div>
        </div>
        <div class="vis__hours-scale">
          <span>06</span><span>08</span><span>10</span><span>12</span><span>14</span><span>16</span><span>18</span><span>20</span><span>22</span>
        </div>
      </div>

      <div class="vis__body">

        <!-- LEFT: log -->
        <div class="vis__col">
          <div class="vis__sec-h"><span>Visitor log · today</span><span class="vis__sec-cap">5 entries · 2 currently in</span></div>
          <div class="vis__log">
            <div class="vis__lh">time</div>
            <div class="vis__lh">name</div>
            <div class="vis__lh">relation</div>
            <div class="vis__lh">id verified</div>
            <div class="vis__lh">screen</div>
            <div class="vis__lh">badge</div>
            <div class="vis__lh">status</div>

            <div class="vis__lc vis__lc--mono">11:14 → 12:02</div>
            <div class="vis__lc vis__lc--name"><strong>คุณนิภาพร ปัญญาดี</strong><small>0812-xxx-4456</small></div>
            <div class="vis__lc"><span class="vis__lc-rel">daughter</span></div>
            <div class="vis__lc vis__lc--mono">นบ-1.x.x.4567</div>
            <div class="vis__lc vis__lc--mono">PASS</div>
            <div class="vis__lc vis__lc--mono">V-014</div>
            <div class="vis__lc"><span class="vis__lc-pill">out</span></div>

            <div class="vis__lc vis__lc--mono vis__lc-bg">11:48 → 12:30</div>
            <div class="vis__lc vis__lc-bg vis__lc--name"><strong>คุณวิรัช ปัญญาดี</strong><small>0832-xxx-9921</small></div>
            <div class="vis__lc vis__lc-bg"><span class="vis__lc-rel">spouse</span></div>
            <div class="vis__lc vis__lc--mono vis__lc-bg">นบ-3.x.x.7712</div>
            <div class="vis__lc vis__lc--mono vis__lc-bg">PASS</div>
            <div class="vis__lc vis__lc--mono vis__lc-bg">V-018</div>
            <div class="vis__lc vis__lc-bg"><span class="vis__lc-pill">out</span></div>

            <div class="vis__lc vis__lc--mono">12:35 — declined</div>
            <div class="vis__lc vis__lc--name"><strong>คุณมานพ ใจดี</strong><small>walk-in</small></div>
            <div class="vis__lc"><span class="vis__lc-rel">friend</span></div>
            <div class="vis__lc vis__lc--mono">— · no ID</div>
            <div class="vis__lc vis__lc--mono">FAIL · cough</div>
            <div class="vis__lc vis__lc--mono">—</div>
            <div class="vis__lc"><span class="vis__lc-pill vis__lc-pill--decline">decline</span></div>

            <div class="vis__lc vis__lc--mono vis__lc-bg">17:48 → in</div>
            <div class="vis__lc vis__lc-bg vis__lc--name"><strong>คุณนิภาพร ปัญญาดี</strong><small>return · 0812-xxx-4456</small></div>
            <div class="vis__lc vis__lc-bg"><span class="vis__lc-rel">daughter</span></div>
            <div class="vis__lc vis__lc--mono vis__lc-bg">re-scan OK</div>
            <div class="vis__lc vis__lc--mono vis__lc-bg">PASS</div>
            <div class="vis__lc vis__lc--mono vis__lc-bg">V-031</div>
            <div class="vis__lc vis__lc-bg"><span class="vis__lc-pill vis__lc-pill--in">in · 36 m</span></div>

            <div class="vis__lc vis__lc--mono">18:02 → in</div>
            <div class="vis__lc vis__lc--name"><strong>คุณวิรัช ปัญญาดี</strong><small>0832-xxx-9921</small></div>
            <div class="vis__lc"><span class="vis__lc-rel">spouse</span></div>
            <div class="vis__lc vis__lc--mono">re-scan OK</div>
            <div class="vis__lc vis__lc--mono">PASS</div>
            <div class="vis__lc vis__lc--mono">V-032</div>
            <div class="vis__lc"><span class="vis__lc-pill vis__lc-pill--in">in · 22 m</span></div>
          </div>

          <div class="vis__quiet">
            <div class="vis__quiet-ico">☾</div>
            <div>
              <div class="vis__quiet-t">Quiet hours · 22:00 — 06:00</div>
              <div class="vis__quiet-sub">no visitors except approved overnight stay (1 caregiver/pt) · pediatric &amp; ICU separate policy</div>
            </div>
          </div>
        </div>

        <!-- RIGHT: special permissions -->
        <div class="vis__col">
          <div class="vis__sec-h"><span>Special permissions</span><span class="vis__sec-cap">3 active</span></div>
          <div class="vis__perms">

            <div class="vis__perm">
              <div class="vis__perm-h">
                <div class="vis__perm-t">Overnight caregiver · spouse</div>
                <div class="vis__perm-tag vis__perm-tag--ok">approved</div>
              </div>
              <div class="vis__perm-meta">
                <strong>Visitor:</strong> คุณวิรัช ปัญญาดี (spouse)<br/>
                <strong>Window:</strong> 14 Aug 22:00 → 15 Aug 06:00<br/>
                <strong>Reason:</strong> post-op night 1 · pt anxiety + assist toilet<br/>
                <strong>Bed:</strong> recliner V-OS-04 issued
              </div>
              <div class="vis__perm-foot">
                <div class="vis__perm-by">approved by RN Manee · charge ward 4 · 14 Aug 14:30</div>
                <span class="vis__lc-pill">badge V-OS-04</span>
              </div>
            </div>

            <div class="vis__perm">
              <div class="vis__perm-h">
                <div class="vis__perm-t">Off-hour visit · grandchildren</div>
                <div class="vis__perm-tag vis__perm-tag--pending">pending</div>
              </div>
              <div class="vis__perm-meta">
                <strong>Visitor:</strong> 2 grandchildren age 6, 9 (with mother)<br/>
                <strong>Window:</strong> 15 Aug 16:00 — 16:30 (before evening hours)<br/>
                <strong>Reason:</strong> birthday · pt morale<br/>
                <strong>Conditions:</strong> max 30 min · screen at desk · masks on
              </div>
              <div class="vis__perm-foot">
                <div class="vis__perm-by">requested 14 Aug 18:10 · awaiting attending review</div>
                <span class="vis__lc-pill" style="background:var(--ax-text-subtle);">action req</span>
              </div>
            </div>

            <div class="vis__perm">
              <div class="vis__perm-h">
                <div class="vis__perm-t">Religious visit · merit-making</div>
                <div class="vis__perm-tag vis__perm-tag--ok">approved</div>
              </div>
              <div class="vis__perm-meta">
                <strong>Visitor:</strong> 2 monks · temple Wat Pho<br/>
                <strong>Window:</strong> 15 Aug 09:00 — 09:30<br/>
                <strong>Reason:</strong> patient request · ทำบุญสะเดาะเคราะห์<br/>
                <strong>Conditions:</strong> ward common room (not bedside)
              </div>
              <div class="vis__perm-foot">
                <div class="vis__perm-by">approved by Dr. Nattapong · 14 Aug 16:42</div>
                <span class="vis__lc-pill">scheduled</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div class="vis__foot">
        <div class="vis__foot-meta">2 visitors max at bedside · ID + screen at desk · all entries auto-logged · isolation room separate policy</div>
        <div style="display:flex; gap:6px;">
          <button class="vis__btn">Export visitor list</button>
          <button class="vis__btn">Print badges</button>
          <button class="vis__btn vis__btn--primary">+ Check in visitor</button>
        </div>
      </div>`;

    return section('vis','92','Visiting hour &amp; visitor log',
      'Visit policy form · 4-cell strip (status now / at bedside / today total / avg duration) with ok+warn tints · 16-h hours bar with 2 visiting windows + now-marker · 5-row visitor log table (time / name+phone / relation chip / ID verified / screen / badge / status pill = out·in·decline) · quiet-hours dashed banner · 3 special-permission cards (overnight caregiver / off-hour grandchildren / religious visit) with status tags + reason + conditions + approver line.',
      sub('Evening window · 2 of 2 at bedside · 1 pending request', demo(card)));
  });
})();
