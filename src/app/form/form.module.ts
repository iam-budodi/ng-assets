import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './container/form/form.component';
import { FieldDirective } from './form-element/field.directive';
import { ButtonComponent } from './form-element/button/button.component';
import { InputComponent } from './form-element/input/input.component';
import { SelectComponent } from './form-element/select/select.component';

@NgModule({
  declarations: [
    FormComponent,
    FieldDirective,
    ButtonComponent,
    InputComponent,
    SelectComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormComponent],
  entryComponents: [ButtonComponent, InputComponent, SelectComponent],
})
export class FormModule {}
