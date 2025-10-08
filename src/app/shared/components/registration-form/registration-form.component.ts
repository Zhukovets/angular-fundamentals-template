import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  submitted = false;
  passwordVisible = false;

  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private renderer: Renderer2) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get nameControl(): AbstractControl {
    return this.registrationForm.get('name') as AbstractControl;
  }

  get emailControl(): AbstractControl {
    return this.registrationForm.get('email') as AbstractControl;
  }

  get passwordControl(): AbstractControl {
    return this.registrationForm.get('password') as AbstractControl;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) return;
    console.log('register', this.registrationForm.value);
    this.registrationForm.reset();
    this.submitted = false;
    this.passwordVisible = false;
    this.setPasswordInputType('password');
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
    this.setPasswordInputType(this.passwordVisible ? 'text' : 'password');
  }

  private setPasswordInputType(type: 'text' | 'password'): void {
    const el = this.passwordInput?.nativeElement;
    if (el) {
      this.renderer.setAttribute(el, 'type', type);
    }
  }
}
