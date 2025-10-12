import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  name: string | null = null;
  isAuthorized = false;

  private destroy$ = new Subject<void>();

  constructor(
    private userStore: UserStoreService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userStore.name$.pipe(takeUntil(this.destroy$)).subscribe(n => this.name = n);
    this.userStore.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe(isAdmin => {
      this.isAuthorized = !!isAdmin || this.auth.isAuthorised;
    });
    this.userStore.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe(() => {});
    this.userStore.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe();
    this.auth.isAuthorized$.pipe(takeUntil(this.destroy$)).subscribe(a => {
      if (a) this.isAuthorized = true;
      else this.isAuthorized = !!this.userStore.isAdmin;
    });
  }

  onLogout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']).then(() => {
          try { location.reload(); } catch (e) {}
        });
      },
      error: () => {
        this.router.navigate(['/login']).then(() => {
          try { location.reload(); } catch (e) {}
        });
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
