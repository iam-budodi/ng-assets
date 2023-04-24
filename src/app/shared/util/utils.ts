import {HttpResponse} from "@angular/common/http";
import {Page} from "ngx-pagination-data-source";

export const httpGetAllHandler = <T>(response: HttpResponse<Array<T>>): Page<T> => {
  const linkHeader: string | null = response.headers.get('Link');
  const totalElements: string | null = response.headers.get('X-Total-Count');
  const body: T[] = response.body || [];

  return {
    content: body,
    totalElements: totalElements ? parseInt(totalElements, 10) : 0,
    size: 5,
    number: 0
  };
}

export const httpIdGetHandler = <T>(response: HttpResponse<T>): T => {
  return response.body!;
}
