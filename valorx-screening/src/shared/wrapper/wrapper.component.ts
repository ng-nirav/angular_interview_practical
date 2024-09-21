import { Component, inject } from '@angular/core';
import { CounterService } from '../../core/services/counter.service';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss'
})
export class WrapperComponent {
  counterService = inject(CounterService)
  public get displayCount(): number {
    return this.counterService.counter;
  }
}
