import { Injectable } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess,
    requestCreateCourse,
    requestCreateCourseFail,
    requestCreateCourseSuccess,
    requestDeleteCourse,
    requestDeleteCourseFail,
    requestDeleteCourseSuccess,
    requestEditCourse,
    requestEditCourseFail,
    requestEditCourseSuccess,
    requestFilteredCourse,
    requestFilteredCourseFail,
    requestFilteredCourseSuccess,
    requestSingleCourse,
    requestSingleCourseFail,
    requestSingleCourseSuccess
} from './courses.actions';
import { Course } from '@app/shared/models/course.model';

@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions, private courseStore: CoursesStoreService) { }

    // Add your code here
    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(requestAllCourses),
        mergeMap(() => this.courseStore.getAll().pipe(
            map(courses => (requestAllCoursesSuccess({ courses }))),
            catchError(() => of(requestAllCoursesFail({ error: 'Error loading courses' })))
        ))
    ));

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(requestFilteredCourse),
        mergeMap(() => this.courseStore.filterCourses('').pipe(
            map(courses => (requestFilteredCourseSuccess({ courses }))),
            catchError(() => of(requestFilteredCourseFail({ error: 'Error filtering courses' })))
        ))
    ));

    getSingleCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestSingleCourse),
        mergeMap(() => this.courseStore.getCourse('').pipe(
            map(course => (requestSingleCourseSuccess({ course }))),
            catchError(() => of(requestSingleCourseFail({ error: 'Error getting course' })))
        ))
    ));

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestDeleteCourse),
        mergeMap(() => this.courseStore.deleteCourse('').pipe(
            map(() => (requestDeleteCourseSuccess())),
            catchError(() => of(requestDeleteCourseFail({ error: 'Error deleting course' })))
        ))
    ));

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestEditCourse),
        mergeMap(() => this.courseStore.editCourse('', {} as Course).pipe(
            map(course => (requestEditCourseSuccess({ course }))),
            catchError(() => of(requestEditCourseFail({ error: 'Error editing course' })))
        ))
    ));

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(requestCreateCourse),
        mergeMap(() => this.courseStore.createCourse({} as Course).pipe(
            map(course => (requestCreateCourseSuccess({ course }))),
            catchError(() => of(requestCreateCourseFail({ error: 'Error editing course' })))
        ))
    ));

    redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe());
}