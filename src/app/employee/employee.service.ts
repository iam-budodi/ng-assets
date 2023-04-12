import {inject, Injectable} from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { FieldConfig } from '../form/model/field-confing.model';
import { IEmployee } from './model/employee.model';
import { ITableColumn } from './model/table-column.model';
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Employee, EmployeeEndpointService} from "../service";
import {EmployeeQuery} from "./employee-list/employee-list.component";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private employeeService: EmployeeEndpointService) {
  }
  page(request: PageRequest<Employee>, query: EmployeeQuery): Observable<Page<Employee>> {

    request.size = 5;
    return this.employeeService.restEmployeesGet(request.page, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Employee>>) => {
          const linkHeader: string | null = response.headers.get('Link');
          const totalElements: string | null = response.headers.get('X-Total-Count');
          const employees: Employee[] = response.body || [];

          const pageData: Page<Employee> = {
            content: employees,
            totalElements: totalElements ? parseInt(totalElements, 10) : 0,
            size: 5,
            number: 0
          }

          return pageData;
        }
      ));
  }
  getEmployees(): Observable<IEmployee[]> {
    let subject = new Subject<IEmployee[]>();
    setTimeout(() => {
      subject.next(EMPLOYEES);
      subject.complete();
    }, 100);
    return subject;
  }

  getEmployee(id: number): IEmployee | undefined {
    return EMPLOYEES.find((employee) => employee.id === id);
  }

  saveEmployee(employeeEvt: IEmployee): void {
    employeeEvt.id = 10;
    console.log('IN SVC CREATE : ' + JSON.stringify(employeeEvt));

    EMPLOYEES.push(employeeEvt);
  }

  deleteEmployee(employeeEvt: IEmployee): IEmployee[] {
    return EMPLOYEES.filter((employee) => employee.id !== employeeEvt.id);
  }

  updateEmployee(employeeEvt: IEmployee): void {
    console.log('In UPDATE service : ' + JSON.stringify(employeeEvt));
    let index = EMPLOYEES.findIndex(
      (employee) => employee.id == employeeEvt.id
    );
    console.log('emp ID : ' + index);
    EMPLOYEES[index] = employeeEvt;

    console.log('emp : ' + JSON.stringify(EMPLOYEES[index]));
  }

  getDialogForm(employee: IEmployee): FieldConfig[] {
    if (employee !== null && Object.keys(employee).includes('id')) return EDIT_FORM;
    else return CREATE_FORM;
  }

  getTableColumns(): ITableColumn[] {
    return TABLE_COLUMNS;
  }
}

// look at this when you need a select
//  {
//     type: 'select',
//     label: 'Favourite Food',
//     name: 'food',
//     options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
//     placeholder: 'Select an option',
//     validation: [Validators.required],
//   },
const CREATE_FORM: FieldConfig[] = [
  {
    element: 'input',
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter first name',
    validation: [Validators.required, Validators.minLength(2)],
  },
  {
    element: 'input',
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Enter last name',
    validation: [Validators.required, Validators.minLength(2)],
  },
  {
    element: 'input',
    label: 'Work ID',
    name: 'workId',
    type: 'text',
    placeholder: 'Enter ID',
    validation: [Validators.required, Validators.minLength(4)],
  },
  {
    element: 'input',
    label: 'Address',
    name: 'address',
    type: 'text',
    placeholder: 'Enter Address',
    validation: [Validators.required, Validators.minLength(4)],
  },
  {
    element: 'input',
    label: 'Birth date',
    name: 'age',
    type: 'number',
    placeholder: 'Enter birth date',
    validation: [Validators.required, Validators.min(1)],
  },
  {
    label: 'Submit',
    name: 'submit',
    type: 'submit',
    element: 'button',
  },
];

const EDIT_FORM: FieldConfig[] = [
  {
    element: 'input',
    name: 'id',
    type: 'number',
    placeholder: 'Enter id',
    validation: [Validators.required, Validators.minLength(2)],
  },
  ...CREATE_FORM,
];

const TABLE_COLUMNS: ITableColumn[] = [
  { name: ' ', dataKey: 'id', isSortable: true },
  { name: 'First Name', dataKey: 'firstName', isSortable: true },
  { name: 'Middle Name', dataKey: 'middleName', isSortable: true },
  { name: 'Last Name', dataKey: 'lastName', isSortable: true },
  { name: 'Gender', dataKey: 'gender', isSortable: true },
  { name: 'Phone Number', dataKey: 'mobile', isSortable: true },
  { name: 'Email', dataKey: 'email', isSortable: true },
  { name: 'Work ID', dataKey: 'workId', isSortable: true },
  { name: 'Hire Date', dataKey: 'hireDate', isSortable: true },
  { name: 'Experience', dataKey: 'timeOfService', isSortable: false },
  { name: 'Department', dataKey: 'department', isSortable: true },
  { name: 'Address', dataKey: 'address', isSortable: false },
  { name: 'DOB', dataKey: 'dateOfBirth', isSortable: false },
  { name: 'Age', dataKey: 'age', isSortable: false },
];

const EMPLOYEES: IEmployee[] = [
  {
    id: 1,
    firstName: 'Lulu',
    lastName: 'Yahaya',
    workId: 'UDSM-2023-1002',
    address: 'Korogwe, Kimara',
    age: 26,
  },
  {
    id: 2,
    firstName: 'Habiba',
    lastName: 'Yahaya',
    workId: 'UDSM-2023-1001',
    address: 'Santika, Mwenge',
    age: 25,
  },
  {
    id: 3,
    firstName: 'Japhet',
    lastName: 'Sebastian',
    workId: 'UDSM-2023-1003',
    address: 'Kibo, Kimara',
    age: 30,
  },
  {
    id: 4,
    firstName: 'Lulu',
    lastName: 'Yahaya',
    workId: 'UDSM-2023-1002',
    address: 'Korogwe, Kimara',
    age: 26,
  },
  {
    id: 5,
    firstName: 'Habiba',
    lastName: 'Yahaya',
    workId: 'UDSM-2023-1001',
    address: 'Santika, Mwenge',
    age: 25,
  },
  {
    id: 6,
    firstName: 'Japhet',
    lastName: 'Sebastian',
    workId: 'UDSM-2023-1003',
    address: 'Kibo, Kimara',
    age: 30,
  },
];
