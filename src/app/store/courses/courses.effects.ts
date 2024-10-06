import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, combineLatest, catchError, switchMap, of, tap} from 'rxjs';
import {CoursesService} from '@app/services/courses.service';
import * as CoursesActions from '@app/store/courses/courses.actions'
import {Router} from "@angular/router";

@Injectable()

export class CoursesEffects {
    constructor(private actions$: Actions,
                private coursesService: CoursesService,
                private router: Router) {
    }

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            switchMap(() =>
                combineLatest([
                    this.coursesService.getAll(),
                    this.coursesService.getAllAuthors()
                ]).pipe(
                    map(([coursesResponse, authorsResponse]) => {
                        const courses = coursesResponse.result;
                        const authors = authorsResponse.result;
                        const authorsMap = authors.reduce((acc, author) => {
                            acc[author.id] = author.name;
                            return acc;
                        }, {} as { [key: string]: string });
                        const updatedCourses = courses.map((course) => ({
                            ...course,
                            authors: course.authors.map((authorId: string) => authorsMap[authorId] || authorId)
                        }));
                        return CoursesActions.requestAllCoursesSuccess({courses: updatedCourses});
                    }),
                    catchError((error) =>
                        of(CoursesActions.requestAllCoursesFail({error: error.message}))
                    )
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            switchMap(({ title }) =>
                this.coursesService.getAll().pipe(
                    map((response) => {
                        const courses = response.result;
                        const filteredCourses = title.trim() === ''
                            ? courses
                            : courses.filter(course =>
                                course.title.toLowerCase().includes(title.toLowerCase())
                            );
                        return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
                    }),
                    catchError((error) =>
                        of(CoursesActions.requestFilteredCoursesFail({ error: error.message }))
                    )
                )
            )
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            switchMap(({id}) =>
                this.coursesService.getCourse(id).pipe(
                    map((courseResponse) =>
                        CoursesActions.requestSingleCourseSuccess({course: courseResponse.result})
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestSingleCourseFail({error: error.message}))
                    )
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            switchMap(({id}) =>
                this.coursesService.deleteCourse(id).pipe(
                    map(() => CoursesActions.requestDeleteCourseSuccess({id})),
                    catchError((error) =>
                        of(CoursesActions.requestDeleteCourseFail({error: error.message}))
                    )
                )
            )
        ))

    getAllAuthors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllAuthors),
            switchMap(() =>
                this.coursesService.getAllAuthors().pipe(
                    map((authors) => {
                            return CoursesActions.requestAllAuthorsSuccess({authors: authors.result})
                        }
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestAllAuthorsFail({error: error.message}))
                    )
                )
            )
        )
    )

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            switchMap(({id, course}) =>
                this.coursesService.editCourse(id, course).pipe(
                    map((course) =>
                        CoursesActions.requestEditCourseSuccess({course: course.result})
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestEditCourseFail({error: error.message}))
                    )
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            switchMap(({course}) =>
                this.coursesService.createCourse(course).pipe(
                    map((item) =>
                        CoursesActions.requestCreateCourseSuccess({course: item.result})
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestCreateCourseFail({error: error.message}))
                    )
                )
            )
        )
    )

    createAuthor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateAuthor),
            switchMap(({name}) =>
                this.coursesService.createAuthor(name).pipe(
                    map((item) =>
                        CoursesActions.requestCreateAuthorSuccess({author: item.result})
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestCreateAuthorFail({error: error.message}))
                    )
                )
            )
        )
    )

    redirectToTheCoursesPage$ = createEffect(() =>
            this.actions$.pipe(
                ofType(
                    CoursesActions.requestCreateCourseSuccess,
                    CoursesActions.requestEditCourseSuccess,
                    CoursesActions.requestSingleCourseFail
                ),
                tap(() => {
                    this.router.navigate(['/courses']);
                })
            ),
        {dispatch: false}
    );
}
