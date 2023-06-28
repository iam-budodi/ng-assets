import {Component, Inject} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {Category, CategoryEndpointService} from "../../../service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpResponse} from "@angular/common/http";
import {CategoryFormService} from "../../../shared/util/category-form.service";
import {resetForm} from "../../../shared/util/utils";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent {
  form: FormGroup = new FormGroup({});
  fields: FormlyFieldConfig[] = this.formlyService.getCategoryFormFields();
  options: FormlyFormOptions = {};
  category: Category = undefined!;
  submitLabel: string = 'Add';
  operationMode!: string;
  title!: string;
  confirmText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    private categoryService: CategoryEndpointService,
    private formlyService: CategoryFormService
  ) {
  }

  ngOnInit(): void {
    this.initModeAndData();
    this.selectDialogModeAndOps();
  }

  onSubmit({value}: { valid: boolean, value: Category }): void {
    value = this.operationMode === 'delete' && (value.constructor === Object && Object.keys(value).length === 0) ? this.category : value;
    this.apiMethodsCall(value);
    resetForm(this.options);
  }

  initModeAndData(): void {
    const {mode, dataObject} = this.data.data;
    this.operationMode = mode;
    this.category = dataObject;
  }

  selectDialogModeAndOps(): void {
    this.title = this.operationMode === 'create' ? 'Add Category' : this.operationMode === 'delete' ? 'Remove Category' : 'Edit Category';
    if (this.operationMode === 'edit') {
      this.submitLabel = 'Update';
      this.form.patchValue(this.category);
    } else if (this.operationMode === 'delete') {
      this.submitLabel = 'Delete';
      this.confirmText = `Are you sure you want to delete the <em><strong>${this.category.name}</strong></em> category?`;
    }
  }

  apiMethodsCall(category: Category): void {
    if (this.operationMode === 'create') {
      this.callCreateApiService(category);
    } else if (this.operationMode === 'edit') {
      this.callUpdateApiService(category);
    } else if (this.operationMode === 'delete') {
      this.callDeleteApiService(category);
    }
  }

  callCreateApiService(category: Category) {
    return this.categoryService.restCategoriesPost(category, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 201) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }

  callUpdateApiService(category: Category) {
    this.categoryService.restCategoriesIdPut(this.category.id!, category, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        },
      }
    );
  }

  callDeleteApiService(category: Category) {
    return this.categoryService.restCategoriesIdDelete(category.id!, 'response').subscribe({
        next: (response: HttpResponse<string>): void => {
          if (response.status === 204) {
            this.dialogRef.close('success');
          }
        }
      }
    );
  }
}
