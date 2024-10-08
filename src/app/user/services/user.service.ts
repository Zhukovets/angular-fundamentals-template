import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map, tap } from "rxjs";

interface UserResponse {
  successful: boolean;
  result?: string;
  user?: {
    name?: string;
    email: string;
  };
  errors?: string[];
}

interface RegisterResponse {
  successful: boolean;
  result?: string;
  errors?: string[];
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API_URL = "http://localhost:4000";
  authToken: any;

  constructor(private http: HttpClient) {}
  getUser(): Observable<any> {
    // Add your code here
    return this.http
      .get<UserResponse>(`${this.API_URL}/users/me`)
      .pipe(map((res) => res.result));
  }

  login(data: { name?: string; email: string; password: string }) {
    return this.http.post<UserResponse>(`${this.API_URL}/login`, data).pipe(
      map((res) => {
        console.log("Login response:", res);
        if (res && res.successful) {
          this.authToken = res.result as string;
          localStorage.setItem("authToken", this.authToken);
          console.log(
            "Token stored in local storage:",
            localStorage.getItem("authToken")
          );
          return res;
        } else {
          throw new Error("Login failed: " + (res.errors || "Unknown error"));
        }
      })
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http
      .post<RegisterResponse>(`${this.API_URL}/register`, data)
      .pipe(map((res) => res));
  }
}
