import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpLoadingInterceptor} from "./errors/http-loading.interceptor";
import {GlobalErrorHandler} from "./errors/global-error-handler";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // process all errors
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    // interceptor to show a loading spinner
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
}
