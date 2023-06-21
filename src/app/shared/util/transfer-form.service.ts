import {Injectable} from "@angular/core";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {ComputerService} from "../../inventory/computer/computer.service";
import {EmployeeService} from "../../employee/employee.service";

@Injectable({
  providedIn: 'root'
})
export class TransferFormService {

  private TRANSFER_FORM_FIELD: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    {
      key: 'transferDate'
    },
    {
      key: 'employee',
      wrappers: ['panel'],
      props: {
        label: 'Previous Custodian'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          className: 'flex-6',
          props: {
            label: 'Previous Custodian',
            placeholder: 'Select Custodian',
            options: this.employeeService.getEmployeesSelectOptions(),
            required: true,
          }
        },
      ]
    },
    {
      key: 'newEmployee',
      wrappers: ['panel'],
      props: {
        label: 'Current Custodian'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          className: 'flex-6',
          props: {
            label: 'Current Custodian',
            placeholder: 'Select Custodian',
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
            options: this.computerService.getComputerSelectOptions(),
            required: true,
          }
        },
      ]
    },
    // {
    //   key: 'asset',
    //   wrappers: ['panel'],
    //   props: {
    //     label: 'Item'
    //   },
    //   fieldGroupClassName: 'display-flex',
    //   fieldGroup: [
    //     {
    //       key: 'id',
    //       type: 'input',
    //       className: 'flex-6',
    //       props: {
    //         label: 'Item Name',
    //         placeholder: 'Employee item',
    //         required: true,
    //       }
    //     },
    //   ]
    // },
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'transferRemark',
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

  getTransferFormFields(): FormlyFieldConfig[] {
    return this.TRANSFER_FORM_FIELD;
  }
}
