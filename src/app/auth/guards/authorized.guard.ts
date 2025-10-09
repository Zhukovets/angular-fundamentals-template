import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { SessionStorageService } from "../services/session-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check both the auth service state and the token existence
    const hasToken = !!this.sessionStorageService.getToken();
    const isAuthorized = this.authService.isAuthorised;

    if (hasToken && isAuthorized) {
      return true;
    } else {
      // Clear any invalid state
      if (!hasToken) {
        this.authService.logout();
      }
      return this.router.createUrlTree(["/login"]);
    }
  }
}
