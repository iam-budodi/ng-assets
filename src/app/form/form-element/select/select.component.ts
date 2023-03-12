import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field-confing.model';
import { Field } from '../../model/field.model';

@Component({
  selector: 'form-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup<any>;
}
