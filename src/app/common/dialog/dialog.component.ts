import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { FieldConfig } from 'src/app/form/model/field-confing.model';
import { IDialog } from './dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  isAsyncOperationRunning$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  @ViewChild(FormComponent) form!: FormComponent;
  config!: FieldConfig[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialog: IDialog,
    public matDialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.config = this.getDialogForm();
  }

  // delete this
  submitDialog(): void {
    this.isAsyncOperationRunning$.next(true);
    setTimeout(() => {
      this.dialog.callbackMethod();
      this.isAsyncOperationRunning$.next(false);
    }, 1000);
  }

  // in favor of this
  submit(value: { [name: string]: any }): void {
    this.isAsyncOperationRunning$.next(true);
    setTimeout(() => {
      console.log(value); // put your logic here
      // this.openDialog();
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

    // this.switch = true;
    // this one too ||| delete after
    this.matDialog.open(DialogComponent, {
      // width: '700px',
      // panelClass: 'dynamic-dialog',
      data: dialogParams,
    });
  }

  // ngAfterViewInit() {
  //   let previousValid = this.form.valid;
  //   this.form.changes.subscribe(() => {
  //     if (this.form.valid !== previousValid) {
  //       previousValid = this.form.valid;
  //       this.form.setDisabled('submit', !previousValid);
  //     }
  //   });

  //   this.form.setDisabled('submit', true);
  //   // this.form.setValue('name', 'Todd Motto');

  //   this.cd.detectChanges();
  // }

  getDialogForm(): FieldConfig[] {
    return this.FORM;
  }

  // look at this when you need a select
  //  {
  //     type: 'select',
  //     label: 'Favourite Food',
  //     name: 'food',
  //     options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
  //     placeholder: 'Select an option',
  //     validation: [Validators.required],
  //   },

  FORM: FieldConfig[] = [
    {
      type: 'input',
      label: 'First ame',
      name: 'fname',
      placeholder: 'Enter first name',
      validation: [Validators.required, Validators.minLength(2)],
    },
    {
      type: 'input',
      label: 'Last name',
      name: 'lname',
      placeholder: 'Enter last name',
      validation: [Validators.required, Validators.minLength(2)],
    },
    {
      type: 'input',
      label: 'Work ID',
      name: 'workid',
      placeholder: 'Enter ID',
      validation: [Validators.required, Validators.minLength(4)],
    },
    {
      type: 'input',
      label: 'Address',
      name: 'address',
      placeholder: 'Enter Address',
      validation: [Validators.required, Validators.minLength(4)],
    },
    {
      type: 'input',
      label: 'Birth date',
      name: 'number',
      placeholder: 'Enter birth date',
      validation: [Validators.required, Validators.min(1)],
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
    },
  ];
}
