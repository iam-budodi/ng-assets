import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {Purchase, PurchaseEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpResponse} from "@angular/common/http";
import {PurchaseFormService} from "../../../shared/util/purchase-form.service";
import {resetForm} from "../../../shared/util/utils";

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getPurchaseFormFields();
  options: FormlyFormOptions = {};
  purchase: Purchase = undefined!;
  submitLabel: string = 'Create';
  title!: string;
  operation!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PurchaseDialogComponent>,
    private purchaseService: PurchaseEndpointService,
    private formlyService: PurchaseFormService,
  ) {
  }

  ngOnInit(): void {
    this.initPurchaseModeAndData();
    this.selectPurchaseDialogModeAndOps();
  }

  onSubmit({value}: { value: Purchase }): void {
    value = this.operation === 'delete' && (value.constructor === Object && Object.keys(value).length === 0) ? this.purchase : value;
    this.apiMethodsCall(value);
    resetForm(this.options);
  }


  initPurchaseModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operation = mode;
    this.purchase = dataObject;
  }

  selectPurchaseDialogModeAndOps(): void {
    this.title = this.operation === 'create' ? 'Create Purchase Record' : this.operation === 'delete' ? 'Remove Purchase Record' : 'Edit Purchase Record';
    if (this.operation === 'edit') {
      this.submitLabel = 'Update'
      this.form.patchValue(this.purchase);
    } else if (this.operation === 'delete') {
      this.submitLabel = 'Delete'
      this.confirmText = `<em><strong>${this.purchase.invoiceNumber}</strong></em> will be permanently deleted, Do you want to roceed?`
    }
  }

  apiMethodsCall(purchase: Purchase): void {
    if (this.operation === 'create') {
      this.callCreateApiService(purchase);
    } else if (this.operation === 'edit') {
      this.callUpdateApiService(purchase);
    } else if (this.operation === 'delete') {
      this.callDeleteApiService(purchase);
    }
  }

  callCreateApiService(purchase: Purchase) {
    return this.purchaseService.restPurchasesPost(purchase, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(purchase: Purchase) {
    this.purchaseService.restPurchasesIdPut(this.purchase.id!, purchase, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(purchase: Purchase) {
    return this.purchaseService.restPurchasesIdDelete(purchase.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }


}
