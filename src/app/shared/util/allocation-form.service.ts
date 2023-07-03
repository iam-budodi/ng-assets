import {Injectable} from "@angular/core";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {ComputerService} from "../../inventory/computer/computer.service";
import {EmployeeService} from "../../employee/employee.service";

@Injectable({
  providedIn: 'root'
})
export class AllocationFormService {

  private ALLOCATION_FORM_FIELD: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    {
      key: 'allocationDate'
    },
    {
      key: 'employee',
      wrappers: ['panel'],
      props: {
        label: 'Custodian'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          className: 'flex-6',
          props: {
            label: 'Custodian Name',
            placeholder: 'Select custodian',
            options: this.employeeService.getEmployeesSelectOptions(),
            required: true,
          }
        },
      ]
    },
    {
      key: 'asset',
      wrappers: ['panel'],
      props: {
        label: 'Item'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          className: 'flex-6',
          props: {
            label: 'Item Name',
            placeholder: 'Select item',
            options: this.computerService.getAllocationSelectOptions(),
            required: true,
          }
        },
      ]
    },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'allocationRemark',
          type: 'textarea',
          className: 'flex-4',
          props: {
            label: 'Remarks',
            placeholder: 'Enter remarks (Optional)',
            required: false,
            minLength: 1,
            maxLength: 400,
            rows: 2
          }
        }
      ]
    }
  ]

  constructor(private computerService: ComputerService, private employeeService: EmployeeService) {
  }

  getAllocationFormFields(): FormlyFieldConfig[] {
    return this.ALLOCATION_FORM_FIELD;
  }
}
