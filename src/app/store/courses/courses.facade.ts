import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';

@Injectable({ providedIn: 'root' })
export class CoursesFacade {
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
  isSearchingState$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
  courses$: Observable<any[]> = this.store.pipe(select(CoursesSelectors.getCourses));
  allCourses$: Observable<any[]> = this.store.pipe(select(CoursesSelectors.getAllCourses));
  course$: Observable<any | null> = this.store.pipe(select(CoursesSelectors.getCourse));
  errorMessage$: Observable<any> = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private store: Store) {}

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: number): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(id: number, body: any): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
  }

  createCourse(body: any): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: number): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}