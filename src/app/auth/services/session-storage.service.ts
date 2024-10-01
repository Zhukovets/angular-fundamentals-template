import { Inject, Injectable } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  
  private get window(): Window {
    return window;
  }

  setToken(token: string){
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    return this.window.sessionStorage.getItem(TOKEN)
  }

  deleteToken(){
    this.window.sessionStorage.removeItem(TOKEN)
  }
}
