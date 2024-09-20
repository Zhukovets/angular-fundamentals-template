import { Component } from "@angular/core";
import { posts } from "./shared/mocks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  posts = posts;

  public loginStatus: boolean = false;

  changeLoginStatus() {
    this.loginStatus = !this.loginStatus;
  }
}
