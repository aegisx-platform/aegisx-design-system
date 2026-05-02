/* #109 A11y audit checklist */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  function item(state, name, ref, level){
    const cls = state==='pass' ? '' : (state==='fail' ? 'is-fail' : (state==='warn' ? 'is-warn' : ''));
    const icon = state==='pass' ? '✓' : (state==='fail' ? '×' : (state==='warn' ? '!' : '·'));
    const iconCls = state==='pass' ? '' : (state==='fail' ? 'is-fail' : (state==='warn' ? 'is-warn' : 'is-na'));
    const lvlCls = level==='AA' ? 'is-aa' : (level==='AAA' ? 'is-aaa' : '');
    return `<div class="a11y__item ${cls}">
      <span class="a11y__icon ${iconCls}">${icon}</span>
      <div class="a11y__item-l"><strong>${name}</strong><small>${ref.split('·')[1]||''}</small></div>
      <span class="a11y__item-c">${ref.split('·')[0].trim()}</span>
      <span class="a11y__item-lvl ${lvlCls}">${level}</span>
    </div>`;
  }

  AX10.register(function a11yAuditSection(){
    const card = h('div', {class:'a11y'});
    card.innerHTML = `
      <div class="a11y__head">
        <div class="a11y__brand">
          <div class="a11y__logo">A11Y</div>
          <div>
            <div class="a11y__title">Accessibility audit · WCAG 2.2 AA</div>
            <div class="a11y__sub">scope · entire HIS web app · 142 routes · 38 components scanned · run completed 14 Mar 2025 09:42</div>
          </div>
        </div>
        <div class="a11y__meta">
          <strong>auditor</strong> axe-core 4.8 + manual<br/>
          <strong>scope</strong> WCAG 2.2 AA · 50 SC<br/>
          <strong>policy</strong> blocks release at &lt; 95
        </div>
      </div>

      <div class="a11y__hero">
        <div class="a11y__score">
          <div class="a11y__score-num">96</div>
          <div class="a11y__score-r">
            <span class="a11y__score-l">conformance</span>
            <span class="a11y__score-n">WCAG 2.2 AA · pass</span>
            <span class="a11y__score-trend">↑ +4 vs last sprint · 2 fails ▾</span>
          </div>
        </div>
        <div class="a11y__bars">
          <div class="a11y__bar">
            <div class="a11y__bar-h"><span class="a11y__bar-name">Perceivable</span><span class="a11y__bar-pct">98 %</span></div>
            <div class="a11y__bar-track"><div class="a11y__bar-fill" style="width:98%;"></div></div>
            <div class="a11y__bar-meta">14 / 14 SC pass · 1 advisory</div>
          </div>
          <div class="a11y__bar">
            <div class="a11y__bar-h"><span class="a11y__bar-name">Operable</span><span class="a11y__bar-pct">94 %</span></div>
            <div class="a11y__bar-track"><div class="a11y__bar-fill warn" style="width:94%;"></div></div>
            <div class="a11y__bar-meta">17 / 18 SC pass · 1 fail</div>
          </div>
          <div class="a11y__bar">
            <div class="a11y__bar-h"><span class="a11y__bar-name">Understandable</span><span class="a11y__bar-pct">100 %</span></div>
            <div class="a11y__bar-track"><div class="a11y__bar-fill" style="width:100%;"></div></div>
            <div class="a11y__bar-meta">10 / 10 SC pass</div>
          </div>
          <div class="a11y__bar">
            <div class="a11y__bar-h"><span class="a11y__bar-name">Robust</span><span class="a11y__bar-pct">88 %</span></div>
            <div class="a11y__bar-track"><div class="a11y__bar-fill warn" style="width:88%;"></div></div>
            <div class="a11y__bar-meta">7 / 8 SC pass · 1 fail</div>
          </div>
        </div>
      </div>

      <div class="a11y__tabs">
        <button class="a11y__tab is-on">All <span class="a11y__tab-c">50</span></button>
        <button class="a11y__tab">Failed <span class="a11y__tab-c">2</span></button>
        <button class="a11y__tab">Warnings <span class="a11y__tab-c">3</span></button>
        <button class="a11y__tab">Passed <span class="a11y__tab-c">45</span></button>
        <button class="a11y__tab">Manual <span class="a11y__tab-c">8</span></button>
      </div>

      <div class="a11y__body">

        <div class="a11y__l">

          <div class="a11y__sec-h"><span class="a11y__sec-t">1 · Perceivable</span><span class="a11y__sec-cap">14 / 14 pass</span></div>
          <div class="a11y__list">
            ${item('pass','Non-text content','1.1.1 · all imgs have alt or role="presentation"','A')}
            ${item('pass','Captions for prerecorded media','1.2.2 · 4 training videos captioned','A')}
            ${item('pass','Info and relationships','1.3.1 · landmarks · headings 1.5x outline','A')}
            ${item('pass','Meaningful sequence','1.3.2 · DOM order matches visual','A')}
            ${item('pass','Use of color','1.4.1 · vital deltas use icon + color · not color alone','A')}
            ${item('pass','Contrast (Minimum)','1.4.3 · 4.5:1 normal · 3:1 large · all swatches verified','AA')}
            ${item('pass','Resize text 200 %','1.4.4 · no clipping · no horizontal scroll','AA')}
            ${item('pass','Reflow 320 px','1.4.10 · no 2-D scroll except chart','AA')}
            ${item('pass','Non-text contrast','1.4.11 · 3:1 on borders · focus rings','AA')}
            ${item('pass','Text spacing','1.4.12 · line / letter / word ok at user override','AA')}
          </div>

          <div class="a11y__sec-h"><span class="a11y__sec-t">2 · Operable</span><span class="a11y__sec-cap">17 / 18 pass · 1 fail</span></div>
          <div class="a11y__list">
            ${item('pass','Keyboard','2.1.1 · all interactive reachable · no keyboard trap','A')}
            ${item('pass','No keyboard trap','2.1.2 · modals release on Esc','A')}
            ${item('pass','Character key shortcuts','2.1.4 · ⌘K · ? · remappable in settings','A')}
            ${item('pass','Bypass blocks','2.4.1 · skip-link · main landmark','A')}
            ${item('pass','Page titled','2.4.2 · unique &lt;title&gt; per route','A')}
            ${item('pass','Focus order','2.4.3 · DOM-order match · no tabindex &gt; 0','A')}
            ${item('pass','Link purpose','2.4.4 · plain-language link text','A')}
            ${item('pass','Focus visible','2.4.7 · 2 px ring · 3:1 contrast','AA')}
            ${item('fail','Focus not obscured (Min)','2.4.11 · sticky banner clips bottom focus','AA')}
            ${item('warn','Target size (Min)','2.5.8 · 4 chips at 22 px in compact density','AA')}
            ${item('pass','Pointer cancellation','2.5.2 · up-event commits action','A')}
          </div>

          <div class="a11y__sec-h"><span class="a11y__sec-t">3 · Understandable</span><span class="a11y__sec-cap">10 / 10 pass</span></div>
          <div class="a11y__list">
            ${item('pass','Language of page','3.1.1 · &lt;html lang="th"&gt;','A')}
            ${item('pass','Language of parts','3.1.2 · lang="en" on Latin medical terms','AA')}
            ${item('pass','On focus / On input','3.2.1-2 · no context change on focus','A')}
            ${item('pass','Consistent navigation','3.2.3 · sidebar identical across views','AA')}
            ${item('pass','Error identification','3.3.1 · aria-invalid + descriptive text','A')}
            ${item('pass','Labels or instructions','3.3.2 · &lt;label&gt; on every input','A')}
            ${item('pass','Error suggestion','3.3.3 · format hints below field','AA')}
            ${item('pass','Accessible authentication','3.3.8 · no cognitive puzzle · paste OK','AA')}
          </div>

          <div class="a11y__sec-h"><span class="a11y__sec-t">4 · Robust</span><span class="a11y__sec-cap">7 / 8 pass · 1 fail</span></div>
          <div class="a11y__list">
            ${item('pass','Parsing','4.1.1 · valid HTML5 · no dup id','A')}
            ${item('pass','Name role value','4.1.2 · ARIA on custom widgets','A')}
            ${item('fail','Status messages','4.1.3 · 1 toast missing aria-live="polite"','AA')}
          </div>

        </div>

        <div class="a11y__r">

          <div class="a11y__sec-h"><span class="a11y__sec-t">Open issues · 2 fail · 3 warn</span><span class="a11y__sec-cap">priority order</span></div>
          <div class="a11y__issues">

            <div class="a11y__issue">
              <div class="a11y__issue-h">
                <span class="a11y__issue-t">Focus obscured by sticky banner</span>
                <span class="a11y__issue-tag">FAIL · 2.4.11 AA</span>
              </div>
              <div class="a11y__issue-d">When tabbing through a long form, the bottom banner overlaps the focused control. WCAG 2.2 requires no part of the focus indicator be hidden by author-content.</div>
              <div class="a11y__issue-loc">at PatientForm.vue:212 · 4 routes affected · /admit · /discharge · /rx · /soap</div>
              <div class="a11y__issue-fix">fix · scroll-margin-bottom: 96 px on focusable inputs</div>
            </div>

            <div class="a11y__issue">
              <div class="a11y__issue-h">
                <span class="a11y__issue-t">Toast missing aria-live region</span>
                <span class="a11y__issue-tag">FAIL · 4.1.3 AA</span>
              </div>
              <div class="a11y__issue-d">Save-success toast is rendered but not announced to screen readers. Wrap container in role="status" or use aria-live="polite".</div>
              <div class="a11y__issue-loc">at Toast.tsx:34 · global · 100 % of save flows</div>
              <div class="a11y__issue-fix">fix · add role="status" aria-live="polite"</div>
            </div>

            <div class="a11y__issue warn">
              <div class="a11y__issue-h">
                <span class="a11y__issue-t">Target size below 24 px in compact</span>
                <span class="a11y__issue-tag">WARN · 2.5.8 AA</span>
              </div>
              <div class="a11y__issue-d">4 chip-close buttons measure 22 × 22 px on compact density. WCAG 2.2 minimum is 24 × 24 px (or have ≥ 24 px spacing). Comfortable density passes.</div>
              <div class="a11y__issue-loc">at Chip.vue:18 · only when data-density="compact"</div>
              <div class="a11y__issue-fix">fix · raise to 24 px or add 4 px hit-box padding</div>
            </div>

            <div class="a11y__issue warn">
              <div class="a11y__issue-h">
                <span class="a11y__issue-t">Heading-level skip on detail page</span>
                <span class="a11y__issue-tag">WARN · advisory</span>
              </div>
              <div class="a11y__issue-d">Patient detail jumps from h1 to h3, skipping h2. Not a SC failure but degrades screen-reader outline.</div>
              <div class="a11y__issue-loc">at PatientDetail.vue:54 · 1 route</div>
              <div class="a11y__issue-fix">fix · use h2 for section group</div>
            </div>

            <div class="a11y__issue warn">
              <div class="a11y__issue-h">
                <span class="a11y__issue-t">Decorative SVG announces filename</span>
                <span class="a11y__issue-tag">WARN · 1.1.1 advisory</span>
              </div>
              <div class="a11y__issue-d">Some inline SVG missing aria-hidden — VoiceOver reads sprite IDs as content.</div>
              <div class="a11y__issue-loc">at icons/sprite.svg · 7 occurrences</div>
              <div class="a11y__issue-fix">fix · aria-hidden="true" focusable="false"</div>
            </div>

          </div>

          <div class="a11y__sec-h"><span class="a11y__sec-t">Color contrast spot-check</span><span class="a11y__sec-cap">brand · status pairs</span></div>
          <div class="a11y__contrast">
            <div class="a11y__cc">
              <div class="a11y__cc-pair">
                <div class="a11y__cc-sw" style="background:var(--ax-brand-emphasis); color:#fff;">Brand on white</div>
              </div>
              <div class="a11y__cc-meta">
                <span class="a11y__cc-r">8.2 : 1</span>
                <span class="a11y__cc-st"><span class="ok">AA</span><span class="ok">AAA</span></span>
              </div>
            </div>
            <div class="a11y__cc">
              <div class="a11y__cc-pair">
                <div class="a11y__cc-sw" style="background:var(--ax-success-emphasis); color:#fff;">Success on white</div>
              </div>
              <div class="a11y__cc-meta">
                <span class="a11y__cc-r">5.3 : 1</span>
                <span class="a11y__cc-st"><span class="ok">AA</span><span class="ng">AAA</span></span>
              </div>
            </div>
            <div class="a11y__cc">
              <div class="a11y__cc-pair">
                <div class="a11y__cc-sw" style="background:var(--ax-warning-default); color:var(--ax-text-heading);">Warn body text</div>
              </div>
              <div class="a11y__cc-meta">
                <span class="a11y__cc-r">7.1 : 1</span>
                <span class="a11y__cc-st"><span class="ok">AA</span><span class="ok">AAA</span></span>
              </div>
            </div>
            <div class="a11y__cc">
              <div class="a11y__cc-pair">
                <div class="a11y__cc-sw" style="background:var(--ax-error-emphasis); color:#fff;">Error on white</div>
              </div>
              <div class="a11y__cc-meta">
                <span class="a11y__cc-r">5.9 : 1</span>
                <span class="a11y__cc-st"><span class="ok">AA</span><span class="ng">AAA</span></span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div class="a11y__foot">
        <div class="a11y__foot-meta">runs nightly · CI gate fails &lt; 95 · last 30 d trend ↑ 88 → 96 · manual screen-reader sweep monthly (NVDA / VoiceOver / TalkBack)</div>
        <div style="display:flex; gap:8px;">
          <button class="a11y__btn">Export · VPAT</button>
          <button class="a11y__btn">Re-run · 38 components</button>
          <button class="a11y__btn a11y__btn--p">Open · 2 failed tickets</button>
        </div>
      </div>`;

    return section('a11y','109','A11y audit checklist · WCAG 2.2 AA',
      '5-zone audit dashboard. Header with conformance score 96 + 4-bar POUR breakdown (Perceivable / Operable / Understandable / Robust) and SC pass-counts · 5-tab filter (All / Failed / Warnings / Passed / Manual). Left column lists all 50 success criteria grouped by POUR, each row showing pass-fail icon · SC reference · A/AA/AAA level pill, with failed rows tinted error/warning. Right column drills into open issues with location · ICD-style fix hints, plus a 4-pair color-contrast spot-check and a footer with VPAT export + ticket actions.',
      sub('50 SC · 96 % conformance · 2 failed · 3 warnings · CI-gated · nightly axe-core + monthly manual screen-reader pass', demo(card)));
  });
})();
