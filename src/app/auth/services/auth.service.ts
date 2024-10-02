import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service"; // assuming this service exists to handle session storage operations

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:4000"; // Replace with actual API URL

  // Private BehaviorSubject to track if the user is authorized
  private isAuthorized$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // Public Observable that can be subscribed to
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    // On service initialization, check if a token exists in storage and update the authorization state
    const token = this.sessionStorageService.getToken();
    this.isAuthorized$$.next(!!token);
  }

  // Login method - POST /login
  login(user: { email: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, user).pipe(
      tap((response) => {
        if (response && response.result) {
          this.sessionStorageService.setToken(response.result); // Save token in session storage
          this.isAuthorized$$.next(true); // Update authorization state
        }
      })
    );
  }

  // Logout method - DELETE /logout
  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    const token = this.sessionStorageService.getToken();
    const headers = new HttpHeaders().set("Authorization", `${token}`);

    return this.http.delete<any>(url, { headers }).pipe(
      tap(() => {
        this.sessionStorageService.deleteToken(); // Remove token from storage
        this.isAuthorized$$.next(false); // Update authorization state
      })
    );
  }

  // Register method - POST /register
  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, user).pipe(
      tap((response) => {
        if (response && response.token) {
          this.sessionStorageService.setToken(response.token); // Save token in session storage
          this.isAuthorized$$.next(true); // Update authorization state
        }
      })
    );
  }

  // Getter for isAuthorized$$ state
  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  // Setter for isAuthorized$$ state
  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  // Helper method to get login URL (can be customized as needed)
  getLoginUrl(): string {
    return `${this.apiUrl}/login`;
  }
}
