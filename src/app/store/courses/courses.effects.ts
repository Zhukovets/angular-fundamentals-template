import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { CoursesService } from '@app/services/courses.service';
import * as CoursesActions from './courses.actions';
import { Router } from '@angular/router';
import { CoursesStateFacade } from './courses.facade';
import { Course } from '@app/models/course.model'; // Ensure this import exists

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesFacade: CoursesStateFacade,
    private store: Store,
    private router: Router
  ) {}

  // Effect to get all courses
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map(courses => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError(error => of(CoursesActions.requestAllCoursesFail({ error })))
        )
      )
    )
  );

  // Effect to get filtered courses
  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesFacade.allCourses$),
      switchMap(([action, allCourses]) => {
        const filteredCourses = allCourses.filter(course =>
          course.name.includes(action.searchValue)
        );
        return of(CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses }));
      })
    )
  );

  // Effect to get a specific course
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSpecificCourse), // Change from getSpecificCourse to requestSpecificCourse
      switchMap(action =>
        this.coursesService.getSpecificCourse(action.courseId).pipe(
          map(course => CoursesActions.requestSingleCourseSuccess({ course })),
          catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
        )
      )
    )
  );

  // Effect to delete a course
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      switchMap(action =>
        this.coursesService.deleteCourse(action.courseId).pipe(
          map(() => CoursesActions.requestAllCourses()),
          catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  // Effect to edit a course
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      switchMap(action =>
        this.coursesService.editCourse(action.course.id, action.course).pipe(
          map(() => CoursesActions.requestEditCourseSuccess({ course: action.course })), // Pass course in success action
          catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
        )
      )
    )
  );

  // Effect to create a course
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap(action =>
        this.coursesService.createCourse(action.course).pipe(
          map(() => CoursesActions.requestCreateCourseSuccess({ course: action.course })), // Pass course in success action
          catchError(error => of(CoursesActions.requestCreateCourseFail({ error })))
        )
      )
    )
  );

  // Effect to handle navigation after course actions (create/edit)
  redirectToTheCoursesPage$ = createEffect(
    () =>
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
    { dispatch: false }
  );
}