import { Component, Input } from "@angular/core";
import { Post } from "@app/shared/mocks";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  math = Math;
  @Input() course: Post | null = null;

  public goBack() {
    console.log("goes back");
    // this.location.back()
  }
}
