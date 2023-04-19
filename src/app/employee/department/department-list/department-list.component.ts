import {Component, OnInit} from '@angular/core';
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Department} from "../../../service";
import {Query} from "../../../shared/query.model";
import {DialogService} from "../../../dialog/dialog.service";
import {DepartmentService} from "../department.service";
import {ITableColumn} from "../../model/table-column.model";
import {DEPARTMENT_TABLE_COLUMNS} from "../model/dept-form.config";
import {DepartmentDialogComponent} from "../department-dialog/department-dialog.component";
import {DialogData} from "../../model/dialog-data.model";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private departmentService: DepartmentService,
  ) {
  }

  ngOnInit(): void {
    this.departmentTableColumns = DEPARTMENT_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Department, Query<any>>(
      (request: PageRequest<Department>, query: Query<any>) => this.departmentService.page(request, query),
      {property: 'name', order: 'asc'},
      {registration: undefined, search: undefined!}
    )
  }

  createDepartment = () => {
    this.dialogValue = {mode: 'create'};
    this.openDepartmentDialog(this.dialogValue).afterClosed().subscribe(result => console.log(result));

  };

  updateDepartment = (department: Department) => {
    this.dialogValue = {mode: 'edit', dataObject: department};
    this.openDepartmentDialog(this.dialogValue).afterClosed().subscribe(result => {
        console.log('RESULT VAL : ' + result);
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated department`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success'
            }
          );
        } else {
          this.snackBar.open(`Failed to update department`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'error'
            }
          );
        }
      }
    );
  };

  deleteDepartment = (department: Department) => {
    this.dialogValue = {mode: 'delete', dataObject: department};
    this.openDepartmentDialog(this.dialogValue).afterClosed().subscribe(result => {
        console.log(result)
        this.reloadDataOnChanges();
        this.snackBar.open(`Successfully deleted department}`, 'Close', {
            duration: 5000,
            // verticalPosition: 'top',
            panelClass: 'success'
          }
        );
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

}
