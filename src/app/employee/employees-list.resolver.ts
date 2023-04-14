import {inject} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Employee, EmployeeEndpointService} from "../service";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

// export const employeesListResolver: (route: ActivatedRouteSnapshot) => Observable<{
//   employees: Employee[] | null,
//   linkHeader: string | null,
//   totalCountHeader: string | null
// }> = (route: ActivatedRouteSnapshot) => {
//   const page: number = route.queryParams['page'] || 0;
//   const size: number = route.queryParams['size'] || 5;

  // return inject(EmployeeEndpointService)
  //   .restEmployeesGet(page, size, 'response')
  //   .pipe(map((response: HttpResponse<Array<Employee>>) => {
  //     const linkHeader: string | null = response.headers.get('Link');
  //     const totalCountHeader: string | null = response.headers.get('X-Total-Count');
  //     const employees: Employee[] | null = response.body;
  //
  //     return {
  //       employees,
  //       linkHeader,
  //       totalCountHeader
  //     };
  //   }
  //   ));
//   return null;
// };


// export const employeesListResolver: (route: ActivatedRouteSnapshot) => Observable<{
//   employees: Employee[] | null,
//   linkHeader: string | null,
//   totalCountHeader: string | null
// }> = (route: ActivatedRouteSnapshot) => {
//   const page: number = route.queryParams['page'] || 0;
//   const size: number = route.queryParams['size'] || 5;
//
//   return inject(EmployeeEndpointService)
//     .restEmployeesGet(page, size, 'response')
//     .pipe(map((response: HttpResponse<Array<Employee>>) => {
//         const linkHeader: string | null = response.headers.get('Link');
//         const totalCountHeader: string | null = response.headers.get('X-Total-Count');
//         const employees: Employee[] | null = response.body;
//
//         return {
//           employees,
//           linkHeader,
//           totalCountHeader
//         };
//       }
//     ));
// };
