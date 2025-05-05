import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {NgxSpinnerService} from "ngx-spinner";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private ngxSpinnerService: NgxSpinnerService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ngxSpinnerService.show();
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.ngxSpinnerService.hide();
        return throwError(() => error);
      }),
      finalize(() => {
        this.ngxSpinnerService.hide();
      }),

    );

  }
}
