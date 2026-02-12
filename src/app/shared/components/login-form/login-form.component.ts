import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service'; 

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  showPassword = false;
  errorMsg: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService 
  ) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const {  email, password } = form.value;

      this.auth.login({  email, password }).subscribe({
        next: () => {
          this.userStore.getUser();
          this.router.navigateByUrl('/courses');
        },
        error: (err: any) => {
          this.errorMsg = err?.error?.errors?.[0] ?? 'Login failed';
        }
      });
    }
  }
}
