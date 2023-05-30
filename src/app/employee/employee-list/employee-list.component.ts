import {Component, OnInit} from '@angular/core';
import {ITableColumn} from '../../shared/models/table-column.model';
import {Employee} from "../../service";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {DialogService} from "../../shared/dialog/dialog.service";
import {DialogData} from "../model/dialog-data.model";
import {Query} from "../../shared/models/query.model";
import {EMPLOYEE_TABLE_COLUMNS} from "../model/employee-table-column.config";
import {DatePipe} from "@angular/common";
import {EmployeeDialogComponent} from "../employee-dialog/employee-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogService} from "../../shared/dialog/confirm-dialog.service";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employeeTableColumns!: ITableColumn[];
  dialogValue: DialogData<Employee> = {mode: 'create'};
  initialPage: number = 0;
  tableData!: PaginationDataSource<Employee, Query<Date>>;
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];

  constructor(
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    private employeeService: EmployeeService
  ) {
  }

  ngOnInit(): void {
    this.employeeTableColumns = EMPLOYEE_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Employee, Query<Date>>(
      (request: PageRequest<Employee>, query: Query<Date>) => this.employeeService.getEmployees(request, query),
      {property: 'firstName', order: 'asc'},
      {search: undefined!, registration: undefined!}
    )
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
