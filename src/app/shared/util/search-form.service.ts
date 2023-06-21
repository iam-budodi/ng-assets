import {Injectable} from "@angular/core";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Injectable({
  providedIn: 'root'
})
export class SearchFormService {
  private SEARCH_FORM_FIELD: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'workId',
          type: 'input',
          className: 'flex-4',
          props: {
            label: 'Search ... ',
            placeholder: 'Enter employee work ID',
            required: true,
            minLength: 1,
            maxLength: 400,
          }
        },
        {
          key: 'status',
          type: 'select',
          className: 'flex-2',
          props: {
            label: 'Filter by status',
            options: [
              {
                value: undefined,
                label: ' -- '
              },
              {
                value: 'ALLOCATED',
                label: 'Allocated'
              },
              {
                value: 'TRANSFERRED',
                label: 'Transferred'
              },
              {
                value: 'DEALLOCATED',
                label: 'Deallocated'
              },
              {
                value: 'RETURNED',
                label: 'Returned'
              },
              {
                value: 'RETIRED',
                label: 'Retired'
              }
            ],
            required: false,
          }
        },
      ]
    }
  ]

  getSearchFormFields(): FormlyFieldConfig[] {
    return this.SEARCH_FORM_FIELD;
  }
}
