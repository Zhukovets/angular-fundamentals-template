import { Inject, Injectable } from "@angular/core";
import {
  ICustomWindow,
  WindowRefService,
} from "@app/shared/provides/window.provider";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  private window: ICustomWindow;
  constructor(windowRef: WindowRefService) {
    this.window = windowRef.nativeWindow;
  } // Inject Window

  setToken(token: string): void {
    this.window.sessionStorage.setItem(TOKEN, token); // Use session storage to set token
    console.log("token i set to " + this.window.sessionStorage.getItem(TOKEN));
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN); // Retrieve token from session storage
  }

  deleteToken(): void {
    this.window.sessionStorage.removeItem(TOKEN); // Remove token from session storage
  }
}
