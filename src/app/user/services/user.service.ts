import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

export interface User {
  email: string;
  name: string | null;
  isAdmin: boolean;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:4000/api";

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }
}
