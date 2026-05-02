/* #93 Meal order / Diet sheet (NPO, soft, DM, drug-food interaction) */
(function(){
  if (!window.AX8) return;
  const { h, section, sub, demo } = AX8;

  AX8.register(function dietSection(){
    const card = h('div', {class:'diet'});

    card.innerHTML = `
      <div class="diet__head">
        <div class="diet__brand">
          <div class="diet__logo">DIET</div>
          <div>
            <div class="diet__title">Meal order &amp; diet sheet</div>
            <div class="diet__sub">Form NTR-303 v2.2 · 14 Aug 2024 · post-op day 1 · ordered 13 Aug 22:14</div>
          </div>
        </div>
        <div class="diet__meta">
          <strong>DIET-2024-08-14-0001</strong><br/>
          AN · 67-12345<br/>
          ward 4 · bed 4-12
        </div>
      </div>

      <div class="diet__hero">
        <div class="diet__h-cell diet__h-cell--diet">
          <span class="diet__h-cap">prescribed diet</span>
          <span class="diet__h-val">SOFT · DM · ↓ Na</span>
          <span class="diet__h-meta">soft texture · diabetic 1500 kcal · low-sodium &lt;2 g/d</span>
        </div>
        <div class="diet__h-cell">
          <span class="diet__h-cap">target intake</span>
          <span class="diet__h-val">1500<small> kcal/day</small></span>
          <span class="diet__h-meta">CHO 200 · PRO 75 · FAT 50</span>
        </div>
        <div class="diet__h-cell">
          <span class="diet__h-cap">fluid limit</span>
          <span class="diet__h-val">1800<small> mL/day</small></span>
          <span class="diet__h-meta">incl. soup &amp; ice · NPO ended 13/8 22:00</span>
        </div>
        <div class="diet__h-cell">
          <span class="diet__h-cap">allergies</span>
          <span class="diet__h-val">2<small> known</small></span>
          <span class="diet__h-meta">shrimp · sulfa drug · NKA peanuts</span>
        </div>
      </div>

      <div class="diet__tags">
        <span class="diet__tags-cap">restrictions:</span>
        <span class="diet__tag diet__tag--avoid">✕ shrimp / shellfish</span>
        <span class="diet__tag diet__tag--avoid">✕ raw / under-cooked</span>
        <span class="diet__tag diet__tag--avoid">✕ grapefruit (DFI)</span>
        <span class="diet__tag diet__tag--limit">↓ sodium &lt; 2 g</span>
        <span class="diet__tag diet__tag--limit">↓ simple sugar</span>
        <span class="diet__tag diet__tag--limit">↓ saturated fat</span>
        <span class="diet__tag diet__tag--encourage">↑ fiber</span>
        <span class="diet__tag diet__tag--encourage">↑ protein 1.0 g/kg</span>
        <span class="diet__tag">soft texture (post-op)</span>
        <span class="diet__tag">small frequent meals</span>
      </div>

      <div class="diet__body">

        <!-- LEFT: meals -->
        <div class="diet__col">
          <div class="diet__sec">
            <div class="diet__sec-h"><span>Meals · 14 Aug</span><span class="diet__sec-cap">3 meals · 2 snacks · 1500 kcal</span></div>
            <div class="diet__meals">

              <div class="diet__meal">
                <div class="diet__meal-h"><span class="diet__meal-t">Breakfast</span><span class="diet__meal-time">07:30 · served</span></div>
                <div class="diet__meal-list">
                  <div class="diet__meal-item"><strong>Rice porridge · chicken</strong><span class="diet__meal-qty">1 bowl · 250 g</span></div>
                  <div class="diet__meal-item"><strong>Steamed egg</strong><span class="diet__meal-qty">1 cup · 60 g</span></div>
                  <div class="diet__meal-item"><strong>Banana</strong><span class="diet__meal-qty">½ piece · 60 g</span></div>
                  <div class="diet__meal-item"><strong>Warm milk · low-fat</strong><span class="diet__meal-qty">200 mL</span></div>
                </div>
                <div class="diet__meal-foot"><strong>420 kcal</strong><span>CHO 60 · PRO 22 · FAT 9</span><span class="diet__meal-eaten diet__meal-eaten--low">ate 60%</span></div>
              </div>

              <div class="diet__meal">
                <div class="diet__meal-h"><span class="diet__meal-t">Lunch</span><span class="diet__meal-time">12:00 · scheduled</span></div>
                <div class="diet__meal-list">
                  <div class="diet__meal-item"><strong>Soft jasmine rice</strong><span class="diet__meal-qty">1 cup · 180 g</span></div>
                  <div class="diet__meal-item"><strong>Steamed fish · ginger</strong><span class="diet__meal-qty">1 piece · 90 g</span></div>
                  <div class="diet__meal-item"><strong>Boiled veg · pumpkin</strong><span class="diet__meal-qty">100 g</span></div>
                  <div class="diet__meal-item"><strong>Clear soup · winter melon</strong><span class="diet__meal-qty">200 mL</span></div>
                  <div class="diet__meal-item"><strong>Papaya</strong><span class="diet__meal-qty">100 g</span></div>
                </div>
                <div class="diet__meal-foot"><strong>540 kcal</strong><span>CHO 75 · PRO 28 · FAT 14</span><span class="diet__meal-eaten diet__meal-eaten--pending">pending</span></div>
              </div>

              <div class="diet__meal">
                <div class="diet__meal-h"><span class="diet__meal-t">Dinner</span><span class="diet__meal-time">18:00 · scheduled</span></div>
                <div class="diet__meal-list">
                  <div class="diet__meal-item"><strong>Soft rice / congee</strong><span class="diet__meal-qty">1 cup · 180 g</span></div>
                  <div class="diet__meal-item"><strong>Stewed chicken · veg</strong><span class="diet__meal-qty">100 g</span></div>
                  <div class="diet__meal-item"><strong>Boiled tofu</strong><span class="diet__meal-qty">80 g</span></div>
                  <div class="diet__meal-item"><strong>Clear veg soup</strong><span class="diet__meal-qty">200 mL</span></div>
                  <div class="diet__meal-item"><strong>Apple · slice</strong><span class="diet__meal-qty">100 g</span></div>
                </div>
                <div class="diet__meal-foot"><strong>490 kcal</strong><span>CHO 65 · PRO 25 · FAT 12</span><span class="diet__meal-eaten diet__meal-eaten--pending">pending</span></div>
              </div>

            </div>

            <div class="diet__snacks">
              <div class="diet__snack">
                <div class="diet__snack-l"><span class="diet__snack-t">Mid-morning snack</span><span class="diet__snack-sub">low-fat yogurt · 1 cup · 90 kcal</span></div>
                <span class="diet__snack-time">10:00</span>
              </div>
              <div class="diet__snack">
                <div class="diet__snack-l"><span class="diet__snack-t">Evening snack</span><span class="diet__snack-sub">cracker + cheese · 100 kcal</span></div>
                <span class="diet__snack-time">15:00</span>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT: nutrition + DFI -->
        <div class="diet__col">
          <div class="diet__sec">
            <div class="diet__sec-h"><span>Today's intake vs target</span><span class="diet__sec-cap">at 09:14 · breakfast logged</span></div>
            <div class="diet__nut">
              <div class="diet__n">
                <span class="diet__n-cap">calories</span>
                <span class="diet__n-val">252<small> / 1500</small></span>
                <div class="diet__n-bar"><div class="diet__n-fill diet__n-fill--ok" style="width:17%"></div></div>
                <div class="diet__n-meta">17% · ate 60% bf</div>
              </div>
              <div class="diet__n">
                <span class="diet__n-cap">CHO · g</span>
                <span class="diet__n-val">36<small> / 200</small></span>
                <div class="diet__n-bar"><div class="diet__n-fill diet__n-fill--ok" style="width:18%"></div></div>
                <div class="diet__n-meta">18% · DM-friendly</div>
              </div>
              <div class="diet__n">
                <span class="diet__n-cap">protein · g</span>
                <span class="diet__n-val">13<small> / 75</small></span>
                <div class="diet__n-bar"><div class="diet__n-fill diet__n-fill--warn" style="width:17%"></div></div>
                <div class="diet__n-meta">17% · push lunch</div>
              </div>
              <div class="diet__n">
                <span class="diet__n-cap">sodium · mg</span>
                <span class="diet__n-val">280<small> / 2000</small></span>
                <div class="diet__n-bar"><div class="diet__n-fill diet__n-fill--ok" style="width:14%"></div></div>
                <div class="diet__n-meta">14% · within limit</div>
              </div>
            </div>
          </div>

          <div class="diet__sec">
            <div class="diet__sec-h"><span>Drug–food interaction alerts</span><span class="diet__sec-cap">3 alerts · 1 high</span></div>
            <div class="diet__dfi">

              <div class="diet__d diet__d--high">
                <div class="diet__d-tk">!</div>
                <div>
                  <div class="diet__d-t">Warfarin × vitamin K foods</div>
                  <div class="diet__d-meta">Avoid sudden ↑ leafy greens (kale, spinach, broccoli) — keeps INR stable.<br/><strong>Action:</strong> dietitian counselling done 13/8 · weekly INR</div>
                </div>
              </div>

              <div class="diet__d">
                <div class="diet__d-tk">!</div>
                <div>
                  <div class="diet__d-t">Amlodipine × grapefruit</div>
                  <div class="diet__d-meta">Avoid grapefruit / juice — ↑ drug level via CYP3A4.<br/><strong>Action:</strong> excluded from menu &amp; visitor gifts</div>
                </div>
              </div>

              <div class="diet__d">
                <div class="diet__d-tk">!</div>
                <div>
                  <div class="diet__d-t">Iron PO × tea / coffee / dairy</div>
                  <div class="diet__d-meta">Take iron 1 h before or 2 h after — ↓ absorption.<br/><strong>Action:</strong> iron 11:00 · milk shifted to 13:30</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div class="diet__sign">
        <div class="diet__sig"><span class="diet__sig-cap">order by · MD</span><span class="diet__sig-name">Dr. Nattapong Sirikul</span><span class="diet__sig-meta">e-sign · 13 Aug 22:14</span></div>
        <div class="diet__sig"><span class="diet__sig-cap">reviewed · dietitian</span><span class="diet__sig-name">RD Areeya Thong</span><span class="diet__sig-meta">e-sign · 14 Aug 06:30 · re-eval q3d</span></div>
        <div class="diet__sig"><span class="diet__sig-cap">delivered · ward</span><span class="diet__sig-name">CG Manee Phromma</span><span class="diet__sig-meta">07:30 bf served · tray V-12</span></div>
      </div>

      <div class="diet__foot">
        <div class="diet__foot-meta">Order: SOFT · DM 1500 · ↓Na · review every 3 d or with condition change · NPO from 22:00 if OR scheduled</div>
        <div style="display:flex; gap:6px;">
          <button class="diet__btn">Print menu</button>
          <button class="diet__btn">Log intake</button>
          <button class="diet__btn diet__btn--primary">✓ Confirm 14 Aug menu</button>
        </div>
      </div>`;

    return section('diet','93','Meal order · diet sheet',
      'แบบฟอร์มสั่งอาหาร · 4-cell hero (prescribed diet / target kcal / fluid limit / allergies) with diet tile tinted · 10-tag restrictions row (avoid · limit · encourage tones) · 3-meal grid with item list + qty + macro foot + ate% pill (done/low/pending) · 2-snack mini cards · 4-tile nutrition target with progress bars · 3-row drug–food interaction list (1 high warfarin × vit K · amlodipine × grapefruit · iron × tea/dairy) · 3-sig footer (MD/RD/CG).',
      sub('Soft DM ↓Na 1500 kcal · breakfast 60% · lunch pending · 3 DFI alerts', demo(card)));
  });
})();
