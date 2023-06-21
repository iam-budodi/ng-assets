import {Injectable} from '@angular/core';
import {Category, CategoryEndpointService, SelectOptions} from "../../service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {Page, PageRequest} from "ngx-pagination-data-source";
import {httpGetAllHandler} from "../../shared/util/utils";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private categoryService: CategoryEndpointService) {
  }


  getCategories(request: PageRequest<Category>, query: any): Observable<Page<Category>> {

    (request.size === 20) ? request.size = 5 : request.size;

    return this.categoryService
      .restCategoriesGet(request.sort?.order, request.page, request.sort?.property, query.search, request.size, 'response')
      .pipe(map((response: HttpResponse<Array<Category>>) => {
            return httpGetAllHandler<Category>(response);
          }
        )
      );
  }

  getCategoriesSelectOptions(): Observable<Array<SelectOptions>> {
    return this.categoryService.restCategoriesSelectGet('response')
      .pipe(map((response: HttpResponse<Array<SelectOptions>>) => {
            return response.body!;
          }
        )
      );
  }
}
