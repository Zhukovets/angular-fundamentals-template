import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { ApiResponse, Course } from '@app/models/course.model';
import { Author } from '@app/models/author.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {

    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<any[]>([]);
    private authors$$ = new BehaviorSubject<Author[]>([]);
    private course$$ = new BehaviorSubject<any>(null);

    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
    public courses$: Observable<any[]> = this.courses$$.asObservable();
    public authors$:Observable<Author[]> = this.authors$$.asObservable();
    public course$:Observable<any> = this.course$$.asObservable();

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

    createCourse(course: any): Observable<ApiResponse<Course>> {
        return this.coursesService.createCourse(course).pipe(
            tap(newCourse => {
              const currentCourses = this.courses$$.value;
              this.courses$$.next([...currentCourses, newCourse]);
            })
        );
    }

    getCourse(id: string): void {
        this.coursesService.getCourse(id)
        .pipe(
            finalize(() => {
                this.isLoading$$.next(false);
            })
        ).subscribe( {
            next: (course) => {
                this.course$$.next(course.result);
            },
            error: (error) =>{
                console.error('Error at getCourse', error);
            }
        });
    }

    editCourse(id: string, course: Course): Observable<ApiResponse<Course>> {
        return this.coursesService.editCourse(id, course).pipe(
            tap(updatedCourse => {
              const updatedCourses = this.courses$$.value.map(c => c.id === id ? updatedCourse : c);
              this.courses$$.next(updatedCourses);
            })
        );
    }

    deleteCourse(id: string) {
        this.coursesService.deleteCourse(id).pipe(
            tap(() => {
              const filteredCourses = this.courses$$.value.filter(course => course.id !== id);
              this.courses$$.next(filteredCourses);
            })
        ).subscribe();
    }

    filterCourses(value: string): Observable<ApiResponse<Course[]>> {
        this.isLoading$$.next(true);
        return this.coursesService.filterCourses(value).pipe(
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
        );
    }
    

    getAllAuthors() {
        this.coursesService.getAllAuthors()
        .pipe(
            finalize(()=>this.isLoading$$.next(false)))
        .subscribe(
            {
                next:(author)=>{
                    this.authors$$.next(author.result);
                },
                error: (err) => {
                    console.error('Error from getAllAuthors', err);
                }
            }
        );
    }

    createAuthor(name: string): Observable<ApiResponse<Author>> {
        return this.coursesService.createAuthor(name).pipe(
            tap(newAuthor => {
              console.log('Author Created:', newAuthor);
            })
        );
    }

    getAuthorById(id: string) {
        return this.coursesService.getAuthorById(id);
    }

}
