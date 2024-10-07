import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "@app/shared/models/user.model"; // Zakładamy, że masz model User

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:4000"; // Zamień na rzeczywiste URL API

  constructor(private http: HttpClient) {}

  // Pobiera dane o użytkowniku z backendu
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`);
  }
}
