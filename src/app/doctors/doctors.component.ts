import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
})
export class DoctorsComponent implements OnInit {
  doctors: any[] = [];
  newDoctor = { name: '', specialization: '', phone: '' };
  editingDoctorId: string | null = null;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe((data: any) => {
      console.log(data); // Log the response to check structure
      this.doctors = data;
    });
  }

  addDoctor() {
    const doctorData = {
      name: this.newDoctor.name,
      specialization: this.newDoctor.specialization, // Use 'specialty' consistently here
      phone: this.newDoctor.phone,
    };
  
    this.doctorService.addDoctor(doctorData).subscribe({
      next: (response) => {
        console.log('Doctor added:', response);
        this.loadDoctors(); // Refresh the doctor list after adding
        this.resetForm();   // Reset the form after submission
      },
      error: (error) => {
        console.error('Error adding doctor:', error);
        if (error.error && error.error.error) {
          console.error('Validation Errors:', error.error.error);
        }
      },
    });
  }
  
  
  
  editDoctor(doctor: any) {
    this.newDoctor = { ...doctor };
    this.editingDoctorId = doctor._id;
  }

  updateDoctor() {
    if (this.editingDoctorId) {
      this.doctorService.updateDoctor(this.editingDoctorId, this.newDoctor).subscribe(() => {
        this.loadDoctors();
        this.resetForm();
      });
    }
  }

  deleteDoctor(id: string) {
    this.doctorService.deleteDoctor(id).subscribe(() => {
      this.loadDoctors();
    });
  }

  resetForm() {
    this.newDoctor = { name: '', specialization: '', phone: '' };
    this.editingDoctorId = null;
  }
}
