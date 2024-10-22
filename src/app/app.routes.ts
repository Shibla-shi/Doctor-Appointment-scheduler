import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PatientsComponent } from './patients/patients.component';

export const routes: Routes = [
  
    { path: 'appointments', component: AppointmentsComponent },
    { path: 'doctors', component: DoctorsComponent },
    { path: 'patients', component: PatientsComponent },
    { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
