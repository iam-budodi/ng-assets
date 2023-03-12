import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogComponent } from 'src/app/common/dialog/dialog.component';
import { IDialog } from 'src/app/common/dialog/dialog.model';
import { IEmployee } from 'src/app/common/model/employee.model';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { FieldConfig } from 'src/app/form/model/field-confing.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css'],
})
export class EmployeeDialogComponent {
  isAsyncOperationRunning$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  @ViewChild(FormComponent) form!: FormComponent;
  config!: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialog: IDialog,
    private employeeService: EmployeeService,
    public matDialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.config = this.employeeService.getDialogForm();
  }

  // in favor of this ::::::: submit(value: { [name: string]: any }): void {
  submit(value: IEmployee): void {
    this.isAsyncOperationRunning$.next(true);
    setTimeout(() => {
      console.log(value); // put your logic here
      // this.openDialog();
      this.employeeService.saveEmployee(value);
      this.closeDialog(); // reconsider this also
      this.isAsyncOperationRunning$.next(false);
    }, 1000);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // for test, should not be here
  openDialog(): void {
    const dialogParams: IDialog = {
      dialogHeader: 'Confirm!',
      dialogContent: 'Continue adding more data?',
      cancelButtonLabel: 'NO',
      confirmButtonLabel: 'Yes',
      callbackMethod: () => {
        console.log('hello');
      },
    };

    this.matDialog.open(DialogComponent, {
      // width: '700px',
      panelClass: 'dynamic-dialog',
      data: dialogParams,
    });
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    // this.form.setValue('firstName', 'Japhet Motto');

    this.cd.detectChanges();
  }
}
