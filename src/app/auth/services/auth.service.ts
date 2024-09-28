import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = 'http://localhost:4000/api';
    private isAuthorized$$ = new BehaviorSubject<boolean>(this.sessionStorageService.getToken() !== null);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorageService: SessionStorageService,
    ) {}

    login(user: {email: string, password: string}): Observable<any> { // replace 'any' with the required interface
        return this.http.post<any>(`${this.apiUrl}/login`, user)
            .pipe(tap(response => {
                if (response.token) {
                    this.sessionStorageService.setToken(response.token);
                    this.isAuthorised = true
                }
            }))
        // Add your code here
    }

    logout(): void {
        this.sessionStorageService.deleteToken();
        this.isAuthorised = false;
        // Add your code here
    }

    register(user: { name: string; email: string; password: string }): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
            tap((response) => {
                if (response.token) {
                    this.sessionStorageService.setToken(response.token);
                    this.isAuthorised = true;
                }
            })
        );
    }

    get isAuthorised(): boolean {
        return this.isAuthorized$$.value
        // Add your code here. Get isAuthorized$$ value
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value)
        // Add your code here. Change isAuthorized$$ value
    }

    getLoginUrl(): string {
        return `${this.apiUrl}/login`;
        // Add your code here
    }
}
