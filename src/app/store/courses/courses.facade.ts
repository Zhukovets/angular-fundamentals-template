import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { CoursesState } from "./courses.reducer";
import {
  requestAllCourses,
  requestCreateCourse,
  requestDeleteCourse,
  requestEditCourse,
  requestFilteredCourses,
  requestSingleCourse,
} from "./courses.actions";
import {
  getAllCourses,
  selectIsAllCoursesLoading,
  selectIsSingleCourseLoading,
  selectIsSearchingState,
  getCourses,
  getCourse,
  getErrorMessage,
} from "./courses.selectors";
import { Course } from "@app/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(selectIsAllCoursesLoading)
  );
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(selectIsSingleCourseLoading)
  );
  isSearchingState$: Observable<boolean> = this.store.pipe(
    select(selectIsSearchingState)
  );
  courses$: Observable<Course[] | null> = this.store.pipe(select(getCourses));
  allCourses$: Observable<Course[] | null> = this.store.pipe(
    select(getAllCourses)
  );
  course$: Observable<Course | null | undefined> = this.store.pipe(
    select(getCourse)
  );
  errorMessage$: Observable<string | null> = this.store.pipe(
    select(getErrorMessage)
  );

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: Course, id: any) {
    this.store.dispatch(requestEditCourse({ body, id }));
  }

  createCourse(body: Course) {
    this.store.dispatch(requestCreateCourse({ course: body }));
  }

  deleteCourse(id: any) {
    this.store.dispatch(requestDeleteCourse({ id }));
  }
}
