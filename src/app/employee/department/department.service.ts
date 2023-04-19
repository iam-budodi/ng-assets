import {Injectable} from '@angular/core';
import {Page, PageRequest} from "ngx-pagination-data-source";
import {Department, DepartmentEndpointService} from "../../service";
import {catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
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

  createDepartment(department: Department): Observable<HttpResponse<string>> {
    return this.departmentService.restDepartmentsPost(department, 'response')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${error.error.message}`;
          } else if (error.status === 400) {
            // Bad request error (e.g. validation error)
            errorMessage = `Invalid request: ${error.error}`;
          } else {
            // Other backend errors
            errorMessage = `Failed to create department: ${error.error}`;
          }
          console.log('IS IT UNDF : ' + JSON.stringify(error.error));
          return throwError(() => errorMessage);
        })
      );
  }

  updateDepartment(department: Department): Observable<HttpResponse<string>> {
    return this.departmentService.restDepartmentsIdPut(department, department.id!, 'response')
      .pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage: string;
            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred. Handle it accordingly.
              errorMessage = `An error occurred: ${error.error.message}`;
            } else if (error.status === 409) {
              // Bad request error (e.g. validation error)
              errorMessage = `Conflict request: ${error.error}`;
            } else {
              // Other backend errors
              errorMessage = `Failed to update department: ${error.error}`;
            }
            return throwError(() => errorMessage);
          }
        )
      );
  }

  deleteDepartment(department: Department): Observable<HttpResponse<string>> {
    return this.departmentService.restDepartmentsIdDelete(department.id!, 'response')
      .pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage: string;
            if (error.error instanceof ErrorEvent) {
              // A client-side or network error occurred. Handle it accordingly.
              errorMessage = `An error occurred: ${error.error.message}`;
            } else if (error.status === 404) {
              // Bad request error (e.g. validation error)
              errorMessage = `Not Found: ${error.error}`;
            } else {
              // Other backend errors
              errorMessage = `Failed to delete department: ${error.error}`;
            }
            return throwError(() => errorMessage);
          }
        )
      );
  }
}
