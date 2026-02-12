import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:4000';

export interface User {
  id?: string;
  name?: string;
  email: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<{ successful: boolean; result: User }>(
      `${API_URL}/users/me`,
      { headers: { 'Cache-Control': 'no-cache' } }
    ).pipe(map(res => res.result));
  }
}
