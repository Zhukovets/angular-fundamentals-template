import { Inject, Injectable, InjectionToken } from "@angular/core";

const TOKEN = "SESSION_TOKEN";
const USER = "SESSION_USER";

const WINDOW = new InjectionToken<Window>("Window", {
  providedIn: "root",
  factory: () => window,
});
@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string) {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken() {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    this.window.sessionStorage.removeItem(TOKEN);
  }

  setUser(user: { email: string; name: string | null }) {
    this.window.sessionStorage.setItem(USER, JSON.stringify(user));
  }

  getUser(): { email: string; name: string | null } | null {
    const userStr = this.window.sessionStorage.getItem(USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  deleteUser() {
    this.window.sessionStorage.removeItem(USER);
  }
}
