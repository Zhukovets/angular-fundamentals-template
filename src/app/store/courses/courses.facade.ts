import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CoursesActions from './courses.actions';
import { CoursesState } from './courses.reducer'; // Adjust the import path if necessary
import { Course } from '@app/models/course.model';
import {
    isAllCoursesLoadingSelector,
    isSingleCourseLoadingSelector,
    isSearchingStateSelector,
    getCourses,
    getAllCourses,
    getCourse,
    getErrorMessage,
  } from './courses.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoursesFacade {
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(isAllCoursesLoadingSelector));
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(isSingleCourseLoadingSelector));
  isSearchingState$: Observable<boolean> = this.store.pipe(select(isSearchingStateSelector));
  courses$: Observable<Course[]> = this.store.pipe(select(getCourses));
  allCourses$: Observable<Course[]> = this.store.pipe(select(getAllCourses));
  course$: Observable<Course | null> = this.store.pipe(select(getCourse));
  errorMessage$: Observable<string | null> = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: Course, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ course: body, id }));
  }

  createCourse(body: Course): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
