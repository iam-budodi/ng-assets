import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {TableComponent} from '../common/table/table.component';
import {MaterialModule} from '../material.module';
import {DataPropertyGetterPipe} from '../shared/pipes/data-property-getter.pipe';
import {PossessivePipe} from '../shared/pipes/possessive.pipe';
import {RouterModule} from '@angular/router';
import {employeeRoutes} from './employee.routes';
import {CardComponent} from '../common/card/card.component';
import {EmployeeDetailsComponent} from './employee-details/employee-details.component';
import {EmployeeDialogComponent} from './employee-dialog/employee-dialog.component';
import {DepartmentDialogComponent} from './department/department-dialog/department-dialog.component';
import {DepartmentListComponent} from './department/department-list/department-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {FormlyMaterialModule} from "@ngx-formly/material";
import {SharedModule} from "../shared/shared.module";
import {PanelWrapperComponent} from "../shared/util/panel-wrapper.component";
import {FormlyMatDatepickerModule} from "@ngx-formly/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DepartmentService} from "./department/department.service";
import {EmployeeService} from "./employee.service";
import {ReportTableComponent} from '../common/table/employee-report-table/report-table.component';
import {CollegeDialogComponent} from "./college/college-dialog/college-dialog.component";
import {CollegeListComponent} from "./college/college-list/college-list.component";

// export function minValidationMessage(err, field: FormlyFieldConfig) {
//   return `Please provide a value bigger than ${err.min}. You provided ${err.actual}`;
// }

export function minLengthValidationMessage(err: any, field: FormlyFieldConfig) {
  return `Should have at least  ${field.props?.minLength} characters`;
}

export function maxLengthValidationMessage(err: any, field: FormlyFieldConfig) {
  return `Provide value less than  ${field.props?.maxLength} characters`;
}


const sharedComponent = [
  TableComponent,
  PossessivePipe,
  DataPropertyGetterPipe,
  CardComponent,
  PanelWrapperComponent,
]

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeDialogComponent,
    DepartmentDialogComponent,
    DepartmentListComponent,
    CollegeDialogComponent,
    CollegeListComponent,
    ReportTableComponent,
    ...sharedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    FormlyModule.forRoot(
      {
        wrappers: [{name: 'panel', component: PanelWrapperComponent}],
        validationMessages: [
          {
            name: 'required',
            message: 'This field is required'
          },
          {
            name: 'minLength',
            message: minLengthValidationMessage
          },
          {
            name: 'maxLength',
            message: maxLengthValidationMessage
          }
        ],
      }
    ),
    RouterModule.forChild(employeeRoutes),
  ],

  exports: [MaterialModule, FormlyModule, ...sharedComponent, ReportTableComponent],
  providers: [DatePipe, DepartmentService, EmployeeService]
})
export class EmployeeModule {
}
