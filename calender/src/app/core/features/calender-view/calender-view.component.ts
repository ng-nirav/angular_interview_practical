import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AppointmentService } from '../../shared/services/appointment.service';
import { AppointmentFormComponent } from '../../shared/components/appointment-form/appointment-form.component';
import { Appointment } from '../../shared/models/common.interface';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calender-view.component.html',
  styleUrls: ['./calender-view.component.scss'],
})
export class CalendarViewComponent {
  appointments$!: Observable<Appointment[]>;
  currentDate: Date = new Date();
  calendarDays: number[] = [];
  daysInMonth!: { date: Date; dayName: string }[];
  currentMonth!: number;
  currentYear!: number;
  firstDayOffset!: number;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog
  ) {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.initializeMonthView();
  }

  private initializeMonthView(): void {
    this.daysInMonth = this.generateDaysInMonth(
      this.currentMonth,
      this.currentYear
    );
    this.firstDayOffset = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).getDay();
    this.appointments$ = this.appointmentService.getAppointments();
  }

  private generateDaysInMonth(
    month: number,
    year: number
  ): { date: Date; dayName: string }[] {
    const date = new Date(year, month, 1);
    const days: { date: Date; dayName: string }[] = [];
    while (date.getMonth() === month) {
      days.push({
        date: new Date(date),
        dayName: date.toLocaleString('default', { weekday: 'long' }),
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  public onDrop(event: CdkDragDrop<Appointment[] | null>, day: Date): void {
    if (event) {
      if (event.previousContainer === event.container) {
        return; // No change if dropped in the same day
      }

      const appointment = event.item.data as Appointment;
      const newStart = new Date(day);
      newStart.setHours(
        appointment.start.getHours(),
        appointment.start.getMinutes()
      );
      const duration = appointment.end.getTime() - appointment.start.getTime();
      const newEnd = new Date(newStart.getTime() + duration);

      const updatedAppointment: Appointment = {
        ...appointment,
        start: newStart,
        end: newEnd,
      };

      this.appointmentService.updateAppointment(updatedAppointment);
    }
  }

  public deleteAppointment(id: string): void {
    this.appointmentService.deleteAppointment(id);
  }

  public openAppointmentForm(appointment = {}): void {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      width: '400px',
      data: appointment,
    });

    dialogRef.afterClosed().subscribe((result: Appointment) => {
      if (result) {
        if (result.isEdit) {
          this.appointmentService.updateAppointment(result);
        } else {
          this.appointmentService.addAppointment(result);
        }
      }
    });
  }

  public getAppointmentsForDay(day: Date): Observable<Appointment[]> {
    return new Observable<Appointment[]>((observer) => {
      this.appointments$.subscribe((appointments) => {
        const filteredAppointments = appointments.filter(
          (appointment) =>
            appointment.start.toDateString() === day.toDateString()
        );
        observer.next(filteredAppointments);
      });
    });
  }

  public previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.currentDate = new Date(this.currentYear, this.currentMonth);
    this.initializeMonthView();
  }

  public nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.currentDate = new Date(this.currentYear, this.currentMonth);
    this.initializeMonthView();
  }

  public openData(appointment: Appointment): void {
    console.log(appointment);
    this.openAppointmentForm(appointment);
  }
}
