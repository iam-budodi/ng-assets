import {inject} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Allocation, Transfer, TransferEndpointService} from "../../../service";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

export const transferResolver: (route: ActivatedRouteSnapshot) => Observable<Allocation | null> = (route: ActivatedRouteSnapshot) => {
  return inject(TransferEndpointService).restTransfersTransferIdGet(route.params['id'], 'response')
    .pipe(map((response: HttpResponse<Transfer>) => response.body)
    );
};
