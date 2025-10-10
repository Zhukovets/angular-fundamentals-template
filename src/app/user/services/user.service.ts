import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface UserInfo {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:4000/api";

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/users/me`); 
  }
}
