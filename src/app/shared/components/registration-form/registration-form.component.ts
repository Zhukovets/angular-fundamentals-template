import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '../../directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted: boolean = false;  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, EmailValidatorDirective]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  
  get name() { return this.registrationForm.get('name'); }
  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }

  
  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log('Registration successful:', this.registrationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}