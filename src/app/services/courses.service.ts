import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { Course } from '@app/models/course.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private apiUrl=`http://localhost:4000`
    
    constructor(private http: HttpClient){}

    getAll(): Observable<any> {
        return this.http.get(`${this.apiUrl}/courses/all`);
        // Add your code here
    }

    createCourse(course: Course): Observable<Course> { // replace 'any' with the required interface
        return this.http.post<Course>(`${this.apiUrl}/courses/add`, course)
        // Add your code here
    }

    editCourse(id: string, course: Course): Observable<Course> { // replace 'any' with the required interface
        return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course)
        // Add your code here
    }

    getCourse(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/courses/${id}`)
        // Add your code here
    }

    deleteCourse(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/courses/${id}`)
        // Add your code here
    }

    
    filterCourses(value: string): Observable<any> {
        const makeRequest = (paramName: string): Observable<any> => {
            const params: any = {};
            params[paramName] = value;
            return this.http.get(`${this.apiUrl}/courses/filter`, { params });
        };
    
        return makeRequest('title').pipe(
            switchMap(response => response.result.length ? of(response) : makeRequest('description')),
            switchMap(response => response.result.length ? of(response) : makeRequest('duration')),
            switchMap(response => response.result.length ? of(response) : makeRequest('creationDate')),
        );
        // Add your code here */
    }
        
   
    getAllAuthors(): Observable<any> {
        return this.http.get(`${this.apiUrl}/authors/all`);
        // Add your code here
    }

    createAuthor(name: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/authors/add`, { name });
        // Add your code here
    }

    getAuthorById(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/authors/${id}`)
        // Add your code here
    }
}
