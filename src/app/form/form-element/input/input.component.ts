import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../model/field-confing.model';
import {Field} from '../../model/field.model';

@Component({
  selector: 'form-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup<any>;
}
