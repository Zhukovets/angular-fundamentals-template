import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

export interface Author {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
}

export interface CourseUpdateData {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

interface ApiResponse<T> {
  successful: boolean;
  result: T;
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = "http://localhost:4000/api";

  constructor(private http: HttpClient) {}
  getAllCourses(): Observable<Course[]> {
    return this.http
      .get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/all`)
      .pipe(map((response) => response.result));
  }

  createCourse(course: CourseUpdateData): Observable<Course> {
    return this.http
      .post<ApiResponse<Course>>(`${this.apiUrl}/courses/add`, course)
      .pipe(map((response) => response.result));
  }

  editCourse(id: string, course: CourseUpdateData): Observable<Course> {
    return this.http
      .put<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`, course)
      .pipe(map((response) => response.result));
  }

   getCourseById(id: string): Observable<Course> {
    return this.http
      .get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`)
      .pipe(map((response) => response.result));
  }

  deleteCourse(id: string): Observable<boolean> { 
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/courses/${id}`).pipe(
      map((response) => response.successful)
    );
  }

  filterCourses(title: string): Observable<Course[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title); 
    }
    return this.http
      .get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/all`, { params })
      .pipe(map((response) => response.result));
  }

  getAuthors(): Observable<Author[]> {
    return this.http
      .get<ApiResponse<Author[]>>(`${this.apiUrl}/authors/all`)
      .pipe(map((response) => response.result));
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http
      .post<ApiResponse<Author>>(`${this.apiUrl}/authors/add`, author)
      .pipe(map((response) => response.result));
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http
      .get<ApiResponse<Author>>(`${this.apiUrl}/authors/${id}`)
      .pipe(map((response) => response.result));
  }
}
