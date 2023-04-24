import {ITableColumn} from "../../model/table-column.model";
import {FormlyFieldConfig} from "@ngx-formly/core";


const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
  return {
    fieldGroupClassName: 'display-flex',
    fieldGroup: fieldConfig
  };
};

export const DEPARTMENT_FORM_FIELD: FormlyFieldConfig[] = [
  {
    key: 'id'
  },
  formlyRow([
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
    },
  ]),
  formlyRow([
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
  ]),
  {
    key: 'location',
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
export const DEPARTMENT_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Name', dataKey: 'name', isSortable: true},
  {name: 'Code', dataKey: 'code', isSortable: false},
  {name: 'Street', dataKey: 'location.street', isSortable: true},
  {name: 'Ward', dataKey: 'location.ward', isSortable: true},
  {name: 'District', dataKey: 'location.district', isSortable: true},
  {name: 'PostalCode', dataKey: 'location.postalCode', isSortable: true},
  {name: 'City', dataKey: 'location.city', isSortable: true},
  {name: 'Country', dataKey: 'location.country', isSortable: true},
  {name: 'Description', dataKey: 'description', isSortable: false},
];
