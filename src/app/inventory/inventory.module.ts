import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupplierDialogComponent} from './supplier/supplier-dialog/supplier-dialog.component';
import {SupplierListComponent} from './supplier/supplier-list/supplier-list.component';
import {PurchaseDialogComponent} from './purchase/purchase-dialog/purchase-dialog.component';
import {PurchaseListComponent} from './purchase/purchase-list/purchase-list.component';
import {ComputerDialogComponent} from './computer/computer-dialog/computer-dialog.component';
import {ComputerListComponent} from './computer/computer-list/computer-list.component';
import {CategoryDialogComponent} from './category/category-dialog/category-dialog.component';
import {CategoryListComponent} from './category/category-list/category-list.component';
import {FormlyModule} from "@ngx-formly/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {EmployeeModule} from "../employee/employee.module";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterLink, RouterModule} from "@angular/router";
import {inventoryRoutes} from "./inventory.routes";


@NgModule({
  declarations: [
    SupplierDialogComponent,
    SupplierListComponent,
    PurchaseDialogComponent,
    PurchaseListComponent,
    ComputerDialogComponent,
    ComputerListComponent,
    CategoryDialogComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    FormlyModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
    EmployeeModule,
    ExtendedModule,
    FlexModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink,
    RouterModule.forChild(inventoryRoutes)
  ]
})
export class InventoryModule {
}
