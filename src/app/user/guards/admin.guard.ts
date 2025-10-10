import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.userStore.isAdmin) {
      return true; 
    } else {
      return this.router.createUrlTree(['/courses']); 
    }
  }
}
