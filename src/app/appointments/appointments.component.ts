import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../services/appointment.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Appointment } from '../modelS/appointment.model';
import { Patient } from '../modelS/patient.model';
import { Doctor } from '../modelS/doctor.model';


@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit {
  newAppointment: Appointment = { id: null, patientName: '', doctorName: '', date: '' };
  appointments: Appointment[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  editingAppointmentId: string | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadPatients();
    this.loadDoctors();
    this.loadAppointments();
  }

  loadPatients() {
    this.appointmentService.getPatients().subscribe({
      next: (data: Patient[]) => {
        this.patients = data;
        console.log('Patients loaded:', this.patients);
      },
      error: (error) => {
        console.error('Error loading patients:', error);
      }
    });
  }

  loadDoctors() {
    this.appointmentService.getDoctors().subscribe({
      next: (data: Doctor[]) => {
        this.doctors = data;
        console.log('Doctors loaded:', this.doctors);
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
      }
    });
  }

  loadAppointments() {
    this.appointmentService.getAppointments().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;  // Ensure appointments have IDs
      },
      (error) => {
        console.error('Failed to load appointments', error);
      }
    );
  }



  addAppointment() {
    if (this.newAppointment.patientName && this.newAppointment.doctorName && this.newAppointment.date) {
      const selectedDoctor = this.doctors.find(doctor => doctor.name === this.newAppointment.doctorName);
      const newId = this.generateUniqueId(); // Generate a unique ID for the new appointment
      const doctorSpecialization = selectedDoctor ? selectedDoctor.specialization : 'Unknown';  // Use specialization
      this.appointments.push({ 
        ...this.newAppointment, 
        id: newId, 
        doctorSpecialization: doctorSpecialization  // Set the doctor's specialization
      });
      this.resetForm();
    }
  }
  

  updateAppointment() {
    const index = this.appointments.findIndex(appointment => appointment.id === this.editingAppointmentId);
    if (index > -1) {
      this.appointments[index] = { ...this.newAppointment, id: this.editingAppointmentId };
      this.resetForm();
    }
  }

  editAppointment(appointment: Appointment) {
    const selectedDoctor = this.doctors.find(doctor => doctor.name === appointment.doctorName);
    const doctorSpecialization = selectedDoctor ? selectedDoctor.specialization : 'Unknown';  // Use specialization
    this.newAppointment = { ...appointment, doctorSpecialization };  // Include the specialization
    this.editingAppointmentId = appointment.id;
  }
  

  deleteAppointment(id: string | null) {
    this.appointments = this.appointments.filter(appointment => appointment.id !== id);
  }

  resetForm() {
    this.newAppointment = { id: null, patientName: '', doctorName: '', date: '' };
    this.editingAppointmentId = null;
  }

  private generateUniqueId(): string {
    // Implement your ID generation logic here (e.g., using a timestamp or a UUID)
    return new Date().getTime().toString(); // Example using current timestamp
  }
}
