/* #114 Keyboard shortcut help */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  function row(label, hint, keys){
    const ks = keys.map((k,i) => {
      if (k === '+') return '<span class="kbh__plus">+</span>';
      if (k === 'then') return '<span class="kbh__plus">then</span>';
      const cls = k.length > 2 ? 'wide' : '';
      return `<kbd class="kbh__k ${cls}">${k}</kbd>`;
    }).join('');
    return `<div class="kbh__row">
      <div class="kbh__row-l">${label}${hint?`<small>${hint}</small>`:''}</div>
      <div class="kbh__keys">${ks}</div>
    </div>`;
  }

  AX10.register(function shortcutSection(){
    const card = h('div', {class:'kbh'});
    card.innerHTML = `
      <div class="kbh__head">
        <div class="kbh__brand">
          <div class="kbh__logo">⌘?</div>
          <div>
            <div class="kbh__title">Keyboard shortcut help · 64 shortcuts · 9 categories</div>
            <div class="kbh__sub">always-available cheat sheet · ? to open · type-to-filter · platform-aware mod keys · 12 shortcut chords · respects native browser keys (no override of ⌘T / ⌘W)</div>
          </div>
        </div>
        <div class="kbh__meta">
          <strong>activate</strong> ? or shift + /<br/>
          <strong>format</strong> dialog · esc to close<br/>
          <strong>source</strong> /shortcuts.json
        </div>
      </div>

      <div class="kbh__body">

        <div class="kbh__l">

          <div class="kbh__sheet">

            <div class="kbh__sheet-h">
              <div class="kbh__sheet-t">Keyboard shortcuts</div>
              <div class="kbh__sheet-q">
                <span style="color:var(--ax-text-subtle); font-size:12px;">⌕</span>
                <span>filter shortcuts · try "patient" or "save"</span>
                <kbd class="kbh__k">esc</kbd>
              </div>
            </div>

            <div class="kbh__cats">
              <button class="kbh__cat is-on">All <small>64</small></button>
              <button class="kbh__cat">Global <small>12</small></button>
              <button class="kbh__cat">Navigation <small>9</small></button>
              <button class="kbh__cat">Patient chart <small>14</small></button>
              <button class="kbh__cat">Orders <small>8</small></button>
              <button class="kbh__cat">Tables <small>7</small></button>
              <button class="kbh__cat">Editing <small>6</small></button>
              <button class="kbh__cat">Cmd-K <small>5</small></button>
              <button class="kbh__cat">Help <small>3</small></button>
            </div>

            <div class="kbh__list">

              <div class="kbh__group-l">Global · 5 of 12</div>
              ${row('Open command palette','search anything · jump anywhere',['⌘','+','K'])}
              ${row('Open shortcut help','this dialog',['?'])}
              ${row('Toggle sidebar','collapse the nav rail',['⌘','+','/'])}
              ${row('Quick search · patient by MRN','focus global search bar',['/'])}
              ${row('Switch workspace · g then 1-9','chord · g then a digit',['g','then','1'])}

              <div class="kbh__group-l">Navigation · 4 of 9</div>
              ${row('Go to Inbox',null,['g','then','i'])}
              ${row('Go to Patient list',null,['g','then','p'])}
              ${row('Go to Schedule',null,['g','then','s'])}
              ${row('Back / Forward','history navigation',['⌘','+','['])}

              <div class="kbh__group-l">Patient chart · 5 of 14</div>
              ${row('New encounter','starts an OPD note',['n'])}
              ${row('New order','prefilled · uses defaults',['o'])}
              ${row('New prescription',null,['shift','+','R'])}
              ${row('Allergy alert · acknowledge','MUST be on focus before activating',['shift','+','A'])}
              ${row('Sign &amp; submit',null,['⌘','+','enter'])}

              <div class="kbh__group-l">Tables · 4 of 7</div>
              ${row('Move selection',null,['↑','↓','←','→'])}
              ${row('Select row',null,['space'])}
              ${row('Select range',null,['shift','+','↓'])}
              ${row('Open detail · row',null,['enter'])}

            </div>

            <div class="kbh__sheet-foot">
              <span>Showing 18 of 64 · scroll for more · powered by use-shortcuts.ts</span>
              <a href="#">Customize shortcuts →</a>
            </div>

          </div>

        </div>

        <div class="kbh__r">

          <div class="kbh__sec-h"><span class="kbh__sec-t">Platform-aware mod keys</span><span class="kbh__sec-cap">auto-swaps in UI</span></div>
          <div class="kbh__plat">
            <div class="kbh__plat-row">
              <span class="kbh__plat-os">⌘</span>
              <div class="kbh__plat-l">macOS<small>cmd · option · ctrl</small></div>
              <kbd class="kbh__k">⌘K</kbd>
            </div>
            <div class="kbh__plat-row">
              <span class="kbh__plat-os">Win</span>
              <div class="kbh__plat-l">Windows<small>ctrl · alt · win</small></div>
              <kbd class="kbh__k wide">Ctrl K</kbd>
            </div>
            <div class="kbh__plat-row">
              <span class="kbh__plat-os">Lx</span>
              <div class="kbh__plat-l">Linux<small>ctrl · alt · super</small></div>
              <kbd class="kbh__k wide">Ctrl K</kbd>
            </div>
            <div class="kbh__plat-row">
              <span class="kbh__plat-os">iPad</span>
              <div class="kbh__plat-l">iPadOS · external<small>same as macOS</small></div>
              <kbd class="kbh__k">⌘K</kbd>
            </div>
          </div>

          <div class="kbh__sec-h"><span class="kbh__sec-t">Chord example · g then p</span><span class="kbh__sec-cap">timeout 1.2 s</span></div>
          <div class="kbh__chord-vis">
            <div class="kbh__chord-step">
              <kbd class="kbh__k">g</kbd>
              <small>step 1 · prefix</small>
            </div>
            <div class="kbh__chord-arrow">→</div>
            <div class="kbh__chord-step">
              <kbd class="kbh__k">p</kbd>
              <small>step 2 · within 1.2 s</small>
            </div>
            <div class="kbh__chord-arrow">→</div>
            <div class="kbh__chord-step">
              <span class="cx10-pill cx10-pill--ok">Patients</span>
              <small>route fired</small>
            </div>
          </div>

          <div class="kbh__sec-h"><span class="kbh__sec-t">Conflict rules</span><span class="kbh__sec-cap">never override the browser</span></div>
          <ul class="kbh__rules" style="list-style:none; padding:10px 12px;">
            <li><span class="cx10-pill cx10-pill--ok">keep</span><div><strong>Browser keys never overridden</strong><small>⌘T · ⌘W · ⌘N · ⌘L · ⌘R always pass through.</small></div></li>
            <li><span class="cx10-pill cx10-pill--info">scope</span><div><strong>Single-letter shortcuts blocked in inputs</strong><small>n · o · g do nothing while a textarea or contenteditable has focus.</small></div></li>
            <li><span class="cx10-pill cx10-pill--warn">guard</span><div><strong>Destructive ops require modifier</strong><small>delete · sign-and-submit · discharge use ⌘ or shift to prevent fat-finger.</small></div></li>
            <li><span class="cx10-pill cx10-pill--ghost">i18n</span><div><strong>Shows by physical key, not glyph</strong><small>uses code (KeyN) so AZERTY / Dvorak works without remapping.</small></div></li>
          </ul>

        </div>

      </div>

      <div class="kbh__foot">
        <div class="kbh__foot-meta">discoverability: ? hint surfaces in command-palette empty state · in tooltips after 2 s hover · in onboarding tour step 4 · 91 % of power users have triggered cheat sheet at least once</div>
        <div style="display:flex; gap:8px;">
          <button class="kbh__btn">Export · printable PDF</button>
          <button class="kbh__btn">Customize</button>
          <button class="kbh__btn kbh__btn--p">Open · ?</button>
        </div>
      </div>`;

    return section('kbh','114','Keyboard shortcut help · cheat sheet',
      'Modal cheat sheet mock with global filter, 9 category tabs (All / Global / Nav / Patient chart / Orders / Tables / Editing / Cmd-K / Help with per-cat counts), grouped shortcut list rendering true <kbd> elements with platform-aware mod keys, and a chord example (g then p → Patients) with 1.2 s timeout. Right rail shows mod-key swaps across macOS / Windows / Linux / iPadOS, conflict rules (browser keys preserved, single-letter blocked in inputs, destructive ops gated by modifier, physical-key i18n via KeyCode), and a chord visualization.',
      sub('64 shortcuts · 9 categories · platform-aware · chord support · 12 chords · ? to open · respects browser keys', demo(card)));
  });
})();
