import {Routes} from "@angular/router";
import {SupplierListComponent} from "./supplier/supplier-list/supplier-list.component";
import {PurchaseListComponent} from "./purchase/purchase-list/purchase-list.component";
import {ComputerListComponent} from "./computer/computer-list/computer-list.component";
import {CategoryListComponent} from "./category/category-list/category-list.component";

export const inventoryRoutes: Routes = [
  {
    path: 'assets',
    component: ComputerListComponent
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
