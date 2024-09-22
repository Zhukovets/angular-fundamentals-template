import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log("Form Submitted", this.registrationForm.value);
      // Handle login logic here
    } else {
      console.log("Form is invalid");
      this.registrationForm.markAllAsTouched();
    }
  }

  get f() {
    return this.registrationForm.controls;
  }
}
