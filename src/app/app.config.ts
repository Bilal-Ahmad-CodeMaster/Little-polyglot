import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    // ✅ Provide the interceptor so Angular can inject it
    AuthInterceptor,

    // ✅ Register the interceptor using inject()
    provideHttpClient(
      withInterceptors([
        (req, next) => inject(AuthInterceptor).intercept(req, { handle: next })
      ])
    ),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    //  toastr 
    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        maxOpened: 1,
        timeOut: 1000,
        positionClass: 'toast-top-right',
        autoDismiss: true,
        easeTime: 100
      }))
  ]
};
