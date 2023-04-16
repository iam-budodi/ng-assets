import {FormComponent} from "../form/container/form/form.component";
import {HttpResponse} from "@angular/common/http";
import {Page} from "ngx-pagination-data-source";

export const formChangesControl: (form: FormComponent, valueObject: any) => void = (form: FormComponent, valueObject: any): void => {
  let previousValid: boolean = form.valid;
  form.changes.subscribe((): void => {
    if (form.valid !== previousValid) {
      previousValid = form.valid;
      form.setDisabled('submit', !previousValid);
    }
  });

  form.setDisabled('submit', true);
  // form.setValue('firstName', 'Samuel');

  if (valueObject) {
    Object.entries(valueObject).forEach(([name, value]) => {
      form.setValue(name, value);
      // console.log('KEY : ' + name + ' VAL : ' + value);
    });
    // this.form.setDisabled('id', true);
  }
}

export const httpGetAllHandler = <T>(response: HttpResponse<Array<T>>): Page<T> => {
  const linkHeader: string | null = response.headers.get('Link');
  const totalElements: string | null = response.headers.get('X-Total-Count');
  const employees: T[] = response.body || [];

  return {
    content: employees,
    totalElements: totalElements ? parseInt(totalElements, 10) : 0,
    size: 5,
    number: 0
  };
}
