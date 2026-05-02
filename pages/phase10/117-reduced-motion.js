/* #117 Reduced-motion alternatives */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  AX10.register(function rmoSection(){
    const card = h('div', {class:'rmo'});
    card.innerHTML = `
      <div class="rmo__head">
        <div class="rmo__brand">
          <div class="rmo__logo">⚇</div>
          <div>
            <div class="rmo__title">Reduced-motion alternatives · prefers-reduced-motion: reduce</div>
            <div class="rmo__sub">7 motion patterns paired with static equivalents · auto-swap when user opts in · vestibular-safe defaults · animation budget &lt; 300 ms · no parallax, no auto-play</div>
          </div>
        </div>
        <div class="rmo__meta">
          <strong>swap-rate</strong> 38 % of users<br/>
          <strong>budget</strong> 300 ms / interaction<br/>
          <strong>policy</strong> motion-light by default
        </div>
      </div>

      <div class="rmo__seg">
        <span class="rmo__seg-l">comparing</span>
        <div class="rmo__seg-btns">
          <button class="is-on">side-by-side</button>
          <button>full motion only</button>
          <button>reduced only</button>
        </div>
        <span class="cx10-pill cx10-pill--info" style="margin-left:14px;">@media (prefers-reduced-motion: reduce)</span>
        <span class="cx10-pill cx10-pill--ghost">tested macOS · iOS · Win11</span>
      </div>

      <div class="rmo__matrix">
        <div class="rmo__cell head">Pattern</div>
        <div class="rmo__cell head full">Full motion · default</div>
        <div class="rmo__cell head red">Reduced · alternative</div>

        <!-- 1 loading pulse -->
        <div class="rmo__cell rmo__what">
          <strong>Loading pulse</strong>
          <small>Pill fades 30 → 100 % opacity in a 1.6 s loop while data fetches.</small>
          <code>@keyframes rmoFade</code>
        </div>
        <div class="rmo__cell rmo__demo"><span class="rmo__pill fade">loading…</span></div>
        <div class="rmo__cell rmo__demo"><span class="rmo__static">loading · 4 s</span></div>

        <!-- 2 progress bar -->
        <div class="rmo__cell rmo__what">
          <strong>Indeterminate progress bar</strong>
          <small>Sliding marker on import / sync / AI summary calls.</small>
          <code>animation: rmoSlide 2s alt</code>
        </div>
        <div class="rmo__cell rmo__demo"><div class="rmo__bar"></div></div>
        <div class="rmo__cell rmo__demo">
          <div class="rmo__progress-static"><span class="dot"></span>importing · 184 / 320 rows · ETA 12 s</div>
        </div>

        <!-- 3 spinner -->
        <div class="rmo__cell rmo__what">
          <strong>Inline spinner</strong>
          <small>Small rotating ring inside buttons during async ops.</small>
          <code>rotate 360 0.9s linear</code>
        </div>
        <div class="rmo__cell rmo__demo"><div class="rmo__spinner"></div></div>
        <div class="rmo__cell rmo__demo"><div class="rmo__spinner no-anim"></div></div>

        <!-- 4 skeleton shimmer -->
        <div class="rmo__cell rmo__what">
          <strong>Skeleton shimmer</strong>
          <small>Light sweep across placeholder bars on table & card load.</small>
          <code>linear-gradient sweep</code>
        </div>
        <div class="rmo__cell rmo__demo"><div class="rmo__skel"></div></div>
        <div class="rmo__cell rmo__demo"><div class="rmo__skel no-anim"></div></div>

        <!-- 5 toast slide+fade -->
        <div class="rmo__cell rmo__what">
          <strong>Toast slide-in / fade-out</strong>
          <small>Status toasts enter from below, settle, exit upward.</small>
          <code>translateY 8px → 0</code>
        </div>
        <div class="rmo__cell rmo__demo"><span class="rmo__toast-fade">Saved draft</span></div>
        <div class="rmo__cell rmo__demo"><span class="rmo__toast-fade no-anim">Saved draft</span></div>

        <!-- 6 alert pulse -->
        <div class="rmo__cell rmo__what">
          <strong>Alert badge pulse</strong>
          <small>Critical-alert dot pulses to draw attention (allergy, code-blue).</small>
          <code>box-shadow ring expand</code>
        </div>
        <div class="rmo__cell rmo__demo"><span class="rmo__bell">!</span></div>
        <div class="rmo__cell rmo__demo"><span class="rmo__bell no-anim">!</span></div>

        <!-- 7 modal scale -->
        <div class="rmo__cell rmo__what">
          <strong>Modal scale-in</strong>
          <small>Dialog scales 0.96 → 1 with 180 ms ease.</small>
          <code>transform scale(0.96)</code>
        </div>
        <div class="rmo__cell rmo__demo">
          <div style="padding:6px 10px; background:var(--ax-background-page); border:1px solid var(--ax-border-subtle); border-radius:6px; font-size:10px; transform:scale(0.96); transform-origin:center; animation:rmoFade 1.6s ease-in-out infinite alternate;">Confirm dialog</div>
        </div>
        <div class="rmo__cell rmo__demo">
          <div style="padding:6px 10px; background:var(--ax-background-page); border:1px solid var(--ax-border-subtle); border-radius:6px; font-size:10px;">Confirm dialog · instant</div>
        </div>
      </div>

      <div class="rmo__trig">
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
          <span style="font-size:12px; font-weight:700; color:var(--ax-text-heading);">Activation triggers · 3 paths</span>
          <span style="font-family:var(--ax-font-mono); font-size:10px; color:var(--ax-text-subtle);">layered: explicit > system > none</span>
        </div>
        <div class="rmo__trig-grid">
          <div class="rmo__trig-row">
            <div class="rmo__trig-h"><span class="rmo__trig-n">User setting</span><span class="cx10-pill cx10-pill--info">primary</span></div>
            <div class="rmo__trig-d">Profile setting · Reduce motion · Off / On / Match system. Persists across devices.</div>
            <div class="rmo__trig-c">data-motion="reduce"</div>
          </div>
          <div class="rmo__trig-row">
            <div class="rmo__trig-h"><span class="rmo__trig-n">prefers-reduced-motion</span><span class="cx10-pill cx10-pill--ok">auto</span></div>
            <div class="rmo__trig-d">macOS · iOS · Win11 · Linux GNOME · auto-adopts when no explicit pref. Respected globally via CSS.</div>
            <div class="rmo__trig-c">@media (prefers-reduced-motion: reduce)</div>
          </div>
          <div class="rmo__trig-row">
            <div class="rmo__trig-h"><span class="rmo__trig-n">In-product low-data mode</span><span class="cx10-pill cx10-pill--ghost">linked</span></div>
            <div class="rmo__trig-d">Low-data mode also implies reduced motion · keeps the cellular budget low and helps low-end Android.</div>
            <div class="rmo__trig-c">data-data="low"</div>
          </div>
        </div>
      </div>

      <div class="rmo__foot">
        <div class="rmo__foot-meta">animation budget: ≤ 300 ms per interaction · no parallax, no auto-play hero, no infinite spinning past 4 s · zero animations crossing viewport · vestibular-safe per WCAG 2.3.3</div>
        <div style="display:flex; gap:8px;">
          <button class="rmo__btn">Open · _motion.scss</button>
          <button class="rmo__btn">Audit · long-running anims</button>
          <button class="rmo__btn p">Toggle · simulate reduce</button>
        </div>
      </div>`;

    return section('rmo','117','Reduced-motion alternatives',
      'Side-by-side matrix of 7 motion patterns (loading pulse, indeterminate progress, spinner, skeleton shimmer, toast slide-in, alert pulse, modal scale-in) showing the full-motion default in column 2 and the reduced-motion alternative in column 3. Live mini-demos animate in the full-motion column; reduced column shows the static or text-status replacement. Header segmented control switches between side-by-side / full only / reduced only. Triggers strip explains 3 activation paths: user setting, prefers-reduced-motion media query, and in-product low-data mode that implies motion reduction.',
      sub('7 patterns paired · ≤ 300 ms budget · no parallax · no auto-play · WCAG 2.3.3 vestibular-safe · 38 % users have reduce on', demo(card)));
  });
})();
