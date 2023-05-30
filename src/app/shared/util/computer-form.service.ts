import {Injectable} from '@angular/core';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {EmployeeFormService} from "./employee-form.service";
import {PurchaseService} from "../../inventory/purchase/purchase.service";
import {CategoryService} from "../../inventory/category/category.service";
import {selectOptions} from "./utils";
import {Peripheral} from "../../service";

@Injectable({
  providedIn: 'root'
})
export class ComputerFormService {

  private COMPUTER_FORM_FIELD: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    this.formlyFields.formlyRow([
        {
          key: 'brand',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Computer Brand',
            placeholder: 'Enter brand name',
            required: true,
            minLength: 2,
            maxLength: 64,
          }
        },
        {
          key: "model",
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Model name',
            placeholder: 'Enter model name',
            required: true,
            minLength: 2,
            maxLength: 64,
          }
        },
        {
          key: "modelNumber",
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Model number',
            placeholder: 'Enter model number',
            required: true,
            minLength: 3,
            maxLength: 64,
          }
        },
        {
          key: 'serialNumber',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Serial Number',
            placeholder: 'Enter serial number',
            required: true,
            minLength: 3,
            maxLength: 64,
          }
        },
        {
          key: 'manufacturer',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Manufacturer',
            placeholder: 'Enter manufacturer',
            required: true,
            minLength: 2,
            maxLength: 64,
          }
        },
        {
          key: 'processor',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Processor',
            placeholder: 'Enter processor',
            required: true,
            minLength: 4,
            maxLength: 64
          }
        },
        {
          key: 'memory',
          type: 'input',
          className: 'flex-2',
          props: {
            type: 'number',
            label: 'Computer memory',
            placeholder: 'Enter memory size in MBs',
            required: true
          }
        },
        {
          key: 'storage',
          type: 'input',
          className: 'flex-2',
          props: {
            type: 'number',
            label: 'Computer storage',
            placeholder: 'Enter storage size in MBs',
            required: true
          }
        },
        {
          key: 'displaySize',
          type: 'input',
          className: 'flex-2',
          props: {
            type: 'number',
            label: 'Computer display',
            placeholder: 'Enter display size in Inch',
            required: true
          }
        },
        {
          key: 'peripherals',
          type: 'select',
          className: 'flex-2',
          props: {
            multiple: true,
            options: selectOptions(Peripheral),
            label: 'Peripherals',
            placeholder: 'Enter peripherals',
            required: true,
          }
        },
        {
          key: 'operatingSystem',
          type: 'input',
          className: 'flex-2',
          props: {
            label: 'Operating System',
            placeholder: 'Enter OS',
            required: true,
          }
        },
      ]
    ),
    {
      key: 'category',
      wrappers: ['panel'],
      props: {
        label: 'Computer Category'
      },
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          className: 'flex-2',
          props: {
            label: 'Category Name',
            placeholder: 'Select category',
            options: this.categoryService.getCategoriesSelectOptions(),
            required: false,
          }
        },
      ]
    },
    {
      key: 'purchase',
      wrappers: ['panel'],
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          className: 'flex-2',
          props: {
            label: 'Purchase Reference',
            placeholder: 'Select category',
            options: this.purchaseService.getPurchaseSelectOptions(),
            required: false,
          }
        },
        // {
        //   key: 'invoiceNumber',
        //   // props: {
        //   //
        //   // }
        //   expressions: {
        //     'props.label': 'formState.id.label'
        //     // 'props.label': 'formState.id ? formState.id.label : null'
        //   }
        // }
      ]
    },
  ]

  constructor(
    private formlyFields: EmployeeFormService,
    private purchaseService: PurchaseService,
    private categoryService: CategoryService) {
  }

  getComputerFormFields = (): FormlyFieldConfig[] => {
    return this.COMPUTER_FORM_FIELD;
  }
}
