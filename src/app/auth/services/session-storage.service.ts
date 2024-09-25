import { Injectable, Inject } from "@angular/core";
import { WINDOW } from "./window.token";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string): void {
    this.window.sessionStorage.setItem(TOKEN, token);
    // Add your code here
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN);
    // Add your code here
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(TOKEN);
    // Add your code here
  }
}
