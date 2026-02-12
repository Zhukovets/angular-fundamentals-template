import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { EmailValidatorDirective } from '@shared/directives/email.directive';

export function emailValidatorFn(control: AbstractControl): ValidationErrors | null {
  return new EmailValidatorDirective().validate(control);
}

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  showPassword = false;
  errorMsg: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, emailValidatorFn]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.auth.register(this.registrationForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMsg = err?.error?.errors?.[0] ?? 'Registration failed';
        },
      });
    }
  }

  get f() {
    return this.registrationForm.controls;
  }
}
