import {Injectable} from '@angular/core';
import {SelectOptions, Supplier, SupplierEndpointService} from "../../service";
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Query} from "../../shared/models/query.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/util/utils";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private supplierService: SupplierEndpointService) {
  }

  getSuppliers(request: PageRequest<Supplier>, query: Query<any>): Observable<Page<Supplier>> {
    (request.size === 20) ? request.size = 5 : request.size;

    return this.supplierService
      .restSuppliersGet(request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Supplier>>) => {
            return httpGetAllHandler<Supplier>(response);
          }
        )
      );
  }

  getSupplierSelectOptions(): Observable<Array<SelectOptions>> {
    return this.supplierService.restSuppliersSelectGet('response')
      .pipe(map((response: HttpResponse<Array<SelectOptions>>) => {
            return response.body!;
          }
        )
      );
  }
}
