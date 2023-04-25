import {Component, OnInit} from '@angular/core';
import {ITableColumn} from '../../shared/models/table-column.model';
import {Employee, EmployeeEndpointService, LocalDate} from "../../service";
import {Page, PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {DialogService} from "../../shared/dialog/dialog.service";
import {DialogData} from "../model/dialog-data.model";
import {Query} from "../../shared/models/query.model";
import {EMPLOYEE_TABLE_COLUMNS} from "../model/employee-table-column.config";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/util/utils";
import {DatePipe} from "@angular/common";
import {EmployeeDialogComponent} from "../employee-dialog/employee-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogService} from "../../shared/dialog/confirm-dialog.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employeeTableColumns!: ITableColumn[];
  dialogValue: DialogData<Employee> = {mode: 'create'};
  initialPage: number = 0;
  tableData!: PaginationDataSource<Employee, Query<LocalDate>>;
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];

  constructor(
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService:  ConfirmDialogService,
    private employeeService: EmployeeEndpointService
  ) {
  }

  ngOnInit(): void {
    this.employeeTableColumns = EMPLOYEE_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Employee, Query<LocalDate>>(
      (request: PageRequest<Employee>, query: Query<LocalDate>) => this.getEmployees(request, query),
      {property: 'firstName', order: 'asc'},
      {search: undefined!, registration: undefined!}
    )
  }

  getEmployees(request: PageRequest<Employee>, query: Query<LocalDate>): Observable<Page<Employee>> {

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

  createEmployee = () => {
    this.dialogValue = {mode: 'create'};
    this.openEmployeeDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully created employee`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  };

  updateEmployee = (employee: Employee): void => {
    this.dialogValue = {mode: 'edit', dataObject: employee};
    this.openEmployeeDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated employee`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deleteEmployee = (employee: Employee) => {
    this.dialogValue = {mode: 'delete', dataObject: employee};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted employee`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  };

  // Remember this when  allocation on same screen
  reloadDataOnChanges(): void {
    this.tableData.fetch(this.initialPage);
  }

  openEmployeeDialog(dialogValue: DialogData<Employee>) {
    return this.dialogService.open(EmployeeDialogComponent, dialogValue);
  }

  openConfirmationDialog(dialogValue: DialogData<Employee>) {
    return this.confirmDialogService.open(EmployeeDialogComponent, dialogValue);
  }

}
