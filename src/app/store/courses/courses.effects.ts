import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';

import * as CoursesActions from '@app/store/courses/courses.actions';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Course } from '@app/features/courses/courses.model';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

  private extractErrorMessage(error: any): string {
    return (error && (error.message || error.error?.message)) ? (error.message || error.error.message) : String(error);
  }

  private sanitizeCourseForApi(course: Partial<Course>): CoursesService['createCourse'] extends (...args: any) => infer R ? Parameters<CoursesService['createCourse']>[0] : any {
    return {
      id: (course.id ?? '').toString(),
      title: course.title ?? '',
      description: course.description ?? '',
      creationDate: course.creationDate ?? '',
      duration: course.duration ?? 0,
      authors: course.authors ?? []
    } as any;
  }

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((response) =>
            CoursesActions.requestAllCoursesSuccess({ courses: response?.result ?? [] })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error: this.extractErrorMessage(error) }))
          )
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesStateFacade.allCourses$),
      map(([action, allCourses]) => {
        const searchValue = (action.title ?? '').trim().toLowerCase();
        const filteredCourses: Course[] = (allCourses ?? []).filter((course) =>
          (course.title ?? '').toLowerCase().includes(searchValue)
        );
        return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
      })
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap(({ id }) =>
        this.coursesService.getCourse(String(id)).pipe(
          map((course: Course) => CoursesActions.requestSingleCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error: this.extractErrorMessage(error) }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      switchMap(({ id }) =>
        this.coursesService.deleteCourse(String(id)).pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error: this.extractErrorMessage(error) }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      switchMap(({ id, course }) => {
        const sanitized = this.sanitizeCourseForApi(course);
        return this.coursesService.editCourse(String(id), sanitized).pipe(
          map((updatedCourse: Course) =>
            CoursesActions.requestEditCourseSuccess({ course: updatedCourse })
          ),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error: this.extractErrorMessage(error) }))
          )
        );
      })
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap(({ course }) => {
        const sanitized = this.sanitizeCourseForApi(course);
        return this.coursesService.createCourse(sanitized).pipe(
          map((createdCourse: Course) =>
            CoursesActions.requestCreateCourseSuccess({ course: createdCourse })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error: this.extractErrorMessage(error) }))
          )
        );
      })
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
        tap(() => {
          void this.router.navigate(['/courses']);
        })
      ),
    { dispatch: false }
  );
}
