import {FormGroup} from "@angular/forms";
import {FieldConfig} from "./field-confing.model";

export interface Field {
  config: FieldConfig;
  group: FormGroup;

  // nested
  parent?: FormGroup;
  index?: number;
}
