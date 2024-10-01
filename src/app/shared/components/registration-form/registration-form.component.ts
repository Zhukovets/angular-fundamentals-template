import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { UserService } from "@app/user/services/user.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;
      this.userService.register(registrationData).subscribe((res) => {
        if (res.successful) {
          console.log("Registration was successful", res.result);
        } else if (!res.successful) {
          console.log("Registration failed: ", res.errors);
        }
        (error: string) => console.log(error);
      });
    } else {
      console.log("Form is invalid");
      this.registrationForm.markAllAsTouched();
    }
  }

  get f() {
    return this.registrationForm.controls;
  }
}
