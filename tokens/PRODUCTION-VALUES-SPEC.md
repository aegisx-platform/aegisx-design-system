# Production Token Values — extracted from aegisx-ui _aegisx-tokens.scss

> **Source:** `aegisx-starter-1/libs/aegisx-ui/src/lib/styles/themes/_aegisx-tokens.scss`
> **Read:** 2026-04-16
> **Purpose:** These are the REAL values. `tokens.css` must match these exactly.

## Values that DIFFER from current tokens.css

### Spacing (current tokens.css is WRONG for md)
```
--ax-spacing-2xs: 0.125rem   (2px)    ← MISSING in tokens.css
--ax-spacing-xs:  0.25rem    (4px)    ✓ matches
--ax-spacing-sm:  0.5rem     (8px)    ✓ matches
--ax-spacing-md:  1rem       (16px)   ✗ tokens.css has 0.75rem (12px)
--ax-spacing-lg:  1.5rem     (24px)   ✓ matches
--ax-spacing-xl:  2rem       (32px)   ✓ matches
--ax-spacing-2xl: 2.5rem     (40px)   ✗ tokens.css has 2rem (32px)
--ax-spacing-3xl: 3rem       (48px)   ✓ matches
--ax-spacing-4xl: 4rem       (64px)   ✓ matches
```

### Radius (current tokens.css is WRONG — all shifted)
```
--ax-radius-sm:   0.25rem    (4px)    ✓ matches (was xs before)
--ax-radius-md:   0.375rem   (6px)    ✗ tokens.css has 0.5rem (8px)
--ax-radius-lg:   0.5rem     (8px)    ✗ tokens.css has 0.75rem (12px)
--ax-radius-xl:   0.75rem    (12px)   ✗ tokens.css has 1rem (16px)
--ax-radius-2xl:  1rem       (16px)   ← MISSING in tokens.css
--ax-radius-full: 9999px     ✓ matches
```

### Brand colors (MAJOR — current uses Tailwind Indigo, production uses Material Indigo)
```
Light:
--ax-brand-faint:    #e8eaf6   ✗ tokens.css has #eef2ff (Tailwind indigo-50)
--ax-brand-muted:    #9fa8da   ✗ tokens.css has #e0e7ff
--ax-brand-subtle:   #7986cb   ✗ tokens.css has #c7d2fe
--ax-brand-default:  #3f51b5   ✗ tokens.css has #6366f1 (COMPLETELY DIFFERENT)
--ax-brand-emphasis: #303f9f   ✗ tokens.css has #4338ca
--ax-brand-inverted: #ffffff   ✓ matches

Dark:
--ax-brand-faint:    #1a237e
--ax-brand-muted:    #283593
--ax-brand-subtle:   #303f9f
--ax-brand-default:  #5c6bc0
--ax-brand-emphasis: #9fa8da
--ax-brand-inverted: #1a237e
```

### Status colors (different from tokens.css)
```
Success:
  light-default: #10b981   ✗ tokens.css has #22c55e
  light-faint:   #d1fae5   ✗ tokens.css has #f0fdf4

Warning:
  light-default: #f59e0b   ✓ matches
  light-faint:   #fef3c7   ✗ tokens.css has #fffbeb

Error:
  light-default: #ef4444   ✓ matches
  light-faint:   #fee2e2   ✗ tokens.css has #fef2f2

Info:
  light-default: #3b82f6   ✓ matches
  light-faint:   #dbeafe   ✗ tokens.css has #eff6ff
```

### Extra colors NOT in current tokens.css
```
Cyan:   faint=#cffafe  default=#06b6d4  emphasis=#0891b2
Purple: faint=#f3e8ff  default=#9333ea  emphasis=#7e22ce
Indigo: faint=#e0e7ff  default=#6366f1  emphasis=#4f46e5
Pink:   faint=#fce7f3  default=#ec4899  emphasis=#db2777
```

### Text colors (subtle difference)
```
--ax-text-disabled: #a1a1aa   ✓ matches (Zinc-400)
--ax-text-subtle:   #a1a1aa   ✓ matches (Zinc-400)
--ax-text-secondary:#71717a   ✓ matches (Zinc-500)
--ax-text-primary:  #3f3f46   ✓ matches (Zinc-700)
--ax-text-heading:  #0a0a0a   ✗ tokens.css has #09090b (Zinc-950 vs almost-black)
--ax-text-inverted: #fafafa   ✓ matches
```

### Background (dark theme uses Tremor palette, NOT Zinc)
```
Dark backgrounds:
  muted:    #131a2b   ✗ tokens.css uses Zinc-700 (#3f3f46)
  subtle:   #1f2937   ✗ tokens.css uses Zinc-800 (#27272a)
  default:  #111827   ✗ tokens.css uses Zinc-900 (#18181b)
  emphasis: #d1d5db   ✗ tokens.css uses Zinc-600 (#52525b)
```

### Dark text (uses Gray scale, NOT Zinc)
```
  disabled:  #4b5563  Gray-600   ✗ tokens.css uses Zinc-600 (#52525b)
  subtle:    #6b7280  Gray-500   ✗ tokens.css uses Zinc-500 (#71717a)
  secondary: #9ca3af  Gray-400   ✗ tokens.css uses Zinc-400 (#a1a1aa)
  primary:   #d1d5db  Gray-300   ✗ tokens.css uses #e5e5e5
  heading:   #f3f4f6  Gray-100   ✗ tokens.css uses Zinc-50 (#fafafa)
  inverted:  #111827  Gray-900   ✗ tokens.css uses Zinc-950 (#09090b)
```

### Z-index (COMPLETELY different scale)
```
--ax-z-base:     0       ✓ matches
--ax-z-dropdown: 1000    ✗ tokens.css has 100
--ax-z-sticky:   1100    ✗ tokens.css has 200
--ax-z-fixed:    1200    ← MISSING in tokens.css
--ax-z-overlay:  1300    ✗ tokens.css has 300
--ax-z-modal:    1400    ✗ tokens.css has 400
--ax-z-toast:    1500    ✗ tokens.css has 600
```

### Focus ring (different approach)
```
Production: width=2px, offset=2px, opacity=0.5, color=#3b82f6
tokens.css: box-shadow 0 0 0 3px rgb(99 102 241 / 0.18)
```

### Shadows (production values are slightly different)
```
sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)         ✗ tokens.css uses (16 24 40 / 0.05)
md: 0 4px 6px -1px + 0 2px 4px -2px        ✗ different offsets
lg: 0 10px 15px -3px + 0 4px 6px -4px      ✗ different offsets
```

### Additional production tokens NOT in current tokens.css
```
Form layout:
  --ax-form-gap-dense:     0.75rem   (12px)
  --ax-form-gap-default:   1rem      (16px)
  --ax-form-gap-relaxed:   1rem      (16px)
  --ax-form-section-gap:   2.5rem    (40px)
  --ax-form-card-padding:  0.75rem   (12px)

Surface/border (per-role):
  --ax-info-surface, --ax-info-border
  --ax-warning-surface, --ax-warning-border
  --ax-success-surface, --ax-success-border
  --ax-error-surface, --ax-error-border

State layers:
  --ax-state-hover-opacity:   0.08
  --ax-state-focus-opacity:   0.12
  --ax-state-pressed-opacity: 0.12
  --ax-state-dragged-opacity: 0.16

M3 Motion:
  instant: 0ms, short1: 50ms, short2: 100ms
  medium1: 250ms, medium2: 300ms
  long1: 400ms, long2: 500ms

M3 Easing:
  standard:    cubic-bezier(0.2, 0, 0, 1)
  emphasized:  cubic-bezier(0.2, 0, 0, 1)
  decelerated: cubic-bezier(0, 0, 0, 1)
  accelerated: cubic-bezier(0.3, 0, 1, 1)

Color levels (50-900 for each role):
  --ax-success-50 through --ax-success-900
  --ax-warning-50 through --ax-warning-900
  etc.

Opacity:
  --ax-opacity-disabled: 0.4
  --ax-opacity-hover: 0.8
  --ax-opacity-active: 0.6

Border:
  --ax-border-thin: 1px
  --ax-border-default: 1px
  --ax-border-thick: 2px

Grid:
  --ax-grid-columns: 12
  --ax-grid-gutter: 24px

Accessibility:
  --ax-a11y-touch-target-min: 48px
  --ax-a11y-text-min-contrast: 4.5 (AA)
  --ax-a11y-text-enhanced-contrast: 7 (AAA)
```

## Action for next session

1. Rewrite ALL dtcg/*.json to match these production values
2. Regenerate tokens.css from updated JSON
3. Update components.css to use correct values
4. Verify with `pnpm tokens:verify`
