import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '../../directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  isSubmitted = false;
  isRegistered = false;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registrationForm.get('email')?.setValidators([Validators.required, (control) => new EmailValidatorDirective().validate(control)]);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.registrationForm.valid) {
      console.log('Form Submitted!', this.registrationForm.value);
      this.isRegistered = true;
    } else {
      console.log('Form is invalid', this.registrationForm);
      this.registrationForm.markAllAsTouched();
    }
  }

  scrollToSection(): void {
    const element = document.getElementById('loginForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
