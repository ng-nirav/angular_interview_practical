import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Appointment } from '../models/common.interface';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments = new BehaviorSubject<Appointment[]>([]);

  public getAppointments(): Observable<Appointment[]> {
    return this.appointments.asObservable();
  }

  public addAppointment(appointment: Appointment): void {
    const currentAppointments = this.appointments.getValue();
    this.appointments.next([...currentAppointments, appointment]);
  }

  public updateAppointment(updatedAppointment: Appointment): void {
    const currentAppointments = this.appointments.getValue();
    const index = currentAppointments.findIndex(a => a.id === updatedAppointment.id);
    if (index !== -1) {
      currentAppointments[index] = updatedAppointment;
      this.appointments.next([...currentAppointments]);
    }
  }

  public deleteAppointment(id: string): void {
    const currentAppointments = this.appointments.getValue();
    this.appointments.next(currentAppointments.filter(a => a.id !== id));
  }
}