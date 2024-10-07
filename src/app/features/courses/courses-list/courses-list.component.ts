import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { CoursesFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";
import { catchError, Observable, of, tap } from "rxjs";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.css"],
})
export class CoursesListComponent {
  courses$: Observable<any[]>;
  isEditable: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private userStoreService: UserStoreService,
    private coursesFacade: CoursesFacade
  ) {
    this.courses$ = this.coursesService.getAll();
    this.courses$.subscribe((el) => console.log(el));
    this.userStoreService.isAdmin$.subscribe((isAdmin) => {
      console.log("is admin value is " + isAdmin);
      this.isEditable = isAdmin;
    });
  }

  ngOnInit() {
    this.userStoreService.getUser();
  }

  onShowCourse(courseId: string) {
    this.router.navigate([`/courses/${courseId}`]);
  }

  onDeleteCourse(courseId: string): void {
    this.coursesFacade.deleteCourse(courseId);
  }

  onEditCourse(courseId: string) {
    this.router.navigate([`/courses/edit/${courseId}`]);
  }
}
