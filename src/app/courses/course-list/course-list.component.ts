import { Component, Input, Output } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mock";

@Component({
  selector: "app-course-list",
  templateUrl: "./course-list.component.html",
  styleUrls: ["./course-list.component.css"],
})
export class CourseListComponent {
  courses = mockedCoursesList;

  @Input() courseName: string = "";

  @Input() isEditable: boolean = false;

  @Output() handleShowCourse(): void {}
}
