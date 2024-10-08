import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { Router } from "@angular/router";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { CoursesService } from "@app/services/courses.service";
import {
  requestAllCourses,
  requestAllCoursesSuccess,
  requestAllCoursesFail,
  requestFilteredCourses,
  requestFilteredCoursesSuccess,
  requestFilteredCoursesFail,
  requestSingleCourse,
  requestSingleCourseSuccess,
  requestSingleCourseFail,
  requestDeleteCourse,
  requestDeleteCourseFail,
  requestEditCourse,
  requestEditCourseSuccess,
  requestEditCourseFail,
  requestCreateCourse,
  requestCreateCourseSuccess,
  requestCreateCourseFail,
} from "./courses.actions";
import { CoursesStateFacade } from "./courses.facade";
import { Course } from "@app/models/course.model";
@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) => requestAllCoursesSuccess({ courses })),
          catchError((error) => of(requestAllCoursesFail({ error })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestFilteredCourses),
      withLatestFrom(this.coursesStateFacade.allCourses$),
      switchMap(([action, courses]) => {
        const filteredCourses = this.filterCourses(courses, action.title);
        return filteredCourses.length > 0
          ? of(requestFilteredCoursesSuccess({ courses: filteredCourses }))
          : of(
              requestFilteredCoursesFail({
                error: new Error("No courses found"),
              })
            );
      }),
      catchError((error) => of(requestFilteredCoursesFail({ error })))
    )
  );

  private filterCourses(courses: any, searchValue: string): Course[] {
    return courses.filter((course: { title: string }) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  getSpecificCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestSingleCourse),
      switchMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((course: Course) => requestSingleCourseSuccess({ course })),
          catchError((error) => of(requestSingleCourseFail({ error })))
        )
      )
    )
  );

  deleteCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestDeleteCourse),
      switchMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() => requestAllCourses()),
          catchError((error) => of(requestDeleteCourseFail({ error })))
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestEditCourse),
      switchMap((action) =>
        this.coursesService.editCourse(action.id, action.body).pipe(
          map((course: Course) => requestEditCourseSuccess({ course })),
          catchError((error) => of(requestEditCourseFail({ error })))
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestCreateCourse),
      switchMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((course: Course) => requestCreateCourseSuccess({ course })),
          catchError((error) => of(requestCreateCourseFail({ error })))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          requestCreateCourseSuccess,
          requestEditCourseSuccess,
          requestSingleCourseFail
        ),
        tap(() => this.router.navigate(["/courses"]))
      ),
    { dispatch: false }
  );
}
