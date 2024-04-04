import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [EmailValidatorDirective]
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  isSubmittingForm: boolean = false;
  // Use the names `name`, `email`, `password` for the form controls.

  constructor(private emailValidator: EmailValidatorDirective) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, this.emailValidator.validate.bind(this.emailValidator)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.isSubmittingForm = true;
    Object.keys(this.registrationForm.controls).forEach(name => {
      const control = this.registrationForm.controls[name];
      control.markAsTouched({ onlySelf: true });
    });

    if (!this.registrationForm.valid) {
    }
    this.isSubmittingForm = false;
  }

  isFieldValid(name: string, property: string): boolean {
    const control = this.registrationForm.controls[name];
    return (this.isSubmittingForm || control.touched) && control.errors?.[property];
  }
}