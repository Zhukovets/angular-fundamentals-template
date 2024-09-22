import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  email: string = "";
  password: string = "";

  onSubmit(form: any){
    if(form.valid) {
      console.log('Form submitted', form.value)
    } else {
      console.log('Form is invalid')
      form.form.markAllAsTouched()
    }
  }
}
