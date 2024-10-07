import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UserStoreService } from "../services/user-store.service"; // Adjust the path as necessary
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userStoreService.isAdmin$.pipe(
      map((isAdmin) => {
        if (isAdmin) {
          return true; // Allow access
        } else {
          return this.router.createUrlTree(["/courses"]); // Redirect to /courses if not an admin
        }
      })
    );
  }
}
