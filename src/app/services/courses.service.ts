import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export interface CoursesResponse {
  successful: boolean;
  result: Course[];
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getAll(): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>(`${this.apiUrl}/courses/all`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses/add`, course);
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  editCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }

  filterCourses(title: string): Observable<Course[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('title', title); 
    }
    return this.http
      .get<any>(`${this.apiUrl}/courses/filter`, { params })
      .pipe(map((response) => response.result));
  }

  getAllAuthors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/authors/add`, { name });
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/authors/${id}`);
  }
}