# Angular Material `mat-form-field` override — field notes

Overriding `mat-form-field` is **much harder** than the other Material
components because its internal DOM is a 5-layer stack that's all
interdependent. Read this before changing anything in the form-field
rules under `tokens/scss/aegisx-material-overrides.scss`.

## Internal DOM (v20)

```
.mat-mdc-form-field                     // outer wrapper + subscript area
├── .mat-mdc-text-field-wrapper         // text field box
│   ├── .mat-mdc-form-field-focus-overlay
│   ├── .mat-mdc-form-field-flex        // flex row: prefix | infix | suffix
│   │   ├── .mat-mdc-form-field-icon-prefix
│   │   ├── .mat-mdc-form-field-infix   // input area
│   │   │   ├── .mat-mdc-form-field-text-prefix
│   │   │   ├── input.mat-mdc-input-element
│   │   │   ├── .mat-mdc-form-field-text-suffix
│   │   │   └── .mdc-floating-label     // position: absolute → float-above
│   │   └── .mat-mdc-form-field-icon-suffix
│   └── .mdc-notched-outline            // 3-part: leading · notch · trailing
└── .mat-mdc-form-field-subscript-wrapper  // hint / error / character-count
```

## What NOT to do

| Anti-pattern | What breaks |
|---|---|
| `height: 40px` on `.mat-mdc-text-field-wrapper` | Notched outline geometry breaks (label notch misaligned) · prefix/suffix icons misalign · floating label position wrong |
| `padding: 0 10px` on `.mat-mdc-text-field-wrapper` | Input scroll-bar area clipped · suffix icon overlaps input text · notched-outline leading/trailing gap broken |
| `min-height` on `.mat-mdc-form-field-infix` | Conflicts with floating-label's absolute-positioned `top` |
| Hard-set `height: auto` on textarea variants | Textarea grows fine but label doesn't float up properly |
| Override `--mdc-outlined-text-field-container-shape` per class | Fine — this one is safe (single token) |

## What to do instead

**Size comes from Material's density scale, not from our CSS.** Set
`density: (scale: -N)` in `aegisx-material-theme.scss`. Each N step
subtracts ~4px from form-field container height:

| density | Form-field height |
|:---:|:---:|
| 0 | 56px |
| -1 | 52px |
| **-2** | **48px** ← AegisX default |
| -3 | 44px |
| -4 | 40px |
| -5 | 36px |

Our `.ax-control-h` token must match whichever density we pick — that's
the "align `.ax-*` to Material" rule. Bumping density = bumping
`tokens/dtcg/component.json::control.height.md`.

## Safe overrides (what we actually do)

These don't touch layout, only color / font / shape / sub-text. Cascade
via `:root` or the component selector:

- `--mdc-outlined-text-field-outline-color` (idle border)
- `--mdc-outlined-text-field-hover-outline-color`
- `--mdc-outlined-text-field-focus-outline-color`
- `--mdc-outlined-text-field-error-outline-color`
- `--mdc-outlined-text-field-label-text-color`
- `--mdc-outlined-text-field-input-text-color`
- `--mdc-outlined-text-field-input-text-placeholder-color`
- `--mdc-outlined-text-field-disabled-*`
- `--mdc-outlined-text-field-container-shape` (radius)
- `--mat-form-field-container-text-font/-size/-line-height/-weight`
- `--mat-form-field-subscript-text-*`
- `--mat-form-field-outlined-label-text-populated-size`

## Floating label vs static label

Material's `<mat-label>` is **absolutely positioned and animated** between:
- Rest state: centered vertically inside the notched outline, padding mimics input
- Float-above: translated up to notch, size scales to 75%

If the consumer puts a separate `<label>` outside the form-field (the
"label above + field below" pattern we use in `.ax-field`), **do not use
`<mat-label>`** — two labels collide. Either:

- Add `aria-label` to `<input matInput>` and omit `<mat-label>` entirely, OR
- Use `.cdk-visually-hidden` on a `<mat-label>` for screen-reader only

Our demo uses option 1.

## Focus ring — one layer only

Material's outlined form-field already animates its notched outline from
1px to 2px on focus, using `--mdc-outlined-text-field-focus-outline-color`.
**Do not add an extra `outline:` on `.mat-mdc-text-field-wrapper`** — that
draws a second ring around the first.

## Error state

Material drives error state via the `.mat-form-field-invalid` class AND
the MDC `aria-invalid='true'` attribute on the input. Colors come from
`--mdc-outlined-text-field-error-outline-color` and
`--mat-form-field-error-text-color` — both already aliased to
`var(--ax-error-default) / var(--ax-error-emphasis)` in our override.

Don't try to style `.mat-mdc-form-field-error` directly — its position is
part of the subscript wrapper and the padding is Material's concern.

## When adding a new form-field override

1. Inspect the rendered DOM in devtools to see which layer owns the
   visual property.
2. Look for the `--mdc-*` or `--mat-*` custom property that controls it.
3. Alias that token to `var(--ax-*)` in overrides. Never hard-code hex.
4. Test at every density (-4 → 0), both themes, with: empty state,
   filled, focus, hover, disabled, readonly, error, prefix icon, suffix
   icon, textarea, long placeholder, Thai characters.
5. If a single-token override doesn't reach — stop. The behaviour is
   probably wired through multiple properties or CDK infrastructure.
   Changing layout CSS directly will break something downstream.

## References

- Angular Material source:
  [@angular/material/form-field](https://github.com/angular/components/tree/main/src/material/form-field)
- M3 form-field spec:
  [m3.material.io/components/text-fields/specs](https://m3.material.io/components/text-fields/specs)
- MDC token reference:
  [material-components/material-components-web](https://github.com/material-components/material-components-web/tree/master/packages/mdc-textfield)
