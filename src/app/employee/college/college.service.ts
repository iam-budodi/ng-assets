import {Injectable} from '@angular/core';
import {College, CollegeEndpointService, SelectOptions} from "../../service";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/util/utils";
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private collegeService: CollegeEndpointService) {
  }

  getColleges(request: PageRequest<College>, query: any): Observable<Page<College>> {

    (request.size === 20) ? request.size = 5 : request.size;

    return this.collegeService
      .restCollegeGet(request.page, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<College>>) => {
            return httpGetAllHandler<College>(response);
          }
        )
      );
  }

  getCollegeSelectOptions(): Observable<Array<SelectOptions>> {
    return this.collegeService.restCollegeSelectGet('response')
      .pipe(map((response: HttpResponse<Array<SelectOptions>>) => {
            return response.body!;
          }
        )
      );
  }
}
