import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(){}

  ngOnInit(): void {
      this.registrationForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(6)]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Registration Form Submitted!', this.registrationForm.value);
    }
  }
}
