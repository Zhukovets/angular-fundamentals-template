import { Injectable, inject } from '@angular/core';
import { CanLoad, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad, CanActivate {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  canLoad(): boolean | UrlTree {
    return this.checkAuth();
  }

  canActivate(): boolean | UrlTree {
    return this.checkAuth();
  }

  private checkAuth(): boolean | UrlTree {
    return this.auth.isAuthorised ? true : this.router.createUrlTree(['/login']);
  }
}
