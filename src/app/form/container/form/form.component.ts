import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FieldConfig } from '../../model/field-confing.model';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['./form.component.css'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnChanges {
  @Input() config!: FieldConfig[];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() employeeAction: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;

  get controls(): FieldConfig[] {
    return this.config.filter(({ element }) => element !== 'button');
  }

  get changes(): Observable<any> {
    return this.form.valueChanges;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get value(): any {
    return this.form.value;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createGroup(); //all the form fields ie input select etc
  }

  createGroup(): FormGroup {
    const group = this.formBuilder.group({}); // initisl empty form
    this.controls.forEach((control) =>
      // initializes form fields controls (i.e firstname, lastname) with validators
      group.addControl(control.name, this.createControl(control))
    );
    return group;
  }

  createControl(config: FieldConfig): AbstractControl<any, any> {
    const { disabled, validation, value } = config;
    return this.formBuilder.control({ disabled, value }, validation);
  }

  ngOnChanges(): void {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const controlsConfig = this.controls.map((item) => item.name);

      controls
        .filter((control) => !controlsConfig.includes(control))
        .forEach((control) => this.form.removeControl(control));

      controlsConfig
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find(
            (control) => control.name === name
          ) as FieldConfig;
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  submitHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean): void {
    if (this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map((item) => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }

  getAction(row: any) {
    this.employeeAction.emit(row);
  }
}
