import { Component, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { Subscription } from "rxjs";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnDestroy {
  @ViewChild("loginForm") public loginForm!: NgForm;
  loginSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = { email, password };

      this.loginSubscription = this.authService.login(user).subscribe({
        next: (res) => {
          console.log("LOGIN RESPONSE:", res);
          if (res.successful) {
            this.router.navigate(["/courses"]).then(() => {
              this.userStore.getUser();
            });
          } else {
            console.error("LOGGIN ERROR", res);
          }
        },
        error: (err) => {
          console.error("Login error:", err);
          console.error("Error details:", err.error);
          if (err.error?.errors) {
            console.error("Validation errors:", err.error.errors);
          }
        },
      });
    }
  }

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }
}
