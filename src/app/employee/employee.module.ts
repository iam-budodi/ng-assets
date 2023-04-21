import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {TableComponent} from '../common/table/table.component';
import {MaterialModule} from '../material.module';
import {DataPropertyGetterPipe} from '../shared/data-property-getter.pipe';
import {PossessivePipe} from '../shared/possessive.pipe';
import {RouterModule} from '@angular/router';
import {employeeRoutes} from './employee.routes';
import {CardComponent} from '../common/card/card.component';
import {EmployeeDetailsComponent} from './employee-details/employee-details.component';
import {EmployeeDialogComponent} from './employee-dialog/employee-dialog.component';
import {DepartmentDialogComponent} from './department/department-dialog/department-dialog.component';
import {DepartmentListComponent} from './department/department-list/department-list.component';

const sharedComponent = [
  TableComponent,
  PossessivePipe,
  DataPropertyGetterPipe,
  CardComponent,
]
@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailsComponent,
    EmployeeDialogComponent,
    DepartmentDialogComponent,
    DepartmentListComponent,
    ...sharedComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(employeeRoutes),
  ],

  exports: [MaterialModule, ...sharedComponent],
  providers: [DatePipe]
})
export class EmployeeModule {
}
