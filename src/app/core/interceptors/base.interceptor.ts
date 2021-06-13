import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getLocale } from '@utils/i18nHelper';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(@Inject('BASE_API_URL') private baseUrl: string) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const apiReq = request.clone({
      url: `${this.baseUrl}/${request.url}`,
      setHeaders: {
        'Accept-Language': getLocale(),
      },
    });

    return next.handle(apiReq);
  }
}
