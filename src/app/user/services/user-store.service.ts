import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { UserService } from "./user.service";
import { User } from "@app/shared/models/user.model"; // Adjust import based on your project structure
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  public name$: Observable<string | null> = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false); // Track admin status
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  // Fetch user data
  getUser(): void {
    this.userService
      .getUser()
      .pipe(
        tap((user: User) => {
          this.name$$.next(user.name);
          this.isAdmin$$.next(this.checkIfAdmin(user.email)); // Check if the user is an admin
        }),
        catchError((error) => {
          console.error("Failed to load user", error);
          return of(null);
        })
      )
      .subscribe();
  }

  // Check if the user is an admin based on email
  private checkIfAdmin(email: string | null): boolean {
    return email === "admin@email.com";
  }

  get name(): string | null {
    return this.name$$.getValue();
  }

  set name(value: string | null) {
    this.name$$.next(value);
  }
}
