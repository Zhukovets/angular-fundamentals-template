import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SessionStorageService } from "@app/auth/services/session-storage.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  public courses$ = this.coursesFacade.courses$;
  public isLoading$ = this.coursesFacade.isAllCoursesLoading$;
  public isAdmin$ = this.userStore.isAdmin$;

  public searchValue: string = "";

  constructor(
    private coursesFacade: CoursesStateFacade,
    private userStore: UserStoreService,
    private router: Router,
    private session: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();

    const token = this.session.getToken();
    if (token) {
      this.userStore.getUser().subscribe({ next: () => {}, error: () => {} });
    }
  }

  onSearch() {
    const value = this.searchValue.trim();
    if (value) {
      this.coursesFacade.getFilteredCourses(value);
    } else {
      this.coursesFacade.getAllCourses();
    }
  }

  addCourse() {
    this.router.navigate(['/courses/add']);
  }

  editCourse(courseId: any) {
    const id = String(courseId);
    this.router.navigate([`/courses/edit/${id}`]);
  }

  showCourse(courseId: any) {
    const id = String(courseId);
    this.router.navigate([`/courses/${id}`]);
  }

  deleteCourse(courseId: any) {
    const id = String(courseId);
    if (!confirm('Are you sure you want to delete this course?')) return;
    this.coursesFacade.deleteCourse(id);
  }
}
