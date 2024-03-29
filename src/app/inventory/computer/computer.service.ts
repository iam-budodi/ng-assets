import {Injectable} from '@angular/core';
import {Computer, ComputerEndpointService, Employee, SelectOptions} from "../../service";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs";
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Query} from "../../shared/models/query.model";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/util/utils";

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor(private computerService: ComputerEndpointService, private datePipe: DatePipe) {
  }

  getComputers(request: PageRequest<Computer>, query: Query<Date>): Observable<Page<Computer>> {
    (request.size === 20) ? request.size = 5 : request.size;
    const date: string = this.datePipe.transform(query.startDate, 'yyyy-MM-dd')!;

    return this.computerService
      .restComputersGet(date, request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Computer>>) => {
            return httpGetAllHandler<Computer>(response);
          }
        )
      );
  }

  getAllocationSelectOptions(): Observable<Array<SelectOptions>> {
    return this.computerService.restComputersSelectAllocationGet('response')
      .pipe(map((response: HttpResponse<Array<SelectOptions>>) => {
            return response.body!;
          }
        )
      );
  }

  getTransferSelectOptions(): Observable<Array<SelectOptions>> {
    return this.computerService.restComputersSelectTransferGet('response')
      .pipe(map((response: HttpResponse<Array<SelectOptions>>) => {
            return response.body!;
          }
        )
      );
  }

  dataForReports(request: PageRequest<Computer>, query: Query<Date>): Observable<Page<Computer>> {

    (request.size === 20) ? request.size = 5 : request.size;
    const startDate: string = this.datePipe.transform(query.startDate, 'yyyy-MM-dd')!;
    const endDate: string = this.datePipe.transform(query.endDate, 'yyyy-MM-dd')!;

    console.log('START: ' + startDate + ' AND ' + 'END : ' + endDate);

    return this.computerService.restComputersReportGet(endDate, startDate, 'response').pipe(
      map((response: HttpResponse<Array<Computer>>) => {
          return httpGetAllHandler<Computer>(response);
        }
      )
    );

  }

}
