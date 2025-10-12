import { Component, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Router } from "@angular/router";
import { SessionStorageService } from "@app/auth/services/session-storage.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  courses$ = this.coursesStore.courses$;
  isLoading$ = this.coursesStore.isLoading$;
  isAdmin$ = this.userStore.isAdmin$;

  searchValue: string = "";

  constructor(
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService,
    private router: Router,
    private session: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.coursesStore.fetchAll();

    const token = this.session.getToken();
    if (token) {
      this.userStore.getUser().subscribe({ next: () => {}, error: () => {} });
    }
  }

  onSearch(term?: string) {
    if (typeof term === 'string') {
      this.searchValue = term.trim();
    }

    const value = (this.searchValue || '').trim();
    if (value) {
      this.coursesStore.filterCourses(value);
    } else {
      this.coursesStore.fetchAll();
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
    this.coursesStore.deleteCourse(id).subscribe({
      next: () => {},
      error: () => alert('Delete failed')
    });
  }
}
