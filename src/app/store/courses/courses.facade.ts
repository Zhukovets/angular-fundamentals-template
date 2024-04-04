import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoursesState } from './courses.reducer';
import { Course } from '@app/shared/models/course.model';
import {
    requestAllCourses,
    requestCreateCourse,
    requestDeleteCourse,
    requestEditCourse,
    requestFilteredCourse,
    requestSingleCourse
} from './courses.actions';
import {
    AppState,
    isAllCoursesLoadingSelector,
    isSearchingStateSelector,
    isSingleCourseLoadingSelector,
    getCourses,
    getAllCourses,
    getCourse,
    getErrorMessage
} from './courses.selectors';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {

    constructor(private store: Store<AppState>) { }

    // Add your code here
    public isAllCoursesLoading$: Observable<boolean> = this.store.select(isAllCoursesLoadingSelector);
    public isSingleCourseLoading$: Observable<boolean> = this.store.select(isSingleCourseLoadingSelector);
    public isSearchingState$: Observable<boolean> = this.store.select(isSearchingStateSelector);
    public courses$: Observable<Course[]> = this.store.select(getCourses);
    public allCourses$: Observable<Course[]> = this.store.select(getAllCourses);
    public course$: Observable<Course> = this.store.select(getCourse);
    public errorMessage$: Observable<String> = this.store.select(getErrorMessage);

    getAllCourses() {
        this.store.dispatch(requestAllCourses());
    }

    getSingleCourse(id: String) {
        this.store.dispatch(requestSingleCourse({ id }));
    }

    getFilteredCourses(title: String) {
        this.store.dispatch(requestFilteredCourse({ title }));
    }

    editCourse(id: String, course: Course) {
        this.store.dispatch(requestEditCourse({ id, course }));
    }

    createCourse(course: Course) {
        this.store.dispatch(requestCreateCourse({ course }));
    }

    deleteCourse(id: String) {
        this.store.dispatch(requestDeleteCourse({ id }));
    }

}