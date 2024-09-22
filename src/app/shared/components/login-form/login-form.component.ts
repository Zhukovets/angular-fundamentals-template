import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  isSubmitted = false;
  isLoggedIn = false;
  
  onSubmit() {
    this.isSubmitted = true;
    
    if (this.loginForm.valid) {
      console.log('Form submitted successfully', this.loginForm.value);
      this.isLoggedIn = true;
    } else {
      console.log("From couldn't be submitted",this.loginForm);
    }
  }

  scrollToSection(): void {
    const element = document.getElementById('registrationForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
