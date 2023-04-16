import {FieldConfig} from "../../../form/model/field-confing.model";
import {Validators} from "@angular/forms";
import {ITableColumn} from "../../model/table-column.model";

const FORM: FieldConfig[] = [
  {
    element: 'input',
    label: 'Department Name',
    name: 'name',
    type: 'text',
    placeholder: 'Department Name',
    validation: [Validators.required, Validators.minLength(2)],
  },
  {
    element: 'input',
    label: 'Department Code',
    name: 'code',
    type: 'text',
    placeholder: 'Department Code',
    validation: [Validators.required, Validators.minLength(2)],
  },
  {
    element: 'input',
    label: 'Work ID',
    name: 'workId',
    type: 'text',
    placeholder: 'Enter ID',
    validation: [Validators.required, Validators.minLength(4)],
  },
  {
    element: 'input',
    label: 'Location',
    name: 'location',
    type: 'text',
    placeholder: 'Department Address',
    validation: [Validators.required, Validators.minLength(4)],
  },
  {
    element: 'input',
    label: 'Description',
    name: 'description',
    type: 'text',
    placeholder: 'Summary about dept',
    validation: [Validators.required, Validators.min(1)],
  }
];

export const CREATE_DEPT_FORM: FieldConfig[] = [
  ...FORM,
  {
    label: 'Create',
    name: 'submit',
    type: 'submit',
    element: 'button',
  },
];

export const EDIT_DEPT_FORM: FieldConfig[] = [
  {
    element: 'input',
    name: 'id',
    type: 'number',
    placeholder: 'Department id',
    validation: [Validators.required, Validators.minLength(2)],
  },
  ...FORM,
  {
    label: 'Create',
    name: 'submit',
    type: 'submit',
    element: 'button',
  },
];


export const DEPARTMENT_TABLE_COLUMNS: ITableColumn[] = [
  {name: ' ', dataKey: 'id', isSortable: true},
  {name: 'Department Name', dataKey: 'name', isSortable: true},
  {name: 'Department code', dataKey: 'code', isSortable: false},
  {name: 'Department location', dataKey: 'location', isSortable: true},
  {name: 'Last Name', dataKey: 'description', isSortable: false},
];
