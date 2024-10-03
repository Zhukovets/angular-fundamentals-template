import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, forkJoin, map, Observable, tap} from 'rxjs';
import {
    Author, CreateCourseRequest, CreateCourseResponse,
    UpdateCourseRequest, CardItem, CourseResponse
} from '@app/models/card.model';
import {CoursesService} from '@app/services/courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {

    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<CardItem[]>([] as CardItem[]);

    public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
    public courses$: Observable<CardItem[]> = this.courses$$.asObservable();

    constructor(private coursesService: CoursesService) {}

    getAll() {
        this.isLoading$$.next(true);
        combineLatest([
            this.coursesService.getAll(),
            this.coursesService.getAllAuthors()
        ]).pipe(
            map(([{ result: courses }, { result: authors }]) => {
                const authorsMap = authors.reduce((acc, author) => {
                    acc[author.id] = author.name;
                    return acc;
                }, {} as { [key: string]: string });

                return courses.map(course => ({
                    ...course,
                    authors: course.authors.map(authorId => authorsMap[authorId] || authorId)
                }));
            }),
            tap(() => this.isLoading$$.next(false)),
        ).subscribe({
            next: (courses) => this.courses$$.next(courses),
            error: (err) => {
                console.error('Error getting course:', err);
                this.isLoading$$.next(false);
            }
        });
    }

    createCourse(course: CreateCourseRequest) {
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course).pipe(
            tap(() => this.isLoading$$.next(false)),
        ).subscribe({
            next: (response: CreateCourseResponse) => {
                if (response.successful) {
                    console.log(response);
                }
            },
            error: (err) => {
                console.error('Error creating course:', err);
                this.isLoading$$.next(false);
            }
        });
    }

    getCourseWithAuthors(id: string): Observable<any> {
        return forkJoin([this.coursesService.getCourse(id), this.coursesService.getAllAuthors()]).pipe(
            map(([course, authors]) => {
                let courseAuthors = authors.result.filter((author: Author) => course.result.authors.includes(author.id))
                let availableAuthors = authors.result.filter((author: Author) => !course.result.authors.includes(author.id))
                return {course: course.result, authors: availableAuthors, courseAuthors: courseAuthors};
            })
        )
    }

    getCourse(id: string): Observable<CourseResponse> {
        return this.coursesService.getCourse(id);
    }

    editCourse(id: string, course: UpdateCourseRequest) {
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course).pipe(
            tap(() => this.isLoading$$.next(false)),
        ).subscribe({
            next: (response: any) => {
                if (response.successful) {
                    console.log(response);
                }
            },
            error: (err) => {
                console.error('Error editing course:', err);
                this.isLoading$$.next(false);
            }
        });
    }

    deleteCourse(id: string) {
        return this.coursesService.deleteCourse(id);
    }

    filterCourses(value: string) {
        this.isLoading$$.next(true);
        combineLatest([
            this.coursesService.getAll(),
            this.coursesService.getAllAuthors()
        ]).pipe(
            map(([{ result: courses }, { result: authors }]) => {
                const authorsMap = authors.reduce((acc, author) => {
                    acc[author.id] = author.name;
                    return acc;
                }, {} as { [key: string]: string });

                return courses.map(course => ({
                    ...course,
                    authors: course.authors.map(authorId => authorsMap[authorId] || authorId)
                }));
            })
        ).subscribe({
            next: (response) => {
                return this.courses$$.next(response)
            },
            error: () => this.isLoading$$.next(false)
        })
    }

    getAllAuthors() {
        return this.coursesService.getAllAuthors()
    }

    createAuthor(name: string) {
        return this.coursesService.createAuthor(name);
    }

    getAuthorById(id: string) {
        return this.coursesService.getAuthorById(id);
    }
}
