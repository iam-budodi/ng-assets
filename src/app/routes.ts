import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {
    path: 'employees',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
];
