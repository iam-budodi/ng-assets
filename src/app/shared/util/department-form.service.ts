import {Injectable} from '@angular/core';
import {EmployeeFormService} from "./employee-form.service";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Injectable({
  providedIn: 'root'
})
export class DepartmentFormService {

  private DEPARTMENT_FORM_FIELD: FormlyFieldConfig[] = [
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
            label: 'Department Name',
            placeholder: 'Enter name',
            required: true,
            minLength: 2,
            maxLength: 64
          }
        },
        {
          key: 'code',
          type: 'input',
          className: 'flex-3',
          props: {
            label: 'Department Code',
            placeholder: 'Enter code',
            required: false,
            minLength: 2,
            maxLength: 10,
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
    {
      key: 'location',
      wrappers: ['panel'],
      props: {
        label: 'Address'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: this.formlyEmployee.addressFields()
    }
  ]

  constructor(private formlyEmployee: EmployeeFormService) {
  }

  getDepartmentFormFields(): FormlyFieldConfig[] {
    return this.DEPARTMENT_FORM_FIELD;
  }
}
