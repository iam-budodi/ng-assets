import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';

export const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: EmployeeComponent },

];
