import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { ApiResponse } from '@app/models/course.model';
import { User } from '@app/models/user.model';

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

  constructor(private authService: AuthService){}

  onSubmit(): void {
    Object.keys(this.loginForm.controls).forEach(controlName => {
      const control = this.loginForm.controls[controlName];
      control.markAsTouched();
    });

    if (this.loginForm.valid) {
      const loggingInUser: User = {
        email: this.emailControl,
        password: this.passwordControl
      }
      this.login(loggingInUser);
      this.authService.login(loggingInUser);
    } else {
      console.log('Form is invalid');
    }
  }

  login(loggingInUser: User): void{
    this.authService.login(loggingInUser).subscribe(
      (response: ApiResponse<string>) => {
        if(response.successful) {
          console.log(response.result);
          //this works, but i couldnt @Inject Window in session-storage service
        } else {
          console.error('failed to log in', response);
        }
      },
      (error) => {
        console.error('Error logging in', error);
      }
    );
  }
}
