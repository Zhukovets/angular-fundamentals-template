import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface UserResponse {
  successful: boolean;
  result: {
    name: string;
    role: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserResponse> {
    console.log("UserService.getUser called");
    return this.http.get<UserResponse>(`${this.apiUrl}/users/me`);
  }
}
