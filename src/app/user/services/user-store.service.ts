import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { SessionStorageService } from 'src/app/auth/services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  public name$ = this.name$$.asObservable();

  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(
    private userService: UserService,
    private session: SessionStorageService
  ) {}

  getUser(): Observable<any> {
    const token = this.session.getToken();
    if (!token) {
      this.clearUser();
      return of(null);
    }

    return this.userService.getUser().pipe(
      tap(response => {
        const user = response?.result;
        if (user) {
          this.name$$.next(user.name || user.email || 'User');
          this.isAdmin$$.next(user.role === 'admin');
        } else {
          this.clearUser();
        }
      }),
      catchError(() => {
        this.clearUser();
        return of(null);
      })
    );
  }

  setUserFromPayload(payload: any) {
    const user = payload?.user;
    if (!user) return;
    this.name$$.next(user.name || user.email || 'User');
    this.isAdmin$$.next(user.role === 'admin');
  }

  private clearUser() {
    this.name$$.next(null);
    this.isAdmin$$.next(false);
  }

  get isAdmin(): boolean {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
