import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared/shared.module';
import { AppointmentFormComponent } from '../../shared/components/appointment-form/appointment-form.component';
import { CalendarViewComponent } from './calender-view.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarViewComponent,
  },
];

@NgModule({
  declarations: [CalendarViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AppointmentFormComponent,
  ],
})
export class CalenderViewModule {}
