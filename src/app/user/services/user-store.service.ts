import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "@app/user/services/user.service";

@Injectable()
export class UserStoreService {

    private name$$ = new BehaviorSubject<string | null>(null);
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$: Observable<string | null> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) {
            this.getUser();
    }

    getUser() {
        this.userService.getUser()
            .subscribe({
                next: (user) => {
                    this.name$$.next(user.result.name || null);
                    this.isAdmin$$.next(user.result.role === 'admin');
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
