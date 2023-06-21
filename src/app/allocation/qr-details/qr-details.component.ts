import {Component} from '@angular/core';
import {Allocation,} from "../../service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-qr-details',
  templateUrl: './qr-details.component.html',
  styleUrls: ['./qr-details.component.css']
})
export class QrDetailsComponent {
  allocation!: Allocation;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  // THIS IS ALSO OKAY
  // ngOnInit(): void {
  //   this.route.data.forEach((data) => {
  //     this.allocation = data['allocation'];
  //   });
  // }

  ngOnInit(): void {
    this.route.data.subscribe(({allocation}): void => {
      this.allocation = allocation;
    });
  }
}
