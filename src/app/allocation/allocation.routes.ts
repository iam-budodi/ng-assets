import {Routes} from "@angular/router";
import {AssignListComponent} from "./assign/assign-list/assign-list.component";
import {TransferListComponent} from "./transfer/transfer-list/transfer-list.component";
import {QrPreviewComponent} from "./qr-preview/qr-preview.component";
import {QrDetailsComponent} from "./qr-details/qr-details.component";
import {allocationResolver} from "./qr-details/allocation.resolver";
import {QrTransferDetailsComponent} from "./qr-details/qr-transfer-details/qr-transfer-details.component";
import {transferResolver} from "./qr-details/qr-transfer-details/transfer-resolver.resolver";
import {AuthGuard} from "../navbar/auth.guard";

export const allocationRoutes: Routes = [
  {
    path: 'allocations', component: AssignListComponent, canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'allocations/:id',
    component: QrDetailsComponent,
    resolve: {allocation: allocationResolver},
    canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'transfers', component: TransferListComponent, canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'transfers/:id',
    component: QrTransferDetailsComponent,
    resolve: {transfer: transferResolver},
    canActivate: [AuthGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'qr-preview', component: QrPreviewComponent, canActivate: [AuthGuard],
    data: {roles: ['admin']}
  }
]
