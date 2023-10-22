import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
export function sendRequest(
  req: HttpRequest<unknown>,
  next: HttpHandler,
  cache: Map<string, HttpResponse<unknown>>
): Observable<HttpEvent<unknown>> {
  return next.handle(req).pipe(
    tap((event) => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, event); // Update the cache.
      }
    })
  );
}

/**
 * Enforces that only GET requests can be cached
 * @param request
 * @returns boolean
 */
export function isCacheable(request: HttpRequest<unknown>): boolean {
  return request.method === 'GET' && !request.urlWithParams.includes('account');
}
