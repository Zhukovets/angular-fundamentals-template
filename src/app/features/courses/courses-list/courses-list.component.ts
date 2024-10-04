import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  courses$: Observable<any[]>;
  isEditable: boolean = true;

  constructor(
    private coursesService: CoursesService,
    private router: Router
  ) {
    this.courses$ = this.coursesService.getAll();
    this.courses$.subscribe((el) => console.log(el));
  }

  onShowCourse(courseId: number) {
    console.log("showing details");
    this.router.navigate([`/courses/${courseId}`]);
  }
}
