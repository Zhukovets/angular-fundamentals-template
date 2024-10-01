import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, UrlTree } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard{

    constructor(private authService: AuthService, private router: Router){}

    canActivate():boolean | UrlTree{
        if (this.authService.isAuthorised) {
            return this.router.createUrlTree(['/courses']);
        } else {
            return true;
        }
    }
}
