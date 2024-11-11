import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { tap } from 'rxjs/operators'
import { Course } from '@app/models/course.model';


@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<Course[]>([]);

    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable()
    public courses$: Observable<Course[]> = this.courses$$.asObservable()

    constructor(private coursesService: CoursesService){}

    private setLoading(isLoading: boolean): void {
        this.isLoading$$.next(isLoading);
    }

    getAll(): void{
        this.setLoading(true);
        this.coursesService.getAll().pipe(
            tap(courses => {
                this.courses$$.next(courses);
                this.setLoading(false);
      })
    ).subscribe();
        // Add your code here
    }

    createCourse(course: Course): void { // replace 'any' with the required interface
        this.setLoading(true);
        this.coursesService.createCourse(course).pipe(
          tap(() => {
            this.getAll();
          })
        ).subscribe();
        // Add your code here
    }

    getCourse(id: string): Observable<any> {
        // Add your code here
        return this.coursesService.getCourse(id)
    }

    editCourse(id: string, course: Course): void { // replace 'any' with the required interface
        this.setLoading(true);
        this.coursesService.editCourse(id, course).pipe(
            tap(() => {
                this.getAll();
      })
    ).subscribe();
        // Add your code here
    }

    deleteCourse(id: string): void {
        this.setLoading(true);
        this.coursesService.deleteCourse(id).pipe(
            tap(() => {
                this.getAll()
            })
        ).subscribe();
        // Add your code here
    }

    filterCourses(value: string): void {
        this.setLoading(true);
        this.coursesService.filterCourses(value).pipe(
            tap(courses => {
                this.courses$$.next(courses);
                this.setLoading(false);
            })
        ).subscribe();
        // Add your code here
    }

    getAllAuthors(): void {
        this.setLoading(true);
        this.coursesService.getAllAuthors().pipe(
            tap(() => {
                this.setLoading(false);
            })
        ).subscribe()
        // Add your code here
    }

    createAuthor(name: string): void {
        this.setLoading(true);
        this.coursesService.createAuthor(name).pipe(
            tap(() => {
                this.getAllAuthors();
            })
        ).subscribe()
        // Add your code here
    }

    getAuthorById(id: string): Observable<any> {
        return this.coursesService.getAuthorById(id)
        // Add your code here
    }
}
