import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "@app/user/services/user.service";

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private name$$ = new BehaviorSubject<string | null>(null);
    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    private role$$ = new BehaviorSubject<string>('');

    public name$: Observable<string | null> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();
    public role$:Observable<string | null> = this.role$$.asObservable(); //maybe will be better


    constructor(private userService: UserService) {
            this.getUser();
    }

    getUser() {
        this.userService.getUser()
            .subscribe({
                next: (user) => {
                    this.name$$.next(user.result.name || null);
                    this.isAdmin$$.next(user.result.role === 'admin');
                    this.role$$.next(user.result.role);
                },
                error: (err) => console.error('Error fetching user data:', err)
            });
    }

    get isAdmin(): boolean {
        return this.isAdmin$$.getValue();
    }

    get name(): string | null {
        return this.name$$.getValue();
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
