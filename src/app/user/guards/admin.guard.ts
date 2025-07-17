import { Injectable } from "@angular/core";
import { UserStoreService } from "../services/user-store.service";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  // Add your code here

  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userStoreService.isAdmin$.pipe(
      take(1),
      map((isAdmin) => {
        return isAdmin ? true : this.router.createUrlTree(["/courses"]);
      })
    );
  }
}
