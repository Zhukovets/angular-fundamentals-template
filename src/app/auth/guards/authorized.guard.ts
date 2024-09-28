import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the user is authorized
    const isAuthorized = this.authService.isAuthorised;

    if (isAuthorized) {
      // If authorized, allow loading the route
      return true;
    } else {
      // If not authorized, redirect to the login page
      return this.router.createUrlTree(["/login"]);
    }
  }
}
