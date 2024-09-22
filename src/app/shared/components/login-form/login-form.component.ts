import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;


  public email: string = '';
  public password: string = '';


  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Form Submitted", {
        email: this.email,
        password: this.password
      });

    } else {
      console.log("Form is invalid");
    }
  }
}
