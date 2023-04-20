import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from 'rxjs';
import {LoadingDialogService} from "../../shared/loading/loading-dialog.service";

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private loadingDialogService: LoadingDialogService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingDialogService.openDialog();
    return next.handle(request).pipe(
      finalize((): void => {
        this.loadingDialogService.hideDialog();
      })
    ) as Observable<HttpEvent<unknown>>; // test any also
  }
}
