import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "@app/user/services/user.service";

interface User {
  name?: string;
  email: string;
  password: string;
}
@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: User = this.loginForm.value;
      this.userService
        .login({
          email: loginData.email,
          password: loginData.password,
        })
        .subscribe(
          (res) => {
            if (res.successful && res.user) {
              console.log("Login successful");
              if (res.user.email === "admin@email.com") {
                this.router.navigate([""]);
              } else {
                this.router.navigate([""]);
              }
            } else {
              console.log("Login failed", res.errors);
            }
          },
          (error) => {
            console.log("Login failed: ", error);
          }
        );
    } else {
      console.log("Form is invalid");
    }
  }
  //Use the names `email` and `password` for form controls.
}
