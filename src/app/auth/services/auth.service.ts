import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service";

const API_URL = "http://localhost:4000/api";
const TOKEN = "SESSION_TOKEN";

export interface UserCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(
    !!this.sessionStorage.getToken()
  );
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  public getToken(): string | null {
    return this.sessionStorage.getToken();
  }

  login(user: UserCredentials): Observable<{ token: string }> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<{ token: string }>(`${API_URL}/login`, user).pipe(
      tap((response) => {
        if (response.token) {
          this.sessionStorage.setToken(response.token);
          this.isAuthorised = true;
        }
      })
    );
  }

  logout(): void {
    // Add your code here
    this.sessionStorage.deleteToken();
    this.isAuthorised = false;
  }

  register(user: UserCredentials): Observable<{ token: string }> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<{ token: string }>(`${API_URL}/register`, user).pipe(
      tap((response) => {
        if (response.token) {
          this.sessionStorage.setToken(response.token);
          this.isAuthorised = true;
        }
      })
    );
  }

  get isAuthorised(): boolean {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    // Add your code here
    return `${API_URL}/login`;
  }
}
