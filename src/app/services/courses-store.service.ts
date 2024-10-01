import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse, Course } from '@app/models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {

    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<any[]>([]);

    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
    public courses$: Observable<any[]> = this.courses$$.asObservable();

    constructor(private coursesService: CoursesService){}

    getAll(): void{
        this.isLoading$$.next(true);
        this.coursesService.getAll().pipe(
            tap(courses => {
                this.courses$$.next(courses.result);
                this.isLoading$$.next(false);
            })
        ).subscribe();
    }

    createCourse(course: any) {
        this.coursesService.createCourse(course).pipe(
            tap(newCourse => {
              const currentCourses = this.courses$$.value;
              this.courses$$.next([...currentCourses, newCourse]);
            })
        ).subscribe();
    }

    getCourse(id: string): Observable<ApiResponse<Course>> {
        return this.coursesService.getCourse(id);
    }

    editCourse(id: string, course: any) {
        this.coursesService.editCourse(id, course).pipe(
            tap(updatedCourse => {
              const updatedCourses = this.courses$$.value.map(c => c.id === id ? updatedCourse : c);
              this.courses$$.next(updatedCourses);
            })
        ).subscribe();
    }

    deleteCourse(id: string) {
        this.coursesService.deleteCourse(id).pipe(
            tap(() => {
              const filteredCourses = this.courses$$.value.filter(course => course.id !== id);
              this.courses$$.next(filteredCourses);
            })
        ).subscribe();
    }

    filterCourses(value: string) {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value).pipe(
            tap((response: ApiResponse<Course[]>) => {
                if (response.successful && response.result) {
                    this.courses$$.next(response.result);
                } else {
                    console.error('Filtering courses failed:', response);
                }
                this.isLoading$$.next(false);
            }),
            catchError(error => {
                console.error('Error filtering courses:', error);
                this.isLoading$$.next(false);
                return throwError(error);
            })
        ).subscribe();
    }
    

    getAllAuthors() {
        return this.coursesService.getAllAuthors();
    }

    createAuthor(name: string) {
        this.coursesService.createAuthor(name).pipe(
            tap(newAuthor => {
              console.log('Author Created:', newAuthor);
            })
        ).subscribe();
        }

    getAuthorById(id: string) {
        return this.coursesService.getAuthorById(id);
    }

}
