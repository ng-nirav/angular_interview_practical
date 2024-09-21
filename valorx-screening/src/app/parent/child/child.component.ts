import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { NonPrimitiveDataType } from '../../../core/interface/common.interface';
import { CounterService } from '../../../core/services/counter.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  providers: [CounterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  changeDetector = inject(ChangeDetectorRef);
  counterService = inject(CounterService); // as We have passed CounterServie(DI) on Providers array, it will register as new Instance whose state will be limited to this component only
  @Input() primitiveData: number = 0;
  @Input() nonPrmitiveData!: NonPrimitiveDataType;

  public clickEvent(): void {
    console.log('click Event');
  }

  public invokeDetection(): void {
    this.changeDetector.detectChanges();
  }

  public get count(): number {
    return this.counterService.counter;
  }

  public updateCount(): void {
    this.counterService.updateCounter();
  }
}
