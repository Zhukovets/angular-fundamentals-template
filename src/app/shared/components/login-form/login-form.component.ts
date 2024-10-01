import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { ApiResponse } from '@app/models/course.model';
import { User } from '@app/models/user.model';
import { UserStoreService } from '@app/user/services/user-store.service';

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
  errorLogInMessage: string = "";

  constructor(private authService: AuthService, private userStoreService: UserStoreService,private router: Router){}

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
    } else {
      console.log('Form is invalid');
    }
  }

  login(loggingInUser: User): void{
    this.authService.login(loggingInUser).subscribe({
      next: (response) => {
        if(response.successful){
          this.userStoreService.getUser();
          this.router.navigate(['/courses']);
        }
      },
      error: (error) => {
        this.errorLogInMessage = 'Login failed. Please check your credentials.';
      }
    })
  }
}
