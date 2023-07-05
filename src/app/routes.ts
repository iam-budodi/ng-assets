import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from "./navbar/auth.guard";
import {EmployeesReportComponent} from "./reports/employees-report/employees-report.component";
import {AssetsReportComponent} from "./reports/assets-report/assets-report.component";
import {AllocationsReportComponent} from "./reports/allocations-report/allocations-report.component";
import {TransfersReportComponent} from "./reports/transfers-report/transfers-report.component";

export const appRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  // {path: 'dashboard', component: DashboardPageComponent},
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
  {
    path: 'employee-report',
    component: EmployeesReportComponent
  },
  {
    path: 'asset-report',
    component: AssetsReportComponent
  },
  {
    path: 'allocation-report',
    component: AllocationsReportComponent
  },
  {
    path: 'transfer-report',
    component: TransfersReportComponent
  }
];
