import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  allCourses$: Observable<Course[]> = this.coursesFacade.allCourses$;
  isEditable: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private coursesFacade: CoursesFacade,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    const userSubscription = this.userStoreService.isAdmin$.subscribe((isAdmin) => {
      this.isEditable = isAdmin;
    });

    this.subscriptions.push(userSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadCourses(): void {
    this.coursesFacade.getAllCourses();
  }

  navigateToCoursesAdd() {
    this.router.navigate(["/courses/add"]);
  }

  showCourse(course: Course) {
    this.router.navigate(["/courses/", course.id]);
  }

  editCourse(course: Course) {
    this.router.navigate(["/courses/edit/", course.id]);
  }

  deleteCourse(course: Course) {
    this.coursesFacade.deleteCourse(course.id!);
  }

  filterSearch(searchTerm: string): void {
    if (!searchTerm) {
      this.coursesFacade.getAllCourses();
    } else {
      this.coursesFacade.getFilteredCourses(searchTerm);
    }
  }
}
