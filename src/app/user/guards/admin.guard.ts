import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard  implements CanActivate {

    constructor(private userStore: UserStoreService, private router: Router) { }

    // Add your code here
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.userStore.isAdmin$) {
            return true;
        }
        return this.router.createUrlTree(['courses']);
    }
}