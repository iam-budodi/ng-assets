import {Component, OnDestroy} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {QRCodePreviewEndpointService} from "../../service";
import {QrImageFormService} from "../../shared/util/qr-image-form.service";
import {HttpResponse} from "@angular/common/http";
import {resetForm} from "../../shared/util/utils";

@Component({
  selector: 'app-qr-preview',
  templateUrl: './qr-preview.component.html',
  styleUrls: ['./qr-preview.component.css']
})
export class QrPreviewComponent implements OnDestroy {
  form: FormGroup = new FormGroup({});
  qrCodeImageUrl!: string;
  submitLabel: string = 'Load QR Code';
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = this.formlyService.qrPreview();
  blob!: Blob;

  constructor(
    private qrCodeService: QRCodePreviewEndpointService,
    private formlyService: QrImageFormService
  ) {
  }

  onSubmit({value}: any): void {
    const {workId, serialNumber} = value;
    console.log('ID : ' + workId + ' S/N : ' + serialNumber);
    this.previewQRCodeImage(workId, serialNumber);
    resetForm(this.options);
  }

  previewQRCodeImage(workId: string, serialNumber: string) {
    return this.qrCodeService.restPreviewWorkIdAllocationGet(workId, serialNumber, 'response').subscribe({
        next: (response: HttpResponse<Blob>): void => {
          if (response.status === 200) {
            this.blob = new Blob([response.body!], {type: 'image/png'});
            this.qrCodeImageUrl = URL.createObjectURL(this.blob);
          }
        }
      }
    );
  }

  printQRCode(): void {
    const printWindow: Window = window.open()!;
    const htmlString: string = `
            <html lang="EN">
              <body style="display: flex; justify-content: center; align-items: center; height: 60vh;">
                <img src="${this.qrCodeImageUrl}" onload="window.print(); window.close();" alt="QR Code Image"/>
              </body>
            </html>
           `
    printWindow?.document.open();
    printWindow?.document.write(htmlString);
    printWindow?.document.close();
  }

  downloadQrCode(): void {
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = this.qrCodeImageUrl;
    link.download = 'qr-code-image.png';
    link.click();
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.qrCodeImageUrl);
  }
}
