import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Department} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  DynamicFormControlEvent,
  DynamicFormControlModel,
  DynamicFormLayout,
  DynamicFormService
} from "@ng-dynamic-forms/core";
import {MATERIAL_DEPT_FORM_MODEL} from "../model/dept-form.config";
import {MATERIAL_DEPT_FORM_LAYOUT} from "../model/dept-form.layout";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {DepartmentService} from "../department.service";
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

  formModel: DynamicFormControlModel[] = MATERIAL_DEPT_FORM_MODEL;
  formGroup: FormGroup<any> = this.formService.createFormGroup(this.formModel);
  formLayout: DynamicFormLayout = MATERIAL_DEPT_FORM_LAYOUT;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private formService: DynamicFormService,
    private departmentService: DepartmentService,
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
    this.initModeAndData();
    this.selectDialogModeAndOps();
  }

  save(): void {
    this.isAsyncOperationRunning$.next(true);
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

  closeDialog(): void {
    this.dialogRef.close();
    this.formGroup.reset();
  }

  callCreateApiService() {
    this.departmentService.createDepartment(this.formGroup.value).subscribe({
        next: (response: HttpResponse<string>) => {
          if (response.status === 201) {
            console.log("SUCCESSFULLY CREATED!!");
            this.dialogRef.close();
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(`Error creating department: ${error.message}`);
          // Display a message to the user
          this.dialogRef.close();
        },
        complete: () => {
          this.isAsyncOperationRunning$.next(false);
        }
      }
    );
  }

  callUpdateApiService() {
    this.formGroup.value.id = this.department.id;
    this.departmentService.updateDepartment(this.formGroup.value).subscribe({
        next: (response: HttpResponse<string>) => {
          if (response.status === 204) {
            console.log("SUCCESSFULLY UPDATED!!");
            // this.formGroup.reset();
            this.dialogRef.close('success');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(`Error updating department: ${error.message}`);
          // Display a message to the user
          this.dialogRef.close();
        },
        complete: () => {
          this.isAsyncOperationRunning$.next(false);
        }
      }
    );
  }

  callDeleteApiService() {
    this.departmentService.deleteDepartment(this.department).subscribe({
        next: (response: HttpResponse<string>) => {
          if (response.status === 204) {
            console.log("SUCCESSFULLY DELETED!!");
            this.dialogRef.close('success');
          }
        },
        error: (error: HttpErrorResponse) => {
          console.log(`Error deleting department: ${error.message}`);
          // Display a message to the user
          this.dialogRef.close();
        },
        complete: () => {
          this.isAsyncOperationRunning$.next(false);
        }
      }
    );
  }
}
