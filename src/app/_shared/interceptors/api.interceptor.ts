import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

export const authInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  console.log('Interceptando requisição:', request.url.match(/^(?:(?:\w+:\/\/)|\/)/));
  if (request.url.match(/^(?:(?:\w+:\/\/)|\/)/) === null) {
    let newUrl = `${environment.apiUrl}${request.url}`;

    console.log('newUrl:', newUrl);

    const modifiedRequest = request.clone({
      url: newUrl,
      setHeaders: {
        Authorization: `Bearer MY_AUTH_TOKEN`
      }
    });

    return next(modifiedRequest);
  }

  return next(request);

}