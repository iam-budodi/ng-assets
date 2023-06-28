import {Injectable} from '@angular/core';
import {Page, PageRequest} from "ngx-pagination-data-source";
import {
  AllocationEndpointService,
  AllocationStatus,
  EmployeeAsset,
  Transfer,
  TransferEndpointService
} from "../../service";
import {Query} from "../../shared/models/query.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/util/utils";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private datePipe: DatePipe, private transferService: TransferEndpointService, private allocation: AllocationEndpointService) {
  }

  getTransfers(request: PageRequest<Transfer>, query: Query<Date>): Observable<Page<Transfer>> {

    (request.size === 20) ? request.size = 5 : request.size;
    const date: string = this.datePipe.transform(query.registration, 'yyyy-MM-dd')!;

    return this.transferService
      .restTransfersGet(date, request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Transfer>>) => {
            return httpGetAllHandler<Transfer>(response);
          }
        )
      );
  }

  getAllocatedAssets(workId: string, status?: AllocationStatus): Observable<Array<EmployeeAsset>> {
    return this.allocation.restAllocationsWorkIdAssetsGet(workId, status)
      .pipe(map((response: HttpResponse<Array<EmployeeAsset>>) => {
            return response.body!;
          }
        )
      );
  }
}
