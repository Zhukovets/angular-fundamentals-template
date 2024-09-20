import { Component } from "@angular/core";
import { Post, posts } from "@app/shared/mocks";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  public posts: Post[] = posts;

  logSomething(value: string) {
    console.log(value);
  }
}
