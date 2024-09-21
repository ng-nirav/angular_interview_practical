import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  output,
  Output,
  signal,
  ViewChild,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IParamsDataSet } from '../shared/interface/common.interface';

@Component({
  selector: 'nr-header',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  COUNTRY_LIST: string[] = ['ar', 'au', 'in', 'gb', 'us', 'ru'];
  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;
  onFilterChange = output<IParamsDataSet>();
  countryName: WritableSignal<string> = signal('');
  dateRangeForm: FormGroup = new FormGroup({
    from: new FormControl(null),
    to: new FormControl(null),
  });
  searBarValue: string = '';

  ngOnInit(): void {
    this.dateRangeForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((result) => {
        if (this.dateRangeForm.valid && result.from && result.to) {
          this.countryName.set('');
          this.onFilterChange.emit({
            searchValue: this.searBarValue,
            from: result.from ? this.dateConvertor(result.from) : '',
            to: result.to ? this.dateConvertor(result.to) : '',
            country: this.countryName(),
            isCountryChange: false,
          });
        }
      });
  }

  ngAfterViewInit(): void {
    // Check for the Input Value changes
    fromEvent(this.inputSearch.nativeElement, 'input')
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((_search) => {
        this.onFilterChange.emit({
          searchValue: this.searBarValue,
          from: this.dateRangeForm.get('from')?.value
            ? this.dateConvertor(this.dateRangeForm.get('from')?.value)
            : '',
          to: this.dateRangeForm.get('to')?.value
            ? this.dateConvertor(this.dateRangeForm.get('to')?.value)
            : '',
          country: this.countryName(),
          isCountryChange: false,
        });
      });
  }

  public countryChange(name: string): void {
    this.countryName.set(name);
    this.dateRangeForm.reset();
    this.onFilterChange.emit({
      searchValue: this.searBarValue,
      from: this.dateRangeForm.get('from')?.value
        ? this.dateConvertor(this.dateRangeForm.get('from')?.value)
        : '',
      to: this.dateRangeForm.get('to')?.value
        ? this.dateConvertor(this.dateRangeForm.get('to')?.value)
        : '',
      country: this.countryName(),
      isCountryChange: true,
    });
  }

  private dateConvertor(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
