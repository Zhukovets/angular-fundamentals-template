import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { CoursesService } from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<any[]>([]);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  courses$: Observable<any[]> = this.courses$$.asObservable();
  isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    console.log("Fetching courses");
    this.isLoading$$.next(true);

    this.coursesService
      .getAll()
      .pipe(
        tap({
          next: (res) => {
            const courses = Array.isArray(res) ? res : res.result || [];
            this.courses$$.next(courses);
          },
          complete: () => this.isLoading$$.next(false),
          error: () => this.isLoading$$.next(false),
        })
      )
      .subscribe();
    // Add your code here
  }

  createCourse(course: any) {
    this.isLoading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(
        tap({
          next: (newCourse) =>
            this.courses$$.next([...this.courses$$.getValue(), newCourse]),
          complete: () => this.isLoading$$.next(false),
          error: () => this.isLoading$$.next(false),
        })
      )
      .subscribe();
    // replace 'any' with the required interface
    // Add your code here
  }

  getCourse(id: string) {
    return this.coursesService.getCourse(id);
    // Add your code here
  }

  editCourse(id: string, course: any) {
    this.isLoading$$.next(true);
    this.coursesService
      .editCourse(id, course)
      .pipe(
        tap({
          next: (updatedCourse) => {
            const updated = this.courses$$
              .getValue()
              .map((c) => (c.id === id ? updatedCourse : c));
            this.courses$$.next(updated);
          },
          complete: () => this.isLoading$$.next(false),
          error: () => this.isLoading$$.next(false),
        })
      )
      .subscribe();
    // replace 'any' with the required interface
    // Add your code here
  }

  deleteCourse(id: string) {
    this.isLoading$$.next(true);
    this.coursesService
      .deleteCourse(id)
      .pipe(
        tap({
          next: () => {
            const filtered = this.courses$$
              .getValue()
              .filter((c) => c.id !== id);
            this.courses$$.next(filtered);
          },
          complete: () => this.isLoading$$.next(false),
          error: () => this.isLoading$$.next(false),
        })
      )
      .subscribe();
    // Add your code here
  }

  filterCourses(value: string) {
    this.isLoading$$.next(true);

    return this.coursesService.filterCourses(value).pipe(
      tap({
        next: (filteredCourses) => this.courses$$.next(filteredCourses),
        complete: () => this.isLoading$$.next(false),
        error: () => this.isLoading$$.next(false),
      })
    );
    // Add your code here
  }

  getAllAuthors() {
    return this.coursesService.getAllAuthors();
    // Add your code here
  }

  createAuthor(name: string) {
    return this.coursesService.createAuthor(name);
    // Add your code here
  }

  getAuthorById(id: string) {
    return this.coursesService.getAuthorById(id);
    // Add your code here
  }
}
