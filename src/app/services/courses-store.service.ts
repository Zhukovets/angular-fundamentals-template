import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { tap, finalize, map, switchMap, catchError } from 'rxjs/operators';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading$$.asObservable();

  private courses$$ = new BehaviorSubject<any[]>([]);
  public courses$ = this.courses$$.asObservable();

  private authorsMap: Record<string, string> = {};

  constructor(private coursesService: CoursesService) {}

  private setLoading(value: boolean): void {
    this.isLoading$$.next(value);
  }

  getAll(): Observable<any[]> {
    return this.coursesService.getAll().pipe(
      map(res => Array.isArray(res) ? res : (res.result || []))
    );
  }

   fetchAll(): void {
    this.setLoading(true);

    forkJoin({
      coursesRes: this.coursesService.getAll(),
      authorsRes: this.coursesService.getAllAuthors()
    }).pipe(
      map(({ coursesRes, authorsRes }) => {
        const list = Array.isArray(coursesRes) ? coursesRes : (coursesRes.result || []);
        const authorsList = (authorsRes?.result ?? authorsRes) || [];

        this.authorsMap = {};
        for (const a of authorsList) {
          if (a && a.id) {
            this.authorsMap[a.id] = a.name;
          }
        }

        return list.map(course => this.mapCourseAuthors(course));
      }),
      tap(list => this.courses$$.next(list)),
      finalize(() => this.setLoading(false)),
      catchError(() => {
        this.setLoading(false);
        this.courses$$.next([]);
        return of(null);
      })
    ).subscribe();
  }

  createCourse(course: any): Observable<any> {
    this.setLoading(true);
    return this.coursesService.createCourse(course).pipe(
      tap(created => {
        const mapped = this.mapCourseAuthors(created);
        const current = this.courses$$.value || [];
        this.courses$$.next([mapped, ...current]);
      }),
      finalize(() => this.setLoading(false))
    );
  }


  getCourse(id: string): Observable<any> {
    return this.coursesService.getCourse(id).pipe(
      switchMap(course => {
        const actualCourse = course;

        if (Object.keys(this.authorsMap).length > 0) {
          return of(this.mapCourseAuthors(actualCourse));
        }

        return this.coursesService.getAllAuthors().pipe(
          map((authorsRes: any) => {
            const authorsList = (authorsRes?.result ?? authorsRes) || [];
            this.authorsMap = {};
            for (const a of authorsList) {
              if (a && a.id) this.authorsMap[a.id] = a.name;
            }
            return this.mapCourseAuthors(actualCourse);
          })
        );
      })
    );
  }

  editCourse(id: string, course: any): Observable<any> {
    this.setLoading(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap(updated => {
        const mapped = this.mapCourseAuthors(updated);
        const current = (this.courses$$.value || []).map(c => (c && c.id === id) ? mapped : c);
        this.courses$$.next(current);
      }),
      finalize(() => this.setLoading(false))
    );
  }


  deleteCourse(id: string): Observable<any> {
    this.setLoading(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap(() => {
        const current = (this.courses$$.value || []).filter(c => !(c && c.id === id));
        this.courses$$.next(current);
      }),
      finalize(() => this.setLoading(false))
    );
  }

  
  filterCourses(textFragment: string): void {
    this.setLoading(true);
    this.coursesService
      .filterCourses(textFragment)
      .pipe(
        map((response: any) => response?.result ?? response ?? []),
        tap((courses: any[]) => {
          const mapped = (Object.keys(this.authorsMap).length > 0)
            ? courses.map(c => this.mapCourseAuthors(c))
            : courses;
          this.courses$$.next(mapped);
        }),
        finalize(() => this.setLoading(false)),
        catchError(() => {
          this.courses$$.next([]);
          this.setLoading(false);
          return of(null);
        })
      )
      .subscribe();
  }

  getAllAuthors(): Observable<any> {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string): Observable<any> {
    return this.coursesService.createAuthor(name).pipe(
      tap(() => {
        this.authorsMap = {};
      })
    );
  }

  getAuthorById(id: string): Observable<any> {
    return this.coursesService.getAuthorById(id);
  }

  deleteAuthor(id: string): Observable<any> {
    this.setLoading(true);
    return this.coursesService.deleteAuthor(id).pipe(
      tap(() => {
        this.authorsMap = {};
        const current = (this.courses$$.value || []).map(c => {
          if (!c) return c;
          const authorsArr = c.authors ?? [];
          const filtered = (authorsArr || []).filter((aid: any) => aid !== id);
          return { ...c, authors: filtered };
        });
        this.courses$$.next(current);
      }),
      finalize(() => this.setLoading(false)),
      catchError((err) => {
        this.setLoading(false);
        return of(null);
      })
    );
  }

  private mapCourseAuthors(course: any): any {
    if (!course) return course;
    const authorsIds = course.authors ?? [];
    const mappedAuthors = (authorsIds || []).map((aId: string) => this.authorsMap[aId] ?? aId);
    return { ...course, authors: mappedAuthors };
  }
}
