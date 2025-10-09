import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  public email: string = "";
  public password: string = "";
  public errorMessage: string = "";
  public isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = "";

      this.authService
        .login({ email: this.email, password: this.password })
        .subscribe({
          next: (response) => {
            if (response.successful) {
              this.userStoreService.getUser();
              this.router.navigate(["/courses"]);
            } else {
              this.errorMessage = "Login failed";
            }
            this.isSubmitting = false;
          },
          error: (error) => {
            this.errorMessage = "Login failed. Please check your credentials.";
            this.isSubmitting = false;
          },
        });
    }
  }

  navigateToRegister(): void {
    this.router.navigate(["/registration"]);
  }
}
