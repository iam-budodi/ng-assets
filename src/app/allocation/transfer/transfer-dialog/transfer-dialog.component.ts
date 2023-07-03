import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {Transfer, TransferEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpResponse} from "@angular/common/http";
import {TransferFormService} from "../../../shared/util/transfer-form.service";
import {resetForm} from "../../../shared/util/utils";

@Component({
  selector: 'app-transfer-dialog',
  templateUrl: './transfer-dialog.component.html',
  styleUrls: ['./transfer-dialog.component.css']
})
export class TransferDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getTransferFormFields();
  options: FormlyFormOptions = {};
  transfer: Transfer = undefined!;
  submitLabel: string = 'Change';
  title!: string;
  operation!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TransferDialogComponent>,
    private transferService: TransferEndpointService,
    private formlyService: TransferFormService,
  ) {
  }

  ngOnInit(): void {
    this.initModeAndData();
    this.selectDialogModeAndOps();
  }

  onSubmit({value}: { value: Transfer }): void {
    value = this.operation === 'delete' && (value.constructor === Object && Object.keys(value).length === 0)
      ? this.transfer
      : value;
    this.apiMethodsCall(value);
    resetForm(this.options);
  }

  initModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operation = mode;
    this.transfer = dataObject;
  }

  selectDialogModeAndOps(): void {
    this.title = this.operation === 'create' ? 'Change Ownership' : this.operation === 'delete' ? 'Remove Record' : 'Update Record';
    if (this.operation === 'create') {
      this.form.patchValue(this.transfer);
    }
    if (this.operation === 'edit') {
      this.submitLabel = 'Update'
      this.form.patchValue(this.transfer);
    } else if (this.operation === 'delete') {
      this.submitLabel = 'Delete'
      this.confirmText = `<em><strong>${this.transfer.asset.brand} ${this.transfer.asset.model}</strong></em> will be permanently deleted, Do you want to roceed?`
    }
  }

  apiMethodsCall(transfer: Transfer): void {
    if (this.operation === 'create') {
      this.callTransferApiService(transfer);
    } else if (this.operation === 'edit') {
      this.callUpdateApiService(transfer);
    } else if (this.operation === 'delete') {
      this.callDeleteApiService(transfer);
    }
  }

  callTransferApiService(transfer: Transfer) {
    return this.transferService.restTransfersPost(transfer, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(transfer: Transfer) {
    this.transferService.restTransfersTransferIdPut(this.transfer.id!, transfer, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(transfer: Transfer) {
    return this.transferService.restTransfersTransferIdDelete(transfer.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

}
