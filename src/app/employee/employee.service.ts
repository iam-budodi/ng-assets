import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { IEmployee } from '../common/model/employee.model';
import { ITableColumn } from '../common/model/table-column.model';
import { FieldConfig } from '../form/model/field-confing.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getEmployees(): Observable<IEmployee[]> {
    let subject = new Subject<IEmployee[]>();
    setTimeout(() => {
      subject.next(EMPLOYEES);
      subject.complete();
    }, 100);
    return subject;
  }

  saveEmployee(employeeEvt: IEmployee): void {
    employeeEvt.id = 10;
    EMPLOYEES.push(employeeEvt);
  }

  deleteEmployee(employeeEvt: IEmployee): IEmployee[] {
    return EMPLOYEES.filter((employee) => employee.id !== employeeEvt.id);
  }

  updateEmployee(employeeEvt: IEmployee): void {
    let index = EMPLOYEES.findIndex(
      (employee) => (employee.id = employeeEvt.id)
    );
    EMPLOYEES[index] = employeeEvt;
  }

  getDialogForm(): FieldConfig[] {
    return FORM;
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
const FORM: FieldConfig[] = [
  {
    type: 'input',
    label: 'First ame',
    name: 'firstName',
    placeholder: 'Enter first name',
    validation: [Validators.required, Validators.minLength(2)],
  },
  {
    type: 'input',
    label: 'Last name',
    name: 'lastName',
    placeholder: 'Enter last name',
    validation: [Validators.required, Validators.minLength(2)],
  },
  {
    type: 'input',
    label: 'Work ID',
    name: 'workId',
    placeholder: 'Enter ID',
    validation: [Validators.required, Validators.minLength(4)],
  },
  {
    type: 'input',
    label: 'Address',
    name: 'address',
    placeholder: 'Enter Address',
    validation: [Validators.required, Validators.minLength(4)],
  },
  {
    type: 'input',
    label: 'Birth date',
    name: 'age',
    placeholder: 'Enter birth date',
    validation: [Validators.required, Validators.min(1)],
  },
  {
    label: 'Submit',
    name: 'submit',
    type: 'button',
  },
];

const TABLE_COLUMNS: ITableColumn[] = [
  { name: ' ', dataKey: 'id', isSortable: true },
  { name: 'First Name', dataKey: 'firstName', isSortable: true },
  { name: 'Last Name', dataKey: 'lastName', isSortable: true },
  { name: 'Work ID', dataKey: 'workId', isSortable: true },
  { name: 'Address', dataKey: 'address', isSortable: false },
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
