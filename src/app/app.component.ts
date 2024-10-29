import { Component } from "@angular/core";
import { Post, posts } from "./shared/mocks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";

  public loginStatus: boolean = false;
  public posts: Post[] = posts;

  changeLoginStatus() {
    this.loginStatus = !this.loginStatus;
  }
}
