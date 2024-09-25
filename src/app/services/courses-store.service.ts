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
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable(); // Observable for loading state

  constructor(private coursesService: CoursesService) {}

  getAll(): Observable<Course[]> {
    this.loadingSubject.next(true); // Set loading to true
    return this.coursesService.getAll().pipe(
      tap(() => this.loadingSubject.next(false)), // Set loading to false after fetching
      catchError(() => {
        this.loadingSubject.next(false); // Set loading to false on error
        return throwError("Error fetching courses");
      })
    );
  }

  createCourse(course: Course): Observable<Course> {
    this.loadingSubject.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(() => {
        this.loadingSubject.next(false);
        return throwError("Error creating course");
      })
    );
  }

  getCourse(id: string): Observable<Course> {
    this.loadingSubject.next(true);
    return this.coursesService.getCourse(id).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(() => {
        this.loadingSubject.next(false);
        return throwError("Error fetching course");
      })
    );
  }

  editCourse(id: string, course: Course): Observable<Course> {
    this.loadingSubject.next(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(() => {
        this.loadingSubject.next(false);
        return throwError("Error editing course");
      })
    );
  }

  deleteCourse(id: string): Observable<void> {
    this.loadingSubject.next(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(() => {
        this.loadingSubject.next(false);
        return throwError("Error deleting course");
      })
    );
  }

  filterCourses(value: string): Observable<Course[]> {
    this.loadingSubject.next(true);
    return this.coursesService.filterCourses(value).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(() => {
        this.loadingSubject.next(false);
        return throwError("Error filtering courses");
      })
    );
  }

  getAllAuthors(): Observable<Author[]> {
    this.loadingSubject.next(true);
    return this.coursesService.getAllAuthors().pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(() => {
        this.loadingSubject.next(false);
        return throwError("Error fetching authors");
      })
    );
  }

  createAuthor(name: string): Observable<Author> {
    this.loadingSubject.next(true);
    return this.coursesService.createAuthor(name).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(() => {
        this.loadingSubject.next(false);
        return throwError("Error creating author");
      })
    );
  }

  getAuthorById(id: string): Observable<Author> {
    this.loadingSubject.next(true);
    return this.coursesService.getAuthorById(id).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(() => {
        this.loadingSubject.next(false);
        return throwError("Error fetching author");
      })
    );
  }
}
