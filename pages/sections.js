/* AegisX Design System — Section renderers */
(function(){
  const el = (tag, attrs, ...kids) => {
    const e = document.createElement(tag);
    if (attrs) for (const [k,v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    for (const k of kids.flat()) {
      if (k == null) continue;
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    }
    return e;
  };

  const ICONS = {
    search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    plus:'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    trash:'<polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
    check:'<polyline points="20 6 9 17 4 12"/>',
    x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    chevR:'<polyline points="9 18 15 12 9 6"/>',
    home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    pill:'<path d="M10.5 20.5 3.5 13.5a4.95 4.95 0 1 1 7-7l7 7a4.95 4.95 0 1 1-7 7z"/><line x1="8.5" y1="8.5" x2="15.5" y2="15.5"/>',
    stethoscope:'<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
    dollar:'<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    box:'<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    users:'<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    chart:'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    info:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    alert:'<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    filter:'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    sort:'<path d="M3 6h18M6 12h12M10 18h4"/>',
    inbox:'<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>'
  };

  const icon = (name, size=14) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" class="icon-stroke">${ICONS[name]||''}</svg>`;

  const section = (id, num, title, desc, ...blocks) => {
    const s = el('section', {id, class:'section'});
    s.appendChild(el('div', {class:'section__head'},
      el('h2', {class:'section__title'},
        el('span', {class:'section__num'}, num),
        title
      ),
      el('p', {class:'section__desc'}, desc)
    ));
    for (const b of blocks) s.appendChild(b);
    return s;
  };

  const subsection = (title, body) => {
    const w = el('div', {class:'subsection'});
    if (title) w.appendChild(el('h3', {class:'subsection__title'}, title));
    w.appendChild(body);
    return w;
  };

  // ═══════════ 1. COLORS ═══════════
  function colorsSection() {
    const palettes = [
      ['zinc', 'Neutral · body, borders'],
      ['gray', 'Neutral dark-mode'],
      ['indigo', 'Brand · Material #3f51b5'],
      ['emerald', 'Success'],
      ['amber', 'Warning'],
      ['red', 'Error / Danger'],
      ['blue', 'Info / Focus'],
    ];
    const palette = {
      zinc:['#fafafa','#f4f4f5','#e4e4e7','#d4d4d8','#a1a1aa','#71717a','#52525b','#3f3f46','#27272a','#18181b','#09090b'],
      gray:['#f9fafb','#f3f4f6','#e5e7eb','#d1d5db','#9ca3af','#6b7280','#4b5563','#374151','#1f2937','#111827','#09090b'],
      indigo:['#e8eaf6','#c5cae9','#9fa8da','#7986cb','#5c6bc0','#3f51b5','#3949ab','#303f9f','#283593','#1a237e','#0d1558'],
      emerald:['#ecfdf5','#d1fae5','#a7f3d0','#6ee7b7','#34d399','#10b981','#059669','#047857','#065f46','#064e3b','#032b22'],
      amber:['#fffbeb','#fef3c7','#fde68a','#fcd34d','#fbbf24','#f59e0b','#d97706','#b45309','#92400e','#78350f','#451a03'],
      red:['#fef2f2','#fee2e2','#fecaca','#fca5a5','#f87171','#ef4444','#dc2626','#b91c1c','#991b1b','#7f1d1d','#450a0a'],
      blue:['#eff6ff','#dbeafe','#bfdbfe','#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e40af','#1e3a8a','#0e1c54']
    };
    const steps = ['50','100','200','300','400','500','600','700','800','900','950'];

    const paletteWrap = el('div', {class:'demo'});
    for (const [name, desc] of palettes) {
      const row = el('div', {class:'swatch-row'});
      row.appendChild(el('div', {class:'swatch-row__label'},
        el('strong', {}, name),
        el('span', {}, desc)
      ));
      palette[name].forEach((hex, i) => {
        const light = i <= 3;
        const sw = el('div', {
          class: 'swatch' + (light ? ' swatch--light' : ''),
          style: `background:${hex}`,
          title: `--ax-color-${name}-${steps[i]}`,
          onclick: () => navigator.clipboard?.writeText(hex)
        },
          el('div', {class:'swatch__step'}, steps[i]),
          el('div', {class:'swatch__hex'}, hex)
        );
        row.appendChild(sw);
      });
      paletteWrap.appendChild(row);
    }

    // Semantic tokens
    const semantic = [
      ['Brand','brand',['faint','muted','subtle','default','emphasis','inverted']],
      ['Success','success',['faint','muted','subtle','default','emphasis','inverted']],
      ['Warning','warning',['faint','muted','subtle','default','emphasis','inverted']],
      ['Error','error',['faint','muted','subtle','default','emphasis','inverted']],
      ['Info','info',['faint','muted','subtle','default','emphasis','inverted']]
    ];
    const semWrap = el('div');
    for (const [title, role, variants] of semantic) {
      semWrap.appendChild(el('div', {class:'subsection__title', style:'margin-top:20px'}, `${title}  ·  --ax-${role}-*`));
      const grid = el('div', {class:'semantic-grid'});
      variants.forEach(v => {
        const cell = el('div', {class:'semantic'});
        cell.appendChild(el('div', {class:'semantic__preview', style:`background:var(--ax-${role}-${v})`}));
        cell.appendChild(el('div', {class:'semantic__name'}, `--ax-${role}-${v}`));
        cell.appendChild(el('div', {class:'semantic__tag'}, v));
        grid.appendChild(cell);
      });
      semWrap.appendChild(grid);
    }

    // Surfaces
    const surfaces = [
      ['background','page'],['background','default'],['background','subtle'],['background','muted'],['background','emphasis'],
      ['border','subtle'],['border','default'],['border','emphasis']
    ];
    const sGrid = el('div', {class:'semantic-grid', style:'grid-template-columns:repeat(8,1fr)'});
    for (const [cat, variant] of surfaces) {
      const cell = el('div', {class:'semantic'});
      cell.appendChild(el('div', {class:'semantic__preview', style:`background:var(--ax-${cat}-${variant})`}));
      cell.appendChild(el('div', {class:'semantic__name'}, `--ax-${cat}-${variant}`));
      sGrid.appendChild(cell);
    }

    return section('colors','01','Colors & Tokens','3-layer token architecture: primitive → semantic → component. UI code อ่าน layer 2/3 เท่านั้น.',
      subsection('Primitive palette — Layer 1', paletteWrap),
      subsection('Semantic roles — Layer 2', semWrap),
      subsection('Background & Border surfaces', sGrid)
    );
  }

  // ═══════════ 2. TYPOGRAPHY ═══════════
  function typographySection() {
    const specs = [
      ['display-lg','48/60','-0.02em · 600', 'Ward 5A ตรวจผู้ป่วย 24 ราย', 'font-size:48px;line-height:60px;letter-spacing:-0.02em;font-weight:600'],
      ['display-md','36/44','-0.02em · 600', 'คลังยาประจำวัน', 'font-size:36px;line-height:44px;letter-spacing:-0.02em;font-weight:600'],
      ['display-sm','30/38','normal · 600', 'รายงานการเงิน', 'font-size:30px;line-height:38px;font-weight:600'],
      ['display-xs','24/32','normal · 600', 'หัวข้อหลักของหน้า', 'font-size:24px;line-height:32px;font-weight:600'],
      ['text-xl','20/30','normal · 600', 'Section title — Overview', 'font-size:20px;line-height:30px;font-weight:600'],
      ['text-lg','18/28','normal · 500', 'Card heading · หัวการ์ด', 'font-size:18px;line-height:28px;font-weight:500'],
      ['text-md','16/24','normal · 400', 'Body large · เนื้อหาอ่านสบาย ขนาดมาตรฐาน', 'font-size:16px;line-height:24px'],
      ['text-sm','14/20','normal · 400', 'Body default · ใช้เป็นฐาน (IBM Plex Sans Thai @ 14px)', 'font-size:14px;line-height:20px'],
      ['text-xs','12/18','normal · 500', 'Caption / Helper — 3 พ.ย. 2568 · 14:32', 'font-size:12px;line-height:18px;font-weight:500']
    ];
    const wrap = el('div', {class:'demo'});
    for (const [name, metrics, rest, sample, css] of specs) {
      wrap.appendChild(el('div', {class:'type-row'},
        el('div', {class:'type-row__name'}, `--ax-${name}`),
        el('div', {class:'type-row__meta', html: metrics + '<br>' + rest}),
        el('div', {class:'type-row__sample', style: css}, sample)
      ));
    }

    const weights = el('div', {class:'demo', style:'margin-top:16px'});
    weights.appendChild(el('div', {class:'subsection__title', style:'margin-top:0'}, 'Font weights — IBM Plex Sans Thai'));
    const wGrid = el('div', {class:'grid grid-4', style:'gap:14px'});
    [['300','Light'],['400','Regular'],['500','Medium'],['600','Semibold'],['700','Bold']].forEach(([w,n]) => {
      wGrid.appendChild(el('div', {},
        el('div', {style:`font-size:28px;font-weight:${w};color:var(--ax-text-heading);letter-spacing:-0.01em`}, 'Aa อะ ก'),
        el('div', {class:'mono', style:'font-size:11px;color:var(--ax-text-subtle);margin-top:4px'}, `${w} · ${n}`)
      ));
    });
    weights.appendChild(wGrid);

    const mono = el('div', {class:'demo', style:'margin-top:16px'});
    mono.appendChild(el('div', {class:'subsection__title', style:'margin-top:0'}, 'Monospace — JetBrains Mono'));
    mono.appendChild(el('div', {style:'font-family:var(--ax-font-mono);font-size:13px;color:var(--ax-text-heading);line-height:1.6'},
      'HN: 68-12345-01  ·  BP 128/82  ·  HR 76bpm  ·  SpO₂ 98%'));

    return section('typography','02','Typography','IBM Plex Sans Thai · 14px base · line-height 1.5 min — เพราะสระและวรรณยุกต์ไทยซ้อนเหนือบรรทัด.',
      subsection('Type scale', wrap),
      weights, mono
    );
  }

  // ═══════════ 3. SPACING & LAYOUT ═══════════
  function spacingSection() {
    const scale = [
      ['2xs','0.125rem','2px'],['xs','0.25rem','4px'],['sm','0.5rem','8px'],['md','1rem','16px'],
      ['lg','1.5rem','24px'],['xl','2rem','32px'],['2xl','2.5rem','40px'],['3xl','3rem','48px'],['4xl','4rem','64px']
    ];
    const spacing = el('div', {class:'demo'});
    for (const [name, rem, px] of scale) {
      spacing.appendChild(el('div', {class:'spacing-row'},
        el('div', {class:'spacing-row__name'}, `--ax-spacing-${name}`),
        el('div', {class:'spacing-row__value'}, `${rem} · ${px}`),
        el('div', {}, el('div', {class:'spacing-bar', style:`width:${px}`}))
      ));
    }

    const gridViz = el('div', {class:'grid-viz'});
    for (let i=0; i<12; i++) gridViz.appendChild(el('div', {class:'grid-viz__col'}, `${i+1}`));
    const gridCard = el('div', {class:'demo'});
    gridCard.appendChild(el('div', {class:'mono', style:'font-size:11px;color:var(--ax-text-subtle);margin-bottom:12px'},
      '12-column · gutter 24px · breakpoints xs/sm/md/lg/xl/2xl = 0 / 600 / 960 / 1280 / 1440 / 1920px'));
    gridCard.appendChild(gridViz);

    return section('spacing','03','Spacing & Layout','4px base grid — ใช้ 8/12/16 สำหรับ composition, 24+ เฉพาะ section separation.',
      subsection('Spacing scale', spacing),
      subsection('12-column grid', gridCard)
    );
  }

  // ═══════════ 4. RADIUS & ELEVATION ═══════════
  function radiusSection() {
    const radii = [['none','0'],['sm','4px'],['md','6px'],['lg','8px'],['xl','12px'],['2xl','16px'],['full','∞']];
    const rGrid = el('div', {class:'radius-grid'});
    for (const [name, val] of radii) {
      rGrid.appendChild(el('div', {class:'radius-cell', style:`border-radius:${val === '∞' ? '9999px' : val}`},
        el('strong', {}, name),
        el('span', {}, val)
      ));
    }
    const rCard = el('div', {class:'demo'}); rCard.appendChild(rGrid);

    const shadows = [['xs','var(--ax-shadow-xs)'],['sm','var(--ax-shadow-sm)'],['md','var(--ax-shadow-md)'],['lg','var(--ax-shadow-lg)'],['xl','var(--ax-shadow-xl, var(--ax-shadow-lg))']];
    const sGrid = el('div', {class:'shadow-grid'});
    for (const [name, val] of shadows) {
      sGrid.appendChild(el('div', {class:'shadow-cell', style:`box-shadow:${val}`},
        el('strong', {}, name),
        el('span', {}, `--ax-shadow-${name}`)
      ));
    }
    const sCard = el('div', {class:'demo', style:'background:var(--ax-background-page)'}); sCard.appendChild(sGrid);

    return section('radius','04','Radius & Elevation','Subtle border OR soft shadow — never both as competing emphasis.',
      subsection('Border radius', rCard),
      subsection('Shadow / elevation', sCard)
    );
  }

  // ═══════════ 5. ICONS ═══════════
  function iconsSection() {
    const names = Object.keys(ICONS);
    const grid = el('div', {class:'icon-grid'});
    for (const n of names) {
      const cell = el('div', {class:'icon-cell'});
      cell.innerHTML = icon(n, 18) + `<span>${n}</span>`;
      grid.appendChild(cell);
    }
    const card = el('div', {class:'demo'}); card.appendChild(grid);
    return section('icons','05','Iconography','Single-stroke · stroke-width 1.5 · round caps. ไม่มี filled-color icons (ยกเว้น diamond app icons).',
      subsection('Icon sample · 18 × 18', card)
    );
  }

  // ═══════════ 6. BUTTONS ═══════════
  function buttonsSection() {
    const variants = el('div', {class:'demo'});
    variants.appendChild(el('div', {class:'row', style:'margin-bottom:14px'},
      bbtn('Primary','primary'), bbtn('Secondary','secondary'),
      bbtn('Ghost','ghost'), bbtn('Danger','danger'), bbtn('Success','success'),
      el('button', {class:'btn btn--link'}, 'Link button →')
    ));
    variants.appendChild(el('div', {class:'row', style:'margin-bottom:14px'},
      bbtn('New case','primary','plus'),
      bbtn('Export','secondary','download'),
      bbtn('Delete','danger','trash'),
      bbtn('Approve','success','check')
    ));
    variants.appendChild(el('div', {class:'row'},
      bbtn('Small','primary',null,'sm'), bbtn('Default','primary'), bbtn('Large','primary',null,'lg'),
      iconBtn('settings'), iconBtn('bell'), bbtn('Disabled','primary',null,'',true)
    ));

    return section('buttons','06','Buttons','Flat · no inner glow, no skeuomorphic ring. ขอบและสีก็พอ.',
      subsection('Variants & sizes', variants)
    );

    function bbtn(label, variant, iconName, size='', disabled=false) {
      const b = el('button', {class:`btn btn--${variant}${size?' btn--'+size:''}`});
      if (disabled) b.setAttribute('disabled','');
      b.innerHTML = (iconName ? icon(iconName,12) : '') + label;
      return b;
    }
    function iconBtn(i) {
      const b = el('button', {class:'btn btn--secondary btn--icon'});
      b.innerHTML = icon(i,14);
      return b;
    }
  }

  // ═══════════ 7. FORMS ═══════════
  function formsSection() {
    const d = el('div', {class:'demo'});
    const g = el('div', {class:'grid grid-2', style:'gap:16px'});

    g.appendChild(field('ชื่อผู้ป่วย (HN)', 'hn', el('input', {class:'input', placeholder:'เช่น 68-12345-01', value:'68-12345-01'})));
    g.appendChild(field('อีเมล',  'email', withSearchIcon(el('input', {class:'input', type:'email', placeholder:'name@hospital.go.th'})), 'ไม่บังคับ'));
    g.appendChild(field('แผนก', 'dept',
      el('select', {class:'input select'},
        el('option', {}, 'ผู้ป่วยนอก (OPD)'),
        el('option', {}, 'ผู้ป่วยใน (IPD)'),
        el('option', {}, 'ห้องฉุกเฉิน (ER)'),
        el('option', {}, 'ห้องผ่าตัด (OR)')
      )
    ));
    g.appendChild(field('วันเกิด', 'dob', el('input', {class:'input', type:'date', value:'1985-03-14'})));
    g.appendChild(field('อาการสำคัญ', 'note', el('textarea', {class:'input', placeholder:'กรอกอาการที่พบ...'}), null, true));

    const errInput = el('input', {class:'input input--error', value:'12345'});
    g.appendChild(field('รหัสบัตรประชาชน', 'cid', errInput, 'ต้องมี 13 หลัก', false, true));

    d.appendChild(g);

    // Radios / checks / toggle
    const extras = el('div', {class:'demo', style:'margin-top:16px'});
    const ex = el('div', {class:'grid grid-3', style:'gap:24px'});

    // Checkboxes
    const ckGroup = el('div', {style:'display:flex;flex-direction:column;gap:8px'});
    ckGroup.appendChild(el('div', {class:'field__label'}, 'ประเภทบริการ'));
    ['ตรวจรักษาทั่วไป','จ่ายยา','ห้องปฏิบัติการ','เอกซเรย์'].forEach((l, i) => {
      const lbl = el('label', {class:'check'});
      const inp = el('input', {type:'checkbox'});
      if (i<2) inp.checked = true;
      lbl.appendChild(inp);
      lbl.appendChild(el('span', {class:'check__box'}));
      lbl.appendChild(document.createTextNode(l));
      ckGroup.appendChild(lbl);
    });
    ex.appendChild(ckGroup);

    // Radios
    const rdGroup = el('div', {style:'display:flex;flex-direction:column;gap:8px'});
    rdGroup.appendChild(el('div', {class:'field__label'}, 'สิทธิ์การรักษา'));
    ['บัตรทอง (UC)','ประกันสังคม','ข้าราชการ','จ่ายเอง'].forEach((l, i) => {
      const lbl = el('label', {class:'radio'});
      const inp = el('input', {type:'radio', name:'benefit'});
      if (i===0) inp.checked = true;
      lbl.appendChild(inp);
      lbl.appendChild(el('span', {class:'radio__box'}));
      lbl.appendChild(document.createTextNode(l));
      rdGroup.appendChild(lbl);
    });
    ex.appendChild(rdGroup);

    // Toggles
    const tgGroup = el('div', {style:'display:flex;flex-direction:column;gap:10px'});
    tgGroup.appendChild(el('div', {class:'field__label'}, 'การแจ้งเตือน'));
    [['แจ้งเตือนยาใกล้หมด', true],['แจ้งเตือนใบสั่งใหม่', true],['อีเมลสรุปรายสัปดาห์', false],['เสียง / Sound', false]].forEach(([l, c]) => {
      const lbl = el('label', {class:'toggle', style:'justify-content:space-between'});
      lbl.appendChild(el('span', {}, l));
      const wrap = el('span', {style:'position:relative'});
      const inp = el('input', {type:'checkbox'}); if (c) inp.checked = true;
      wrap.appendChild(inp);
      wrap.appendChild(el('span', {class:'toggle__track'}));
      lbl.appendChild(wrap);
      tgGroup.appendChild(lbl);
    });
    ex.appendChild(tgGroup);
    extras.appendChild(ex);

    return section('forms','07','Form inputs','Text · textarea · select · date · checkbox · radio · toggle — all states.',
      subsection('Text inputs', d),
      subsection('Selection controls', extras)
    );

    function field(label, id, control, hint, req=false, error=false) {
      const f = el('div', {class:'field'});
      const lblRow = el('div', {class:'field__label'});
      lblRow.appendChild(el('span', {}, label, req ? el('span', {class:'req'}, ' *') : ''));
      if (hint && !error) lblRow.appendChild(el('span', {class:'muted mono', style:'font-size:10px'}, hint));
      f.appendChild(lblRow);
      f.appendChild(control);
      if (error) f.appendChild(el('div', {class:'field__hint field__hint--error'}, '⚠ ' + hint));
      return f;
    }
    function withSearchIcon(input) {
      const w = el('div', {class:'input-icon'});
      w.innerHTML = icon('search', 14);
      w.appendChild(input);
      return w;
    }
  }

  // ═══════════ 8. CARDS ═══════════
  function cardsSection() {
    // Stats
    const stats = el('div', {class:'grid grid-4'});
    [
      ['ผู้ป่วยวันนี้','248','+12%','up','users'],
      ['รายรับสุทธิ','฿ 1.42M','+4.8%','up','dollar'],
      ['คิวรอตรวจ','38','−6','down','stethoscope'],
      ['ยาคงเหลือ','12,480','+0.3%','up','pill']
    ].forEach(([l,v,d,dir,i]) => {
      const s = el('div', {class:'stat'});
      const head = el('div', {style:'display:flex;justify-content:space-between;align-items:center'});
      head.appendChild(el('div', {class:'stat__label'}, l));
      const ico = document.createElement('div');
      ico.style.cssText = 'color:var(--ax-text-subtle)';
      ico.innerHTML = icon(i, 14);
      head.appendChild(ico);
      s.appendChild(head);
      s.appendChild(el('div', {class:'stat__value'}, v));
      const delta = el('span', {class:'stat__delta stat__delta--'+dir});
      delta.innerHTML = (dir==='up'?'▲':'▼')+' '+d;
      s.appendChild(delta);
      stats.appendChild(s);
    });

    // Info cards
    const cards = el('div', {class:'grid grid-3'});
    const c1 = el('div', {class:'card card--hover'});
    c1.appendChild(el('div', {class:'card__header'},
      el('h4', {class:'card__title'}, 'เวชระเบียน #68-12345-01'),
      el('span', {class:'badge badge--success badge--dot'}, 'Active')
    ));
    c1.appendChild(el('div', {class:'card__body'},
      el('div', {style:'display:flex;gap:12px;align-items:center;margin-bottom:10px'},
        el('div', {class:'avatar avatar--lg', style:'background:var(--ax-brand-faint);color:var(--ax-brand-emphasis)'}, 'สน'),
        el('div', {},
          el('div', {style:'font-weight:600;color:var(--ax-text-heading)'}, 'นายสมชาย นพกุล'),
          el('div', {class:'muted', style:'font-size:11px'}, 'เพศชาย · 42 ปี · O+')
        )
      ),
      el('div', {class:'divider', style:'margin:8px 0'}),
      el('div', {class:'mono', style:'font-size:11px;line-height:1.7'},
        'BP 128/82  ·  HR 76  ·  SpO₂ 98%  ·  Temp 36.8°C'),
      el('div', {style:'margin-top:8px;font-size:12px;color:var(--ax-text-secondary)'}, 'เข้ารักษา OPD เมื่อ 3 พ.ย. 2568 · 14:32')
    ));
    c1.appendChild(el('div', {class:'card__footer'},
      el('button', {class:'btn btn--ghost btn--sm'}, 'ยกเลิก'),
      el('button', {class:'btn btn--primary btn--sm'}, 'เปิดบันทึก')
    ));
    cards.appendChild(c1);

    // Drug card
    const c2 = el('div', {class:'card'});
    c2.appendChild(el('div', {class:'card__header'},
      el('h4', {class:'card__title'}, 'ยาคงเหลือ (Top 5)'),
      el('a', {href:'#', class:'btn btn--link', style:'font-size:12px'}, 'ดูทั้งหมด →')
    ));
    const drugList = el('div', {style:'padding:4px 0'});
    [
      ['Paracetamol 500mg', 4280, 'ok'],
      ['Amoxicillin 500mg', 1050, 'ok'],
      ['Losartan 50mg', 340, 'warn'],
      ['Insulin Glargine', 42, 'low'],
      ['Morphine 10mg/mL', 8, 'low']
    ].forEach(([n, qty, state]) => {
      const row = el('div', {style:'display:flex;justify-content:space-between;align-items:center;padding:9px 16px;border-top:1px solid var(--ax-border-subtle);font-size:13px'});
      row.appendChild(el('span', {style:'color:var(--ax-text-heading)'}, n));
      const right = el('div', {style:'display:flex;align-items:center;gap:10px'});
      right.appendChild(el('span', {class:'mono', style:'color:var(--ax-text-secondary);font-variant-numeric:tabular-nums'}, qty.toLocaleString()));
      right.appendChild(el('span', {class:'badge badge--' + (state==='low'?'error':state==='warn'?'warning':'success') + ' badge--dot'},
        state==='low'?'ใกล้หมด':state==='warn'?'เฝ้าระวัง':'ปกติ'));
      row.appendChild(right);
      drugList.appendChild(row);
    });
    c2.appendChild(drugList);
    cards.appendChild(c2);

    // Appointment card
    const c3 = el('div', {class:'card'});
    c3.appendChild(el('div', {class:'card__header'},
      el('h4', {class:'card__title'}, 'นัดหมายวันนี้')
    ));
    const apptBody = el('div', {class:'card__body', style:'padding:6px 0 0'});
    [
      ['09:00','นัดตรวจซ้ำ','ห้อง OPD-3','นพ. วรพล'],
      ['10:30','ตรวจ X-Ray','ห้องรังสี','ทน. ชญานิษฐ์'],
      ['13:00','รับยา','ห้องจ่ายยา','-']
    ].forEach(([t,title,room,doc]) => {
      const r = el('div', {style:'display:grid;grid-template-columns:60px 1fr auto;gap:12px;align-items:center;padding:9px 16px;border-top:1px solid var(--ax-border-subtle)'});
      r.appendChild(el('div', {class:'mono', style:'font-size:12px;font-weight:600;color:var(--ax-brand-default)'}, t));
      r.appendChild(el('div', {},
        el('div', {style:'font-size:13px;color:var(--ax-text-heading);font-weight:500'}, title),
        el('div', {class:'muted', style:'font-size:11px'}, room + ' · ' + doc)
      ));
      r.appendChild(el('button', {class:'btn btn--ghost btn--sm btn--icon', html: icon('chevR',14)}));
      apptBody.appendChild(r);
    });
    c3.appendChild(apptBody);
    cards.appendChild(c3);

    return section('cards','08','Cards','Stat cards · info cards · list cards — subtle border OR shadow, never both.',
      subsection('Stat cards', stats),
      subsection('Content cards', cards)
    );
  }

  // ═══════════ 9. TABLES ═══════════
  function tablesSection() {
    const wrap = el('div', {class:'table-wrap'});
    const tbl = el('table', {class:'table'});
    const th = ['',
      {label:'HN', sort:true},
      {label:'ชื่อ-สกุล'},
      {label:'แผนก'},
      {label:'สิทธิ์'},
      {label:'สถานะ'},
      {label:'คงค้าง', num:true, sort:true},
      {label:'อัปเดต'},
      ''
    ];
    const thead = el('thead');
    const trh = el('tr');
    thead.appendChild(trh);
    th.forEach(c => {
      if (c === '') { trh.appendChild(el('th', {style:'width:28px'}, el('label', {class:'check'}, el('input',{type:'checkbox'}), el('span',{class:'check__box'})))); return; }
      const d = el('th', c.num ? {class:'table__num', style:'text-align:right'} : {});
      d.appendChild(el('span', {style:'display:inline-flex;align-items:center;gap:4px'},
        c.label,
        c.sort ? (()=>{const s = el('span'); s.innerHTML = icon('sort',10); s.style.opacity='.5'; return s;})() : null
      ));
      trh.appendChild(d);
    });
    tbl.appendChild(thead);

    const rows = [
      ['68-12345-01','นายสมชาย นพกุล','OPD','UC', {s:'success', t:'ตรวจแล้ว'},  0, '3 พ.ย. 14:32'],
      ['68-12390-04','นางสาวพิมพ์ใจ ศรีสุข','IPD','ประกันสังคม', {s:'warning', t:'รอตรวจ'}, 1580, '3 พ.ย. 13:10'],
      ['68-12401-12','ด.ช. ธีรภัทร สุริยะ','ER','UC', {s:'error', t:'ฉุกเฉิน'}, 0, '3 พ.ย. 11:45'],
      ['68-12425-07','นายวีรวัฒน์ จันทรา','OPD','จ่ายเอง', {s:'success', t:'ตรวจแล้ว'}, 2850, '3 พ.ย. 10:02'],
      ['68-12330-19','นางมาลี พุทธิวงศ์','OPD','ข้าราชการ', {s:'brand', t:'กำลังตรวจ'}, 0, '3 พ.ย. 09:14'],
      ['68-12288-03','นายอาทิตย์ สุวรรณ','IPD','UC', {s:'success', t:'ปกติ'}, 440, '2 พ.ย. 16:52'],
      ['68-12275-08','นางสุดา เกษมสุข','OPD','ประกันสังคม', {s:'neutral', t:'จำหน่ายแล้ว'}, 0, '2 พ.ย. 15:20']
    ];
    const tbody = el('tbody');
    rows.forEach(r => {
      const tr = el('tr');
      tr.appendChild(el('td', {}, el('label', {class:'check'}, el('input',{type:'checkbox'}), el('span',{class:'check__box'}))));
      tr.appendChild(el('td', {class:'mono', style:'color:var(--ax-brand-default);font-weight:500'}, r[0]));
      tr.appendChild(el('td', {style:'color:var(--ax-text-heading);font-weight:500'}, r[1]));
      tr.appendChild(el('td', {}, el('span', {class:'badge badge--neutral'}, r[2])));
      tr.appendChild(el('td', {class:'muted'}, r[3]));
      tr.appendChild(el('td', {}, el('span', {class:'badge badge--' + r[4].s + ' badge--dot'}, r[4].t)));
      tr.appendChild(el('td', {class:'table__num mono'}, r[5] ? '฿ ' + r[5].toLocaleString() : '—'));
      tr.appendChild(el('td', {class:'muted mono', style:'font-size:11px'}, r[6]));
      const act = el('td', {style:'text-align:right'});
      act.appendChild(el('button',{class:'btn btn--ghost btn--sm btn--icon', html:icon('chevR',14)}));
      tr.appendChild(act);
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);
    wrap.appendChild(tbl);

    // Toolbar
    const tools = el('div', {style:'display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--ax-border-subtle)'});
    tools.appendChild(el('div', {style:'display:flex;gap:8px;align-items:center'},
      (()=>{const w = el('div', {class:'input-icon', style:'width:240px'}); w.innerHTML = icon('search',12);
        const i = el('input', {class:'input', placeholder:'ค้นหา HN, ชื่อ...'}); w.appendChild(i); return w;})(),
      (()=>{const b = el('button', {class:'btn btn--secondary btn--sm'}); b.innerHTML = icon('filter',12)+'Filter'; return b;})(),
      el('span', {class:'badge badge--neutral'}, '7 รายการ')
    ));
    tools.appendChild(el('div', {style:'display:flex;gap:6px;align-items:center'},
      el('span', {class:'muted mono', style:'font-size:11px'}, '1–7 / 248'),
      el('button', {class:'btn btn--secondary btn--sm btn--icon', html:icon('chevR',12) + ''}, ),
      el('button', {class:'btn btn--secondary btn--sm btn--icon', html:icon('chevR',12)})
    ));

    const outer = el('div', {class:'table-wrap'});
    outer.appendChild(tools);
    outer.appendChild(tbl);

    return section('tables','09','Tables & Data grids','Dense layout — row 40px compact · tabular-nums · sortable · selectable.',
      subsection('Patient registry (example)', outer)
    );
  }

  // ═══════════ 10. MODALS ═══════════
  function modalsSection() {
    const demo = el('div', {class:'modal-demo'});
    const m = el('div', {class:'modal'});
    m.appendChild(el('button', {class:'modal__close', html: icon('x',14)}));
    m.appendChild(el('div', {class:'modal__header'},
      el('h3', {class:'modal__title'}, 'ยืนยันการยกเลิกนัด'),
      el('p', {class:'modal__sub'}, 'นายสมชาย นพกุล · HN 68-12345-01')
    ));
    m.appendChild(el('div', {class:'modal__body'},
      'การยกเลิกนัดหมายนี้จะส่ง SMS แจ้งเตือนผู้ป่วยและคืนช่วงเวลาสู่คิวเปิด.',
      el('div', {style:'margin-top:10px'},
        el('label', {class:'check'},
          el('input', {type:'checkbox'}),
          el('span', {class:'check__box'}),
          'ส่งเหตุผลไปยังผู้ป่วย'
        )
      )
    ));
    m.appendChild(el('div', {class:'modal__footer'},
      el('button', {class:'btn btn--ghost btn--sm'}, 'ย้อนกลับ'),
      el('button', {class:'btn btn--danger btn--sm'}, 'ยืนยันยกเลิก')
    ));
    demo.appendChild(m);

    return section('modals','10','Modals & Dialogs','Confirmation · destructive · form dialog — shadow lg · max-width 420px.',
      subsection('Confirmation dialog', demo)
    );
  }

  // ═══════════ 11. NAVIGATION ═══════════
  function navSection() {
    // Sidebar nav preview
    const navPrev = el('div', {class:'nav-preview'});
    navPrev.appendChild(el('div', {class:'nav-preview__group'}, 'คลินิก'));
    [[ICONS.home,'Dashboard',''],[ICONS.users,'ผู้ป่วย','248'],[ICONS.calendar,'นัดหมาย','38'],[ICONS.file,'เวชระเบียน','']].forEach((r,i) => {
      const it = el('div', {class:'nav-preview__item' + (i===1 ? ' is-active' : '')});
      const main = el('div', {class:'nav-preview__item-main'});
      main.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" class="icon-stroke">${r[0]}</svg><span>${r[1]}</span>`;
      it.appendChild(main);
      if (r[2]) it.appendChild(el('span', {class:'nav-preview__count'}, r[2]));
      navPrev.appendChild(it);
    });
    navPrev.appendChild(el('div', {class:'nav-preview__group'}, 'Backoffice'));
    [[ICONS.box,'พัสดุ',''],[ICONS.dollar,'การเงิน','3'],[ICONS.users,'บุคลากร',''],[ICONS.chart,'รายงาน','']].forEach(r => {
      const it = el('div', {class:'nav-preview__item'});
      const main = el('div', {class:'nav-preview__item-main'});
      main.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" class="icon-stroke">${r[0]}</svg><span>${r[1]}</span>`;
      it.appendChild(main);
      if (r[2]) it.appendChild(el('span', {class:'nav-preview__count'}, r[2]));
      navPrev.appendChild(it);
    });

    // Tabs
    const tabs = el('div', {class:'demo'});
    const tabBar = el('div', {class:'tabs'});
    ['ภาพรวม','เวชระเบียน','คำสั่งแพทย์','ประวัติการจ่ายยา','บิล & การเงิน'].forEach((t,i) => {
      tabBar.appendChild(el('button', {class: i===1 ? 'is-active' : ''}, t));
    });
    tabs.appendChild(tabBar);
    tabs.appendChild(el('div', {style:'padding:18px 2px 2px;color:var(--ax-text-secondary);font-size:13px'},
      'พื้นที่เนื้อหาของแท็บ "เวชระเบียน" — เปลี่ยน state ระหว่างแท็บโดยไม่ต้องโหลดหน้า.'));

    // Breadcrumbs
    const crumbs = el('div', {class:'demo'});
    const cb = el('div', {class:'crumbs'});
    cb.innerHTML = `
      <a href="#">คลินิก</a>${icon('chevR',10)}
      <a href="#">ผู้ป่วย OPD</a>${icon('chevR',10)}
      <a href="#">นายสมชาย นพกุล</a>${icon('chevR',10)}
      <strong>เวชระเบียน #68-12345-01</strong>
    `;
    crumbs.appendChild(cb);

    // Pagination
    const pag = el('div', {class:'demo', style:'display:flex;justify-content:center;gap:4px'});
    const pages = ['«','‹','1','2','3','4','5','…','42','›','»'];
    pages.forEach((p,i) => {
      const b = el('button', {class:'btn btn--secondary btn--sm', style:'min-width:30px;padding:0;height:28px;justify-content:center'}, p);
      if (p==='3') { b.classList.remove('btn--secondary'); b.classList.add('btn--primary'); }
      pag.appendChild(b);
    });

    const navWrap = el('div', {class:'grid grid-2'});
    navWrap.appendChild(subsection('Sidebar navigation', navPrev));
    navWrap.appendChild(el('div', {},
      subsection('Breadcrumbs', crumbs),
      subsection('Tabs', tabs)
    ));

    return section('nav','11','Navigation','Sidebar · tabs · breadcrumbs · pagination — สถาปัตยกรรมข้อมูลที่ลึกตามธรรมชาติของ hospital platform.',
      navWrap,
      subsection('Pagination', pag)
    );
  }

  // ═══════════ 12. BADGES ═══════════
  function badgesSection() {
    const soft = el('div', {class:'demo row'});
    ['brand','success','warning','error','info','neutral'].forEach(v => {
      soft.appendChild(el('span', {class:`badge badge--${v} badge--dot`}, v));
    });

    const solid = el('div', {class:'demo row', style:'margin-top:10px'});
    ['brand','success','warning','error'].forEach(v => {
      solid.appendChild(el('span', {class:`badge badge--solid badge--${v}`}, v));
    });

    const clinical = el('div', {class:'demo row', style:'margin-top:10px'});
    [
      ['UC / บัตรทอง','brand'],['ประกันสังคม','info'],['ข้าราชการ','success'],['จ่ายเอง','neutral'],
      ['ฉุกเฉิน','error'],['ติดเชื้อ','warning'],['AAPI · Triage 1','error'],['DNR','neutral']
    ].forEach(([l,v]) => clinical.appendChild(el('span', {class:`badge badge--${v} badge--dot`}, l)));

    const chips = el('div', {class:'demo row'});
    ['แผนกอายุรกรรม','OPD','UC','ประกันสังคม','ลบ filter'].forEach((l,i) => {
      const c = el('span', {class:'chip'});
      c.appendChild(document.createTextNode(l));
      const b = el('button', {}); b.innerHTML = icon('x',10); c.appendChild(b);
      chips.appendChild(c);
    });

    return section('badges','12','Badges, Tags & Chips','Soft (fain bg + emphasis text) · solid · dot-only — use เฉพาะเมื่อความหมายเปลี่ยน.',
      subsection('Soft badges', soft),
      subsection('Solid badges', solid),
      subsection('Clinical context (examples)', clinical),
      subsection('Filter chips', chips)
    );
  }

  // ═══════════ 13. ALERTS ═══════════
  function alertsSection() {
    const alerts = el('div', {class:'demo', style:'display:grid;gap:10px'});
    [
      ['info','ข้อมูลอัปเดตล่าสุด', 'ข้อมูลเวชระเบียนถูกอัปเดตโดย นพ. วรพล เมื่อ 2 นาทีที่แล้ว.', 'info'],
      ['success','บันทึกสำเร็จ', 'บันทึกใบสั่งยา RX-2025-0892 แล้ว · 7 รายการยา', 'check'],
      ['warning','ยาใกล้หมด', 'Insulin Glargine คงเหลือ 42 หลอด (ต่ำกว่า reorder point 80).', 'alert'],
      ['error','ไม่สามารถส่งเบิก NHSO ได้', 'โค้ด ICD-10 ไม่ตรงกับโรค primary — ตรวจสอบรายการที่ 3.', 'alert']
    ].forEach(([v, t, b, i]) => {
      const a = el('div', {class:`alert alert--${v}`});
      a.innerHTML = `<div class="alert__icon">${icon(i, 16)}</div>`;
      a.appendChild(el('div', {},
        el('div', {class:'alert__title'}, t),
        el('p', {class:'alert__body'}, b)
      ));
      alerts.appendChild(a);
    });

    const toasts = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:10px;max-width:360px'});
    [
      ['','บันทึกร่างแล้ว','อัตโนมัติ · 14:32'],
      ['success','ปริ้นฉลากยาแล้ว','ส่งไปที่เครื่อง Brother-7-OPD'],
      ['warning','การเชื่อมต่อช้า','กำลัง retry... (2/3)'],
      ['error','ไม่สามารถบันทึกได้','ลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ']
    ].forEach(([v, t, m]) => {
      const x = el('div', {class:'toast' + (v ? ' toast--'+v : '')});
      x.appendChild(el('div', {class:'toast__body'},
        el('div', {class:'toast__title'}, t),
        el('div', {class:'toast__msg'}, m)
      ));
      const btn = el('button', {class:'btn btn--ghost btn--sm btn--icon'}); btn.innerHTML = icon('x',12);
      x.appendChild(btn);
      toasts.appendChild(x);
    });

    return section('alerts','13','Alerts, Toasts & Notifications','Inline alerts สำหรับ page-level · toasts สำหรับ ephemeral feedback.',
      subsection('Inline alerts', alerts),
      subsection('Toasts', toasts)
    );
  }

  // ═══════════ 14. AVATARS ═══════════
  function avatarsSection() {
    const sizes = el('div', {class:'demo row'});
    ['sm','','lg','xl'].forEach(s => {
      const cls = s ? 'avatar--'+s : '';
      sizes.appendChild(el('div', {class:'avatar ' + cls}, 'สว'));
    });

    const colors = el('div', {class:'demo row'});
    [
      ['สน','brand'],['พจ','success'],['ดต','warning'],['วม','info'],['มพ','error']
    ].forEach(([t, role]) => {
      sizes.appendChild(el('div', {class:'avatar', style:`background:var(--ax-${role}-faint);color:var(--ax-${role}-emphasis)`}, t));
    });

    // Status
    const status = el('div', {class:'demo row'});
    [
      ['online','Online · นพ. วรพล'],
      ['away','Away · พญ. ศรีสุดา'],
      ['offline','Offline · ทน. ชญานิษฐ์']
    ].forEach(([s, l]) => {
      const w = el('div', {style:'display:flex;align-items:center;gap:10px'});
      const av = el('div', {class:'avatar avatar--lg'}, l.split('· ')[1].slice(0,2));
      av.appendChild(el('span', {class:`avatar__status avatar__status--${s}`}));
      w.appendChild(av);
      w.appendChild(el('div', {style:'font-size:13px'}, l));
      status.appendChild(w);
    });

    // Group
    const group = el('div', {class:'demo', style:'display:flex;align-items:center;gap:12px'});
    const stack = el('div', {style:'display:flex'});
    ['สน','พจ','วม','มพ','+4'].forEach((t, i) => {
      const a = el('div', {class:'avatar' + (i>0 ? ' avatar--stacked' : ''), style: i===4 ? 'background:var(--ax-background-subtle);color:var(--ax-text-secondary)' : ''}, t);
      stack.appendChild(a);
    });
    group.appendChild(stack);
    group.appendChild(el('div', {style:'font-size:13px;color:var(--ax-text-secondary)'}, 'แพทย์ 8 คนกำลังดูแลวอร์ดนี้'));

    // User cell (table-style)
    const cells = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:10px'});
    [
      ['นพ. วรพล จิรายุ','วพ','brand','ผู้เชี่ยวชาญ · อายุรกรรม','online'],
      ['พญ. ศรีสุดา กาญจนา','ศก','success','OPD · ทั่วไป','away'],
      ['ทน. ชญานิษฐ์ วาสนา','ชว','info','ห้องยา · เภสัชกรรม','offline']
    ].forEach(([name, ini, role, meta, s]) => {
      const c = el('div', {class:'user-cell'});
      const av = el('div', {class:'avatar', style:`background:var(--ax-${role}-faint);color:var(--ax-${role}-emphasis)`}, ini);
      av.appendChild(el('span', {class:`avatar__status avatar__status--${s}`}));
      c.appendChild(av);
      c.appendChild(el('div', {},
        el('div', {class:'user-cell__name'}, name),
        el('div', {class:'user-cell__meta'}, meta)
      ));
      cells.appendChild(c);
    });

    return section('avatars','14','Avatars & User displays','Sizes sm/default/lg/xl · with status · stacked · in table rows.',
      subsection('Sizes & color roles', sizes),
      subsection('With status indicator', status),
      subsection('Stacked group', group),
      subsection('User cell (table row)', cells)
    );
  }

  // ═══════════ 15. CHARTS ═══════════
  function chartsSection() {
    // Line chart SVG
    const lineCard = el('div', {class:'chart-card'});
    lineCard.appendChild(el('div', {class:'chart-card__head'},
      el('div', {},
        el('div', {class:'chart-card__title'}, 'ผู้ป่วยนอก · 30 วันล่าสุด'),
        el('div', {class:'chart-card__value'}, '6,482')
      ),
      el('span', {class:'badge badge--success badge--dot'}, '+8.3%')
    ));
    lineCard.appendChild(lineChart());
    lineCard.appendChild(el('div', {class:'chart-legend'},
      legendDot('#3f51b5', 'ผู้ป่วยนอก'),
      legendDot('#10b981', 'ผู้ป่วยใน'),
      legendDot('#f59e0b', 'ฉุกเฉิน')
    ));

    // Bar chart
    const barCard = el('div', {class:'chart-card'});
    barCard.appendChild(el('div', {class:'chart-card__head'},
      el('div', {},
        el('div', {class:'chart-card__title'}, 'รายรับตามแผนก · ตุลาคม'),
        el('div', {class:'chart-card__value'}, '฿ 4.28M')
      )
    ));
    barCard.appendChild(barChart());

    // Donut
    const donutCard = el('div', {class:'chart-card'});
    donutCard.appendChild(el('div', {class:'chart-card__head'},
      el('div', {},
        el('div', {class:'chart-card__title'}, 'สัดส่วนสิทธิ์การรักษา'),
        el('div', {class:'chart-card__value'}, '248 ราย')
      )
    ));
    donutCard.appendChild(donutChart());
    donutCard.appendChild(el('div', {class:'chart-legend'},
      legendDot('#3f51b5', 'UC · 58%'),
      legendDot('#10b981', 'ประกันสังคม · 24%'),
      legendDot('#f59e0b', 'ข้าราชการ · 12%'),
      legendDot('#71717a', 'จ่ายเอง · 6%')
    ));

    // Spark row
    const sparks = el('div', {class:'grid grid-4'});
    [
      ['ผู้ป่วยรอตรวจ','38',-6,'#10b981'],
      ['เตียงว่าง','12 / 80',-2,'#f59e0b'],
      ['เวลารอเฉลี่ย','18 นาที',+4,'#ef4444'],
      ['คิว ER','7',+1,'#3f51b5']
    ].forEach(([l,v,d,c]) => {
      const s = el('div', {class:'stat'});
      s.appendChild(el('div', {class:'stat__label'}, l));
      s.appendChild(el('div', {class:'stat__value'}, v));
      s.appendChild(sparkline(c));
      sparks.appendChild(s);
    });

    const g = el('div', {class:'grid grid-2'});
    g.appendChild(lineCard);
    g.appendChild(barCard);

    return section('charts','15','Data visualization','Line · bar · donut · sparkline — ใช้สี semantic role (success/warning/error/info) ตามความหมาย.',
      subsection('Time series', lineCard),
      subsection('Comparative & distribution', (()=>{const w = el('div', {class:'grid grid-2'}); w.appendChild(barCard); w.appendChild(donutCard); return w;})()),
      subsection('KPI tiles with sparklines', sparks)
    );

    function legendDot(c, l) { const s = el('span'); s.innerHTML = `<span class="chart-legend__dot" style="background:${c}"></span>${l}`; return s; }
    function lineChart() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 520 160'); svg.setAttribute('width','100%'); svg.style.display='block';
      const pts1 = [20,28,24,34,30,38,32,42,40,50,46,58,54,62,60,70,65,72,68,75,70,82,78,88,80,92,86,98,90,104,95,110].slice(0,30);
      const pts2 = [12,14,16,15,18,20,22,20,24,26,28,30,28,32,34,36,38,36,40,42,44,42,46,48,50,48,52,54,56,58];
      const pts3 = [5,6,8,7,10,9,12,10,8,14,11,13,9,15,12,10,13,11,14,12,16,13,10,14,12,15,11,13,14,16];
      const mk = (arr, color) => {
        const w = 520, h = 160, pad = 10;
        const max = Math.max(...arr)+20, min = 0;
        const dx = (w - pad*2) / (arr.length-1);
        const path = arr.map((v,i) => `${i===0?'M':'L'}${pad+i*dx},${h-pad-((v-min)/(max-min))*(h-pad*2)}`).join(' ');
        const area = path + ` L${w-pad},${h-pad} L${pad},${h-pad} Z`;
        const g = document.createElementNS('http://www.w3.org/2000/svg','g');
        const p = document.createElementNS('http://www.w3.org/2000/svg','path'); p.setAttribute('d',area); p.setAttribute('fill',color); p.setAttribute('opacity','0.1');
        const l = document.createElementNS('http://www.w3.org/2000/svg','path'); l.setAttribute('d',path); l.setAttribute('fill','none'); l.setAttribute('stroke',color); l.setAttribute('stroke-width','1.75'); l.setAttribute('stroke-linecap','round'); l.setAttribute('stroke-linejoin','round');
        g.appendChild(p); g.appendChild(l); return g;
      };
      // Grid
      for (let i=0; i<4; i++){
        const y = 10 + i*35;
        const ln = document.createElementNS('http://www.w3.org/2000/svg','line');
        ln.setAttribute('x1','10'); ln.setAttribute('x2','510'); ln.setAttribute('y1',y); ln.setAttribute('y2',y);
        ln.setAttribute('stroke','var(--ax-border-subtle)'); ln.setAttribute('stroke-dasharray','2 3');
        svg.appendChild(ln);
      }
      svg.appendChild(mk(pts1, '#3f51b5'));
      svg.appendChild(mk(pts2, '#10b981'));
      svg.appendChild(mk(pts3, '#f59e0b'));
      return svg;
    }
    function barChart() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 520 180'); svg.setAttribute('width','100%'); svg.style.display='block';
      const data = [['OPD',820],['IPD',1240],['ER',680],['OR',540],['Lab',420],['X-Ray',320],['ยา',260]];
      const max = 1300;
      const w = 520, h = 180, pad = 24;
      const bw = (w - pad*2) / data.length;
      data.forEach(([l, v], i) => {
        const bh = (v/max) * (h - pad*2 - 16);
        const x = pad + i*bw + bw*0.2;
        const y = h - pad - bh;
        const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
        rect.setAttribute('x',x); rect.setAttribute('y',y); rect.setAttribute('width',bw*0.6); rect.setAttribute('height',bh);
        rect.setAttribute('fill', i===1 ? '#3f51b5' : '#9fa8da');
        rect.setAttribute('rx','2');
        svg.appendChild(rect);
        const lbl = document.createElementNS('http://www.w3.org/2000/svg','text');
        lbl.setAttribute('x', x + bw*0.3); lbl.setAttribute('y', h - 6);
        lbl.setAttribute('font-size','10'); lbl.setAttribute('text-anchor','middle');
        lbl.setAttribute('fill','var(--ax-text-subtle)'); lbl.setAttribute('font-family','var(--ax-font-mono)');
        lbl.textContent = l;
        svg.appendChild(lbl);
        const val = document.createElementNS('http://www.w3.org/2000/svg','text');
        val.setAttribute('x', x + bw*0.3); val.setAttribute('y', y - 4);
        val.setAttribute('font-size','10'); val.setAttribute('text-anchor','middle');
        val.setAttribute('fill','var(--ax-text-heading)'); val.setAttribute('font-weight','600');
        val.textContent = v;
        svg.appendChild(val);
      });
      return svg;
    }
    function donutChart() {
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 200 160'); svg.setAttribute('width','100%'); svg.style.display='block';
      const cx = 100, cy = 80, r = 60, rin = 40;
      const data = [[58, '#3f51b5'],[24,'#10b981'],[12,'#f59e0b'],[6,'#71717a']];
      let ang = -Math.PI/2;
      data.forEach(([pct, color]) => {
        const a2 = ang + (pct/100)*Math.PI*2;
        const large = (a2-ang) > Math.PI ? 1 : 0;
        const x1 = cx + r*Math.cos(ang), y1 = cy + r*Math.sin(ang);
        const x2 = cx + r*Math.cos(a2), y2 = cy + r*Math.sin(a2);
        const x3 = cx + rin*Math.cos(a2), y3 = cy + rin*Math.sin(a2);
        const x4 = cx + rin*Math.cos(ang), y4 = cy + rin*Math.sin(ang);
        const path = `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${rin},${rin} 0 ${large} 0 ${x4},${y4} Z`;
        const p = document.createElementNS('http://www.w3.org/2000/svg','path');
        p.setAttribute('d',path); p.setAttribute('fill',color);
        svg.appendChild(p);
        ang = a2;
      });
      const tx = document.createElementNS('http://www.w3.org/2000/svg','text');
      tx.setAttribute('x',cx); tx.setAttribute('y',cy+2); tx.setAttribute('text-anchor','middle');
      tx.setAttribute('font-size','18'); tx.setAttribute('font-weight','600'); tx.setAttribute('fill','var(--ax-text-heading)');
      tx.textContent = '248'; svg.appendChild(tx);
      const t2 = document.createElementNS('http://www.w3.org/2000/svg','text');
      t2.setAttribute('x',cx); t2.setAttribute('y',cy+16); t2.setAttribute('text-anchor','middle');
      t2.setAttribute('font-size','9'); t2.setAttribute('fill','var(--ax-text-subtle)');
      t2.textContent = 'ผู้ป่วย'; svg.appendChild(t2);
      return svg;
    }
    function sparkline(color) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 120 28'); svg.setAttribute('width','100%'); svg.setAttribute('height','28'); svg.style.display='block';
      const pts = Array.from({length:20}, () => 8 + Math.random()*14);
      const path = pts.map((v,i) => `${i===0?'M':'L'}${i*6+2},${v}`).join(' ');
      const p = document.createElementNS('http://www.w3.org/2000/svg','path');
      p.setAttribute('d',path); p.setAttribute('fill','none'); p.setAttribute('stroke',color); p.setAttribute('stroke-width','1.5'); p.setAttribute('stroke-linecap','round'); p.setAttribute('stroke-linejoin','round');
      svg.appendChild(p);
      return svg;
    }
  }

  // ═══════════ 16. LOADING / EMPTY ═══════════
  function statesSection() {
    // Skeletons
    const sk = el('div', {class:'demo'});
    sk.appendChild(el('div', {style:'display:flex;gap:12px;margin-bottom:12px;align-items:center'},
      el('div', {class:'skeleton', style:'width:40px;height:40px;border-radius:50%'}),
      el('div', {style:'flex:1'},
        el('div', {class:'skeleton', style:'width:180px;height:12px;margin-bottom:6px'}),
        el('div', {class:'skeleton', style:'width:120px;height:10px'})
      )
    ));
    sk.appendChild(el('div', {class:'skeleton', style:'width:100%;height:10px;margin-bottom:6px'}));
    sk.appendChild(el('div', {class:'skeleton', style:'width:92%;height:10px;margin-bottom:6px'}));
    sk.appendChild(el('div', {class:'skeleton', style:'width:78%;height:10px'}));

    // Spinner + progress
    const sp = el('div', {class:'demo', style:'display:flex;flex-direction:column;gap:14px'});
    const r1 = el('div', {style:'display:flex;align-items:center;gap:12px'});
    r1.appendChild(el('span', {class:'spinner'}));
    r1.appendChild(el('span', {style:'font-size:13px'}, 'กำลังประมวลผล...'));
    sp.appendChild(r1);
    const r2 = el('div');
    r2.appendChild(el('div', {style:'display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px'},
      el('span', {}, 'อัปโหลดไฟล์ DRG 2568'),
      el('span', {class:'mono muted'}, '68%')
    ));
    const prog = el('div', {class:'progress'});
    prog.appendChild(el('div', {class:'progress__bar', style:'width:68%'}));
    r2.appendChild(prog);
    sp.appendChild(r2);

    // Empty states
    const empty = el('div', {class:'grid grid-2'});
    [
      ['inbox','ยังไม่มีนัดหมาย','ไม่มีคิวรอตรวจในช่วงเวลาที่คุณเลือก ลองเปลี่ยนช่วงเวลาหรือสร้างนัดหมายใหม่.', 'สร้างนัดหมายใหม่', 'plus'],
      ['search','ไม่พบข้อมูล','ไม่พบ HN "68-99999-99" ในฐานข้อมูล กรุณาตรวจสอบหมายเลขอีกครั้ง.', 'ล้างการค้นหา', 'x']
    ].forEach(([iconName, t, d, btn, bi]) => {
      const e = el('div', {class:'demo'});
      const inner = el('div', {class:'empty'});
      const ico = el('div', {class:'empty__icon'});
      ico.innerHTML = icon(iconName, 20);
      inner.appendChild(ico);
      inner.appendChild(el('div', {class:'empty__title'}, t));
      inner.appendChild(el('div', {class:'empty__desc'}, d));
      const b = el('button', {class:'btn btn--primary btn--sm'});
      b.innerHTML = icon(bi, 12) + btn;
      inner.appendChild(b);
      e.appendChild(inner);
      empty.appendChild(e);
    });

    return section('states','16','Loading & Empty states','Spinner หรือ progress bar · no shimmer ornament · empty states with clear next action.',
      subsection('Skeleton', sk),
      subsection('Spinner & progress', sp),
      subsection('Empty states', empty)
    );
  }

  // Build all
  const root = document.getElementById('sections');
  [colorsSection, typographySection, spacingSection, radiusSection, iconsSection,
   buttonsSection, formsSection, cardsSection, tablesSection, modalsSection,
   navSection, badgesSection, alertsSection, avatarsSection, chartsSection, statesSection
  ].forEach(fn => {
    try { root.appendChild(fn()); } catch (e) { console.error(fn.name, e); }
  });
})();
