import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  
  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.valid) {
      const user = {name: this.name?.value, email: this.email?.value, password: this.password?.value}
      this.authService.register(user).subscribe(
        response => {
          console.log('Reg form submitted', response)
          this.router.navigate(['/courses'])
        },
        error => {
          console.error('Login failed', error);
        }
      ); 
    } else {
      console.log('Invalid reg');
      this.registrationForm.markAllAsTouched();
    }
  }

  // Use the names `name`, `email`, `password` for the form controls.
}
