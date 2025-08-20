import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SessionStorageService} from "@auth/services/session-storage.service";
import {AuthService} from "@auth/services/auth.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {ROUTE_NAMES} from "@app/app-routing.module";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // Add your code here
    private sessionStorage = inject(SessionStorageService);
    private authService = inject(AuthService);
    private router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken();

        const authReq = token
            ? req.clone({
                setHeaders: {
                    Authorization: token
                },
            })
            : req;

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout();
                    this.router.navigate([`/${ROUTE_NAMES.AUTH}/${ROUTE_NAMES.LOGIN}`]);
                }
                return throwError(() => error);
            })
        );
    }
}
