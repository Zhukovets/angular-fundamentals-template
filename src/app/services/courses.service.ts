import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthorResponse, AuthorsResponse } from "@app/types/authorTypes";
import {
  Course,
  CourseResponse,
  CoursesResponse,
} from "@app/types/courseTypes";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private readonly baseUrl = "http://localhost:4000";

  constructor(private http: HttpClient) {}
  getAll(): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>(`${this.baseUrl}/courses/all`);
  }

  createCourse(course: Course): Observable<CourseResponse> {
    return this.http.post<CourseResponse>(
      `${this.baseUrl}/courses/add`,
      course
    );
  }

  editCourse(id: string, course: Course): Observable<CourseResponse> {
    return this.http.put<CourseResponse>(
      `${this.baseUrl}/courses/${id}`,
      course
    );
  }

  getCourse(id: string): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(`${this.baseUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<CourseResponse> {
    return this.http.delete<CourseResponse>(`${this.baseUrl}/courses/${id}`);
  }

  filterCourses(value: string): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>(
      `${this.baseUrl}/courses/filter?title=${value}`
    );
  }

  getAllAuthors(): Observable<AuthorsResponse> {
    return this.http.get<AuthorsResponse>(`${this.baseUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<AuthorResponse> {
    return this.http.post<AuthorResponse>(`${this.baseUrl}/authors/add`, name);
  }

  getAuthorById(id: string): Observable<AuthorResponse> {
    return this.http.get<AuthorResponse>(`${this.baseUrl}/authors/${id}`);
  }
}
