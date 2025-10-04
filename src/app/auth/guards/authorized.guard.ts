import { CanLoad, Route, UrlSegment, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  // Add your code here
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.authService.isAuthorised
      ? true
      : this.router.createUrlTree(["/login"]);
  }
}
