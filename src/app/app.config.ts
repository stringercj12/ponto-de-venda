import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './_shared/interceptors/api.interceptor';
import { routes } from './app.routes';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideNgxMask } from 'ngx-mask';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideNgxMask(),
    importProvidersFrom(NgxSpinnerModule.forRoot({
      type: 'ball-clip-rotate'
    })),
  ]
};
