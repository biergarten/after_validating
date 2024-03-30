import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app-routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(BrowserModule),
    provideHttpClient()
  ]
}).catch((err) => console.error(err));
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
