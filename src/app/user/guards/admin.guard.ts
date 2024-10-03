import { Injectable } from '@angular/core';
import {CanActivate, Router, UrlTree} from "@angular/router";
import {UserStoreService} from "@app/user/services/user-store.service";
import {map, Observable} from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
    // Add your code here
    constructor(private userStoreService: UserStoreService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.userStoreService.isAdmin$.pipe(
            map(isAdmin => {
                if (isAdmin) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/courses']);
                }
            })
        );
    }
}
