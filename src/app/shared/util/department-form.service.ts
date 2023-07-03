import {Injectable} from '@angular/core';
import {EmployeeFormService} from "./employee-form.service";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {CollegeService} from "../../employee/college/college.service";

@Injectable({
  providedIn: 'root'
})
export class DepartmentFormService {

  private DEPARTMENT_FORM_FIELD: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    {
      key: 'college',
      wrappers: ['panel'],
      props: {
        label: 'College'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          className: 'flex-2',
          props: {
            label: 'College Name',
            placeholder: 'Select college',
            options: this.collegeService.getCollegeSelectOptions(),
            required: true,
          }
        },
      ]
    },
    this.formlyEmployee.formlyRow(
      [
        {
          key: 'departmentName',
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
          key: 'departmentCode',
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
  ]

  constructor(private formlyEmployee: EmployeeFormService, private collegeService: CollegeService) {
  }

  getDepartmentFormFields(): FormlyFieldConfig[] {
    return this.DEPARTMENT_FORM_FIELD;
  }
}
