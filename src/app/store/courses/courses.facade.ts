import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import {
  Course,
  CreateCourseRequest,
  Author,
  CoursesService,
} from "@app/services/courses.service";
import { CoursesState } from "./courses.reducer";
import * as CoursesSelectors from "./courses.selectors";
import * as CoursesActions from "./courses.actions";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  // Observable properties
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isAllCoursesLoadingSelector)
  );

  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSingleCourseLoadingSelector)
  );

  isSearchingState$: Observable<boolean> = this.store.pipe(
    select(CoursesSelectors.isSearchingStateSelector)
  );

  courses$: Observable<Course[]> = this.store.pipe(
    select(CoursesSelectors.getCourses)
  );

  allCourses$: Observable<Course[]> = this.store.pipe(
    select(CoursesSelectors.getAllCourses)
  );

  course$: Observable<Course | null> = this.store.pipe(
    select(CoursesSelectors.getCourse)
  );

  errorMessage$: Observable<string | null> = this.store.pipe(
    select(CoursesSelectors.getErrorMessage)
  );

  // Authors (temporary - using service directly since not in store requirements)
  authors$: Observable<Author[]> = this.coursesService.getAllAuthors();

  constructor(
    private store: Store<CoursesState>,
    private coursesService: CoursesService
  ) {}

  // Action dispatching methods
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

  editCourse(body: CreateCourseRequest, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
  }

  createCourse(body: CreateCourseRequest): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }

  // Authors methods (temporary - using service directly)
  getAllAuthors(): Observable<Author[]> {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string): Observable<Author> {
    return this.coursesService.createAuthor(name);
  }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.getCourse(id);
  }
}
