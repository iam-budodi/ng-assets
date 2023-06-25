import {Routes} from "@angular/router";
import {SupplierListComponent} from "./supplier/supplier-list/supplier-list.component";
import {PurchaseListComponent} from "./purchase/purchase-list/purchase-list.component";
import {ComputerListComponent} from "./computer/computer-list/computer-list.component";
import {CategoryListComponent} from "./category/category-list/category-list.component";
import {AuthGuard} from "../navbar/auth.guard";

export const inventoryRoutes: Routes = [
  {
    path: 'assets',
    component: ComputerListComponent,
    canActivate: [AuthGuard],
    data: {roles: ['procure']}
  },
  {
    path: 'suppliers',
    component: SupplierListComponent
  },
  {
    path: 'purchases',
    component: PurchaseListComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  }
]
