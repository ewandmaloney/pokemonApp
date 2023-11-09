import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.endsWith('/login') && req.method == 'POST') {
      const { username } = req.body;

      return this.http.get('assets/users.json').pipe(
        map(user => new HttpResponse({ body: user }))
      );
    }

    return next.handle(req).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log("No estás autorizado");
        }
        return throwError(() => new Error(error))
      })
    )
  }
}
