import {Component, ComponentRef, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('target', {read: ViewContainerRef}) viewContainerRef!: ViewContainerRef;
  componentRef!: ComponentRef<any>;

  constructor(
    private container: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.componentRef = this.container.createComponent(this.data.component);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
