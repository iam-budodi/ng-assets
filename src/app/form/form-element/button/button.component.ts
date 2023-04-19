import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../model/field-confing.model';
import {Field} from '../../model/field.model';

@Component({
  selector: 'form-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements Field {
  config!: FieldConfig;
  group!: FormGroup<any>;
}
