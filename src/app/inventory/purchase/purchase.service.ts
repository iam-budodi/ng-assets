import {Injectable} from '@angular/core';
import {Purchase, PurchaseEndpointService, SelectOptions} from "../../service";
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Query} from "../../shared/models/query.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/util/utils";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private purchaseService: PurchaseEndpointService, private datePipe: DatePipe) {
  }

  getPurchases(request: PageRequest<Purchase>, query: Query<Date>): Observable<Page<Purchase>> {
    (request.size === 20) ? request.size = 5 : request.size;
    const date: string = this.datePipe.transform(query.registration, 'yyyy-MM-dd')!;

    return this.purchaseService
      .restPurchasesGet(date, request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Purchase>>) => {
            return httpGetAllHandler<Purchase>(response);
          }
        )
      );
  }

  getPurchaseSelectOptions(): Observable<Array<SelectOptions>> {
    return this.purchaseService.restPurchasesSelectGet('response')
      .pipe(map((response: HttpResponse<Array<SelectOptions>>) => {
            return response.body!;
          }
        )
      );
  }
}
