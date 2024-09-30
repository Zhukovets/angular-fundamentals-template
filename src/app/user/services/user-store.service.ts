import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$: Observable<string> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor( private userService: UserService) {}

    getUser(): void {
        this.userService.getUser().pipe(
            tap(user => {
                this.name$$.next(user.result.name)
                this.isAdmin$$.next(user.result.role === 'admin')
            })
        ).subscribe();
        // Add your code here
    }

    get isAdmin(): boolean {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.value
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value)
        // Add your code here. Change isAdmin$$ value
    }
}
