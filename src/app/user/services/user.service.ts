import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly apiUrl = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }
}
