import {Routes} from "@angular/router";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeDetailsComponent} from "./employee-details/employee-details.component";
import {DepartmentListComponent} from "./department/department-list/department-list.component";
import {employeeResolver} from "./employee-resolver.service";
import {CollegeListComponent} from "./college/college-list/college-list.component";

export const employeeRoutes: Routes = [
  {
    path: 'college',
    component: CollegeListComponent,
  },

  {
    path: 'departments',
    component: DepartmentListComponent,
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    // resolve: { employees: employeesListResolver },
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    resolve: {employee: employeeResolver},
  },
];
