import { Component, Input } from "@angular/core";
import { Course } from "@app/models/course.model";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { Observable } from "rxjs";
import { CustomDatePipe } from "@app/shared/pipes/custom-date.pipe";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  courses$: Observable<Course[] | null>;
  creationDate: CustomDatePipe;

  @Input() courseName: string = "";
  @Input() isEditable: boolean = false;

  constructor(private coursesFacade: CoursesStateFacade) {
    this.courses$ = this.coursesFacade.allCourses$;
    this.creationDate = new CustomDatePipe();
    this.getCourses();
  }

  getCourses() {
    this.coursesFacade.getAllCourses();
  }

  onSearch(searchQuery: string): void {
    console.log("Search query:", searchQuery);
    this.coursesFacade.getFilteredCourses(searchQuery);
  }
}
