import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

// Services
import { AppointmentService } from './services/appointment.service';
import { DoctorService } from './services/doctor.service';
import { PatientService } from './services/patient.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    // Declare components here as needed (e.g. AppointmentComponent, DoctorComponent, etc.)
  ],
  imports: [
    BrowserModule,
    NgModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    MatTabsModule
  ],
  providers: [
    AppointmentService,
    DoctorService,
    PatientService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
