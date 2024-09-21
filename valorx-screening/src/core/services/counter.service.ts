import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  counter: number = 0;
  constructor() {
    // Called times we have created service instace, for Root it will call one time but in case when added in Providers array as Dependancy Injection(DI) then it will Create new Instance for that component
    console.log('service Initiated');
  }

  public updateCounter(): void {
    ++this.counter;
  }
}
