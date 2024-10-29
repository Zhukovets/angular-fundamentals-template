import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private apiUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        // Add your code here
        return this.http.get(`${this.apiUrl}`);

    }

    createCourse(course: any): Observable<any> { // replace 'any' with the required interface
        // Add your code here
        return this.http.post(`${this.apiUrl}`, course);
    }

    editCourse(id: string, course: any): Observable<any> { // replace 'any' with the required interface
        // Add your code here
        return this.http.put(`${this.apiUrl}/${id}`, course);
    }

    getCourse(id: string): Observable<any> {
        // Add your code here
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    deleteCourse(id: string): Observable<any> {
        // Add your code here
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    filterCourses(filter: string): Observable<any> {
        // Add your code here
        return this.http.get(`${this.apiUrl}?filter=${filter}`);
    }

    getAllAuthors(): Observable<any> {
        // Add your code here
        return this.http.get(`${this.apiUrl}/authors`);
    }

    createAuthor(author: any): Observable<any> {
        // Add your code here
        return this.http.post(`${this.apiUrl}/authors`, author);
  }
    }

    