import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { IDialog } from 'src/app/common/model/dialog.model';
import { IEmployee } from 'src/app/common/model/employee.model';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { FieldConfig } from 'src/app/form/model/field-confing.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css'],
})
export class EmployeeDialogComponent implements OnInit, AfterViewInit {
  isAsyncOperationRunning$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  @ViewChild(FormComponent) form!: FormComponent;
  config!: FieldConfig[];
  // employee!: IEmployee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployee,
    private cd: ChangeDetectorRef,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.config = this.employeeService.getDialogForm();
    // this.form.co.patchValue(this.data); // error
  }

  submit(employee: IEmployee): void {
    this.isAsyncOperationRunning$.next(true);
    setTimeout(() => {
      console.log('ID : ' + employee.id);

      if (employee.id) {
        console.log('IN UPDATE');
        this.employeeService.updateEmployee(employee);
        this.closeDialog()
      }

      // else {
      //   console.log('IN SAVE');

      //   this.employeeService.saveEmployee(employee);
      // }
      // this.closeDialog(); // reconsider this also
      this.isAsyncOperationRunning$.next(false);
    }, 1000);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    console.log('Ok : ' + previousValid);
    this.form.changes.subscribe(() => {
      console.log('Ok2 : ' + this.form.valid);
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    // this.form.setDisabled('id', true);

    if (this.data.id) {
      Object.entries(this.data).forEach(([name, value]) => {
        this.form.setValue(name, value);
        console.log('KEY : ' + name + ' VAL : ' + value);
      });
    }

    this.cd.detectChanges();
  }
}
