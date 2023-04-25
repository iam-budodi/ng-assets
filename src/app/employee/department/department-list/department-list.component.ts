import {Component, OnInit} from '@angular/core';
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Department} from "../../../service";
import {Query} from "../../../shared/models/query.model";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ITableColumn} from "../../../shared/models/table-column.model";
import {DEPARTMENT_TABLE_COLUMNS} from "../model/department-table.config";
import {DepartmentDialogComponent} from "../department-dialog/department-dialog.component";
import {DialogData} from "../../model/dialog-data.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogService} from "../../../shared/dialog/confirm-dialog.service";
import {DepartmentService} from "../department.service";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departmentTableColumns!: ITableColumn[];
  dialogValue!: DialogData<Department>;
  initialPage: number = 0;
  tableData!: PaginationDataSource<Department, Query<any>>;
  addDeptButtonLabel: string = 'Add Department';
  pageTitle: string = 'Department Information';

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService:  ConfirmDialogService,
    private departmentService: DepartmentService,
  ) {
  }

  ngOnInit(): void {
    this.departmentTableColumns = DEPARTMENT_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Department, Query<any>>(
      (request: PageRequest<Department>, query: Query<any>) => this.departmentService.getDepartments(request, query),//this.departmentService.page(request, query),
      {property: 'name', order: 'asc'},
      {registration: undefined, search: undefined!}
    )
    // console.log('SELECT OPTS : ' + JSON.stringify(this.departmentService.getDepartmentSelectOptions().subscribe()));
  }

  // getDepartments(request: PageRequest<Department>, query: any): Observable<Page<Department>> {
  //
  //   (request.size === 20) ? request.size = 5 : request.size;
  //
  //   return this.departmentService
  //     .restDepartmentsGet(request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
  //     .pipe(map((response: HttpResponse<Array<Department>>) => {
  //           return httpGetAllHandler<Department>(response);
  //         }
  //       )
  //     );
  // }

  createDepartment = () => {
    this.dialogValue = {mode: 'create'};
    this.openDepartmentDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully created department`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );

  };

  updateDepartment = (department: Department): void => {
    this.dialogValue = {mode: 'edit', dataObject: department};
    this.openDepartmentDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated department`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deleteDepartment = (department: Department) => {
    this.dialogValue = {mode: 'delete', dataObject: department};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted department`, 'Close', {
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

  openDepartmentDialog(dialogValue: DialogData<Department>) {
    return this.dialogService.open(DepartmentDialogComponent, dialogValue);
  }

  openConfirmationDialog(dialogValue: DialogData<Department>) {
    return this.confirmDialogService.open(DepartmentDialogComponent, dialogValue);
  }

}
