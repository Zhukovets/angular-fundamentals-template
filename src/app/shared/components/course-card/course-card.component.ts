import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Post } from "@app/shared/mocks";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  math = Math;
  @Input() course: Post | null = null;
  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter();
}
