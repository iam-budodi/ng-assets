import {
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../model/field-confing.model';
import { Field } from '../model/field.model';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';

@Directive({
  selector: '[dynamicField]',
})
export class FieldDirective implements Field, OnChanges, OnInit {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup<any>;
  component!: ComponentRef<Field>;

  constructor(private container: ViewContainerRef) {}

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit(): void {
    if (!components[this.config.element]) {
      const supportedTypes: string = Object.keys(components).join(', ');
      throw new Error(
        `You are trying to use an unsupported type (${this.config.element}). Supported types are: ${supportedTypes}`
      );
    }

    this.component = this.container.createComponent(
      components[this.config.element]
    );
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}

const components: { [element: string]: Type<Field> } = {
  button: ButtonComponent,
  input: InputComponent,
  select: SelectComponent,
};
