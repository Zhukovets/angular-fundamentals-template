import { Component, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnDestroy {
  @ViewChild("registrationForm") public registrationForm!: NgForm;
  registrationSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.registrationForm.valid) {
      const { name, email, password } = this.registrationForm.value;
      const user = { name, email, password };

      this.registrationSubscription = this.authService
        .register(user)
        .subscribe({
          next: (res) => {
            window.location.href = "/courses";
          },
          error: (err) => console.log(err),
        });
    }
  }

  ngOnDestroy() {
    this.registrationSubscription?.unsubscribe();
  }
}
