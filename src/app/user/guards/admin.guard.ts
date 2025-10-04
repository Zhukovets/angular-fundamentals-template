import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserStoreService } from "../services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.userStore.isAdmin) {
      return true;
    } else {
      return this.router.createUrlTree(["/courses"]);
    }
  }
  // Add your code here
}
