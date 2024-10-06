import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '@app/services/courses.service';
import { Store } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import { Router } from '@angular/router';
import { CoursesStateFacade } from './courses.facade';





@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router,
        private store: Store<CoursesState>,
        private coursesFacade: CoursesStateFacade
    ) {}

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map(response => CoursesActions.requestAllCoursesSuccess({ courses: response.result })),
                    catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            switchMap(action => 
                this.coursesService.filterCourses(action.searchValue).pipe(
                    map(response => {
                        const filteredCourses = response.result;
                        return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
                    }),
                    catchError(error => {
                        console.log('Error fetching filtered courses:', error);
                        return of(CoursesActions.requestFilteredCoursesFail({ error }));
                    })
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap((action) =>
                this.coursesService.getCourse(action.id).pipe(
                    map(response => CoursesActions.requestSingleCourseSuccess({ course: response.result })),
                    catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap((action) =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(() => CoursesActions.requestAllCourses()),
                    catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap((action) =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map(course => CoursesActions.requestEditCourseSuccess({ course })),
                    catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap((action) =>
                this.coursesService.createCourse(action.course).pipe(
                    map(course => CoursesActions.requestEditCourseSuccess({ course })),
                    catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
                )
            )
        )
    );

    redirectToTheCoursePage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                CoursesActions.requestCreateCourseSuccess,
                CoursesActions.requestEditCourseSuccess,
                CoursesActions.requestSingleCourseFail
            ),
            map(() => {
                this.router.navigate(['/courses']);
            })
        ),
        { dispatch: false }
    )



    // Add your code here
}
