import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, catchError, of, withLatestFrom, tap } from "rxjs";
import { CoursesService } from "@app/services/courses.service";
import * as CoursesActions from "./courses.actions";
import { CoursesStateFacade } from "./courses.facade";
import { Router } from "@angular/router";

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
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() =>
        this.coursesService.getAll().pipe(
          map((response) =>
            CoursesActions.requestAllCoursesSuccess({
              courses: response.result,
            })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error: error.message }))
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
        const filtered = (allCourses ?? []).filter((course) =>
          course.title.toLowerCase().includes(action.title.toLowerCase())
        );
        return CoursesActions.requestFilteredCoursesSuccess({
          courses: filtered,
        });
      })
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((response) =>
            CoursesActions.requestSingleCourseSuccess({
              course: response.result,
            })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error: error.message }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map(() =>
            CoursesActions.requestDeleteCourseSuccess({ id: action.id })
          ),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error: error.message }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((response) =>
            CoursesActions.requestEditCourseSuccess({ course: response.result })
          ),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error: error.message }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((response) =>
            CoursesActions.requestCreateCourseSuccess({
              course: response.result,
            })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error: error.message }))
          )
        )
      )
    )
  );

  createCourseSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourseSuccess),
      map(() => CoursesActions.requestAllCourses())
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
        tap(() => this.router.navigate(["/courses"]))
      ),
    { dispatch: false }
  );

  getAllAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllAuthors),
      mergeMap(() =>
        this.coursesService.getAllAuthors().pipe(
          map((response) =>
            CoursesActions.requestAllAuthorsSuccess({
              authors: response.result,
            })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllAuthorsFail({ error: error.message }))
          )
        )
      )
    )
  );

  createAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateAuthor),
      mergeMap((action) =>
        this.coursesService.createAuthor(action.name).pipe(
          map((response) =>
            CoursesActions.requestCreateAuthorSuccess({
              author: response.result,
            })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateAuthorFail({ error: error.message }))
          )
        )
      )
    )
  );
}
