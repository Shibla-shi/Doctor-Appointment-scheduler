import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  patients: any[] = [];
  newPatient = { name: '', age: '', gender: '' };
  editingPatientId: string | null = null; // Track which patient is being edited

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getPatients().subscribe((data: any) => (this.patients = data));
  }

  addPatient() {
    this.patientService.addPatient(this.newPatient).subscribe(() => {
      this.loadPatients();
      this.resetForm(); // Clear the form after adding
    });
  }

  editPatient(patient: any) {
    this.newPatient = { ...patient }; // Copy the data to newPatient
    this.editingPatientId = patient._id; // Set the editing patient ID
  }

  updatePatient() {
    if (this.editingPatientId) {
      this.patientService.updatePatient(this.editingPatientId, this.newPatient).subscribe(() => {
        this.loadPatients(); // Reload patients after updating
        this.resetForm(); // Clear the form after updating
      });
    }
  }

  deletePatient(id: string) {
    this.patientService.deletePatient(id).subscribe(() => {
      this.loadPatients();
    });
  }

  resetForm() {
    this.newPatient = { name: '', age: '', gender: '' }; // Reset form values
    this.editingPatientId = null; // Reset editing ID
  }
}
