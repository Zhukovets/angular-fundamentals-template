import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "../../services/courses-store.service";
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
    private store: CoursesStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.store.getCourse(id).subscribe((course) => {
        this.course = course;
      });
    }
  }

  onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
