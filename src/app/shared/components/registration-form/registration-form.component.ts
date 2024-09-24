import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { EmailValidatorDirective } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  // Use the names `name`, `email`, `password` for the form controls.

  // customEmailValidator = new EmailValidatorDirective();

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get nameIsInvalid() {
    return this.form.controls.name.touched && this.form.controls.name.invalid;
  }
  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.invalid;
  }
  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched && this.form.controls.password.invalid
    );
  }
  onSubmit() {
    if (this.form.valid) {
      console.log('form submitted');
      this.form.reset();
    } else {
      // Object.keys(this.form.controls).forEach((field) => {
      //   const control = this.form.get(field);
      //   control?.markAsTouched({ onlySelf: true });
      // });
      this.form.markAllAsTouched();
    }
  }
}
