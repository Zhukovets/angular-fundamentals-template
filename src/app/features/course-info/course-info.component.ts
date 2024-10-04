import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { Course } from "@app/shared/models/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  course: any | null = null;
  editable: boolean = true;
  id: string = "";

  @Output() showCourse = new EventEmitter<any>();
  @Output() editCourse = new EventEmitter<any>();
  @Output() deleteCourse = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    // Accessing the 'id' from the route parameters
    this.route.paramMap.subscribe((params) => {
      const routeId = params.get("id");
      if (routeId) {
        this.id = routeId;
        this.loadCourse(this.id);
      }
    });
  }

  loadCourse(id: string): void {
    this.coursesService.getCourse(id).subscribe({
      next: (course: any) => {
        console.log(course);
        this.course = course.result; // Store the course data
      },
      error: (err) => {
        console.error("Failed to load course", err); // Error handling
      },
    });
  }

  onShowCourse() {
    if (this.course) {
      this.showCourse.emit(this.course);
    }
  }

  onEditCourse() {
    if (this.course) {
      this.editCourse.emit(this.course);
    }
  }

  onDeleteCourse() {
    if (this.course) {
      this.deleteCourse.emit(this.course);
    }
  }
}
