import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  constructor ( private authService: AuthService, private router: Router ) {}
  //Use the names `email` and `password` for form controls.
  email: string = "";
  password: string = "";

  onSubmit(form: any) {
    if (form.valid) {
      const user = { email: this.email, password: this.password };
      this.authService.login(user).subscribe(
        response => {
          console.log('Form submitted', response);
          this.router.navigate(['/courses']);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.log('Invalid form');
      form.form.markAllAsTouched();
    }
  }
}
