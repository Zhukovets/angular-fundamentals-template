import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  // Add your code here
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.authService.isAuthorised) {
      return true;
    }
    return this.router.createUrlTree(["/login"]);
  }
}
