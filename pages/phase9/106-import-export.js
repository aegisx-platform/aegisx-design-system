/* #106 Import/Export wizard */
(function(){
  if (!window.AX9) return;
  const { h, section, sub, demo } = AX9;

  AX9.register(function importExportSection(){
    const card = h('div', {class:'iew'});
    card.innerHTML = `
      <div class="iew__head">
        <div class="iew__brand">
          <div class="iew__logo">IO</div>
          <div>
            <div class="iew__title">Import wizard · Patient registry from legacy HIS</div>
            <div class="iew__sub">job_id ie_2024-04-30-0917 · CSV · 12,840 rows · started 09:17 · resumable</div>
          </div>
        </div>
        <div class="iew__meta">
          <strong>step 3 of 5 · map &amp; validate</strong><br/>
          dry-run mode<br/>
          rollback safe
        </div>
      </div>

      <div class="iew__steps">
        <div class="iew__step is-done">
          <div class="iew__step-num">✓</div>
          <div class="iew__step-l"><span class="iew__step-cap">step 1</span><span class="iew__step-name">Source</span></div>
        </div>
        <div class="iew__step is-done">
          <div class="iew__step-num">✓</div>
          <div class="iew__step-l"><span class="iew__step-cap">step 2</span><span class="iew__step-name">Upload &amp; parse</span></div>
        </div>
        <div class="iew__step is-cur">
          <div class="iew__step-num">3</div>
          <div class="iew__step-l"><span class="iew__step-cap">step 3</span><span class="iew__step-name">Map &amp; validate</span></div>
        </div>
        <div class="iew__step">
          <div class="iew__step-num">4</div>
          <div class="iew__step-l"><span class="iew__step-cap">step 4</span><span class="iew__step-name">Dry run</span></div>
        </div>
        <div class="iew__step">
          <div class="iew__step-num">5</div>
          <div class="iew__step-l"><span class="iew__step-cap">step 5</span><span class="iew__step-name">Apply &amp; report</span></div>
        </div>
      </div>

      <div class="iew__body">

        <div class="iew__l">

          <div class="iew__sec-h"><span>Source file</span><span class="iew__sec-cap">parsed · 12,840 rows</span></div>
          <div class="iew__file">
            <div class="iew__file-ico">CSV</div>
            <div class="iew__file-info">
              <strong>siriraj-pat-2024-q1.csv</strong>
              <small>4.8 MB · 14 cols · UTF-8 · delimiter <code>,</code> · enc-at-rest · sha256 <code>9c3…</code></small>
            </div>
            <span class="iew__file-st">parsed OK</span>
          </div>

          <div class="iew__sec-h" style="margin-top:4px;"><span>Field mapping</span><span class="iew__sec-cap">14 source · 12 mapped · 1 needs attention</span></div>
          <div class="iew__map">
            <div class="iew__map-h">
              <div>Source column</div>
              <div></div>
              <div>Target field</div>
              <div>Status</div>
            </div>
            <div class="iew__map-r">
              <div class="iew__map-src">hn<small>str · 7 chars · 12,840 unique</small></div>
              <div class="iew__map-arrow">→</div>
              <div><span class="iew__map-dst">patient.mrn</span></div>
              <div><span class="iew__map-st iew__map-st--auto">auto</span></div>
            </div>
            <div class="iew__map-r">
              <div class="iew__map-src">cid<small>str · 13 chars · TH ID</small></div>
              <div class="iew__map-arrow">→</div>
              <div><span class="iew__map-dst">patient.national_id</span></div>
              <div><span class="iew__map-st iew__map-st--auto">auto</span></div>
            </div>
            <div class="iew__map-r">
              <div class="iew__map-src">name_th<small>str · 8–48 chars</small></div>
              <div class="iew__map-arrow">→</div>
              <div><span class="iew__map-dst">patient.name_local</span></div>
              <div><span class="iew__map-st iew__map-st--man">manual</span></div>
            </div>
            <div class="iew__map-r">
              <div class="iew__map-src">dob<small>str · mixed dd/mm/yy + dd-mm-yyyy</small></div>
              <div class="iew__map-arrow">→</div>
              <div><span class="iew__map-dst">patient.dob (parse)</span></div>
              <div><span class="iew__map-st iew__map-st--warn">format !</span></div>
            </div>
            <div class="iew__map-r">
              <div class="iew__map-src">sex<small>str · M/F/m/f/1/2</small></div>
              <div class="iew__map-arrow">→</div>
              <div><span class="iew__map-dst">patient.sex (lookup)</span></div>
              <div><span class="iew__map-st iew__map-st--auto">auto</span></div>
            </div>
            <div class="iew__map-r">
              <div class="iew__map-src">addr_line1<small>str · max 120</small></div>
              <div class="iew__map-arrow">→</div>
              <div><span class="iew__map-dst">address.line_1</span></div>
              <div><span class="iew__map-st iew__map-st--auto">auto</span></div>
            </div>
            <div class="iew__map-r">
              <div class="iew__map-src">phone1<small>str · 9–10 digits</small></div>
              <div class="iew__map-arrow">→</div>
              <div><span class="iew__map-dst">patient.phone (E.164)</span></div>
              <div><span class="iew__map-st iew__map-st--man">manual</span></div>
            </div>
            <div class="iew__map-r">
              <div class="iew__map-src">internal_seq<small>int · legacy db key</small></div>
              <div class="iew__map-arrow">→</div>
              <div><span class="iew__map-dst is-skip">skip · not in target</span></div>
              <div><span class="iew__map-st iew__map-st--skip">skip</span></div>
            </div>
          </div>

          <div class="iew__sec-h" style="margin-top:4px;"><span>Run options</span><span class="iew__sec-cap">5 toggles</span></div>
          <div class="iew__opt">
            <div class="iew__opt-r">
              <span class="iew__opt-cb is-on">✓</span>
              <div class="iew__opt-l"><strong>Dedupe by national_id</strong><small>conflict mode · merge · keep newest non-empty field</small></div>
            </div>
            <div class="iew__opt-r">
              <span class="iew__opt-cb is-on">✓</span>
              <div class="iew__opt-l"><strong>Atomic batch · rollback on &gt; 5 % errors</strong><small>txn boundary · all-or-nothing</small></div>
            </div>
            <div class="iew__opt-r">
              <span class="iew__opt-cb is-on">✓</span>
              <div class="iew__opt-l"><strong>Audit-log every row</strong><small>writes 12,840 audit events · ie_2024-04-30-0917</small></div>
            </div>
            <div class="iew__opt-r">
              <span class="iew__opt-cb">·</span>
              <div class="iew__opt-l"><strong>Notify org admins on completion</strong><small>email + webhook patient.import.completed</small></div>
            </div>
            <div class="iew__opt-r">
              <span class="iew__opt-cb">·</span>
              <div class="iew__opt-l"><strong>Send welcome SMS to new patients</strong><small>requires consent column · skipped if missing</small></div>
            </div>
          </div>

        </div>

        <div class="iew__r">

          <div class="iew__sec-h"><span>Validation summary</span><span class="iew__sec-cap">12,840 rows scanned</span></div>
          <div class="iew__val">
            <div class="iew__val-c"><span class="iew__val-cap">Will create</span><span class="iew__val-val is-ok">11,962</span><span class="iew__val-meta">new patients</span></div>
            <div class="iew__val-c"><span class="iew__val-cap">Will merge</span><span class="iew__val-val is-ok">724</span><span class="iew__val-meta">match cid</span></div>
            <div class="iew__val-c"><span class="iew__val-cap">Warnings</span><span class="iew__val-val is-warn">142</span><span class="iew__val-meta">dob format · phone</span></div>
            <div class="iew__val-c"><span class="iew__val-cap">Errors</span><span class="iew__val-val is-err">12</span><span class="iew__val-meta">required field missing</span></div>
          </div>

          <div class="iew__sec-h"><span>Sample · first 5 rows after transform</span><span class="iew__sec-cap">live preview</span></div>
          <div class="iew__prev">
            <div class="iew__prev-h">
              <span class="iew__prev-h-t">target schema · patient_v2</span>
              <span class="iew__prev-h-s">schema 12 fields · click to expand</span>
            </div>
            <table class="iew__prev-tbl">
              <thead>
                <tr><th>mrn</th><th>national_id</th><th>name_local</th><th>dob</th><th>sex</th><th>phone</th></tr>
              </thead>
              <tbody>
                <tr><td>67-12345</td><td>1-1014-…1234</td><td>สุดา ปัญญาดี</td><td>1957-04-12</td><td>F</td><td>+66 81 234 5678</td></tr>
                <tr><td>67-12346</td><td>1-1014-…7891</td><td>มานพ ใจดี</td><td>1962-09-03</td><td>M</td><td>+66 89 111 2233</td></tr>
                <tr><td>67-12347</td><td>1-1014-…4456</td><td>นิภา จันทร์เพ็ญ</td><td class="is-warn">!! 17/02/68</td><td>F</td><td>+66 86 555 7788</td></tr>
                <tr><td>67-12348</td><td>1-1014-…0021</td><td>สมชาย แสงดาว</td><td>1980-12-30</td><td>M</td><td class="is-skip">— missing</td></tr>
                <tr><td>67-12349</td><td>1-1014-…3382</td><td>อรพิน ทองคำ</td><td>1971-06-18</td><td>F</td><td>+66 84 998 7766</td></tr>
              </tbody>
            </table>
          </div>

          <div class="iew__sec-h"><span>Errors &amp; warnings · top issues</span><span class="iew__sec-cap">154 rows affected</span></div>
          <div class="iew__opt">
            <div class="iew__opt-r">
              <span class="iew__opt-cb is-on" style="background:var(--ax-warning-emphasis); border-color:var(--ax-warning-emphasis);">!</span>
              <div class="iew__opt-l"><strong>Buddhist-era dates · 142 rows</strong><small>auto-convert <code>17/02/68</code> → <code>1957-02-17</code> with rule <code>th-buddhist-2digit</code></small></div>
            </div>
            <div class="iew__opt-r">
              <span class="iew__opt-cb is-on" style="background:var(--ax-error-emphasis); border-color:var(--ax-error-emphasis);">!</span>
              <div class="iew__opt-l"><strong>Missing national_id · 12 rows</strong><small>required field · mark for manual review · row 4421, 5602, 5603, 7790, …</small></div>
            </div>
            <div class="iew__opt-r">
              <span class="iew__opt-cb is-on" style="background:var(--ax-warning-emphasis); border-color:var(--ax-warning-emphasis);">!</span>
              <div class="iew__opt-l"><strong>Phone E.164 normalization · 38 rows</strong><small>strip leading 0 · prepend +66</small></div>
            </div>
          </div>

        </div>

      </div>

      <div class="iew__foot">
        <div class="iew__foot-meta">Resumable · checkpoint every 1k rows · safe to close · job will email you when done · estimated 4 m 12 s on apply</div>
        <div style="display:flex; gap:8px;">
          <button class="iew__btn">Save &amp; resume later</button>
          <button class="iew__btn">‹ Back</button>
          <button class="iew__btn iew__btn--p">Run dry-run · step 4 ›</button>
        </div>
      </div>`;

    return section('iew','106','Import / Export wizard · 5-step',
      'Stripe-style import wizard · 5-step strip with done/current dots · 2-column body: source CSV file card with parse OK pill, 8-row field-mapping table (auto / manual / format-warning / skip), 5-toggle run-options panel · right column with 4-tile validation summary (create/merge/warnings/errors), 5-row live preview of transformed sample data with warn/skip cells, and top-issues list · resumable · dry-run safe with rollback.',
      sub('Patient registry · 12,840 rows · 11,962 create · 724 merge · 142 warn · 12 err · step 3/5', demo(card)));
  });
})();
