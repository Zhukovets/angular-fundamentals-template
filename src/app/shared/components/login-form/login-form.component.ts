import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;
  formFields = {
    email: 'email',
    password: 'password'
  }

  emailControl: string = "";
  passwordControl: string = "";

  onSubmit(): void {
    Object.keys(this.loginForm.controls).forEach(controlName => {
      const control = this.loginForm.controls[controlName];
      control.markAsTouched();
    });

    if (this.loginForm.valid) {
      console.log('Email:', this.emailControl, 'Password:', this.passwordControl);
    } else {
      console.log('Form is invalid');
    }
  }

}
