import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from "./navbar/auth.guard";

export const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: '',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
    canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  {
    path: '',
    loadChildren: () =>
      import('./inventory/inventory.module')
        .then((m) => m.InventoryModule),
    canActivate: [AuthGuard],
    data: {roles: ['procure']}
  },
];
