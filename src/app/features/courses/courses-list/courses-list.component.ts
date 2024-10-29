import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Post } from "@app/shared/mocks";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses: Post[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter();
  @Output() editCourse = new EventEmitter();
  @Output() deleteCourse = new EventEmitter();
}
