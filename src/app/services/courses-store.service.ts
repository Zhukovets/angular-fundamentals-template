import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  private courses$$ = new BehaviorSubject<any[]>([]);
  public courses$: Observable<any[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {

    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getAll().pipe(
      tap((courses) => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false);
      })
    );
  }

  createCourse(course: any) { // replace 'any' with the required interface
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap(() => {
        this.getAll().subscribe(); 
        this.isLoading$$.next(false);
      })
    );
  }

  getCourse(id: string): Observable<any> {
    // Add your code here
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: any) { // replace 'any' with the required interface
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap(() => {
        this.getAll().subscribe(); 
        this.isLoading$$.next(false);
      })
    );
  }

  deleteCourse(id: string) {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap(() => {
        this.getAll().subscribe(); 
        this.isLoading$$.next(false);
      })
    );
  }

  filterCourses(value: string) {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.filterCourses(value).pipe(  
      tap((filteredCourses) => {
        this.courses$$.next(filteredCourses);
        this.isLoading$$.next(false);
      })
    );
  }

  getAllAuthors() {
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.getAllAuthors().pipe(
      tap(() => {
        this.isLoading$$.next(false);
      })
    );
  }

  createAuthor(name: string) {  
    // Add your code here
    this.isLoading$$.next(true);
    return this.coursesService.createAuthor(name).pipe(  
      tap(() => {
        this.getAllAuthors().subscribe(); 
        this.isLoading$$.next(false);
      })
    );
  }
  
}