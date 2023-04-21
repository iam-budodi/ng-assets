import {FieldConfig} from "../../form/model/field-confing.model";
import {Validators} from "@angular/forms";
import {
  DynamicDatePickerModel,
  DynamicFormGroupModel,
  DynamicFormModel,
  DynamicInputModel,
  DynamicTextAreaModel
} from "@ng-dynamic-forms/core";
import {BehaviorSubject} from "rxjs";
import {COUNTRY_AUTOCOMPLETE_LIST} from "../department/model/dept-form.config";
import {ITableColumn} from "./table-column.model";


export const GENDER: string[] = [
  "M", "F"
]

export const JOB_STATUS: string[] = [
  "M", "F"
]

export const MATERIAL_EMPLOYEE_FORM_MODEL: DynamicFormModel = [
  new DynamicInputModel({
    id: "firstName",
    minLength: 3,
    maxLength: 32,
    label: "Firstname",
    validators: {
      required: null
    },
    errorMessages: {
      required: "Field is required"
    }
  }),
  new DynamicInputModel({
    id: "middleName",
    minLength: 3,
    maxLength: 32,
    label: "Middlename",
    validators: {
      required: null
    },
    errorMessages: {
      required: "Field is required"
    }
  }),
  new DynamicInputModel({
    id: "lastName",
    minLength: 3,
    maxLength: 32,
    label: "Lastname",
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
  new DynamicInputModel({
    id: "gender",
    minLength: 1,
    maxLength: 1,
    label: "Lastname",
    list: new BehaviorSubject(GENDER),
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
  new DynamicDatePickerModel({
    id: "dateOfBirth",
    label: "Date of Birth",
    validators: {
      required: null
    },
    errorMessages: {
      required: "Field is required"
    },
  }),
  new DynamicInputModel({
    id: "email",
    maxLength: 64,
    label: "Email",
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
  new DynamicInputModel({
    id: "mobile",
    minLength: 9,
    maxLength: 13,
    label: "Phone",
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
  new DynamicInputModel({
    id: "workId",
    minLength: 9,
    maxLength: 13,
    label: "Work ID",
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
  new DynamicDatePickerModel({
    id: "hireDate",
    label: "Hired",
    validators: {
      required: null
    },
    errorMessages: {
      required: "Field is required"
    },
  }),
  new DynamicInputModel({
    id: "status",
    minLength: 9,
    maxLength: 13,
    label: "Job Status",
    list: new BehaviorSubject(JOB_STATUS),
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
  new DynamicFormGroupModel({
    id: "department",
    group: [
      new DynamicInputModel({
        id: "name",
        minLength: 9,
        maxLength: 13,
        label: "Department",
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
      // new DynamicInputModel({
      //   id: "age",
      //   label: "Age",
      //   validators: {
      //     required: null
      //   },
      //   errorMessages: {
      //     required: "Field is required"
      //   },
      //   additional: {
      //     color: "accent"
      //   }
      // }),
      // new DynamicInputModel({
      //   id: "timeOfService",
      //   minLength: 9,
      //   maxLength: 13,
      //   label: "Years of Experience",
      //   validators: {
      //     required: null
      //   },
      //   errorMessages: {
      //     required: "Field is required"
      //   },
      //   additional: {
      //     color: "accent"
      //   }
      // }),
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

