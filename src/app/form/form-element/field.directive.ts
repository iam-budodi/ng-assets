import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../model/field-confing.model';
import { Field } from '../model/field.model';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';

const components: { [type: string]: Type<Field> } = {
  button: ButtonComponent,
  input: InputComponent,
  select: SelectComponent,
};
@Directive({
  selector: '[dynamicField]',
})
export class FieldDirective implements Field, OnChanges, OnInit {
  @Input() config!: FieldConfig;
  @Input() group!: FormGroup<any>;
  component!: ComponentRef<Field>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit(): void {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `You are trying to use an unsupported type (${this.config.type}). Supported types are: ${supportedTypes}`
      )
    }

    const component = this.resolver.resolveComponentFactory<Field>(
      components[this.config.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
