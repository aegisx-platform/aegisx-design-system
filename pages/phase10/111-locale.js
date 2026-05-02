/* #111 Locale switcher */
(function(){
  if (!window.AX10) return;
  const { h, section, sub, demo } = AX10;

  function flag(code, bg){
    return `<span class="loc__flag" style="background:${bg};">${code}</span>`;
  }
  function opt(on, code, bg, name, native, tag, dir){
    const cls = ['loc__opt'];
    if (on) cls.push('is-on');
    return `<div class="${cls.join(' ')}">
      ${flag(code,bg)}
      <div><div class="loc__opt-name">${name}</div><div class="loc__opt-native">${native}</div></div>
      <span class="loc__opt-tag ${dir==='rtl'?'dir':''}">${tag}</span>
      <span class="loc__opt-chk">${on?'✓':''}</span>
    </div>`;
  }

  AX10.register(function localeSection(){
    const card = h('div', {class:'loc'});
    card.innerHTML = `
      <div class="loc__head">
        <div class="loc__brand">
          <div class="loc__logo">i18n</div>
          <div>
            <div class="loc__title">Locale switcher · 14 locales · ICU MessageFormat</div>
            <div class="loc__sub">user-pinned + org-default fallback chain · numerals + dates + plurals via Intl · medical-term overrides per market · 96 % string coverage</div>
          </div>
        </div>
        <div class="loc__meta">
          <strong>active</strong> th-TH / th<br/>
          <strong>fallback</strong> en-US<br/>
          <strong>persists</strong> user.preferences
        </div>
      </div>

      <div class="loc__body">

        <div class="loc__l">

          <div class="loc__sec-h"><span class="loc__sec-t">Switcher · popover</span><span class="loc__sec-cap">⌘L · type to filter</span></div>

          <div class="loc__pop">
            <div class="loc__search">
              <span style="color:var(--ax-text-subtle); font-size:12px;">⌕</span>
              <input class="loc__search-i" placeholder="Search · type a name or code…" value="">
              <span class="loc__search-k">esc</span>
            </div>

            <div class="loc__grp">Recently used</div>
            ${opt(true,'TH','#ce1126','Thai','ภาษาไทย · th-TH','100 %','ltr')}
            ${opt(false,'EN','#012169','English (US)','English · en-US','100 %','ltr')}
            ${opt(false,'MY','#cc0001','Burmese','မြန်မာ · my-MM','62 %','ltr')}

            <div class="loc__grp">Asia · 6</div>
            ${opt(false,'JP','#bc002d','Japanese','日本語 · ja-JP','94 %','ltr')}
            ${opt(false,'KR','#003478','Korean','한국어 · ko-KR','91 %','ltr')}
            ${opt(false,'VN','#da251d','Vietnamese','Tiếng Việt · vi-VN','86 %','ltr')}
            ${opt(false,'ID','#ce1126','Indonesian','Bahasa Indonesia · id-ID','72 %','ltr')}
            ${opt(false,'CN','#ee1c25','Chinese (Simplified)','简体中文 · zh-CN','89 %','ltr')}

            <div class="loc__grp">RTL · 2</div>
            ${opt(false,'AR','#006c35','Arabic','العربية · ar-SA','78 %','RTL','rtl')}
            ${opt(false,'IL','#0038b8','Hebrew','עברית · he-IL','64 %','RTL','rtl')}

            <div class="loc__opt-foot">
              <span>14 of 14 shown</span>
              <a href="#">Request a locale →</a>
            </div>
          </div>

          <div class="loc__sec-h"><span class="loc__sec-t">Per-locale rules · Intl format</span><span class="loc__sec-cap">native formatters · no polyfills</span></div>
          <div class="loc__rules">
            <div class="loc__rule">
              <div class="loc__rule-n">Date</div>
              <div class="loc__rule-d">th uses Buddhist calendar by default · en-US uses Gregorian m/d/y · ja uses 令和.</div>
              <div class="loc__rule-c">Intl.DateTimeFormat(loc)</div>
            </div>
            <div class="loc__rule">
              <div class="loc__rule-n">Number</div>
              <div class="loc__rule-d">grouping · decimal separator · arabic-indic digits opt-in via numberingSystem.</div>
              <div class="loc__rule-c">.format(6.4)</div>
            </div>
            <div class="loc__rule">
              <div class="loc__rule-n">Plurals</div>
              <div class="loc__rule-d">ICU select · CLDR rules · ar has 6 plural forms · th has 1.</div>
              <div class="loc__rule-c">{n, plural, …}</div>
            </div>
            <div class="loc__rule">
              <div class="loc__rule-n">Currency</div>
              <div class="loc__rule-d">symbol position varies · ฿ prefix in th · $ prefix in en · € suffix in fr.</div>
              <div class="loc__rule-c">style: 'currency'</div>
            </div>
            <div class="loc__rule">
              <div class="loc__rule-n">Sort / collation</div>
              <div class="loc__rule-d">th collator follows Royal-Institute · de uses phonebook order for ä.</div>
              <div class="loc__rule-c">Intl.Collator(loc)</div>
            </div>
            <div class="loc__rule">
              <div class="loc__rule-n">Names</div>
              <div class="loc__rule-d">family-first in zh / ja / ko · honorifics · Thai prefix นาย/นาง.</div>
              <div class="loc__rule-c">DisplayNames(loc)</div>
            </div>
          </div>

        </div>

        <div class="loc__r">

          <div class="loc__sec-h"><span class="loc__sec-t">Live preview · same record · 4 locales</span><span class="loc__sec-cap">renders via Intl + ICU</span></div>
          <div class="loc__preview">
            <div class="loc__pcard">
              <div class="loc__pcard-h"><span class="loc__pcard-name">th-TH · Thai</span><span class="loc__pcard-tag">buddhist · ฿</span></div>
              <dl>
                <dt>ผู้ป่วย</dt><dd>นางสุดา ผ่องใส</dd>
                <dt>วันรับ</dt><dd class="mono">12 มี.ค. 2568</dd>
                <dt>K⁺</dt><dd class="mono">6.4 มิลลิโมล/ลิตร</dd>
                <dt>ค่าใช้จ่าย</dt><dd class="mono">฿42,580.00</dd>
                <dt>เตียง</dt><dd>มี 3 เตียงว่าง</dd>
              </dl>
            </div>
            <div class="loc__pcard">
              <div class="loc__pcard-h"><span class="loc__pcard-name">en-US · English</span><span class="loc__pcard-tag">gregorian · $</span></div>
              <dl>
                <dt>Patient</dt><dd>Mrs. Sudaa P.</dd>
                <dt>Admit</dt><dd class="mono">3/12/2025</dd>
                <dt>K⁺</dt><dd class="mono">6.4 mmol/L</dd>
                <dt>Charges</dt><dd class="mono">$1,278.40</dd>
                <dt>Beds</dt><dd>3 beds available</dd>
              </dl>
            </div>
            <div class="loc__pcard" dir="rtl" lang="ar" style="text-align:right;">
              <div class="loc__pcard-h" style="flex-direction:row-reverse;"><span class="loc__pcard-name">ar-SA · Arabic</span><span class="loc__pcard-tag">hijri · ر.س</span></div>
              <dl style="grid-template-columns:1fr auto;">
                <dt style="text-align:right;">المريض</dt><dd>السيدة سعدة</dd>
                <dt style="text-align:right;">الدخول</dt><dd class="mono">١٤٤٦/٠٩/١٢ هـ</dd>
                <dt style="text-align:right;">البوتاسيوم</dt><dd class="mono">٦٫٤ ملمول/لتر</dd>
                <dt style="text-align:right;">الفاتورة</dt><dd class="mono">٤٬٧٩٠٫٠٠ ر.س</dd>
                <dt style="text-align:right;">الأسرّة</dt><dd>تتوفر ٣ أسرة</dd>
              </dl>
            </div>
            <div class="loc__pcard">
              <div class="loc__pcard-h"><span class="loc__pcard-name">ja-JP · Japanese</span><span class="loc__pcard-tag">era reiwa · ¥</span></div>
              <dl>
                <dt>患者</dt><dd>ポンチャイ・スダ様</dd>
                <dt>入院日</dt><dd class="mono">令和7年3月12日</dd>
                <dt>K⁺</dt><dd class="mono">6.4 mmol/L</dd>
                <dt>合計</dt><dd class="mono">￥190,440</dd>
                <dt>病床</dt><dd>3床空き</dd>
              </dl>
            </div>
          </div>

          <div class="loc__sec-h"><span class="loc__sec-t">String coverage · 14 locales</span><span class="loc__sec-cap">2,148 source keys · 6 below 80 % flagged</span></div>
          <div class="loc__cov">
            <table>
              <thead><tr><th>Locale</th><th>Translator</th><th>Last sync</th><th>Coverage</th></tr></thead>
              <tbody>
                <tr><td>th-TH · Thai</td><td>internal · clinical lead</td><td>2 d ago</td><td><span class="loc__cov-bar" style="--w:100%;"></span>100 %</td></tr>
                <tr><td>en-US · English</td><td>source</td><td>—</td><td><span class="loc__cov-bar" style="--w:100%;"></span>100 %</td></tr>
                <tr><td>ja-JP · Japanese</td><td>vendor · Lokalise</td><td>4 d</td><td><span class="loc__cov-bar" style="--w:94%;"></span>94 %</td></tr>
                <tr><td>ko-KR · Korean</td><td>vendor · Lokalise</td><td>4 d</td><td><span class="loc__cov-bar" style="--w:91%;"></span>91 %</td></tr>
                <tr><td>zh-CN · Chinese</td><td>vendor · Lokalise</td><td>11 d</td><td><span class="loc__cov-bar" style="--w:89%;"></span>89 %</td></tr>
                <tr><td>vi-VN · Vietnamese</td><td>vendor · Smartling</td><td>8 d</td><td><span class="loc__cov-bar" style="--w:86%;"></span>86 %</td></tr>
                <tr><td>ar-SA · Arabic</td><td>vendor · Lokalise · medical reviewer</td><td>12 d</td><td><span class="loc__cov-bar" style="--w:78%;"></span>78 %</td></tr>
                <tr><td>id-ID · Indonesian</td><td>vendor · Smartling</td><td>16 d</td><td><span class="loc__cov-bar" style="--w:72%;"></span>72 %</td></tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

      <div class="loc__foot">
        <div class="loc__foot-meta">format catalog · ICU MessageFormat · build-time extracted via babel plugin · runtime &lt; 5 kB · vendor sync nightly · medical-term review monthly</div>
        <div style="display:flex; gap:8px;">
          <button class="loc__btn">Download · catalog</button>
          <button class="loc__btn">Glossary · 312 medical terms</button>
          <button class="loc__btn loc__btn--p">Save preference</button>
        </div>
      </div>`;

    return section('loc','111','Locale switcher · 14 markets',
      'Two-column showcase. Left holds the production switcher popover with search, recent-used group, regional groups, RTL group, per-row coverage % + direction tag · plus a 6-tile grid of per-locale Intl rules (date / number / plurals / currency / collation / names). Right shows live ICU preview of the same admission record across th / en / ar / ja with native calendar (Buddhist / Gregorian / Hijri / Reiwa) and currency · plus a translator/coverage table for all 14 locales.',
      sub('14 locales · 2 RTL · ICU MessageFormat · Intl-native · 96 % avg coverage · medical-term glossary 312 entries', demo(card)));
  });
})();
