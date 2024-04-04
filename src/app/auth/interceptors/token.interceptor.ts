import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private sessionStorage: SessionStorageService,
        private authService: AuthService
    ) { }

    // Add your code here
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken();
        if (this.authService.isAuthorised && token) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(authReq).pipe(tap(response => {
                const res = response as HttpResponse<any>;
                if (res.status == 401) {
                    this.router.navigate(['login']);
                }
            }));
        }
        else {
            return next.handle(req);
        }
    }
}
