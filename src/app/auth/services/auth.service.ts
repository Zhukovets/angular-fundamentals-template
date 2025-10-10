import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';

interface UserCredentials { email: string; password: string; }
interface RegisterData extends UserCredentials { name: string; } 
interface AuthResponse { token: string; }

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:4000/api';

    private isAuthorized$$ = new BehaviorSubject<boolean>(!!this.sessionStorageService.getToken());

    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService,
        private router: Router
    ) { }
    
    login(credentials: UserCredentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
            tap((response: AuthResponse) => {
                this.sessionStorageService.setToken(response.token);
                this.isAuthorized$$.next(true);
            }),
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    logout(): void {
        this.sessionStorageService.deleteToken();
        this.isAuthorized$$.next(false);
        this.router.navigate(['/login']);
    }

    register(userData: RegisterData): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData).pipe(
            tap((response: AuthResponse) => {
                this.sessionStorageService.setToken(response.token);
                this.isAuthorized$$.next(true);
            }),
            catchError(error => {
                return throwError(() => error);
            })
        );
    }

    get isAuthorized(): boolean {
        return this.isAuthorized$$.value;
    }

    set isAuthorized(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl(): string {
        return '/login';
    }
}
