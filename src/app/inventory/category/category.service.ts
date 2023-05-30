import {Injectable} from '@angular/core';
import {CategoryEndpointService, SelectOptions} from "../../service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private categoryService: CategoryEndpointService) {
  }


  // getCategories(request: PageRequest<Category>, query: any): Observable<Page<Category>> {
  //
  //   (request.size === 20) ? request.size = 5 : request.size;
  //
  // return this.categoryService
  //   .restDepartmentsGet(request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
  //   .pipe(map((response: HttpResponse<Array<Department>>) => {
  //         return httpGetAllHandler<Department>(response);
  //       }
  //     )
  //   );
  // }

  getCategoriesSelectOptions(): Observable<Array<SelectOptions>> {
    return this.categoryService.restCategoriesSelectGet('response')
      .pipe(map((response: HttpResponse<Array<SelectOptions>>) => {
            return response.body!;
          }
        )
      );
  }
}
