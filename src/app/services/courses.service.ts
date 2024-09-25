import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Author } from "@app/models/author.model";
import { Course } from "@app/models/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = "http://localhost:4000/api";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    // Add your code here
    return this.http.get<Course[]>(`${this.apiUrl}/courses`);
  }

  createCourse(course: Course): Observable<Course> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<Course>(`${this.apiUrl}/courses`, course);
  }

  editCourse(id: string, course: Course): Observable<Course> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course);
  }

  getCourse(id: string): Observable<Course> {
    // Add your code here
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<void> {
    // Add your code here
    return this.http.delete<void>(`${this.apiUrl}/courses/${id}`);
  }

  filterCourses(value: string): Observable<Course[]> {
    // Add your code here
    return this.http.get<Course[]>(`${this.apiUrl}/courses`, {
      params: { search: value },
    });
  }

  getAllAuthors(): Observable<Author[]> {
    // Add your code here
    return this.http.get<Author[]>(`${this.apiUrl}/authors`);
  }

  createAuthor(name: string): Observable<Author> {
    // Add your code here
    return this.http.post<Author>(`${this.apiUrl}/authors`, { name });
  }

  getAuthorById(id: string): Observable<Author> {
    // Add your code here
    return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
  }
}
