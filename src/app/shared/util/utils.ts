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


export const toDateParser = (value: any): string => {
  const date: Date = new Date(value);
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

export const selectOptions = (objectDefinition: any) => {
  // console.log('Array of objects : ' + JSON.stringify(arrayObject));

  return Object.entries(objectDefinition).map(
    ([key, value]) => ({value: value, label: key})
  );
}
