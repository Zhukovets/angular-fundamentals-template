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

  onSearch(searchQuery: string): void {
    console.log("Search query:", searchQuery);
    // Add logic to filter courses based on the search query
  }
}
