import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    private apiUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient, private sessionStorage: SessionStorageService) {
        
        const token = this.sessionStorage.getToken();
        if (token) {
            this.isAuthorized$$.next(true); 
        }
    }

    login(user: { email: string; password: string }): Observable<any> { 
        return this.http.post(`${this.apiUrl}/auth/login`, user).pipe(
            map((response: any) => {
                if (response && response.token) {
                    this.sessionStorage.setToken(response.token); 
                    this.isAuthorized$$.next(true); 
                }
                return response;
            })
        );
    }

    logout(): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/logout`, {}).pipe(
            map(() => {
                this.sessionStorage.deleteToken(); 
                this.isAuthorized$$.next(false); 
            })
        );
    }

    register(user: { email: string; password: string }): Observable<any> { 
        return this.http.post(`${this.apiUrl}/auth/register`, user);
    }

    get isAuthorised(): boolean {
        
        return this.isAuthorized$$.getValue();
    }

    isAuthorized(): boolean {
        
        const token = this.sessionStorage.getToken();
        return !!token; 
    }

    getLoginUrl(): string {
        return `${this.apiUrl}/auth/login`;
    }
}