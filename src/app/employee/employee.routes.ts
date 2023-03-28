import { Routes } from "@angular/router";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { employeeResolver } from "./employee.resolver";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";

export const employeeRoutes: Routes = [
  {
    path: 'lists',
    component: EmployeeListComponent,
    resolve: { employees: employeeResolver },
  },
  {
    path: 'lists/:id',
    component: EmployeeDetailsComponent,
  },
];
