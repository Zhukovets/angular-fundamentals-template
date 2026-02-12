import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CoursesService, Course, CreateCourseDto, Author } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<Course[]>([]);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<Course[]> = this.courses$$.asObservable();

  constructor(private api: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.api.getAll()
      .pipe(
        tap(courses => this.courses$$.next(courses)),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  getCourse(id: string) {
    return this.api.getCourse(id);
  }

  createCourse(dto: CreateCourseDto): void {
    this.isLoading$$.next(true);
    this.api.createCourse(dto)
      .pipe(
        tap(() => this.getAll()),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  editCourse(id: string, dto: CreateCourseDto): void {
    this.isLoading$$.next(true);
    this.api.editCourse(id, dto)
      .pipe(
        tap(() => this.getAll()),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  deleteCourse(id: string): void {
    this.isLoading$$.next(true);
    this.api.deleteCourse(id)
      .pipe(
        tap(() => this.getAll()),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  filterCourses(text: string): void {
    this.isLoading$$.next(true);
    this.api.filterCourses(text)
      .pipe(
        tap(courses => this.courses$$.next(courses)),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  getAllAuthors(): Observable<Author[]> {
    return this.api.getAllAuthors();
  }

  getAuthorById(id: string): Observable<Author> {
    return this.api.getAuthorById(id);
  }

  createAuthor(name: string): Observable<Author> {
    return this.api.createAuthor(name);
  }
}
