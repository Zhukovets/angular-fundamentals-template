import { Injectable, Inject } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setToken(token: string): void {
    sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    sessionStorage.removeItem(TOKEN);
  }
}
