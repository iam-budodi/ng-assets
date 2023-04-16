import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormComponent} from "../../form/container/form/form.component";
import {FieldConfig} from "../../form/model/field-confing.model";
import {BehaviorSubject} from "rxjs";
import {EmployeeService} from "../employee.service";
import {CREATE_FORM} from "../model/form-config";
import {Employee} from "../../service";
import {HttpResponse} from "@angular/common/http";
import {DialogService} from "../../dialog/dialog.service";
import {formChangesControl} from "../../shared/utils";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit, AfterViewInit {
  isAsyncOperationRunning$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChild(FormComponent) form!: FormComponent;
  config!: FieldConfig[];
  title!: string;
  updatedEmployee!: Employee;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, //: EmployeeDialog,
    private cd: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
  ) {}

  // public employee = this.data.data;

  ngOnInit(): void {
    this.config = CREATE_FORM;

    console.log('PASSED DIALOG VAL: ' + this.data.data.mode)
    if (this.data.data.mode === 'create') {
      this.title = 'Create Employee';
    } else if (this.data.data.mode === 'create') {
      this.title = 'Update Employee';
      this.updatedEmployee = this.data.data.employee;
      console.log("UPDATED EMPLOYEE : " + JSON.stringify(this.updatedEmployee))
    } else if (this.data.mode === 'confirm') {
      this.title = 'Confirm Action';
      // this.form.disable();
    } else if (this.data.mode === 'alert') {
      this.title = 'Alert';
      // this.form.
    }
  }

  submit(employee: Employee): void {
    console.log("FROM FORM SUBMIT : " + JSON.stringify(employee));

    this.isAsyncOperationRunning$.next(true);
    this.employeeService.createEmployee(employee).subscribe(response => {
        if (response.status === 201) {
          console.log("SUCCESSFUL CREATED!!")
          this.dialog.closeAll();
        }
    }
       // HttpResponse<string>
    )

    // setTimeout(() => {
    //   console.log('ID : ' + employee.id);
    //
    //   if (
    //     typeof employee === 'object' &&
    //     employee !== null &&
    //     Object.keys(employee).includes('id')
    //   ) {
    //     console.log('To be UPDATED : ');
    //     this.employeeService.updateEmployee(employee);
    //     this.closeDialog();
    //     return;
    //   } else {
    //     console.log('CREATE NEW EMPLOYEE : ' + JSON.stringify(employee));
    //
    //     this.employeeService.saveEmployee(employee);
    //     // this.closeDialog();
    //     // return;
    //   }
    //   // this.closeDialog(); // reconsider this also
    //   this.isAsyncOperationRunning$.next(false);
    // }, 1000);
  }

  ngAfterViewInit(): void {
    formChangesControl(this.form, this.updatedEmployee);
    this.cd.detectChanges();
  }
}
