import { Injectable } from '@angular/core';
import {Department, DepartmentEndpointService, DepartmentSelectOptions} from "../../service";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../../shared/util/utils";
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private departmentService: DepartmentEndpointService) { }

  getDepartments(request: PageRequest<Department>, query: any): Observable<Page<Department>> {

    (request.size === 20) ? request.size = 5 : request.size;

    return this.departmentService
      .restDepartmentsGet(request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Department>>) => {
            return httpGetAllHandler<Department>(response);
          }
        )
      );
  }

  getDepartmentSelectOptions(): Observable<Array<DepartmentSelectOptions>> {
    return this.departmentService.restDepartmentsSelectGet('response')
      .pipe(map((response: HttpResponse<Array<DepartmentSelectOptions>>) => {
        return response.body!;
      }));
  }
}
