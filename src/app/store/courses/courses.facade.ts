import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoursesState } from './courses.reducer';
import { coursesQuery } from './courses.selectors';
import * as CoursesActions from './courses.actions';
import { Course } from './course.model'; 

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    // Add your code here
    isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(coursesQuery.isAllCoursesLoadingSelector));
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(coursesQuery.isSingleCourseLoadingSelector));
  isSearchingState$: Observable<boolean> = this.store.pipe(select(coursesQuery.isSearchingStateSelector));
  courses$: Observable<any[]> = this.store.pipe(select(coursesQuery.getCourses));
  allCourses$: Observable<any[]> = this.store.pipe(select(coursesQuery.getAllCourses));
  course$: Observable<any> = this.store.pipe(select(coursesQuery.getCourse));
  errorMessage$: Observable<string> = this.store.pipe(select(coursesQuery.getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: Course, id: string) {
    this.store.dispatch(CoursesActions.requestEditCourse({ course: body, id }));
  }

  createCourse(body: Course) {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}