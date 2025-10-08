import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/services/user.service';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/auth/services/session-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  constructor(
    private userService: UserService,
    private userStore: UserStoreService,
    private session: SessionStorageService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.loginForm || !this.loginForm.valid) return;

    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe({
      next: res => {
        const resultStr = res?.result ?? res?.token ?? null;
        const token = resultStr ? resultStr.replace(/^Bearer\s+/i, '') : null;
        if (token) {
          this.session.setToken(token);
        }
        if (res?.user) {
          this.userStore.setUserFromPayload(res.user);
        } else {
          this.userStore.getUser().subscribe({ next: () => {}, error: () => {} });
        }

        this.router.navigate(['/courses']).then(() => {
          try { location.reload(); } catch (e) { /* fallback */ }
        });
      },
      error: err => {
        const msg = err?.error?.message || err?.error || err.statusText || 'Invalid email or password';
        alert('Login failed: ' + msg);
        console.error('Login error', err);
      }
    });
  }
}
