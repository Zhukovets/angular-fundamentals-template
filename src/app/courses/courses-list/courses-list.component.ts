import { Component, Input, Output } from "@angular/core";
import { Course } from "@app/models/course.model";
import { CoursesService } from "@app/services/courses.service";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  constructor(private coursesService: CoursesService) {
    this.getCourses();
  }
  courses: Course[] = [];

  getCourses() {
    this.coursesService.getAll().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses; // Assign the fetched courses to the local courses array
      },
      error: (err) => {
        console.error("Error fetching courses:", err);
      },
    });
  }

  @Input() courseName: string = "";

  @Input() isEditable: boolean = false;

  @Output() handleShowCourse(): void {}

  onSearch(searchQuery: string): void {
    console.log("Search query:", searchQuery);
    this.coursesService
      .filterCourses(searchQuery)
      .subscribe((res) => (this.courses = res));
    // Add logic to filter courses based on the search query
  }
}
