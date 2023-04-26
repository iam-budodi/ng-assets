import {Component, OnInit} from '@angular/core';
import {ITableColumn} from "../../../shared/models/table-column.model";
import {DialogData} from "../../../employee/model/dialog-data.model";
import {Supplier} from "../../../service";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Query} from "../../../shared/models/query.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ConfirmDialogService} from "../../../shared/dialog/confirm-dialog.service";
import {SUPPLIER_TABLE_COLUMNS} from "../model/supplier-table.config";
import {SupplierService} from "../supplier.service";
import {SupplierDialogComponent} from "../supplier-dialog/supplier-dialog.component";

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent  implements OnInit {
  supplierTableColumns!: ITableColumn[];
  dialogValue: DialogData<Supplier> = {mode: 'create'};
  initialPage: number = 0;
  tableData!: PaginationDataSource<Supplier, Query<any>>;
  addDeptButtonLabel: string = 'Add Supplier';
  pageTitle: string = 'Supplier Information';

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService:  ConfirmDialogService,
    private supplierService: SupplierService,
  ) {
  }

  ngOnInit(): void {
    this.supplierTableColumns = SUPPLIER_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Supplier, Query<any>>(
      (request: PageRequest<Supplier>, query: Query<any>) => this.supplierService.getSuppliers(request, query),
      {property: 'name', order: 'asc'},
      {search: undefined!, registration: undefined!}
    )
  }

  createSupplier = (): void => {
    this.dialogValue = {mode: 'create'};
    this.openSupplierDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully created supplier`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  };

  updateSupplier = (supplier: Supplier): void => {
    this.dialogValue = {mode: 'edit', dataObject: supplier};
    this.openSupplierDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated supplier`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deleteSupplier = (supplier: Supplier): void => {
    this.dialogValue = {mode: 'delete', dataObject: supplier};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted supplier`, 'Close', {
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

  openSupplierDialog = (dialogValue: DialogData<Supplier>) => {
    return this.dialogService.open(SupplierDialogComponent, dialogValue);
  }

  openConfirmationDialog = (dialogValue: DialogData<Supplier>) => {
    return this.confirmDialogService.open(SupplierDialogComponent, dialogValue);
  }

}
