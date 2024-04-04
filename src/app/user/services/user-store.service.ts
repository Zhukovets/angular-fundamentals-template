import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '@app/shared/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Course } from '@app/shared/models/course';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private userService: UserService) { }

    getUser() {
        // Add your code here
        this.userService.getUser().subscribe((value: User) => {
            if (value) {
                this.isAdmin = value.role == 'admin' ? true : false;
            }
        });
    }

    get isAdmin$() {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }
}