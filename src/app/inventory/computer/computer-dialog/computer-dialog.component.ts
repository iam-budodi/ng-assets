import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {Computer, ComputerEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpResponse} from "@angular/common/http";
import {ComputerFormService} from "../../../shared/util/computer-form.service";

@Component({
  selector: 'app-computer-dialog',
  templateUrl: './computer-dialog.component.html',
  styleUrls: ['./computer-dialog.component.css']
})
export class ComputerDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getComputerFormFields();
  computer: Computer = undefined!;
  submitLabel: string = 'Create';
  title!: string;
  operation!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ComputerDialogComponent>,
    private computerService: ComputerEndpointService,
    private formlyService: ComputerFormService,
  ) {
  }

  ngOnInit(): void {
    this.initComputerModeAndData();
    this.selectComputerDialogModeAndOps();
  }

  onSubmit({value}: { value: Computer }): void {
    value = this.operation === 'delete' && (value.constructor === Object && Object.keys(value).length === 0) ? this.computer : value;
    this.apiMethodsCall(value);
  }

  initComputerModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operation = mode;
    this.computer = dataObject;
  }

  selectComputerDialogModeAndOps(): void {
    this.title = this.operation === 'create' ? 'Create Computer' : this.operation === 'delete' ? 'Remove Computer' : 'Edit Computer';
    if (this.operation === 'edit') {
      this.submitLabel = 'Update'
      this.form.patchValue(this.computer);
    } else if (this.operation === 'delete') {
      this.submitLabel = 'Delete'
      this.confirmText = `<em><strong>${this.computer.model} ${this.computer.serialNumber}</strong></em> will be permanently deleted, Do you want to roceed?`
    }
  }

  apiMethodsCall(computer: Computer): void {
    if (this.operation === 'create') {
      this.callCreateApiService(computer);
    } else if (this.operation === 'edit') {
      this.callUpdateApiService(computer);
    } else if (this.operation === 'delete') {
      this.callDeleteApiService(computer);
    }
  }

  callCreateApiService(computer: Computer) {
    return this.computerService.restComputersPost(computer, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(computer: Computer) {
    this.computerService.restComputersIdPut(this.computer.id!, computer, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(computer: Computer) {
    return this.computerService.restComputersIdDelete(computer.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }


}
