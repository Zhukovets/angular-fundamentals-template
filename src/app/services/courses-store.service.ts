import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading$$.asObservable();

  private courses$$ = new BehaviorSubject<any[]>([]);
  public courses$ = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  private setLoading(value: boolean): void {
    this.isLoading$$.next(value);
  }

  getAll(): Observable<any[]> {
    this.isLoading$$.next(true);
    return this.coursesService.getAll().pipe(
      map(res => Array.isArray(res) ? res : (res.result || [])),
      tap(list => this.courses$$.next(list)),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  fetchAll(): void {
    this.getAll().subscribe({
      next: () => {},
      error: () => { this.isLoading$$.next(false); }
    });
  }

  createCourse(course: any): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap(created => {
        const current = this.courses$$.value || [];
        this.courses$$.next([created, ...current]);
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  getCourse(id: string): Observable<any> {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: any): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap(updated => {
        const current = (this.courses$$.value || []).map(c => (c && c.id === id) ? updated : c);
        this.courses$$.next(current);
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  deleteCourse(id: string): Observable<any> {
    this.isLoading$$.next(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap(() => {
        const current = (this.courses$$.value || []).filter(c => !(c && c.id === id));
        this.courses$$.next(current);
      }),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  filterCourses(textFragment: string): void {
    this.setLoading(true);
    this.coursesService
      .filterCourses(textFragment)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (courses) => this.courses$$.next(courses),
        error: () => this.courses$$.next([]),
      });
  }

  getAllAuthors(): Observable<any> {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string): Observable<any> {
    return this.coursesService.createAuthor(name);
  }

  getAuthorById(id: string): Observable<any> {
    return this.coursesService.getAuthorById(id);
  }
}