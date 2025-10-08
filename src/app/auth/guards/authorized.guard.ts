import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authorizedGuard implements CanMatch {
  constructor(private auth: AuthService, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.auth.isAuthorised ? true : this.router.parseUrl('/login');
  }
}
