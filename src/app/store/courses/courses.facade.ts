import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as CoursesSelectors from "./courses.selectors";
import * as CoursesActions from "./courses.actions";
import { Course } from "@app/features/courses/courses.model";
import {
  isAllCoursesLoadingSelector,
  isSingleCourseLoadingSelector,
  isSearchingStateSelector,
  getCourses,
  getAllCourses,
  getCourse,
  getErrorMessage,
} from "./courses.selectors";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  // Add your code here
  constructor(private store: Store) {}

  isAllCoursesLoading$ = this.store.pipe(select(isAllCoursesLoadingSelector));
  isSingleCourseLoading$ = this.store.pipe(
    select(isSingleCourseLoadingSelector)
  );
  isSearchingState$ = this.store.pipe(select(isSearchingStateSelector));
  courses$ = this.store.pipe(select(getCourses));
  allCourses$ = this.store.pipe(select(getAllCourses));
  course$ = this.store.pipe(select(getCourse));
  errorMessage$ = this.store.pipe(select(getErrorMessage));

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CoursesActions.requestFilteredCourses({ title: searchValue })
    );
  }

  editCourse(body: Partial<Course> & { id: string }, id: string): void {
    this.store.dispatch(
      CoursesActions.requestEditCourse({ course: body as Course, id })
    );
  }

  createCourse(body: Course): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
