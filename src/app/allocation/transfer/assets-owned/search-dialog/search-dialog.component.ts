import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AllocationEndpointService, AllocationStatus, EmployeeAsset} from "../../../../service";
import {HttpResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {SearchFormService} from "../../../../shared/util/search-form.service";
import {resetForm} from "../../../../shared/util/utils";

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {
  form: FormGroup = new FormGroup({});
  options: FormlyFormOptions = {}
  submitLabel: string = 'Search';
  title: string = 'Search by work ID';
  fields: FormlyFieldConfig[] = this.formlyService.getSearchFormFields();


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SearchDialogComponent>,
    private allocationService: AllocationEndpointService,
    private formlyService: SearchFormService
  ) {
  }

  onSubmit({value}: any): void {
    const {workId, status} = value;
    this.getAllEmployeeAssets(workId, status);
    resetForm(this.options);
  }

  getAllEmployeeAssets(workId: string, status: AllocationStatus) {
    return this.allocationService.restAllocationsWorkIdAssetGet(workId, status, 'response').subscribe({
        next: (response: HttpResponse<Array<EmployeeAsset>>): void => {
          if (response.status === 200) {
            this.dialogRef.close(response.body);
          }
        }
      }
    );
  }

}
