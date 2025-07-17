// @ts-nocheck
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Course } from "@app/types/courseTypes";
import { Author } from "@app/types/authorTypes";
import * as CoursesActions from "./courses.actions";
import * as CoursesSelectors from "./courses.selectors";
import { State } from "../index";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  isAllCoursesLoading$: Observable<boolean> = this.store.select(
    CoursesSelectors.isAllCoursesLoadingSelector
  );
  courses$: Observable<Course[] | null> = this.store.select(
    CoursesSelectors.getAllCourses
  );
  allCourses$: Observable<Course[] | null> = this.store.select(
    CoursesSelectors.getAllCourses
  );
  errorMessage$: Observable<string> = this.store.select(
    CoursesSelectors.getErrorMessage
  );

  isSingleCourseLoading$: Observable<boolean> = this.store.select(
    CoursesSelectors.isSingleCourseLoadingSelector
  );
  isSearchingState$: Observable<boolean> = this.store.select(
    CoursesSelectors.isSearchingStateSelector
  );
  course$: Observable<Course | null> = this.store.select(
    CoursesSelectors.getCourse
  );

  // Authors observables
  authors$: Observable<Author[]> = this.store.select(
    CoursesSelectors.getAuthors
  );

  isAuthorsLoading$: Observable<boolean> = this.store.select(
    CoursesSelectors.isAuthorsLoadingSelector
  );

  constructor(private store: Store<State>) {}

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CoursesActions.requestFilteredCourses({ title: searchValue })
    );
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  editCourse(body: any, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
  }

  createCourse(body: any): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }

  getAllAuthors(): void {
    this.store.dispatch(CoursesActions.requestAllAuthors());
  }

  createAuthor(name: string): void {
    this.store.dispatch(CoursesActions.requestCreateAuthor({ name }));
  }
}
