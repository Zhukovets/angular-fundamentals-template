import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { EmailValidatorDirective } from "@app/shared/directives/email.directive";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted: boolean = false;
  isVisible: boolean = false;

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submitRegistration() {
    console.log(this.registrationForm);
    this.submitted = true;
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }

  goToLogin() {
    console.log("go to login");
    // this.router.navigate([''])
  }
  // Use the names `name`, `email`, `password` for the form controls.
}
