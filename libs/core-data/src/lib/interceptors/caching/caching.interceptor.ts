import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isCacheable, sendRequest } from '../../utils/caching.utils';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private cache: Map<HttpRequest<unknown>, HttpResponse<unknown>> = new Map();

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // continue if not cacheable.
    if (!isCacheable(request)) {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request);

    return cachedResponse
      ? of(cachedResponse)
      : sendRequest(request, next, this.cache);
  }
}
