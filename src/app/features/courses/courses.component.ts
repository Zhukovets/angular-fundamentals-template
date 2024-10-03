import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { Course } from "@app/shared/models/course.model";
import { catchError, Observable, of } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent {
  courses$: Observable<any[]>;
  isEditable: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private router: Router
  ) {
    this.courses$ = this.coursesService.getAll();
    this.courses$.subscribe((el) => console.log(el));
  }

  search(value: string): void {
    console.log("searchin from component");
    console.log(value);
    this.courses$ = this.coursesService.filterCourses(value).pipe(
      catchError((error) => {
        console.error("Error filtering courses:", error);
        return of([]); // Zwróć pustą tablicę w przypadku błędu
      })
    );
  }
  navigateToNewCourse() {
    this.router.navigate(["/courses/add"]);
  }
}
