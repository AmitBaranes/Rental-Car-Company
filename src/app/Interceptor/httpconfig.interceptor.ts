import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { noop,  Observable } from 'rxjs';
  import 'rxjs/add/operator/do';
  import sweetalert2 from 'sweetalert2';
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const token = sessionStorage.getItem('token');
      let request = req;
      if (token) {
        request = req.clone({
          headers: req.headers.set(
            'Baranes-RentalCar-Token',
            `Bearer ${token.toString()}`
          )
        });
      }
      return next.handle(request).do(noop, (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            sweetalert2.close();
            this.router.navigate(['/login']);
          }
        }
      });
    }
  }
