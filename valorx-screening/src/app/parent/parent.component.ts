import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ChildComponent } from './child/child.component';
import { NonPrimitiveDataType } from '../../core/interface/common.interface';
import { CounterService } from '../../core/services/counter.service';
import { WrapperComponent } from '../../shared/wrapper/wrapper.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, WrapperComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  changeDetection = inject(ChangeDetectorRef);
  counterService = inject(CounterService); // This will be Globl scope
  primitiveData: number = 0;
  nonPrmitiveData: NonPrimitiveDataType = {
    randomNumber: 7,
    randomText: 'Initial Text',
  };

  public updatePrimitiveData(): void {
    ++this.primitiveData;
  }

  /*
   * Updating Object by reference so changes will be visible on child Component
   */
  public updateNonPrimitiveDataByRef(): void {
    this.nonPrmitiveData = {
      randomNumber: Math.floor(Math.random() * 100),
      randomText: this.randomStringGenerator,
    };
  }

  /*
   *Updating Object value and not reference so changes will not reflect on child component
   */
  public updateNonPrimitiveDataByValue(): void {
    this.nonPrmitiveData.randomNumber = Math.floor(Math.random() * 100);
    this.nonPrmitiveData.randomText = this.randomStringGenerator;
  }

  public get randomStringGenerator(): string {
    return Math.random().toString(36).slice(2, 15);
  }

  public updateCounter(): void {
    this.counterService.updateCounter();
  }

  public get displayCount(): number {
    return this.counterService.counter;
  }
}
