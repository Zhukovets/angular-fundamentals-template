import {Inject, Injectable} from '@angular/core';
import { InjectionToken } from '@angular/core';

const windowInjectionTokenName = 'Global window object';

const WINDOW = new InjectionToken<Window>(windowInjectionTokenName, {
  factory: () => window
});

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(WINDOW) private window: Window) {
  }

  setToken(token: string){
    // Add your code here
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    // Add your code here
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    // Add your code here
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
