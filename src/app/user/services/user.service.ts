import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API_URL = "http://localhost:4000/api";

  constructor(private http: HttpClient) {}
  getUser(): Observable<any> {
    // Add your code here
    return this.http.get(`${this.API_URL}/user`);
  }
}
