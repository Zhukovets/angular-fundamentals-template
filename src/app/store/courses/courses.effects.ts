import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom, tap } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { CoursesFacade } from './courses.facade';
import { CoursesService, Course, CourseUpdateData } from '@app/services/courses.service';
import { Action } from '@ngrx/store';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesFacade: CoursesFacade,
    private router: Router
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAllCourses().pipe(
           map((courses: Course[]) => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError((error: any) => of(CoursesActions.requestAllCoursesFail({ error: error?.message ?? String(error) })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesFacade.allCourses$),
      map(([{ title }, allCourses]: [{ title: string }, Course[] | null]) => {
        const filteredCourses = (allCourses || []).filter((c: any) =>
          c.title?.toLowerCase().includes(title.toLowerCase())
        );
        return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
      })
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap(({ id }) =>
        this.coursesService.getCourseById(id).pipe(
          map((course: any) => CoursesActions.requestSingleCourseSuccess({ course })),
          catchError((error: any) => of(CoursesActions.requestSingleCourseFail({ error: error?.message ?? String(error) })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      concatMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          concatMap(() => [
            CoursesActions.requestDeleteCourseSuccess({ id }),
            CoursesActions.requestAllCourses()
          ]),
          catchError((error: any) => of(CoursesActions.requestDeleteCourseFail({ error: error?.message ?? String(error) })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      switchMap(({ id, course }) => {
        const { id: courseId, creationDate, ...updateData } = course as any;
          return this.coursesService.editCourse(id, updateData as CourseUpdateData).pipe(
          map((updatedCourse: Course) => CoursesActions.requestEditCourseSuccess({ course: updatedCourse })),
          catchError((error: any) => of(CoursesActions.requestEditCourseFail({ error: error?.message ?? String(error) })))
        );
      })
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap(({ course }) => {
        const { id, creationDate, ...createData } = course as any;
        return this.coursesService.createCourse(createData as CourseUpdateData).pipe(
          map((createdCourse: Course) => CoursesActions.requestCreateCourseSuccess({ course: createdCourse })),
          catchError((error: any) => of(CoursesActions.requestCreateCourseFail({ error: error?.message ?? String(error) })))
        );
      })
    )
  );

  redirectToTheCoursesPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CoursesActions.requestCreateCourseSuccess,
        CoursesActions.requestEditCourseSuccess,
        CoursesActions.requestDeleteCourseSuccess,
        CoursesActions.requestSingleCourseFail
      ),
      tap(() => this.router.navigate(['/courses']))
    ),
    { dispatch: false }
  );
}
 