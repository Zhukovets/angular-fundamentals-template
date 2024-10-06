import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromCourses from "./courses.selectors";
import * as CoursesActions from "./courses.actions";
import { Observable } from "rxjs";
import { Course } from "@app/shared/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesFacade {
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(fromCourses.isAllCoursesLoadingSelector)
  );
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(fromCourses.isSingleCourseLoadingSelector)
  );
  isSearchingState$: Observable<boolean> = this.store.pipe(
    select(fromCourses.isSearchingStateSelector)
  );
  courses$: Observable<Course[]> = this.store.pipe(
    select(fromCourses.getAllCourses)
  );
  course$: Observable<Course | null> = this.store.pipe(
    select(fromCourses.getCourse)
  );
  errorMessage$: Observable<string | null> = this.store.pipe(
    select(fromCourses.getErrorMessage)
  );

  constructor(private store: Store) {}

  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(title: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }

  editCourse(id: string, course: Partial<Course>) {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course }));
  }

  createCourse(course: Course) {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
  }
}
