import {Component, Inject, OnInit} from '@angular/core';
import {College, CollegeEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {resetForm} from "../../../shared/util/utils";
import {CollegeFormService} from "../../../shared/util/college-form.service";


@Component({
  selector: "app-college-dialog",
  templateUrl: './college-dialog.component.html',
  styleUrls: ['./college-dialog.component.css'],
})
export class CollegeDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getCollegeFormFields();
  options: FormlyFormOptions = {};
  college!: College;
  submitLabel: string = 'Add';
  operationMode!: string;
  title!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CollegeDialogComponent>,
    private collegeService: CollegeEndpointService,
    private formlyService: CollegeFormService
  ) {
  }

  ngOnInit(): void {
    this.initModeAndData();
    this.selectDialogModeAndOps();
  }

  onSubmit({value}: { valid: boolean, value: College }): void {
    value = this.operationMode === 'delete' && (value.constructor === Object && Object.keys(value).length === 0) ? this.college : value;
    this.apiMethodsCall(value);
    resetForm(this.options);
  }

  initModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operationMode = mode;
    this.college = dataObject;
  }

  selectDialogModeAndOps(): void {
    this.title = this.operationMode === 'create' ? 'Create College' : this.operationMode === 'delete' ? 'Remove College' : 'Edit College';
    if (this.operationMode === 'edit') {
      this.submitLabel = 'Update';
      this.form.patchValue(this.college);
    } else if (this.operationMode === 'delete') {
      console.log('DELETE VAL : ' + JSON.stringify(this.college));
      this.submitLabel = 'Delete';
      this.confirmText = `Are you sure you want to delete the <em><strong>${this.college.collegeName}</strong></em>?`;
    }
  }

  apiMethodsCall(college: College): void {
    if (this.operationMode === 'create') {
      this.callCreateApiService(college);
    } else if (this.operationMode === 'edit') {
      this.callUpdateApiService(college);
    } else if (this.operationMode === 'delete') {
      this.callDeleteApiService(college);
    }
  }

  callCreateApiService(college: College) {
    return this.collegeService.restCollegePost(college, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(college: College) {
    this.collegeService.restCollegeIdPut(this.college.id!, college, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(college: College) {
    return this.collegeService.restCollegeIdDelete(college.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }
}
