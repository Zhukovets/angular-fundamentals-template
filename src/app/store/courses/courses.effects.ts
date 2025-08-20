import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { mapCoursesWithAuthors, mapCourseWithAuthors } from "@features/courses/services/transformers/course.transformer";
import { transformAuthors, transformAuthor } from "@features/courses/services/transformers/author.transformer";
import {CoursesApiService} from "@features/courses/services/api/courses.api.service";
import {AuthorsApiService} from "@features/courses/services/api/authors.api.service";

@Injectable()
export class CoursesEffects {
    private router = inject(Router);
    private actions$ = inject(Actions);
    private coursesApiService = inject(CoursesApiService);
    private authorsApiService = inject(AuthorsApiService);
    private store = inject(Store);

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            switchMap(() =>
                forkJoin({
                    courses: this.coursesApiService.getAllCourses(),
                    authors: this.authorsApiService.getAllAuthors().pipe(map(transformAuthors))
                }).pipe(
                    tap(({ authors }) => this.store.dispatch(CoursesActions.requestAllAuthorsSuccess({ authors }))),
                    map(({ courses, authors }) =>
                        CoursesActions.requestAllCoursesSuccess({ courses: mapCoursesWithAuthors(courses, authors) })
                    ),
                    catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.store.pipe(select(CoursesSelectors.getAuthors))),
            switchMap(([{ title }, authors]) =>
                this.coursesApiService.getFilteredCourses(title).pipe(
                    map(courses => CoursesActions.requestFilteredCoursesSuccess({ courses: mapCoursesWithAuthors(courses, authors) })),
                    catchError(error => of(CoursesActions.requestFilteredCoursesFail({ error })))
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            withLatestFrom(this.store.pipe(select(CoursesSelectors.getAuthors))),
            mergeMap(([{ id }, authors]) =>
                this.coursesApiService.getCourseById(id).pipe(
                    map(course => CoursesActions.requestSingleCourseSuccess({ course: mapCourseWithAuthors(course, authors) })),
                    catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap(({ id }) =>
                this.coursesApiService.deleteCourse(id).pipe(
                    map(() => CoursesActions.requestDeleteCourseSuccess({ courseId: id })),
                    catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            withLatestFrom(this.store.pipe(select(CoursesSelectors.getAuthors))),
            mergeMap(([{ id, course: newCourseData }, authors]) =>
                this.coursesApiService.editCourse(id, newCourseData).pipe(
                    map(updatedCourse => CoursesActions.requestEditCourseSuccess({ course: mapCourseWithAuthors(updatedCourse, authors) })),
                    catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            withLatestFrom(this.store.pipe(select(CoursesSelectors.getAuthors))),
            mergeMap(([{ course: newCourseData }, authors]) =>
                this.coursesApiService.addCourse(newCourseData).pipe(
                    map(createdCourse => CoursesActions.requestCreateCourseSuccess({ course: mapCourseWithAuthors(createdCourse, authors) })),
                    catchError(error => of(CoursesActions.requestCreateCourseFail({ error })))
                )
            )
        )
    );

    getAllAuthors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllAuthors),
            switchMap(() =>
                this.authorsApiService.getAllAuthors().pipe(
                    map(authorsApi => CoursesActions.requestAllAuthorsSuccess({ authors: transformAuthors(authorsApi) })),
                    catchError(error => of(CoursesActions.requestAllAuthorsFail({ error })))
                )
            )
        )
    );

    createAuthor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateAuthor),
            mergeMap(({ author }) =>
                this.authorsApiService.createAuthor(author).pipe(
                    map(response => CoursesActions.requestCreateAuthorSuccess({ author: transformAuthor(response.result) })),
                    catchError(error => of(CoursesActions.requestCreateAuthorFail({ error })))
                )
            )
        )
    );

    deleteAuthor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteAuthor),
            mergeMap(({ id }) =>
                this.authorsApiService.deleteAuthor(id).pipe(
                    map(() => CoursesActions.requestDeleteAuthorSuccess({ authorId: id })),
                    catchError(error => of(CoursesActions.requestDeleteAuthorFail({ error })))
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    CoursesActions.requestCreateCourseSuccess,
                    CoursesActions.requestEditCourseSuccess,
                    CoursesActions.requestSingleCourseFail
                ),
                tap(() => this.router.navigate(['/courses']))
            ),
        { dispatch: false }
    );
}