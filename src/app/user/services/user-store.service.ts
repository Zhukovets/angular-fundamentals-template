import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

interface UserInfo {
    name: string;
    email: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string | null>(null);
    private isAdmin$$ = new BehaviorSubject<boolean>(false); 

    public name$: Observable<string | null> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) { }

    getUser(): void {
        this.userService.getUserInfo().subscribe({
            next: (user: UserInfo) => {
                this.name$$.next(user.name);
                this.isAdmin$$.next(user.role === 'admin'); 
            },
            error: (err: any) => {
                console.error("Error loading user info:", err);
                this.name$$.next(null);
                this.isAdmin$$.next(false);
            }
        });
    }

    get isAdmin(): boolean {
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
