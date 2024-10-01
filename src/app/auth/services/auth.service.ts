import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { User } from '@app/models/user.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '@app/models/course.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);

    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    constructor(private http: HttpClient, private sessionStorage: SessionStorageService){
        const token = this.sessionStorage.getToken();
        this.isAuthorized$$.next(!!token);
    }

    login(user: User): Observable<any> {
        console.log("loggining in...");
        return this.http.post<ApiResponse<string>>(`${environment.apiBaseUrl}/login`, user);
    }

    logout() {
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
    }

    register(user: {  name: string, email: string, password: string }): Observable<any> {
        return this.http.post<any>('/api/auth/register', user);
    }

    get isAuthorised(): boolean {
        return this.isAuthorized$$.getValue();
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return 'api.auth/login';
    }
}
