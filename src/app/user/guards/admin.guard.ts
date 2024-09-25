import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserStoreService } from "../services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  // Add your code here
  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | boolean | UrlTree {
    if (this.userStoreService.isAdmin) {
      return true;
    } else {
      return this.router.createUrlTree(["/courses"]);
    }
  }
}
