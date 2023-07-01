import {Component, OnInit} from '@angular/core';
import {ITableColumn} from "../../../shared/models/table-column.model";
import {DialogData} from "../../../employee/model/dialog-data.model";
import {Purchase} from "../../../service";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Query} from "../../../shared/models/query.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ConfirmDialogService} from "../../../shared/dialog/confirm-dialog.service";
import {PurchaseService} from "../purchase.service";
import {PurchaseDialogComponent} from "../purchase-dialog/purchase-dialog.component";
import {PURCHASE_TABLE_COLUMNS} from "../model/purchase-table.config";

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {
  purchaseTableColumns!: ITableColumn[];
  dialogValue: DialogData<Purchase> = {mode: 'create'};
  initialPage: number = 0;
  tableData!: PaginationDataSource<Purchase, Query<Date>>;
  addDeptButtonLabel: string = 'Add Purchase order';
  pageTitle: string = 'Purchase Information';

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    private purchaseService: PurchaseService,
  ) {
  }

  ngOnInit(): void {
    this.purchaseTableColumns = PURCHASE_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Purchase, Query<Date>>(
      (request: PageRequest<Purchase>, query: Query<Date>) => this.purchaseService.getPurchases(request, query),
      {property: 'invoiceNumber', order: 'asc'},
      {search: undefined!, startDate: undefined!}
    )
  }

  createPurchase = (): void => {
    this.dialogValue = {mode: 'create'};
    this.openPurchaseDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully created purchase order`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  };

  updatePurchase = (purchase: Purchase): void => {
    this.dialogValue = {mode: 'edit', dataObject: purchase};
    this.openPurchaseDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated purchase order`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deletePurchase = (purchase: Purchase): void => {
    this.dialogValue = {mode: 'delete', dataObject: purchase};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted purchase order`, 'Close', {
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

  openPurchaseDialog = (dialogValue: DialogData<Purchase>) => {
    return this.dialogService.open(PurchaseDialogComponent, dialogValue);
  }

  openConfirmationDialog = (dialogValue: DialogData<Purchase>) => {
    return this.confirmDialogService.open(PurchaseDialogComponent, dialogValue);
  }

}
