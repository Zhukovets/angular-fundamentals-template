import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { CoursesService } from "./courses.service";
import { Course } from "@app/shared/models/course.model";
import { Author } from "@app/shared/models/author.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  // BehaviorSubjects to manage state
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);

  // Public Observables for external access
  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  // Fetch all courses and update state
  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(
        tap((courses) => {
          this.courses$$.next(courses);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          console.error("Failed to load courses", error);
          this.isLoading$$.next(false);
          return of([]);
        })
      )
      .subscribe();
  }

  // Create a course and update state
  createCourse(course: Course): void {
    this.isLoading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(
        tap((newCourse) => {
          const currentCourses = this.courses$$.getValue();
          this.courses$$.next([...currentCourses, newCourse]);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          console.error("Failed to create course", error);
          this.isLoading$$.next(false);
          return of(null);
        })
      )
      .subscribe();
  }

  // Edit an existing course and update state (based on title or other unique properties)
  editCourse(title: string, updatedCourse: Course): void {
    this.isLoading$$.next(true);
    this.coursesService
      .editCourse(title, updatedCourse)
      .pipe(
        tap(() => {
          const currentCourses = this.courses$$
            .getValue()
            .map((c) => (c.title === title ? updatedCourse : c));
          this.courses$$.next(currentCourses);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          console.error("Failed to edit course", error);
          this.isLoading$$.next(false);
          return of(null);
        })
      )
      .subscribe();
  }

  // Get course details by title (or other unique property)
  getCourse(title: string): Observable<Course | null> {
    return this.coursesService.getCourse(title).pipe(
      catchError((error) => {
        console.error("Failed to load course", error);
        return of(null);
      })
    );
  }

  // Delete a course and update state (based on title or other unique property)
  deleteCourse(title: string): void {
    this.isLoading$$.next(true);
    this.coursesService
      .deleteCourse(title)
      .pipe(
        tap(() => {
          const currentCourses = this.courses$$
            .getValue()
            .filter((c) => c.title !== title);
          this.courses$$.next(currentCourses);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          console.error("Failed to delete course", error);
          this.isLoading$$.next(false);
          return of(null);
        })
      )
      .subscribe();
  }

  // Filter courses based on search value
  filterCourses(value: string): void {
    this.isLoading$$.next(true);
    this.coursesService
      .filterCourses(value)
      .pipe(
        tap((filteredCourses) => {
          this.courses$$.next(filteredCourses);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          console.error("Failed to filter courses", error);
          this.isLoading$$.next(false);
          return of([]);
        })
      )
      .subscribe();
  }

  // Fetch all authors
  getAllAuthors(): Observable<Author[]> {
    return this.coursesService.getAllAuthors().pipe(
      catchError((error) => {
        console.error("Failed to load authors", error);
        return of([]);
      })
    );
  }

  // Create an author
  createAuthor(name: string): Observable<Author | null> {
    return this.coursesService.createAuthor(name).pipe(
      catchError((error) => {
        console.error("Failed to create author", error);
        return of(null);
      })
    );
  }

  // Get an author by name
  getAuthorById(name: string): Observable<Author | null> {
    return this.coursesService.getAuthorById(name).pipe(
      catchError((error) => {
        console.error("Failed to load author", error);
        return of(null);
      })
    );
  }
}
