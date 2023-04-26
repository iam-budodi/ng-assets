import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {Supplier, SupplierEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpResponse} from "@angular/common/http";
import {SupplierFormService} from "../../../shared/util/supplier-form.service";

@Component({
  selector: 'app-supplier-dialog',
  templateUrl: './supplier-dialog.component.html',
  styleUrls: ['./supplier-dialog.component.css']
})
export class SupplierDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getDepartmentFormFields();
  supplier: Supplier = undefined!;
  submitLabel: string = 'Create';
  title!: string;
  operation!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SupplierDialogComponent>,
    private supplierService: SupplierEndpointService,
    private formlyService: SupplierFormService,
  ) {
  }

  ngOnInit(): void {
    this.initSupplierModeAndData();
    this.selectSupplierDialogModeAndOps();
  }

  onSubmit({valid, value}: { valid: boolean, value: Supplier }): void {
    value = this.operation === 'delete' && (value.constructor === Object && Object.keys(value).length === 0) ? this.supplier : value;
    this.apiMethodsCall(value);
  }


  initSupplierModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operation = mode;
    this.supplier = dataObject;
  }

  selectSupplierDialogModeAndOps(): void {
    this.title = this.operation === 'create' ? 'Create Supplier' : this.operation === 'delete' ? 'Remove Supplier' : 'Edit Supplier';
    if (this.operation === 'edit') {
      this.submitLabel = 'Update'
      this.form.patchValue(this.supplier);
    } else if (this.operation === 'delete') {
      this.submitLabel = 'Delete'
      this.confirmText = `<em><strong>${this.supplier.name}</strong></em> will be permanently deleted, Do you want to roceed?`
    }
  }

  apiMethodsCall(supplier: Supplier): void {
    if (this.operation === 'create') {
      this.callCreateApiService(supplier);
    } else if (this.operation === 'edit') {
      this.callUpdateApiService(supplier);
    } else if (this.operation === 'delete') {
      this.callDeleteApiService(supplier);
    }
  }

  callCreateApiService(supplier: Supplier) {
    return this.supplierService.restSuppliersPost(supplier, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(supplier: Supplier) {
    this.supplierService.restSuppliersIdPut(supplier, this.supplier.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(supplier: Supplier) {
    return this.supplierService.restSuppliersIdDelete(supplier.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }


}
