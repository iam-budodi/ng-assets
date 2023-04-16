import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormComponent} from "../../../form/container/form/form.component";
import {FieldConfig} from "../../../form/model/field-confing.model";
import {Department} from "../../../service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {EmployeeService} from "../../employee.service";
import {CREATE_DEPT_FORM} from "../model/dept-form.config";
import {formChangesControl} from "../../../shared/utils";

@Component({
  selector: 'app-department-dialog',
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.css']
})
export class DepartmentDialogComponent implements OnInit, AfterViewInit {
  isAsyncOperationRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChild(FormComponent) form!: FormComponent;
  config!: FieldConfig[];
  title!: string;
  updatedDept!: Department;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef,
    private employeeService: EmployeeService,
  ) {}


  ngOnInit(): void {
    this.config = CREATE_DEPT_FORM;

    if (this.data.data.mode === 'create') {
      this.title = 'Create Employee';
    } else if (this.data.data.mode === 'create') {
      this.title = 'Update Employee';
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

  submit(department: Department): void {
    console.log("FROM FORM SUBMIT : " + JSON.stringify(department));

    // this.isAsyncOperationRunning$.next(true);
    // this.employeeService.createEmployee(employee).subscribe(response => {
    //     if (response.status === 201) {
    //       console.log("SUCCESSFUL CREATED!!")
    //       // this.dialog.closeAll();
    //     }
    //   }
      // HttpResponse<string>
    // )
  }

  ngAfterViewInit(): void {
    formChangesControl(this.form, this.updatedDept)
    this.cd.detectChanges();
  }
}
