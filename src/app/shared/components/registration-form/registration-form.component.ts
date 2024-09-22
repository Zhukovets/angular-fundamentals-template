import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidatorDirective } from '@app/shared/directives/email.directive';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: [[Validators.required, Validators.minLength(6)]],
      email: [[Validators.required, EmailValidatorDirective]],
      password: [[Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      console.log('Form Data', this.registrationForm.value);
      // Handle logic
    }
  }

  get f() {
    return this.registrationForm.controls;
  }
}
