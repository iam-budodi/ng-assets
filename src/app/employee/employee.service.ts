import {Injectable} from "@angular/core";
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Employee, EmployeeEndpointService, SelectOptions} from "../service";
import {Query} from "../shared/models/query.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {httpGetAllHandler} from "../shared/util/utils";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private datePipe: DatePipe, private employeeService: EmployeeEndpointService) {
  }

  getEmployees(request: PageRequest<Employee>, query: Query<Date>): Observable<Page<Employee>> {

    (request.size === 20) ? request.size = 5 : request.size;
    const date: string = this.datePipe.transform(query.startDate, 'yyyy-MM-dd')!;

    return this.employeeService
      .restEmployeesGet(date, request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Employee>>) => {
            return httpGetAllHandler<Employee>(response);
          }
        )
      );
  }

  getEmployeesSelectOptions(): Observable<Array<SelectOptions>> {
    return this.employeeService.restEmployeesSelectGet('response')
      .pipe(map((response: HttpResponse<Array<SelectOptions>>) => {
            return response.body!;
          }
        )
      );
  }
}
