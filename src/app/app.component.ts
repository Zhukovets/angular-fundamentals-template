import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "courses-app";
  username = "";
  buttonText = "LOGOUT";
  titleInfo = "Your List is Empty";
  textInfo = `'Add New Course' to add your first course`;
  buttonInfo = "ADD NEW COURSE";

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateUsername();
  }

  updateUsername() {
    const user = this.auth.getUser();
    this.username = user?.name || user?.email || "";
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.updateUsername();
        this.router.navigate(["/login"]);
      },
      error: () => {
        this.updateUsername();
        this.router.navigate(["/login"]);
      },
    });
  }
}
