import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/api/patients'; // Update with your API endpoint

  constructor(private http: HttpClient) {}

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, patient);
  }

  updatePatient(id: string, patient: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
