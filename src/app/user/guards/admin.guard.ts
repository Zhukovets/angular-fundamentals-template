import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {map, skip} from 'rxjs/operators';
import {UserStoreService} from '../services/user-store.service';
import {ROUTE_NAMES} from "@app/app-routing.module";
import {IUserInfo} from "@app/interfaces/user/user-item.interface";
import {Observable, switchMap} from "rxjs";

export const adminGuard: CanActivateFn = () => {
    const userStore = inject(UserStoreService);
    const router = inject(Router);

    let user$: Observable<IUserInfo | null>;

    if (userStore.user) {
        user$ = userStore.user$
    } else if (userStore.isUserLoading) {
        user$ = userStore.user$.pipe(skip(1));
    } else {
        user$ = userStore.getUser();
    }

    return user$.pipe(
        switchMap(()=> userStore.isAdmin$),
        map(isAdmin =>
            isAdmin || router.createUrlTree([ROUTE_NAMES.COURSES])
        )
    );
};
