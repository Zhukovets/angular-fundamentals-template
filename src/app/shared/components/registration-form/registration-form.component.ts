import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  errorMessage: string = "";
  isSubmitting: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = "";

      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          if (response.successful) {
            this.router.navigate(["/login"]);
          } else {
            this.errorMessage = "Registration failed";
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          this.errorMessage = "Registration failed. Please try again.";
          this.isSubmitting = false;
        },
      });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(["/login"]);
  }
}
