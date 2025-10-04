import { Injectable, Inject, InjectionToken } from "@angular/core";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key
// Add your code here

export const WINDOW = new InjectionToken<Window>("WindowToken", {
  providedIn: "root",
  factory: () => window,
});

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private readonly win: Window) {}

  setToken(token: string) {
    // Add your code here
    this.win.sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    // Add your code here
    return this.win.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    // Add your code here
    this.win.sessionStorage.removeItem(TOKEN);
  }
}
