import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  submitted = false;
  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      console.log("Form values:", form.value);
    } else {
      console.log("Form is invalid");
    }
  }

  submitForm(form: NgForm) {
    form.ngSubmit.emit();
  }
  //Use the names `email` and `password` for form controls.
}
