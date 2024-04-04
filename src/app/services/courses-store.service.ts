import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, from, map, tap } from 'rxjs';
import { CoursesService } from './courses.service';
import { Course } from '@app/shared/models/course';
import { Author } from '@app/shared/models/author';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {

    private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

    constructor(private courseService: CoursesService) { }

    get isLoading$(): Observable<boolean> {
        return this.isLoading$$.asObservable();
    }

    get courses$(): Observable<Course[]> {
        return this.courses$$.asObservable();
    }

    getAll() {
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.getAll().pipe(
            tap((courses: Course[]) => {
                this.isLoading$$.next(false);
                this.courses$$.next(courses);
            })
        );
    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.createCourse(course).pipe(tap(() => this.isLoading$$.next(false)));
    }

    getCourse(id: string) {
        // Add your code here
        if (!id) return from([]);

        return this.courseService.getCourse(id);
    }

    editCourse(id: string | undefined, course: Course) { // replace 'any' with the required interface
        // Add your code here
        if (!id) { return from([]) };
        this.isLoading$$.next(true);
        return this.courseService.editCourse(id, course).pipe(tap(() => this.isLoading$$.next(false)));
    }

    deleteCourse(id: string | undefined) {
        if (!id) { return from([false]); }
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.deleteCourse(id).pipe(tap((deleted: boolean) => {
            if (deleted) {
                const courses = this.courses$$.value;
                courses.splice(courses.findIndex(c => c.id == id), 1);
                this.courses$$.next(courses);
            }
        }));
    }

    filterCourses(value: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.filterCourses(value).pipe(
            tap((courses: Course[]) => {
                this.isLoading$$.next(false);
                this.courses$$.next(courses);
            })
        );
    }

    getAllAuthors(): Observable<Author[]> {
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.getAllAuthors().pipe(tap(() => this.isLoading$$.next(false)));
    }

    createAuthor(name: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.createAuthor(name).pipe(tap(() => this.isLoading$$.next(false)));
    }

    deleteAuthor(name: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.deleteAuthor(name).pipe(tap(() => this.isLoading$$.next(false)));
    }

    getAuthorById(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.getAuthorById(id).pipe(tap(value => {
            this.isLoading$$.next(false);
        }));
    }
}