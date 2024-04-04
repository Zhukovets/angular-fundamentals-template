import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { User } from '@app/shared/models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  user: User = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.

  onSubmit() {
    this.loginForm.form.get('email')?.markAsTouched({ onlySelf: true });
    this.loginForm.form.get('password')?.markAsTouched({ onlySelf: true });

    if (this.loginForm.valid) {
      this.authService.login(this.user).subscribe(() => this.router.navigate(['']));
    }
  }
}