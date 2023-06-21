import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: '',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./inventory/inventory.module')
        .then((m) => m.InventoryModule)
  },
];
