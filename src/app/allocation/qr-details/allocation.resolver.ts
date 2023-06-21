import {inject} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Allocation, AllocationEndpointService} from "../../service";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

export const allocationResolver: (route: ActivatedRouteSnapshot) => Observable<Allocation | null> = (route: ActivatedRouteSnapshot) => {
  return inject(AllocationEndpointService).restAllocationsAllocationIdGet(route.params['id'], 'response')
    .pipe(map((response: HttpResponse<Allocation>) => response.body)
    );
};
