import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from "@angular/router";
import {AuthService} from "@app/auth/services/auth.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {

    constructor(private auth: AuthService, private router: Router) {}

    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.auth.isAuthorised) {
            return true;
        }
        return this.router.createUrlTree(['/login']);
    }
}
