import { Injectable, Inject, Optional } from '@angular/core';

const TOKEN = 'SESSION_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private win: Window;

  constructor(@Optional() @Inject('Window') private windowRef?: Window) {
    this.win = this.windowRef ?? window;
  }

  setToken(token: string) {
    this.win.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return this.win.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    this.win.sessionStorage.removeItem(TOKEN);
  }
}
