import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../modelS/appointment.model';
import { Patient } from '../modelS/patient.model';
import { Doctor } from '../modelS/doctor.model';







@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api/appointments'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getAppointments() {
    return this.http.get<Appointment[]>('http://localhost:3000/api/appointments');
  }
  
  
  

  // Method to add an appointment
  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment); // Return Observable
  }

  updateAppointment(id: string, appointment: Appointment): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, appointment);
  }
  

  deleteAppointment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getPatients(): Observable<Patient[]> {
    // Implement the actual logic to fetch patients
    return this.http.get<Patient[]>('http://localhost:3000/api/patients');
  }

  getDoctors(): Observable<Doctor[]> {
    // Implement the actual logic to fetch doctors
    return this.http.get<Doctor[]>('http://localhost:3000/api/doctors');
  }
}
