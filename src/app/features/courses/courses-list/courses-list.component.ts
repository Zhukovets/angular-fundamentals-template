import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "@app/types/types";

@Component({
  selector: "app-courses-list[editable]",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable!: boolean;

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();
}
