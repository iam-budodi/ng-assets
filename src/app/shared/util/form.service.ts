import { Injectable } from '@angular/core';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {ITableColumn} from "../../employee/model/table-column.model";
import {DepartmentService} from "../../employee/department/department.service";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  EMPLOYEE_FORM_FIELD: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    formlyRow([
      {
        key: 'firstName',
        type: 'input',
        className: 'flex-2',
        props: {
          label: 'Firstname',
          placeholder: 'Enter firstname',
          required: true,
          minLength: 3,
          maxLength: 64,
        }
      },
      {
        key: "middleName",
        type: 'input',
        className: 'flex-2',
        props: {
          label: 'Middle name',
          placeholder: 'Enter middle name',
          required: true,
          minLength: 3,
          maxLength: 64,
        }
      },
      {
        key: 'lastName',
        type: 'input',
        className: 'flex-2',
        props: {
          label: 'Lastname',
          placeholder: 'Enter lastname',
          required: true,
          minLength: 3,
          maxLength: 64,
        }
      }
    ]),
    formlyRow([
      {
        key: 'gender',
        type: 'select',
        className: 'flex-1',
        props: {
          label: "Gender",
          options: [
            {
              value: null,
              label: ' -- '
            },
            {
              value: 'M',
              label: 'M'
            },
            {
              value: 'F',
              label: 'F'
            }
          ],
          required: true,
          minLength: 1,
          maxLength: 1,
        }
      },
      {
        key: 'dateOfBirth',
        type: 'datepicker',
        className: 'flex-1',
        props: {
          required: true,
          label: 'date of Birth'

        }
      },
      {
        key: 'email',
        type: 'input',
        className: 'flex-2',
        props: {
          label: 'Email address',
          placeholder: 'Enter email',
          required: true,
          minLength: 4,
          maxLength: 64
        }
      },
      {
        key: 'mobile',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Phone number',
          placeholder: 'Enter phone',
          required: true,
          minLength: 9,
          maxLength: 13
        }
      },
      {
        key: 'hireDate',
        type: 'datepicker',
        className: 'flex-1',
        props: {
          required: true,
          label: "Hired Date",
        },
      },
      {
        key: 'workId',
        type: 'input',
        className: 'flex-1',
        props: {
          label: 'Work ID',
          placeholder: 'Enter ID',
          required: true,
          minLength: 9,
          maxLength: 13
        }
      },
      {
        key: 'status',
        type: 'select',
        className: 'flex-2',
        props: {
          label: 'Job Status',
          multiple: true,
          // options: this.formlyService.getCountries(),
          options: [
            {
              value: null,
              label: ' -- '
            },
            {
              value: 'CONTRACT',
              label: 'Contract'
            }
          ],
          required: true,
        }
      },

    ]),
    {
      key: 'department',
      wrappers: ['panel'],
      props: {
        label: 'Department'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          className: 'flex-3',
          props: {
            label: 'Department Name',
            placeholder: 'Select department',
            options: this.departmentService.getDepartmentSelectOptions(),
            required: true,
            minLength: 2,
            maxLength: 64
          }
        },
      ]
    },
    {
      key: 'address',
      wrappers: ['panel'],
      props: {
        label: 'Address'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id'
        },
        {
          key: 'country',
          type: 'select',
          className: 'flex-2',
          props: {
            label: 'Country',
            // options: this.formlyService.getCountries(),
            options: [
              {
                value: null,
                label: ' -- '
              },
              {
                value: 'Tanzania',
                label: 'Tanzania'
              }
            ],
            required: true,
            minLength: 2,
            maxLength: 32,
          }
        },
        {
          key: 'city',
          type: 'select',
          className: 'flex-2',
          props: {
            label: 'City',
            // options: this.formlyService.getCities(),
            options: [
              {
                value: null,
                label: ' -- '
              },
              {
                value: 'Dar es Salaam',
                label: 'Dar es Salaam'
              },
              {
                value: 'Iringa',
                label: 'Mbeya'
              },
              {
                value: 'Iringa',
                label: 'Iringa'
              }
            ],
            valueProp: 'value',
            labelProp: 'label',
            required: true,
            minLength: 2,
            maxLength: 32,
          }
        },
        {
          key: 'district',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'District',
            placeholder: 'Enter district',
            required: true,
            minLength: 2,
            maxLength: 32,
          }
        },

        {
          key: 'postalCode',
          type: 'input',
          className: 'flex-2',
          props: {
            type: 'number',
            label: 'Postal Code',
            required: false,
            max: 99999,
            min: 0,
            pattern: '\\d{5}'
          },
          validation: {
            messages: {
              pattern: (error: any, field: FormlyFieldConfig) => `"${field.formControl?.value}" is not a valid ${field.props?.label}`,
            }
          }
        },
        {
          key: 'ward',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Ward',
            placeholder: 'Enter ward',
            required: true,
            minLength: 2,
            maxLength: 32,
          }
        },
        {
          key: 'street',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Street',
            placeholder: 'Enter street name',
            required: true,
            minLength: 2,
            maxLength: 32,
          }
        }
      ]
    },
  ]

  constructor(private departmentService: DepartmentService) { }

  getEmployeeFormFields(): FormlyFieldConfig[] {
    return this.EMPLOYEE_FORM_FIELD;
  }



}

const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
  return {
    fieldGroupClassName: 'display-flex',
    fieldGroup: fieldConfig
  };
};



const EMPLOYEE_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Firstname', dataKey: 'firstName', isSortable: true},
  {name: 'Middle Name', dataKey: 'middleName', isSortable: true},
  {name: 'Lastname', dataKey: 'lastName', isSortable: true},
  {name: 'Gender', dataKey: 'gender', isSortable: true},
  {name: 'DoB', dataKey: 'dateOfBirth', isSortable: false},
  {name: 'Age', dataKey: 'age', isSortable: false},
  {name: 'Email', dataKey: 'email', isSortable: true},
  {name: 'Phone number', dataKey: 'mobile', isSortable: true},
  {name: 'Work ID', dataKey: 'workId', isSortable: true},
  {name: 'Hired', dataKey: 'hireDate', isSortable: true},
  {name: 'Job Status', dataKey: 'status', isSortable: true},
  {name: 'YoE', dataKey: 'timeOfService', isSortable: false},
  {name: 'Department', dataKey: 'department.name', isSortable: true},
  {name: 'Street', dataKey: 'address.street', isSortable: false},
  {name: 'Ward', dataKey: 'address.ward', isSortable: false},
  {name: 'District', dataKey: 'address.district', isSortable: false},
];
