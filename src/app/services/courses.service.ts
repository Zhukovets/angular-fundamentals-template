import { Injectable } from '@angular/core';
import { CoursesBackendService } from './coursesbackend.service';
import { Course } from '@app/shared/models/course';
import { BehaviorSubject, Observable, concatMap, forkJoin, from, map, mergeMap, tap } from 'rxjs';
import { Author } from '@app/shared/models/author';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private courseBackend: CoursesBackendService) {
    }

    getAll(): Observable<Course[]> {
        // Add your code here
        return this.courseBackend.get<Course[]>('/courses/all').pipe(
            map((response: any) => {
                if (response.successful) {
                    return response.result;
                }
                return [];
            })
        );
    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        return this.courseBackend.post(`/courses/add`, course).pipe(
            map((response: any) => {
                if (response.successful) {
                    return response.result;
                }
                return [];
            })
        );
    }

    editCourse(id: string, course: Course) { // replace 'any' with the required interface
        // Add your code here
        console.log(id)
        console.log(course)
        return this.courseBackend.put(`/courses/${id}`, course).pipe(map((response: any) => response.successful));
    }

    getCourse(id: string) {
        // Add your code here
        return this.courseBackend.get(`/courses/${id}`).pipe(
            map((response: any) => {
                if (response.successful) {
                    return response.result;
                }
                return null;
            })
        );
    }

    deleteCourse(id: string) {
        // Add your code here
        return this.courseBackend.delete(`/courses/${id}`).pipe(map((response: any) => response.successful));
    }

    filterCourses(query: string) {
        // Add your code here
        return this.courseBackend.get(`/courses/filter?` + query).pipe(
            map((response: any) => {
                if (response.successful) {
                    return response.result;
                }
                return [];
            })
        );
    }

    getAllAuthors(): Observable<Author[]> {
        // Add your code here
        return this.courseBackend.get(`/authors/all`).pipe(
            map((response: any) => {
                if (response.successful) {
                    return response.result;
                }
                return [];
            })
        );
    }

    createAuthor(name: string) {
        // Add your code here
        return this.courseBackend.post(`/authors/add`, { name }).pipe(
            map((response: any) => {
                if (response.successful) {
                    return response.result;
                }
                return [];
            })
        );
    }

    deleteAuthor(name: string) {
        // Add your code here
        return this.courseBackend.delete(`/authors/${name}`).pipe(map((response: any) => response.successful));
    }

    getAuthorById(id: string): Observable<Author> {
        // Add your code here
        return this.courseBackend.get(`/authors/${id}`).pipe(
            map((response: any) => {
                if (response.successful) {
                    return response.result;
                }
                return {};
            })
        );;
    }
}