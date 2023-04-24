import {ITableColumn} from "./table-column.model";
import {FormlyFieldConfig} from "@ngx-formly/core";


const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
  return {
    fieldGroupClassName: 'display-flex',
    fieldGroup: fieldConfig
  };
};

export const EMPLOYEE_FORM_FIELD: FormlyFieldConfig[] = [
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
        format: 'yyyy-MM-dd',
        label: "Date of Birth",
      },
      // expressions: {
      //   'props.min': `formState.limitDate ? ${new Date()} : null`
      // },
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
        format: 'yyyy-MM-dd',
        label: "Hired Date",
      },
      // expressions: {
      //   'props.min': `formState.limitDate ? ${new Date()} : null`
      // },
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
        // options: this.formlyService.getCountries(),
        options: [
          {
            value: null,
            label: ' -- '
          },
          {
            value: 'Contract',
            label: 'Contract'
          }
        ],
        required: true,
        minLength: 2,
        maxLength: 32,
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
      {
        key: 'description',
        type: 'textarea',
        className: 'flex-3',
        props: {
          label: 'Description',
          placeholder: 'Enter description (Optional)',
          required: false,
          minLength: 1,
          maxLength: 400,
          rows: 1
        }
      }
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

// export const GENDER: string[] = [
//   "M", "F"
// ]
//
// export const JOB_STATUS: string[] = [
//   "M", "F"
// ]
//
// export const MATERIAL_EMPLOYEE_FORM_MODEL: DynamicFormModel = [

//   new DynamicFormGroupModel({
//     id: "department",
//     group: [
//       new DynamicInputModel({
//         id: "name",
//         minLength: 9,
//         maxLength: 13,
//         label: "Department",
//         validators: {
//           required: null
//         },
//         errorMessages: {
//           required: "Field is required"
//         },
//         additional: {
//           color: "accent"
//         }
//       }),
//       // new DynamicInputModel({
//       //   id: "age",
//       //   label: "Age",
//       //   validators: {
//       //     required: null
//       //   },
//       //   errorMessages: {
//       //     required: "Field is required"
//       //   },
//       //   additional: {
//       //     color: "accent"
//       //   }
//       // }),
//       // new DynamicInputModel({
//       //   id: "timeOfService",
//       //   minLength: 9,
//       //   maxLength: 13,
//       //   label: "Years of Experience",
//       //   validators: {
//       //     required: null
//       //   },
//       //   errorMessages: {
//       //     required: "Field is required"
//       //   },
//       //   additional: {
//       //     color: "accent"
//       //   }
//       // }),
//     ]
//   }),
//   new DynamicFormGroupModel({
//     id: "location",
//     group: [
//       new DynamicInputModel({
//         id: "street",
//         label: "Street Name"
//       }),
//       new DynamicInputModel({
//         id: "ward",
//         label: "Ward"
//       }),
//       new DynamicInputModel({
//         id: "district",
//         label: "District",
//       }),
//       new DynamicInputModel({
//         id: "postalCode",
//         label: "Postal Code"
//       }),
//       new DynamicInputModel({
//         id: "city",
//         label: "City"
//       }),
//       new DynamicInputModel({
//         id: "country",
//         hint: "Autocomplete",
//         label: "Country",
//         list: new BehaviorSubject(COUNTRY_AUTOCOMPLETE_LIST)
//       })
//     ]
//   })
// ];


export const EMPLOYEE_TABLE_COLUMNS: ITableColumn[] = [
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

