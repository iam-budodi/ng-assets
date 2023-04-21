import {ITableColumn} from "../../model/table-column.model";

import {
  DynamicFormGroupModel,
  DynamicFormModel,
  DynamicInputModel,
  DynamicTextAreaModel,
} from "@ng-dynamic-forms/core";
import {BehaviorSubject} from "rxjs";

export const COUNTRY_AUTOCOMPLETE_LIST: string[] = [
  "Tanzania"
]

export const MATERIAL_DEPT_FORM_MODEL: DynamicFormModel = [
  new DynamicFormGroupModel({
    id: "department",
    group: [
      new DynamicInputModel({
        id: "name",
        maxLength: 50,
        label: "Department Name",
        validators: {
          required: null
        },
        errorMessages: {
          required: "Field is required"
        }
      }),
      new DynamicInputModel({
        id: "code",
        maxLength: 10,
        label: "Department Code",
        validators: {
          required: null
        },
        errorMessages: {
          required: "Field is required"
        },
        additional: {
          color: "accent"
        }
      }),
      new DynamicTextAreaModel({
        id: "description",
        label: "Description",
        maxLength: 400
      }),
    ]
  }),
  new DynamicFormGroupModel({
    id: "location",
    group: [
      new DynamicInputModel({
        id: "street",
        label: "Street Name"
      }),
      new DynamicInputModel({
        id: "ward",
        label: "Ward"
      }),
      new DynamicInputModel({
        id: "district",
        label: "District",
      }),
      new DynamicInputModel({
        id: "postalCode",
        label: "Postal Code"
      }),
      new DynamicInputModel({
        id: "city",
        label: "City"
      }),
      new DynamicInputModel({
        id: "country",
        hint: "Autocomplete",
        label: "Country",
        list: new BehaviorSubject(COUNTRY_AUTOCOMPLETE_LIST)
      })
    ]
  })
];

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
