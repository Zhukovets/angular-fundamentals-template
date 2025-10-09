import { Injectable } from "@angular/core";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor() {}

  setToken(token: string): void {
    window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(): void {
    window.sessionStorage.removeItem(TOKEN);
  }
}
