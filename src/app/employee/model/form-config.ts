import {FieldConfig} from "../../form/model/field-confing.model";
import {Validators} from "@angular/forms";

const FORM: FieldConfig[] = [
  {
    element: 'input',
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter first name',
    validation: [Validators.required, Validators.minLength(2)],
  },
  {
    element: 'input',
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Enter last name',
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
    label: 'Address',
    name: 'address',
    type: 'text',
    placeholder: 'Enter Address',
    validation: [Validators.required, Validators.minLength(4)],
  },
  {
    element: 'input',
    label: 'Birth date',
    name: 'age',
    type: 'number',
    placeholder: 'Enter birth date',
    validation: [Validators.required, Validators.min(1)],
  }
];

export const CREATE_FORM: FieldConfig[] = [
  ...FORM,
  {
    label: 'Create',
    name: 'submit',
    type: 'submit',
    element: 'button',
  },
];

export const EDIT_FORM: FieldConfig[] = [
  {
    element: 'input',
    name: 'id',
    type: 'number',
    placeholder: 'Enter id',
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

// look at this when you need a selectcd
//  {
//     type: 'select',
//     label: 'Favourite Food',
//     name: 'food',
//     options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
//     placeholder: 'Select an option',
//     validation: [Validators.required],
//   },
