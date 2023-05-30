import {ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {Employee, EmployeeEndpointService} from "../service";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

export const employeeResolver: (route: ActivatedRouteSnapshot) => Observable<Employee | null> = (route: ActivatedRouteSnapshot) => {
  return inject(EmployeeEndpointService).restEmployeesIdGet(route.params['id'], 'response')
    .pipe(map((response: HttpResponse<Employee>) => response.body)
    );
};
