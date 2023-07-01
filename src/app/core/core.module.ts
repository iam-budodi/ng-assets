import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // process all errors
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler
    // },
    // // interceptor to show a loading spinner
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpLoadingInterceptor,
    //   multi: true
    // }
  ]
})
export class CoreModule {
}
