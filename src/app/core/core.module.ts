import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {RouterModule} from '@angular/router';
import {throwIfAlreadyLoaded} from '@guards/module-import.guard';
import {ngZorroGlobalLanguage, setDateFnsLocale} from '@utils/i18nHelper';
import {DateFnsConfigurationService} from 'ngx-date-fns';
// @ts-ignore
import {environment} from '@environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BaseInterceptor} from '@interceptors/base.interceptor';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NZ_I18N} from 'ng-zorro-antd/i18n';

//auth module
import {TokenInterceptor} from '@interceptors/token.interceptor';
import {ErrorInterceptor} from '@interceptors/error.interceptor';

registerLocaleData(en);

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    // Vendor
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,

    // NG Zorro imports
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
  ],
  providers: [
    // Configuration
    { provide: NZ_I18N, useValue: ngZorroGlobalLanguage() },
    { provide: DateFnsConfigurationService, useValue: setDateFnsLocale() },

    // Variable providers
    { provide: 'BASE_API_URL', useValue: environment.API_URL },

    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
    
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    
  ],
  exports: [MainLayoutComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
