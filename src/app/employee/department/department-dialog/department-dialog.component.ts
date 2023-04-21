import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Department, DepartmentEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  DynamicFormControlEvent,
  DynamicFormControlModel,
  DynamicFormLayout, DynamicFormModel,
  DynamicFormService
} from "@ng-dynamic-forms/core";
import {MATERIAL_DEPT_FORM_MODEL} from "../model/dept-form.config";
import {MATERIAL_DEPT_FORM_LAYOUT} from "../model/dept-form.layout";
import {HttpResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Component({
  selector: "dynamic-material-sample-form",
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DepartmentDialogComponent implements OnInit {
  isAsyncOperationRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  title!: string;
  department!: Department;
  operationMode!: string;
  confirmText!: string;

  // formModel: DynamicFormControlModel[] = MATERIAL_DEPT_FORM_MODEL; // it started here
  // formGroup: FormGroup = this.formService.createFormGroup(this.formModel);
  formModel: DynamicFormModel = MATERIAL_DEPT_FORM_MODEL;
  formGroup!: FormGroup;
  formLayout: DynamicFormLayout = MATERIAL_DEPT_FORM_LAYOUT;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private formService: DynamicFormService,
    private departmentService: DepartmentEndpointService,
  ) {
  }

  onBlur($event: DynamicFormControlEvent) {
    console.log(`Material blur event on: ${$event.model.id}: `, $event);
  }

  onChange($event: DynamicFormControlEvent) {
    console.log(`Material change event on: ${$event.model.id}: `, $event);
  }

  onFocus($event: DynamicFormControlEvent) {
    console.log(`Material focus event on: ${$event.model.id}: `, $event);
  }

  onMatEvent($event: DynamicFormControlEvent) {
    console.log(`Material ${$event.type} event on: ${$event.model.id}: `, $event);
  }


  ngOnInit(): void {
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.initModeAndData();
    this.selectDialogModeAndOps();
  }

  save(): void {
    // this.isAsyncOperationRunning$.next(true);
    this.apiMethodsCall();
  }

  initModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operationMode = mode;
    this.department = dataObject;
  }

  selectDialogModeAndOps(): void {
    this.title = this.operationMode === 'create' ? 'Create Department' : this.operationMode === 'delete' ? 'Remove Department' : 'Edit Department';
    if (this.operationMode === 'edit') {
      this.formGroup.patchValue(this.department);
    } else if (this.operationMode === 'delete') {
      this.confirmText = `Are you sure you want to delete the <em><strong>${this.department.name}</strong></em> department?`
    }
  }

  apiMethodsCall(): void {
    if (this.operationMode === 'create') {
      this.callCreateApiService();
    } else if (this.operationMode === 'edit') {
      this.callUpdateApiService();
    } else if (this.operationMode === 'delete') {
      this.callDeleteApiService();
    }
  }

  callCreateApiService() {
    return this.departmentService.restDepartmentsPost(this.formGroup.value, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService() {
    this.formGroup.value.id = this.department.id;
    this.departmentService.restDepartmentsIdPut(this.formGroup.value, this.department.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService() {
    return this.departmentService.restDepartmentsIdDelete(this.department.id!, 'response').subscribe({
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
