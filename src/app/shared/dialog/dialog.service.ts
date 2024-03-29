import {Injectable, TemplateRef} from '@angular/core';
import {ComponentType} from "@angular/cdk/overlay";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog.component";
import {MediumConfType} from "../models/medium-conf.dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private conf = {autoFocus: true};
  private mediumConf: MediumConfType = {height: 'auto', width: '40%', ...this.conf};

  constructor(public dialog: MatDialog) {
  }

  public open<T>(component: ComponentType<T> | TemplateRef<T>, data: any) {
    this.mediumConf['data'] = {component, data};
    const conf: MediumConfType = this.mediumConf;
    return this.dialog.open(DialogComponent, conf);
  }

  // Alert dialog component will replace the DialogComponent
  public error<T>(error: any) {
    return this.dialog.open(DialogComponent, {data: error, panelClass: 'alert-panel'});
  }
}
