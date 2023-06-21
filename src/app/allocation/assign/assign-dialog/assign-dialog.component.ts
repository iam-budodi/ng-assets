import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {Allocation, AllocationEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpResponse} from "@angular/common/http";
import {AllocationFormService} from "../../../shared/util/allocation-form.service";

@Component({
  selector: 'app-assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.css']
})
export class AssignDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getAllocationFormFields();
  allocation: Allocation = undefined!;
  submitLabel: string = 'Assign';
  title!: string;
  operation!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AssignDialogComponent>,
    private assignmentService: AllocationEndpointService,
    private formlyService: AllocationFormService,
  ) {
  }

  ngOnInit(): void {
    this.initModeAndData();
    this.selectDialogModeAndOps();
  }

  onSubmit({value}: { value: Allocation }): void {
    value = this.operation === 'delete' && (value.constructor === Object && Object.keys(value).length === 0)
      ? this.allocation
      : value;
    this.apiMethodsCall(value);
  }

  initModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operation = mode;
    this.allocation = dataObject;
  }

  selectDialogModeAndOps(): void {
    this.title = this.operation === 'create' ? 'Assign Item' : this.operation === 'delete' ? 'Remove Record' : 'Update Record';
    if (this.operation === 'edit') {
      this.submitLabel = 'Update'
      this.form.patchValue(this.allocation);
    } else if (this.operation === 'delete') {
      this.submitLabel = 'Delete'
      this.confirmText = `<em><strong>${this.allocation.asset.brand} ${this.allocation.asset.model}</strong></em> will be permanently deleted, Do you want to roceed?`
    }
  }

  apiMethodsCall(allocation: Allocation): void {
    if (this.operation === 'create') {
      this.callAssignApiService(allocation);
    } else if (this.operation === 'edit') {
      this.callUpdateApiService(allocation);
    } else if (this.operation === 'delete') {
      this.callDeleteApiService(allocation);
    }
  }

  callAssignApiService(allocation: Allocation) {
    return this.assignmentService.restAllocationsPost(allocation, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(allocation: Allocation) {
    this.assignmentService.restAllocationsAllocationIdPut(this.allocation.id!, allocation, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            console.log('ASSIGN : ' + response.body);
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(allocation: Allocation) {
    return this.assignmentService.restAllocationsAllocationIdDelete(allocation.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

}
