import { inject } from '@angular/core';
import {
  ResolveFn
} from '@angular/router';
import { map } from 'rxjs/operators';
import { EmployeeService } from './employee.service';
import { IEmployee } from './model/employee.model';

export const employeeResolver: ResolveFn<IEmployee[]> = () => {
  return inject(EmployeeService)
    .getEmployees()
    .pipe(map((employees) => employees));
};
