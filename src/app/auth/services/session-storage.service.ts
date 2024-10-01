import { Inject, Injectable } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  // i wanted to use this but its not working
  //in constructor: @Inject(window) private window: Window
  constructor(/*@Inject(window) private window: Window*/){}

  setToken(token: string){
    //this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    return ""; //this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    //this.window.sessionStorage.removeItem(TOKEN);
  }
}
