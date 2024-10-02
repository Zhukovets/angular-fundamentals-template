import {Injectable} from '@angular/core';
import {SessionStorageService} from './session-storage.service'
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginData, LoginResponse, RegisterResponse} from "@app/models/card.model";
import {baseUrl} from "@app/api.config";
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Accept': '*/*',
            'Content-Type': 'application/json'
        });
    }

    constructor(private http: HttpClient, private sessionStorage: SessionStorageService, public router: Router,) {
        const token = this.sessionStorage.getToken();
        this.isAuthorized$$.next(!!token);
    }

    login(user: LoginData): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.getLoginUrl(), JSON.stringify(user), {headers: this.createHeaders()})
            .pipe(
            tap((response: LoginResponse) => {
                if (response.successful) {
                    this.sessionStorage.setToken(response.result);
                    this.isAuthorized$$.next(true);
                }
            }),
            catchError(error => {
                console.error('Login failed', error);
                return throwError(() => new Error('Login failed'));
            })
        )
    }

    logout(): void {
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
        this.router.navigate(['/login']);
    }

    register(user: LoginData): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(this.getRegisterUrl(), JSON.stringify(user),{headers: this.createHeaders()})
            .pipe(
            catchError(error => {
                console.error('Registration failed', error);
                return throwError(() => new Error('Registration failed'));
            })
        )
    }

    get isAuthorised() {
        return !!this.sessionStorage.getToken();
    }

    set isAuthorised(value: boolean) {
        if (value) {
            this.isAuthorized$$.next(true);
        } else {
            this.sessionStorage.deleteToken();
            this.isAuthorized$$.next(false);
        }
    }

    getLoginUrl() {
        return baseUrl + '/login';
    }

    getRegisterUrl() {
        return baseUrl + '/register';
    }

    isCurrentUrl(path: string): boolean {
        return this.router.url === path;
    }
}

