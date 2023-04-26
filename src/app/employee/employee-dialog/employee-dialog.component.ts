import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employee, EmployeeEndpointService} from "../../service";
import {HttpResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {EmployeeFormService} from "../../shared/util/employee-form.service";


@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getEmployeeFormFields();
  employee: Employee = undefined!;
  submitLabel: string = 'Create';
  title!: string;
  operation!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private employeeService: EmployeeEndpointService,
    private formlyService: EmployeeFormService,
  ) {
  }

  ngOnInit(): void {
    this.initEmployeeModeAndData();
    this.selectEmployeeDialogModeAndOps();
  }

  onSubmit({value}: {value: Employee }): void {
    value = this.operation === 'delete' && (value.constructor === Object && Object.keys(value).length === 0) ? this.employee : value;
    this.apiMethodsCall(value);
  }


  initEmployeeModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operation = mode;
    this.employee = dataObject;
  }

  selectEmployeeDialogModeAndOps(): void {
    this.title = this.operation === 'create' ? 'Create Employee' : this.operation === 'delete' ? 'Remove Employee' : 'Edit Employee';
    if (this.operation === 'edit') {
      this.submitLabel = 'Update'
      this.form.patchValue(this.employee);
    } else if (this.operation === 'delete') {
      this.submitLabel = 'Delete'
      this.confirmText = `<em><strong>${this.employee.firstName} ${this.employee.lastName}</strong></em> will be permanently deleted, Do you want to roceed?`
    }
  }

  apiMethodsCall(employee: Employee): void {
    if (this.operation === 'create') {
      this.callCreateApiService(employee);
    } else if (this.operation === 'edit') {
      this.callUpdateApiService(employee);
    } else if (this.operation === 'delete') {
      this.callDeleteApiService(employee);
    }
  }

  callCreateApiService(employee: Employee) {
    return this.employeeService.restEmployeesPost(employee, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(employee: Employee) {
    this.employeeService.restEmployeesIdPut(employee, this.employee.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(employee: Employee) {
    return this.employeeService.restEmployeesIdDelete(employee.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

}
