import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  formFields= {
    name: 'name',
    email: 'email',
    password: 'password'
  }

  constructor(private router: Router) {
    this.buildForm();
  }

  buildForm(): void{
    this.registrationForm = new FormGroup({
      [this.formFields.name]: new FormControl('',[Validators.required,Validators.minLength(6)]),
      [this.formFields.email]: new FormControl('',[Validators.required]),
      [this.formFields.password]: new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    console.log(this.registrationForm.valid);
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // Handle form submission logic
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
