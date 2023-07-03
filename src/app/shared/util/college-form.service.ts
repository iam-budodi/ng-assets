import {Injectable} from "@angular/core";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {EmployeeFormService} from "./employee-form.service";

@Injectable({
  providedIn: 'root'
})
export class CollegeFormService {

  private COLLEGE_FORM_FIELD: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    this.formlyEmployee.formlyRow(
      [
        {
          key: 'collegeName',
          type: 'input',
          className: 'flex-3',
          props: {
            label: 'College Name',
            placeholder: 'Enter college name',
            required: true,
            minLength: 2,
            maxLength: 64
          }
        },
        {
          key: 'collegeCode',
          type: 'input',
          className: 'flex-3',
          props: {
            label: 'College Code',
            placeholder: 'Enter college code',
            required: false,
            minLength: 2,
            maxLength: 10,
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

  getCollegeFormFields(): FormlyFieldConfig[] {
    return this.COLLEGE_FORM_FIELD;
  }
}
