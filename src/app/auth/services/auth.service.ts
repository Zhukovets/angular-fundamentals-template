import { Injectable } from '@angular/core';
import { CoursesBackendService } from '@app/services/coursesbackend.service';
import { User } from '@app/shared/models/user.model';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = new Observable<boolean>();

    constructor(private backendService: CoursesBackendService, private sessionStorage: SessionStorageService) { }

    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        return this.backendService.post('/login', user).pipe(
            tap((response: any) => {
                if (response.successful) {
                    this.sessionStorage.setToken(response.result);
                    this.isAuthorized$$.next(true);
                }
            }),
            map(response => response.user)
        );
    }

    logout() {
        // Add your code here
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
    }

    register(user: any) { // replace 'any' with the required interface
        // Add your code here
        return this.backendService.post('/register', user).pipe(
            map((response: any) => response.successful)
        );
    }

    get isAuthorised() {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        // Add your code here
    }
}