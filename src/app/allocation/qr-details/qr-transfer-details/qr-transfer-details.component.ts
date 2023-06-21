import {Component} from '@angular/core';
import {Transfer} from "../../../service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-qr-transfer-details',
  templateUrl: './qr-transfer-details.component.html',
  styleUrls: ['./qr-transfer-details.component.css']
})
export class QrTransferDetailsComponent {
  assetTransfer!: Transfer;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(({transfer}): void => {
      this.assetTransfer = transfer;
    });
  }
}
