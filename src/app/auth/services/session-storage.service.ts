import { Inject, Injectable } from "@angular/core";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject("window") private window: Window) {} // Inject Window

  setToken(token: string): void {
    this.window.sessionStorage.setItem(TOKEN, token); // Use session storage to set token
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN); // Retrieve token from session storage
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(TOKEN); // Remove token from session storage
  }
}
