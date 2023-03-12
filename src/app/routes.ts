import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { employeeResolver } from './employee/employee.resolver';

export const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'employees',
    component: EmployeeComponent,
    resolve: { employees: employeeResolver },
  },
];
