import {Component, OnInit} from '@angular/core';
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {College} from "../../../service";
import {Query} from "../../../shared/models/query.model";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ITableColumn} from "../../../shared/models/table-column.model";
import {DialogData} from "../../model/dialog-data.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogService} from "../../../shared/dialog/confirm-dialog.service";
import {CollegeService} from "../college.service";
import {CollegeDialogComponent} from "../college-dialog/college-dialog.component";
import {COLLEGE_TABLE_COLUMNS} from "../model/college-table.config";

@Component({
  selector: 'app-college-list',
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.css']
})
export class CollegeListComponent implements OnInit {
  collegeTableColumns!: ITableColumn[];
  dialogValue!: DialogData<College>;
  initialPage: number = 0;
  tableData!: PaginationDataSource<College, Query<any>>;
  addCollegeButtonLabel: string = 'Add College';
  pageTitle: string = 'College Information';

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    private collegeService: CollegeService,
  ) {
  }

  ngOnInit(): void {
    this.collegeTableColumns = COLLEGE_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<College, Query<any>>(
      (request: PageRequest<College>, query: Query<any>) => this.collegeService.getColleges(request, query),//this.departmentService.page(request, query),
      {property: undefined!, order: undefined!},
      {startDate: undefined, search: undefined!}
    )
  }

  createCollege = () => {
    this.dialogValue = {mode: 'create'};
    this.openCollegeDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully created college`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );

  };

  updateDepartment = (college: College): void => {
    this.dialogValue = {mode: 'edit', dataObject: college};
    this.openCollegeDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated college`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deleteDepartment = (college: College) => {
    this.dialogValue = {mode: 'delete', dataObject: college};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted college`, 'Close', {
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

  openCollegeDialog(dialogValue: DialogData<College>) {
    return this.dialogService.open(CollegeDialogComponent, dialogValue);
  }

  openConfirmationDialog(dialogValue: DialogData<College>) {
    return this.confirmDialogService.open(CollegeDialogComponent, dialogValue);
  }

}
