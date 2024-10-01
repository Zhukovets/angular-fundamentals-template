import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard {

    constructor(private authService: AuthService, private router: Router){}

    canLoad(): boolean | UrlTree {
        if (this.authService.isAuthorised) {
            return true;
        } else {
            return this.router.createUrlTree(['/login']);
        }
    }
}
