import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    getAll(): Observable<any> | void { // replace 'any' with the required interface and remove 'void'
        // Add your code here
    }

    createCourse(course: any): Observable<any> | void { // replace 'any' with the required interface and remove 'void'
        // Add your code here
    }

    editCourse(id: string, course: any): Observable<any> | void { // replace 'any' with the required interface and remove 'void'
        // Add your code here
    }

    getCourse(id: string): Observable<any> | void { // replace 'any' with the required interface and remove 'void'
        // Add your code here
    }

    deleteCourse(id: string): Observable<any> | void { // replace 'any' with the required interface and remove 'void'
        // Add your code here
    }

    filterCourses(value: string): Observable<any> | void { // replace 'any' with the required interface and remove 'void'
        // Add your code here
    }

    getAllAuthors() {
        // Add your code here
    }

    createAuthor(name: string) {
        // Add your code here
    }

    getAuthorById(id: string) {
        // Add your code here
    }
}
