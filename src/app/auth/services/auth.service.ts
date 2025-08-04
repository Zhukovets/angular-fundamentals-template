import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of, tap, map, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { SessionStorageService } from "./session-storage.service";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  successful: boolean;
  result: string; // token
  user: {
    email: string;
    name: string | null;
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly baseUrl = "http://localhost:4000";
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    const token = this.sessionStorage.getToken();
    if (token) {
      this.isAuthorized$$.next(true);
    }
  }

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, user).pipe(
      tap((response) => {
        console.log("LOGIN API RESPONSE:", response);
        if (response.successful) {
          const token = response.result.startsWith("Bearer ")
            ? response.result.slice(7)
            : response.result;
          this.setToken(token);
          this.setUser(response.user);
        }
      })
    );
  }

  logout(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/logout`).pipe(
      tap(() => {
        this.sessionStorage.deleteToken();
        this.sessionStorage.deleteUser();
        this.isAuthorized$$.next(false);
      }),
      catchError((error) => {
        this.sessionStorage.deleteToken();
        this.sessionStorage.deleteUser();
        this.isAuthorized$$.next(false);
        return throwError(() => error);
      })
    );
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user);
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return "/login";
  }

  setToken(token: string) {
    this.sessionStorage.setToken(token);
    this.isAuthorized$$.next(true);
  }

  getToken(): string | null {
    return this.sessionStorage.getToken();
  }

  setUser(user: { email: string; name: string | null }) {
    this.sessionStorage.setUser(user);
  }

  getUser(): { email: string; name: string | null } | null {
    return this.sessionStorage.getUser();
  }
}
