import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean>;
  public isAuthorized$: Observable<boolean>;

  private apiUrl = "http://localhost:4000";

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    const token = this.sessionStorage.getToken();
    this.isAuthorized$$ = new BehaviorSubject<boolean>(!!token);
    this.isAuthorized$ = this.isAuthorized$$.asObservable();
  }

  login(user: { email: string; password: string }) {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<any>(`${this.apiUrl}/login`, user).pipe(
      tap((response) => {
        if (response && response.token) {
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

  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      tap((response) => {
        if (response && response.token) {
          this.sessionStorage.setToken(response.token);
          this.isAuthorised = true;
        }
      })
    );
  }

  getToken(): string | null {
    return this.sessionStorage.getToken();
  }

  get isAuthorised(): boolean {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    // Add your code here
    return "/login";
  }
}
