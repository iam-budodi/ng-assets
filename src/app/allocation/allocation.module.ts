import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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


@NgModule({
  declarations: [
    AssignDialogComponent,
    AssignListComponent,
    TransferDialogComponent,
    TransferListComponent
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
    SharedModule
  ]
})
export class AllocationModule {
}
