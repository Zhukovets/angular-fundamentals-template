import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStateFacade } from "../../store/courses/courses.facade";
import { Course } from "../../types/courseTypes";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  @Input() course!: Course;

  constructor(
    private route: ActivatedRoute,
    private coursesFacade: CoursesStateFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.coursesFacade.getSingleCourse(id);
      this.coursesFacade.course$.subscribe((course) => {
        if (course) this.course = course;
      });
    }
  }

  onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
