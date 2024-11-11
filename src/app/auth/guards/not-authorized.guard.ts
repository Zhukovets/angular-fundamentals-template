import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate{

    constructor( private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
        if(!this.authService.isAuthorised) {
            return true;
        } else {
            return this.router.createUrlTree(['/courses']);
        }
    }
    // Add your code here
}
