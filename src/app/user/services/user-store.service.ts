import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  public name$: Observable<string | null> = this.name$$.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): void {
    // Add your code here
    this.userService.getUser().subscribe((user) => {
      this.name$$.next(user.name);
      this.isAdmin$$.next(user.isAdmin);
    });
  }

  get isAdmin(): boolean {
    // Add your code here. Get isAdmin$$ value
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
    this.isAdmin$$.next(value);
  }
}
