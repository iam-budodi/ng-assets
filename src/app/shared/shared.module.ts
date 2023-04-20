import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingDialogComponent} from "./loading/loading-dialog/loading-dialog.component";
import {ErrorDialogComponent} from "./errors/error-dialog/error-dialog.component";
import {RouterModule} from "@angular/router";
import {ErrorDialogService} from "./errors/error-dialog.service";
import {LoadingDialogService} from "./loading/loading-dialog.service";
import {DialogService} from "./dialog/dialog.service";
import {DialogComponent} from "./dialog/dialog.component";
import {MaterialModule} from "../material.module";

const sharedComponents = [DialogComponent, LoadingDialogComponent, ErrorDialogComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [...sharedComponents],
  providers: [DialogService, ErrorDialogService, LoadingDialogService]
})
export class SharedModule { }
