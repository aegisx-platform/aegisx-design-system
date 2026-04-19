import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

interface TestRow { id: string; label: string; mat: string; ax: string; }

@Component({
  selector: 'ax-demo-root',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatCheckboxModule, MatRadioModule, MatSlideToggleModule,
    MatSliderModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatChipsModule, MatCardModule, MatTabsModule, MatMenuModule,
    MatBadgeModule, MatTooltipModule, MatDividerModule, MatExpansionModule,
    MatToolbarModule, MatListModule, MatPaginatorModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly theme = signal<'light' | 'dark'>('light');
  readonly density = signal<'compact' | 'comfortable' | 'spacious'>('comfortable');

  toggleTheme(): void {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
  }

  setDensity(value: 'compact' | 'comfortable' | 'spacious'): void {
    this.density.set(value);
    document.documentElement.setAttribute('data-density', value);
  }

  readonly rows: TestRow[] = [
    { id: 'button',      label: 'Button',         mat: 'mat-flat-button',       ax: '.ax-button--primary' },
    { id: 'outlined',    label: 'Outlined button', mat: 'mat-stroked-button',   ax: '.ax-button--outline' },
    { id: 'icon-btn',    label: 'Icon button',    mat: 'mat-icon-button',       ax: '.ax-button--icon' },
    { id: 'input',       label: 'Input',          mat: 'mat-form-field + mat-input', ax: '.ax-field + .ax-input' },
    { id: 'select',      label: 'Select',         mat: 'mat-select',            ax: '.ax-select' },
    { id: 'checkbox',    label: 'Checkbox',       mat: 'mat-checkbox',          ax: '.ax-checkbox' },
    { id: 'radio',       label: 'Radio',          mat: 'mat-radio-group',       ax: '.ax-radio-group' },
    { id: 'toggle',      label: 'Slide toggle',   mat: 'mat-slide-toggle',      ax: '.ax-toggle' },
    { id: 'slider',      label: 'Slider',         mat: 'mat-slider',            ax: '.ax-slider' },
    { id: 'chip',        label: 'Chip',           mat: 'mat-chip',              ax: '.ax-chip' },
    { id: 'progress',    label: 'Progress',       mat: 'mat-progress-bar',      ax: '.ax-progress' },
    { id: 'card',        label: 'Card',           mat: 'mat-card',              ax: '.ax-card' },
    { id: 'tabs',        label: 'Tabs',           mat: 'mat-tab-group',         ax: '.ax-tabs' }
  ];
}
