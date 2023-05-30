import {Routes} from "@angular/router";
import {AssignListComponent} from "./assign/assign-list/assign-list.component";
import {TransferListComponent} from "./transfer/transfer-list/transfer-list.component";

export const allocationRoutes: Routes = [
  {path: 'allocates', component: AssignListComponent},
  {path: 'transfer', component: TransferListComponent}
]
