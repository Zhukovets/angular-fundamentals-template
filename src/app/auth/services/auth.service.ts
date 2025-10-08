import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean>;
  public isAuthorized$: Observable<boolean>;
  private readonly baseUrl = 'http://localhost:4000';

  constructor(
    private http: HttpClient,
    private session: SessionStorageService,
    private router: Router
  ) {
    this.isAuthorized$$ = new BehaviorSubject<boolean>(!!this.session.getToken());
    this.isAuthorized$ = this.isAuthorized$$.asObservable();
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      tap(res => {
        const raw = res?.result ?? res?.token ?? null;
        const token = raw ? String(raw).replace(/^Bearer\s+/i, '') : null;
        if (token) {
          this.session.setToken(token);
          this.isAuthorized$$.next(true);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/logout`, {}).pipe(
      catchError(() => of(null)),
      finalize(() => {
        this.session.deleteToken();
        this.isAuthorized$$.next(false);
        this.router.navigate(['/login']);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return '/login';
  }
}
