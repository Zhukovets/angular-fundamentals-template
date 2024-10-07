import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CoursesFacade } from "@app/store/courses/courses.facade";
import { Course } from "@app/shared/models/course.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>; // Observable for the courses list
  isEditable: boolean = false;

  constructor(
    private router: Router,
    private coursesFacade: CoursesFacade
  ) {
    this.courses$ = this.coursesFacade.courses$;
  }

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
  }

  search(value: string): void {
    console.log("searching from component", value);
    this.coursesFacade.getFilteredCourses(value);
  }

  navigateToNewCourse() {
    this.router.navigate(["/courses/add"]);
  }
}
