import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/auth/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4000';

  constructor(
    private http: HttpClient,
    private session: SessionStorageService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  getUser(): Observable<any> {
    const token = this.session.getToken();
    const headers = new HttpHeaders().set('Authorization', token || '');
    return this.http.get<any>(`${this.apiUrl}/users/me`, { headers });
  }
}
