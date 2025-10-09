import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import {
  CoursesService,
  Course,
  Author,
  CreateCourseRequest,
} from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((courses) => this.courses$$.next(courses));
  }

  createCourse(course: CreateCourseRequest): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap(() => this.getAll()),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  getCourse(id: string): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService
      .getCourse(id)
      .pipe(finalize(() => this.isLoading$$.next(false)));
  }

  editCourse(id: string, course: CreateCourseRequest): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap(() => this.getAll()),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  deleteCourse(id: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap(() => this.getAll()),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  filterCourses(value: string): void {
    this.isLoading$$.next(true);
    this.coursesService
      .filterCourses(value)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((courses) => this.courses$$.next(courses));
  }

  getAllAuthors(): void {
    this.isLoading$$.next(true);
    this.coursesService
      .getAllAuthors()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe((authors) => this.authors$$.next(authors));
  }

  createAuthor(name: string): Observable<Author> {
    this.isLoading$$.next(true);
    return this.coursesService.createAuthor(name).pipe(
      tap(() => this.getAllAuthors()),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  getAuthorById(id: string): Observable<Author> {
    this.isLoading$$.next(true);
    return this.coursesService
      .getAuthorById(id)
      .pipe(finalize(() => this.isLoading$$.next(false)));
  }
}
