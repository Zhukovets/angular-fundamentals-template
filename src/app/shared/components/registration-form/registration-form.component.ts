import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "@app/auth/services/auth.service";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  errorMessage: string = ""; // To display error messages if registration fails
  // Use the names `name`, `email`, `password` for the form controls.
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private authService: AuthService
  ) {
    library.addIconPacks(fas);
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
    });
  }

  authors: string[] = [];
  durationTime: number = 0;

  get name() {
    return this.registrationForm.get("name");
  }

  get email() {
    return this.registrationForm.get("email");
  }

  get password() {
    return this.registrationForm.get("password");
  }

  submit() {
    console.log("submitting");

    if (this.registrationForm.valid) {
      const user = {
        name: this.name?.value,
        email: this.email?.value,
        password: this.password?.value,
      };

      // Call the register method from AuthService
      this.authService.register(user).subscribe({
        next: (response) => {
          this.registrationForm.reset();
          console.log("Registration successful", response);
          // Here you can redirect to another page, show a success message, etc.
        },
        error: (error) => {
          console.error("Registration failed", error);
          this.errorMessage = "Registration failed. Please try again."; // Display a friendly error message
        },
      });
    } else {
      this.errorMessage = "Please fill out the form correctly.";
    }
  }
}
