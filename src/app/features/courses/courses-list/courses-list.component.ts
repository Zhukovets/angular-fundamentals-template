import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
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
    private userStoreService: UserStoreService
  ) {
    this.courses$ = this.coursesService.getAll();
    this.courses$.subscribe((el) => console.log(el));
    this.userStoreService.isAdmin$.subscribe((isAdmin) => {
      this.isEditable = isAdmin; // Jeśli użytkownik jest adminem, ustaw isEditable na true
    });
  }

  onShowCourse(courseId: string) {
    this.router.navigate([`/courses/${courseId}`]);
  }

  onDeleteCourse(courseId: string): void {
    this.coursesService
      .deleteCourse(courseId)
      .pipe(
        tap(() => {
          console.log(`Course with ID ${courseId} deleted successfully.`);
        }),
        catchError((error) => {
          console.error("Failed to delete course:", error);
          return of(null);
        })
      )
      .subscribe();
  }
  onEditCourse(courseId: string) {
    this.router.navigate([`/courses/edit/${courseId}`]);
  }
}
