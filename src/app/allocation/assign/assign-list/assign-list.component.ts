import {Component, OnInit} from '@angular/core';
import {ITableColumn} from "../../../shared/models/table-column.model";
import {DialogData} from "../../../employee/model/dialog-data.model";
import {Allocation} from "../../../service";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Query} from "../../../shared/models/query.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ConfirmDialogService} from "../../../shared/dialog/confirm-dialog.service";
import {AssignDialogComponent} from "../assign-dialog/assign-dialog.component";
import {ASSIGNMENT_TABLE_COLUMNS} from "../model/assign-table.config";
import {AssignService} from "../assign.service";

@Component({
  selector: 'app-assign-list',
  templateUrl: './assign-list.component.html',
  styleUrls: ['./assign-list.component.css']
})
export class AssignListComponent implements OnInit {
  assignmentTableColumns!: ITableColumn[];
  dialogValue!: DialogData<Allocation>;
  initialPage: number = 0;
  tableData!: PaginationDataSource<Allocation, Query<Date>>;
  assignButtonLabel: string = 'Assign Item';
  pageTitle: string = 'Assignment Information';

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    private assignmentService: AssignService,
  ) {
  }

  ngOnInit(): void {
    this.assignmentTableColumns = ASSIGNMENT_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Allocation, Query<Date>>(
      (request: PageRequest<Allocation>, query: Query<Date>) => this.assignmentService.getAssignments(request, query),
      {property: 'allocationDate', order: 'asc'},
      {registration: undefined!, search: undefined!}
    )
  }


  assignItem = () => {
    this.dialogValue = {mode: 'create'};
    this.openAssignDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully assign an item`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );

  };

  updateAssignment = (allocation: Allocation): void => {
    this.dialogValue = {mode: 'edit', dataObject: allocation};
    this.openAssignDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated assignment`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deleteAssignment = (allocation: Allocation) => {
    this.dialogValue = {mode: 'delete', dataObject: allocation};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted assignment`, 'Close', {
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

  openAssignDialog(dialogValue: DialogData<Allocation>) {
    return this.dialogService.open(AssignDialogComponent, dialogValue);
  }

  openConfirmationDialog(dialogValue: DialogData<Allocation>) {
    return this.confirmDialogService.open(AssignDialogComponent, dialogValue);
  }

}
