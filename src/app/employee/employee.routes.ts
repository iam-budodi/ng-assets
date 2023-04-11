import { Routes } from "@angular/router";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { employeesListResolver } from "./employees-list.resolver";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";

export const employeeRoutes: Routes = [
  {
    path: 'lists',
    component: EmployeeListComponent,
    resolve: { employees: employeesListResolver },
  },
  {
    path: 'lists/:id',
    component: EmployeeDetailsComponent,
  },
];
