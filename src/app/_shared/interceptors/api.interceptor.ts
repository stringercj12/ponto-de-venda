import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export const authInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const backendUrl = 'http://localhost:8000';
  let newUrl = request.url;

  if (request.url.startsWith('/api/')) {
    newUrl = `${backendUrl}${request.url}`;
  }

  const modifiedRequest = request.clone({
    url: newUrl,
    setHeaders: {
      Authorization: `Bearer MY_AUTH_TOKEN`
    }
  });
  return next(modifiedRequest);

}