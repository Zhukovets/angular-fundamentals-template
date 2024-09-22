import { Component } from "@angular/core";
import { mockedCoursesList } from "./shared/mocks/mock";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  course = mockedCoursesList[0];
  title: string = "courses-app";
  isLoggedIn: boolean = false;
  loginButtonText: string = this.getLoginButtonText();

  handleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
    this.loginButtonText = this.getLoginButtonText();
  }
  getLoginButtonText(): string {
    return this.isLoggedIn ? "Logout" : "Login";
  }

  isEditable: boolean = true;

  handleShowCourse(): void {}

  searchValue: string = "";

  onSearch(searchQuery: string): void {
    console.log("Search query:", searchQuery);
    // Add logic to handle the search input
  }
}
