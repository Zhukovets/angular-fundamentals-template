import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {UserService} from "@app/user/services/user.service";
import {IUserInfo} from "@app/interfaces/user/user-item.interface";

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private user$$ = new BehaviorSubject<IUserInfo | null>(null);
    private isUserLoading$$ = new BehaviorSubject<boolean>(false);

    readonly user$: Observable<IUserInfo | null> = this.user$$.asObservable();
    readonly name$: Observable<string | null> = this.user$.pipe(
        map((user) => user?.name || null),
    )
    readonly isAdmin$: Observable<boolean> = this.user$.pipe(
        map((isAdmin) => isAdmin?.role === 'admin')
    )

    private userService = inject(UserService);

    getUser(): Observable<IUserInfo> {
        // Add your code here
        this.isUserLoading$$.next(true);
        return this.userService.getUser()
            .pipe(
                tap(user => {
                    this.user$$.next(user);
                    this.isUserLoading$$.next(false);
                })
            )
    }

    get user(): IUserInfo | null {
        return this.user$$.getValue();
    }

    get isUserLoading(): boolean {
        return this.isUserLoading$$.getValue();
    }
}
