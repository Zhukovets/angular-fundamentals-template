import { Component, OnInit } from "@angular/core";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  courses$ = this.facade.courses$;
  isLoading$ = this.facade.isAllCoursesLoading$;
  isAdmin$ = this.userStore.isAdmin$;

  searchValue: string = "";

  constructor(
    private facade: CoursesStateFacade,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facade.getAllCourses();
  }
  onSearch() {
    const value = this.searchValue.trim();
    if (value) {
      this.facade.getFilteredCourses(value);
    } else {
      this.facade.getAllCourses();
    }
  }
  editCourse(courseId: string) {
    this.router.navigate([`/courses/edit/${courseId}`]);
  }
  showCourse(courseId: string) {
    this.router.navigate([`/courses/${courseId}`]);
  }
  deleteCourse(courseId: string) {
    this.facade.deleteCourse(courseId);
  }
}
