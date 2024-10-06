import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from "@app/auth/services/auth.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {SessionStorageService} from "@app/auth/services/session-storage.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private router: Router, private sessionStorageService: SessionStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorageService.getToken();
        let authReq = req;
        if (token) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: token,
                },
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.logout();
                    this.router.navigate(['/login']);
                }
                return throwError(() => error); //need to return in order to align returned type
            })
        );
    }
}