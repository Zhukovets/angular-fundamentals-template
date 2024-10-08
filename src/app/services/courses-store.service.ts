import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { CoursesService } from "./courses.service";
import { Course } from "@app/models/course.model";
import { Author } from "@app/models/author.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<Course[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    this.coursesService.getAll().subscribe((course) => {});
  }

  createCourse(course: Course): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap((newCourse: Course) => {
        const updatedCourses = [...this.courses$$.value, newCourse];
        this.courses$$.next(updatedCourses); // Update courses state
        this.isLoading$$.next(false);
      }),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError("Error creating course");
      })
    );
  }

  getCourse(id: string): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.getCourse(id).pipe(
      tap(() => this.isLoading$$.next(false)),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError("Error fetching course");
      })
    );
  }

  editCourse(id: string, course: Course): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap((updatedCourse: Course) => {
        const courses = this.courses$$.value.map((c) =>
          c.id === id ? updatedCourse : c
        );
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      }),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError("Error editing course");
      })
    );
  }

  deleteCourse(id: string): Observable<void> {
    this.isLoading$$.next(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap(() => {
        const updatedCourses = this.courses$$.value.filter((c) => c.id !== id);
        this.courses$$.next(updatedCourses);
        this.isLoading$$.next(false);
      }),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError("Error deleting course");
      })
    );
  }

  filterCourses(value: string): Observable<Course[]> {
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(value).pipe(
      tap((filteredCourses: Course[]) => {
        this.courses$$.next(filteredCourses);
        this.isLoading$$.next(false);
      }),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError("Error filtering courses");
      })
    );
  }

  getAllAuthors() {
    this.isLoading$$.next(true);
  }

  createAuthor(name: string): Observable<Author> {
    this.isLoading$$.next(true);
    return this.coursesService.createAuthor(name).pipe(
      tap(() => this.isLoading$$.next(false)),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError("Error creating author");
      })
    );
  }

  getAuthorById(id: string): Observable<Author> {
    this.isLoading$$.next(true);
    return this.coursesService.getAuthorById(id).pipe(
      tap(() => this.isLoading$$.next(false)),
      catchError(() => {
        this.isLoading$$.next(false);
        return throwError("Error fetching author");
      })
    );
  }

  searchCourses(query: string) {
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(query).pipe(
      tap((filteredCourses: Course[]) => {
        this.courses$$.next(filteredCourses);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.isLoading$$.next(false);
        return throwError("Error filtering courses");
      })
    );
  }
}
