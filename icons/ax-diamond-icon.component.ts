// libs/shared/ui/icons/src/lib/ax-diamond-icon.component.ts
// Diamond icon wrapper — ใช้ CSS แทน SVG diamond shape
// ลด 134 SVG files → 0 files

import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type DiamondSize = 'sm' | 'md' | 'lg' | 'xl';
export type DiamondTheme = 'dark' | 'light';

/**
 * Diamond icon wrapper component
 *
 * @example
 * ```html
 * <!-- Dark nav -->
 * <ax-diamond-icon icon="inv-warehouse" bg="#065f46" border="#10b981" theme="dark" />
 *
 * <!-- Light app launcher -->
 * <ax-diamond-icon icon="inv-warehouse" bg="#ecfdf5" border="#a7f3d0" theme="light" />
 *
 * <!-- ใช้กับ color map -->
 * <ax-diamond-icon
 *   [icon]="app.icon"
 *   [bg]="app.diamond.bg"
 *   [border]="app.diamond.border"
 *   [iconColor]="app.diamond.stroke"
 *   [theme]="isDarkNav ? 'dark' : 'light'"
 *   [size]="'lg'"
 * />
 * ```
 */
@Component({
  selector: 'ax-diamond-icon',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div
      class="ax-diamond"
      [class]="sizeClass()"
      [style.--diamond-bg]="bg()"
      [style.--diamond-border]="border()"
    >
      <div class="ax-diamond__inner">
        <mat-icon
          [svgIcon]="icon()"
          [style.color]="iconColor()"
          [class]="iconSizeClass()"
        />
      </div>
    </div>
  `,
  styles: [`
    :host { display: inline-flex; }

    .ax-diamond {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .ax-diamond__inner {
      transform: rotate(45deg);
      border-radius: var(--diamond-radius, 10px);
      background: var(--diamond-bg, #1e3a5f);
      border: 0.5px solid color-mix(in srgb, var(--diamond-border, #3b82f6) 40%, transparent);
      display: flex;
      align-items: center;
      justify-content: center;

      mat-icon {
        transform: rotate(-45deg);
      }
    }

    /* Sizes */
    .ax-diamond--sm .ax-diamond__inner {
      width: 28px; height: 28px;
      --diamond-radius: 7px;
    }
    .ax-diamond--md .ax-diamond__inner {
      width: 32px; height: 32px;
      --diamond-radius: 8px;
    }
    .ax-diamond--lg .ax-diamond__inner {
      width: 36px; height: 36px;
      --diamond-radius: 10px;
    }
    .ax-diamond--xl .ax-diamond__inner {
      width: 44px; height: 44px;
      --diamond-radius: 12px;
    }
  `],
})
export class AxDiamondIconComponent {
  icon = input.required<string>();
  bg = input<string>('#1e3a5f');
  border = input<string>('#3b82f6');
  iconColor = input<string>('#93c5fd');
  size = input<DiamondSize>('lg');
  theme = input<DiamondTheme>('dark');

  sizeClass = computed(() => `ax-diamond ax-diamond--${this.size()}`);

  iconSizeClass = computed(() => {
    const map: Record<DiamondSize, string> = {
      sm: '!w-3.5 !h-3.5',
      md: '!w-4 !h-4',
      lg: '!w-5 !h-5',
      xl: '!w-6 !h-6',
    };
    return map[this.size()];
  });
}
