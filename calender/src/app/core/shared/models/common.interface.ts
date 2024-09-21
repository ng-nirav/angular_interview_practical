
export interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  isEdit?: boolean
}
