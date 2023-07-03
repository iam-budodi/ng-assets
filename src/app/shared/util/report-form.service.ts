import {Injectable} from "@angular/core";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {toDateParser} from "./utils";

@Injectable({
  providedIn: 'root'
})
export class ReportFormService {
  private REPORT_FORM_FIELD: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'reportType',
          type: 'select',
          className: 'flex-2',
          props: {
            label: 'Report Type',
            options: [
              {
                value: 'employee',
                label: 'Employee Report'
              },
              {
                value: 'asset',
                label: 'Asset Report'
              },
              {
                value: 'allocation',
                label: 'Allocation Report'
              },
              {
                value: 'transfer',
                label: 'Change of Asset Ownership Report'
              }
            ],
            required: true,
          }
        },

        {
          key: 'startDate',
          type: 'datepicker',
          className: 'flex-2',
          props: {
            required: true,
            label: 'Start Date'
          },
          parsers: [toDateParser]
        },

        {
          key: 'endDate',
          type: 'datepicker',
          className: 'flex-2',
          props: {
            required: true,
            label: 'End Date'
          },
          parsers: [toDateParser]
        },
      ]
    }
  ]

  getReportFormFields(): FormlyFieldConfig[] {
    return this.REPORT_FORM_FIELD;
  }
}
