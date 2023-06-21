import {Injectable} from "@angular/core";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {EmployeeFormService} from "./employee-form.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryFormService {

  private CATEGORY_FORM_FIELD: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    this.formlyEmployee.formlyRow(
      [
        {
          key: 'name',
          type: 'input',
          className: 'flex-3',
          props: {
            label: 'Category Name',
            placeholder: 'Enter name',
            required: true,
            minLength: 2,
            maxLength: 64
          }
        }
      ]
    ),
    this.formlyEmployee.formlyRow([
        {
          key: 'description',
          type: 'textarea',
          className: 'flex-6',
          props: {
            label: 'Description',
            placeholder: 'Enter description (Optional)',
            required: false,
            minLength: 1,
            maxLength: 400,
            rows: 2
          }
        }
      ]
    ),
  ]

  constructor(private formlyEmployee: EmployeeFormService) {
  }

  getCategoryFormFields(): FormlyFieldConfig[] {
    return this.CATEGORY_FORM_FIELD;
  }
}
