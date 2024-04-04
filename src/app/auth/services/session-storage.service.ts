import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private window: Window;

  constructor(@Inject(DOCUMENT) document: Document) {
    this.window = document.defaultView as Window;
  }

  setToken(token: string) {
    // Add your code here
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string {
    // Add your code here
    const token = this.window.sessionStorage.getItem(TOKEN);
    return token ? token : '';
  }

  deleteToken() {
    // Add your code here
    this.window.sessionStorage.removeItem(TOKEN);
  }
}