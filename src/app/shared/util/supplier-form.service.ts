import { Injectable } from '@angular/core';
import {EmployeeFormService} from "./employee-form.service";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Injectable({
  providedIn: 'root'
})
export class SupplierFormService {

  private SUPPLIER_FORM_FIELD: FormlyFieldConfig[] = [
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
            label: 'Company Name',
            placeholder: 'Enter name',
            required: true,
            minLength: 2,
            maxLength: 64
          }
        },
        {
          key: 'supplierType',
          type: 'select',
          className: 'flex-3',
          props: {
            label: 'Supplier Type',
            options: [
              {
                value: null,
                label: ' -- '
              },
              {
                value: 'MANUFACTURER',
                label: 'Manufacturer'
              },
              {
                value: 'WHOLESALER',
                label: 'Wholesaler'
              },
              {
                value: 'RETAILER',
                label: 'Retailer'
              }
            ],
            required: true,
          }
        },
        {
          key: 'email',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Company email',
            placeholder: 'Enter email',
            required: true,
            minLength: 4,
            maxLength: 64
          }
        },
        {
          key: 'phone',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Company Phone number',
            placeholder: 'Enter phone',
            required: true,
            minLength: 9,
            maxLength: 13
          }
        },
        {
          key: 'website',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Company website',
            placeholder: 'Enter website url',
            required: false,
            minLength: 2,
            maxLength: 64,
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
      key: 'address',
      wrappers: ['panel'],
      props: {
        label: 'Address'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: this.formlyEmployee.addressFields()
    }
  ]

    constructor(private formlyEmployee: EmployeeFormService) { }

  getDepartmentFormFields(): FormlyFieldConfig[] {
    return this.SUPPLIER_FORM_FIELD;
  }
}
