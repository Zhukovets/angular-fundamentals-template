import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UserService, User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public name$ = this.name$$.asObservable();
  public isAdmin$ = this.isAdmin$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): void {
    this.isLoading$$.next(true);
    this.userService.getUser()
      .pipe(
        tap((user: User) => {
          this.name$$.next(user?.name || user?.email || null);
          const isAdmin = user?.role === 'admin' || user?.email === 'admin@email.com';
          this.isAdmin$$.next(isAdmin);
        }),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  get isAdmin(): boolean {
    return this.isAdmin$$.value;
  }

  //set isAdmin(value: boolean) {
  //  this.isAdmin$$.next(value);
  //}
}
