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
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {EmployeeModule} from "../employee/employee.module";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {RouterLink, RouterModule} from "@angular/router";
import {inventoryRoutes} from "./inventory.routes";
import {MaterialModule} from "../material.module";
import {CategoryService} from "./category/category.service";


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
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    EmployeeModule,
    ExtendedModule,
    FlexModule,
    RouterLink,
    RouterModule.forChild(inventoryRoutes)
  ],
  providers: [CategoryService]
})
export class InventoryModule {
}
