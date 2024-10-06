import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CoursesActions from './courses.actions';
import * as fromCoursesSelectors from './courses.selectors'
import { CoursesState } from './courses.reducer';
import { Course } from '@app/models/course.model';




@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    // Add your code here

    isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
        select(fromCoursesSelectors.isAllCoursesLoadingSelector)
    );

    isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
        select(fromCoursesSelectors.isSingleCourseLoadingSelector)
    );

    isSearchingState$: Observable<boolean> = this.store.pipe(
        select(fromCoursesSelectors.isSearchingStateSelector)
    );

    courses$: Observable<Course []> = this.store.pipe(
        select(fromCoursesSelectors.getCourses)
    );

    allCourses$: Observable<Course []> = this.store.pipe(
        select(fromCoursesSelectors.getAllCourses)
    );

    course$: Observable<Course | null> = this.store.pipe(
        select(fromCoursesSelectors.getCourse)
    );

    errorMessage$: Observable<Error | null> = this.store.pipe(
        select(fromCoursesSelectors.getErrorMessage)
    )

    constructor(private store: Store<CoursesState>) {}

    getAllCourses(): void{
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({ searchValue }));
    }

    editCourse(id: string, course: Course): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ id, course }));
    }

    createCourse(course: Course): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
    }

    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }
}
