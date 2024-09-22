import { Component, Input, Output } from "@angular/core";

import { mockedCoursesList } from "@app/shared/mocks/mock";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  courses = mockedCoursesList;

  @Input() courseName: string = "";

  @Input() isEditable: boolean = false;

  @Output() handleShowCourse(): void {}

  onSearch(searchQuery: string): void {
    console.log("Search query:", searchQuery);
    // Add logic to filter courses based on the search query
  }
}
