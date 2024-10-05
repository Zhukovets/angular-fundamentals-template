import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
  switchMap,
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
} from "./courses.actions";
import { CoursesStateFacade } from "./courses.facade";
import { Course } from "@app/models/course.model";
@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade
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
}
