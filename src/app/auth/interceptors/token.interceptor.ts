import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { SessionStorageService } from "../services/session-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the token from the session storage
    const token = this.sessionStorageService.getToken();
    console.log(token);

    // If the token exists, clone the request and add the Authorization header
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }

    // Continue with the HTTP request
    return next.handle(authReq).pipe(
      // Catch errors
      catchError((error: HttpErrorResponse) => {
        // If the error status is 401, logout and redirect to the login page
        if (error.status === 401) {
          this.authService.logout().subscribe(() => {
            this.router.navigate(["/login"]);
          });
        }

        // Rethrow the error so it can be handled elsewhere if needed
        return throwError(error);
      })
    );
  }
}
