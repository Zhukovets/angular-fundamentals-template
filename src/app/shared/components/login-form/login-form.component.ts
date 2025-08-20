import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  @ViewChild('formEl') formElement!: ElementRef<HTMLFormElement>;
  //Use the names `email` and `password` for form controls.

  @Output() userCred = new EventEmitter();

  submitted = false;

  user = {
    email: "",
    password: "",
  }

  submitForm() {
    this.formElement.nativeElement.requestSubmit();
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.userCred.emit(this.user);
    }
  }
}
