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

  canLoad(): boolean | UrlTree {
    if (this.authService.isAuthorised) {
      console.log("user is authorized");
      return true;
    }
    console.log("user is not authorized");
    return this.router.createUrlTree(["/login"]);
  }
}
