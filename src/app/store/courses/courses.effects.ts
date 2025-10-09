import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, map, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import * as CoursesActions from './courses.actions';
import { CoursesFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: any, 
    private coursesFacade: CoursesFacade,
    private router: Router
  ) {}

  getALL$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((courses: any[]) => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError((error: any) => of(CoursesActions.requestAllCoursesFail({ error })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesFacade.allCourses$),
      map(([{ title }, allCourses]: [{ title: string }, any[]]) => {
        const filteredCourses = allCourses.filter((c: any) => c.title.toLowerCase().includes(title.toLowerCase()));
        return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
      })
    )
  );
  
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap(({ id }) =>
        this.coursesService.getSpecificCourse(id).pipe(
          map((course: any) => CoursesActions.requestSingleCourseSuccess({ course })),
          catchError((error: any) => of(CoursesActions.requestSingleCourseFail({ error })))
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
            CoursesActions.requestDeleteCourseSuccess(),
            CoursesActions.requestAllCourses(),
          ]),
          catchError((error: any) => of(CoursesActions.requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      switchMap(({ id, course }: { id: number, course: any }) =>
        this.coursesService.editCourse(id, course).pipe(
          map((updatedCourse: any) => CoursesActions.requestEditCourseSuccess({ course: updatedCourse })),
          catchError((error: any) => of(CoursesActions.requestEditCourseFail({ error })))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap(({ course }: { course: any }) =>
        this.coursesService.createCourse(course).pipe(
          map((createdCourse: any) => CoursesActions.requestCreateCourseSuccess({ course: createdCourse })),
          catchError((error: any) => of(CoursesActions.requestCreateCourseFail({ error })))
        )
      )
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
      switchMap(() => {
        this.router.navigate(['/courses']);
        return of({ type: 'NO_OP' });
      })
    ),
    { dispatch: false }
  );
}