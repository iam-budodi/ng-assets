import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {DialogComponent} from "./dialog.component";
import {MediumConfType} from "../models/medium-conf.dialog";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  private conf = {autoFocus: true};
  private mediumConf: MediumConfType = {height: 'auto', width: '25%', ...this.conf};

  constructor(public dialog: MatDialog) {
  }

  public open<T>(component: ComponentType<T> | TemplateRef<T>, data: any) {
    this.mediumConf['data'] = {component, data};
    const conf: MediumConfType = this.mediumConf;
    return this.dialog.open(DialogComponent, conf);
  }
}
