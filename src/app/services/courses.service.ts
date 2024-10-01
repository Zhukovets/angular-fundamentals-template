import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '@app/models/author.model';
import { ApiResponse, Course } from '@app/models/course.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    private apiUrl = `${environment.apiBaseUrl}/courses`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<ApiResponse<Course[]>> {
        return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/all`);
    }

    createCourse(course: Course): Observable<ApiResponse<Course>> {
        return this.http.post<ApiResponse<Course>>(`${this.apiUrl}/add`, course);
    }

    editCourse(id: string, course: Course): Observable<ApiResponse<Course>> {
        return this.http.put<ApiResponse<Course>>(`${this.apiUrl}/${id}`, course);
    }

    getCourse(id: string): Observable<ApiResponse<Course>> {
        return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/${id}`);
    }

    deleteCourse(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    filterCourses(value: string): Observable<ApiResponse<Course[]>> {
        return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/filter`, { params: { title: value } });
    }

    getAllAuthors(): Observable<ApiResponse<Author[]>> {
        return this.http.get<ApiResponse<Author[]>>(`${environment.apiBaseUrl}/authors/all`);
    }

    createAuthor(name: string): Observable<ApiResponse<Author>> {
        return this.http.post<ApiResponse<Author>>(`${environment.apiBaseUrl}/authors/add`, { name });
    }

    getAuthorById(id: string): Observable<ApiResponse<Author>> {
        return this.http.get<ApiResponse<Author>>(`${environment.apiBaseUrl}/authors/${id}`);
    }
}
