import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {ITableColumn} from './model/table-column.model';
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Employee, EmployeeEndpointService, LocalDate} from "../service";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {httpGetAllHandler} from "../shared/utils";
import {Query} from "../shared/query.model";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  constructor(private employeeService: EmployeeEndpointService, private datePipe: DatePipe) {
  }

  page(request: PageRequest<Employee>, query: Query<LocalDate>): Observable<Page<Employee>> {

    (request.size === 20) ? request.size = 5 : request.size;
    const date: string = this.datePipe.transform(query.registration, 'yyyy-MM-dd')!;

    return this.employeeService
      .restEmployeesGet(date, request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Employee>>) => {
            return httpGetAllHandler<Employee>(response);
          }
        )
      );
  }

  getEmployee(id: number) {
    // return EMPLOYEES.find((employee) => employee.id === id);
  }

  createEmployee(employee: Employee): Observable<HttpResponse<string>> {
    // employeeEvt.id = 10;
    console.log('IN SVC CREATE : ' + JSON.stringify(employee));
    return this.employeeService.restEmployeesPost(employee, 'response')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred.';
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // The backend returned an unsuccessful response code.
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          // this.dialog.open(ErrorDialogComponent, {
          //   data: errorMessage,
          //   panelClass: 'error-dialog'
          // });
          return throwError(() => new HttpErrorResponse({error: errorMessage}));
          // return errorMessage;
        })
      );
  }

  deleteEmployee(employeeEvt: any) {
    // return EMPLOYEES.filter((employee) => employee.id !== employeeEvt.id);
  }

  updateEmployee(employeeEvt: any): void {
    console.log('In UPDATE service : ' + JSON.stringify(employeeEvt));
    // let index = EMPLOYEES.findIndex(
    //   (employee) => employee.id == employeeEvt.id
    // );
    // console.log('emp ID : ' + index);
    // EMPLOYEES[index] = employeeEvt;
    //
    // console.log('emp : ' + JSON.stringify(EMPLOYEES[index]));
  }

  // getDialogForm(): FieldConfig[] {
  //   // if (employee !== null && Object.keys(employee).includes('id')) return EDIT_FORM;
  //   return CREATE_FORM;
  // }

  // getDialogForm(employee: any): FieldConfig[] {
  //   if (employee !== null && Object.keys(employee).includes('id')) return EDIT_FORM;
  //   else return CREATE_FORM;
  // }

  getTableColumns(): ITableColumn[] {
    return EMPLOYEE_TABLE_COLUMNS;
  }
}

const EMPLOYEE_TABLE_COLUMNS: ITableColumn[] = [
  {name: ' ', dataKey: 'id', isSortable: true},
  {name: 'First Name', dataKey: 'firstName', isSortable: true},
  {name: 'Middle Name', dataKey: 'middleName', isSortable: true},
  {name: 'Last Name', dataKey: 'lastName', isSortable: true},
  {name: 'Gender', dataKey: 'gender', isSortable: true},
  {name: 'Phone Number', dataKey: 'mobile', isSortable: true},
  {name: 'Email', dataKey: 'email', isSortable: true},
  {name: 'Work ID', dataKey: 'workId', isSortable: true},
  {name: 'Hire Date', dataKey: 'hireDate', isSortable: true},
  {name: 'Experience', dataKey: 'timeOfService', isSortable: false},
  {name: 'Department', dataKey: 'department', isSortable: true},
  {name: 'Address', dataKey: 'address', isSortable: false},
  {name: 'DOB', dataKey: 'dateOfBirth', isSortable: false},
  {name: 'Age', dataKey: 'age', isSortable: false},
];

// const EMPLOYEES: Employee[] = [
//   {
//     id: 1,
//     firstName: 'Lulu',
//     lastName: 'Yahaya',
//     workId: 'UDSM-2023-1002',
//     address: 'Korogwe, Kimara',
//     age: 26,
//   },
//   {
//     id: 2,
//     firstName: 'Habiba',
//     lastName: 'Yahaya',
//     workId: 'UDSM-2023-1001',
//     address: 'Santika, Mwenge',
//     age: 25,
//   },
//   {
//     id: 3,
//     firstName: 'Japhet',
//     lastName: 'Sebastian',
//     workId: 'UDSM-2023-1003',
//     address: 'Kibo, Kimara',
//     age: 30,
//   },
//   {
//     id: 4,
//     firstName: 'Lulu',
//     lastName: 'Yahaya',
//     workId: 'UDSM-2023-1002',
//     address: 'Korogwe, Kimara',
//     age: 26,
//   },
//   {
//     id: 5,
//     firstName: 'Habiba',
//     lastName: 'Yahaya',
//     workId: 'UDSM-2023-1001',
//     address: 'Santika, Mwenge',
//     age: 25,
//   },
//   {
//     id: 6,
//     firstName: 'Japhet',
//     lastName: 'Sebastian',
//     workId: 'UDSM-2023-1003',
//     address: 'Kibo, Kimara',
//     age: 30,
//   },
// ];
