import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SessionStorageService} from "@auth/services/session-storage.service";
import {INewUser, IUser} from "@app/interfaces/user/user-item.interface";

const API_URL = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private http: HttpClient = inject(HttpClient);
    private sessionStorage = inject(SessionStorageService);

    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    login(user: IUser) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<{ result: string }>(`${API_URL}/login`, user)
            .pipe(
                tap(response => {
                    this.sessionStorage.setToken(response.result);
                    this.isAuthorized$$.next(true);
                })
            );
    }

    register(user: INewUser) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<{ result: string }>(`${API_URL}/register`, user)
    }

    logout() {
        // Add your code here
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
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
        return `${API_URL}/login`;
    }

    checkAuthorization(): void {
        const token = this.sessionStorage.getToken();
        this.isAuthorized$$.next(!!token);
    }
}
