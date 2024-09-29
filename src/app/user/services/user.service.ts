import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

interface UserResponse {
  successful: boolean;
  result?: string;
  user?: {
    name?: string;
    email: string;
  };
  errors?: string[];
}
@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API_URL = "http://localhost:4000";

  constructor(private http: HttpClient) {}
  getUser(): Observable<any> {
    // Add your code here
    return this.http
      .get<UserResponse>(`${this.API_URL}/users/me`)
      .pipe(map((res) => res.result));
  }

  login(data: { name?: string; email: string; password: string }) {
    return this.http
      .post<UserResponse>(`${this.API_URL}/login`, data)
      .pipe(map((res) => res));
  }
}
