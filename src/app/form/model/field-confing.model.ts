import { ValidatorFn } from "@angular/forms";

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: string[];
  placeholder?: string;
  type?: string;
  element: string; // all elements TESTS ::::: New
  validation?: ValidatorFn[];
  value?: any;
}
