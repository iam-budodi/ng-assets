import {Injectable} from '@angular/core';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {toDateParser} from "./utils";
import {SupplierService} from "../../inventory/supplier/supplier.service";

@Injectable({
  providedIn: 'root'
})
export class PurchaseFormService {

  private PURCHASE_FORM_FIELD: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    {
      key: 'invoiceNumber',
      type: 'input',
      props: {
        label: 'Order Invoice',
        placeholder: 'Enter invoice number',
        required: true,
        minLength: 2,
        maxLength: 64
      }
    },
    {
      key: 'purchaseDate',
      type: 'datepicker',
      props: {
        required: true,
        placeholder: 'Enter purchase date',
        label: 'Purchase Date'
      },
      parsers: [toDateParser]

    },
    {
      key: 'purchasePrice',
      type: 'input',
      props: {
        type: 'number',
        label: 'Purchase Price',
        placeholder: 'Enter price',
        required: true,
      }
    },
    {
      key: 'purchaseQty',
      type: 'input',
      props: {
        type: 'number',
        label: 'Purchase Quantity',
        placeholder: 'Enter quantity',
        required: true,
      }
    },
    {
      key: 'supplier',
      wrappers: ['panel'],
      props: {
        label: 'Supplier'
      },
      fieldGroup: [
        {
          key: 'id',
          type: 'select',
          props: {
            label: 'Supplier Name',
            placeholder: 'Select supplier name',
            options: this.supplierService.getSupplierSelectOptions(),
            required: true,
            minLength: 2,
            maxLength: 64
          }
        },
      ]
    },
  ]

  constructor(private supplierService: SupplierService) {
  }

  getPurchaseFormFields(): FormlyFieldConfig[] {
    return this.PURCHASE_FORM_FIELD;
  }
}
