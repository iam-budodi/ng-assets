import {Component, OnInit} from '@angular/core';
import {ITableColumn} from "../../../shared/models/table-column.model";
import {DialogData} from "../../../employee/model/dialog-data.model";
import {Computer} from "../../../service";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Query} from "../../../shared/models/query.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ConfirmDialogService} from "../../../shared/dialog/confirm-dialog.service";
import {ComputerService} from "../computer.service";
import {ComputerDialogComponent} from "../computer-dialog/computer-dialog.component";
import {COMPUTER_TABLE_COLUMNS} from "../model/computer-table.config";

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
})
export class ComputerListComponent implements OnInit {
  computerTableColumns!: ITableColumn[];
  dialogValue: DialogData<Computer> = {mode: 'create'};
  initialPage: number = 0;
  tableData!: PaginationDataSource<Computer, Query<Date>>;
  addButtonLabel: string = 'Add Computer';
  pageTitle: string = 'Computer Information';

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    private computerService: ComputerService,
  ) {
  }

  ngOnInit(): void {
    this.computerTableColumns = COMPUTER_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Computer, Query<Date>>(
      (request: PageRequest<Computer>, query: Query<Date>) => this.computerService.getComputers(request, query),
      {property: 'model', order: 'asc'},
      {search: undefined!, registration: undefined!}
    )
  }

  createPurchase = (): void => {
    this.dialogValue = {mode: 'create'};
    this.openComputerDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully created computer asset`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  };

  updateComputer = (computer: Computer): void => {
    this.dialogValue = {mode: 'edit', dataObject: computer};
    this.openComputerDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated computer`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deleteComputer = (computer: Computer): void => {
    this.dialogValue = {mode: 'delete', dataObject: computer};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted computer`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  };

  reloadDataOnChanges = (): void => {
    this.tableData.fetch(this.initialPage);
  }

  openComputerDialog = (dialogValue: DialogData<Computer>) => {
    return this.dialogService.open(ComputerDialogComponent, dialogValue);
  }

  openConfirmationDialog = (dialogValue: DialogData<Computer>) => {
    return this.confirmDialogService.open(ComputerDialogComponent, dialogValue);
  }


}
