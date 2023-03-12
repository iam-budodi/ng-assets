import { inject } from '@angular/core';
import {
  ResolveFn
} from '@angular/router';
import { map } from 'rxjs/operators';
import { IEmployee } from '../common/model/employee.model';
import { EmployeeService } from './employee.service';

export const employeeResolver: ResolveFn<IEmployee[]> = () => {
  return inject(EmployeeService)
    .getEmployees()
    .pipe(map((employees) => employees));
};
