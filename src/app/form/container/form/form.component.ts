import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/field-confing.model';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  styleUrls: ['./form.component.css'],
  template: `
  <form
    class="dynamic-form"
    [formGroup]="form"
    (submit)="submitHandler($event)"
  >
    <ng-container
      *ngFor="let field of config;"
      dynamicField
      [config]="field"
      [group]="form"
    ></ng-container>
  </form>`,
})
export class FormComponent implements OnInit, OnChanges {
  @Input() config!: FieldConfig[];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  form!: FormGroup;

  get controls() {
    return this.config.filter(({ type }) => type !== 'button');
  }

  get changes() {
    return this.form.valueChanges;
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createGroup();
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
          const config = this.config.find((control) => control.name === name) as FieldConfig;
          this.form.addControl(name, this.createControl(config));
        });
    }
  }

  createGroup(): FormGroup {
    const group = this.formBuilder.group({});
    this.controls.forEach((control) =>
      group.addControl(control.name, this.createControl(control))
    );

    return group;
  }

  createControl(config: FieldConfig): AbstractControl<any, any> {
    const { disabled, validation, value } = config;
    return this.formBuilder.control({ disabled, value }, validation);
  }

  submitHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  setDisabled(name: string, disable: boolean): void {
    if(this.form.controls[name]) {
      const method = disable ? 'disable' : 'enable';
      this.form.controls[name][method]();
      return;
    }

    this.config = this.config.map(item => {
      if (item.name === name) {
        item.disabled = disable;
      }
      return item;
    });
  }

  setValue (name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }
}
