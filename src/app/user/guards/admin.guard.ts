import { Injectable } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    
    constructor(private userStore: UserStoreService,private router: Router){}

    canActivate(): Observable<boolean | UrlTree> {
        return this.userStore.isAdmin$.pipe(
            map(isAdmin => isAdmin ? true : this.router.createUrlTree(['/courses']))
        );
    }
}
