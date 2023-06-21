import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeAsset, Transfer} from "../../../../service";
import {DialogData} from "../../../../employee/model/dialog-data.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogService} from "../../../../shared/dialog/dialog.service";
import {MatTableDataSource} from "@angular/material/table";
import {TransferDialogComponent} from "../../transfer-dialog/transfer-dialog.component";

@Component({
  selector: 'app-owned-dialog',
  templateUrl: './owned-dialog.component.html',
  styleUrls: ['./owned-dialog.component.css']
})
export class OwnedDialogComponent implements OnInit {
  dialogValue!: DialogData<any>;
  pageTitle: string = 'All Employee Assets';


  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['brand', 'model', 'serialNumber', 'category', 'status', 'transfer'];

  employeeAsset!: EmployeeAsset[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OwnedDialogComponent>,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    const {dataObject} = this.data.data
    this.employeeAsset = dataObject;
    this.dataSource = new MatTableDataSource(this.employeeAsset);
  }

  itemTransfer = (serialNumber: string): void => {
    const asset: EmployeeAsset = this.employeeAsset.find((asset: EmployeeAsset): boolean => asset.asset?.serialNumber === serialNumber)!;

    this.dialogValue = {mode: 'create', dataObject: asset};
    this.openTransferDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.snackBar.open(`Successfully transfer item to new custodian`, 'Close', {
              duration: 5000,
              // verticalPosition: 'top',
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  }

  openTransferDialog(dialogValue: DialogData<Transfer>) {
    return this.dialogService.open(TransferDialogComponent, dialogValue);
  }

}
