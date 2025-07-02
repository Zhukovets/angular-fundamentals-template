import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  submitted = false;
  // Use the names `name`, `email`, `password` for the form controls.

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.registrationForm.valid){
      console.log('Submit registration form', this.registrationForm.value)
    }  else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
