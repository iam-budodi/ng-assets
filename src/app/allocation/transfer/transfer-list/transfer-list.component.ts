import {Component} from '@angular/core';
import {ITableColumn} from "../../../shared/models/table-column.model";
import {DialogData} from "../../../employee/model/dialog-data.model";
import {EmployeeAsset, Transfer} from "../../../service";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Query} from "../../../shared/models/query.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ConfirmDialogService} from "../../../shared/dialog/confirm-dialog.service";
import {TransferDialogComponent} from "../transfer-dialog/transfer-dialog.component";
import {TransferService} from "../transfer.service";
import {SearchDialogComponent} from "../assets-owned/search-dialog/search-dialog.component";
import {TRANSFER_TABLE_COLUMNS} from "../model/transfer-table";
import {OwnedDialogComponent} from "../assets-owned/owned-dialog/owned-dialog.component";

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent {
  transferTableColumns!: ITableColumn[];
  dialogValue!: DialogData<any>;
  initialPage: number = 0;
  tableData!: PaginationDataSource<Transfer, Query<Date>>;
  transferButtonLabel: string = 'Change Item Ownership';
  pageTitle: string = 'Asset Ownership Information';


  employeeAsset!: EmployeeAsset[];

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    private transferService: TransferService,
  ) {
  }

  ngOnInit(): void {
    this.transferTableColumns = TRANSFER_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Transfer, Query<Date>>(
      (request: PageRequest<Transfer>, query: Query<Date>) => this.transferService.getTransfers(request, query),
      {property: 'transferDate', order: 'asc'},
      {startDate: undefined!, search: undefined!}
    )
  }


  transferItem = () => {
    this.dialogValue = {mode: 'create'};
    this.openSearchDialog(this.dialogValue).afterClosed().subscribe(assets => {
        if (Array.isArray(assets) && assets.every(element => typeof element === 'object')) {
          this.openOwnedAssetDialog(assets).afterClosed().subscribe(result => {
            this.reloadDataOnChanges();
          });
        }
      }
    )


  };


  updateTransfer = (transfer: Transfer): void => {
    this.dialogValue = {mode: 'edit', dataObject: transfer};
    this.openTransferDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated record`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deleteTransfer = (transfer: Transfer) => {
    this.dialogValue = {mode: 'delete', dataObject: transfer};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted record`, 'Close', {
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

  openSearchDialog(dialogValue: DialogData<any>) {
    return this.dialogService.open(SearchDialogComponent, dialogValue);
  }

  openOwnedAssetDialog(asset: EmployeeAsset[]) {
    const dialogValue = {mode: 'list', dataObject: asset};
    return this.dialogService.open(OwnedDialogComponent, dialogValue);
  }

  openTransferDialog(dialogValue: DialogData<Transfer>) {
    return this.dialogService.open(TransferDialogComponent, dialogValue);
  }

  openConfirmationDialog(dialogValue: DialogData<Transfer>) {
    return this.confirmDialogService.open(TransferDialogComponent, dialogValue);
  }

}
