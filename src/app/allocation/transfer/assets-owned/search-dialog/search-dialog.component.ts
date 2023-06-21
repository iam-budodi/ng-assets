import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AllocationEndpointService, AllocationStatus, EmployeeAsset} from "../../../../service";
import {HttpResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {SearchFormService} from "../../../../shared/util/search-form.service";

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {
  form: FormGroup = new FormGroup({});
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
  }

  getAllEmployeeAssets(workId: string, status: AllocationStatus) {
    return this.allocationService.restAllocationsAssetsGet(workId, status, 'response').subscribe({
        next: (response: HttpResponse<Array<EmployeeAsset>>): void => {
          if (response.status === 200) {
            this.dialogRef.close(response.body);
          }
        }
      }
    );
  }

}
