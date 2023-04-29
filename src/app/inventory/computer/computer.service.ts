import {Injectable} from '@angular/core';
import {Computer, ComputerEndpointService, LocalDate} from "../../service";
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

  constructor(private computerService: ComputerEndpointService, private datePipe: DatePipe) { }

  getComputers(request: PageRequest<Computer>, query: Query<LocalDate>): Observable<Page<Computer>>  {
    (request.size === 20) ? request.size = 5 : request.size;
    const date: string = this.datePipe.transform(query.registration, 'yyyy-MM-dd')!;

    return this.computerService
      .restComputersGet(date, request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Computer>>) => {
            return httpGetAllHandler<Computer>(response);
          }
        )
      );
  }
}
