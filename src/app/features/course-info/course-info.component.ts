import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { Course } from "@app/services/courses.service";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course$: Observable<Course | null>;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesStateFacade: CoursesStateFacade
  ) {
    this.course$ = this.coursesStateFacade.course$;
    this.isLoading$ = this.coursesStateFacade.isSingleCourseLoading$;
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params["id"];
    if (courseId) {
      this.coursesStateFacade.getSingleCourse(courseId);
    }
  }

  onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
