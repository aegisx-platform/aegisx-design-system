# Migrating `@aegisx/ui` to consume `@aegisx-platform/design-system`

`@aegisx/ui` (Nx + ng-packagr Angular library, v0.4.1) currently carries
its own copies of icon data, registry, and colour maps in
`libs/aegisx-ui/src/lib/components/navigation/icon/`. Those copies should
become a thin re-export layer over `@aegisx-platform/design-system`.

This is a **drop-in migration** — public exports of `@aegisx/ui` stay
the same so consumer apps (`apps/web`) need no code changes.

---

## Why design-system ships icons two ways

| Subpath | What it ships | Who imports it |
|---------|--------------|----------------|
| `@aegisx-platform/design-system/icons/data` | SVG markup as TS string-literal map (`AEGISX_ICON_DATA`, `AEGISX_FEATURED_ICON_DATA`) | Angular libs that register via `MatIconRegistry.addSvgIconLiteral` (no HTTP) — **what aegisx-ui uses** |
| `@aegisx-platform/design-system/assets/icons/*.svg` | Raw `.svg` files via package `exports` | Apps that prefer Angular CLI asset globs / `addSvgIcon(url)` |
| `@aegisx-platform/design-system/icons/color-map` | `ICON_COLOR_MAP` + `getIconClasses()` | Anyone styling an icon badge |
| `@aegisx-platform/design-system/icons/diamond` | `DIAMOND_COLOR_MAP` + `getDiamondColors()` | Diamond app-icon usage |
| `@aegisx-platform/design-system/icons/registry` | `AegisxIconRegistry` Angular service | Apps initialising the registry directly |

Pick **one** consumption model per project. `aegisx-ui` should stick with
the **inline-literal** model it already uses.

---

## Step-by-step migration

### 1. Add the dependency

In the `aegisx-starter-1` workspace root:

```bash
# Set up GitHub Packages auth once per workspace
cat >> .npmrc <<'EOF'
@aegisx-platform:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
EOF

pnpm add @aegisx-platform/design-system --filter @aegisx/ui
```

### 2. Replace the duplicated source files

Inside `libs/aegisx-ui/src/lib/components/navigation/icon/`:

**`aegisx-icon-registry.ts`** — keep the class, swap inline data for the
upstream constants:

```ts
import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  AEGISX_ICON_DATA,
  AEGISX_FEATURED_ICON_DATA,
} from '@aegisx-platform/design-system/icons/data';

@Injectable({ providedIn: 'root' })
export class AegisxIconRegistry {
  private readonly registry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  registerAll(): void {
    for (const [name, svg] of Object.entries(AEGISX_ICON_DATA)) {
      this.registry.addSvgIconLiteralInNamespace(
        'ax', name, this.sanitizer.bypassSecurityTrustHtml(svg) as SafeHtml,
      );
    }
    for (const [name, svg] of Object.entries(AEGISX_FEATURED_ICON_DATA)) {
      this.registry.addSvgIconLiteralInNamespace(
        'axf', name, this.sanitizer.bypassSecurityTrustHtml(svg) as SafeHtml,
      );
    }
  }
}
```

**`icon-color-map.ts`**, **`diamond-color-map.ts`**, **`ax-diamond-icon.component.ts`** — replace each file's body with a one-line re-export:

```ts
// icon-color-map.ts
export * from '@aegisx-platform/design-system/icons/color-map';
```

```ts
// diamond-color-map.ts
export * from '@aegisx-platform/design-system/icons/diamond';
```

```ts
// ax-diamond-icon.component.ts
export * from '@aegisx-platform/design-system/icons/diamond-component';
```

**Delete:**
- `aegisx-icon-data.ts` (153-icon string blob)
- `aegisx-icon-featured-data.ts` (10-icon featured blob)

The barrel `libs/aegisx-ui/src/index.ts` still re-exports the same
symbols, so `import { AegisxIconRegistry, ICON_COLOR_MAP } from '@aegisx/ui'`
keeps working.

### 3. Remove the duplicate inside `apps/web`

`apps/web/src/assets/icons/aegisx/icon-color-map.ts` is a verbatim
duplicate of the libs/ version (just reformatted). Delete it. Anything
in the app importing it should switch to `import … from '@aegisx/ui'`.

Same for the SVG copies under `apps/web/src/assets/icons/aegisx/svg/*` —
nothing references them at runtime (the inline-literal registry doesn't
load by URL), so they can be deleted entirely.

### 4. Logo / brand assets

`apps/web/src/assets/images/logo/aegisx-logo-*.svg` (8 files) — `apps/web`
currently uses these by URL. Two options:

**Option A (recommended)** — copy from the design-system package via Nx
asset glob in `apps/web/project.json`:

```json
"assets": [
  {
    "glob": "**/*",
    "input": "{workspaceRoot}/node_modules/@aegisx-platform/design-system/logo",
    "output": "assets/logo"
  }
]
```

Then `<img src="assets/logo/horizontal-light.svg">` keeps working with
zero markup changes.

**Option B** — leave them alone for now, but add the missing
`horizontal-mono-inverse.svg` so the lockup is complete.

### 5. Bump aegisx-ui

```bash
nx release version --specifier patch --projects @aegisx/ui
```

Suggested version: `0.5.0` (minor — internal source restructure, public
API unchanged).

### 6. Verify

```bash
nx build @aegisx/ui      # ng-packagr should rebuild cleanly
nx serve web             # icons render in the browser
```

If any icon name is missing in `AEGISX_ICON_DATA`, add the SVG to
`aegisx-design-system/icons/svg/`, run `pnpm run gen:icon-data` there,
publish a patch, and bump the dep — never re-add icons inline in
aegisx-ui.

---

## What stays in `@aegisx/ui`

- **`AegisxIconRegistry` Angular service** — Angular DI lives here, design-system stays framework-agnostic in TS.
- **All UI components, layouts, widgets** — design-system has no Angular components except the small `<ax-diamond-icon>` (re-exported for parity).
- **SCSS theme files** under `src/lib/styles/` — workspace-level theme tokens stay where ng-packagr can copy them.

## What lives in `@aegisx-platform/design-system`

- Source SVG icons (`icons/svg/`, `icons/featured-error/`, `icons/svg-sprite/`)
- Logo lockups + favicons + PNG exports (`logo/`)
- Brand background pattern (`brand/`)
- Authoritative specs (`specs/`)
- Generated TS data (`icons/data/`) and colour maps (`icons/icon-color-map.ts`, `icons/diamond-color-map.ts`)
- The diamond icon Angular component (kept here so apps can use it without `@aegisx/ui`)
