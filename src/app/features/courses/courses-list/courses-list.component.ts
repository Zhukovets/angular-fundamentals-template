import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Author } from '@app/shared/models/author';
import { Course } from '@app/shared/models/course';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable, forkJoin, from, map, mergeMap, toArray } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],

})
export class CourseListComponent implements AfterViewInit {
  courses: Course[] = [];
  searchActive: boolean = false;
  @Input() isEditable: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute,
    private userStore: UserStoreService,
    private coursesStore: CoursesStoreService,
    private authService: AuthService) { }

  ngAfterViewInit(): void {
    const courseStore = this.coursesStore;
    this.loadAllCourses();
    courseStore.courses$.subscribe(courses => {
      this.courses = courses;
      this.courses.forEach(function _(course: Course) {
        const authors$ = forkJoin(
          course.authors.splice(0).map(x => courseStore.getAuthorById(x))
        )
        authors$.subscribe((authors: Author[]) => {
          course.authors = authors.map(x => x.name);
        });
      });
    });
  }

  loadAllCourses() {
    this.coursesStore.getAll().subscribe((courses) => this.courses = courses);
  }

  get isCourseEmpty(): boolean {
    return this.courses.length == 0 && !this.searchActive;
  }

  get isAuthorized(): boolean {
    return this.authService.isAuthorised;
  }

  get isAdmin(): boolean {
    return this.userStore.isAdmin$;
  }

  onDelete(course: Course) {
    this.coursesStore.deleteCourse(course.id).subscribe(console.log);
  }

  onEdit(course: Course) {
    this.router.navigate([`edit/${course.id}`], { relativeTo: this.route });
  }

  onShowCourse(course: Course) {
    this.router.navigate([course.id], { relativeTo: this.route });
  }

  onSearch(title: string) {
    if (title) {
      this.searchActive = true;
      this.coursesStore.filterCourses('title=' + title).subscribe(console.log);
    }
    else {
      this.searchActive = false;
      this.loadAllCourses();
    }
  }
}