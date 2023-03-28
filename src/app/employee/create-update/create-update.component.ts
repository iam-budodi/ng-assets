import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { FieldConfig } from 'src/app/form/model/field-confing.model';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../model/employee.model';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css'],
})
export class CreateUpdateComponent {
  isAsyncOperationRunning$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  @ViewChild(FormComponent) form!: FormComponent;
  config!: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployee,
    private employeeService: EmployeeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.config = this.employeeService.getDialogForm(this.data);
  }

  submit(employee: IEmployee): void {
    this.isAsyncOperationRunning$.next(true);
    setTimeout(() => {
      console.log('ID : ' + employee.id);

      if (
        typeof employee === 'object' &&
        employee !== null &&
        Object.keys(employee).includes('id')
      ) {
        console.log('To be UPDATED : ');
        this.employeeService.updateEmployee(employee);
        this.closeDialog();
        return;
      } else {
        console.log('CREATE NEW EMPLOYEE : ' + JSON.stringify(employee));

        this.employeeService.saveEmployee(employee);
        // this.closeDialog();
        // return;
      }
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

    if (this.data.id) {
      Object.entries(this.data).forEach(([name, value]) => {
        this.form.setValue(name, value);
        // console.log('KEY : ' + name + ' VAL : ' + value);
      });
      // this.form.setDisabled('id', true);
    }

    this.cd.detectChanges();
  }
}
