import {Injectable} from '@angular/core';
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Allocation, AllocationEndpointService} from "../../service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/util/utils";
import {Query} from "../../shared/models/query.model";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  constructor(private datePipe: DatePipe, private assignmentService: AllocationEndpointService) {
  }

  getAssignments(request: PageRequest<Allocation>, query: Query<Date>): Observable<Page<Allocation>> {

    (request.size === 20) ? request.size = 5 : request.size;
    const date: string = this.datePipe.transform(query.registration, 'yyyy-MM-dd')!;

    return this.assignmentService
      .restAllocationsGet(date, request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Allocation>>) => {
            return httpGetAllHandler<Allocation>(response);
          }
        )
      );
  }

}
