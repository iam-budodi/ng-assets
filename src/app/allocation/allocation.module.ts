import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignDialogComponent } from './assign/assign-dialog/assign-dialog.component';
import { AssignListComponent } from './assign/assign-list/assign-list.component';
import { TransferDialogComponent } from './transfer/transfer-dialog/transfer-dialog.component';
import { TransferListComponent } from './transfer/transfer-list/transfer-list.component';



@NgModule({
  declarations: [
    AssignDialogComponent,
    AssignListComponent,
    TransferDialogComponent,
    TransferListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AllocationModule { }
