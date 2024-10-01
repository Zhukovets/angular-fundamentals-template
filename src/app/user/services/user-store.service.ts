import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    private name$$ = new BehaviorSubject<string>(''); 

    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();
    public name$: Observable<string> = this.name$$.asObservable();
    
    constructor(private userService: UserService) {}

    getUser():void {
        this.userService.getUser().pipe(
            tap(user => {
                this.isAdmin = user.isAdmin;
                this.name$$.next(user.name);
            })
        ).subscribe();
    }

    get isAdmin() {
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
