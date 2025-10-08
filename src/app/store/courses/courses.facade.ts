import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CoursesActions from '@app/store/courses/courses.actions';
import * as CoursesSelectors from '@app/store/courses/courses.selectors';
import { Course, CoursesError } from '@app/features/courses/courses.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesStateFacade {
  public isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
  public isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
  public isSearchingState$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));

  public courses$: Observable<Course[]> = this.store.pipe(select(CoursesSelectors.getCourses));
  public allCourses$: Observable<Course[]> = this.store.pipe(select(CoursesSelectors.getAllCourses));
  public course$: Observable<Course | null> = this.store.pipe(select(CoursesSelectors.getCourse));
  public errorMessage$: Observable<CoursesError | string | null> = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private store: Store) {}

  public getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  public getSingleCourse(id: string | number): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  public getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  public editCourse(body: Course, id: string | number): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
  }

  public createCourse(body: Course): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  public deleteCourse(id: string | number): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
