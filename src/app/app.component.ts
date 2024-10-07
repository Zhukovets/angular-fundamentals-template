import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  isAuthorized: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.isAuthorized$.subscribe((isAuthorized: boolean) => {
      this.isAuthorized = isAuthorized;
    });
  }
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }
}
