import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidatorFn } from '../../directives/email.directive'; 

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, emailValidatorFn()]],
    password: ['', [Validators.required]]
  });
  // Use the names `name`, `email`, `password` for the form controls.
  submitted = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      console.log('Form values:', this.registrationForm.value);
    }
  }
}
