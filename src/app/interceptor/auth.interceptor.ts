import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, finalize, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { PageTranslatorService } from '../services/page-translator.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private pageTranslator: PageTranslatorService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    this.loaderService.show();

    return next.handle(authReq).pipe(
      mergeMap((event: HttpEvent<any>) => {
        if (
          event instanceof HttpResponse &&
          req.method === 'GET' &&
          this.pageTranslator.shouldTranslate &&
          !this.pageTranslator.isAdminRoute() &&
          this.pageTranslator.isTranslatableApiUrl(req.url)
        ) {
          return from(this.pageTranslator.translateJson(event.body)).pipe(
            mergeMap((body) => of(event.clone({ body })))
          );
        }
        return of(event);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
