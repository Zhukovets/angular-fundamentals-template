import {Inject, Injectable} from '@angular/core';
import {InjectionToken} from '@angular/core';

const TOKEN = 'SESSION_TOKEN';

const WINDOW = new InjectionToken<Window>('WindowToken', {
    providedIn: 'root',
    factory: () => window
});

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {
    constructor(@Inject(WINDOW) private window: Window) {
    }

    setToken(token: string):void {
        window.sessionStorage.setItem(TOKEN, token);
    }

    getToken(): string | null {
        return this.window.sessionStorage.getItem(TOKEN);
    }

    deleteToken() {
        this.window.sessionStorage.removeItem(TOKEN);
    }
}
