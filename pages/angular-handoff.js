/* ═══════════════════════════════════════════════════════════════
   AegisX DS — Angular Material handoff
   ═══════════════════════════════════════════════════════════════ */
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
  const sub = (title, body) => {
    const w = el('div', {class:'subsection'});
    if (title) w.appendChild(el('h3', {class:'subsection__title'}, title));
    w.appendChild(body);
    return w;
  };

  // ═══ Code helpers (simple syntax highlighting) ═══
  function tokenize(code, lang) {
    const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    code = esc(code);
    if (lang === 'scss' || lang === 'css') {
      code = code
        .replace(/(\/\/[^\n]*)/g, '<span class="tok-cmt">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-cmt">$1</span>')
        .replace(/(@[a-z-]+)/g, '<span class="tok-kw">$1</span>')
        .replace(/(\$[a-z0-9-_]+)/gi, '<span class="tok-fn">$1</span>')
        .replace(/(--[a-z0-9-]+)/g, '<span class="tok-prop">$1</span>')
        .replace(/('[^']*'|"[^"]*")/g, '<span class="tok-str">$1</span>')
        .replace(/(#[0-9a-f]{3,8})\b/gi, '<span class="tok-str">$1</span>')
        .replace(/(\b\d+(?:\.\d+)?(?:px|rem|em|%|deg|s|ms)?\b)/g, '<span class="tok-num">$1</span>');
    } else if (lang === 'ts') {
      code = code
        .replace(/(\/\/[^\n]*)/g, '<span class="tok-cmt">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="tok-cmt">$1</span>')
        .replace(/\b(import|from|export|const|let|var|function|return|if|else|class|extends|new|this|typeof|as|async|await|default)\b/g, '<span class="tok-kw">$1</span>')
        .replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span class="tok-str">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="tok-num">$1</span>');
    } else if (lang === 'html') {
      code = code
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="tok-cmt">$1</span>')
        .replace(/(&lt;\/?)([a-z][a-z0-9-]*)/gi, '$1<span class="tok-kw">$2</span>')
        .replace(/([a-z-]+)(=)/g, '<span class="tok-prop">$1</span>$2')
        .replace(/("[^"]*"|'[^']*')/g, '<span class="tok-str">$1</span>');
    } else if (lang === 'json') {
      code = code
        .replace(/("[^"]+")(\s*:)/g, '<span class="tok-prop">$1</span>$2')
        .replace(/:\s*("[^"]*")/g, ': <span class="tok-str">$1</span>')
        .replace(/:\s*(\d+(?:\.\d+)?)/g, ': <span class="tok-num">$1</span>')
        .replace(/:\s*(true|false|null)/g, ': <span class="tok-kw">$1</span>');
    }
    return code;
  }

  function code(filename, lang, src) {
    const cb = el('div', {class:'code-block'});
    cb.innerHTML = `
      <div class="code-block__head">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="mono" style="font-size:10px;color:var(--ax-text-subtle)">${filename}</span>
          <span class="badge badge--neutral" style="font-size:9px">${lang.toUpperCase()}</span>
        </div>
        <button class="btn btn--ghost btn--sm copy-btn">คัดลอก</button>
      </div>
      <pre class="code-block__body"><code>${tokenize(src, lang)}</code></pre>
    `;
    const btn = cb.querySelector('.copy-btn');
    btn.addEventListener('click', () => {
      navigator.clipboard?.writeText(src);
      btn.textContent = '✓ คัดลอกแล้ว';
      setTimeout(() => btn.textContent = 'คัดลอก', 1500);
    });
    return cb;
  }

  // ═══ 31. Angular Material theme export ═══
  function themeExport() {
    const scssMain = `// aegisx-theme.scss
@use '@angular/material' as mat;
@use './aegisx-palettes' as ax;

@include mat.core();

// Light theme — maps AegisX brand tokens to Material M3
$aegisx-light: mat.define-theme((
  color: (
    theme-type: light,
    primary:   ax.$aegisx-indigo,     // brand → primary
    tertiary:  ax.$aegisx-emerald,    // success accent
    use-system-variables: true,
  ),
  typography: (
    brand-family: 'IBM Plex Sans Thai',
    plain-family: 'IBM Plex Sans Thai',
    bold-weight: 600,
    medium-weight: 500,
    regular-weight: 400,
  ),
  density: (
    scale: -1,  // compact · row height 40px
  ),
));

$aegisx-dark: mat.define-theme((
  color: (
    theme-type: dark,
    primary:   ax.$aegisx-indigo,
    tertiary:  ax.$aegisx-emerald,
  ),
  density: (scale: -1),
));

:root {
  @include mat.all-component-themes($aegisx-light);
  @include mat.system-level-colors($aegisx-light);
  @include mat.system-level-typography($aegisx-light);
}

.theme-dark {
  @include mat.all-component-colors($aegisx-dark);
  @include mat.system-level-colors($aegisx-dark);
}`;

    const scssPalettes = `// aegisx-palettes.scss
// Custom Material palettes generated from AegisX primitives
@use '@angular/material' as mat;

// Indigo (primary) · Material 500 = #3f51b5
$aegisx-indigo: (
  0:    #000000,
  10:   #1a237e,
  20:   #283593,
  25:   #2d3a98,
  30:   #303f9f,
  35:   #3644a3,
  40:   #3949ab,
  50:   #3f51b5,
  60:   #5c6bc0,
  70:   #7986cb,
  80:   #9fa8da,
  90:   #c5cae9,
  95:   #dce0f2,
  98:   #edf0fb,
  99:   #f5f7fd,
  100:  #ffffff,
);

// Emerald (tertiary/success) · 500 = #10b981
$aegisx-emerald: (
  0:    #000000,
  10:   #052e1e,
  20:   #0a4a30,
  30:   #065f46,
  40:   #047857,
  50:   #059669,
  60:   #10b981,
  70:   #34d399,
  80:   #6ee7b7,
  90:   #a7f3d0,
  95:   #d1fae5,
  98:   #ecfdf5,
  99:   #f5fef9,
  100:  #ffffff,
);`;

    const cssVars = `/* aegisx-tokens.css — CSS variable bridge
   Import AFTER Material's generated CSS to override component tokens. */

:root {
  /* Semantic tokens — used by custom components & .ng-deep overrides */
  --ax-brand-default:  #3f51b5;
  --ax-brand-emphasis: #303f9f;
  --ax-brand-faint:    #e8eaf6;
  --ax-brand-muted:    #c5cae9;
  --ax-brand-inverted: #ffffff;

  --ax-success-default:  #10b981;
  --ax-success-emphasis: #047857;
  --ax-warning-default:  #f59e0b;
  --ax-error-default:    #ef4444;

  --ax-text-heading:   #18181b;
  --ax-text-default:   #27272a;
  --ax-text-secondary: #52525b;
  --ax-text-subtle:    #71717a;

  --ax-background-page:    #fafafa;
  --ax-background-default: #ffffff;
  --ax-background-subtle:  #f4f4f5;
  --ax-background-muted:   #e4e4e7;

  --ax-border-subtle:   #e4e4e7;
  --ax-border-default:  #d4d4d8;
  --ax-border-emphasis: #a1a1aa;
  --ax-border-focus:    #3b82f6;

  /* Override Material M3 system tokens so MDC components pick up AegisX colors */
  --mat-sys-primary:            var(--ax-brand-default);
  --mat-sys-on-primary:          var(--ax-brand-inverted);
  --mat-sys-primary-container:   var(--ax-brand-faint);
  --mat-sys-on-primary-container: var(--ax-brand-emphasis);
  --mat-sys-surface:             var(--ax-background-default);
  --mat-sys-surface-container:   var(--ax-background-subtle);
  --mat-sys-on-surface:          var(--ax-text-heading);
  --mat-sys-outline:             var(--ax-border-default);
  --mat-sys-outline-variant:     var(--ax-border-subtle);
  --mat-sys-error:               var(--ax-error-default);
}

.theme-dark {
  --ax-text-heading:   #fafafa;
  --ax-text-default:   #e4e4e7;
  --ax-background-page:    #09090b;
  --ax-background-default: #18181b;
  --ax-background-subtle:  #27272a;
  --ax-border-subtle:      #27272a;
  --ax-border-default:     #3f3f46;
}`;

    const tokensJson = `{
  "\$schema": "https://aegisx.com/schemas/tokens-v1.json",
  "color": {
    "brand": {
      "default":  "#3f51b5",
      "emphasis": "#303f9f",
      "faint":    "#e8eaf6",
      "muted":    "#c5cae9",
      "inverted": "#ffffff"
    },
    "success": { "default": "#10b981", "emphasis": "#047857" },
    "warning": { "default": "#f59e0b", "emphasis": "#b45309" },
    "error":   { "default": "#ef4444", "emphasis": "#b91c1c" }
  },
  "typography": {
    "fontFamily": "IBM Plex Sans Thai",
    "baseSize": 14,
    "weights": { "regular": 400, "medium": 500, "semibold": 600 }
  },
  "density": { "scale": -1, "rowHeight": 40 },
  "radius": { "sm": 4, "md": 6, "lg": 8, "xl": 12 }
}`;

    const bundle = el('div', {class:'grid grid-2'});
    bundle.appendChild(sub('1 · Palette definitions', code('aegisx-palettes.scss', 'scss', scssPalettes)));
    bundle.appendChild(sub('2 · Theme bootstrap', code('aegisx-theme.scss', 'scss', scssMain)));

    return section('ng-theme', '31', 'Angular Material · Theme export',
      'พร้อม copy-paste เข้า Angular project ของคุณ — ไฟล์ SCSS + CSS variables + JSON spec. ใช้ Material 17+ (M3 theme API) density −1 ให้ตรงกับ compact rows ของ AegisX.',
      bundle,
      sub('3 · CSS variable bridge (ให้ :ng-deep ใช้)', code('aegisx-tokens.css', 'css', cssVars)),
      sub('4 · Tokens JSON (สำหรับ design tools / sync)', code('tokens.json', 'json', tokensJson))
    );
  }

  // ═══ 32. Angular override guide ═══
  function overrideGuide() {
    const mf = `<!-- Default Material -->
<mat-form-field appearance="outline">
  <mat-label>ชื่อผู้ป่วย</mat-label>
  <input matInput placeholder="กรอกชื่อ" />
  <mat-hint>HN จะถูกสร้างอัตโนมัติ</mat-hint>
</mat-form-field>

<!-- AegisX-styled (เพิ่ม class) -->
<mat-form-field appearance="outline" class="ax-field">
  <mat-label>ชื่อผู้ป่วย</mat-label>
  <input matInput />
</mat-form-field>`;

    const mfScss = `// form-field.scss — override 3 tokens, done.
.ax-field {
  // ลดความสูงให้ตรงกับ compact (40px)
  .mat-mdc-form-field-flex { min-height: 40px; }
  .mat-mdc-text-field-wrapper { padding: 0 10px; }

  // Focus ring + border
  --mdc-outlined-text-field-outline-color: var(--ax-border-default);
  --mdc-outlined-text-field-hover-outline-color: var(--ax-border-emphasis);
  --mdc-outlined-text-field-focus-outline-color: var(--ax-border-focus);
  --mdc-outlined-text-field-label-text-color: var(--ax-text-subtle);
  --mdc-outlined-text-field-input-text-color: var(--ax-text-heading);
  --mdc-outlined-text-field-container-shape: 6px;
}`;

    const btnHtml = `<!-- Primary -->
<button mat-flat-button class="ax-btn ax-btn--primary">บันทึก</button>

<!-- Secondary (stroked) -->
<button mat-stroked-button class="ax-btn ax-btn--secondary">ยกเลิก</button>

<!-- Icon -->
<button mat-icon-button class="ax-btn-icon">
  <mat-icon>edit</mat-icon>
</button>`;

    const btnScss = `.ax-btn {
  // Shared — compact height 32px
  --mdc-filled-button-container-height: 32px;
  --mdc-outlined-button-container-height: 32px;
  --mdc-filled-button-label-text-tracking: 0;
  --mdc-filled-button-container-shape: 6px;
  font-family: var(--ax-font-base) !important;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0;
  padding: 0 12px !important;
}

.ax-btn--primary {
  --mdc-filled-button-container-color: var(--ax-brand-default);
  --mdc-filled-button-label-text-color: var(--ax-brand-inverted);
  &:hover {
    --mdc-filled-button-container-color: var(--ax-brand-emphasis);
  }
}

.ax-btn--secondary {
  --mdc-outlined-button-outline-color: var(--ax-border-default);
  --mdc-outlined-button-label-text-color: var(--ax-text-heading);
  background: var(--ax-background-default);
  &:hover { background: var(--ax-background-subtle); }
}`;

    const tableHtml = `<table mat-table [dataSource]="patients" class="ax-table">
  <ng-container matColumnDef="hn">
    <th mat-header-cell *matHeaderCellDef>HN</th>
    <td mat-cell *matCellDef="let p"><span class="mono">{{p.hn}}</span></td>
  </ng-container>
  <!-- ...other columns... -->
</table>`;

    const tableScss = `.ax-table {
  width: 100%;
  background: var(--ax-background-default) !important;

  // Header
  .mat-mdc-header-cell {
    background: var(--ax-background-subtle);
    font-family: var(--ax-font-mono);
    font-size: 10px;
    font-weight: 600;
    color: var(--ax-text-subtle);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-bottom: 1px solid var(--ax-border-subtle);
    padding: 8px 12px;
    height: 34px;
  }

  // Body · compact 40px rows
  .mat-mdc-cell {
    font-size: 13px;
    color: var(--ax-text-default);
    padding: 8px 12px;
    border-bottom: 1px solid var(--ax-border-subtle);
    height: 40px;
  }

  .mat-mdc-row:hover {
    background: var(--ax-background-subtle);
  }
}`;

    const chipScss = `// Chips → AegisX chips (pill · faint bg · solid text)
.ax-chip-set {
  .mat-mdc-chip {
    --mdc-chip-container-height: 22px;
    --mdc-chip-label-text-size: 11px;
    --mdc-chip-container-shape: 9999px;
    background: var(--ax-background-subtle);
    color: var(--ax-text-default);
    border: 1px solid var(--ax-border-subtle);
  }
  .mat-mdc-chip.ax-chip--brand {
    background: var(--ax-brand-faint);
    color: var(--ax-brand-emphasis);
    border-color: transparent;
  }
  .mat-mdc-chip.ax-chip--success {
    background: var(--ax-success-faint);
    color: var(--ax-success-emphasis);
  }
  .mat-mdc-chip.ax-chip--warning {
    background: var(--ax-warning-faint);
    color: var(--ax-warning-emphasis);
  }
}`;

    const dialogScss = `// Dialog · compact padding + AegisX shadow
.ax-dialog {
  --mdc-dialog-container-shape: 10px;
  --mdc-dialog-container-elevation: 0;

  .mat-mdc-dialog-surface {
    border: 1px solid var(--ax-border-subtle);
    box-shadow: var(--ax-shadow-lg) !important;
  }
  .mat-mdc-dialog-title {
    font-family: var(--ax-font-base) !important;
    font-size: 17px !important;
    font-weight: 600;
    color: var(--ax-text-heading);
    padding: 18px 24px 4px;
  }
  .mat-mdc-dialog-content {
    font-size: 13px;
    color: var(--ax-text-default);
    padding: 14px 24px 20px !important;
  }
  .mat-mdc-dialog-actions {
    padding: 12px 24px;
    background: var(--ax-background-page);
    border-top: 1px solid var(--ax-border-subtle);
  }
}

// Open with custom panel class:
// this.dialog.open(MyDialog, { panelClass: 'ax-dialog' });`;

    const menuScss = `.ax-menu {
  --mat-menu-container-color: var(--ax-background-default);
  --mat-menu-container-shape: 6px;

  .mat-mdc-menu-content { padding: 4px !important; }
  .mat-mdc-menu-item {
    min-height: 32px !important;
    font-size: 13px !important;
    padding: 0 8px !important;
    border-radius: 4px;
    .mat-icon { color: var(--ax-text-subtle); }
  }
  .mat-mdc-menu-item:hover {
    background: var(--ax-background-subtle) !important;
  }
}`;

    // Quick-reference table of overridable MDC tokens
    const tokenRef = el('div');
    const tbl = el('table', {class:'ax-table', style:'width:100%;font-size:12px;border-collapse:collapse'});
    tbl.innerHTML = `
      <thead><tr>
        <th style="text-align:left;padding:8px 12px;background:var(--ax-background-subtle);font-size:10px;font-family:var(--ax-font-mono);color:var(--ax-text-subtle);text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid var(--ax-border-subtle)">Component</th>
        <th style="text-align:left;padding:8px 12px;background:var(--ax-background-subtle);font-size:10px;font-family:var(--ax-font-mono);color:var(--ax-text-subtle);text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid var(--ax-border-subtle)">MDC token prefix</th>
        <th style="text-align:left;padding:8px 12px;background:var(--ax-background-subtle);font-size:10px;font-family:var(--ax-font-mono);color:var(--ax-text-subtle);text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid var(--ax-border-subtle)">Map to</th>
      </tr></thead>
      <tbody>
        ${[
          ['Button (flat)', '--mdc-filled-button-*', 'brand-default / brand-inverted'],
          ['Button (stroked)', '--mdc-outlined-button-*', 'border-default / text-heading'],
          ['Form field', '--mdc-outlined-text-field-*', 'border-default → border-focus'],
          ['Checkbox', '--mdc-checkbox-*', 'brand-default (selected)'],
          ['Radio', '--mdc-radio-*', 'brand-default'],
          ['Slide toggle', '--mdc-switch-*', 'brand-default'],
          ['Dialog', '--mdc-dialog-*', 'background + shadow-lg'],
          ['Snackbar', '--mdc-snackbar-*', 'zinc-900 bg / zinc-50 text'],
          ['Tab', '--mdc-secondary-navigation-tab-*', 'brand-default underline'],
          ['Chip', '--mdc-chip-*', '{role}-faint / {role}-emphasis'],
          ['Table', '.mat-mdc-cell / .mat-mdc-header-cell', 'ax-table overrides'],
          ['Menu', '--mat-menu-*', 'background-default / text-heading'],
          ['Progress bar', '--mdc-linear-progress-*', 'brand-default / background-muted'],
          ['Spinner', '--mdc-circular-progress-*', 'brand-default'],
          ['Tooltip', '--mdc-plain-tooltip-*', 'zinc-900'],
          ['Stepper', '--mat-stepper-*', 'brand-default (active)'],
        ].map(r => `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid var(--ax-border-subtle);font-weight:500;color:var(--ax-text-heading)">${r[0]}</td>
            <td style="padding:8px 12px;border-bottom:1px solid var(--ax-border-subtle);font-family:var(--ax-font-mono);font-size:11px;color:var(--ax-brand-emphasis)">${r[1]}</td>
            <td style="padding:8px 12px;border-bottom:1px solid var(--ax-border-subtle);color:var(--ax-text-secondary)">${r[2]}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    tokenRef.appendChild(tbl);

    return section('ng-override', '32', 'Angular Material · Override recipes',
      'ชุด SCSS สำเร็จรูปสำหรับ override Material components ให้เป็น AegisX style — ใช้ MDC token (CSS variables) แทน ::ng-deep deep hacks.',
      sub('Form field · outlined', (()=>{
        const w = el('div', {class:'grid grid-2'});
        w.appendChild(code('template.html', 'html', mf));
        w.appendChild(code('form-field.scss', 'scss', mfScss));
        return w;
      })()),
      sub('Button · flat + stroked', (()=>{
        const w = el('div', {class:'grid grid-2'});
        w.appendChild(code('button.html', 'html', btnHtml));
        w.appendChild(code('button.scss', 'scss', btnScss));
        return w;
      })()),
      sub('Table · compact 40px', (()=>{
        const w = el('div', {class:'grid grid-2'});
        w.appendChild(code('table.html', 'html', tableHtml));
        w.appendChild(code('table.scss', 'scss', tableScss));
        return w;
      })()),
      sub('Chips · role variants', code('chips.scss', 'scss', chipScss)),
      sub('Dialog · compact padding', code('dialog.scss', 'scss', dialogScss)),
      sub('Menu · dropdown', code('menu.scss', 'scss', menuScss)),
      sub('Reference · MDC token map (คู่มือ override)', tokenRef)
    );
  }

  // ═══ 33. Quick start ═══
  function quickstart() {
    const steps = [
      ['1','ติดตั้ง Material', 'ng add @angular/material\nng add @angular/cdk\nnpm install @aegisx/tokens', 'bash'],
      ['2','Import theme', `// angular.json → styles[]
"src/styles/aegisx-theme.scss",
"src/styles/aegisx-tokens.css"`, 'json'],
      ['3','Import fonts', `<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet">`, 'html'],
      ['4','ใช้งาน component', `<button mat-flat-button class="ax-btn ax-btn--primary">
  บันทึก
</button>`, 'html'],
      ['5','Toggle dark mode', `// app.component.ts
toggleTheme() {
  document.documentElement.classList.toggle('theme-dark');
}`, 'ts']
    ];

    const w = el('div', {style:'display:flex;flex-direction:column;gap:24px'});
    steps.forEach(([n, title, src, lang]) => {
      const row = el('div', {style:'display:grid;grid-template-columns:40px 1fr;gap:16px;align-items:start'});
      const circle = el('div', {class:'stepper__circle', style:'background:var(--ax-brand-faint);color:var(--ax-brand-emphasis);width:32px;height:32px;font-size:12px'});
      circle.textContent = n;
      row.appendChild(circle);
      const body = el('div');
      body.appendChild(el('h4', {style:'margin:4px 0 10px;font-size:14px;font-weight:600;color:var(--ax-text-heading)'}, title));
      body.appendChild(code('step-' + n, lang, src));
      row.appendChild(body);
      w.appendChild(row);
    });

    return section('ng-quickstart', '33', 'Angular · Quick start',
      '5 ขั้นตอนสำหรับทำให้ Angular Material ของคุณกลายเป็น AegisX-styled ภายใน 10 นาที.',
      sub('Integration walkthrough', w)
    );
  }

  // ═══ Build ═══
  const root = document.getElementById('sections-handoff') || document.getElementById('sections-advanced') || document.getElementById('sections');
  [quickstart, themeExport, overrideGuide].forEach(fn => {
    try { root.appendChild(fn()); } catch (e) { console.error(fn.name, e); }
  });
})();
