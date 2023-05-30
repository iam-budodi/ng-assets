import {FieldWrapper} from "@ngx-formly/core";
import {Component} from "@angular/core";

@Component({
  selector: 'formly-wrapper-panel',
  template: `
  <ng-container #fieldComponent></ng-container>
  `
})

export class PanelWrapperComponent extends FieldWrapper {
}
