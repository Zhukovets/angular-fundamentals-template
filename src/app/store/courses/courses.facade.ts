import { inject, Injectable } from '@angular/core';
import { select, Store } from "@ngrx/store";
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { newCourse } from '@app/interfaces/courses/course-item.interface';
import { INewAuthor } from '@app/interfaces/courses/author-item.interface';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    private store = inject(Store);

    isAllCoursesLoading$ = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
    isSingleCourseLoading$ = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
    isSearchingState$ = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
    courses$ = this.store.pipe(select(CoursesSelectors.getCourses));
    allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
    course$ = this.store.pipe(select(CoursesSelectors.getCourse));
    errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));
    authors$ = this.store.pipe(select(CoursesSelectors.getAuthors));
    isAuthorsLoading$ = this.store.pipe(select(CoursesSelectors.isAuthorsLoadingSelector));

    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
    }

    editCourse(body: newCourse, id: string): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
    }

    createCourse(body: newCourse): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }

    getAllAuthors(): void {
        this.store.dispatch(CoursesActions.requestAllAuthors());
    }

    createAuthor(author: INewAuthor): void {
        this.store.dispatch(CoursesActions.requestCreateAuthor({ author }));
    }

    deleteAuthor(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteAuthor({ id }));
    }

    clearSingleCourse(): void {
        this.store.dispatch(CoursesActions.clearSingleCourse());
    }
}