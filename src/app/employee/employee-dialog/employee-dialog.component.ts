import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormComponent} from "../../form/container/form/form.component";
import {FieldConfig} from "../../form/model/field-confing.model";
import {BehaviorSubject} from "rxjs";
import {MATERIAL_EMPLOYEE_FORM_MODEL} from "../model/form-config";
import {Employee, EmployeeEndpointService} from "../../service";
import {DynamicFormControlModel, DynamicFormLayout, DynamicFormService} from "@ng-dynamic-forms/core";
import {FormGroup} from "@angular/forms";
import {MATERIAL_EMPLOYEE_FORM_LAYOUT} from "../model/employee-form.layout";
import {DepartmentDialogComponent} from "../department/department-dialog/department-dialog.component";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  isAsyncOperationRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChild(FormComponent) form!: FormComponent;
  config!: FieldConfig[];
  title!: string;
  employee!: Employee;
  operation!: string;
  confirmText!: string;

  formModel: DynamicFormControlModel[] = MATERIAL_EMPLOYEE_FORM_MODEL;
  formGroup: FormGroup = this.formService.createFormGroup(this.formModel);
  formLayout: DynamicFormLayout = MATERIAL_EMPLOYEE_FORM_LAYOUT;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, //: EmployeeDialog,
    private dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private formService: DynamicFormService,
    private employeeService: EmployeeEndpointService,
  ) {
  }

  ngOnInit(): void {
    this.initDepartmentModeAndData();
    this.selectEmployeeDialogModeAndOps();
  }

  save(): void {
    this.apiMethodsCall();
  }

  initDepartmentModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operation = mode;
    this.employee = dataObject;
  }

  selectEmployeeDialogModeAndOps(): void {
    this.title = this.operation === 'create' ? 'Create Employee' : this.operation === 'delete' ? 'Remove Employee' : 'Edit Employee';
    if (this.operation === 'edit') {
      this.formGroup.patchValue(this.employee);
    } else if (this.operation === 'delete') {
      this.confirmText = `<em><strong>${this.employee.firstName} ${this.employee.lastName}</strong></em> will be permanently deleted, Do you want to roceed?`
    }
  }

  apiMethodsCall(): void {
    if (this.operation === 'create') {
      this.callCreateApiService();
    } else if (this.operation === 'edit') {
      this.callUpdateApiService();
    } else if (this.operation === 'delete') {
      this.callDeleteApiService();
    }
  }

  callCreateApiService() {
    return this.employeeService.restEmployeesPost(this.formGroup.value, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService() {
    this.formGroup.value.id = this.employee.id;
    this.employeeService.restEmployeesIdPut(this.formGroup.value, this.employee.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService() {
    return this.employeeService.restEmployeesIdDelete(this.employee.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.formGroup.reset();
  }
}
