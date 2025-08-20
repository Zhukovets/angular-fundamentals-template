import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {map} from "rxjs";
import {ROUTE_NAMES} from "@app/app-routing.module";

export const authorizedGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthorized$.pipe(
        map((value)=>
             value || router.parseUrl(`/${ROUTE_NAMES.AUTH}/${ROUTE_NAMES.LOGIN}`)
        )
    );
};


