import {Routes} from "@angular/router";
import {SupplierListComponent} from "./supplier/supplier-list/supplier-list.component";

export const inventoryRoutes: Routes = [
  {
    path: 'suppliers',
    component: SupplierListComponent
  }
]
