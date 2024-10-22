import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:3000/api/doctors'; // Update with your API endpoint

  constructor(private http: HttpClient) {}


  

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDoctor(doctor: any): Observable<any> {
    console.log('Adding doctor with data:', doctor); // Log the data being sent
    return this.http.post<any>(this.apiUrl, doctor);
  }
  

  updateDoctor(id: string, doctor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, doctor);
  }

  deleteDoctor(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
