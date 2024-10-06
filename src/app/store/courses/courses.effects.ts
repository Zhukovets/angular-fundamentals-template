import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import * as CoursesActions from "./courses.actions";
import { CoursesService } from "src/app/services/courses.service";
import { Router } from "@angular/router";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  // Effect to get all courses
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) =>
            CoursesActions.requestAllCoursesSuccess({ courses })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  // Effect to get single course
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map((course) =>
            CoursesActions.requestSingleCourseSuccess({ course })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  // Effect for filtering courses
  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      switchMap(({ title }) =>
        this.coursesService.filterCourses(title).pipe(
          map((courses) =>
            CoursesActions.requestFilteredCoursesSuccess({ courses })
          ),
          catchError((error) =>
            of(CoursesActions.requestFilteredCoursesFail({ error }))
          )
        )
      )
    )
  );

  // Effect to delete course
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => CoursesActions.requestAllCourses()), // Trigger a refresh after deletion
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  // Effect to edit course
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(({ id, course }) =>
        this.coursesService.getCourse(id).pipe(
          mergeMap((existingCourse) => {
            const updatedCourse = { ...existingCourse, ...course }; // Merge partial course with existing course
            return this.coursesService.editCourse(id, updatedCourse).pipe(
              map((updatedCourse) =>
                CoursesActions.requestEditCourseSuccess({
                  course: updatedCourse,
                })
              ),
              catchError((error) =>
                of(CoursesActions.requestEditCourseFail({ error }))
              )
            );
          })
        )
      )
    )
  );
  // Effect to create a course
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map((newCourse) =>
            CoursesActions.requestCreateCourseSuccess({ course: newCourse })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  // Redirect effect after successful creation or editing
  redirectToCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess
        ),
        tap(() => {
          // Use router to navigate back to courses page
          this.router.navigate(["/courses"]);
        })
      ),
    { dispatch: false }
  );
}
