import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionStorageService } from '../services/session-storage.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private session: SessionStorageService,
    private auth: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url.toLowerCase();
    if (url.includes('/login') || url.includes('/register')) {
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.auth.logout().subscribe({ next: () => {}, error: () => {} });
          }
          return throwError(() => err);
        })
      );
    }

    const token = this.session.getToken();
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.auth.logout().subscribe({ next: () => {}, error: () => {} });
        }
        return throwError(() => err);
      })
    );
  }
}
