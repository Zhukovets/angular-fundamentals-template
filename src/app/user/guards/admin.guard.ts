import { Injectable } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router, UrlTree } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    
    constructor(private userStore: UserStoreService,private router: Router){}

    canActivate(): boolean | UrlTree {
        return this.userStore.isAdmin ? true : this.router.createUrlTree(['/courses']);
    }
}
