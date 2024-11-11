import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor( private userStoreService: UserStoreService, private router: Router) {}
    // Add your code here
    canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
        if(this.userStoreService.isAdmin) {
            return true;
        } else {
            return this.router.createUrlTree(['/courses']);
        }
    }
}
