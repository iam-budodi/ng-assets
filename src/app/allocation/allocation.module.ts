import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from '@angular/common';
import {AssignDialogComponent} from './assign/assign-dialog/assign-dialog.component';
import {AssignListComponent} from './assign/assign-list/assign-list.component';
import {TransferDialogComponent} from './transfer/transfer-dialog/transfer-dialog.component';
import {TransferListComponent} from './transfer/transfer-list/transfer-list.component';
import {EmployeeModule} from "../employee/employee.module";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterLink, RouterModule} from "@angular/router";
import {allocationRoutes} from "./allocation.routes";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {AssetsOwnedComponent} from './transfer/assets-owned/assets-owned.component';
import {OwnedDialogComponent} from './transfer/assets-owned/owned-dialog/owned-dialog.component';
import {TransferService} from "./transfer/transfer.service";
import {MaterialModule} from "../material.module";
import {SearchDialogComponent} from "./transfer/assets-owned/search-dialog/search-dialog.component";
import {QrPreviewComponent} from './qr-preview/qr-preview.component';
import {QrDetailsComponent} from './qr-details/qr-details.component';
import {QrTransferDetailsComponent} from './qr-details/qr-transfer-details/qr-transfer-details.component';


@NgModule({
  declarations: [
    AssignDialogComponent,
    AssignListComponent,
    TransferDialogComponent,
    TransferListComponent,
    AssetsOwnedComponent,
    OwnedDialogComponent,
    SearchDialogComponent,
    QrPreviewComponent,
    QrDetailsComponent,
    QrTransferDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeeModule,
    ExtendedModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink,
    RouterModule.forChild(allocationRoutes),
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    NgOptimizedImage
  ],

  providers: [DatePipe, TransferService]
})
export class AllocationModule {
}
