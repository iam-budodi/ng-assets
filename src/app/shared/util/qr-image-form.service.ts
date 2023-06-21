import {Injectable} from "@angular/core";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Injectable({
  providedIn: 'root'
})
export class QrImageFormService {
  private QR_IMAGE_FORM_FIELD: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          key: 'workId',
          type: 'input',
          className: 'flex-6',
          props: {
            label: 'Work ID',
            placeholder: 'Enter employee work ID',
            required: true,
          }
        },
        {
          key: 'serialNumber',
          type: 'input',
          className: 'flex-6',
          props: {
            label: 'Serial Number',
            placeholder: 'Enter item serial number',
            required: true,
          }
        }
      ]
    }
  ]

  qrPreview(): FormlyFieldConfig[] {
    return this.QR_IMAGE_FORM_FIELD;
  }
}
