import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "@app/types/types";

@Component({
  selector: "app-course-info[course]",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course!: Course;
  @Output() backButton = new EventEmitter<void>();
}
