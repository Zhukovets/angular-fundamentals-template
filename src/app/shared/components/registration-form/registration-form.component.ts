import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private router: Router) {
    this.buildForm();
  }

  buildForm(): void{
    this.registrationForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(6)]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    });
  }

  onSubmit(): void {
    console.log(this.registrationForm.valid);
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      //Database operation here
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  triggerSubmit() {
    const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (submitButton) {
      submitButton.click();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
