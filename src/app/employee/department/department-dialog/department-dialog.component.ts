import {Component, Inject, OnInit} from '@angular/core';
import {Department, DepartmentEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {DepartmentFormService} from "../../../shared/util/department-form.service";
import {resetForm} from "../../../shared/util/utils";


@Component({
  selector: "app-department-dialog",
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css'],
})
export class DepartmentDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getDepartmentFormFields();
  options: FormlyFormOptions = {};
  department: Department = {departmentCode: "", description: "", id: 0, college: undefined!, departmentName: ""};
  submitLabel: string = 'Add';
  operationMode!: string;
  title!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private departmentService: DepartmentEndpointService,
    private formlyService: DepartmentFormService
  ) {
  }

  ngOnInit(): void {
    this.initModeAndData();
    this.selectDialogModeAndOps();
  }

  onSubmit({value}: { valid: boolean, value: Department }): void {
    value = this.operationMode === 'delete' && (value.constructor === Object && Object.keys(value).length === 0) ? this.department : value;
    this.apiMethodsCall(value);
    resetForm(this.options);
  }

  initModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operationMode = mode;
    this.department = dataObject;
  }

  selectDialogModeAndOps(): void {
    this.title = this.operationMode === 'create' ? 'Create Department' : this.operationMode === 'delete' ? 'Remove Department' : 'Edit Department';
    if (this.operationMode === 'edit') {
      this.submitLabel = 'Update';
      this.form.patchValue(this.department);
    } else if (this.operationMode === 'delete') {
      console.log('DELETE VAL : ' + JSON.stringify(this.department));
      this.submitLabel = 'Delete';
      this.confirmText = `Are you sure you want to delete the <em><strong>${this.department.departmentName}</strong></em> department?`;
    }
  }

  apiMethodsCall(department: Department): void {
    if (this.operationMode === 'create') {
      this.callCreateApiService(department);
    } else if (this.operationMode === 'edit') {
      this.callUpdateApiService(department);
    } else if (this.operationMode === 'delete') {
      this.callDeleteApiService(department);
    }
  }

  callCreateApiService(department: Department) {
    return this.departmentService.restDepartmentsPost(department, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(department: Department) {
    this.departmentService.restDepartmentsIdPut(this.department.id!, department, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(department: Department) {
    return this.departmentService.restDepartmentsIdDelete(department.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }
}
