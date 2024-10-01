import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Author } from "@app/models/author.model";
import { Course } from "@app/models/course.model";

interface resultArray {
  successful: boolean;
  result: Course[] | Author[] | Author;
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get<resultArray>(`${this.apiUrl}/courses/all`)
      .pipe(map((res) => res.result as Course[]));
  }

  createCourse(course: Course) {
    return this.http.post<Course>(`${this.apiUrl}/courses/add`, course);
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

  filterCourses(value: string) {
    // Add your code here
    return this.http
      .get<resultArray>(`${this.apiUrl}/courses/filter`)
      .pipe(
        map(
          (res) =>
            (res.result as Course[]).filter(
              (course) => course.title === value
            ) as Course[]
        )
      );
  }

  getAllAuthors() {
    // Add your code here
    return this.http
      .get<resultArray>(`${this.apiUrl}/authors/all`)
      .pipe(map((res) => res.result as Author[]));
  }

  createAuthor(name: string) {
    // Add your code here
    const token = localStorage.getItem("authToken");
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<resultArray>(`${this.apiUrl}/authors/add`, { name }, { headers })
      .pipe(map((res) => res.result as Author));
  }

  getAuthorById(id: string) {
    // Add your code here
    return this.http
      .get<resultArray>(`${this.apiUrl}/authors/${id}`)
      .pipe(map((res) => res.result as Author));
  }
}
