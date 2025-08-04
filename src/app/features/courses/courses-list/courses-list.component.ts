import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../../../types/courseTypes";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable = true;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShowCourse(courseId: string): void {
    const course = this.courses.find((c) => c.id === courseId);
    if (course) {
      this.showCourse.emit(course);
    }
  }

  onEditCourse(courseId: string): void {
    this.editCourse.emit(courseId);
  }

  onDeleteCourse(courseId: string): void {
    this.deleteCourse.emit(courseId);
  }
}
