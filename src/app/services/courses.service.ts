import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:4000';

export interface Author {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string | Date;
  duration: number;
  authors: string[];
}

export interface CreateCourseDto {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<{ successful: boolean; result: Course[] }>(
      `${API_URL}/courses/all`
    ).pipe(map(res => res.result));
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<{ successful: boolean; result: Course }>(
      `${API_URL}/courses/${id}`
    ).pipe(map(res => res.result));
  }

  createCourse(course: CreateCourseDto): Observable<Course> {
    return this.http.post<{ successful: boolean; result: Course }>(
      `${API_URL}/courses/add`,
      course
    ).pipe(map(res => res.result));
  }

  editCourse(id: string, course: CreateCourseDto): Observable<Course> {
    return this.http.put<{ successful: boolean; result: Course }>(
      `${API_URL}/courses/${id}`,
      course
    ).pipe(map(res => res.result));
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/courses/${id}`);
  }

  filterCourses(text: string): Observable<Course[]> {
    return this.http.get<{ successful: boolean; result: Course[] }>(
      `${API_URL}/courses/filter?title=${encodeURIComponent(text)}`
    ).pipe(map(res => res.result));
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<{ successful: boolean; result: Author[] }>(
      `${API_URL}/authors/all`
    ).pipe(map(res => res.result));
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http.get<{ successful: boolean; result: Author }>(
      `${API_URL}/authors/${id}`
    ).pipe(map(res => res.result));
  }

  createAuthor(name: string): Observable<Author> {
    return this.http.post<{ successful: boolean; result: Author }>(
      `${API_URL}/authors/add`,
      { name }
    ).pipe(map(res => res.result));
  }
}
