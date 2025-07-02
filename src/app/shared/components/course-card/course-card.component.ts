import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "@app/types/types";

@Component({
  selector: "app-course-card[course]",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() editable: boolean = false;
  @Output() clickOnShow = new EventEmitter<void>();
}
