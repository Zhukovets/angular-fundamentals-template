import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {} // Inject AuthService

  @ViewChild("loginForm") public loginForm!: NgForm;

  onSubmit() {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService.login(user).subscribe({
        next: (response) => {
          console.log("Login successful!", response);
          this.router.navigate(["/courses"]);
        },
        error: (error) => {
          console.error("Login failed", error);
        },
      });
    } else {
      console.log("Form is invalid");
    }
  }

  navigateToRegistration() {
    this.router.navigate(["/registration"]);
  }
}
