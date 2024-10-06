import {Injectable} from '@angular/core';
import {Store, select} from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import {CoursesState} from './courses.reducer';
import {Author, CardItem, CreateCourseRequest, UpdateCourseRequest} from "@app/models/card.model";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    isAllCoursesLoading$:Observable<boolean> = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
    isSingleCourseLoading$:Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
    isSearchingState$:Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
    courses$:Observable<CardItem[]> = this.store.pipe(select(CoursesSelectors.getCourses));
    allCourses$:Observable<CardItem[]> = this.store.pipe(select(CoursesSelectors.getAllCourses));
    course$:Observable<CardItem> = this.store.pipe(select(CoursesSelectors.getCourse));
    authors$:Observable<Author[]> = this.store.pipe(select(CoursesSelectors.getAllAuthors));
    errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));

    constructor(private store: Store<CoursesState>) {}

    getAllCourses() {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getFilteredCourses(title: string) {
        this.store.dispatch(CoursesActions.requestFilteredCourses({title}));
    }

    getSingleCourse(id: string) {
        this.store.dispatch(CoursesActions.requestSingleCourse({id}))
    }

    deleteCourse(id: string) {
        this.store.dispatch(CoursesActions.requestDeleteCourse({id}));
    }

    editCourse(id:string, course:UpdateCourseRequest) {
        this.store.dispatch(CoursesActions.requestEditCourse({id, course}));
    }

    getAllAuthors() {
        this.store.dispatch(CoursesActions.requestAllAuthors());
    }

    createCourse(course: CreateCourseRequest) {
        this.store.dispatch(CoursesActions.requestCreateCourse({course}));
    }

    createAuthor(name: string) {
        this.store.dispatch(CoursesActions.requestCreateAuthor({name}));
    }

}
