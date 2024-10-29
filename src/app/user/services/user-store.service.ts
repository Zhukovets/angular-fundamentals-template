import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private name$$ = new BehaviorSubject<string>('');  
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    constructor(private userService: UserService) {
        
        this.loadUserData();
      }

      private loadUserData(): void {
        this.userService.getUser().subscribe(user => {
          this.name$$.next(user.name);  
          this.isAdmin$$.next(user.isAdmin);  
        });
      }

    getUser() {
        // Add your code here
        return {
            name: this.name$$.value,
            isAdmin: this.isAdmin$$.value
          };
    }

    get isAdmin() : boolean {
        // Add your code here. Get isAdmin$$ value
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }
}

