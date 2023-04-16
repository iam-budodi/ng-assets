import {Injectable} from '@angular/core';
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Department, DepartmentEndpointService} from "../../service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/utils";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private departmentService: DepartmentEndpointService) {
  }

  page(request: PageRequest<Department>, query: any): Observable<Page<Department>> {

    (request.size === 20) ? request.size = 5 : request.size;

    return this.departmentService
      .restDepartmentsGet(request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Department>>) => {
            return httpGetAllHandler<Department>(response);
          }
        )
      );
  }
}
