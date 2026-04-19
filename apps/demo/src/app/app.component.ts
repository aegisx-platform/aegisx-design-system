import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTableModule } from '@angular/material/table';

type Theme = 'light' | 'dark';
type Density = 'compact' | 'comfortable' | 'spacious';

@Component({
  selector: 'ax-demo-root',
  standalone: true,
  imports: [
    FormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatAutocompleteModule, MatCheckboxModule, MatRadioModule,
    MatSlideToggleModule, MatSliderModule, MatDatepickerModule, MatNativeDateModule,
    MatProgressBarModule, MatProgressSpinnerModule, MatChipsModule, MatCardModule,
    MatTabsModule, MatMenuModule, MatBadgeModule, MatTooltipModule, MatDividerModule,
    MatExpansionModule, MatToolbarModule, MatListModule, MatPaginatorModule,
    MatStepperModule, MatDialogModule, MatSnackBarModule, MatBottomSheetModule,
    MatTableModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly bottomSheet = inject(MatBottomSheet);

  readonly theme = signal<Theme>('light');
  readonly density = signal<Density>('comfortable');

  // form-control values for live binding
  readonly sliderValue = signal(40);
  readonly tagFilter = signal<string[]>(['Urgent']);
  readonly rating = signal(3);
  readonly patients = signal([
    { hn: 'HN-01234', name: 'Somchai J.', ward: '5A', status: 'Active' },
    { hn: 'HN-05678', name: 'Mali K.',    ward: '3B', status: 'Observation' },
    { hn: 'HN-09012', name: 'Preecha L.', ward: 'ICU', status: 'Critical' }
  ]);
  readonly displayedColumns = ['hn', 'name', 'ward', 'status'];

  readonly departmentOptions = ['Cardiology', 'Orthopedics', 'Pharmacy', 'Pediatrics', 'Emergency'];
  readonly autocompleteFiltered = signal(this.departmentOptions);

  toggleTheme(): void {
    const next: Theme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
  }

  setDensity(value: Density): void {
    this.density.set(value);
    document.documentElement.setAttribute('data-density', value);
  }

  filterAutocomplete(query: string): void {
    const q = query.toLowerCase();
    this.autocompleteFiltered.set(
      this.departmentOptions.filter(d => d.toLowerCase().includes(q))
    );
  }

  openDialog(): void {
    this.dialog.open(DialogPreviewComponent, {
      width: '480px',
      panelClass: 'ax-dialog--md'
    });
  }

  openSnackBar(role: 'success' | 'warning' | 'error' | 'info'): void {
    this.snackBar.open(`${role.toUpperCase()} — action completed`, 'Undo', {
      duration: 3000,
      panelClass: `ax-snack--${role}`,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetPreviewComponent);
  }
}

/** Minimal dialog content for demo */
@Component({
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>Confirm discharge</h2>
    <mat-dialog-content>
      Patient HN-01234 · Somchai J. — are you sure you want to mark this patient as discharged?
      This action updates ward inventory and triggers billing.
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button mat-dialog-close>Confirm</button>
    </mat-dialog-actions>
  `
})
export class DialogPreviewComponent {}

/** Minimal bottom-sheet content for demo */
@Component({
  standalone: true,
  imports: [MatListModule, MatIconModule],
  template: `
    <mat-nav-list>
      <a mat-list-item>
        <span matListItemTitle>Mark as read</span>
      </a>
      <a mat-list-item>
        <span matListItemTitle>Archive</span>
      </a>
      <a mat-list-item>
        <span matListItemTitle>Delete</span>
      </a>
    </mat-nav-list>
  `
})
export class BottomSheetPreviewComponent {}
