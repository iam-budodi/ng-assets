import {
  Component, EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Department} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../employee.service";
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
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  // selector: 'app-department-dialog',
  selector: "dynamic-material-sample-form",
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DepartmentDialogComponent implements OnInit {
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  isAsyncOperationRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  title!: string;
  updatedDept!: Department;

  formModel: DynamicFormControlModel[] = MATERIAL_DEPT_FORM_MODEL;
  formGroup = this.formService.createFormGroup(this.formModel);
  formLayout: DynamicFormLayout = MATERIAL_DEPT_FORM_LAYOUT;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DepartmentDialogComponent>,
    private snackBar: MatSnackBar,
    private formService: DynamicFormService,
    private departmentService: DepartmentService,
  ) {}


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
    // this.config = CREATE_DEPT_FORM;

    if (this.data.data.mode === 'create') {
      this.title = 'Create Department';
    } else if (this.data.data.mode === 'create') {
      this.title = 'Update Department';
      // this.updatedDept = this.data.data.employee;
      // console.log("UPDATED EMPLOYEE : " + JSON.stringify(this.updatedEmployee))
    } else if (this.data.mode === 'confirm') {
      this.title = 'Confirm Action';
      // this.form.disable();
    } else if (this.data.mode === 'alert') {
      this.title = 'Alert';
      // this.form.
    }
  }

  // save(): void {
  //   console.log("FROM FORM SUBMIT : " + JSON.stringify(this.formGroup.value));
  //   this.isAsyncOperationRunning$.next(true);
  //   this.departmentService.createDepartment(this.formGroup.value).subscribe({
  //     next: (response: HttpResponse<string>) => {
  //       if (response.status === 201) {
  //         console.log("SUCCESSFULLY CREATED!!");
  //         this.dialogRef.close();
  //       }
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log(`Error creating employee: ${error.message}`);
  //     },
  //     complete: () => {
  //       this.isAsyncOperationRunning$.next(false);
  //     }
  //   }
  //   );
  // }

  save(): void {
    console.log("FROM FORM SUBMIT : " + JSON.stringify(this.formGroup.value));
    this.isAsyncOperationRunning$.next(true);
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
        this.snackBar.open(`Failed to create department: ${error.error}`, 'Close', {
          duration: 5000,
          panelClass: 'error'
        });
      },
      complete: () => {
        this.isAsyncOperationRunning$.next(false);
      }
    }
    );
  }

}
