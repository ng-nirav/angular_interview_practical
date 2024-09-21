import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { Appointment } from '../../models/common.interface';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
  standalone: true,
  imports: [SharedModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      description: [''],
    });
    // IF user open the modal need to patch the data on Modal Open
    if (this.data) {
      this.appointmentForm.patchValue(this.data);
    }
  }

  public onSubmit(): void {
    if (this.appointmentForm.valid) {
      const newAppointment = {
        id: this.data && this.data.id ? this.data.id : Date.now().toString(), // Simple ID generation
        isEdit: this.data && this.data.id ? true : false,
        ...this.appointmentForm.value,
      };
      this.dialogRef.close(newAppointment);
    }
  }
}
