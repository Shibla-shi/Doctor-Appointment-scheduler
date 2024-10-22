// appointment.model.ts
export interface Appointment {
    id: string | null;  // The ID of the appointment, can be null or a string
    patientName: string; // The name of the patient
    doctorName: string;  // The name of the doctor
    doctorSpecialization?: string;  // Add this property

    date: string;        // The date of the appointment in string format (consider using Date type if applicable)
  }
  